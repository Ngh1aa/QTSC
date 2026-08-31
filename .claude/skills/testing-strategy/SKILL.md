---
name: testing-strategy
description: |
  Xây test/verification strategy theo critical journeys, change risk và project support matrix:
  functional, state/error/recovery, responsive/browser, accessibility, visual, performance và regression.
  Dùng khi implementation cần evidence trước completion/release; không biến fixed checklist thành proof.
---

# Testing Strategy

## Principle

`critical outcome → risk → test surface → expected result → evidence → regression coverage`

Không test mọi thứ giống nhau. Ưu tiên journey/behavior có consequence cao.

## 1. Test scope

Xác định:

```text
Project mode
Changed routes/components/features
Critical user journeys
System reality (REAL/MOCK/STATIC/SIMULATED/PARTIAL/UNKNOWN)
Supported browsers/devices if known
Risk level
Existing test tooling
Release target
```

Nếu browser/device support chưa được project định nghĩa, dùng representative modern matrix như hypothesis chứ không gọi là official support.

## 2. Priority

- `P0` — critical journey/data/security/payment blocker; must pass for production release.
- `P1` — major function/UX/accessibility/responsive issue; normally release-blocking unless accepted mitigation.
- `P2` — craft/secondary path/regression concern.
- `P3` — optional/low-consequence preference.

## 3. Verification matrix

Material change phải map:

| Change / capability | Risk | Expected outcome | Test method | Pass condition | Evidence/result |
|---|---|---|---|---|---|

Không ghi `PASS` nếu không thực sự chạy/inspect test phù hợp.

## 4. Functional / state testing

Test happy path + relevant alternative/recovery states:

```text
default
loading/pending
success
validation error
server/network error
empty / filtered-empty
partial/stale
permission/auth failure
timeout/retry
duplicate-submit/idempotency concern
cancel/undo/back navigation where relevant
```

Form success chỉ pass khi system reality cho phép biết operation thật sự thành công. Prototype simulation phải được label simulated.

## 5. Responsive testing

Test representative widths **và pressure widths**, không chỉ exact breakpoints.

Default sampling khi project không định nghĩa:

- small mobile around 360–390px;
- tablet/intermediate around 768px;
- desktop around 1280px+;
- widths ngay trước/sau layout break/change nếu issue xuất hiện ở đó.

Check:

- no unintended horizontal overflow;
- reading/order/hierarchy;
- heading/button/nav wrapping;
- image/video crop;
- touch/interactive reachability;
- sticky/fixed UI;
- dialogs/menus;
- tables/filters/forms;
- density/whitespace.

Không yêu cầu mọi page phải có CTA above fold hoặc cards stack theo một pattern cố định.

## 6. Browser matrix

Theo project/audience support. Khi chưa có matrix và production scope material, ưu tiên representative engines:

- Chromium;
- WebKit/Safari;
- Firefox.

Không cần test browser không support chỉ để đủ checklist.

Tập trung feature dễ khác browser:

- sticky/fixed/viewport units;
- forms/date/select controls;
- flex/grid intrinsic sizing;
- font metrics;
- filters/backdrop;
- scroll behavior;
- media autoplay/inline playback;
- animation;
- focus/keyboard behavior.

## 7. Accessibility testing

Phân tầng evidence:

### Automated baseline
- axe/Lighthouse/HTML checks nếu tooling phù hợp.

### Manual keyboard
- focus order/visibility;
- all actions reachable;
- no trap;
- modal/menu focus management;
- error/recovery states.

### Zoom/reflow/visual
- zoom/text resize/reflow when material;
- contrast/no color-only meaning;
- reduced motion.

### Assistive technology
- screen reader/AT testing cho critical/high-risk journeys khi scope/risk justify.

Automation-only không chứng minh WCAG conformance. Formal claim route `accessibility-conformance-evaluation`.

## 8. Visual QA

Rendered UI changed → inspect rendered result.

Check:

- hierarchy;
- grid/alignment;
- typography/wrapping;
- spacing rhythm;
- color/surface/brand roles;
- image crop/focal point;
- component states;
- page diversity vs template repetition;
- responsive pressure points;
- visual regression on shared owners.

Screenshot tồn tại nhưng không được inspect ≠ evidence.

## 9. Performance testing

Dùng `web-quality-and-performance` budgets/project targets.

- lab test dưới conditions ghi rõ;
- multiple runs/stable CI khi variability material;
- field data khi available;
- resource/third-party budget when relevant.

Không hardcode “Lighthouse >= 90 all categories” như universal release truth.

## 10. Security/privacy verification

Khi changed path có form/auth/API/data/upload/payment/third party, route `security-and-privacy` và test controls phù hợp scope trong safe environment.

Test strategy không tự biến thành penetration test hoặc compliance audit.

## 11. Regression strategy

Với shared/high-impact change, xác định affected matrix:

```text
shared owner/token/component
→ routes/templates using it
→ states/viewports to sample
→ automated/manual regression evidence
```

Ưu tiên deterministic tests cho behavior; visual snapshots/baselines cần intentional review khi thay đổi.

## 12. Evidence record

Cho test đã chạy, ghi:

```text
method
environment/browser/viewport when material
result
evidence/artifact reference if available
limitations
```

Không fabricate test result.

## Output

Cho substantial work, tạo `docs/test-plan.md` hoặc `docs/verification-matrix.md`:

```md
# Verification Plan
## Scope / risks
## Critical journeys
## Browser / responsive matrix
## Verification matrix
## Accessibility evidence
## Performance evidence
## Regression coverage
## Failures / unresolved P0-P1
## Unverified areas
```

## Quality gate

- [ ] Critical journeys/risk drive test priority.
- [ ] Happy path + material recovery states covered.
- [ ] Responsive tested at pressure widths.
- [ ] Browser matrix matches project or is explicitly proposed.
- [ ] Accessibility evidence level reported accurately.
- [ ] Visual changes visually inspected.
- [ ] Performance uses budgets/conditions, not vanity score alone.
- [ ] Mock/simulated behavior not reported as real system pass.
- [ ] P0/P1 failures explicit.

## Anti-patterns

- “Looks good on my machine” = tested.
- Build success = functional/visual proof.
- Exact breakpoint-only testing.
- Automated accessibility scan = conformance.
- One Lighthouse run = field performance.
- Success toast = backend test pass.
- Testing only demo/happy-path content.
