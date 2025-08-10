import type { Movie } from '@entities/movie/model/types';
import {
  MovieDetailHeader,
  MovieDetailContent,
  MovieDetailAdditionalInfo,
} from './components';
import './MovieDetailView.scss';

interface MovieDetailViewProps {
  movie: Movie;
  category?: 'popular' | 'top' | 'upcoming';
}

export const MovieDetailView = ({ movie, category }: MovieDetailViewProps) => {
  // Use category from props (URL) or fallback to movie.category
  const effectiveCategory = category || movie?.category;

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
