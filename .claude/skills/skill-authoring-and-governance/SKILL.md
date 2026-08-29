---
name: skill-authoring-and-governance
description: |
  Reviews, creates and maintains SKILL.md packages in this UI/UX library. Use when adding a new
  capability, splitting an oversized skill, improving discovery descriptions, reducing overlap,
  adding progressive-disclosure resources, profiles or evals, or updating skills after standards change.
---

# Skill Authoring & Governance

## Goal

Mỗi skill phải **discoverable, actionable, composable, testable và context-efficient**.

## Authoring workflow

1. Search existing skill catalog trước khi tạo mới.
2. Define capability boundary: decision nào skill này sở hữu?
3. Write third-person `description` nêu rõ **what + when + trigger vocabulary**.
4. Keep `SKILL.md` focused on decisions/workflow/output/gates.
5. Move detailed knowledge/code/examples sang resource khi nó không luôn cần.
6. Link resource trực tiếp từ `SKILL.md`; tránh reference chain sâu.
7. Add at least representative positive, negative/near-miss và complex eval cases cho capability quan trọng.
8. Run structural validators + representative agent evals trước merge.
9. Update catalog/profile nếu capability cần được routed/cài.

## Package pattern

```text
skill-name/
├── SKILL.md
├── references/      # optional deep knowledge
├── checklists/      # optional deterministic review gates
├── examples/        # optional concrete examples
└── scripts/         # optional deterministic helpers
```

Không tạo folder/resource rỗng để “đúng template”.

## Frontmatter rules

- `name`: lowercase letters/numbers/hyphens, <=64 chars, match folder name.
- `description`: non-empty, <=1024 chars, third person, what + when.
- Không dùng reserved/model/vendor name trong `name`.
- Metadata phải stable; time-sensitive facts nằm trong reference với verify-current rule khi cần.

## Progressive disclosure rules

- Target `SKILL.md` body <500 lines; ngắn hơn nữa nếu capability cho phép.
- Main file phải đủ để agent quyết định bước tiếp theo mà chưa cần load encyclopedia.
- Resource file có tên mô tả nội dung; tránh `notes.md`, `misc.md`.
- Scripts nên giải quyết deterministic work, không chỉ wrap prompt khác.

## Overlap test

Tạo skill mới chỉ khi capability boundary khác rõ. Nếu >70% workflow/rules trùng skill hiện có, ưu tiên extend/refactor.

## Evaluation

Chấm outcome hơn exact path. Evals nên có:
- task realistic;
- expected outcomes;
- must-not failure modes;
- deterministic assertions khi có thể;
- rubric cho judgment dimensions;
- regression cases cho behavior đã ổn.

## V2 resources

- [Authoring standard](references/v2-authoring-standard.md)
- [Review gate](checklists/review-gate.md)
- [Good package example](examples/good-skill-layout.md)

## Acceptance criteria

- Trigger không quá broad/vague.
- Workflow action-oriented, không textbook.
- Output + quality gate rõ.
- Không duplicate capability vô lý.
- Progressive resources có reason và link rõ.
- Relevant eval/profile/catalog được cập nhật.
- `python scripts/validate-skills.py` và `python scripts/validate-v2.py` pass.
