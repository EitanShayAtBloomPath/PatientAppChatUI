// BloomPath Health — Main JavaScript

document.addEventListener('DOMContentLoaded', function() {

  // ===== Reduced Motion Guard =====
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ===== Mobile Navigation Toggle =====
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', function() {
      mobileToggle.classList.toggle('active');
      mobileNav.classList.toggle('active');

      const isExpanded = mobileNav.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close mobile nav when clicking a link
    const mobileNavLinks = mobileNav.querySelectorAll('a');
    mobileNavLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        mobileToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ===== Smooth Scroll for Anchor Links =====
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      if (href === '#' || href === '') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();

        const headerHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      }
    });
  });

  // ===== Navbar Scroll Behavior =====
  // Adds border + shadow on scroll (not color change)
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // ===== Close Mobile Nav on Escape Key =====
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
      mobileToggle.classList.remove('active');
      mobileNav.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileToggle.focus();
    }
  });

  // ===== Close Mobile Nav on Outside Click =====
  document.addEventListener('click', function(e) {
    if (mobileNav && mobileNav.classList.contains('active')) {
      if (!mobileNav.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // ===== Scroll Animations =====
  if (!prefersReducedMotion) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Elements to animate — expanded selector list
    const animateElements = document.querySelectorAll(
      '.stat-card, .step-card, .feature-item, .testimonial-card, ' +
      '.partner-metric, .program-phase, .trust-badge, .partner-feature-card, ' +
      '.leader-card'
    );

    animateElements.forEach(function(el) {
      // Calculate staggered delay based on position within parent
      const siblings = Array.from(el.parentElement.children);
      const index = siblings.indexOf(el);
      const delay = index * 80;

      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transitionDelay = delay + 'ms';

      observer.observe(el);
    });
  }

  // ===== Active Nav Link Highlighting =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length && navLinks.length) {
    const navObserverOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const navObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');
          navLinks.forEach(function(link) {
            const href = link.getAttribute('href');
            if (href === '#' + sectionId) {
              link.classList.add('nav-link--active');
            } else {
              link.classList.remove('nav-link--active');
            }
          });
        }
      });
    }, navObserverOptions);

    sections.forEach(function(section) {
      navObserver.observe(section);
    });
  }

  // ===== Dynamic Footer Year =====
  const footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

});
