import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  // register once
  try {
    gsap.registerPlugin(ScrollTrigger);
  } catch {}
}

export { gsap, ScrollTrigger };


