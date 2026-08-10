#!/usr/bin/env python3
"""Generate irregular torn-paper edge paths for Resala collage layouts.

Hand-writing an SVG path with evenly spaced points produces a regular sawtooth,
which reads as a geometric zigzag rather than torn paper — it is the single most
common way this brand's collage system collapses into something generic. Real
tears vary in amplitude and spacing and carry occasional deep notches.

Seeded, so a given seed always yields the same edge: a layout can be regenerated
without the artwork shifting.

Usage:
    python scripts/torn_path.py --width 620 --height 420 --seed 3
    python scripts/torn_path.py --width 580 --height 400 --seed 7 --edge top --lip
"""

import argparse
import random


def torn_edge(width: float, base: float, seed: int, amplitude: float, teeth: int) -> list[tuple[float, float]]:
    """Points tracing a torn edge left-to-right along y=base."""
    rng = random.Random(seed)
    pts: list[tuple[float, float]] = []
    x = 0.0
    # Uneven horizontal spacing: a tear does not step at a fixed interval.
    step = width / teeth
    while x < width:
        # Most peaks sit in a mid band; occasionally the tear bites much deeper,
        # which is what makes it read as paper rather than as a pattern.
        if rng.random() < 0.16:
            dy = rng.uniform(amplitude * 0.9, amplitude * 1.7)
        else:
            dy = rng.uniform(-amplitude * 0.35, amplitude * 0.75)
        pts.append((round(x, 1), round(base - dy, 1)))
        x += step * rng.uniform(0.55, 1.5)
    pts.append((round(width, 1), round(base - rng.uniform(0, amplitude * 0.6), 1)))
    return pts


def torn_sheet(width: float, height: float, seed: int, amplitude: float, teeth: int) -> str:
    """A closed torn-paper sheet: irregular on all four edges.

    The signature Resala background is a single ivory sheet torn on every side,
    laid over a blue field. Building it from four independent edges keeps the
    corners from looking mitred, which is what gives away a shape drawn with a
    rectangle tool and a filter.
    """
    rng = random.Random(seed)

    def run(n: int) -> list[float]:
        # Offsets perpendicular to the edge, mostly shallow with occasional
        # deeper bites, same as a single tear.
        out = []
        for _ in range(n):
            if rng.random() < 0.18:
                out.append(rng.uniform(amplitude * 0.9, amplitude * 1.8))
            else:
                out.append(rng.uniform(-amplitude * 0.4, amplitude * 0.8))
        return out

    # Uneven counts per side so the rhythm does not repeat around the shape.
    nt, nr, nb, nl = (max(6, teeth + rng.randint(-4, 4)) for _ in range(4))
    pts: list[tuple[float, float]] = []

    for i, d in enumerate(run(nt)):                      # top, left to right
        pts.append((width * i / nt, d))
    for i, d in enumerate(run(nr)):                      # right, top to bottom
        pts.append((width - d, height * i / nr))
    for i, d in enumerate(run(nb)):                      # bottom, right to left
        pts.append((width - width * i / nb, height - d))
    for i, d in enumerate(run(nl)):                      # left, bottom to top
        pts.append((d, height - height * i / nl))

    body = " L".join(f"{round(x, 1)},{round(y, 1)}" for x, y in pts)
    return f"M{body} Z"


def build(width: float, height: float, seed: int, edge: str, amplitude: float, teeth: int) -> str:
    base = height * 0.28
    pts = torn_edge(width, base, seed, amplitude, teeth)
    if edge == "top":
        body = f"L{width},{height} L0,{height} Z"
        d = "M" + " L".join(f"{x},{y}" for x, y in pts) + " " + body
    else:  # bottom-anchored field: tear along the top, solid below
        body = f"L{width},{height} L0,{height} Z"
        d = "M" + " L".join(f"{x},{y}" for x, y in pts) + " " + body
    return d


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--width", type=float, default=600)
    p.add_argument("--height", type=float, default=400)
    p.add_argument("--seed", type=int, default=1)
    p.add_argument("--edge", choices=["top", "bottom"], default="top")
    p.add_argument("--shape", choices=["edge", "sheet"], default="edge",
                   help="edge: one torn edge with solid fill below. "
                        "sheet: a closed sheet torn on all four sides.")
    p.add_argument("--amplitude", type=float, default=None, help="tear depth; defaults to 9%% of height")
    p.add_argument("--teeth", type=int, default=22)
    p.add_argument("--lip", action="store_true", help="also print an offset path for the white torn lip")
    a = p.parse_args()

    if a.shape == "sheet":
        amp = a.amplitude if a.amplitude is not None else min(a.width, a.height) * 0.022
        print(torn_sheet(a.width, a.height, a.seed, amp, a.teeth))
        return 0

    amp = a.amplitude if a.amplitude is not None else a.height * 0.09
    d = build(a.width, a.height, a.seed, a.edge, amp, a.teeth)
    print(d)

    if a.lip:
        # The lip is the same tear nudged down a few units; drawn in ivory
        # behind the field it gives the frayed white edge real paper has.
        lip = build(a.width, a.height, a.seed, a.edge, amp, a.teeth)
        print()
        print("<!-- lip: draw this in ivory, translated up ~6 units, behind the field -->")
        print(lip)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
