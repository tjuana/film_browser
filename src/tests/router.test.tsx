import { describe, it, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { HomePage } from '@pages/HomePage';
import { WishListPage } from '@pages/WishListPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const renderWithQuery = (ui: React.ReactNode) => {
  const qc = new QueryClient();
  return render(<QueryClientProvider client={qc}>{ui}</QueryClientProvider>);
};

describe('router', () => {
  it('renders home', () => {
    renderWithQuery(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /film browser/i })
    ).toBeInTheDocument();
  });

  it('renders wishlist', () => {
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
