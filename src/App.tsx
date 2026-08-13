import { useEffect, useState } from "react";
import { CountryYearExplorer } from "@/components/quakes/CountryYearExplorer";
import { HeroYearTotal } from "@/components/quakes/HeroYearTotal";
import { RegionRanking } from "@/components/quakes/RegionRanking";
import { YearTimeline } from "@/components/quakes/YearTimeline";
import { HazardLoading } from "@/components/layout/HazardLoading";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { useLocale } from "@/context/LocaleContext";
import { useActiveHazard } from "@/hooks/useActiveHazard";
import { useHazardGold } from "@/hooks/useHazardGold";
import { rowForYear, isYearlyPublishHazard } from "@/lib/gold";

export function App() {
  const { t } = useLocale();
  const { hazard, setHazard } = useActiveHazard();
  const { state, yearlyDesc, regions, currentYear, defaultRegion } = useHazardGold(hazard);
  const [activeYear, setActiveYear] = useState(currentYear);
  const [regionIso, setRegionIso] = useState(defaultRegion);
  const [regionQuery, setRegionQuery] = useState("");

  useEffect(() => {
    setActiveYear(currentYear);
    setRegionIso(defaultRegion);
    setRegionQuery("");
  }, [currentYear, defaultRegion, hazard]);

  if (state.status === "loading") {
    return (
      <div className="app">
        <SiteHeader hazard={hazard} onHazardChange={setHazard} />
        <HazardLoading hazard={hazard} />
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="app">
        <SiteHeader hazard={hazard} onHazardChange={setHazard} />
        <p className="status">{state.message}</p>
      </div>
    );
  }

  const currentRow = rowForYear(state.data.yearly, currentYear);
  if (!currentRow) {
    return <p className="status">{t("status.missingYear")}</p>;
  }

  const previousRow = rowForYear(state.data.yearly, currentYear - 1);

  const selectRegionFromRanking = (iso: string) => {
    setRegionIso(iso);
    setRegionQuery("");
    document.getElementById("country")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="app" id="top">
      <SiteHeader hazard={hazard} onHazardChange={setHazard} />
      <main className="hazard-main" key={hazard}>
        <HeroYearTotal
          hazard={hazard}
          row={currentRow}
          previousRow={previousRow}
          isPartialYear={!isYearlyPublishHazard(hazard)}
        />
        <YearTimeline
          hazard={hazard}
          rows={yearlyDesc}
          activeYear={activeYear}
          onSelectYear={setActiveYear}
        />
        <CountryYearExplorer
          hazard={hazard}
          year={currentYear}
          regionIso={regionIso}
          query={regionQuery}
          regions={regions}
          yearly={state.data.yearly}
          byRegion={state.data.byRegion}
          onRegionChange={setRegionIso}
          onQueryChange={setRegionQuery}
        />
        <RegionRanking
          hazard={hazard}
          year={currentYear}
          yearly={state.data.yearly}
          byRegion={state.data.byRegion}
          selectedIso={regionIso}
          onSelectRegion={selectRegionFromRanking}
        />
      </main>
      <SiteFooter
        hazard={hazard}
        source={state.data.source}
        generatedAt={state.data.generatedAt}
      />
    </div>
  );
}
