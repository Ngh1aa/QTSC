# Page brief — rebuilding QTSC pages as Northbank (direction A "Ember")

Read first: `docs/redesign/content-model.md` (who Northbank is), `docs/redesign/directions/a-ember.html` (approved
look), and the reference pages `index.html`, `companies.html`, `company-detail.html` with
`assets/js/pages/companies.js` and `assets/js/pages/company-detail.js`. Build every page the same way.

## Page skeleton

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Page name | Northbank Technology Park</title>
<meta name="description" content="One plain sentence.">
<link rel="canonical" href="https://ngh1aa.github.io/QTSC/FILE.html">
<!-- shell:head -->
<!-- /shell:head -->
<link rel="stylesheet" href="assets/css/pages/GROUP.css">   <!-- only if the page needs page CSS -->
</head>
<body data-page="FILE" data-section="SECTION">            <!-- space|infrastructure|companies|invest|news|careers|about -->
<!-- shell:header -->
<!-- /shell:header -->
<main id="main"> … </main>
<!-- shell:footer -->
<!-- /shell:footer -->
<!-- shell:scripts -->
<!-- /shell:scripts -->
<script src="assets/js/prototype/listing.js"></script>    <!-- only for listing pages -->
<script src="assets/js/pages/FILE.js"></script>
</body>
</html>
```

Then run `node scripts/build-shell.cjs YOUR-FILE.html …` (list only your own pages). Never edit the shell blocks by
hand; never edit `partials/`.

## Files you may and may not touch

- **Yours:** the HTML pages of your group, their `assets/js/pages/*.js`, and one CSS file
  `assets/css/pages/<group>.css` for page-only layout.
- **Shared, read-only for you:** `assets/css/tokens.css`, `base.css`, `components.css`, `partials/*`,
  `assets/js/site.js`, `assets/js/prototype/*.js`, `assets/js/data/park-seed.js`, `scripts/*`. If you need a
  change there, do not make it: put a page-level rule in your CSS or report the need in your final message.
- Do not commit. Do not touch other groups' pages.

## Building blocks (components.css / base.css)

Layout `.container`, `.grid-12`, `.section`, `.section-head` + `.section-title`, `.split` / `.split.is-reverse`,
`.prose`, `.kv` (dl). Page top `.page-head` with `.breadcrumb`, `h1`, `.page-head-row` / `.page-head-side`,
`.page-actions`, `.facts` (set `style="--facts:5"` for five), `.page-photo`. Rows `.rows` + `.row-item`
(`.row-num`, `.row-title`, `.row-text`, optional img, `.row-go`), `.rows.is-compact`. Cards `.card-grid`
(`style="--cols:2"`), `.card`, `.card-media`, `.card-title`, `.card-text`, `.card-foot`, `.spec` (dl), `.chip`,
`.badge` (+ `.is-ok .is-warn .is-error .is-muted .is-info`). Dark band `.band.band-split` + `.band-copy` +
`.band-list`. Listing `.toolbar`, `.search-bar`, `.filter-row`, `.pills` + `.pill` (role="tab"), `.select-field`,
`.list-meta`, `.result-list`, `.entity-card` (+ `.entity-mark`, `.entity-side`), `.article-stack` + `.article-card`,
`.resource-card`. Tables `.table-wrap` + `.data-table`. Forms `.form-panel`, `.proto-form`, `.form-grid`,
`.form-field`, `.form-hint`, `.choice-list` + `.choice`, `.form-consent`, `.form-actions`. Records
`.proto-records` + `.proto-record` + `.record-actions` + `.record-edit`. Buttons `.btn` + `.btn-primary`
`.btn-secondary` `.btn-ghost` `.btn-light` `.btn-danger` `.btn-sm`, `.link-arrow`, `.text-link`.

JS helpers: `window.QTSCUI` (showState, pager, bindForm, successPanel, confirmDialog, detailPage, fmtDate,
download, csv, toast), `window.QTSCListing` (createListing, pillControl, fieldControl), `window.QTSCStore`
(seed, list, add, update, value, setValue, request), `window.QTSCBooking`, `window.QTSC.openContact(need)`.

## Photos

`assets/images/photos/<name>.webp` (1920 px) and `sm/<name>.webp` (960 px): casual-meeting, city-dusk,
city-night, coworking, developer, district-aerial, facade-grid, glass-roofline, laptop-work, loft-office, lounge,
meeting-room, open-office, outdoor-work, quiet-desk, server-rack, tower-corner, towers-sky, working-session. Use
`width`/`height` (1920×1280 or 960×640 roughly), `loading="lazy"` below the fold, real `alt` text (empty alt only
when decorative next to a text link). No other images, no hotlinks.

## Rules (from the owner's TASTE.md and AGENTS.md — not optional)

- English, plain and short. Everything fictional: no real companies, people, addresses, phone numbers, logos.
  Use only Northbank facts from the content model and the seed.
- **No explanatory subtitle** under titles or on cards ("Find out how…", "This page shows…"). Keep only data,
  status and error reasons. Hero/side text: at most one short factual sentence.
- **No " · "** joining phrases. No overline label above every heading. No emoji. No gradient, glow, coloured
  left bars, or one-colour-per-icon tiles. One accent colour (the tokens); no hard-coded colours.
- **No prototype notes on screen** ("demo", "sample data", "nothing was sent", "prototype"). Prototype notes
  belong in docs. Generated download files may say SAMPLE inside the file.
- Every link and button goes to a real page or does a real action; never `href="#"`.
- Buttons: verb + object, at most 3 words. Destructive or irreversible actions use `QTSCUI.confirmDialog`
  with the same label on the button and the confirm, then show the new status.
- Dates via `QTSCUI.fmtDate` (weekday or month name, never 04/12/2026).
- Equal padding in cards; same card type looks the same everywhere; no large empty areas (no half-empty grid
  rows, no lone narrow column on desktop). Desktop uses the 12-column grid.
- Touch targets ≥ 44 px, text ≥ 12 px. No `!important`, no inline styles except `--facts`/`--cols`.

## Behaviour contract (the rewritten e2e test will check exactly these)

Keep every id/attribute below. Copy in quotes is the exact English text the test will look for.

**Office (office.html, office-unit.html)** — `#unitResults` gets `data-state="ready"`. Building selector buttons
`[data-office="atlas|beacon|delta|forge"]` update `#officeName` (must contain the building name, e.g. "Atlas").
Filters `#unitBuilding` (values = buildingKey) and `#unitStatus` (`available|soon|leased`) sync to URL
`building=` / `status=`. Unit cards carry `[data-unit="<id>"]` and open `office-unit.html?id=<id>`. Unit detail uses
`QTSCUI.detailPage` (`#detailState`, `#detailStateInner`, `[data-detail]`). Booking form `#bookingForm` with
`#bk-date`, `#bk-time` (options from `seed.visitSlots`), `#bk-name`, `#bk-email`, `#bk-phone`, consent
`[name="consent"]`; Sunday shows a `.field-error` containing "Sunday" (rules in `QTSCBooking.issue`); success
`#bookingHost .proto-success` with `.proto-ref strong` = `BK-…`. `office.html#my-bookings` lists `#myBookings`
(`data-state="ready"`) with one `.proto-record[data-booking="<ref>"]` per booking; seeded booking badge
"Confirmed"; `[data-reschedule="<ref>"]` opens `[data-reschedule-form="<ref>"]` (input `name="date"`, select
`name="time"`, submit) and the record then contains "rescheduled"; `[data-cancel-booking="<ref>"]` → confirm →
`.badge` "Cancelled". `office-unit.html?id=nope` → `#detailStateInner[data-state="notfound"]`.

**Campus map (explore.html)** — pins `.explore-pin[data-place="<key>"]` for the seven buildings (atlas, beacon,
cobalt, delta, echo, forge, grove). Clicking a pin sets `aria-pressed="true"` on the matching
`.place-card[data-place="<key>"]` and fills `.explore-selection`, which links to
`office.html?building=<key>` for buildings with space (atlas, beacon, delta, forge).

**Solutions (marketplace.html, solution-detail.html)** — `#solutionResults` ready, `#innerSearch`, pills
`#solutionPills [data-filter="all|ai|cloud|cyber|erp"]` (role tab), cards `.entity-card` containing the solution
name, linking to `solution-detail.html?id=`. Detail: `#solutionRequestForm` with `#sr-name`, `#sr-email`,
`#sr-company`, `#sr-date`, `#sr-message` (all required) and consent; empty submit → `.form-alert.is-error` and ≥ 4
`[aria-invalid="true"]`; success `#requestHost .proto-success`; requests list `#solutionRequests` with
`[data-cancel-request]` → confirm → `.badge` "Cancelled". Unknown id → not found.

**Careers (careers.html, job-detail.html)** — `#jobResults` ready, `#jobSearch`, `#jobPills [data-filter]`
(job categories), cards `[data-job="<id>"]` → `job-detail.html?id=`. Apply form `#applyForm`: `#ap-name`,
`#ap-email`, `#ap-phone`, `#ap-cv` (file, PDF only: a non-PDF shows a `.field-error` containing "PDF"), consent;
success `#applyHost .proto-success` with `.proto-ref strong`. After reload the job page shows
`#applyHost [data-state="empty"]` containing "already applied". `careers.html#my-applications` lists
`#myApplications [data-application="<ref>"]` including the CV file name; `[data-withdraw="<ref>"]` → confirm →
`.badge` "Withdrawn". Unknown id → not found.

**Investment (incentives.html, investment.html)** — `incentives.html#checker`: `#checkerForm` with `#ck-sector`
(seed.incentiveSectors ids), `#ck-capital`, `#ck-headcount`, `#ck-rnd` (option value `high`), checkboxes incl.
`input[value="import"]`; empty submit → `.form-alert.is-error`; valid → `#checkerResult[data-state="eligible"]`;
`#checkerToEnquiry` carries the answers to `investment.html` (or the same page) where `#enquiryForm` shows
`#enquiryDraftNote` (not hidden) and `#eq-sector` is pre-filled; fields `#eq-company`, `#eq-name`, `#eq-email`,
`#eq-timeline` (an option with value and text "Within 6 months"), consent; success `#enquiryHost .proto-success`;
`#enquiryList .proto-record`.

**News (insights.html, article.html)** — `insights.html?cat=event`: `#articleResults` ready, pills
`#articlePills [data-filter]` (seed.articleCategories keys + all) with `aria-selected`, cards `.article-card`
with `data-category`, each containing a link to `article.html?id=`. Category syncs to `?cat=`. Article detail
uses detailPage; when the article has a `jobId`, `#articleExtra` contains a link `job-detail.html?id=…`.
Unknown id → not found. Use `article.image` (photo name) for images.

**Resources (resources.html)** — `#resourceGrid` ready, `#resourceFilters [data-filter]` (seed.resourceCategories
+ all), `#resourceSearch`, `.resource-card[data-resource="<id>"]`, download buttons `[data-generate="<id>"]`
create a text file whose name contains "SAMPLE" and whose body contains "SAMPLE FILE". Empty search →
`#resourceGrid[data-state="empty"]`.

**Newsletter (newsletter.html)** — `#newsletterHost` with `data-state="subscribe|manage"`; `#newsletterForm`
with `#nl-email`, topic checkboxes `input[value="<topic>"]` (seed.newsletterTopics keys), consent; no topic →
`.field-error` containing "at least one topic"; success `#newsletterHost .proto-success`; after reload
`data-state="manage"` with `#newsletterPrefs` (topic checkboxes + radios `name="frequency"` incl.
`value="events"`), saving shows the toast "Preferences saved" and stores
`QTSCStore.value('newsletter')` = { topics, frequency, … }; `#nlUnsubscribe` → confirm → back to subscribe.

**Open data (open-data.html)** — `#explorer` section: `#odDataset`, `#odParam`, `#odStation`, `#odStatus`
(`all|ok|over`), `#odFrom`, `#odTo` (months 2026-01…2026-10); state synced to URL (`dataset=`, `from=`, …);
`#odResults` (`data-state` ready/empty) with a table (`tbody tr` per reading); `#odExport` downloads a CSV of the
filtered rows whose header starts with `month,group,dataset,station,parameter`.

**Contact (contact.html)** — `?topic=office|visit|invest|…` pre-fills `#ct-topic`; `#contactForm` with
`#ct-name`, `#ct-email`, `#ct-message`, consent; failure keeps input and shows `[data-retry]`; success
`#contactHost .proto-success`; history `#contactHistory .proto-record`.

## Check your pages before you finish

1. `node scripts/build-shell.cjs <your pages>`.
2. A static server already runs at `http://127.0.0.1:8911/` (repo root). Screenshot each page at 1440 and 390:
   `node C:/Users/LENOVO/AppData/Local/Temp/claude/6d2e2e74b21276e1/c8216550-280d-44d1-a71a-92c9e80407fd/scratchpad/tools/qtsc-shots.cjs <outDir> page.html "detail.html?id=x"`
   (prints console errors and horizontal overflow). Open the images and fix what you see.
3. Click through every flow in the contract above with a short Playwright script
   (`require(require('path').join(require('os').homedir(), '.uiux-tools/node_modules/playwright'))`).
4. Run the taste checker on your pages and fix every error:
   `NODE_PATH=$HOME/.uiux-tools/node_modules node C:/Users/LENOVO/Documents/GitHub/uiux-ai-workspace/skills_UIUX/ui-craft-and-visual-qa/scripts/taste-check.cjs http://127.0.0.1:8911/<page> --theme light`
5. `grep` your files for Vietnamese text, "QTSC" in visible copy, `href="#"`, "·", and `!important`.

Report: pages done, what you verified (with numbers), anything you could not do, and any shared change you need.
