# FULL UI/UX AUDIT — QTSC

**Audit date:** 2026-08-29  
**Scope:** Complete static public-site prototype: 28 HTML routes, shared navigation/search/contact overlays, core templates and primary journeys.  
**Decision boundary:** Audit only. No product, UI, or source-code changes were made.

## 1. Executive Summary

QTSC is a Vietnamese corporate technology-park site/prototype aimed at helping businesses, investors, partners, talent, and visitors understand QTSC and take a relevant next step. Its visual foundation is coherent and all sampled routes render locally. The principal risks are product/journey risks, not taste-based UI criticism.

The Home route deliberately removes major discovery/proof sections after render, weakening first-visit orientation. Contact flows show a success state without transmitting a request or presenting a real handoff. These must be resolved before the site is represented as a dependable public conversion service.

**Overall conclusion:** ready for remediation planning; **not ready for production-grade lead/contact operation** until P1 findings and release verification are complete.

### Method and evidence convention

| Mark | Meaning |
|---|---|
| **FACT** | Directly observed in current source or local runtime. |
| **EVIDENCE** | File, rendered-DOM, HTTP, or command result supporting a finding. |
| **ASSUMPTION** | Labelled impact inference; not presented as research. |
| **UNKNOWN** | Cannot be established from this repository/prototype. |

Performed: local static-server route checks, desktop and 390px Chrome-headless render checks, rendered-DOM inspection, JavaScript syntax checks, source review and static metadata checks. Sampled primary routes returned HTTP 200; selected pages showed no observed project runtime exception. Not performed: automated browser interaction, assistive-technology testing, production delivery measurement, analytics inspection, or real form delivery.

### Post-audit implementation status — 2026-08-29

| Finding | Status | Evidence / remaining limit |
|---|---|---|
| F-01 Home content suppression | Resolved before the remediation pass | Current code only enables compact removal with the explicit preview query parameter strategy=variant-A; default Home retains the sections. |
| F-03 Overlay dialog/contact intent | Implemented in static frontend | Focus trap/return, live status and the need-field selector were corrected. Keyboard and screen-reader verification is still required. |
| F-02 Real delivery | Blocked outside static frontend | No approved endpoint, CRM, privacy/consent process or service SLA exists in the repository. The UI now states that email must be sent before QTSC receives the request. |

## 2. Project & User Journey Map

| Item | Assessment |
|---|---|
| Project type | **FACT:** Static HTML/CSS/JavaScript corporate-site interactive prototype for Quang Trung Software City. |
| Stack | **FACT:** 28 static HTML documents, modular CSS, vanilla JS, Google-hosted Manrope font and remote imagery. No package manifest, framework, backend, CMS, API client, or build tool found. |
| Business goal | **FACT:** Present QTSC ecosystem, locations, services, offices, businesses and information; invite connection. **ASSUMPTION:** Generate qualified enquiries and relevant exploration. |
| Main audiences | **FACT:** Business/investment, company/tenant, partner, talent/candidate, visitor/community and media/resource intent are explicitly represented. |
| Principal conversion | **FACT:** “Kết nối với QTSC” contact/need-selection flows. **UNKNOWN:** lead rules, SLA and business target. |

| Journey | Entry points | Intended outcome | Audit assessment |
|---|---|---|---|
| Learn relevance | Home, About, Explore, Insights | Understand value, proof and next route | P1: Home suppresses discovery/proof modules. |
| Find company/solution/technology | Companies, Marketplace, Technology, search | Filter/search and evaluate | P2: completeness/freshness and search consistency unclear. |
| Evaluate location/service/investment | Office, Investment, Incentives, Services | Compare and request follow-up | P2: handoff is visual, not operational. |
| Request contact | Header, cards, contact page, dynamic dialog | Submit need and receive a next step | P1: local-only success and incomplete dialog accessibility. |
| Consume updates/join ecosystem | Insights, News, Resources, Careers, Community | Read, subscribe, apply or hand off | P2: outcome ownership/measurement unknown. |

Page/template families audited: Home/corporate; ecosystem discovery; office, investment and services; content/community; contact, legal, sitemap and crawler surfaces. **UNKNOWN:** live production host, traffic mix, launch subset, authentication and real data ownership.

## 3. Skills/Packs Used

The library was used as a capability catalogue, not a wholesale checklist.

| Skill / pack | Reason |
|---|---|
| website-delivery-pipeline | Audit orchestration, risk and release-readiness framing. |
| project-context; adaptive-skill-routing-and-context-budget | Source-of-truth hierarchy and scoped routing. |
| website-audit-and-redesign; corporate-website | Corporate page-role, proof and conversion assessment. |
| audience-intent-and-top-tasks; entry-context-and-visit-intent; ux-research-and-journey; journey-driven-content-and-layout | Audience, intent and journey map without inventing research. |
| information-architecture; site-search-and-findability | Taxonomy, navigation, labels and search scope. |
| interaction-patterns-and-form-ux; state-feedback-and-error-recovery; complex-forms-and-wizards | Contact forms, state/recovery and need selection. |
| responsive-and-device-strategy; ui-craft-and-visual-qa | Desktop/mobile evidence and hierarchy/reflow review. |
| accessibility; inclusive-design-and-cognitive-accessibility; assistive-technology-testing | Targeted semantic/focus/state review; no conformance claim. |
| design-system-and-components; designops-governance-and-adoption; brand-recognition-and-consistency-qa; visual-regression-and-design-drift | Tokens, pattern ownership, visual/brand drift. |
| frontend-architecture-and-refactoring; testing-strategy | Static architecture and quality-gate review. |
| seo-strategy; web-quality-and-performance | Crawl/metadata and delivery risks. |
| trust-credibility-and-transparency; security-and-privacy | Claims, contact expectations and privacy/trust surfaces. |
| analytics-and-experimentation; journey-outcome-and-service-health; evidence-provenance-and-research-ops | Outcomes, measurement and evidence gaps. |

Not completed: formal WCAG conformance evaluation, full AT testing, user research, card/tree tests, visual-regression baselines and lab/field performance tests. Each requires missing tooling, participants, baseline or production access.

## 4. Overall Health Score

**62/100 — strong prototype foundation, but P1 conversion, trust and accessibility readiness gaps.**

| Dimension | Score | Basis |
|---|---:|---|
| Product / UX | 58 | Clear audience areas; weak Home continuity and non-operational lead path. |
| IA / findability | 61 | Broad route coverage and sitemap; fragmented taxonomy/search ownership. |
| UI / brand | 72 | Coherent QTSC red/white direction; CSS/pattern drift risk. |
| Responsive | 64 | Responsive rules and mobile render exist; clipping signal needs measurement. |
| Accessibility | 49 | Overlay focus/state and form feedback gaps require testing/remediation. |
| Design system | 63 | Strong tokens; excessive override layers and raw values. |
| Content / conversion | 54 | Subject coverage is good; decision-support and completion status are weak. |
| Performance | 57 | Static delivery helps; remote assets and no budget/measurement. |
| SEO | 68 | Canonical/description/sitemap baseline; schema/social/deployment gaps. |
| Technical / reliability | 60 | Syntax/sample rendering pass; no quality gates or operational form layer. |
| Measurement | 30 | No analytics/event contract found. |

Scores guide prioritisation only; they are not user-research, conformance, ranking or reliability claims.

## 5. Critical Findings P0/P1

**P0: none.** Sampled core routes returned HTTP 200 and rendered without observed project exceptions in local checks.

### F-01 — Home removes key discovery and proof content after render

- **Finding:** The Home script removes Why QTSC, marketplace, directory, quick-access and ecosystem-live sections.
- **Evidence:** **FACT:** assets/js/pages/home.js function applyHomepageStrategy removes those selectors; it is invoked on page load. Rendered DOM after 1.5 seconds reported count zero for each.
- **Affected user/journey:** First-time business, investor, partner and talent visitors.
- **User impact:** Proof, offerings and discovery routes vanish when orientation is needed.
- **Business impact:** Lower exploration/contact opportunity and early exits.
- **Root cause:** Undocumented runtime IA mutation without a replacement journey/outcome.
- **Recommendation:** Restore or deliberately replace every removed role with visible value/proof, audience routing, discovery and action. Make it a content decision, not hidden DOM manipulation.
- **Priority:** **P1**
- **Verification:** Compare task completion with 5–8 representative users; measure discovery/contact progression once instrumentation exists.

### F-02 — Contact success is displayed without real delivery or clear prototype boundary

- **Finding:** Contact implementations prevent submit, hide the form and show local success without an API, CRM, mailbox handoff, retry path or SLA.
- **Evidence:** **FACT:** assets/js/pages/home.js and assets/js/shared.js use preventDefault and toggle success UI; repository search found no fetch, XHR, API client, storage queue or backend integration.
- **Affected user/journey:** Every visitor asking QTSC for contact.
- **User impact:** A visitor can reasonably believe a request was delivered when it was not.
- **Business impact:** Lost leads and trust damage.
- **Root cause:** Production-like confirmation wording on a prototype interaction.
- **Recommendation:** Connect secure owned delivery with consent, acknowledgement, validation/error/retry and SLA; until then disclose prototype status or make phone/email the real primary channel.
- **Priority:** **P1**
- **Verification:** End-to-end tests: valid submit, validation, network failure, duplicate submit, CRM receipt, notification and response SLA.

### F-03 — Shared overlay contact journey lacks robust keyboard/state behaviour

- **Finding:** Search/contact overlays have no code evidence of focus trapping or return to the opener; dynamic success has no observed live announcement. Contextual need prefill targets a missing element.
- **Evidence:** **FACT:** shared.js focuses search input but has no focus-trap, activeElement or focus-return code. openContact queries innerContactNeed while created select is icf-need. Generated success markup lacks role=status or aria-live.
- **Affected user/journey:** Keyboard and screen-reader users; all contextual contact launchers.
- **User impact:** Lost context, unclear completion and possibly incorrect contact intent.
- **Business impact:** Accessibility-critical conversion friction and lower enquiry quality.
- **Root cause:** Dynamic shared overlays lack a reusable dialog/state contract.
- **Recommendation:** Implement labelled dialog semantics, initial focus, Tab containment, Escape, focus return, live success/error state and tested need mapping.
- **Priority:** **P1**
- **Verification:** Keyboard-only and NVDA/Chrome (or equivalent) test from header, cards and contact page.

### F-04 — Directory/marketplace promise and prototype-scale data are not clearly reconciled

- **Finding:** Public proof language refers to a large ecosystem while visible listings are limited representative items without an unequivocal showcase/demo boundary or full-directory path.
- **Evidence:** **FACT:** README/source docs call data representative/mock and cite ecosystem proof points; visible list data is limited. **UNKNOWN:** planned production data integration.
- **Affected user/journey:** Organisation, solution and technology evaluators.
- **User impact:** Unclear whether results are complete enough for a confident choice.
- **Business impact:** Credibility and discovery risk.
- **Root cause:** Data scope/freshness is not declared at route level.
- **Recommendation:** Choose and label a complete maintained directory, curated showcase, or owner-backed search/request model. Date/source proof claims.
- **Priority:** **P1** public launch; **P2** while explicitly prototype-only.
- **Verification:** Reconcile count/source/date with owner; test whether users understand completeness.

## 6. Findings by Journey

| ID | Finding | Priority | Decision |
|---|---|---:|---|
| F-01 | Home orientation loses authored discovery/proof roles. | P1 | IMPROVE |
| F-02 | Contact completion is not operational. | P1 | ADD / IMPROVE |
| F-03 | Overlay dialog and contextual need selection are incomplete. | P1 | IMPROVE |
| F-04 | Catalog completeness/provenance ambiguous. | P1/P2 | IMPROVE |
| F-05 | Home and inner search use different item collections. | P2 | MERGE |
| F-06 | Evaluation pages lack owner-backed decision-support depth. | P2 | ADD |
| F-07 | Resource/career/newsletter/external handoffs lack verified outcome states/measurement. | P2 | IMPROVE |
| F-08 | Mobile navigation task priority and a clipping signal need validation. | P2 | IMPROVE |

### F-05 — Search has two content sources

- **Evidence:** **FACT:** home.js defines globalSearchItems; shared.js defines a different searchItems collection.
- **Affected / impact:** The same search intent can produce different recall/ranking by page.
- **Root cause:** Search is page-owned rather than index-owned.
- **Recommendation:** One governed index with title, type, URL, synonym, freshness and owner.
- **Priority / verification:** **P2**; run a shared query test set on Home and inner pages.

### F-06 — Decision-support depth is not operationally defined

- **Evidence:** **FACT:** Office, investment, incentives and service pages are static and lead to contact; no availability/CMS/timestamp/eligibility/SLA model was found.
- **Affected / impact:** Evaluators cannot reliably resolve qualification, availability or next responsibility.
- **Root cause:** Information pages terminate at generic contact.
- **Recommendation:** Define route-level criteria, date/source, variables, owner and response expectation.
- **Priority / verification:** **P2**; content-owner review and tenant/investor/partner scenario tests.

### F-07 — Handoff state is unknown beyond the page

- **Evidence:** **FACT:** No analytics or server-side delivery was found.
- **Affected / impact:** Subscription, resource, job and external actions cannot prove completion.
- **Recommendation:** Define destination owner, success/failure signal and measurement for every actionable external/handoff route.
- **Priority / verification:** **P2**; link crawl, handoff test and event QA.

### F-08 — Responsive navigation needs task-priority validation

- **Evidence:** **FACT:** 81 CSS media-query occurrences; Home rendered at 390px. Screenshot showed a following heading visually clipped at right edge; selector remains unisolated. Dynamic mobile nav includes 17 links.
- **Affected / impact:** Mobile orientation and route selection may be slow or obscured.
- **Recommendation:** Establish mobile top tasks; test wrapping, overflow, tap targets and focus in all nav variants.
- **Priority / verification:** **P2**; 320/360/390/412/768px viewport matrix plus DOM overflow scan.

## 7. Findings by Page/Template

| Family | Preserve | Main action |
|---|---|---|
| Home | Strong hero, identity, direct search/contact affordance. | Restore a complete first-visit narrative (F-01). |
| About / Brand | Corporate narrative and guideline assets. | Date/source claims; separate guideline from live proof. |
| Companies / Marketplace / Technology | Working filters and category discovery. | Define completeness/freshness; unify search (F-04/F-05). |
| Office / Investment / Incentives / Services | Relevant evaluation domains and consistent CTA. | Add decision-support and real handoff (F-02/F-06). |
| Explore / Amenities / Open Data | Place/community context. | Clarify current/external/searchable/actionable information. |
| Insights / News / Resources | Supports credibility and return use. | Establish taxonomy, editorial ownership and subscription outcome. |
| Careers / Community / Events | Relevant audience routes. | Verify destination, outcome and accessibility of handoff. |
| Contact / shared modal | Reusable contextual entry point. | Make accessible and operational (F-02/F-03). |
| Legal / sitemap / robots | Crawl baseline present. | Verify production paths, 404 and legal accuracy. |

## 8. UX & IA

### F-09 — Navigation has coverage but no complete maintained taxonomy

- **Evidence:** **FACT:** 28 routes and dynamic navigation exist; source architecture maps nine core screen ownership areas, not full route inventory.
- **Affected / impact:** First-time and returning visitors face higher scanning/decision cost.
- **Root cause:** Site growth exceeded original IA/ownership map.
- **Recommendation:** Maintain audience/task → top-level item → landing → destination map; remove duplicate entry points only with evidence.
- **Priority / verification:** **P2**; representative tree test for success, directness and confidence.

### F-10 — Presentation labels drive navigation behaviour

- **Evidence:** **FACT:** shared.js maps desktop mega menu through textContent.trim, assigns role=button to anchors and prevents default.
- **Affected / impact:** Label changes/localisation can break mapping and semantic expectations.
- **Root cause:** UI text is used as identifier.
- **Recommendation:** Use stable data keys and native buttons for disclosure; retain links as links.
- **Priority / verification:** **P2**; rename regression, keyboard and semantic test.

**KEEP:** domain landing routes and commercial/service clusters.  
**IMPROVE:** audience-based primary routing and labels.  
**MERGE:** search and navigation configuration.  
**REMOVE:** label-dependent logic after replacement.  
**ADD:** route inventory with owner, audience, canonical URL and lifecycle.

## 9. UI & Brand

### F-11 — Visual foundation is coherent, style ownership is diffuse

- **Evidence:** **FACT:** assets/css/tokens.css defines semantic color, spacing, radii, shadow and motion. Home page CSS imports many specialist/legacy/review/final layers; corporate CSS includes editorial adaptation overrides. Static scan found 214 raw colour values outside tokens; not all are violations.
- **Affected / impact:** Future UI changes have elevated regression and consistency risk.
- **Root cause:** Additive page-local styling outpaced component ownership.
- **Recommendation:** Inventory rendered components, classify exceptions, consolidate proven duplicates and deprecate superseded layers after visual baseline.
- **Priority / verification:** **P2**; component inventory, multi-template snapshots and token-usage report.

### F-12 — Brand proof needs source/date treatment

- **Evidence:** **FACT:** project contract requires public statistics/rankings/proof claims to be dated/sourced. **UNKNOWN:** approval/source owner for each public claim.
- **Affected / impact:** Trust on corporate/investment/ecosystem pages.
- **Recommendation:** Claim register with source, date, owner, page usage and expiry.
- **Priority / verification:** **P2**; content/legal owner review.

## 10. Responsive

**FACT:** Extensive responsive CSS exists and Chrome rendered Home desktop/390px. This is surface evidence, not a full device test.

| Risk | Evidence / impact | Priority | Verification |
|---|---|---:|---|
| Possible mobile overflow | 390px screenshot clips a following Home heading; exact cause unknown. | P2 | scrollWidth check and 320–768px screenshots. |
| Dense mobile route choice | Dynamic mobile nav has 17 links. | P2 | Task/touch target measurement. |
| Cascade-driven reflow | Many responsive/page layers. | P2 | Visual regression for primary templates. |
| Tablet coverage unknown | No 768/1024 inspection completed. | P3 | Tablet viewport suite. |

## 11. Accessibility

This is not a WCAG conformance evaluation.

| Finding | Evidence | Priority | Recommendation / verification |
|---|---|---:|---|
| Shared dialog focus/state incomplete (F-03) | No trap/return; success lacks live state; need selector mismatch. | P1 | Accessible dialog primitive; keyboard and screen-reader test. |
| Fragile disclosure semantics (F-10) | Anchors changed into button behavior by script. | P2 | Native button disclosure with associated menu; AT test. |
| Form error/recovery unproven | Local success only; no observed field error/live/retry contract. | P2 | Labels, visible errors, descriptions, error focus, status and retry tests. |
| Heading/landmarks unverified | No automated semantic scan available. | P2 | Axe/Lighthouse plus manual template review. |
| Contrast/motion unverified | Tokens/guidelines exist; computed values not measured. | P2 | Test computed contrast/states and prefers-reduced-motion. |

## 12. Design System

**Preserve:** semantic tokens, 4px spacing, radius/shadow/motion vocabulary, shared icon strategy and component-first intent.

| Issue | Evidence | Priority | Recommendation |
|---|---|---:|---|
| Source ownership map is incomplete | Nine core screens documented; 28 routes exist. | P2 | Map every template and shared contract. |
| CSS layer proliferation | Home has many enhancement/review/final imports; broad corporate overrides. | P2 | Define cascade/deprecation path with snapshots. |
| Raw values require governance | 214 raw colour values outside token source. | P3 | Categorise asset/overlay/exception/drift; convert verified duplicates. |
| Shared dynamic UI lacks state contract | Search/contact/mobile/mega markup generated as strings. | P2 | Define controlled DOM/ID/state/keyboard contracts. |

## 13. Content & Conversion

| Finding | Evidence / impact | Priority | Recommendation |
|---|---|---:|---|
| Contact endpoint simulated (F-02) | Local success can mislead visitors. | P1 | Real endpoint or explicit prototype/fallback contact. |
| Decision support incomplete (F-06) | Static evaluation pages cannot answer freshness/eligibility/availability. | P2 | Owner/date/criteria/response expectation. |
| Claim provenance unknown (F-12) | Material proof lacks audited register. | P2 | Evidence register with expiry. |
| CTA outcome contract missing | No event code/analytics found. | P2 | Events for search, filters, form start/valid/delivered/error and handoff. |
| Prototype data boundary weak (F-04) | Public route may look exhaustive. | P1/P2 | Clearly scope showcase data until live data exists. |

## 14. Performance

- **FACT:** Static HTML/CSS/JS avoids framework hydration; sampled pages render locally.
- **FACT:** All 28 pages include Google Fonts; remote QTSC imagery is used.
- **FACT:** No asset budget, performance CI, image optimisation manifest or production measurements found.
- **UNKNOWN:** CDN/cache headers, image dimensions/formats, LCP/INP/CLS, third-party cost and real mobile network performance.

| Risk | Priority | Recommendation |
|---|---:|---|
| Remote font/image dependency | P2 | Measure deployed pages; set image dimensions, responsive sources/compression and font policy. |
| Layered CSS | P2 | Audit used CSS; remove only verified dead/superseded rules with snapshots. |
| No CWV baseline | P2 | Lighthouse/WebPageTest/CrUX where a production URL exists; set budgets. |

## 15. SEO

- **FACT:** 28/28 pages have description and canonical links.
- **FACT:** robots allows crawling and references sitemap; sampled routes returned HTTP 200 locally.
- **FACT:** 13/28 pages contain og:title; one page contains detected structured-data markup.
- **UNKNOWN:** production host/canonical, redirects, 404 semantics, Search Console, sitemap completeness and schema validity.

| Finding | Priority | Recommendation |
|---|---:|---|
| Social metadata incomplete | P2 | Standardise title/description/og/Twitter/share image per template. |
| Structured data sparse | P2 | Add maintained Organization/Website/Breadcrumb/Article/Event only where appropriate; validate. |
| Deployment SEO unverified | P2 | Crawl deployed host for status, canonical, redirects, robots/sitemap and noindex. |
| URL equity policy missing | P2 | Redirect/retirement register before changes; preserve internal links/high-value URLs. |

## 16. Technical Frontend

| Finding | Evidence | Priority | Recommendation |
|---|---|---:|---|
| Static architecture suits prototype | No framework/API/package; JS syntax checks pass. | KEEP | Preserve unless real data/transaction need drives migration. |
| Shared UI uses string templates | shared.js builds mega/search/mobile/contact with innerHTML. | P2 | Tested builders/DOM contracts/stable IDs. |
| Integrated quality gates absent | No package scripts/lint/typecheck/test runner found. | P2 | Static/link/a11y smoke/visual checks suitable for static stack. |
| Forms prototype-only | No transport/storage/CRM found. | P1 | Treat as product/backend, not visual polish. |
| Runtime coverage limited | Selected pages no observed errors; interaction automation unavailable. | P3 | Route smoke and console capture in CI. |

## 17. Measurement & Reliability

| Outcome | Core events | Success metric |
|---|---|---|
| Find relevant QTSC path | nav_select, audience_route_select, search_submit, result_open | task-route success and relevant CTR |
| Qualified enquiry | cta_open_contact, contact_start, valid, submit, delivered, error | delivery, qualified lead and response time |
| Discovery supports evaluation | filter_apply, result_open, detail_contact, content_depth | findability and result-to-contact progression |
| External handoff completes | outbound_click, handoff_load, owner-side conversion | verified completion, not click only |

**FACT:** No analytics/measurement implementation found. **UNKNOWN:** consent basis, vendor, retention, CRM source, bot protection, operations and targets.

**Recommendation:** Establish privacy-reviewed measurement and reliability contract before optimisation; instrument only agreed outcome decisions.

## 18. Preserve List

- QTSC white/red-orange identity, CTA treatment and approved/current real imagery.
- Token, spacing, radius, shadow, motion, typography and icon foundations.
- Dedicated corporate, discovery, commercial/service, content/community and utility route families.
- Existing Companies/Marketplace/Insights filtering; improve data ownership rather than replace without evidence.
- Canonicals, descriptions, robots and sitemap baseline.
- Familiar global search/contact entry points once made accessible and operational.
- Existing claims, dates, imagery and public URLs until source/licence/redirect owner confirms changes.

## 19. Keep / Improve / Merge / Remove / Add

| Decision | Items |
|---|---|
| **KEEP** | Static delivery, semantic token base, filter patterns, route-family coverage, canonical/sitemap baseline. |
| **IMPROVE** | Home journey, contact transaction, overlay accessibility, mobile hierarchy, provenance, decision support, CSS ownership, metadata parity. |
| **MERGE** | Home/inner search data; desktop/mobile/mega navigation configuration; proven duplicate patterns. |
| **REMOVE** | Runtime Home deletion after replacement; label-text navigation after keyed controls; obsolete CSS only after snapshots. |
| **ADD** | Contact delivery/CRM, dialog contract, route ownership, claim register, analytics, quality gates, production performance/SEO/a11y verification, redirect register. |

## 20. Prioritized Fix Roadmap

| Sequence | Work | Priority | Done when |
|---|---|---:|---|
| 0 | Confirm launch/prototype boundary | P1 | Owners decide live routes, claims, catalogs and forms. |
| 1 | Make contact dependable | P1 | Secure delivery, consent, validation/error/retry, receipt and SLA work end-to-end. |
| 2 | Restore/rebuild Home orientation | P1 | Removed roles have visible, measurable replacements. |
| 3 | Accessible overlay primitive | P1 | Focus/escape/return/labels/status/need mapping pass keyboard/AT tests. |
| 4 | Reconcile catalog/proof data | P1/P2 | Source/date/coverage and directory model published. |
| 5 | IA/search/navigation rationalisation | P2 | One search index and approved task taxonomy. |
| 6 | Measurement/reliability | P2 | Privacy-reviewed events, funnel and delivery monitoring live. |
| 7 | Quality/performance/SEO baselines | P2 | CI checks and deployed audits meet budgets. |
| 8 | CSS/component consolidation | P2/P3 | Snapshot-protected duplicate removal/token governance. |

## 21. Quick Wins

1. Stop presenting local-only form confirmation as a delivered request; add a clear prototype boundary or real contact fallback.
2. Correct contextual need selector mismatch and test every launcher.
3. Restore Home discovery/proof sections temporarily, or add approved visible replacements.
4. Standardise og:title and social metadata across templates.
5. Publish owner/source/date for material statistics and label representative catalogues.

## 22. Structural Improvements

1. Real contact service contract: schema, validation, anti-spam/security, consent, CRM delivery, SLA and monitoring.
2. Accessible shared overlay/menu component contracts rather than ungoverned dynamic markup.
3. Maintained IA/content model: audience, top task, owner, source, lifecycle and canonical/redirect policy per route.
4. One governed search/catalogue index with taxonomy, freshness and complete-vs-curated semantics.
5. Static-site quality pipeline: semantic/link/JS/CSS checks, accessibility smoke, responsive snapshots, performance budgets and deployed SEO validation.

## 23. Verification Required

| Area | Evidence required before release claim |
|---|---|
| Contact/conversion | Delivery receipt, failure/retry, CRM acknowledgement, privacy/spam/security review and SLA test. |
| Accessibility | Keyboard/AT test for shared overlays/menu/forms; automated scan; contrast/reduced-motion review. Formal conformance requires a qualified full evaluation. |
| Responsive | 320/360/390/412/768/1024/1440 screenshots plus overflow/touch/keyboard checks by primary template. |
| UX / IA | Representative task tests for Home, find, evaluate and contact; analytics baseline. |
| Content/trust | Owner validation of numbers, source/date, completeness, imagery rights and legal/privacy copy. |
| Performance | Deployed lab/field measurement, image/font inventory and budgets. |
| SEO | Production crawl for status, redirect, canonical, robots/sitemap, schema/social, internal links and 404. |
| Reliability | CI smoke, external link checks, console capture and alert ownership. |

## 24. Known Unknowns / Evidence Gaps

- No production host/configuration: CDN/cache/headers, redirects, real 404, crawler output and live search behavior unknown.
- No user research, analytics, traffic, target, content governance, CRM/SLA or support workflow provided; none is inferred.
- No real data/CMS/API found; directory completeness, freshness and availability cannot be verified.
- No formal AT, contrast or reduced-motion evidence; no accessibility conformance assertion.
- Interaction automation was unavailable; source/rendered-DOM checks do not substitute for complete interaction testing.
- No lab/field performance result; likelihood statements are not Core Web Vitals results.
- An unrelated Chrome service message appeared during screenshot capture; it is not attributed to the project.

---

| Severity | Count | Interpretation |
|---|---:|---|
| P0 | 0 | No locally verified critical route outage. |
| P1 | 4 | Resolve before presenting the prototype as a reliable public conversion service. |
| P2 | 12 | Meaningful UX, IA, accessibility, content, SEO, performance and maintainability work. |
| P3 | 3 | Lower-risk consistency/coverage improvements. |

This is an evidence-backed prioritisation report, not a claim of research validation, legal compliance, security assurance, accessibility conformance, SEO ranking outcome, or production reliability.
