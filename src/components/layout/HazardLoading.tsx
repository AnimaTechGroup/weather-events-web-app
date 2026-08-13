import { useLocale } from "@/context/LocaleContext";
import type { HazardId } from "@/types/gold";

type HazardLoadingProps = {
  hazard: HazardId;
};

export function HazardLoading({ hazard }: HazardLoadingProps) {
  const { t } = useLocale();

  return (
    <div className="hazard-loading" role="status" aria-live="polite" aria-busy="true">
      <div className="hazard-loading__mark" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <p className="hazard-loading__label">{t("status.loading")}</p>
      <p className="hazard-loading__hazard">{t(`hazard.${hazard}.nav`)}</p>
    </div>
  );
}
