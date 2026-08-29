# Experience Remediation — QTSC

## 1. Project mode

Interactive prototype. This remediation prioritises journey, IA, content hierarchy, interaction, responsive behavior, accessibility-visible UI and visual craft. It does not treat the absence of backend, CRM, CMS, analytics or operational SLA as a prototype defect.

## 2. Audience and top tasks

| Audience | Intent / top task | Evidence |
|---|---|---|
| Business / tenant | Evaluate office, operating support and campus fit | Current Office, Services and Home intent routes |
| Investor | Evaluate investment opportunity and incentives | Investment and Incentives routes |
| Partner / buyer | Find a relevant company or technology solution | Companies, Marketplace, Technology routes |
| Talent / community / visitor | Discover QTSC, resources, careers or campus | Explore, Insights, Resources and Careers routes |

These are project-content facts. Conversion target, traffic mix and user research remain unknown.

## 3. Primary journeys improved

1. Orientation → select a high-value goal → land on an appropriate hub.
2. Evaluate QTSC → review proof/source → explore topic → begin contact handoff.
3. Find a company/solution → route through directory/marketplace/search.
4. Mobile navigation → expand category → select destination → retain visible contact action.

## 4. Preserve contract

Preserved: QTSC logo, red-orange/white brand behavior, Manrope typography, official/approved imagery direction, canonical URLs, existing topic hubs, static HTML/CSS/JS architecture, existing filters/search/contact launchers and source/date requirement for proof claims.

Not changed: route URLs, SEO canonicals, business data, product claims, backend/data contracts or the official brand identity.

## 5. IA and content decisions

Home now operates as orientation and task routing rather than a flat inventory:

orientation → five goal launchers → proof → ecosystem/technology/business discovery → directory/marketplace → contextual action.

The global navigation stays topic-based; goal routing is the complementary task-based navigation. No major taxonomy or URL changes were made.

## 6. Brand and visual direction

QTSC remains a white-dominant corporate technology experience. Red-orange is reserved for action, focus, selection and signature energy; content surfaces remain restrained. Visual rhythm differentiates proof, exploration, evaluation and task-routing modules rather than turning all modules into equal cards.

## 7. Design system and component changes

- Added Home journey tokens/rules for task routing, section bridge and responsive hierarchy.
- Added shared navigation contract for focus, touch targets, mobile panel rhythm and sticky mobile action area.
- Strengthened CTA/focus/active feedback without adding a new palette or dependency.
- Documented component responsibilities in HOME-JOURNEY-IA.md.

## 8. UI and responsive changes

| Surface | Change | Root cause addressed |
|---|---|---|
| Home Hero | Constrained title/readable copy and stacked mobile CTAs | Hero readability on narrow screens |
| Home goal routing | 5-column desktop, 3-column tablet, 1-column mobile | Dense/clip-prone intent selection |
| Home content transitions | Semantic section bridges and differentiated surfaces | Weak decision progression |
| Shared navigation | 44px targets, visible focus, safer mobile spacing/sticky action | Compressed mobile navigation |
| Contact/search | Focus return/trap and truthful email handoff from earlier remediation | Interaction/accessibility trust gap |

## 9. Before → after rationale

The former mobile Home screenshot visibly clipped the first intent heading. The revised Home rules remove fixed horizontal pressure, allow label wrapping and use a single-column task launcher. The intent block now expresses an explicit task-routing role rather than acting as an undifferentiated row.

## 10. Verification

- UIUX structural validators: pass (84 skills).
- JavaScript syntax checks: pass for changed Home/shared scripts.
- Git diff whitespace check: pass.
- GitHub Pages served the new Home journey stylesheet after commit 71ef355.

Visual inspection was performed for earlier desktop/mobile baseline captures. A complete current visual matrix and manual keyboard/screen-reader run are still required before declaring full responsive/accessibility completion.

## 11. Remaining issues

- Complete current visual QA at 320, 375, 414, 768, 1024 and 1440px.
- Validate mobile navigation and dialogs with keyboard and screen reader.
- Merge Home and inner-page search sources when product data ownership is available.
- Reconcile full-directory versus curated-showcase semantics with content owner.

## 12. Requires decision

- Live CRM/API form delivery, consent processing and service SLA.
- Any URL/taxonomy retirement, content deletion or strategic repositioning.
- Whether public catalogue pages are exhaustive directories or curated showcases.
