import { useLoaderData } from 'react-router-dom';
import { MovieDetailView } from '@widgets/movie-detail';
import type { MovieDetailLoaderData } from '@app/routes/movie.$id';
import './MovieDetailPage.scss';

export const MovieDetailPage = () => {
  const { movie, category } = useLoaderData() as MovieDetailLoaderData;

  return (
    <div className="movie-detail-page">
      <div className="container">
        <MovieDetailView movie={movie} category={category} />
      </div>
    </div>
  );
};
