import { useEffect, useState } from 'react';

/**
 * Detects if user prefers reduced motion for accessibility.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(mql.matches);

    update();
    mql.addEventListener?.('change', update);
    mql.addListener?.(update);

    return () => {
      mql.removeEventListener?.('change', update);
      mql.removeListener?.(update);
    };
  }, []);

  return prefersReducedMotion;
}
