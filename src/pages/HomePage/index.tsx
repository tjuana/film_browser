import { Link } from 'react-router-dom';
import { Carousel } from '@widgets/carousel';
import { popularMocks, topRatedMocks, upcomingMocks } from './mocks';
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
        <section className="carousel-section">
          <h2>Popular Movies</h2>
          <Carousel title="Popular Movies" items={popularMocks} />
        </section>

        <section className="carousel-section">
          <h2>Top Rated Movies</h2>
          <Carousel title="Top Rated Movies" items={topRatedMocks} />
        </section>

        <section className="carousel-section">
          <h2>Upcoming Movies</h2>
          <Carousel title="Upcoming Movies" items={upcomingMocks} />
        </section>
      </div>
    </div>
  );
};
