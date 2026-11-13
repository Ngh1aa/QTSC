/** Investment & incentives: eligibility checker (incentives.html#checker) and
 * investment enquiry (investment.html#enquiry). A checker result can be carried
 * into the enquiry as a draft stored in the session. */
(() => {
  const { $, $$, esc, bindForm, successPanel, fmtDate, showState } = window.QTSCUI;
  const store = window.QTSCStore;
  const seed = store.seed;
  const sectorOptions = selected => seed.incentiveSectors.map(s => `<option value="${s.id}" ${s.id === selected ? 'selected' : ''}>${esc(s.label)}</option>`).join('');
  const sectorLabel = id => seed.incentiveSectors.find(s => s.id === id)?.label || id;
  const needLabels = { office: 'Thuê văn phòng', land: 'Thuê đất, xây dựng', import: 'Nhập khẩu thiết bị', training: 'Đào tạo nhân lực' };

  /* ------------------------------------------------ eligibility checker */
  const checker = $('#checkerForm');
  if (checker) {
    $('#ck-sector').insertAdjacentHTML('beforeend', sectorOptions(''));
    const resultHost = $('#checkerResult');
    function evaluate(v) {
      const capital = Number(v.capital);
      const needs = [].concat(v.needs || []);
      const rndOk = v.rnd !== 'low';
      return seed.incentiveGroups.map(g => {
        const reasons = [];
        let fit = g.sectors.includes(v.sector);
        if (!fit) reasons.push(`lĩnh vực “${sectorLabel(v.sector)}” không nằm trong nhóm thường áp dụng`);
        if (fit && g.minCapital && capital < g.minCapital) { fit = false; reasons.push(`thường xem xét với dự án từ ${g.minCapital} tỷ đồng`); }
        if (fit && g.requiresRnd && !rndOk) { fit = false; reasons.push('cần có hoạt động R&D đáng kể'); }
        if (fit && g.id === 'land' && !needs.includes('land')) { fit = false; reasons.push('chỉ liên quan khi dự án có nhu cầu thuê đất'); }
        if (fit && g.id === 'import' && !needs.includes('import')) { fit = false; reasons.push('chỉ liên quan khi có nhập khẩu thiết bị'); }
        return { ...g, fit, reasons };
      });
    }
    bindForm(checker, {
      busyLabel: 'Đang đối chiếu…',
      validate: v => (Number(v.capital) <= 0 ? { capital: 'Nhập tổng vốn dự kiến lớn hơn 0.' } : {}),
      submit: v => store.request(() => ({ values: v, groups: evaluate(v) }), { delay: 500 }),
      success({ values, groups }) {
        const fit = groups.filter(g => g.fit);
        const other = groups.filter(g => !g.fit);
        resultHost.hidden = false;
        resultHost.dataset.state = fit.length ? 'eligible' : 'none';
        resultHost.innerHTML = `<div class="proto-panel" role="status" tabindex="-1" id="checkerSummary"><p class="proto-success-kicker">Kết quả đối chiếu sơ bộ</p><h3>${fit.length ? `Dự án có thể liên quan đến ${fit.length} nhóm chính sách.` : 'Chưa thấy nhóm ưu đãi theo lĩnh vực phù hợp.'}</h3><p>${esc(sectorLabel(values.sector))}, vốn dự kiến ${esc(values.capital)} tỷ đồng, ${esc(values.headcount || 0)} lao động. Kết quả chỉ mang tính tham khảo; điều kiện chính thức do QTSC và cơ quan có thẩm quyền xác nhận theo hồ sơ.</p>`
          + `<ul class="proto-records">${fit.map(g => `<li class="proto-record"><div><h3>${esc(g.title)}</h3><p>${esc(g.note)}</p></div><div class="record-actions"><span class="badge is-ok">Có thể liên quan</span></div></li>`).join('')}</ul>`
          + (other.length ? `<details class="proto-details"><summary>Vì sao ${other.length} nhóm khác chưa phù hợp</summary><ul class="proto-bullets">${other.map(g => `<li><strong>${esc(g.title)}</strong>: ${esc(g.reasons.join(', '))}.</li>`).join('')}</ul></details>` : '')
          + `<div class="state-actions is-start"><button type="button" class="btn btn-brand" id="checkerToEnquiry">Gửi kết quả để QTSC tư vấn</button><button type="button" class="btn btn-secondary" id="checkerReset">Kiểm tra dự án khác</button></div></div>`;
        $('#checkerSummary').focus();
        $('#checkerToEnquiry').addEventListener('click', () => {
          store.setValue('investmentDraft', { sector: values.sector, capital: values.capital, message: `Kết quả kiểm tra sơ bộ: ${fit.map(g => g.title).join('; ') || 'chưa có nhóm phù hợp'}. Nhu cầu: ${[].concat(values.needs || []).map(n => needLabels[n]).join(', ') || 'chưa xác định'}.` });
          location.href = 'investment.html#enquiry';
        });
        $('#checkerReset').addEventListener('click', () => { resultHost.hidden = true; checker.reset(); $('#ck-sector').focus(); });
      }
    });
  }

  /* ------------------------------------------------ investment enquiry */
  const enquiry = $('#enquiryForm');
  if (enquiry) {
    $('#eq-sector').insertAdjacentHTML('beforeend', sectorOptions(''));
    const draft = store.value('investmentDraft');
    if (draft) {
      enquiry.elements.sector.value = draft.sector || '';
      enquiry.elements.capital.value = draft.capital || '';
      enquiry.elements.message.value = draft.message || '';
      $('#enquiryDraftNote').hidden = false;
    }
    const host = $('#enquiryHost');
    const list = $('#enquiryList');
    const renderList = () => {
      const items = store.list('enquiries');
      list.dataset.state = items.length ? 'ready' : 'empty';
      if (!items.length) { showState(list, 'empty', { title: 'Chưa có yêu cầu đầu tư nào.', text: 'Yêu cầu bạn gửi sẽ hiển thị tại đây cùng mã tham chiếu.' }); return; }
      list.innerHTML = items.map(e => `<article class="proto-record"><div><h3>${esc(sectorLabel(e.sector))}</h3><p>${esc(e.company)}, vốn dự kiến ${esc(e.capital)} tỷ đồng</p><p>Mã ${esc(e.id)}, gửi ngày ${esc(fmtDate(e.createdAt))}</p></div><div class="record-actions"><span class="badge is-ok">Đã ghi nhận</span></div></article>`).join('');
    };
    renderList();
    bindForm(enquiry, {
      submit: v => store.request(() => store.add('enquiries', { company: v.company, name: v.name, email: v.email, phone: v.phone, sector: v.sector, capital: v.capital, timeline: v.timeline, message: v.message, fromChecker: !!draft }, 'DT')),
      success(record) {
        store.setValue('investmentDraft', null);
        const panel = successPanel({
          title: 'Yêu cầu tư vấn đầu tư đã được ghi nhận.',
          reference: record.id,
          lines: [`${sectorLabel(record.sector)}, vốn dự kiến ${record.capital} tỷ đồng, triển khai ${record.timeline.toLowerCase()}.`, 'Bộ phận Đầu tư QTSC sẽ liên hệ qua email để hẹn trao đổi.'],
          actions: [{ label: 'Kiểm tra chính sách ưu đãi', href: 'incentives.html#checker' }, { label: 'Gửi yêu cầu khác', onClick: () => { panel.remove(); enquiry.reset(); $('#enquiryDraftNote').hidden = true; enquiry.hidden = false; enquiry.elements.company.focus(); } }]
        });
        enquiry.hidden = true;
        host.append(panel);
        panel.focus();
        renderList();
      }
    });
  }
})();
