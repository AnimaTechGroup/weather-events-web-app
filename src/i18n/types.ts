export const LOCALES = ["en", "pt", "fr", "es"] as const;

export type Locale = (typeof LOCALES)[number];

export type HazardCopy = {
  nav: string;
  chip: string;
  eyebrow: string;
  title: string;
  lede: string;
  strongest: string;
  timelineEyebrow: string;
  timelineTitle: string;
  timelineLede: string;
  timelineNote: string;
  timelineCaption: string;
  barLabel: string;
  filterTitle: string;
  filterLede: string;
  searchLabel: string;
  searchPlaceholder: string;
  selectLabel: string;
  eventOne: string;
  eventMany: string;
  empty: string;
  share: string;
  footer: string;
};

export type Messages = {
  meta: {
    title: string;
    description: string;
  };
  brand: {
    name: string;
    tagline: string;
  };
  nav: {
    page: string;
    hazards: string;
    thisYear: string;
    timeline: string;
    country: string;
    language: string;
  };
  hazard: {
    quakes: HazardCopy;
    tornadoes: HazardCopy;
    cyclones: HazardCopy;
  };
  status: {
    loading: string;
    missingYear: string;
  };
  hero: {
    soFar: string;
    yearOpen: string;
    yearFull: string;
  };
  country: {
    eyebrow: string;
  };
  footer: {
    dataMock: string;
    dataLake: string;
  };
  countries: Record<string, string>;
  states: Record<string, string>;
  basins: Record<string, string>;
};
