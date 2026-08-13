import { useEffect, useMemo, useState } from "react";
import { DEFAULT_REGION, featuredYearFromGold, regionsFromGold, sortYearsDesc } from "@/lib/gold";
import { loadHazardGold } from "@/services/goldHazards";
import type { GoldBundle, HazardId, RegionOption } from "@/types/gold";

type GoldState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; data: GoldBundle };

export function useHazardGold(hazard: HazardId) {
  const [state, setState] = useState<GoldState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });

    loadHazardGold(hazard)
      .then((data) => {
        if (!cancelled) setState({ status: "ready", data });
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            status: "error",
            message: error instanceof Error ? error.message : "Could not load data",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [hazard]);

  const derived = useMemo(() => {
    if (state.status !== "ready") {
      return {
        yearlyDesc: [],
        regions: [] as RegionOption[],
        currentYear: 2026,
        defaultRegion: DEFAULT_REGION[hazard],
      };
    }

    const regions = regionsFromGold(state.data.byRegion);
    const preferred = DEFAULT_REGION[hazard];
    return {
      yearlyDesc: sortYearsDesc(state.data.yearly),
      regions,
      currentYear: featuredYearFromGold(state.data.yearly, hazard),
      defaultRegion: regions.some((region) => region.iso === preferred)
        ? preferred
        : (regions[0]?.iso ?? preferred),
    };
  }, [hazard, state]);

  return { state, ...derived };
}
