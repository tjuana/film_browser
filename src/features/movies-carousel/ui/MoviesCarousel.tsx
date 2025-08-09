import { Carousel } from '@widgets/carousel';
import { Skeleton } from '@shared/ui/Skeleton';
import { useMovies, type Category } from '../model/useMovies';

type MoviesCarouselProps = { title: string; category: Category };

export function MoviesCarousel({ title, category }: MoviesCarouselProps) {
  const { data, isLoading, isError, refetch } = useMovies(category);

  return (
    <section className="carousel-section">
      <h2>{title}</h2>
      {isError && (
        <div role="alert" style={{ marginBottom: '0.5rem' }}>
          Failed to load
          <button
            type="button"
            onClick={() => refetch()}
            style={{ marginLeft: '0.5rem' }}
          >
            Retry
          </button>
        </div>
      )}
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
