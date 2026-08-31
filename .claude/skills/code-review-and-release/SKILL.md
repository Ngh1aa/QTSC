---
name: code-review-and-release
description: |
  Code review, release-readiness, deploy/rollback và post-deploy verification theo scope/risk.
  Dùng khi substantial change chuẩn bị merge/release hoặc user yêu cầu production readiness.
  Tách spec compliance khỏi code quality, dùng project-specific gates và tránh destructive rollback mặc định.
---

# Code Review & Release

## Principle

`review intent → review implementation → verify evidence → assess release risk → release safely → smoke production → monitor`

Release gate phải phản ánh project thật; không bắt mọi site cùng Lighthouse/browser/test thresholds.

## 1. Scope the release

Ghi:

```text
Project mode
Target environment
Changed routes/features
Shared owners/tokens/components touched
Data/API/CMS/auth/payment dependencies
Config/env/migration requirements
SEO/URL redirects if any
Known P0/P1 risks
Rollback mechanism
```

Không release production nếu không biết target/dependency critical trong scope.

## 2. Two-stage review

### Stage A — Spec / intent compliance

- Change có giải quyết đúng request/problem?
- Project truth/brand/business/user constraints được preserve?
- Có scope creep/unrelated refactor?
- System reality có truthful không: REAL/MOCK/STATIC/SIMULATED/PARTIAL/UNKNOWN?
- Acceptance conditions ban đầu đã đạt?

Stage A fail → không approve chỉ vì code clean.

### Stage B — Code / experience quality

Review theo affected surface:

- correct owner/reuse/architecture;
- semantic HTML/state logic;
- component/token drift;
- responsive/browser behavior;
- accessibility;
- data/error/recovery behavior;
- performance budget/regression;
- security/privacy when applicable;
- SEO/content integrity when applicable;
- tests/verification coverage.

Không yêu cầu một checklist không liên quan chỉ để “đủ mục”.

## 3. Verification matrix

Mỗi material change:

| Change | Expected outcome | Verification | Pass condition | Result |
|---|---|---|---|---|

Possible evidence:

- build/type/lint;
- unit/integration/E2E;
- route smoke;
- network/API behavior;
- visual comparison;
- representative viewport/browser checks;
- keyboard/AT checks;
- performance/security checks;
- deployed-environment smoke.

`PASS` chỉ khi evidence phù hợp exact claim. Dùng `PARTIAL`, `UNVERIFIED`, `N/A` khi đúng thực tế.

## 4. Release blockers

Mặc định block release nếu applicable:

- unresolved P0;
- P1 làm hỏng primary/critical journey mà không có accepted mitigation;
- false success/data behavior;
- build/runtime failure;
- known secret exposure chưa xử lý;
- auth/access-control/security issue nghiêm trọng trong changed path;
- destructive data/schema change không có migration/rollback plan;
- critical accessibility blocker;
- redirect/SEO migration có nguy cơ mất critical URLs mà chưa map;
- không có cách rollback/recover hợp lý cho high-risk release.

Không block prototype vì production-only requirement nếu project mode không phải production-candidate/production; thay vào đó ghi gap.

## 5. Pre-release checklist

Theo scope, xác nhận:

### Project / code
- working tree/change set understood;
- unrelated user changes preserved;
- build/type/lint/tests relevant đã chạy hoặc ghi unverified;
- dependency/config/env changes documented;
- source-of-truth/docs updated khi material.

### Product / content
- placeholders/fake data không vô tình ship như real data;
- contact/legal/business-critical facts verified;
- error/empty/loading/success states truthful;
- analytics/consent state aligned actual implementation.

### UX / quality
- representative responsive/browser matrix;
- critical keyboard/accessibility checks;
- visual QA on affected routes;
- performance budget/regression check where material;
- no broken critical links/actions.

### Platform / SEO
- redirects/canonical/sitemap/robots changes verified when applicable;
- security headers/config reviewed in deployed environment when applicable;
- third-party services/env keys configured without exposing secrets.

## 6. Deployment record

Record:

```text
release/commit identifier
target environment
time/date if relevant
migration/config changes
known issues
verification completed
rollback target/procedure
```

Không tự deploy nếu user/project authorization không cho phép.

## 7. Rollback discipline

Prefer, theo platform:

1. platform previous-deployment rollback / immutable release rollback;
2. safe git revert of release commit(s);
3. forward fix nếu rollback gây data/schema risk và incident process chọn forward fix.

Không dùng `git reset --hard` + force-push shared/default branch làm rollback mặc định.

Nếu database/schema/data migration involved, code rollback không đủ; phải đánh giá data compatibility/recovery separately.

## 8. Post-deploy smoke

Sau release, nếu có quyền truy cập target environment, verify critical subset:

- production URL/HTTPS;
- primary navigation/journey;
- forms/search/auth/payment/integrations affected;
- console/network/server errors available;
- redirects/canonical critical paths;
- analytics event delivery when in scope;
- obvious visual/responsive regression;
- monitoring alerts/logging health.

Không gọi release done chỉ vì CI/deploy job green.

## 9. Monitoring / learning

Define what to watch:

- errors/failed requests;
- 404/redirect anomalies;
- submission/conversion breakage;
- performance/CWV trend;
- analytics instrumentation;
- support/user feedback;
- security/abuse signals when available.

Production incident/failure material phải feed về tests, regression coverage, design/system docs hoặc research.

## Output

Cho substantial release, tạo `docs/release-readiness.md` hoặc equivalent:

```md
# Release Readiness
## Scope
## Stage A — Spec compliance
## Stage B — Quality review
## Verification matrix
## Blockers / known risks
## Release dependencies
## Rollback plan
## Post-deploy smoke
## Monitoring
```

## Quality gate

- [ ] Stage A và B tách rõ.
- [ ] Material changes có verification evidence.
- [ ] P0/P1 được xử lý hoặc reported/accepted rõ.
- [ ] System reality không bị phóng đại.
- [ ] Rollback không dựa mặc định vào destructive history rewrite.
- [ ] Production release có post-deploy smoke plan/result.
- [ ] Completion claim match evidence.

## Anti-patterns

- “CI green” = release success.
- Force-push rollback mặc định.
- Universal Lighthouse threshold làm release gate cho mọi project.
- Review style/naming nhưng bỏ qua broken behavior.
- Self-review chỉ nhìn diff, không inspect rendered/runtime result khi UI changed.
- Ship mock/fake data như production truth.
