import { useEffect } from 'react';
import { gsap } from '../lib/gsap';

export function useScrollReveal(
  rootRef: React.RefObject<HTMLElement | null>,
  selector: string = '.reveal, .project-card'
) {
  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) return;

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>(selector, rootRef);
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
    }, rootRef);

    return () => {
      ctx.revert();
    };
  }, [rootRef, selector]);
}


