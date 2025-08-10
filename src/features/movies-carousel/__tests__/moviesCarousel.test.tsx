import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MoviesCarousel } from '@features/movies-carousel';
import { MemoryRouter } from 'react-router-dom';
import type { MovieBrief } from '@entities/movie/model/types';

const renderWithProviders = (ui: React.ReactNode) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

const mockMovies: MovieBrief[] = [
  {
    id: 1,
    title: 'Movie A',
    posterPath: '/poster-a.jpg',
    voteAverage: 8.5,
    isAdult: false,
    originalTitle: 'Movie A',
  },
  {
    id: 2,
    title: 'Movie B',
    posterPath: '/poster-b.jpg',
    voteAverage: 7.2,
    isAdult: false,
    originalTitle: 'Movie B',
  },
];

describe('MoviesCarousel', () => {
  it('renders items when movies provided', async () => {
    renderWithProviders(<MoviesCarousel title="Popular" movies={mockMovies} />);

    // eventually list renders with items
    const list = await screen.findByRole('list');
    expect(list).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBe(2);
  });

  it('shows no movies message when empty array provided', () => {
    renderWithProviders(<MoviesCarousel title="Popular" movies={[]} />);

    expect(screen.getByText('No movies available')).toBeInTheDocument();
  });

  it('shows no movies message when movies is undefined', () => {
    renderWithProviders(
      <MoviesCarousel
        title="Popular"
        movies={undefined as unknown as MovieBrief[]}
      />
    );

    expect(screen.getByText('No movies available')).toBeInTheDocument();
  });
});
