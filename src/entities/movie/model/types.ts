export type MovieBrief = {
  id: number;
  title: string;
  posterPath?: string;
  voteAverage?: number;
  category?: 'popular' | 'top' | 'upcoming';
};

export type Movie = MovieBrief & {
  overview?: string;
  releaseDate?: string;
  backdropPath?: string;
  runtime?: number;
};
