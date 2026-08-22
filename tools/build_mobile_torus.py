#!/usr/bin/env python3
"""Build the half-resolution torus animation used on small screens.

    python3 tools/build_mobile_torus.py <torus.webp> <torus-mobile.webp>

Keeps every frame — the phone animation runs at the same 14.3 fps as the full one —
and pays for it by re-quantising the alpha channel after the downscale. The source
animation stores alpha in 8 steps, which is what makes lossless WebP cheap on this
material; LANCZOS turns those steps back into a continuous ramp, and an un-quantised
ramp costs about 3.5x more to encode. Re-quantising restores the saving, and lossless
beats lossy here because WebP encodes the alpha plane losslessly either way while a
lossy pass also spends bits on the flat ink-coloured RGB plane.
"""

import sys
from pathlib import Path

import numpy as np
from PIL import Image

SIZE = (122, 177)
FRAME_MS = 70
INK = (17, 19, 24)  # --color-ink, matching torus_to_transparent_webp.py
ALPHA_LEVELS = 8


def to_mobile_frame(frame: Image.Image) -> Image.Image:
    resized = frame.convert("RGBA").resize(SIZE, Image.Resampling.LANCZOS)
    alpha = np.asarray(resized, dtype=np.float32)[..., 3] / 255.0
    # LANCZOS rings past both ends of the range; clip before quantising.
    alpha = np.round(np.clip(alpha, 0.0, 1.0) * ALPHA_LEVELS) / ALPHA_LEVELS

    height, width = alpha.shape
    out = np.empty((height, width, 4), dtype=np.uint8)
    # Re-flatten the ink plane: resampling can drift it off the token by a step, and a
    # perfectly uniform RGB plane is most of why the lossless encode is small.
    out[..., 0], out[..., 1], out[..., 2] = INK
    out[..., 3] = (alpha * 255.0).astype(np.uint8)
    return Image.fromarray(out, "RGBA")


def main() -> None:
    if len(sys.argv) != 3:
        sys.exit(__doc__)

    source, output = map(Path, sys.argv[1:])
    animation = Image.open(source)

    frames: list[Image.Image] = []
    for index in range(animation.n_frames):
        animation.seek(index)
        frames.append(to_mobile_frame(animation))

    frames[0].save(
        output,
        save_all=True,
        append_images=frames[1:],
        duration=FRAME_MS,
        loop=0,
        lossless=True,
        # method 6 costs a few seconds in this one-off script and 11% of the file.
        method=6,
    )
    print(f"{output} — {len(frames)} frames, {SIZE[0]}x{SIZE[1]}, "
          f"{1000 / FRAME_MS:.1f} fps, {output.stat().st_size / 1e3:.0f} KB")


if __name__ == "__main__":
    main()
