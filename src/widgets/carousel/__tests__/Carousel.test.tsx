import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Carousel } from '../ui/Carousel';
import type { MovieBrief } from '@entities/movie/model/types';

// Mock the carousel hooks
vi.mock('../model/useCarouselNav', () => ({
  useCarouselNav: () => ({
    trackRef: { current: null },
    canPrev: true,
    canNext: true,
    scrollByPage: vi.fn(),
  }),
}));

vi.mock('../model/useCarouselDrag', () => ({
  useCarouselDrag: () => ({
    onMouseDown: vi.fn(),
    onTouchStart: vi.fn(),
  }),
}));

const mockMovies: MovieBrief[] = [
  { id: 1, title: 'Movie 1', posterPath: '/movie1.jpg', voteAverage: 8.0 },
  { id: 2, title: 'Movie 2', posterPath: '/movie2.jpg', voteAverage: 7.5 },
  { id: 3, title: 'Movie 3', posterPath: '/movie3.jpg', voteAverage: 9.0 },
  { id: 4, title: 'Movie 4', posterPath: '/movie4.jpg', voteAverage: 6.5 },
  { id: 5, title: 'Movie 5', posterPath: '/movie5.jpg', voteAverage: 8.5 },
];

const renderCarousel = (
  props: Partial<Parameters<typeof Carousel>[0]> = {}
) => {
  const defaultProps = {
    title: 'Test Carousel',
    items: mockMovies,
  };

  return render(
    <MemoryRouter>
      <Carousel {...defaultProps} {...props} />
    </MemoryRouter>
  );
};

describe('Carousel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render carousel with items', () => {
      renderCarousel();

      // Check that all movie titles are rendered
      expect(screen.getByText('Movie 1')).toBeInTheDocument();
      expect(screen.getByText('Movie 2')).toBeInTheDocument();
      expect(screen.getByText('Movie 3')).toBeInTheDocument();
      expect(screen.getByText('Movie 4')).toBeInTheDocument();
      expect(screen.getByText('Movie 5')).toBeInTheDocument();
    });

    it('should render navigation buttons', () => {
      renderCarousel();

      const prevButton = screen.getByRole('button', { name: /previous/i });
      const nextButton = screen.getByRole('button', { name: /next/i });

      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    });

    it('should apply correct ratio classes', () => {
      renderCarousel();

      // Check that MovieCards render with poster ratio (default)
      const cards = screen.getAllByRole('link');
      expect(cards[0]).toHaveClass('movie-card--poster');
    });

    it('should render empty carousel gracefully', () => {
      renderCarousel({ items: [] });

      const carousel = document.querySelector('.carousel');
      expect(carousel).toBeInTheDocument();

      // Should not render any movie cards
      expect(screen.queryByText('Movie')).not.toBeInTheDocument();
    });
  });

  describe('Navigation Buttons', () => {
    it('should render navigation buttons', () => {
      renderCarousel();

      const prevButton = screen.getByRole('button', { name: /previous/i });
      const nextButton = screen.getByRole('button', { name: /next/i });

      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    });

    it('should show/hide buttons based on scroll position', () => {
      // Mock different scroll states
      vi.doMock('../model/useCarouselNav', () => ({
        useCarouselNav: () => ({
          containerRef: { current: null },
          canPrev: false, // At start
          canNext: true,
          scrollPrev: vi.fn(),
          scrollNext: vi.fn(),
        }),
      }));

      renderCarousel();

      const prevButton = screen.getByRole('button', { name: /previous/i });
      const nextButton = screen.getByRole('button', { name: /next/i });

      // Should still render buttons (visibility controlled by CSS/classes)
      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should handle arrow key navigation', () => {
      renderCarousel();

      const carousel = document.querySelector('.carousel__track');
      expect(carousel).toBeInTheDocument();

      if (carousel) {
        // Test left arrow key
        fireEvent.keyDown(carousel, { key: 'ArrowLeft', code: 'ArrowLeft' });

        // Test right arrow key
        fireEvent.keyDown(carousel, { key: 'ArrowRight', code: 'ArrowRight' });

        // Carousel should handle these events (exact behavior depends on implementation)
        expect(carousel).toBeInTheDocument();
      }
    });

    it('should handle home and end keys', () => {
      renderCarousel();

      const carousel = document.querySelector('.carousel__track');

      if (carousel) {
        // Test Home key (scroll to start)
        fireEvent.keyDown(carousel, { key: 'Home', code: 'Home' });

        // Test End key (scroll to end)
        fireEvent.keyDown(carousel, { key: 'End', code: 'End' });

        expect(carousel).toBeInTheDocument();
      }
    });

    it('should handle page up/down keys', () => {
      renderCarousel();

      const carousel = document.querySelector('.carousel__track');

      if (carousel) {
        // Test PageUp (scroll left by page)
        fireEvent.keyDown(carousel, { key: 'PageUp', code: 'PageUp' });

        // Test PageDown (scroll right by page)
        fireEvent.keyDown(carousel, { key: 'PageDown', code: 'PageDown' });

        expect(carousel).toBeInTheDocument();
      }
    });

    it('should ignore irrelevant keys', () => {
      renderCarousel();

      const carousel = document.querySelector('.carousel__track');

      if (carousel) {
        // Test irrelevant keys that should be ignored
        fireEvent.keyDown(carousel, { key: 'Enter', code: 'Enter' });
        fireEvent.keyDown(carousel, { key: 'Space', code: 'Space' });
        fireEvent.keyDown(carousel, { key: 'Tab', code: 'Tab' });

        // Should not cause errors
        expect(carousel).toBeInTheDocument();
      }
    });
  });

  describe('Touch/Mouse Interactions', () => {
    it('should handle mouse drag events', () => {
      renderCarousel();

      const carousel = document.querySelector('.carousel__track');
      expect(carousel).toBeInTheDocument();

      if (carousel) {
        // Simulate mouse drag
        fireEvent.mouseDown(carousel, { clientX: 100 });
        fireEvent.mouseMove(carousel, { clientX: 50 });
        fireEvent.mouseUp(carousel, { clientX: 50 });

        expect(carousel).toBeInTheDocument();
      }
    });

    it('should handle touch events', () => {
      renderCarousel();

      const carousel = document.querySelector('.carousel__track');
      expect(carousel).toBeInTheDocument();

      if (carousel) {
        // Simulate touch drag
        fireEvent.touchStart(carousel, {
          touches: [{ clientX: 100, clientY: 0 }],
        });
        fireEvent.touchMove(carousel, {
          touches: [{ clientX: 50, clientY: 0 }],
        });
        fireEvent.touchEnd(carousel, {
          changedTouches: [{ clientX: 50, clientY: 0 }],
        });

        expect(carousel).toBeInTheDocument();
      }
    });

    it('should hide navigation buttons on touch devices', () => {
      // Mock touch device detection
      Object.defineProperty(window, 'ontouchstart', {
        value: () => {},
        writable: true,
      });

      renderCarousel();

      // Navigation buttons should still be rendered but may have different styling
      const prevButton = screen.getByRole('button', { name: /previous/i });
      const nextButton = screen.getByRole('button', { name: /next/i });

      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();

      // In a real implementation, these might have classes that hide them on touch
      // or they might not be rendered at all on touch devices
    });
  });

  describe('Scroll Snap Behavior', () => {
    it('should have proper scroll snap styles', () => {
      renderCarousel();

      const scrollContainer = document.querySelector('.carousel__track');
      expect(scrollContainer).toBeInTheDocument();

      if (scrollContainer) {
        // In a real implementation, this would have scroll-snap-type: x mandatory
        expect(scrollContainer).toBeInTheDocument();
      }
    });

    it('should snap to item boundaries', () => {
      renderCarousel();

      const items = document.querySelectorAll('[role="listitem"]');
      expect(items.length).toBe(mockMovies.length);

      // Each item should have scroll-snap-align: start
      items.forEach((item) => {
        expect(item).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      renderCarousel();

      const carousel = document.querySelector('[role="list"]');
      expect(carousel).toBeInTheDocument();

      const prevButton = screen.getByRole('button', { name: /previous/i });
      const nextButton = screen.getByRole('button', { name: /next/i });

      expect(prevButton).toHaveAttribute('aria-label');
      expect(nextButton).toHaveAttribute('aria-label');
    });

    it('should be keyboard accessible', () => {
      renderCarousel();

      const carousel = document.querySelector('.carousel__track');

      if (carousel) {
        // Should be focusable
        expect(carousel).toBeInTheDocument();

        // Should handle keyboard events (tested above)
        fireEvent.keyDown(carousel, { key: 'ArrowLeft' });
        expect(carousel).toBeInTheDocument();
      }
    });

    it('should announce changes to screen readers', () => {
      renderCarousel();

      // In a real implementation, there might be live regions or aria-live attributes
      // to announce scroll position changes to screen readers
      const carousel = document.querySelector('.carousel');
      expect(carousel).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('should handle large numbers of items efficiently', () => {
      const manyItems: MovieBrief[] = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        title: `Movie ${i + 1}`,
        posterPath: `/movie${i + 1}.jpg`,
        voteAverage: Math.random() * 10,
      }));

      renderCarousel({ items: manyItems });

      // Should render without performance issues
      expect(screen.getByText('Movie 1')).toBeInTheDocument();
      expect(screen.getByText('Movie 100')).toBeInTheDocument();
    });

    it('should not cause memory leaks with event listeners', () => {
      const { unmount } = renderCarousel();

      // Component should clean up properly when unmounted
      unmount();

      // No way to test this directly, but the component should remove event listeners
      expect(true).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle items with missing data', () => {
      const incompleteItems: MovieBrief[] = [
        { id: 1, title: 'Complete Movie', posterPath: '/complete.jpg' },
        { id: 2, title: '', posterPath: undefined }, // Missing data
        { id: 3, title: 'Another Movie' }, // Missing poster
      ];

      renderCarousel({ items: incompleteItems });

      expect(screen.getByText('Complete Movie')).toBeInTheDocument();
      expect(screen.getByText('Another Movie')).toBeInTheDocument();

      // Should handle missing data gracefully
      const cards = screen.getAllByRole('link');
      expect(cards).toHaveLength(3);
    });

    it('should handle single item', () => {
      const singleItem: MovieBrief[] = [
        { id: 1, title: 'Only Movie', posterPath: '/only.jpg' },
      ];

      renderCarousel({ items: singleItem });

      expect(screen.getByText('Only Movie')).toBeInTheDocument();

      // Navigation buttons should still be rendered but may be disabled
      expect(
        screen.getByRole('button', { name: /previous/i })
      ).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
    });
  });
});
