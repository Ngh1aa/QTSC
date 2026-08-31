---
name: website-audit-and-redesign
description: |
  Audit website hiện có trước khi redesign hoặc rebuild. Dùng khi có live URL, legacy code,
  sitemap cũ hoặc yêu cầu “làm lại website”; bảo toàn content/SEO/flow tốt, xác định friction,
  technical debt và redesign scope trước khi thay đổi UI hay code.
---

# Website Audit & Redesign

## Mục tiêu

Redesign không đồng nghĩa xóa và làm lại. Phải biết **giữ gì, sửa gì, bỏ gì, thêm gì** dựa trên evidence.

## Prerequisites

- Có ít nhất một trong: live URL, source code, sitemap, analytics, screenshots, stakeholder brief.
- Nếu chưa có product brief, chạy song song với `product-discovery`.

## Workflow

### 1. Inventory

Lập bảng:

| Page/template | Purpose | Primary user | CTA | Traffic/value | Keep/Improve/Merge/Remove |
|---|---|---|---|---|---|

Thu thập navigation, URLs, forms, search/filter, media, downloads, structured data, redirects và third-party scripts.

### 2. UX audit

Với mỗi primary journey, kiểm tra:

- Entry point có nói đúng nhu cầu không?
- User có biết mình đang ở đâu và đi đâu tiếp không?
- Số bước/decision có thừa không?
- CTA có rõ commitment và outcome không?
- Có dead end, duplicated page hay competing CTA không?
- Mobile có khác biệt friction so với desktop không?

### 3. Visual/brand audit

Chấm consistency của type scale, spacing, color roles, image style, icon style, component variants, states, density, alignment và responsive behavior.

Không đánh giá “đẹp/xấu” chung chung. Mỗi finding phải chỉ ra **evidence → impact → recommendation**.

### 4. Technical/SEO risk audit

Trước khi đổi URL/template:

- Ghi lại URL hiện có và page intent.
- Xác định pages có organic value/backlinks/internal links.
- Lập redirect map nếu slug thay đổi.
- Kiểm tra metadata, canonical, robots, sitemap, schema, status code.
- Không xóa content có giá trị chỉ vì layout cũ.

### 5. Redesign decision matrix

| Finding | User impact | Business impact | Effort | Risk | Decision |
|---|---:|---:|---:|---:|---|

Ưu tiên: critical journey → mobile friction → accessibility → content hierarchy → visual polish.

### 6. Preserve list

Bắt buộc ghi rõ:

- Content/feature đang làm tốt.
- Brand asset phải giữ.
- SEO equity cần bảo toàn.
- User habit/navigation convention không nên phá vô cớ.

## Output

Tạo `docs/website-audit.md` gồm inventory, findings, preserve list, priority matrix, redirect risks và redesign scope.

## Acceptance criteria

- [ ] Audit đủ primary templates và journeys.
- [ ] Mỗi finding có evidence + impact + action.
- [ ] Có danh sách Keep/Improve/Merge/Remove.
- [ ] Có preserve list.
- [ ] Có SEO/URL migration risk nếu redesign.
- [ ] Redesign scope trace được về business/user goal.

## Anti-patterns

- Redesign chỉ vì “style cũ”.
- Copy competitor mà không hiểu user/context.
- Xóa URL/content trước khi lập migration plan.
- Chỉ audit homepage.
- Đánh đồng visual novelty với UX improvement.
