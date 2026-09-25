import { useState } from 'react';

const serviceList = [
  {
    id: 'skilled',
    num: '01',
    category: 'Skilled Migration',
    title: 'Migration Consulting for Skilled Migrants',
    desc: 'Comprehensive points scoring, credential evaluations (WES, ACS, Engineers Australia, VETASSESS), and strategic occupation mapping for Australia and Canada.',
    icon: '🎯',
    color: 'gold',
    features: [
      'Comprehensive Points & Eligibility Audit',
      'Credential Assessments (ECA, ACS, EA, VETASSESS)',
      'Provincial & State Nomination Selection',
      'Impartial qualification guidance before fees',
    ],
  },
  {
    id: 'work',
    num: '02',
    category: 'Work Visas',
    title: 'Work Visas & Employment Permits',
    desc: 'Procuring employer-sponsored visas, Danish Fast Track schemes, Pay Limit tracks, and temporary-to-permanent residence work authorisations.',
    icon: '💼',
    color: 'blue',
    features: [
      'Denmark Fast Track & Pay Limit Schemes',
      'Australia Employer Sponsored & Regional Visas',
      'Canada LMIA & Global Talent Streams',
      'Employer compliance & documentation dossier',
    ],
  },
  {
    id: 'entrepreneur',
    num: '03',
    category: 'Business & Investor',
    title: 'Investor & UK Entrepreneur Visas',
    desc: 'Specialized enterprise visa procurement for visionary founders and high-net-worth investors seeking residency in the UK, Europe, and Australasia.',
    icon: '🚀',
    color: 'purple',
    features: [
      'UK Innovator Founder & Entrepreneur Visas',
      'Endorsing body pitch preparation & review',
      'Investor visa capital compliance audits',
      'Commercial immigration law alignment',
    ],
  },
  {
    id: 'study',
    num: '04',
    category: 'Education',
    title: 'Study Permits & Student Visas',
    desc: 'Guiding students toward accredited academic institutions worldwide with seamless permit procurement and strategic post-study work tracks.',
    icon: '🎓',
    color: 'blue',
    features: [
      'Letter of Acceptance (LOA) coordination',
      'Financial capability & GIC guidance',
      'Post-Graduation Work Permit (PGWP) mapping',
      'Direct pathway from student to PR',
    ],
  },
  {
    id: 'visit',
    num: '05',
    category: 'Travel & Tourism',
    title: 'Visit & Tourist Visas',
    desc: 'Meticulous application assembly for business trips, tourism, family visits, and conference travel across the globe with zero margin for error.',
    icon: '✈️',
    color: 'gold',
    features: [
      'Genuine Temporary Entrant (GTE) evidence',
      'Embassy dossier organization & review',
      'Family & business invitation drafting',
      'Expedited visa appointments & submissions',
    ],
  },
  {
    id: 'attestation',
    num: '06',
    category: 'Legal Documents',
    title: 'Document Attestation & Translations',
    desc: 'Certified translation and international attestation services for academic, civil, and corporate documents for all countries across the globe.',
    icon: '📑',
    color: 'red',
    features: [
      'Ministry of Foreign Affairs (MFA) Attestation',
      'Embassy Legalization & Apostille seals',
      'Certified multi-lingual sworn translations',
      'Global acceptance guarantee across embassies',
    ],
  },
];

export default function Services() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredServices = activeFilter === 'all'
    ? serviceList
    : serviceList.filter((s) => s.category.toLowerCase().includes(activeFilter));

  return (
    <section className="section section-cream" id="services">
      <div className="wrap">
        <div className="section-head text-center">
          <span className="section-label">Full-Spectrum Migration Services</span>
          <h2>Tailored Immigration Solutions.<br />Zero Compromise on Quality.</h2>
          <p>
            From skilled professional migration and corporate entrepreneurship to worldwide document attestation — our retired immigration officers ensure every file meets the highest global standards.
          </p>

          <div className="service-filter-row">
            <button
              type="button"
              className={`srv-filter-btn ${activeFilter === 'all' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Services ({serviceList.length})
            </button>
            <button
              type="button"
              className={`srv-filter-btn ${activeFilter === 'skilled' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('skilled')}
            >
              🎯 Skilled Migration
            </button>
            <button
              type="button"
              className={`srv-filter-btn ${activeFilter === 'work' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('work')}
            >
              💼 Work Visas
            </button>
            <button
              type="button"
              className={`srv-filter-btn ${activeFilter === 'business' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('business')}
            >
              🚀 Entrepreneur &amp; Investor
            </button>
            <button
              type="button"
              className={`srv-filter-btn ${activeFilter === 'legal' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('legal')}
            >
              📑 Attestation &amp; Translations
            </button>
          </div>
        </div>

        <div className="services-master-grid">
          {filteredServices.map((s) => (
            <div className={`service-modern-card srv-theme-${s.color}`} key={s.id}>
              <div className="srv-card-top">
                <div className="srv-icon-bubble">
                  <span>{s.icon}</span>
                </div>
                <div className="srv-card-meta">
                  <span className="srv-card-num">{s.num}</span>
                  <span className="srv-card-badge">{s.category}</span>
                </div>
              </div>

              <h3 className="srv-card-title">{s.title}</h3>
              <p className="srv-card-desc">{s.desc}</p>

              <div className="srv-card-features">
                <span className="srv-features-label">Key Highlights:</span>
                <ul>
                  {s.features.map((feat, i) => (
                    <li key={i}>
                      <span className="srv-check-dot">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="srv-card-bottom">
                <a href="#contact" className="srv-cta-link">
                  Consult On {s.category} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
