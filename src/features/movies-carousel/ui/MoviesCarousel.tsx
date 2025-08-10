import { Carousel } from '@widgets/carousel';
import { Skeleton } from '@shared/ui/Skeleton/Skeleton';
import { useMovies, type Category } from '../model/useMovies';

type MoviesCarouselProps = { title: string; category: Category };

export function MoviesCarousel({ title, category }: MoviesCarouselProps) {
  const { data, isLoading, isError } = useMovies(category);

  if (isError) {
    return (
      <section className="carousel-section">
        <h2>{title}</h2>
        <div>Error</div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="carousel-section">
        <h2>{title}</h2>
        <div style={{ display: 'flex', gap: 12 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} style={{ width: 180, height: 180 }} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="carousel-section">
      <h2>{title}</h2>
      {isLoading ? (
        <div style={{ display: 'flex', gap: 12 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} style={{ width: 180, height: 180 }} />
          ))}
        </div>
      ) : (
        <Carousel title={title} items={data ?? []} />
      )}
    </section>
  );
}
