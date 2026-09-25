import { Editable } from '../Editable';
import { useState, useRef, useEffect } from 'react';
import { ShieldCheck, Compass, MessageCircle, LockKeyhole, ArrowUpRight } from 'lucide-react';

// Same-origin API through the development or production reverse proxy.
const API_URL = '';

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function isValidPhone(v) {
  return v.replace(/\D/g, '').length >= 7;
}

export default function ContactForm({ selectedInterest }) {
  
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ text: '', type: '' });
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (selectedInterest && formRef.current) {
      formRef.current.elements.interest.value = selectedInterest.value;
      setErrors((previous) => { const next = { ...previous }; delete next.interest; return next; });
    }
  }, [selectedInterest]);

  const clearError = (field) => {
    setErrors((prev) => {
      const n = { ...prev };
      delete n[field];
      return n;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const phone = form.elements.phone.value.trim();
    const interest = form.elements.interest.value;
    const message = form.elements.message.value.trim();

    const newErrors = {};
    if (name.length < 2) newErrors.name = true;
    if (!isValidEmail(email)) newErrors.email = true;
    if (!isValidPhone(phone)) newErrors.phone = true;
    if (!interest) newErrors.interest = true;
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setStatus({ text: 'Please complete the highlighted required fields.', type: 'error' });
      return;
    }

    setSubmitting(true);
    setStatus({ text: '', type: '' });

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, interest, message }),
      });
      const data = await res.json();

      if (!res.ok) {
        const serverErrors = {};
        Object.keys(data.errors || {}).forEach((f) => {
          serverErrors[f] = true;
        });
        setErrors(serverErrors);
        setStatus({ text: res.status === 429 ? 'Too many requests. Please wait and retry.' : 'Please check the highlighted fields and retry.', type: 'error' });
        return;
      }

      setStatus({ text: data.message, type: 'success' });
      form.reset();
    } catch {
      setStatus({ text: 'Unable to connect to the evaluation server. Please contact us via phone or WhatsApp.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const fc = (f) => `form-row${errors[f] ? ' has-error' : ''}`;

  return (
    <section className="section section-cream" id="contact">
      <div className="wrap contact-grid">
        <div className="contact-intro">
          <span className="eyebrow">04 / YOUR NEXT CHAPTER STARTS HERE</span>
          <h2><Editable name="contact_title"/><br /><em><Editable name="contact_emphasis"/></em></h2>
          <p><Editable name="contact_intro"/></p>
          <div className="contact-checks">
            <div className="check-item"><Compass size={21}/><div><strong>Advice, made personal</strong><p>Your circumstances. Your goals. Your pathway.</p></div></div>
            <div className="check-item"><ShieldCheck size={21}/><div><strong>A confidential conversation</strong><p>Share your plans directly with our team.</p></div></div>
            <div className="check-item"><MessageCircle size={21}/><div><strong>No obligation to proceed</strong><p>Start with clarity, before making a commitment.</p></div></div>
          </div>
          <p className="contact-note">A world of possibility. A team in your corner.</p>
        </div>

        <form className="contact-form-card" id="contactForm" ref={formRef} noValidate onSubmit={handleSubmit}>
          <div className="form-card-head">
            <h3><Editable name="contact_form_title"/></h3>
            <p>A few details to begin a meaningful conversation.</p>
          </div>

          <div className={fc('name')}>
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              name="name" maxLength={100}
              required
              autoComplete="name"
              placeholder="e.g. David Silva"
              onInput={() => clearError('name')}
            />
            <span id="name-error" className="field-error">Please enter your full name.</span>
          </div>

          <div className="form-row form-row--split">
            <div className={fc('email')}>
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
                name="email" maxLength={254}
                required
                autoComplete="email"
                placeholder="name@example.com"
                onInput={() => clearError('email')}
              />
              <span id="email-error" className="field-error">Enter a valid email address.</span>
            </div>

            <div className={fc('phone')}>
              <label htmlFor="phone">Phone / WhatsApp *</label>
              <input
                type="tel"
                id="phone"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
                name="phone" maxLength={32}
                required
                autoComplete="tel"
                placeholder="+94 77 123 4567"
                onInput={() => clearError('phone')}
              />
              <span id="phone-error" className="field-error">Enter a valid phone number.</span>
            </div>
          </div>

          <div className={fc('interest')}>
            <label htmlFor="interest">Visa &amp; Destination Interest *</label>
            <select
              id="interest"
              aria-invalid={Boolean(errors.interest)}
              aria-describedby={errors.interest ? "interest-error" : undefined}
              name="interest"
              required
              defaultValue=""
              onInput={() => clearError('interest')}
            >
              <option value="" disabled>Select visa program of interest</option>
              <option value="australia-pr">Australia — General Skilled Migration (189/190/491)</option>
              <option value="canada-pr">Canada — Express Entry &amp; Provincial Nominee Programs (PNP)</option>
              <option value="denmark-visa">Denmark — Positive List, Fast Track &amp; Residence</option>
              <option value="uk-entrepreneur">United Kingdom — Entrepreneur &amp; Innovator Visas</option>
              <option value="work-visa">Skilled Work Visas &amp; Employer Sponsorship</option>
              <option value="investor-visa">Investor &amp; High-Net-Worth Visas</option>
              <option value="student-visa">Study Permits &amp; International Student Visas</option>
              <option value="visitor-visa">Visit &amp; Tourist Visas</option>
              <option value="attestation">Document Attestation &amp; Certified Translations</option>
              <option value="not-sure">Not Sure — Need Comprehensive Free Assessment</option>
            </select>
            <span id="interest-error" className="field-error">Please select an immigration pathway.</span>
          </div>

          <div className="form-row">
            <label htmlFor="message">
              Profile Overview &amp; Background <span className="optional">(Optional)</span>
            </label>
            <textarea
              id="message"
              name="message" maxLength={4000}
              rows="3"
              placeholder="Occupation, highest academic degree, years of work experience, IELTS / PTE band (if taken), family members travelling…"
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={submitting}>
            {submitting ? 'Submitting Assessment Request…' : <>Request my assessment <ArrowUpRight size={16}/></>}
          </button>

          <p className="form-security-note">
            <LockKeyhole size={12}/> Your details are used to respond to your assessment request.
          </p>

          <p className={`form-status${status.type ? ` ${status.type}` : ''}`} id="formStatus" role="status" aria-live="polite">
            {status.text}
          </p>
        </form>
      </div>
    </section>
  );
}
