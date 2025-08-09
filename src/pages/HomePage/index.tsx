import { Link } from 'react-router-dom';
import { Carousel } from '@widgets/carousel';
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
          <Carousel
            title="Popular Movies"
            items={[
              {
                id: '1',
                title: 'Sample Movie 1',
                posterPath: 'https://via.placeholder.com/300',
                rating: 8.5,
              },
              {
                id: '2',
                title: 'Sample Movie 2',
                posterPath: 'https://via.placeholder.com/300',
                rating: 7.8,
              },
              {
                id: '3',
                title: 'Sample Movie 3',
                posterPath: 'https://via.placeholder.com/300',
                rating: 9.1,
              },
              {
                id: '4',
                title: 'Sample Movie 4',
                posterPath: 'https://via.placeholder.com/300',
                rating: 8.2,
              },
              {
                id: '5',
                title: 'Sample Movie 5',
                posterPath: 'https://via.placeholder.com/300',
                rating: 7.9,
              },
              {
                id: '6',
                title: 'Sample Movie 6',
                posterPath: 'https://via.placeholder.com/300',
                rating: 7.9,
              },
            ]}
          />
        </section>

        <section className="carousel-section">
          <h2>Top Rated Movies</h2>
          <Carousel
            title="Top Rated Movies"
            items={[
              {
                id: '7',
                title: 'Sample Movie 7',
                posterPath: 'https://via.placeholder.com/300',
                rating: 9.2,
              },
              {
                id: '8',
                title: 'Sample Movie 8',
                posterPath: 'https://via.placeholder.com/300',
                rating: 8.9,
              },
              {
                id: '9',
                title: 'Sample Movie 9',
                posterPath: 'https://via.placeholder.com/300',
                rating: 8.7,
              },
              {
                id: '10',
                title: 'Sample Movie 10',
                posterPath: 'https://via.placeholder.com/300',
                rating: 8.6,
              },
            ]}
          />
        </section>

        <section className="carousel-section">
          <h2>Upcoming Movies</h2>
          <Carousel
            title="Upcoming Movies"
            items={[
              {
                id: '11',
                title: 'Sample Movie 11',
                posterPath: 'https://via.placeholder.com/300',
                rating: 7.2,
              },
              {
                id: '12',
                title: 'Sample Movie 12',
                posterPath: 'https://via.placeholder.com/300',
                rating: 7.1,
              },
              {
                id: '13',
                title: 'Sample Movie 13',
                posterPath: 'https://via.placeholder.com/300',
                rating: 6.9,
              },
            ]}
          />
        </section>
      </div>
    </div>
  );
};
