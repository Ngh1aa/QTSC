---
name: ai-agent-coding-guardrails
description: |
  Quy tắc vận hành cho AI coding agent khi sửa hoặc xây website: inspect trước khi edit,
  reuse trước khi create, preserve constraints, tránh scope creep, verify bằng build/test/visual
  evidence và không tuyên bố done khi chưa kiểm chứng. Dùng xuyên suốt mọi coding task.
---

# AI Agent Coding Guardrails

## Mandatory behavior

### Before code

- Đọc request và current project constraints.
- Inspect relevant files, routes, components, styles, data shape.
- Tìm reuse opportunity.
- Xác định acceptance criteria.
- Nếu redesign, đọc `website-audit-and-redesign`.

### During code

- Thay đổi nhỏ nhất đủ giải quyết root problem.
- Preserve API/behavior ngoài scope.
- Reuse design tokens/components.
- Không thêm dependency nếu chưa cần.
- Không hardcode demo data vào production path nếu requirement không cho phép.
- Không “improve” unrelated area chỉ vì agent thấy thích.

### UI guardrails

- Không tạo generic card soup.
- Không tự ý đổi brand color/font/layout language.
- Không bỏ state/responsive/accessibility để chạy nhanh.
- Không dùng absolute positioning làm layout chính chỉ để match screenshot.
- Không duplicate desktop thành mobile markup nếu CSS/composition giải quyết được hợp lý.

### Verification

Tùy scope, chạy/kiểm:

- Build/type/lint.
- Relevant tests.
- Primary interaction.
- Representative viewports.
- Console/runtime errors.
- Accessibility/SEO/performance nếu change có ảnh hưởng.

### Completion report

Nói rõ:

1. Đã thay đổi gì.
2. Vì sao.
3. Đã kiểm chứng bằng gì.
4. Known limitations/issues còn lại.

Không ghi “fixed”, “perfect”, “fully responsive” nếu chưa có evidence.

## Change safety

Nếu file lớn/critical:

- Snapshot behavior trước.
- Refactor theo incremental steps.
- Không overwrite file khi chưa hiểu content.
- Preserve user-authored content trừ khi được yêu cầu thay.

## Acceptance criteria

- [ ] Change trace được về request.
- [ ] Không duplicate giải pháp đã có.
- [ ] Không phá constraints/brand ngoài scope.
- [ ] Có verification phù hợp risk.
- [ ] Completion report trung thực.
