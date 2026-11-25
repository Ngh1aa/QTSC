# Redesign inventory — from QTSC to a fictional technology park

Branch: `redesign/northbank` (from `main` at `1a5f660`). Level: **Redesign** (owner: "thiết kế lại hoàn toàn
nội dung, layout như một công ty hoặc tập đoàn giả tưởng… đổi luôn màu sắc nếu cần").

Owner decisions (2026-11-25): the fictional entity is a **technology park** (keeps the product's flows);
site language is **English**.

## Why the content has to change, not only the look

- The site is a redesign of a **real organisation** (Quang Trung Software City): its name, logo, address,
  phone, real tenant companies (Hitachi, TMA, FPT, Viettel, KMS…) and its own photos.
- **161 image references** are hotlinked from `qtsc.com.vn`, `info.qtsc.com.vn` and `office.qtsc.com.vn`
  (41 files). They are that organisation's assets and stop working if its site changes. All are replaced by
  CC0 / public-domain photos stored in the repo (see `assets/images/photos/CREDITS.md`).

## UI ownership map

| Layer | Files | Lines | Notes |
|---|---|---|---|
| CSS | ~40 files under `assets/css/` | 7,151 | Layers stack by date: `final-polish.css`, `domain-remediation-2026-08-31.css`, `review/*-2026-08-28*.css`, `*-parity.css`, `surface-type-normalization.css`. **1,619 `!important`.** |
| Tokens | `assets/css/tokens.css` | 158 | Brand red-orange `#EE4623` + 6 gradients (`--brand-gradient*`, `--brand-radial`, `--brand-glow`). Several surface tokens all resolve to `#fff`. |
| JS | `assets/js/**` | 2,508 | `data/qtsc-seed.js` (360) is the seed; `prototype/{store,ui,listing,bookings}.js` hold the session-backed behaviour; one file per page in `pages/`. `domain-remediation-2026-08-31.js` and `experience-polish.js` patch the DOM after render. |
| Pages | 34 HTML + `QTSC-UIUX-Research-Presentation.html` | — | Many pages are a single minified line. |
| Generated files | none found | — | — |

Overlay signs to remove: late-loaded CSS layers, 1,619 `!important`, two DOM-patching scripts.

## Tests (baseline on `main`, 2026-11-25)

| Test | Kind | Result |
|---|---|---|
| `.github/qa/e2e-prototype.mjs` | Behaviour: directory, marketplace + demo request, office booking, investment checker + enquiry, insights, resources, careers + applications, newsletter, contact, open data + CSV, map, failure + retry, reset | **16/16 pass** |
| `.github/qa/qtsc-visual-qa.mjs` | Visual/device checks | not run yet |
| `.github/qa/control-inventory.mjs` | Control inventory | not run yet |

The behaviour test asserts Vietnamese copy and real names in places. Those assertions will be rewritten for the
English fictional content, keeping the same behaviour; each change is listed in the plan with its reason.

## Product DNA (current)

| Trait | Keep, improve or drop |
|---|---|
| Warm red-orange brand colour | Owner allowed changing it. Direction A keeps it as one accent; direction B replaces it. |
| Gradient overlays on heroes, CTAs and bands | **Drop** (execution error; TASTE forbids gradient and glow). |
| Large editorial display headings, tight tracking | Keep in A, adapt in B. |
| Numbered rows with an arrow (01 Space & operations …) | Keep: a clear, list-like way to route business intents. |
| Aerial campus photography, dark campus band | Keep the idea with CC0 photos; no fake aerial of a real place. |
| Task routing ("What do you need?": find space, invest, find solutions, find companies, explore) | Keep: it is the product's core, and the behaviour tests cover it. |
| Persistent demo bar at the bottom ("Bản prototype tương tác…", "Đặt lại dữ liệu demo") | **Drop from screens** (TASTE: no prototype notes on screen); keep reset behind `?demo=1` like Flux. |

## Before screenshots

`docs/redesign/before/` — home, about, companies, office, services, careers, contact, investment at 1440 and 390.
