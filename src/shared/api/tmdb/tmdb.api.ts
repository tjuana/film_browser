import type { MoviesService } from '@features/movies/api/types';
import { mapBrief, mapMovie } from '@features/movies/api/mappers';
import { createHttpClient } from './http';
import type { MovieBrief } from '@entities/movie/model/types';

const createLiveMoviesService = (): MoviesService => {
  const http = createHttpClient();

  return {
    kind: 'live',
    async getPopular() {
      const { data } = await http.get('/movie/popular');
      return data.results.map((movie: MovieBrief) =>
        mapBrief(movie, 'popular')
      );
    },
    async getTopRated() {
      const { data } = await http.get('/movie/top_rated');
      return data.results.map((movie: MovieBrief) => mapBrief(movie, 'top'));
    },
    async getUpcoming() {
      const { data } = await http.get('/movie/upcoming');
      return data.results.map((movie: MovieBrief) =>
        mapBrief(movie, 'upcoming')
      );
    },
    async getMovieById(id) {
      const { data } = await http.get(`/movie/${id}`);
      return mapMovie(data);
    },
  };
};

export { createLiveMoviesService };
