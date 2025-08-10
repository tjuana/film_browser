import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  describe('Variants', () => {
    it('should render primary variant by default', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn', 'btn--primary', 'btn--medium');
    });

    it('should render secondary variant', () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn--secondary');
    });

    it('should render danger variant', () => {
      render(<Button variant="danger">Delete</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn--danger');
    });

    it('should render ghost variant', () => {
      render(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn--ghost');
    });
  });

  describe('Sizes', () => {
    it('should render medium size by default', () => {
      render(<Button>Medium</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn--medium');
    });

    it('should render small size', () => {
      render(<Button size="small">Small</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn--small');
    });

    it('should render large size', () => {
      render(<Button size="large">Large</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn--large');
    });
  });

  describe('Props and Events', () => {
    it('should handle click events', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should pass through HTML attributes', () => {
      render(
        <Button type="submit" disabled aria-label="Submit form">
          Submit
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-label', 'Submit form');
    });

    it('should merge custom className', () => {
      render(<Button className="custom-class">Custom</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(
        'btn',
        'btn--primary',
        'btn--medium',
        'custom-class'
      );
    });

    it('should render children content', () => {
      render(
        <Button>
          <span>Icon</span> Text
        </Button>
      );

      expect(screen.getByText('Icon')).toBeInTheDocument();
      expect(screen.getByText('Text')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have button role', () => {
      render(<Button>Accessible button</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should support aria attributes', () => {
      render(
        <Button aria-pressed="true" aria-label="Toggle wishlist">
          Toggle
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-pressed', 'true');
      expect(button).toHaveAttribute('aria-label', 'Toggle wishlist');
    });
  });
});
