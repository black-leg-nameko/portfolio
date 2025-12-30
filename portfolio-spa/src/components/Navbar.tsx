const links = [
  { href: '#about', label: 'ABOUT' },
  { href: '#portfolio', label: 'PORTFOLIO' },
  { href: '#research', label: 'RESEARCH' },
  { href: '#contact', label: 'CONTACT' },
];

export function Navbar() {
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
      </div>
    </header>
  );
}


