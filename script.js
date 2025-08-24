(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Scroll reveal for sections and cards
  const revealElements = Array.from(document.querySelectorAll('.reveal'));
  if (revealElements.length) {
    if (prefersReducedMotion) {
      revealElements.forEach((el) => el.classList.add('revealed'));
    } else {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.18 }
      );
      revealElements.forEach((el) => revealObserver.observe(el));
    }
  }

  // Lazy-load and auto play/pause videos based on viewport visibility
  const videos = Array.from(document.querySelectorAll('video.nature-video'));
  if (videos.length) {
    const loadVideoSourceIfNeeded = (video) => {
      if (!video.getAttribute('src')) {
        const dataSrc = video.getAttribute('data-src');
        if (dataSrc) {
          video.setAttribute('src', dataSrc);
          // Use load() to commit the new source
          try { video.load(); } catch (_) {}
        }
      }
    };

    const attemptPlay = async (video) => {
      try {
        if (video.paused) {
          await video.play();
        }
      } catch (_) {
        // Autoplay may be blocked; surface controls for manual play
        video.setAttribute('controls', '');
      }
    };

    const videoObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target;
          if (!(video instanceof HTMLVideoElement)) continue;
          if (entry.intersectionRatio >= 0.6) {
            loadVideoSourceIfNeeded(video);
            if (!prefersReducedMotion) attemptPlay(video);
          } else {
            try { video.pause(); } catch (_) {}
          }
        }
      },
      { threshold: [0, 0.25, 0.6, 1] }
    );

    videos.forEach((v) => videoObserver.observe(v));

    // Pause videos when tab is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        videos.forEach((v) => { try { v.pause(); } catch (_) {} });
      }
    });

    // Toggle mute on click for an intentional, simple interaction
    videos.forEach((v) => {
      v.addEventListener('click', () => {
        v.muted = !v.muted;
      });
    });
  }
})();

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