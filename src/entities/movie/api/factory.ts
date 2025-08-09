import { hasTmdb } from '@shared/config/env';
import type { MoviesService } from './types';
import { createLiveMoviesService } from './tmdb.api';
import { createMockMoviesService } from './tmdb.mock';

export type MoviesServiceOptions = {
  forceMock?: boolean;
};

export const createMoviesService = (
  options?: MoviesServiceOptions
): MoviesService => {
  if (options?.forceMock || !hasTmdb()) return createMockMoviesService();
  return createLiveMoviesService();
};
