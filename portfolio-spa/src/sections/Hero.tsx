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
        <h1 className="hero-title">PORTFOLIO</h1>
        <p className="hero-sub">Cinematic Experience Inspired by Hathaway</p>
      </div>
      <div className="hero-scroll-cue">SCROLL</div>
    </section>
  );
}


