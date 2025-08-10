import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RootLayout } from '@app/layouts/RootLayout';
import { ROUTES } from '@app/router/routes';

// Pages
import { HomePage } from '@pages/HomePage';
import { MovieDetailPage } from '@pages/MovieDetailPage';
import { WishListPage } from '@pages/WishListPage';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.MOVIE_DETAIL} element={<MovieDetailPage />} />
            <Route path={ROUTES.WISHLIST} element={<WishListPage />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
