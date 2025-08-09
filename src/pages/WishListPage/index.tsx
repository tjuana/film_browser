import { Link } from 'react-router-dom';
import { WishlistGrid } from '@widgets/wishlist';
import './WishListPage.scss';

export const WishListPage = () => {
  return (
    <div className="wishlist-page">
      <header className="wishlist-header">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
        <h1>My Wish List</h1>
      </header>

      <WishlistGrid />
    </div>
  );
};
