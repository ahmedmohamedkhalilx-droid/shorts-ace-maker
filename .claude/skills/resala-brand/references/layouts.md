# Resala AUC layout and style

This is a **torn-paper collage** system. Every piece is built from layered paper
shapes with rough edges, duotone photo cutouts, halftone dot fields, and
hand-drawn marks — assembled on a warm ivory ground with a huge royal headline
over the top. It reads as made by hand, deliberately, and that warmth is the
point for a student volunteer organisation.

The failure mode is a clean, flat, corporate layout that uses the right colors.
Right palette plus wrong texture is still off-brand.

## Formats

| Format | Pixels | Notes |
| --- | --- | --- |
| Social square | 1080 × 1080 | The primary format |
| Social portrait | 1080 × 1350 | |
| Story / Reel / Short | 1080 × 1920 | See safe areas below |
| Print poster A3 | 3508 × 4961 @300dpi | Add 3mm bleed (35px) for a printer |
| Deck | 1920 × 1080 | |

## The recipe

Nearly every reference piece is the same five moves:

1. **Ivory ground** with a subtle paper texture.
2. **One or two torn-paper fields** in royal or sky, entering from a corner or
   edge — never centered, never a full rectangle.
3. **A duotone photo cutout** with a torn or rough edge, overlapping the fields.
4. **The headline** in huge royal condensed caps, left-aligned, stacked tight,
   overlapping the photo or field slightly so the layers interlock.
5. **Two or three yellow marks**: an underline swipe beneath the headline, a
   six-pointed asterisk, a squiggle or arrow.

Plus the logo lockup (icon over `RESALA` over `AUC`) in a corner, and often a
small uppercase Montserrat label opposite it.

## Torn paper

The signature element. Edges are irregular, slightly fibrous, with a faint white
lip on the tear. Fields overlap and cast no shadow — this is paper laid flat, not
floating cards.

In HTML, use an SVG path with an irregular edge as a `clip-path`, or a PNG mask.
A straight-edged `div` with a background color is the single most common way this
system gets flattened into something generic. If a piece genuinely can't carry a
torn edge, prefer a hard diagonal over a plain rectangle.

Shapes enter from an edge and bleed off it. A torn field floating fully inside
the frame with margin all around looks like a mistake.

## Marks and doodles

Drawn in yellow, occasionally royal. All hand-made in character — uneven stroke,
slight wobble, never geometrically perfect:

- **Underline swipe** — under a headline or key phrase, 60–90% of the line width
- **Six-pointed asterisk / starburst** — the most-used mark, usually yellow, one
  or two per composition
- **Squiggle** — a loose `zigzag` or `~~~` in royal or yellow
- **Arrow** — hand-drawn, curving, pointing at a CTA or subject
- **Triple slash** `///` — in yellow or royal, a corner accent
- **Dotted halftone grid** — a rectangular or torn patch of dots in royal or sky

Two or three marks per composition. Every corner having one turns the layout to
noise.

## Rounded elements

Unlike the flat-paper fields, **circular badges are part of the system**: story
highlight covers are circles with a 2px royal ring on ivory or sky, holding a
line icon. Sticky-note and tape elements have slightly rounded corners and a
small rotation (1–3°). Rotation on paper elements is on-brand; rotation on type
is not.

## Photography

Duotone, royal shadows to ivory/sky highlights — the `.r-duotone` recipe in
`tokens.css`. Subject matter is documentary: volunteers with children, hands
stacked in a circle, group shots from behind, candid smiles. Cut out along a torn
edge rather than placed in a rectangle.

Set type **over** the duotone directly in ivory or yellow — both clear 4.5:1
against royal. No scrim needed, which is why the duotone is mapped that dark.

## Vertical safe areas (1080 × 1920)

Conservative numbers that survive Shorts, Reels and TikTok at once:

- **Top**: first **220px** clear of anything load-bearing
- **Bottom**: last **520px** clear — titles, handles and CTAs live here
- **Right**: right **160px** clear — the action-button rail
- Leaves a **920 × 1180** working area, offset toward the upper-left

Center the message in that working area, not in the frame.

## Reformatting a layout

A composition built for a square does not survive being poured into 1080×1920 on
its own. Two things have to move:

- **Type scales against the short side** (`vmin`), never the height. See
  `references/typography.md`.
- **Composition shifts up.** The bands, footer and marks all need to clear the
  bottom 520px. A square layout's footer sits in exactly the region a Reel
  caption covers.

The template handles this with a `@media (max-aspect-ratio: 4/5)` branch. Copy
that pattern rather than rebuilding, and always render the vertical crop and look
at it — safe-area violations are invisible in markup and obvious in the image.

## Stat and impact blocks

A row of figures: large royal number (Display M), small uppercase charcoal label
beneath (Caption), line icon above. Reference sets use `1,250+ BENEFICIARIES`,
`340+ VOLUNTEERS`, `45+ PROJECTS`. Separate with thin royal rules, not boxes.

## Voice

Short declaratives in caps with a full stop. `SERVE. EMPOWER. INSPIRE.` /
`TOGETHER, WE CAN MOVE MOUNTAINS.` / `SMALL ACTIONS, BIG CHANGE.` /
`it starts with us.` — the lowercase handwritten-feeling lines appear on sticky
notes and tape, as a deliberate counterpoint to the shouting display type.

## What makes it stop looking like Resala

- Flat rectangles instead of torn paper
- Timid headline sizing — display type must dominate
- Yellow or sky used as type (1.62:1 and 1.50:1 on ivory)
- Full-color photography instead of duotone
- Centered or justified headlines
- Drop shadows and floating cards — the paper lies flat
- Marks in every corner
- Charcoal headlines; headlines are royal
