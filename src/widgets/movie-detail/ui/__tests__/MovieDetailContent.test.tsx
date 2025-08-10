import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MovieDetailContent } from '../components/MovieDetailContent';
import type { MovieBrief } from '@entities/movie/model/types';

// Mock the WishlistToggle component
vi.mock('@features/wishlist/ui/WishlistToggle', () => ({
  WishlistToggle: ({ movie }: { movie: MovieBrief }) => (
    <button data-testid="wishlist-toggle">
      Wishlist Toggle for {movie.title}
    </button>
  ),
}));

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  posterPath: '/test-poster.jpg',
  voteAverage: 8.5,
};

describe('MovieDetailContent', () => {
  describe('Poster Section', () => {
    it('should render movie poster', () => {
      render(
        <MovieDetailContent
          posterPath="/test-poster.jpg"
          title="Test Movie"
          movie={mockMovie}
        />
      );

      const poster = screen.getByRole('img');
      expect(poster).toBeInTheDocument();
      expect(poster).toHaveAttribute('src', '/test-poster.jpg');
      expect(poster).toHaveAttribute('alt', 'Test Movie');
    });

    it('should handle missing poster path', () => {
      render(<MovieDetailContent title="No Poster Movie" movie={mockMovie} />);

      const poster = screen.getByRole('img');
      expect(poster).toBeInTheDocument();
      expect(poster).toHaveAttribute('alt', 'No Poster Movie');
    });
  });

  describe('Meta Information', () => {
    it('should render release date when provided', () => {
      render(
        <MovieDetailContent
          title="Test Movie"
          releaseDate="2024-01-15"
          movie={mockMovie}
        />
      );

      expect(screen.getByText('2024-01-15')).toBeInTheDocument();
    });

    it('should render vote average when provided', () => {
      render(
        <MovieDetailContent
          title="Test Movie"
          voteAverage={8.7}
          movie={mockMovie}
        />
      );

      expect(screen.getByText('★ 8.7')).toBeInTheDocument();
    });

    it('should render runtime when provided', () => {
      render(
        <MovieDetailContent
          title="Test Movie"
          runtime={142}
          movie={mockMovie}
        />
      );

      expect(screen.getByText('142 min')).toBeInTheDocument();
    });

    it('should not render runtime when not provided', () => {
      render(<MovieDetailContent title="Test Movie" movie={mockMovie} />);

      expect(screen.queryByText(/min/)).not.toBeInTheDocument();
    });

    it('should render all meta information together', () => {
      render(
        <MovieDetailContent
          title="Complete Movie"
          releaseDate="2024-01-15"
          voteAverage={9.2}
          runtime={155}
          movie={mockMovie}
        />
      );

      expect(screen.getByText('2024-01-15')).toBeInTheDocument();
      expect(screen.getByText('★ 9.2')).toBeInTheDocument();
      expect(screen.getByText('155 min')).toBeInTheDocument();
    });
  });

  describe('Overview Section', () => {
    it('should render movie overview when provided', () => {
      render(
        <MovieDetailContent
          title="Test Movie"
          overview="This is an amazing movie about testing components."
          movie={mockMovie}
        />
      );

      expect(
        screen.getByText('This is an amazing movie about testing components.')
      ).toBeInTheDocument();
    });

    it('should not render overview when not provided', () => {
      render(<MovieDetailContent title="Test Movie" movie={mockMovie} />);

      expect(screen.queryByText(/amazing movie/)).not.toBeInTheDocument();
    });
  });

  describe('Wishlist Toggle', () => {
    it('should render wishlist toggle with correct movie data', () => {
      render(<MovieDetailContent title="Test Movie" movie={mockMovie} />);

      const wishlistToggle = screen.getByTestId('wishlist-toggle');
      expect(wishlistToggle).toBeInTheDocument();
      expect(wishlistToggle).toHaveTextContent(
        'Wishlist Toggle for Test Movie'
      );
    });
  });

  describe('Full Content Integration', () => {
    it('should render all sections with complete data', () => {
      render(
        <MovieDetailContent
          posterPath="/complete-poster.jpg"
          title="Complete Test Movie"
          releaseDate="2024-03-20"
          voteAverage={8.9}
          runtime={128}
          overview="A comprehensive test of the movie detail content component with all features."
          movie={mockMovie}
        />
      );

      // Poster
      const poster = screen.getByRole('img');
      expect(poster).toHaveAttribute('src', '/complete-poster.jpg');
      expect(poster).toHaveAttribute('alt', 'Complete Test Movie');

      // Meta info
      expect(screen.getByText('2024-03-20')).toBeInTheDocument();
      expect(screen.getByText('★ 8.9')).toBeInTheDocument();
      expect(screen.getByText('128 min')).toBeInTheDocument();

      // Overview
      expect(
        screen.getByText(/comprehensive test of the movie detail content/)
      ).toBeInTheDocument();

      // Wishlist toggle
      expect(screen.getByTestId('wishlist-toggle')).toBeInTheDocument();
    });
  });
});
