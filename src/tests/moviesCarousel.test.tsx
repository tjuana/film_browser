import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MoviesCarousel } from '@features/movies-carousel';

// Mock the service factory so the hook uses our controllable service
vi.mock('@entities/movie/api/factory', () => {
  const service = {
    kind: 'mock' as const,
    getPopular: vi.fn(),
    getTopRated: vi.fn(),
    getUpcoming: vi.fn(),
    getMovieById: vi.fn(),
  };
  return {
    __esModule: true,
    createMoviesService: () => service,
    _mockService: service,
  };
});

// Access the exported mock service to configure per test
type MockFactory = {
  _mockService: {
    getPopular: ReturnType<typeof vi.fn>;
    getTopRated: ReturnType<typeof vi.fn>;
    getUpcoming: ReturnType<typeof vi.fn>;
    getMovieById: ReturnType<typeof vi.fn>;
  };
};
const { _mockService } = (await import(
  '@entities/movie/api/factory'
)) as unknown as MockFactory;
import { MemoryRouter } from 'react-router-dom';

const renderWithProviders = (ui: React.ReactNode) => {
  const qc = new QueryClient();
  return render(
    <QueryClientProvider client={qc}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>
  );
};
describe('MoviesCarousel', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders items after loading', async () => {
    _mockService.getPopular.mockResolvedValue([
      { id: 1, title: 'A' },
      { id: 2, title: 'B' },
    ]);

    renderWithProviders(<MoviesCarousel title="Popular" category="popular" />);

    // skeletons shown initially
    expect(screen.getAllByRole('generic').length).toBeGreaterThan(0);

    // eventually list renders with items
    const list = await screen.findByRole('list');
    expect(list).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBe(2);
  });

  it('shows error and retries', async () => {
    // Fail twice to exhaust react-query retry=1, then succeed on manual retry
    _mockService.getPopular.mockRejectedValueOnce(new Error('fail'));
    _mockService.getPopular.mockRejectedValueOnce(new Error('fail'));
    _mockService.getPopular.mockResolvedValueOnce([{ id: 3, title: 'C' }]);

    renderWithProviders(<MoviesCarousel title="Popular" category="popular" />);

    // Expect error alert
    const alert = await screen.findByRole('alert', {}, { timeout: 1500 });
    expect(alert).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /retry/i }));

    // After retry data appears
    const items = await screen.findAllByRole('listitem');
    expect(items.length).toBe(1);
  });
});
