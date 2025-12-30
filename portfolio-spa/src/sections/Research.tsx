import { useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function Research() {
  const ref = useRef<HTMLElement | null>(null);
  useScrollReveal(ref);
  return (
    <section id="research" className="page-section" ref={ref}>
      <h2 className="reveal">RESEARCH &amp; PUBLICATIONS</h2>
      <div className="my-field-container reveal">
        <h3 className="my-field">Blockchain</h3>
        <h3 className="my-field">NFT Security</h3>
        <h3 className="my-field">AI</h3>
      </div>
    </section>
  );
}


