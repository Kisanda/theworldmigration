export default function Offices() {
  return (
    <section className="section section-light" id="offices">
      <div className="wrap">
        <div className="section-head text-center">
          <span className="section-label">Global Presence &amp; Consultations</span>
          <h2>Global Reach. Dedicated In-Person Care.</h2>
          <p>
            Whether visiting our central office or consulting with our licensed advisors remotely from anywhere in the world, your file receives unified, confidential management.
          </p>
        </div>

        <div className="offices-modern-layout">
          {/* Main Headquarters Card */}
          <div className="office-feature-card">
            <div className="office-card-badge">CENTRAL CONSULTANCY OFFICE</div>
            <div className="office-header-group">
              <div className="office-flag-emblem">🇱🇰</div>
              <div>
                <h3>Colombo Central Office</h3>
                <span className="office-location-sub">Western Province, Sri Lanka</span>
              </div>
            </div>

            <p className="office-address-text">
              Galle Road, Colombo 03, Western Province, Sri Lanka
            </p>

            <div className="office-meta-grid">
              <div className="office-meta-box">
                <span className="meta-icon">🕒</span>
                <div>
                  <strong>Consultation Hours</strong>
                  <span>Monday – Saturday · 09:00 – 18:00 SLST</span>
                </div>
              </div>

              <div className="office-meta-box">
                <span className="meta-icon">📞</span>
                <div>
                  <strong>Direct Inquiries &amp; WhatsApp</strong>
                  <span>+94 11 234 5678 / +94 77 123 4567</span>
                </div>
              </div>

              <div className="office-meta-box">
                <span className="meta-icon">✉️</span>
                <div>
                  <strong>Direct Case Email</strong>
                  <span>info@theworldmigration.com</span>
                </div>
              </div>

              <div className="office-meta-box">
                <span className="meta-icon">🔒</span>
                <div>
                  <strong>Confidentiality Protocol</strong>
                  <span>Strict NDA &amp; Data Protection Maintained</span>
                </div>
              </div>
            </div>

            <div className="office-action-row">
              <a href="#contact" className="btn btn-primary">
                Book In-Person Consultation
              </a>
            </div>
          </div>

          {/* Worldwide Reach Card */}
          <div className="office-reach-card">
            <div className="reach-icon">🌐</div>
            <h3>Worldwide Client Network</h3>
            <p>
              We build strong networks in source countries to support applicants seeking migration to Australia, Canada, Denmark, and the UK. Our digital consultation rooms enable seamless file preparation regardless of your current time zone.
            </p>
            <div className="reach-badges">
              <span className="reach-badge">🇦🇺 Australia Migration Support</span>
              <span className="reach-badge">🇨🇦 Canada Immigration &amp; PNP</span>
              <span className="reach-badge">🇩🇰 Denmark Work &amp; Fast Track</span>
              <span className="reach-badge">🇬🇧 UK Entrepreneur Routing</span>
              <span className="reach-badge">🌍 Worldwide Document Attestation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
