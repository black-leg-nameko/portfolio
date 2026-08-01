#!/usr/bin/env python3
"""Compose the 1200x630 Open Graph card from the same ink-on-white system as the site.

    python3 tools/build_og_image.py <torus-poster.png> <output.png>

Needs Inter and a monospace face installed locally (fc-match resolves them).
"""
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
INK = (17, 19, 24)
BODY = (77, 77, 77)
MUTE = (118, 118, 118)
HAIRLINE = (235, 235, 235)
MARGIN = 80

NAME = "Ryuto Kitajima"
EYEBROW = "SECURITY & MACHINE LEARNING RESEARCH"
LINES = [
    "Cross-chain bridge timing, code-level",
    "vulnerability detection, and the failure modes",
    "that appear where the two meet.",
]
HANDLE = "black-leg  ·  北島 琉斗"


def font_file(query: str) -> str:
    return subprocess.run(
        ["fc-match", "-f", "%{file}", query], capture_output=True, text=True, check=True
    ).stdout.strip()


def main() -> None:
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    poster_path, out_path = Path(sys.argv[1]), Path(sys.argv[2])

    sans = font_file("Inter")
    mono = font_file("Noto Sans Mono")
    cjk = font_file("Noto Sans JP")

    name_font = ImageFont.truetype(sans, 76)
    name_font.set_variation_by_axes([600]) if hasattr(name_font, "set_variation_by_axes") else None
    body_font = ImageFont.truetype(sans, 30)
    mono_font = ImageFont.truetype(mono, 20)
    cjk_font = ImageFont.truetype(cjk, 20)

    card = Image.new("RGB", (W, H), (255, 255, 255))
    draw = ImageDraw.Draw(card)

    # the torus, right-aligned, at the same opacity as the hero
    poster = Image.open(poster_path).convert("RGBA")
    scale = 430 / poster.height
    poster = poster.resize((round(poster.width * scale), 430), Image.LANCZOS)
    faded = poster.copy()
    faded.putalpha(poster.getchannel("A").point(lambda value: int(value * 0.8)))
    card.paste(faded, (W - MARGIN - poster.width, (H - poster.height) // 2), faded)

    y = 150
    draw.text((MARGIN, y), EYEBROW, font=mono_font, fill=MUTE)
    y += 52
    draw.text((MARGIN, y), NAME, font=name_font, fill=INK)
    y += 108
    for line in LINES:
        draw.text((MARGIN, y), line, font=body_font, fill=BODY)
        y += 44

    draw.line([(MARGIN, H - 132), (W - MARGIN, H - 132)], fill=HAIRLINE, width=1)
    draw.text((MARGIN, H - 108), HANDLE, font=cjk_font, fill=MUTE)

    card.save(out_path, optimize=True)
    print(f"{out_path} — {out_path.stat().st_size / 1e3:.0f} KB")


if __name__ == "__main__":
    main()
