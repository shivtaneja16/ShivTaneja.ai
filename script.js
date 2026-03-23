'use strict';

// ===== CUSTOM CURSOR =====
(function initCursor() {
  const cursor = document.getElementById('cursor');
  if (!cursor) return;

  let mx = 0, my = 0, cx = 0, cy = 0;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  (function loop() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
    requestAnimationFrame(loop);
  })();
})();


// ===== HAMBURGER MENU =====
(function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const menu  = document.getElementById('mobile-nav');
  if (!btn || !menu) return;

  function close() {
    btn.classList.remove('open');
    menu.classList.remove('open');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  menu.querySelectorAll('.mobile-nav-link').forEach(l => l.addEventListener('click', close));
  menu.addEventListener('click', e => { if (e.target === menu) close(); });
})();


// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    // close mobile menu if open
    document.getElementById('mobile-nav')?.classList.remove('open');
    document.getElementById('hamburger')?.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30);
  });
});


// ===== NAVBAR ACTIVE STATE =====
(function initNavbar() {
  const links    = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function update() {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 130) current = s.id; });
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();


// ===== CAREER TIMELINE ANIMATION =====
(function initTimeline() {
  const info = document.getElementById('career-info');
  if (!info) return;

  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      const tl = document.getElementById('career-timeline');
      if (tl) tl.classList.add('animate');
    }
  }, { threshold: 0.25 }).observe(info);
})();


// ===== CAROUSEL =====
(function initCarousel() {
  const projects = [
    {
      title: 'Industrial Policy Chatbot',
      category: 'Machine Learning / NLP',
      tools: 'Python, LangChain, Hybrid RAG, Cross-Encoder Reranking, Vector DB, FastAPI',
      link: 'https://github.com/shivtaneja16/IndustrialPolicyChatbot.git',
      svg: `<svg viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="480" height="280" rx="12" fill="#0a0e17"/>
        <circle cx="80"  cy="140" r="22" fill="#0d2a3a" stroke="#5eead4" stroke-width="1.8"/>
        <circle cx="160" cy="80"  r="22" fill="#0d2a3a" stroke="#5eead4" stroke-width="1.8"/>
        <circle cx="160" cy="200" r="22" fill="#0d2a3a" stroke="#5eead4" stroke-width="1.8"/>
        <circle cx="280" cy="105" r="24" fill="#0d2a3a" stroke="#14b8a6" stroke-width="2.2"/>
        <circle cx="280" cy="175" r="24" fill="#0d2a3a" stroke="#14b8a6" stroke-width="2.2"/>
        <circle cx="400" cy="140" r="30" fill="#0d9488"/>
        <line x1="102" y1="133" x2="138" y2="88"  stroke="#5eead4" stroke-width="1.4" opacity="0.7"/>
        <line x1="102" y1="147" x2="138" y2="192" stroke="#5eead4" stroke-width="1.4" opacity="0.7"/>
        <line x1="182" y1="81"  x2="256" y2="108" stroke="#5eead4" stroke-width="1.4" opacity="0.7"/>
        <line x1="182" y1="199" x2="256" y2="172" stroke="#5eead4" stroke-width="1.4" opacity="0.7"/>
        <line x1="304" y1="108" x2="370" y2="130" stroke="#14b8a6" stroke-width="2" opacity="0.8"/>
        <line x1="304" y1="172" x2="370" y2="150" stroke="#14b8a6" stroke-width="2" opacity="0.8"/>
        <text x="400" y="146" text-anchor="middle" font-size="13" fill="white" font-weight="700" font-family="sans-serif">RAG</text>
      </svg>`
    },
    {
      title: 'AI Chatbot Agent',
      category: 'Machine Learning / Conversational AI',
      tools: 'Python, LangGraph, OpenAI API, Multi-turn dialogue, Context management',
      link: '#',
      svg: `<svg viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="480" height="280" rx="12" fill="#0a0e17"/>
        <rect x="155" y="48" width="170" height="120" rx="20" fill="#0d2a3a" stroke="#5eead4" stroke-width="1.8"/>
        <rect x="176" y="74"  width="36" height="24" rx="8" fill="#14b8a6" opacity="0.8"/>
        <rect x="268" y="74"  width="36" height="24" rx="8" fill="#14b8a6" opacity="0.8"/>
        <rect x="188" y="112" width="104" height="12" rx="6" fill="#5eead4" opacity="0.55"/>
        <line x1="240" y1="48" x2="240" y2="28" stroke="#5eead4" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="240" cy="17" r="8" fill="#5eead4"/>
        <rect x="136" y="180" width="208" height="72" rx="12" fill="#0d2a3a" stroke="#14b8a6" stroke-width="1.4"/>
        <rect x="152" y="196" width="80"  height="8" rx="4" fill="#5eead4" opacity="0.5"/>
        <rect x="152" y="212" width="136" height="8" rx="4" fill="white" opacity="0.18"/>
        <rect x="152" y="228" width="100" height="8" rx="4" fill="white" opacity="0.12"/>
        <path d="M210 180 L188 166 L232 166 Z" fill="#0d2a3a" stroke="#14b8a6" stroke-width="1.4"/>
      </svg>`
    },
    {
      title: 'Data Visualization Dashboard',
      category: 'Data Science / Analytics',
      tools: 'Python, Pandas, Plotly, Dash, Statistical analysis, Real-time charts',
      link: '#',
      svg: `<svg viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="480" height="280" rx="12" fill="#0a0e17"/>
        <rect x="55"  y="190" width="38" height="62" rx="4" fill="#5eead4" opacity="0.45"/>
        <rect x="106" y="160" width="38" height="92" rx="4" fill="#5eead4" opacity="0.65"/>
        <rect x="157" y="128" width="38" height="124" rx="4" fill="#5eead4"/>
        <rect x="208" y="96"  width="38" height="156" rx="4" fill="#14b8a6"/>
        <rect x="259" y="140" width="38" height="112" rx="4" fill="#5eead4" opacity="0.65"/>
        <rect x="310" y="108" width="38" height="144" rx="4" fill="#14b8a6" opacity="0.85"/>
        <rect x="361" y="72"  width="38" height="180" rx="4" fill="#14b8a6"/>
        <line x1="46" y1="254" x2="412" y2="254" stroke="#5eead4" stroke-width="1.4" opacity="0.35"/>
        <polyline points="74,194 125,164 176,132 227,100 278,144 329,112 380,76"
          stroke="#eab308" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="74"  cy="194" r="5" fill="#eab308"/>
        <circle cx="125" cy="164" r="5" fill="#eab308"/>
        <circle cx="176" cy="132" r="5" fill="#eab308"/>
        <circle cx="227" cy="100" r="5" fill="#eab308"/>
        <circle cx="278" cy="144" r="5" fill="#eab308"/>
        <circle cx="329" cy="112" r="5" fill="#eab308"/>
        <circle cx="380" cy="76"  r="5" fill="#eab308"/>
      </svg>`
    },
    {
      title: 'Resale Price Predictor',
      category: 'Machine Learning / Web App',
      tools: 'Python, Flask, Scikit-learn, Linear Regression, HTML/CSS, Pandas',
      link: '#',
      svg: `<svg viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="480" height="280" rx="12" fill="#0a0e17"/>
        <rect x="48" y="34" width="384" height="214" rx="12" fill="#0d1f2d" stroke="#1e3a5f" stroke-width="1.5"/>
        <rect x="48" y="34" width="384" height="46" rx="12" fill="#1e3a5f"/>
        <rect x="48" y="64" width="384" height="16" fill="#1e3a5f"/>
        <circle cx="74"  cy="58" r="8" fill="#f87171" opacity="0.75"/>
        <circle cx="98"  cy="58" r="8" fill="#fbbf24" opacity="0.75"/>
        <circle cx="122" cy="58" r="8" fill="#4ade80" opacity="0.75"/>
        <rect x="166" y="44" width="200" height="22" rx="11" fill="#050810" opacity="0.85"/>
        <rect x="68"  y="104" width="145" height="12" rx="6" fill="#5eead4" opacity="0.65"/>
        <rect x="68"  y="126" width="230" height="8"  rx="4" fill="#eae5ec" opacity="0.18"/>
        <rect x="68"  y="142" width="190" height="8"  rx="4" fill="#eae5ec" opacity="0.18"/>
        <rect x="68"  y="158" width="140" height="8"  rx="4" fill="#eae5ec" opacity="0.18"/>
        <rect x="68"  y="184" width="110" height="28" rx="14" fill="#14b8a6"/>
        <rect x="244" y="96"  width="164" height="112" rx="8" fill="#050810" stroke="#1e3a5f" stroke-width="1.4"/>
        <text x="326" y="144" text-anchor="middle" font-size="13" fill="#5eead4" font-weight="600" font-family="sans-serif">PREDICT</text>
        <text x="326" y="170" text-anchor="middle" font-size="24" fill="#eae5ec" font-weight="700" font-family="sans-serif">₹ 8.2L</text>
      </svg>`
    },
    {
      title: 'Plant Disease Detection',
      category: 'Machine Learning / Computer Vision',
      tools: 'Python, TensorFlow, CNN, Image Classification, 96.4% Accuracy',
      link: '#',
      svg: `<svg viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="480" height="280" rx="12" fill="#0a0e17"/>
        <path d="M178 248 Q106 184 138 98 Q184 34 270 60 Q342 88 328 178 Q302 248 178 248Z"
          fill="#0d2a1a" stroke="#22c55e" stroke-width="2"/>
        <path d="M178 248 Q224 170 270 60" stroke="#22c55e" stroke-width="1.8" fill="none"/>
        <path d="M200 224 Q240 178 258 126" stroke="#4ade80" stroke-width="1.2" fill="none" opacity="0.6"/>
        <circle cx="224" cy="118" r="24" fill="#7f1d1d" opacity="0.68" stroke="#ef4444" stroke-width="2"/>
        <circle cx="256" cy="155" r="16" fill="#7f1d1d" opacity="0.58" stroke="#ef4444" stroke-width="1.5"/>
        <rect x="194" y="90"  width="88" height="88" rx="6" fill="none" stroke="#ef4444" stroke-width="2.2" stroke-dasharray="6 4"/>
        <rect x="308" y="68"  width="118" height="32" rx="16" fill="#0d2a1a" stroke="#22c55e" stroke-width="1.4"/>
        <text x="367" y="89"  text-anchor="middle" font-size="13" fill="#4ade80" font-weight="700" font-family="sans-serif">CNN Model</text>
        <rect x="308" y="114" width="118" height="32" rx="16" fill="#0d2a1a" stroke="#22c55e" stroke-width="1.4"/>
        <text x="367" y="135" text-anchor="middle" font-size="13" fill="#4ade80" font-weight="700" font-family="sans-serif">96.4% acc</text>
      </svg>`
    }
  ];

  const track  = document.getElementById('carousel-track');
  const dots   = document.getElementById('carousel-dots');
  const prev   = document.getElementById('carousel-prev');
  const next   = document.getElementById('carousel-next');
  if (!track) return;

  let current = 0;
  let isAnimating = false;

  projects.forEach((p, i) => {
    // Slide
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    slide.innerHTML = `
      <div class="carousel-content">
        <div class="carousel-info">
          <div class="carousel-number"><h3>0${i + 1}</h3></div>
          <div class="carousel-details">
            <h4>${p.title}</h4>
            <p class="carousel-category">${p.category}</p>
            <div class="carousel-tools">
              <span class="tools-label">Tools &amp; Features</span>
              <p>${p.tools}</p>
            </div>
            ${p.link !== '#' ? `<a href="${p.link}" target="_blank" rel="noopener" class="carousel-link">View Project &rarr;</a>` : ''}
          </div>
        </div>
        <div class="carousel-visual">${p.svg}</div>
      </div>`;
    track.appendChild(slide);

    // Dot
    const dot = document.createElement('button');
    dot.className = 'carousel-dot-btn' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dots.appendChild(dot);
  });

  function slideWidth() { return track.parentElement.offsetWidth; }

  function goTo(n) {
    if (isAnimating) return;
    const target = ((n % projects.length) + projects.length) % projects.length;
    if (target === current) return;
    isAnimating = true;
    current = target;
    track.style.transform = `translateX(-${current * slideWidth()}px)`;
    dots.querySelectorAll('.carousel-dot-btn').forEach((d, i) =>
      d.classList.toggle('active', i === current));
  }

  track.addEventListener('transitionend', () => { isAnimating = false; });

  // Resize: reposition without animation guard
  window.addEventListener('resize', () => {
    track.style.transform = `translateX(-${current * slideWidth()}px)`;
  }, { passive: true });

  prev && prev.addEventListener('click', () => goTo(current - 1));
  next && next.addEventListener('click', () => goTo(current + 1));

  // Touch swipe
  let tx = 0;
  track.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const diff = tx - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
  });
})();
