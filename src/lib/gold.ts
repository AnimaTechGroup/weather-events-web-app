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

export function rowForYear(rows: GoldYearlyRow[], year: number): GoldYearlyRow | undefined {
  return rows.find((row) => row.year === year);
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

export function worldShare(regionCount: number, worldCount: number): number {
  if (worldCount <= 0) return 0;
  return (regionCount / worldCount) * 100;
}

export function isHazardId(value: string): value is HazardId {
  return value === "quakes" || value === "tornadoes" || value === "cyclones";
}
