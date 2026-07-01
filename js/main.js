/* =============================================================================
   Leapfrog Labs — behaviour
   -----------------------------------------------------------------------------
   Three small, independent enhancements. Everything degrades gracefully:
   if JS fails, content is still fully visible and usable.
     1. Scroll reveal      — fade elements in as they enter the viewport
     2. Card pointer glow   — spotlight that follows the cursor on service cards
     3. Footer year         — keep the copyright date current
============================================================================= */
(function () {
  'use strict';

  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. Scroll reveal -------------------------------------------------------
     Elements marked .reveal animate to .is-visible once, then stop observing.
     With reduced motion (or no IntersectionObserver) we just show everything. */
  function initReveal() {
    const items = document.querySelectorAll('.reveal');

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    // Small stagger so grouped elements cascade rather than pop together.
    items.forEach((el, i) => {
      el.style.transitionDelay = Math.min(i, 6) * 60 + 'ms';
      observer.observe(el);
    });
  }

  /* 2. Card pointer glow ---------------------------------------------------
     Feeds cursor position into CSS custom properties (--mx / --my) that the
     .service::after gradient reads. Skipped when motion is reduced. */
  function initCardGlow() {
    if (prefersReducedMotion) return;

    document.querySelectorAll('.service').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((event.clientX - rect.left) / rect.width) * 100 + '%');
        card.style.setProperty('--my', ((event.clientY - rect.top) / rect.height) * 100 + '%');
      });
    });
  }

  /* 3. Footer year --------------------------------------------------------- */
  function initYear() {
    const el = document.querySelector('[data-current-year]');
    if (el) el.textContent = new Date().getFullYear();
  }

  document.addEventListener('DOMContentLoaded', () => {
    initReveal();
    initCardGlow();
    initYear();
  });
})();
