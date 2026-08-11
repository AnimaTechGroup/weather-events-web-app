import { useLocale } from "@/context/LocaleContext";
import { formatCount, formatSeverity } from "@/lib/format";
import type { GoldYearlyRow, HazardId } from "@/types/gold";

type HeroYearTotalProps = {
  hazard: HazardId;
  row: GoldYearlyRow;
  isPartialYear: boolean;
};

export function HeroYearTotal({ hazard, row, isPartialYear }: HeroYearTotalProps) {
  const { t, localeTag } = useLocale();

  return (
    <section className="hero" id="this-year">
      <div className="wrap">
        <p className="eyebrow">{t(`hazard.${hazard}.eyebrow`)}</p>
        <h1>{t(`hazard.${hazard}.title`)}</h1>
        <p className="lede">{t(`hazard.${hazard}.lede`)}</p>

        <div className="hero-stat">
          <div>
            <p className="hero-stat__label">{t("hero.soFar", { year: row.year })}</p>
            <p className="hero-stat__value">{formatCount(row.event_count, localeTag)}</p>
          </div>
          <div className="hero-stat__meta">
            <span className="chip">{t(`hazard.${hazard}.chip`)}</span>
            <span>
              {t(`hazard.${hazard}.strongest`, {
                severity: formatSeverity(hazard, row.max_severity),
              })}
            </span>
            <span>{isPartialYear ? t("hero.yearOpen") : t("hero.yearFull")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
