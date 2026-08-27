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
│   │   ├── core.css
│   │   ├── inner.css
│   │   ├── components/
│   │   │   ├── detail.css
│   │   │   ├── directory.css
│   │   │   └── timeline.css
│   │   ├── home/
│   │   │   ├── hero.css
│   │   │   ├── ecosystem.css
│   │   │   ├── business.css
│   │   │   ├── discovery.css
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
│           ├── home.js
│           ├── about.js
│           ├── companies.js
│           ├── company-detail.js
│           ├── marketplace.js
│           ├── technology-detail.js
│           ├── office.js
│           ├── explore.js
│           └── insights.js
└── docs/
    └── source-architecture.md
```

Each HTML page imports its own page stylesheet and page script directly. Shared design-system primitives stay centralized under `assets/css/core.css`, `assets/css/inner.css`, reusable components and `assets/js/shared.js`.

Homepage styling is internally split by feature area because it is considerably larger than inner pages.

## Run locally

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Notes

- Prototype data are mock or representative.
- Remote QTSC imagery is used only to preserve brand context in the UI concept.
- Replace approximate red/orange tokens with official QTSC master brand values when available.
