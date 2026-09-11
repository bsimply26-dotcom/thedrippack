# Fonts

Both families are self hosted here and preloaded in the head of all four pages.
Nothing on the site loads a font from a third party.

## Nimbus Sans Bold, active and subsetted

`NimbusSans-Bold.woff2` is the Latin display face, the first family in
`--font-display`. It is preloaded in all four pages, so its weight sits on the
critical path and directly sets how fast the hero can paint.

It was converted from the supplied `NimbusSans-Bold.otf` and then subsetted:

```
pip install fonttools brotli

# convert
python3 -c "from fontTools.ttLib import TTFont; f=TTFont('fonts/NimbusSans-Bold.otf'); f.flavor='woff2'; f.save('fonts/NimbusSans-Bold.woff2')"

# subset to printable ASCII, Latin-1 Supplement, and the common marks
python3 - <<'EOF'
from fontTools import subset
chars = (''.join(chr(c) for c in range(0x20, 0x7F))
         + ''.join(chr(c) for c in range(0xA0, 0x100))
         + '‘’“”…–£€™®')  # no em dash, see CLAUDE.md
subset.main(['fonts/NimbusSans-Bold.woff2', f'--text={chars}', '--flavor=woff2',
             '--layout-features=*', '--output-file=fonts/NimbusSans-Bold.woff2'])
EOF
```

83KB as the supplied OTF, 52KB converted, 17KB subsetted. The 35KB saved comes
straight off the critical path, and it is the difference between a mobile
Lighthouse performance score of 90 and 97 on the homepage.

The subset is deliberately wider than what the site uses today. The 223 glyphs
cover every accented Latin character, the curly quotes, the ellipsis and the
pound sign, so ordinary British English copy cannot fall through to the fallback.
A tighter subset of only the characters currently on the page would save another
8KB and break the first time somebody writes a word it does not cover.

The en dash at U+2013 must stay in the subset. `styles.css` uses it as the FAQ
toggle marker when an item is open.

The em dash at U+2014 is deliberately left out. Section 2 of CLAUDE.md bans it,
so the glyph would never be drawn, and omitting it keeps the character out of
the repository altogether.

If you add copy that needs a glyph outside Latin-1, widen `chars` above and
regenerate. The `.otf` is not kept in the repo, so keep the original safe
elsewhere.

It is Helvetica metric compatible, verified rather than assumed. Every advance
width matches Helvetica Bold exactly: H and D and A and K at 0.722em, E and P at
0.667em, T at 0.611em. So the `Helvetica, Arial` fallbacks in the token cannot
reflow the layout if the face is ever slow to arrive.

To replace it, drop a new `.woff2` in at the same filename. No other edit.

## IBM Plex Sans Arabic, active but not preloaded

It is loaded by `@font-face` with `font-display: swap`, and deliberately not
preloaded. Preloading it put 42KB on the critical path ahead of the hero image
for the sake of one line of secondary sage text, which measurably delayed the
largest contentful paint. With swap it renders in the system Arabic face first
and switches when it arrives.

## IBM Plex Sans Arabic, the files

`IBMPlexSansArabic-Regular.woff2` and `IBMPlexSansArabic-Bold.woff2` are the
Arabic subset of IBM Plex Sans Arabic v15, taken from Google Fonts and served
from here. IBM Plex is licensed under the SIL Open Font Licence 1.1, which
permits redistribution.

Self hosted rather than linked, because a Google Fonts stylesheet is a render
blocking third party request, and because section 9 of CLAUDE.md puts fonts in
`/fonts/`.
