import { useEffect, useRef, useState } from 'react';

const links = [
  { href: '#about', label: 'ABOUT' },
  { href: '#portfolio', label: 'PORTFOLIO' },
  { href: '#research', label: 'RESEARCH' },
  { href: '#contact', label: 'CONTACT' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const t = e.target as Node | null;
      if (!menuRef.current || !btnRef.current) return;
      const insideMenu = menuRef.current.contains(t);
      const onButton = btnRef.current.contains(t);
      if (!insideMenu && !onButton) setOpen(false);
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

  const handleLinkClick = () => setOpen(false);

  return (
    <header className="nav-root">
      <div className="nav-inner">
        <div className="nav-brand">black-leg</div>
        <nav className="nav-links">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
        </nav>
        <div
          className="hamburger"
          ref={btnRef}
          role="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div
        className={`mobile-menu ${open ? 'show' : ''}`}
        ref={menuRef}
        aria-hidden={!open}
      >
        <nav className="mobile-nav">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={handleLinkClick}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}


