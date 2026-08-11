const trimSlash = (value: string) => value.replace(/\/+$/, "");

export const env = {
  goldBaseUrl: trimSlash(import.meta.env.VITE_GOLD_BASE_URL ?? ""),
  dataMode: (import.meta.env.VITE_DATA_MODE || "mock").toLowerCase(),
};

export const isRemoteGold = Boolean(env.goldBaseUrl);
