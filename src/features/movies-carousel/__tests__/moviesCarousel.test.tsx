import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MoviesCarousel } from '@features/movies-carousel';

// Mock the useMovies hook directly to control its behavior
vi.mock('@features/movies-carousel/model/useMovies', () => ({
  useMovies: vi.fn(),
}));

// Access the exported mock hook to configure per test
type MockUseMovies = {
  useMovies: ReturnType<typeof vi.fn>;
};
const { useMovies } = (await import(
  '@features/movies-carousel/model/useMovies'
)) as unknown as MockUseMovies;
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
    useMovies.mockReturnValue({
      data: [
        { id: 1, title: 'A' },
        { id: 2, title: 'B' },
      ],
      isLoading: false,
      isError: false,
    });

    renderWithProviders(<MoviesCarousel title="Popular" category="popular" />);

    // eventually list renders with items
    const list = await screen.findByRole('list');
    expect(list).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBe(2);
  });

  it('shows error and retries', async () => {
    const mockRefetch = vi.fn();

    useMovies.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      refetch: mockRefetch,
    });

    renderWithProviders(<MoviesCarousel title="Popular" category="popular" />);

    // Error state should be visible immediately
    expect(screen.getByText('Error loading movies')).toBeInTheDocument();

    // Now click the retry button
    await userEvent.click(screen.getByRole('button', { name: /retry/i }));

    // Verify refetch was called
    expect(mockRefetch).toHaveBeenCalled();
  });
});
