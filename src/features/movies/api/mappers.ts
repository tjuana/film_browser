import type { Movie, MovieBrief } from '@entities/movie/model/types';
import type { TmdbMovie } from './types';
import { TMDB_IMAGE_BASE } from '@shared/config/env';

export const imageUrl = (
  size: string,
  path?: string | null
): string | undefined =>
  path ? `${TMDB_IMAGE_BASE}/${size}${path}` : undefined;

export const mapBrief = (m: TmdbMovie): MovieBrief => ({
  id: m.id,
  title: m.title ?? m.name ?? '',
  posterPath: imageUrl('w342', m.poster_path),
  voteAverage: m.vote_average,
  releaseDate: m.release_date,
  isAdult: m.adult,
  originalTitle: m.original_title,
});

export const mapMovie = (m: TmdbMovie): Movie => ({
  ...mapBrief(m),
  overview: m.overview,
  releaseDate: m.release_date,
  backdropPath: imageUrl('w780', m.backdrop_path),
  runtime: m.runtime,
});
