# Resala AUC palette

Five colors, and the hierarchy between them is the whole system. Royal blue is
the brand — it carries the wordmark, every headline, and most of the ink. Ivory
is the paper. Sky blue and yellow are supporting players that appear as *shapes*,
not as type. Charcoal is for long-form reading only.

## Tokens

| Token | Hex | Name | Role |
| --- | --- | --- | --- |
| `--r-royal` | `#0C2C80` | Charity Royal Blue | The brand. Headlines, wordmark, icons, dark grounds, duotone shadows. |
| `--r-sky` | `#A7D4F2` | Sky Blue | Torn-paper fields, halftone dots, badge fills, duotone highlights. |
| `--r-yellow` | `#EAC262` | Sunshine Yellow | Underlines, asterisks, doodles, tape, highlight blocks. |
| `--r-ivory` | `#FDF9F3` | Warm Ivory | The paper. Default ground for nearly everything. |
| `--r-charcoal` | `#1B1F23` | Charcoal | Long body copy, captions. Photography before duotone. |

**Unresolved:** Sky Blue is given as `#A7D4F2` on one board and `#BFE1F2` on
another. The token defaults to `#A7D4F2`; `--r-sky-alt` holds the lighter value.
Both pass contrast for royal type on top (7.91:1 and 9.05:1). Worth settling so a
campaign doesn't drift between the two.

## Proportion

Roughly **ivory 55 / royal 30 / sky 10 / yellow 5**. Yellow is potent precisely
because there's so little of it — in the reference posters it appears two or three
times per composition and never as a large field. Sky blue can go bigger since
it's a soft field color, but it stays behind the royal, never competing with it.

Charcoal barely appears as ink. Headlines are royal, not charcoal. Reach for
charcoal only when there's a genuine paragraph to read.

## Verified contrast

Measured by `scripts/check_contrast.py`. Re-run it after any palette edit — the
rules below are statements about these specific values.

| Pairing | Ratio | Verdict |
| --- | --- | --- |
| royal on ivory | 11.86:1 | Headlines and body, any size |
| charcoal on ivory | 15.80:1 | Long-form body copy |
| ivory on royal | 11.86:1 | Reversed text, any size |
| royal on sky | 7.91:1 | Text on a sky field |
| royal on sky-alt | 9.05:1 | Text on a sky field |
| royal on yellow | 7.34:1 | Text on a yellow highlight, tape or block |
| charcoal on sky | 10.53:1 | Text on a sky field |
| sky on royal | 7.91:1 | Secondary text on royal ground |
| yellow on royal | 7.34:1 | Display text and marks on royal |
| yellow on charcoal | 9.78:1 | Display text on charcoal |
| **yellow on ivory** | **1.62:1** | **Fails. Marks only.** |
| **sky on ivory** | **1.50:1** | **Fails. Fields only.** |

## The two rules that keep it on-brand

**Yellow is never type on ivory.** At 1.62:1 it is invisible as text and perfect
as a mark. Everything yellow in the reference work is a shape: the underline
swipe beneath a headline, the six-pointed asterisk, a hand-drawn squiggle or
arrow, a strip of tape, a highlight block. When yellow needs to carry words, put
those words *on* a yellow block in royal (7.34:1), which is how the "TOGETHER, WE
CAN MAKE A DIFFERENCE" tape reads in the reference poster.

**Sky is never type on ivory either.** At 1.50:1 it's a field color — torn-paper
shapes, halftone dot grids, circular badge fills, the light end of a duotone. Set
royal or charcoal on top of it, not the reverse.

## Photography

Reference photography is **duotone**, mapped from royal in the shadows to ivory
or sky in the highlights. This is what lets busy documentary images sit inside a
tight palette without fighting it. Full-color photography does not appear in the
brand work at all.

Occasionally a single subject is left in near-greyscale against a colored field —
that's the exception, and it works because the surrounding torn paper carries the
color instead. See `references/layouts.md` for the CSS duotone recipe.

## Charts and data

Series order: royal → yellow → sky → charcoal. The impact-stat treatment in the
reference work sets a large royal figure over a small charcoal label, with a line
icon above — follow that rather than inventing chart chrome.

Never encode meaning in yellow versus sky alone; at 1.62:1 and 1.50:1 against
ivory they are nearly equal in lightness and separate poorly for anyone with a
color vision deficiency. Label directly on the mark.
