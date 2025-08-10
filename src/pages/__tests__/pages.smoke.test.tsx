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
    getPopular: vi.fn().mockResolvedValue([]),
    getTopRated: vi.fn().mockResolvedValue([]),
    getUpcoming: vi.fn().mockResolvedValue([]),
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
              popular: [],
              topRated: [],
              upcoming: [],
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

describe('pages smoke', () => {
  it('home renders heading', async () => {
    const router = createTestRouter(['/']);
    render(<RouterProvider router={router} />);

    expect(
      await screen.findByRole('heading', { name: /film browser/i })
    ).toBeInTheDocument();
  });

  it('wishlist renders heading', async () => {
    const router = createTestRouter(['/wishlist']);
    render(<RouterProvider router={router} />);

    expect(
      await screen.findByRole('heading', { name: /my wish list/i })
    ).toBeInTheDocument();
  });
});
