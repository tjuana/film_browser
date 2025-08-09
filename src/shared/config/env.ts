type ViteEnv = { VITE_TMDB_KEY?: string };
export const TMDB_KEY = (import.meta as unknown as { env?: ViteEnv }).env
  ?.VITE_TMDB_KEY;

export const hasTmdbKey = (): boolean =>
  typeof TMDB_KEY === 'string' && TMDB_KEY.length > 0;
