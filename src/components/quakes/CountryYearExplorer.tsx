import { useLocale } from "@/context/LocaleContext";
import { formatCount, formatSeverity } from "@/lib/format";
import { regionYearRow, worldShare } from "@/lib/gold";
import type { GoldYearlyByRegionRow, GoldYearlyRow, HazardId, RegionOption } from "@/types/gold";

type CountryYearExplorerProps = {
  hazard: HazardId;
  year: number;
  regionIso: string;
  query: string;
  regions: RegionOption[];
  yearly: GoldYearlyRow[];
  byRegion: GoldYearlyByRegionRow[];
  onRegionChange: (iso: string) => void;
  onQueryChange: (value: string) => void;
};

export function CountryYearExplorer({
  hazard,
  year,
  regionIso,
  query,
  regions,
  yearly,
  byRegion,
  onRegionChange,
  onQueryChange,
}: CountryYearExplorerProps) {
  const { t, localeTag, regionName } = useLocale();

  const labeled = regions
    .map((region) => ({
      ...region,
      label: regionName(region.iso, region.name),
    }))
    .sort((left, right) => left.label.localeCompare(right.label, localeTag));

  const filtered = labeled.filter((region) => {
    const needle = query.trim().toLowerCase();
    if (!needle || region.iso === regionIso) return true;
    return (
      region.label.toLowerCase().includes(needle) ||
      region.name.toLowerCase().includes(needle) ||
      region.iso.toLowerCase().includes(needle)
    );
  });

  const selected = labeled.find((region) => region.iso === regionIso) ?? labeled[0];
  const selectedRow = selected ? regionYearRow(byRegion, year, selected.iso) : undefined;
  const worldRow = yearly.find((row) => row.year === year);
  const count = selectedRow?.event_count ?? 0;
  const share = worldShare(count, worldRow?.event_count ?? 0);

  return (
    <section className="section" id="country">
      <div className="wrap">
        <div className="section__head">
          <p className="eyebrow">{t("country.eyebrow", { year })}</p>
          <h2>{t(`hazard.${hazard}.filterTitle`)}</h2>
          <p>{t(`hazard.${hazard}.filterLede`)}</p>
        </div>

        <div className="country-panel">
          <div>
            <div className="field">
              <label htmlFor="country-search">{t(`hazard.${hazard}.searchLabel`)}</label>
              <input
                id="country-search"
                type="search"
                placeholder={t(`hazard.${hazard}.searchPlaceholder`)}
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="field" style={{ marginTop: "0.9rem" }}>
              <label htmlFor="country-select">{t(`hazard.${hazard}.selectLabel`)}</label>
              <select
                id="country-select"
                value={selected?.iso ?? ""}
                onChange={(event) => onRegionChange(event.target.value)}
              >
                {filtered.map((region) => (
                  <option key={region.iso} value={region.iso}>
                    {region.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="country-stat">
            <span className="chip">{selected?.iso}</span>
            <strong className={count === 0 ? "empty-country" : undefined}>
              {formatCount(count, localeTag)}
            </strong>
            <p>
              {t(count === 1 ? `hazard.${hazard}.eventOne` : `hazard.${hazard}.eventMany`, {
                count: formatCount(count, localeTag),
                name: selected?.label ?? "",
                year,
              })}
              {count === 0
                ? t(`hazard.${hazard}.empty`)
                : t(`hazard.${hazard}.share`, {
                    share: share.toFixed(1),
                    severity: formatSeverity(hazard, selectedRow?.max_severity ?? 0),
                  })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
