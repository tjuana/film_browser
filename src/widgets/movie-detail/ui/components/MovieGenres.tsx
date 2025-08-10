import type { Genre } from '@entities/movie/model/types';

interface MovieGenresProps {
  genres: Genre[];
}

export const MovieGenres = ({ genres }: MovieGenresProps) => {
  if (!genres || genres.length === 0) {
    return null;
  }

  return (
    <div className="movie-detail-view__section">
      <h3 className="movie-detail-view__section-title">Genres</h3>
      <div className="movie-detail-view__genres">
        {genres.map((genre) => (
          <span key={genre.id} className="movie-detail-view__genre-tag">
            {genre.name}
          </span>
        ))}
      </div>
    </div>
  );
};
