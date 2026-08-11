import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  detectLocale,
  dictionaries,
  interpolate,
  localeTags,
  type Locale,
  type Messages,
} from "@/i18n";

type TranslateVars = Record<string, string | number>;

type LocaleContextValue = {
  locale: Locale;
  localeTag: string;
  messages: Messages;
  setLocale: (locale: Locale) => void;
  t: (path: string, vars?: TranslateVars) => string;
  countryName: (iso: string, fallback?: string) => string;
  regionName: (iso: string, fallback?: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readPath(messages: Messages, path: string): string {
  const value = path.split(".").reduce<unknown>((node, key) => {
    if (node && typeof node === "object" && key in node) {
      return (node as Record<string, unknown>)[key];
    }
    return undefined;
  }, messages);

  return typeof value === "string" ? value : path;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() =>
    typeof window === "undefined" ? "en" : detectLocale(),
  );

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = dictionaries[locale].meta.title;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute("content", dictionaries[locale].meta.description);
    localStorage.setItem("meridian.locale", locale);
  }, [locale]);

  const value = useMemo<LocaleContextValue>(() => {
    const messages = dictionaries[locale];
    return {
      locale,
      localeTag: localeTags[locale],
      messages,
      setLocale: setLocaleState,
      t: (path, vars) => interpolate(readPath(messages, path), vars),
      countryName: (iso, fallback) => messages.countries[iso] ?? fallback ?? iso,
      regionName: (iso, fallback) =>
        messages.countries[iso] ??
        messages.states[iso] ??
        messages.basins[iso] ??
        fallback ??
        iso,
    };
  }, [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used inside LocaleProvider");
  }
  return context;
}
