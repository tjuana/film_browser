import type { Movie, MovieBrief, MoviesService } from './types';

const mockBrief = (id: number, title: string, vote = 7.5): MovieBrief => ({
  id,
  title,
  voteAverage: vote,
  posterPath: '/placeholder.png',
});

export const createMockMoviesService = (): MoviesService => ({
  kind: 'mock',
  async getPopular() {
    return [1, 2, 3, 4, 5, 6].map((i) => mockBrief(i, `Popular ${i}`));
  },
  async getTopRated() {
    return [7, 8, 9, 10].map((i) => mockBrief(i, `Top ${i}`, 8.5));
  },
  async getUpcoming() {
    return [11, 12, 13].map((i) => mockBrief(i, `Upcoming ${i}`, 7.1));
  },
  async getMovieById(id: number): Promise<Movie> {
    const base = mockBrief(id, `Movie ${id}`, 7.8);
    return {
      ...base,
      overview: 'Mock overview',
      releaseDate: '2024-01-01',
      backdropPath: undefined,
      runtime: 120,
    };
  },
});
