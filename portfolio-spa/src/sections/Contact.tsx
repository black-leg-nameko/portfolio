import { useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTypewriter } from '../hooks/useTypewriter';
import { useParallaxBg } from '../hooks/useParallaxBg';
import { useSectionBg } from '../hooks/useSectionBg';

export function Contact() {
  const ref = useRef<HTMLElement | null>(null);
  useScrollReveal(ref);
  useTypewriter(ref, 'h2');
  useParallaxBg(ref, '.parallax-bg', -5, 8);
  useSectionBg(ref, '#070a12', '#0a0f16');
  return (
    <section id="contact" className="page-section" ref={ref}>
      <div className="parallax-bg" aria-hidden="true" />
      <h2 className="reveal typewriter">CONTACT</h2>
      <p>mail: ryutokitajima14@gmail.com</p>
      <div className="contact-links reveal">
        <a href="https://github.com/black-leg-nameko" target="_blank" className="contact-link" rel="noreferrer">
          <i className="fab fa-github"></i> GitHub
        </a>
        <a href="https://www.linkedin.com/in/ryuto-kitajima-b93748378/" target="_blank" className="contact-link" rel="noreferrer">
          <i className="fab fa-linkedin"></i> LinkedIn
        </a>
        <a href="https://x.com/BlackLeg_nmk" target="_blank" className="contact-link" rel="noreferrer">
          <i className="fab fa-x-twitter"></i> X
        </a>
      </div>
    </section>
  );
}


