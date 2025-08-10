import type { HTMLAttributes } from 'react';
import './Skeleton.scss';

type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export const Skeleton = ({ style, ...rest }: SkeletonProps) => {
  return <div aria-hidden {...rest} className="skeleton" style={style} />;
};
