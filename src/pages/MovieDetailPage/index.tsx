import { useParams } from 'react-router-dom';
import { MovieDetailView } from '@widgets/movie-detail';
import './MovieDetailPage.scss';

export const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);

  if (!Number.isFinite(numericId)) {
    return (
      <div className="movie-detail-page">
        <div className="movie-detail-page__error">Invalid movie ID</div>
      </div>
    );
  }

  return (
    <div className="movie-detail-page">
      <div className="container">
        <MovieDetailView movieId={numericId} />
      </div>
    </div>
  );
};
