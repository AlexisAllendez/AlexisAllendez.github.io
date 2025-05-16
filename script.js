// script.js

document.addEventListener('DOMContentLoaded', () => {
  // Carrusel de testimonios
  const testimonials = document.querySelectorAll('.testimonial');
  let current = 0;

  function showTestimonial(index) {
    testimonials.forEach((t, i) => {
      t.style.display = i === index ? 'block' : 'none';
    });
  }

  function nextTestimonial() {
    current = (current + 1) % testimonials.length;
    showTestimonial(current);
  }

  if (testimonials.length > 0) {
    showTestimonial(current);
    setInterval(nextTestimonial, 5000);
  }

  // Manejo del formulario de contacto
  const form = document.querySelector('form');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('input[name="name"]').value;
      const email = form.querySelector('input[name="email"]').value;
      const message = form.querySelector('textarea[name="message"]').value;

      if (!name || !email || !message) {
        alert('Por favor, completá todos los campos.');
        return;
      }

      alert('¡Gracias por tu mensaje, ' + name + '! Te responderé pronto.');
      form.reset();
    });
  }

  // Menú hamburguesa
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('nav');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Scroll suave para navegación
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      if (window.innerWidth <= 768) {
        navLinks.classList.remove('open');
      }
    });
  });
});
