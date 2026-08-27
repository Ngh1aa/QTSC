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
├── styles.css              # stylesheet manifest only
├── app.js                  # Homepage loader only
├── inner.js                # inner-page loader only
├── assets/
│   ├── css/
│   │   ├── core.css
│   │   ├── inner.css
│   │   ├── components/
│   │   └── pages/
│   └── js/
│       ├── shared.js
│       └── pages/
└── docs/
    └── source-architecture.md
```

Each screen owns a corresponding CSS and JavaScript file under `assets/*/pages/`. Shared design-system primitives stay centralized.

## Run locally

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Notes

- Prototype data are mock or representative.
- Remote QTSC imagery is used only to preserve brand context in the UI concept.
- Replace approximate red/orange tokens with official QTSC master brand values when available.
