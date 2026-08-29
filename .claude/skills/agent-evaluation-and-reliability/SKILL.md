---
name: agent-evaluation-and-reliability
description: Designs and interprets multi-trial evaluations for UI/UX coding agents using explicit tasks, stable environments, deterministic/model/human graders, capability/regression suites and reliability metrics. Use when validating whether agent behavior is consistently good rather than occasionally successful.
---

# Agent Evaluation & Reliability

## Principle
One good run demonstrates possibility, not reliability.

Use the repository eval suite and provider-neutral result contract in [../evals/README.md](../evals/README.md).

## Core concepts
- **task** — prompt/environment/success criteria;
- **trial** — one independent attempt;
- **grader** — deterministic, model-based or human evaluation;
- **trace** — tool/output/environment record useful for diagnosis;
- **capability eval** — tests frontier quality;
- **regression eval** — protects known-good behavior.

## Workflow
### 1. Write unambiguous tasks
Two competent reviewers should be able to understand what success means. Avoid hidden assumptions in the grader.

### 2. Prefer outcome graders
For coding work prioritize build/tests/state/render outcomes. Use trajectory/tool-call checks only when the path itself is a requirement.

### 3. Mix grader types
- deterministic for build, file/state, lint, accessibility checks and contracts;
- model/rubric for visual/UX judgment;
- human calibration for high-value subjective criteria.

### 4. Run independent trials
Start each trial from a clean comparable environment. Avoid leaked state/history.

### 5. Report reliability honestly
Track raw success rate and score distribution. `pass@k` and `pass^k` are probability concepts; if estimated from observed trials, label them as estimates and state `k`/sample size.

### 6. Promote stable capability cases
When a capability becomes consistently reliable, move representative cases into regression coverage.

## Gate
Do not claim `reliable` from one trial. Do not tune graders to reward a preferred tool choreography when multiple valid solutions exist.

## Anti-patterns
- One-shot benchmark declared complete.
- Grader expects an undocumented filepath/implementation.
- LLM judge without calibration or an `unknown/insufficient evidence` escape.
- Shared dirty environment across trials.
- Agent can pass by gaming the grader without solving the user task.
