---
name: resala-brand
description: Applies the Resala AUC visual identity — royal blue / sky / sunshine yellow / warm ivory palette, huge condensed display type, and the torn-paper collage style — to any visual output. Use this whenever producing something that carries Resala AUC's identity: Instagram posts and stories, posters, Reels/Shorts frames, slide decks, one-pagers, reports, landing pages, HTML artifacts, charts, recruitment or donation campaign assets. Trigger it for requests mentioning Resala, رسالة, "our brand", "brand colors", "on-brand", "campaign", "poster", "social post", "story", "donation drive", "volunteer", or any visual deliverable where the context is clearly Resala AUC's, even when the brand is not named. Prefer this over generic design defaults; the palette, type and collage treatment here replace whatever colors, fonts and layout would otherwise be picked.
---

# Resala AUC brand

Resala AUC is a student volunteer organisation, and the identity is built to look
hand-made: **torn paper collage** on warm ivory, duotone documentary photography,
and enormous royal-blue condensed capitals, punctuated by a few hand-drawn yellow
marks.

The most common way to get this wrong is to produce a clean, flat, competent
layout that happens to use the right hex values. **Right palette plus wrong
texture is still off-brand.** The torn edges, the paper grain, the duotone and the
oversized headline are not decoration on top of the brand — they *are* the brand.

## Start here

1. **Determine format.** Square post, portrait post, story/Reel/Short, print
   poster, or deck? The vertical safe areas in particular are easy to get wrong
   in a way that only shows on the platform.
2. **Read `references/layouts.md`** — the five-move collage recipe, the torn-paper
   rules, the mark vocabulary, and the safe areas. This is the most important file.
3. **Read `references/palette.md`** before choosing any color.
4. **Read `references/typography.md`** before setting the headline. Display sizing
   here is far larger than ordinary design work, and getting it timid is the
   second most common failure.

## The short version

**Colors.** Royal blue `#0C2C80` is the brand — headlines, wordmark, icons, dark
grounds. Warm ivory `#FDF9F3` is the paper. Sky blue `#A7D4F2` and sunshine yellow
`#EAC262` appear as *shapes*, never as type: on ivory they measure 1.50:1 and
1.62:1 and are simply invisible as text. Charcoal `#1B1F23` is for long-form body
copy only — headlines are royal, not charcoal.

When yellow needs to carry words, set royal type *on* a yellow block (7.34:1).

**Type.** Huge condensed uppercase display — Bebas Neue by default, Anton as the
documented alternate — with Montserrat for subheads and body. Line height
0.85–0.95, left aligned, ragged right, broken for meaning. Headlines are short
declaratives with a full stop: `SERVE. EMPOWER. INSPIRE.`

**Texture.** Torn-paper fields that bleed off the frame, duotone photos cut out
along a rough edge, halftone dot patches, paper grain, and two or three yellow
marks — an underline swipe, a six-pointed asterisk, a squiggle or arrow.

## Building something

Start from `assets/poster.html` — a working square post that demonstrates the
whole system: stacked torn bands with the ivory lip, the duotone photo slot, the
headline block, the halftone patch and the marks. Import `assets/tokens.css`
rather than re-declaring hexes.

```bash
# Fonts are vendored locally, so rendering never depends on a network fetch.
# Run once, or after changing the type system:
python scripts/vendor_fonts.py

# Generate an irregular torn edge. Evenly spaced points read as a geometric
# sawtooth rather than torn paper — always generate, never hand-write:
python scripts/torn_path.py --width 620 --height 420 --seed 3

# HTML -> PNG/PDF at exact pixel dimensions:
node scripts/render.mjs post.html --out build/post --preset square
node scripts/render.mjs post.html --out build/story --preset short
node scripts/render.mjs poster.html --out build/print --preset a3 --pdf
```

Presets: `square` (1080²), `portrait` (1080×1350), `short` (1080×1920), `a3`,
`a4`, `deck` (1920×1080).

Size type in **`vmin`** as the template does, never fixed pixels and never `vh`.
Sizing against the short side is what lets one file serve a square, a 1080×1920
story and A3 at 300dpi; `vh` grows the headline with the frame's height while the
line still has only its width to fit in, so a square layout that looks right
drives its headline straight through the artwork when the frame goes vertical.

**Always render and look at the result before calling a design done.** Collage
layouts fail in ways that are obvious in the image and invisible in the markup:
marks colliding with text, a field's straight edge leaving a hard seam, a photo
cutout overlapping a headline.

## After changing any color

Run `python scripts/check_contrast.py`. The rules in this skill are statements
about specific hex values — if a swatch is retuned they have to be re-derived. The
script checks every documented pairing, including asserting that yellow-on-ivory
and sky-on-ivory still *fail*, which is why both are shapes-only.

## Two things to settle

The reference boards disagree with themselves, so both are supported and neither
should be treated as decided:

- **Display font**: two boards specify Bebas Neue + Montserrat, a third specifies
  Anton + Poppins. Default is Bebas Neue + Montserrat; `--r-display-alt` and
  `--r-text-alt` hold the others. Pick one per campaign and hold it — Anton is
  heavier and wider, and the two do not mix.
- **Sky blue**: `#A7D4F2` on one board, `#BFE1F2` on another. Default is
  `#A7D4F2`, with `--r-sky-alt` holding the lighter value. Both pass contrast.

## Artifacts and web output

Artifacts block all external requests, so webfonts cannot be fetched there.
Generate `assets/fonts.inline.css` with `python scripts/vendor_fonts.py --inline`
and inline the faces needed, or accept the system fallbacks declared in
`tokens.css` and say so — an artifact whose type silently differs from the poster
it came from is worse than a named limitation.

The collage elements are all CSS and inline SVG, so they carry into artifacts
intact.

## Arabic

Nothing in the reference material is bilingual; the brand as documented is
English-only. `references/typography.md` covers what to do if a piece needs
Arabic (Cairo is vendored as the companion), but treat that as an extension to
confirm rather than an established part of the identity.
