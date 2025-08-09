import { Link } from 'react-router-dom';
import './MovieCard.scss';

type MovieCardProps = {
  id: string | number;
  title: string;
  posterPath?: string;
  rating?: number;
};

export const MovieCard = ({
  id,
  title,
  posterPath,
  rating,
}: MovieCardProps) => {
  return (
    <Link to={`/movie/${id}`} className="movie-card">
      <div
        className="movie-poster"
        style={{ aspectRatio: '1 / 1', position: 'relative' }}
      >
        <img
          src={posterPath}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {typeof rating === 'number' && (
          <div
            className="movie-rating"
            style={{ position: 'absolute', top: 6, right: 6 }}
          >
            ★ {rating}
          </div>
        )}
      </div>
      <h3 className="movie-title">{title}</h3>
    </Link>
  );
};
