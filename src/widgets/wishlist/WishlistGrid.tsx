import {
  useWishlistSelectors,
  useWishlistActions,
} from '@features/wishlist/model/store';
import { MovieCard } from '@entities/movie/ui/MovieCard';
import { Button } from '@shared/ui/Button';
import './styles/_wishlist.scss';

export const WishlistGrid = () => {
  // Use the new hooks for better performance and cleaner code
  const { items, isEmpty } = useWishlistSelectors();
  const { remove, clear } = useWishlistActions();

  if (isEmpty) {
    return (
      <div className="wishlist-empty">
        <p>Your wish list is empty.</p>
        <a href="/" className="wishlist-browse-link">
          Browse movies
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="wishlist-grid">
        {items.map((m) => (
          <div key={m.id} className="wishlist-item">
            <MovieCard
              id={m.id as number}
              title={m.title}
              posterUrl={m.posterPath}
              ratio="poster"
            />
            <Button className="remove-btn" onClick={() => remove(m.id)}>
              Remove
            </Button>
          </div>
        ))}
      </div>
      <div className="wishlist-actions">
        <Button className="clear-btn" onClick={() => clear()}>
          Clear all
        </Button>
      </div>
    </>
  );
};
