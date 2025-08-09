import axios, { type AxiosInstance } from 'axios';
import { TMDB_KEY, TMDB_API_BASE } from '@shared/config/env';

export const createHttpClient = (): AxiosInstance => {
  const client = axios.create({ baseURL: TMDB_API_BASE });
  client.interceptors.request.use((config) => {
    const params = new URLSearchParams(
      config.params as unknown as Record<string, string>
    );
    if (TMDB_KEY) params.set('api_key', TMDB_KEY);
    return { ...config, params };
  });
  return client;
};
