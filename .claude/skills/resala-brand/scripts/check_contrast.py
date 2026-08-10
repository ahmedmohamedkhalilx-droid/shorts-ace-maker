#!/usr/bin/env python3
"""Verify Resala palette pairings against WCAG contrast thresholds.

Run this after changing any value in references/palette.md or assets/tokens.css.
The point is that the rules in this skill ("gold is decoration, never body text
on cream") stay true statements about the actual hexes rather than folklore that
drifts once someone retunes a swatch.

Usage:
    python scripts/check_contrast.py            # check the built-in pairs
    python scripts/check_contrast.py '#0F2A4A' '#F6F1E4'   # check one pair
"""

import sys

PALETTE = {
    "royal": "#0C2C80",      # Charity Royal Blue
    "sky": "#A7D4F2",        # Sky Blue
    "sky-alt": "#BFE1F2",    # Sky Blue as given on the newer board
    "yellow": "#EAC262",     # Sunshine Yellow
    "ivory": "#FDF9F3",      # Warm Ivory
    "charcoal": "#1B1F23",   # Charcoal
}

# (foreground, background, intended role, minimum ratio)
# 4.5 = body text, 3.0 = large display text (>=24px bold / >=32px regular)
# and non-text UI such as rules, icons and borders.
PAIRS = [
    ("royal", "ivory", "headlines and body on ivory ground", 4.5),
    ("royal", "sky", "text on a sky-blue field", 4.5),
    ("royal", "sky-alt", "text on the lighter sky-blue field", 4.5),
    ("royal", "yellow", "text on a yellow highlight / tape / block", 4.5),
    ("charcoal", "ivory", "long-form body copy on ivory", 4.5),
    ("charcoal", "sky", "text on a sky-blue field", 4.5),
    ("ivory", "royal", "reversed text on royal ground", 4.5),
    ("sky", "royal", "secondary text on royal ground", 4.5),
    ("yellow", "royal", "display text and marks on royal ground", 4.5),
    ("yellow", "charcoal", "display text on charcoal", 4.5),
    ("yellow", "ivory", "yellow as TEXT on ivory (expected to FAIL)", 4.5),
    ("sky", "ivory", "sky as TEXT on ivory (expected to FAIL)", 4.5),
]


def _channel(c: float) -> float:
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def luminance(hex_color: str) -> float:
    h = hex_color.lstrip("#")
    r, g, b = (int(h[i : i + 2], 16) / 255 for i in (0, 2, 4))
    return 0.2126 * _channel(r) + 0.7152 * _channel(g) + 0.0722 * _channel(b)


def contrast(fg: str, bg: str) -> float:
    a, b = luminance(fg), luminance(bg)
    lo, hi = sorted((a, b))
    return (hi + 0.05) / (lo + 0.05)


def main() -> int:
    if len(sys.argv) == 3:
        ratio = contrast(sys.argv[1], sys.argv[2])
        print(f"{sys.argv[1]} on {sys.argv[2]}: {ratio:.2f}:1")
        return 0

    failures = 0
    print(f"{'pair':<28} {'ratio':>7}  {'min':>4}  role")
    print("-" * 88)
    for fg, bg, role, minimum in PAIRS:
        ratio = contrast(PALETTE[fg], PALETTE[bg])
        expected_fail = "FAIL" in role
        ok = ratio >= minimum
        mark = "ok " if ok else "FAIL"
        if expected_fail:
            mark = "ok " if not ok else "!!! "
            if ok:
                failures += 1
        elif not ok:
            failures += 1
        print(f"{mark} {fg + ' / ' + bg:<24} {ratio:>6.2f}  {minimum:>4}  {role}")

    print()
    if failures:
        print(f"{failures} pairing(s) not behaving as documented.")
    else:
        print("All pairings behave as documented in references/palette.md.")
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
