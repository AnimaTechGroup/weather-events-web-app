import { CATALOG_START_YEAR } from "@/lib/gold";
import type { GoldYearlyByRegionRow, GoldYearlyRow } from "@/types/gold";

const CURRENT_YEAR = 2026;

const STATES: Array<{ iso: string; name: string; weight: number }> = [
  { iso: "TX", name: "Texas", weight: 0.14 },
  { iso: "OK", name: "Oklahoma", weight: 0.09 },
  { iso: "KS", name: "Kansas", weight: 0.08 },
  { iso: "AL", name: "Alabama", weight: 0.06 },
  { iso: "MS", name: "Mississippi", weight: 0.055 },
  { iso: "FL", name: "Florida", weight: 0.055 },
  { iso: "MO", name: "Missouri", weight: 0.05 },
  { iso: "IL", name: "Illinois", weight: 0.045 },
  { iso: "IA", name: "Iowa", weight: 0.04 },
  { iso: "NE", name: "Nebraska", weight: 0.04 },
  { iso: "AR", name: "Arkansas", weight: 0.035 },
  { iso: "LA", name: "Louisiana", weight: 0.035 },
  { iso: "GA", name: "Georgia", weight: 0.035 },
  { iso: "TN", name: "Tennessee", weight: 0.03 },
  { iso: "IN", name: "Indiana", weight: 0.03 },
  { iso: "OH", name: "Ohio", weight: 0.025 },
  { iso: "KY", name: "Kentucky", weight: 0.025 },
  { iso: "NC", name: "North Carolina", weight: 0.022 },
  { iso: "MN", name: "Minnesota", weight: 0.02 },
  { iso: "CO", name: "Colorado", weight: 0.018 },
];

function hash(year: number, salt: number): number {
  const x = Math.sin(year * 19.19 + salt * 44.12) * 23421.631;
  return x - Math.floor(x);
}

function usCount(year: number): number {
  const detection = year < 1975 ? 0.42 + ((year - 1950) / 25) * 0.28 : 0.78 + ((year - 1975) / 51) * 0.28;
  const base = 1450 * detection;
  const wobble = (hash(year, 2) - 0.5) * 220;
  const spikes: Record<number, number> = { 1974: 280, 2003: 160, 2011: 420, 2019: 130 };
  const ytd = year === CURRENT_YEAR ? 0.68 : 1;
  return Math.max(220, Math.round((base + wobble + (spikes[year] ?? 0)) * ytd));
}

function maxEf(year: number): number {
  if (year === 1974 || year === 2011) return 5;
  return hash(year, 8) > 0.82 ? 5 : hash(year, 8) > 0.55 ? 4 : 3;
}

export const mockTornadoesYearly: GoldYearlyRow[] = Array.from(
  { length: CURRENT_YEAR - CATALOG_START_YEAR + 1 },
  (_, index) => {
    const year = CATALOG_START_YEAR + index;
    return { year, event_count: usCount(year), max_severity: maxEf(year) };
  },
);

export const mockTornadoesYearlyByState: GoldYearlyByRegionRow[] = mockTornadoesYearly.flatMap((yearRow) => {
  const allocated = STATES.map((state, index) => {
    const noise = 0.7 + hash(yearRow.year, index + 4) * 0.6;
    return {
      ...state,
      event_count: Math.max(2, Math.round(yearRow.event_count * state.weight * noise)),
    };
  });
  const sum = allocated.reduce((total, row) => total + row.event_count, 0);
  const scale = sum > 0 ? yearRow.event_count / sum : 1;

  return allocated.map((state) => ({
    year: yearRow.year,
    region_iso: state.iso,
    region_name: state.name,
    event_count: Math.max(1, Math.round(state.event_count * scale)),
    max_severity: Math.max(1, yearRow.max_severity - (hash(yearRow.year, state.iso.charCodeAt(0)) > 0.7 ? 0 : 1)),
  }));
});
