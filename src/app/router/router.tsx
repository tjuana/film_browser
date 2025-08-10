import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@app/layouts/RootLayout';
import { ROUTES } from './routes';

// Route components
import { HomePage } from '@pages/HomePage';
import { MovieDetailPage } from '@pages/MovieDetailPage';
import { WishListPage } from '@pages/WishListPage';

// Route loaders
import { homeLoader } from '@app/routes/index';
import { movieDetailLoader } from '@app/routes/movie.$id';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <HomePage />,
        loader: homeLoader,
      },
      {
        path: ROUTES.MOVIE_DETAIL,
        element: <MovieDetailPage />,
        loader: movieDetailLoader,
      },
      {
        path: ROUTES.WISHLIST,
        element: <WishListPage />,
        // No loader - uses Zustand store
      },
    ],
  },
]);
