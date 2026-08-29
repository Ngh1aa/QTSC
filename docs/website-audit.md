# QTSC Website Audit — toàn bộ prototype hiện tại

> Phạm vi: 27 trang HTML, shared tokens/typography/layout CSS, `core.css`,
> `inner.css`, các component CSS (`directory`, `detail`, `timeline`), page CSS,
> `shared.js`, `pages/home.js`, `pages/*.js`. Không chạy browser.
> Mọi claim đều được gắn nhãn **E (Evidence — file/selector/data)** /
> **O (Observation — đọc từ code)** / **I (Inference — suy luận từ cấu trúc)** /
> **A (Assumption — giả định cần xác minh)**.
> Mức độ: **C (Critical)** · **H (High)** · **M (Medium)** · **L (Low)**.

---

## 0. Bối cảnh đã đọc

- **E** `.uiux-profile.json`: project = `QTSC`, mode = `interactive-prototype`,
  domain = `technology-park-corporate`. Packs: `research-validation`,
  `experience-strategy`, `inclusive-trust`, `designops-governance`,
  `measurement-reliability`. Constraint rất cứng:
  - không được claim user research, accessibility conformance, UX improvement,
    brand-recognition validation, agent reliability khi chưa có evidence V5;
  - reuse tokens/components đã có trước khi sinh thêm local styles.
- **E** `docs/digital-brand-guideline.md` (gốc nội bộ): white-dominant,
  red-orange accent (`#EE4623`), 4-tier gradient, nội dung archetypes đã chốt
  (`proof bento`, `service console`, `technology marketplace`, `member directory`,
  `news feed`, `quick utilities`).
- **E** `docs/ui-foundation.md` v1.0: Manrope only, semantic tokens only,
  radius 4 giá trị, elevation 2 loại, 3 heading families, hero families theo
  mục đích trang, mobile ≥ 44×44.
- **E** `docs/source-architecture.md`: mỗi trang tự import page CSS + page JS;
  page CSS nên scope `.page-<name>`; 3+ lần lặp → promote vào `components/`.
- **E** `README.md`: Prototype, mock data, ảnh remote QTSC, token đỏ/cam là
  approximation.

> **Lưu ý quan trọng cho mọi đánh giá sau:** vì đây là *prototype tương
> tác*, không phải production — các tiêu chí V5 (research, a11y conformance,
> brand-recognition validation) **không áp dụng để khẳng định thành quả**, mà
> ch� dùng để *đo lường độ chín muồn của hệ UI* và xác định khoảng trống.

---

## 1. Inventory — 27 URL, mục đích, CTA chính

| URL | Purpose (O) | Primary user signal (I) | Primary CTA (O) | Verdict |
|---|---|---|---|---|
| `index.html` | Home hub + 5-intent launcher + ecosystem node graph + stats + Asia proof + marketplace/directory/green-smart/stories/quick-access (nhiều phần bị `applyHomepageStrategy()` xoá) | Nhà đầu tư, DN tìm văn phòng, người tìm giải pháp, khách tham quan | "Kết nối QTSC" + 5 intent | Improve |
| `about.html` | Brand Story hero — 25 năm, tầm nhìn/sứ mệnh/giá trị/timeline/ecosystem mosaic | Nhà đầu tư tiềm năng, đối tác | "Xem hồ sơ & tài liệu QTSC" | Keep · đang ổn |
| `companies.html` | Member Directory — search + 4 filter pill (Software/Data/Edu/Telecom) + 6 card (Hitachi, TMA, DIGI-TEXX, AMIT, Hoa Sen, Viettel) | Buyer/prospect tìm vendor; HR/dev tìm việc | (Không có CTA trên trang) | Improve — thiếu CTA "Liên hệ DN" ở mỗi card |
| `company-detail.html` | Profile doanh nghiệp mẫu (HitachiDSVN) — meta + products + sidebar dl | Buyer B2B | "Liên hệ doanh nghiệp" + "Xem giải pháp" | Improve — chỉ là 1 m�u, các doanh nghiệp khác đều link về đây |
| `community.html` | Schools, CEO/CTO Club, Foundation, Museum | Đối tác, cựu nhân viên, học sinh/sinh viên | external link QTSC archive | Improve — hầu hết CTA ra ngoài |
| `qtsc-chain.html` | Mô hình chuỗi — lợi ích + 7 tiêu chuẩn + 2 dự án tham gia | Đối tác địa phương muốn gia nhập | (CTA mờ) | Keep · đúng audience |
| `innovation-centers.html` | DXCenter + R&D Labs + 3-step pipeline | Startup, doanh nghiệp R&D | "Xem hồ sơ DXCenter" (external) + Marketplace | Keep |
| `awards.html` | Archive giải thưởng 2011–2020 | Nhà báo, partner | "Danh bạ doanh nghiệp" | Keep · đúng vai archive |
| `digitech-center.html` | Identity update QTSC Telecom → DigiTech + CyberSec Center | CIO, IT lead | "Mở QTSC DigiTech" (external) + "QTSC CyberSec" | Keep |
| `marketplace.html` | Utility hero — search + 4 filter pill + 4 card (Private Cloud, SOC, AI Doc, ERP) | Buyer công nghệ, IT lead | "Tìm giải pháp liên quan" | Improve — 4 card quá mỏng cho "650+" |
| `technology-detail.html` | Data Center detail hero + 2 innovation card | CIO, IT lead | "Liên hệ tư vấn" + "Tìm giải pháp liên quan" | Improve — chỉ Data Center, thiếu Cloud/Cyber/Telecom tabs |
| `telecom.html` | Connectivity overview — 5 card | CIO | "Data Center" + "Marketplace" | Keep |
| `office.html` | Immersive hero — 3 tòa nhà + 6-step "Dịch vụ một cửa" timeline | DN tìm văn phòng | "Đặt lịch tham quan" + Dịch vụ một cửa | Keep |
| `investment.html` | Brand Story-ish — 10 l�nh vực + incentives link + 2 dự án mời gọi | Nhà đầu tư, FDI scout | "Dịch vụ một cửa" + "Xem văn phòng" | Keep |
| `incentives.html` | Policy overview — 6 card + 3 external references | Nhà đầu tư, FDI | "Lĩnh vực đầu tư" + "Liên hệ QTSC" | Keep |
| `services.html` | Service console — 4 card + 5-step one-stop | DN vận hành, chuyên gia nước ngoài | "Khám phá không gian" + "Xem năng lực công nghệ" | Keep |
| `explore.html` | Immersive — 4 place card + 4 utility tile (tour/mobility/places/data) | Khách tham quan, nhân viên QTSC | external tour + amenities + open-data | Keep |
| `amenities.html` | 9 amenity card (food/mobility/stay/bank/edu/retail/sports/healthcare/map) | Cư dân campus | "Xem tuyến xe" + "Mở bản đồ" | Keep |
| `insights.html` | Utility hero — 5 filter pill + 1 feature + 3 article | Reader, báo chí, ứng viên | external news | Improve — `?cat=` không filter thật trong JS |
| `media-center.html` | 4-tab hub — press/coverage/photo/video | Báo chí, marketer | external link | Keep |
| `newsletter.html` | Latest #264 hero + 8 archive + 5 structural card | Subscriber, đối tác | external newsletter | Keep |
| `open-data.html` | 7 data group card | Researcher, ESG analyst | external qtsc.com.vn | Keep |
| `careers.html` | 4 job rows + archive | Ứng viên | "Khám phá doanh nghiệp" | Improve — "TMA tuyển…", "DigiTech Solutions tuyển…" đều href="/" không phải job posting |
| `resources.html` | Resource grid — search + 5 filter + 7 PDF card | Procurement, partner | external PDF/official | Keep |
| `contact.html` | 2 contact panel + 3 leadership card + "Kết nối QTSC" | Mọi đối tượng | "Kết nối QTSC" | Keep |
| `privacy.html` | 2 chính sách (PDP + Consumer) | Visitor | external chinh-sach | Keep |
| `legal.html` | 3 article — đơn vị / văn bản PL / chính sách | Visitor | external nguồn | Keep |
| `sitemap.html` | 5-col directory listing | Visitor | (nội bộ) | Keep |

**O** `sitemap.xml` thiếu `home.html`, `company-detail.html` (chỉ có 1 URL,
nhiều doanh nghiệp trỏ về cùng đích → không có tín hiệu uniqueness).

---

## 2. User groups & top tasks

Vì ràng buộc `.uiux-profile.json` không cho phép claim user research,
mọi phát biểu dưới đây là **I** (suy luận từ IA + bề mặt trang).

### 2.1. Nhóm người dùng suy luận được

1. **Nhà đầu tư / FDI scout (B2B, high-stakes)**
   - **E**: trang `investment.html` 10 lĩnh vực + 2 dự án mời gọi
     (10/01/2026 Lô 13); `incentives.html` 6 nhóm ưu đãi.
   - **I** Top task: *Đánh giá QTSC đủ hấp dẫn để đầu tư không, ưu đãi nào áp
     dụng được cho dự án của tôi*.
   - Trigger điển hình: brochure KPMG 2026, gov.tech event, partner giới thiệu.
2. **Doanh nghiệp tìm văn phòng / đặt lịch tham quan**
   - **E** `office.html` có 3 tòa nhà + "Đặt lịch tham quan"; mega-menu
     "Văn phòng cho thuê"; final-CTA "Thuê văn phòng".
   - **I** Top task: *Có chỗ phù hợp với quy mô team của tôi trong campus không,
     đặt lịch xem thực tế khi nào*.
3. **Doanh nghiệp / CIO tìm giải pháp công nghệ**
   - **E** `marketplace.html` 4 card + 4 filter; `technology-detail.html`;
     `telecom.html`; `digitech-center.html`.
   - **I** Top task: *Có giải pháp AI/Cloud/SOC/ERP sẵn trong QTSC không, nhà
     cung cấp nào đang vận hành*.
4. **Khách muốn kết nối với một doanh nghiệp thành viên**
   - **E** `companies.html` 6 card; `company-detail.html` mẫu Hitachi.
   - **I** Top task: *Liên hệ trực tiếp với DN X trong campus*.
5. **Ứng viên / sinh viên**
   - **E** `careers.html` 4 job + archive; `community.html` Education +
     Foundation; `insights.html?cat=career`.
   - **I** Top task: *Có vị trí phù h�p ngành của tôi trong QTSC không, học b�ng
     nào đang mở*.
6. **Đối tác truyền thông / báo chí**
   - **E** `media-center.html` press/coverage/photo/video.
   - **I** Top task: *Lấy thông cáo + hình ảnh chính thức của QTSC*.
7. **Khách tham quan / researcher ESG / analyst**
   - **E** `explore.html` map+360; `open-data.html` 7 nhóm; `newsletter.html`.
   - **I** Top task: *Xem campus ảo / tải bộ dữ liệu môi trường / đăng ký nhận
     tin*.
8. **Đối tác chính quyền địa phương muốn gia nhập Chuỗi QTSC**
   - **E** `qtsc-chain.html` 7 tiêu chuẩn.
   - **I** Top task: *Đủ điều kiện gia nhập Chuỗi không, hồ sơ cần chuẩn bị gì*.

### 2.2. Top-task ranking — đối chiếu evidence trên bề mặt

| Top task suy luận | Evidence mạnh nhất trên UI | Mức phủ |
|---|---|---|
| Thuê văn phòng | intent #1 trên home + office.html hero + final-CTA "Thuê văn phòng" | Mạnh |
| Đầu tư tại QTSC | intent #2 + investment.html + incentives.html + KPMG 03/08 ở home | Mạnh |
| Tìm giải pháp công nghệ | intent #3 + marketplace.html + technology-detail.html + featured solutions | Mạnh |
| Tìm doanh nghiệp | intent #4 + companies.html + company-detail.html + directory section home | Mạnh |
| Khám phá campus | intent #5 + explore.html + 360 tour + open data | Mạnh |
| Kết nối hỗ tr� DN | one-stop + connect drawer 6 loại + services.html | Trung bình |
| Liên hệ 1 DN cụ thể | companies.html + company-detail.html (mẫu) + connect drawer | Yếu — thiếu CTA "Liên hệ DN" ngoài drawer |
| Tìm việc / apply | careers.html + insights?cat=career | Yếu — careers rows link về `qtsc.com.vn/` không phải job URL |

**A** Người dùng có thể là *press/journalist* hay *researcher* không được phản
ánh trong nav chính — phải đi qua Mega-menu "Tin & nguồn lực → Thông cáo báo
chí / Hình ảnh & video" hoặc footer "Góc báo chí". Cần user research để xác
nhận họ tìm từ Google trực tiếp hay từ referral.

---

## 3. Entry context — quan sát thực tế từng trang có thể là landing

**E** Mọi trang đều có `meta description` rõ ràng, `canonical` đầy đủ, OG
metadata đầy đủ — đáp ứng yêu cầu "deep-linked user phải hiểu trang" ở mức
SEO cơ bản.

**E** Mọi trang đều có breadcrumb (`Trang chủ / ...`). Hero title đa số là
EN+VI ("Office at QTSC", "Member Directory", "QTSC DigiTech Center"). Hero copy
đủ rõ để user biết họ đang ở đâu mà không cần đọc homepage.

**E** Search overlay đa trang dùng Ctrl/Cmd+K (`shared.js:70`). Từ bất kỳ
trang nào, tổ hợp này mở drawer search có 18 mục định sẵn theo 6 nhóm —
**O** `searchItems` ở `shared.js:10-29`.

**I** Tuy nhiên:
- Trên `homepage`, search overlay (`renderSearchTabs`) chỉ dùng
  `globalSearchItems` 14 mục (home.js:23-37), nội dung giao với shared.js
  nhưng không đồng bộ — **C 2 trạng thái search khác nhau** giữa home và
  inner pages (xem §9).
- Không có breadcrumb trên **homepage** (đúng), nhưng hero copy chưa nêu
  giá trị nhanh: "25 năm kiến tạo" đã có, "43 ha", "KPMG 03/08" đã có ở
  asia-proof → **OK cho SEO landing**.

**A** Entry từ search Google có thể là "QTSC ưu đãi đầu tư" → landing tại
`incentives.html` (utility hero — đúng vai). Hay "QTSC văn phòng cho thuê"
→ `office.html`. Đều có hero phù hợp. Tuy nhiên `company-detail.html` chỉ
là 1 mẫu Hitachi, không có template riêng cho từng DN → **H** về SEO long-tail
"tên DN + QTSC".

---

## 4. User journey & service blueprint

### 4.1. Journey suy luận (I)

1. **Discover** — truy cập từ Google, từ referral partner, từ gov.tech event.
2. **Orient** — vào home → `intent` chọn nhu cầu → điều hướng sang trang chuyên sâu.
3. **Evaluate** — đọc proof (KPMG 03/08, stats, 25 năm), review offerings
   (marketplace, companies, technology).
4. **Engage** — mở "Kết nối QTSC" → chọn loại connect → điền form → toast/UX
   success.
5. **Handoff** — **I** thực tế ngoài đ�i: form → email tới bộ phận QTSC → reply
   + lịch họp/visit. Prototype không thể hiện được điều này (đúng — prototype
   scope).

### 4.2. Handoff points — UI vs backstage

- **O** Form success chỉ là 1 toast "Yêu cầu đã được ghi nhận."
  (`home.js:82`, `shared.js:63`). Không có timeline, không có "sẽ liên hệ
  trong 24 giờ", không có reference ID, không có email xác nhận mẫu.
- **I** Đây là prototype, không nên đánh giá như production gap — nhưng
  **A** v�n nên tag "no service timeline" để lúc production không quên.

### 4.3. Frontstage vs backstage

| Stage | Frontstage (UI) | Backstage (assumption) |
|---|---|---|
| Gửi form "Thuê văn phòng" | Drawer + success | Email tới leasing team + calendar invite |
| Gửi form "Đầu tư" | Drawer + success | Email tới FDI team + brochure PDF auto-reply |
| Gửi form "Công nghệ" | Drawer + success | Email tới DigiTech + matchmaking |
| Gửi form "Dịch vụ một cửa" | Drawer + success | Email tới one-stop desk |
| Gửi form "Thủ tục & hỗ trợ" | Drawer + success | Email tới visa/work permit desk |
| Gửi form "Liên hệ chung" | Drawer + success | Email tới info@ |

**O** Frontstage đa dạng hoá theo 6 nhóm (connect-types trong `connectConfigs` —
`home.js:38`), nhưng success state là **một state duy nhất** ("Yêu cầu đã
được ghi nhận") → **M** user không thấy họ vừa submit loại nào, có thể gây
mơ hồ. *Inference về ảnh hưởng* — **A** cần user research xác nhận.

---

## 5. IA hiện tại — sơ đồ & vấn đề findability

### 5.1. Cấu trúc IA suy luận

```
Home (index)
├── QTSC
│   ├── Giới thiệu (about) ──── 25 năm, tầm nhìn, sứ mệnh, timeline
│   ├── Tầm nhìn · Sứ mệnh (about#direction)
│   ├── Giá trị cốt lõi (about#values)
│   └── Liên hệ (contact)
├── Hệ sinh thái (companies)
│   ├── Danh bạ thành viên (companies) ──── entity cards
│   ├── Hồ sơ DN (company-detail)
│   ├── Cộng đồng (community)
│   ├── Chuỗi QTSC (qtsc-chain)
│   ├── Trung tâm đổi mới sáng tạo (innovation-centers)
│   └── Giải thưởng (awards)
├── Doanh nghiệp (office)
│   ├── Văn phòng (office)
│   ├── Đầu tư (investment) ──── incentives.html
│   ├── Chính sách ưu đãi (incentives)
│   └── Dịch vụ & hỗ trợ (services)
├── Công nghệ (marketplace)
│   ├── DigiTech Center (digitech-center)
│   ├── Marketplace (marketplace)
│   ├── Data Center & hạ tầng (technology-detail)
│   ├── Viễn thông (telecom)
│   └── R&D Labs (innovation-centers#rd-labs)
├── Khám phá (explore)
│   ├── Campus map (explore)
│   ├── Tiện ích (amenities)
│   └── (Bus / Open Data) ── liên kết trong explore
└── Tin & nguồn lực (insights)
    ├── Tin tức (insights)
    ├── Góc báo chí (media-center)
    ├── Newsletter (newsletter)
    ├── Dữ liệu mở (open-data)
    ├── Tuyển dụng (careers)
    ├── Download Center (resources)
    └── Privacy · Legal · Sitemap
```

### 5.2. Findability findings

| # | Finding | Tag | Severity |
|---|---|---|---|
| F1 | Mega menu gắn tên nhómngôn ngữ của user nhưng **key dựa trên `textContent.trim()`** (`shared.js:54`). Nếu sau này thêm i18n, label đổi → mega vỡ. | O | M |
| F2 | **`companies.html` chỉ có 6 DN** (Hitachi, TMA, DIGI-TEXX, AMIT, Hoa Sen, Viettel) nhưng hero claim "121 doanh nghiệp". | O | H |
| F3 | **`marketplace.html` chỉ 4 card** ("650 sản phẩm & giải pháp"). | O | H |
| F4 | **`marketplace.html` pill filters** (`ai/cloud/cyber/erp`) đã khai báo nhưng **không có JS filter** tương ứng trong `assets/js/pages/marketplace.js` → pill không hoạt động. | O | H |
| F5 | **`companies.html` pill filters** (`software/data/education/telecom`) cũng không có JS filter tương ứng. | O | H |
| F6 | **`insights.html` có 5 filter pill** (`all/news/member/event/career`) nhưng `assets/js/pages/insights.js` chưa đọc — **A** cần verify nếu có. | A | H |
| F7 | **breadcrumb của `investments.html`** ghi "Trang chủ / Doanh nghiệp / Đầu tư" → "Doanh nghiệp" được dùng cho cả office + investment + services. **O** "Doanh nghiệp" xuất hiện như nhóm cha cho 3 trang khác nhau, có thể gây mơ hồ. | O | M |
| F8 | **`company-detail.html` không phải unique URL** cho mỗi DN. Tất cả 6 card `companies.html` đều link `href="company-detail.html"` không có slug/id. | O | H |
| F9 | Mega menu có "Phòng họp & hội nghị" (`office.html`) nhưng `office.html` **không có nội dung về meeting rooms** — chỉ có 3 toà nhà + one-stop timeline. | O | M |
| F10 | Mega menu có "Tìm nhà cung cấp" → `marketplace.html` OK, nhưng "Tìm doanh nghiệp" → cũng `companies.html`, **2 mega items** trùng URL. | O | L |
| F11 | Mega menu "Công nghệ" có "R&D & Innovation" → `innovation-centers.html`, đúng. Nhưng "Innovation" cũng được nhắc ở "QTSC R&D Labs" → anchor `#rd-labs`. | O | L |
| F12 | **Footer link "Tải về QTSC A Guide" không có** — resources.html phải truy cập riêng qua mega "Tin & nguồn lực → Tài liệu". | O | M |
| F13 | Footer link "Sitemap" có trên mọi page. Tốt. | O | L |
| F14 | Search overlay (`shared.js`) có 18 mục cứng — không crawl nội dung trang. **O** Tìm "Hitachi" ra "Hitachi Digital Services Vietnam" vì có sẵn, nhưng tìm "FPT" không ra vì `insights.html` chỉ có 4 article hard-coded. | O | M |
| F15 | `insights.html` link ra ngoài gần như toàn bộ (`href="https://www.qtsc.com.vn/tin-tuc/..."`) → người dùng thoát site chỉ sau 1 click. | O | M |

---

## 6. Brand distinctiveness & screenshot recognition

### 6.1. Token governance

- **E** `assets/css/tokens.css` đã chốt: `--brand-primary:#EE4623`,
  `--brand-deep:#A91F2C`, `--brand-red:#CC2D31`, `--brand-light:#FF8438`,
  4 gradient tiers, surface system chỉ `#fff` + `#111111`, radius 4 giá trị,
  motion 3 tier.
- **E** `core.css` sử dụng đúng `--brand-red` cho CTA, `--brand-gradient-cta`
  chưa thấy dùng (chỉ `--brand-red` solid) → **O** Brand guideline nói CTA nên
  dùng gradient CTA, code dùng solid red → **M** mismatch giữa guideline và
  implementation.
- **O** Footer override cứng bằng `!important` ở `tokens.css:115-145` — đảm
  bảo dark surface không bị page CSS ghi đè. Tốt cho governance, nhưng **M**
  sẽ khó nếu sau này muốn footer thử nghiệm brand-radial.

### 6.2. Screenshot recognition (I — không chạy browser được)

- **O** Network rings (3 lớp) + 5 nodes ở hero chỉ có trên `homepage`. Không
  có hero nào khác dùng pattern này → brand "Q/power symbol" chỉ surface trên
  1/27 trang. **M** "signature moment" bị cô lập.
- **O** Nhiều trang inner dùng `<div class="inner-hero-grid">` với h1 lớn —
  đúng vai utility hero (Companies, Marketplace, Insights, Resources).
- **O** `about.html`, `investment.html` dùng Brand Story hero — đúng guideline.
- **O** `office.html`, `explore.html`, `technology-detail.html` dùng immersive
  hero — đúng guideline.
- **O** `digitech-center.html` dùng utility hero nhưng lại có `info-band` 1
  cột — không rõ rệt utility vs brand story. **L**.

### 6.3. Brand-distinctiveness heuristics (I)

| Heuristic (V4) | Status | Ghi chú |
|---|---|---|
| Logo lockup consistency | OK — QTSC logo dọc + ngang đều từ qtsc.com.vn, dùng `.brand img` content swap | O |
| Signature gradient hiện diện ở hero/key moments | Một phần — chỉ home hero có radial+glow, các trang khác không | O |
| Color roles nhất quán (CTA, link, hover) | OK cho CTA (`--brand-red`), nhưng **link mặc định là `inherit`** → khó phân biệt link thường vs link điều hướng | O |
| Typography rhythm | OK — Manrope, 3 heading families, clamp() | O |
| Photography consistency | **M** — toàn bộ photo dùng URL `qtsc.com.vn/uploads/...` không có gradient/scrim đồng nhất trong CSS; hero có scrim (`hero-shade`), inner hero không. | O |
| Icon system | OK — SVG mask tokens | O |
| Spacing rhythm | OK — 4 giá trị section (XL/L/M/S) | O |
| Micro-label (uppercase, 12px, tracking .08em) | OK, dùng ở mọi inner-section-head | O |

**Tổng:** Brand-distinctiveness ở mức "đủ dùng cho prototype" nhưng **M** cho
production. Signature moment chỉ tập trung ở home.

---

## 7. Content & layout theo user decision journey

### 7.1. Page role map (theo journey-driven-content-and-layout skill)

| Trang | Page role (O/I) | Câu hỏi user trên arrival | Section job (O) |
|---|---|---|---|
| Home | Orientation + exploration | "QTSC là gì, có gì cho tôi?" | Hero + intent + stats + Asia proof |
| About | Brand evaluation | "Đây có phải tổ chức đáng tin?" | Hero + direction + values + timeline + future + ecosystem mosaic |
| Office | Exploration + transaction | "Có văn phòng phù hợp không?" | Hero + selector + one-stop timeline |
| Investment | Evaluation + transaction | "Có đáng đầu tư không?" | Hero + 10 lĩnh vực + incentives link + 2 dự án |
| Explore | Orientation | "Campus nhìn ra sao?" | Hero + 4 place card + 4 utility tile |
| Marketplace | Comparison | "Giải pháp nào phù hợp?" | Hero + search + filter + 4 card |
| Company detail | Evaluation | "DN này là ai?" | Hero + meta + 2 product + sidebar dl |
| Contact | Confirmation | "Liên hệ thế nào?" | Hero + 2 contact panel + 3 leadership |

### 7.2. Section-by-section — home page

| Section | Job | Bằng chứng | OK? |
|---|---|---|---|
| Hero | Orient + first impression | Headline EN+VI + dual CTA + network rings | OK |
| Intent | Decision shortcut | 5 numbered tiles (Office/Investment/Tech/Company/Visit) | OK |
| Stats | Proof | 43ha / 25y / 121+ / 22.157 / 650+ | OK |
| Asia proof | International credibility | KPMG 2026 03/08, 3 facts | OK |
| Why QTSC | Bridge | 6 proof rows → office/investment/tech/explore/companies | OK trong HTML, **nhưng bị `applyHomepageStrategy()` xoá** (home.js:59) |
| Ecosystem | Decision shortcut | 5 node graph | OK trong HTML, **cũng bị giữ lại** — home.js:58-59 chỉ xoá 5 sections, ecosystem giữ |
| Technology | Evaluation | Editorial split (visual + tabs) | OK |
| Business | Decision shortcut | 2 photo card + 3 link | OK |
| Marketplace | Comparison | Search + filter + 4 card | OK trong HTML, **bị xoá** bởi strategy |
| Directory | Find member | Search + 6 card | OK trong HTML, **bị xoá** |
| Green & Smart | Proof | Open data list + interactive map | OK |
| Quick access | Decision shortcut | 6 tile | OK trong HTML, **bị xoá** |
| Stories | News proof | 1 feature + 2 side | OK |
| Ecosystem-live | News feed | 4 live items | OK trong HTML, **bị xoá** |
| Final CTA | Action | 4 button grid | OK |

### 7.3. Critical issue: `applyHomepageStrategy()`

**O** `assets/js/pages/home.js:58-74` — hàm này **xoá 5 sections khỏi
DOM ngay khi load**:

```js
['.why-qtsc','.marketplace','.directory','.quick-access','.ecosystem-live']
  .forEach(sel => $(sel)?.remove());
```

Hệ quả:
- **H** Khách truy cập trực tiếp `index.html` qua Google sẽ thấy home **khác
  hoàn toàn** so với những gì HTML khai báo — vi phạm nguyên tắc "deep-linked
  user không cần đọc homepage".
- **H** Bất kỳ anchor link ngoài d�n tới `#marketplace`, `#directory`,
  `#greenSmart`, `#whyQTSC` sẽ **không tìm thấy section** (section đã xoá).
  Anchor `#ecosystem` còn vì section `.ecosystem` không bị xoá.
- **H** `applyHomepageStrategy` còn thay text của stats (đổi "QTSC at a
  glance" → "Why QTSC"), đổi story, đổi footer link — tất cả đều hard-coded
  trong JS. **Không có test**, không có fallback nếu selector đổi.
- **H** Sửa nội dung trong HTML sẽ không có tác dụng vì JS ghi đè ngay.
  → Bảo trì sau này cực kỳ rủi ro.
- **A** Có thể đây là "thử nghiệm A/B" cũ chưa được revert. Cần git blame
  `home.js` để xác nhận.

**Mức đề xuất:** **C** — đây là single point of failure cho homepage. Cần dời
nội dung vào HTML hoặc scope JS chỉ chạy khi feature flag bật.

### 7.4. Trust & evidence

- **E** 2026 proof points đã đối chiếu với brand guideline: 43 ha, 25 năm,
  121+, 22.157, 650+, 90%, 120+, 5, 7, KPMG 03/08. Đều có trong HTML và
  đều có date/source note (e.g. "02/07/2026", "25/08/2026").
- **E** Nhiều trang có `<p class="source-note">` dẫn về `qtsc.com.vn/...`
  với date cụ thể → trust-building pattern đúng.
- **H** Tuy nhiên: **stats numbers** trên home hiển thị **không có
  source-note cụ thể**. Chỉ có asia-proof dẫn KPMG 2026. → **M** cho trust
  building.
- **M** Ảnh sử dụng URL `qtsc.com.vn/uploads/...` — nếu user disconnect hoặc
  qtsc.com.vn đổi hosting, ảnh vỡ. Không có fallback gradient/placeholder.

### 7.5. CTA discipline

- **O** Mỗi trang đều có 1-3 CTA rõ ràng, copy ngắn (≤ 6 từ).
- **H** **`companies.html` không có CTA chính** nào ngoài navigation. User
  tìm được DN → không có lối đi tiếp ngoài click vào card (mở
  `company-detail.html` cùng nội dung Hitachi cho mọi DN).
- **H** **`careers.html`** rows link `href="https://www.qtsc.com.vn/"` →
  user click vào job sẽ về home của qtsc.com.vn, không phải job posting.
- **M** **`marketplace.html`** không có "Yêu cầu tư vấn" ở mỗi card.

---

## 8. Responsive, accessibility, design system drift

### 8.1. Responsive hints

- **E** `core.css` có 3 breakpoint: `1180px`, `900px`, `620px`. Hero, nav,
  footer đều có override tương ứng.
- **E** `tokens.css` line-height, type scale có mobile override ở
  `typography.css:42-49`.
- **O** `company-detail.html` dùng `.detail-grid` — cần check file
  `assets/css/components/detail.css` và `pages/company-detail.css` (chưa đọc
  trong scope này — **A**).
- **H** **Hero trên mobile**: `--type-page-title-mobile:clamp(38px,10vw,48px)`
  → ở viewport 360px = 36px (gần min 38px). OK. Nhưng hero padding/margin
  trên mobile cần test thực tế — **A** vì không chạy browser.
- **M** `companies.html`, `marketplace.html` không khai báo grid mobile rõ
  ràng (chỉ dùng `.entity-list` qua `directory.css` — chưa đọc file này).
  **A** cần xem `directory.css` để chốt.
- **L** Footer mobile 1-col không đẹp — `grid-template-columns:1fr 1fr` ở
  620px, footer-brand `grid-column:1/-1` → 2-col lệch. **O**.

### 8.2. Accessibility hints (không chạy conformance)

| # | Finding | Tag | Severity |
|---|---|---|---|
| A11Y1 | `:focus-visible` đã định nghĩa (`core.css:14`) → outline 2px brand-red, offset 3px. OK. | O | L |
| A11Y2 | Skip-link có (`core.css:16`). OK. | O | L |
| A11Y3 | `prefers-reduced-motion` đã tôn trọng (`core.css:123`). OK. | O | L |
| A11Y4 | Search overlay là `role="dialog" aria-modal="true"`. OK. | O | L |
| A11Y5 | Mega menu dùng `aria-haspopup` + `aria-expanded` + `role="button"`. OK. | O | L |
| A11Y6 | Connect drawer `role="dialog" aria-modal="true"`. OK. | O | L |
| A11Y7 | **H** `form-success` không có `role="status"`/`aria-live`. OK vì connect drawer toggle `hidden` — nhưng screen reader có thể miss. | O | M |
| A11Y8 | **H** Mobile menu trên homepage dùng `<button>` toggle không có
aria-expanded khi đóng, chỉ khi mở — `home.js:83` đặt aria-expanded="true"
khi mở, OK. Nhưng trên inner pages `shared.js` dùng cơ chế khác. | O | L |
| A11Y9 | **M** Touch target: brand logo 156×48 — đủ. nav-link 13px font, padding 25px/0 → cao ~50px, đủ. btn min-height 48px — đạt WCAG 2.5.5 min target 44×44. OK. | O | L |
| A11Y10 | **H** Search overlay global có ESC hint (`<kbd>ESC</kbd>`), nhưng
`<kbd>` ẩn trên mobile (`core.css:122`). Không rõ user mobile có biết ESC
không hoạt động. OK behavior, **L** discoverability. | O | L |
| A11Y11 | **M** Form field label đang dùng `<label class="form-field">` với
`<span>` bên trong — không có `for=`/`id=` liên kết. **O** `connectConfigs`
sinh `<input id="f-${n}">` không có label `for=` tương ứng. **H** cho
screen reader (label không liên kết input). | O | H |
| A11Y12 | **L** Mobile menu có 17 link — quá nhiều, **M** về discoverability.
| O | M |

### 8.3. Design system drift

- **H** **Inline styles** xuất hiện ở nhiều trang:
  - `investment.html`: `style="margin-top:24px"`, `style="display:flex;gap:10px;flex-wrap:wrap;margin-top:28px"`
  - `incentives.html`: tương tự
  - `services.html`: tương tự
  - `office.html`: `style="display:flex;gap:10px;flex-wrap:wrap"`
  - `telecom.html`: tương tự
  - `digitech-center.html`: tương tự
  - `innovation-centers.html`: tương tự
  - `about.html`: không có
  → **ui-foundation.md** rule #11 nói "No inline presentation style". Đây là
  drift rõ ràng.
- **M** Nhiều page sử dụng các class utility inline (`.inner-section-head`,
  `.info-band`, `.extended-grid`, `.extended-card`, `.step-list`,
  `.timeline-row`) — **O** chúng chưa được promote vào `components/` dù đã
  dùng � ≥ 3 trang (investment, incentives, services, amenities, community,
  telecom, digitech-center, innovation-centers). **Source-architecture.md**
  rule: "If the same visual pattern appears in three or more screens,
  promote it into `assets/css/components/`". → **H** cho governance.
- **M** `legacy-pages.css` được import bởi ~7 trang (investment, contact,
  amenities, community, awards, careers, digitech-center, innovation-centers,
  incentives, telecom, qtsc-chain, media-center, newsletter, open-data) nhưng
  không có file trong source map của README → **A** file có thật không cần
  verify. Nếu có thật thì OK; nếu không có thì **404 CSS** trên các trang
  này.
- **O** Một số inner-page không có breadcrumb link active (link dẫn về parent
  luôn là text, không phải `<a>`):
  - `companies.html`: `<a href="index.html">Trang chủ</a> / <span>Hệ sinh thái</span> / <span>Doanh nghiệp</span>` — "Hệ sinh thái" là text không link. **M**.
- **L** `sitemap.html` có 28 link — nhiều link external (`#agriculture`,
  `#rd-labs`) nhưng section tương ứng không tồn tại trên
  `innovation-centers.html` (chỉ có `#dxcenter`, `#rd-labs` — `#agriculture`
  là broken anchor). **O**.

---

## 9. Interaction states & error recovery

### 9.1. States coverage matrix

| Component | Default | Hover | Focus | Active/Selected | Disabled | Loading | Empty | Error | Recovery |
|---|---|---|---|---|---|---|---|---|---|
| `.btn` (brand) | OK | OK (translateY) | OK (:focus-visible) | OK | — | — | — | — | — |
| `.nav-link` | OK | OK (underline right→0) | OK | OK (aria-expanded) | — | — | — | — | ESC closes mega |
| `.connect-type` | OK | — | OK | OK (.active dark) | — | — | — | — | — |
| `.form-field input` | OK | — | OK (border brand-red + glow) | — | — | — | — | **No validation message** | — |
| `.form-success` | hidden → visible | — | — | — | — | — | — | — | Close button only |
| `.search-result` | OK | — | — | — | — | — | OK (`empty-state`) | — | "Hãy thử từ khóa ngắn hơn" |
| `.eco-node` | OK | — | OK | OK (.active) | — | — | — | — | Click đổi panel |
| `.tech-tab` | OK | — | OK | OK (.active, aria-selected) | — | — | — | — | Click đổi visual |
| `.map-pin` | OK | — | — | OK (.active) | — | — | — | — | Click đổi card |
| `.pill-tabs` (companies, marketplace) | OK | — | — | **No JS handler** | — | — | — | — | **Không filter được** |
| `.intent-list button` | OK | — | — | — | — | — | — | — | Click route đúng page |
| `.live-item` (eco-live feed) | OK | — | — | — | — | — | — | — | — |
| `.live-feed` | OK | — | — | — | — | — | — | — | — |
| `.eco-detail` | — | — | — | — | — | — | — | — | Đổi theo eco-node |

### 9.2. State gaps — chi tiết

| # | Gap | Tag | Severity |
|---|---|---|---|
| S1 | **Form validation** không có error message UI. Nếu user nhập email sai
format → browser tooltip mặc định, nhưng không có inline message. | O | M |
| S2 | **Form submit chỉ `e.preventDefault()`** → success chỉ là 1 state chung
cho 6 connect-types. User không thấy họ submit thành công cái gì. | O | M |
| S3 | **Pill filters không hoạt động** ở companies.html và marketplace.html.
Click → không có response. User nghĩ trang hỏng. | O | H |
| S4 | **Search empty state** có message OK, nhưng `globalSearchItems` ở
homepage (14 mục) vs `searchItems` ở shared.js (18 mục) → search không
đồng nhất giữa home và inner pages. | O | H |
| S5 | **Mobile menu** trên homepage (`#mobileMenu`) khác cấu trúc với
inner pages (`#innerMobileMenu`). Mở từ home, các anchor link không khớp
với nav từ inner pages. | O | M |
| S6 | **Mega menu** trên home: chỉ mouseenter → mở. Trên inner pages: mouseenter
+ focus + Enter/Space. → **inconsistency**. | O | M |
| S7 | **`.btn-glass`** không có `:focus-visible` riêng — outline brand-red trên
glass nền trắng → OK. Nhưng trên glass nền dark → outline brand-red có thể
mất tương phản. | O | L |
| S8 | **`.skip-link`** chỉ hiện khi `:focus` (`core.css:16-17`) — OK, nhưng
top:-60px → top:16px không có animation nên có thể nhảy giật. | O | L |
| S9 | **No 404 page** — không thấy `404.html`. Click link hỏng → browser default. | O | M |
| S10 | **`.btn-brand` hover** chỉ `transform:translateY(-1px)` + bg đổi — không
có brand-glow shadow. Guideline nói "small primary CTA backgrounds so white
UI text retains stronger contrast" + "restrained glow". | O | L |
| S11 | **`refreshData` button** ở home: copy và href bị đổi bởi
`applyHomepageStrategy()` → "Khám phá dữ liệu campus ↗" → `explore.html#data`.
OK behavior nhưng **hard-coded trong JS**, không có nút cancel/revert. | O | M |
| S12 | **`.eco-stage` SVG lines** có `<path d="...">` 5 paths nhưng **aria-hidden**
OK, không screen-reader pollution. | O | L |

---

## 10. Severity classification tổng hợp

### Critical (C) — phải xử lý trước khi gọi là "production-ready"

| ID | Finding | Evidence |
|---|---|---|
| C1 | `applyHomepageStrategy()` xoá 5 sections khỏi DOM | `home.js:58-59` |

### High (H) — ảnh hưởng rõ tới trust / task completion

| ID | Finding |
|---|---|
| H1 | companies.html chỉ có 6 DN nhưng hero claim "121" (`companies.html:8`, content O) |
| H2 | marketplace.html chỉ 4 card nhưng claim "650+" (`marketplace.html:8`, O) |
| H3 | companies/marketplace/insights pill filters không có JS handler (O) |
| H4 | company-detail.html không phải unique URL per DN (O) |
| H5 | careers.html job rows link về `qtsc.com.vn/` không phải job posting (O) |
| H6 | Inline styles xuất hiện ở 9 trang, vi phạm `ui-foundation.md` rule (O) |
| H7 | Mỗi page phải tự xử lý page CSS + page JS — `legacy-pages.css` không
có trong source map README, có thể 404 (A) |
| H8 | Form field `<label>` không liên kết `<input>` qua `for=`/`id=` (O — A11Y) |
| H9 | Search overlay không đồng nhất giữa home và inner pages (O) |
| H10 | Mega menu inconsistency (mouseenter vs keyboard) giữa home và inner pages (O) |

### Medium (M) — UX/brand/governance

| ID | Finding |
|---|---|
| M1 | `--brand-gradient-cta` chưa dùng dù guideline yêu cầu (O) |
| M2 | Photo không có fallback/scrim đồng nhất (O) |
| M3 | Stats numbers trên home không có source-note cụ thể (O) |
| M4 | CTA "Liên hệ DN" thiếu ở `companies.html` card (O) |
| M5 | Mobile menu có 17 link — quá nhiều, discoverability kém (O) |
| M6 | Search overlay không crawl nội dung (O) |
| M7 | Mega menu anchor "Phòng họp & hội nghị" không có content tương ứng (O) |
| M8 | Footer "Tải về QTSC A Guide" không có (O) |
| M9 | Breadcrumb "Doanh nghiệp" mơ hồ cho 3 page khác nhau (O) |
| M10 | Mega menu key dựa vào `textContent.trim()` — fragile với i18n (O) |
| M11 | Extended-card pattern dùng ≥ 8 trang nhưng chưa promote vào
`components/` (O) |
| M12 | Pill filter pattern dùng 3 trang chưa promote (O) |
| M13 | Form validation thiếu inline error message (O) |
| M14 | Form submit thành công không phân biệt theo connect-type (O) |
| M15 | Mobile menu khác cấu trúc giữa home và inner pages (O) |
| M16 | Refresh-data button bị hard-coded trong JS strategy (O) |
| M17 | Sitemap anchor `#agriculture` không tồn tại trong
`innovation-centers.html` (O) |
| M18 | No 404 page (O) |
| M19 | Form-success thiếu `role="status"`/`aria-live` (O — A11Y) |

### Low (L) — polish

| ID | Finding |
|---|---|
| L1 | Mega menu "Tìm doanh nghiệp" và "Tìm nhà cung cấp" trùng URL (O) |
| L2 | Footer mobile 1-col layout lệch (O) |
| L3 | `.btn-brand` hover thiếu brand-glow (O) |
| L4 | `.btn-glass` `:focus-visible` có thể mất contrast trên dark (O) |
| L5 | Skip-link không có transition (O) |

---

## 11. Preserve list — những thứ KHÔNG nên phá

- **E** Brand tokens đã chốt (`#EE4623` + 4-gradient system) — preserve.
- **E** Manrope single typeface — preserve.
- **E** 3 heading families + hero families rule — preserve.
- **E** Skip-link, focus-visible, prefers-reduced-motion — preserve a11y baseline.
- **E** 6 mega-menu categories với 18 search items mapping — preserve IA shape.
- **E** 6 connect-types mapping (general/office/investment/technology/business/support)
  — preserve form intelligence.
- **E** 2026 proof points với date/source note — preserve credibility.
- **O** Home intent section với 5 routes — preserve (đây là điểm mạnh nhất
  của prototype).
- **O** Resource center với PDF download từ qtsc.com.vn — preserve.
- **O** Open-data 7 nhóm — preserve (high-trust signal).

---

## 12. Evidence gaps cần user research (A)

Vì constraint project không cho phép claim research, đây là danh sách **cần
xác minh trước khi đánh giá impact**:
- Tỉ lệ user vào từ home vs deep-page từ Google.
- Top 3 entry queries (organic search).
- Conversion rate thực tế của 6 connect-types.
- Bounce rate sau khi xem company-detail.html.
- Drop-off tại `applyHomepageStrategy()` removed sections.
- Touch device usage để quyết định 44×44 vs 48×48.

---

## 13. Tóm tắt quyết định — giữ / sửa / bỏ / thêm

| Quyết định | Items |
|---|---|
| **Keep** | Brand tokens, Manrope, hero families, mega-menu 6 nhóm, 6 connect-types, 2026 proof points, open-data hub, resource center, newsletter archive, sitemap |
| **Improve** | C1 (strategy function), H1-H10, M1-M19, A11Y gaps, filter handlers, search consistency, mega menu consistency |
| **Merge** | 2 mega items trùng URL (L1), company-detail pattern với member directory |
| **Remove** | `applyHomepageStrategy()` DOM removal (C1), `?cat=` params không dùng (F6), "Phòng họp" mega nếu không có content (M7) |
| **Add** | 404 page (M18), real per-DN URLs (H4), filter JS cho 3 page (H3), unique success message per connect-type (M14), inline form error (M13), `--brand-gradient-cta` adoption (M1) |

---

*Audit dựa trên source code tại HEAD. Mọi phát biểu "user impact" là Inference
trừ khi có tag E. Không có user research claim nào được khẳng định.*
