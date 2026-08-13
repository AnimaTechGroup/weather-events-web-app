import { useMemo } from "react";
import { useLocale } from "@/context/LocaleContext";
import { formatCount } from "@/lib/format";
import { topRegionsForYear, worldShare } from "@/lib/gold";
import type { GoldYearlyByRegionRow, GoldYearlyRow, HazardId } from "@/types/gold";

type RegionRankingProps = {
  hazard: HazardId;
  year: number;
  yearly: GoldYearlyRow[];
  byRegion: GoldYearlyByRegionRow[];
  selectedIso: string;
  onSelectRegion: (iso: string) => void;
};

export function RegionRanking({
  hazard,
  year,
  yearly,
  byRegion,
  selectedIso,
  onSelectRegion,
}: RegionRankingProps) {
  const { t, localeTag, regionName } = useLocale();

  const ranked = useMemo(() => topRegionsForYear(byRegion, year, 12), [byRegion, year]);
  const worldTotal = yearly.find((row) => row.year === year)?.event_count ?? 0;
  const maxCount = Math.max(...ranked.map((row) => row.event_count), 1);

  return (
    <section className="section" id="places">
      <div className="wrap">
        <div className="section__head">
          <p className="eyebrow">{t(`hazard.${hazard}.rankEyebrow`, { year })}</p>
          <h2>{t(`hazard.${hazard}.rankTitle`)}</h2>
          <p>{t(`hazard.${hazard}.rankLede`)}</p>
        </div>

        {ranked.length === 0 ? (
          <p className="note">{t(`hazard.${hazard}.rankEmpty`, { year })}</p>
        ) : (
          <figure className="rank-chart">
            <figcaption className="rank-chart__caption">
              {t(`hazard.${hazard}.rankCaption`, { year })}
            </figcaption>
            <ol className="rank-chart__list">
              {ranked.map((row, index) => {
                const name = regionName(row.region_iso, row.region_name);
                const width = Math.max(4, (row.event_count / maxCount) * 100);
                const share = worldShare(row.event_count, worldTotal);
                const active = row.region_iso === selectedIso;

                return (
                  <li key={row.region_iso}>
                    <button
                      type="button"
                      className={`rank-chart__row${active ? " is-active" : ""}`}
                      onClick={() => onSelectRegion(row.region_iso)}
                      aria-pressed={active}
                      aria-label={t(`hazard.${hazard}.rankRowLabel`, {
                        rank: index + 1,
                        name,
                        count: formatCount(row.event_count, localeTag),
                        year,
                      })}
                    >
                      <span className="rank-chart__place" aria-hidden="true">
                        {index + 1}
                      </span>
                      <span className="rank-chart__meta">
                        <span className="rank-chart__name">{name}</span>
                        <span className="rank-chart__iso">{row.region_iso}</span>
                      </span>
                      <span className="rank-chart__track" aria-hidden="true">
                        <span className="rank-chart__fill" style={{ width: `${width}%` }} />
                      </span>
                      <span className="rank-chart__stats">
                        <strong>{formatCount(row.event_count, localeTag)}</strong>
                        <span>{share.toFixed(1)}%</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </figure>
        )}
      </div>
    </section>
  );
}
