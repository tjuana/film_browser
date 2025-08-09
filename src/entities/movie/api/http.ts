import axios, { type AxiosInstance } from 'axios';
import { TMDB_KEY } from '@shared/config/env';

const BASE_URL = 'https://api.themoviedb.org/3';

export const createHttpClient = (): AxiosInstance => {
  const client = axios.create({ baseURL: BASE_URL });
  client.interceptors.request.use((config) => {
    const params = new URLSearchParams(
      config.params as unknown as Record<string, string>
    );
    if (TMDB_KEY) params.set('api_key', TMDB_KEY);
    return { ...config, params };
  });
  return client;
};
