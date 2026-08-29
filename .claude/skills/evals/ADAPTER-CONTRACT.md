# Provider-neutral result contract

Write one UTF-8 JSON object per trial. Required fields:

```json
{
  "task_id": "company-filter-keyboard",
  "trial_id": "run-01",
  "status": "passed",
  "grader": {
    "verdict": "pass",
    "method": "deterministic-and-human",
    "notes": "Filter works by keyboard and empty state is announced."
  }
}
```

- `task_id`: stable identifier for the task and acceptance criteria.
- `trial_id`: unique identifier for one independent attempt.
- `status`: `passed`, `failed`, or another explicit terminal state.
- `grader.verdict`: final grader decision. Include `grader.method` and concise
  evidence when available.

Recommended fields: `provider`, `model`, `commit`, `started_at`, `completed_at`,
`artifacts`, `environment`, `limitations`, and numeric `score`. Do not record
secrets, personal data, or full private prompts in a result artifact.
