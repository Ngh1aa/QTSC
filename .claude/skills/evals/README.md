# UI/UX Agent Evaluation

Use this suite only when the question is whether an agent workflow is reliably
good across independent runs. It is not required for routine implementation.

1. Define a realistic task with observable outcome criteria and a clean,
   comparable environment.
2. Run independent trials without carrying hidden state or prior solutions.
3. Grade outcomes with deterministic checks where possible; use calibrated human
   or model judgment only for criteria that cannot be checked mechanically.
4. Save one result object per line in a UTF-8 JSONL file following the
   [adapter contract](ADAPTER-CONTRACT.md).
5. Run `python scripts/eval-harness.py validate --results results.jsonl`, then
   `python scripts/eval-harness.py summarize --results results.jsonl --k 3`.

See [sample-results.jsonl](examples/sample-results.jsonl) for a minimal,
non-production result file.

The summary labels pass-at-k as an estimate. It does not establish production
reliability, accessibility conformance, or user-outcome improvement.
