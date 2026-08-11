export const HAZARDS = ["quakes", "tornadoes", "cyclones"] as const;

export type HazardId = (typeof HAZARDS)[number];

/** Gold: event counts by year for one hazard. */
export type GoldYearlyRow = {
  year: number;
  event_count: number;
  max_severity: number;
};

/** Gold: counts by year and region (country, US state, or cyclone basin). */
export type GoldYearlyByRegionRow = {
  year: number;
  region_iso: string;
  region_name: string;
  event_count: number;
  max_severity: number;
};

export type GoldBundle = {
  hazard: HazardId;
  yearly: GoldYearlyRow[];
  byRegion: GoldYearlyByRegionRow[];
  source: "mock" | "remote";
  generatedAt: string;
};

export type RegionOption = {
  iso: string;
  name: string;
};
