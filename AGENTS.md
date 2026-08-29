# QTSC UI/UX Working Contract

Use the UI/UX library in `.claude/skills` as a capability catalogue, not as a
checklist to load wholesale. Start every material UI/UX task by reading
`.uiux-profile.json`; then read only the project source-of-truth documents that
affect the requested change.

## Routing

| Request | Start with | Add only when material |
|---|---|---|
| New page, component, or UI change | `project-context`, `frontend-implementation` | `design-system-and-components`, `interaction-patterns-and-form-ux`, `responsive-and-device-strategy`, `accessibility` |
| Redesign or critique of an existing page | `project-context`, `website-audit-and-redesign` | `journey-driven-content-and-layout`, `visual-design-direction`, `ui-craft-and-visual-qa` |
| Navigation, content hierarchy, search, or filtering | `project-context`, `information-architecture` | `site-search-and-findability`, `audience-intent-and-top-tasks`, `card-sorting-and-tree-testing` |
| Forms, errors, loading, empty states, or recovery | `project-context`, `interaction-patterns-and-form-ux` | `state-feedback-and-error-recovery`, `accessibility`, `trust-credibility-and-transparency` |
| Formal accessibility or visual release review | `project-context`, `testing-strategy` | `accessibility-conformance-evaluation`, `assistive-technology-testing`, `visual-regression-and-design-drift` |
| Research, metrics, or validation claim | `project-context`, `evidence-provenance-and-research-ops` | `user-research-planning-and-recruitment`, `ux-benchmarking-and-metrics`, `continuous-learning-and-improvement` |

## QTSC guardrails

- Preserve the static HTML/CSS/JS architecture unless the task explicitly asks
  for migration.
- Reuse the documented token, component, and page ownership layers before
  introducing a page-local pattern.
- Treat public statistics, rankings, and proof points as dated claims with
  source context.
- Do not claim research validation, accessibility conformance, UX improvement,
  brand-recognition validation, or agent reliability without evidence suited to
  that specific claim.
- For non-trivial work, report the selected skill set, verification performed,
  and known limitations. Do not report the entire library as active.

## Library maintenance

`.claude/skills` is managed by the UIUX sync workflow. Do not make lasting
edits inside a synchronized skill folder from this repository; put QTSC-specific
decisions in `.uiux-profile.json`, the project source-of-truth documents, or
this contract. Run `python scripts/validate-uiux-skills.py` after changing the
profile, manifest, or skill resources.
