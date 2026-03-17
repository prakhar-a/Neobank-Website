// FAQ Toggle
function toggleFAQ(button) {
  const item = button.closest('.faq-item');
  const answer = item.querySelector('.faq-answer');
  const isOpen = item.classList.contains('active');

  // Close all
  document.querySelectorAll('.faq-item').forEach(el => {
    el.classList.remove('active');
    el.querySelector('.faq-answer').classList.remove('open');
  });

  // Open clicked if it was closed
  if (!isOpen) {
    item.classList.add('active');
    answer.classList.add('open');
  }
}

// Form submissions
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const btn = form.querySelector('button[type="submit"]');
    const email = input.value.trim();
    if (!email) return;

    btn.textContent = '✓ You\'re on the list!';
    btn.style.background = 'linear-gradient(135deg, #4fd8a4, #22c55e)';
    btn.disabled = true;
    input.value = '';
    input.placeholder = 'Thanks! We\'ll be in touch.';
    input.disabled = true;
  });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.style.borderBottomColor = 'rgba(255,255,255,0.06)';
  } else {
    navbar.style.borderBottomColor = 'rgba(255,255,255,0.08)';
  }
});

// Animate elements on scroll
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.feature-card, .step-card, .security-card, .cb-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease';
  observer.observe(el);
});
