type ViteEnv = {
  VITE_TMDB_TOKEN?: string;
  VITE_TMDB_KEY?: string;
  VITE_TMDB_API_BASE?: string;
  VITE_TMDB_IMAGE_BASE?: string;
};

type ServerEnv = {
  NODE_ENV?: string;
  PORT?: string;
  [key: string]: string | undefined;
};

// Client-side environment (Vite)
const clientEnv = (import.meta as unknown as { env?: ViteEnv }).env ?? {};

// Server-side environment (Node.js)
const serverEnv =
  typeof process !== 'undefined' ? (process.env as ServerEnv) : {};

// Use server env if available, fallback to client env
const env = { ...clientEnv, ...serverEnv };

export const TMDB_TOKEN = env.VITE_TMDB_TOKEN;
export const TMDB_KEY = env.VITE_TMDB_KEY;
export const TMDB_API_BASE =
  env.VITE_TMDB_API_BASE ?? 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE =
  env.VITE_TMDB_IMAGE_BASE ?? 'https://image.tmdb.org/t/p';

export const hasTmdb = () => Boolean(TMDB_TOKEN || TMDB_KEY);

// Environment detection helpers
export const isServer = typeof window === 'undefined';
export const isClient = typeof window !== 'undefined';
export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';
