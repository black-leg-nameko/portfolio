import { useEffect, useRef, useState } from 'react';

const links = [
  { href: '#about', label: 'ABOUT' },
  { href: '#portfolio', label: 'PORTFOLIO' },
  { href: '#research', label: 'RESEARCH' },
  { href: '#contact', label: 'CONTACT' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('');
  const menuRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node | null;
      if (!menuRef.current || !btnRef.current) return;
      if (!menuRef.current.contains(target) && !btnRef.current.contains(target)) {
        setOpen(false);
      }
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }

    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    const sections = links
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (current) {
          setActiveHref(`#${current.target.id}`);
        }
      },
      {
        rootMargin: '-35% 0px -45% 0px',
        threshold: [0.25, 0.5, 0.75],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="nav-root">
      <div className="nav-inner">
        <a href="#" className="nav-brand" aria-label="Back to top">
          black-leg
        </a>

        <nav className="nav-links" aria-label="Primary navigation">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link ${activeHref === link.href ? 'active' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={`hamburger ${open ? 'open' : ''}`}
          ref={btnRef}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-menu ${open ? 'show' : ''}`} ref={menuRef} aria-hidden={!open}>
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={activeHref === link.href ? 'active' : ''}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
