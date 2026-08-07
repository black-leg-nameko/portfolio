---
version: alpha
name: Blackleg-Research-design-system
description: A researcher's page, not a portfolio site — one 680px column of ink on white paper, set in a neutral grotesk with a monospaced face for metadata. There are no buttons, no cards, no tags, no navigation bar and no coloured bands; a link is underlined text and structure is made of space. The only decoration is a small transparent ASCII-art torus at the foot of the page. Authority comes from restraint: nothing on the surface asks to be admired.

colors:
  primary: "#111318"
  on-primary: "#ffffff"
  ink: "#111318"
  body: "#3f4147"
  mute: "#6e6e6e"
  hairline: "#e6e6e6"
  hairline-strong: "#8a8a8a"
  canvas: "#ffffff"
  canvas-soft: "#fafafa"
  canvas-soft-2: "#f4f4f4"
  focus: "#4b2ae0"
  error: "#c50000"
  error-soft: "#f7d4d6"
  glyph: "#111318"
  selection-bg: "#111318"
  selection-fg: "#f2f2f2"

typography:
  name:
    fontFamily: Inter, system-ui, -apple-system, sans-serif
    fontSize: 28px
    fontWeight: 500
    lineHeight: 36px
    letterSpacing: -0.56px
  heading:
    fontFamily: Inter, system-ui, -apple-system, sans-serif
    fontSize: 17px
    fontWeight: 600
    lineHeight: 26px
    letterSpacing: -0.17px
  entry-title:
    fontFamily: Inter, system-ui, -apple-system, sans-serif
    fontSize: 16px
    fontWeight: 500
    lineHeight: 26px
  body:
    fontFamily: Inter, system-ui, -apple-system, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 27px
  meta:
    fontFamily: JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace
    fontSize: 12px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0.24px
  control:
    fontFamily: Inter, system-ui, -apple-system, sans-serif
    fontSize: 13px
    fontWeight: 400
    lineHeight: 20px

rounded:
  none: 0px
  xs: 4px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 40px
  3xl: 48px
  4xl: 64px
  5xl: 80px
  6xl: 112px

components:
  column:
    maxWidth: 680px
    paddingInline: "{spacing.lg}"
    marginInline: auto
  link:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    textDecoration: underline
    decorationColor: "{colors.hairline-strong}"
    decorationThickness: 1px
    underlineOffset: 3px
  link-hover:
    decorationColor: "{colors.ink}"
  meta-line:
    textColor: "{colors.mute}"
    typography: "{typography.meta}"
  entry:
    titleColor: "{colors.ink}"
    titleTypography: "{typography.entry-title}"
    bodyTypography: "{typography.body}"
    metaTypography: "{typography.meta}"
    gap: "{spacing.lg}"
  project-row:
    borderColor: "{colors.hairline}"
    rowBorder: bottom
    padding: "{spacing.lg} 0px"
    thumbWidth: 152px
    gap: "{spacing.lg}"
  image-well:
    backgroundColor: "{colors.canvas-soft}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.none}"
    aspectRatio: "16 / 10"
    inset: "{spacing.xs}"
    objectFit: contain
  dialog-figure:
    backgroundColor: "{colors.canvas-soft}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.none}"
    maxHeight: 52vh
    inset: "{spacing.xs}"
    objectFit: contain
  control:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline-strong}"
    typography: "{typography.control}"
    rounded: "{rounded.none}"
    padding: "0px 14px"
    minHeight: 36px
  dialog:
    backgroundColor: "{colors.canvas}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.none}"
    maxWidth: 760px
    padding: "{spacing.lg} {spacing.xl}"
    scrimColor: "{colors.ink}"
    scrimOpacity: 0.2
  footer-line:
    textColor: "{colors.mute}"
    typography: "{typography.meta}"
    padding: "0px 0px {spacing.4xl}"
    layout: "one dotted link run, left-aligned"
  skeleton:
    backgroundColor: "{colors.canvas-soft-2}"
    rounded: "{rounded.none}"

---

## Overview

This is a researcher's page. The reference class is a personal page in a lab or a university directory — a name, what the person works on, what they published, how to reach them — not a product landing page. Everything that a portfolio template would add (a hero band, a sticky nav, pill buttons, tag chips, project cards, scroll reveals, alternating grey sections) has been removed, and the removal *is* the design.

The whole site is one column of `{colors.body}` text on `{colors.canvas}` white, 680 px wide, set in Inter at 16 px. Section headings are the same typeface one step up in size and weight. Metadata — venues, dates, stacks, the footer — is JetBrains Mono at 12 px. That is the entire type system.

**Key characteristics:**
- **One column, one width.** 680 px, centred, on every page and at every breakpoint. There is no second layout.
- **No buttons.** A link is underlined text. The only exception is the project dialog, whose controls have to read as pressable; they get a square hairline box, never a pill.
- **No cards, no chips, no bands.** Structure comes from vertical space and, where a list needs scanning, a 1 px `{colors.hairline}` rule. Nothing is filled, floated, or elevated except the modal.
- **No navigation bar.** The home page is short enough to read; `/products` gets a text back-link. Nothing is sticky.
- **No entrance animation.** Content is in the first paint, at full opacity, always.
- **One decoration**, the ASCII torus, small and last.

## Colors

The palette is three greys and a focus colour. Anything else is a bug.

- **Ink** (`{colors.ink}` — `#111318`): headings, entry titles, links, the torus glyphs.
- **Body** (`{colors.body}` — `#3f4147`): every paragraph. Prose is deliberately *not* pure ink — the headings need somewhere to step up to.
- **Mute** (`{colors.mute}` — `#6e6e6e`): metadata only. It carries 12 px mono, so it sits at the darkest tone that still reads as quiet while clearing WCAG AA on both surfaces it appears on: 5.1:1 on `{colors.canvas}`, 4.9:1 on `{colors.canvas-soft}`.
- **Hairline** (`{colors.hairline}` — `#e6e6e6`): list separators and image-well borders. The only rule colour.
- **Hairline Strong** (`{colors.hairline-strong}` — `#8a8a8a`): the underline under every link at rest, and the dialog control's border. As a control boundary it clears WCAG 1.4.11 non-text contrast (3.45:1 on canvas).
- **Canvas Soft** (`{colors.canvas-soft}` — `#fafafa`) / **Canvas Soft 2** (`{colors.canvas-soft-2}` — `#f4f4f4`): image wells and skeletons. Never a section background.
- **Focus** (`{colors.focus}` — `#4b2ae0`): the focus ring, and nothing else. It is the only colour on the site, which is why it can be seen from across the room — links do not use it, because a page where every link is indigo is a page with a colour scheme.
- **Error** (`{colors.error}` / `{colors.error-soft}`): the failed-demo message in the dialog. No other semantic colour is in use.

### The torus
A transparent animated WebP whose glyphs are `{colors.glyph}` at varying alpha. Rules:
- It appears **once, beside the name at the top of the home page, at 140 px wide**, at 70 % opacity — where a researcher's page would put a portrait. It is not a hero: it takes the right edge of the column at the size of a photograph, and the name stays the largest thing on the page. Below 700 px the column is too narrow to hold both, so it sits above the name instead of shrinking.
- It does not go smaller than 140 px: the source is 244 px of monospace glyphs, and below that they stop resolving as characters and turn into a grey smudge.
- It is `aria-hidden`, never tinted, never inverted onto a dark plate, never cropped, never placed behind text.
- The static poster frame renders first and stays for reduced-motion visitors and `Save-Data`. Once visible, viewports under 700 px fetch the lower-resolution, lower-frame-rate mobile animation; larger viewports fetch the full animation.

## Typography

### Font family
1. **Inter** (400 / 500 / 600) — the name, headings, entry titles, prose, dialog controls. Never 700.
2. **JetBrains Mono** (400) — metadata only: venue, date, author line, stack, project count, back-link, footer. Never a paragraph, never uppercased.

### Hierarchy

| Token | Size | Weight | Line height | Use |
|---|---|---|---|---|
| `{typography.name}` | 28px | 500 | 36px | The name, and the `<h1>` of `/products` and 404. The largest type on the site. |
| `{typography.heading}` | 17px | 600 | 26px | Section headings: Publications, Projects, Contact. |
| `{typography.entry-title}` | 16px | 500 | 26px | Publication titles, project titles, role titles. |
| `{typography.body}` | 16px | 400 | 27px | Every paragraph, every list item. |
| `{typography.meta}` | 12px | 400 | 20px | Mono metadata. |
| `{typography.control}` | 13px | 400 | 20px | Dialog control labels. |

The scale does not change at any breakpoint. Six sizes exist and the gap between the largest and the smallest is 16 px — the hierarchy is carried by weight, colour, and space, not by scale.

### Principles
- **Nothing above 28 px.** A 48 px headline is a marketing move; this page does not make one.
- **Sentence case everywhere.** There is no uppercase on the site, including in mono. Uppercase mono eyebrows are the tell of a template.
- **Mono is metadata.** If a string is a date, a venue, a stack, a count, or a navigational aside, it is mono. Otherwise it is sans.
- **Weight 600 is the ceiling**, and it is used only on section headings.
- **Measure before decoration.** The 680 px column puts prose at roughly 72 characters. Never widen a block to fill space.

## Layout

### Spacing
- **Base unit** 4 px. Tokens: `{spacing.xxs}` 4 · `{spacing.xs}` 8 · `{spacing.sm}` 12 · `{spacing.md}` 16 · `{spacing.lg}` 24 · `{spacing.xl}` 32 · `{spacing.2xl}` 40 · `{spacing.3xl}` 48 · `{spacing.4xl}` 64 · `{spacing.5xl}` 80 · `{spacing.6xl}` 112.
- **Page padding**: `{spacing.5xl}` top and bottom on mobile, `{spacing.6xl}` from 700 px.
- **Between sections**: `{spacing.4xl}`. This gap is the only thing separating them — there is no rule and no background change.
- **Inside a section**: heading → prose `{spacing.sm}`; prose → list `{spacing.lg}`; between entries `{spacing.lg}`; entry title → line `{spacing.xxs}`.
- **Between paragraphs**: `{spacing.2xl}` after the name block, `{spacing.lg}` between body paragraphs.

### Grid & container
- **One container**: 680 px max width, `{spacing.lg}` gutters, centred. The header line, the prose, the project rows and the footer all share the same two edges.
- **Column patterns**: single column everywhere. The two exceptions are internal and both collapse below 700 px:
  - Tools: a mono label column (128 px) beside its values.
  - Project rows: a 152 px figure beside the text (96 px below 700 px — it never disappears, because the figure is content).

### Responsive strategy

| Name | Width | Key changes |
|---|---|---|
| Mobile | < 700px | Page padding drops to `{spacing.5xl}`; the Tools label/value pair stacks; project figures shrink to 96 px; the torus uses its lightweight animation. |
| Tablet / Desktop | ≥ 700px | Full page padding, side-by-side Tools rows, 152 px figures, torus animates. |

There is no ≥ 1100 px behaviour. The column stops growing at 680 px, and the extra viewport is margin — that is the point.

#### Touch targets
Links inside a sentence take WCAG 2.2's inline exception; padding them would break the paragraph. Everything else clears 44 × 44 px, and 24 px is treated as a floor to clear, not a size to hit:
- links in a dotted run — the footer, the "GitHub · X · LinkedIn" line — get `min-width: 44px` and 12 px of block padding, because a one-letter label like "X" is not protected by the inline exception;
- a link alone on a meta line — the dialog's "Open full size ↗" — gets the same 44 px box.

The padding is invisible, so the caller cancels it with a negative margin and the page rhythm is unchanged. Dialog controls are 36 px tall.

#### Image behaviour
- **Project figures**: 16:10 well, `object-fit: contain` with 8 px inset, `{colors.canvas-soft}` surface, 1 px hairline, square corners, lazy below the third row. These are screenshots and architecture diagrams; cropping them to fill removes the content that makes the row worth opening. The well is `self-start` in its row — a stretched well is a broken aspect ratio.
- **Dialog figure**: the same well, but capped at `52vh` instead of a fixed ratio, so a portrait screenshot cannot push the description out of the panel. Its thumbnails are `contain` too, at 96 × 64.
- **Skeletons** are removed once the image loads. `contain` letterboxes, so a skeleton left underneath keeps pulsing around the picture forever.
- **Torus**: transparent WebP, intrinsic size declared, never cropped.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Level 0 — Flat | Nothing. | The entire site. |
| Level 1 — Hairline | 1 px `{colors.hairline}`. | Project row separators, image wells. |
| Level 2 — Modal | `0 12px 40px -16px #00000033` + 1 px hairline + a `{colors.ink}`/20 % scrim. | The project dialog, and only because a floating panel has to detach from the page behind it. |

There is no hover lift, no card shadow, no blur. If a surface needs to separate, it gets a rule.

## Shapes

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Everything: image wells, dialog, controls, thumbnails. |
| `{rounded.xs}` | 4px | Focus ring geometry only. |

Rounded corners are a product-UI convention. This page is a document, and documents have square edges.

## Components

### Link
Ink text, 1 px underline in `{colors.hairline-strong}` at 3 px offset; on hover the underline goes to `{colors.ink}`. That is the whole interaction vocabulary of the site — every navigation, every external reference, the email address, the back-link and "All 8 projects, with demos →" are the same object.

A link that opens a dialog rather than a page is a `<button>` carrying the same underline on its title, plus `aria-haspopup="dialog"`.

### Meta line
`{typography.meta}` in `{colors.mute}`. Multiple values are joined with a middle dot and a 10 px gutter (`·`), never wrapped in boxes. Links inside a meta line inherit mute and go ink on hover.

Three rules the implementation has to honour:
- **The separator is not part of the link.** The `·` is generated on a wrapper around the anchor, never on the anchor: inside it, it gets the link's underline and lands in the link's accessible name ("·GitHub"). The wrapper is `white-space: nowrap`, so a wrap never strands a dot at the end of a line, and a run that would wrap is split into two blocks instead (the footer does this below 700 px).
- **Japanese metadata is set in the sans face** at 13 px, because JetBrains Mono has no CJK and would otherwise fall back mid-line. Venues, author lines, group labels, an award's programme name and selected domain, and the dialog's Japanese subtitle take this path.

### Entry
The one repeating structure, used by publications, projects, and roles: title in `{typography.entry-title}`, one line of prose in `{typography.body}`, one meta line. Entries are separated by `{spacing.lg}` of space; only the `/products` list adds hairlines, because it is long enough to need scanning.

**Group label** — where a list is split, each group is introduced by a `{typography.meta}` label in `{colors.mute}`, `{spacing.sm}` above its first entry, with `{spacing.2xl}` between groups. The label is a `<h3>` but it is set in the metadata voice, not as a `{typography.heading}`: it has to name the group without competing with the titles under it. Publications use this to keep peer-reviewed work and non-peer-reviewed work visibly apart — an unlabelled merged list overstates the record, so the flag on the data is required, not optional.

### Project row
`/products` only. A `<button>` spanning the column: figure left, then title (underlined), summary, and a meta line of field + stack. Bottom hairline per row. Opening it is the only way to reach the demo.

### Control
The dialog's Close / Play demo / Stop buttons. `{typography.control}`, 36 px min height, 14 px inline padding, 1 px `{colors.hairline-strong}`, square, white fill. Hover darkens the border to ink. This is the only bordered interactive element in the system.

A control placed over an image carries its own white fill and border, and the image behind it is **not** dimmed. A translucent plate over a poster frame reads as a disabled image, and it is a surface the elevation table does not have.

### States (mandatory)
- **Empty** — a sentence, not a panel: "Nothing published yet — the work in progress is on GitHub." Every list surface must have one, and it must not be a bordered box. The one exception is a section whose heading is a claim in itself: Awards & Grants renders nothing at all when the list is empty, because a heading over "nothing yet" states an absence the page was not asked to state. A section may take this exception only by omitting its heading with it. The same holds one level down: a group with no entries is not an empty group, it is absent — the label goes with it, and a list left with a single group carries no label at all, because a label names a split.
- **Loading** — a `{colors.canvas-soft-2}` skeleton at the final element's dimensions with an opacity pulse. Never a spinner.
- **Error** — an inline `{colors.error}` message on `{colors.error-soft}` with a retry control, never a bare stack trace.

### Dialog
760 px max width, square, hairline border, `{colors.ink}` 20 % scrim, `{spacing.lg} {spacing.xl}` padding. The header (title in `{typography.heading}` + Japanese subtitle + Close) sits over a scrolling body (figure, thumbnails, description, meta, external link). It opens and closes with an 180 ms opacity fade — no translation, no scale. The title is a heading, not a display size: a dialog is not a page.

A surface that claims `aria-modal="true"` must behave like one: focus moves into the panel on open, `Tab` / `Shift+Tab` cycle inside it, `Escape` closes it, the page behind it stops scrolling, and focus returns to the element that opened it. A dialog without a focus trap is a bug, not a polish item.

### Motion
Effectively none. The site ships three moving things:
1. the dialog's 180 ms fade,
2. 150 ms colour transitions on link underlines and control borders,
3. the torus animation, with a lightweight asset on mobile.

There are **no scroll reveals and no route transitions**. Content renders visible in the HTML at full opacity — an element hidden by render-blocking CSS and un-hidden by a hydration-time observer is a blank first paint, not an animation.

`prefers-reduced-motion: reduce` collapses every remaining transition and holds the torus at its poster frame. The CSS media query cannot reach a JS-driven animation, so the dialog's fade reads the preference itself and drops its duration to zero — a motion library's defaults are not a reduced-motion implementation.

## Do's and Don'ts

### Do
- Keep the page white and the column 680 px. Extra viewport is margin.
- Make new interactive things links, and make links underlined text.
- Use space to separate; add a hairline only when a list is long enough to scan.
- Keep metadata in mono and prose in sans, at 12 px and 16 px respectively.
- Let the content be the design: a new section is a heading and a list, nothing more.
- Keep the torus small, last, and quiet.

### Don't
- Don't add a nav bar, a sticky header, a hero band, or a section background.
- Don't add a button, a pill, a chip, a tag, a badge, or a card. If something looks clickable because of its box, it is wrong.
- Don't introduce a second colour, a gradient, or an icon set.
- Don't set anything above 28 px, at weight 700, or in uppercase.
- Don't animate anything on scroll, and don't fade a page in on navigation.
- Don't round a corner.

## Adaptations

Adapted from the `vercel` system in the collection, then reduced past it:
- **Type scale collapsed** from a five-step display ladder (48 → 20 px) to a single 28 px name plus a 17 px heading. Negative tracking survives only on the name.
- **Fonts swapped** off the proprietary faces: Geist → **Inter** (400/500/600), Geist Mono → **JetBrains Mono** (400).
- **Accent demoted**: indigo `#4b2ae0` is kept but reassigned to the focus ring alone. Links are ink with a grey underline, so the page has no colour scheme at all.
- **Component set gutted**: buttons, pills, tags, cards, nav bar, mobile overlay, section bands, eyebrows, empty-state panels and scroll reveals are all removed. What remains — link, meta line, entry, project row, control, dialog — is the minimum a document needs.
- **Elevation flattened to three levels**, two of which are "nothing" and "a 1 px rule".
- **Radius removed**: the 4/6/8/12/100/9999 ladder collapses to 0, with 4 px kept only for focus geometry.
- **Container narrowed** 1040 → 680 px: this surface is prose, and prose has a measure.

Carried forward from earlier reviews of the previous system (still binding):
- `mute` at `#6e6e6e` so 12 px mono clears AA on both white and `canvas-soft`.
- `hairline-strong` at `#8a8a8a` so it clears WCAG 1.4.11 as a control boundary — it is now also the link underline.
- Project figures use `contain`, not `cover`.
- The dialog focus contract, written above, is not optional.
- The torus stays a poster frame under reduced-motion and `Save-Data`; under 700 px it uses a lightweight animation.

Changed in this revision:
- Breakpoints reduced from three (700 / 900 / 1100) to one (700), because there is only one layout to change. Tailwind's `md` / `lg` / `xl` / `2xl` are unset so a stray utility cannot reintroduce a fourth.
- `accent` renamed to `focus`, since that is now its entire job.
- The torus's animation fetch moved behind an IntersectionObserver now that it lives at the foot of the page.
- The skip link was removed with the nav bar: with no repeated block before `<main>`, there is nothing to bypass.

Changed after the design review of this revision:
- Touch-target rule raised from the 24 px minimum to the 44 px floor for standalone link runs.
- Separator dots moved outside the anchors; they were being underlined and read out as part of each link's name.
- Project-figure wells given `self-start`; the flex row was stretching them and killing the 16:10.
- Thumbnail skeletons now unmount on load instead of pulsing forever behind a letterboxed image.
- Dialog title dropped from an off-scale 20 px to `{typography.heading}`, and its header padding moved onto the spacing tokens.
- Dialog thumbnails switched from `cover` to `contain`, and the figure capped at `52vh`.
- The dim plate behind "Play demo" removed.
- Japanese metadata moved off the mono face. The selector has to match both the meta element itself (an all-Japanese author line) and a span inside it (a venue in a mixed line) — the first pass only did the second and silently changed nothing.
- Reduced-motion handling extended to the JS-driven dialog fade.
- The dialog scrim is a `div`, not a full-viewport `<button aria-label="Close">`: Escape and the header's Close already serve the keyboard, and the button only added noise to the accessibility tree.
- The footer stacks below 700 px instead of wrapping mid-run. It has since lost its copyright line and is one link run; the torus moved from the foot of the page to the top, beside the name.
- "Open full size ↗" raised to a 44 px target; it is alone on its line in most projects, so the inline exception does not cover it.
