/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOLD_BASE_URL: string;
  readonly VITE_DATA_MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
