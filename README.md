# Leapfrog Labs — website

A single-page marketing site for Leapfrog Labs. Static, no build step, no
dependencies. Written in plain HTML, CSS and vanilla JS so it stays easy to read,
edit and host anywhere.

## Run locally

It's static, so just open `index.html` — or serve the folder to get correct
relative paths and live-reload with any static server:

```bash
# Python (bundled on macOS)
python3 -m http.server 8000
# then visit http://localhost:8000

# or Node
npx serve .
```

## Project structure

```
leapfrog-labs/
├── index.html          # All content + page structure (single source of truth)
├── css/
│   └── styles.css      # Design tokens + component styles (see section map on top)
├── js/
│   └── main.js         # Scroll reveal, card glow, footer year — all optional
└── assets/
    ├── logo-mark.svg   # Brand mark, white on transparent (for dark placements)
    └── favicon.svg     # Brand tile used as the favicon
```

## Where to change things

| I want to…                     | Go to |
|--------------------------------|-------|
| Edit any copy / add a service  | `index.html` — content lives in markup, not JS |
| Recolour / rebrand             | `css/styles.css` → **section 1, `:root`** design tokens |
| Adjust spacing rhythm          | `:root` → `--container-*`, `--section-pad` |
| Change the logo shape          | `index.html` → the `#lf-mark` `<symbol>` (defined once, reused via `<use>`) |
| Tune the R&D schematic colours | `css/styles.css` → `--bp-*` tokens (section 1) |
| Change the contact email       | `index.html` → `mailto:hello@leapfrog.se` |

### Design tokens
Colours are **never** hard-coded inside components — they always reference a
token in `:root`. Re-theming the whole site (including the SVG blueprint art) is
done by editing those tokens in one place. Space blue `#1D2951` is the only
accent; everything else is grayscale.

### The logo
The mark's geometry is defined once as an SVG `<symbol>` (`#lf-mark`) and rendered
with `<use>` in the header, footer and hero reticle. It inherits `currentColor`,
so it automatically flips to the right colour with the theme. The standalone
`assets/logo-mark.svg` is the white-on-transparent brand asset for dark contexts.

### Blueprint graphics
The "Ideas, caught early" schematics are inline SVG. Geometry (paths, stroke
widths, dash patterns) stays inline; **colour** comes from `.bp-*` classes wired
to tokens, so the art re-themes with the rest of the site.

## Conventions

- **Naming:** light BEM — `block__element--modifier`.
- **CSS order:** tokens → base → layout → utilities → components → motion → responsive.
- **Progressive enhancement:** JS only adds polish. With JS disabled (or
  `prefers-reduced-motion`), all content is visible and the site is fully usable.

## Accessibility

- Semantic landmarks (`header` / `nav` / `main` / `footer`), one `h1`, ordered headings.
- Skip-to-content link, visible `:focus-visible` styles.
- `prefers-reduced-motion` disables reveals, the spinning reticle and smooth scroll.
- Decorative SVG/layers are `aria-hidden`.

## Browser support

Modern evergreen browsers. Uses `clip-path`, `backdrop-filter`,
`IntersectionObserver`, CSS custom properties and `aspect-ratio` — all with
graceful fallbacks (the layout still reads without them).
