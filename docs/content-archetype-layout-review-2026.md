# QTSC Content Archetype Layout Review — 2026-08-30

## Scope

Rà soát 28 public/static HTML pages của QTSC và tinh chỉnh composition theo loại nội dung. Tài liệu này là implementation record, không thay thế các source-of-truth hiện có và không phải bằng chứng user research, WCAG conformance hay brand-recognition improvement.

## Hard constraints used

- `.uiux-profile.json`
- `AGENTS.md`
- `docs/digital-brand-guideline.md`
- `docs/ui-foundation.md`
- `docs/source-architecture.md`
- `README.md`

Không thay đổi `tokens.css`, `typography.css`, `layout.css`. Layout mới chỉ tiêu thụ token/component hiện có và giữ static HTML/CSS/JS.

## Page inventory and archetype

| Page | Content archetype | Layout decision |
|---|---|---|
| `index.html` | Corporate landing / journey router | Giữ business-first 7-section composition đã có; không tạo thêm card wall. |
| `about.html` | Brand story / credibility | Giữ Brand Story hero, timeline/proof hierarchy hiện có. |
| `amenities.html` | Quick campus utilities | Chuyển visual treatment sang compact utility tiles, khác Marketplace/Directory. |
| `awards.html` | Recognition archive | Chuyển generic card wall thành archive rows ưu tiên scan theo mốc/nội dung. |
| `careers.html` | Job listing + light conversion | Giữ dated listing; tăng hierarchy của archive/list thay vì marketing cards. |
| `community.html` | Ecosystem/community hub | Giảm emphasis card, giữ grouping/community context. |
| `companies.html` | Member directory / search-filter | Company identity + metadata; giảm decorative radial/shadow để không giống product card. |
| `company-detail.html` | Company entity detail | Giữ detail composition; không biến thành directory/grid. |
| `contact.html` | Contact routing / official contact | Giữ routing first; làm contact facts thành structured panels không nổi như cards. |
| `digitech-center.html` | Technology capability/service landing | Giữ immersive/capability direction; đồng bộ capability rail. |
| `explore.html` | Campus navigation / immersive utility | Giữ map/tour-first composition và mobile list-first behavior hiện có. |
| `incentives.html` | Policy/reference navigator | Chuyển policy blocks sang reference rows; giảm decorative hero companion. |
| `innovation-centers.html` | Innovation/capability hub | Giữ connected capability grouping; loại cảm giác generic floating cards. |
| `insights.html` | News hub | Giữ featured + chronological/category hierarchy. |
| `investment.html` | Investor decision-support landing | Giữ decision-support sequence; dùng rail/grid có cấu trúc, không marketing card wall. |
| `legal.html` | Legal/reference utility | Giảm decoration, ưu tiên reading measure/source hierarchy. |
| `marketplace.html` | Technology solution discovery / search-filter | Product discovery card có technology mark/category, khác member identity card. |
| `media-center.html` | Press/media archive | Giữ type/date scan hierarchy và media filter. |
| `newsletter.html` | Periodical archive + subscription | Giữ archive rows và subscription CTA, không đồng trọng lượng mọi issue. |
| `office.html` | Real-estate/service evaluation | Giữ immersive property selector + criteria + visit CTA. |
| `open-data.html` | Data access / dataset registry | Chuyển dashboard-like card grid thành dataset registry rows có source/value context. |
| `privacy.html` | Privacy/reference utility | Giảm decoration, ưu tiên khả năng đọc và source/context. |
| `qtsc-chain.html` | Network/program information + eligibility | Giữ criteria/process rails; network resources theo structured grid, không Marketplace cards. |
| `resources.html` | Document library / search-filter | Ưu tiên file/type/date scanning, giảm card elevation. |
| `services.html` | One-stop service access / task launcher | Nhóm dịch vụ thành compact task launcher; quy trình giữ step/list pattern. |
| `sitemap.html` | Navigation utility | Compact navigation groups; hạn chế decoration. |
| `technology-detail.html` | Infrastructure/technology detail | Giữ immersive detail archetype và technical evidence. |
| `telecom.html` | Technology/infrastructure service detail | Capability rail, giảm floating-card treatment. |

## Skills actually read and used

### Shared implementation

- `project-context`
- `website-audit-and-redesign`
- `frontend-implementation`
- `brand-guidelines`
- `design-system-and-components`
- `accessibility`
- `responsive-and-device-strategy`
- `ui-craft-and-visual-qa`

### Archetype-specific

- `landing-page` — homepage / conversion-oriented page framing where relevant
- `visual-design-direction` — shared hierarchy/color-role decisions
- `journey-driven-content-and-layout` — Home, Office, Investment, service/detail routes
- `information-architecture` — Directory, Marketplace, Resources, Sitemap, Chain
- `site-search-and-findability` — Companies, Marketplace, Resources
- `real-estate-and-building-website` — Office/Explore context
- `news-and-media-website` — Insights, Media Center, Newsletter, archive hierarchy
- `interaction-patterns-and-form-ux` — Contact, search/filter controls
- `state-feedback-and-error-recovery` — contact/search/filter interaction review
- `data-visualization-and-dashboard-ux` — Open Data
- `government-and-public-sector-website` — One-stop services, policy/reference content

Không load toàn bộ `.claude/skills` và không dùng `data-tables-and-enterprise-ux` vì batch này không chuyển nội dung sang data table thực sự.

## Brand/layout rules applied

- White/neutral remains dominant; red-orange is reserved for selected/action/source/proof signals.
- `#EE4623` is consumed only through existing brand tokens; no new palette is introduced.
- Typography continues to use Manrope and existing type tokens.
- Section/card spacing uses existing spacing tokens.
- Radius uses existing radius tokens only in newly introduced rules.
- Content families are visually distinct by hierarchy and information shape, not by adding new brand colors.
- Existing working static JS behavior is preserved.

## Verification scope

PR QA is configured to render all 28 public pages. Ten priority/archetype pages run at 320/375/414/768/1024/1440; remaining pages run at 375/768/1440. Checks include overflow, missing content, runtime errors, local asset failures, duplicate IDs, placeholder links, local HTML/hash targets, and representative interactions.

## Known limitations

- Automated visual/device regression is not equivalent to moderated usability testing.
- Automated checks plus screenshot inspection are not a WCAG conformance audit.
- No analytics/user-testing evidence is available in this batch to claim task success, conversion lift, UX improvement or increased brand recognition.
- Remote QTSC imagery may change independently of this repository.
