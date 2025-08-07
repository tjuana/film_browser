import { Link } from 'react-router-dom';
import './CarouselWidget.scss';

interface Movie {
  id: string;
  title: string;
  posterPath: string;
  rating: number;
}

interface CarouselWidgetProps {
  category: 'popular' | 'top-rated' | 'upcoming';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const CarouselWidget = ({ category }: CarouselWidgetProps) => {
  // Mock data for now
  const movies: Movie[] = [
    {
      id: '1',
      title: 'Sample Movie 1',
      posterPath: 'https://via.placeholder.com/200x300',
      rating: 8.5,
    },
    {
      id: '2',
      title: 'Sample Movie 2',
      posterPath: 'https://via.placeholder.com/200x300',
      rating: 7.8,
    },
    {
      id: '3',
      title: 'Sample Movie 3',
      posterPath: 'https://via.placeholder.com/200x300',
      rating: 9.1,
    },
    {
      id: '4',
      title: 'Sample Movie 4',
      posterPath: 'https://via.placeholder.com/200x300',
      rating: 8.2,
    },
    {
      id: '5',
      title: 'Sample Movie 5',
      posterPath: 'https://via.placeholder.com/200x300',
      rating: 7.9,
    },
    {
      id: '6',
      title: 'Sample Movie 6',
      posterPath: 'https://via.placeholder.com/200x300',
      rating: 7.9,
    },
    {
      id: '7',
      title: 'Sample Movie 7',
      posterPath: 'https://via.placeholder.com/200x300',
      rating: 7.9,
    },
  ];

  return (
    <div className="carousel-widget">
      <div className="carousel-container">
        {movies.map((movie) => (
          <div key={movie.id} className="carousel-item">
            <Link to={`/movie/${movie.id}`} className="movie-card">
              <div className="movie-poster">
                <img src={movie.posterPath} alt={movie.title} />
                <div className="movie-rating">★ {movie.rating}</div>
              </div>
              <h3 className="movie-title">{movie.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
