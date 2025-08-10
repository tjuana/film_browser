import type { Movie } from '@entities/movie/model/types';
import { MovieGenres } from './MovieGenres';
import { ProductionCompanies } from './ProductionCompanies';
import { MovieDetails } from './MovieDetails';

interface MovieDetailAdditionalInfoProps {
  movie: Movie;
}

export const MovieDetailAdditionalInfo = ({
  movie,
}: MovieDetailAdditionalInfoProps) => {
  const hasAdditionalInfo =
    (movie.genres && movie.genres.length > 0) ||
    (movie.productionCompanies && movie.productionCompanies.length > 0) ||
    movie.status ||
    (movie.budget && movie.budget > 0) ||
    (movie.revenue && movie.revenue > 0) ||
    movie.popularity !== undefined;

  if (!hasAdditionalInfo) {
    return null;
  }

  return (
    <div className="movie-detail-view__additional-info">
      {movie.genres && <MovieGenres genres={movie.genres} />}

      {movie.productionCompanies && (
        <ProductionCompanies companies={movie.productionCompanies} />
      )}

      <MovieDetails
        status={movie.status}
        budget={movie.budget}
        revenue={movie.revenue}
        popularity={movie.popularity}
      />
    </div>
  );
};
