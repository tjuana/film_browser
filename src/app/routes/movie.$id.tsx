import type { LoaderFunctionArgs } from 'react-router-dom';
import { createMoviesService } from '@features/movies/api/factory';
import type { Movie } from '@entities/movie/model/types';

export type MovieDetailLoaderData = {
  movie: Movie;
  category?: 'popular' | 'top' | 'upcoming';
};

export async function movieDetailLoader({
  params,
  request,
}: LoaderFunctionArgs): Promise<MovieDetailLoaderData> {
  const { id } = params;
  const url = new URL(request.url);
  const category = url.searchParams.get('category') as
    | 'popular'
    | 'top'
    | 'upcoming'
    | null;

  if (!id || !Number.isFinite(Number(id))) {
    throw new Response('Invalid movie ID', { status: 400 });
  }

  const svc = createMoviesService();

  try {
    const movie = await svc.getMovieById(Number(id));

    if (!movie) {
      throw new Response('Movie not found', { status: 404 });
    }

    return {
      movie,
      category: category || undefined,
    };
  } catch (error) {
    console.error('Failed to load movie:', error);
    throw new Response('Failed to load movie', { status: 500 });
  }
}
