/* Reveal each step when the reader reaches it, not on a fixed page-wide timer. */
(() => {
  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const network = document.querySelector('[data-reward-sequence]');
  const speeches = [...document.querySelectorAll('.reward-scroll-reveal')];
  const members = network ? [...network.querySelectorAll('.reward-member-points')] : [];
  const branches = network ? [...network.querySelectorAll(':scope > .reward-simple-branch')] : [];
  const stages = network ? [branches[1],network.querySelector('.reward-simple-month'),branches[2],network.querySelector('.reward-simple-result')].filter(Boolean) : [];
  const targets = [...members,...stages,...speeches];
  if (!targets.length) return;
  document.documentElement.classList.add('reward-motion-scroll');
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const el = entry.target;
      if (members.includes(el)) {
        const i = members.indexOf(el);
        el.style.setProperty('--reward-stagger', (i * 0.9) + 's');
      }
      el.classList.add('reward-step-visible');
      observer.unobserve(el);
    }
  }, { threshold: 0.18, rootMargin: '0px 0px -135px 0px' });
  targets.forEach(el => observer.observe(el));
})();
