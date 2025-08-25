document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('site-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const pills = Array.from(document.querySelectorAll('.pill-nav .pill'));
  const sections = pills.map(p => document.querySelector(p.dataset.target));

  function activate(targetId) {
    pills.forEach(p => p.classList.toggle('is-active', p.dataset.target === targetId));
    sections.forEach(sec => {
      sec.hidden = `#${sec.id}` !== targetId;
    });
    const active = document.querySelector(targetId);
    if (active) active.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  pills.forEach(pill => {
    pill.addEventListener('click', () => activate(pill.dataset.target));
  });

  const playButtons = document.querySelectorAll('.circle-btn');
  playButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const icon = btn.querySelector('i');
      const isPlay = icon.classList.contains('fa-play');
      icon.classList.toggle('fa-play', !isPlay);
      icon.classList.toggle('fa-pause', isPlay);
    });
  });
});