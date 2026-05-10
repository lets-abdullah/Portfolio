// --- Cursor ---
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (hasFinePointer) {
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (cursor) {
      cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
    }
  });
  (function animRing() {
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    if (ring) {
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    }
    requestAnimationFrame(animRing);
  })();
  document.querySelectorAll('a,button,.project-card,.filter-tab').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
  });
}

// --- Nav scroll ---
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
  // Show contact strip after hero
  const strip = document.getElementById('contactStrip');
  if (strip) strip.classList.toggle('visible', window.scrollY > window.innerHeight * 0.7);
});

// --- Mobile menu ---
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
}
if (mobileClose && mobileMenu) {
  mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
}
function closeMobileMenu() {
  if (mobileMenu) mobileMenu.classList.remove('open');
}

// --- Reveal on scroll ---
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// --- Skill bars (animate when visible) ---
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.about-skills').forEach(el => skillObs.observe(el));

// --- Project filter ---
const tabs = document.querySelectorAll('.filter-tab');
const cards = document.querySelectorAll('.project-card');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;
    cards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'block';
        setTimeout(() => card.style.opacity = 1, 10);
      } else {
        card.style.opacity = 0;
        setTimeout(() => card.style.display = 'none', 300);
      }
    });
  });
});

// --- Typed effect in hero ---
const typedEl = document.querySelector('.hero-subtitle');
const phrases = ['Web Developer & Store Theme Designer', 'Shopify Theme Specialist', 'WordPress Developer', 'Building Stores That Convert'];
let pi = 0, ci = 0, deleting = false, wait = 0;
function typed() {
  if (!typedEl) return;
  const phrase = phrases[pi];
  if (!deleting) {
    typedEl.textContent = phrase.substring(0, ci + 1);
    ci++;
    if (ci === phrase.length) { deleting = true; wait = 60; }
  } else {
    if (wait-- > 0) { setTimeout(typed, 30); return; }
    typedEl.textContent = phrase.substring(0, ci - 1);
    ci--;
    if (ci === 1) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(typed, deleting ? 40 : 80);
}
if (typedEl) setTimeout(typed, 1800);

// --- Smooth counter animation ---
function animateCounter(el, target, duration = 2000) {
  let start = null;
  function step(ts) {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 4);
    el.textContent = Math.round(ease * target) + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// --- Form submit ---
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type=submit]');
  btn.textContent = 'Message Sent';
  btn.style.background = '#2d5a27';
  setTimeout(() => {
    btn.textContent = 'Send Message ->';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
}

// --- Parallax hero bg ---
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) heroBg.style.transform = `translateY(${y * 0.3}px)`;
});
