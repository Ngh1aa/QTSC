const $ = (q, root=document) => root.querySelector(q);
const $$ = (q, root=document) => [...root.querySelectorAll(q)];

const state = { mega:null, marketCategory:'all', searchType:'all', connectType:'general', language:'VI' };

const linkMap = {
  'Về QTSC':'about.html','Tầm nhìn · Sứ mệnh':'about.html#vision','Giá trị cốt lõi':'about.html#values','25 năm QTSC':'about.html#timeline',
  'Tại sao chọn QTSC':'about.html#why','Green & Smart QTSC':'explore.html','Tại sao TP.HCM':'about.html#why','Tại sao Việt Nam':'about.html#why',
  'Danh bạ thành viên':'companies.html','Tìm doanh nghiệp':'companies.html','QTSC Chain':'about.html#ecosystem','QTSC DigiTech Center':'technology-detail.html','DXCenter':'technology-detail.html','QTSC R&D Labs':'technology-detail.html','Giáo dục & cộng đồng':'about.html#ecosystem',
  'Văn phòng cho thuê':'office.html','Tòa nhà':'office.html#buildings','Phòng họp & hội nghị':'office.html#spaces','Đầu tư tại QTSC':'office.html#invest','Chính sách ưu đãi':'office.html#support','Dịch vụ một cửa':'office.html#support','Thủ tục doanh nghiệp':'office.html#support',
  'Data Center':'technology-detail.html','Cloud':'technology-detail.html#cloud','Cybersecurity':'technology-detail.html#cyber','Telecom':'technology-detail.html#telecom','Sản phẩm CNS':'marketplace.html','Dịch vụ CNS':'marketplace.html','Tìm nhà cung cấp':'marketplace.html','R&D & Innovation':'technology-detail.html#innovation',
  'Bản đồ QTSC':'explore.html','3D / 360 Tour':'explore.html#tour','Giao thông':'explore.html#mobility','Ăn uống & café':'explore.html#places','Ngân hàng / ATM':'explore.html#places','Giáo dục':'explore.html#places','Thể thao & dịch vụ':'explore.html#places',
  'Tin QTSC':'insights.html','Tin thành viên':'insights.html?cat=member','Sự kiện':'insights.html?cat=event','Tuyển dụng':'insights.html?cat=career','Thông cáo báo chí':'insights.html?cat=press','Hình ảnh & video':'insights.html?cat=media','Tài liệu':'insights.html?cat=resource','Văn bản pháp luật':'insights.html?cat=resource'
};


const megaData = {
  qtsc:{label:'QTSC',columns:[['Giới thiệu',['Về QTSC','Tầm nhìn · Sứ mệnh','Giá trị cốt lõi','25 năm QTSC']],['Lý do chọn QTSC',['Tại sao chọn QTSC','Green & Smart QTSC','Tại sao TP.HCM','Tại sao Việt Nam']]],feature:['Quality Tech Solution Complex','Một trung tâm thúc đẩy kết nối và giải pháp công nghệ chất lượng cao.']},
  ecosystem:{label:'Hệ sinh thái',columns:[['Doanh nghiệp',['Danh bạ thành viên','Tìm doanh nghiệp','QTSC Chain']],['Đổi mới & cộng đồng',['QTSC DigiTech Center','DXCenter','QTSC R&D Labs','Giáo dục & cộng đồng']]],feature:['121 doanh nghiệp','Khám phá network công nghệ đang hoạt động tại QTSC.']},
  business:{label:'Doanh nghiệp',columns:[['Không gian',['Văn phòng cho thuê','Tòa nhà','Phòng họp & hội nghị']],['Đầu tư & hỗ trợ',['Đầu tư tại QTSC','Chính sách ưu đãi','Dịch vụ một cửa','Thủ tục doanh nghiệp']]],feature:['Business at QTSC','Không gian, hạ tầng và hỗ trợ trong cùng một hệ sinh thái.']},
  technology:{label:'Công nghệ',columns:[['Hạ tầng số',['Data Center','Cloud','Cybersecurity','Telecom']],['Marketplace',['Sản phẩm CNS','Dịch vụ CNS','Tìm nhà cung cấp','R&D & Innovation']]],feature:['650+ giải pháp','Tra cứu sản phẩm, dịch vụ và nhà cung cấp trong hệ sinh thái.']},
  explore:{label:'Khám phá',columns:[['Campus',['Bản đồ QTSC','3D / 360 Tour','Tòa nhà','Giao thông']],['Tiện ích',['Ăn uống & café','Ngân hàng / ATM','Giáo dục','Thể thao & dịch vụ']]],feature:['43 ha campus','Khám phá QTSC như một địa điểm thật, không chỉ là corporate website.']},
  insights:{label:'Tin & nguồn lực',columns:[['Cập nhật',['Tin QTSC','Tin thành viên','Sự kiện','Tuyển dụng']],['Media & tài liệu',['Thông cáo báo chí','Hình ảnh & video','Tài liệu','Văn bản pháp luật']]],feature:['QTSC Insights','Tin tức, tài liệu và câu chuyện từ toàn hệ sinh thái.']}
};

const ecoData = {
  qtsc:['Core ecosystem','QTSC','Điểm kết nối giữa hạ tầng, công nghệ, doanh nghiệp và cộng đồng.'],
  innovation:['Innovation','Đổi mới','R&D Labs, DXCenter và các trung tâm đổi mới kết nối nghiên cứu với ứng dụng.'],
  technology:['Technology','Công nghệ','Data Center, Cloud, Cybersecurity, Telecom và hàng trăm giải pháp từ hệ sinh thái.'],
  education:['Education','Giáo dục','Không gian học tập và nguồn nhân lực cùng tồn tại trong campus công nghệ.'],
  community:['Community','Cộng đồng','Sự kiện, câu lạc bộ nghề nghiệp và mạng lưới kết nối doanh nghiệp.'],
  business:['Business','Doanh nghiệp','Hệ doanh nghiệp nội khu, văn phòng, đầu tư và các dịch vụ hỗ trợ một cửa.']
};

const techData = {
  data:{index:'01',title:'Data Center',text:'Hạ tầng dữ liệu phục vụ vận hành, lưu trữ và kết nối của hệ sinh thái.',image:'https://www.qtsc.com.vn/uploads/files/2021/03/14/1-goc-Cong-vien-phan-mem-Quang-Trung-02.jpg'},
  cloud:{index:'02',title:'Cloud',text:'Nền tảng cloud linh hoạt cho workload, dịch vụ số và nhu cầu mở rộng.',image:'https://www.qtsc.com.vn/uploads/files/2018/02/12/thumbs-1200-628-2--1/qtsc_flycam_640x320.jpg'},
  cyber:{index:'03',title:'Cybersecurity',text:'Hệ giải pháp an toàn thông tin và SOC hỗ trợ doanh nghiệp vận hành tin cậy.',image:'https://info.qtsc.com.vn/upload/contents/qtscbuilding-B811722321392.webp'},
  telecom:{index:'04',title:'Telecom',text:'Kết nối viễn thông và hạ tầng số phục vụ campus và cộng đồng công nghệ.',image:'https://www.qtsc.com.vn/uploads/files/2021/03/14/1-goc-Cong-vien-phan-mem-Quang-Trung.jpg'}
};

const offerings = [
  {title:'Private Cloud Platform',provider:'QTSC',type:'Cloud Infrastructure',mark:'PC',categories:['Cloud','Infrastructure']},
  {title:'Security Operation Center',provider:'QTSC / Ecosystem',type:'Cybersecurity',mark:'SC',categories:['Cybersecurity']},
  {title:'AI Document Processing',provider:'DIGI-TEXX',type:'AI · Data',mark:'AI',categories:['AI','Data']},
  {title:'Smart Manufacturing Suite',provider:'QTSC Member',type:'IoT · Automation',mark:'SM',categories:['IoT','Automation']},
  {title:'Enterprise ERP Platform',provider:'QTSC Member',type:'Business Software',mark:'ER',categories:['ERP','SaaS']},
  {title:'Digital Transformation Consulting',provider:'QTSC Ecosystem',type:'Consulting',mark:'DX',categories:['Digital Transformation']},
  {title:'Managed Security Service',provider:'QTSC Member',type:'Security Service',mark:'MS',categories:['Cybersecurity','SaaS']}
];
const marketCats = ['all','AI','Cloud','Cybersecurity','IoT','SaaS','ERP','Digital Transformation'];

const companies = [
  {name:'Hitachi Digital Services Vietnam',industry:'Software & Digital',building:'Helios Building',mark:'HD'},
  {name:'TMA Solutions',industry:'Software & Digital',building:'QTSC Campus',mark:'TM'},
  {name:'DIGI-TEXX Vietnam',industry:'Data & AI',building:'QTSC Campus',mark:'DX'},
  {name:'AMIT Group',industry:'Digital Transformation',building:'QTSC Campus',mark:'AM'},
  {name:'ASOFT Corporation',industry:'Enterprise Software',building:'QTSC Campus',mark:'AS'},
  {name:'QTSC R&D Labs',industry:'Research & Innovation',building:'R&D Labs',mark:'RD'},
  {name:'Vietnam Concentrix Services',industry:'Business Services',building:'QTSC Campus',mark:'CX'},
  {name:'Hoa Sen University',industry:'Education',building:'QTSC Campus',mark:'HS'},
  {name:'Viettel HCMC',industry:'Telecom',building:'JVPE Building',mark:'VT'}
];

const openData = [
  {label:'Chất lượng không khí',status:'GOOD',tone:'success'},
  {label:'Nước cấp',status:'NORMAL',tone:'success'},
  {label:'Nước thải',status:'STANDARD',tone:'success'},
  {label:'Nước mặt',status:'NORMAL',tone:'success'}
];

const globalSearchItems = [
  {type:'company',title:'Hitachi Digital Services Vietnam',subtitle:'Software · Helios Building',url:'#directory'},
  {type:'company',title:'TMA Solutions',subtitle:'Software · QTSC Campus',url:'#directory'},
  {type:'technology',title:'QTSC Data Center',subtitle:'Digital Infrastructure',url:'#technology'},
  {type:'technology',title:'Security Operation Center',subtitle:'Cybersecurity',url:'#marketplace'},
  {type:'place',title:'QTSC Building 1',subtitle:'Campus · Headquarters',url:'#greenSmart'},
  {type:'place',title:'R&D Labs',subtitle:'Innovation · Campus',url:'#greenSmart'},
  {type:'news',title:'25 năm QTSC',subtitle:'QTSC News · 2026',url:'#storiesTitle'},
  {type:'document',title:'Tài liệu giới thiệu QTSC',subtitle:'Resource · PDF',url:'#'}
];

const connectConfigs = {
  general:{label:'Liên hệ chung',extra:[['company','Công ty / tổ chức','text']]},
  office:{label:'Thuê văn phòng',extra:[['company','Công ty','text'],['space','Diện tích dự kiến (m²)','number'],['team','Quy mô nhân sự','number']]},
  investment:{label:'Đầu tư',extra:[['company','Công ty / tổ chức','text'],['interest','Lĩnh vực đầu tư','text']]},
  technology:{label:'Công nghệ',extra:[['company','Công ty','text'],['interest','Giải pháp quan tâm','text']]},
  business:{label:'Dịch vụ một cửa',extra:[['company','Công ty','text'],['interest','Nội dung cần hỗ trợ','text']]},
  support:{label:'Thủ tục & hỗ trợ',extra:[['company','Công ty','text'],['interest','Thủ tục cần hỗ trợ','text']]}
};

function track(name,data={}){console.info('[QTSC UI event]',name,data)}
function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove('show'),2200)}
function lockBody(){document.body.classList.toggle('is-locked',$('.overlay.open')||$('#mobileMenu').classList.contains('open'))}

function renderMega(key){
  const d=megaData[key]; if(!d)return;
  $('#megaContent').innerHTML=d.columns.map(([title,links])=>`<div class="mega-col"><small>${title}</small>${links.map(x=>`<a href="${linkMap[x]||'#'}">${x}<span>↗</span></a>`).join('')}</div>`).join('')+`<aside class="mega-feature"><span>${d.label}</span><strong>${d.feature[0]}</strong><span>${d.feature[1]}</span></aside>`;
}
function openMega(key,btn){state.mega=key;renderMega(key);$('#megaMenu').classList.add('open');$('#megaMenu').setAttribute('aria-hidden','false');$('#siteHeader').classList.add('mega-open');$$('.nav-link').forEach(x=>x.classList.toggle('active',x===btn))}
function closeMega(){state.mega=null;$('#megaMenu').classList.remove('open');$('#megaMenu').setAttribute('aria-hidden','true');$('#siteHeader').classList.remove('mega-open');$$('.nav-link').forEach(x=>x.classList.remove('active'))}

function renderEcosystem(key='qtsc'){
  const [type,title,desc]=ecoData[key];
  $('#ecosystemPanel').innerHTML=`<small>${type}</small><strong>${title}</strong><p>${desc}</p>`;
  $$('.eco-node').forEach(x=>x.classList.toggle('active',x.dataset.eco===key));
}
function renderTechnology(key){
  const d=techData[key];
  $('#techIndex').textContent=d.index;$('#techVisualTitle').textContent=d.title;$('#techVisualText').textContent=d.text;
  $('.tech-photo').style.opacity='.15';setTimeout(()=>{ $('.tech-photo').style.backgroundImage=`linear-gradient(0deg,rgba(0,0,0,.4),transparent 45%),url('${d.image}')`;$('.tech-photo').style.opacity='1';},120);
  $$('.tech-tab').forEach(x=>{const active=x.dataset.tech===key;x.classList.toggle('active',active);x.setAttribute('aria-selected',String(active))});
}

function marketFiltered(){const q=$('#marketQuery').value.trim().toLowerCase();return offerings.filter(o=>(state.marketCategory==='all'||o.categories.includes(state.marketCategory))&&(!q||`${o.title} ${o.provider} ${o.type} ${o.categories.join(' ')}`.toLowerCase().includes(q)))}
function setMarketCategory(cat){state.marketCategory=cat;const p=new URLSearchParams(location.search);cat==='all'?p.delete('technology'):p.set('technology',cat.toLowerCase().replaceAll(' ','-'));history.replaceState(null,'',location.pathname+(p.toString()?`?${p}`:'')+location.hash);renderMarketFilters();renderMarketResults()}
function renderMarketFilters(){$('#marketFilters').innerHTML=marketCats.map(c=>`<button class="filter-chip ${state.marketCategory===c?'active':''}" data-market-filter="${c}">${c==='all'?'Tất cả':c}</button>`).join('')}
function renderMarketResults(){const items=marketFiltered();$('#marketCount').textContent=`${items.length} kết quả phù hợp`;$('#marketResults').innerHTML=items.length?items.map(o=>`<article class="market-item" onclick="location.href='technology-detail.html'" role="link" tabindex="0"><div class="market-mark">${o.mark}</div><div><h3>${o.title}</h3><p>${o.provider}</p></div><small>${o.type}</small><span>↗</span></article>`).join(''):`<div class="empty-state"><strong>Chưa tìm thấy kết quả phù hợp.</strong><p>Thử từ khóa khác hoặc xóa bộ lọc.</p></div>`}

function initCompanyIndustry(){const items=[...new Set(companies.map(c=>c.industry))].sort();$('#companyIndustry').insertAdjacentHTML('beforeend',items.map(i=>`<option value="${i}">${i}</option>`).join(''))}
function renderCompanies(){const q=$('#companyQuery').value.trim().toLowerCase(),industry=$('#companyIndustry').value;const items=companies.filter(c=>(industry==='all'||c.industry===industry)&&(!q||`${c.name} ${c.industry} ${c.building}`.toLowerCase().includes(q)));$('#companyResults').innerHTML=items.length?items.map(c=>`<article class="company-card" onclick="location.href='company-detail.html'" role="link" tabindex="0"><div class="company-logo">${c.mark}</div><h3>${c.name}</h3><p>${c.industry}</p><footer><span>${c.building}</span><span>↗</span></footer></article>`).join(''):`<div class="empty-state"><strong>Không có doanh nghiệp phù hợp.</strong><p>Điều chỉnh từ khóa hoặc lĩnh vực.</p></div>`}
function renderOpenData(){$('#dataList').innerHTML=openData.map(d=>`<div class="data-row"><div><span class="status-dot" style="background:var(--${d.tone})"></span><strong>${d.label}</strong></div><span>${d.status}</span></div>`).join('')}

function renderSearchTabs(){const tabs=[['all','Tất cả'],['company','Doanh nghiệp'],['technology','Công nghệ'],['place','Địa điểm'],['news','Tin tức'],['document','Tài liệu']];$('#searchTabs').innerHTML=tabs.map(([id,label])=>`<button class="search-tab ${state.searchType===id?'active':''}" data-search-type="${id}">${label}</button>`).join('')}
function renderGlobalResults(){const q=$('#globalSearchInput').value.trim().toLowerCase();const items=globalSearchItems.filter(i=>(state.searchType==='all'||i.type===state.searchType)&&(!q||`${i.title} ${i.subtitle}`.toLowerCase().includes(q)));$('#globalResults').innerHTML=items.length?items.map(i=>`<a class="search-result" href="${i.url}" data-search-result><span class="type">${i.type}</span><span><strong>${i.title}</strong><br><small>${i.subtitle}</small></span><span>↗</span></a>`).join(''):`<div class="empty-state"><strong>Không có kết quả.</strong><p>Hãy thử từ khóa ngắn hơn hoặc chọn nhóm khác.</p></div>`}
function setOverlay(sel,open){const el=$(sel);el.classList.toggle('open',open);el.setAttribute('aria-hidden',String(!open));lockBody()}
function openSearch(){closeMega();setOverlay('#searchOverlay',true);setTimeout(()=>$('#globalSearchInput').focus(),60);track('global_search_open')}
function closeSearch(){setOverlay('#searchOverlay',false)}

function renderConnectTypes(){$('#connectTypes').innerHTML=Object.entries(connectConfigs).map(([k,c])=>`<button type="button" class="connect-type ${state.connectType===k?'active':''}" data-connect-type="${k}">${c.label}</button>`).join('')}
function renderConnectForm(){const c=connectConfigs[state.connectType];const fields=[['name','Họ & tên','text'],['phone','Điện thoại','tel'],['email','Email','email'],...c.extra];$('#connectForm').hidden=false;$('#connectTypes').hidden=false;$('#connectForm').innerHTML=fields.map(([name,label,type])=>`<div class="form-field"><label for="f-${name}">${label}</label><input id="f-${name}" name="${name}" type="${type}" ${['name','phone','email'].includes(name)?'required':''}></div>`).join('')+`<div class="form-field"><label for="f-message">Nội dung</label><textarea id="f-message" name="message" placeholder="Cho QTSC biết thêm nhu cầu của bạn..."></textarea></div><label class="form-consent"><input type="checkbox" required><span>Tôi đồng ý với chính sách bảo vệ dữ liệu cá nhân của QTSC.</span></label><div class="form-actions"><button class="btn btn-brand" type="submit">Gửi yêu cầu <span>↗</span></button></div>`}
function openConnect(type='general'){if(!connectConfigs[type])type='general';state.connectType=type;$('#formSuccess').hidden=true;renderConnectTypes();renderConnectForm();setOverlay('#connectOverlay',true);track('connect_open',{type})}
function closeConnect(){setOverlay('#connectOverlay',false)}

function renderMobileMenu(){$('#mobileMenuContent').innerHTML=Object.entries(megaData).map(([key,d])=>`<section class="mobile-acc"><button aria-expanded="false">${d.label}<span>+</span></button><div class="mobile-acc-panel">${d.columns.flatMap(c=>c[1]).slice(0,8).map(x=>`<a href="#">${x}</a>`).join('')}</div></section>`).join('')}
function handleIntent(type){track('intent_click',{type});if(type==='technology')return $('#marketplace').scrollIntoView({behavior:'smooth'});if(type==='company')return $('#directory').scrollIntoView({behavior:'smooth'});if(type==='visit')return $('#greenSmart').scrollIntoView({behavior:'smooth'});if(type==='office')return openConnect('office');if(type==='investment')return openConnect('investment')}

// reveal observer
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');observer.unobserve(e.target)}}),{threshold:.12});$$('.reveal').forEach(x=>observer.observe(x));

$$('.nav-link').forEach(btn=>{btn.addEventListener('mouseenter',()=>openMega(btn.dataset.mega,btn));btn.addEventListener('click',()=>state.mega===btn.dataset.mega?closeMega():openMega(btn.dataset.mega,btn))});
$('#siteHeader').addEventListener('mouseleave',()=>closeMega());
window.addEventListener('scroll',()=>$('#siteHeader').classList.toggle('scrolled',scrollY>30),{passive:true});

document.addEventListener('click',e=>{
  const intent=e.target.closest('[data-intent]');if(intent)handleIntent(intent.dataset.intent);
  if(e.target.closest('[data-open-connect]'))openConnect('general');
  const direct=e.target.closest('[data-connect-type]');if(direct&&!direct.classList.contains('connect-type'))openConnect(direct.dataset.connectType);
  const filter=e.target.closest('[data-market-filter]');if(filter)setMarketCategory(filter.dataset.marketFilter);
  const st=e.target.closest('[data-search-type]');if(st){state.searchType=st.dataset.searchType;renderSearchTabs();renderGlobalResults()}
  if(e.target.closest('[data-search-result]'))closeSearch();
  const ct=e.target.closest('.connect-type');if(ct){state.connectType=ct.dataset.connectType;renderConnectTypes();renderConnectForm()}
});

$$('.eco-node').forEach(b=>b.addEventListener('click',()=>{renderEcosystem(b.dataset.eco);track('ecosystem_node',{node:b.dataset.eco})}));
$$('.tech-tab').forEach(b=>b.addEventListener('click',()=>{renderTechnology(b.dataset.tech);track('technology_tab',{tab:b.dataset.tech})}));
$('#marketForm').addEventListener('submit',e=>{e.preventDefault();renderMarketResults();track('marketplace_search',{q:$('#marketQuery').value,category:state.marketCategory})});
$('#marketQuery').addEventListener('input',renderMarketResults);$('#clearMarket').addEventListener('click',()=>{$('#marketQuery').value='';setMarketCategory('all')});
$('#companyQuery').addEventListener('input',renderCompanies);$('#companyIndustry').addEventListener('change',renderCompanies);
$('#refreshData').addEventListener('click',()=>{openData.forEach(d=>{if(Math.random()>.72)d.status=d.status==='GOOD'?'NORMAL':d.status});renderOpenData();toast('Đã mô phỏng cập nhật Open Data');track('open_data_refresh')});
$$('.map-pin').forEach(pin=>pin.addEventListener('click',()=>{$$('.map-pin').forEach(x=>x.classList.remove('active'));pin.classList.add('active');$('#mapCard').innerHTML=`<small>Campus map</small><strong>${pin.dataset.place}</strong><p>Thông tin địa điểm, doanh nghiệp và tiện ích liên quan.</p><button>Khám phá địa điểm <span>↗</span></button>`;track('map_pin_click',{place:pin.dataset.place})}));

$('#searchOpen').addEventListener('click',openSearch);$$('[data-close-search]').forEach(x=>x.addEventListener('click',closeSearch));$('#globalSearchInput').addEventListener('input',renderGlobalResults);
$$('[data-close-connect]').forEach(x=>x.addEventListener('click',closeConnect));$('#connectForm').addEventListener('submit',e=>{e.preventDefault();$('#connectForm').hidden=true;$('#connectTypes').hidden=true;$('#formSuccess').hidden=false;track('form_submit_demo',{type:state.connectType})});
$('#langToggle').addEventListener('click',()=>{state.language=state.language==='VI'?'EN':'VI';$('#langToggle').textContent=state.language;toast(`Đã chuyển giao diện sang ${state.language}`);track('language_switch',{locale:state.language})});
$('#mobileMenuOpen').addEventListener('click',()=>{$('#mobileMenu').classList.add('open');$('#mobileMenu').setAttribute('aria-hidden','false');lockBody()});
$('#mobileMenuClose').addEventListener('click',()=>{$('#mobileMenu').classList.remove('open');$('#mobileMenu').setAttribute('aria-hidden','true');lockBody()});
$('#mobileMenuContent').addEventListener('click',e=>{const btn=e.target.closest('.mobile-acc>button');if(!btn)return;const acc=btn.parentElement,open=acc.classList.toggle('open');btn.setAttribute('aria-expanded',String(open));btn.querySelector('span').textContent=open?'−':'+'});

document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openSearch()}if(e.key==='Escape'){closeSearch();closeConnect();closeMega();if($('#mobileMenu').classList.contains('open'))$('#mobileMenuClose').click()}});

// init URL filter
const queryTech=new URLSearchParams(location.search).get('technology');if(queryTech){const match=marketCats.find(x=>x.toLowerCase().replaceAll(' ','-')===queryTech);if(match)state.marketCategory=match}
renderEcosystem();renderMarketFilters();renderMarketResults();initCompanyIndustry();renderCompanies();renderOpenData();renderSearchTabs();renderGlobalResults();renderConnectTypes();renderConnectForm();renderMobileMenu();
