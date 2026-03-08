import { useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

export function useScrollReveal(
  rootRef: React.RefObject<HTMLElement | null>,
  selector: string = '.reveal, .project-card'
) {
  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) return;
    const coarse = window.matchMedia('(pointer: coarse)');
    if (coarse.matches) return;

    let refreshFrame = 0;
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>(selector, rootRef.current!);
      elements.forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            overwrite: 'auto',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      });

      // React commits this subtree before paint; refresh once on the next frame
      // so ScrollTrigger measures the final section layout.
      refreshFrame = window.requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, rootRef);

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      ctx.revert();
    };
  }, [rootRef, selector]);
}

