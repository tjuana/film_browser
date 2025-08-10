import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skeleton } from '../Skeleton/Skeleton';

describe('Skeleton', () => {
  describe('Variants', () => {
    it('should render rectangular variant by default', () => {
      render(<Skeleton data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('skeleton', 'skeleton--rectangular');
    });

    it('should render text variant', () => {
      render(<Skeleton variant="text" data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('skeleton--text');
    });

    it('should render circular variant', () => {
      render(<Skeleton variant="circular" data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('skeleton--circular');
    });
  });

  describe('Dimensions', () => {
    it('should apply width and height as numbers', () => {
      render(<Skeleton width={200} height={100} data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle({ width: '200px', height: '100px' });
    });

    it('should apply width and height as strings', () => {
      render(<Skeleton width="50%" height="2rem" data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle({ width: '50%', height: '2rem' });
    });

    it('should merge with existing style', () => {
      render(
        <Skeleton
          width={100}
          style={{ backgroundColor: 'red' }}
          data-testid="skeleton"
        />
      );
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle('width: 100px');
      expect(skeleton).toHaveAttribute('style');
    });
  });

  describe('Props and Attributes', () => {
    it('should have aria-hidden by default', () => {
      render(<Skeleton data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveAttribute('aria-hidden');
    });

    it('should merge custom className', () => {
      render(<Skeleton className="custom-skeleton" data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass(
        'skeleton',
        'skeleton--rectangular',
        'custom-skeleton'
      );
    });

    it('should pass through HTML attributes', () => {
      render(
        <Skeleton data-testid="skeleton" id="my-skeleton" role="status" />
      );
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveAttribute('id', 'my-skeleton');
      expect(skeleton).toHaveAttribute('role', 'status');
    });
  });

  describe('Accessibility', () => {
    it('should be hidden from screen readers by default', () => {
      render(<Skeleton data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveAttribute('aria-hidden');
    });
  });
});
