import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductionCompanies } from '../components/ProductionCompanies';
import type { ProductionCompany } from '@entities/movie/model/types';

const mockCompanies: ProductionCompany[] = [
  {
    id: 1,
    name: 'Warner Bros. Pictures',
    logoPath: '/wb-logo.png',
    originCountry: 'US',
  },
  {
    id: 2,
    name: 'Legendary Entertainment',
    logoPath: '/legendary-logo.png',
    originCountry: 'US',
  },
  {
    id: 3,
    name: 'Universal Pictures',
    logoPath: '/universal-logo.png',
    originCountry: 'US',
  },
  {
    id: 4,
    name: 'Sony Pictures',
    logoPath: '/sony-logo.png',
    originCountry: 'US',
  },
];

describe('ProductionCompanies', () => {
  describe('Basic Rendering', () => {
    it('should render section title when companies are provided', () => {
      render(<ProductionCompanies companies={mockCompanies} />);

      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
        'Production Companies'
      );
    });

    it('should render company names', () => {
      render(<ProductionCompanies companies={mockCompanies.slice(0, 2)} />);

      expect(screen.getByText('Warner Bros. Pictures')).toBeInTheDocument();
      expect(screen.getByText('Legendary Entertainment')).toBeInTheDocument();
    });

    it('should render company logos when logoPath is provided', () => {
      render(<ProductionCompanies companies={[mockCompanies[0]]} />);

      const logo = screen.getByRole('img');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', '/wb-logo.png');
      expect(logo).toHaveAttribute('alt', 'Warner Bros. Pictures');
    });

    it('should render company without logo when logoPath is missing', () => {
      const companyWithoutLogo: ProductionCompany[] = [
        {
          id: 5,
          name: 'Independent Studio',
          originCountry: 'US',
        },
      ];

      render(<ProductionCompanies companies={companyWithoutLogo} />);

      expect(screen.getByText('Independent Studio')).toBeInTheDocument();
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });
  });

  describe('Company Limit', () => {
    it('should limit companies to 3 by default', () => {
      render(<ProductionCompanies companies={mockCompanies} />);

      expect(screen.getByText('Warner Bros. Pictures')).toBeInTheDocument();
      expect(screen.getByText('Legendary Entertainment')).toBeInTheDocument();
      expect(screen.getByText('Universal Pictures')).toBeInTheDocument();
      expect(screen.queryByText('Sony Pictures')).not.toBeInTheDocument();
    });

    it('should respect custom maxCompanies prop', () => {
      render(
        <ProductionCompanies companies={mockCompanies} maxCompanies={2} />
      );

      expect(screen.getByText('Warner Bros. Pictures')).toBeInTheDocument();
      expect(screen.getByText('Legendary Entertainment')).toBeInTheDocument();
      expect(screen.queryByText('Universal Pictures')).not.toBeInTheDocument();
      expect(screen.queryByText('Sony Pictures')).not.toBeInTheDocument();
    });

    it('should show all companies when there are fewer than the limit', () => {
      render(<ProductionCompanies companies={mockCompanies.slice(0, 2)} />);

      expect(screen.getByText('Warner Bros. Pictures')).toBeInTheDocument();
      expect(screen.getByText('Legendary Entertainment')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should render nothing when companies array is empty', () => {
      render(<ProductionCompanies companies={[]} />);

      expect(
        screen.queryByText('Production Companies')
      ).not.toBeInTheDocument();
    });

    it('should render nothing when companies is undefined', () => {
      render(
        <ProductionCompanies
          companies={undefined as unknown as ProductionCompany[]}
        />
      );

      expect(
        screen.queryByText('Production Companies')
      ).not.toBeInTheDocument();
    });

    it('should handle companies with missing logoPath gracefully', () => {
      const mixedCompanies: ProductionCompany[] = [
        {
          id: 1,
          name: 'Company with Logo',
          logoPath: '/logo.png',
          originCountry: 'US',
        },
        {
          id: 2,
          name: 'Company without Logo',
          originCountry: 'US',
        },
      ];

      render(<ProductionCompanies companies={mixedCompanies} />);

      expect(screen.getByText('Company with Logo')).toBeInTheDocument();
      expect(screen.getByText('Company without Logo')).toBeInTheDocument();
      expect(screen.getAllByRole('img')).toHaveLength(1);
    });
  });

  describe('CSS Classes', () => {
    it('should apply correct CSS classes', () => {
      render(<ProductionCompanies companies={[mockCompanies[0]]} />);

      const companyElement = screen
        .getByText('Warner Bros. Pictures')
        .closest('.movie-detail-view__company');
      expect(companyElement).toBeInTheDocument();
      expect(companyElement).toHaveClass('movie-detail-view__company');

      const logo = screen.getByRole('img');
      expect(logo).toHaveClass('movie-detail-view__company-logo');

      const name = screen.getByText('Warner Bros. Pictures');
      expect(name).toHaveClass('movie-detail-view__company-name');
    });
  });

  describe('Image Loading Attributes', () => {
    it('should apply lazy loading and async decoding to company logos', () => {
      render(<ProductionCompanies companies={[mockCompanies[0]]} />);

      const logo = screen.getByRole('img');
      expect(logo).toHaveAttribute('loading', 'lazy');
      expect(logo).toHaveAttribute('decoding', 'async');
    });
  });
});
