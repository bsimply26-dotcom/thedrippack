# Fonts

Both families are self hosted here and preloaded in the head of all four pages.
Nothing on the site loads a font from a third party.

## Nimbus Sans Bold, active

`NimbusSans-Bold.woff2` is the Latin display face, the first family in
`--font-display`. It was converted from the supplied `NimbusSans-Bold.otf`:

```
pip install fonttools brotli
python3 -c "from fontTools.ttLib import TTFont; f=TTFont('fonts/NimbusSans-Bold.otf'); f.flavor='woff2'; f.save('fonts/NimbusSans-Bold.woff2')"
```

The `.otf` is not kept in the repo. Only the `.woff2` needs to ship, and it is
83KB as an OTF against 52KB as a woff2.

It is Helvetica metric compatible, verified rather than assumed. Every advance
width matches Helvetica Bold exactly: H and D and A and K at 0.722em, E and P at
0.667em, T at 0.611em. So the `Helvetica, Arial` fallbacks in the token cannot
reflow the layout if the face is ever slow to arrive.

To replace it, drop a new `.woff2` in at the same filename. No other edit.

## IBM Plex Sans Arabic, active

`IBMPlexSansArabic-Regular.woff2` and `IBMPlexSansArabic-Bold.woff2` are the
Arabic subset of IBM Plex Sans Arabic v15, taken from Google Fonts and served
from here. IBM Plex is licensed under the SIL Open Font Licence 1.1, which
permits redistribution.

Self hosted rather than linked, because a Google Fonts stylesheet is a render
blocking third party request, and because section 9 of CLAUDE.md puts fonts in
`/fonts/`.
