#!/usr/bin/env python3
"""Compatibility entrypoint for the UI/UX skill-library validator."""

from pathlib import Path
import subprocess
import sys


if __name__ == "__main__":
    root = Path(__file__).resolve().parent.parent
    raise SystemExit(
        subprocess.run([sys.executable, str(root / "scripts/validate-uiux-skills.py"), "--root", str(root)]).returncode
    )
