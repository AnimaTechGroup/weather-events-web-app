/// <reference types="vite/client" />

declare module "world-atlas/countries-110m.json";

interface ImportMetaEnv {
  readonly VITE_GOLD_API_URL: string;
  readonly VITE_GOLD_API_KEY: string;
  readonly VITE_GOLD_BASE_URL: string;
  readonly VITE_DATA_MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
