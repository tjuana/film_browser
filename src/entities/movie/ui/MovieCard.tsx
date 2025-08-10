import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { yearOf } from '@shared/lib/date/yearOf';
import { ROUTES } from '@app/router/routes';
import './MovieCard.scss';

export type MovieCardProps = {
  id: number;
  title?: string;
  originalTitle?: string;
  posterUrl?: string;
  voteAverage?: number;
  isAdult?: boolean;
  releaseDate?: string;
  to?: string;
  ratio?: 'poster' | 'square';
  className?: string;
  category?: 'popular' | 'top' | 'upcoming';
};

export function MovieCard({
  id,
  title,
  originalTitle,
  posterUrl,
  voteAverage,
  isAdult,
  releaseDate,
  to,
  ratio = 'poster',
  className,
  category,
}: MovieCardProps) {
  // Generate URL with category parameter if available
  const defaultTo = category
    ? `${ROUTES.MOVIE_DETAIL.replace(':id', id.toString())}?category=${category}`
    : ROUTES.MOVIE_DETAIL.replace(':id', id.toString());

  const finalTo = to ?? defaultTo;
  const displayTitle = title ?? originalTitle ?? 'Untitled';
  const showOriginal = Boolean(originalTitle && originalTitle !== displayTitle);
  const year = yearOf(releaseDate);

  const aria = [
    displayTitle,
    year ? `, ${year}` : '',
    typeof voteAverage === 'number' ? `, rating ${voteAverage.toFixed(1)}` : '',
    isAdult ? ', 18 plus' : '',
  ].join('');

  const Root: React.ElementType = finalTo ? Link : 'div';
  const rootProps = finalTo
    ? { to: finalTo }
    : { role: 'article', tabIndex: 0 };

  return (
    <Root
      {...rootProps}
      className={clsx('movie-card', `movie-card--${ratio}`, className)}
      aria-label={aria}
      title={displayTitle}
    >
      <div className="movie-card__poster">
        <img
          src={posterUrl ?? '/assets/no-poster.png'}
          alt={displayTitle}
          loading="lazy"
          decoding="async"
        />
        <div className="movie-card__badges" aria-hidden="true">
          {isAdult && <span className="badge badge--adult">18+</span>}
          {typeof voteAverage === 'number' && (
            <span className="badge badge--rating">
              ★ {voteAverage.toFixed(1)}
            </span>
          )}
        </div>
        <div className="movie-card__fade" aria-hidden="true" />
      </div>

      <div className="movie-card__body">
        <div className="movie-card__title">{displayTitle}</div>

        <div className="movie-card__meta">
          {year && <span className="meta__chip">{year}</span>}
          {showOriginal && (
            <>
              {year && <span className="meta__sep">•</span>}
              <span className="meta__original" title={originalTitle!}>
                {originalTitle}
              </span>
            </>
          )}
        </div>
      </div>
    </Root>
  );
}
