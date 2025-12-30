import { useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function About() {
  const ref = useRef<HTMLElement | null>(null);
  useScrollReveal(ref);

  return (
    <section id="about" className="page-section" ref={ref}>
      <h2 className="reveal">ABOUT ME</h2>
      <div className="my-field-container reveal">
        <h3 className="my-field">Cyber Security</h3>
        <h3 className="my-field">AI</h3>
        <h3 className="my-field">App Development</h3>
        <h3 className="my-field">CTF,HTB</h3>
      </div>
      <div className="about-details reveal">
        <h3>Experience</h3>
        <ul className="about-list">
          <li>
            Currently working as a Software Engineer, where I am developing practical skills.
          </li>
          <li>
            Internship experience in implementing security access functions for in-vehicle software, focusing on encryption-based mechanisms to enhance automotive cybersecurity.
          </li>
          <li>
            In my cybersecurity research, I regularly implement Proofs-of-Concept (PoCs).
          </li>
        </ul>

        <hr className="section-divider" />

        <h3 className="reveal">Skills</h3>
        <ul className="tech-list reveal">
          <li>Programming: C/C++. Scala</li>
          <li>Web Development: Laravel, Next.js</li>
          <li>AI/ML: PyTorch</li>
        </ul>
      </div>
    </section>
  );
}


