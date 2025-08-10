import { describe, it, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { HomePage } from '@pages/HomePage';
import { WishListPage } from '@pages/WishListPage';
import { RootLayout } from '@app/layouts/RootLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const renderWithQuery = (ui: React.ReactNode) => {
  const qc = new QueryClient();
  return render(<QueryClientProvider client={qc}>{ui}</QueryClientProvider>);
};

describe('pages smoke', () => {
  it('home renders heading', () => {
    renderWithQuery(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={
              <RootLayout>
                <HomePage />
              </RootLayout>
            }
          />
        </Routes>
      </MemoryRouter>
    );
    expect(
      screen.getByRole('heading', { name: /film browser/i })
    ).toBeInTheDocument();
  });

  it('wishlist renders heading', () => {
    renderWithQuery(
      <MemoryRouter initialEntries={['/wishlist']}>
        <Routes>
          <Route path="/wishlist" element={<WishListPage />} />
        </Routes>
      </MemoryRouter>
    );
    expect(
      screen.getByRole('heading', { name: /my wish list/i })
    ).toBeInTheDocument();
  });
});
