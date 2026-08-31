---
name: asset-media-and-art-direction
description: |
  Quản lý photography, illustration, icon, SVG, video và responsive media cho website.
  Dùng khi chọn/thay ảnh, xây visual asset system, tối ưu crop/format/loading hoặc cần bảo đảm
  media đúng brand, đúng ngữ cảnh, có quyền sử dụng và không phá performance/accessibility.
---

# Asset, Media & Art Direction

## Rule 1: Meaning before decoration

Ảnh phải có job: chứng minh, giải thích, tạo context, thể hiện sản phẩm/con người/không gian hoặc tạo brand mood. Không thêm stock image chỉ để lấp khoảng trống.

## Asset inventory

Tạo bảng:

| Asset | Purpose | Source/rights | Ratio | Desktop crop | Mobile crop | Alt/caption | Delivery |
|---|---|---|---|---|---|---|---|

## Photography direction

Định nghĩa nhất quán:

- Subject.
- Lighting/tone.
- Camera distance.
- Composition.
- Human presence.
- Background complexity.
- Color treatment.
- What to avoid.

Không mix corporate stock, cinematic 3D và casual phone photography nếu không có rationale.

## Responsive art direction

Hero/feature image cần safe zone và focal point. Mobile có thể cần crop/asset khác; đừng phụ thuộc hoàn toàn vào `object-fit: cover`.

## Icons

- Một icon family/style chính.
- Consistent stroke/fill/corner/optical size.
- Icon không thay label ở action khó hiểu.
- Decorative icon `aria-hidden`; meaningful icon có accessible name qua control/text.

## SVG

- Clean unnecessary metadata.
- Dùng currentColor khi phù hợp theme.
- Không inline SVG khổng lồ lặp lại nhiều lần.
- Logo giữ aspect ratio và clear space.

## Video

- Có poster.
- Không autoplay audio.
- Hero background video phải có fallback image và không cản readability.
- Caption/transcript khi content mang thông tin.
- Không để video nặng trở thành LCP mặc định nếu không cần.

## Delivery

Chọn format/size theo browser/framework project. Luôn khai báo dimensions hoặc reserve aspect ratio để tránh layout shift. Lazy-load media dưới fold khi phù hợp; critical/LCP asset xử lý riêng.

## Acceptance criteria

- [ ] Mỗi asset có purpose và source hợp lệ.
- [ ] Image style nhất quán với brand.
- [ ] Crop mobile/desktop được kiểm.
- [ ] Alt/caption đúng vai trò.
- [ ] Dimensions/aspect ratio reserve layout.
- [ ] Icon family không bị trộn tùy tiện.
- [ ] Video có fallback và không phá performance.
