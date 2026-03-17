/* ════════════════════════════════════════════
   CASHI — Main Script
   Matches Plasma One interactions exactly
════════════════════════════════════════════ */

/* ─── Scroll observer: fade-up reveal ─── */
const soObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      soObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.so').forEach(el => soObserver.observe(el));

/* ─── Navbar: swap theme based on bg section ─── */
const navbar = document.getElementById('navbar');
const darkSections = document.querySelectorAll(
  '.rewards-section, .earn-section, .onboard-section, .security-section, .cta-section, .faq-section'
);
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navbar.classList.add('dark');
    }
  });
  // Check if any dark section is still intersecting
  const anyDark = [...darkSections].some(s => {
    const rect = s.getBoundingClientRect();
    return rect.top <= 56 && rect.bottom > 0;
  });
  if (!anyDark) navbar.classList.remove('dark');
}, { threshold: 0, rootMargin: `-56px 0px 0px 0px` });
darkSections.forEach(s => navObserver.observe(s));

/* ─── Parallax: hero landscape layers ─── */
const landBg  = document.getElementById('land-bg');
const landMid = document.getElementById('land-mid');
const landFg  = document.getElementById('land-fg');
const heroSection = document.querySelector('.hero');

function updateParallax() {
  if (!heroSection) return;
  const scrollY = window.scrollY;
  const heroH = heroSection.offsetHeight;
  const progress = Math.min(scrollY / heroH, 1);

  if (landBg)  landBg.style.transform  = `translateY(${progress * -60}px)`;
  if (landMid) landMid.style.transform = `translateY(${progress * -40}px)`;
  if (landFg)  landFg.style.transform  = `translateY(${progress * -20}px)`;
}

window.addEventListener('scroll', updateParallax, { passive: true });
updateParallax();

/* ─── Earn section: swap bg image when scrolled into ─── */
const earnSection = document.querySelector('.earn-section');
if (earnSection) {
  const earnObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        earnSection.classList.add('reveal');
      } else {
        earnSection.classList.remove('reveal');
      }
    });
  }, { threshold: 0.3 });
  earnObserver.observe(earnSection);
}

/* ─── Carousel: card section ─── */
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');
const items = document.querySelectorAll('.carousel-item');
let currentSlide = 0;

function goToSlide(n) {
  items[currentSlide].classList.remove('active');
  currentSlide = (n + items.length) % items.length;
  items[currentSlide].classList.add('active');
}

if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

/* ─── FAQ accordion ─── */
function toggleFAQ(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  // Close all
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  // Toggle clicked
  if (!isOpen) item.classList.add('open');
}

/* ─── Form submit handlers ─── */
function handleForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (!input.value) return;
    const btn = form.querySelector('button');
    btn.textContent = 'You\'re on the list!';
    btn.style.background = '#3a3a3a';
    input.value = '';
    input.disabled = true;
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = btn.dataset.original || 'Join the waitlist';
      btn.style.background = '';
      input.disabled = false;
      btn.disabled = false;
    }, 4000);
  });
}
handleForm('hero-form');
handleForm('cta-form');

/* ─── Stagger delays for feature items ─── */
document.querySelectorAll('.feature-item.so').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.07) + 's';
});
