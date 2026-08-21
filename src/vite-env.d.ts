/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_CLIENT_ID?: string;
  readonly VITE_APP_URL?: string;
  readonly VITE_DATA_MODE?: string;
  readonly VITE_DAILY_TIMEZONE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
