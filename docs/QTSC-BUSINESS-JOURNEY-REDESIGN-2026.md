# QTSC Business Journey Redesign — 2026

## Purpose

This document records the design and content contract applied to the 2026 QTSC interface update. It is intended to prevent future pages or agent-generated changes from drifting back into generic corporate landing-page patterns.

## Skills applied

The redesign follows the working principles from the project UI/UX skill library, especially:

- `website-audit-and-redesign`
- `audience-intent-and-top-tasks`
- `journey-driven-content-and-layout`
- `corporate-website`
- `government-and-public-sector-website`
- `brand-guidelines`
- `design-system-and-components`
- `ui-improvement`
- `ui-craft-and-visual-qa`
- `responsive-and-device-strategy`
- `accessibility`
- `trust-credibility-and-transparency`

## Business intent

QTSC is not presented as a generic corporate brochure and not as a futuristic SaaS product. The experience must connect the value of a physical technology campus with the business decisions visitors arrive to make.

### Priority visitor tasks

1. Find office / operating environment.
2. Evaluate investment / cooperation.
3. Find a technology solution.
4. Find an ecosystem company.
5. Explore the campus and supporting resources.

Home is therefore an orientation and routing surface. It must not try to compress every internal page into a long promotional homepage.

## Experience sequence

The homepage follows:

`Need → Evidence → Capability → Place → Decision support → Current signals → Connection`

Each section answers a different user question. Avoid separate audience, journey and decision sections that repeat the same three CTA choices in different visual containers.

## Audience-to-task model

| Audience / context | Primary question | Evidence needed | Next action |
| --- | --- | --- | --- |
| Business / operating team | Can we operate and grow here? | Space, infrastructure, amenities, ecosystem scale | Office enquiry |
| Investor / strategic partner | Is this project in scope and what applies? | Investment fields, dated policy source, ecosystem capability | Investment connection |
| Technology buyer / partner | Who can solve this problem? | Searchable solutions, company network, capability links | Marketplace / company connection |
| Current member / visitor | Where is the information or service I need? | Clear navigation, campus/service/resource routes | Direct destination |
| Talent / media / community | What is happening and how credible is QTSC? | Current news, resources, dated proof | Insights / resources / contact |

## Visual direction

**Architectural + Editorial + Technology**

- White and restrained warm neutral surfaces dominate.
- QTSC orange `#EE4623` is a signal for action, selection, proof and connection — not a page-filling decoration.
- Charcoal is reserved for high-confidence transitions such as proof, ecosystem continuation or final connection.
- Use real QTSC campus, architecture, infrastructure, people and ecosystem imagery where available.
- Use structural rails and grid alignment before shadows and floating cards.
- Controls may use modest radius; ordinary content modules should not become repeated rounded cards.
- Connected rings/nodes belong only at signature moments such as hero/final connection.
- Avoid purple/cyan/neon SaaS aesthetics, generic AI imagery and decorative glass effects on normal content.

## Typography and rhythm

- Manrope remains the prototype typeface.
- Large headings use medium weight and tight display tracking.
- Body copy should stay concise and readable; avoid long centered marketing paragraphs.
- Primary page sections should normally stay within 5–7 meaningful blocks.
- Desktop layouts use asymmetric editorial grids; mobile reflows to clear single-column task progression.

## Page archetypes

### Home

Orientation and task routing. Five top-task shortcuts must remain visible and comprehensible across desktop and mobile.

### Evaluation pages

Examples: Office, Investment, Services.

Sequence:

`Utility hero → Dated/qualified proof → Evaluation criteria → Process / conditions → Related ecosystem → Contextual CTA`

Do not insert unsupported SLAs, blanket incentives or commercial conditions.

### Directory / Marketplace

Search and filter are the primary working surface. Editorial storytelling is secondary.

The number of records rendered in a static experience must never be presented as the complete ecosystem count unless the data source is actually exhaustive.

### Content / Resource hubs

Chronology, source, type and relevance should be easier to scan than decorative card composition.

## Content trust rules

1. Quantitative proof must include a source/date context when practical.
2. Do not use internal words such as `prototype`, `demo`, `mock`, `redesign`, `UX`, or implementation rationale in public copy.
3. Investment incentives are conditional. Never present an incentive as automatically applicable to every project.
4. Do not invent response-time SLAs, leasing availability, prices or contractual terms.
5. If availability or eligibility changes over time, say that QTSC confirms the current condition directly.
6. Distinguish an ecosystem-wide statistic from the number of items currently shown in a directory or marketplace UI.

## Shared component contract

The global shared layer in `assets/css/components/template-experience.css` owns:

- inner hero composition;
- journey/trust metadata styling;
- proof rail;
- section hierarchy;
- evaluation selector/process rails;
- directory/marketplace surface behavior;
- ecosystem continuation strip;
- final CTA panel;
- responsive reflow for these patterns.

Page CSS should add domain-specific behavior only. Do not recreate the same shell locally.

## Responsive contract

- CTA and navigation targets: minimum 44px where practical.
- Five Home top tasks: desktop grid → tablet grouping → single-column mobile list.
- Proof rails: 5 → 3 → 2/1 depending viewport.
- Evaluation grids: multi-column desktop → single-column mobile.
- Directory search remains before results on mobile.
- No horizontal scrolling should be required for primary content or navigation tasks.

## Accessibility contract

Target WCAG 2.2 AA behavior without claiming certification.

- Maintain visible focus states.
- Preserve skip navigation.
- Do not hide critical content behind motion.
- Honor `prefers-reduced-motion`.
- Images carrying information require meaningful alt text.
- Color must not be the only indicator of active state.

## 2026 proof currently used

The redesign uses QTSC-published 2026 context including:

- 43 ha campus;
- 90% occupancy;
- 121 digital technology companies;
- 22,157 people working and studying;
- 650+ products, solutions and services;
- 2026 investment policy information with dated source context.

These figures must be reviewed when QTSC publishes a newer official update.

## QA before merge

- Review Home at 320, 375, 414, 768, 1024 and 1440 px.
- Review Office, Investment, Companies and Marketplace at mobile/tablet/desktop widths.
- Test keyboard access for header, mobile navigation, search, filters and contact drawer.
- Confirm no public copy contains internal implementation language.
- Confirm all contextual CTA destinations are valid after IA changes.
- Confirm any externally sourced proof still matches the linked QTSC source.
