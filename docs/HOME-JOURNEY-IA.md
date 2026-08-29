# QTSC Home Journey & IA Contract

## Scope and evidence

This is an implementation contract for the current static prototype. Audiences and tasks are derived from the QTSC brand guideline, current route inventory and page content; they are not presented as user-research findings.

## Home role

Home is an orientation and routing page, not a compressed company brochure.

| User state / question | Home response | Next route |
|---|---|---|
| Is QTSC relevant to me? | Value proposition and concise scale/proof | About, Why QTSC |
| What do I need to do? | Five goal-based task launchers | Office, Investment, Marketplace, Companies, Explore |
| Why should I trust QTSC? | Dated proof and source link | About, source article |
| What can I explore? | Ecosystem, technology, business, marketplace and directory modules | Topic hubs |
| What happens next? | Contextual contact or owned email handoff | Contact journey |

## Navigation model

| Layer | Role | Labels |
|---|---|---|
| Global | Primary wayfinding by topic | QTSC, Hệ sinh thái, Doanh nghiệp, Công nghệ, Khám phá, Tin & nguồn lực |
| Goal routing | Fast path by visitor intent | Tìm văn phòng, Đầu tư, Tìm giải pháp, Tìm doanh nghiệp, Khám phá QTSC |
| Contextual | Continue a decision after evidence | View directory, marketplace, infrastructure, campus, source |
| Utility | Recover or transact | Search, language, contact |

URLs remain unchanged. No content is retired in this implementation.

## Component contracts

| Component | Purpose | States / responsive contract |
|---|---|---|
| Primary CTA | Starts a high-value route or contact handoff | 44px minimum; visible focus; press feedback; single primary intent per decision area |
| Goal launcher | Routes to one top task | Desktop 5-column, tablet 3-column, mobile 1-column; label wraps instead of clipping |
| Section bridge | Explains the next decision after a module | Uses QTSC brand rail, contextual action only |
| Dialog | Search/contact short task | Label, focus entry/return, Tab containment, Escape, status feedback |
| Proof module | Reduces evaluation risk | Preserve source/date context; never present prototype values as current data without owner confirmation |

## Design rationale

- **Hick's Law:** five goal launchers group the highest-value choices rather than exposing the full sitemap.
- **Recognition over recall:** task labels describe outcomes, not internal departments.
- **Fitts's Law:** primary touch controls are at least 44px and mobile launchers become full-width.
- **Progressive confidence:** relevance → task → evidence → exploration → action.
- **Trade-off:** Home intentionally remains broad because QTSC serves several audiences; it uses routing rather than hiding valid destinations.

## Validation still required

Run mobile task tests for all five launchers, tree-test navigation labels, verify keyboard/screen-reader behavior, and measure completion/drop-off once approved analytics exists.
