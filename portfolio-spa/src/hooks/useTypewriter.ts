import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

function splitIntoSpans(el: HTMLElement): HTMLElement[] {
  const text = el.textContent || '';
  el.setAttribute('data-original', text);
  el.textContent = '';
  const spans: HTMLElement[] = [];
  for (const ch of Array.from(text)) {
    const span = document.createElement('span');
    span.className = 'tw-char';
    span.textContent = ch;
    el.appendChild(span);
    spans.push(span);
  }
  return spans;
}

export function useTypewriter(rootRef: React.RefObject<HTMLElement | null>, selector: string = 'h2') {
  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) return;

    const ctx = gsap.context(() => {
      const headings = Array.from(rootRef.current!.querySelectorAll<HTMLElement>(selector));
      headings.forEach((h) => {
        if (!h.classList.contains('typewriter')) {
          h.classList.add('typewriter');
        }
        // avoid double split
        if (!h.querySelector('.tw-char')) {
          splitIntoSpans(h);
        }
        const chars = Array.from(h.querySelectorAll<HTMLElement>('.tw-char'));
        const tl = gsap.timeline({ paused: true });
        tl.set(chars, { autoAlpha: 0 });
        tl.to(chars, {
          autoAlpha: 1,
          duration: 0.02,
          stagger: 0.03,
          ease: 'none',
        });
        ScrollTrigger.create({
          trigger: h,
          start: 'top 85%',
          onEnter: () => {
            gsap.set(chars, { autoAlpha: 0 });
            tl.restart(true, false);
          },
          onEnterBack: () => {
            gsap.set(chars, { autoAlpha: 0 });
            tl.restart(true, false);
          },
          onLeave: () => {
            gsap.set(chars, { autoAlpha: 0 });
          },
          onLeaveBack: () => {
            gsap.set(chars, { autoAlpha: 0 });
          },
        });
      });
    }, rootRef);

    return () => {
      ctx.revert();
    };
  }, [rootRef, selector]);
}


