import type {
  Movie,
  MovieBrief,
  Genre,
  ProductionCompany,
} from '@entities/movie/model/types';
import type { TmdbMovie, TmdbGenre, TmdbProductionCompany } from './types';
import { TMDB_IMAGE_BASE } from '@shared/config/env';

export const imageUrl = (
  size: string,
  path?: string | null
): string | undefined =>
  path ? `${TMDB_IMAGE_BASE}/${size}${path}` : undefined;

export const mapBrief = (
  m: TmdbMovie,
  category?: 'popular' | 'top' | 'upcoming'
): MovieBrief => ({
  id: m.id,
  title: m.title ?? m.name ?? '',
  posterPath: imageUrl('w342', m.poster_path),
  voteAverage: m.vote_average,
  releaseDate: m.release_date,
  isAdult: m.adult,
  originalTitle: m.original_title,
  category,
});

const mapGenre = (genre: TmdbGenre): Genre => ({
  id: genre.id,
  name: genre.name,
});

const mapProductionCompany = (
  company: TmdbProductionCompany
): ProductionCompany => ({
  id: company.id,
  name: company.name,
  logoPath: imageUrl('w92', company.logo_path),
  originCountry: company.origin_country,
});

export const mapMovie = (
  m: TmdbMovie,
  category?: 'popular' | 'top' | 'upcoming'
): Movie => ({
  ...mapBrief(m, category),
  overview: m.overview,
  releaseDate: m.release_date,
  backdropPath: imageUrl('w780', m.backdrop_path),
  runtime: m.runtime,
  genres: m.genres?.map(mapGenre),
  productionCompanies: m.production_companies?.map(mapProductionCompany),
  tagline: m.tagline,
  status: m.status,
  budget: m.budget,
  revenue: m.revenue,
  popularity: m.popularity,
});
