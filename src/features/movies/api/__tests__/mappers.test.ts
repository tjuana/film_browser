import { describe, it, expect } from 'vitest';
import { imageUrl, mapBrief, mapMovie } from '@features/movies/api/mappers';

describe('mappers', () => {
  describe('imageUrl', () => {
    it('should build correct path with size and path', () => {
      expect(imageUrl('w342', '/abc.jpg')).toBe(
        'https://image.tmdb.org/t/p/w342/abc.jpg'
      );
      expect(imageUrl('w500', '/poster.jpg')).toBe(
        'https://image.tmdb.org/t/p/w500/poster.jpg'
      );
    });

    it('should return undefined for falsy paths', () => {
      expect(imageUrl('w342', null)).toBeUndefined();
      expect(imageUrl('w342', undefined)).toBeUndefined();
      expect(imageUrl('w342', '')).toBeUndefined();
    });

    it('should handle different image sizes', () => {
      const path = '/test.jpg';
      expect(imageUrl('w154', path)).toBe(
        'https://image.tmdb.org/t/p/w154/test.jpg'
      );
      expect(imageUrl('w342', path)).toBe(
        'https://image.tmdb.org/t/p/w342/test.jpg'
      );
      expect(imageUrl('w500', path)).toBe(
        'https://image.tmdb.org/t/p/w500/test.jpg'
      );
      expect(imageUrl('original', path)).toBe(
        'https://image.tmdb.org/t/p/original/test.jpg'
      );
    });
  });

  describe('mapBrief', () => {
    it('should map complete TMDB response', () => {
      const tmdb = {
        id: 1,
        title: 'Test Movie',
        poster_path: '/test.jpg',
        vote_average: 8.5,
        release_date: '2024-01-15',
        original_title: 'Original Test Movie',
        adult: false,
      };
      const result = mapBrief(tmdb);

      expect(result.id).toBe(1);
      expect(result.title).toBe('Test Movie');
      expect(result.posterPath).toBe(
        'https://image.tmdb.org/t/p/w342/test.jpg'
      );
      expect(result.voteAverage).toBe(8.5);
      expect(result.releaseDate).toBe('2024-01-15');
      expect(result.originalTitle).toBe('Original Test Movie');
      expect(result.isAdult).toBe(false);
    });

    it('should handle missing title gracefully', () => {
      const tmdb = {
        id: 1,
        title: '',
        poster_path: '/test.jpg',
        vote_average: 7.0,
      };
      const result = mapBrief(tmdb);

      expect(result.title).toBe('');
      expect(result.id).toBe(1);
    });

    it('should handle missing poster path gracefully', () => {
      const tmdb = {
        id: 1,
        title: 'Test Movie',
        poster_path: null,
        vote_average: 7.0,
      };
      const result = mapBrief(tmdb);

      expect(result.posterPath).toBeUndefined();
      expect(result.title).toBe('Test Movie');
    });

    it('should handle missing vote average gracefully', () => {
      const tmdb = {
        id: 1,
        title: 'Test Movie',
        poster_path: '/test.jpg',
        vote_average: 0,
      };
      const result = mapBrief(tmdb);

      expect(result.voteAverage).toBe(0);
      expect(result.title).toBe('Test Movie');
    });

    it('should handle missing release date gracefully', () => {
      const tmdb = {
        id: 1,
        title: 'Test Movie',
        poster_path: '/test.jpg',
        vote_average: 7.0,
        release_date: '',
      };
      const result = mapBrief(tmdb);

      expect(result.releaseDate).toBe('');
      expect(result.title).toBe('Test Movie');
    });

    it('should handle missing original title gracefully', () => {
      const tmdb = {
        id: 1,
        title: 'Test Movie',
        poster_path: '/test.jpg',
        vote_average: 7.0,
        original_title: '',
      };
      const result = mapBrief(tmdb);

      expect(result.originalTitle).toBe('');
      expect(result.title).toBe('Test Movie');
    });

    it('should handle adult flag variations', () => {
      const adultMovie = {
        id: 1,
        title: 'Adult Movie',
        poster_path: '/adult.jpg',
        vote_average: 7.0,
        adult: true,
      };
      const adultResult = mapBrief(adultMovie);
      expect(adultResult.isAdult).toBe(true);

      const nonAdultMovie = {
        id: 2,
        title: 'Family Movie',
        poster_path: '/family.jpg',
        vote_average: 7.0,
        adult: false,
      };
      const nonAdultResult = mapBrief(nonAdultMovie);
      expect(nonAdultResult.isAdult).toBe(false);

      // Missing adult flag should be undefined
      const noAdultFlag = {
        id: 3,
        title: 'Unknown Movie',
        poster_path: '/unknown.jpg',
        vote_average: 7.0,
      };
      const noAdultResult = mapBrief(noAdultFlag);
      expect(noAdultResult.isAdult).toBeUndefined();
    });

    it('should handle minimal TMDB response', () => {
      const minimal = {
        id: 1,
        title: 'Minimal Movie',
      };
      const result = mapBrief(minimal);

      expect(result.id).toBe(1);
      expect(result.title).toBe('Minimal Movie');
      expect(result.posterPath).toBeUndefined();
      expect(result.voteAverage).toBeUndefined();
      expect(result.releaseDate).toBeUndefined();
      expect(result.originalTitle).toBeUndefined();
      expect(result.isAdult).toBeUndefined();
    });

    it('should handle extreme values', () => {
      const extreme = {
        id: 999999,
        title: 'A'.repeat(1000), // Very long title
        poster_path: '/very-long-path-name.jpg',
        vote_average: 10.0, // Max rating
        release_date: '1888-12-28', // Very old date
        original_title: 'Extreme Movie',
        adult: true,
      };
      const result = mapBrief(extreme);

      expect(result.id).toBe(999999);
      expect(result.title).toBe('A'.repeat(1000));
      expect(result.voteAverage).toBe(10.0);
      expect(result.releaseDate).toBe('1888-12-28');
    });
  });

  describe('mapMovie', () => {
    it('should map complete TMDB movie response', () => {
      const tmdb = {
        id: 1,
        title: 'Test Movie',
        poster_path: '/test.jpg',
        vote_average: 8.5,
        release_date: '2024-01-15',
        original_title: 'Original Test Movie',
        adult: false,
        overview: 'A great test movie about testing.',
        backdrop_path: '/backdrop.jpg',
        runtime: 120,
      };
      const result = mapMovie(tmdb);

      expect(result.id).toBe(1);
      expect(result.title).toBe('Test Movie');
      expect(result.overview).toBe('A great test movie about testing.');
      expect(result.backdropPath).toBe(
        'https://image.tmdb.org/t/p/w780/backdrop.jpg'
      );
      expect(result.runtime).toBe(120);
    });

    it('should handle missing overview gracefully', () => {
      const tmdb = {
        id: 1,
        title: 'Test Movie',
        poster_path: '/test.jpg',
        vote_average: 8.5,
        overview: '',
        runtime: 120,
      };
      const result = mapMovie(tmdb);

      expect(result.overview).toBe('');
      expect(result.title).toBe('Test Movie');
    });

    it('should handle missing backdrop path gracefully', () => {
      const tmdb = {
        id: 1,
        title: 'Test Movie',
        poster_path: '/test.jpg',
        vote_average: 8.5,
        overview: 'Great movie',
        backdrop_path: null,
        runtime: 120,
      };
      const result = mapMovie(tmdb);

      expect(result.backdropPath).toBeUndefined();
      expect(result.title).toBe('Test Movie');
    });

    it('should handle missing runtime gracefully', () => {
      const tmdb = {
        id: 1,
        title: 'Test Movie',
        poster_path: '/test.jpg',
        vote_average: 8.5,
        overview: 'Great movie',
        runtime: null,
      };
      const result = mapMovie(tmdb);

      expect(result.runtime).toBeNull();
      expect(result.title).toBe('Test Movie');
    });

    it('should handle very long overview', () => {
      const longOverview = 'A'.repeat(2000);
      const tmdb = {
        id: 1,
        title: 'Test Movie',
        overview: longOverview,
        runtime: 120,
      };
      const result = mapMovie(tmdb);

      expect(result.overview).toBe(longOverview);
      expect(result.title).toBe('Test Movie');
    });

    it('should handle zero and negative runtime', () => {
      const zeroRuntime = {
        id: 1,
        title: 'Zero Runtime Movie',
        runtime: 0,
      };
      const zeroResult = mapMovie(zeroRuntime);
      expect(zeroResult.runtime).toBe(0);

      const negativeRuntime = {
        id: 2,
        title: 'Negative Runtime Movie',
        runtime: -1,
      };
      const negativeResult = mapMovie(negativeRuntime);
      expect(negativeResult.runtime).toBe(-1);
    });
  });
});
