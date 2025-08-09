import type { HTMLAttributes } from 'react';

type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export const Skeleton = ({ style, ...rest }: SkeletonProps) => {
  return (
    <div
      aria-hidden
      {...rest}
      style={{
        background:
          'linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.12), rgba(255,255,255,0.06))',
        backgroundSize: '200% 100%',
        height: '1rem',
        borderRadius: '0.375rem',
        animation: 'skeleton 1.2s ease-in-out infinite',
        ...style,
      }}
    />
  );
};
