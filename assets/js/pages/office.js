/** Office/leasing interactions */
const { $, $$, toast } = window.QTSC;
const officeData={
  q1:{name:'QTSC Building 1',text:'Trụ sở QTSC · văn phòng · tiện ích nội khu',image:'https://info.qtsc.com.vn/upload/contents/qtscbuilding-B811722321392.webp'},
  helios:{name:'Helios Building',text:'Không gian văn phòng trong campus công nghệ',image:'https://www.qtsc.com.vn/uploads/files/2021/03/14/1-goc-Cong-vien-phan-mem-Quang-Trung-02.jpg'},
  sbi:{name:'SBI Building',text:'Kết nối doanh nghiệp và hệ tiện ích QTSC',image:'https://www.qtsc.com.vn/uploads/files/2018/02/12/thumbs-1200-628-2--1/qtsc_flycam_640x320.jpg'}
};
$$('[data-office]').forEach(button=>button.addEventListener('click',()=>{
  $$('[data-office]').forEach(item=>item.classList.remove('active'));button.classList.add('active');
  const data=officeData[button.dataset.office]||officeData.q1;
  $('#officeImage').src=data.image;$('#officeName').textContent=data.name;$('#officeText').textContent=data.text;
}));
$$('[data-demo-contact]').forEach(button=>button.addEventListener('click',()=>toast('Request a tour — prototype UI/UX.')));
