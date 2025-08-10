import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { createMoviesService } from '@features/movies/api/factory';
import { WishlistToggle } from '@features/wishlist/ui/WishlistToggle';
import './MovieDetailView.scss';

interface MovieDetailViewProps {
  movieId: number;
}

export const MovieDetailView = ({ movieId }: MovieDetailViewProps) => {
  const svc = createMoviesService();

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => svc.getMovieById(movieId),
    enabled: Number.isFinite(movieId),
  });

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

  return (
    <div className="movie-detail-view">
      <header className="movie-detail-view__header">
        <Link to="/" className="movie-detail-view__back-link">
          ← Back to Home
        </Link>
        <h1 className="movie-detail-view__title">{movie.title}</h1>
      </header>

      <div className="movie-detail-view__content">
        <div className="movie-detail-view__poster">
          <img
            src={movie.posterPath}
            alt={movie.title}
            className="movie-detail-view__poster-image"
          />
        </div>

        <div className="movie-detail-view__info">
          <div className="movie-detail-view__meta">
            <span className="movie-detail-view__release-date">
              {movie.releaseDate}
            </span>
            <span className="movie-detail-view__rating">
              ★ {movie.voteAverage}
            </span>
          </div>

          <p className="movie-detail-view__overview">{movie.overview}</p>

          <div className="movie-detail-view__actions">
            <WishlistToggle
              movie={{
                id: movie.id,
                title: movie.title,
                posterPath: movie.posterPath,
                voteAverage: movie.voteAverage,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
