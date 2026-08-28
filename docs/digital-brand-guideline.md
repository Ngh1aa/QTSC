# QTSC Digital Brand & UI Guideline

## Brand basis
- Positioning: **QTSC — Quality Tech Solution Complex**.
- Brand character: quality, technology, connection, progress; efficient, dynamic, creative.
- The digital visual language is derived from the official 2022 Q/power symbol, radial dots, connection and continuous red-to-orange energy.
- QTSC officially describes the identity as red-orange with a transition from deep red to light orange.
- **#EE4623** is the selected digital primary for this prototype. Treat it as a digital design token, not an official Pantone/HEX master value unless QTSC confirms it.

## Color usage
- White / neutral surfaces dominate the interface.
- Red and orange are used for primary actions, key numbers, selected states, network energy and brand transitions.
- Main signature gradient: deep red → red → `#EE4623` → light orange.
- Use a darker red-orange gradient for small primary CTA backgrounds so white UI text retains stronger contrast.
- Use the full bright gradient for large numbers, decorative lines, selected states, glow and non-text visual accents.
- Soft gradient surfaces are allowed for hover, utility panels, card emphasis and section transitions.
- Do **not** turn every section into a saturated gradient background.
- Do not introduce blue/purple/green as secondary brand colors just because they appear in individual infographics.

### Gradient tokens
Defined in `assets/css/tokens.css`:
- `--brand-primary`
- `--brand-gradient`
- `--brand-gradient-cta`
- `--brand-gradient-soft`
- `--brand-gradient-surface`
- `--brand-radial`
- `--brand-glow`
- `--brand-glow-soft`

The site-wide visual layer lives in `assets/css/gradient-system.css`.

## Gradient hierarchy
1. **Hero / Brand moment** — image remains dominant; use radial red-orange energy and connected glowing nodes.
2. **Primary CTA** — use the darker accessible red-orange gradient plus restrained glow.
3. **Key proof / KPI** — gradient text is acceptable for large display numbers.
4. **Selected / active UI** — gradient pills, tabs, node pulses and thin gradient rules.
5. **Soft surface** — low-opacity orange/red tint only, with white remaining dominant.
6. **Dark sections** — use radial brand glow over charcoal rather than flat red backgrounds.

## Content archetypes — avoid visual repetition
Different information types must not collapse into the same row-list pattern.

1. **Credibility / Why QTSC** → proof bento cards with large hierarchy, evidence and editorial spacing.
2. **Administrative / One-stop support** → task launcher / service console with clear touch targets and action-oriented grouping.
3. **Technology Marketplace** → product discovery cards with a technology mark, provider, category chip and strong search/filter workspace.
4. **Member Directory** → company identity cards / logo grid with industry and building metadata.
5. **Live news / activity feed** → chronological rows are acceptable because time ordering is the primary information model.
6. **Quick utilities** → compact utility tiles are acceptable, but must not visually imitate marketplace or directory cards.

Do not reuse one component simply because all content items happen to have a title and arrow.

## Network language
Use radial rings, dots, connection lines and subtle pulses for:
- hero / brand moments;
- data visualisation;
- selected map points;
- loading / transition states;
- credibility or milestone moments.

Avoid repeating the network pattern as decoration in every section.

## Typography
- Manrope is the prototype web typeface until an official corporate/web font is supplied.
- Preserve the shared type scale in `typography.css`.
- Do not use gradient text for long paragraphs or small labels. Reserve it for large display headings/numbers where readability remains strong.

## Photography
Prioritise official QTSC imagery:
1. Campus / architecture
2. Technology / infrastructure / labs
3. People / businesses
4. Innovation / education
5. Community
6. Green & smart campus

Avoid generic AI/server/code stock imagery where a real QTSC image exists.

### Image consistency
- Apply restrained, consistent grading across campus / technology / office photography.
- Protect white captions on photography with a local bottom scrim; never depend on the source image being dark enough.
- Hero imagery should communicate recognisable QTSC campus/architecture rather than generic roads, server rooms or abstract technology.

## Mobile interaction rules
- Do not scale complex desktop spatial interfaces down until labels become unreadable.
- Ecosystem hub-spoke becomes a vertical selectable list + detail panel on narrow screens.
- Campus map uses a building/location list as the primary mobile control; map graphics can remain contextual rather than carrying tiny touch targets.
- Primary mobile controls should target roughly **44×44px or larger** when practical; WCAG 2.2 AA minimum target requirements must always be respected.
- Avoid compressed horizontal navigation with multiple small text targets immediately below the hero.
- Preserve content hierarchy before preserving desktop geometry.

## Content voice
- Direct, credible, concise and task-oriented.
- Prefer concrete proof points and clear actions.
- Do not expose design rationale, redesign commentary, mock/prototype language or internal implementation notes in public-facing copy.
- Claims that rely on rankings or statistics should retain source/date context.

## 2026 proof points
Official QTSC sources support:
- 43 ha campus;
- 25 years;
- 121 digital technology companies on the current homepage;
- 22,157 people working and studying;
- 650+ technology products/solutions/services;
- 90% occupancy;
- 120+ technology companies and 30+ countries served in the 25-year article;
- 5 innovation centres;
- 7 universities / technology training facilities;
- KPMG 2026: QTSC ranked 3rd among 8 notable Asian technology parks by operational effectiveness.

## Accessibility
Target WCAG 2.2 AA:
- visible focus;
- skip links;
- reduced-motion support;
- minimum contrast targets already documented in `ui-foundation.md`;
- semantic headings and labels;
- prefer `--brand-gradient-cta` over the bright display gradient behind small white text;
- WCAG 2.2 AA target sizing/spacing rules are the baseline, while primary mobile actions should usually be larger for practical touch comfort.

## Public vs internal
Public website:
- positioning, proof, vision/mission/values, resources and official policies.

Internal guideline only:
- color token governance;
- spacing/radius rules;
- photography direction;
- component and interaction rules;
- gradient hierarchy and usage rules;
- content archetypes and mobile transformation rules;
- do/don't examples.
