# Resala typography

The work is bilingual, so the type system has to be specified as pairs. A Latin
font chosen alone and an Arabic font bolted on later never share a texture — the
Arabic ends up lighter and smaller-looking than the Latin beside it, which is the
single most common tell of a translated-looking layout rather than a bilingual one.

## The system

| Role | Latin | Arabic | Weights |
| --- | --- | --- | --- |
| Display | Source Serif 4 | Amiri | 600, 700 |
| Text | IBM Plex Sans | IBM Plex Sans Arabic | 400, 500, 600 |
| Figures | IBM Plex Sans (tabular) | IBM Plex Sans Arabic | 500, 600 |

Source Serif and Amiri share a calligraphic, humanist axis — both have real
stroke modulation, so a bilingual headline holds together. IBM Plex Sans and IBM
Plex Sans Arabic are designed as one family by the same foundry, so the text
sizes need no optical correction at all.

**Modern alternate**, for youth-facing and social formats where the serif reads
too institutional: display becomes **IBM Plex Sans (600)** / **Tajawal (700)**.
Keep the text pair unchanged. Pick one and hold it across a campaign; the two
display options should not appear in the same series.

All four families are open-licensed and on Google Fonts, so they're safe to embed
in web output and to install for print work.

## Optical correction for Arabic

Arabic at the same nominal size reads smaller than Latin, because its x-height
equivalent sits lower relative to the em box while the ascenders and descenders
run further.

- **Amiri**: set at **1.15×** the Latin display size.
- **IBM Plex Sans Arabic**: set at **1.0×** — no correction; it is metrically
  matched to IBM Plex Sans by design.
- **Line height**: add roughly **0.15em** over the Latin value for any Arabic
  text. Arabic diacritics and descenders collide at Latin leading.

Never letter-space Arabic. Arabic letters connect, and tracking breaks the joins —
this is not a stylistic preference, it renders the word malformed. Latin display
can take `-0.02em` tracking; Arabic takes `0`.

## Scale

A 1.25 ratio, which stays readable when a poster is scaled down to a phone-sized
preview — the state in which most of this work is actually first seen.

| Step | Size | Use |
| --- | --- | --- |
| Display XL | 72px / 4.5rem | Poster headline, single line |
| Display L | 57px / 3.5rem | Poster headline, two lines; slide title |
| Display M | 46px / 2.875rem | Section opener |
| Heading | 36px / 2.25rem | Subhead |
| Lead | 29px / 1.8rem | Standfirst, pull quote |
| Body | 23px / 1.45rem | Poster body |
| Small | 18px / 1.125rem | Caption, credit |
| Micro | 15px / 0.9375rem | Legal, URL, handle |

For **web and deck** output divide the display steps by ~1.6 — a 72px poster
headline becomes ~45px on screen. The ratio and the roles carry over; only the
absolute sizes change.

## Setting bilingual layouts

Direction is a document property, not a styling flourish. Set `dir="rtl"` on the
Arabic container and let the browser mirror the layout — do not fake it with
`text-align: right`, which leaves punctuation and mixed Latin/numeral runs in the
wrong order.

When both languages appear in one piece:

- **Arabic leads** unless the audience is explicitly international. It gets the
  larger size or the earlier position, not equal billing — equal billing reads as
  indecision.
- Keep one shared baseline grid. The two languages should align at the top of the
  block, not float independently.
- Latin inside an Arabic run (a name, a URL, `Resala`) keeps LTR direction
  automatically via Unicode bidi; don't wrap it in overrides unless it visibly
  breaks.
- Numerals: pick Western (`1234`) or Eastern Arabic (`١٢٣٤`) per piece and hold
  it. Mixing them within one composition looks like an error rather than a choice.

## Web embed

```css
@import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,600;8..60,700&family=Amiri:wght@400;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Sans+Arabic:wght@400;500;600&display=swap');
```

For Artifacts, which block external requests, the fonts cannot be fetched — fall
back to the stacks declared in `assets/tokens.css`, which name the families first
and degrade to system serif/sans. Say so rather than shipping an artifact whose
type silently differs from the poster it was derived from.
