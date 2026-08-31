---
name: ai-agent-coding-guardrails
description: |
  Quy tắc vận hành cho AI coding agent khi sửa hoặc xây website: inspect trước edit, reuse trước create,
  preserve constraints/user changes, plan work có risk, tránh scope creep, verify bằng evidence và không
  tuyên bố done/working/production-ready khi chưa kiểm chứng. Dùng xuyên suốt mọi coding task.
---

# AI Agent Coding Guardrails

## Principle

`inspect → understand owner → plan proportional to risk → change smallest root cause → verify → review → report truthfully`

## Before code

- Đọc request, project instructions và source-of-truth.
- Inspect relevant routes, components, tokens, data shape, dependencies, tests và build/deploy conventions.
- Kiểm tra working tree/change state khi tooling cho phép; preserve unrelated user-authored work.
- Tìm reuse/extension owner trước khi tạo abstraction/component mới.
- Xác định acceptance + verification method trước edit cho material change.
- Nếu behavior có thể là mock/simulated/partial, route `system-reality-and-production-readiness`.

## Planning threshold

Không cần plan dài cho local low-risk fix.

Với multi-file, shared-system, high-risk hoặc production-candidate work, tạo task nhỏ có thể verify độc lập:

```text
Goal
Owning files/components
Dependencies
Expected behavior
Edge cases
Verification
Rollback/recovery concern if material
```

Nếu tooling hỗ trợ, ưu tiên branch/worktree riêng cho substantial/risky changes. Không yêu cầu isolation chỉ để sửa typo/local CSS nhỏ.

## During code

- Fix root cause trước page-local patch.
- Reuse → extend → refactor → create mới.
- Preserve API/behavior ngoài scope.
- Không thêm dependency nếu native/existing stack đủ.
- Không hardcode demo/mock data vào production path nếu requirement không cho phép.
- Không “improve” unrelated area chỉ vì agent thấy thích.
- Không dùng destructive git operations để xử lý conflict/rollback mặc định.
- Không xoá/sửa user work không thuộc task.

## UI guardrails

- Không tạo generic card soup/pill/glass/gradient như default style.
- Không tự ý đổi brand color/font/layout language.
- Không bỏ state/responsive/accessibility để chạy nhanh.
- Không dùng absolute positioning làm layout chính chỉ để match screenshot.
- Không duplicate desktop thành mobile markup nếu composition/CSS giải quyết hợp lý.
- Không hạ một design direction có rationale thành generic component soup.

## System-reality guardrails

Không suy luận:

- success toast = backend success;
- login UI = auth;
- search box = search integration;
- checkout UI = payment;
- analytics event plan = tracking live.

Không gọi feature `working/integrated/live` nếu reality còn `MOCK/STATIC/SIMULATED/PARTIAL/UNKNOWN`.

## Verification matrix

Với material changes ghi hoặc ít nhất suy nghĩ rõ:

`change → expected outcome → verification method → pass condition → result`

Tùy scope, chạy/inspect:

- build/type/lint;
- relevant unit/integration/E2E checks;
- primary + error/recovery interaction;
- representative viewports/pressure widths;
- browser differences khi production-relevant;
- console/runtime errors;
- accessibility/SEO/performance/security khi change ảnh hưởng.

Build pass không chứng minh visual/UX correctness.

## Two-stage self/reviewer check

### Stage 1 — Spec compliance
- đúng request/problem?
- preserve project/brand/business constraints?
- scope creep?

### Stage 2 — Code/experience quality
- đúng owner/reuse?
- maintainable?
- state/responsive/accessibility/data reality?
- verification đủ risk?

Nếu stage 1 fail, code đẹp vẫn fail.

## Completion report

Nói rõ:

1. Đã thay đổi gì.
2. Vì sao/root cause nào.
3. Đã kiểm chứng bằng gì và điều kiện nào.
4. Unverified/known limitations/P0-P1 còn lại.

Không ghi `fixed`, `perfect`, `fully responsive`, `secure`, `production-ready` nếu chưa có evidence phù hợp exact claim.

## Acceptance criteria

- [ ] Change trace được về request/verified defect.
- [ ] Project/user changes ngoài scope được preserve.
- [ ] Không duplicate solution đã có mà không có lý do.
- [ ] Mock/system reality không bị báo sai.
- [ ] Material change có verification phù hợp risk.
- [ ] Spec + quality đều được review.
- [ ] Completion report trung thực.
