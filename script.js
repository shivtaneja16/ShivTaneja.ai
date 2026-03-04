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
    { sel: '.filter-tabs',        cls: 'fade-in'       },
    { sel: '.project-card',       cls: 'fade-in'       },
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
