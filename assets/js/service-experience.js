/* QTSC Service Experience — lightweight client-side prototype journeys. */
(() => {
  const $ = (q, r=document) => r.querySelector(q);
  const $$ = (q, r=document) => [...r.querySelectorAll(q)];

  const page = document.body.dataset.page || '';
  const configs = {
    office: {
      kicker:'Thuê văn phòng',
      title:'Tìm không gian phù hợp trước khi xem từng tòa nhà.',
      desc:'Chọn nhanh quy mô đội ngũ và ưu tiên vận hành. Hệ thống sẽ gợi ý nhóm không gian để bạn tiếp tục xem tòa nhà hoặc đặt lịch tham quan.',
      progress:['Nhu cầu','Không gian','Tham quan','Gửi yêu cầu'],
      questions:[
        {key:'team',label:'Quy mô đội ngũ',options:['1–20 người','21–50 người','51–100 người','100+ người']},
        {key:'priority',label:'Ưu tiên chính',options:['Tối ưu chi phí','Cân bằng chi phí / hình ảnh','Tiêu chuẩn & hình ảnh cao']}
      ],
      result:(s)=>{
        const p=s.priority||'Cân bằng chi phí / hình ảnh';
        if(p.includes('Tối ưu')) return ['Văn phòng loại C','Chi phí hợp lý, đủ tiện ích để doanh nghiệp nhỏ hoặc mới thành lập bắt đầu nhanh.'];
        if(p.includes('cao')) return ['Văn phòng loại A','Phù hợp doanh nghiệp cần tiêu chuẩn xây dựng, hình ảnh và trải nghiệm làm việc cao hơn.'];
        return ['Văn phòng loại B','Phù hợp doanh nghiệp vừa và nhỏ cần không gian hiện đại và cân bằng chi phí.'];
      },
      cta:'Xem tòa nhà phù hợp',
      action:()=>$('#buildings')?.scrollIntoView({behavior:'smooth',block:'start'}),
      requestLabel:'Đặt lịch tham quan'
    },
    investment: {
      kicker:'Đầu tư tại QTSC',
      title:'Đi từ mục tiêu đầu tư đến đúng nhóm thông tin cần xem.',
      desc:'Thay vì đọc toàn bộ danh mục, hãy chọn mục tiêu gần nhất với dự án của bạn để ưu tiên lĩnh vực, chính sách và đầu mối trao đổi phù hợp.',
      progress:['Mục tiêu','Lĩnh vực','Chính sách','Trao đổi'],
      questions:[
        {key:'goal',label:'Bạn đang muốn',options:['Mở hiện diện tại QTSC','Đầu tư dự án / hạ tầng','R&D / đổi mới sáng tạo','Phát triển dịch vụ công nghệ']},
        {key:'stage',label:'Giai đoạn hiện tại',options:['Đang tìm hiểu','Đang so sánh địa điểm','Đang chuẩn bị dự án','Cần trao đổi ngay']}
      ],
      result:(s)=>{
        const g=s.goal||'Mở hiện diện tại QTSC';
        if(g.includes('hạ tầng')) return ['Ưu tiên nhóm hạ tầng nghiên cứu, dữ liệu & công trình theo quy hoạch','Tiếp tục xem lĩnh vực 09–10, chính sách đầu tư và các thông báo mời gọi đầu tư đang công bố.'];
        if(g.includes('R&D')) return ['Ưu tiên R&D, ươm tạo & nhân lực công nghệ số','Tiếp tục xem nhóm 01, 05, 06 và hệ sinh thái R&D Labs / DXCenter.'];
        if(g.includes('dịch vụ')) return ['Ưu tiên phần mềm, dịch vụ công nghệ số & xúc tiến','Tiếp tục xem nhóm 02, 03, 07 và Technology Marketplace.'];
        return ['Ưu tiên không gian + ưu đãi + dịch vụ một cửa','Bắt đầu từ văn phòng, chính sách ưu đãi và nhóm thủ tục doanh nghiệp để rút ngắn thời gian thiết lập hoạt động.'];
      },
      cta:'Xem nhóm đầu tư',
      action:()=>document.querySelector('.page-investment main>.inner-section:nth-of-type(2)')?.scrollIntoView({behavior:'smooth',block:'start'}),
      requestLabel:'Trao đổi dự án'
    },
    services: {
      kicker:'Dịch vụ doanh nghiệp',
      title:'Chọn việc cần xử lý, không cần tự tìm đúng phòng ban.',
      desc:'Dịch vụ một cửa của QTSC hỗ trợ các thủ tục thường gặp như đầu tư – kinh doanh, lao động, visa, tạm trú và xuất nhập khẩu thiết bị.',
      progress:['Chọn thủ tục','Xem cần chuẩn bị','Gửi yêu cầu','Theo dõi'],
      questions:[
        {key:'procedure',label:'Nhu cầu của bạn',options:['Đầu tư / kinh doanh','Giấy phép lao động','Visa / nhập cảnh / tạm trú','Thiết bị & vận hành']},
        {key:'urgency',label:'Mức độ ưu tiên',options:['Tìm hiểu trước','Chuẩn bị hồ sơ','Đang cần xử lý']}
      ],
      result:(s)=>{
        const p=s.procedure||'Đầu tư / kinh doanh';
        const map={
          'Đầu tư / kinh doanh':['Nhóm thủ tục doanh nghiệp','Xem giấy phép đầu tư, kinh doanh, con dấu, mã số thuế và các đầu mối liên quan.'],
          'Giấy phép lao động':['Nhóm lao động','Chuẩn bị thông tin doanh nghiệp, người lao động nước ngoài và nhu cầu thời gian làm việc.'],
          'Visa / nhập cảnh / tạm trú':['Nhóm nhập cảnh & lưu trú','Xác định loại nhu cầu, thời gian dự kiến và hồ sơ cá nhân liên quan.'],
          'Thiết bị & vận hành':['Nhóm vận hành doanh nghiệp','Xem thông tin về xuất nhập khẩu thiết bị và các dịch vụ hạ tầng phục vụ hoạt động.']
        };
        return map[p]||map['Đầu tư / kinh doanh'];
      },
      cta:'Xem thủ tục tương ứng',
      action:()=>$('#one-stop')?.scrollIntoView({behavior:'smooth',block:'start'}),
      requestLabel:'Gửi yêu cầu hỗ trợ'
    },
    marketplace: {
      kicker:'Tìm giải pháp công nghệ',
      title:'Bắt đầu từ bài toán, sau đó mới chọn công nghệ.',
      desc:'QTSC công bố hệ sinh thái hàng trăm sản phẩm, dịch vụ và giải pháp công nghệ. Chọn nhu cầu gần nhất để hệ thống áp dụng bộ lọc ban đầu cho bạn.',
      progress:['Bài toán','Lọc giải pháp','Xem nhà cung cấp','Kết nối'],
      questions:[
        {key:'need',label:'Bạn đang cần',options:['AI & dữ liệu','Cloud & hạ tầng','An toàn thông tin','Quản trị doanh nghiệp']}
      ],
      result:(s)=>{
        const n=s.need||'AI & dữ liệu';
        const map={
          'AI & dữ liệu':['Nhóm AI','Ưu tiên các giải pháp xử lý dữ liệu, AI, tự động hóa và số hóa.'],
          'Cloud & hạ tầng':['Nhóm Cloud','Ưu tiên nền tảng cloud, data center và hạ tầng số.'],
          'An toàn thông tin':['Nhóm Cybersecurity','Ưu tiên SOC, bảo mật, giám sát và các dịch vụ an toàn thông tin.'],
          'Quản trị doanh nghiệp':['Nhóm ERP','Ưu tiên ERP, CRM, quản trị nhân lực, văn phòng và vận hành doanh nghiệp.']
        };
        return map[n]||map['AI & dữ liệu'];
      },
      cta:'Áp dụng bộ lọc',
      action:(state)=>{
        const need=state.need||'AI & dữ liệu';
        const key=need.includes('Cloud')?'cloud':need.includes('An toàn')?'cyber':need.includes('Quản trị')?'erp':'ai';
        const btn=$(`.pill-tabs [data-filter="${key}"]`);
        btn?.click();
        document.querySelector('.pill-tabs')?.scrollIntoView({behavior:'smooth',block:'center'});
      },
      requestLabel:'Nhờ tư vấn giải pháp'
    },
    amenities: {
      kicker:'Trải nghiệm campus',
      title:'Tìm tiện ích theo việc bạn cần làm ngay lúc này.',
      desc:'Ăn uống, di chuyển, ngân hàng, chăm sóc sức khỏe, giáo dục và các dịch vụ thường ngày được tổ chức trong cùng campus QTSC.',
      progress:['Chọn nhu cầu','Xem tiện ích','Định vị','Di chuyển'],
      questions:[
        {key:'amenity',label:'Bạn đang cần',options:['Ăn uống & café','Di chuyển','Ngân hàng / ATM','Chăm sóc sức khỏe','Thể thao / tiện ích']}
      ],
      result:(s)=>[s.amenity||'Ăn uống & café','Cuộn xuống danh sách tiện ích để xem nhóm phù hợp, sau đó mở bản đồ campus nếu cần định vị.'],
      cta:'Xem tiện ích',
      action:()=>document.querySelector('.page-amenities .extended-grid')?.scrollIntoView({behavior:'smooth',block:'start'}),
      requestLabel:'Hỏi thông tin campus'
    },
    companies: {
      kicker:'Kết nối hệ sinh thái',
      title:'Tìm đúng doanh nghiệp theo mục đích kết nối.',
      desc:'Danh bạ không chỉ để xem tên công ty. Hãy chọn mục đích để thu hẹp nhanh doanh nghiệp phù hợp trong hệ sinh thái QTSC.',
      progress:['Mục đích','Lọc doanh nghiệp','Xem hồ sơ','Kết nối'],
      questions:[
        {key:'partner',label:'Bạn đang tìm',options:['Đối tác phần mềm','Đối tác Data & AI','Đơn vị đào tạo','Đối tác viễn thông']}
      ],
      result:(s)=>[s.partner||'Đối tác phần mềm','Áp dụng bộ lọc tương ứng để xem nhóm doanh nghiệp gần nhất với nhu cầu hợp tác.'],
      cta:'Áp dụng bộ lọc',
      action:(state)=>{
        const n=state.partner||'Đối tác phần mềm';
        const key=n.includes('Data')?'data':n.includes('đào tạo')?'education':n.includes('viễn thông')?'telecom':'software';
        $(`.pill-tabs [data-filter="${key}"]`)?.click();
        document.querySelector('.pill-tabs')?.scrollIntoView({behavior:'smooth',block:'center'});
      },
      requestLabel:'Nhờ QTSC kết nối'
    }
  };

  function buildRoute(config){
    const hero=$('.inner-hero');
    if(!hero||!config||$('.service-route')) return;
    const section=document.createElement('section');
    section.className='service-route';
    section.innerHTML=`<div class="container-wide service-route-shell"><div class="service-route-copy"><div class="service-route-kicker">${config.kicker}</div><h2>${config.title}</h2><p>${config.desc}</p><div class="service-progress">${config.progress.map((x,i)=>`<span><b>${String(i+1).padStart(2,'0')}</b>${x}</span>`).join('')}</div></div><div class="service-assistant"><div class="service-assistant-head"><strong>Trợ lý nhu cầu</strong><span>Start here</span></div><div class="service-assistant-body"></div></div></div>`;
    hero.insertAdjacentElement('afterend',section);
    const body=$('.service-assistant-body',section);
    const state={};
    config.questions.forEach((q,qi)=>{
      const wrap=document.createElement('div');wrap.className='service-question';
      wrap.innerHTML=`<label>${q.label}</label><div class="service-options">${q.options.map((o,i)=>`<button type="button" class="service-option ${i===0?'active':''}" data-key="${q.key}" data-value="${o}">${o}</button>`).join('')}</div>`;
      state[q.key]=q.options[0];body.append(wrap);
    });
    const result=document.createElement('div');result.className='service-result';body.append(result);
    const render=()=>{
      const [title,desc]=config.result(state);
      result.innerHTML=`<div><small>Gợi ý tiếp theo</small><strong>${title}</strong><p>${desc}</p></div><div style="display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end"><button type="button" class="btn btn-secondary" data-service-request>${config.requestLabel}</button><button type="button" class="btn btn-brand" data-service-continue>${config.cta} <span>↗</span></button></div>`;
      $('[data-service-continue]',result)?.addEventListener('click',()=>config.action(state));
      $('[data-service-request]',result)?.addEventListener('click',()=>openRequest(config,state,title));
    };
    $$('.service-option',section).forEach(btn=>btn.addEventListener('click',()=>{
      $$(`.service-option[data-key="${btn.dataset.key}"]`,section).forEach(x=>x.classList.remove('active'));
      btn.classList.add('active');state[btn.dataset.key]=btn.dataset.value;render();
    }));
    render();
  }

  function ensureDrawer(){
    let overlay=$('.service-request-overlay');
    if(overlay) return overlay;
    overlay=document.createElement('div');overlay.className='service-request-overlay';overlay.setAttribute('aria-hidden','true');
    overlay.innerHTML='<div class="service-request-backdrop"></div><aside class="service-request-drawer" role="dialog" aria-modal="true"><div class="service-request-top"><span>QTSC Service Request</span><button type="button" class="service-request-close" aria-label="Đóng">×</button></div><div class="service-request-content"></div></aside>';
    document.body.append(overlay);
    const close=()=>{overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');document.body.classList.remove('is-locked')};
    $('.service-request-backdrop',overlay).addEventListener('click',close);$('.service-request-close',overlay).addEventListener('click',close);
    overlay._close=close;return overlay;
  }

  function openRequest(config,state,recommendation){
    const overlay=ensureDrawer(),content=$('.service-request-content',overlay);
    const selections=Object.entries(state);
    content.innerHTML=`<h2>${config.requestLabel}</h2><p class="service-request-lead">Thông tin bạn vừa chọn đã được đưa vào yêu cầu để không phải nhập lại từ đầu.</p><div class="service-request-summary">${selections.map(([k,v])=>`<div><small>${k}</small><strong>${v}</strong></div>`).join('')}<div><small>Gợi ý</small><strong>${recommendation}</strong></div></div><form class="service-request-form"><div class="service-request-field"><label>Họ và tên</label><input name="name" required placeholder="Nguyễn Văn A"></div><div class="service-request-field"><label>Công ty / tổ chức</label><input name="company" placeholder="Tên doanh nghiệp"></div><div class="service-request-field"><label>Email</label><input name="email" type="email" required placeholder="name@company.com"></div><div class="service-request-field"><label>Điện thoại</label><input name="phone" placeholder="09xx xxx xxx"></div><div class="service-request-field full"><label>Thông tin bổ sung</label><textarea name="note" placeholder="Mô tả ngắn nhu cầu, thời gian dự kiến hoặc câu hỏi cần QTSC hỗ trợ..."></textarea></div><div class="service-request-actions"><button type="button" class="btn btn-secondary" data-cancel>Đóng</button><button class="btn btn-brand" type="submit">Xác nhận yêu cầu <span>↗</span></button></div></form>`;
    $('[data-cancel]',content).addEventListener('click',()=>overlay._close());
    $('form',content).addEventListener('submit',e=>{
      e.preventDefault();
      const data=new FormData(e.currentTarget);const name=data.get('name')||'bạn';
      content.innerHTML=`<div class="service-request-done"><i>✓</i><strong>Đã hoàn tất bước khai báo.</strong><p>Cảm ơn ${name}. Thông tin nhu cầu đã được tổng hợp thành một yêu cầu rõ ràng để tiếp tục trao đổi với QTSC.</p><a class="btn btn-brand" href="contact.html">Mở thông tin liên hệ QTSC <span>↗</span></a></div>`;
    });
    overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');document.body.classList.add('is-locked');
  }

  function homeEnhancements(){
    if(document.body.classList.contains('inner-page')) return;
    const intent=$('.intent');if(!intent)return;
    intent.id='start-service';
    const heroPrimary=$('.hero-actions .btn-white');
    if(heroPrimary){heroPrimary.href='#start-service';heroPrimary.innerHTML='Bắt đầu nhu cầu <span>↓</span>'}
  }

  if(document.body.classList.contains('inner-page')) buildRoute(configs[page]);
  else homeEnhancements();
})();
