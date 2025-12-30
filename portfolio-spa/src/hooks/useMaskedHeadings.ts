import { useEffect } from 'react';
import { gsap } from '../lib/gsap';

export function useMaskedHeadings(rootRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) return;
    const ctx = gsap.context(() => {
      const headings = gsap.utils.toArray<HTMLElement>('h2', rootRef);
      headings.forEach((h) => {
        gsap.set(h, { clipPath: 'inset(0 100% 0 0 round 2px)', autoAlpha: 0, y: 10 });
        gsap.to(h, {
          clipPath: 'inset(0 0% 0 0 round 2px)',
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: h,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, [rootRef]);
}


