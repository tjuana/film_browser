import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MovieGenres } from '../components/MovieGenres';
import type { Genre } from '@entities/movie/model/types';

const mockGenres: Genre[] = [
  { id: 28, name: 'Action' },
  { id: 35, name: 'Comedy' },
  { id: 18, name: 'Drama' },
  { id: 878, name: 'Science Fiction' },
];

describe('MovieGenres', () => {
  describe('Basic Rendering', () => {
    it('should render section title when genres are provided', () => {
      render(<MovieGenres genres={mockGenres} />);

      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
        'Genres'
      );
    });

    it('should render all genre tags', () => {
      render(<MovieGenres genres={mockGenres} />);

      expect(screen.getByText('Action')).toBeInTheDocument();
      expect(screen.getByText('Comedy')).toBeInTheDocument();
      expect(screen.getByText('Drama')).toBeInTheDocument();
      expect(screen.getByText('Science Fiction')).toBeInTheDocument();
    });

    it('should apply correct CSS classes to genre tags', () => {
      render(<MovieGenres genres={[mockGenres[0]]} />);

      const genreTag = screen.getByText('Action');
      expect(genreTag).toHaveClass('movie-detail-view__genre-tag');
    });
  });

  describe('Edge Cases', () => {
    it('should render nothing when genres array is empty', () => {
      render(<MovieGenres genres={[]} />);

      expect(screen.queryByText('Genres')).not.toBeInTheDocument();
    });

    it('should render nothing when genres is undefined', () => {
      render(<MovieGenres genres={undefined as unknown as Genre[]} />);

      expect(screen.queryByText('Genres')).not.toBeInTheDocument();
    });

    it('should handle single genre', () => {
      render(<MovieGenres genres={[{ id: 28, name: 'Action' }]} />);

      expect(screen.getByText('Genres')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
    });

    it('should handle many genres', () => {
      const manyGenres: Genre[] = [
        { id: 1, name: 'Action' },
        { id: 2, name: 'Adventure' },
        { id: 3, name: 'Animation' },
        { id: 4, name: 'Comedy' },
        { id: 5, name: 'Crime' },
        { id: 6, name: 'Documentary' },
        { id: 7, name: 'Drama' },
      ];

      render(<MovieGenres genres={manyGenres} />);

      expect(screen.getByText('Genres')).toBeInTheDocument();
      manyGenres.forEach((genre) => {
        expect(screen.getByText(genre.name)).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading structure', () => {
      render(<MovieGenres genres={mockGenres} />);

      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Genres');
    });

    it('should use proper semantic markup', () => {
      render(<MovieGenres genres={mockGenres} />);

      const section = screen
        .getByText('Genres')
        .closest('.movie-detail-view__section');
      expect(section).toBeInTheDocument();
    });
  });
});
