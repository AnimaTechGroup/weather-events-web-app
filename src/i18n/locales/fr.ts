import type { HazardCopy, Messages } from "@/i18n/types";

const states: Messages["states"] = {
  TX: "Texas",
  OK: "Oklahoma",
  KS: "Kansas",
  AL: "Alabama",
  MS: "Mississippi",
  FL: "Floride",
  MO: "Missouri",
  IL: "Illinois",
  IA: "Iowa",
  NE: "Nebraska",
  AR: "Arkansas",
  LA: "Louisiane",
  GA: "Géorgie",
  TN: "Tennessee",
  IN: "Indiana",
  OH: "Ohio",
  KY: "Kentucky",
  NC: "Caroline du Nord",
  MN: "Minnesota",
  CO: "Colorado",
};

const basins: Messages["basins"] = {
  WP: "Pacifique ouest",
  EP: "Pacifique est",
  NA: "Atlantique nord",
  SI: "océan Indien sud",
  SP: "Pacifique sud",
  NI: "océan Indien nord",
  SA: "Atlantique sud",
};

const quakes: HazardCopy = {
  nav: "Séismes",
  chip: "M5+",
  eyebrow: "Monde · M5 et plus",
  title: "Combien de séismes cette année ?",
  lede: "D’abord un chiffre calme. Puis les années précédentes, puis le pays qui vous concerne. Le Brésil est sélectionné par défaut.",
  strongest: "Le plus fort : {severity}",
  timelineEyebrow: "1950 à aujourd’hui",
  timelineTitle: "Séismes par année",
  timelineLede:
    "Chaque barre est le total mondial M5+ de cette année. Lisez de gauche à droite. Les décennies anciennes semblent plus calmes surtout faute d’instruments — pas parce que la Terre l’était.",
  timelineNote:
    "À partir de {year}, le catalogue est plus complet. Voyez d’abord une meilleure détection, ensuite la géologie. Sur téléphone, faites glisser le graphique.",
  timelineCaption: "Séismes M5+ enregistrés dans le monde",
  barLabel: "{year} : {count} séismes",
  filterTitle: "Cette année dans un pays",
  filterLede:
    "Cherchez un nom, choisissez un pays. Le Brésil reste sélectionné tant que vous ne changez pas. Un zéro est une vraie réponse — le Brésil accueille rarement des épicentres M5+.",
  searchLabel: "Trouver un pays",
  searchPlaceholder: "Brésil, Japon, Chili…",
  selectLabel: "Pays",
  eventOne: "{count} séisme M5+ avec épicentre en {name} en {year}.",
  eventMany: "{count} séismes M5+ avec épicentre en {name} en {year}.",
  empty: " Aucun enregistrement dans cette coupe gold — cela peut être exact.",
  share: " Environ {share} % du total mondial cette année. Le plus fort là-bas : {severity}.",
  footer:
    "Les totaux sont des épicentres M5+ de la couche gold. Le pays est le lieu de départ, pas celui où le séisme a été ressenti.",
};

const tornadoes: HazardCopy = {
  nav: "Tornades",
  chip: "USA",
  eyebrow: "États-Unis · catalogue SPC",
  title: "Combien de tornades cette année ?",
  lede: "Rapports américains seulement — il n’existe pas de gold mondial des tornades. Le Texas est l’État par défaut.",
  strongest: "La plus forte : {severity}",
  timelineEyebrow: "1950 à aujourd’hui · États-Unis",
  timelineTitle: "Tornades par année",
  timelineLede:
    "Chaque barre est le total des tornades aux États-Unis. Les décennies récentes semblent plus denses surtout grâce aux radars et aux observateurs.",
  timelineNote:
    "La base officielle américaine commence en 1950. Les totaux montent avec de meilleurs signalements. Faites glisser le graphique sur téléphone.",
  timelineCaption: "Tornades enregistrées aux États-Unis",
  barLabel: "{year} : {count} tornades",
  filterTitle: "Cette année dans un État",
  filterLede:
    "Choisissez un État américain. Le Texas reste sélectionné tant que vous ne changez pas. Ce n’est pas une carte mondiale des tornades.",
  searchLabel: "Trouver un État",
  searchPlaceholder: "Texas, Oklahoma, Kansas…",
  selectLabel: "État",
  eventOne: "{count} tornade avec atterrissage en {name} en {year}.",
  eventMany: "{count} tornades avec atterrissage en {name} en {year}.",
  empty: " Aucun enregistrement dans cette coupe gold — cela peut être exact.",
  share: " Environ {share} % du total américain cette année. La plus forte là-bas : {severity}.",
  footer:
    "Les totaux sont des tornades américaines (SPC). Pas de catalogue mondial équivalent dans cette appli.",
};

const cyclones: HazardCopy = {
  nav: "Cyclones",
  chip: "Nommés",
  eyebrow: "Monde · tempêtes nommées",
  title: "Combien de cyclones cette année ?",
  lede: "Cyclones tropicaux nommés dans tous les bassins. L’Atlantique sud est le défaut — le bassin du Brésil, souvent vide.",
  strongest: "Le plus fort : {severity}",
  timelineEyebrow: "1950 à aujourd’hui",
  timelineTitle: "Cyclones par année",
  timelineLede:
    "Chaque barre est le total mondial des tempêtes nommées. Avant les satellites, beaucoup de systèmes en pleine mer manquent, surtout dans l’hémisphère sud.",
  timelineNote:
    "À partir de {year}, la couverture satellite rend le registre mondial bien plus complet. Faites glisser le graphique sur téléphone.",
  timelineCaption: "Cyclones tropicaux nommés dans le monde",
  barLabel: "{year} : {count} cyclones",
  filterTitle: "Cette année dans un bassin",
  filterLede:
    "Filtrez par bassin océanique. L’Atlantique sud est sélectionné d’abord pour qu’une année à zéro soit visible — c’est normal.",
  searchLabel: "Trouver un bassin",
  searchPlaceholder: "Atlantique sud, Pacifique ouest…",
  selectLabel: "Bassin",
  eventOne: "{count} cyclone nommé dans le {name} en {year}.",
  eventMany: "{count} cyclones nommés dans le {name} en {year}.",
  empty: " Aucun enregistrement dans cette coupe gold — cela peut être exact.",
  share: " Environ {share} % du total mondial cette année. Le plus fort là-bas : {severity}.",
  footer:
    "Les totaux sont des cyclones tropicaux nommés (style IBTrACS). Le bassin est la zone de suivi, pas chaque pays d’atterrissage.",
};

export const fr: Messages = {
  meta: {
    title: "Meridian · Chronique des aléas",
    description:
      "Meridian — séismes, tornades américaines et cyclones tropicaux de 1950 à aujourd’hui.",
  },
  brand: {
    name: "Meridian",
    tagline: "Chronique des aléas",
  },
  nav: {
    page: "Page",
    hazards: "Aléas",
    thisYear: "Cette année",
    timeline: "Frise",
    country: "Filtre",
    language: "Langue",
  },
  hazard: { quakes, tornadoes, cyclones },
  status: {
    loading: "Chargement du registre gold…",
    missingYear: "La table annuelle gold n’a pas l’année en cours.",
  },
  hero: {
    soFar: "{year} jusqu’ici",
    yearOpen: "Année encore ouverte",
    yearFull: "Année complète",
  },
  country: {
    eyebrow: "Filtre · {year}",
  },
  footer: {
    dataMock: "Données simulées au schéma gold · {date}",
    dataLake: "Données des fichiers gold · {date}",
  },
  countries: {
    JP: "Japon",
    ID: "Indonésie",
    CN: "Chine",
    US: "États-Unis",
    CL: "Chili",
    PG: "Papouasie-Nouvelle-Guinée",
    PH: "Philippines",
    PE: "Pérou",
    RU: "Russie",
    MX: "Mexique",
    IR: "Iran",
    TR: "Turquie",
    NZ: "Nouvelle-Zélande",
    IN: "Inde",
    GR: "Grèce",
    IT: "Italie",
    EC: "Équateur",
    CO: "Colombie",
    AF: "Afghanistan",
    PK: "Pakistan",
    NP: "Népal",
    AR: "Argentine",
    AU: "Australie",
    FJ: "Fidji",
    BR: "Brésil",
  },
  states,
  basins,
};
