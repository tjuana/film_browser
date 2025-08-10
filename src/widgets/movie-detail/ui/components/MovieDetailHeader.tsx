import { Link } from 'react-router-dom';

interface MovieDetailHeaderProps {
  title: string;
  category?: 'popular' | 'top' | 'upcoming';
  tagline?: string;
}

export const MovieDetailHeader = ({
  title,
  category,
  tagline,
}: MovieDetailHeaderProps) => {
  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'top':
        return 'Top Rated';
      case 'popular':
        return 'Popular';
      case 'upcoming':
        return 'Upcoming';
      default:
        return cat;
    }
  };

  return (
    <header className="movie-detail-view__header">
      <Link to="/" className="movie-detail-view__back-link">
        ← Back to Home
      </Link>
      <h1 className="movie-detail-view__title">{title}</h1>
      {category && (
        <span
          className={`movie-detail-view__category-badge movie-detail-view__category-badge--${category}`}
        >
          {getCategoryLabel(category)}
        </span>
      )}
      {tagline && <p className="movie-detail-view__tagline">"{tagline}"</p>}
    </header>
  );
};
