import { CarouselButton } from './CarouselButton';
import { CarouselItem } from './CarouselItem';
import '@widgets/carousel/styles/_carousel.scss';
import { MovieCard } from '@entities/movie/ui/MovieCard';
import { useCarouselNav } from '@widgets/carousel/model/useCarouselNav';

type DemoMovie = {
  id: string;
  title: string;
  posterPath: string;
  rating: number;
};

type CarouselProps = {
  title: string;
  items: DemoMovie[];
};

export const Carousel = ({ title, items }: CarouselProps) => {
  const { trackRef, canPrev, canNext, scrollByPage } = useCarouselNav();

  return (
    <section className="carousel" aria-label={title}>
      <div
        className="carousel__track"
        ref={trackRef}
        role="list"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') scrollByPage(-1);
          if (e.key === 'ArrowRight') scrollByPage(1);
        }}
      >
        {items.map((m) => (
          <CarouselItem key={m.id}>
            <MovieCard
              id={m.id}
              title={m.title}
              posterPath={m.posterPath}
              rating={m.rating}
            />
          </CarouselItem>
        ))}
      </div>

      {canPrev && (
        <CarouselButton
          className="carousel__btn--prev"
          aria-label="Previous"
          onClick={() => scrollByPage(-1)}
        >
          ‹
        </CarouselButton>
      )}
      {canNext && (
        <CarouselButton
          className="carousel__btn--next"
          aria-label="Next"
          onClick={() => scrollByPage(1)}
        >
          ›
        </CarouselButton>
      )}
    </section>
  );
};
