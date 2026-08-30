(() => {
  const main = document.querySelector('main#main');
  if (!main || main.dataset.legacyDetailsExpanded === '1') return;

  const insertBeforeContinuation = html => {
    const continuation = main.querySelector('.ecosystem-strip, .cta-panel');
    if (continuation) continuation.insertAdjacentHTML('beforebegin', html);
    else main.insertAdjacentHTML('beforeend', html);
  };

  if (document.body.classList.contains('page-innovation-centers')) {
    insertBeforeContinuation(`<section class="inner-section soft" id="agriculture"><div class="container-wide"><div class="inner-section-head"><p class="micro-label">Agriculture Center of Excellence</p><h2>Testbed ứng dụng công nghệ số trong nông nghiệp.</h2><p>QTSC phối hợp cùng các đối tác triển khai Agriculture Center of Excellence từ năm 2017 tại Lô 13. Trung tâm tập trung nghiên cứu và thử nghiệm IoT, Cloud Computing, Big Data và các mô hình canh tác tự động nhằm tăng năng suất, hiệu quả sử dụng tài nguyên.</p></div><div class="extended-grid"><article class="extended-card featured"><span>Testbed</span><h2>Từ nhà kính đến container gardening.</h2><p>Các mô hình được QTSC giới thiệu gồm trồng dưa lưới, rau thủy canh trong nhà kính, tưới tự động ngoài trời và khu container gardening điều khiển ánh sáng, dinh dưỡng, nhiệt độ và theo dõi qua camera.</p></article><article class="extended-card"><span>IoT</span><h3>Cảm biến & tự động hóa</h3><p>Hệ thống điều khiển các giai đoạn sinh trưởng và theo dõi điều kiện canh tác bằng thiết bị số.</p></article><article class="extended-card"><span>Cloud & Data</span><h3>Cloud · Big Data</h3><p>Môi trường thử nghiệm cho các doanh nghiệp CNTT phát triển ứng dụng nông nghiệp dựa trên nền tảng internet và điện toán đám mây.</p></article><a class="extended-card" href="https://www.qtsc.com.vn/en/agriculture-center-of-excellence" target="_blank" rel="noopener"><span>Official source</span><h3>Agriculture Center of Excellence</h3><p>Xem nội dung, hình ảnh và mô tả mô hình do QTSC công bố.</p><i>Mở nguồn QTSC ↗</i></a></div></div></section>`);
  }

  if (document.body.classList.contains('page-chain')) {
    insertBeforeContinuation(`<section class="inner-section" id="chain-resources"><div class="container-wide"><div class="inner-section-head"><p class="micro-label">Chuỗi QTSC</p><h2>Nguồn lực để đánh giá và tham gia Chuỗi.</h2><p>Thành viên, hướng dẫn gia nhập, dự án, cơ sở pháp lý, hoạt động và cổng thông tin chuyên biệt được gom thành các điểm truy cập rõ ràng.</p></div><div class="extended-grid"><a class="extended-card" href="https://www.qtsc.com.vn/thanh-vien" target="_blank" rel="noopener"><span>Network</span><h3>Thành viên Chuỗi</h3><p>Tra cứu các đơn vị tham gia và hệ thống liên kết thuộc Chuỗi QTSC.</p><i>Mở danh sách ↗</i></a><a class="extended-card" href="https://www.qtsc.com.vn/huong-dan-gia-nhap-chuoi" target="_blank" rel="noopener"><span>Guide</span><h3>Hướng dẫn gia nhập</h3><p>Kiểm tra các tiêu chuẩn nền tảng và yêu cầu hạ tầng theo tài liệu QTSC.</p><i>Xem hướng dẫn ↗</i></a><a class="extended-card" href="https://www.qtsc.com.vn/du-an-tham-gia-chuoi" target="_blank" rel="noopener"><span>Projects</span><h3>Dự án tham gia Chuỗi</h3><p>Danh sách dự án và địa phương được QTSC giới thiệu trong chương trình mở rộng.</p><i>Xem dự án ↗</i></a><a class="extended-card" href="https://www.qtsc.com.vn/chuoi-qtsc/van-ban-phap-luat" target="_blank" rel="noopener"><span>Legal</span><h3>Văn bản pháp luật</h3><p>Các văn bản và cơ sở pháp lý liên quan đến mô hình Chuỗi QTSC.</p><i>Mở văn bản ↗</i></a><a class="extended-card" href="https://www.qtsc.com.vn/hoat-dong-chuoi" target="_blank" rel="noopener"><span>Activities</span><h3>Hoạt động Chuỗi</h3><p>Tin tức và chương trình kết nối giữa các thành viên.</p><i>Xem hoạt động ↗</i></a><a class="extended-card featured" href="https://chain.qtsc.com.vn/" target="_blank" rel="noopener"><span>Portal</span><h2>Cổng thông tin Chuỗi QTSC.</h2><p>Đi tới hệ thống chuyên biệt cho các nội dung vận hành và kết nối thành viên.</p><i>Mở Chain Portal ↗</i></a></div></div></section>`);
  }

  main.dataset.legacyDetailsExpanded = '1';
  requestAnimationFrame(() => {
    if (!location.hash) return;
    const target = document.getElementById(location.hash.slice(1));
    target?.scrollIntoView({block:'start'});
  });
})();