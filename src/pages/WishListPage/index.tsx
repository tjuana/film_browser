import { Link } from 'react-router-dom';
import './WishListPage.scss';
import { useWishlistStore } from '@features/wishlist/model/store';
import { MovieCard } from '@entities/movie/ui/MovieCard';

export const WishListPage = () => {
  const items = useWishlistStore((s) => s.items);
  const remove = useWishlistStore((s) => s.remove);
  const clear = useWishlistStore((s) => s.clear);

  return (
    <div className="wishlist-page">
      <header className="wishlist-header">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
        <h1>My Wish List</h1>
      </header>

      <div className="wishlist-content">
        {items.length === 0 ? (
          <div className="empty-wishlist">
            <p>Your wish list is empty.</p>
            <Link to="/" className="browse-link">
              Browse movies
            </Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {items.map((m) => (
              <div key={m.id} className="wishlist-item">
                <MovieCard
                  id={m.id as number}
                  title={m.title}
                  posterUrl={m.posterPath}
                  ratio="poster"
                />
                <button className="remove-btn" onClick={() => remove(m.id)}>
                  Remove
                </button>
              </div>
            ))}
            <div className="wishlist-actions">
              <button className="remove-btn" onClick={() => clear()}>
                Clear all
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
