#!/usr/bin/env python3
"""Build the low-resolution, low-frame-rate torus used on small screens."""

import sys
from pathlib import Path

from PIL import Image


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("usage: build_mobile_torus.py <torus.webp> <torus-mobile.webp>")

    source, output = map(Path, sys.argv[1:])
    animation = Image.open(source)
    frames: list[Image.Image] = []

    # Half-size pixels and ~5 fps are enough at the torus's small mobile display size.
    for index in range(0, animation.n_frames, 3):
        animation.seek(index)
        frame = animation.convert("RGBA")
        frames.append(frame.resize((122, 177), Image.Resampling.LANCZOS))

    frames[0].save(
        output,
        save_all=True,
        append_images=frames[1:],
        duration=210,
        loop=0,
        lossless=False,
        quality=55,
        method=4,
    )
    print(f"{output} — {len(frames)} frames, {output.stat().st_size / 1e3:.0f} KB")


if __name__ == "__main__":
    main()
