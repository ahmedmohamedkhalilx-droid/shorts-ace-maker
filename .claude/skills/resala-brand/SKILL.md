---
name: resala-brand
description: Applies the Resala visual identity — navy/gold/cream palette, bilingual Arabic/Latin typography, and layout rules — to any visual output. Use this whenever producing something that carries Resala's identity: posters, social graphics, story/Shorts frames, slide decks, one-pagers, reports, landing pages, HTML artifacts, charts, or campaign assets. Trigger it for requests mentioning Resala, رسالة, "our brand", "brand colors", "on-brand", "campaign", "poster", "donation drive", "volunteer", or any bilingual Arabic/English design work, and also when the user asks for a visual deliverable without naming the brand but the context is clearly Resala's. Prefer this over generic design defaults; the palette and type here replace whatever colors and fonts would otherwise be picked.
---

# Resala brand

This skill encodes the identity used across Resala's poster and campaign work so
that anything produced — print, social, deck, or web — looks like it came from
the same organisation. The system is deliberately narrow: three colors doing
three separate jobs, one bilingual type pairing, and square-cornered layouts.

Most of the value is in the constraints. Reach for the reference files rather
than improvising, because the failure mode here isn't ugliness — it's producing
something perfectly competent that could belong to any charity.

## Start here

1. **Determine format and language.** Print poster, social, vertical video frame,
   deck, or web? Arabic-only, bilingual, or Latin-only? These two answers drive
   every other choice, and the vertical-video safe areas in particular are easy
   to get wrong in a way that only shows up on the platform.
2. **Read `references/palette.md`** before choosing any color.
3. **Read `references/typography.md`** whenever Arabic is involved — Arabic needs
   optical size correction, looser leading, and zero tracking, and skipping this
   is the most visible tell of a non-native layout.
4. **Read `references/layouts.md`** for grid, composition patterns, and the
   safe areas for story/Shorts output.

## The short version

Navy `#0F2A4A` is ink and dark ground. Cream `#F6F1E4` is light ground. Gold
`#C9A227` is the accent and nothing else — roughly 60/30/10 by area.

The single most common mistake: **gold text on cream is 2.15:1 and illegible.**
Gold on cream works as a shape — a rule, a border, a filled block with navy type
inside it — never as type. When a headline on cream must be gold, use
`--r-gold-deep` (5.53:1). All pairings and their measured ratios are in
`references/palette.md`.

Type is **Source Serif 4 / Amiri** for display and **IBM Plex Sans / IBM Plex
Sans Arabic** for text. Arabic set in Amiri needs 1.15× the Latin size to look
optically equal, and about 0.15em more line-height. Never letter-space Arabic —
it breaks the letter joins and renders words malformed.

Square corners (`--r-radius: 0`), no gradients, no drop shadows. The palette
carries the work.

## Building something

Import `assets/tokens.css` rather than re-declaring hexes, so a piece can be
retuned centrally. Start from `assets/poster.html`, which is a working
cream-ground bilingual poster demonstrating the RTL setup, the optical
correction, and the single-gold-element rule.

```bash
# Fonts are vendored locally, so rendering never depends on a network fetch.
# Run once (or after changing the type system):
python scripts/vendor_fonts.py

# HTML -> PNG/PDF at exact pixel dimensions:
node scripts/render.mjs poster.html --out build/poster --preset portrait
node scripts/render.mjs poster.html --out build/short --preset short
node scripts/render.mjs poster.html --out build/print --preset a3 --pdf
```

Presets: `a3`, `a4`, `portrait` (1080×1350), `square`, `short` (1080×1920),
`deck` (1920×1080).

Size type in `vw` rather than fixed pixels, as the template does. That way one
file renders at correct proportions from a 1080px social crop up to A3 at 300dpi;
fixed pixel sizes leave a poster looking sparse and under-set at print dimensions.

## After changing any color

Run `python scripts/check_contrast.py`. The rules in this skill are statements
about specific hex values — if a swatch is retuned, the rules have to be
re-derived rather than assumed to still hold. The script checks every documented
pairing, including asserting that gold-on-cream still *fails* (which is why it's
decoration-only).

## Artifacts and web output

Artifacts block all external requests, so webfonts cannot be fetched there.
Generate `assets/fonts.inline.css` with `python scripts/vendor_fonts.py --inline`
and paste the needed faces inline, or accept the system fallbacks declared in
`tokens.css` and say so — shipping an artifact whose type silently differs from
the poster it was derived from is worse than naming the limitation.

For screen output, divide the poster display sizes by ~1.6; the ratio and roles
carry over unchanged.

## Adapting this to the real brand book

The palette here is the navy/gold/cream system as used in the poster work, not a
transcription of an official Resala brand manual. If an official book exists, its
values take precedence: replace the hexes in `assets/tokens.css` and the `PALETTE`
dict in `scripts/check_contrast.py`, re-run the contrast check, and update the
ratio table in `references/palette.md` with the new measurements. Everything else
in the system — proportions, bilingual rules, layout patterns — carries over.
