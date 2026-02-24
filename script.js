(function () {
  'use strict';

  // Page load: enable body and hero entrance
  function onLoad() {
    requestAnimationFrame(function () {
      document.body.classList.add('loaded');
    });
  }
  if (document.readyState === 'complete') {
    onLoad();
  } else {
    window.addEventListener('load', onLoad);
  }
  setTimeout(onLoad, 1800);

  // Scroll progress bar
  var progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progressBar);

  var header = document.querySelector('.site-header');
  var lastScrollY = 0;
  var ticking = false;

  function updateScroll() {
    var y = window.scrollY || window.pageYOffset;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? Math.min((y / docHeight) * 100, 100) : 0;
    progressBar.style.width = pct + '%';
    if (header) {
      if (y > 24) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    }
    lastScrollY = y;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateScroll);
    }
  }, { passive: true });
  updateScroll();

  var menuToggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      var expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !expanded);
      nav.classList.toggle('is-open');
    });
  }

  // Stagger delay from data attribute or sibling index
  var animated = document.querySelectorAll('[data-animate]');
  animated.forEach(function (el) {
    var delay = el.getAttribute('data-animate-delay');
    if (delay !== null) {
      el.style.setProperty('--animate-delay', delay);
    } else {
      var parent = el.parentElement;
      var siblings = parent ? parent.querySelectorAll('[data-animate]') : [];
      var i = Array.prototype.indexOf.call(siblings, el);
      el.style.setProperty('--animate-delay', String(i));
    }
  });

  // Scroll-triggered animations (slightly earlier trigger for smoother feel)
  if (animated.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { rootMargin: '0px 0px -4% 0px', threshold: 0 });
    animated.forEach(function (el) { observer.observe(el); });
  } else {
    animated.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Parallax: page background layers move with scroll for seamless flow
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var pageBgGradient = document.querySelector('.page-bg-gradient');
  var pageBgPattern = document.querySelector('.page-bg-pattern');
  if ((pageBgGradient || pageBgPattern) && 'requestAnimationFrame' in window && !prefersReducedMotion) {
    var rate = 0.18;
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY || window.pageYOffset;
        var t = 'translate3d(0, ' + (-y * rate) + 'px, 0)';
        if (pageBgGradient) pageBgGradient.style.transform = t;
        if (pageBgPattern) pageBgPattern.style.transform = t;
        document.body.classList.toggle('is-scrolled', y > 60);
        ticking = false;
      });
    }, { passive: true });
  }

  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var label = btn.querySelector('span');
      var originalText = label ? label.textContent : btn.textContent;
      if (label) label.textContent = 'Sending…';
      else btn.textContent = 'Sending…';
      btn.disabled = true;
      setTimeout(function () {
        if (label) label.textContent = 'Message sent';
        else btn.textContent = 'Message sent';
        btn.disabled = false;
        form.reset();
        setTimeout(function () {
          if (label) label.textContent = originalText;
          else btn.textContent = originalText;
        }, 2000);
      }, 800);
    });
  }
})();
