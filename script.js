/* ==========================================================================
   The Drip Pack
   One script. Vanilla, no dependencies, no build step.
   ========================================================================== */

/* ==========================================================================
   THE SWITCH

   These two values are the only edits needed to take the site live. Paste into
   the constants below and nothing else anywhere in the repo changes. Do not
   hardcode either of them inline, and do not edit the HTML to match.

     Paste  the full Amazon.ae product URL, in quotes, including https
     Format 'https://www.amazon.ae/dp/XXXXXXXXXX'
     Sets   AMAZON_HERO  is the 30 cup listing
            AMAZON_TRIAL is the 12 cup listing

   While a value is '#' the five buy controls, in the nav, the mobile sheet,
   the hero and both pack tiles, render disabled and labelled
   "Coming soon on Amazon.ae", stay reachable by keyboard, and do not navigate.

   The moment a real URL is pasted in, every control fed by that constant
   becomes a live link labelled "Buy on Amazon.ae", opening in a new tab with
   rel="noopener". Filling only one of the two switches only that listing.

   There is no second switch. The site collects nothing, so there is no form,
   no endpoint and no address to configure.
   ========================================================================== */

const AMAZON_HERO  = '#';   // Amazon.ae listing, 30 cup. Not yet live.
const AMAZON_TRIAL = '#';   // Amazon.ae listing, 12 cup. Not yet live.

/* Labels. The buy buttons carry the first until a real URL lands above. */
const LABEL_PENDING = 'Coming soon on Amazon.ae';
const LABEL_LIVE    = 'Buy on Amazon.ae';

const MOBILE_BREAKPOINT = 960;
const STUCK_AFTER = 24;

/* Motion. The three beats occupy 0 to 1400ms, which the CSS delays match. */
const BEAT_GAP = 450;      // ms between POUR, WAIT and DRINK
const CHILD_STAGGER = 80;  // ms between revealed children
const REVEAL_AT = 0.15;    // fraction of a section visible before it reveals

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
  const nav = document.getElementById('nav');
  if (toggle === null || sheet === null) return;

  let scrollY = 0;

  /* The sheet is Bone with Ink type, so the bar above it has to carry the same
     surface while it is open. Without this the bar stays transparent with Bone
     type over the photograph and the two read as separate objects. */
  function surface(open) {
    if (nav === null) return;
    nav.classList.toggle('is-sheet', open);
  }

  function isOpen() {
    return toggle.getAttribute('aria-expanded') === 'true';
  }

  function open() {
    scrollY = window.scrollY;
    sheet.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    surface(true);
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
    surface(false);
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
  '.section__title', '.statement__line', '.feature', '.step', '.pack__body',
  '.why li', '.facts li', '.faq__item',
  '.foot__logo', '.foot__origin', '.foot__col', '.foot__end'
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
initYear();
