import { useQuery } from '@tanstack/react-query';
import { createMoviesService } from '@features/movies/api/factory';

export type Category = 'popular' | 'topRated' | 'upcoming';

const svc = createMoviesService();

import type { MovieBrief } from '@entities/movie/model/types';

const loaders: Record<Category, () => Promise<MovieBrief[]>> = {
  popular: () => svc.getPopular(),
  topRated: () => svc.getTopRated(),
  upcoming: () => svc.getUpcoming(),
};

export function useMovies(category: Category) {
  return useQuery({
    queryKey: ['movies', category],
    queryFn: loaders[category],
    staleTime: 60_000,
    retry: 1,
  });
}
