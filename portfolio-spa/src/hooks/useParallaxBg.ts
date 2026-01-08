import { useEffect } from 'react';
import { gsap } from '../lib/gsap';

export function useParallaxBg(
  rootRef: React.RefObject<HTMLElement | null>,
  selector: string = '.parallax-bg',
  yFrom: number = -10,
  yTo: number = 10
) {
  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) return;
    const ctx = gsap.context(() => {
      const el = rootRef.current!.querySelector<HTMLElement>(selector);
      if (!el) return;
      gsap.fromTo(
        el,
        { yPercent: yFrom },
        {
          yPercent: yTo,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current!,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, [rootRef, selector, yFrom, yTo]);
}


