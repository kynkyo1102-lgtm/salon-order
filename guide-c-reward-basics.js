/* Motion is progressive enhancement: content remains readable without JavaScript. */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) return;
  const network = document.querySelector('[data-reward-sequence]');
  const speeches = [...document.querySelectorAll('.reward-scroll-reveal')];
  if (!network && !speeches.length) return;
  document.documentElement.classList.add('reward-motion-ready');
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('reward-in-view');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  if (network) observer.observe(network);
  speeches.forEach(el => observer.observe(el));
})();
