# QTSC UI Foundation v1.0

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

## 5. Radius

Only:

- 6px — small controls
- 10px — standard UI/buttons/inputs
- 16px — large media/modules
- 999px — tags/filter chips only
- 50% — nodes/circular icon controls only

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
- Directory uses editorial rows, not floating SaaS cards.
- Icons use the shared SVG mask tokens.
- Search, filter chips and forms use semantic border/surface tokens.
- No Unicode icon should be introduced when an SVG system icon exists.

## 10. Accessibility baseline

- Normal text contrast target: WCAG 2.2 AA 4.5:1.
- Large text contrast target: 3:1.
- All interactive elements need a visible `:focus-visible` state.
- Primary touch targets should remain comfortably larger than minimum requirements.

## 11. Consistency checklist

Before marking a page complete:

- [ ] Manrope only (unless official corporate font replaces it globally)
- [ ] No body/UI text below 12px
- [ ] Heading uses the shared type scale
- [ ] No inline presentation style
- [ ] No new brand color hard-coded in page CSS
- [ ] Spacing comes from the spacing scale where practical
- [ ] Radius uses the 4-value system
- [ ] Card shadow is not added without a functional reason
- [ ] CTA/icon belongs to the shared component language
- [ ] Hero family matches the page purpose
- [ ] Desktop/tablet/mobile hierarchy remains consistent
