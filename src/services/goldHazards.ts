import { env, isApiGold, isMockGold, isRemoteGold } from "@/config/env";
import { mockCyclonesYearly, mockCyclonesYearlyByBasin } from "@/data/gold/mockCyclones";
import { mockQuakesYearly, mockQuakesYearlyByCountry } from "@/data/gold/mockQuakes";
import { mockTornadoesYearly, mockTornadoesYearlyByState } from "@/data/gold/mockTornadoes";
import type { GoldBundle, GoldYearlyByRegionRow, GoldYearlyRow, HazardId } from "@/types/gold";

const MOCKS: Record<HazardId, Pick<GoldBundle, "yearly" | "byRegion">> = {
  quakes: { yearly: mockQuakesYearly, byRegion: mockQuakesYearlyByCountry },
  tornadoes: { yearly: mockTornadoesYearly, byRegion: mockTornadoesYearlyByState },
  cyclones: { yearly: mockCyclonesYearly, byRegion: mockCyclonesYearlyByBasin },
};

const REMOTE_FILES: Record<HazardId, { yearly: string; byRegion: string }> = {
  quakes: { yearly: "quakes_yearly.json", byRegion: "quakes_yearly_by_country.json" },
  tornadoes: { yearly: "tornadoes_yearly.json", byRegion: "tornadoes_yearly_by_state.json" },
  cyclones: { yearly: "cyclones_yearly.json", byRegion: "cyclones_yearly_by_basin.json" },
};

async function fetchJson<T>(url: string, apiKey?: string): Promise<T> {
  const headers: HeadersInit = {};
  if (apiKey) {
    headers["X-Gold-Api-Key"] = apiKey;
  }
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`Data request failed (${response.status})`);
  }
  return response.json() as Promise<T>;
}

export async function loadHazardGold(hazard: HazardId): Promise<GoldBundle> {
  if (isMockGold) {
    return {
      hazard,
      ...MOCKS[hazard],
      source: "mock",
      generatedAt: "2026-08-11T12:00:00Z",
    };
  }

  if (isApiGold) {
    const base = env.goldApiUrl;
    const [yearly, byRegion] = await Promise.all([
      fetchJson<GoldYearlyRow[]>(`${base}/v1/${hazard}/yearly`, env.goldApiKey),
      fetchJson<GoldYearlyByRegionRow[]>(`${base}/v1/${hazard}/by-region`, env.goldApiKey),
    ]);
    return {
      hazard,
      yearly,
      byRegion,
      source: "remote",
      generatedAt: new Date().toISOString(),
    };
  }

  if (isRemoteGold) {
    const files = REMOTE_FILES[hazard];
    const [yearly, byRegion] = await Promise.all([
      fetchJson<GoldYearlyRow[]>(`${env.goldBaseUrl}/${files.yearly}`),
      fetchJson<GoldYearlyByRegionRow[]>(`${env.goldBaseUrl}/${files.byRegion}`),
    ]);
    return {
      hazard,
      yearly,
      byRegion,
      source: "remote",
      generatedAt: new Date().toISOString(),
    };
  }

  throw new Error("Data source is not configured");
}
