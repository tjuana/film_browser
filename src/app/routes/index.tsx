import { createMoviesService } from '@features/movies/api/factory';
import type { MovieBrief } from '@entities/movie/model/types';

export type HomeLoaderData = {
  popular: MovieBrief[];
  topRated: MovieBrief[];
  upcoming: MovieBrief[];
};

export async function homeLoader(): Promise<HomeLoaderData> {
  const svc = createMoviesService();

  try {
    // Fetch all movie categories in parallel
    const [popular, topRated, upcoming] = await Promise.all([
      svc.getPopular(),
      svc.getTopRated(),
      svc.getUpcoming(),
    ]);

    return {
      popular,
      topRated,
      upcoming,
    };
  } catch (error) {
    console.error('Failed to load movies:', error);
    // Return empty arrays to prevent crash - UI can show error states
    return {
      popular: [],
      topRated: [],
      upcoming: [],
    };
  }
}
