import axios from 'axios';
import { TMDB_KEY, hasTmdbKey } from '@shared/config/env';
import type { Movie, MovieBrief } from '../model/types';

const BASE_URL = 'https://api.themoviedb.org/3';

export const imageUrl = (size: string, path?: string | null) =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : undefined;

const client = axios.create({
  baseURL: BASE_URL,
  params: { api_key: TMDB_KEY },
});

type TmdbMovie = {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  overview?: string;
  release_date?: string;
  vote_average?: number;
  runtime?: number;
};

const mapBrief = (m: TmdbMovie): MovieBrief => ({
  id: m.id,
  title: m.title ?? m.name ?? '',
  posterPath: imageUrl('w342', m.poster_path),
  voteAverage: m.vote_average,
});

const mapMovie = (m: TmdbMovie): Movie => ({
  ...mapBrief(m),
  overview: m.overview,
  releaseDate: m.release_date,
  backdropPath: imageUrl('w780', m.backdrop_path),
  runtime: m.runtime,
});

// ---- Live API ----
const api = {
  async getPopular(): Promise<MovieBrief[]> {
    const { data } = await client.get('/movie/popular');
    return data.results.map(mapBrief);
  },
  async getTopRated(): Promise<MovieBrief[]> {
    const { data } = await client.get('/movie/top_rated');
    return data.results.map(mapBrief);
  },
  async getUpcoming(): Promise<MovieBrief[]> {
    const { data } = await client.get('/movie/upcoming');
    return data.results.map(mapBrief);
  },
  async getMovieById(id: number): Promise<Movie> {
    const { data } = await client.get(`/movie/${id}`);
    return mapMovie(data);
  },
};

// ---- Mocks ----
const mockBrief = (id: number, title: string, vote = 7.5): MovieBrief => ({
  id,
  title,
  voteAverage: vote,
  posterPath: 'https://via.placeholder.com/300',
});

const mockApi = {
  async getPopular(): Promise<MovieBrief[]> {
    return [1, 2, 3, 4, 5, 6].map((i) => mockBrief(i, `Popular ${i}`));
  },
  async getTopRated(): Promise<MovieBrief[]> {
    return [7, 8, 9, 10].map((i) => mockBrief(i, `Top ${i}`, 8.5));
  },
  async getUpcoming(): Promise<MovieBrief[]> {
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
};

export const tmdb = hasTmdbKey() ? api : mockApi;
