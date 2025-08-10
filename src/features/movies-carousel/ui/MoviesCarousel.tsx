import { Carousel } from '@widgets/carousel';
import type { MovieBrief } from '@entities/movie/model/types';
import './MoviesCarousel.scss';

type MoviesCarouselProps = {
  title: string;
  movies: MovieBrief[];
};

export function MoviesCarousel({ title, movies }: MoviesCarouselProps) {
  // Handle empty data gracefully - loader should handle errors
  if (!movies || movies.length === 0) {
    return (
      <section className="carousel-section">
        <h2>{title}</h2>
        <div className="movies-carousel__error">
          <p>No movies available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="carousel-section">
      <h2>{title}</h2>
      <Carousel title={title} items={movies} />
    </section>
  );
}
