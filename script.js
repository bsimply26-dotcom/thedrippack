/* ==========================================================================
   The Drip Pack
   One script. Vanilla, no dependencies, no build step.
   ========================================================================== */

/* --------------------------------------------------------------------------
   Placeholders. Define each once, here, and reference the constant everywhere.
   Never hardcode any of these three values inline.
   -------------------------------------------------------------------------- */

const AMAZON_HERO  = '#';   // Amazon.ae listing, 30 cup. Not yet live.
const AMAZON_TRIAL = '#';   // Amazon.ae listing, 12 cup. Not yet live.
const FORMSPREE_ID = '';    // Formspree form ID for the email signup.

/* Labels. The buy buttons carry the first until a real URL lands above. */
const LABEL_PENDING = 'Coming soon on Amazon.ae';
const LABEL_LIVE    = 'Buy on Amazon.ae';

/* Signup copy. Mirrors the buy button rule: no live endpoint, no dead post. */
const SIGNUP_PENDING = 'Signup opens soon';
const SIGNUP_INVALID = 'Enter a valid email address';
const SIGNUP_EMPTY   = 'Enter your email address';
const SIGNUP_SENDING = 'Sending';
const SIGNUP_OK      = 'Thank you. We will be in touch';
const SIGNUP_ERROR   = 'That did not send. Please try again';

const MOBILE_BREAKPOINT = 960;
const STUCK_AFTER = 24;

/* A value is a placeholder while it is empty or still the hash. */
function isPlaceholder(value) {
  return value === '' || value === '#';
}

/* --------------------------------------------------------------------------
   Buy buttons.
   While the listing URL is a placeholder the control renders disabled and does
   not navigate. The moment a real URL is pasted into the constant above, the
   control is replaced by a live anchor carrying the live label.
   -------------------------------------------------------------------------- */

function activateBuyButtons() {
  const buttons = document.querySelectorAll('[data-amazon]');

  buttons.forEach(function (button) {
    const key = button.getAttribute('data-amazon');
    const url = key === 'trial' ? AMAZON_TRIAL : AMAZON_HERO;

    if (isPlaceholder(url)) {
      button.textContent = LABEL_PENDING;
      button.setAttribute('aria-disabled', 'true');
      return;
    }

    const link = document.createElement('a');
    link.className = button.className;
    link.setAttribute('data-amazon', key);
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = LABEL_LIVE;
    button.replaceWith(link);
  });
}

/* --------------------------------------------------------------------------
   Navbar. Transparent over the hero, glass past 24px of scroll.
   -------------------------------------------------------------------------- */

function initNavSurface() {
  const nav = document.getElementById('nav');
  if (nav === null) return;

  let ticking = false;

  function apply() {
    nav.classList.toggle('is-stuck', window.scrollY > STUCK_AFTER);
    ticking = false;
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(apply);
  }

  apply();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* --------------------------------------------------------------------------
   Mobile sheet. Body scroll locks while open and restores on close.
   Escape closes it and returns focus to the toggle.
   -------------------------------------------------------------------------- */

function initNavSheet() {
  const toggle = document.getElementById('navToggle');
  const sheet = document.getElementById('navSheet');
  if (toggle === null || sheet === null) return;

  let scrollY = 0;

  function isOpen() {
    return toggle.getAttribute('aria-expanded') === 'true';
  }

  function open() {
    scrollY = window.scrollY;
    sheet.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('is-locked');
    document.body.style.top = '-' + scrollY + 'px';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';

    const first = sheet.querySelector('a, button');
    if (first === null) return;
    first.focus();
  }

  function close(returnFocus) {
    sheet.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-locked');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollY);
    if (returnFocus === true) toggle.focus();
  }

  toggle.addEventListener('click', function () {
    if (isOpen()) {
      close(true);
      return;
    }
    open();
  });

  sheet.addEventListener('click', function (event) {
    if (event.target.closest('a, button') === null) return;
    close(false);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && isOpen()) close(true);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= MOBILE_BREAKPOINT && isOpen()) close(false);
  });
}

/* --------------------------------------------------------------------------
   Entry animation. The CSS owns the stagger and the reduced motion rule,
   this only flips the switch once the page is ready to paint.
   -------------------------------------------------------------------------- */

function initEntry() {
  window.requestAnimationFrame(function () {
    window.requestAnimationFrame(function () {
      document.body.classList.add('is-ready');
    });
  });
}

/* --------------------------------------------------------------------------
   Email signup. Client side validation, inline states, no alert, no reload.
   -------------------------------------------------------------------------- */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function initSignup() {
  const form = document.getElementById('signupForm');
  const field = document.getElementById('email');
  const status = document.getElementById('signupStatus');
  if (form === null || field === null || status === null) return;

  const submit = form.querySelector('button[type="submit"]');

  function say(message, state) {
    status.textContent = message;
    status.setAttribute('data-state', state);
  }

  function markInvalid(message) {
    field.setAttribute('aria-invalid', 'true');
    say(message, 'error');
    field.focus();
  }

  function clearInvalid() {
    field.removeAttribute('aria-invalid');
  }

  function lockSubmit(locked) {
    if (submit === null) return;
    submit.disabled = locked;
  }

  field.addEventListener('input', function () {
    if (field.getAttribute('aria-invalid') === 'true') {
      clearInvalid();
      say('', 'idle');
    }
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const value = field.value.trim();

    if (value.length === 0) {
      markInvalid(SIGNUP_EMPTY);
      return;
    }

    if (EMAIL_PATTERN.test(value) === false) {
      markInvalid(SIGNUP_INVALID);
      return;
    }

    clearInvalid();

    /* No endpoint yet, so nothing is posted and nothing is lost. */
    if (isPlaceholder(FORMSPREE_ID)) {
      say(SIGNUP_PENDING, 'ok');
      return;
    }

    say(SIGNUP_SENDING, 'idle');
    lockSubmit(true);

    const payload = new FormData(form);

    window.fetch('https://formspree.io/f/' + FORMSPREE_ID, {
      method: 'POST',
      body: payload,
      headers: { Accept: 'application/json' }
    }).then(function (response) {
      if (response.ok) {
        form.reset();
        say(SIGNUP_OK, 'ok');
        return;
      }
      say(SIGNUP_ERROR, 'error');
    }).catch(function () {
      say(SIGNUP_ERROR, 'error');
    }).then(function () {
      lockSubmit(false);
    });
  });
}

/* --------------------------------------------------------------------------
   Footer year.
   -------------------------------------------------------------------------- */

function initYear() {
  const year = document.getElementById('year');
  if (year === null) return;
  year.textContent = String(new Date().getFullYear());
}

/* --------------------------------------------------------------------------
   Boot.
   -------------------------------------------------------------------------- */

activateBuyButtons();
initNavSurface();
initNavSheet();
initEntry();
initSignup();
initYear();
