import { Link } from 'react-router-dom';
import { MoviesCarousel } from '@features/movies-carousel';
import './HomePage.scss';

export const HomePage = () => {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Film Browser</h1>
        <nav className="main-nav">
          <Link to="/" className="nav-link active">
            Home
          </Link>
          <Link to="/wishlist" className="nav-link">
            Wish List
          </Link>
        </nav>
      </header>

      <div className="home-content">
        <MoviesCarousel title="Popular Movies" category="popular" />

        <MoviesCarousel title="Top Rated Movies" category="topRated" />

        <MoviesCarousel title="Upcoming Movies" category="upcoming" />
      </div>
    </div>
  );
};
