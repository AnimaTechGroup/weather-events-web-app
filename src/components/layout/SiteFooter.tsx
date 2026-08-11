import { useLocale } from "@/context/LocaleContext";
import { formatDate } from "@/lib/format";
import type { HazardId } from "@/types/gold";

type SiteFooterProps = {
  hazard: HazardId;
  source: "mock" | "remote";
  generatedAt: string;
};

export function SiteFooter({ hazard, source, generatedAt }: SiteFooterProps) {
  const { t, localeTag } = useLocale();
  const date = formatDate(generatedAt, localeTag);

  return (
    <footer className="site-footer">
      <div className="wrap">
        <span>{t(`hazard.${hazard}.footer`)}</span>
        <span>{t(source === "mock" ? "footer.dataMock" : "footer.dataLake", { date })}</span>
      </div>
    </footer>
  );
}
