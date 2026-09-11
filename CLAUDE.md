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
- No claim beyond these four: 100% arabica, specialty grade, cupped above 80,
  roasted and packed in the UAE. Nothing else. No health claims, no
  certification logos, no tasting notes, no origin story, no awards, no
  est. dates, no exact cup score.
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
| `--green` | #1A331E | The ground. Default background of the site. |
| `--bone` | #F1EBE1 | All primary type on green. |
| `--emerald` | #14A05C | The full stop, and one rule under REAL COFFEE NO MACHINE. Nothing else. |
| `--sage` | #A9B6A6 | Secondary and legal text on green. |
| `--ink` | #141414 | Type on light grounds only. |

Emerald is an accent of last resort. It is not a button colour, not a link
colour, not a hover state. If you find yourself reaching for it a third time,
you are using it wrong.

---

## 4. Typography

**Latin: Nimbus Sans Bold.** Helvetica metric compatible, open licence. It is
not on Google Fonts, so it must be self hosted. When `NimbusSans-Bold.otf` is
supplied, convert it to `.woff2`, place it in `/fonts/`, and load it with
`@font-face` using `font-display: swap`.

It has not been supplied yet. The `@font-face` block in `styles.css` and the
`rel="preload"` link in all four pages are written and held behind an
`ACTIVATE ON FONT DELIVERY` marker. Until the file lands, `--font-display`
falls through to Helvetica and then Arial, which are metric compatible with
Nimbus Sans, so activating it will not reflow the layout. `fonts/README.md`
carries the conversion command and the activation steps.

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

There is no photography in the repo. The five image slots on the homepage are
empty, and commissioned photography arrives in a second pass.

Each slot is a fixed container with a fixed aspect ratio, carrying
`data-placeholder="true"` so the swap set is findable in one search, and a flat
fill so the composition reads while the slot is empty. The container owns the
ratio, so dropping a photograph in changes nothing about the layout.

To fill a slot: drop the WebP into `/images/`, uncomment the `<img>` inside the
slot, which already carries the alt text, the width and the height, then delete
`role="img"` and `aria-label` from the slot itself. That is the whole swap.

`/images/og.png` is the 1200x630 share image. It is a placeholder built from
the logo on the green ground, and it is replaced in the same pass.

Art direction when real photography arrives: roasted beans and fine grounds in
motion, dramatic side light, deep shadow, shallow depth of field, on the green
ground.

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
