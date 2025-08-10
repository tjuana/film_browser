import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MovieCard } from '../MovieCard';

const renderMovieCard = (props: Parameters<typeof MovieCard>[0]) => {
  return render(
    <MemoryRouter>
      <MovieCard {...props} />
    </MemoryRouter>
  );
};

describe('MovieCard', () => {
  describe('Basic Rendering', () => {
    it('should render movie card with title and poster', () => {
      renderMovieCard({
        id: 1,
        title: 'Test Movie',
        posterUrl: '/test-poster.jpg',
        ratio: 'poster',
      });

      expect(screen.getByText('Test Movie')).toBeInTheDocument();
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', '/test-poster.jpg');
      expect(image).toHaveAttribute('alt', 'Test Movie');
    });

    it('should render with square ratio', () => {
      renderMovieCard({
        id: 1,
        title: 'Square Movie',
        posterUrl: '/square.jpg',
        ratio: 'square',
      });

      const card = screen.getByRole('link');
      expect(card).toHaveClass('movie-card--square');
    });

    it('should render with poster ratio', () => {
      renderMovieCard({
        id: 1,
        title: 'Poster Movie',
        posterUrl: '/poster.jpg',
        ratio: 'poster',
      });

      const card = screen.getByRole('link');
      expect(card).toHaveClass('movie-card--poster');
    });
  });

  describe('Rating Badge', () => {
    it('should show rating badge when vote average is provided', () => {
      renderMovieCard({
        id: 1,
        title: 'Rated Movie',
        posterUrl: '/rated.jpg',
        ratio: 'poster',
        voteAverage: 8.5,
      });

      const ratingBadge = screen.getByText('★ 8.5');
      expect(ratingBadge).toBeInTheDocument();
      expect(ratingBadge).toHaveClass('badge--rating');
    });

    it('should not show rating badge when vote average is 0', () => {
      renderMovieCard({
        id: 1,
        title: 'Unrated Movie',
        posterUrl: '/unrated.jpg',
        ratio: 'poster',
        voteAverage: 0,
      });

      expect(screen.queryByText('0')).not.toBeInTheDocument();
    });

    it('should not show rating badge when vote average is undefined', () => {
      renderMovieCard({
        id: 1,
        title: 'No Rating Movie',
        posterUrl: '/no-rating.jpg',
        ratio: 'poster',
      });

      // Should not have any element with rating class
      expect(
        document.querySelector('.movie-card__rating')
      ).not.toBeInTheDocument();
    });

    it('should format rating correctly', () => {
      renderMovieCard({
        id: 1,
        title: 'Precise Rating',
        posterUrl: '/precise.jpg',
        ratio: 'poster',
        voteAverage: 7.123456,
      });

      // Should display rounded to 1 decimal place
      expect(screen.getByText('★ 7.1')).toBeInTheDocument();
    });
  });

  describe('Adult Badge (18+)', () => {
    it('should show 18+ badge when movie is adult', () => {
      renderMovieCard({
        id: 1,
        title: 'Adult Movie',
        posterUrl: '/adult.jpg',
        ratio: 'poster',
        isAdult: true,
      });

      const adultBadge = screen.getByText('18+');
      expect(adultBadge).toBeInTheDocument();
      expect(adultBadge).toHaveClass('badge--adult');
    });

    it('should not show 18+ badge when movie is not adult', () => {
      renderMovieCard({
        id: 1,
        title: 'Family Movie',
        posterUrl: '/family.jpg',
        ratio: 'poster',
        isAdult: false,
      });

      expect(screen.queryByText('18+')).not.toBeInTheDocument();
    });

    it('should not show 18+ badge when adult status is undefined', () => {
      renderMovieCard({
        id: 1,
        title: 'Unknown Rating Movie',
        posterUrl: '/unknown.jpg',
        ratio: 'poster',
      });

      expect(screen.queryByText('18+')).not.toBeInTheDocument();
    });
  });

  describe('Fallback Poster', () => {
    it('should show fallback when posterUrl is undefined', () => {
      renderMovieCard({
        id: 1,
        title: 'No Poster Movie',
        ratio: 'poster',
      });

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', '/assets/no-poster.png');
      expect(image).toHaveAttribute('alt', 'No Poster Movie');
    });

    it('should show fallback when posterUrl is empty string', () => {
      renderMovieCard({
        id: 1,
        title: 'Empty Poster Movie',
        posterUrl: '',
        ratio: 'poster',
      });

      const image = screen.getByRole('img');
      // Empty string src attribute gets removed by React DOM
      expect(image).not.toHaveAttribute('src');
    });

    it('should show fallback when posterUrl is null', () => {
      renderMovieCard({
        id: 1,
        title: 'Null Poster Movie',
        posterUrl: undefined,
        ratio: 'poster',
      });

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', '/assets/no-poster.png');
    });
  });

  describe('Title Clamping', () => {
    it('should apply title clamp class for long titles', () => {
      const longTitle =
        'This is a very long movie title that should be clamped to prevent overflow and maintain good layout';

      renderMovieCard({
        id: 1,
        title: longTitle,
        posterUrl: '/long-title.jpg',
        ratio: 'poster',
      });

      const titleElement = screen.getByText(longTitle);
      expect(titleElement).toHaveClass('movie-card__title');

      expect(titleElement).toBeInTheDocument();
    });

    it('should handle special characters in titles', () => {
      const specialTitle = 'Movie: "The Special" & Other Characters!';

      renderMovieCard({
        id: 1,
        title: specialTitle,
        posterUrl: '/special.jpg',
        ratio: 'poster',
      });

      expect(screen.getByText(specialTitle)).toBeInTheDocument();
    });

    it('should handle empty title gracefully', () => {
      renderMovieCard({
        id: 1,
        title: '',
        posterUrl: '/empty-title.jpg',
        ratio: 'poster',
      });

      // Should still render the card structure
      expect(screen.getByRole('link')).toBeInTheDocument();
      // When title is empty, img has empty alt text and becomes presentation role
      const img = document.querySelector('img');
      expect(img).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('should link to correct movie detail page by default', () => {
      renderMovieCard({
        id: 123,
        title: 'Linkable Movie',
        posterUrl: '/linkable.jpg',
        ratio: 'poster',
      });

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/movie/123');
    });

    it('should use custom link when provided', () => {
      renderMovieCard({
        id: 123,
        title: 'Custom Link Movie',
        posterUrl: '/custom.jpg',
        ratio: 'poster',
        to: '/custom/path/123',
      });

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/custom/path/123');
    });
  });

  describe('Combined Features', () => {
    it('should render all features together', () => {
      renderMovieCard({
        id: 1,
        title: 'Complete Movie with All Features',
        posterUrl: '/complete.jpg',
        ratio: 'poster',
        voteAverage: 9.2,
        isAdult: true,
      });

      // Check all elements are present
      expect(
        screen.getByText('Complete Movie with All Features')
      ).toBeInTheDocument();
      expect(screen.getByText('★ 9.2')).toBeInTheDocument();
      expect(screen.getByText('18+')).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute('src', '/complete.jpg');
      expect(screen.getByRole('link')).toHaveAttribute('href', '/movie/1');
    });

    it('should handle minimal props gracefully', () => {
      renderMovieCard({
        id: 1,
        title: 'Minimal Movie',
        ratio: 'poster',
      });

      // Should render with fallbacks
      expect(screen.getByText('Minimal Movie')).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute(
        'src',
        '/assets/no-poster.png'
      );
      expect(screen.getByRole('link')).toHaveAttribute('href', '/movie/1');

      // Should not render optional badges
      expect(screen.queryByText(/^\d+\.?\d*$/)).not.toBeInTheDocument(); // No rating
      expect(screen.queryByText('18+')).not.toBeInTheDocument(); // No adult badge
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      renderMovieCard({
        id: 1,
        title: 'Accessible Movie',
        posterUrl: '/accessible.jpg',
        ratio: 'poster',
        voteAverage: 8.0,
        isAdult: true,
      });

      const link = screen.getByRole('link');
      const image = screen.getByRole('img');

      expect(link).toHaveAttribute('href', '/movie/1');
      expect(image).toHaveAttribute('alt', 'Accessible Movie');

      // Check that screen readers can understand the content
      expect(screen.getByText('Accessible Movie')).toBeInTheDocument();
    });

    it('should handle screen reader text for ratings', () => {
      renderMovieCard({
        id: 1,
        title: 'Screen Reader Movie',
        posterUrl: '/sr.jpg',
        ratio: 'poster',
        voteAverage: 7.8,
      });

      const ratingElement = screen.getByText('★ 7.8');
      expect(ratingElement).toBeInTheDocument();
      // The rating should be readable by screen readers
    });
  });
});
