/* =============================================
   PORTFOLIO — JavaScript (Light Theme)
   ============================================= */
const FORMSPREE_ENDPOINT="https://formspree.io/f/mwvnapgv";
'use strict';

// ===== NAVBAR SCROLL =====
(function initNavbar() {
  const navbar  = document.getElementById('navbar');
  const links   = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 110) current = sec.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


// ===== HAMBURGER MENU =====
(function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const menu  = document.getElementById('mobile-menu');
  const mLinks = menu.querySelectorAll('.mobile-link');

  btn.addEventListener('click', () => menu.classList.toggle('open'));
  mLinks.forEach(l => l.addEventListener('click', () => menu.classList.remove('open')));
})();


// ===== INTERSECTION OBSERVER (fade-in animations) =====
(function initObserver() {
  const map = [
    { sel: '.hero-content',       cls: 'fade-in-left'  },
    { sel: '.hero-illustration',  cls: 'fade-in-right' },
    { sel: '.about-illustration', cls: 'fade-in-left'  },
    { sel: '.about-content',      cls: 'fade-in-right' },
    { sel: '.section-header',     cls: 'fade-in'       },
    { sel: '.contact-left',       cls: 'fade-in-left'  },
    { sel: '.contact-right',      cls: 'fade-in-right' },
    { sel: '.footer-bottom',      cls: 'fade-in'       },
  ];

  map.forEach(({ sel, cls }) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add(cls);
      if (i > 0) el.classList.add('delay-' + Math.min(i, 6));
    });
  });

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right')
    .forEach(el => io.observe(el));
})();


// ===== PROJECT FILTER =====
(function initFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards   = document.querySelectorAll('.project-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach((card, i) => {
        const match = filter === 'all' || card.dataset.category === filter;
        if (match) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(16px)';
          requestAnimationFrame(() => {
            setTimeout(() => {
              card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
              card.style.opacity   = '1';
              card.style.transform = 'translateY(0)';
            }, i * 40);
          });
        } else {
          card.classList.add('hidden');
          card.style.opacity   = '';
          card.style.transform = '';
          card.style.transition = '';
        }
      });
    });
  });
})();


// ===== CONTACT FORM =====
// To activate email delivery:
//   1. Go to https://formspree.io and sign up (free)
//   2. Create a new form — set the email to shivtaneja16@gmail.com
//   3. Replace YOUR_FORM_ID below with the ID from your Formspree dashboard


(function initForm() {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  const error   = document.getElementById('form-error');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn  = form.querySelector('button[type="submit"]');
    const span = btn.querySelector('span');

    btn.disabled     = true;
    span.textContent = 'Sending…';
    success.classList.remove('show');
    error.classList.remove('show');

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method:  'POST',
        headers: { 'Accept': 'application/json' },
        body:    new FormData(form)
      });

      if (res.ok) {
        form.reset();
        success.classList.add('show');
        setTimeout(() => success.classList.remove('show'), 5000);
      } else {
        error.classList.add('show');
        setTimeout(() => error.classList.remove('show'), 5000);
      }
    } catch {
      error.classList.add('show');
      setTimeout(() => error.classList.remove('show'), 5000);
    } finally {
      btn.disabled     = false;
      span.textContent = 'Send Message';
    }
  });
})();


// ===== ARC REACTOR ANIMATION =====
(function initReactorAnimation() {
  if (typeof anime === 'undefined') return;
  const { animate, createTimeline, stagger } = anime;

  const reactorStage = document.getElementById('reactor-stage');
  const projectsView = document.getElementById('projects-view');
  const reassembleBtn = document.getElementById('reassemble-btn');
  if (!reactorStage) return;

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const CX = 250, CY = 250;

  function svgEl(tag, attrs) {
    const el = document.createElementNS(SVG_NS, tag);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    return el;
  }

  function polar(cx, cy, r, deg) {
    const rad = (deg - 90) * Math.PI / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  // Build tick marks
  const smallTicks = document.getElementById('tick-marks-small');
  const largeTicks  = document.getElementById('tick-marks-large');
  for (let i = 0; i < 60; i++) {
    const a  = i * 6;
    const p1 = polar(CX, CY, 224, a);
    const p2 = polar(CX, CY, (i % 5 === 0) ? 234 : 230, a);
    const g  = (i % 5 === 0) ? largeTicks : smallTicks;
    g.appendChild(svgEl('line', {
      x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y,
      stroke: (i % 5 === 0) ? 'rgba(0,229,255,0.6)' : 'rgba(79,195,247,0.25)',
      'stroke-width': (i % 5 === 0) ? '1.5' : '0.5',
      class: 'tick',
    }));
  }

  // Build coil segments (Ring 3)
  const ring3El = document.getElementById('ring3');
  for (let i = 0; i < 10; i++) {
    const startAngle = i * 36;
    const endAngle   = startAngle + 28;
    const r = 160;
    const p1 = polar(CX, CY, r, startAngle);
    const p2 = polar(CX, CY, r, endAngle);
    const largeArc = (endAngle - startAngle > 180) ? 1 : 0;
    const d = `M ${p1.x} ${p1.y} A ${r} ${r} 0 ${largeArc} 1 ${p2.x} ${p2.y}`;
    ring3El.appendChild(svgEl('path', { d, fill: 'none', stroke: 'rgba(0,229,255,0.5)',  'stroke-width': '5',  'stroke-linecap': 'round', class: 'coil-seg' }));
    ring3El.appendChild(svgEl('path', { d, fill: 'none', stroke: 'rgba(79,195,247,0.15)', 'stroke-width': '12', 'stroke-linecap': 'round', class: 'coil-glow' }));
  }

  // Build triangle
  const triPoints = [0, 120, 240].map(a => polar(CX, CY, 100, a));
  document.getElementById('triangle-frame').setAttribute('points', triPoints.map(p => `${p.x},${p.y}`).join(' '));
  const triNodes = document.getElementById('triangle-nodes');
  triPoints.forEach(p => {
    triNodes.appendChild(svgEl('circle', { cx: p.x, cy: p.y, r: '8',  fill: 'rgba(0,229,255,0.15)', stroke: 'rgba(0,229,255,0.7)', 'stroke-width': '1', class: 'tri-node' }));
    triNodes.appendChild(svgEl('circle', { cx: p.x, cy: p.y, r: '3',  fill: 'rgba(224,247,250,0.8)', class: 'tri-node-core' }));
  });

  // Build hex
  const hexPoints = Array.from({ length: 6 }, (_, i) => polar(CX, CY, 70, i * 60));
  document.getElementById('hex-shape').setAttribute('points', hexPoints.map(p => `${p.x},${p.y}`).join(' '));

  // Build energy beams
  const beamsG = document.getElementById('energy-beams');
  triPoints.forEach(p => {
    beamsG.appendChild(svgEl('line', { x1: CX, y1: CY, x2: p.x, y2: p.y, stroke: 'rgba(0,229,255,0.3)', 'stroke-width': '1.5', class: 'beam' }));
  });

  // Build data arc dots
  const dataArcs = document.getElementById('data-arcs');
  [145, 175, 205].forEach((r, ri) => {
    for (let i = 0; i < 3; i++) {
      const p = polar(CX, CY, r, (ri * 40) + (i * 120));
      dataArcs.appendChild(svgEl('circle', { cx: p.x, cy: p.y, r: '2', fill: 'rgba(0,229,255,0.8)', class: `data-dot data-dot-r${ri}` }));
    }
  });

  // Build floating particles
  const particlesContainer = document.getElementById('r-particles');
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'r-particle';
    p.style.left = `${Math.random() * 100}%`;
    p.style.top  = `${Math.random() * 100}%`;
    particlesContainer.appendChild(p);
  }

  let reactorStarted = false;

  function startReactor() {
    if (reactorStarted) return;
    reactorStarted = true;

    // Boot timeline
    const boot = createTimeline({ defaults: { ease: 'outExpo' } });
    boot.add('#core-group',   { opacity: [0, 1], scale: [0.3, 1], duration: 1200 }, 0);
    boot.add('#core-center',  { r: [0, 22], duration: 800, ease: 'outBack' }, 200);
    boot.add('#energy-beams', { opacity: [0, 1], duration: 600 }, 600);
    boot.add('#ring1',        { opacity: [0, 1], scale: [0.5, 1], duration: 800 }, 800);
    boot.add('#hex-ring',     { opacity: [0, 1], rotate: [30, 0], duration: 600 }, 900);
    boot.add('#ring2',        { opacity: [0, 1], duration: 700 }, 1000);
    boot.add('#ring3',        { opacity: [0, 1], duration: 700 }, 1100);
    boot.add('.coil-seg',     { strokeDashoffset: [80, 0], duration: 800, delay: stagger(60), ease: 'inOutQuart' }, 1100);
    boot.add('#ring4',        { opacity: [0, 1], duration: 700 }, 1300);
    boot.add('#ring5',        { opacity: [0, 1], strokeDashoffset: [600, 0], duration: 1500, ease: 'inOutQuart' }, 1400);
    boot.add('#outer-ticks',  { opacity: [0, 1], duration: 600 }, 1600);
    boot.add('.tick',         { opacity: [0, 1], duration: 300, delay: stagger(15, { from: 'center' }) }, 1600);
    boot.add('#data-arcs',    { opacity: [0, 1], duration: 500 }, 1800);
    boot.add('.reactor-tagline', { opacity: [0, 1], translateY: [8, 0], duration: 600 }, 2000);
    boot.add('.r-hud-label',  { opacity: [0, 0.8], translateY: [10, 0], duration: 800 }, 2000);
    boot.add('.r-hud-stats',  { opacity: [0, 0.7], translateY: [10, 0], duration: 800 }, 2200);

    // Continuous animations
    animate('#core-halo',   { opacity: [0.4, 0.8], r: [50, 58], duration: 2000, ease: 'inOutSine', loop: true, alternate: true, delay: 2500 });
    animate('#core-center', { opacity: [0.8, 1],   r: [20, 24], duration: 1500, ease: 'inOutSine', loop: true, alternate: true, delay: 2500 });
    animate('#ring4',       { rotate: 360,  duration: 30000, ease: 'linear', loop: true, delay: 2000 });
    animate('#ring5',       { rotate: -360, duration: 45000, ease: 'linear', loop: true, delay: 2000 });
    animate('#outer-ticks', { rotate: 360,  duration: 60000, ease: 'linear', loop: true, delay: 2000 });
    animate('#ring3',       { rotate: -360, duration: 20000, ease: 'linear', loop: true, delay: 2000 });
    animate('#hex-ring',    { rotate: 360,  duration: 15000, ease: 'linear', loop: true, delay: 2000 });
    animate('#ring2 circle:first-child', { rotate: -360, duration: 25000, ease: 'linear', loop: true, delay: 2000 });
    animate('#ring1',       { rotate: [0, 360], duration: 40000, ease: 'linear', loop: true, delay: 2000 });
    animate('.beam',        { opacity: [0.2, 0.6], strokeWidth: [1, 2.5], duration: 1500, ease: 'inOutSine', loop: true, alternate: true, delay: stagger(200) });
    animate('.tri-node',    { r: [7, 10], opacity: [0.8, 1], duration: 2000, ease: 'inOutSine', loop: true, alternate: true, delay: stagger(300) });
    animate('.tri-node-core', { r: [2, 4], opacity: [0.6, 1], duration: 1500, ease: 'inOutSine', loop: true, alternate: true, delay: stagger(300) });
    animate('.data-dot',    { opacity: [0.3, 1], r: [1.5, 3], duration: 1200, ease: 'inOutSine', loop: true, alternate: true, delay: stagger(100, { from: 'center' }) });
    animate('.coil-glow',   { opacity: [0.3, 0.9], strokeWidth: [10, 16], duration: 3000, ease: 'inOutSine', loop: true, alternate: true, delay: stagger(200) });
    animate('.r-particle',  { opacity: [0, 0.6, 0], translateY: [-60, -120], translateX: () => `${(Math.random() - 0.5) * 40}px`, scale: [0, 1.5, 0], duration: () => 3000 + Math.random() * 3000, delay: () => 2500 + Math.random() * 4000, loop: true, ease: 'inOutSine' });
    animate('.ambient-glow', { scale: [0.9, 1.1], opacity: [0.6, 1], duration: 4000, ease: 'inOutSine', loop: true, alternate: true });
  }

  // Trigger boot when works section scrolls into view
  const io = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { startReactor(); io.disconnect(); }
  }, { threshold: 0.2 });
  io.observe(reactorStage);

  // Click core → reveal projects
  document.getElementById('core-group').addEventListener('click', () => {
    animate(reactorStage, {
      opacity: [1, 0], scale: [1, 0.85],
      duration: 700, ease: 'inExpo',
      onComplete: () => {
        reactorStage.style.display = 'none';
        projectsView.style.display = 'block';
        animate('.filter-tabs',  { opacity: [0, 1], translateY: [-18, 0], duration: 380, ease: 'outQuad' });
        animate('.project-card', { opacity: [0, 1], translateY: [40,  0], delay: stagger(70), duration: 480, ease: 'outBack' });
      },
    });
  });

  // Reassemble → back to reactor
  reassembleBtn.addEventListener('click', () => {
    const tl = createTimeline({
      onComplete: () => {
        projectsView.style.display = 'none';
        reactorStage.style.display = 'flex';
        animate(reactorStage, { opacity: [0, 1], scale: [0.9, 1], duration: 600, ease: 'outBack' });
      },
    });
    tl.add('.project-card', { opacity: [1, 0], translateY: [0, -20], delay: stagger(40), duration: 260, ease: 'inQuad' }, 0);
    tl.add('.filter-tabs',  { opacity: [1, 0], translateY: [0, -20], duration: 260, ease: 'inQuad' }, 0);
  });
})();


// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
