---
name: website-delivery-pipeline
description: Orchestrates the full lifecycle of building or redesigning a professional website. Use at project start, for multi-phase work, or when deciding which UI/UX skills, capability packs, domain playbooks, artifacts, evidence and quality/reliability gates are needed.
---

# Website Delivery Pipeline — V5 Orchestrator

## Core principle
`business/user goal → project truth → evidence → audience/entry intent → whole journey → success definition → validated UX/IA → distinctive experience/system → implementation → conformance/regression → measured outcomes → continuous learning`

Route the **smallest useful skill graph**. Do not load the whole library.

## Step 0 — Read project context
If `.uiux-profile.json` exists, read it plus every `source_of_truth` file before applying generic rules. Project evidence overrides generic defaults unless a higher-priority user instruction changes direction.

## Step 1 — Classify scope and risk
Use `adaptive-skill-routing-and-context-budget` principles. A local component fix and a whole-service redesign should not activate the same context.

## Step 2 — Choose base profile + conditional packs
- Substantial content/layout redesign, experiential service, brand differentiation or online/offline journey → `experience-strategy`.
- High product/behavior uncertainty, redesign validation or IA risk → `research-validation`.
- Production outcome proof, formal conformance, repeated AI workflows, visual/system regression risk → `measurement-reliability`.
- Complex search/forms/state/workflow/data/account UI → `advanced-interaction`.
- Broad audience, high trust, accessibility or high-consequence decisions → `inclusive-trust`.
- Mature design system or repeated cross-project UI work → `designops-governance`.
- End-user AI features → `human-ai`.

## Pipeline
| Phase | Required / conditional capabilities | Gate |
|---|---|---|
| 0 Intake | discovery + project context | problem, owner goal, scope |
| 0A Evidence | optional provenance register | claims marked evidence/hypothesis/assumption |
| 0B Audience | V4 audience + entry intent when material | who, why now, top tasks |
| 0C Success | V5 service outcome/metric definition when material | meaningful success + data source known |
| 0D Existing | website audit | preserve/change rationale |
| 1 Research | optional research-validation | evidence gaps tested appropriately |
| 2 Whole journey | optional V4 service/omnichannel mapping | real journey/channels/key moments known |
| 3 UX/IA | journey + IA + optional card/tree testing | flows/findability validated to risk |
| 4 Content/experience | optional V4 journey-driven layout + experience principles | sections advance user decisions |
| 5 Brand/visual | brand + visual + optional digital signature | implementable, recognizable grammar |
| 6 System | design system + interaction + optional designops | reusable components/states |
| 7 Architecture/code | frontend architecture + implementation | maintainable working UI |
| 8 Inclusive | responsive + accessibility + optional cognitive/AT | usable critical journeys |
| 9 Advanced behavior | optional search/forms/state/data/auth/AI | no undefined high-risk states |
| 10 Quality | visual QA + brand/continuity + performance + SEO + security/trust | evidence-backed findings |
| 11 Conformance/regression | optional V5 accessibility/visual drift gates | scope/sample/baselines explicit |
| 12 Agent eval/release | tests + multi-trial eval when reliability matters + release | verified outcome, known limitations |
| 13 Production | monitoring + service-health metrics + research | real outcome observed |
| 14 Learning | V5 continuous learning | signal becomes research/fix/test/eval |

## V5 routing rules
- Trace material research/analytics claims to source, date, context and limitations.
- Define meaningful service success before claiming a redesign improved UX.
- A partial or automated-only accessibility review cannot justify a formal conformance claim.
- Visual baseline changes require intent review; repeated raw tokens/duplicate components are design drift.
- One successful agent run demonstrates capability, not reliability. Use multiple independent trials when reliability matters.
- Grade agent outcomes rather than brittle tool choreography unless the path itself is a requirement.
- Production failures that matter should feed future research, tests/checklists or regression evals.

## V4/V3 rules retained
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
Never say `done`, `fully responsive`, `accessible`, `WCAG conformant`, `validated`, `brand-recognizable`, `UX improved` or `reliable` without evidence appropriate to that exact claim. Report verified versus unverified explicitly.
