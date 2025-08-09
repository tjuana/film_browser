export type MovieBrief = {
  id: number;
  title: string;
  posterPath?: string;
  voteAverage?: number;
  category?: 'popular' | 'top' | 'upcoming';
  releaseDate?: string;
  originalTitle?: string;
  isAdult?: boolean;
};

export type Movie = MovieBrief & {
  overview?: string;
  backdropPath?: string;
  runtime?: number;
};

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

export type MoviesService = {
  kind: 'live' | 'mock';
  getPopular: () => Promise<MovieBrief[]>;
  getTopRated: () => Promise<MovieBrief[]>;
  getUpcoming: () => Promise<MovieBrief[]>;
  getMovieById: (id: number) => Promise<Movie>;
};
