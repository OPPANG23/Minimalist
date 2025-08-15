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