import { useEffect } from 'react';
import { gsap } from '../lib/gsap';

export function useSectionBg(
  rootRef: React.RefObject<HTMLElement | null>,
  startColor: string,
  endColor: string
) {
  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) return;
    const coarse = window.matchMedia('(pointer: coarse)');
    if (coarse.matches) return;
    const ctx = gsap.context(() => {
      gsap.to(document.documentElement, {
        duration: 1,
        ease: 'power2.out',
        '--bg-start': startColor,
        '--bg-end': endColor,
        scrollTrigger: {
          trigger: rootRef.current!,
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play reverse play reverse',
        } as any,
      });
    }, rootRef);
    return () => ctx.revert();
  }, [rootRef, startColor, endColor]);
}


