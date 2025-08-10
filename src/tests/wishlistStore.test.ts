import { describe, it, expect, beforeEach, vi, beforeAll } from 'vitest';
import { act } from '@testing-library/react';
import { wishlistStore } from '@features/wishlist/model/store';
import type { MovieBrief } from '@entities/movie/model/types';

// Mock localStorage for testing
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

// Setup localStorage mock before tests
beforeAll(() => {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
  });
});

describe('Wishlist Store', () => {
  beforeEach(() => {
    // Clear the store before each test
    act(() => {
      wishlistStore.getState().clear();
    });
    vi.clearAllMocks();
  });

  describe('Basic Operations', () => {
    it('should start with empty items', () => {
      const items = wishlistStore.getState().items;
      expect(items).toEqual([]);
    });

    it('should add a movie', () => {
      const movie: MovieBrief = {
        id: 1,
        title: 'Test Movie',
        posterPath: '/test.jpg',
        voteAverage: 8.5,
      };

      act(() => {
        wishlistStore.getState().add(movie);
      });

      const items = wishlistStore.getState().items;
      expect(items).toHaveLength(1);
      expect(items[0]).toEqual(movie);
    });

    it('should not add duplicate movies', () => {
      const movie: MovieBrief = {
        id: 1,
        title: 'Test Movie',
        posterPath: '/test.jpg',
        voteAverage: 8.5,
      };

      act(() => {
        wishlistStore.getState().add(movie);
        wishlistStore.getState().add(movie); // Try to add again
      });

      const items = wishlistStore.getState().items;
      expect(items).toHaveLength(1);
    });

    it('should remove a movie by id', () => {
      const movie: MovieBrief = {
        id: 1,
        title: 'Test Movie',
        posterPath: '/test.jpg',
        voteAverage: 8.5,
      };

      act(() => {
        wishlistStore.getState().add(movie);
        wishlistStore.getState().remove(1);
      });

      const items = wishlistStore.getState().items;
      expect(items).toHaveLength(0);
    });

    it('should clear all items', () => {
      const movies: MovieBrief[] = [
        { id: 1, title: 'Movie 1', posterPath: '/1.jpg' },
        { id: 2, title: 'Movie 2', posterPath: '/2.jpg' },
      ];

      act(() => {
        movies.forEach((movie) => wishlistStore.getState().add(movie));
        wishlistStore.getState().clear();
      });

      const items = wishlistStore.getState().items;
      expect(items).toHaveLength(0);
    });
  });

  describe('Toggle Operation', () => {
    it('should add movie when toggling non-existent movie', () => {
      const movie: MovieBrief = {
        id: 1,
        title: 'Test Movie',
        posterPath: '/test.jpg',
        voteAverage: 8.5,
      };

      act(() => {
        wishlistStore.getState().toggle(movie);
      });

      const items = wishlistStore.getState().items;
      expect(items).toHaveLength(1);
      expect(items[0]).toEqual(movie);
    });

    it('should remove movie when toggling existing movie', () => {
      const movie: MovieBrief = {
        id: 1,
        title: 'Test Movie',
        posterPath: '/test.jpg',
        voteAverage: 8.5,
      };

      act(() => {
        wishlistStore.getState().add(movie);
        wishlistStore.getState().toggle(movie);
      });

      const items = wishlistStore.getState().items;
      expect(items).toHaveLength(0);
    });
  });

  describe('Store State Management', () => {
    it('should provide correct count', () => {
      const movie: MovieBrief = {
        id: 1,
        title: 'Test Movie',
        posterPath: '/test.jpg',
        voteAverage: 8.5,
      };

      expect(wishlistStore.getState().items.length).toBe(0);

      act(() => {
        wishlistStore.getState().add(movie);
      });

      expect(wishlistStore.getState().items.length).toBe(1);
    });

    it('should provide correct isEmpty state', () => {
      expect(wishlistStore.getState().items.length === 0).toBe(true);

      const movie: MovieBrief = {
        id: 1,
        title: 'Test Movie',
        posterPath: '/test.jpg',
        voteAverage: 8.5,
      };

      act(() => {
        wishlistStore.getState().add(movie);
      });

      expect(wishlistStore.getState().items.length === 0).toBe(false);
    });

    it('should provide correct has check', () => {
      const movie: MovieBrief = {
        id: 1,
        title: 'Test Movie',
        posterPath: '/test.jpg',
        voteAverage: 8.5,
      };

      expect(wishlistStore.getState().items.some((m) => m.id === 1)).toBe(
        false
      );

      act(() => {
        wishlistStore.getState().add(movie);
      });

      expect(wishlistStore.getState().items.some((m) => m.id === 1)).toBe(true);
    });

    it('should provide correct getById', () => {
      const movie: MovieBrief = {
        id: 1,
        title: 'Test Movie',
        posterPath: '/test.jpg',
        voteAverage: 8.5,
      };

      expect(
        wishlistStore.getState().items.find((m) => m.id === 1)
      ).toBeUndefined();

      act(() => {
        wishlistStore.getState().add(movie);
      });

      const found = wishlistStore.getState().items.find((m) => m.id === 1);
      expect(found).toEqual(movie);
    });
  });

  describe('State Immutability', () => {
    it('should not mutate original state when adding', () => {
      const originalState = wishlistStore.getState();
      const movie: MovieBrief = {
        id: 1,
        title: 'Test Movie',
        posterPath: '/test.jpg',
        voteAverage: 8.5,
      };

      act(() => {
        wishlistStore.getState().add(movie);
      });

      const newState = wishlistStore.getState();
      expect(newState).not.toBe(originalState);
      expect(newState.items).not.toBe(originalState.items);
    });

    it('should not mutate original state when removing', () => {
      const movie: MovieBrief = {
        id: 1,
        title: 'Test Movie',
        posterPath: '/test.jpg',
        voteAverage: 8.5,
      };

      act(() => {
        wishlistStore.getState().add(movie);
      });

      const stateBeforeRemove = wishlistStore.getState();

      act(() => {
        wishlistStore.getState().remove(1);
      });

      const stateAfterRemove = wishlistStore.getState();
      expect(stateAfterRemove).not.toBe(stateBeforeRemove);
      expect(stateAfterRemove.items).not.toBe(stateBeforeRemove.items);
    });
  });

  describe('Store Subscription', () => {
    it('should support subscription to state changes', () => {
      const listener = vi.fn();
      const unsubscribe = wishlistStore.subscribe(listener);

      // Trigger a state change
      act(() => {
        wishlistStore.getState().add({
          id: 1,
          title: 'Test Movie',
          posterPath: '/test.jpg',
          voteAverage: 8.5,
        });
      });

      expect(listener).toHaveBeenCalled();
      unsubscribe();
    });
  });
});
