import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MovieDetailView } from '../MovieDetailView';
import type { Genre, Movie } from '@entities/movie/model/types';

// Mock the movies service
const mockGetMovieById = vi.fn();
vi.mock('@features/movies/api/factory', () => ({
  createMoviesService: () => ({
    kind: 'mock',
    getMovieById: mockGetMovieById,
  }),
}));

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

const renderMovieDetailView = (movieId: number, searchParams = '') => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  const initialEntries = [`/movie/${movieId}${searchParams}`];

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={initialEntries}>
        <MovieDetailView movieId={movieId} />
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe('MovieDetailView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Loading State', () => {
    it('should show loading state while fetching movie data', () => {
      mockGetMovieById.mockImplementation(() => new Promise(() => {})); // Never resolves

      renderMovieDetailView(1);

      expect(screen.getByText('Loading movie details...')).toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('should show error state when movie fetch fails', async () => {
      mockGetMovieById.mockRejectedValue(new Error('Movie not found'));

      renderMovieDetailView(1);

      await waitFor(() => {
        expect(
          screen.getByText('Failed to load movie details. Please try again.')
        ).toBeInTheDocument();
      });
    });

    it('should show error state when movie data is null', async () => {
      mockGetMovieById.mockResolvedValue(null);

      renderMovieDetailView(1);

      await waitFor(() => {
        expect(
          screen.getByText('Failed to load movie details. Please try again.')
        ).toBeInTheDocument();
      });
    });
  });

  describe('Successful Movie Loading', () => {
    beforeEach(() => {
      mockGetMovieById.mockResolvedValue(mockMovie);
    });

    it('should render movie details when data loads successfully', async () => {
      renderMovieDetailView(1);

      await waitFor(() => {
        expect(screen.getByTestId('movie-detail-header')).toBeInTheDocument();
        expect(screen.getByTestId('movie-detail-content')).toBeInTheDocument();
        expect(
          screen.getByTestId('movie-detail-additional-info')
        ).toBeInTheDocument();
      });

      expect(
        screen.getByRole('heading', { level: 1, name: 'Test Movie' })
      ).toBeInTheDocument();
    });

    it('should pass correct props to header component', async () => {
      renderMovieDetailView(1);

      await waitFor(() => {
        expect(
          screen.getByRole('heading', { level: 1, name: 'Test Movie' })
        ).toBeInTheDocument();
        expect(screen.getByTestId('category-badge')).toHaveTextContent(
          'popular'
        );
        expect(screen.getByTestId('tagline')).toHaveTextContent(
          'The ultimate test adventure'
        );
      });
    });

    it('should pass correct props to content component', async () => {
      renderMovieDetailView(1);

      await waitFor(() => {
        expect(screen.getByTestId('runtime')).toHaveTextContent('142 min');
        expect(screen.getByTestId('overview')).toHaveTextContent(
          'A great test movie for our components.'
        );
      });
    });

    it('should pass movie data to additional info component', async () => {
      renderMovieDetailView(1);

      await waitFor(() => {
        expect(screen.getByTestId('genres')).toHaveTextContent(
          'Action, Comedy'
        );
      });
    });
  });

  describe('Category from URL Parameters', () => {
    beforeEach(() => {
      mockGetMovieById.mockResolvedValue({ ...mockMovie, category: undefined });
    });

    it('should use category from URL search params when available', async () => {
      renderMovieDetailView(1, '?category=top');

      await waitFor(() => {
        expect(screen.getByTestId('category-badge')).toHaveTextContent('top');
      });
    });

    it('should fallback to movie category when URL param is not provided', async () => {
      mockGetMovieById.mockResolvedValue({
        ...mockMovie,
        category: 'upcoming',
      });

      renderMovieDetailView(1);

      await waitFor(() => {
        expect(screen.getByTestId('category-badge')).toHaveTextContent(
          'upcoming'
        );
      });
    });

    it('should prioritize URL category over movie category', async () => {
      mockGetMovieById.mockResolvedValue({
        ...mockMovie,
        category: 'upcoming',
      });

      renderMovieDetailView(1, '?category=popular');

      await waitFor(() => {
        expect(screen.getByTestId('category-badge')).toHaveTextContent(
          'popular'
        );
      });
    });
  });

  describe('CSS Classes', () => {
    beforeEach(() => {
      mockGetMovieById.mockResolvedValue(mockMovie);
    });

    it('should apply category-specific CSS class when category is available', async () => {
      renderMovieDetailView(1);

      await waitFor(() => {
        const container = screen
          .getByTestId('movie-detail-header')
          .closest('.movie-detail-view');
        expect(container).toHaveClass('movie-detail-view--popular');
      });
    });

    it('should apply URL category CSS class', async () => {
      renderMovieDetailView(1, '?category=top');

      await waitFor(() => {
        const container = screen
          .getByTestId('movie-detail-header')
          .closest('.movie-detail-view');
        expect(container).toHaveClass('movie-detail-view--top');
      });
    });

    it('should not apply category class when no category is available', async () => {
      mockGetMovieById.mockResolvedValue({ ...mockMovie, category: undefined });

      renderMovieDetailView(1);

      await waitFor(() => {
        const container = screen
          .getByTestId('movie-detail-header')
          .closest('.movie-detail-view');
        expect(container).not.toHaveClass('movie-detail-view--popular');
        expect(container).not.toHaveClass('movie-detail-view--top');
        expect(container).not.toHaveClass('movie-detail-view--upcoming');
      });
    });
  });

  describe('Component Integration', () => {
    beforeEach(() => {
      mockGetMovieById.mockResolvedValue(mockMovie);
    });

    it('should render all sub-components in correct order', async () => {
      renderMovieDetailView(1);

      await waitFor(() => {
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

    it('should call movie service with correct ID', async () => {
      renderMovieDetailView(123);

      await waitFor(() => {
        expect(mockGetMovieById).toHaveBeenCalledWith(123);
      });
    });

    it('should not fetch when movieId is not finite', () => {
      renderMovieDetailView(NaN);

      expect(mockGetMovieById).not.toHaveBeenCalled();
    });
  });
});
