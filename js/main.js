/* The Deck Repair Wizard – Cincinnati :: shared interactions */
(function () {
  'use strict';

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      var expanded = links.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.parentElement.classList.toggle('open');
    });
  });

  // Quote / contact form — submits to contact.php in the background (AJAX).
  // If JavaScript is unavailable, the form still POSTs normally to contact.php.
  document.querySelectorAll('form[data-quote-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = form.querySelector('.form-result');
      var btn = form.querySelector('button[type="submit"]');
      if (note) { note.textContent = 'Sending…'; note.style.color = ''; }
      if (btn) { btn.disabled = true; }

      var action = form.getAttribute('action') || 'contact.php';
      fetch(action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (note) {
            note.textContent = data.message || (data.ok ? 'Thanks! Your request has been sent.' : 'Something went wrong.');
            note.style.color = data.ok ? '#2F5233' : '#a32020';
          }
          if (data.ok) { form.reset(); }
          if (btn) { btn.disabled = false; }
        })
        .catch(function () {
          if (note) {
            note.textContent = 'Sorry, something went wrong. Please call us at (513) 540-4937.';
            note.style.color = '#a32020';
          }
          if (btn) { btn.disabled = false; }
        });
    });
  });

  // Set current year in footers
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = '2026';
  });
})();
