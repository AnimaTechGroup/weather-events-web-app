import { LanguageSwitch } from "@/components/layout/LanguageSwitch";
import { useLocale } from "@/context/LocaleContext";
import { HAZARDS, type HazardId } from "@/types/gold";

type SiteHeaderProps = {
  hazard: HazardId;
  onHazardChange: (hazard: HazardId) => void;
};

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function SiteHeader({ hazard, onHazardChange }: SiteHeaderProps) {
  const { t } = useLocale();

  return (
    <header className="site-header">
      <div className="wrap site-header__inner">
        <a className="brand" href="#top">
          <strong>{t("brand.name")}</strong>
          <span>{t("brand.tagline")}</span>
        </a>
        <div className="site-header__tools">
          <nav className="hazard-nav" aria-label={t("nav.hazards")}>
            {HAZARDS.map((id) => (
              <button
                key={id}
                type="button"
                className={id === hazard ? "is-active" : undefined}
                onClick={() => onHazardChange(id)}
              >
                {t(`hazard.${id}.nav`)}
              </button>
            ))}
          </nav>
          <nav className="nav" aria-label={t("nav.page")}>
            <a
              href="#this-year"
              onClick={(event) => {
                event.preventDefault();
                scrollToId("this-year");
              }}
            >
              {t("nav.thisYear")}
            </a>
            <a
              href="#timeline"
              onClick={(event) => {
                event.preventDefault();
                scrollToId("timeline");
              }}
            >
              {t("nav.timeline")}
            </a>
            <a
              href="#country"
              onClick={(event) => {
                event.preventDefault();
                scrollToId("country");
              }}
            >
              {t("nav.country")}
            </a>
          </nav>
          <LanguageSwitch />
        </div>
      </div>
    </header>
  );
}
