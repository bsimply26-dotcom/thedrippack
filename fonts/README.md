# Fonts

## IBM Plex Sans Arabic, self hosted, active

`IBMPlexSansArabic-Regular.woff2` and `IBMPlexSansArabic-Bold.woff2` are the
Arabic subset of IBM Plex Sans Arabic v15, taken from Google Fonts and served
from this directory. IBM Plex is licensed under the SIL Open Font Licence 1.1,
which permits redistribution.

They are self hosted rather than linked from Google Fonts for two reasons. A
Google Fonts stylesheet is a render blocking third party request, which works
against the Lighthouse target. And CLAUDE.md section 9 says fonts are self
hosted in `/fonts/`.

## Nimbus Sans Bold, not yet delivered

`NimbusSans-Bold.otf` has not been supplied, so there is no
`NimbusSans-Bold.woff2` here and the Latin face is not active. Until it lands,
`--font-display` falls through to Helvetica and then Arial. Nimbus Sans is
metric compatible with Helvetica, so the swap will not reflow the layout.

### To activate it

1. Put `NimbusSans-Bold.otf` in this directory.
2. Convert it:

   ```
   pip install fonttools brotli
   fonttools ttLib.woff2 compress -o fonts/NimbusSans-Bold.woff2 fonts/NimbusSans-Bold.otf
   ```

3. In `styles.css`, uncomment the block marked `ACTIVATE ON FONT DELIVERY`.
4. In `index.html`, `privacy.html`, `terms.html` and `404.html`, uncomment the
   line marked `ACTIVATE ON FONT DELIVERY`, which is the `rel="preload"` link.
5. Delete the `.otf` from the repo. Only the `.woff2` needs to ship.

Nothing else changes. The token, the logo lockups and every type rule already
point at `'Nimbus Sans'` as the first family in the stack.
