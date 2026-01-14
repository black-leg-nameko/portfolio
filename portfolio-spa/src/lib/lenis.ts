import Lenis from 'lenis';
import { ScrollTrigger } from './gsap';

let lenisInstance: Lenis | null = null;

export function initLenis(): void {
  if (typeof window === 'undefined' || lenisInstance) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce.matches) return;
  // Avoid smooth scrolling on touch/coarse pointers (mobile) to reduce jank
  const coarse = window.matchMedia('(pointer: coarse)');
  if (coarse.matches) return;

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

export function pauseLenis(): void {
  if (lenisInstance) {
    // stop prevents Lenis from handling wheel/touch
    // newer versions use .stop()/.start()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (lenisInstance as any).stop?.();
  }
}

export function resumeLenis(): void {
  if (lenisInstance) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (lenisInstance as any).start?.();
  }
}


