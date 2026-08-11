import { useLocale } from "@/context/LocaleContext";
import { LOCALES, localeLabels, type Locale } from "@/i18n";

export function LanguageSwitch() {
  const { locale, setLocale, t } = useLocale();

  return (
    <label className="lang-switch">
      <span className="visually-hidden">{t("nav.language")}</span>
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
        aria-label={t("nav.language")}
      >
        {LOCALES.map((code) => (
          <option key={code} value={code}>
            {localeLabels[code]}
          </option>
        ))}
      </select>
    </label>
  );
}
