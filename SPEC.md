# SPEC.md

What to build. Read CLAUDE.md first, it governs everything here.

---

## Placeholders you must not invent

Two values do not exist yet. Define each once, at the top of the script file,
and reference the constant everywhere else. Never hardcode them inline.

```js
const AMAZON_HERO  = '#';   // Amazon.ae listing, 30 cup. Not yet live.
const AMAZON_TRIAL = '#';   // Amazon.ae listing, 12 cup. Not yet live.
```

While `AMAZON_HERO` is `'#'`, every buy button renders in a disabled state with
the label "Coming soon on Amazon.ae" and does not navigate. The moment a real
URL is pasted in, the buttons activate with the label "Buy on Amazon.ae". Build
that behaviour, do not leave dead links.

---

## Structure

One page, `index.html`, built as eleven blocks in this order. Plus three
standalone pages.

The page is image led. The type is small and quiet and sits beneath or over a
photograph as a label. There
are no large headings floating above empty space. Section labels are 28px Bold
sitting directly above their content, body is 17px Regular, and the hero
headline is the only element on the page set large. One loud thing, everything
else quiet.

No borders, no card backgrounds, no hairlines, no shadows. The edge of a
photograph is the only edge on the page, and a button is a filled pill rather
than an outlined one. Four photographs carry the whole page, and their slots are
fixed in section 8 of CLAUDE.md.

One left margin for the whole page. Every section label and every block of type
starts on the same left edge, and nothing is pushed to the far right of the
screen. Verify it by measuring, not by eye: read the left edge of every block on
the page and assert there is exactly one value.

One band between blocks, 96px on desktop and 64px on mobile, and the band sits
once between two blocks rather than twice. Sections carry no padding of their
own; a single margin separates each from the next. An earlier version gave every
section a full band top and bottom, which put 192px between every pair of blocks
down the whole page rather than 96px.

Verify it by measuring, not by eye: read the gap between the last painted thing
in each block and the first painted thing in the next, and assert every one
equals the band. Two readings need care. The statement band's own padding is the
height of the green rather than a gap, so measure to its edge, not to the line
inside it. The footer logo carries a negative margin that offsets its padding,
so its box starts a padding short of the band while its letterform lands on
it.

### 1. Navbar

Fixed to the top. Transparent over the hero photograph with Bone type, because
the hero is now a dark image rather than a flat ground. On scroll past 24px it
gains a translucent Bone glass surface with a backdrop blur, and the type
switches to Ink.

Snap that switch, do not transition it. Both properties move on the same class
with no transition on either, so the bar is never caught halfway with Ink type
on a dark photograph or Bone type on a Bone surface. An earlier version of this
file said to transition it and not snap it. That was written when the hero was
a flat green ground and the type colour never changed. It is now the opposite
instruction.

While the bar is transparent it carries its own top fade, because the steam in
the hero photograph runs to near white and Bone type over it measures 1.18:1
without one. The fade belongs to the bar rather than to the image: it is the
height of the bar plus a little, it clears completely below that, and it is gone
the instant the glass surface arrives.

- Left: single line logo lockup, links to top
- Centre: How it works / Why this / The packs / FAQ
- Right: the buy control, Amazon

No hairline bottom border. Nothing on this page carries one.

Below 960px the centre and right collapse into a hamburger that opens a full
width sheet. Body scroll locks while the sheet is open and restores on close.
While the sheet is open the bar takes the glass surface too, otherwise the
transparent bar and the Bone sheet read as two separate objects.

### 2. Hero

The photograph is the section, not an image inside it. `brew-pour.webp` runs
full bleed, edge to edge, at 80vh. Not more: the claim row beneath has to be
visible at the fold, so the top padding is nav clearance only rather than a full
band, which would push the section past 80vh on a short viewport.

The four elements are one tight left aligned stack, not four positions. They
share the page's left margin and sit a few pixels apart, so they read as a
single group over the lower left corner.

- POUR WAIT DRINK set over the photograph in Bone, positioned lower left with
  generous margin. The largest display type on the site and the only large type
  on it. All caps, tracked tight at -0.02em, set to `min-content` so the three
  words stack as three beats rather than running as a sentence. No punctuation
  of any kind, not between the words and not at the end. This is the page `h1`
- Sub line beneath, small and quiet: Single serve pour over, 30 cups in a box
- Arabic descriptor beneath that, `dir="rtl"`, same size, in Bone
- The buy control beneath those. One control, not two. There is no secondary
  button in the hero
- No logo lockup. The nav carries the single line lockup over the photograph,
  which is what keeps the mark above the fold. See section 5 of CLAUDE.md

No scrim across the whole image. The type is held by a gradient anchored to the
bottom left corner, and the pour, the kettle and the top right of the frame stay
untouched.

That gradient is built from two axes rather than one diagonal, a rise from the
foot and a run from the left edge, each clear well before the middle. This is
not a taste decision. A single corner to corner gradient either leaves the
headline sitting on lit paper at 1.23:1 or has to be pushed so far that it
flattens the whole frame. Its strengths are the measured minimum that holds Bone
above 4.5:1 over the brightest pixel the type actually sits on. If the hero
photograph is ever replaced, measure again rather than trusting these numbers:
they are specific to where the filter and the steam fall in this frame.

Entry animation: the three beats occupy 0 to 1400ms, then the sub line, the
Arabic and the buy control rise 18px and fade at 1.40s, 1.48s and 1.56s. The
hero photograph carries no rise of its own, because it is the largest paint on
the page and an element held at opacity 0 cannot count as painted. All
suppressed under `prefers-reduced-motion`.

### 3. The claims and the pack

One block, not two. Directly beneath the hero photograph, on Bone:
SINGLE SERVE / 100% ARABICA / SPECIALTY GRADE / CUPPED ABOVE 80, with
`pack-open.webp` beside them.

At 900 and up, two columns: the claims hold the left column on the page's left
margin, the photograph holds the right at roughly 56 per cent of the content
width, with a generous gutter between them. The two are centred against each
other on the cross axis, so the claims sit at the optical middle of the frame
rather than at its top. Below 900 they stack, claims first, both full width,
the photograph bleeding to the screen edges below 768 as every photograph does.

The photograph keeps the treatment every photograph has: no border, no
background, no frame, sitting directly on Bone.

There is no separate claim section and no separate photograph block. Merging
them is what removed the band of empty cream between the two, so do not
reintroduce either as a hidden duplicate of the other.

These four carry the whole product argument, so they are the second thing the
page says after the headline rather than a caption under it. Set them above body
copy in the hierarchy and below the section label, 20px on a phone rising to
26px on a wide screen, in Ink at full strength. Regular weight: scale and space
do the work, never bold.

Stacked, one to a line, on the page's left margin like everything else. No gap
between the lines and a line height of 1.3, so the four read as one block rather
than four separate statements. Four lines that tight read as a statement of what
the product is. Set across as a row they read as a spec strip, which is what a
caption does, and that is why the row treatment was abandoned.

The first claim is SINGLE SERVE rather than SINGLE SERVE POUR OVER. The full
phrase carries on the carton, in the hero sub line directly above and in the
page title and meta description, so nothing is lost, and four lines of similar
length read far better than three short ones and a long one.

No rules, no markers, no numbers, no separators, no icons, no background. An
earlier version of this file called for thin Sage rules and a quiet row of small
labels. Sage is retired, the page carries no rules of any kind, and the claims
are neither quiet nor a row.

### 4. How it works

The label, then the three brew steps, verbatim from CLAUDE.md, in a quiet row of
three columns on desktop and stacked on mobile. Numbers small. Arabic version
beneath each step in Ink 60%, `dir="rtl"`.

This section leads with its label rather than with a photograph, because
`pack-open.webp` now sits beside the claims in section 3. An earlier version of
this file put the photograph here and said every section opens with one.

### 5. Why this

Type only, no image. This is the one quiet moment in the page and it should feel
like a pause, so it carries more vertical space than its neighbours.

Three lines, verbatim from section 6 of CLAUDE.md, set one body line apart as a
tight block. No paragraphs, no rules, no icons, no cards, no list markers. No
supporting copy of any kind. An earlier version of this file asked for generous
space between them, which read as three separated statements rather than one
argument.

### 6. The packs

Two tiles side by side, stacking on mobile. Each tile is the photograph filling
its full width with nothing around it, then beneath it the count, one quiet line
and the buy control.

- **30 cups.** `hero-pack.webp`. One line, "Net 300g"
- **12 cups.** `pack-12.webp`. One line, "Net 120g"

The count, the weight and the control sit directly beneath the photograph on the
page's left margin, tight to it, and the control goes under the text rather than
across the row from it. On a phone the tiles stack, so the gap under a
photograph is small and the gap between tiles is large: that is what tells the
reader which pack a label describes.

These are short labels, so they take no full stop. See section 2 of CLAUDE.md,
which governs punctuation. An earlier version of this file wrote them as
"The box. Net 300g." That was wrong and contradicted CLAUDE.md.

No cards, no borders, no backgrounds. Both tiles carry the same control, since
there is no secondary button style left on the site.

The 12 cup carton sits smaller in its own frame than the 30 cup by design. Both
files are 1122x1402, so the tiles are equal and the size difference is in the
photography. Never scale the two to match.

No price, no per cup figure.

### 7. Statement

Full width green band. REAL COFFEE NO MACHINE in Bone, broken over two lines
with REAL COFFEE above NO MACHINE, which is how the side panel of the carton
sets it. A short emerald rule beneath. This is the only emerald rule on the site
and the only place this line appears.

The band takes the same padding as every other section and must never run more
than a screen tall.

Because the four photographs are the same deep green, this band now reads as
continuous with them rather than as a stripe. That is the intended effect and it
is why the band is the one green ground on the site.

Set the line at a middle size, not at display size. Only the hero headline stays
large, and the emptiness of the band is what makes the line land.

The two locked lines each appear once and once only. POUR WAIT DRINK is the
hero headline. REAL COFFEE NO MACHINE is this band. Neither is repeated
anywhere else, including the footer, the meta tags and the share image.

Nothing else in this section. No body copy, no button, no image.

### 8. The coffee

Type only, no image. Short. Four lines maximum, drawn only from the approved
claim set. State what it is: 100% arabica, specialty grade, cupped above 80,
roasted and packed in the UAE. Do not expand beyond that.

Carries the same generous vertical space as Why this.

### 9. FAQ

Six questions. Questions at body size in Bold, answers in Regular. No rules
between items, the open state does the separating. Answers within the approved
claim set only. Marked up with FAQPage JSON-LD.

### 10. The closing block

`sachet-in-hand.webp`, full bleed at every width, running straight into the
green footer with no gap between the two, so the dark photograph and the dark
footer read as one ending. The standard band above it and zero below.

Nothing else in the block: no heading, no caption, no copy, no label. It is the
one section with no type in it at all.

### 11. Footer

Pack Green ground with Bone type, reached through the same `.ground--green`
class as the statement band. Green closes the page the way the hero photograph
opens it, so the page ends rather than running out of content on the same cream
as every section above it. Secondary text is `--bone-quiet`, Bone at 70 per
cent, never Ink and never Sage. The emerald full stop in the logo is unchanged
and reads better on green than it did on Bone.

- Single line logo lockup
- Origin line, verbatim
- Contents block for both SKUs
- Links: Privacy, Terms
- Arabic descriptor
- Copyright line, The Drip Pack, Dubai, UAE

Content unchanged from the first build, set to the type scale above. The same
footer, on the same green, ends `privacy.html` and `terms.html`.

`404.html` has no footer. It is a single centred block at full viewport height
and always has been, so there is nothing there to put on green. Adding one would
change what that page is, which is a separate decision.

---

## Standalone pages

- `privacy.html` is a real policy, not a stub. The site collects nothing, so
  the policy covers the cookieless analytics in use, states plainly that no
  personal data is held, and explains why no data request address is offered.
  UAE and GDPR wording.
- `terms.html` is the terms of use for a brochure site. It must note explicitly
  that purchases are made on Amazon.ae under Amazon's terms, not here.
- `404.html` is branded: the Bone ground, the stacked logo lockup, one line, and
  a link back to the homepage. Not a default GitHub page. This is the one page
  that still leads with the mark rather than with a photograph, which is why the
  stacked lockup lives here now. An earlier version of this file said the green
  ground. Green is the statement band and nothing else.

---

## The 20 launch points

All twenty are in scope. Build them, do not treat them as optional.

1. **Privacy policy.** `privacy.html`, as specified above.
2. **Terms page.** `terms.html`, as specified above.
3. **Clear CTA.** One action, Amazon. It appears in the nav, the mobile sheet,
   the hero and both pack tiles, five controls fed by two constants. No
   competing actions, and no secondary button anywhere on the site.
4. **FAQ.** Six questions, as section 9 above. Suggested: how it works, what is
   in the sachet, how many cups, where to buy, how to store it, what you need to
   brew it. Answers within the approved claim set only. Mark up with FAQPage
   JSON-LD.
5. **robots.txt** goes at the root. Allow all, and point to the sitemap.
6. **sitemap.xml** goes at the root. Three pages, absolute URLs on
   https://thedrippack.com: the homepage, privacy and terms. `404.html` is
   deliberately excluded. It is served with an HTTP 404 status, so listing it
   in a sitemap only produces an error in Search Console. An earlier version of
   this file said all four pages. That was wrong.
7. **Custom 404.** `404.html`, as specified above.
8. **Alt text** on every image. Descriptive and specific, not "product image".
   Decorative images get `alt=""` and `aria-hidden="true"`.
9. **Analytics.** Cloudflare Web Analytics. Cookieless, so no consent banner is
   required, which is why it was chosen over Google Analytics. Place the
   snippet before `</body>`. Leave the token as a clearly marked constant.
10. **Meta titles**, unique per page. Homepage:
    `The Drip Pack. Single serve pour over coffee, UAE`. Under 60 characters.
11. **Meta description**, unique per page, 150 to 160 characters, drawn from
    approved copy only.
12. **Social share.** Open Graph and Twitter card tags on all four pages. A
    1200x630 share image built from the logo on the green ground, saved to
    `/images/og.png`, as section 8 of CLAUDE.md specifies.
13. **Favicon.** An SVG favicon, the emerald full stop on the green ground,
    plus a 180px apple touch icon PNG.
14. **Canonical URLs.** A self referencing canonical on every page, absolute,
    https, no trailing slash, no www.
15. **Cookie consent** is not required, because analytics is cookieless and no
    other cookies are set. State this explicitly in the privacy policy so the
    absence of a banner is a documented decision rather than an oversight. Do
    not add a banner. If Google Analytics is ever swapped in, a banner becomes
    mandatory and the privacy policy must change with it.
16. **Mobile version.** Mobile first. Test at 320, 375, 768, 1024 and 1440.
    Tap targets no smaller than 44px. No horizontal scroll at any width.
17. **Accessibility.** WCAG 2.1 AA. Semantic landmarks, one `h1` per page,
    logical heading order, visible focus states, keyboard operable nav and
    sheet, `prefers-reduced-motion` respected. Report every contrast ratio
    rather than assuming it passes, and measure the composite rather than the
    token: Ink at 60 per cent on Bone is rgb(108, 106, 102) and reads 4.55:1,
    which clears AA by 0.05 and is the floor.

    Hero type over the photograph is measured differently and must be. Capture
    each text element's box, hide the type, re-screenshot, then sample the
    painted pixels inside that box, gradient included. Report the ratio of Bone
    against both the darkest and the lightest pixel the type actually sits on.
    An earlier version of this file asked for Sage on Green to be checked. Sage
    is retired from the stylesheet and nothing uses it.

    A rule declared against a class beats the universal selector whatever the
    source order, so every transition declared on a class has to be named in the
    reduced motion block or it survives. Verify by walking the computed style of
    every element, not by reading the stylesheet.
18. **Confirm the site collects nothing.** No form, no input, no honeypot and
    no endpoint anywhere in the markup or the script. The only third party
    request is the cookieless analytics beacon.
19. **Check broken links.** Every internal anchor resolves, every external link
    opens correctly, and no `href="#"` is left except the documented Amazon
    placeholders above.
20. **Optimise performance.** Target Lighthouse 90 or above on all four
    metrics. Images in WebP with correct `width` and `height` set to prevent
    layout shift, and an explicit `aspect-ratio` matching each native size, so a
    re-export is a straight file replacement. Font preloaded, and the hero
    photograph preloaded with `fetchpriority="high"`. No render blocking third
    party scripts.

    Every image below the hero carries `fetchpriority="low"` as well as
    `loading="lazy"`. An image led page puts three large photographs close
    enough to the fold that Chrome fetches them anyway, and without the hint
    they compete with the hero for the same connection and cost the mobile
    homepage five points.

    CSS and JS are not minified, deliberately. Section 9 of CLAUDE.md forbids a
    build step, and readable source was chosen over the few hundred bytes. An
    earlier version of this file called for minification. That contradicted the
    stack and was never built.

---

## Definition of done

Do not open the pull request until all of these are true.

- All 20 points built
- The four photographs are in `/images/` at the sizes section 8 of CLAUDE.md
  records, and no image slot is a placeholder
- No hardcoded hex outside the token block
- No em dash, no exclamation mark, anywhere in the repo
- Forest #2E4A3E appears nowhere
- Parcelle appears nowhere
- Emerald used exactly twice: the logo full stop, and the statement rule
- No border, no card background, no hairline and no shadow anywhere
- No form, no input and no endpoint anywhere. The site collects nothing
- Contrast ratios reported in the pull request description, not assumed,
  including Bone over the darkest and lightest pixels the hero type sits on
- Lighthouse scores reported in the pull request description
- No horizontal scroll at 320, 375, 768, 1024 and 1440
- Nothing animating under `prefers-reduced-motion`, verified on all four pages

---

## First task

Do not build yet. Read CLAUDE.md and this file, then reply with your plan: the
file list you intend to create, the section order, and any question where this
spec is ambiguous. Wait for approval before writing a single file.
