---
name: visual-regression-and-design-drift
description: Protects UI quality across repeated human/AI changes using baseline screenshots, representative viewports/states, intentional-change review, token/component drift detection and regression triage. Use for mature design systems, multi-page sites or automated coding workflows where visual inconsistency can accumulate.
---

# Visual Regression & Design Drift

## Principle
A site can pass functional tests while its visual system slowly fragments.

Protect both:
1. **render regressions** — unexpected visual changes;
2. **system drift** — new one-off tokens/components/patterns that weaken the design language.

## Workflow
### 1. Define coverage
Choose representative:
- templates/routes;
- breakpoints/viewports;
- critical component states;
- themes/locales when relevant;
- data conditions that materially affect layout.

### 2. Establish stable baselines
Control fonts, animations, timestamps, random content and asynchronous loading where possible. Baselines are reviewed artifacts, not arbitrary first snapshots.

### 3. Compare
Use visual diff tooling when available, then triage changes as:
- intended + approved;
- intended but system-breaking;
- unintended regression;
- unstable/flaky capture.

### 4. Audit system drift
Flag unjustified:
- raw colors instead of tokens;
- one-off type/spacing/radius/shadow values;
- duplicate components;
- local interaction patterns;
- competing icon/image/motion treatments.

### 5. Update intentionally
Baseline updates require a rationale tied to an approved design change.

## Required artifact
Create/update `docs/visual-regression-plan.md` and a drift issue list where applicable.

## Gate
Critical templates/states should have verified visual coverage before high-risk releases. Do not call a changed screenshot a regression until intent and rendering stability are checked.

## Anti-patterns
- Pixel-perfect diff with uncontrolled dynamic content.
- Automatically accepting all new baselines.
- Treating every visual difference as a bug.
- Ignoring mobile states.
- Solving drift by adding more one-off CSS.
