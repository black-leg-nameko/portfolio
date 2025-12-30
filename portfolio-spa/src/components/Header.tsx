import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';

const asset = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLDivElement | null>(null);
  const avatarGifRef = useRef<HTMLImageElement | null>(null);
  const avatarRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node | null;
      if (!menuRef.current || !btnRef.current) return;
      const clickedInsideMenu = menuRef.current.contains(target);
      const clickedHamburger = btnRef.current.contains(target);
      if (!clickedInsideMenu && !clickedHamburger) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  // Parallax micro-interactions for avatar elements
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) return;
    const ctx = gsap.context(() => {
      if (avatarGifRef.current) {
        gsap.to(avatarGifRef.current, {
          yPercent: -20,
          rotate: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        });
      }
      if (avatarRef.current) {
        gsap.to(avatarRef.current, {
          yPercent: 10,
          rotate: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="holo-card">
      <h1>black-leg</h1>

      <div
        className="hamburger"
        id="hamburger"
        ref={btnRef}
        onClick={() => setMenuOpen((v) => !v)}
        role="button"
        aria-label="Open navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div
        className={`mobile-menu ${menuOpen ? 'show' : ''}`}
        id="mobileMenu"
        ref={menuRef}
      >
        <nav className="mobile-nav">
          <a href="#about">ABOUT ME</a>
          <a href="#portfolio">PORTFOLIO</a>
          <a href="#research">RESEARCH &amp; PUBLICATIONS</a>
          <a href="#contact">CONTACT</a>
        </nav>
      </div>

      <div className="avatar-container">
        <div className="avatar-wrapper">
          <img
            src={asset('videos/torus-v2.gif')}
            alt="Cyber Glow"
            className="avatar-gif"
            ref={avatarGifRef}
          />
          <nav>
            <a href="#contact">
              <img
                src={asset('images/meganeHacker_dog_icon2.png')}
                alt="My Icon"
                className="avatar"
                ref={avatarRef}
              />
            </a>
          </nav>
        </div>
      </div>

      <nav className="main-menu">
        <a href="#about">ABOUT ME</a>
        <a href="#portfolio">PORTFOLIO</a>
        <a href="#research">RESEARCH &amp; PUBLICATIONS</a>
        <a href="#contact">CONTACT</a>
      </nav>
    </div>
  );
}


