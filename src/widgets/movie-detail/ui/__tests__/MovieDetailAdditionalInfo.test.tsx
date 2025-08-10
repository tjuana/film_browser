import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MovieDetailAdditionalInfo } from '../components/MovieDetailAdditionalInfo';
import type {
  Genre,
  Movie,
  ProductionCompany,
} from '@entities/movie/model/types';

// Mock the sub-components to test integration
vi.mock('../components/MovieGenres', () => ({
  MovieGenres: ({ genres }: { genres: Genre[] }) => (
    <div data-testid="movie-genres">
      {genres?.map((g: Genre) => g.name).join(', ')}
    </div>
  ),
}));

vi.mock('../components/ProductionCompanies', () => ({
  ProductionCompanies: ({ companies }: { companies: ProductionCompany[] }) => (
    <div data-testid="production-companies">
      {companies?.map((c: ProductionCompany) => c.name).join(', ')}
    </div>
  ),
}));

vi.mock('../components/MovieDetails', () => ({
  MovieDetails: ({
    status,
    budget,
    revenue,
    popularity,
  }: {
    status?: string;
    budget?: number;
    revenue?: number;
    popularity?: number;
  }) => {
    const hasAnyDetails =
      status ||
      (budget && budget > 0) ||
      (revenue && revenue > 0) ||
      popularity !== undefined;

    if (!hasAnyDetails) {
      return null;
    }

    return (
      <div data-testid="movie-details">
        {status && <span data-testid="status">{status}</span>}
        {budget && budget > 0 && (
          <span data-testid="budget">${budget.toLocaleString('en-US')}</span>
        )}
        {revenue && revenue > 0 && (
          <span data-testid="revenue">${revenue.toLocaleString('en-US')}</span>
        )}
        {popularity !== undefined && (
          <span data-testid="popularity">{popularity.toFixed(1)}</span>
        )}
      </div>
    );
  },
}));

const createMockMovie = (overrides: Partial<Movie> = {}): Movie => ({
  id: 1,
  title: 'Test Movie',
  overview: 'Test overview',
  posterPath: '/test.jpg',
  releaseDate: '2024-01-01',
  voteAverage: 8.5,
  isAdult: false,
  originalTitle: 'Test Movie',
  ...overrides,
});

describe('MovieDetailAdditionalInfo', () => {
  describe('Rendering Sub-components', () => {
    it('should render MovieGenres when genres are provided', () => {
      const movie = createMockMovie({
        genres: [
          { id: 28, name: 'Action' },
          { id: 35, name: 'Comedy' },
        ],
      });

      render(<MovieDetailAdditionalInfo movie={movie} />);

      expect(screen.getByTestId('movie-genres')).toBeInTheDocument();
      expect(screen.getByTestId('movie-genres')).toHaveTextContent(
        'Action, Comedy'
      );
    });

    it('should render ProductionCompanies when companies are provided', () => {
      const movie = createMockMovie({
        productionCompanies: [
          {
            id: 1,
            name: 'Warner Bros',
            logoPath: '/wb.png',
            originCountry: 'US',
          },
          {
            id: 2,
            name: 'Universal',
            logoPath: '/universal.png',
            originCountry: 'US',
          },
        ],
      });

      render(<MovieDetailAdditionalInfo movie={movie} />);

      expect(screen.getByTestId('production-companies')).toBeInTheDocument();
      expect(screen.getByTestId('production-companies')).toHaveTextContent(
        'Warner Bros, Universal'
      );
    });

    it('should render MovieDetails when movie details are provided', () => {
      const movie = createMockMovie({
        status: 'Released',
        budget: 150000000,
        revenue: 750000000,
        popularity: 477.8545,
      });

      render(<MovieDetailAdditionalInfo movie={movie} />);

      expect(screen.getByTestId('movie-details')).toBeInTheDocument();
      expect(screen.getByTestId('status')).toHaveTextContent('Released');
      expect(screen.getByTestId('budget')).toHaveTextContent('$150,000,000');
      expect(screen.getByTestId('revenue')).toHaveTextContent('$750,000,000');
      expect(screen.getByTestId('popularity')).toHaveTextContent('477.9');
    });
  });

  describe('Conditional Rendering', () => {
    it('should render additional info section when any data is available', () => {
      const movie = createMockMovie({
        genres: [{ id: 28, name: 'Action' }],
      });

      render(<MovieDetailAdditionalInfo movie={movie} />);

      expect(screen.getByTestId('movie-genres')).toBeInTheDocument();
    });

    it('should not render anything when no additional info is available', () => {
      const movie = createMockMovie({
        genres: undefined,
        productionCompanies: undefined,
        status: undefined,
        budget: undefined,
        revenue: undefined,
        popularity: undefined,
      });

      const { container } = render(<MovieDetailAdditionalInfo movie={movie} />);

      expect(container.firstChild).toBeNull();
    });

    it('should not render when genres array is empty and no other data', () => {
      const movie = createMockMovie({
        genres: [],
        productionCompanies: [],
        status: undefined,
        budget: 0,
        revenue: 0,
        popularity: undefined,
      });

      const { container } = render(<MovieDetailAdditionalInfo movie={movie} />);

      expect(container.firstChild).toBeNull();
    });

    it('should render when budget is greater than 0', () => {
      const movie = createMockMovie({
        budget: 1000000,
      });

      render(<MovieDetailAdditionalInfo movie={movie} />);

      expect(screen.getByTestId('movie-details')).toBeInTheDocument();
    });

    it('should render when revenue is greater than 0', () => {
      const movie = createMockMovie({
        revenue: 5000000,
      });

      render(<MovieDetailAdditionalInfo movie={movie} />);

      expect(screen.getByTestId('movie-details')).toBeInTheDocument();
    });

    it('should render when popularity is provided (even if 0)', () => {
      const movie = createMockMovie({
        popularity: 0,
      });

      render(<MovieDetailAdditionalInfo movie={movie} />);

      expect(screen.getByTestId('movie-details')).toBeInTheDocument();
    });
  });

  describe('Complete Integration', () => {
    it('should render all sections when complete movie data is provided', () => {
      const movie = createMockMovie({
        genres: [
          { id: 28, name: 'Action' },
          { id: 12, name: 'Adventure' },
        ],
        productionCompanies: [
          {
            id: 1,
            name: 'Marvel Studios',
            logoPath: '/marvel.png',
            originCountry: 'US',
          },
          {
            id: 2,
            name: 'Disney',
            logoPath: '/disney.png',
            originCountry: 'US',
          },
        ],
        status: 'Released',
        budget: 200000000,
        revenue: 2000000000,
        popularity: 523.456,
      });

      render(<MovieDetailAdditionalInfo movie={movie} />);

      // All sections should be present
      expect(screen.getByTestId('movie-genres')).toBeInTheDocument();
      expect(screen.getByTestId('production-companies')).toBeInTheDocument();
      expect(screen.getByTestId('movie-details')).toBeInTheDocument();

      // Check content
      expect(screen.getByTestId('movie-genres')).toHaveTextContent(
        'Action, Adventure'
      );
      expect(screen.getByTestId('production-companies')).toHaveTextContent(
        'Marvel Studios, Disney'
      );
      expect(screen.getByTestId('status')).toHaveTextContent('Released');
      expect(screen.getByTestId('budget')).toHaveTextContent('$200,000,000');
      expect(screen.getByTestId('revenue')).toHaveTextContent('$2,000,000,000');
      expect(screen.getByTestId('popularity')).toHaveTextContent('523.5');
    });

    it('should render partial sections when some data is missing', () => {
      const movie = createMockMovie({
        genres: [{ id: 18, name: 'Drama' }],
        // No production companies
        status: 'Released',
        // No budget or revenue
        popularity: 100.5,
      });

      render(<MovieDetailAdditionalInfo movie={movie} />);

      expect(screen.getByTestId('movie-genres')).toBeInTheDocument();
      expect(
        screen.queryByTestId('production-companies')
      ).not.toBeInTheDocument(); // Not rendered when no companies
      expect(screen.getByTestId('movie-details')).toBeInTheDocument();

      expect(screen.getByTestId('movie-genres')).toHaveTextContent('Drama');
      expect(screen.getByTestId('status')).toHaveTextContent('Released');
      expect(screen.getByTestId('popularity')).toHaveTextContent('100.5');
    });
  });

  describe('CSS Structure', () => {
    it('should apply correct CSS class to additional info container', () => {
      const movie = createMockMovie({
        genres: [{ id: 28, name: 'Action' }],
      });

      render(<MovieDetailAdditionalInfo movie={movie} />);

      const container = screen
        .getByTestId('movie-genres')
        .closest('.movie-detail-view__additional-info');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('movie-detail-view__additional-info');
    });
  });
});
