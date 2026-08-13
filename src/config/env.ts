const trimSlash = (value: string) => value.replace(/\/+$/, "");

export const env = {
  goldApiUrl: trimSlash(import.meta.env.VITE_GOLD_API_URL ?? ""),
  goldApiKey: import.meta.env.VITE_GOLD_API_KEY ?? "",
  goldBaseUrl: trimSlash(import.meta.env.VITE_GOLD_BASE_URL ?? ""),
  dataMode: (import.meta.env.VITE_DATA_MODE || "mock").toLowerCase(),
};

/** Private lake API — app key + CORS (no user login). */
export const isApiGold = Boolean(env.goldApiUrl && env.goldApiKey);

/** Legacy direct JSON URL (public CDN — avoid for private lake). */
export const isRemoteGold = Boolean(env.goldBaseUrl) && !isApiGold;

export const isMockGold = !isApiGold && !isRemoteGold;
