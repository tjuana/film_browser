import { useEffect } from 'react';

export const useCarouselDrag = (trackRef: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let isDown = false;
    let moved = false;
    let startX = 0;
    let startScrollLeft = 0;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      isDown = true;
      moved = false;
      startX = e.clientX;
      startScrollLeft = el.scrollLeft;
      (el as HTMLElement).style.scrollBehavior = 'auto';
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDown || e.pointerType !== 'mouse') return;
      const delta = e.clientX - startX;
      if (Math.abs(delta) > 3) moved = true;
      el.scrollLeft = startScrollLeft - delta;
    };

    const end = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      isDown = false;
      (el as HTMLElement).style.scrollBehavior = '';
      if (moved) {
        // Prevent the synthetic click generated after a drag
        const preventClick = (evt: Event) => {
          evt.stopPropagation();
          evt.preventDefault();
        };
        el.addEventListener('click', preventClick, {
          capture: true,
          once: true,
        });
      }
    };

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', end);
    el.addEventListener('pointerleave', end);

    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', end);
      el.removeEventListener('pointerleave', end);
    };
  }, [trackRef]);
};
