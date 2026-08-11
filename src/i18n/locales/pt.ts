import type { HazardCopy, Messages } from "@/i18n/types";

const states: Messages["states"] = {
  TX: "Texas",
  OK: "Oklahoma",
  KS: "Kansas",
  AL: "Alabama",
  MS: "Mississippi",
  FL: "Flórida",
  MO: "Missouri",
  IL: "Illinois",
  IA: "Iowa",
  NE: "Nebraska",
  AR: "Arkansas",
  LA: "Louisiana",
  GA: "Geórgia",
  TN: "Tennessee",
  IN: "Indiana",
  OH: "Ohio",
  KY: "Kentucky",
  NC: "Carolina do Norte",
  MN: "Minnesota",
  CO: "Colorado",
};

const basins: Messages["basins"] = {
  WP: "Pacífico Ocidental",
  EP: "Pacífico Oriental",
  NA: "Atlântico Norte",
  SI: "Índico Sul",
  SP: "Pacífico Sul",
  NI: "Índico Norte",
  SA: "Atlântico Sul",
};

const quakes: HazardCopy = {
  nav: "Terremotos",
  chip: "M5+",
  eyebrow: "Mundo · M5 ou mais",
  title: "Quantos terremotos neste ano?",
  lede: "Primeiro um número calmo. Depois os anos anteriores e o país que importa. O Brasil é o padrão.",
  strongest: "Mais forte: {severity}",
  timelineEyebrow: "1950 até agora",
  timelineTitle: "Terremotos por ano",
  timelineLede:
    "Cada barra é a contagem mundial de M5+ naquele ano. Leia da esquerda para a direita. Décadas antigas parecem mais quietas sobretudo porque havia menos instrumentos — não porque a Terra estava mais calma.",
  timelineNote:
    "A partir de {year} o catálogo fica mais completo. Trate a alta como melhor detecção primeiro, geologia depois. No celular, deslize o gráfico para o lado.",
  timelineCaption: "Terremotos M5+ registrados no mundo",
  barLabel: "{year}: {count} terremotos",
  filterTitle: "Este ano em um país",
  filterLede:
    "Busque um nome e escolha o país. O Brasil fica selecionado até você mudar. Zero também é resposta — o Brasil raramente tem epicentros M5+.",
  searchLabel: "Buscar um país",
  searchPlaceholder: "Brasil, Japão, Chile…",
  selectLabel: "País",
  eventOne: "{count} terremoto M5+ com epicentro em {name} em {year}.",
  eventMany: "{count} terremotos M5+ com epicentro em {name} em {year}.",
  empty: " Nenhum registro neste recorte gold — isso pode estar correto.",
  share: " Cerca de {share}% do total mundial neste ano. O mais forte ali: {severity}.",
  footer:
    "As contagens são epicentros M5+ da camada gold. O país é onde o terremoto começou, não onde foi sentido.",
};

const tornadoes: HazardCopy = {
  nav: "Tornados",
  chip: "EUA",
  eyebrow: "Estados Unidos · catálogo SPC",
  title: "Quantos tornados neste ano?",
  lede: "Só relatórios dos EUA — não há gold global de tornados. O Texas é o estado padrão.",
  strongest: "Mais forte: {severity}",
  timelineEyebrow: "1950 até agora · Estados Unidos",
  timelineTitle: "Tornados por ano",
  timelineLede:
    "Cada barra é a contagem de tornados nos EUA. Décadas recentes parecem mais cheias sobretudo por radar e observadores — não só porque o clima mudou.",
  timelineNote:
    "O banco oficial dos EUA começa em 1950. As contagens sobem com a melhoria dos relatos. No celular, deslize o gráfico.",
  timelineCaption: "Tornados registrados nos Estados Unidos",
  barLabel: "{year}: {count} tornados",
  filterTitle: "Este ano em um estado",
  filterLede:
    "Escolha um estado dos EUA. O Texas fica selecionado até você mudar. Isto não é um mapa mundial de tornados.",
  searchLabel: "Buscar um estado",
  searchPlaceholder: "Texas, Oklahoma, Kansas…",
  selectLabel: "Estado",
  eventOne: "{count} tornado com toque em {name} em {year}.",
  eventMany: "{count} tornados com toque em {name} em {year}.",
  empty: " Nenhum registro neste recorte gold — isso pode estar correto.",
  share: " Cerca de {share}% do total dos EUA neste ano. O mais forte ali: {severity}.",
  footer:
    "As contagens são tornados dos EUA (SPC). Não há catálogo global equivalente neste app.",
};

const cyclones: HazardCopy = {
  nav: "Ciclones",
  chip: "Nomeados",
  eyebrow: "Mundo · tempestades nomeadas",
  title: "Quantos ciclones neste ano?",
  lede: "Ciclones tropicais nomeados em todas as bacias. O Atlântico Sul é o padrão — a bacia do Brasil, em geral vazia.",
  strongest: "Mais forte: {severity}",
  timelineEyebrow: "1950 até agora",
  timelineTitle: "Ciclones por ano",
  timelineLede:
    "Cada barra é a contagem global de tempestades nomeadas. Antes dos satélites, muitos ciclones em mar aberto não entram no registro, sobretudo no Hemisfério Sul.",
  timelineNote:
    "A partir de {year} a cobertura por satélite deixa o registro global bem mais completo. No celular, deslize o gráfico.",
  timelineCaption: "Ciclones tropicais nomeados no mundo",
  barLabel: "{year}: {count} ciclones",
  filterTitle: "Este ano em uma bacia",
  filterLede:
    "Filtre por bacia oceânica. O Atlântico Sul vem primeiro para um ano zerado ser fácil de ver — isso é normal.",
  searchLabel: "Buscar uma bacia",
  searchPlaceholder: "Atlântico Sul, Pacífico Ocidental…",
  selectLabel: "Bacia",
  eventOne: "{count} ciclone nomeado no {name} em {year}.",
  eventMany: "{count} ciclones nomeados no {name} em {year}.",
  empty: " Nenhum registro neste recorte gold — isso pode estar correto.",
  share: " Cerca de {share}% do total mundial neste ano. O mais forte ali: {severity}.",
  footer:
    "As contagens são ciclones tropicais nomeados (estilo IBTrACS). A bacia é onde a tempestade é rastreada, não todo país de landfall.",
};

export const pt: Messages = {
  meta: {
    title: "Meridian · Registro de riscos",
    description:
      "Meridian — terremotos, tornados dos EUA e ciclones tropicais de 1950 até agora.",
  },
  brand: {
    name: "Meridian",
    tagline: "Registro de riscos",
  },
  nav: {
    page: "Página",
    hazards: "Riscos",
    thisYear: "Este ano",
    timeline: "Linha do tempo",
    country: "Filtro",
    language: "Idioma",
  },
  hazard: { quakes, tornadoes, cyclones },
  status: {
    loading: "Carregando o registro gold…",
    missingYear: "A tabela anual gold não tem o ano atual.",
  },
  hero: {
    soFar: "{year} até agora",
    yearOpen: "Ano ainda em curso",
    yearFull: "Ano completo",
  },
  country: {
    eyebrow: "Filtro · {year}",
  },
  footer: {
    dataMock: "Dados simulados no schema gold · {date}",
    dataLake: "Dados dos arquivos gold · {date}",
  },
  countries: {
    JP: "Japão",
    ID: "Indonésia",
    CN: "China",
    US: "Estados Unidos",
    CL: "Chile",
    PG: "Papua-Nova Guiné",
    PH: "Filipinas",
    PE: "Peru",
    RU: "Rússia",
    MX: "México",
    IR: "Irã",
    TR: "Turquia",
    NZ: "Nova Zelândia",
    IN: "Índia",
    GR: "Grécia",
    IT: "Itália",
    EC: "Equador",
    CO: "Colômbia",
    AF: "Afeganistão",
    PK: "Paquistão",
    NP: "Nepal",
    AR: "Argentina",
    AU: "Austrália",
    FJ: "Fiji",
    BR: "Brasil",
  },
  states,
  basins,
};
