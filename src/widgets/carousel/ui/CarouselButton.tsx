import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type CarouselButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
>;

export const CarouselButton = ({
  children,
  className = '',
  ...rest
}: CarouselButtonProps) => {
  return (
    <button
      type="button"
      className={`carousel__btn ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
};
