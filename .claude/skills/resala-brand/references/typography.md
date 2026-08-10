# Resala AUC typography

The voice of this brand is a **very large condensed capital headline** in royal
blue, set tight, usually stacked over two or three lines, taking up a third to a
half of the composition. That single decision does most of the branding work. The
supporting text is a quiet geometric sans that stays out of its way.

Headlines are short declaratives, set in caps with a full stop: `SERVE. EMPOWER.
INSPIRE.` / `TOGETHER, WE CAN MOVE MOUNTAINS.` / `ONE YEAR ONE IMPACT`. The
period is part of the voice — it lands the phrase.

## The system

| Role | Font | Weight | Case |
| --- | --- | --- | --- |
| Display | Bebas Neue (default) or Anton | 400 | UPPERCASE |
| Subheading | Montserrat | 600 SemiBold | UPPERCASE or sentence |
| Body | Montserrat | 400 Regular | Sentence case |

**Unresolved:** the brand boards disagree — two specify **Bebas Neue + Montserrat**,
a third specifies **Anton + Poppins**. Both are vendored, and `tokens.css` carries
`--r-display-alt` (Anton) and `--r-text-alt` (Poppins) so a piece can switch with
one variable. The default is Bebas Neue + Montserrat since it appears on more of
the boards.

They are not interchangeable mid-campaign. Anton is heavier and wider with tighter
counters; Bebas is lighter and narrower. Anton is the closer match to the weight
of the largest reference headlines (`ONE YEAR ONE IMPACT`); Bebas suits denser
layouts with more lines. Pick one per campaign and hold it.

## Scale

Display type here is genuinely huge — this is the most common thing to get wrong,
because a headline sized like normal design work looks timid in this system.

Sizes are given against the canvas's **short side** (`vmin`), not its height.

| Step | Size | Use |
| --- | --- | --- |
| Hero | 15vmin per line | Poster headline. `ONE YEAR ONE IMPACT` is ~4 lines filling half the frame. |
| Display L | 10vmin | Standard post headline, 2–4 lines |
| Display M | 7vmin | Secondary headline, story frames |
| Subhead | 2.2vmin | Montserrat SemiBold, uppercase, letterspaced |
| Body | 1.8vmin | Montserrat Regular |
| Caption | 1.3vmin | Labels under stat icons, credits |

Sizing in viewport units rather than fixed pixels is what makes one layout work
as a 1080 square and an A3 print without re-tuning. **Use `vmin`, not `vh`** —
a headline sized in `vh` grows with the frame's height while the line still has
only the frame's width to fit into, so a square composition that looks right
drives its headline through the artwork at 1080×1920. This is the single most
common way a layout breaks when it is reformatted.

## Setting the display face

- **Line height 0.85–0.95.** Condensed caps have no descenders to clear, and the
  reference headlines are set tight enough that the lines nearly touch. Default
  leading (1.2+) makes the block look loose and unbranded.
- **Letter-spacing 0 to -0.01em.** Bebas and Anton are already condensed; tracking
  them in undoes the point.
- **Ragged right, left aligned.** Never centered, never justified.
- **Break lines for meaning**, not to fill the measure — `TOGETHER,` / `WE CAN` /
  `MOVE MOUNTAINS.` reads as three beats.
- Mixed sizes inside one headline are on-brand: `SMALL ACTIONS,` large with
  `BIG CHANGE.` small beside it.

## Subheads and body

Montserrat SemiBold uppercase with **0.08–0.12em letter-spacing** for the small
label lines (`365 DAYS OF SERVING. EMPOWERING. INSPIRING.`). This is the one place
letter-spacing is wanted — it separates the label from the display type.

Body copy is Montserrat Regular, sentence case, line-height 1.6, in charcoal for
paragraphs or royal for short lines. Keep to 45–75 characters per line.

## The yellow underline

The signature typographic mark: a hand-drawn yellow swipe under a headline or a
key phrase. It is a **shape, not text decoration** — `text-decoration: underline`
in yellow is not this. Draw it as an SVG path or a rotated block with slightly
uneven ends, sitting below the baseline and running 60–90% of the last line's
width. It should look brushed, not ruled.

Yellow text on ivory is 1.62:1 and illegible — see `references/palette.md`.

## If a piece needs Arabic

Nothing in the reference material is bilingual; the brand as documented is
English-only. If Arabic is required, **Cairo** is vendored as the companion — it
shares the geometric, slightly condensed character of Montserrat and holds up at
display weight, which Amiri-style Naskh faces would not next to Bebas.

Arabic has no uppercase, so the all-caps display voice cannot be reproduced
directly; carry the emphasis with weight (Cairo 700) and size instead. Set
`dir="rtl"` on the container rather than faking alignment, add ~0.15em line-height
over the Latin value, and never letter-space Arabic — it breaks the letter joins.

Treat this as an extension, and confirm it against a real brand decision before
shipping a bilingual campaign.
