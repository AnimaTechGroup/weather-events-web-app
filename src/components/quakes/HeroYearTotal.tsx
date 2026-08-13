import { useLocale } from "@/context/LocaleContext";
import { formatCount, formatSeverity } from "@/lib/format";
import { isYearlyPublishHazard, yearOverYearDelta } from "@/lib/gold";
import type { GoldYearlyRow, HazardId } from "@/types/gold";

type HeroYearTotalProps = {
  hazard: HazardId;
  row: GoldYearlyRow;
  previousRow?: GoldYearlyRow;
  isPartialYear: boolean;
};

export function HeroYearTotal({ hazard, row, previousRow, isPartialYear }: HeroYearTotalProps) {
  const { t, localeTag } = useLocale();
  const closedYear = isYearlyPublishHazard(hazard);

  const comparison =
    previousRow &&
    (() => {
      const { delta, direction } = yearOverYearDelta(row.event_count, previousRow.event_count);
      if (closedYear) {
        if (direction === "same") {
          return { direction, text: t("hero.vsPriorYearSame", { year: previousRow.year }) };
        }
        return {
          direction,
          text: t(`hero.vsPriorYear${direction === "more" ? "More" : "Less"}`, {
            count: formatCount(delta, localeTag),
            year: previousRow.year,
          }),
        };
      }
      if (direction === "same") {
        return { direction, text: t("hero.vsLastYearSame", { year: previousRow.year }) };
      }
      return {
        direction,
        text: t(`hero.vsLastYear${direction === "more" ? "More" : "Less"}`, {
          count: formatCount(delta, localeTag),
          year: previousRow.year,
        }),
      };
    })();

  return (
    <section className="hero" id="this-year">
      <div className="wrap">
        <p className="eyebrow">{t(`hazard.${hazard}.eyebrow`)}</p>
        <h1>{t(`hazard.${hazard}.title`)}</h1>
        <p className="lede">{t(`hazard.${hazard}.lede`)}</p>

        <div className="hero-stat">
          <div>
            <p className="hero-stat__label">
              {t(closedYear ? "hero.yearLabel" : "hero.soFar", { year: row.year })}
            </p>
            <p className="hero-stat__value">{formatCount(row.event_count, localeTag)}</p>
            {comparison ? (
              <p className={`hero-compare hero-compare--${comparison.direction}`}>
                {comparison.text}
              </p>
            ) : null}
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
