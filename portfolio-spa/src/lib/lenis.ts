import Lenis from 'lenis';
import { ScrollTrigger } from './gsap';

let lenisInstance: Lenis | null = null;

export function initLenis(): void {
  if (typeof window === 'undefined' || lenisInstance) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce.matches) return;

  const lenis = new Lenis({
    smoothWheel: true,
    lerp: 0.1,
  });

  lenis.on('scroll', () => {
    ScrollTrigger.update();
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  lenisInstance = lenis;
}


