#!/usr/bin/env python3
"""Validate the V5 evaluation resources expected by the UI/UX skill library."""

from pathlib import Path
import subprocess
import sys


def main() -> int:
    root = Path(__file__).resolve().parent.parent
    required = [
        root / ".claude/skills/evals/README.md",
        root / ".claude/skills/evals/ADAPTER-CONTRACT.md",
        root / "scripts/eval-harness.py",
    ]
    missing = [path.relative_to(root).as_posix() for path in required if not path.is_file()]
    if missing:
        print("Missing V5 evaluation resources:", *missing, sep="\n- ", file=sys.stderr)
        return 1
    return subprocess.run([sys.executable, str(root / "scripts/validate-uiux-skills.py"), "--root", str(root)]).returncode


if __name__ == "__main__":
    raise SystemExit(main())
