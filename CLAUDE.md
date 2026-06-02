# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Dev server

```bash
cd /Users/mariajose/Documents/portafolio && python3 -m http.server 8080
# Open: http://localhost:8080/index.html
```

Hard-refresh after any change: `Cmd+Shift+R`. Bump `styles.css?v=N` in `index.html` when CSS changes need to bypass aggressive caches (e.g. after Netlify deploy).

## Architecture

**No build system.** React 18 + JSX runs entirely in the browser via Babel Standalone (CDN). Files are plain `.jsx` loaded as `<script type="text/babel">`. The load order in `index.html` is a strict dependency chain:

```
content.js → utils.jsx → process-fog.jsx → sections.jsx → app.jsx
```

Each file exposes its exports via `Object.assign(window, {...})` at the bottom. Never reorder the script tags.

### Global data (`content.js`)

All copy and all image slots live here — no content is hardcoded in components.

- `window.CONTENT` — bilingual (`es`/`en`) object. Top-level keys: `nav`, `hero`, `philosophy`, `work`, `skills`, `process`, `timeline`, `playground`, `contact`, `foot`.
- `window.CASE_IMAGES` — per-case image registry. Each key is a case `id` (e.g. `"yoprofe"`). Structure:
  ```js
  { hero: { src, kind, tag, hint_es, hint_en, specs },
    gallery: [{ src, size, kind, tag, download?, chromeLabel? }, ...],
    video?: { youtubeId, label_es, label_en } }
  ```

### Image system (`utils.jsx` → `CaseImage`)

`kind` controls the visual treatment:
- `"float"` — hero PNGs: B&W + zoom hover, no filters (used in cards and modal hero)
- `"photo"` — editorial JPGs: B&W + zoom hover
- `"ui"` — browser-chrome frame, no filter
- `"diagram"` — neutral padded canvas, no shadow

`size` controls gallery grid slot (in `modal__gallery`, `repeat(6,1fr)`):
`lg` (span 4), `md` (span 3), `md-wide` (span 3, 16:9), `sm` (span 2, stretch), `sm-fill` (span 2, stretch), `tall` (span 2, stretch), `wide` (span 6), `portrait` (span 2, 9:16).

Items with explicit `aspect-ratio` use `align-self: start`; stretch items (`sm`, `sm-fill`, `tall`) use `align-self: stretch` to match the row height set by a sized neighbor.

When `src` is missing or fails, `CaseImage` shows `PlaceholderArt` + a hint card — this is intentional while assets are pending upload.

### Hook aliasing convention

Each file destructures React hooks with a file-scoped suffix to avoid collisions across Babel-compiled globals:
- `utils.jsx` — no suffix (uses `React.*` directly)
- `app.jsx` — suffix `A` (`useStateA`, `useEffectA`, `useRefA`, `useMemoA`)
- `sections.jsx` — suffix `S` (`useStateS`, `useEffectS`, `useRefS`, `useMemoS`)

### CSS variables (set once in `app.jsx` on mount)

```
--bg, --ink, --ink-soft, --ink-mute   palette colors
--blob-a/b/c                          ambient fog blob colors
--accent                              terracotta highlight color
--font-sans/serif/mono                Hanken Grotesk / Instrument Serif / JetBrains Mono
--motion, --density                   both hardcoded to "1"
--rule                                border color (rgba, defined in :root)
--bg-soft                             card background (defined in :root)
--gutter                              section horizontal padding (defined in :root)
```

Hardcoded to palette `terracotta` and type `hanken`. `PALETTES` and `TYPE_PRESETS` constants remain in `app.jsx` but are not wired to any toggle.

### Work grid (`sections.jsx` → `Work`)

7 cases in a 12-column grid with `grid-auto-rows: clamp(240px, 26vw, 420px)`:
- Row 1: `case--lg` (span 7) + `case--md` (span 5)
- Row 2: `case--third` × 3 (span 4 each)
- Row 3: `case--md` (span 5) + `case--lg` (span 7)

The `sizes` and `variants` arrays in `Work` are index-matched to `t.work.cases` — order matters.

### Modal (`sections.jsx` → `CaseModal`)

Two-column layout (`3fr 7fr`). Left column: title + sticky nav (`position: sticky; top: 40px`). Right column: content sections with IDs `{caseId}--ctx`, `--proc`, `--gallery`, `--demo`, `--outcome`.

Scroll spy uses `IntersectionObserver` with `root: modalRef.current` (the modal scroll container) and `rootMargin: "-5% 0px -75% 0px"`. Nav items are `<button>` elements that call `scrollIntoView`.

`CaseGallery` accepts a `sectionId` prop to attach the anchor ID to its wrapper div.

### Process fog (`process-fog.jsx`)

Self-contained animation: a terracotta blob travels the dashed process curve. Uses `SVGPathElement.getPointAtLength()` — pauses via `IntersectionObserver` when off-screen, follows mouse on hover. Respects `prefers-reduced-motion`. `buildProcessPath` is shared with `sections.jsx` to ensure the fog path exactly matches the visible dashed line.

## Uploads structure

```
uploads/
  cv/              CV_Product_Designer.pdf
  americasalud/    hero.png, journey.png, before-after.png, actividad.jpg, actividad-bioseguridad.html
  yoprofe/         hero.png, dashboard.png, research.jpg, mobile.png, design-system.png
  simbiotica/      hero.png, aisot.png, tami.png, otto.png, terreno.jpg, UX-en-salas-de-urgencias.pdf
  mentoria/        (pending)
  academia365/     (pending)
  latam/           (pending)
  expoquillota/    (pending)
  dlinnova/        OBSOLETE — no longer referenced, safe to delete
```

## Deployment

Connected to Netlify via GitHub (`majoveg/portafolio`, branch `main`). Push to `main` triggers auto-deploy. `netlify.toml` sets: 1-year cache for `uploads/*`, no-cache for `index.html`, security headers.
