# portfolio

Personal research page — one 680 px column of ink on white paper. No navigation bar, no buttons, no cards, no scroll animation; a link is underlined text. The only decoration is a small transparent ASCII torus at the foot of the home page.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, static export) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4, tokens from [`DESIGN.md`](./DESIGN.md) |
| Motion | `motion` (the project dialog's fade — the only transition on the site) |
| Fonts | Inter + JetBrains Mono via `next/font` |
| Hosting | GitHub Pages (workflow) and Vercel |

## Layout

```
portfolio-spa/          the app (folder name kept so the Vercel project's root directory still resolves)
  src/app/              / (home) and /products, plus the shared layout and 404
  src/components/       footer, torus, project list + thumb + dialog
  src/data/             profile, publications, projects — edit content here, not in components
  public/assets/        torus.webp (transparent animation), torus-poster.png, media/ (project stills + demos)
DESIGN.md               the design system every UI change has to satisfy
```

Content lives in `src/data`. Adding a project means appending one object to `src/data/projects.ts`.

## Develop

```bash
cd portfolio-spa
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build      # static export into out/ (and mirrored to dist/)
```

## Deploy

- **GitHub Pages** — `.github/workflows/deploy.yml` builds with `NEXT_PUBLIC_BASE_PATH=/portfolio` and publishes `portfolio-spa/out`.
- **Vercel** — `npm run build` also mirrors the export to `dist/`, so the project builds whether its framework preset is Next.js or the older static one.

## Media pipeline

The torus is derived from the original `torus-v2.gif`: the near-black backdrop is keyed out to alpha and the glyphs are re-inked, then encoded as a transparent animated WebP. The animation loads immediately in every environment — no reduced-motion, `Save-Data`, or in-viewport gate. `<picture>` hands phones a 122 × 177 px cut and larger viewports the full 244 × 353 px one, so only one file is fetched. Both run the whole 278-frame loop at 14.3 fps; the phone cut is about 610 KB against 1.8 MB, bought by re-quantising alpha to 8 steps after the downscale rather than by dropping frames; the poster frame remains only as the fallback if the WebP fails. Project demos are stills by default; the animated WebP is only fetched when a visitor presses **Play demo**.
