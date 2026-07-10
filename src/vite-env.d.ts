interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_ADMIN_EMAIL: string
  readonly VITE_ADMIN_PASSWORD: string
  // Ajoutez d'autres variables si nécessaire
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}