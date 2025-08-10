import { useCallback, useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

type UseCarouselNav = () => {
  trackRef: React.RefObject<HTMLDivElement>;
  canPrev: boolean;
  canNext: boolean;
  scrollByPage: (direction: -1 | 1) => void;
  updateNow: () => void;
};

const EPSILON = 1;
const PAGE_FACTOR = 0.9; // Процент ширины контейнера, который скроллим за раз
const FALLBACK_PAGE_WIDTH = 320; // Если ref ещё не смонтирован

export const useCarouselNav: UseCarouselNav = () => {
  const trackRef = useRef<HTMLDivElement>(null!);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Рассчитываем размер страницы
  const getPageAmount = useCallback(() => {
    const el = trackRef.current;
    return el
      ? Math.max(1, Math.floor(el.clientWidth * PAGE_FACTOR))
      : FALLBACK_PAGE_WIDTH;
  }, []);

  // Обновляем состояния кнопок
  const updateState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScrollLeft = scrollWidth - clientWidth - EPSILON;

    setCanPrev(scrollLeft > 0);
    setCanNext(scrollLeft < maxScrollLeft);
  }, []);

  const updateNow = updateState;

  // Скролл на одну страницу
  const scrollByPage = useCallback(
    (direction: -1 | 1) => {
      const el = trackRef.current;
      if (!el) return;

      el.scrollBy({
        left: getPageAmount() * direction,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    },
    [getPageAmount, prefersReducedMotion]
  );

  // Подписки на события
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    updateState();

    const onScroll = () => updateState();
    el.addEventListener('scroll', onScroll, { passive: true });

    // ResizeObserver
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(updateState);
      ro.observe(el);
    }

    window.addEventListener('resize', updateState);

    return () => {
      el.removeEventListener('scroll', onScroll);
      ro?.disconnect();
      window.removeEventListener('resize', updateState);
    };
  }, [updateState]);

  return { trackRef, canPrev, canNext, scrollByPage, updateNow };
};
