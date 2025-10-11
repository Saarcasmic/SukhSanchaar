/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_ADMIN_TOKEN: string;
  readonly VITE_RAZORPAY_KEY_ID: string;
  readonly VITE_ADMIN_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
