/** Explore/map interactions */
const { $$ } = window.QTSC;
$$('.place-card').forEach((card,index)=>card.addEventListener('click',()=>{
  $$('.place-card').forEach(item=>item.classList.remove('active'));card.classList.add('active');
  $$('.explore-pin').forEach(pin=>pin.style.boxShadow='0 0 0 9px rgba(241,118,44,.18)');
  const pin=$$('.explore-pin')[index];
  if(pin) pin.style.boxShadow='0 0 0 15px rgba(241,118,44,.25),0 0 25px rgba(241,118,44,.6)';
}));
