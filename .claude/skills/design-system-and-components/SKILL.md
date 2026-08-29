---
name: design-system-and-components
description: |
  Xây hoặc mở rộng design system cho website bằng tokens, semantic roles, component contracts,
  variants, states, composition và accessibility. Dùng trước/đồng thời implementation khi UI cần
  consistency, reuse, theme/responsive behavior hoặc khi audit code đang hardcode/duplicate styles.
---

# Design System & Components

## Goal

Chuyển brand + visual direction thành **reusable decisions**, không phải collection class/component ngẫu nhiên.

`brand → primitive tokens → semantic tokens → component tokens → components → patterns → pages`

## Prerequisites

- Brand constraints đủ rõ.
- Visual direction/layout grammar đã có hoặc được xác định đồng thời.
- Biết primary page templates và interaction inventory.

## Workflow

1. Inventory existing tokens/components trước khi tạo mới.
2. Define foundations: color roles, type scale, spacing, radius, border, elevation, motion, layout widths.
3. Tách primitive values khỏi semantic roles.
4. Define component contracts: purpose, anatomy, variants, states, responsive behavior, accessibility.
5. Xác định composition patterns để page không tự invent spacing/hierarchy.
6. Implement representative components trước, validate bằng real page compositions.
7. Audit duplicate variants/hardcoded values và merge khi semantics giống nhau.
8. Document exceptions có rationale.

## Decision rules

- Token name mô tả **meaning** ở semantic layer (`surface-brand`, `text-muted`) thay vì chỉ value (`purple-500`).
- Không tạo variant chỉ vì một page cần 4px khác; ưu tiên composition/token đúng layer.
- State là contract: default/hover/focus/active/disabled/loading/error/selected… theo component.
- Responsive behavior thuộc component spec, không để page tự patch.
- Accessibility thuộc component contract, không phải checklist cuối.
- Nếu interchange giữa tools cần chuẩn tokens, tham chiếu current DTCG format; không hardcode assumption cũ.

## Progressive resources

- [Token architecture](references/token-architecture.md)
- [Component contracts](references/component-contracts.md)
- [Component quality gate](checklists/component-gate.md)
- [Component spec example](examples/component-spec.md)

## Output

- `docs/design-system.md` hoặc equivalent.
- Token source of truth.
- Component inventory + contracts.
- Reuse/duplication decisions.
- Known exceptions.

## Acceptance criteria

- Visual values quan trọng không scattered hardcode vô lý.
- Semantic roles đủ để theme/brand states không phụ thuộc page.
- P0 components có state/responsive/a11y contract.
- Page composition reuse patterns thay vì copy CSS.
- New variants có semantic reason.
- Representative components được test trong ít nhất một real composition.

## Anti-patterns

- Tailwind class soup nhưng không có system.
- 20 shades/tokens không có usage role.
- Mỗi page có Button/Card riêng.
- Design system chỉ là Figma inventory không map sang code behavior.
- Component API expose mọi CSS property khiến system mất guardrail.
