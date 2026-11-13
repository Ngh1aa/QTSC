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
py -3 -m http.server 8926 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8926`. All links are relative, so the same files work under `/QTSC/` on GitHub Pages.

## Interactive workflows (no backend)

Every workflow runs in the browser. Catalogue data comes from one file,
`assets/js/data/qtsc-seed.js`; user data (bookings, applications, enquiries,
demo requests, contact requests, newsletter preferences) is kept in
**sessionStorage** by `assets/js/prototype/store.js`, so it survives navigation
and reload within the tab. Confirmations state that nothing was sent.

| Flow | Pages |
|---|---|
| Company directory: search, sector, building, sort, pagination | `companies.html` → `company-detail.html?id=` |
| Technology Marketplace: search, filters, demo / contact-vendor request | `marketplace.html` → `solution-detail.html?id=` |
| Office: unit finder, site-visit booking, my bookings (reschedule, cancel) | `office.html#units`, `office-unit.html?id=`, `office.html#my-bookings` |
| Investment: eligibility checker → enquiry | `incentives.html#checker` → `investment.html#enquiry` |
| News: category and month filters, article detail | `insights.html?cat=` → `article.html?id=` |
| Download Center: search, filters, official files, browser-generated samples | `resources.html` |
| Careers: jobs, apply (CV file name only), my applications (withdraw) | `careers.html` → `job-detail.html?id=` |
| Newsletter subscribe and manage preferences | `newsletter.html#manage` |
| Contact form (topic via `?topic=`) and the shared "Kết nối QTSC" drawer | `contact.html`, every page |
| Open data: filters, table, CSV export | `open-data.html#explorer` |

Shared pieces: `assets/js/prototype/ui.js` (loading, empty, error, not-found
states, validated forms, confirm dialog, downloads, footer toolbar),
`assets/js/prototype/listing.js` (search + filters + pagination + URL state),
`assets/css/components/prototype.css`.

The footer of every page has **Đặt lại dữ liệu demo** (restore the seed) and
**Giả lập lỗi kết nối** (make every simulated request fail, to check error and
retry states).

## QA scripts

Set `NODE_PATH` to a folder that contains Playwright, start the server above, then:

```bash
node .github/qa/e2e-prototype.mjs       # end-to-end: every flow, reset, no console errors, no href="#"
node .github/qa/control-inventory.mjs   # clicks every control on every page, reports dead ones
QA_BASE_URL=http://127.0.0.1:8926 node .github/qa/qtsc-visual-qa.mjs   # existing device/visual QA
```

## Notes

- Prototype data are mock or representative. Office units, job descriptions and open-data readings are representative prototype content; open-data values are labelled on screen as not official.
- Remote QTSC imagery is used only to preserve brand context in the UI concept.
- Current red/orange values are prototype approximations. Replace the four brand tokens in `tokens.css` with official QTSC master values when available.
