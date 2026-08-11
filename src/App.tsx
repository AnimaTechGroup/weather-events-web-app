import { useEffect, useState } from "react";
import { CountryYearExplorer } from "@/components/quakes/CountryYearExplorer";
import { HeroYearTotal } from "@/components/quakes/HeroYearTotal";
import { YearTimeline } from "@/components/quakes/YearTimeline";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { useLocale } from "@/context/LocaleContext";
import { useActiveHazard } from "@/hooks/useActiveHazard";
import { useHazardGold } from "@/hooks/useHazardGold";
import { rowForYear } from "@/lib/gold";

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
        <p className="status">{t("status.loading")}</p>
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

  return (
    <div className="app" id="top">
      <SiteHeader hazard={hazard} onHazardChange={setHazard} />
      <main>
        <HeroYearTotal hazard={hazard} row={currentRow} isPartialYear />
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
      </main>
      <SiteFooter
        hazard={hazard}
        source={state.data.source}
        generatedAt={state.data.generatedAt}
      />
    </div>
  );
}
