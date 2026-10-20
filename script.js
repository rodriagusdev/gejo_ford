/**
 * Grupo Gejo - Carrocería, Pintura & Styling Automotor
 * Interactive Script (First Iteration)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year in Footer
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // 2. Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  // Scroll to Top action
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 3. Mobile Navigation Menu
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // 4. Interactive Before/After Split Slider
  const sliderContainer = document.getElementById('beforeAfterSlider');
  const sliderHandle = document.getElementById('sliderHandle');

  if (sliderContainer && sliderHandle) {
    let isSliding = false;

    const updateSlider = (clientX) => {
      const rect = sliderContainer.getBoundingClientRect();
      let position = clientX - rect.left;

      if (position < 0) position = 0;
      if (position > rect.width) position = rect.width;

      const percentage = (position / rect.width) * 100;
      sliderHandle.style.left = `${percentage}%`;
      sliderHandle.style.transform = `translateX(-50%)`;
    };

    // Mouse Events
    sliderContainer.addEventListener('mousedown', (e) => {
      isSliding = true;
      updateSlider(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isSliding = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isSliding) return;
      updateSlider(e.clientX);
    });

    // Touch Events for Mobile
    sliderContainer.addEventListener('touchstart', (e) => {
      isSliding = true;
      updateSlider(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isSliding = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (!isSliding) return;
      updateSlider(e.touches[0].clientX);
    }, { passive: true });
  }

  // 5. WhatsApp Interactive Quote & Estimation Form
  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName').value.trim();
      const carModel = document.getElementById('carModel').value.trim();
      const carYear = document.getElementById('carYear').value.trim();
      const serviceType = document.getElementById('serviceType').value;
      const details = document.getElementById('damageDetails').value.trim();

      // Phone number for Luciano Gejo (2235634551 -> Argentina international prefix +54 9 223 5634551)
      const phoneNumber = '5492235634551';

      // Build structured message
      let message = `*CONSULTA / PRESUPUESTO - GRUPO GEJO*\n\n`;
      message += `👤 *Cliente:* ${name}\n`;
      message += `🚗 *Vehículo:* ${carModel} ${carYear ? `(${carYear})` : ''}\n`;
      message += `🔧 *Servicio requerido:* ${serviceType}\n`;
      if (details) {
        message += `📝 *Detalle del trabajo:* ${details}\n`;
      }
      message += `\n_Hola Luciano e Ignacio, quisiera coordinar un turno o presupuesto para mi auto. Muchas gracias!_`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');
    });
  }

  // 6. Smooth Scroll Reveal on Scroll (Intersection Observer)
  const cards = document.querySelectorAll('.service-card, .history-card, .showcase-card, .tech-card, .contact-hub-card, .brand-card');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(24px)';
      card.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      revealObserver.observe(card);
    });
  }
});
