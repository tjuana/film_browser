import { Link } from 'react-router-dom';
import { CarouselWidget } from '@widgets/CarouselWidget';
import './HomePage.scss';

export const HomePage = () => {
  return (
    <div className="home-page">
      <div className="container">
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

        <main className="home-content">
          <section className="carousel-section">
            <h2>Popular Movies</h2>
            <CarouselWidget category="popular" />
          </section>

          <section className="carousel-section">
            <h2>Top Rated Movies</h2>
            <CarouselWidget category="top-rated" />
          </section>

          <section className="carousel-section">
            <h2>Upcoming Movies</h2>
            <CarouselWidget category="upcoming" />
          </section>
        </main>
      </div>
    </div>
  );
};
