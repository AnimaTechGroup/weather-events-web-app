import { useEffect, useState } from "react";
import { isHazardId } from "@/lib/gold";
import type { HazardId } from "@/types/gold";

function readHash(): HazardId {
  const raw = window.location.hash.replace(/^#\/?/, "").split("/")[0];
  return isHazardId(raw) ? raw : "quakes";
}

export function useActiveHazard() {
  const [hazard, setHazardState] = useState<HazardId>(() =>
    typeof window === "undefined" ? "quakes" : readHash(),
  );

  useEffect(() => {
    const onHash = () => setHazardState(readHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const setHazard = (next: HazardId) => {
    setHazardState(next);
    const hash = `#/${next}`;
    if (window.location.hash !== hash) {
      window.history.replaceState(null, "", hash);
    }
  };

  return { hazard, setHazard };
}
