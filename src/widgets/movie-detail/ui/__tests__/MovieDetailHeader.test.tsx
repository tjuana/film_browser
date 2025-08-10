import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MovieDetailHeader } from '../components/MovieDetailHeader';

const renderHeader = (props: Parameters<typeof MovieDetailHeader>[0]) => {
  return render(
    <MemoryRouter>
      <MovieDetailHeader {...props} />
    </MemoryRouter>
  );
};

describe('MovieDetailHeader', () => {
  describe('Basic Rendering', () => {
    it('should render movie title', () => {
      renderHeader({
        title: 'Test Movie Title',
      });

      expect(screen.getByText('Test Movie Title')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Test Movie Title'
      );
    });

    it('should render back to home link', () => {
      renderHeader({
        title: 'Test Movie',
      });

      const backLink = screen.getByRole('link', { name: /back to home/i });
      expect(backLink).toBeInTheDocument();
      expect(backLink).toHaveAttribute('href', '/');
    });
  });

  describe('Category Badge', () => {
    it('should render popular category badge', () => {
      renderHeader({
        title: 'Popular Movie',
        category: 'popular',
      });

      const badge = screen.getByText('Popular');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('movie-detail-view__category-badge--popular');
    });

    it('should render top rated category badge', () => {
      renderHeader({
        title: 'Top Movie',
        category: 'top',
      });

      const badge = screen.getByText('Top Rated');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('movie-detail-view__category-badge--top');
    });

    it('should render upcoming category badge', () => {
      renderHeader({
        title: 'Upcoming Movie',
        category: 'upcoming',
      });

      const badge = screen.getByText('Upcoming');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('movie-detail-view__category-badge--upcoming');
    });

    it('should not render category badge when category is not provided', () => {
      renderHeader({
        title: 'No Category Movie',
      });

      expect(screen.queryByText('Popular')).not.toBeInTheDocument();
      expect(screen.queryByText('Top Rated')).not.toBeInTheDocument();
      expect(screen.queryByText('Upcoming')).not.toBeInTheDocument();
    });
  });

  describe('Tagline', () => {
    it('should render tagline when provided', () => {
      renderHeader({
        title: 'Movie with Tagline',
        tagline: 'The adventure begins here.',
      });

      expect(
        screen.getByText('"The adventure begins here."')
      ).toBeInTheDocument();
    });

    it('should not render tagline when not provided', () => {
      renderHeader({
        title: 'Movie without Tagline',
      });

      expect(screen.queryByText(/adventure/)).not.toBeInTheDocument();
    });

    it('should wrap tagline in quotes', () => {
      renderHeader({
        title: 'Quote Test',
        tagline: 'This is a tagline',
      });

      expect(screen.getByText('"This is a tagline"')).toBeInTheDocument();
    });
  });

  describe('Combined Features', () => {
    it('should render all elements together', () => {
      renderHeader({
        title: 'Complete Movie',
        category: 'popular',
        tagline: 'Amazing adventure awaits',
      });

      expect(screen.getByText('Complete Movie')).toBeInTheDocument();
      expect(screen.getByText('Popular')).toBeInTheDocument();
      expect(
        screen.getByText('"Amazing adventure awaits"')
      ).toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: /back to home/i })
      ).toBeInTheDocument();
    });
  });
});
