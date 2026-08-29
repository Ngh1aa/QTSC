# QTSC UX Decision Log

## Decision: Put five visitor goals in the first screen

- **User task:** Reach the correct office, investment, solution, company or campus path.
- **Law applied:** Hick's Law and recognition over recall.
- **Rationale:** Five outcome labels reduce scanning versus exposing the full sitemap or internal departments.
- **Trade-off:** Secondary tasks move to global navigation/search.
- **How to verify:** Task-first-click testing and launcher progression analytics.

## Decision: Use a stable six-group global navigation

- **User task:** Build a mental model and recover from any page.
- **Law applied:** Jakob's Law, Miller's Law as a grouping heuristic and consistency standards.
- **Rationale:** Familiar header conventions plus six semantic groups support recognition without hiding important routes.
- **Trade-off:** Mega menus carry detail and need keyboard/touch validation.
- **How to verify:** Tree test, keyboard walkthrough and mobile navigation completion.

## Decision: Combine proof into one rail

- **User task:** Judge scale and credibility quickly.
- **Law applied:** Gestalt proximity/common region and aesthetic-minimalist heuristic.
- **Rationale:** Related dated numbers read as one evidence set instead of five competing promotional cards.
- **Trade-off:** Each metric has less explanatory copy on Home.
- **How to verify:** Five-second comprehension and source/owner review.

## Decision: Use different visual archetypes for different content jobs

- **User task:** Distinguish capability, campus, decision and news content.
- **Law applied:** Gestalt similarity/difference and Von Restorff effect.
- **Rationale:** Structural consistency stays in the grid while each role gets a composition suited to its decision job.
- **Trade-off:** More deliberate page composition than a single reusable card grid.
- **How to verify:** Visual QA and user description of each section's purpose.

## Decision: Make contact delivery honest

- **User task:** Know whether QTSC has actually received a request.
- **Heuristic applied:** Visibility of system status, match with the real world and error prevention.
- **Rationale:** A mailto handoff is explicit because no approved CRM/API exists in the static prototype.
- **Trade-off:** Email-app handoff adds a step.
- **How to verify:** Valid/invalid submit, focus return, email handoff and content-owner approval.

## Decision: Mobile becomes a task list, not compressed desktop

- **User task:** Navigate and compare with touch and narrow line length.
- **Law applied:** Fitts's Law and progressive disclosure.
- **Rationale:** Full-width 44px+ targets and accordions reduce precision and overflow risk.
- **Trade-off:** One more expansion action for secondary links.
- **How to verify:** 320/375/414/768px reflow, target-size and keyboard/touch checks.

