import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MovieDetails } from '../components/MovieDetails';

describe('MovieDetails', () => {
  describe('Basic Rendering', () => {
    it('should render section title when details are provided', () => {
      render(<MovieDetails status="Released" />);

      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
        'Movie Details'
      );
    });

    it('should render status when provided', () => {
      render(<MovieDetails status="Released" />);

      expect(screen.getByText('Status:')).toBeInTheDocument();
      expect(screen.getByText('Released')).toBeInTheDocument();
    });

    it('should render budget when provided and greater than 0', () => {
      render(<MovieDetails budget={150000000} />);

      expect(screen.getByText('Budget:')).toBeInTheDocument();
      expect(screen.getByText('$150,000,000')).toBeInTheDocument();
    });

    it('should render revenue when provided and greater than 0', () => {
      render(<MovieDetails revenue={750000000} />);

      expect(screen.getByText('Revenue:')).toBeInTheDocument();
      expect(screen.getByText('$750,000,000')).toBeInTheDocument();
    });

    it('should render popularity when provided', () => {
      render(<MovieDetails popularity={477.8545} />);

      expect(screen.getByText('Popularity:')).toBeInTheDocument();
      expect(screen.getByText('477.9')).toBeInTheDocument();
    });
  });

  describe('Currency Formatting', () => {
    it('should format large budget numbers with commas', () => {
      render(<MovieDetails budget={250000000} />);

      expect(screen.getByText('$250,000,000')).toBeInTheDocument();
    });

    it('should format large revenue numbers with commas', () => {
      render(<MovieDetails revenue={1200000000} />);

      expect(screen.getByText('$1,200,000,000')).toBeInTheDocument();
    });

    it('should handle small budget amounts', () => {
      render(<MovieDetails budget={1000000} />);

      expect(screen.getByText('$1,000,000')).toBeInTheDocument();
    });

    it('should handle small revenue amounts', () => {
      render(<MovieDetails revenue={500000} />);

      expect(screen.getByText('$500,000')).toBeInTheDocument();
    });
  });

  describe('Popularity Formatting', () => {
    it('should format popularity to 1 decimal place', () => {
      render(<MovieDetails popularity={123.456789} />);

      expect(screen.getByText('123.5')).toBeInTheDocument();
    });

    it('should handle whole number popularity', () => {
      render(<MovieDetails popularity={100} />);

      expect(screen.getByText('100.0')).toBeInTheDocument();
    });

    it('should handle small popularity numbers', () => {
      render(<MovieDetails popularity={0.123} />);

      expect(screen.getByText('0.1')).toBeInTheDocument();
    });
  });

  describe('Conditional Rendering', () => {
    it('should not render budget when 0', () => {
      render(<MovieDetails budget={0} />);

      expect(screen.queryByText('Budget:')).not.toBeInTheDocument();
    });

    it('should not render budget when negative', () => {
      render(<MovieDetails budget={-1000} />);

      expect(screen.queryByText('Budget:')).not.toBeInTheDocument();
    });

    it('should not render revenue when 0', () => {
      render(<MovieDetails revenue={0} />);

      expect(screen.queryByText('Revenue:')).not.toBeInTheDocument();
    });

    it('should not render revenue when negative', () => {
      render(<MovieDetails revenue={-1000} />);

      expect(screen.queryByText('Revenue:')).not.toBeInTheDocument();
    });

    it('should render popularity even when 0', () => {
      render(<MovieDetails popularity={0} />);

      expect(screen.getByText('Popularity:')).toBeInTheDocument();
      expect(screen.getByText('0.0')).toBeInTheDocument();
    });

    it('should not render section when no valid details provided', () => {
      render(<MovieDetails />);

      expect(screen.queryByText('Movie Details')).not.toBeInTheDocument();
    });

    it('should not render section when only invalid budget/revenue provided', () => {
      render(<MovieDetails budget={0} revenue={-100} />);

      expect(screen.queryByText('Movie Details')).not.toBeInTheDocument();
    });
  });

  describe('Multiple Details', () => {
    it('should render all valid details together', () => {
      render(
        <MovieDetails
          status="Released"
          budget={200000000}
          revenue={800000000}
          popularity={456.789}
        />
      );

      expect(screen.getByText('Movie Details')).toBeInTheDocument();
      expect(screen.getByText('Status:')).toBeInTheDocument();
      expect(screen.getByText('Released')).toBeInTheDocument();
      expect(screen.getByText('Budget:')).toBeInTheDocument();
      expect(screen.getByText('$200,000,000')).toBeInTheDocument();
      expect(screen.getByText('Revenue:')).toBeInTheDocument();
      expect(screen.getByText('$800,000,000')).toBeInTheDocument();
      expect(screen.getByText('Popularity:')).toBeInTheDocument();
      expect(screen.getByText('456.8')).toBeInTheDocument();
    });

    it('should render mixed valid and invalid details', () => {
      render(
        <MovieDetails
          status="Released"
          budget={0} // Should not render
          revenue={500000000}
          popularity={123.45}
        />
      );

      expect(screen.getByText('Movie Details')).toBeInTheDocument();
      expect(screen.getByText('Status:')).toBeInTheDocument();
      expect(screen.getByText('Released')).toBeInTheDocument();
      expect(screen.queryByText('Budget:')).not.toBeInTheDocument();
      expect(screen.getByText('Revenue:')).toBeInTheDocument();
      expect(screen.getByText('$500,000,000')).toBeInTheDocument();
      expect(screen.getByText('Popularity:')).toBeInTheDocument();
      expect(screen.getByText('123.5')).toBeInTheDocument();
    });
  });

  describe('CSS Classes', () => {
    it('should apply correct CSS classes to detail items', () => {
      render(<MovieDetails status="Released" />);

      const detailItem = screen
        .getByText('Status:')
        .closest('.movie-detail-view__detail-item');
      expect(detailItem).toBeInTheDocument();
      expect(detailItem).toHaveClass('movie-detail-view__detail-item');

      const label = screen.getByText('Status:');
      expect(label).toHaveClass('movie-detail-view__detail-label');

      const value = screen.getByText('Released');
      expect(value).toHaveClass('movie-detail-view__detail-value');
    });
  });
});
