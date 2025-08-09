type ViteEnv = {
  VITE_TMDB_TOKEN?: string;
  VITE_TMDB_KEY?: string;
  VITE_TMDB_API_BASE?: string;
  VITE_TMDB_IMAGE_BASE?: string;
};

const env = (import.meta as unknown as { env?: ViteEnv }).env ?? {};

export const TMDB_TOKEN = env.VITE_TMDB_TOKEN;
export const TMDB_KEY = env.VITE_TMDB_KEY;
export const TMDB_API_BASE =
  env.VITE_TMDB_API_BASE ?? 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE =
  env.VITE_TMDB_IMAGE_BASE ?? 'https://image.tmdb.org/t/p';

export const hasTmdb = () => Boolean(TMDB_TOKEN || TMDB_KEY);
