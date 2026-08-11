import type { HazardCopy, Messages } from "@/i18n/types";

const states: Messages["states"] = {
  TX: "Texas",
  OK: "Oklahoma",
  KS: "Kansas",
  AL: "Alabama",
  MS: "Mississippi",
  FL: "Florida",
  MO: "Missouri",
  IL: "Illinois",
  IA: "Iowa",
  NE: "Nebraska",
  AR: "Arkansas",
  LA: "Louisiana",
  GA: "Georgia",
  TN: "Tennessee",
  IN: "Indiana",
  OH: "Ohio",
  KY: "Kentucky",
  NC: "North Carolina",
  MN: "Minnesota",
  CO: "Colorado",
};

const basins: Messages["basins"] = {
  WP: "Western Pacific",
  EP: "Eastern Pacific",
  NA: "North Atlantic",
  SI: "South Indian",
  SP: "South Pacific",
  NI: "North Indian",
  SA: "South Atlantic",
};

const quakes: HazardCopy = {
  nav: "Earthquakes",
  chip: "M5+",
  eyebrow: "Worldwide · M5 and above",
  title: "How many earthquakes this year?",
  lede: "A quiet number first. Then the years behind it, then the country you care about. Brazil is the default.",
  strongest: "Strongest: {severity}",
  timelineEyebrow: "1950 to now",
  timelineTitle: "Earthquakes by year",
  timelineLede:
    "Each bar is the worldwide M5+ count for that year. Read left to right. Older decades look quieter mostly because fewer instruments existed — not because the Earth was calmer.",
  timelineNote:
    "From {year} onward the catalog is more complete. Treat the rise as better detection first, geology second. On a phone, swipe the chart sideways.",
  timelineCaption: "M5+ earthquakes recorded worldwide",
  barLabel: "{year}: {count} earthquakes",
  filterTitle: "This year in one country",
  filterLede:
    "Search a name, pick a country. Brazil is selected until you change it. Empty is a real answer — Brazil rarely hosts M5+ epicenters.",
  searchLabel: "Find a country",
  searchPlaceholder: "Brazil, Japan, Chile…",
  selectLabel: "Country",
  eventOne: "{count} M5+ earthquake with an epicenter in {name} during {year}.",
  eventMany: "{count} M5+ earthquakes with an epicenter in {name} during {year}.",
  empty: " None recorded in this gold slice — that can be correct.",
  share: " About {share}% of the world total this year. Strongest there: {severity}.",
  footer:
    "Counts are M5+ epicenters from the gold layer. Country is where the quake started, not where it was felt.",
};

const tornadoes: HazardCopy = {
  nav: "Tornadoes",
  chip: "US",
  eyebrow: "United States · SPC catalog",
  title: "How many tornadoes this year?",
  lede: "US reports only — there is no global tornado gold table. Texas is the default state.",
  strongest: "Strongest: {severity}",
  timelineEyebrow: "1950 to now · United States",
  timelineTitle: "Tornadoes by year",
  timelineLede:
    "Each bar is the US tornado count for that year. Later decades look busier mostly because of radar and spotters — not only because the weather changed.",
  timelineNote:
    "The official US database starts in 1950. Counts climb as reporting improves. Swipe the chart sideways on a phone.",
  timelineCaption: "Tornadoes recorded in the United States",
  barLabel: "{year}: {count} tornadoes",
  filterTitle: "This year in one state",
  filterLede:
    "Pick a US state. Texas is selected until you change it. This is not a worldwide tornado map.",
  searchLabel: "Find a state",
  searchPlaceholder: "Texas, Oklahoma, Kansas…",
  selectLabel: "State",
  eventOne: "{count} tornado with a touchdown in {name} during {year}.",
  eventMany: "{count} tornadoes with a touchdown in {name} during {year}.",
  empty: " None recorded in this gold slice — that can be correct.",
  share: " About {share}% of the US total this year. Strongest there: {severity}.",
  footer:
    "Counts are US tornadoes (SPC). There is no equivalent global tornado catalog in this app.",
};

const cyclones: HazardCopy = {
  nav: "Cyclones",
  chip: "Named",
  eyebrow: "Worldwide · named storms",
  title: "How many cyclones this year?",
  lede: "Named tropical cyclones in every basin. South Atlantic is the default — Brazil’s basin, usually empty.",
  strongest: "Strongest: {severity}",
  timelineEyebrow: "1950 to now",
  timelineTitle: "Cyclones by year",
  timelineLede:
    "Each bar is the global named-storm count. Pre-satellite years miss open-ocean storms, especially in the Southern Hemisphere.",
  timelineNote:
    "From {year} onward satellite coverage makes the global record much more complete. Swipe the chart sideways on a phone.",
  timelineCaption: "Named tropical cyclones worldwide",
  barLabel: "{year}: {count} cyclones",
  filterTitle: "This year in one basin",
  filterLede:
    "Filter by ocean basin. South Atlantic is selected first so a zero year is easy to see — that is normal.",
  searchLabel: "Find a basin",
  searchPlaceholder: "South Atlantic, West Pacific…",
  selectLabel: "Basin",
  eventOne: "{count} named cyclone in the {name} during {year}.",
  eventMany: "{count} named cyclones in the {name} during {year}.",
  empty: " None recorded in this gold slice — that can be correct.",
  share: " About {share}% of the world total this year. Strongest there: {severity}.",
  footer:
    "Counts are named tropical cyclones (IBTrACS-style). Basin is where the storm is tracked, not every landfall country.",
};

export const en: Messages = {
  meta: {
    title: "Meridian · Hazard record",
    description:
      "Meridian — earthquakes, US tornadoes, and tropical cyclones from 1950 to now.",
  },
  brand: {
    name: "Meridian",
    tagline: "Hazard record",
  },
  nav: {
    page: "Page",
    hazards: "Hazards",
    thisYear: "This year",
    timeline: "Timeline",
    country: "Filter",
    language: "Language",
  },
  hazard: { quakes, tornadoes, cyclones },
  status: {
    loading: "Loading the gold record…",
    missingYear: "Gold yearly table has no current year.",
  },
  hero: {
    soFar: "{year} so far",
    yearOpen: "Year still open",
    yearFull: "Full year",
  },
  country: {
    eyebrow: "Filter · {year}",
  },
  footer: {
    dataMock: "Data mocked to gold schema · {date}",
    dataLake: "Data from gold files · {date}",
  },
  countries: {
    JP: "Japan",
    ID: "Indonesia",
    CN: "China",
    US: "United States",
    CL: "Chile",
    PG: "Papua New Guinea",
    PH: "Philippines",
    PE: "Peru",
    RU: "Russia",
    MX: "Mexico",
    IR: "Iran",
    TR: "Turkey",
    NZ: "New Zealand",
    IN: "India",
    GR: "Greece",
    IT: "Italy",
    EC: "Ecuador",
    CO: "Colombia",
    AF: "Afghanistan",
    PK: "Pakistan",
    NP: "Nepal",
    AR: "Argentina",
    AU: "Australia",
    FJ: "Fiji",
    BR: "Brazil",
  },
  states,
  basins,
};
