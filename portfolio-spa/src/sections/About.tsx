import { useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTypewriter } from '../hooks/useTypewriter';
import { useParallaxBg } from '../hooks/useParallaxBg';
import { useSectionBg } from '../hooks/useSectionBg';

const focusAreas = ['Cyber Security', 'AI', 'App Development', 'CTF / HTB'];

export function About() {
  const ref = useRef<HTMLElement | null>(null);
  useScrollReveal(ref);
  useTypewriter(ref, 'h2');
  useParallaxBg(ref, '.parallax-bg', -6, 6);
  useSectionBg(ref, '#030303', '#070707');

  return (
    <section id="about" className="page-section" ref={ref}>
      <div className="parallax-bg" aria-hidden="true" />

      <div className="section-head">
        <h2 className="reveal typewriter">ABOUT ME</h2>
        <p className="section-copy reveal">
          Software engineer working across cybersecurity, AI, and product engineering with a focus
          on practical implementation.
        </p>
      </div>

      <div className="simple-panel reveal">
        <div className="my-field-container">
          {focusAreas.map((area) => (
            <span key={area} className="my-field">
              {area}
            </span>
          ))}
        </div>

        <hr className="section-divider" />

        <h3>Experience</h3>
        <ul className="about-list">
          <li>Currently working as a Software Engineer and building practical production skills.</li>
          <li>
            Internship experience implementing security access functions for in-vehicle software,
            with encryption-based mechanisms for automotive cybersecurity.
          </li>
          <li>
            Selected for the AKATSUKI project &quot;Fukuoka Mitou&quot; 2025.{' '}
            <a href="https://mitou-fukuoka.org/works/nnast/" target="_blank" rel="noreferrer">
              View project details
            </a>
          </li>
          <li>Regularly implementing PoCs as part of cybersecurity research and validation work.</li>
        </ul>

        <hr className="section-divider" />

        <h3>Skills</h3>
        <ul className="tech-list">
          <li>Programming: C/C++, Scala</li>
          <li>Web Development: Laravel, Next.js</li>
          <li>AI/ML: PyTorch</li>
          <li>AWS: Hands-on experience in a production environment</li>
          <li>AWS &amp; GCP: Used for research experiments and prototyping</li>
        </ul>
      </div>
    </section>
  );
}
