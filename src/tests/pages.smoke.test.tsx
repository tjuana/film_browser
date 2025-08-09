import { describe, it, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { HomePage } from '@pages/HomePage';
import { WishListPage } from '@pages/WishListPage';

describe('pages smoke', () => {
  it('home renders heading', () => {
    render(
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

  it('wishlist renders heading', () => {
    render(
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
