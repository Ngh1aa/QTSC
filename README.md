# QTSC UI/UX Redesign Prototype

Interactive static prototype focused on QTSC UI/UX behavior rather than production backend integration.

## Source structure

```text
.
├── index.html
├── about.html
├── companies.html
├── company-detail.html
├── marketplace.html
├── technology-detail.html
├── office.html
├── explore.html
├── insights.html
├── assets/
│   ├── css/
│   │   ├── tokens.css          # color, spacing, radius, shadow, motion
│   │   ├── typography.css      # one shared type scale
│   │   ├── layout.css          # container, section rhythm, grids
│   │   ├── core.css            # shared shell/components; imports foundation
│   │   ├── inner.css           # inner-page hero/layout families
│   │   ├── components/
│   │   │   ├── detail.css
│   │   │   ├── directory.css
│   │   │   └── timeline.css
│   │   ├── home/
│   │   │   ├── hero.css
│   │   │   ├── ecosystem.css
│   │   │   ├── business.css
│   │   │   ├── discovery.css
│   │   │   ├── legacy-strengths.css
│   │   │   ├── icon-cleanup.css
│   │   │   └── responsive.css
│   │   └── pages/
│   │       ├── home.css
│   │       ├── about.css
│   │       ├── companies.css
│   │       ├── company-detail.css
│   │       ├── marketplace.css
│   │       ├── technology-detail.css
│   │       ├── office.css
│   │       ├── explore.css
│   │       └── insights.css
│   └── js/
│       ├── shared.js
│       └── pages/
└── docs/
    ├── source-architecture.md
    └── ui-foundation.md
```

## UI Foundation

`assets/css/core.css` imports three foundation files in this order:

1. `tokens.css` — semantic brand/text/surface/border tokens, spacing, radius, elevation, motion and icons.
2. `typography.css` — Manrope and the shared display/heading/body/label scale.
3. `layout.css` — container width, section spacing hierarchy and grid utilities.

Page CSS should consume these tokens instead of inventing local values. See [`docs/ui-foundation.md`](docs/ui-foundation.md) before adding or redesigning a page.

Each HTML page imports its own page stylesheet and page script directly. Shared design-system primitives stay centralized under the foundation, `core.css`, `inner.css`, reusable components and `assets/js/shared.js`.

## Run locally

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Notes

- Prototype data are mock or representative.
- Remote QTSC imagery is used only to preserve brand context in the UI concept.
- Current red/orange values are prototype approximations. Replace the four brand tokens in `tokens.css` with official QTSC master values when available.
