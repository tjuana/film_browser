import { useParams, Link } from 'react-router-dom';
import './MovieDetailPage.scss';

export const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  // Mock data for now
  const movie = {
    id: id || '1',
    title: 'Sample Movie',
    overview:
      'This is a sample movie description that would normally come from the TMDB API.',
    posterPath: 'https://via.placeholder.com/300x450',
    releaseDate: '2024-01-01',
    rating: 8.5,
    category: 'popular' as const,
  };

  return (
    <div className="movie-detail-page">
      <div className="container">
        <header className="detail-header">
          <Link to="/" className="back-link">
            ← Back to Home
          </Link>
          <h1>{movie.title}</h1>
        </header>

        <main className="detail-content">
          <div className="movie-poster">
            <img src={movie.posterPath} alt={movie.title} />
          </div>

          <div className="movie-info">
            <div className="movie-meta">
              <span className="release-date">{movie.releaseDate}</span>
              <span className="rating">★ {movie.rating}</span>
            </div>

            <p className="overview">{movie.overview}</p>

            <button className="wishlist-btn">Add to Wish List</button>
          </div>
        </main>
      </div>
    </div>
  );
};
