import type { MovieBrief, Movie } from '@entities/movie/model/types';

// TMDB API response types
export type TmdbMovie = {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  overview?: string;
  release_date?: string;
  vote_average?: number;
  runtime?: number;
  original_title?: string;
  adult?: boolean;
};

// Service interface
export type MoviesService = {
  kind: 'live' | 'mock';
  getPopular: () => Promise<MovieBrief[]>;
  getTopRated: () => Promise<MovieBrief[]>;
  getUpcoming: () => Promise<MovieBrief[]>;
  getMovieById: (id: number) => Promise<Movie>;
};
