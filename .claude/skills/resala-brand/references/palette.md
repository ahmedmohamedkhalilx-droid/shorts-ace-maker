# Resala palette

Navy carries authority, cream carries warmth, gold carries attention. The whole
system rests on keeping those three jobs separate — most brand drift happens when
gold stops being a highlight and starts being a background, at which point the
work reads as generic "premium" template rather than as Resala.

## Tokens

| Token | Hex | Role |
| --- | --- | --- |
| `--r-navy` | `#0F2A4A` | Primary ink. Headlines and body on light grounds; the default dark ground. |
| `--r-navy-deep` | `#081A2E` | Deep ground for night/vertical formats where navy needs to recede further. |
| `--r-navy-soft` | `#2A4A70` | Secondary text on cream, hairlines on light grounds, chart series 2. |
| `--r-gold` | `#C9A227` | The accent. Rules, marks, small blocks, chart series 1. |
| `--r-gold-bright` | `#E3B84A` | Gold that has to survive on a dark ground — display text and figures on navy. |
| `--r-gold-deep` | `#7A5C10` | The only gold with enough weight to set text on cream. |
| `--r-cream` | `#F6F1E4` | Default light ground. |
| `--r-cream-bright` | `#FCFAF3` | Cards and panels lifted off the cream ground. |
| `--r-sand` | `#E4DCC6` | Quiet fills — table stripes, inactive states, panel separation. |
| `--r-stone` | `#6B675C` | Captions, credits, metadata on cream. |

## Proportion

Aim for roughly **60 ground / 30 ink / 10 gold** by area. Gold above ~10% stops
reading as emphasis. If a layout feels flat, the fix is more contrast between
navy and cream areas, not more gold.

Two grounds only per piece. A poster is either cream-ground with navy type or
navy-ground with cream type; mixing both in one composition needs a hard edge
(a full-bleed band), never a soft gradient.

## Verified contrast

Measured with `scripts/check_contrast.py`. Re-run it after any palette edit —
these numbers are the reason the rules below hold, so if a hex changes the rules
have to be re-derived rather than assumed.

| Pairing | Ratio | Verdict |
| --- | --- | --- |
| navy on cream | 12.84:1 | Body text, any size |
| navy on cream-bright | 13.86:1 | Body text, any size |
| navy on sand | 10.58:1 | Body text, any size |
| navy on gold | 5.99:1 | Body text — this is how to set type inside a gold block |
| cream on navy | 12.84:1 | Body text, any size |
| cream on navy-deep | 15.55:1 | Body text, any size |
| gold-bright on navy | 7.74:1 | Body text and display |
| gold-bright on navy-deep | 9.37:1 | Body text and display |
| gold-deep on cream | 5.53:1 | Body text |
| navy-soft on cream | 8.05:1 | Body text |
| stone on cream | 5.01:1 | Captions and metadata |
| gold on navy | 5.99:1 | Display text, rules, marks |
| **gold on cream** | **2.15:1** | **Fails. Decoration only.** |

## The one rule people break

`--r-gold` on cream is 2.15:1. It is legible as a *shape* — a rule, an underline,
a bullet, a border, a filled block with navy type inside it — and illegible as
*text*. When a headline on cream needs to be gold, use `--r-gold-deep`, or invert
the block to navy ground and use `--r-gold-bright`.

This matters more in print and on projected slides than it looks on a laptop:
gold on cream at 2.15:1 disappears entirely under a room's ambient light.

## Extending the palette

Charts, states, and anything needing more than three colors: derive from navy by
rotating hue while holding the palette's muted saturation, rather than importing
saturated defaults. A pure `#22C55E` success green next to `#C9A227` reads as a
different brand.

| Purpose | Hex | Note |
| --- | --- | --- |
| Success / positive delta | `#4A7C59` | Muted, sits with gold without competing |
| Warning | `#B4762A` | Warmer than gold, distinguishable from it |
| Error / negative delta | `#9B3B2F` | Brick, not fire-engine red |
| Chart series | navy → gold → navy-soft → gold-deep → stone | In that order |
