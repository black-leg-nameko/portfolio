#!/usr/bin/env python3
"""Build the project media served on /products.

    python3 tools/optimize_media.py <source-dir> <output-dir>

For every image in the source directory:
  <name>.webp        880 px still for the card grid — for recordings this is a mid-animation
                     frame, so the poster shows the tool doing something.
  <name>.anim.webp   800 px animated WebP, only for sources that are animated. Loaded on demand.
"""
import sys
from pathlib import Path

from PIL import Image, ImageSequence

THUMB_WIDTH = 880
ANIM_WIDTH = 800
MAX_ANIM_FRAMES = 110
POSTER_AT = 0.45  # fraction into a recording to take the still from
# Recordings whose default frame is uninformative (the scanner spends its first half
# on a mostly-empty desktop and the report only appears at the end; the ouroboros
# default lands on a garbage-collection flash, which reads as an error).
POSTER_OVERRIDES = {"proc-scanner-demo": 0.95, "ouroboros-demo": 0.44}


def fit(image: Image.Image, width: int) -> Image.Image:
    if image.width <= width:
        return image
    return image.resize((width, round(image.height * width / image.width)), Image.LANCZOS)


def main() -> None:
    if len(sys.argv) != 3:
        sys.exit(__doc__)

    source_dir, out_dir = Path(sys.argv[1]), Path(sys.argv[2])
    out_dir.mkdir(parents=True, exist_ok=True)

    for path in sorted(source_dir.iterdir()):
        if path.suffix.lower() == ".svg":
            (out_dir / path.name).write_bytes(path.read_bytes())
            continue
        try:
            image = Image.open(path)
        except OSError:
            continue

        frame_count = getattr(image, "n_frames", 1)
        animated = frame_count > 1

        poster_at = POSTER_OVERRIDES.get(path.stem, POSTER_AT)
        image.seek(int(frame_count * poster_at) if animated else 0)
        thumb_path = out_dir / f"{path.stem}.webp"
        fit(image.convert("RGB"), THUMB_WIDTH).save(thumb_path, "WEBP", quality=80, method=5)
        line = f"{path.stem:30} still {thumb_path.stat().st_size / 1e3:5.0f} KB"

        if animated:
            step = max(1, round(frame_count / MAX_ANIM_FRAMES))
            frames, durations = [], []
            for index, frame in enumerate(ImageSequence.Iterator(image)):
                if index % step:
                    continue
                durations.append(frame.info.get("duration", 80) * step)
                frames.append(fit(frame.convert("RGB"), ANIM_WIDTH))

            anim_path = out_dir / f"{path.stem}.anim.webp"
            frames[0].save(
                anim_path,
                "WEBP",
                save_all=True,
                append_images=frames[1:],
                duration=durations,
                loop=0,
                quality=55,
                method=4,
                minimize_size=True,
            )
            line += f"   anim {anim_path.stat().st_size / 1e6:.2f} MB ({len(frames)} frames)"

        print(line)


if __name__ == "__main__":
    main()
