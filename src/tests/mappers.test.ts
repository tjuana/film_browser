import { describe, it, expect } from 'vitest';
import { imageUrl, mapBrief, mapMovie } from '@features/movies/api/mappers';

describe('mappers', () => {
  it('imageUrl builds correct path or undefined', () => {
    expect(imageUrl('w342', '/abc.jpg')).toBe(
      'https://image.tmdb.org/t/p/w342/abc.jpg'
    );
    expect(imageUrl('w342', null)).toBeUndefined();
    expect(imageUrl('w342', undefined)).toBeUndefined();
  });

  it('mapBrief maps fields', () => {
    const brief = mapBrief({
      id: 1,
      title: 'X',
      poster_path: '/p.jpg',
      vote_average: 8,
    });
    expect(brief).toMatchObject({
      id: 1,
      title: 'X',
      posterPath: expect.any(String),
      voteAverage: 8,
    });
  });

  it('mapMovie maps fields with details', () => {
    const movie = mapMovie({
      id: 2,
      title: 'Y',
      backdrop_path: '/b.jpg',
      overview: 'ov',
      runtime: 100,
    });
    expect(movie).toMatchObject({
      id: 2,
      title: 'Y',
      backdropPath: expect.any(String),
      overview: 'ov',
      runtime: 100,
    });
  });
});
