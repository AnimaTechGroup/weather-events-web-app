import { CATALOG_START_YEAR } from "@/lib/gold";
import type { GoldYearlyByRegionRow, GoldYearlyRow } from "@/types/gold";

const CURRENT_YEAR = 2026;

const COUNTRIES: Array<{ iso: string; name: string; weight: number; floor: number }> = [
  { iso: "JP", name: "Japan", weight: 0.12, floor: 18 },
  { iso: "ID", name: "Indonesia", weight: 0.11, floor: 16 },
  { iso: "CN", name: "China", weight: 0.07, floor: 8 },
  { iso: "US", name: "United States", weight: 0.06, floor: 6 },
  { iso: "CL", name: "Chile", weight: 0.055, floor: 6 },
  { iso: "PG", name: "Papua New Guinea", weight: 0.05, floor: 5 },
  { iso: "PH", name: "Philippines", weight: 0.045, floor: 5 },
  { iso: "PE", name: "Peru", weight: 0.04, floor: 4 },
  { iso: "RU", name: "Russia", weight: 0.04, floor: 4 },
  { iso: "MX", name: "Mexico", weight: 0.035, floor: 3 },
  { iso: "IR", name: "Iran", weight: 0.03, floor: 3 },
  { iso: "TR", name: "Turkey", weight: 0.025, floor: 2 },
  { iso: "NZ", name: "New Zealand", weight: 0.022, floor: 2 },
  { iso: "IN", name: "India", weight: 0.02, floor: 1 },
  { iso: "GR", name: "Greece", weight: 0.018, floor: 1 },
  { iso: "IT", name: "Italy", weight: 0.015, floor: 1 },
  { iso: "EC", name: "Ecuador", weight: 0.015, floor: 1 },
  { iso: "CO", name: "Colombia", weight: 0.014, floor: 1 },
  { iso: "AF", name: "Afghanistan", weight: 0.014, floor: 1 },
  { iso: "PK", name: "Pakistan", weight: 0.012, floor: 1 },
  { iso: "NP", name: "Nepal", weight: 0.01, floor: 0 },
  { iso: "AR", name: "Argentina", weight: 0.01, floor: 0 },
  { iso: "AU", name: "Australia", weight: 0.008, floor: 0 },
  { iso: "FJ", name: "Fiji", weight: 0.012, floor: 1 },
  { iso: "BR", name: "Brazil", weight: 0.002, floor: 0 },
];

function hash(year: number, salt: number): number {
  const x = Math.sin(year * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function globalCount(year: number): number {
  const completeness = year < 1980 ? 0.28 + ((year - 1950) / 30) * 0.35 : 0.78 + ((year - 1980) / 46) * 0.22;
  const base = 2100 * completeness;
  const wobble = (hash(year, 1) - 0.5) * 280;
  const spikes: Record<number, number> = {
    1960: 220,
    1964: 160,
    2004: 310,
    2011: 380,
    2023: 140,
  };
  const ytd = year === CURRENT_YEAR ? 0.62 : 1;
  return Math.max(180, Math.round((base + wobble + (spikes[year] ?? 0)) * ytd));
}

function maxMag(year: number, countryBoost = 0): number {
  const roll = hash(year, 7 + countryBoost);
  if (year === 1960 || year === 1964 || year === 2004 || year === 2011) {
    return Number((8.8 + roll * 0.5).toFixed(1));
  }
  return Number((6.4 + roll * 2.4).toFixed(1));
}

export const mockQuakesYearly: GoldYearlyRow[] = Array.from(
  { length: CURRENT_YEAR - CATALOG_START_YEAR + 1 },
  (_, index) => {
    const year = CATALOG_START_YEAR + index;
    return {
      year,
      event_count: globalCount(year),
      max_severity: maxMag(year),
    };
  },
);

export const mockQuakesYearlyByCountry: GoldYearlyByRegionRow[] = mockQuakesYearly.flatMap((yearRow) => {
  const remaining = yearRow.event_count;
  const allocated = COUNTRIES.map((country, index) => {
    const noise = 0.65 + hash(yearRow.year, index + 3) * 0.7;
    const raw = Math.round(yearRow.event_count * country.weight * noise);
    const brazilQuiet = country.iso === "BR" ? Math.min(raw, hash(yearRow.year, 99) > 0.55 ? 4 : 1) : raw;
    return {
      ...country,
      event_count: Math.max(country.floor, brazilQuiet),
    };
  });

  const sum = allocated.reduce((total, row) => total + row.event_count, 0);
  const scale = sum > 0 ? remaining / sum : 1;

  return allocated.map((country) => {
    const event_count =
      country.iso === "BR"
        ? country.event_count
        : Math.max(country.floor, Math.round(country.event_count * scale));

    return {
      year: yearRow.year,
      region_iso: country.iso,
      region_name: country.name,
      event_count,
      max_severity: Number(Math.min(yearRow.max_severity, maxMag(yearRow.year, country.iso.charCodeAt(0))).toFixed(1)),
    };
  });
});
