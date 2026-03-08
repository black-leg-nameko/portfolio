import { useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTypewriter } from '../hooks/useTypewriter';
import { useParallaxBg } from '../hooks/useParallaxBg';
import { useSectionBg } from '../hooks/useSectionBg';

type ContactIconProps = {
  className?: string;
};

function GitHubIcon({ className }: ContactIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.72.08-.72 1.21.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.66-.31-5.47-1.33-5.47-5.93 0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.52.12-3.16 0 0 1-.32 3.3 1.23A11.49 11.49 0 0 1 12 6.8c1.02 0 2.05.14 3.01.41 2.3-1.55 3.3-1.23 3.3-1.23.66 1.64.25 2.86.12 3.16.77.84 1.24 1.92 1.24 3.23 0 4.61-2.81 5.62-5.49 5.92.43.38.82 1.14.82 2.29 0 1.65-.02 2.97-.02 3.37 0 .32.22.69.83.58C20.57 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0Z"
      />
    </svg>
  );
}

function LinkedInIcon({ className }: ContactIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95v5.67H9.33V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.28 2.37 4.28 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45Z"
      />
    </svg>
  );
}

function XIcon({ className }: ContactIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.81-7.59-6.64 7.59H.47l8.6-9.83L0 1.15h7.59l5.25 6.93 6.06-6.93Zm-1.3 19.49h2.04L6.49 3.24H4.3Z"
      />
    </svg>
  );
}

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
      <p>e-mail: blacklegnameko14@gmail.com</p>
      <div className="contact-links reveal">
        <a href="https://github.com/black-leg-nameko" target="_blank" className="contact-link" rel="noreferrer">
          <GitHubIcon className="contact-icon" />
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/ryuto-kitajima-b93748378/" target="_blank" className="contact-link" rel="noreferrer">
          <LinkedInIcon className="contact-icon" />
          LinkedIn
        </a>
        <a href="https://x.com/BlackLeg_nmk" target="_blank" className="contact-link" rel="noreferrer">
          <XIcon className="contact-icon" />
          X
        </a>
      </div>
    </section>
  );
}

