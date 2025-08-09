import type { MoviesService } from './types';
import { mapBrief, mapMovie } from './mappers';
import { createHttpClient } from './http';

export const createLiveMoviesService = (): MoviesService => {
  const http = createHttpClient();
  return {
    kind: 'live',
    async getPopular() {
      const { data } = await http.get('/movie/popular');
      return data.results.map(mapBrief);
    },
    async getTopRated() {
      const { data } = await http.get('/movie/top_rated');
      return data.results.map(mapBrief);
    },
    async getUpcoming() {
      const { data } = await http.get('/movie/upcoming');
      return data.results.map(mapBrief);
    },
    async getMovieById(id) {
      const { data } = await http.get(`/movie/${id}`);
      return mapMovie(data);
    },
  };
};
