import { useState } from 'react';

const destinations = [
  {
    id: 'australia',
    flag: '🇦🇺',
    country: 'Australia',
    reg: 'MARA Registered',
    regType: 'mara',
    desc: 'Pathway management for General Skilled Migration, state nominations, and employer-sponsored programs.',
    streams: ['Subclass 189 (Independent)', 'Subclass 190 (State Nominated)', 'Subclass 491 (Regional)', 'Employer Sponsored Visas'],
    badgeClass: 'dest-stream-tag-blue',
    cardClass: 'dest-card-australia',
    gradient: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 50%, #EFF6FF 100%)',
    bgSymbol: '🦘',
  },
  {
    id: 'canada',
    flag: '🇨🇦',
    country: 'Canada',
    reg: 'ICCRC Accredited',
    regType: 'iccrc',
    desc: 'Comprehensive Express Entry profile engineering and provincial nominations across all Canadian territories.',
    streams: ['Federal Skilled Worker (FSW)', 'Canadian Experience Class (CEC)', 'Provincial Nominees (PNP)', 'Work & Study Permits'],
    badgeClass: 'dest-stream-tag-red',
    cardClass: 'dest-card-canada',
    gradient: 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 50%, #FFF5F5 100%)',
    bgSymbol: '🍁',
  },
  {
    id: 'denmark',
    flag: '🇩🇰',
    country: 'Denmark',
    reg: 'European Mobility',
    regType: 'europe',
    desc: 'High-income European pathways, Danish Positive List, and fast-track residence schemes for skilled specialists.',
    streams: ['Positive List Scheme', 'Pay Limit Scheme', 'Fast Track Employment', 'Permanent Residence Tracks'],
    badgeClass: 'dest-stream-tag-gold',
    cardClass: 'dest-card-denmark',
    gradient: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 50%, #FFFDF5 100%)',
    bgSymbol: '👑',
  },
  {
    id: 'uk',
    flag: '🇬🇧',
    country: 'United Kingdom',
    reg: 'Entrepreneur Specialist',
    regType: 'uk',
    desc: 'Specialized enterprise pathways for business founders, high-net-worth investors, and skilled leaders.',
    streams: ['UK Entrepreneur Visas', 'Innovator Founder Route', 'Skilled Worker Visa', 'Global Talent Pathways'],
    badgeClass: 'dest-stream-tag-purple',
    cardClass: 'dest-card-uk',
    gradient: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 50%, #F8F7FF 100%)',
    bgSymbol: '🏰',
  },
];

export default function Countries() {
  const [selectedCountry, setSelectedCountry] = useState('all');

  const filtered = selectedCountry === 'all'
    ? destinations
    : destinations.filter((d) => d.id === selectedCountry);

  return (
    <section className="section section-light" id="destinations">
      <div className="wrap">
        <div className="section-head text-center">
          <span className="section-label">Target Destinations</span>
          <h2>Where We Specialize.<br />Proven Global Visa Results.</h2>
          <p>
            At The World Migration, we maintain specialized legal insight and direct in-house experience for the world&rsquo;s most sought-after immigration destinations.
          </p>

          <div className="dest-filter-tabs">
            <button
              type="button"
              className={`dest-tab-btn ${selectedCountry === 'all' ? 'is-active' : ''}`}
              onClick={() => setSelectedCountry('all')}
            >
              All Destinations (4)
            </button>
            <button
              type="button"
              className={`dest-tab-btn ${selectedCountry === 'australia' ? 'is-active' : ''}`}
              onClick={() => setSelectedCountry('australia')}
            >
              🇦🇺 Australia
            </button>
            <button
              type="button"
              className={`dest-tab-btn ${selectedCountry === 'canada' ? 'is-active' : ''}`}
              onClick={() => setSelectedCountry('canada')}
            >
              🇨🇦 Canada
            </button>
            <button
              type="button"
              className={`dest-tab-btn ${selectedCountry === 'denmark' ? 'is-active' : ''}`}
              onClick={() => setSelectedCountry('denmark')}
            >
              🇩🇰 Denmark
            </button>
            <button
              type="button"
              className={`dest-tab-btn ${selectedCountry === 'uk' ? 'is-active' : ''}`}
              onClick={() => setSelectedCountry('uk')}
            >
              🇬🇧 United Kingdom
            </button>
          </div>
        </div>

        <div className="dest-grid-4">
          {filtered.map((d) => (
            <div className={`dest-card-modern ${d.cardClass}`} key={d.id}>
              <div className="dest-card-header-art" style={{ background: d.gradient }}>
                <span className="dest-art-symbol">{d.bgSymbol}</span>
                <div className="dest-flag-badge">{d.flag}</div>
                <span className={`dest-reg-pill reg-${d.regType}`}>{d.reg}</span>
              </div>

              <div className="dest-card-content">
                <div className="dest-title-row">
                  <h3>{d.country}</h3>
                </div>
                <p className="dest-card-desc">{d.desc}</p>

                <div className="dest-streams-box">
                  <span className="dest-streams-heading">Popular Visa Streams:</span>
                  <div className="dest-stream-tags">
                    {d.streams.map((stream) => (
                      <span key={stream} className={`dest-stream-pill ${d.badgeClass}`}>
                        {stream}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="dest-card-footer">
                  <a href="#contact" className="btn-dest-link">
                    Assess {d.country} Eligibility →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
