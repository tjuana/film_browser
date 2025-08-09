import { Link } from 'react-router-dom';
import './WishListPage.scss';

export const WishListPage = () => {
  // Mock data for now
  const wishlistItems = [
    {
      id: '1',
      title: 'Sample Movie 1',
      posterPath: 'https://via.placeholder.com/200x300',
      category: 'popular' as const,
    },
    {
      id: '2',
      title: 'Sample Movie 2',
      posterPath: 'https://via.placeholder.com/200x300',
      category: 'top-rated' as const,
    },
  ];

  return (
    <div className="wishlist-page">
      <header className="wishlist-header">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
        <h1>My Wish List</h1>
      </header>

      <div className="wishlist-content">
        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist">
            <p>Your wish list is empty.</p>
            <Link to="/" className="browse-link">
              Browse movies
            </Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlistItems.map((movie) => (
              <div key={movie.id} className="wishlist-item">
                <Link to={`/movie/${movie.id}`}>
                  <img src={movie.posterPath} alt={movie.title} />
                  <h3>{movie.title}</h3>
                </Link>
                <button className="remove-btn">Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
