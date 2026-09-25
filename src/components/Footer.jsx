import logo from '../assets/migration-firm-logo.png';
import { useContent } from '../content.js';

const services = [
  ['FREE Migration Counselling', 'not-sure'],
  ['Skilled Migration & Points Scoring', 'canada-pr'],
  ['Work Visas & Employment Permits', 'work-visa'],
  ['UK Entrepreneur & Innovator Visas', 'uk-entrepreneur'],
  ['Study Permits & Student Visas', 'student-visa'],
  ['Document Attestation & Legalization', 'attestation'],
  ['Certified Multi-Lingual Translations', 'attestation'],
];
const destinations = ['Australia', 'Canada', 'Denmark', 'United Kingdom'];

const socialIcons = [
  { name: 'Facebook',  key: 'social_facebook',  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
  { name: 'LinkedIn',  key: 'social_linkedin',  icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> },
  { name: 'Instagram', key: 'social_instagram', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
  { name: 'YouTube',   key: 'social_youtube',   icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.6 6.1c-.2-.9-.9-1.6-1.8-1.8C18.2 4 12 4 12 4s-6.2 0-7.8.3c-.9.2-1.6.9-1.8 1.8C2 7.7 2 12 2 12s0 4.3.4 5.9c.2.9.9 1.6 1.8 1.8C5.8 20 12 20 12 20s6.2 0 7.8-.3c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-5.9.4-5.9s0-4.3-.4-5.9ZM10 15.5v-7l6 3.5-6 3.5Z"/></svg> },
  { name: 'X',         key: 'social_x',         icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M4 3h4l12 18h-4L4 3Zm0 18 7-8M13 11l7-8"/></svg> },
  { name: 'WhatsApp',  key: 'social_whatsapp',  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg> },
];

export default function Footer({ onSelectInterest }) {
  const content = useContent();

  return <footer className="reference-footer" id="footer">
    <div className="wrap">
      <div className="reference-footer-grid">
        <div className="reference-footer-brand">
          <a href="#top" aria-label="The World Migration home" className="reference-footer-logo"><img src={logo} alt="The Migration Firm International" width="2031" height="774"/></a>
          <h2>Let's get social.</h2>
          <div className="reference-socials" aria-label="Social media">
            {socialIcons.map(({name, key, icon}) => {
              const url = content?.[key];
              return url
                ? <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name} title={name}>{icon}</a>
                : <button type="button" key={name} disabled aria-label={`${name} — coming soon`} title={`${name} coming soon`}>{icon}</button>;
            })}
          </div>
        </div>
        <nav className="reference-footer-column" aria-label="Our services"><h2>Our Services</h2>
          {services.map(([label,value]) => <a key={label} href="#contact" onClick={() => onSelectInterest(value)}>{label}</a>)}
        </nav>
        <nav className="reference-footer-column" aria-label="Study destinations"><h2>Study Destinations</h2>
          {destinations.map(country => <a key={country} href="#contact" onClick={() => onSelectInterest('student-visa')}>Study In {country}</a>)}
          <a href="#contact" onClick={() => onSelectInterest('not-sure')}>Worldwide Study &amp; Visit Visas</a>
        </nav>
        <nav className="reference-footer-column" aria-label="Quick links"><h2>Quick Links</h2>
          {content?.quicklink_whatsapp_url
            ? <a href={content.quicklink_whatsapp_url} target="_blank" rel="noopener noreferrer">{content?.quicklink_whatsapp_label || 'Call On WhatsApp'}</a>
            : <button type="button" disabled title="WhatsApp contact coming soon">{content?.quicklink_whatsapp_label || 'Call On WhatsApp'}</button>}
          {content?.quicklink_virtual_office
            ? <a href={content.quicklink_virtual_office} target="_blank" rel="noopener noreferrer">Visit Our Virtual Office</a>
            : <button type="button" disabled title="Virtual office link coming soon">Visit Our Virtual Office</button>}
          <a href="#contact">Book An Appointment</a>
          <a href="#contact" onClick={() => onSelectInterest('not-sure')}>Free Online Assessment</a>
          <a href="#about">Impartial Advice Policy</a>
        </nav>
      </div>
      <div className="reference-footer-bottom">
        <p>© {new Date().getFullYear()} The Migration Firm International. All rights reserved. Operating with strict confidentiality and international compliance.</p>
        <nav aria-label="Legal information">
          {content?.quicklink_privacy_url
            ? <a href={content.quicklink_privacy_url} target="_blank" rel="noopener noreferrer">Privacy Policy</a>
            : <button type="button" disabled title="Privacy policy coming soon">Privacy Policy</button>}
          {content?.quicklink_terms_url
            ? <a href={content.quicklink_terms_url} target="_blank" rel="noopener noreferrer">Terms of Service</a>
            : <button type="button" disabled title="Terms coming soon">Terms of Service</button>}
          {content?.quicklink_disclaimer_url
            ? <a href={content.quicklink_disclaimer_url} target="_blank" rel="noopener noreferrer">Disclaimer</a>
            : <button type="button" disabled title="Disclaimer coming soon">Disclaimer</button>}
        </nav>
      </div>
    </div>
  </footer>;
}
