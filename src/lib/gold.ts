import type { GoldYearlyByRegionRow, GoldYearlyRow, HazardId, RegionOption } from "@/types/gold";

export const CATALOG_START_YEAR = 1950;
export const SATELLITE_ERA_YEAR = 1980;

export const DEFAULT_REGION: Record<HazardId, string> = {
  quakes: "BR",
  tornadoes: "TX",
  cyclones: "SA",
};

export function sortYearsDesc(rows: GoldYearlyRow[]): GoldYearlyRow[] {
  return [...rows].sort((a, b) => b.year - a.year);
}

export function currentYearFromGold(rows: GoldYearlyRow[]): number {
  return Math.max(...rows.map((row) => row.year));
}

/** SPC tornadoes publish by season year — hero should feature the last complete year. */
export function isYearlyPublishHazard(hazard: HazardId): boolean {
  return hazard === "tornadoes";
}

export function featuredYearFromGold(rows: GoldYearlyRow[], hazard: HazardId): number {
  const years = rows.map((row) => row.year);
  const maxYear = Math.max(...years);
  if (!isYearlyPublishHazard(hazard)) return maxYear;

  const calendarYear = new Date().getUTCFullYear();
  const lastComplete = calendarYear - 1;
  if (years.includes(lastComplete)) return lastComplete;
  if (maxYear >= calendarYear && years.includes(maxYear - 1)) return maxYear - 1;
  return maxYear;
}

export function rowForYear(rows: GoldYearlyRow[], year: number): GoldYearlyRow | undefined {
  return rows.find((row) => row.year === year);
}

export type YearOverYear = "more" | "less" | "same";

export function yearOverYearDelta(
  currentCount: number,
  previousCount: number,
): { delta: number; direction: YearOverYear } {
  const delta = currentCount - previousCount;
  if (delta > 0) return { delta, direction: "more" };
  if (delta < 0) return { delta: Math.abs(delta), direction: "less" };
  return { delta: 0, direction: "same" };
}

export function regionsFromGold(rows: GoldYearlyByRegionRow[]): RegionOption[] {
  const map = new Map<string, string>();
  for (const row of rows) {
    if (!map.has(row.region_iso)) {
      map.set(row.region_iso, row.region_name);
    }
  }
  return [...map.entries()]
    .map(([iso, name]) => ({ iso, name }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function regionYearRow(
  rows: GoldYearlyByRegionRow[],
  year: number,
  regionIso: string,
): GoldYearlyByRegionRow | undefined {
  return rows.find((row) => row.year === year && row.region_iso === regionIso);
}

export function topRegionsForYear(
  rows: GoldYearlyByRegionRow[],
  year: number,
  limit = 12,
): GoldYearlyByRegionRow[] {
  return rows
    .filter((row) => row.year === year && row.event_count > 0)
    .sort(
      (left, right) =>
        right.event_count - left.event_count || left.region_iso.localeCompare(right.region_iso),
    )
    .slice(0, limit);
}

export function worldShare(regionCount: number, worldCount: number): number {
  if (worldCount <= 0) return 0;
  return (regionCount / worldCount) * 100;
}

export function isHazardId(value: string): value is HazardId {
  return value === "quakes" || value === "tornadoes" || value === "cyclones";
}
