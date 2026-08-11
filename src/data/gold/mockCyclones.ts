import { CATALOG_START_YEAR } from "@/lib/gold";
import type { GoldYearlyByRegionRow, GoldYearlyRow } from "@/types/gold";

const CURRENT_YEAR = 2026;

const BASINS: Array<{ iso: string; name: string; weight: number; floor: number }> = [
  { iso: "WP", name: "Western Pacific", weight: 0.3, floor: 12 },
  { iso: "EP", name: "Eastern Pacific", weight: 0.18, floor: 6 },
  { iso: "NA", name: "North Atlantic", weight: 0.16, floor: 5 },
  { iso: "SI", name: "South Indian", weight: 0.14, floor: 4 },
  { iso: "SP", name: "South Pacific", weight: 0.1, floor: 3 },
  { iso: "NI", name: "North Indian", weight: 0.08, floor: 2 },
  { iso: "SA", name: "South Atlantic", weight: 0.004, floor: 0 },
];

function hash(year: number, salt: number): number {
  const x = Math.sin(year * 7.77 + salt * 13.01) * 18253.917;
  return x - Math.floor(x);
}

function globalCount(year: number): number {
  const completeness = year < 1980 ? 0.55 + ((year - 1950) / 30) * 0.25 : 0.88 + ((year - 1980) / 46) * 0.1;
  const base = 92 * completeness;
  const wobble = (hash(year, 3) - 0.5) * 16;
  const ytd = year === CURRENT_YEAR ? 0.58 : 1;
  return Math.max(38, Math.round((base + wobble) * ytd));
}

function maxWind(year: number): number {
  const roll = hash(year, 11);
  return Math.round(105 + roll * 70);
}

export const mockCyclonesYearly: GoldYearlyRow[] = Array.from(
  { length: CURRENT_YEAR - CATALOG_START_YEAR + 1 },
  (_, index) => {
    const year = CATALOG_START_YEAR + index;
    return { year, event_count: globalCount(year), max_severity: maxWind(year) };
  },
);

export const mockCyclonesYearlyByBasin: GoldYearlyByRegionRow[] = mockCyclonesYearly.flatMap((yearRow) => {
  return BASINS.map((basin, index) => {
    if (basin.iso === "SA") {
      const rare = yearRow.year === 2004 ? 1 : hash(yearRow.year, 21) > 0.97 ? 1 : 0;
      return {
        year: yearRow.year,
        region_iso: basin.iso,
        region_name: basin.name,
        event_count: rare,
        max_severity: rare ? 85 : 0,
      };
    }

    const noise = 0.75 + hash(yearRow.year, index + 2) * 0.5;
    const event_count = Math.max(basin.floor, Math.round(yearRow.event_count * basin.weight * noise));
    return {
      year: yearRow.year,
      region_iso: basin.iso,
      region_name: basin.name,
      event_count,
      max_severity: Math.round(yearRow.max_severity * (0.75 + hash(yearRow.year, index) * 0.25)),
    };
  });
});
