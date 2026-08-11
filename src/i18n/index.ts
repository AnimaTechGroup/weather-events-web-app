import { en } from "@/i18n/locales/en";
import { es } from "@/i18n/locales/es";
import { fr } from "@/i18n/locales/fr";
import { pt } from "@/i18n/locales/pt";
import { LOCALES, type Locale, type Messages } from "@/i18n/types";

export const dictionaries: Record<Locale, Messages> = { en, pt, fr, es };

export const localeLabels: Record<Locale, string> = {
  en: "English",
  pt: "Português",
  fr: "Français",
  es: "Español",
};

export const localeTags: Record<Locale, string> = {
  en: "en-US",
  pt: "pt-BR",
  fr: "fr-FR",
  es: "es-ES",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function detectLocale(): Locale {
  const stored = localStorage.getItem("meridian.locale");
  if (stored && isLocale(stored)) return stored;

  const candidates = [navigator.language, ...(navigator.languages ?? [])];
  for (const candidate of candidates) {
    const base = candidate.toLowerCase().split("-")[0];
    if (isLocale(base)) return base;
  }
  return "en";
}

export function interpolate(
  template: string,
  vars?: Record<string, string | number>,
): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    vars[key] === undefined ? `{${key}}` : String(vars[key]),
  );
}

export { LOCALES };
export type { Locale, Messages };
