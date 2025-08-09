import { MoviesCarousel } from '@features/movies-carousel';
import './HomePage.scss';

export const HomePage = () => {
  return (
    <div className="home-page">
      <div className="home-content">
        <MoviesCarousel title="Popular Movies" category="popular" />
        <MoviesCarousel title="Top Rated Movies" category="topRated" />
        <MoviesCarousel title="Upcoming Movies" category="upcoming" />
      </div>
    </div>
  );
};
