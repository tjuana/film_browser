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

export type Genre = {
  id: number;
  name: string;
};

export type ProductionCompany = {
  id: number;
  name: string;
  logoPath?: string;
  originCountry?: string;
};

export type Movie = MovieBrief & {
  overview?: string;
  backdropPath?: string;
  runtime?: number;
  genres?: Genre[];
  productionCompanies?: ProductionCompany[];
  tagline?: string;
  status?: string;
  budget?: number;
  revenue?: number;
  popularity?: number;
};
