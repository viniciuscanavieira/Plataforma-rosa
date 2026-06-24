/* Barra de progresso */
const bar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const max = document.body.scrollHeight - window.innerHeight;
  bar.style.width = (window.scrollY / max * 100) + '%';
}, { passive: true });

/* Nav scroll */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* Fade-in com IntersectionObserver */
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));

/* Grade auto-scroll suave */
const gradeScroll = document.querySelector('.grade-scroll');
if (gradeScroll && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const gradeItem = gradeScroll.querySelector('.grade-item');
  const itemHeight = gradeItem ? gradeItem.offsetHeight + 24 : 220;
  const maxScroll = () => gradeScroll.scrollHeight - gradeScroll.clientHeight;
  let autoScrollTimer = null;

  const scrollNext = () => {
    if (gradeScroll.scrollTop >= maxScroll() - 2) {
      gradeScroll.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      gradeScroll.scrollTo({ top: Math.min(gradeScroll.scrollTop + itemHeight, maxScroll()), behavior: 'smooth' });
    }
  };

  const startAutoScroll = () => {
    if (autoScrollTimer) return;
    autoScrollTimer = setInterval(scrollNext, 4200);
  };

  const stopAutoScroll = () => {
    if (autoScrollTimer) {
      clearInterval(autoScrollTimer);
      autoScrollTimer = null;
    }
  };

  gradeScroll.addEventListener('mouseenter', stopAutoScroll, { passive: true });
  gradeScroll.addEventListener('wheel', stopAutoScroll, { passive: true });
  gradeScroll.addEventListener('touchstart', stopAutoScroll, { passive: true });
  gradeScroll.addEventListener('mouseleave', startAutoScroll, { passive: true });

  startAutoScroll();
}


