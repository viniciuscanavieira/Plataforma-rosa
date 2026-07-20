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

/* Grade carousel controls */
const gradeScroll = document.querySelector('.grade-scroll');
const gradePrev = document.querySelector('.carousel-prev');
const gradeNext = document.querySelector('.carousel-next');

if (gradeScroll) {
  const getGradeScrollDistance = () => {
    const firstItem = gradeScroll.querySelector('.grade-item');
    if (!firstItem) return 320;
    const itemWidth = firstItem.offsetWidth;
    const gap = 18;
    const viewportWidth = gradeScroll.clientWidth;
    const itemsPerView = Math.max(1, Math.floor(viewportWidth / (itemWidth + gap)));
    return itemsPerView * (itemWidth + gap);
  };

  const scrollLeft = () => {
    gradeScroll.scrollBy({ left: -getGradeScrollDistance(), behavior: 'smooth' });
  };

  const scrollRight = () => {
    gradeScroll.scrollBy({ left: getGradeScrollDistance(), behavior: 'smooth' });
  };

  gradePrev?.addEventListener('click', scrollLeft);
  gradeNext?.addEventListener('click', scrollRight);

  gradeScroll.addEventListener('wheel', (event) => {
    if (Math.abs(event.deltaX) < Math.abs(event.deltaY)) {
      gradeScroll.scrollBy({ left: event.deltaY, behavior: 'smooth' });
      event.preventDefault();
    }
  }, { passive: false });
}

/* Prof carousel controls */
const profScroll = document.querySelector('.prof-scroll');
const profPrev = document.querySelector('.prof-prev');
const profNext = document.querySelector('.prof-next');

if (profScroll) {
  const getProfScrollDistance = () => {
    const firstItem = profScroll.querySelector('.prof-item');
    if (!firstItem) return 280;
    const itemWidth = firstItem.offsetWidth;
    const gap = 18;
    const viewportWidth = profScroll.clientWidth;
    const itemsPerView = Math.max(1, Math.floor(viewportWidth / (itemWidth + gap)));
    return itemsPerView * (itemWidth + gap);
  };

  const profScrollLeft = () => {
    profScroll.scrollBy({ left: -getProfScrollDistance(), behavior: 'smooth' });
  };

  const profScrollRight = () => {
    profScroll.scrollBy({ left: getProfScrollDistance(), behavior: 'smooth' });
  };

  profPrev?.addEventListener('click', profScrollLeft);
  profNext?.addEventListener('click', profScrollRight);
}


