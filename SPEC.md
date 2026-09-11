# SPEC.md

What to build. Read CLAUDE.md first, it governs everything here.

---

## Placeholders you must not invent

Three values do not exist yet. Define each once, at the top of the script file,
and reference the constant everywhere else. Never hardcode them inline.

```js
const AMAZON_HERO  = '#';   // Amazon.ae listing, 30 cup. Not yet live.
const AMAZON_TRIAL = '#';   // Amazon.ae listing, 12 cup. Not yet live.
const FORMSPREE_ID = '';    // Formspree form ID for the email signup.
```

While `AMAZON_HERO` is `'#'`, every buy button renders in a disabled state with
the label "Coming soon on Amazon.ae" and does not navigate. The moment a real
URL is pasted in, the buttons activate with the label "Buy on Amazon.ae". Build
that behaviour, do not leave dead links.

---

## Structure

One page, `index.html`, built as seven sections in this order. Plus three
standalone pages.

### 1. Navbar

Fixed to the top. Transparent over the hero on load. On scroll past 24px it
gains a glass surface: a translucent green background, a backdrop blur, and a
hairline bottom border. Transition it, do not snap it.

- Left: single line logo lockup, links to top
- Centre: How it works / The coffee / Stockists
- Right: primary button, Amazon CTA

Below 960px the centre and right collapse into a hamburger that opens a full
width sheet. Body scroll locks while the sheet is open and restores on close.

### 2. Hero

Full viewport height, `100svh`. Green ground.

- Stacked logo lockup, THE / DRIP / PACK. with the emerald full stop
- Headline: **POUR WAIT DRINK**. Set as the largest display type on the site,
  all caps, with generous letterspacing so the three words read as three beats
  rather than a sentence. No punctuation of any kind, not between the words and
  not at the end. The gaps carry the rhythm
- Sub line: Single serve pour over, 30 cups in a box
- Arabic descriptor beneath, in Sage, `dir="rtl"`
- Primary CTA, Amazon. Secondary CTA, scrolls to How it works
- Claim row across the foot of the hero, in place of a partner logo strip:
  SINGLE SERVE POUR OVER / 100% ARABICA / SPECIALTY GRADE / CUPPED ABOVE 80.
  Separated by thin Sage rules, wrapping on mobile.
- One image slot, right side on desktop, behind the type on mobile: the hero
  carton three quarter view

Entry animation: elements rise 18px and fade, staggered at 0s, 0.08s, 0.16s,
0.24s, 0.32s, 0.42s. All suppressed under `prefers-reduced-motion`.

### 3. How it works

Three steps, the brew method, verbatim from CLAUDE.md. Numbered, horizontal on
desktop, stacked on mobile. Arabic version beneath each step in Sage,
`dir="rtl"`.

One image slot: a sachet hooked over a cup.

### 4. The two packs

Side by side cards.

- **30 cups.** Two labels, "The box" and "Net 300g". Primary CTA.
- **12 cups.** Two labels, "Try it first" and "Net 120g". Secondary CTA.

These are short labels, so they take no full stop. See section 2 of CLAUDE.md,
which governs punctuation. An earlier version of this file wrote them as
"The box. Net 300g." That was wrong and contradicted CLAUDE.md.

No price, no per cup figure. One image slot per card.

### 5. Statement

Full width green band. REAL COFFEE NO MACHINE, set large, with a short emerald
rule beneath it. This is the only emerald rule on the site and the only place
this line appears.

The two locked lines each appear once and once only. POUR WAIT DRINK is the
hero headline. REAL COFFEE NO MACHINE is this band. Neither is repeated
anywhere else, including the footer, the meta tags and the share image.

Nothing else in this section. No body copy, no button.

### 6. The coffee

Short. Four lines maximum, drawn only from the approved claim set. State what
it is: 100% arabica, specialty grade, cupped above 80, roasted and packed in
the UAE. Do not expand beyond that.

One image slot: beans and grounds on the green ground.

### 7. Email signup

Single field, email only, plus a submit button. Posts to Formspree.

- Label and placeholder both present, label visually hidden is acceptable
- Client side validation on the email format before submit
- Inline success and error states, no alert boxes, no page reload
- Honeypot field for spam, hidden from screen readers
- One line beneath: We will email you when it is live. Nothing else.
- Links to the privacy policy

### 8. Footer

- Single line logo lockup
- Origin line, verbatim
- Contents block for both SKUs
- Links: Privacy, Terms
- Arabic descriptor
- Copyright line, The Drip Pack, Dubai, UAE

---

## Standalone pages

- `privacy.html` — real policy, not a stub. Must cover the analytics in use and
  the email signup, what is collected, why, how long it is kept, and how to
  request deletion. UAE and GDPR wording.
- `terms.html` — terms of use for a brochure site. Note explicitly that
  purchases are made on Amazon.ae under Amazon's terms, not here.
- `404.html` — branded, green ground, logo, one line, a link back to the
  homepage. Not a default GitHub page.

---

## The 20 launch points

All twenty are in scope. Build them, do not treat them as optional.

1. **Privacy policy** — `privacy.html`, as specified above.
2. **Terms page** — `terms.html`, as specified above.
3. **Clear CTA** — one primary action, Amazon. Present in the nav, the hero and
   both product cards. No competing primary actions.
4. **FAQ** — six questions, appended after section 6. Suggested: how it works,
   what is in the sachet, how many cups, where to buy, how to store it, does it
   need a machine. Answers within the approved claim set only. Mark up with
   FAQPage JSON-LD.
5. **robots.txt** — at the root. Allow all, and point to the sitemap.
6. **sitemap.xml** — at the root. Three pages, absolute URLs on
   https://thedrippack.com: the homepage, privacy and terms. `404.html` is
   deliberately excluded. It is served with an HTTP 404 status, so listing it
   in a sitemap only produces an error in Search Console. An earlier version of
   this file said all four pages. That was wrong.
7. **Custom 404** — `404.html`, as specified above.
8. **Alt text** — every image. Descriptive and specific, not "product image".
   Decorative images get `alt=""` and `aria-hidden="true"`.
9. **Analytics** — Cloudflare Web Analytics. Cookieless, so no consent banner is
   required, which is why it was chosen over Google Analytics. Place the
   snippet before `</body>`. Leave the token as a clearly marked constant.
10. **Meta titles** — unique per page. Homepage:
    `The Drip Pack. Single serve pour over coffee, UAE`. Under 60 characters.
11. **Meta description** — unique per page, 150 to 160 characters, drawn from
    approved copy only.
12. **Social share** — Open Graph and Twitter card tags on all four pages. A
    1200x630 share image built from the pack on the green ground, saved to
    `/images/og.png`. Mark it as a placeholder like every other image.
13. **Favicon** — an SVG favicon, the emerald full stop on the green ground.
    Plus a 180px apple touch icon PNG.
14. **Canonical URLs** — self referencing canonical on every page, absolute,
    https, no trailing slash, no www.
15. **Cookie consent** — not required, because analytics is cookieless and no
    other cookies are set. State this explicitly in the privacy policy so the
    absence of a banner is a documented decision rather than an oversight. Do
    not add a banner. If Google Analytics is ever swapped in, a banner becomes
    mandatory and the privacy policy must change with it.
16. **Mobile version** — mobile first. Test at 320, 375, 768, 1024 and 1440.
    Tap targets no smaller than 44px. No horizontal scroll at any width.
17. **Accessibility** — WCAG 2.1 AA. Semantic landmarks, one `h1` per page,
    logical heading order, visible focus states, keyboard operable nav and
    sheet, `prefers-reduced-motion` respected. Check contrast: Sage #A9B6A6 on
    Green #1A331E must be verified and the Sage darkened or the size raised if
    it fails. Report the ratios rather than assuming they pass.
18. **Test forms** — submit the email form end to end, confirm it reaches
    Formspree, and confirm the success and error states both render. Test an
    invalid address and an empty submit.
19. **Check broken links** — every internal anchor resolves, every external
    link opens correctly, no `href="#"` left except the documented Amazon
    placeholders above.
20. **Optimise performance** — target Lighthouse 90 or above on all four
    metrics. Images in WebP with correct `width` and `height` set to prevent
    layout shift, lazy loaded below the fold. Font preloaded. CSS and JS
    minified. No render blocking third party scripts.

---

## Definition of done

Do not open the pull request until all of these are true.

- All 20 points built
- Every image slot carries `data-placeholder="true"`
- No hardcoded hex outside the token block
- No em dash, no exclamation mark, anywhere in the repo
- Forest #2E4A3E appears nowhere
- Parcelle appears nowhere
- Emerald used exactly twice: the logo full stop, and the statement rule
- Contrast ratios reported in the pull request description, not assumed
- Lighthouse scores reported in the pull request description

---

## First task

Do not build yet. Read CLAUDE.md and this file, then reply with your plan: the
file list you intend to create, the section order, and any question where this
spec is ambiguous. Wait for approval before writing a single file.
