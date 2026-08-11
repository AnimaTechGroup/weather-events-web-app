import type { HazardCopy, Messages } from "@/i18n/types";

const states: Messages["states"] = {
  TX: "Texas",
  OK: "Oklahoma",
  KS: "Kansas",
  AL: "Alabama",
  MS: "Misisipi",
  FL: "Florida",
  MO: "Misuri",
  IL: "Illinois",
  IA: "Iowa",
  NE: "Nebraska",
  AR: "Arkansas",
  LA: "Luisiana",
  GA: "Georgia",
  TN: "Tennessee",
  IN: "Indiana",
  OH: "Ohio",
  KY: "Kentucky",
  NC: "Carolina del Norte",
  MN: "Minnesota",
  CO: "Colorado",
};

const basins: Messages["basins"] = {
  WP: "Pacífico occidental",
  EP: "Pacífico oriental",
  NA: "Atlántico norte",
  SI: "Índico sur",
  SP: "Pacífico sur",
  NI: "Índico norte",
  SA: "Atlántico sur",
};

const quakes: HazardCopy = {
  nav: "Terremotos",
  chip: "M5+",
  eyebrow: "Mundial · M5 o más",
  title: "¿Cuántos terremotos este año?",
  lede: "Primero un número quieto. Luego los años anteriores y el país que te importa. Brasil es el valor por defecto.",
  strongest: "Más fuerte: {severity}",
  timelineEyebrow: "1950 hasta ahora",
  timelineTitle: "Terremotos por año",
  timelineLede:
    "Cada barra es el recuento mundial M5+ de ese año. Se lee de izquierda a derecha. Las décadas antiguas parecen más tranquilas sobre todo porque había menos instrumentos — no porque la Tierra lo estuviera.",
  timelineNote:
    "Desde {year} el catálogo es más completo. Trate el aumento como mejor detección primero, geología después. En el móvil, deslice el gráfico.",
  timelineCaption: "Terremotos M5+ registrados en el mundo",
  barLabel: "{year}: {count} terremotos",
  filterTitle: "Este año en un país",
  filterLede:
    "Busca un nombre y elige el país. Brasil queda seleccionado hasta que lo cambies. Cero también es una respuesta: Brasil rara vez tiene epicentros M5+.",
  searchLabel: "Buscar un país",
  searchPlaceholder: "Brasil, Japón, Chile…",
  selectLabel: "País",
  eventOne: "{count} terremoto M5+ con epicentro en {name} en {year}.",
  eventMany: "{count} terremotos M5+ con epicentro en {name} en {year}.",
  empty: " Ninguno en este recorte gold: eso puede ser correcto.",
  share: " Un {share}% del total mundial de este año. El más fuerte allí: {severity}.",
  footer:
    "Los recuentos son epicentros M5+ de la capa gold. El país es donde empezó el terremoto, no donde se sintió.",
};

const tornadoes: HazardCopy = {
  nav: "Tornados",
  chip: "EE. UU.",
  eyebrow: "Estados Unidos · catálogo SPC",
  title: "¿Cuántos tornados este año?",
  lede: "Solo informes de EE. UU.: no hay gold mundial de tornados. Texas es el estado por defecto.",
  strongest: "Más fuerte: {severity}",
  timelineEyebrow: "1950 hasta ahora · Estados Unidos",
  timelineTitle: "Tornados por año",
  timelineLede:
    "Cada barra es el recuento de tornados en EE. UU. Las décadas recientes parecen más llenas sobre todo por el radar y los observadores.",
  timelineNote:
    "La base oficial de EE. UU. empieza en 1950. Los recuentos suben al mejorar los reportes. En el móvil, deslice el gráfico.",
  timelineCaption: "Tornados registrados en Estados Unidos",
  barLabel: "{year}: {count} tornados",
  filterTitle: "Este año en un estado",
  filterLede:
    "Elige un estado de EE. UU. Texas queda seleccionado hasta que lo cambies. Esto no es un mapa mundial de tornados.",
  searchLabel: "Buscar un estado",
  searchPlaceholder: "Texas, Oklahoma, Kansas…",
  selectLabel: "Estado",
  eventOne: "{count} tornado con toque en {name} en {year}.",
  eventMany: "{count} tornados con toque en {name} en {year}.",
  empty: " Ninguno en este recorte gold: eso puede ser correcto.",
  share: " Un {share}% del total de EE. UU. este año. El más fuerte allí: {severity}.",
  footer:
    "Los recuentos son tornados de EE. UU. (SPC). No hay un catálogo mundial equivalente en esta app.",
};

const cyclones: HazardCopy = {
  nav: "Ciclones",
  chip: "Nombrados",
  eyebrow: "Mundial · tormentas nombradas",
  title: "¿Cuántos ciclones este año?",
  lede: "Ciclones tropicales nombrados en todas las cuencas. El Atlántico sur es el valor por defecto: la cuenca de Brasil, casi siempre vacía.",
  strongest: "Más fuerte: {severity}",
  timelineEyebrow: "1950 hasta ahora",
  timelineTitle: "Ciclones por año",
  timelineLede:
    "Cada barra es el recuento mundial de tormentas nombradas. Antes de los satélites faltan muchos sistemas en mar abierto, sobre todo en el hemisferio sur.",
  timelineNote:
    "Desde {year} la cobertura satelital hace el registro mundial mucho más completo. En el móvil, deslice el gráfico.",
  timelineCaption: "Ciclones tropicales nombrados en el mundo",
  barLabel: "{year}: {count} ciclones",
  filterTitle: "Este año en una cuenca",
  filterLede:
    "Filtra por cuenca oceánica. El Atlántico sur va primero para que un año en cero se vea fácil: eso es normal.",
  searchLabel: "Buscar una cuenca",
  searchPlaceholder: "Atlántico sur, Pacífico occidental…",
  selectLabel: "Cuenca",
  eventOne: "{count} ciclón nombrado en el {name} en {year}.",
  eventMany: "{count} ciclones nombrados en el {name} en {year}.",
  empty: " Ninguno en este recorte gold: eso puede ser correcto.",
  share: " Un {share}% del total mundial de este año. El más fuerte allí: {severity}.",
  footer:
    "Los recuentos son ciclones tropicales nombrados (estilo IBTrACS). La cuenca es donde se sigue la tormenta, no cada país de landfall.",
};

export const es: Messages = {
  meta: {
    title: "Meridian · Registro de peligros",
    description:
      "Meridian — terremotos, tornados de EE. UU. y ciclones tropicales desde 1950.",
  },
  brand: {
    name: "Meridian",
    tagline: "Registro de peligros",
  },
  nav: {
    page: "Página",
    hazards: "Peligros",
    thisYear: "Este año",
    timeline: "Línea de tiempo",
    country: "Filtro",
    language: "Idioma",
  },
  hazard: { quakes, tornadoes, cyclones },
  status: {
    loading: "Cargando el registro gold…",
    missingYear: "La tabla anual gold no tiene el año actual.",
  },
  hero: {
    soFar: "{year} hasta ahora",
    yearOpen: "Año aún abierto",
    yearFull: "Año completo",
  },
  country: {
    eyebrow: "Filtro · {year}",
  },
  footer: {
    dataMock: "Datos simulados al esquema gold · {date}",
    dataLake: "Datos de los archivos gold · {date}",
  },
  countries: {
    JP: "Japón",
    ID: "Indonesia",
    CN: "China",
    US: "Estados Unidos",
    CL: "Chile",
    PG: "Papúa Nueva Guinea",
    PH: "Filipinas",
    PE: "Perú",
    RU: "Rusia",
    MX: "México",
    IR: "Irán",
    TR: "Turquía",
    NZ: "Nueva Zelanda",
    IN: "India",
    GR: "Grecia",
    IT: "Italia",
    EC: "Ecuador",
    CO: "Colombia",
    AF: "Afganistán",
    PK: "Pakistán",
    NP: "Nepal",
    AR: "Argentina",
    AU: "Australia",
    FJ: "Fiyi",
    BR: "Brasil",
  },
  states,
  basins,
};
