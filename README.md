# Northbank Technology Park — website prototype

An interactive static prototype of the website of **Northbank Technology Park**, a fictional technology park on
the Saigon River in Ho Chi Minh City: offices and labs for rent, a data center, a directory of member companies,
investment support, news, jobs and open environmental data. Content is in English.

This repository started as a redesign concept for a real organisation's website (QTSC). On 2026-11-25 it was
redesigned as a fictional park, so that no real organisation's name, people, tenants, logos or photos are used.
The repository name and URL stay `QTSC` so existing links keep working. The redesign record is in
[`docs/redesign/`](docs/redesign/).

## Everything here is fictional

- Northbank, its buildings, member companies, people, prices, numbers, articles and jobs are made up.
- Email addresses use the reserved `.example` domain; the phone number is a placeholder.
- Photos are CC0 or public-domain images from Wikimedia Commons; sources are in
  [`assets/images/photos/CREDITS.md`](assets/images/photos/CREDITS.md).
- Nothing is sent anywhere. Forms save to `sessionStorage` in the current browser tab only.

## Run locally

```bash
py -3 -m http.server 8926 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8926`. Links are relative, so the same files work under `/QTSC/` on GitHub Pages.

**Demo tools:** open any page with `?demo=1` to show a small panel with shortcuts, **Fail next requests** (to
check error and retry states) and **Reset demo data**. It stays on for the tab; `?demo=0` hides it.

## Source structure

```text
.
├── *.html                        32 pages, each with <!-- shell:* --> markers
├── partials/                     head, header, footer and scripts shared by every page (the only source)
├── scripts/build-shell.cjs       writes the partials into the pages (--check for CI)
├── assets/
│   ├── css/
│   │   ├── tokens.css            colour roles, type scale, spacing, radius, motion
│   │   ├── base.css              reset, layout grid, header, footer, buttons, page head
│   │   ├── components.css        rows, cards, listings, forms, states, records, dialogs, demo tools
│   │   └── pages/*.css           page-only layout (home, space, business, news, about)
│   ├── js/
│   │   ├── data/park-seed.js     all catalogue data and the starting user data
│   │   ├── prototype/            store (sessionStorage), ui kit, listing engine, booking rules
│   │   ├── site.js               mobile menu, site search, "Get in touch" drawer, toast
│   │   └── pages/*.js            one script per interactive page
│   └── images/photos/            CC0 photos, 1920 px and sm/ 960 px
└── docs/redesign/                inventory, content model, direction gate, page brief, plan
```

To change the header, footer or shared `<head>`, edit `partials/` and run `node scripts/build-shell.cjs`.

## Interactive workflows (no backend)

| Flow | Pages |
|---|---|
| Company directory: search, sector, building, sort, pagination | `companies.html` → `company-detail.html?id=` |
| Solutions from members: search, category, demo request, my requests | `marketplace.html` → `solution-detail.html?id=` |
| Space: building selector, unit finder, visit booking, my visits (reschedule, cancel) | `office.html`, `office-unit.html?id=`, `office.html#my-bookings` |
| Campus map with building pins | `explore.html` |
| Investment: eligibility checker → enquiry | `incentives.html#checker` → `investment.html` |
| News: categories, article detail | `insights.html?cat=` → `article.html?id=` |
| Downloads with generated sample files | `resources.html` |
| Jobs: search, apply (CV file name only), my applications (withdraw) | `careers.html` → `job-detail.html?id=` |
| Newsletter: subscribe, manage, unsubscribe | `newsletter.html#manage` |
| Contact form (`?topic=`) and the "Get in touch" drawer | `contact.html`, company pages |
| Open data: filters, table, CSV export | `open-data.html#explorer` |

## QA scripts

Set `NODE_PATH` to a folder that contains Playwright, start the server above, then:

```bash
node .github/qa/e2e-prototype.mjs       # every flow, reset, no console errors, no href="#"
node .github/qa/control-inventory.mjs   # clicks every control on every page, reports dead ones
QA_BASE_URL=http://127.0.0.1:8926 node .github/qa/qtsc-visual-qa.mjs   # device and visual checks
node scripts/build-shell.cjs --check    # every page carries the current shell
```
