# QTSC UI Improvement — 2026-08-29

## Continuation — 2026-08-30

- Removed committed merge-conflict artefacts from 26 HTML files; each route now contains one coherent document instead of two concatenated versions.
- Preserved the journey-rich page bodies while standardising the latest six-group header, contact action, official English link and footer across all public routes.
- Enabled the shared route/experience extension sitewide so deep-linked users receive stable active navigation, five goal shortcuts, image-loading defaults and the intended inner-page polish layer.
- Added safe-area-aware shell/footer behavior, visible active navigation and a balanced odd proof cell on mobile.
- Added a repository-backed UX review and updated the decision log with evidence, trade-offs and verification requirements.

## Scope changed

- Rebuilt Home as a seven-block journey surface instead of a 17-section content inventory.
- Unified Home with the shared navigation, search, contact and mobile-menu owners.
- Updated global information architecture to six intent-led groups.
- Added a dedicated Home stylesheet and removed the legacy Home override cascade.
- Reframed the visual system around architectural/editorial grid, official campus photography and restrained orange signals.

## What was preserved

- Existing static HTML/CSS/JavaScript architecture and GitHub Pages URLs.
- QTSC brand identity, logo, Manrope, primary `#EE4623` and official photography.
- Dated 2026 statistics and KPMG source context.
- Existing specialist pages, search index and honest email contact fallback.
- Focus-visible, Escape, focus trap/return and reduced-motion foundations.

## Changed surfaces

| Surface | Owner | Change |
|---|---|---|
| Home journey | `index.html` | Hero + five task launchers + six supporting decision blocks |
| Home visual system | `assets/css/home/experience-v2.css` | New mobile-first editorial/architectural composition |
| Home manifest | `assets/css/pages/home.css` | One owned stylesheet instead of stacked legacy overrides |
| Home behaviour | `assets/js/pages/home.js` | Reveal and in-page navigation only |
| Shared navigation | `assets/js/shared.js`, `site-extension.js` | Six groups, matching mega menus and grouped mobile accordions |
| Shared shell | `assets/css/core.css` | Flat institutional header rail and safer long-label breakpoint |

## Verification

| Check | Result |
|---|---|
| UI/UX skill/profile validation | Pass: 84 skills |
| JavaScript syntax: shared, Home, extension | Pass |
| Git whitespace/error check | Pass |
| CSS brace balance | Pass: 191/191 |
| Home internal file targets | Pass |
| Home structure | Pass: seven sections, one H1 |
| Browser visual QA | Not available in this execution environment |
| Production contact delivery | Not implemented; approved endpoint/CRM still required |

## Remaining decisions

- Confirm official master colour values; `#EE4623` remains the selected digital prototype token.
- Approve production CRM/email delivery, consent language, owner and SLA.
- Validate the six-group taxonomy through tree testing and query logs.
- Confirm data owners, source dates and completeness for Directory/Marketplace.
- Run rendered viewport, keyboard, screen-reader, performance and deployed SEO checks before production claims.
