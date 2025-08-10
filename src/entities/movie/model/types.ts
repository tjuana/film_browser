// Domain types for Movie entity
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
