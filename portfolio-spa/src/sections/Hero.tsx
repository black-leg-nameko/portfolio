const asset = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`;

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-media">
        <img
          src={asset('videos/torus-v2.gif')}
          alt=""
          aria-hidden="true"
          className="hero-bg"
        />
      </div>
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="hero-title">black-leg</h1>
        <p className="hero-sub">portfolio site</p>
      </div>
    </section>
  );
}


