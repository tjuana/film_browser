import { Carousel } from '@widgets/carousel';
import { Skeleton } from '@shared/ui/Skeleton/Skeleton';
import { useMovies, type Category } from '../model/useMovies';
import './MoviesCarousel.scss';

type MoviesCarouselProps = { title: string; category: Category };

export function MoviesCarousel({ title, category }: MoviesCarouselProps) {
  const { data, isLoading, isError, refetch } = useMovies(category);

  if (isError) {
    return (
      <section className="carousel-section">
        <h2>{title}</h2>
        <div className="movies-carousel__error">
          <p>Error loading movies</p>
          <button
            onClick={() => refetch()}
            className="movies-carousel__retry-button"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="carousel-section">
        <h2>{title}</h2>
        <div className="movies-carousel__loading-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="movies-carousel__loading-skeleton" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="carousel-section">
      <h2>{title}</h2>
      <Carousel title={title} items={data ?? []} />
    </section>
  );
}
