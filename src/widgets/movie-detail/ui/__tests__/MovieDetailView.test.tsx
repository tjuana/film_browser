import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MovieDetailView } from '../MovieDetailView';
import type { Genre, Movie } from '@entities/movie/model/types';

type MovieDetailHeaderProps = {
  title: string;
  category?: string;
  tagline?: string;
};

// Mock sub-components to focus on integration testing
vi.mock('../components/MovieDetailHeader', () => ({
  MovieDetailHeader: ({ title, category, tagline }: MovieDetailHeaderProps) => (
    <div data-testid="movie-detail-header">
      <h1>{title}</h1>
      {category && <span data-testid="category-badge">{category}</span>}
      {tagline && <p data-testid="tagline">{tagline}</p>}
    </div>
  ),
}));

type MovieDetailContentProps = {
  title: string;
  runtime?: number;
  overview?: string;
};

vi.mock('../components/MovieDetailContent', () => ({
  MovieDetailContent: ({
    title,
    runtime,
    overview,
  }: MovieDetailContentProps) => (
    <div data-testid="movie-detail-content">
      <h2>{title}</h2>
      {runtime && <span data-testid="runtime">{runtime} min</span>}
      {overview && <p data-testid="overview">{overview}</p>}
    </div>
  ),
}));

type MovieDetailAdditionalInfoProps = {
  movie: Movie;
};

vi.mock('../components/MovieDetailAdditionalInfo', () => ({
  MovieDetailAdditionalInfo: ({ movie }: MovieDetailAdditionalInfoProps) => (
    <div data-testid="movie-detail-additional-info">
      {movie.genres && (
        <div data-testid="genres">
          {movie.genres.map((g: Genre) => g.name).join(', ')}
        </div>
      )}
    </div>
  ),
}));

const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  overview: 'A great test movie for our components.',
  posterPath: '/test-poster.jpg',
  backdropPath: '/test-backdrop.jpg',
  releaseDate: '2024-01-15',
  voteAverage: 8.5,
  runtime: 142,
  category: 'popular',
  tagline: 'The ultimate test adventure',
  status: 'Released',
  budget: 150000000,
  revenue: 750000000,
  popularity: 477.8545,
  genres: [
    { id: 28, name: 'Action' },
    { id: 35, name: 'Comedy' },
  ],
  productionCompanies: [
    {
      id: 1,
      name: 'Test Studios',
      logoPath: '/test-logo.png',
      originCountry: 'US',
    },
  ],
  isAdult: false,
  originalTitle: 'Test Movie Original',
};

const renderMovieDetailView = (
  movie: Movie,
  category?: 'popular' | 'top' | 'upcoming'
) => {
  return render(
    <MemoryRouter>
      <MovieDetailView movie={movie} category={category} />
    </MemoryRouter>
  );
};

describe('MovieDetailView', () => {
  describe('Basic Rendering', () => {
    it('should render movie details with all sub-components', () => {
      renderMovieDetailView(mockMovie);

      expect(screen.getByTestId('movie-detail-header')).toBeInTheDocument();
      expect(screen.getByTestId('movie-detail-content')).toBeInTheDocument();
      expect(
        screen.getByTestId('movie-detail-additional-info')
      ).toBeInTheDocument();

      expect(
        screen.getByRole('heading', { level: 1, name: 'Test Movie' })
      ).toBeInTheDocument();
    });

    it('should pass correct props to header component', () => {
      renderMovieDetailView(mockMovie, 'top');

      expect(screen.getByTestId('category-badge')).toHaveTextContent('top');
      expect(screen.getByTestId('tagline')).toHaveTextContent(
        'The ultimate test adventure'
      );
    });

    it('should pass correct props to content component', () => {
      renderMovieDetailView(mockMovie);

      expect(screen.getByTestId('runtime')).toHaveTextContent('142 min');
      expect(screen.getByTestId('overview')).toHaveTextContent(
        'A great test movie for our components.'
      );
    });

    it('should pass movie data to additional info component', () => {
      renderMovieDetailView(mockMovie);

      expect(screen.getByTestId('genres')).toHaveTextContent('Action, Comedy');
    });
  });

  describe('Category Handling', () => {
    it('should use category from props when provided', () => {
      renderMovieDetailView(mockMovie, 'top');

      expect(screen.getByTestId('category-badge')).toHaveTextContent('top');
    });

    it('should fallback to movie category when props category not provided', () => {
      renderMovieDetailView(mockMovie);

      expect(screen.getByTestId('category-badge')).toHaveTextContent('popular');
    });

    it('should prioritize props category over movie category', () => {
      const movieWithDifferentCategory = {
        ...mockMovie,
        category: 'upcoming' as const,
      };
      renderMovieDetailView(movieWithDifferentCategory, 'popular');

      expect(screen.getByTestId('category-badge')).toHaveTextContent('popular');
    });
  });

  describe('CSS Classes', () => {
    it('should apply category-specific CSS class when category is available', () => {
      renderMovieDetailView(mockMovie, 'popular');

      const container = screen
        .getByTestId('movie-detail-header')
        .closest('.movie-detail-view');
      expect(container).toHaveClass('movie-detail-view--popular');
    });

    it('should not apply category class when no category is available', () => {
      const movieWithoutCategory = { ...mockMovie, category: undefined };
      renderMovieDetailView(movieWithoutCategory);

      const container = screen
        .getByTestId('movie-detail-header')
        .closest('.movie-detail-view');
      expect(container).not.toHaveClass('movie-detail-view--popular');
      expect(container).not.toHaveClass('movie-detail-view--top');
      expect(container).not.toHaveClass('movie-detail-view--upcoming');
    });
  });

  describe('Component Integration', () => {
    it('should render all sub-components in correct order', () => {
      renderMovieDetailView(mockMovie);

      const container = document.querySelector('.movie-detail-view');
      const children = container?.children;

      expect(children?.[0]).toHaveAttribute(
        'data-testid',
        'movie-detail-header'
      );
      expect(children?.[1]).toHaveAttribute(
        'data-testid',
        'movie-detail-content'
      );
      expect(children?.[2]).toHaveAttribute(
        'data-testid',
        'movie-detail-additional-info'
      );
    });
  });
});
