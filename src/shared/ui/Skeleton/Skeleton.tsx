import type { HTMLAttributes } from 'react';
import clsx from 'clsx';
import './Skeleton.scss';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
}

export const Skeleton = ({
  variant = 'rectangular',
  width,
  height,
  style,
  className,
  ...rest
}: SkeletonProps) => {
  const inlineStyles = {
    ...style,
    ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height && {
      height: typeof height === 'number' ? `${height}px` : height,
    }),
  };

  return (
    <div
      aria-hidden
      className={clsx('skeleton', `skeleton--${variant}`, className)}
      style={inlineStyles}
      {...rest}
    />
  );
};
