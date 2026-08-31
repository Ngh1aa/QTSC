---
name: website-delivery-pipeline
description: Orchestrates the full lifecycle of building or redesigning a professional website. Use at project start, for multi-phase work, or when deciding which UI/UX skills, capability packs, domain playbooks, artifacts, evidence and quality/reliability gates are needed.
---

# Website Delivery Pipeline — V5 Orchestrator

## Core principle
`business/user goal → project truth → evidence → audience/entry intent → whole journey → success definition → validated UX/IA → reference intelligence → distinctive experience/system → system reality → planned implementation → verification → release → measured outcomes → continuous learning`

Route the **smallest useful skill graph**. Do not load the whole library.

## Step 0 — Read project context
If `.uiux-profile.json` exists, read it plus every `source_of_truth` file before applying generic rules. Project evidence overrides generic defaults unless a higher-priority user instruction changes direction.

## Step 1 — Classify scope, risk and project mode
Use `adaptive-skill-routing-and-context-budget` principles. Classify both scope/risk and mode: `strategy`, `visual-prototype`, `interactive-prototype`, `production-candidate` or `production`.

A local component fix and a whole-service redesign should not activate the same context. A prototype and a production release should not be held to the same integration/release gate.

For an **existing implemented UI** where the user asks to fix, improve, polish, modernize or make the interface more professional without necessarily redesigning the whole product, route through `ui-improvement`.

If a page/site redesign has weak, generic or undefined visual direction, or the user explicitly asks to learn from strong websites/references, route through `design-reference-research-and-benchmark` before locking `visual-design-direction`.

If the work contains forms, search, auth, checkout, CMS/API data, analytics or other behavior that can look real while being mock/simulated, activate `system-reality-and-production-readiness` before calling it working or production-ready.

## Step 2 — Choose base profile + conditional packs
- Substantial content/layout redesign, experiential service, brand differentiation or online/offline journey → `experience-strategy`.
- High product/behavior uncertainty, redesign validation or IA risk → `research-validation`.
- Production outcome proof, formal conformance, repeated AI workflows, visual/system regression risk → `measurement-reliability`.
- Production-candidate/release work with integrations, security, cross-browser verification or rollback concerns → `production-delivery`.
- Complex search/forms/state/workflow/data/account UI → `advanced-interaction`.
- Broad audience, high trust, accessibility or high-consequence decisions → `inclusive-trust`.
- Mature design system or repeated cross-project UI work → `designops-governance`.
- End-user AI features → `human-ai`.

## Pipeline
| Phase | Required / conditional capabilities | Gate |
|---|---|---|
| 0 Intake | discovery + project context | problem, owner goal, scope, mode |
| 0A Evidence | optional provenance register | claims marked evidence/hypothesis/assumption |
| 0B Audience | audience + entry intent when material | who, why now, top tasks |
| 0C Success | service outcome/metric definition when material | meaningful success + data source known |
| 0D Existing | website audit | preserve/change rationale |
| 1 Research | optional research-validation | evidence gaps tested appropriately |
| 2 Whole journey | optional service/omnichannel mapping | real journey/channels/key moments known |
| 3 UX/IA | journey + IA + optional card/tree testing | flows/findability validated to risk |
| 4 Content/experience | journey-driven layout + experience principles | sections advance user decisions |
| 4A Reference benchmark | conditional `design-reference-research-and-benchmark` | mixed source pool, finalists by role, no blind copying |
| 5 Brand/visual | brand + visual + optional digital signature | implementable, recognizable grammar |
| 6 System | design system + interaction + optional designops | reusable components/states |
| 6A System reality | conditional reality/data/API/CMS audit | real/mock/static/simulated/partial/unknown explicit |
| 7 Plan | architecture + change plan + guardrails | owners, dependencies, acceptance and verification known |
| 8 Code | frontend implementation | maintainable working implementation |
| 9 Inclusive | responsive + accessibility + optional cognitive/AT | usable critical journeys |
| 10 Advanced behavior | optional search/forms/state/data/auth/AI | no undefined high-risk states |
| 11 Quality | visual QA + brand + performance + SEO + security/trust | evidence-backed findings |
| 12 Verification | tests + browser/device + verification matrix | every material change has pass condition/result |
| 13 Conformance/regression | optional accessibility/visual drift/reliability gates | scope/sample/baselines explicit |
| 14 Release | code review + release + rollback | known risks, rollback and post-deploy smoke defined |
| 15 Production | monitoring + service-health metrics + research | real outcome observed |
| 16 Learning | continuous learning | signal becomes research/fix/test/eval |

## Reference-intelligence routing rules
- Use real production/category sites first for IA, journey, trust and conversion questions.
- Use curated galleries/award sites for visual grammar, art direction, typography, storytelling and motion—not as proof of UX success.
- Behance/Dribbble/Pinterest are secondary sources with different roles; distinguish production work from concepts/shots/mood references.
- For substantial design work, prefer a mixed pool and select 3–6 finalists with distinct jobs instead of cloning one reference.
- Score references by industry, audience, business, brand, UX, layout and feasibility fit; aesthetics alone is insufficient.
- Hand extracted principles to `visual-design-direction`; use `reference-analysis-and-design-to-code` when a specific reference must be translated more closely into system/code.

## Production-reality routing rules
- A rendered success state is not proof that an operation succeeded.
- Label material capabilities `REAL`, `MOCK`, `STATIC`, `SIMULATED`, `PARTIAL` or `UNKNOWN` when reality is not obvious.
- Do not call a form/search/login/checkout/CMS/analytics integration complete without evidence appropriate to that claim.
- Production-candidate work should include `system-reality-and-production-readiness`, `ai-agent-coding-guardrails`, `testing-strategy`, `security-and-privacy` when applicable, `web-quality-and-performance` and `code-review-and-release`.
- Prefer project-specific performance/browser/release budgets over universal vanity thresholds.
- Rollback should default to platform rollback/previous deployment or safe revert, not destructive history rewrites.

## Implementation and verification discipline
- For multi-file/high-risk work, define independently verifiable tasks before editing.
- Preserve unrelated user changes; prefer isolated branch/worktree when tooling supports it.
- Review substantial work in two stages: spec/intent compliance first, code/experience quality second.
- Every material change should map to `expected outcome → verification method → pass condition → result`.
- Build pass is not visual proof; automated accessibility audit is not conformance; lab performance is not field outcome.

## V5 evidence/reliability rules
- Trace material research/analytics claims to source, date, context and limitations.
- Define meaningful service success before claiming a redesign improved UX.
- A partial or automated-only accessibility review cannot justify a formal conformance claim.
- Visual baseline changes require intent review; repeated raw tokens/duplicate components are design drift.
- One successful agent run demonstrates capability, not reliability. Use multiple independent trials when reliability matters.
- Grade outcomes rather than brittle tool choreography unless the path itself is a requirement.
- Production failures that matter should feed future research, tests/checklists or regression evals.

## Core rules retained
- Distinguish owner goals from user goals and do not invent user research.
- Do not assume all visits start on the homepage.
- Do not map content inventory directly into blocks.
- Logo + primary color alone is not proof of distinctive digital identity.
- If the real service continues after a form/booking/application, design the handoff and recovery.
- Preserve proven content/SEO/behavior in redesigns until evidence supports change.
- Complex flows require state/error/recovery definitions.
- Money/consent/subscription/privacy flows require deceptive-pattern review.
- AI flows require capability limits, correction/control and graceful failure.

## Evaluation loop
1. `python scripts/validate-skills.py`
2. `python scripts/validate-v2.py`
3. `python scripts/eval-harness.py list`
4. Run representative tasks through the chosen provider adapter for multiple trials when needed.
5. Emit JSONL per [../evals/ADAPTER-CONTRACT.md](../evals/ADAPTER-CONTRACT.md).
6. `python scripts/eval-harness.py summarize --results results.jsonl --k 3`
7. Promote stable capability failures/successes into regression coverage.

## Completion rule
Never say `done`, `working`, `integrated`, `production-ready`, `fully responsive`, `accessible`, `WCAG conformant`, `validated`, `secure`, `UX improved` or `reliable` without evidence appropriate to that exact claim. Report verified versus unverified explicitly.
