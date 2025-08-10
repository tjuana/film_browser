import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MovieBrief } from '@entities/movie/model/types';

// Action types for better type safety
type WishlistActions = {
  add: (movie: MovieBrief) => void;
  remove: (id: number) => void;
  toggle: (movie: MovieBrief) => void;
  clear: () => void;
};

// State type
type WishlistState = {
  items: MovieBrief[];
};

// Combined store type
type WishlistStore = WishlistState & WishlistActions;

const key = 'wishlist:v1';

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      add: (movie) =>
        set((state) => {
          // Prevent duplicate items
          if (state.items.some((m) => m.id === movie.id)) return state;
          return { items: [...state.items, movie] };
        }),

      remove: (id) =>
        set((state) => ({
          items: state.items.filter((m) => m.id !== id),
        })),

      toggle: (movie) => {
        const state = get();
        const exists = state.items.some((m) => m.id === movie.id);

        if (exists) {
          // Use set for immutable update instead of calling get().remove()
          set({
            items: state.items.filter((m) => m.id !== movie.id),
          });
        } else {
          // Use set for immutable update instead of calling get().add()
          set({
            items: [...state.items, movie],
          });
        }
      },

      clear: () => set({ items: [] }),
    }),
    { name: key }
  )
);

// Memoized selectors using useMemo pattern for React components
export const useWishlistSelectors = () => {
  const items = useWishlistStore((state) => state.items);
  const count = items.length;
  const isEmpty = count === 0;

  return {
    items,
    count,
    isEmpty,
    has: (id: number) => items.some((m) => m.id === id),
    getById: (id: number) => items.find((m) => m.id === id),
  };
};

// Action selectors for React components
export const useWishlistActions = () => {
  return {
    add: useWishlistStore((state) => state.add),
    remove: useWishlistStore((state) => state.remove),
    toggle: useWishlistStore((state) => state.toggle),
    clear: useWishlistStore((state) => state.clear),
  };
};

// Direct store access for non-React contexts (like tests)
export const wishlistStore = {
  getState: () => useWishlistStore.getState(),
  subscribe: (listener: (state: WishlistStore) => void) =>
    useWishlistStore.subscribe(listener),
};
