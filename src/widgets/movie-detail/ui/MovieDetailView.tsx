import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { createMoviesService } from '@features/movies/api/factory';
import {
  MovieDetailHeader,
  MovieDetailContent,
  MovieDetailAdditionalInfo,
} from './components';
import './MovieDetailView.scss';

interface MovieDetailViewProps {
  movieId: number;
}

export const MovieDetailView = ({ movieId }: MovieDetailViewProps) => {
  const svc = createMoviesService();
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category') as
    | 'popular'
    | 'top'
    | 'upcoming'
    | null;

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => svc.getMovieById(movieId),
    enabled: Number.isFinite(movieId),
  });

  // Use category from URL if available, otherwise fallback to movie.category
  const effectiveCategory = categoryFromUrl || movie?.category;
  if (isLoading) {
    return (
      <div className="movie-detail-view">
        <div className="movie-detail-view__loading">
          Loading movie details...
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="movie-detail-view">
        <div className="movie-detail-view__error">
          Failed to load movie details. Please try again.
        </div>
      </div>
    );
  }

  const categoryClass = effectiveCategory
    ? `movie-detail-view--${effectiveCategory}`
    : '';

  // Prepare props for sub-components
  const wishlistMovie = {
    id: movie.id,
    title: movie.title,
    posterPath: movie.posterPath,
    voteAverage: movie.voteAverage,
  };

  return (
    <div className={`movie-detail-view ${categoryClass}`.trim()}>
      <MovieDetailHeader
        title={movie.title}
        category={effectiveCategory}
        tagline={movie.tagline}
      />

      <MovieDetailContent
        posterPath={movie.posterPath}
        title={movie.title}
        releaseDate={movie.releaseDate}
        voteAverage={movie.voteAverage}
        runtime={movie.runtime}
        overview={movie.overview}
        movie={wishlistMovie}
      />

      <MovieDetailAdditionalInfo movie={movie} />
    </div>
  );
};
