import type { PropsWithChildren } from 'react';

type CarouselItemProps = PropsWithChildren<{
  width?: number;
}>;

export const CarouselItem = ({ children, width = 180 }: CarouselItemProps) => {
  return (
    <div className="carousel__item" role="listitem" style={{ width }}>
      {children}
    </div>
  );
};
