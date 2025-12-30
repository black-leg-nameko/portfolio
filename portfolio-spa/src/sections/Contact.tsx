import { useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function Contact() {
  const ref = useRef<HTMLElement | null>(null);
  useScrollReveal(ref);
  return (
    <section id="contact" className="page-section" ref={ref}>
      <h2 className="reveal">CONTACT</h2>
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


