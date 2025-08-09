import { useWishlistStore } from '../model/store';
import type { MovieBrief } from '@entities/movie/api/types';

type Props = {
  movie: MovieBrief;
};

export function WishlistToggle({ movie }: Props) {
  const has = useWishlistStore((s) => s.has(movie.id));
  const toggle = useWishlistStore((s) => s.toggle);

  return (
    <button
      type="button"
      aria-pressed={has}
      onClick={() => toggle(movie)}
      className={`btn btn--wishlist${has ? ' is-active' : ''}`}
    >
      {has ? 'Remove from Wish List' : 'Add to Wish List'}
    </button>
  );
}
