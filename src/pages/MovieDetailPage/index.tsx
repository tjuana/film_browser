import { useParams, Link } from 'react-router-dom';
import './MovieDetailPage.scss';
import { useQuery } from '@tanstack/react-query';
import { createMoviesService } from '@entities/movie/api/factory';
import { WishlistToggle } from '@features/wishlist/ui/WishlistToggle';

export const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const svc = createMoviesService();
  const numericId = Number(id);
  const { data: movie } = useQuery({
    queryKey: ['movie', numericId],
    queryFn: () => svc.getMovieById(numericId),
    enabled: Number.isFinite(numericId),
  });

  if (!movie) return null;
  return (
    <div className="movie-detail-page">
      <header className="detail-header">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
        <h1>{movie.title}</h1>
      </header>

      <div className="detail-content">
        <div className="movie-poster">
          <img src={movie.posterPath} alt={movie.title} />
        </div>

        <div className="movie-info">
          <div className="movie-meta">
            <span className="release-date">{movie.releaseDate}</span>
            <span className="rating">★ {movie.voteAverage}</span>
          </div>

          <p className="overview">{movie.overview}</p>

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
  );
};
