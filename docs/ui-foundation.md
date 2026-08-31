# QTSC UI Foundation v1.1

This document is the visual source of truth for the static QTSC UI/UX prototype.

## 1. Typography

- One family only: **Manrope** (until an official QTSC web/corporate font is supplied).
- Display: 500 weight, tight tracking only at display scale.
- Body default: 16px.
- UI metadata/labels: minimum 12px.
- Do not add page-specific inline font-size overrides.

Core tokens:

```css
--type-display-xl
--type-display-lg
--type-h1
--type-h2
--type-h3
--type-h4
--type-body-lg
--type-body
--type-body-sm
--type-label
```

## 2. Brand colors

Use semantic tokens only. The current red/orange values are prototype approximations and must be replaced with official master RGB/HEX values when QTSC supplies them.

```css
--brand-deep
--brand-red
--brand-orange
--brand-light
--brand-gradient
```

Brand red/orange is an accent, not a page background default. White/neutral surfaces should dominate the interface.

## 3. Text / surface / border

```css
--text-primary
--text-secondary
--text-tertiary
--text-inverse

--surface-primary
--surface-soft
--surface-muted
--surface-dark

--border-subtle
--border-default
--border-strong
```

Do not introduce arbitrary gray hex values when a semantic token already exists.

## 4. Spacing

Use the 4px spacing scale in `assets/css/tokens.css`.

Section hierarchy:

- XL: signature/brand transitions
- L: primary Homepage sections
- M: inner-page / utility sections
- S: related/supporting content

Do not use one global spacing value for every section.

## 5. Radius / geometry

The approved prototype uses a **square architectural geometry** to align with the campus/building character and avoid generic rounded-card UI.

Current tokens:

- `--radius-sm: 0px`
- `--radius-md: 0px`
- `--radius-lg: 0px`
- `--radius-pill: 0px`
- `--radius-card: 0px`

Exceptions are allowed only when the geometry itself carries meaning:

- circular network nodes / map points;
- radial brand graphics;
- genuinely circular controls where the affordance requires it.

Do not reintroduce rounded cards, pills or soft SaaS geometry without an explicit design-system decision.

## 6. Elevation

Most UI has no shadow.

- Dropdown/header: `--shadow-dropdown`
- Dialog/overlay: `--shadow-dialog`

Do not add large card shadows for ordinary content.

## 7. Heading composition

Three supported composition families:

1. **Editorial** — label + large title + optional short copy.
2. **Utility** — compact title + task/search/filter close to the fold.
3. **Immersive** — image/dark visual + title + task CTA.

## 8. Inner Hero families

- Brand Story: About / Why QTSC / history.
- Utility: Companies / Marketplace / Insights / resources.
- Immersive: Office / Explore / technology experiences.

Do not reuse giant brand-story typography on utility screens.

## 9. Components

- Buttons use shared `.btn` variants.
- Directory uses editorial rows or verified identity cards, not generic floating SaaS cards.
- Icons use the shared SVG mask tokens.
- Search, filter chips and forms use semantic border/surface tokens.
- No Unicode icon should be introduced when an SVG system icon exists.
- KPI/proof rails may contain only dated/verifiable evidence; do not use UI instructions such as “Search”, “Connect” or “Direct” as pseudo-metrics.

## 10. Domain-native composition

When a page benefits from real-world/domain intelligence, prefer the lowest useful fidelity:

- campus / wayfinding / building directory for spatial orientation;
- infrastructure topology for technology/service relationships;
- verified company identity for ecosystem discovery;
- verified product/service sources for marketplace trust.

Use these as structural or informational metaphors (L1–L2) by default. Do not add blueprint textures, fake signage or decorative skeuomorphism merely to make pages look different.

## 11. Accessibility baseline

- Normal text contrast target: WCAG 2.2 AA 4.5:1.
- Large text contrast target: 3:1.
- All interactive elements need a visible `:focus-visible` state.
- Primary touch targets should remain comfortably larger than minimum requirements.
- `#EE4623` is a graphic/brand accent and should not be the default color for small normal-weight text on white; use a darker semantic brand token when contrast is required.

## 12. Consistency checklist

Before marking a page complete:

- [ ] Manrope only (unless official corporate font replaces it globally)
- [ ] No body/UI text below 12px
- [ ] Heading uses the shared type scale
- [ ] No inline presentation style
- [ ] No new brand color hard-coded in page CSS
- [ ] Spacing comes from the spacing scale where practical
- [ ] Square geometry remains consistent unless an exception has semantic meaning
- [ ] Card shadow is not added without a functional reason
- [ ] CTA/icon belongs to the shared component language
- [ ] Hero family matches the page purpose
- [ ] Proof rails contain real evidence, not interface mechanics
- [ ] Domain metaphor, when used, improves recognition/orientation/decision support
- [ ] Desktop/tablet/mobile hierarchy remains consistent
