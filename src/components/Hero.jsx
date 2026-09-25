export default function Hero() {
  return (
    <>
      <section className="hero hero-ivory" id="top">
        <div className="hero-ambient-glow" aria-hidden="true"></div>

        <div className="hero-content">
          <div className="wrap">
            <div className="hero-inner">
              <div className="hero-badge hero-badge-warm">
                <span className="hero-badge-pulse"></span>
                <span>RETIRED IMMIGRATION OFFICERS · ICCRC &amp; MARA ACCREDITED</span>
              </div>

              <h1 className="hero-headline">
                <span className="hero-line-navy">The Backbone of Every</span>
                <span className="hero-line-gradient">Migrant’s Success Story.</span>
              </h1>

              <p className="hero-sub">
                Founded by retired in-house experts from the UK and Canadian Immigration Departments. Unparalleled migration consulting for Australia, Canada, Denmark, and the United Kingdom — with impartial advice offered free of charge before you become a paying client.
              </p>

              <div className="hero-actions">
                <a href="#contact" className="btn btn-hero-primary btn-lg">
                  Claim Free Visa Assessment →
                </a>
                <a href="#destinations" className="btn btn-hero-outline btn-lg">
                  Explore Destinations ↓
                </a>
              </div>

              {/* Quick Trust Chips */}
              <div className="hero-trust-chips">
                <span className="hero-chip">✓ No-Obligation Assessment</span>
                <span className="hero-chip">✓ 100% Client Confidentiality</span>
                <span className="hero-chip">✓ 100% Value For Money</span>
                <span className="hero-chip">✓ Powered by Client Referrals</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern High-Impact Trust Stats Bar */}
      <div className="stats-bar">
        <div className="wrap">
          <div className="stats-bar-inner">
            <div className="stat-item">
              <div className="stat-icon-wrapper gold-bg">🏛️</div>
              <div>
                <div className="stat-value stat-val-gold">Ex-Officers</div>
                <div className="stat-label">UK &amp; Canada Immigration Depts</div>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon-wrapper blue-bg">⚖️</div>
              <div>
                <div className="stat-value stat-val-blue">ICCRC &amp; MARA</div>
                <div className="stat-label">Canada &amp; Australia Accredited</div>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon-wrapper red-bg">💯</div>
              <div>
                <div className="stat-value stat-val-red">100%</div>
                <div className="stat-label">Honest, Reliable &amp; Value Driven</div>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon-wrapper gold-bg">📣</div>
              <div>
                <div className="stat-value stat-val-gold">Word-of-Mouth</div>
                <div className="stat-label">Driven by Satisfied Client Referrals</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
