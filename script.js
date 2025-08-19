// Header shadow on scroll
(function () {
  const header = document.querySelector('[data-header]');
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 6) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Mobile nav toggle and smooth scroll
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('primary-nav');
  if (!toggle || !navList) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('open');
  });

  navList.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.matches('a.nav-link')) {
      navList.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href.length < 2) return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', href);
    });
  });
})();

// Slider controls
(function () {
  const slider = document.querySelector('[data-slider]');
  if (!slider) return;

  const prevBtn = document.querySelector('[data-slider-prev]');
  const nextBtn = document.querySelector('[data-slider-next]');

  const cardWidth = () => slider.firstElementChild ? slider.firstElementChild.getBoundingClientRect().width + 16 : 320;

  const updateDisabled = () => {
    if (!prevBtn || !nextBtn) return;
    prevBtn.disabled = slider.scrollLeft <= 0;
    const maxScroll = slider.scrollWidth - slider.clientWidth - 2;
    nextBtn.disabled = slider.scrollLeft >= maxScroll;
  };

  prevBtn && prevBtn.addEventListener('click', () => {
    slider.scrollBy({ left: -cardWidth(), behavior: 'smooth' });
  });
  nextBtn && nextBtn.addEventListener('click', () => {
    slider.scrollBy({ left: cardWidth(), behavior: 'smooth' });
  });

  slider.addEventListener('scroll', updateDisabled, { passive: true });
  window.addEventListener('resize', updateDisabled);
  updateDisabled();
})();

// Hover ripple for buttons (subtle)
(function () {
  const buttons = document.querySelectorAll('.btn, .icon-btn, .tile, .social');
  buttons.forEach((btn) => {
    btn.addEventListener('pointermove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      btn.style.setProperty('--mx', x + 'px');
      btn.style.setProperty('--my', y + 'px');
      btn.style.backgroundImage = `radial-gradient(240px 240px at var(--mx) var(--my), rgba(255,255,255,0.07), transparent 40%)`;
    });
    btn.addEventListener('pointerleave', () => {
      btn.style.backgroundImage = '';
    });
  });
})();

// Reveal on scroll
(function () {
  const revealEls = Array.from(document.querySelectorAll('.card, .tile, .tour-item, .section-title'));
  revealEls.forEach((el) => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach((el) => io.observe(el));
})();

