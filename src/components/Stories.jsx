const clientStories = [
  {
    quote: 'My colleague referred me to The World Migration after her own Canada PR was granted. The retired immigration officers gave me an impartial assessment for free that pointed out errors previous agencies had made. Within 6 months, our Express Entry file was approved without a single hitch!',
    name: 'Dilshan & Chamari Perera',
    initials: 'DP',
    destination: 'Canada PR — Express Entry',
    flag: '🇨🇦',
    referralSource: 'Referred by past client',
    timeframe: '6 Months to PR',
    accent: 'red',
  },
  {
    quote: 'The World Migration is 100% value for money. Their knowledge of Australian MARA regulations and state nominations for Subclass 190 was unmatched. They handled our skills assessment and state dossier flawlessly. Now living and working in Melbourne!',
    name: 'Dr. Aaron Thorne',
    initials: 'AT',
    destination: 'Australia General Skilled Migration (Subclass 190)',
    flag: '🇦🇺',
    referralSource: 'Referred by family friend',
    timeframe: 'State Nominated Grant',
    accent: 'blue',
  },
  {
    quote: 'Securing a UK Entrepreneur endorsement felt daunting until we consulted The World Migration. Their team’s in-house experience with UK Immigration Department protocols helped us present our business plan perfectly to the endorsing body. Truly unparalleled service!',
    name: 'Mehul & Priya Patel',
    initials: 'MP',
    destination: 'United Kingdom — Entrepreneur & Business Visa',
    flag: '🇬🇧',
    referralSource: 'Word of mouth recommendation',
    timeframe: 'Endorsed & Approved',
    accent: 'purple',
  },
  {
    quote: 'We needed our degrees attested and translated for the Danish Fast Track scheme. The World Migration completed the entire certified translation and document attestation process in record time with absolute confidentiality. Highly recommended!',
    name: 'Soren & Ananya Lindqvist',
    initials: 'SL',
    destination: 'Denmark — Fast Track Work & Residence',
    flag: '🇩🇰',
    referralSource: 'Referred by university alum',
    timeframe: 'Work & Residence Approved',
    accent: 'gold',
  },
];

export default function Stories() {
  return (
    <section className="section section-cream" id="stories">
      <div className="wrap">
        <div className="section-head text-center">
          <div className="referral-badge-pill">
            <span>📣 OUR BIGGEST MARKETING TOOL IS WORD OF MOUTH</span>
          </div>
          <h2>Real Client Stories.<br />Powered by Word-of-Mouth Trust.</h2>
          <p>
            Most of our new clients join us through personal recommendations from past applicants. Here is how our honesty, step-by-step assistance, and in-house expertise promoted their success.
          </p>
        </div>

        <div className="stories-grid-modern">
          {clientStories.map((s, idx) => (
            <div className={`story-card-modern story-card-${s.accent}`} key={idx}>
              <div className="story-card-header">
                <div className="story-stars">★★★★★</div>
                <span className="story-referral-tag">
                  <span>🤝</span> {s.referralSource}
                </span>
              </div>

              <blockquote className="story-quote">
                &ldquo;{s.quote}&rdquo;
              </blockquote>

              <div className="story-destination-chip">
                <span className="story-flag">{s.flag}</span>
                <span className="story-dest-name">{s.destination}</span>
              </div>

              <div className="story-author-bar">
                <div className={`story-avatar avatar-${s.accent}`}>
                  {s.initials}
                </div>
                <div className="story-author-details">
                  <strong className="story-author-name">{s.name}</strong>
                  <span className="story-author-time">{s.timeframe}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
