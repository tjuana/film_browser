import { useRef } from 'react';
import { CarouselButton } from './CarouselButton';
import { CarouselItem } from './CarouselItem';
import '@widgets/carousel/styles/_carousel.scss';
import { MovieCard } from '@entities/movie/ui/MovieCard';

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
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.max(1, Math.floor(el.clientWidth * 0.9)) * direction;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section className="carousel" aria-label={title}>
      <div
        className="carousel__track"
        ref={trackRef}
        role="list"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') scrollBy(-1);
          if (e.key === 'ArrowRight') scrollBy(1);
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

      <CarouselButton
        className="carousel__btn--prev"
        aria-label="Previous"
        onClick={() => scrollBy(-1)}
      >
        ‹
      </CarouselButton>
      <CarouselButton
        className="carousel__btn--next"
        aria-label="Next"
        onClick={() => scrollBy(1)}
      >
        ›
      </CarouselButton>
    </section>
  );
};
