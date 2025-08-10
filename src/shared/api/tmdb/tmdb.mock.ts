import type { MoviesService } from '@features/movies/api/types';
import type { Movie, MovieBrief } from '@entities/movie/model/types';

const mockMovies: MovieBrief[] = [
  {
    id: 1,
    title: 'The Shawshank Redemption',
    posterPath: '/placeholder.png',
    voteAverage: 9.3,
    category: 'top',
    releaseDate: '1994-09-22',
    originalTitle: 'The Shawshank Redemption',
    isAdult: false,
  },
  {
    id: 2,
    title: 'The Godfather',
    posterPath: '/placeholder.png',
    voteAverage: 9.2,
    category: 'top',
    releaseDate: '1972-03-24',
    originalTitle: 'The Godfather',
    isAdult: false,
  },
  {
    id: 3,
    title: 'The Dark Knight',
    posterPath: '/placeholder.png',
    voteAverage: 9.0,
    category: 'popular',
    releaseDate: '2008-07-18',
    originalTitle: 'The Dark Knight',
    isAdult: false,
  },
];

const createMockMoviesService = (): MoviesService => ({
  kind: 'mock',
  getPopular: async () => mockMovies.filter((m) => m.category === 'popular'),
  getTopRated: async () => mockMovies.filter((m) => m.category === 'top'),
  getUpcoming: async () => mockMovies.filter((m) => m.category === 'upcoming'),
  getMovieById: async (id: number) => {
    const movie = mockMovies.find((m) => m.id === id);
    if (!movie) throw new Error(`Movie ${id} not found`);
    return {
      ...movie,
      overview:
        'A compelling story that captivates audiences worldwide with its incredible characters and masterful storytelling.',
      backdropPath: '/placeholder.png',
      runtime: 120,
      genres: [
        { id: 28, name: 'Action' },
        { id: 35, name: 'Comedy' },
        { id: 80, name: 'Crime' },
      ],
      productionCompanies: [
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
      ],
      tagline: 'The adventure begins here.',
      status: 'Released',
      budget: 150000000,
      revenue: 750000000,
      popularity: 477.8545,
    } as Movie;
  },
});

export { createMockMoviesService };
