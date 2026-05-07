/* ═══════════════════════════════════════════════════════════
   main.js — Core interactions
   Neural particle canvas · Apple-style cursor · Scroll FX
   Counters · 3D tilt · Nav · Typewriter
═══════════════════════════════════════════════════════════ */

'use strict';

/* ─── Utility ────────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const lerp = (a, b, t) => a + (b - a) * t;

/* ════════════════════════════════════════
   1. NEURAL PARTICLE CANVAS
════════════════════════════════════════ */
(function initParticles() {
  const canvas = $('#particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: null, y: null };
  const COUNT = window.innerWidth < 768 ? 50 : 90;
  const CONNECT_DIST = 130;
  const MOUSE_DIST = 110;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.init(); }
    init() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.r  = Math.random() * 1.5 + 0.5;
      this.base = { vx: this.vx, vy: this.vy };
      // Apple-style: white dots with varying opacity
      this.alpha = Math.random() * 0.35 + 0.1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      // Wrap edges
      if (this.x < -10) this.x = W + 10;
      if (this.x > W + 10) this.x = -10;
      if (this.y < -10) this.y = H + 10;
      if (this.y > H + 10) this.y = -10;
      // Mouse repulsion
      if (mouse.x !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MOUSE_DIST && d > 0) {
          const force = (MOUSE_DIST - d) / MOUSE_DIST;
          this.vx += (dx / d) * force * 0.35;
          this.vy += (dy / d) * force * 0.35;
        }
      }
      // Friction + drift back
      this.vx = lerp(this.vx, this.base.vx, 0.025);
      this.vy = lerp(this.vy, this.base.vy, 0.025);
      // Speed cap
      const spd = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (spd > 2) { this.vx = (this.vx / spd) * 2; this.vy = (this.vy / spd) * 2; }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
      ctx.fill();
    }
  }

  function connect() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < CONNECT_DIST) {
          const a = (1 - d / CONNECT_DIST) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          // Subtle white/blue line — Apple-ish
          ctx.strokeStyle = `rgba(100,170,255,${a})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    connect();
    requestAnimationFrame(animate);
  }

  function build() {
    particles = Array.from({ length: COUNT }, () => new Particle());
  }

  resize();
  build();
  animate();

  window.addEventListener('resize', () => { resize(); });
  document.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  document.addEventListener('mouseleave', () => { mouse.x = mouse.y = null; });
})();

/* ════════════════════════════════════════
   2. CUSTOM CURSOR (Apple difference blend)
════════════════════════════════════════ */
(function initCursor() {
  const ring = $('#cursor');
  const dot  = $('#cursorDot');
  if (!ring || !dot) return;

  let cx = -50, cy = -50;   // ring (lagged)
  let dx = -50, dy = -50;   // dot (instant)
  let raf;

  document.addEventListener('mousemove', e => {
    dx = e.clientX; dy = e.clientY;
    dot.style.left = dx + 'px';
    dot.style.top  = dy + 'px';
  });

  function loop() {
    cx = lerp(cx, dx, 0.16);
    cy = lerp(cy, dy, 0.16);
    ring.style.left = cx + 'px';
    ring.style.top  = cy + 'px';
    raf = requestAnimationFrame(loop);
  }
  loop();

  // Hover state on interactive elements
  const hoverTargets = 'a,button,.btn,.btn-nav-cta,.project-card,.cert-featured,.cert-card,.glass-card,.nav-link,.skills-unlock-btn,.modal-close';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverTargets)) ring.classList.add('hovering');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverTargets)) ring.classList.remove('hovering');
  });
  document.addEventListener('mousedown', () => ring.classList.add('clicking'));
  document.addEventListener('mouseup',   () => ring.classList.remove('clicking'));

  // Hide on touch
  document.addEventListener('touchstart', () => {
    ring.style.display = 'none';
    dot.style.display  = 'none';
  }, { once: true });
})();

/* ════════════════════════════════════════
   3. SCROLL PROGRESS BAR
════════════════════════════════════════ */
(function initScrollProgress() {
  const bar = $('#scrollProgress');
  if (!bar) return;
  function update() {
    const docH  = document.documentElement.scrollHeight - window.innerHeight;
    const pct   = docH > 0 ? (window.scrollY / docH) * 100 : 0;
    bar.style.width = pct + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ════════════════════════════════════════
   4. NAV — Scroll state + active link + hamburger
════════════════════════════════════════ */
(function initNav() {
  const nav   = $('#navbar');
  const links = $$('.nav-link');
  const burger = $('#navHamburger');
  const navLinks = $('#navLinks');
  if (!nav) return;

  // Scroll state
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Active link on scroll
  const sections = $$('section[id]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = links.find(l => l.getAttribute('href') === '#' + e.target.id);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(s => observer.observe(s));

  // Hamburger menu
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.addEventListener('click', e => {
      if (e.target.classList.contains('nav-link')) {
        burger.classList.remove('open');
        navLinks.classList.remove('open');
      }
    });
  }
})();

/* ════════════════════════════════════════
   5. TYPEWRITER EFFECT
════════════════════════════════════════ */
(function initTypewriter() {
  const el = $('#typewriter');
  if (!el) return;

  const phrases = [
    'Senior Data Scientist',
    'AI/ML Engineer',
    'GenAI Architect',
    'LLM Systems Builder',
    'MLOps Practitioner',
  ];
  let pi = 0, ci = 0, deleting = false, paused = false;

  function type() {
    const phrase = phrases[pi];
    if (paused) { setTimeout(type, 1600); paused = false; return; }
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { paused = true; deleting = true; }
      setTimeout(type, 90 + Math.random() * 40);
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
      setTimeout(type, 45);
    }
  }
  setTimeout(type, 1200);
})();

/* ════════════════════════════════════════
   6. SCROLL REVEAL (Intersection Observer)
════════════════════════════════════════ */
(function initReveal() {
  const items = $$('.reveal-up, .reveal-left, .reveal-right');
  if (!items.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
  items.forEach(el => observer.observe(el));
})();

/* ════════════════════════════════════════
   7. ANIMATED STAT COUNTERS
════════════════════════════════════════ */
(function initCounters() {
  const counters = $$('.counter');
  if (!counters.length) return;

  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

  function animateCounter(el) {
    const target   = parseFloat(el.dataset.target);
    const isDecimal = el.dataset.decimal === 'true';
    const duration  = 2000;
    const start     = performance.now();

    function tick(now) {
      const elapsed  = now - start;
      const progress = clamp(elapsed / duration, 0, 1);
      const eased    = easeOutCubic(progress);
      const current  = target * eased;
      el.textContent = isDecimal
        ? current.toFixed(1)
        : Math.floor(current).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString();
    }
    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.8 });

  counters.forEach(el => observer.observe(el));
})();

/* ════════════════════════════════════════
   8. 3D CARD TILT (project cards)
════════════════════════════════════════ */
(function initTilt() {
  const cards = $$('.tilt-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const rx   = clamp(((e.clientY - cy) / rect.height) * 16, -8, 8);
      const ry   = clamp(-((e.clientX - cx) / rect.width) * 16, -8, 8);
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ════════════════════════════════════════
   9. SMOOTH ANCHOR SCROLL
════════════════════════════════════════ */
document.addEventListener('click', e => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const id  = link.getAttribute('href').slice(1);
  const target = document.getElementById(id);
  if (target) {
    e.preventDefault();
    const offset = 72; // nav height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
});

/* ════════════════════════════════════════
   10. HERO ENTRANCE ANIMATION
════════════════════════════════════════ */
(function initHeroEntrance() {
  const items = $$('.hero-content .reveal-up');
  items.forEach((el, i) => {
    setTimeout(() => el.classList.add('revealed'), 300 + i * 120);
  });
})();
