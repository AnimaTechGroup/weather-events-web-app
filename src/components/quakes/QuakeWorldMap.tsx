import { geoEqualEarth, geoPath, type GeoPermissibleObjects } from "d3-geo";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import worldAtlas from "world-atlas/countries-110m.json";
import { isoAlpha2FromNumeric } from "@/data/isoNumericToAlpha2";
import { useLocale } from "@/context/LocaleContext";
import { formatCount } from "@/lib/format";
import { regionYearRow } from "@/lib/gold";
import type { GoldYearlyByRegionRow } from "@/types/gold";

const WIDTH = 960;
const HEIGHT = 520;
const MIN_K = 1;
const MAX_K = 8;
const DRAG_THRESHOLD = 8;

type Transform = { x: number; y: number; k: number };

type CountryFeat = {
  iso: string;
  name: string;
  geo: GeoPermissibleObjects;
};

type QuakeWorldMapProps = {
  year: number;
  regionIso: string;
  byRegion: GoldYearlyByRegionRow[];
  onSelectCountry: (iso: string) => void;
};

function fillForCount(count: number, maxCount: number): string {
  if (count <= 0 || maxCount <= 0) return "rgba(244, 239, 230, 0.08)";
  const t = Math.sqrt(count / maxCount);
  const r = Math.round(201 + (224 - 201) * t);
  const g = Math.round(76 + (122 - 76) * (1 - t));
  const b = Math.round(42 + (61 - 42) * (1 - t));
  const a = (0.38 + t * 0.62).toFixed(3);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function pointerDistance(
  a: { x: number; y: number },
  b: { x: number; y: number },
): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function QuakeWorldMap({ year, regionIso, byRegion, onSelectCountry }: QuakeWorldMapProps) {
  const { t, localeTag, countryName } = useLocale();
  const svgRef = useRef<SVGSVGElement>(null);
  const transformRef = useRef<Transform>({ x: 0, y: 0, k: 1 });
  const pointersRef = useRef(new Map<number, { x: number; y: number }>());
  const pinchRef = useRef<{ distance: number; k: number } | null>(null);
  const dragRef = useRef({
    pointerId: -1,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    moved: false,
  });
  const [transform, setTransform] = useState<Transform>({ x: 0, y: 0, k: 1 });
  const [hoverIso, setHoverIso] = useState<string | null>(null);
  const skipFitOnMount = useRef(true);

  transformRef.current = transform;

  const countries = useMemo<CountryFeat[]>(() => {
    const topology = worldAtlas as unknown as Topology;
    const object = topology.objects.countries;
    if (!object) return [];
    const collection = feature(topology, object);
    if (collection.type !== "FeatureCollection") return [];

    return collection.features.flatMap((item) => {
      const iso = isoAlpha2FromNumeric(item.id as string | number | undefined);
      if (!iso || iso === "AQ") return [];
      const rawName =
        item.properties && typeof item.properties === "object" && "name" in item.properties
          ? String((item.properties as { name?: unknown }).name ?? iso)
          : iso;
      return [{ iso, name: rawName, geo: item as GeoPermissibleObjects }];
    });
  }, []);

  const projection = useMemo(
    () =>
      geoEqualEarth().fitExtent(
        [
          [28, 28],
          [WIDTH - 28, HEIGHT - 36],
        ],
        { type: "Sphere" },
      ),
    [],
  );
  const pathGen = useMemo(() => geoPath(projection), [projection]);
  const spherePath = useMemo(() => pathGen({ type: "Sphere" }) ?? "", [pathGen]);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const row of byRegion) {
      if (row.year !== year) continue;
      map.set(row.region_iso, row.event_count);
    }
    return map;
  }, [byRegion, year]);

  const maxCount = useMemo(() => Math.max(1, ...counts.values()), [counts]);

  const countryByIso = useMemo(() => {
    const map = new Map<string, CountryFeat>();
    for (const country of countries) map.set(country.iso, country);
    return map;
  }, [countries]);

  const fitCountry = useCallback(
    (iso: string) => {
      const country = countryByIso.get(iso);
      if (!country) {
        setTransform({ x: 0, y: 0, k: 1 });
        return;
      }
      const [[x0, y0], [x1, y1]] = pathGen.bounds(country.geo);
      const bw = Math.max(x1 - x0, 12);
      const bh = Math.max(y1 - y0, 12);
      const k = Math.max(MIN_K, Math.min(MAX_K, 0.62 / Math.max(bw / WIDTH, bh / HEIGHT)));
      if (k <= 1.2) {
        setTransform({ x: 0, y: 0, k: 1 });
        return;
      }
      setTransform({
        x: WIDTH / 2 - (k * (x0 + x1)) / 2,
        y: HEIGHT / 2 - (k * (y0 + y1)) / 2,
        k,
      });
    },
    [countryByIso, pathGen],
  );

  useEffect(() => {
    if (skipFitOnMount.current) {
      skipFitOnMount.current = false;
      return;
    }
    fitCountry(regionIso);
  }, [fitCountry, regionIso]);

  const zoomBy = useCallback((factor: number, cx = WIDTH / 2, cy = HEIGHT / 2) => {
    setTransform((prev) => {
      const nextK = Math.min(MAX_K, Math.max(MIN_K, prev.k * factor));
      if (nextK === prev.k) return prev;
      if (nextK === MIN_K) return { x: 0, y: 0, k: MIN_K };
      const scale = nextK / prev.k;
      return {
        k: nextK,
        x: cx - scale * (cx - prev.x),
        y: cy - scale * (cy - prev.y),
      };
    });
  }, []);

  const clientToSvg = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: WIDTH / 2, y: HEIGHT / 2 };
    const rect = svg.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * WIDTH,
      y: ((clientY - rect.top) / rect.height) * HEIGHT,
    };
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const onNativeWheel = (event: globalThis.WheelEvent) => {
      event.preventDefault();
      const point = clientToSvg(event.clientX, event.clientY);
      zoomBy(event.deltaY < 0 ? 1.18 : 1 / 1.18, point.x, point.y);
    };
    svg.addEventListener("wheel", onNativeWheel, { passive: false });
    return () => svg.removeEventListener("wheel", onNativeWheel);
  }, [clientToSvg, zoomBy]);

  const onPointerDown = (event: PointerEvent<SVGSVGElement>) => {
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointersRef.current.size === 2) {
      const [first, second] = [...pointersRef.current.values()];
      pinchRef.current = {
        distance: pointerDistance(first, second),
        k: transformRef.current.k,
      };
      dragRef.current.moved = true;
      dragRef.current.pointerId = -1;
      return;
    }

    const isTouch = event.pointerType === "touch";
    if (isTouch && transformRef.current.k <= 1) return;
    if (event.button !== 0 && event.pointerType === "mouse") return;

    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: transformRef.current.x,
      originY: transformRef.current.y,
      moved: false,
    };
  };

  const onPointerMove = (event: PointerEvent<SVGSVGElement>) => {
    if (pointersRef.current.has(event.pointerId)) {
      pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    }

    if (pointersRef.current.size === 2 && pinchRef.current) {
      const [first, second] = [...pointersRef.current.values()];
      const distance = pointerDistance(first, second);
      if (pinchRef.current.distance < 8) return;
      const nextK = Math.min(
        MAX_K,
        Math.max(MIN_K, pinchRef.current.k * (distance / pinchRef.current.distance)),
      );
      setTransform((prev) => {
        if (nextK === MIN_K) return { x: 0, y: 0, k: MIN_K };
        const scale = nextK / prev.k;
        if (scale === 1) return prev;
        return {
          k: nextK,
          x: WIDTH / 2 - scale * (WIDTH / 2 - prev.x),
          y: HEIGHT / 2 - scale * (HEIGHT / 2 - prev.y),
        };
      });
      return;
    }

    const drag = dragRef.current;
    if (drag.pointerId !== event.pointerId) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
    drag.moved = true;
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    setTransform({
      k: transformRef.current.k,
      x: drag.originX + dx * (WIDTH / rect.width),
      y: drag.originY + dy * (HEIGHT / rect.height),
    });
  };

  const endDrag = (event: PointerEvent<SVGSVGElement>) => {
    pointersRef.current.delete(event.pointerId);
    if (pointersRef.current.size < 2) pinchRef.current = null;
    if (dragRef.current.pointerId !== event.pointerId) return;
    dragRef.current.pointerId = -1;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      /* already released */
    }
  };

  const onCountryClick = (iso: string) => {
    if (dragRef.current.moved || pinchRef.current) return;
    onSelectCountry(iso);
  };

  const hover = hoverIso ? countryByIso.get(hoverIso) : undefined;
  const selected = countryByIso.get(regionIso);
  const selectedRow = regionYearRow(byRegion, year, regionIso);
  const selectedCount = selectedRow?.event_count ?? counts.get(regionIso) ?? 0;
  const statusIso = hoverIso ?? regionIso;
  const statusName = countryName(statusIso, hover?.name ?? selected?.name ?? statusIso);
  const statusCount = hoverIso ? (counts.get(hoverIso) ?? 0) : selectedCount;
  const zoomed = transform.k > 1.02;

  return (
    <figure className="quake-map">
      <div className={`quake-map__stage${zoomed ? " is-zoomed" : ""}`}>
        <svg
          ref={svgRef}
          className="quake-map__svg"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          role="img"
          aria-label={t("map.title")}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={() => setHoverIso(null)}
        >
          <path d={spherePath} className="quake-map__sphere" />
          <g
            className="quake-map__world"
            style={{
              transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.k})`,
            }}
          >
            {countries.map((country) => {
              const d = pathGen(country.geo);
              if (!d) return null;
              const count = counts.get(country.iso) ?? 0;
              const isSelected = country.iso === regionIso;
              return (
                <path
                  key={country.iso}
                  d={d}
                  className={isSelected ? "quake-map__land is-selected" : "quake-map__land"}
                  fill={isSelected ? undefined : fillForCount(count, maxCount)}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") setHoverIso(country.iso);
                  }}
                  onPointerLeave={(event) => {
                    if (event.pointerType === "mouse") {
                      setHoverIso((current) => (current === country.iso ? null : current));
                    }
                  }}
                  onClick={() => onCountryClick(country.iso)}
                >
                  <title>
                    {`${countryName(country.iso, country.name)}: ${formatCount(count, localeTag)}`}
                  </title>
                </path>
              );
            })}
          </g>
        </svg>
      </div>

      <figcaption className="quake-map__meta">
        <div className="quake-map__picked">
          <span className="chip">{statusIso}</span>
          <strong className="quake-map__name">{statusName}</strong>
          <b className={statusCount === 0 ? "quake-map__count empty-country" : "quake-map__count"}>
            {formatCount(statusCount, localeTag)}
          </b>
        </div>

        <div className="quake-map__tools" role="group" aria-label={t("map.title")}>
          <button type="button" onClick={() => zoomBy(1.25)} aria-label={t("map.zoomIn")}>
            +
          </button>
          <button type="button" onClick={() => zoomBy(1 / 1.25)} aria-label={t("map.zoomOut")}>
            −
          </button>
          <button type="button" onClick={() => setTransform({ x: 0, y: 0, k: 1 })}>
            {t("map.reset")}
          </button>
        </div>

        <p className="quake-map__hint">{t("map.hint")}</p>

        <div className="quake-map__legend" aria-hidden="true">
          <span>{t("map.legendZero")}</span>
          <span className="quake-map__swatches">
            <i style={{ background: fillForCount(0, maxCount) }} />
            <i style={{ background: fillForCount(maxCount * 0.18, maxCount) }} />
            <i style={{ background: fillForCount(maxCount * 0.5, maxCount) }} />
            <i style={{ background: fillForCount(maxCount, maxCount) }} />
          </span>
          <span>{t("map.legendMore")}</span>
        </div>
      </figcaption>
    </figure>
  );
}
