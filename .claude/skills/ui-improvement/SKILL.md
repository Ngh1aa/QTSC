---
name: ui-improvement
description: |
  Orchestrates evidence-based UI remediation for an existing implemented interface. Use when the user asks to fix, improve, polish, clean up, modernize or make an existing website/page/component UI more professional while preserving the intended brand, content and product behavior unless a redesign is explicitly requested.
---

# UI Improvement

## Goal

Turn an existing implemented UI from inconsistent, generic, visually weak or poorly responsive into a more coherent, intentional and maintainable interface **without unnecessarily redesigning the product**.

This skill owns the remediation workflow:

`inspect current UI → preserve intent → diagnose verified problems → route narrow specialists → implement → verify rendered result`

It does not replace `ui-craft-and-visual-qa`, `visual-design-direction`, `design-system-and-components` or `frontend-implementation`; it coordinates them when the user asks for the UI itself to be improved.

## Trigger examples

Use this skill for requests such as:

- “sửa giao diện trang này”;
- “nâng cấp UI nhưng giữ style hiện tại”;
- “polish toàn bộ UI”;
- “giao diện nhìn chưa chuyên nghiệp”;
- “UI trông giống AI/template”;
- “chỉnh lại layout, spacing, typography, card, button, mobile”;
- “làm giao diện đẹp hơn nhưng không đổi content/brand”;
- “redesign UI” when the request is primarily visual/interface remediation on an existing implementation.

Do **not** use this as the main orchestrator when the task is primarily:

- whole-site discovery/IA/service redesign → use `website-delivery-pipeline` / `website-audit-and-redesign`;
- implementing a fully approved spec with no UI diagnosis needed → use `frontend-implementation`;
- audit-only with no requested changes → use `ui-craft-and-visual-qa` or the relevant audit skill;
- exact screenshot/Figma reproduction → use `reference-analysis-and-design-to-code` with implementation skills.

## Step 0 — Read project truth first

Before changing UI:

1. Read applicable project instructions and `.uiux-profile.json` if present.
2. Read relevant `source_of_truth`, brand/design docs and existing constraints.
3. Identify project mode: production, production-candidate, interactive-prototype, visual-prototype or proof-of-concept.
4. Inventory the affected routes, templates, shared components, tokens, assets and existing implementation owners.
5. Check current user changes/working tree when repository tooling allows; never overwrite unrelated work.

Project-specific truth overrides generic visual preferences.

## Step 1 — Classify requested change

Classify the scope before loading specialists:

- **local** — one component/state/style defect;
- **page** — one page composition or responsive surface;
- **journey** — several connected screens whose UI affects one task;
- **system/site** — repeated layout/component/design-system issues across the site.

Also classify intent:

- **preserve-style improvement** — default when the user asks to fix/polish without requesting a new visual identity;
- **directed redesign** — user explicitly requests a new visual direction;
- **reference-led** — a screenshot/Figma/reference should guide the result.

Do not silently convert a polish request into a brand redesign.

## Step 2 — Inspect rendered evidence + source

Prefer the real rendered interface when available. Inspect representative routes, states and viewports before editing.

Review from macro to micro:

1. page purpose and visual hierarchy;
2. section rhythm, density and whitespace;
3. grid, container and alignment;
4. typography and readability;
5. components and interactive states;
6. responsive behavior;
7. imagery/icon/media consistency;
8. micro-details and motion.

Use source inspection to identify the actual owner of each issue: component, token, CSS rule, layout primitive, state logic or asset.

Do not call an issue a visual regression without confirming whether the difference is intentional.

## Step 3 — Build the preserve contract

Before changing code, explicitly preserve what is already working unless the user requested otherwise:

- brand identity and approved color roles;
- content meaning and important hierarchy;
- existing primary user journey;
- SEO-relevant content/URLs;
- working interactions and API behavior;
- strong visual signatures;
- useful components/tokens/patterns;
- user conventions that do not create measurable friction.

A UI improvement is not successful if it merely looks newer while losing identity, clarity or behavior.

## Step 4 — Diagnose problems, not tastes

Create only evidence-backed findings that can change implementation decisions.

Useful finding classes include:

- weak or competing hierarchy;
- repetitive/template-like composition;
- spacing/rhythm inconsistency;
- grid/alignment drift;
- typography readability or scale problems;
- inconsistent component variants/states;
- excessive raw values/local overrides;
- poor mobile reflow or compressed-desktop behavior;
- overflow/clipping/wrapping;
- interaction state ambiguity;
- irrelevant/inconsistent imagery or icons;
- decorative effects that conflict with brand/purpose;
- accessibility-visible UI issues such as missing focus/error states.

Avoid unsupported comments such as “make it more modern”, “add more glass”, “needs more animation” or “this looks bad”.

For each material finding record:

`finding → evidence → affected surface → impact → root cause → remediation → verification`

## Step 5 — Adaptive specialist routing

Start with the smallest useful graph.

### Default graph

- `project-context`
- `ui-craft-and-visual-qa`
- `frontend-implementation`
- `responsive-and-device-strategy`

### Add only when justified

- weak/generic visual grammar or explicit redesign → `visual-design-direction`;
- token/component duplication or system drift → `design-system-and-components`;
- screenshot/Figma/reference → `reference-analysis-and-design-to-code`;
- image/icon/media quality is part of the problem → `asset-media-and-art-direction`;
- complex form/search/dialog/state behavior → `interaction-patterns-and-form-ux` and narrow specialists;
- meaningful motion requirement → `motion-and-microinteractions`;
- semantic/keyboard/focus risk → `accessibility`;
- architecture duplication blocks a clean fix → `frontend-architecture-and-refactoring`;
- repeated cross-page drift or snapshot risk → `visual-regression-and-design-drift`.

Do not enable a specialist merely because its topic appears somewhere on the page.

## Step 6 — Choose remediation depth

Use the shallowest change that fixes the root cause.

Prefer this order:

1. reuse an existing correct token/component/pattern;
2. fix the shared owner used by multiple affected surfaces;
3. refactor a duplicate pattern when semantics are genuinely the same;
4. add a missing semantic token/component contract when the system needs it;
5. create a page-local exception only when it is intentionally unique and documented by context.

Avoid page-by-page patches for a shared system defect.

## Step 7 — UI craft rules

### Hierarchy and composition

- Make the page purpose and primary action legible quickly.
- Vary section composition when content roles differ; do not repeat a template mechanically.
- Use whitespace to express relationships, not simply to create emptiness.
- Keep focal points intentional; avoid several equal-weight CTA/accents competing at once.

### Anti-generic UI

Flag and remove unjustified repetition such as:

- every section becoming rounded cards;
- centered heading + three cards repeated across the page;
- glass/gradient/shadow used everywhere;
- decorative pill/badge/icon containers with no semantic role;
- identical section rhythm regardless of content;
- multiple competing accent colors;
- oversized hero with too many labels and CTA;
- decorative blobs/effects replacing real hierarchy.

Do not remove these patterns when the project’s approved brand system intentionally depends on them.

### Typography

- Maintain a clear but controlled H1/H2/H3/body/meta/action scale.
- Keep body line length and line height readable.
- Check Vietnamese diacritics and real locale content where relevant.
- Verify responsive wrapping for headings, nav and buttons.

### Spacing and grid

- Reuse the project spacing scale and layout primitives.
- Prefer parent `gap`/layout ownership over random sibling margins.
- Equivalent relationships should use equivalent spacing.
- Keep container/grid alignment consistent across templates unless the visual grammar defines intentional exceptions.

### Components and states

For interactive components check applicable states:

`default → hover → focus-visible → active/selected → disabled → loading → success/error`

Do not polish only the default screenshot state.

### Responsive

Treat mobile/tablet as intentional compositions, not smaller desktop copies.

Check:

- reading order;
- title/button wrapping;
- touch targets;
- nav density;
- image crop/focal point;
- stacking and gaps;
- overflow/clipping;
- sticky/fixed UI;
- modal/dialog behavior;
- density and whitespace.

## Step 8 — Implementation discipline

When the user asked to improve/fix the UI, implement the approved/high-confidence remediation rather than only describing it.

Before editing each area:

1. identify the owning file/component/token;
2. reuse existing system decisions first;
3. note affected routes/templates;
4. preserve behavior outside the requested scope.

Implementation rules:

- fix root cause before adding overrides;
- reuse before create; refactor before duplicate;
- do not introduce a new dependency for simple visual work;
- do not hide broken mobile content merely to remove overflow;
- do not replace semantic HTML with positioning hacks;
- do not add magic values repeatedly when a stable token already exists;
- do not rewrite unrelated pages/components;
- do not change business logic, API contracts, URLs or content strategy merely to improve appearance.

If the required fix would change major IA, brand direction, content meaning or business behavior and the user did not ask for that, mark it as `REQUIRES DECISION` instead of silently proceeding.

## Step 9 — Verification loop

After implementation, inspect the rendered result again.

Use project-appropriate verification such as:

- representative desktop/tablet/mobile viewports;
- route smoke;
- console/runtime checks;
- build/lint/typecheck/tests already available;
- keyboard/focus inspection for changed interactive UI;
- overflow/wrapping checks;
- before/after screenshot comparison;
- visual regression checks for shared high-impact changes.

A build pass is not visual proof. A screenshot file that was never inspected is not visual proof.

If verification fails, do not call the finding fixed.

## Output

For a substantial remediation, report compactly:

### UI Improvement Summary
- Scope changed.
- Primary visual/root-cause fixes.
- What was intentionally preserved.

### Changed Surfaces
`route/template → component/file → change`

### Verification
`check → PASS / FAIL / PARTIAL / N/A`

### Remaining
- unresolved issues;
- `REQUIRES DECISION` items;
- limitations not verified.

Create `docs/UI-IMPROVEMENT.md` only when the task is large enough that a persistent implementation record is useful; do not create documentation for trivial local fixes.

## Completion gate

Do not call the UI improved or finished unless the changed surfaces were actually inspected after implementation.

Minimum completion questions:

- Is the page purpose/hierarchy clearer without changing intended meaning?
- Did the change preserve the approved brand/style unless redesign was requested?
- Did shared issues get fixed at the correct owner instead of patched repeatedly?
- Are representative responsive states still coherent?
- Are changed interactive states visible and usable?
- Did the implementation avoid unnecessary new variants/tokens/dependencies?
- Were build/runtime/visual checks reported truthfully?

## Anti-patterns

- Redesigning because the agent personally prefers another style.
- Applying SaaS cards, glassmorphism or gradients to every domain.
- Fixing screenshots while breaking real flow/state behavior.
- Rewriting the entire codebase for a visual polish request.
- Treating every raw CSS value as design-system drift without context.
- Calling mobile complete after inspecting only desktop.
- Claiming polish is successful without rendered verification.
- Loading the whole skill library for one page-level UI task.
