---
name: ui-craft-and-visual-qa
description: |
  Review và polish UI ở mức craft: hierarchy, spacing, alignment, density, typography,
  imagery, states, responsive consistency và visual regression. Dùng trước khi gọi giao diện
  hoàn tất hoặc khi UI “đúng chức năng nhưng chưa chuyên nghiệp / trông như AI template”.
---

# UI Craft & Visual QA

## Goal

Biến UI từ “đã code” thành **coherent, intentional, production-grade**.

## Review order

Không bắt đầu bằng shadow/radius. Review từ macro đến micro:

1. Page purpose và visual hierarchy.
2. Section rhythm và density.
3. Grid/alignment.
4. Typography/readability.
5. Components/states.
6. Imagery/icon consistency.
7. Micro-details/motion.

## Anti-generic UI checks

Cảnh báo nếu xuất hiện hàng loạt pattern thiếu rationale:

- Mọi section đều là card bo tròn.
- Gradient/glass/shadow dùng khắp nơi.
- Mọi title đều centered.
- Icon nằm trong badge tròn chỉ để trang trí.
- Section lặp `heading + 3 cards` liên tục.
- Nhiều màu accent cạnh tranh.
- Hero quá nhiều label/badge/CTA.

Nếu brand yêu cầu minimal, editorial, institutional, luxury... phải để visual grammar phản ánh đúng personality, không dùng default SaaS template.

## Spacing audit

- Kiểm vertical rhythm giữa section, heading, paragraph, controls.
- Chỉ dùng spacing scale; exception phải có lý do.
- Parent dùng `gap`; tránh margin ngẫu nhiên giữa siblings.
- Cùng một relationship phải có cùng khoảng cách.

## Typography audit

- H1/H2/H3 khác nhau đủ rõ nhưng không nhảy scale vô lý.
- Body line-height và line length dễ đọc.
- Button/nav text không quá nhỏ.
- Font weight không dùng thay cho hierarchy duy nhất.
- Vietnamese diacritics và font fallback phải render tốt nếu site tiếng Việt.

## Alignment audit

- Text, image, card, CTA bám cùng grid line.
- Optical alignment được phép nhưng phải có chủ đích.
- Không để container widths thay đổi tùy page vô lý.

## State audit

Mọi interactive component kiểm: default, hover, focus-visible, active, disabled, loading, error và selected/expanded nếu có.

## Responsive visual QA

Tại mobile/tablet/desktop kiểm riêng:

- Reading order.
- Crop ảnh.
- Line wrapping ở title/button/nav.
- Touch target.
- Overflow.
- Sticky/fixed elements che content.
- Density và white space.

## Evidence

Trước done: capture các viewport đại diện và ghi issue severity P0/P1/P2.

## Acceptance criteria

- [ ] Không có spacing/alignment inconsistency rõ ràng.
- [ ] Không có component variant trùng chức năng.
- [ ] Visual hierarchy đọc được trong 5–10 giây.
- [ ] Mobile không bị “compressed desktop”.
- [ ] Focus/error/loading states nhìn thấy được.
- [ ] UI phản ánh brand thay vì generic template.
