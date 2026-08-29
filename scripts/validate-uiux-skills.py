#!/usr/bin/env python3
"""Validate the project contract around the synchronized UI/UX skill library."""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Iterable


FRONTMATTER = re.compile(r"\A---\s*\n(?P<body>.*?)\n---(?:\s*\n|\Z)", re.DOTALL)
NAME = re.compile(r"^name:\s*(?P<value>[^#\n]+)", re.MULTILINE)
DESCRIPTION = re.compile(r"^description:\s*(?P<value>\||>|[^#\n]+)", re.MULTILINE)
LINK = re.compile(r"(?<!!)\[[^]]+\]\(([^)]+)\)")


def error(messages: list[str], message: str) -> None:
    messages.append(message)


def markdown_targets(text: str) -> Iterable[str]:
    for target in LINK.findall(text):
        target = target.strip().split("#", 1)[0].strip()
        if target and not re.match(r"(?:https?:|mailto:|#)", target):
            yield target.strip("<>")


def validate(root: Path) -> list[str]:
    errors: list[str] = []
    profile_path = root / ".uiux-profile.json"
    manifest_path = root / ".claude" / "skills" / ".skills-uiux-manifest.json"
    skills_root = manifest_path.parent

    for required in (profile_path, manifest_path, root / "AGENTS.md"):
        if not required.is_file():
            error(errors, f"Missing required project contract file: {required.relative_to(root)}")

    if errors:
        return errors

    try:
        profile = json.loads(profile_path.read_text(encoding="utf-8"))
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        return [f"Invalid JSON: {exc}"]

    for key in ("project", "source_of_truth", "constraints"):
        if key not in profile:
            error(errors, f"Profile is missing '{key}'.")
    for source in profile.get("source_of_truth", []):
        if not (root / source).is_file():
            error(errors, f"Profile source_of_truth is missing: {source}")

    skill_names = manifest.get("skills")
    if not isinstance(skill_names, list) or not skill_names:
        return errors + ["Manifest must contain a non-empty 'skills' list."]
    if len(skill_names) != len(set(skill_names)):
        error(errors, "Manifest contains duplicate skill names.")

    for skill_name in skill_names:
        skill_dir = skills_root / skill_name
        skill_file = skill_dir / "SKILL.md"
        if not skill_file.is_file():
            error(errors, f"Manifest skill is missing SKILL.md: {skill_name}")
            continue
        text = skill_file.read_text(encoding="utf-8")
        frontmatter = FRONTMATTER.match(text)
        if not frontmatter:
            error(errors, f"{skill_name}: missing YAML frontmatter.")
            continue
        name = NAME.search(frontmatter.group("body"))
        description = DESCRIPTION.search(frontmatter.group("body"))
        if not name:
            error(errors, f"{skill_name}: frontmatter is missing name.")
        elif name.group("value").strip().strip('"\\\'') != skill_name:
            error(errors, f"{skill_name}: frontmatter name does not match directory.")
        if not description:
            error(errors, f"{skill_name}: frontmatter is missing description.")
        for target in markdown_targets(text):
            if not (skill_dir / target).is_file():
                error(errors, f"{skill_name}: linked resource does not exist: {target}")

    installed = {
        path.name
        for path in skills_root.iterdir()
        if path.is_dir() and (path / "SKILL.md").is_file()
    }
    unmanaged = sorted(installed - set(skill_names))
    if unmanaged:
        error(errors, "Skill folders missing from manifest: " + ", ".join(unmanaged))
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path.cwd(), help="Repository root")
    args = parser.parse_args()
    root = args.root.resolve()
    errors = validate(root)
    if errors:
        print("UI/UX skill validation failed:", file=sys.stderr)
        for item in errors:
            print(f"- {item}", file=sys.stderr)
        return 1
    manifest = json.loads((root / ".claude/skills/.skills-uiux-manifest.json").read_text(encoding="utf-8"))
    print(f"UI/UX skill validation passed ({len(manifest['skills'])} skills).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
