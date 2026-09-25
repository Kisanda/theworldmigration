import { useState, useEffect, useRef } from 'react';
import { Star, MessageSquare, ArrowUpRight } from 'lucide-react';

// Same-origin API through the development or production reverse proxy.
const API_URL = '';

function Stars({ value, interactive = false, onSelect }) {
  const [hovered, setHovered] = useState(0);
  const display = interactive ? (hovered || value) : value;
  return (
    <span className="stars" aria-label={`${display} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={interactive ? 28 : 16}
          strokeWidth={1.4}
          className={n <= display ? 'star-filled' : 'star-empty'}
          style={interactive ? { cursor: 'pointer' } : {}}
          onMouseEnter={interactive ? () => setHovered(n) : undefined}
          onMouseLeave={interactive ? () => setHovered(0) : undefined}
          onClick={interactive ? () => onSelect(n) : undefined}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

function ReviewCard({ review }) {
  const date = new Date(review.created_at).toLocaleDateString('en-GB', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  return (
    <article className="review-card">
      <div className="review-card-top">
        <Stars value={review.rating} />
        <time className="review-date" dateTime={review.created_at}>{date}</time>
      </div>
      <p className="review-body">"{review.body}"</p>
      <span className="review-author">— {review.name}</span>
    </article>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [rating, setRating] = useState(5);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ text: '', type: '' });
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef(null);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_URL}/api/reviews?limit=3`);
      const data = await res.json();
      if (!res.ok) throw new Error('Unable to load reviews.');
      setLoadError('');
      setReviews(data.reviews.slice(0, 3));
    } catch {
      setLoadError('Unable to load reviews. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react/set-state-in-effect -- State updates follow an asynchronous API request.
  useEffect(() => { fetchReviews(); }, []);

  const clearError = (field) =>
    setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const name = form.elements.reviewName.value.trim();
    const body = form.elements.reviewBody.value.trim();

    const newErrors = {};
    if (name.length < 2) newErrors.name = true;
    if (rating < 1) newErrors.rating = true;
    if (body.length < 10) newErrors.body = true;
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setStatus({ text: 'Please complete all required fields.', type: 'error' });
      return;
    }

    setSubmitting(true);
    setStatus({ text: '', type: '' });

    try {
      const res = await fetch(`${API_URL}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, rating, body }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ text: res.status === 429 ? 'Too many requests. Please wait and retry.' : 'Please check your input and try again.', type: 'error' });
        return;
      }
      setStatus({ text: data.message, type: 'success' });
      form.reset();
      setRating(5);
      fetchReviews();
    } catch {
      setStatus({ text: 'Unable to submit your review right now. Please try again later.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const avg = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <section className="section reviews-section" id="reviews">
      <div className="wrap reviews-grid">

        {/* ── Left: listing ── */}
        <div className="reviews-listing">
          <span className="eyebrow">CLIENT EXPERIENCES</span>
          <h2>Your journey.<br /><em>Your words.</em></h2>
          <p className="reviews-intro">
            Share your experience with The World Migration and<br />
            help others take their next step with confidence.
          </p>

          {/* summary bar */}
          <div className="reviews-summary">
            <Star size={18} className="star-filled" strokeWidth={1.4} />
            <span className="reviews-avg" title="Average of displayed reviews">{avg ?? '—'}</span>
            <span className="reviews-divider" />
            <span className="reviews-count">
              {loading ? 'Loading…' : reviews.length === 0 ? 'No reviews yet' : `${reviews.length} latest review${reviews.length !== 1 ? 's' : ''}`}
            </span>
          </div>

          <hr className="reviews-rule" />

          {/* cards or empty state */}
          {!loading && reviews.length === 0 && (
            <div className="reviews-empty">
              <MessageSquare size={38} strokeWidth={1} />
              <strong>Be the first to share your story.</strong>
              <span>Your honest experience can help someone begin their own <em>journey</em>.</span>
            </div>
          )}

          {loadError && <p role="alert">{loadError} <button onClick={() => { setLoading(true); fetchReviews(); }}>Retry</button></p>}
          <div className="reviews-list">
            {reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
          </div>
        </div>

        {/* ── Right: form ── */}
        <div className="reviews-form-wrap">
          <form className="reviews-form" ref={formRef} noValidate onSubmit={handleSubmit}>
            <div className="reviews-form-head">
              <h3>Add your review</h3>
              <p>Tell us about your experience.</p>
            </div>

            <div className={`form-row${errors.rating ? ' has-error' : ''}`}>
              <label>Your rating *</label>
              <Stars value={rating} interactive onSelect={(n) => { setRating(n); clearError('rating'); }} />
              {errors.rating && <span className="field-error">Please select a star rating.</span>}
            </div>

            <div className={`form-row${errors.name ? ' has-error' : ''}`}>
              <label htmlFor="reviewName">Your name *</label>
              <input
                type="text"
                id="reviewName"
                name="reviewName" maxLength={100}
                placeholder="Your public display name"
                autoComplete="name"
                onInput={() => clearError('name')}
              />
              {errors.name && <span className="field-error">Please enter your name.</span>}
            </div>

            <div className={`form-row${errors.body ? ' has-error' : ''}`}>
              <label htmlFor="reviewBody">Your review *</label>
              <textarea
                id="reviewBody"
                name="reviewBody" maxLength={4000}
                rows="4"
                placeholder="What was your experience like?"
                onInput={() => clearError('body')}
              />
              {errors.body && <span className="field-error">Please write at least 10 characters.</span>}
            </div>

            <p className="reviews-privacy">
              Your name, rating, and review will be displayed publicly.{' '}
              <span>Please do not include private application details.</span>
            </p>

            <button type="submit" className="btn-primary reviews-submit" disabled={submitting}>
              {submitting ? 'Submitting…' : <><span>Submit review</span> <ArrowUpRight size={15} /></>}
            </button>

            {status.text && (
              <p className={`form-status ${status.type}`} role="status" aria-live="polite">
                {status.text}
              </p>
            )}
          </form>
        </div>

      </div>
    </section>
  );
}
