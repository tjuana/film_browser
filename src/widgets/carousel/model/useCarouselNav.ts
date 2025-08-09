import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type UseCarouselNav = () => {
  trackRef: React.RefObject<HTMLDivElement>;
  canPrev: boolean;
  canNext: boolean;
  scrollByPage: (direction: -1 | 1) => void;
  updateNow: () => void;
};

const EPSILON = 1;

export const useCarouselNav: UseCarouselNav = () => {
  const trackRef = useRef<HTMLDivElement>(null!);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const prefersReducedMotionRef = useRef(false);

  const pageAmount = useMemo(() => {
    const el = trackRef.current;
    return el ? Math.max(1, Math.floor(el.clientWidth * 0.9)) : 320;
  }, []);

  const updateState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScrollLeft = scrollWidth - clientWidth - EPSILON;
    setCanPrev(scrollLeft > 0);
    setCanNext(scrollLeft < maxScrollLeft);
  }, []);

  const updateNow = updateState;

  const scrollByPage = useCallback(
    (direction: -1 | 1) => {
      const el = trackRef.current;
      if (!el) return;
      const behavior = prefersReducedMotionRef.current ? 'auto' : 'smooth';
      el.scrollBy({ left: pageAmount * direction, behavior });
    },
    [pageAmount]
  );

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateState();

    const onScroll = () => updateState();
    el.addEventListener('scroll', onScroll, { passive: true });

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => updateState());
      ro.observe(el);
    }

    const onResize = () => updateState();
    window.addEventListener('resize', onResize);

    // prefers-reduced-motion listener
    const mql =
      typeof window !== 'undefined' && 'matchMedia' in window
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;
    if (mql) {
      prefersReducedMotionRef.current = mql.matches;
      const onChange = () => {
        prefersReducedMotionRef.current = mql.matches;
      };
      mql.addEventListener?.('change', onChange);
      if ('addListener' in mql) {
        // @ts-expect-error legacy Safari API present in older browsers
        mql.addListener(onChange);
      }
    }

    return () => {
      el.removeEventListener('scroll', onScroll);
      ro?.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, [updateState]);

  return { trackRef, canPrev, canNext, scrollByPage, updateNow };
};
