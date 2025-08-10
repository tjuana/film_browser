import { useWishlistSelectors, useWishlistActions } from '../model/store';
import type { MovieBrief } from '@entities/movie/model/types';
import './WishlistToogle.scss';

type Props = {
  movie: MovieBrief;
};

export function WishlistToggle({ movie }: Props) {
  // Use the new hooks for better performance and cleaner code
  const { has } = useWishlistSelectors();
  const { toggle } = useWishlistActions();

  const isInWishlist = has(movie.id);

  return (
    <button
      type="button"
      aria-pressed={isInWishlist}
      onClick={() => toggle(movie)}
      className={`btn btn--wishlist${isInWishlist ? ' is-active' : ''}`}
    >
      {isInWishlist ? 'Remove from Wish List' : 'Add to Wish List'}
    </button>
  );
}
