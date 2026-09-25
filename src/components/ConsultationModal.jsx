import { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Loader2, Compass } from 'lucide-react';

const API_URL = '';

const PROGRAMS = [
  { value: 'canada-pr', label: 'Canada — Express Entry & Provincial Nominee Programs (PNP)' },
  { value: 'australia-pr', label: 'Australia — General Skilled Migration (189/190/491)' },
  { value: 'uk-entrepreneur', label: 'United Kingdom — Entrepreneur & Innovator Visas' },
  { value: 'denmark-visa', label: 'Denmark — Positive List & Residence' },
  { value: 'work-visa', label: 'Skilled Work Visas & Employer Sponsorship' },
  { value: 'investor-visa', label: 'Investor & High-Net-Worth Visas' },
  { value: 'student-visa', label: 'Study Permits & Student Visas' },
  { value: 'visitor-visa', label: 'Visit & Tourist Visas' },
  { value: 'attestation', label: 'Document Attestation & Legalization' },
  { value: 'not-sure', label: 'General / Not Sure Yet (Free Assessment)' },
];

export default function ConsultationModal({ isOpen, onClose, defaultInterest = '' }) {
  const [interest, setInterest] = useState(defaultInterest || 'canada-pr');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ text: '', type: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const modalRef = useRef(null);
  const firstInputRef = useRef(null);

  // Sync defaultInterest if passed
  useEffect(() => {
    if (defaultInterest) {
      setInterest(defaultInterest);
    }
  }, [defaultInterest]);

  // Lock scroll and handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    // Focus initial element
    const timer = setTimeout(() => {
      if (firstInputRef.current) {
        firstInputRef.current.focus();
      }
    }, 100);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (name.trim().length < 2) errs.name = 'Please enter your full name (at least 2 characters).';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errs.email = 'Please enter a valid email address.';
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 7 || digits.length > 15) errs.phone = 'Please enter a valid phone number (7-15 digits).';
    if (!interest) errs.interest = 'Please select your destination program of interest.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setStatus({ text: 'Please correct the highlighted fields.', type: 'error' });
      return;
    }

    setSubmitting(true);
    setStatus({ text: '', type: '' });

    const fullMessage = notes.trim()
      ? `[Consultation Request]\n\nNotes from client:\n${notes.trim()}`
      : '[Consultation Request]';

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          interest,
          message: fullMessage,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus({
          text: data.errors
            ? Object.values(data.errors).join(' ')
            : data.message || 'Unable to book consultation. Please check your information.',
          type: 'error',
        });
        return;
      }

      setSuccess(true);
    } catch {
      setStatus({
        text: 'Unable to reach the consultation booking server. Please try calling our office directly.',
        type: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleResetAndClose = () => {
    setSuccess(false);
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setErrors({});
    setStatus({ text: '', type: '' });
    onClose();
  };

  return (
    <div
      className="consultation-modal-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
    >
      <div className="consultation-modal-card" ref={modalRef}>
        {/* Close Button */}
        <button
          type="button"
          className="consultation-modal-close"
          onClick={handleResetAndClose}
          aria-label="Close consultation modal"
          id="close-consultation-modal-btn"
        >
          <X size={20} />
        </button>

        {success ? (
          <div className="consultation-modal-success">
            <div className="success-icon-wrap">
              <CheckCircle2 size={56} className="success-check-icon" />
            </div>
            <span className="eyebrow" style={{ justifyContent: 'center', marginBottom: '8px' }}>
              CONSULTATION CONFIRMED
            </span>
            <h2 id="consultation-modal-title">You're All Set, {name.split(' ')[0]}!</h2>
            <p className="success-message">
              Thank you for scheduling your consultation. Our senior immigration advisor has received your details and will contact you via <strong>{email}</strong> or WhatsApp within <strong>1 business day</strong> to confirm your exact appointment link.
            </p>

            <div className="success-summary-box">
              <div className="summary-row">
                <span>Program:</span>
                <strong>{PROGRAMS.find((p) => p.value === interest)?.label.split('—')[0] || interest}</strong>
              </div>

              <div className="summary-row">
                <span>Client Contact:</span>
                <strong>{phone}</strong>
              </div>
            </div>

            <button
              type="button"
              className="button gold"
              style={{ width: '100%', marginTop: '24px' }}
              onClick={handleResetAndClose}
              id="consultation-success-done-btn"
            >
              Done &amp; Return to Site
            </button>
          </div>
        ) : (
          <>
            {/* Modal Header */}
            <div className="consultation-modal-header">
              <div className="eyebrow light-eyebrow">
                <Compass size={14} />
                <span>COMPLIMENTARY IMMIGRATION ASSESSMENT</span>
              </div>
              <h2 id="consultation-modal-title">Book a Consultation</h2>
              <p>
                Connect 1-on-1 with our licensed immigration specialists. Review your eligibility, timeline, and personalized pathway.
              </p>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSubmit} noValidate className="consultation-modal-form">


              {/* Personal Details */}
              <div className="modal-row-split">
                <div className={`modal-field-group ${errors.name ? 'has-error' : ''}`}>
                  <label className="modal-field-label" htmlFor="modal-name">
                    Full Name *
                  </label>
                  <input
                    ref={firstInputRef}
                    id="modal-name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. David Silva"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
                    }}
                    className="modal-input"
                  />
                  {errors.name && <span className="modal-field-error">{errors.name}</span>}
                </div>

                <div className={`modal-field-group ${errors.email ? 'has-error' : ''}`}>
                  <label className="modal-field-label" htmlFor="modal-email">
                    Email Address *
                  </label>
                  <input
                    id="modal-email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                    }}
                    className="modal-input"
                  />
                  {errors.email && <span className="modal-field-error">{errors.email}</span>}
                </div>
              </div>

              <div className="modal-row-split">
                <div className={`modal-field-group ${errors.phone ? 'has-error' : ''}`}>
                  <label className="modal-field-label" htmlFor="modal-phone">
                    Phone / WhatsApp *
                  </label>
                  <input
                    id="modal-phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+94 77 123 4567"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: null }));
                    }}
                    className="modal-input"
                  />
                  {errors.phone && <span className="modal-field-error">{errors.phone}</span>}
                </div>

                <div className={`modal-field-group ${errors.interest ? 'has-error' : ''}`}>
                  <label className="modal-field-label" htmlFor="modal-interest">
                    Target Destination / Visa *
                  </label>
                  <select
                    id="modal-interest"
                    name="interest"
                    required
                    value={interest}
                    onChange={(e) => {
                      setInterest(e.target.value);
                      if (errors.interest) setErrors((prev) => ({ ...prev, interest: null }));
                    }}
                    className="modal-select"
                  >
                    {PROGRAMS.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                  {errors.interest && <span className="modal-field-error">{errors.interest}</span>}
                </div>
              </div>

              {/* Message / Background Notes */}
              <div className="modal-field-group">
                <label className="modal-field-label" htmlFor="modal-notes">
                  Additional Notes or Questions <span style={{ opacity: 0.6, fontWeight: 400 }}>(Optional)</span>
                </label>
                <textarea
                  id="modal-notes"
                  name="notes"
                  rows={2}
                  placeholder="Share details such as your current profession, qualifications, or family relocation plans…"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="modal-textarea"
                />
              </div>

              {/* Status Message */}
              {status.text && (
                <div className={`modal-status-banner ${status.type === 'error' ? 'error' : 'success'}`}>
                  {status.text}
                </div>
              )}

              {/* Submit CTA */}
              <div className="modal-action-row">
                <button
                  type="submit"
                  disabled={submitting}
                  className="button gold modal-submit-btn"
                  id="submit-consultation-btn"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="spinner" />
                      <span>Securing Your Consultation…</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm &amp; Book Consultation</span>
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </div>

              {/* Security reassurance badge */}
              <div className="modal-reassurance-footer">
                <ShieldCheck size={15} />
                <span>100% Confidential · Free Initial Evaluation · No Obligation</span>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
