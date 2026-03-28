const asset = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`;

export function Hero() {
  return (
    <section className="hero">
      <div
        className="hero-bg"
        aria-hidden="true"
        style={{ backgroundImage: `url("${asset('videos/torus-v2.gif')}")` }}
      />
      <div className="hero-shell">
        <h1 className="hero-title">Black-Leg</h1>

        <div className="hero-actions">
          <a href="#portfolio" className="hero-button hero-button-primary">
            View projects
          </a>
          <a href="#contact" className="hero-button hero-button-secondary">
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}
