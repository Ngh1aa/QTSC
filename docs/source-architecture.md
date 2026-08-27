# Source architecture

## Goals

1. Make every page independently maintainable.
2. Keep shared design-system code centralized.
3. Avoid monolithic global CSS/JS files.
4. Preserve easy static hosting and GitHub Pages deployment.

## Static prototype structure

- HTML pages remain at repository root to preserve existing URLs and simple static hosting.
- Every HTML page imports its own `assets/css/pages/<page>.css` and `assets/js/pages/<page>.js` directly.
- Shared visual foundations live in `assets/css/core.css` and `assets/css/inner.css`.
- Reusable visual patterns live under `assets/css/components/`.
- Common inner-page JavaScript helpers live in `assets/js/shared.js`.
- Homepage styling is split further under `assets/css/home/` because the page is much larger than the inner screens. `assets/css/pages/home.css` is a small feature manifest for Homepage only.

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

## Shared component ownership

- `detail.css`: reusable entity/technology detail layout.
- `directory.css`: search, filters and directory cards.
- `timeline.css`: timeline/milestone rows used by About and Office.
- `shared.js`: lightweight helpers such as toast feedback for inner-page prototypes.

## Conventions

- Page-only selectors should stay in the page stylesheet and ideally be scoped with `.page-<name>` when practical.
- If the same visual pattern appears in three or more screens, promote it into `assets/css/components/` instead of copying it.
- Page scripts should only own interactions present on that screen.
- Keep mock data inside the page script when it is purely for prototype behavior; production data architecture is outside this UI/UX prototype scope.
