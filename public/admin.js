
  let allData      = [];   // submissions
  let allReviews   = [];   // reviews
  let adminKey     = '';
  let loginTimer;
  let loginGeneration = 0;
  const pages = { submissions: { cursor: null, history: [], next: null }, reviews: { cursor: null, history: [], next: null } };

  // ── LOGIN ──
  document.getElementById('apiKeyInput').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });

  async function doLogin() {
    const key = document.getElementById('apiKeyInput').value.trim();
    if (!key) return;
    const err = document.getElementById('loginError');
    err.style.display = 'none';
    try {
      const res = await fetch('/api/submissions', { headers: { 'X-Admin-Key': key } });
      if (!res.ok) { err.textContent = res.status === 429 ? 'Too many attempts. Please wait and retry.' : 'Sign-in failed. Check your key and try again.'; err.style.display = 'block'; return; }
      const data = await res.json();
      adminKey = key;
      loginGeneration++;
      document.getElementById('apiKeyInput').value = '';
      clearTimeout(loginTimer);
      loginTimer = setTimeout(doLogout, 30 * 60 * 1000);
      pages.submissions.next = data.next_cursor;
      updatePager('submissions');
      allData  = data.submissions || [];
      showDashboard();
    } catch {
      err.textContent = 'Cannot connect to backend. Make sure the server is running.';
      err.style.display = 'block';
    }
  }

  async function showDashboard() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    updateStats();
    renderSubmissions();
    await loadReviews();
    loadSiteLinks();
    if (location.hash === '#editor') location.assign('/edit');
  }

  function switchTab(tab) {
    document.getElementById('tabSubmissions').classList.toggle('active', tab === 'submissions');
    document.getElementById('tabReviews').classList.toggle('active', tab === 'reviews');
    document.getElementById('tabSiteLinks').classList.toggle('active', tab === 'siteLinks');
    document.getElementById('navSubmissions').classList.toggle('active', tab === 'submissions');
    document.getElementById('navReviews').classList.toggle('active', tab === 'reviews');
    document.getElementById('navSiteLinks').classList.toggle('active', tab === 'siteLinks');
    if (tab === 'siteLinks') loadSiteLinks();
  }

  // ── SUBMISSIONS ──
  async function loadSubmissions() {
    try {
      const res = await adminFetch(pageUrl('/api/submissions', 'submissions'));
      const data = await res.json();
      allData = data.submissions || [];
      pages.submissions.next = data.next_cursor;
      updatePager('submissions');
      updateStats();
      renderSubmissions();
      showToast('Submissions refreshed', 'success');
    } catch { showToast('Failed to refresh submissions', 'error'); }
  }

  function doLogout() {
    adminKey = ''; allData = []; allReviews = [];
    loginGeneration++;
    clearTimeout(loginTimer);
    for (const value of Object.values(pages)) { value.cursor = null; value.next = null; value.history = []; }
    document.getElementById('tableWrap').replaceChildren();
    document.getElementById('reviewsWrap').replaceChildren();
    document.getElementById('modalBody').replaceChildren();
    document.getElementById('modalName').textContent = 'Detail';
    closeModalDirect();

    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('apiKeyInput').value = '';
  }

  function updateStats() {
    document.getElementById('statTotal').textContent     = allData.length;
    document.getElementById('statCanada').textContent    = allData.filter(r => r.interest === 'canada-pr').length;
    document.getElementById('statAustralia').textContent = allData.filter(r => r.interest === 'australia-pr').length;
    document.getElementById('statNotSure').textContent   = allData.filter(r => r.interest === 'not-sure').length;
  }

  const LABELS = {
    'canada-pr':    ['Canada PR', 'badge-canada'],
    'australia-pr': ['Australia PR', 'badge-australia'],
    'pnp-state':    ['Provincial / State', 'badge-pnp'],
    'not-sure':     ['Not Sure', 'badge-notsure'],
    'visitor-visa': ['Visitor Visa', 'badge-notsure'],
    'student-visa': ['Student Visa', 'badge-notsure'],
  };

  function renderSubmissions() {
    const q      = (document.getElementById('searchInput').value || '').toLowerCase();
    const filter = document.getElementById('filterSelect').value;
    const rows   = allData.filter(r => {
      const matchQ = !q || r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q) || (r.phone||'').includes(q);
      const matchF = !filter || r.interest === filter;
      return matchQ && matchF;
    });
    const wrap = document.getElementById('tableWrap');
    if (!rows.length) { wrap.innerHTML = `<div class="table-empty"><div class="icon">📭</div><p>No submissions found.</p></div>`; return; }
    wrap.innerHTML = `
      <table><thead><tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Pathway</th><th>Message</th><th>Date</th><th></th></tr></thead>
      <tbody>${rows.map((r, index) => {
        const [label, cls] = LABELS[r.interest] || [r.interest, 'badge-notsure'];
        const date = fmt(r.created_at);
        return `<tr>
          <td style="color:var(--muted);font-size:0.8rem">${pages.submissions.history.length * 50 + index + 1}</td>
          <td><div class="td-name">${esc(r.name)}</div></td>
          <td><div class="td-email">${esc(r.email)}</div></td>
          <td><div class="td-phone">${esc(r.phone)}</div></td>
          <td><span class="badge ${cls}">${esc(label)}</span></td>
          <td><div class="td-msg">${r.message ? esc(r.message) : '<span style="color:var(--subtle)">—</span>'}</div></td>
          <td><div class="td-date">${date}</div></td>
          <td><button class="btn-action btn-view" data-click="action14" data-id="${r.id}">👁 View</button></td>
        </tr>`;
      }).join('')}</tbody></table>`;
  }

  function openSubmissionModal(id) {
    const r = allData.find(x => x.id === id);
    if (!r) return;
    const [label] = LABELS[r.interest] || [r.interest, ''];
    document.getElementById('modalName').textContent = r.name + ' — Lead Details';
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-field"><label>Full Name</label><div class="val">${esc(r.name)}</div></div>
      <div class="modal-field"><label>Email</label><div class="val">${esc(r.email)}</div></div>
      <div class="modal-field"><label>Phone / WhatsApp</label><div class="val">${esc(r.phone)}</div></div>
      <div class="modal-field"><label>PR Pathway</label><div class="val">${esc(label)}</div></div>
      <div class="modal-field"><label>Profile Overview</label><div class="val msg">${r.message ? esc(r.message) : 'No message provided.'}</div></div>
      <div class="modal-field"><label>Submitted At</label><div class="val">${fmt(r.created_at)}</div></div>
      <div class="modal-footer">
        <button class="modal-btn modal-btn-close" data-click="action15">Close</button>
      </div>`;
    document.getElementById('modalOverlay').classList.add('open');
  }

  // ── REVIEWS ──
  async function loadReviews() {
    try {
      const res = await adminFetch(pageUrl('/api/admin/reviews', 'reviews'));
      const data = await res.json();
      allReviews = data.reviews || [];
      pages.reviews.next = data.next_cursor;
      updatePager('reviews');
      updateReviewStats();
      renderReviews();
    } catch { showToast('Could not load reviews. Please retry.', 'error'); }
  }

  function updateReviewStats() {
    const approved = allReviews.filter(r => r.approved);
    const hidden   = allReviews.filter(r => !r.approved);
    const avg      = approved.length ? (approved.reduce((s, r) => s + r.rating, 0) / approved.length).toFixed(1) : '—';
    document.getElementById('rStatTotal').textContent     = allReviews.length;
    document.getElementById('rStatPublished').textContent = approved.length;
    document.getElementById('rStatHidden').textContent    = hidden.length;
    document.getElementById('rStatAvg').textContent       = avg;

    // pending badge on sidebar
    const badge = document.getElementById('pendingBadge');
    if (hidden.length > 0) {
      badge.textContent = hidden.length;
      badge.style.display = 'inline';
    } else {
      badge.style.display = 'none';
    }

    // Publish All button in reviews header
    const pubAllBtn = document.getElementById('publishAllBtn');
    const pendingCount = document.getElementById('pendingCount');
    if (pubAllBtn && pendingCount) {
      if (hidden.length > 0) {
        pendingCount.textContent = hidden.length;
        pubAllBtn.style.display = 'inline-flex';
      } else {
        pubAllBtn.style.display = 'none';
      }
    }
  }

  function renderReviews() {
    const q      = (document.getElementById('reviewSearch').value || '').toLowerCase();
    const filter = document.getElementById('reviewFilter').value;
    const rows   = allReviews.filter(r => {
      const matchQ = !q || r.name.toLowerCase().includes(q) || r.body.toLowerCase().includes(q);
      const matchF = !filter || (filter === 'approved' ? r.approved : !r.approved);
      return matchQ && matchF;
    });
    const wrap = document.getElementById('reviewsWrap');
    if (!rows.length) {
      wrap.innerHTML = `<div class="table-empty"><div class="icon">💬</div><p>No reviews found.</p></div>`;
      return;
    }
    wrap.innerHTML = `
      <table><thead><tr><th>#</th><th>Name</th><th>Rating</th><th>Review</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
      <tbody>${rows.map((r, index) => {
        const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
        const isPub = Boolean(r.approved);
        const statusBadge = isPub
          ? `<span class="badge badge-approved">✓ Published</span>`
          : `<span class="badge badge-hidden">⏳ Pending</span>`;

        const actionPublishBtn = isPub
          ? `<button class="btn-action btn-unpublish" title="Hide this review from the public website" data-click="action16" data-id="${r.id}">✕ Unpublish</button>`
          : `<button class="btn-action btn-publish" title="Publish review to live website" data-click="action17" data-id="${r.id}">✓ Publish</button>`;

        return `<tr>
          <td style="color:var(--muted);font-size:0.8rem">${pages.reviews.history.length * 50 + index + 1}</td>
          <td><div class="td-name">${esc(r.name)}</div></td>
          <td><span class="stars-display" title="${r.rating} of 5 stars">${stars}</span></td>
          <td><div class="td-msg" title="${esc(r.body)}">${esc(r.body)}</div></td>
          <td>${statusBadge}</td>
          <td><div class="td-date">${fmt(r.created_at)}</div></td>
          <td><div class="action-group">
            <button class="btn-action btn-view" title="View details" data-click="action18" data-id="${r.id}">👁 View</button>
            ${actionPublishBtn}
            <button class="btn-action btn-delete" title="Permanently delete review" data-click="action19" data-id="${r.id}">🗑 Delete</button>
          </div></td>
        </tr>`;
      }).join('')}</tbody></table>`;
  }

  async function publishReview(id) {
    try {
      const res = await adminFetch(`/api/admin/reviews/${id}/publish`, {
        method: 'POST',
        headers: { 'X-Admin-Key': adminKey }
      });
      const data = await res.json();
      if (data.ok) {
        const r = allReviews.find(x => x.id === id);
        if (r) r.approved = 1;
        updateReviewStats();
        renderReviews();
        showToast('✓ Review published live to website!', 'success');
      } else {
        showToast(data.error || 'Failed to publish review.', 'error');
      }
    } catch {
      showToast('Network error while publishing review.', 'error');
    }
  }

  async function unpublishReview(id) {
    try {
      const res = await adminFetch(`/api/admin/reviews/${id}/unpublish`, {
        method: 'POST',
        headers: { 'X-Admin-Key': adminKey }
      });
      const data = await res.json();
      if (data.ok) {
        const r = allReviews.find(x => x.id === id);
        if (r) r.approved = 0;
        updateReviewStats();
        renderReviews();
        showToast('Review unpublished (hidden from website)', 'success');
      } else {
        showToast(data.error || 'Failed to unpublish review.', 'error');
      }
    } catch {
      showToast('Network error while unpublishing review.', 'error');
    }
  }

  async function deleteReview(id) {
    if (!confirm(`Are you sure you want to permanently delete Review #${id}? This action cannot be undone.`)) return;
    try {
      let res = await adminFetch(`/api/admin/reviews/${id}`, {
        method: 'DELETE',
        headers: { 'X-Admin-Key': adminKey }
      });
      if (!res.ok) {
        // Fallback to POST delete if DELETE method had issues
        res = await adminFetch(`/api/admin/reviews/${id}/delete`, {
          method: 'POST',
          headers: { 'X-Admin-Key': adminKey }
        });
      }
      const data = await res.json();
      if (data.ok) {
        allReviews = allReviews.filter(r => r.id !== id);
        updateReviewStats();
        renderReviews();
        showToast('🗑 Review permanently deleted.', 'success');
      } else {
        showToast(data.error || 'Delete failed.', 'error');
      }
    } catch {
      showToast('Delete failed. Please check network connection.', 'error');
    }
  }

  async function publishAllPending() {
    const pending = allReviews.filter(r => !r.approved);
    if (!pending.length) {
      showToast('No pending reviews to publish.', 'info');
      return;
    }
    if (!confirm(`Publish all ${pending.length} pending review(s) on this page to the live website?`)) return;
    let publishedCount = 0;
    for (const r of pending) {
      try {
        const res = await adminFetch(`/api/admin/reviews/${r.id}/publish`, {
          method: 'POST',
          headers: { 'X-Admin-Key': adminKey }
        });
        const data = await res.json();
        if (data.ok) {
          r.approved = 1;
          publishedCount++;
        }
      } catch (err) {
        console.error(err);
      }
    }
    updateReviewStats();
    renderReviews();
    showToast(`✓ Published ${publishedCount} review(s) successfully!`, 'success');
  }

  function openReviewModal(id) {
    const r = allReviews.find(x => x.id === id);
    if (!r) return;
    const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
    const isPub = Boolean(r.approved);
    document.getElementById('modalName').textContent = `${r.name} — Review #${r.id}`;
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-field"><label>Reviewer Name</label><div class="val">${esc(r.name)}</div></div>
      <div class="modal-field"><label>Rating</label><div class="val" style="color:var(--amber);letter-spacing:2px;font-size:1.1rem">${stars} <span style="font-size:0.85rem;color:var(--muted);letter-spacing:normal">(${r.rating} / 5)</span></div></div>
      <div class="modal-field"><label>Review Content</label><div class="val msg">${esc(r.body)}</div></div>
      <div class="modal-field"><label>Website Status</label><div class="val">${isPub ? '<span style="color:var(--green);font-weight:600">✓ Live &amp; Published on website</span>' : '<span style="color:var(--amber);font-weight:600">⏳ Pending Approval (Hidden from public)</span>'}</div></div>
      <div class="modal-field"><label>Submitted Date</label><div class="val">${fmt(r.created_at)}</div></div>
      <div class="modal-footer">
        ${isPub
          ? `<button class="modal-btn modal-btn-unpublish" data-click="action20" data-id="${r.id}">✕ Unpublish</button>`
          : `<button class="modal-btn modal-btn-publish" data-click="action21" data-id="${r.id}">✓ Publish to Website</button>`
        }
        <button class="modal-btn modal-btn-delete" data-click="action22" data-id="${r.id}">🗑 Delete Review</button>
        <button class="modal-btn modal-btn-close" data-click="action23">Close</button>
      </div>`;
    document.getElementById('modalOverlay').classList.add('open');
  }

  // ── MODAL ──
  function closeModal(e) { if (e.target === document.getElementById('modalOverlay')) closeModalDirect(); }
  function closeModalDirect() { document.getElementById('modalOverlay').classList.remove('open'); }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModalDirect(); });

  // ── TOAST ──
  let toastTimer;
  function showToast(msg, type = '') {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.className = `toast show${type ? ' ' + type : ''}`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.className = 'toast'; }, 3000);
  }

  // ── HELPERS ──
  function fmt(ts) {
    return new Date(ts).toLocaleString('en-GB', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' });
  }
  function esc(s) {
    return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

// ── SITE LINKS ──
const siteLinksRevisions = { social_links: 0, quick_links: 0 };

async function loadSiteLinks() {
  try {
    const res = await adminFetch('/api/admin/content');
    const data = await res.json();
    const sec = data.sections || {};
    siteLinksRevisions.social_links = sec.social_links?.revision ?? 0;
    siteLinksRevisions.quick_links  = sec.quick_links?.revision  ?? 0;

    const soc = sec.social_links?.draft || sec.social_links?.published || {};
    const qlk = sec.quick_links?.draft  || sec.quick_links?.published  || {};

    const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
    setVal('sl_facebook',        soc.social_facebook);
    setVal('sl_linkedin',        soc.social_linkedin);
    setVal('sl_instagram',       soc.social_instagram);
    setVal('sl_youtube',         soc.social_youtube);
    setVal('sl_x',               soc.social_x);
    setVal('sl_whatsapp',        soc.social_whatsapp);

    setVal('ql_whatsapp_label',  qlk.quicklink_whatsapp_label || 'Call On WhatsApp');
    setVal('ql_whatsapp_url',    qlk.quicklink_whatsapp_url);
    setVal('ql_virtual_office',  qlk.quicklink_virtual_office);
    setVal('ql_privacy_url',     qlk.quicklink_privacy_url);
    setVal('ql_terms_url',       qlk.quicklink_terms_url);
    setVal('ql_disclaimer_url',  qlk.quicklink_disclaimer_url);
  } catch { /* silent */ }
}

async function saveSectionLinks(section, values) {
  try {
    const revision = siteLinksRevisions[section] ?? 0;
    const res = await adminFetch(`/api/admin/content/${section}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ revision, values })
    });
    const d = await res.json();
    if (!d.ok) {
      showToast(d.error || (d.errors ? Object.values(d.errors)[0] : 'Save failed.'), 'error');
      return;
    }
    siteLinksRevisions[section] = d.section.revision;
    // Auto-publish so changes take effect immediately on the live website
    const pubRes = await adminFetch(`/api/admin/content/${section}/publish`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ revision: siteLinksRevisions[section] })
    });
    const pd = await pubRes.json();
    if (pd.ok) siteLinksRevisions[section] = pd.section.revision;
    showToast('✓ Links saved and published live!', 'success');
  } catch (err) {
    showToast(err.message || 'Save failed.', 'error');
  }
}

async function saveSocialLinks() {
  const getVal = id => (document.getElementById(id)?.value.trim() || '');
  await saveSectionLinks('social_links', {
    social_facebook:  getVal('sl_facebook'),
    social_linkedin:  getVal('sl_linkedin'),
    social_instagram: getVal('sl_instagram'),
    social_youtube:   getVal('sl_youtube'),
    social_x:         getVal('sl_x'),
    social_whatsapp:  getVal('sl_whatsapp'),
  });
}

async function saveQuickLinks() {
  const getVal = id => (document.getElementById(id)?.value.trim() || '');
  await saveSectionLinks('quick_links', {
    quicklink_whatsapp_label:  getVal('ql_whatsapp_label') || 'Call On WhatsApp',
    quicklink_whatsapp_url:    getVal('ql_whatsapp_url'),
    quicklink_virtual_office:  getVal('ql_virtual_office'),
    quicklink_privacy_url:     getVal('ql_privacy_url'),
    quicklink_terms_url:       getVal('ql_terms_url'),
    quicklink_disclaimer_url:  getVal('ql_disclaimer_url'),
  });
}

const actions = {
  action0: (_el, _e) => { doLogin() },
  action1: (_el, _e) => { switchTab('submissions') },
  action2: (_el, _e) => { switchTab('reviews') },
  action3: (_el, _e) => { window.open('/','_blank','noopener,noreferrer') },
  action4: (_el, _e) => { doLogout() },
  action5: (_el, _e) => { loadSubmissions() },
  action6: (_el, _e) => { renderSubmissions() },
  action7: (_el, _e) => { renderSubmissions() },
  action8: (_el, _e) => { loadReviews() },
  action9: (_el, _e) => { publishAllPending() },
  action10: (_el, _e) => { renderReviews() },
  action11: (_el, _e) => { renderReviews() },
  action12: (_el, e) => { closeModal(e) },
  action13: (_el, _e) => { closeModalDirect() },
  action14: (el, _e) => { openSubmissionModal(Number(el.dataset.id)) },
  action15: (_el, _e) => { closeModalDirect() },
  action16: (el, _e) => { unpublishReview(Number(el.dataset.id)) },
  action17: (el, _e) => { publishReview(Number(el.dataset.id)) },
  action18: (el, _e) => { openReviewModal(Number(el.dataset.id)) },
  action19: (el, _e) => { deleteReview(Number(el.dataset.id)) },
  action20: (el, _e) => { unpublishReview(Number(el.dataset.id)); closeModalDirect(); },
  action21: (el, _e) => { publishReview(Number(el.dataset.id)); closeModalDirect(); },
  action22: (el, _e) => { deleteReview(Number(el.dataset.id)); closeModalDirect(); },
  action23: (_el, _e) => { closeModalDirect() },
  action24: (_el, _e) => { switchTab('siteLinks') },
  action25: (_el, _e) => { saveSocialLinks() },
  action26: (_el, _e) => { saveQuickLinks() },
};

for (const type of ['click', 'input', 'change']) {
  document.addEventListener(type, e => {
    const el = e.target.closest(`[data-${type}]`);
    if (el && Object.hasOwn(actions, el.dataset[type])) actions[el.dataset[type]](el, e);
  });
}

async function adminFetch(url, options = {}) {
  if (!adminKey) throw new Error('Sign in required');
  const generation = loginGeneration;
  const res = await fetch(url, { ...options, cache: 'no-store', credentials: 'omit',
    headers: { ...options.headers, 'X-Admin-Key': adminKey } });
  if (generation !== loginGeneration) throw new Error('Signed out');
  if (res.status === 401) { doLogout(); throw new Error('Sign in required'); }
  if (!res.ok) throw new Error(res.status === 429 ? 'Too many requests' : 'Request failed');
  return res;
}
function pageUrl(url, kind) {
  return url + '?limit=50' + (pages[kind].cursor ? '&before=' + pages[kind].cursor : '');
}
function updatePager(kind) {
  document.getElementById(kind + 'Prev').disabled = !pages[kind].history.length;
  document.getElementById(kind + 'Next').disabled = !pages[kind].next;
}
async function changePage(kind, direction) {
  const page = pages[kind];
  if (direction === 'next' && page.next) { page.history.push(page.cursor); page.cursor = page.next; }
  else if (direction === 'prev' && page.history.length) page.cursor = page.history.pop();
  else return;
  await (kind === 'submissions' ? loadSubmissions() : loadReviews());
}
for (const kind of ['submissions', 'reviews']) {
  document.getElementById(kind + 'Prev').addEventListener('click', () => changePage(kind, 'prev'));
  document.getElementById(kind + 'Next').addEventListener('click', () => changePage(kind, 'next'));
}