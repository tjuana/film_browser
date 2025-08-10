import { useLoaderData } from 'react-router-dom';
import { MoviesCarousel } from '@features/movies-carousel';
import type { HomeLoaderData } from '@app/routes/index';
import './HomePage.scss';

export const HomePage = () => {
  const { popular, topRated, upcoming } = useLoaderData() as HomeLoaderData;

  return (
    <div className="home-page">
      <div className="home-content">
        <MoviesCarousel title="Popular Movies" movies={popular} />
        <MoviesCarousel title="Top Rated Movies" movies={topRated} />
        <MoviesCarousel title="Upcoming Movies" movies={upcoming} />
      </div>
    </div>
  );
};
