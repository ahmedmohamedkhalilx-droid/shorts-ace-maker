# Resala layouts

## Formats

| Format | Pixels | Notes |
| --- | --- | --- |
| Print poster A3 | 3508 × 4961 @300dpi | Add 3mm bleed (35px) if going to a printer |
| Print poster A4 | 2480 × 3508 @300dpi | |
| Social portrait | 1080 × 1350 | Instagram/Facebook feed default |
| Social square | 1080 × 1080 | |
| Story / Reel / Short | 1080 × 1920 | See safe areas below |
| Deck | 1920 × 1080 | 16:9 |
| Web hero | fluid | Divide display type steps by ~1.6 |

## The grid

A 12-column grid with a `--r-margin` (7% of the short side) edge margin, and a
gutter of `--r-space-4`. Posters use 3 or 4 of those columns for a text block —
full-width text at poster scale gives line lengths nobody reads.

Target **45–75 characters per line** for Latin. Arabic runs longer per character,
so aim for the lower end, around 45–60.

**Square corners.** `--r-radius` is 0. The palette is already warm; rounded
corners on top of cream and gold tips the whole thing into softness. Photographs
and avatars are the exception — those may be circular.

## Vertical video safe areas (1080 × 1920)

Platform chrome eats the edges, and it eats different amounts per platform. These
are conservative numbers that survive YouTube Shorts, Reels and TikTok at once —
worth using unless the piece is for one platform only:

- **Top**: keep the first **220px** clear of anything load-bearing.
- **Bottom**: keep the last **520px** clear. Titles, handles and CTAs live here on
  every platform.
- **Right**: keep the right **160px** clear — the action-button rail.
- That leaves a **920 × 1180** working area, offset toward the upper-left.

Center the key message in that working area, not in the frame. A headline
centered in the raw 1080×1920 frame sits underneath the caption on Shorts.

## Compositions that hold

**Poster, cream ground.** Cream field, navy headline set left at Display XL/L
across 4 columns, a `--r-rule` gold rule directly beneath the headline running
the width of the text block, body in navy at Body, and a navy footer band at the
bottom carrying the logo and details in cream. The gold rule is the only gold —
that's enough.

**Poster, navy ground.** Navy or navy-deep field, cream headline, one gold
element: either a gold-bright figure (a number, a date) or a gold block behind a
short line of navy type. Cream body at 80% opacity if it needs to recede.

**Split.** A hard horizontal edge at 1/3 or 2/3 — navy above, cream below, or
reversed. No gradient across the edge. Type does not straddle it.

**Gold block.** A filled `--r-gold` rectangle with `--r-navy` type inside it
(5.99:1, verified). This is how gold carries text. Keep the block under ~10% of
the composition.

## Data and charts

Series order: navy → gold → navy-soft → gold-deep → stone. Grid lines in `sand`
at 1px, axis labels in `stone` at Small, value labels in navy.

Never encode meaning in gold alone — a gold and navy pie chart is unreadable to
anyone with the sheet printed in grayscale, and gold at 2.15:1 against cream is
already marginal. Label directly on the mark instead of relying on a legend.

## Photography

Duotone toward navy for backgrounds behind type — full-color photography and a
gold accent in the same frame competes. Keep full color for the subject of a
piece (people, events), and give it its own zone rather than running type over it.

If type must sit over a photograph, use a navy scrim at 70% opacity rather than a
text shadow. Scrims stay consistent across a series; shadows don't.

## What makes it stop looking like Resala

- Gold used as a large background field
- Gold text on cream (2.15:1 — see `palette.md`)
- Rounded corners on panels and buttons
- Three grounds in one composition
- Centered body text under a left-aligned headline
- Arabic and Latin at the same nominal size, so the Arabic reads small
- Drop shadows, gradients, glows — the palette does the work
