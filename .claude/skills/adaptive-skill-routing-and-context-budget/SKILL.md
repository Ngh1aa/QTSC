---
name: adaptive-skill-routing-and-context-budget
description: Selects the smallest useful skill graph for the current task based on project context, scope and risk, while escalating to deeper packs only when needed. Use at agent task start or when the skill library is large enough that loading everything would waste context and reduce focus.
---

# Adaptive Skill Routing & Context Budget

## Principle
`maximum decision quality / minimum unnecessary context`

Do not load every installed skill merely because it exists.

## Routing workflow
### 1. Classify task scope
Typical levels:
- **local** — one component/state/style defect;
- **page** — one page/flow redesign;
- **journey** — multiple pages/steps for a user outcome;
- **system/site** — IA, brand, design system or whole-site redesign;
- **production/reliability** — release, conformance, regression or measurement work.

### 2. Classify risk
Escalate for:
- money/privacy/consent/security;
- accessibility-critical flows;
- high traffic/conversion consequence;
- major brand/IA/content change;
- irreversible migration;
- complex data/workflow;
- weak/contradictory evidence.

### 3. Build the minimal graph
Always read project context/source-of-truth first. Then choose:
- domain/base capabilities;
- one orchestrating skill when needed;
- narrow specialists justified by task/risk;
- references/checklists only when their decision is active.

### 4. Escalate, do not pre-load
If evidence reveals a new risk, add the relevant specialist at that point.

### 5. Record material routing decisions
For large work, note `task → risk → skills/packs used → why`.

## Examples
- `Fix mobile menu focus trap` → project-context + interaction + responsive + accessibility; not service blueprinting.
- `Redesign school admissions journey` → education + experience-strategy + research/validation + complex forms + inclusive/trust.
- `Formal pre-release audit` → testing/release + measurement/reliability specialists.

## Gate
If a task is spending more effort restating generic guidance than inspecting the actual project, reduce the active skill set.

## Anti-patterns
- All packs on every task.
- Using a large profile as a substitute for project inspection.
- Never escalating after discovering new risk.
- Loading deep references before knowing they are relevant.
