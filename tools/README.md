# tools

One-off media scripts. They are not part of the build — run them by hand when the source media changes,
then commit the generated files under `portfolio-spa/public/assets/`.

The heavy originals (the 15 MB `torus-v2.gif`, the raw demo GIFs) are no longer checked out, because only
the derived files are served. Restore one from history when you need to re-run a script:

```bash
git log --all --oneline -- 'portfolio-spa/public/assets/videos/torus-v2.gif'
git show <commit>:portfolio-spa/public/assets/videos/torus-v2.gif > /tmp/torus-v2.gif
```

Both scripts need Pillow (`pip install pillow numpy`).

## `torus_to_transparent_webp.py`

Turns the green-on-black ASCII torus recording into the transparent, ink-coloured animation used in the hero.
The backdrop is keyed out by luminance, the glyphs are re-coloured to the ink token, and the result is written
as a lossless animated WebP plus a poster frame.

```bash
python3 tools/torus_to_transparent_webp.py /tmp/torus-v2.gif portfolio-spa/public/assets
```

## `optimize_media.py`

Builds the project media: an 880 px still for the card grid (taken from mid-animation for recordings, so the
poster shows the tool actually working) and a 640 px animated WebP loaded only behind "Play demo".

```bash
python3 tools/optimize_media.py <source-dir> portfolio-spa/public/assets/media
```
