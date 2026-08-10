#!/usr/bin/env python3
"""Download the Resala type system into assets/fonts/ and write fonts.css.

Rendering a poster against fonts fetched from a CDN at render time is fragile in
exactly the way that hurts most: when the fetch fails the page still renders, in
a fallback face, and the result looks *almost* right. Headless browsers in CI and
sandboxes frequently can't reach fonts.googleapis.com even when the shell can.

Vendoring the woff2 files makes rendering deterministic offline, and gives
Artifacts (which block external requests entirely) a way to carry real type via
`--inline`.

Usage:
    python scripts/vendor_fonts.py             # download + write fonts.css
    python scripts/vendor_fonts.py --inline    # also write fonts.inline.css (data URIs)
"""

import base64
import re
import sys
import urllib.request
from pathlib import Path

ASSETS = Path(__file__).resolve().parent.parent / "assets"
FONT_DIR = ASSETS / "fonts"

# Google's CSS API serves woff2 only when it believes the client supports it.
UA_WOFF2 = (
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/120.0.0.0 Safari/537.36"
)

FAMILIES = [
    # Display — both condensed faces the brand boards name, so a piece can be
    # switched between them without re-vendoring.
    ("Bebas Neue", "Bebas+Neue"),
    ("Anton", "Anton"),
    # Text
    ("Montserrat", "Montserrat:wght@400;500;600;700;800"),
    ("Poppins", "Poppins:wght@400;500;600;700"),
    # Arabic companion. Not present in the reference material — see
    # references/typography.md before using it.
    ("Cairo", "Cairo:wght@400;600;700"),
]


def fetch(url: str, ua: str = UA_WOFF2) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": ua})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def main() -> int:
    inline = "--inline" in sys.argv
    FONT_DIR.mkdir(parents=True, exist_ok=True)

    blocks: list[str] = []
    claimed: dict[str, str] = {}
    downloaded = 0

    for label, spec in FAMILIES:
        url = f"https://fonts.googleapis.com/css2?family={spec}&display=swap"
        try:
            css = fetch(url).decode("utf-8")
        except Exception as exc:  # noqa: BLE001
            print(f"  ! {label}: could not fetch CSS ({exc})")
            continue

        # The subset label sits in a comment *before* each @font-face, so the
        # pair has to be matched together. Splitting on "@font-face" alone
        # associates every block with the following face's label, which silently
        # mislabels files and can point an Arabic face at a Latin-only file.
        pairs = re.findall(
            r"/\*\s*([\w\-\[\]]+)\s*\*/\s*@font-face\s*\{(.*?)\}", css, re.S
        )
        # Keep only latin/arabic subsets; the API emits a block per unicode-range
        # and pulling every subset triples the payload for no visible gain.
        for subset, block in pairs:
            m = re.search(r"src:\s*url\((https://[^)]+\.woff2)\)", block)
            if not m:
                continue
            if not (subset.startswith("latin") or subset.startswith("arabic")):
                continue

            weight_m = re.search(r"font-weight:\s*([\d ]+);", block)
            weight = weight_m.group(1).strip() if weight_m else "400"
            style_m = re.search(r"font-style:\s*(\w+);", block)
            style = style_m.group(1) if style_m else "normal"
            range_m = re.search(r"unicode-range:\s*([^;]+);", block)

            font_url = m.group(1)
            slug = f"{label.lower().replace(' ', '-')}-{subset}-{weight.replace(' ', '-')}"
            dest = FONT_DIR / f"{slug}.woff2"

            # Two distinct faces resolving to one filename means a face would be
            # served a file that may not even contain its script. Fail loudly
            # rather than emit CSS that renders in a fallback.
            if slug in claimed and claimed[slug] != font_url:
                print(f"  ! filename collision on {slug} — refusing to overwrite")
                return 1
            claimed[slug] = font_url

            if not dest.exists():
                try:
                    dest.write_bytes(fetch(font_url))
                except Exception as exc:  # noqa: BLE001
                    print(f"  ! {label} {subset} {weight}: {exc}")
                    continue
            downloaded += 1

            if inline:
                b64 = base64.b64encode(dest.read_bytes()).decode("ascii")
                src = f"url(data:font/woff2;base64,{b64}) format('woff2')"
            else:
                src = f"url('./fonts/{dest.name}') format('woff2')"

            rng = f"\n  unicode-range: {range_m.group(1)};" if range_m else ""
            blocks.append(
                f"@font-face {{\n"
                f"  font-family: '{label}';\n"
                f"  font-style: {style};\n"
                f"  font-weight: {weight};\n"
                f"  font-display: swap;\n"
                f"  src: {src};{rng}\n"
                f"}}"
            )
        print(f"  {label}: ok")

    if not blocks:
        print("Nothing written — no fonts could be fetched.")
        return 1

    header = (
        "/* Generated by scripts/vendor_fonts.py — do not edit by hand.\n"
        " * Local @font-face declarations so rendering does not depend on a\n"
        " * network fetch at render time. Import BEFORE tokens.css. */\n\n"
    )
    out = ASSETS / ("fonts.inline.css" if inline else "fonts.css")
    out.write_text(header + "\n\n".join(blocks) + "\n")
    size = out.stat().st_size / 1024
    print(f"\nWrote {out.name} ({len(blocks)} faces, {size:.0f}KB) from {downloaded} files.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
