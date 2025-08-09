import type { Movie, MovieBrief, TmdbMovie } from './types';

export const imageUrl = (
  size: string,
  path?: string | null
): string | undefined =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : undefined;

export const mapBrief = (m: TmdbMovie): MovieBrief => ({
  id: m.id,
  title: m.title ?? m.name ?? '',
  posterPath: imageUrl('w342', m.poster_path),
  voteAverage: m.vote_average,
});

export const mapMovie = (m: TmdbMovie): Movie => ({
  ...mapBrief(m),
  overview: m.overview,
  releaseDate: m.release_date,
  backdropPath: imageUrl('w780', m.backdrop_path),
  runtime: m.runtime,
});
