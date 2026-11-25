# Replacement plan and results — QTSC → Northbank

Branch `redesign/northbank`, from `main` at `1a5f660`. Level: Redesign (content, layout and colour). Direction A
"Ember" approved by the owner on 2026-11-25. Page work was split into four groups; three were built by helper
agents from [`page-brief.md`](page-brief.md), one by the lead, and everything was checked together afterwards.

## Replacement plan (done)

| Old owner | Replaced by | Deleted | Protected by |
|---|---|---|---|
| ~40 CSS files (`core.css`, `inner.css`, `gradient-system.css`, `final-polish.css`, `domain-remediation-2026-08-31.css`, `review/*`, `home/*`, `components/*`, 15 `pages/*`, …) | `tokens.css`, `base.css`, `components.css` + 5 page files | 52 CSS files | e2e, visual QA, control inventory |
| Brand tokens with 6 gradients and glows | `tokens.css` colour roles, one accent `#C23A17` | gradient and glow tokens | visual review |
| Header/footer copied into every page, then patched by `shared.js` | `partials/*.html` + `scripts/build-shell.cjs` (`--check` for CI) | per-page headers/footers | `build-shell --check` |
| `shared.js`, `site-extension.js`, `service-experience.js`, `domain-remediation-2026-08-31.js`, `experience-polish.js`, `home.js` | `site.js` (menu, search, drawer, toast) | 6 scripts | e2e, visual QA |
| `ui-feedback-init.js` that also injected the remediation CSS/JS | the canonical init written by `.github/workflows/install-ui-feedback.yml` | the injected layers | — |
| `data/qtsc-seed.js` (real companies, articles, files) + `legacy-detail-extension.js` | `data/park-seed.js` (fictional) | both | e2e |
| Footer demo bar on every page | demo tools only with `?demo=1` | on-screen prototype notes | e2e step 1 |
| 161 images hotlinked from qtsc.com.vn | 17 CC0 / public-domain photos in `assets/images/photos/` | all hotlinks (0 left) | e2e "every page" step |
| `qtsc-chain.html`, `QTSC-UIUX-Research-Presentation.html` | `locations.html` | both | sitemap |

## Diff against `main`

- CSS: 7,378 → 760 lines (8 files). `!important`: 1,619 → 5 (`[hidden]`, reduced motion ×3, invalid field border).
- CSS diff: +746 / −7,137 lines, 60 files. JS diff: +1,336 / −1,627 lines.
- Whole branch: 198 files, +7,456 / −10,102; 76 added, 63 deleted, 59 modified.

## Tests

| Check | Before (`main`) | After |
|---|---|---|
| `.github/qa/e2e-prototype.mjs` | 16/16 | **16/16** |
| `.github/qa/qtsc-visual-qa.mjs` | not run | **PASS** (17 pages, 75 shots, 6 widths) |
| `.github/qa/control-inventory.mjs` | not run | **1,620 controls, 0 dead** on 32 pages |
| `scripts/build-shell.cjs --check` | — | 32 pages in sync |
| taste-check, 32 pages × 390 and 1280 | — | 64 errors, all the same one from `ui-feedback.js` (see limits) |

### Tests changed and why

| Test | Change | Reason |
|---|---|---|
| e2e, all steps | Vietnamese copy → English; data ids `tma`, `kms`, `helios-0405`, `nuoc-thai`, `kms-data-engineer` → `mangrove`, `atlas-0705`, `wastewater`, `mangrove-data-engineer` | Content and seed replaced; same behaviour checked |
| e2e, reset step | opens `index.html?demo=1` | demo tools left the footer (no prototype notes on screen, AGENTS.md rule 3) |
| e2e, solution request and drawer | "says nothing was sent" → shows a reference (and the drawer stores a record) | that sentence was a prototype note on screen; the reference still proves the request was recorded |
| e2e, page count | ≥ 33 → ≥ 32 | two pages removed (QTSC chain, QTSC research deck), one added (locations) |
| e2e, resources | `TEP-MAU` / `TỆP MẪU` → `SAMPLE` / `SAMPLE FILE` | English content; the sample label stays inside the file |
| e2e, open data | CSV header `thang,nhom_du_lieu` → `month,group,dataset,station,parameter` | English columns |
| e2e, map | `.explore-pin.p2` → `.explore-pin[data-place="atlas"]` + `.place-card[data-place]` | new map; selects by building, not by position |
| visual QA | `#innerMobileMenu` → `#mobileMenu`; `.pill-tabs` → `#companyPills` / `#solutionPills`; drawer on a company page; selector clicks Beacon | new shell markup |

## Bugs found by the checks and fixed

- A field showing an error re-validated on blur; removing the message moved the submit button and swallowed the
  click (booking form after the "Sunday" error). Fields now re-check on input (`ui.js`).
- Escape only closed overlays when focus was inside them. `site.js` now closes the open overlay from anywhere.
- Short pages (detail pages without an id) left a white band under the footer; `main` now fills the viewport.
- Shared links under 44 px (footer, legal, breadcrumb, pills, small buttons) raised to 44 px.

## overlay-check result and why it is not a pass

`overlay-check.py --base main` reports 4 errors: `new-layer` on `components.css`, `news.css`, `space.css` (new CSS
loaded last) and `dom-patch` on `site.js`. It counts any new CSS file loaded last as an overlay; here every old
CSS file was deleted and no page loads an old stylesheet (checked: pages load only `tokens.css`, `base.css`,
`components.css` and `pages/*.css`), which is the remedy the checker itself names ("thay hẳn file cũ và gỡ thẻ nạp
file cũ"). `site.js` creates its own overlays (menu, search, drawer) on demand; it does not patch product markup
after render. These are reported as-is: no `brownfield-allow` markers were added, and the checker was not changed.
Suggestion for the owner: let `new-layer` recognise a full replacement (no old stylesheet still loaded on the page).

## Invented content (fictional, listed for hand-off)

Northbank's facts (38 ha, 142 members, 18,600 people, 7 buildings, 11 countries, since 2009, 180 staff), all
company, solution, unit, job, article and resource data in `park-seed.js`, environmental readings (generated),
facility numbers on amenities and getting-here, data center specs, bandwidth packages, security center figures and
courses, investment steps and checker rules (amounts in USD million), awards entries (64 entries, 18 finalists, 9
judges), newsletter figures (48 issues, 6,400 readers), community figures (1,100 members, 2.6 t of litter), and
the two smaller locations. Resource and press downloads are generated `.txt` SAMPLE files even where the card
shows PDF, XLSX or DOCX.

## Known limits

- `ui-feedback.js` (the owner's review tool, installed by a workflow) sets an ARIA attribute axe rejects on
  `#ui-feedback-host`; it shows on every page and has to be fixed in `Ngh1aa/ui-feedback-tool`.
- Inline text links (emails, names inside sentences and tables) stay under 44 px tall; WCAG 2.5.8 exempts inline
  links.
- The lead story on `insights.html` also appears as the first card under "All stories".
- `docs/*.md` outside `docs/redesign/` describe the earlier QTSC concept and are kept as history.
- Not done: independent review by a second person, real-device and screen-reader tests, Safari and Firefox.
- The portfolio case study for QTSC still describes the old concept.
