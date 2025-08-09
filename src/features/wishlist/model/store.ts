import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MovieBrief } from '@entities/movie/api/types';

type WishlistState = {
  items: MovieBrief[];
  add: (movie: MovieBrief) => void;
  remove: (id: number) => void;
  toggle: (movie: MovieBrief) => void;
  clear: () => void;
  has: (id: number) => boolean;
};

const key = 'wishlist:v1';

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (movie) =>
        set((state) => {
          if (state.items.some((m) => m.id === movie.id)) return state;
          return { items: [...state.items, movie] };
        }),
      remove: (id) =>
        set((state) => ({ items: state.items.filter((m) => m.id !== id) })),
      toggle: (movie) => {
        const exists = get().items.some((m) => m.id === movie.id);
        if (exists) {
          get().remove(movie.id);
        } else {
          get().add(movie);
        }
      },
      clear: () => set({ items: [] }),
      has: (id) => get().items.some((m) => m.id === id),
    }),
    { name: key }
  )
);
