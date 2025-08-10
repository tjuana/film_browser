import React from 'react';
import { CarouselItem } from './CarouselItem';
import { CarouselButton } from './CarouselButton';
import '@widgets/carousel/styles/_carousel.scss';
import { MovieCard } from '@entities/movie/ui/MovieCard';
import { useCarouselNav } from '../model/useCarouselNav';
import { useCarouselDrag } from '../model/useCarouselDrag';
import type { MovieBrief } from '@entities/movie/model/types';

type CarouselProps = {
  title: string;
  items: MovieBrief[];
  renderItem?: (m: MovieBrief) => React.ReactNode;
};

export const Carousel = ({ title, items, renderItem }: CarouselProps) => {
  const { trackRef, canPrev, canNext, scrollByPage } = useCarouselNav();
  useCarouselDrag(trackRef);

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
            {renderItem ? (
              renderItem(m)
            ) : (
              <MovieCard
                id={m.id}
                title={m.title}
                posterUrl={m.posterPath}
                voteAverage={m.voteAverage}
                isAdult={m.isAdult}
                releaseDate={m.releaseDate}
                originalTitle={m.originalTitle}
                ratio="poster"
              />
            )}
          </CarouselItem>
        ))}
      </div>

      <CarouselButton
        className="carousel__btn--prev"
        aria-label="Previous"
        onClick={() => scrollByPage(-1)}
        disabled={!canPrev}
      >
        ‹
      </CarouselButton>
      <CarouselButton
        className="carousel__btn--next"
        aria-label="Next"
        onClick={() => scrollByPage(1)}
        disabled={!canNext}
      >
        ›
      </CarouselButton>
    </section>
  );
};
