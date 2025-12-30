import { useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMaskedHeadings } from '../hooks/useMaskedHeadings';
import { useParallaxBg } from '../hooks/useParallaxBg';
import { useSectionBg } from '../hooks/useSectionBg';

export function Research() {
  const ref = useRef<HTMLElement | null>(null);
  useScrollReveal(ref);
  useMaskedHeadings(ref);
  useParallaxBg(ref, '.parallax-bg', -7, 9);
  useSectionBg(ref, '#060a10', '#0a0f18');
  return (
    <section id="research" className="page-section" ref={ref}>
      <div className="parallax-bg" aria-hidden="true" />
      <h2 className="reveal">RESEARCH &amp; PUBLICATIONS</h2>
      <div className="my-field-container reveal">
        <h3 className="my-field">Blockchain</h3>
        <h3 className="my-field">NFT Security</h3>
        <h3 className="my-field">AI</h3>
      </div>
    </section>
  );
}


