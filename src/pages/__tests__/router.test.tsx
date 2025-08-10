import { describe, it, expect, vi } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { HomePage } from '@pages/HomePage';
import { WishListPage } from '@pages/WishListPage';
import { RootLayout } from '@app/layouts/RootLayout';
import { ROUTES } from '@app/router/routes';

// Mock the movies service for the loaders
vi.mock('@features/movies/api/factory', () => ({
  createMoviesService: () => ({
    getPopular: vi
      .fn()
      .mockResolvedValue([
        { id: 1, title: 'Popular Movie', posterPath: '/popular.jpg' },
      ]),
    getTopRated: vi
      .fn()
      .mockResolvedValue([
        { id: 2, title: 'Top Movie', posterPath: '/top.jpg' },
      ]),
    getUpcoming: vi
      .fn()
      .mockResolvedValue([
        { id: 3, title: 'Upcoming Movie', posterPath: '/upcoming.jpg' },
      ]),
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
                { id: 1, title: 'Popular Movie', posterPath: '/popular.jpg' },
              ],
              topRated: [{ id: 2, title: 'Top Movie', posterPath: '/top.jpg' }],
              upcoming: [
                { id: 3, title: 'Upcoming Movie', posterPath: '/upcoming.jpg' },
              ],
            }),
          },
          {
            path: ROUTES.WISHLIST,
            element: <WishListPage />,
          },
        ],
      },
    ],
    {
      initialEntries,
    }
  );
};

describe('router', () => {
  it('renders home', async () => {
    const router = createTestRouter(['/']);
    render(<RouterProvider router={router} />);

    expect(
      await screen.findByRole('heading', { name: /film browser/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /wish list/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  });

  it('renders wishlist', async () => {
    const router = createTestRouter(['/wishlist']);
    render(<RouterProvider router={router} />);

    expect(
      await screen.findByRole('heading', { name: /my wish list/i })
    ).toBeInTheDocument();
  });
});
