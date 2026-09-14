# CLAUDE.md

Standing rules for The Drip Pack website. Read this before writing anything.
These rules apply to every session, every file, every change.

---

## 1. What this is

The Drip Pack is a single serve pour over coffee brand launching on Amazon.ae
in the UAE. Two SKUs, one blend, two counts.

The website is a brochure. It does not sell. Every buy action sends the visitor
to the Amazon.ae listing. The site exists to make the brand look credible and to
capture emails.

Domain: thedrippack.com

---

## 2. Hard rules, never break these

- British English throughout.
- No em dashes anywhere, in copy or in code comments.
- No exclamation marks.
- The full stop after PACK belongs to the logo and to nothing else. Neither
  slogan takes punctuation. POUR WAIT DRINK and REAL COFFEE NO MACHINE are
  written without any full stop.
- Punctuation, the full rule. This file governs. Short labels and display copy
  take no full stop: headings, slogans, claims, buttons, nav items, pack card
  lines, brew steps, the origin line, the contents block, the 404 line. So the
  pack cards read "The box" and "Net 300g", with none. Ordinary prose sentences
  punctuate normally, so the FAQ answers, the privacy policy and the terms page
  keep theirs. If a line is a label, it takes no stop. If it is a sentence in a
  paragraph, it does.
- Claims and facts are two different things, and the rule only works once they
  are separated.

  **Product claims.** There are four, and nothing may be added to them:
  100% arabica, specialty grade, cupped above 80, roasted and packed in the UAE.
  These assert a quality, so each one has to be defensible.

  **Format facts.** Statements about what the product is, rather than how good
  it is, are permitted: no machine, no pods, no grinder; real ground coffee
  rather than instant; single serve sealed portions. They describe the format,
  they assert nothing about quality, and they are the argument the brand is
  actually making.

  **Still banned, either way.** Health claims, certification logos, awards,
  tasting notes, origin story, est. dates, exact cup score.
- No price and no per cup figure anywhere on the site. Amazon owns the price.
- Forest #2E4A3E is superseded. It must never appear.
- Parcelle must not be referenced, linked, or hinted at in any way. No shared
  typeface, layout or imagery. The two brands must not be traceable to one
  another by a customer or a competitor.

---

## 3. Palette

Defined once as CSS custom properties. Never hardcode a hex anywhere else.

| Token | Hex | Use |
|---|---|---|
| `--bone` | #F1EBE1 | The ground. Default background of the whole site. |
| `--ink` | #141414 | All primary type on bone. |
| `--green` | #1A331E | The statement band, and nothing else. Opt in only. |
| `--emerald` | #14A05C | The full stop, and one rule under REAL COFFEE NO MACHINE. Nothing else. |
| `--sage` | #A9B6A6 | Retired from the stylesheet. See below. |

The ground is set once as `--ground: var(--bone)`. Green is reached only through
an explicit `.ground--green` class, so it cannot creep back as a default. There
is exactly one such section on the site. That is what makes the statement band
land.

Secondary text on bone is Ink at 70 per cent opacity, which reads at 6.32:1.

Sage is no longer defined in the stylesheet. It was specified as secondary text
on green, and the one green section on the site carries only the locked line, so
nothing used it. It stays in this table as a brand colour rather than a live
token. If a green section ever needs quiet text, reinstate `--sage: #A9B6A6` in
the token block and scope it inside `.ground--green`. Never put it on bone: it
falls to 1.9:1.

Emerald is an accent of last resort. It is not a button colour, not a link
colour, not a hover state. If you find yourself reaching for it a third time,
you are using it wrong.

---

## 4. Typography

**Latin: Nimbus Sans, two cuts.** Regular 400 and Bold 700, registered under one
family name, self hosted as `fonts/NimbusSans-Regular.woff2` and
`fonts/NimbusSans-Bold.woff2`, loaded with `@font-face` using `font-display:
swap` and both preloaded in the head of all four pages. Subsetted to 17KB each.
The `.otf` originals are not kept in the repo.

Weight is a tool, so use it rather than substituting colour for it:

- **Bold** for the logo, the hero headline, the section headings and the two
  locked lines.
- **Regular** for everything else: body copy, sub lines, FAQ answers, card
  descriptions, the claim row, the contents blocks, the footer and the legal
  pages.

The metric compatibility is verified rather than assumed, in both cuts. Every
advance width matches Helvetica exactly, so the `Helvetica, Arial` fallbacks in
the token cannot reflow the layout. `fonts/README.md` carries the source and the
conversion commands.

**Arabic: IBM Plex Sans Arabic.** Regular and Bold, taken from Google Fonts and
self hosted in `/fonts/` as the Arabic subset. Self hosted rather than linked,
because a Google Fonts stylesheet is a render blocking third party request and
because section 9 of this file puts fonts in `/fonts/`. IBM Plex is SIL Open
Font Licence 1.1, so redistribution is permitted.

Tokens:
- `--font-display: 'Nimbus Sans', Helvetica, Arial, sans-serif`
- `--font-arabic: 'IBM Plex Sans Arabic', sans-serif`

Arabic runs are set `dir="rtl"` and use `lang="ar"`. Never mix Arabic and Latin
numerals inside one string, set them as separate runs.

---

## 5. The logo

Two approved lockups. Both set in Nimbus Sans Bold, all caps.

**Stacked.** THE / DRIP / PACK. over three lines, with the emerald full stop
after PACK. This is the primary lockup. Use it in the hero.

**Single line.** THE DRIP PACK. on one line. Use it in the nav, the footer, and
anywhere narrow.

Build both as inline SVG with `fill="currentColor"` on the letterforms and the
emerald applied only to the full stop. No image files for the logo.

Clear space around either lockup is no less than the cap height on all sides.

---

## 6. Approved copy, use verbatim

**Slogan.** POUR WAIT DRINK

**Statement.** REAL COFFEE NO MACHINE, used once on the site, with a short
emerald rule beneath it. Once means once.

**Claims, in this order.** SINGLE SERVE POUR OVER / 100% ARABICA /
SPECIALTY GRADE / CUPPED ABOVE 80

**Arabic descriptor.** قهوة بالتنقيط للكوب الواحد

**Brew steps.**
1. Hook the open sachet over your cup
2. Pour 40ml just off the boil, wait 30 seconds
3. Fill to 150ml in stages, then lift out

**Arabic brew steps.**
علّق الكيس المفتوح على حافة الكوب /
اسكب قليلاً من الماء الساخن وانتظر /
أكمل السكب على دفعات ثم ارفع الكيس

**Why this.** Three lines, in this order. No full stops, they are labels.
1. No machine, no pods, no grinder
2. Real ground coffee, not instant
3. Sealed until the moment you brew it

**Origin line.** Roasted and packed in the UAE for The Drip Pack, Dubai, UAE

**Contents.**
- 100% roasted and ground arabica coffee
- Hero: 30 sachets x 10g, net weight 300g e
- Trial: 12 sachets x 10g, net weight 120g e
- Keep in a cool, dry place away from sunlight

If a piece of copy is not in this file or in SPEC.md, do not invent it. Ask.

---

## 7. Product facts

| SKU | Contents | Net | Carton |
|---|---|---|---|
| Hero | 30 sachets x 10g | 300g | 95 x 180 x 135mm |
| Trial | 12 sachets x 10g | 120g | 95 x 78 x 135mm |

---

## 8. Imagery

Four photographs, and only four. Each one dominates: no image is ever an inset
thumbnail inside a card.

| File | Native | Slot |
|---|---|---|
| `hero-pack.webp` | 1122x1402 | Hero, beside the type |
| `brew-pour.webp` | 1672x941 | How it works |
| `pack-open.webp` | 1672x941 | The packs, 30 cups |
| `pack-12.webp` | 1122x1402 | The packs, 12 cups |

Each runs at least 60 per cent of the viewport width at desktop and bleeds to
both screen edges on a phone, with generous space around it.

The declared `width` and `height` only hold the box until the file loads, after
which the real intrinsic ratio takes over. So each image also carries an explicit
`aspect-ratio` in the stylesheet, matching its native size. That is what makes a
re-export a straight file replacement with no layout movement.

`/images/og.png` is the 1200x630 share image, built from the logo on the green
ground.

Art direction: roasted beans and fine grounds in motion, dramatic side light,
deep shadow, shallow depth of field, on the green ground. Export with no border
and no matte. A pale edge baked into a file reads as a hard bar against the
ground and cannot be fixed in CSS without cropping the photograph.

---

## 9. Stack

Plain HTML, CSS and vanilla JavaScript. No framework, no build step, no
bundler, no npm dependencies.

This is deliberate. The site is one page plus three small legal pages. GitHub
Pages serves static HTML directly with nothing to configure, and there is no
build pipeline to break. A framework would add failure modes and no capability.

- `index.html` at the repo root
- One stylesheet, one script file
- Fonts self hosted in `/fonts/`
- Images in `/images/`

---

## 10. Tone

Plain, confident, short. State the fact and stop. The product is good coffee
without a machine, and the argument is more cups per box at a lower cost per
cup without looking cheap.

Do not write marketing filler. No "elevate your morning ritual", no
"crafted with passion", no "we believe". If a sentence could appear on any
coffee brand's website, delete it.

---

## 11. When in doubt

Stop and ask rather than guess. Inventing a claim, a colour, or a line of copy
costs more to unpick than a question costs to answer.
