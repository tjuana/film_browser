import '@testing-library/jest-dom/vitest';

// Polyfill matchMedia for jsdom
if (typeof window !== 'undefined' && !('matchMedia' in window)) {
  // @ts-expect-error jsdom polyfill
  window.matchMedia = (query: string) => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    } as MediaQueryList;
  };
}
