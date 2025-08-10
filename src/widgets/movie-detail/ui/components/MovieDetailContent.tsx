import { WishlistToggle } from '@features/wishlist/ui/WishlistToggle';
import type { MovieBrief } from '@entities/movie/model/types';

interface MovieDetailContentProps {
  posterPath?: string;
  title: string;
  releaseDate?: string;
  voteAverage?: number;
  runtime?: number;
  overview?: string;
  movie: Pick<MovieBrief, 'id' | 'title' | 'posterPath' | 'voteAverage'>;
}

export const MovieDetailContent = ({
  posterPath,
  title,
  releaseDate,
  voteAverage,
  runtime,
  overview,
  movie,
}: MovieDetailContentProps) => {
  return (
    <div className="movie-detail-view__content">
      <div className="movie-detail-view__poster">
        <img
          src={posterPath}
          alt={title}
          className="movie-detail-view__poster-image"
        />
      </div>

      <div className="movie-detail-view__info">
        <div className="movie-detail-view__meta">
          <span className="movie-detail-view__release-date">{releaseDate}</span>
          <span className="movie-detail-view__rating">★ {voteAverage}</span>
          {runtime && (
            <span className="movie-detail-view__runtime">{runtime} min</span>
          )}
        </div>

        <p className="movie-detail-view__overview">{overview}</p>

        <div className="movie-detail-view__actions">
          <WishlistToggle movie={movie} />
        </div>
      </div>
    </div>
  );
};
