// ─── THEME TOGGLE ─────────────────────────────────────
const html     = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('calma-theme') || 'light';
html.setAttribute('data-theme', savedTheme);
function toggleTheme() {
  const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('calma-theme', next);
}
themeBtn.addEventListener('click', toggleTheme);

// ─── CURSOR ───────────────────────────────────────────
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');

document.addEventListener('mousemove', (e) => {
  gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.08, ease: 'none' });
  gsap.to(ring,   { x: e.clientX, y: e.clientY, duration: 0.20, ease: 'power2.out' });
});
document.addEventListener('click', () => {
  gsap.to(cursor, { scale: 2.5, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' });
});
document.querySelectorAll('a, button, .menu-item, .gallery-item, .critica-card').forEach((el) => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('hover');  ring.classList.add('hover'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); ring.classList.remove('hover'); });
});

// ─── NAV SCROLL ───────────────────────────────────────
const navbar = document.getElementById('navbar');
function updateNav() {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();
window.addEventListener('load', () => {
  updateNav();
  if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
});

// ─── GSAP SETUP ───────────────────────────────────────
gsap.registerPlugin(ScrollTrigger);

// ─── SCROLL PROGRESS ──────────────────────────────────
gsap.to('#scrollProgress', {
  scaleX: 1, ease: 'none',
  scrollTrigger: { start: 'top top', end: 'bottom bottom', scrub: 0 },
});

// ─── NAV ENTRANCE ─────────────────────────────────────
gsap.from(navbar, { y: -80, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.1 });
gsap.from('.nav-links a', {
  y: -16, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08, delay: 0.7,
});
gsap.fromTo('.nav-right > *',
  { y: -16, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1, delay: 0.9, clearProps: 'transform' }
);

// ─── HERO PARALLAX ────────────────────────────────────
gsap.to('.hero-bg-img', {
  yPercent: 30, ease: 'none',
  scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
});
gsap.to('.hero-overlay', {
  xPercent: -2, ease: 'none',
  scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
});

// ─── SPLIT TEXT HELPERS ───────────────────────────────
function splitTitle(el) {
  const parts = el.innerHTML.split(/(<em>.*?<\/em>|<br\s*\/?>)/gi);
  el.innerHTML = parts.map((p) => {
    if (/^<br/i.test(p)) return p;
    if (/^<em>/i.test(p)) return `<em>${wrapWords(p.replace(/<\/?em>/gi, ''))}</em>`;
    return wrapWords(p);
  }).join('');
}
function wrapWords(str) {
  return str.split(/(\s+)/).map((tok) => {
    if (/^\s+$/.test(tok) || !tok) return tok;
    return `<span class="split-word"><span class="split-word-inner">${tok}</span></span>`;
  }).join('');
}

// ─── HERO TIMELINE ────────────────────────────────────
(function () {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    splitTitle(heroTitle);
    gsap.set(heroTitle.querySelectorAll('.split-word-inner'), { y: '110%' });
  }
  gsap.set(['.hero-logo', '.hero-tag', '.hero-subtitle', '.hero-actions', '.hero-scroll'], { opacity: 0, y: 24 });
  gsap.set('.hero-logo', { scale: 0.85, y: 16 });

  const tl = gsap.timeline({ delay: 0.25 });
  tl.to('.hero-logo',     { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'back.out(1.8)' })
    .to('.hero-tag',      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
    .to(heroTitle ? heroTitle.querySelectorAll('.split-word-inner') : [],
        { y: 0, duration: 1, ease: 'power3.out', stagger: 0.065 }, '-=0.4')
    .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.65')
    .to('.hero-actions',  { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
    .to('.hero-scroll',   { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.45');
})();

// ─── SECTION TITLES ───────────────────────────────────
document.querySelectorAll('.section-title').forEach((title) => {
  splitTitle(title);
  gsap.from(title.querySelectorAll('.split-word-inner'), {
    y: '110%', duration: 1.05, ease: 'power3.out', stagger: 0.07,
    scrollTrigger: { trigger: title, start: 'top 88%' },
  });
});

// ─── SECTION LABELS ───────────────────────────────────
document.querySelectorAll('.section-label').forEach((el) => {
  gsap.from(el, {
    opacity: 0, x: -32, duration: 0.9, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 88%' },
  });
});

// ─── SOBRE PARAGRAPHS ─────────────────────────────────
gsap.from('#sobre .sobre-text p', {
  y: 28, opacity: 0, duration: 0.85, ease: 'power2.out', stagger: 0.18,
  scrollTrigger: { trigger: '.sobre-text', start: 'top 80%' },
});

// ─── SOBRE PHOTO ──────────────────────────────────────
gsap.fromTo('.sobre-photo',
  { clipPath: 'inset(100% 0 0 0)' },
  { clipPath: 'inset(0% 0 0 0)', duration: 1.3, ease: 'power3.inOut',
    scrollTrigger: { trigger: '.sobre-photo', start: 'top 86%' } }
);
gsap.fromTo('.sobre-img', { scale: 1.18 }, { scale: 1, duration: 1.3, ease: 'power3.inOut',
  scrollTrigger: { trigger: '.sobre-photo', start: 'top 86%' } });

// ─── STAT ─────────────────────────────────────────────
gsap.from('.stat', {
  y: 40, opacity: 0, scale: 0.88, duration: 0.85, ease: 'back.out(1.7)', stagger: 0.1,
  scrollTrigger: { trigger: '.sobre-stats', start: 'top 82%' },
});
gsap.from('.stat-label', {
  opacity: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1, delay: 0.6,
  scrollTrigger: { trigger: '.sobre-stats', start: 'top 82%' },
});

// ─── STAT COUNTERS ────────────────────────────────────
document.querySelectorAll('[data-target]').forEach((el) => {
  const target    = parseFloat(el.dataset.target);
  const suffix    = el.dataset.suffix || '';
  const isDecimal = String(el.dataset.target).includes('.');
  gsap.to({ val: 0 }, {
    val: target, duration: 2.2, ease: 'power2.out',
    onUpdate() {
      el.textContent = (isDecimal
        ? this.targets()[0].val.toFixed(1)
        : Math.round(this.targets()[0].val)) + suffix;
    },
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
  });
});

// ─── MENU HEADER ──────────────────────────────────────
gsap.from('.menu-header > div:first-child', {
  x: -40, opacity: 0, duration: 0.9, ease: 'power3.out',
  scrollTrigger: { trigger: '.menu-header', start: 'top 85%' },
});

const isMobile = window.innerWidth <= 768;

if (!isMobile) {
  // ─── DESKTOP: botões + items ───────────────────────
  gsap.set('.menu-cat', { opacity: 0, scale: 0.75 });
  gsap.fromTo('.menu-cat',
    { opacity: 0, scale: 0.75 },
    { opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(2.2)', stagger: 0.09, clearProps: 'all',
      scrollTrigger: { trigger: '.menu-categories', start: 'top 88%', once: true } }
  );
  gsap.from('.menu-item:not(.menu-hidden)', {
    scale: 0.88, y: 56, opacity: 0, duration: 0.85, ease: 'back.out(1.6)',
    stagger: { amount: 0.4, from: 'start' },
    scrollTrigger: { trigger: '.menu-grid', start: 'top 82%', once: true },
    onComplete() {
      document.querySelectorAll('.menu-item:not(.menu-hidden)').forEach((el) => el.classList.add('bar-in'));
    },
  });
} else {
  // ─── MOBILE: select + items ────────────────────────
  gsap.fromTo('.menu-cat-select',
    { opacity: 0, y: 24, scale: 0.96 },
    { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'back.out(1.8)', clearProps: 'transform',
      scrollTrigger: { trigger: '.menu-categories', start: 'top 88%', once: true } }
  );
  document.querySelectorAll('.menu-item:not(.menu-hidden)').forEach((el, i) => {
    el.classList.add('bar-in', 'mob-card-enter');
    el.style.animationDelay = `${i * 0.1}s`;
    el.addEventListener('animationend', () => {
      el.classList.remove('mob-card-enter');
      el.style.animationDelay = '';
    }, { once: true });
  });
}

document.querySelectorAll('.menu-item').forEach((card) => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card.querySelector('.menu-item-num'),   { scale: 1.08, background: 'var(--c-accent)', color: '#fff', duration: 0.3 });
    gsap.to(card.querySelector('.menu-item-price'), { scale: 1.06, color: 'var(--c-accent2)', duration: 0.3 });
    gsap.to(card, { boxShadow: '0 16px 48px rgba(53,74,16,0.18)', duration: 0.35 });
  });
  card.addEventListener('mousemove', (e) => {
    const r  = card.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
    const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
    gsap.to(card, { rotateY: dx * 6, rotateX: -dy * 6, translateY: -6, duration: 0.4, ease: 'power2.out', transformPerspective: 800 });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { rotateY: 0, rotateX: 0, translateY: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)', boxShadow: 'var(--c-shadow)' });
    gsap.to(card.querySelector('.menu-item-num'),   { scale: 1, background: 'var(--c-apale)', color: 'var(--c-accent)', duration: 0.3 });
    gsap.to(card.querySelector('.menu-item-price'), { scale: 1, color: 'var(--c-accent)', duration: 0.3 });
  });
});

// ─── FOTO STRIP ───────────────────────────────────────
if (!isMobile) {
  gsap.fromTo('.foto-strip-item',
    { clipPath: 'inset(0 100% 0 0)' },
    { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.inOut', stagger: 0.12,
      scrollTrigger: { trigger: '.foto-strip', start: 'top 88%' } }
  );
  document.querySelectorAll('.foto-strip-item img').forEach((img) => {
    gsap.fromTo(img, { scale: 1.18 }, { scale: 1, duration: 0.9, ease: 'power3.inOut',
      scrollTrigger: { trigger: img, start: 'top 88%' } });
  });
} else {
  // ─── MOBILE: foto strip slider ────────────────────
  const fotoStrip  = document.querySelector('.foto-strip');
  const fotoItems  = [...fotoStrip.querySelectorAll('.foto-strip-item')];

  const track = document.createElement('div');
  track.className = 'foto-strip-track';
  fotoItems.forEach(item => track.appendChild(item));
  fotoStrip.appendChild(track);

  const dotsEl = document.createElement('div');
  dotsEl.className = 'foto-strip-dots';
  fotoItems.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'foto-strip-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Foto ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(dot);
  });
  fotoStrip.appendChild(dotsEl);

  let current = 0;
  const dotBtns = () => dotsEl.querySelectorAll('.foto-strip-dot');

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, fotoItems.length - 1));
    track.style.transform = `translateX(-${current * 100}%)`;
    dotBtns().forEach((d, i) => d.classList.toggle('active', i === current));
  }

  let touchStartX = 0;
  fotoStrip.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  fotoStrip.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 48) goTo(current + (dx < 0 ? 1 : -1));
  }, { passive: true });
}

// ─── MARQUEE + VELOCITY ───────────────────────────────
(function () {
  const strip = document.querySelector('.marquee-strip');
  const track = document.querySelector('.marquee-track');
  if (!track) return;
  const clone = track.cloneNode(true);
  strip.appendChild(clone);
  const totalWidth = track.scrollWidth;
  const marqueeAnim = gsap.to([track, clone], {
    x: `-=${totalWidth}`, duration: 28, ease: 'none', repeat: -1,
    modifiers: { x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth) },
  });
  ScrollTrigger.create({
    start: 0, end: 'max',
    onUpdate: (self) => {
      const v = Math.abs(self.getVelocity()) / 1500;
      gsap.to(marqueeAnim, { timeScale: 1 + v, duration: 0.4, overwrite: true });
      gsap.to(marqueeAnim, { timeScale: 1, duration: 1.5, delay: 0.4, overwrite: false });
    },
  });
})();

// ─── GALLERY INTRO ────────────────────────────────────
gsap.from('.gallery-intro', {
  y: 30, opacity: 0, duration: 0.9, ease: 'power3.out',
  scrollTrigger: { trigger: '.gallery-intro', start: 'top 85%' },
});

// ─── GALLERY ITEMS (diagonal stagger) ────────────────
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach((el, i) => {
  const delays = [0, 0.15, 0.3, 0.3, 0.45];
  gsap.fromTo(el,
    { clipPath: 'inset(100% 0 0 0)', scale: 1.12 },
    { clipPath: 'inset(0% 0 0 0)', scale: 1, duration: 1.2, ease: 'power3.inOut',
      delay: delays[i] || 0,
      scrollTrigger: { trigger: '.gallery-grid', start: 'top 82%' } }
  );
  const img = el.querySelector('.gallery-real-img');
  if (img) {
    gsap.fromTo(img, { scale: 1.18 }, { scale: 1, duration: 1.2, ease: 'power3.inOut',
      delay: delays[i] || 0,
      scrollTrigger: { trigger: '.gallery-grid', start: 'top 82%' } });
  }
});

// gallery image magnetic hover
galleryItems.forEach((el) => {
  const img = el.querySelector('.gallery-real-img');
  if (!img) return;
  el.addEventListener('mousemove', (e) => {
    const r  = el.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width  / 2) * 0.05;
    const dy = (e.clientY - r.top  - r.height / 2) * 0.05;
    gsap.to(img, { x: dx, y: dy, duration: 0.5, ease: 'power2.out' });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(img, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' });
  });
});

// ─── CRITICA CARDS — tilt de entrada ao scroll ────────
const isTouch = window.matchMedia('(hover: none)').matches;

document.querySelectorAll('.critica-card').forEach((card, i) => {
  const dir = i % 2 === 0 ? 1 : -1;

  // stars stagger
  const stars = card.querySelector('.critica-stars');
  if (stars) {
    stars.innerHTML = [...stars.textContent].map((c) => `<span class="star-char">${c}</span>`).join('');
    gsap.from(stars.querySelectorAll('.star-char'), {
      scale: 0, rotation: -40, opacity: 0, duration: 0.45, ease: 'back.out(3)', stagger: 0.07,
      scrollTrigger: { trigger: card, start: 'top 86%' },
    });
  }

  // entrada com tilt dramático
  const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: 'top 84%', once: true } });
  tl.from(card, { y: 70, opacity: 0, scale: 0.9, duration: 0.65, ease: 'power3.out', delay: i * 0.13 })
    .to(card, { y: -8, rotateY: dir * 8, rotateX: -4, transformPerspective: 900, duration: 0.25, ease: 'power2.out' })
    .to(card, { y: -4, rotateY: dir * -3, rotateX: 2, duration: 0.18, ease: 'power1.inOut' })
    .to(card, { y: 0, rotateY: 0, rotateX: 0, duration: 0.6, ease: 'elastic.out(1, 0.45)' });

  // texto + autor
  gsap.from(card.querySelector('.critica-text'), {
    y: 18, opacity: 0, duration: 0.7, ease: 'power2.out',
    scrollTrigger: { trigger: card, start: 'top 84%' },
  });
  gsap.from(card.querySelector('.critica-author'), {
    y: 14, opacity: 0, duration: 0.6, ease: 'power2.out', delay: 0.15,
    scrollTrigger: { trigger: card, start: 'top 84%' },
  });

  // 3D tilt hover (só desktop)
  if (!isTouch) {
    card.addEventListener('mousemove', (e) => {
      const r  = card.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
      const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
      gsap.to(card, { rotateY: dx * 5, rotateX: -dy * 5, translateY: -5, duration: 0.4, ease: 'power2.out', transformPerspective: 900 });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, translateY: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' });
    });
  }
});

// ─── RATING BADGE ─────────────────────────────────────
gsap.from('.rating-num', {
  scale: 0.4, opacity: 0, duration: 1, ease: 'back.out(2.2)',
  scrollTrigger: { trigger: '.rating-badge', start: 'top 88%' },
});
const ratingStars = document.querySelector('.rating-stars');
if (ratingStars) {
  ratingStars.innerHTML = [...ratingStars.textContent].map((c) => `<span class="star-char">${c}</span>`).join('');
  gsap.from(ratingStars.querySelectorAll('.star-char'), {
    scale: 0, rotation: -40, opacity: 0, duration: 0.5, ease: 'back.out(3)', stagger: 0.1,
    scrollTrigger: { trigger: '.rating-badge', start: 'top 88%' },
  });
}
gsap.from('.rating-label', {
  y: 10, opacity: 0, duration: 0.5, ease: 'power2.out', delay: 0.5,
  scrollTrigger: { trigger: '.rating-badge', start: 'top 88%' },
});
gsap.from('.rating-badge', {
  x: -50, opacity: 0, scale: 0.9, duration: 1.1, ease: 'back.out(1.7)',
  scrollTrigger: { trigger: '.rating-badge', start: 'top 90%' },
});

// ─── RESERVAS INFO ────────────────────────────────────
gsap.from('.reservas-info p', {
  y: 24, opacity: 0, duration: 0.8, ease: 'power2.out',
  scrollTrigger: { trigger: '.reservas-info p', start: 'top 88%' },
});

// detail icons bounce + rows
gsap.from('.detail-icon', {
  scale: 0, rotation: -20, opacity: 0, duration: 0.5, ease: 'back.out(2.5)', stagger: 0.1,
  scrollTrigger: { trigger: '.reservas-details', start: 'top 85%' },
});
gsap.from('.detail-row', {
  x: -30, opacity: 0, duration: 0.65, ease: 'power3.out', stagger: 0.1,
  scrollTrigger: { trigger: '.reservas-details', start: 'top 85%' },
});

// ─── RESERVAS PHOTO ───────────────────────────────────
gsap.fromTo('.reservas-photo',
  { clipPath: 'inset(100% 0 0 0)' },
  { clipPath: 'inset(0% 0 0 0)', duration: 1.3, ease: 'power3.inOut',
    scrollTrigger: { trigger: '.reservas-photo', start: 'top 88%' } }
);
gsap.fromTo('.reservas-photo img', { scale: 1.18 }, { scale: 1, duration: 1.3, ease: 'power3.inOut',
  scrollTrigger: { trigger: '.reservas-photo', start: 'top 88%' } });

// image parallax
gsap.to('.reservas-photo img', {
  yPercent: -12, ease: 'none',
  scrollTrigger: { trigger: '.reservas-photo', start: 'top bottom', end: 'bottom top', scrub: true },
});

// ─── FORM ─────────────────────────────────────────────
gsap.from('.form-group label', {
  x: -12, opacity: 0, duration: 0.4, ease: 'power2.out', stagger: 0.05,
  scrollTrigger: { trigger: '.form-grid', start: 'top 85%' },
});
gsap.from('.form-group input, .form-group select, .form-group textarea', {
  y: 16, opacity: 0, duration: 0.5, ease: 'power3.out', stagger: 0.05,
  scrollTrigger: { trigger: '.form-grid', start: 'top 85%' },
});
gsap.from('.form-submit', {
  y: 20, opacity: 0, duration: 0.6, ease: 'power3.out',
  scrollTrigger: { trigger: '.form-submit', start: 'top 92%' },
});

// ─── CONTACTO ─────────────────────────────────────────
gsap.from('.contact-item-label', {
  x: -16, opacity: 0, duration: 0.5, ease: 'power2.out', stagger: 0.12,
  scrollTrigger: { trigger: '.contact-info', start: 'top 82%' },
});
gsap.from('.contact-item-value', {
  x: -12, opacity: 0, duration: 0.6, ease: 'power2.out', stagger: 0.12, delay: 0.1,
  scrollTrigger: { trigger: '.contact-info', start: 'top 82%' },
});
gsap.from('.social-link', {
  scale: 0, opacity: 0, duration: 0.45, ease: 'back.out(2.2)', stagger: 0.08,
  scrollTrigger: { trigger: '.social-links', start: 'top 90%' },
});

// ─── MAP ──────────────────────────────────────────────
gsap.from('.map-container', {
  scale: 0.94, opacity: 0, duration: 1.1, ease: 'power3.out',
  scrollTrigger: { trigger: '.map-container', start: 'top 85%' },
});
gsap.from('.map-btn', {
  y: 14, opacity: 0, duration: 0.6, ease: 'power3.out',
  scrollTrigger: { trigger: '.map-btn', start: 'top 94%' },
});

// ─── SOBRE IMG PARALLAX ───────────────────────────────
gsap.to('.sobre-img', {
  yPercent: -12, ease: 'none',
  scrollTrigger: { trigger: '#sobre', start: 'top bottom', end: 'bottom top', scrub: true },
});

// ─── MAGNETIC BUTTONS ─────────────────────────────────
document.querySelectorAll('.btn-primary, .nav-cta, .form-submit').forEach((btn) => {
  btn.addEventListener('mousemove', (e) => {
    const r  = btn.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width  / 2) * 0.35;
    const dy = (e.clientY - r.top  - r.height / 2) * 0.35;
    gsap.to(btn, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' });
  });
});

// ─── FOOTER ───────────────────────────────────────────
gsap.from('.footer-logo-img', {
  scale: 0.7, opacity: 0, duration: 0.9, ease: 'back.out(2)',
  scrollTrigger: { trigger: 'footer', start: 'top 92%' },
});
gsap.from('.footer-links li', {
  y: 16, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.09,
  scrollTrigger: { trigger: 'footer', start: 'top 92%' },
});
gsap.from('.footer-copy', {
  opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.4,
  scrollTrigger: { trigger: 'footer', start: 'top 92%' },
});

// ─── MENU FILTER ──────────────────────────────────────
function filterMenuSelect(sel) {
  filterMenu(sel.value, null);
}

function filterMenu(cat, btn) {
  document.querySelectorAll('.menu-cat').forEach((b) => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const outgoing = document.querySelectorAll(`.menu-item:not(.menu-hidden):not([data-cat="${cat}"])`);
  const incoming = document.querySelectorAll(`.menu-item[data-cat="${cat}"]`);
  gsap.to(outgoing, {
    scale: 0.9, opacity: 0, y: 20, duration: 0.28, ease: 'power2.in',
    onComplete() {
      outgoing.forEach((el) => el.classList.add('menu-hidden'));
      incoming.forEach((el) => { el.classList.remove('menu-hidden'); el.classList.add('bar-in'); });
      gsap.fromTo(incoming,
        { scale: 0.88, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.65, ease: 'back.out(1.6)', stagger: 0.08 }
      );
    },
  });
}

// ─── MOBILE NAV ───────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
let mobileOpen  = false;

function openMobileNav() {
  mobileOpen = true;
  mobileNav.classList.add('open');
  mobileNav.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  gsap.to(mobileNav, { opacity: 1, duration: 0.35, ease: 'power2.out' });
  gsap.fromTo('.mobile-nav-link',
    { y: 36, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out', stagger: 0.07, delay: 0.1 }
  );
  gsap.to('.mobile-nav-cta', { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.6)', delay: 0.42 });
  gsap.to('.mobile-theme-row', { y: 0, opacity: 1, duration: 0.45, ease: 'back.out(1.4)', delay: 0.35 });
  gsap.fromTo('.mobile-nav-close',
    { rotation: -90, scale: 0.6, opacity: 0 },
    { rotation: 0, scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)', delay: 0.2 }
  );
}

function closeMobileNav() {
  if (!mobileOpen) return;
  mobileOpen = false;
  mobileNav.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  gsap.to(['.mobile-nav-link', '.mobile-nav-cta', '.mobile-theme-row'], { opacity: 0, y: 20, duration: 0.3, ease: 'power2.in' });
  gsap.to('.mobile-nav-close', { rotation: 90, scale: 0.6, opacity: 0, duration: 0.3, ease: 'power2.in' });
  gsap.to(mobileNav, {
    opacity: 0, duration: 0.35, delay: 0.2, ease: 'power2.in',
    onComplete: () => mobileNav.classList.remove('open'),
  });
}

hamburger.addEventListener('click', () => mobileOpen ? closeMobileNav() : openMobileNav());

document.getElementById('mobileThemeToggle').addEventListener('click', toggleTheme);

document.getElementById('mobileNavClose').addEventListener('click', () => {
  gsap.to('.mobile-nav-close', {
    scale: 0.8, duration: 0.1, ease: 'power2.in',
    onComplete: closeMobileNav,
  });
});

document.querySelectorAll('.mobile-nav-link').forEach((link) => {
  link.addEventListener('click', closeMobileNav);
});

// desativar magnetic e tilt em touch
if (isTouch) {
  document.querySelectorAll('.menu-item').forEach((card) => {
    card.replaceWith(card.cloneNode(true));
  });
}

// ─── DATE MIN ─────────────────────────────────────────
const dataInput = document.getElementById('data');
if (dataInput) dataInput.min = new Date().toISOString().split('T')[0];

// ─── FORM SUBMIT ──────────────────────────────────────
function submitReserva() {
  const nome    = document.getElementById('nome').value.trim();
  const tel     = document.getElementById('tel').value.trim();
  const data    = document.getElementById('data').value;
  const hora    = document.getElementById('hora').value;
  const pessoas = document.getElementById('pessoas').value;

  if (!nome || !tel || !data || !hora || !pessoas) {
    gsap.to('#reservaForm', {
      x: -8, duration: 0.07, yoyo: true, repeat: 5, ease: 'power1.inOut',
      onComplete: () => gsap.set('#reservaForm', { x: 0 }),
    });
    return;
  }

  const form    = document.getElementById('reservaForm');
  const success = document.getElementById('formSuccess');
  gsap.to(form, {
    opacity: 0, y: -24, duration: 0.4, ease: 'power2.in',
    onComplete: () => {
      form.style.display = 'none';
      success.style.display = 'block';
      gsap.from(success, { opacity: 0, y: 24, scale: 0.95, duration: 0.6, ease: 'back.out(1.5)' });
    },
  });

  const notif = document.getElementById('notification');
  notif.classList.add('show');
  setTimeout(() => notif.classList.remove('show'), 4000);
}
