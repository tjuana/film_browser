import { useWishlistSelectors, useWishlistActions } from '../model/store';
import { Button } from '@shared/ui/Button';
import type { MovieBrief } from '@entities/movie/model/types';

type Props = {
  movie: MovieBrief;
};

export function WishlistToggle({ movie }: Props) {
  // Use the new hooks for better performance and cleaner code
  const { has } = useWishlistSelectors();
  const { toggle } = useWishlistActions();

  const isInWishlist = has(movie.id);

  return (
    <Button
      type="button"
      variant={isInWishlist ? 'secondary' : 'primary'}
      size="large"
      aria-pressed={isInWishlist}
      onClick={() => toggle(movie)}
    >
      {isInWishlist ? 'Remove from Wish List' : 'Add to Wish List'}
    </Button>
  );
}
