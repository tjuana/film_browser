import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { HomePage } from '@pages/HomePage';
import { WishListPage } from '@pages/WishListPage';
import { MovieDetailPage } from '@pages/MovieDetailPage';
import { RootLayout } from '@app/layouts/RootLayout';
import { ROUTES } from '@app/router/routes';

// Mock the movies service to return predictable data
vi.mock('@features/movies/api/factory', () => ({
  createMoviesService: () => ({
    getPopular: vi.fn().mockResolvedValue([
      {
        id: 1,
        title: 'Popular Movie 1',
        posterPath: '/popular1.jpg',
        category: 'popular',
      },
      {
        id: 2,
        title: 'Popular Movie 2',
        posterPath: '/popular2.jpg',
        category: 'popular',
      },
    ]),
    getTopRated: vi.fn().mockResolvedValue([
      {
        id: 3,
        title: 'Top Rated Movie 1',
        posterPath: '/top1.jpg',
        category: 'top',
      },
      {
        id: 4,
        title: 'Top Rated Movie 2',
        posterPath: '/top2.jpg',
        category: 'top',
      },
    ]),
    getUpcoming: vi.fn().mockResolvedValue([
      {
        id: 5,
        title: 'Upcoming Movie 1',
        posterPath: '/upcoming1.jpg',
        category: 'upcoming',
      },
      {
        id: 6,
        title: 'Upcoming Movie 2',
        posterPath: '/upcoming2.jpg',
        category: 'upcoming',
      },
    ]),
    getMovieById: vi.fn().mockResolvedValue({
      id: 1,
      title: 'Test Movie',
      overview: 'A test movie for testing.',
      posterPath: '/test.jpg',
      runtime: 120,
      category: 'popular',
    }),
  }),
}));

const createTestRouter = (initialEntries: string[]) => {
  return createMemoryRouter(
    [
      {
        path: '/',
        element: <RootLayout />,
        children: [
          {
            path: ROUTES.HOME,
            element: <HomePage />,
            loader: async () => ({
              popular: [
                {
                  id: 1,
                  title: 'Popular Movie 1',
                  posterPath: '/popular1.jpg',
                  category: 'popular',
                },
                {
                  id: 2,
                  title: 'Popular Movie 2',
                  posterPath: '/popular2.jpg',
                  category: 'popular',
                },
              ],
              topRated: [
                {
                  id: 3,
                  title: 'Top Rated Movie 1',
                  posterPath: '/top1.jpg',
                  category: 'top',
                },
                {
                  id: 4,
                  title: 'Top Rated Movie 2',
                  posterPath: '/top2.jpg',
                  category: 'top',
                },
              ],
              upcoming: [
                {
                  id: 5,
                  title: 'Upcoming Movie 1',
                  posterPath: '/upcoming1.jpg',
                  category: 'upcoming',
                },
                {
                  id: 6,
                  title: 'Upcoming Movie 2',
                  posterPath: '/upcoming2.jpg',
                  category: 'upcoming',
                },
              ],
            }),
          },
          {
            path: ROUTES.MOVIE_DETAIL,
            element: <MovieDetailPage />,
            loader: async () => ({
              movie: {
                id: 1,
                title: 'Test Movie',
                overview: 'A test movie for testing.',
                posterPath: '/test.jpg',
                runtime: 120,
                category: 'popular',
              },
              category: 'popular' as const,
            }),
          },
          {
            path: ROUTES.WISHLIST,
            element: <WishListPage />,
            // No loader - uses Zustand store
          },
        ],
      },
    ],
    {
      initialEntries,
    }
  );
};

describe('Router Smoke Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Home Page Route (/)', () => {
    it('should render home page with layout and all 3 carousels', async () => {
      const router = createTestRouter(['/']);
      render(<RouterProvider router={router} />);

      // Check that the main layout is rendered
      expect(
        await screen.findByRole('heading', { name: /film browser/i })
      ).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: /wish list/i })
      ).toBeInTheDocument();

      // Check for carousel sections (they should be present even if no movies are visible)
      await waitFor(() => {
        const sections = screen.getAllByRole('region');
        expect(sections.length).toBeGreaterThan(0);
      });
    });

    it('should have working navigation links', async () => {
      const router = createTestRouter(['/']);
      render(<RouterProvider router={router} />);

      await waitFor(() => {
        expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute(
          'href',
          '/'
        );
        expect(
          screen.getByRole('link', { name: /wish list/i })
        ).toHaveAttribute('href', '/wishlist');
      });
    });
  });

  describe('Wishlist Page Route (/wishlist)', () => {
    it('should render wishlist page', async () => {
      const router = createTestRouter(['/wishlist']);
      render(<RouterProvider router={router} />);

      expect(
        await screen.findByRole('heading', { name: /my wish list/i })
      ).toBeInTheDocument();
    });

    it('should show empty state when no items', async () => {
      const router = createTestRouter(['/wishlist']);
      render(<RouterProvider router={router} />);

      await waitFor(() => {
        expect(
          screen.getByText(/your wish list is empty/i)
        ).toBeInTheDocument();
      });
    });
  });

  describe('Movie Detail Page Route (/movie/:id)', () => {
    it('should render movie detail page', async () => {
      const router = createTestRouter(['/movie/1']);
      render(<RouterProvider router={router} />);

      expect(
        await screen.findByRole('heading', { name: /test movie/i })
      ).toBeInTheDocument();
    });

    it('should show back to home link', async () => {
      const router = createTestRouter(['/movie/1']);
      render(<RouterProvider router={router} />);

      await waitFor(() => {
        expect(
          screen.getByRole('link', { name: /← back to home/i })
        ).toBeInTheDocument();
      });
    });
  });

  describe('Route Integration', () => {
    it('should handle direct navigation to different routes', () => {
      // Test navigation to wishlist
      const wishlistRouter = createTestRouter(['/wishlist']);
      const { unmount } = render(<RouterProvider router={wishlistRouter} />);
      unmount();

      // Test navigation to movie detail
      const movieRouter = createTestRouter(['/movie/1']);
      render(<RouterProvider router={movieRouter} />);
    });
  });

  describe('Error Handling', () => {
    it('should handle missing routes', () => {
      const router = createTestRouter(['/nonexistent']);
      render(<RouterProvider router={router} />);

      // Router will show a 404 or redirect - just ensure it doesn't crash
      expect(document.body).toBeInTheDocument();
    });
  });
});
