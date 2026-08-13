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
  barTip: string;
  filterTitle: string;
  filterLede: string;
  searchLabel: string;
  searchPlaceholder: string;
  selectLabel: string;
  eventOne: string;
  eventMany: string;
  empty: string;
  share: string;
  rankEyebrow: string;
  rankTitle: string;
  rankLede: string;
  rankCaption: string;
  rankRowLabel: string;
  rankEmpty: string;
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
    lastYear: string;
    timeline: string;
    country: string;
    places: string;
    language: string;
  };
  map: {
    title: string;
    hint: string;
    reset: string;
    zoomIn: string;
    zoomOut: string;
    legendZero: string;
    legendMore: string;
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
    yearLabel: string;
    yearOpen: string;
    yearFull: string;
    vsLastYearMore: string;
    vsLastYearLess: string;
    vsLastYearSame: string;
    vsPriorYearMore: string;
    vsPriorYearLess: string;
    vsPriorYearSame: string;
  };
  country: {
    eyebrow: string;
  };
  footer: {
    dataMock: string;
    dataLake: string;
  };
  auth: {
    title: string;
    lede: string;
    email: string;
    password: string;
    signIn: string;
    signingIn: string;
    signOut: string;
    loginFailed: string;
  };
  countries: Record<string, string>;
  states: Record<string, string>;
  basins: Record<string, string>;
};
