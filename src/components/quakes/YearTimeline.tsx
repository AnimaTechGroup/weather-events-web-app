import { useMemo, type CSSProperties } from "react";
import { useLocale } from "@/context/LocaleContext";
import { niceCeil, yTicks } from "@/lib/chartScale";
import { formatCount } from "@/lib/format";
import { SATELLITE_ERA_YEAR } from "@/lib/gold";
import type { GoldYearlyRow, HazardId } from "@/types/gold";

type YearTimelineProps = {
  hazard: HazardId;
  rows: GoldYearlyRow[];
  activeYear: number;
  onSelectYear: (year: number) => void;
};

function shouldLabelYear(year: number, first: number, last: number): boolean {
  return year === first || year === last || year === SATELLITE_ERA_YEAR || year % 10 === 0;
}

export function YearTimeline({ hazard, rows, activeYear, onSelectYear }: YearTimelineProps) {
  const { t, localeTag } = useLocale();
  const yearsDesc = useMemo(
    () => [...rows].sort((left, right) => right.year - left.year),
    [rows],
  );

  const maxCount = Math.max(...yearsDesc.map((row) => row.event_count), 1);
  const yMax = niceCeil(maxCount);
  const ticks = yTicks(yMax).reverse();
  const firstYear = yearsDesc[yearsDesc.length - 1]?.year ?? 1950;
  const lastYear = yearsDesc[0]?.year ?? 2026;

  return (
    <section className="section" id="timeline">
      <div className="wrap">
        <div className="section__head">
          <p className="eyebrow">{t(`hazard.${hazard}.timelineEyebrow`)}</p>
          <h2>{t(`hazard.${hazard}.timelineTitle`)}</h2>
          <p>{t(`hazard.${hazard}.timelineLede`)}</p>
        </div>

        <p className="note">{t(`hazard.${hazard}.timelineNote`, { year: SATELLITE_ERA_YEAR })}</p>

        <figure className="year-chart">
          <figcaption className="year-chart__caption">{t(`hazard.${hazard}.timelineCaption`)}</figcaption>

          <div className="year-chart__frame">
            <div className="year-chart__y" aria-hidden="true">
              {ticks.map((tick) => (
                <span key={tick}>{formatCount(tick, localeTag)}</span>
              ))}
            </div>

            <div className="year-chart__scroll">
              <div
                className="year-chart__plot"
                style={{ "--bar-count": yearsDesc.length } as CSSProperties}
              >
                <div className="year-chart__grid" aria-hidden="true">
                  {ticks.map((tick) => (
                    <span key={tick} />
                  ))}
                </div>

                <div className="year-chart__bars">
                  {yearsDesc.map((row) => {
                    const height = Math.max(2, (row.event_count / yMax) * 100);
                    const labeled =
                      shouldLabelYear(row.year, firstYear, lastYear) || row.year === activeYear;

                    return (
                      <button
                        key={row.year}
                        type="button"
                        className={`year-chart__col${row.year === activeYear ? " is-active" : ""}`}
                        style={{ "--bar-h": `${height}%` } as CSSProperties}
                        onClick={() => onSelectYear(row.year)}
                        aria-pressed={row.year === activeYear}
                        aria-label={t(`hazard.${hazard}.barLabel`, {
                          year: row.year,
                          count: formatCount(row.event_count, localeTag),
                        })}
                      >
                        <span className="year-chart__tip" aria-hidden="true">
                          {t(`hazard.${hazard}.barTip`, {
                            count: formatCount(row.event_count, localeTag),
                          })}
                        </span>
                        <span className="year-chart__bar" />
                        <span className={`year-chart__x${labeled ? " is-on" : ""}`}>
                          {row.year}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
