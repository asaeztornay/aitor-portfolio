(() => {
  'use strict';

  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#site-nav');
  const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
  const revealItems = [...document.querySelectorAll('.reveal')];
  const timelineShell = document.querySelector('[data-timeline]');
  const timelineItems = [...document.querySelectorAll('.timeline-item')];
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const projectGroups = [...document.querySelectorAll('[data-project-group]')];
  const filterStatus = document.querySelector('#filter-status');
  const lightbox = document.querySelector('#lightbox');
  const lightboxImage = document.querySelector('#lightbox-image');
  const lightboxCaption = document.querySelector('#lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let lastTrigger = null;
  let scrollTicking = false;

  const setNavOpen = (open) => {
    if (!navToggle || !nav) return;
    navToggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  };

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      setNavOpen(navToggle.getAttribute('aria-expanded') !== 'true');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => setNavOpen(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        setNavOpen(false);
        navToggle.focus();
      }
    });

    document.addEventListener('click', (event) => {
      if (
        nav.classList.contains('is-open') &&
        !nav.contains(event.target) &&
        !navToggle.contains(event.target)
      ) {
        setNavOpen(false);
      }
    });

    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    desktopQuery.addEventListener('change', (event) => {
      if (event.matches) setNavOpen(false);
    });
  }

  const showAllReveals = () => {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  };

  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    showAllReveals();
  }

  const setActiveNav = (section) => {
    navLinks.forEach((link) => {
      if (link.getAttribute('href') === `#${section.id}`) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveNav(entry.target);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => navObserver.observe(section));
  } else {
    const updateActiveNav = () => {
      const marker = window.innerHeight * 0.35;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current = sections[0];

      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= marker) current = section;
      });

      if (atBottom) current = sections[sections.length - 1];
      if (current) setActiveNav(current);
    };

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();
  }

  const updateTimeline = () => {
    if (!timelineShell) return;

    if (reducedMotion.matches) {
      timelineShell.style.setProperty('--timeline-progress', '1');
      timelineItems.forEach((item) => item.classList.add('is-active'));
      return;
    }

    const rect = timelineShell.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.75 - rect.top) / rect.height));
    timelineShell.style.setProperty('--timeline-progress', progress.toFixed(3));

    timelineItems.forEach((item) => {
      const itemRect = item.getBoundingClientRect();
      item.classList.toggle('is-active', itemRect.top < window.innerHeight * 0.7);
    });
  };

  const onScroll = () => {
    if (scrollTicking) return;
    scrollTicking = true;

    window.requestAnimationFrame(() => {
      if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
      if (sections.length && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        setActiveNav(sections[sections.length - 1]);
      }
      updateTimeline();
      scrollTicking = false;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  reducedMotion.addEventListener('change', updateTimeline);
  onScroll();

  const applyFilter = (filter) => {
    let visibleCount = 0;

    projectGroups.forEach((group) => {
      const matches = filter === 'all' || group.dataset.projectGroup === filter;
      group.hidden = !matches;
      if (matches) visibleCount += group.querySelectorAll('.project-card').length;
    });

    filterButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.filter === filter));
    });

    if (filterStatus) {
      filterStatus.textContent = `Showing ${visibleCount} ${visibleCount === 1 ? 'project' : 'projects'}`;
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => applyFilter(button.dataset.filter));
  });

  if (filterButtons.length) applyFilter('all');

  const closeLightbox = () => {
    if (lightbox && lightbox.open) lightbox.close();
  };

  document.querySelectorAll('[data-lightbox]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      if (!lightbox || !lightboxImage) return;

      lastTrigger = trigger;
      lightboxImage.src = trigger.dataset.full;
      lightboxImage.alt = trigger.dataset.alt || '';
      if (lightboxCaption) lightboxCaption.textContent = trigger.dataset.caption || '';

      if (!lightbox.open) lightbox.showModal();
      document.body.classList.add('lightbox-open');
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

  if (lightbox) {
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });

    lightbox.addEventListener('close', () => {
      document.body.classList.remove('lightbox-open');
      if (lastTrigger) lastTrigger.focus();
    });
  }

  const videoDialog = document.querySelector('#video-dialog');
  const videoFrame = document.querySelector('#video-frame');
  const videoTitle = document.querySelector('#video-title');
  const videoClose = document.querySelector('#video-dialog .lightbox-close');
  let lastVideoTrigger = null;

  const closeVideo = () => {
    if (videoDialog && videoDialog.open) videoDialog.close();
  };

  document.querySelectorAll('[data-video]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      if (!videoDialog || !videoFrame) return;

      lastVideoTrigger = trigger;
      videoFrame.innerHTML = '';

      const iframe = document.createElement('iframe');
      iframe.src = trigger.dataset.video;
      iframe.title = trigger.dataset.videoTitle || 'K2022 video';
      iframe.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.setAttribute('allowfullscreen', '');
      videoFrame.appendChild(iframe);

      if (videoTitle && trigger.dataset.videoTitle) {
        videoTitle.textContent = trigger.dataset.videoTitle;
      }

      if (!videoDialog.open) videoDialog.showModal();
      document.body.classList.add('lightbox-open');
    });
  });

  if (videoClose) videoClose.addEventListener('click', closeVideo);

  if (videoDialog) {
    videoDialog.addEventListener('click', (event) => {
      if (event.target === videoDialog) closeVideo();
    });

    videoDialog.addEventListener('close', () => {
      if (videoFrame) videoFrame.innerHTML = '';
      document.body.classList.remove('lightbox-open');
      if (lastVideoTrigger) lastVideoTrigger.focus();
    });
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
