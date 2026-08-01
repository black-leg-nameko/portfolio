#!/usr/bin/env python3
"""Key the ASCII torus recording to transparency and re-ink it for the white canvas.

    python3 tools/torus_to_transparent_webp.py <source.gif> <output-dir>

Writes `torus.webp` (transparent animated WebP) and `torus-poster.png` (first frame,
used as the loading and reduced-motion fallback).
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image

# The recording repeats exactly every 278 frames — using that window keeps the loop seamless.
LOOP_FRAMES = 278
FRAME_MS = 70
# Bounding box of the torus across the loop, with a small margin. Cropping the dead
# margin is worth ~50% of the encoded size.
BOX = (45, 32, 289, 385)
INK = (17, 19, 24)  # --color-ink
FLOOR = 30.0  # luminance at or below this is backdrop -> fully transparent
CEIL = 195.0  # luminance at or above this is a fully opaque glyph
GAMMA = 0.9
ALPHA_LEVELS = 8  # posterising the alpha costs nothing visually and compresses far better


def to_rgba(frame: Image.Image) -> Image.Image:
    rgb = np.asarray(frame.convert("RGB").crop(BOX), dtype=np.float32)
    lum = 0.2126 * rgb[..., 0] + 0.7152 * rgb[..., 1] + 0.0722 * rgb[..., 2]
    alpha = np.clip((lum - FLOOR) / (CEIL - FLOOR), 0.0, 1.0) ** GAMMA
    alpha = np.round(alpha * ALPHA_LEVELS) / ALPHA_LEVELS

    height, width = alpha.shape
    out = np.empty((height, width, 4), dtype=np.uint8)
    out[..., 0], out[..., 1], out[..., 2] = INK
    out[..., 3] = (alpha * 255.0).astype(np.uint8)
    return Image.fromarray(out, "RGBA")


def main() -> None:
    if len(sys.argv) != 3:
        sys.exit(__doc__)

    source, out_dir = Path(sys.argv[1]), Path(sys.argv[2])
    out_dir.mkdir(parents=True, exist_ok=True)

    gif = Image.open(source)
    frames = []
    for index in range(LOOP_FRAMES):
        gif.seek(index)
        frames.append(to_rgba(gif))

    animation = out_dir / "torus.webp"
    frames[0].save(
        animation,
        save_all=True,
        append_images=frames[1:],
        duration=FRAME_MS,
        loop=0,
        lossless=True,
        minimize_size=True,
    )
    poster = out_dir / "torus-poster.png"
    frames[0].save(poster, optimize=True)

    print(f"{animation} — {len(frames)} frames, {frames[0].size[0]}x{frames[0].size[1]}, "
          f"{animation.stat().st_size / 1e6:.2f} MB")
    print(f"{poster} — {poster.stat().st_size / 1e3:.0f} KB")


if __name__ == "__main__":
    main()
