# QTSC UX Review — Sitewide continuation (2026-08-30)

## Evidence boundary

This review uses the current static repository, rendered production state, the route inventory and QTSC project documents. Audience priority remains a product hypothesis until analytics, search logs, CRM data and task-based interviews are available.

## Audience and top-task fit

| Audience in context | Decision they need to make | Primary route | Confidence needed before action |
|---|---|---|---|
| Technology company / operating team | Is QTSC suitable for office, infrastructure and daily operation? | `office.html`, `services.html`, `telecom.html` | Space, infrastructure, campus support and a clear visit/contact path |
| Investor / strategic partner | Is the opportunity eligible and credible enough to discuss? | `investment.html`, `incentives.html` | Dated policy context, focus sectors, process and the correct handoff |
| Organisation seeking technology | Which company or solution matches the problem? | `companies.html`, `marketplace.html` | Search/filter, provider context and a matchmaking action |
| Member / talent / community / media | Where is the relevant service, job, event, document or data? | Content and resource hubs | Clear grouping, current state and a recoverable route |

The five shared shortcuts remain the highest-value orientation choices: office, investment, solution, company and campus. They complement the six topic-based navigation groups rather than replacing them.

## Findings and remediation

| Severity | Finding and evidence | User impact | Remediation |
|---|---|---|---|
| P0 | 26 HTML files contained committed merge markers and two conflicting document versions. The deployed DOM exposed `<<<<<<<`, `=======` and `>>>>>>>` and rendered duplicate pages. | Broken comprehension, duplicated landmarks/content and severe trust loss. | Preserved the richer journey branch, removed conflict artefacts and retained one valid document per route. |
| P1 | Header/footer contracts diverged between the merged branches. | Navigation labels, active state, language and contact behavior changed by route. | Standardised the current six-group shell and footer across all public HTML routes. |
| P1 | `site-extension.js` was effectively Home-only although its contract states it owns shared route state, journey shortcuts, image loading and experience polish for inner pages. | Inner routes lost the intended intent rail and shared brand/interaction layer. | Enabled the extension once on every public route and made active navigation resolve from the actual filename. |
| P2 | The fifth proof item sat alone in half of the mobile grid. | Weak visual grouping and an unfinished rhythm at narrow widths. | Let the odd final proof cell span the mobile row. |
| P2 | Safe-area support was present in the mobile menu but not consistently in the fixed shell/footer. | Controls can sit too close to display cut-outs/home indicators. | Added safe-area-aware shell offsets and footer padding. |

## UX laws and heuristics used

| Principle | Specific application | Trade-off / boundary | Verification |
|---|---|---|---|
| Hick's Law | Keep five outcome-based shortcuts instead of exposing the full sitemap at each entry point. | Secondary tasks remain in topic navigation/search. | First-click tests for the five top tasks. |
| Recognition over recall | Show the current navigation group and repeat stable goal labels across routes. | Some routes belong to more than one mental model; one parent is selected for orientation. | Tree test and route-to-parent review. |
| Fitts's Law | Preserve 44px+ controls in header, mobile navigation and intent shortcuts. | Not every editorial inline link becomes a large button. | Touch-target and keyboard pass at narrow widths. |
| Jakob's Law | Use one familiar top navigation, search, language and contact shell on every route. | QTSC's connected-campus identity appears in content/signature moments, not by inventing unusual navigation. | Cross-route shell comparison. |
| Gestalt proximity/common region | Keep proof points as one evidence rail and related next routes as one ecosystem strip. | Evidence is concise; detailed explanations stay on specialist pages. | Five-second comprehension and content-owner review. |

## Known limitations

- No user research, analytics or CRM evidence was available to validate audience priority.
- The prototype contact flow still needs an approved production endpoint, consent owner and response SLA.
- Directory and Marketplace completeness must be confirmed by the content owner.
- Browser visual, keyboard, screen-reader and zoom/reflow checks must be reported as separate evidence before any conformance claim.
