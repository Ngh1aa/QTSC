# Source architecture

## Goals

1. Make every page independently maintainable.
2. Keep shared design-system code centralized.
3. Avoid a single `styles.css` / `inner.js` becoming a monolith.
4. Preserve easy GitHub Pages deployment.

## Static prototype structure

- HTML pages remain at repository root to preserve existing links and simple GitHub Pages hosting.
- `styles.css` is now only a stylesheet manifest.
- `app.js` is a thin Homepage loader.
- `inner.js` resolves the current HTML filename and loads the matching page script.
- Shared visual primitives live under `assets/css/components/`.
- Page-owned CSS/JS lives under `assets/css/pages/` and `assets/js/pages/`.

## Page ownership

| Screen | HTML | CSS | JS |
|---|---|---|---|
| Home | `index.html` | `assets/css/pages/home.css` | `assets/js/pages/home.js` |
| About | `about.html` | `assets/css/pages/about.css` | `assets/js/pages/about.js` |
| Companies | `companies.html` | `assets/css/pages/companies.css` | `assets/js/pages/companies.js` |
| Company detail | `company-detail.html` | `assets/css/pages/company-detail.css` | `assets/js/pages/company-detail.js` |
| Marketplace | `marketplace.html` | `assets/css/pages/marketplace.css` | `assets/js/pages/marketplace.js` |
| Technology detail | `technology-detail.html` | `assets/css/pages/technology-detail.css` | `assets/js/pages/technology-detail.js` |
| Office | `office.html` | `assets/css/pages/office.css` | `assets/js/pages/office.js` |
| Explore | `explore.html` | `assets/css/pages/explore.css` | `assets/js/pages/explore.js` |
| Insights | `insights.html` | `assets/css/pages/insights.css` | `assets/js/pages/insights.js` |
