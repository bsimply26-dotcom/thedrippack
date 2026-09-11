/* ==========================================================================
   The Drip Pack
   One script. Vanilla, no dependencies, no build step.
   ========================================================================== */

/* ==========================================================================
   THE TWO SWITCHES

   These three values are the only edits needed to take the site live. Paste
   into the constants below and nothing else anywhere in the repo changes. Do
   not hardcode any of them inline, and do not edit the HTML to match.

   ---------------------------------------------------------------------------
   SWITCH ONE, the buy buttons. AMAZON_HERO and AMAZON_TRIAL.

     Paste  the full Amazon.ae product URL, in quotes, including https
     Format 'https://www.amazon.ae/dp/XXXXXXXXXX'
     Sets   AMAZON_HERO  is the 30 cup listing
            AMAZON_TRIAL is the 12 cup listing

   While a value is '#' the five buy controls, in the nav, the mobile sheet,
   the hero and both pack cards, render disabled and labelled
   "Coming soon on Amazon.ae", stay reachable by keyboard, and do not navigate.

   The moment a real URL is pasted in, every control fed by that constant
   becomes a live link labelled "Buy on Amazon.ae", opening in a new tab with
   rel="noopener". Filling only one of the two switches only that listing.

   ---------------------------------------------------------------------------
   SWITCH TWO, the email signup. FORMSPREE_ID.

     Paste  the form ID alone, in quotes, not the whole endpoint
     Format 'xabcdefg', the last path segment of https://formspree.io/f/xabcdefg

   While it is '' the form still validates the address and still reports
   errors, but posts nothing and answers "Signup opens soon", so no submission
   is ever silently lost.

   The moment an ID is pasted in, the same form posts to
   https://formspree.io/f/<ID> and switches to the live states: "Sending",
   then "Thank you. We will be in touch" or "That did not send. Please try
   again". No markup change, no endpoint written anywhere else.
   ========================================================================== */

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

/* Motion. The three beats occupy 0 to 1400ms, which the CSS delays match. */
const BEAT_GAP = 450;      // ms between POUR, WAIT and DRINK
const CHILD_STAGGER = 80;  // ms between revealed children
const REVEAL_AT = 0.15;    // fraction of a section visible before it reveals

/* Frame to step. The first two frames both belong to step one. */
const FRAME_TO_STEP = [0, 0, 1, 2];

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasObserver = ('IntersectionObserver' in window);

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
   The three beats.
   The markup holds the line as one unsplit string, so the copy stays verbatim
   and greppable. The words are wrapped here at runtime, which also means that
   without this script the line simply renders as plain text.
   -------------------------------------------------------------------------- */

function initBeats() {
  const line = document.querySelector('.hero__headline');
  if (line === null) return;

  const words = line.textContent.trim().split(/\s+/);
  line.textContent = '';

  words.forEach(function (word, index) {
    const beat = document.createElement('span');
    beat.className = 'beat';
    beat.style.transitionDelay = (index * BEAT_GAP) + 'ms';
    beat.textContent = word;
    line.appendChild(beat);
  });
}

/* --------------------------------------------------------------------------
   Scroll reveal.
   Sections rise and fade once, never replaying. Children stagger. Targets are
   filtered so a nested match never animates inside an animating parent.
   -------------------------------------------------------------------------- */

const REVEAL_WITHIN = [
  '.section__title', '.statement__line', '.step', '.pack', '.facts li',
  '.faq__item', '.signup__form', '.signup__note', '.brew', '.strip',
  '.wrap--split > .slot', '.foot__logo', '.foot__col', '.foot__copy'
].join(', ');

function initReveal() {
  if (prefersReducedMotion || hasObserver === false) return;

  const blocks = document.querySelectorAll('main > section:not(.hero), .foot');

  blocks.forEach(function (block) {
    const all = Array.from(block.querySelectorAll(REVEAL_WITHIN));

    /* Drop any target that sits inside another target. */
    const targets = all.filter(function (el) {
      return all.some(function (other) {
        if (other === el) return false;
        return other.contains(el);
      }) === false;
    });

    if (targets.length === 0) return;
    targets.forEach(function (el) { el.classList.add('reveal'); });

    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting === false) return;
        targets.forEach(function (el, index) {
          el.style.transitionDelay = (index * CHILD_STAGGER) + 'ms';
          el.classList.add('is-in');
        });
        obs.disconnect();
      });
    }, { threshold: REVEAL_AT });

    observer.observe(block);
  });
}

/* --------------------------------------------------------------------------
   The emerald rule under the statement draws left to right on entry.
   -------------------------------------------------------------------------- */

function initStatementRule() {
  const rule = document.querySelector('.statement__rule');
  if (rule === null) return;
  if (prefersReducedMotion || hasObserver === false) return;

  const observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting === false) return;
      rule.classList.add('is-in');
      obs.disconnect();
    });
  }, { threshold: 0.6 });

  observer.observe(rule.closest('.statement'));
}

/* --------------------------------------------------------------------------
   The brew sequence.
   Four frames cross fade against the section's progress through the viewport.
   The scroll handler is rAF throttled and is only attached while the section
   is on screen. The frames are warmed one viewport before they are needed.
   -------------------------------------------------------------------------- */

function initBrew() {
  const brew = document.getElementById('brew');
  if (brew === null) return;

  const frames = Array.from(brew.querySelectorAll('.brew__frame'));
  const steps = Array.from(document.querySelectorAll('#how .step'));
  if (frames.length === 0) return;

  /* Reduced motion: the CSS shows the pour frame alone and nothing scrubs. */
  if (prefersReducedMotion) {
    if (steps.length > 1) steps[1].classList.add('is-active');
    return;
  }

  if (hasObserver === false) {
    if (steps.length > 0) steps[0].classList.add('is-active');
    return;
  }

  let ticking = false;
  let attached = false;

  function progress() {
    const box = brew.getBoundingClientRect();
    const viewport = window.innerHeight;
    const total = box.height + viewport;
    if (total === 0) return 0;
    return Math.min(1, Math.max(0, (viewport - box.top) / total));
  }

  function paint() {
    ticking = false;
    const point = progress() * (frames.length - 1);
    const index = Math.min(frames.length - 2, Math.floor(point));
    const blend = point - index;

    frames.forEach(function (frame, n) {
      let value = 0;
      if (n === index) value = 1 - blend;
      else if (n === index + 1) value = blend;
      frame.style.opacity = String(value);
    });

    const active = FRAME_TO_STEP[Math.round(point)];
    steps.forEach(function (step, n) {
      step.classList.toggle('is-active', n === active);
    });
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(paint);
  }

  const scrubber = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && attached === false) {
        attached = true;
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        paint();
        return;
      }
      if (entry.isIntersecting === false && attached) {
        attached = false;
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      }
    });
  });

  scrubber.observe(brew);

  /* Warm all four while the section is still one viewport away. */
  const warmer = new IntersectionObserver(function (entries, obs) {
    if (entries[0].isIntersecting === false) return;
    frames.forEach(function (frame) {
      frame.loading = 'eager';
      const preload = new Image();
      preload.src = frame.currentSrc || frame.src;
    });
    obs.disconnect();
  }, { rootMargin: '100% 0px' });

  warmer.observe(brew);
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
initBeats();
initEntry();
initReveal();
initStatementRule();
initBrew();
initSignup();
initYear();
