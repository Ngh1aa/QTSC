#!/usr/bin/env python3
"""Small provider-neutral evaluator for UI/UX agent trial result files."""

from __future__ import annotations

import argparse
import json
import sys
from collections import defaultdict
from pathlib import Path


REQUIRED_FIELDS = {"task_id", "trial_id", "status", "grader"}
PASSING_STATUSES = {"passed", "pass"}


def read_results(path: Path) -> list[dict]:
    results: list[dict] = []
    for line_number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), start=1):
        if not line.strip():
            continue
        try:
            result = json.loads(line)
        except json.JSONDecodeError as exc:
            raise ValueError(f"{path}:{line_number}: invalid JSON ({exc.msg})") from exc
        if not isinstance(result, dict):
            raise ValueError(f"{path}:{line_number}: result must be an object")
        missing = REQUIRED_FIELDS - result.keys()
        if missing:
            raise ValueError(f"{path}:{line_number}: missing fields: {', '.join(sorted(missing))}")
        if not isinstance(result["grader"], dict) or "verdict" not in result["grader"]:
            raise ValueError(f"{path}:{line_number}: grader must include a verdict")
        results.append(result)
    if not results:
        raise ValueError(f"{path}: no trial results found")
    return results


def command_list(_: argparse.Namespace) -> int:
    print("No repository-specific evaluation cases are registered yet.")
    print("Record independent trial results as JSONL using .claude/skills/evals/ADAPTER-CONTRACT.md.")
    return 0


def command_validate(args: argparse.Namespace) -> int:
    try:
        results = read_results(args.results)
    except ValueError as exc:
        print(f"Evaluation result validation failed: {exc}", file=sys.stderr)
        return 1
    print(f"Evaluation result validation passed ({len(results)} trials).")
    return 0


def command_summarize(args: argparse.Namespace) -> int:
    try:
        results = read_results(args.results)
    except ValueError as exc:
        print(f"Evaluation summary failed: {exc}", file=sys.stderr)
        return 1
    grouped: dict[str, list[dict]] = defaultdict(list)
    for result in results:
        grouped[str(result["task_id"])].append(result)
    report = {"trials": len(results), "k": args.k, "tasks": []}
    for task_id, trials in sorted(grouped.items()):
        passed = sum(str(item["status"]).lower() in PASSING_STATUSES for item in trials)
        rate = passed / len(trials)
        report["tasks"].append({
            "task_id": task_id,
            "trials": len(trials),
            "passed": passed,
            "success_rate": round(rate, 4),
            "estimated_pass_at_k": round(1 - (1 - rate) ** args.k, 4),
            "note": "Estimated from independent trials; it is not proof of production reliability.",
        })
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    subparsers = parser.add_subparsers(dest="command", required=True)
    subparsers.add_parser("list").set_defaults(handler=command_list)
    validate = subparsers.add_parser("validate")
    validate.add_argument("--results", required=True, type=Path)
    validate.set_defaults(handler=command_validate)
    summarize = subparsers.add_parser("summarize")
    summarize.add_argument("--results", required=True, type=Path)
    summarize.add_argument("--k", type=int, default=3)
    summarize.set_defaults(handler=command_summarize)
    args = parser.parse_args()
    if getattr(args, "k", 1) < 1:
        parser.error("--k must be at least 1")
    return args.handler(args)


if __name__ == "__main__":
    raise SystemExit(main())
