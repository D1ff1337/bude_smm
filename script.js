document.documentElement.classList.add('js');

// ===== Поява блоків при скролі =====
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('h2,.facts3,.grid2 article,.note,.cd,.bub,.spk,.rows li,.wcard,.pill-t,.dcard,.tc,.f3,.case').forEach(el=>{el.classList.add('rv');io.observe(el)});

// ===== Фіксована кнопка: з’являється після першого екрана, ховається на фіналі =====
const st=document.getElementById('sticky'),hero=document.querySelector('.hero'),fin=document.getElementById('final');
if(st&&hero)new IntersectionObserver(([e])=>st.classList.toggle('show',e.intersectionRatio<.5),{threshold:[0,.5,1]}).observe(hero);
if(st&&fin)new IntersectionObserver(([e])=>st.classList.toggle('hide',e.isIntersecting),{threshold:.25}).observe(fin);

// ===== Результати учнів (15 порожніх місць під фото) =====
document.getElementById('cases').innerHTML=Array.from({length:15},()=>'<div class="case"><div></div></div>').join('');

// ===== Акордеони: відкрито лише один пункт =====
['.prog','.faq'].forEach(sel=>{
  const ds=[...document.querySelectorAll(sel+' details')];
  ds.forEach(d=>d.addEventListener('toggle',()=>{if(d.open)ds.forEach(o=>{if(o!==d)o.open=false})}));
});

// ===== Кейси: стрілки, перетягування мишкою, горизонтальне колесо =====
(function(){
  const cs=document.getElementById('cases'),pv=document.getElementById('csPrev'),nx=document.getElementById('csNext');
  if(!cs)return;
  const step=()=>Math.max(200,cs.clientWidth*.8);
  const upd=()=>{if(pv)pv.disabled=cs.scrollLeft<4;if(nx)nx.disabled=cs.scrollLeft>cs.scrollWidth-cs.clientWidth-4};
  pv&&pv.addEventListener('click',()=>cs.scrollBy({left:-step(),behavior:'smooth'}));
  nx&&nx.addEventListener('click',()=>cs.scrollBy({left:step(),behavior:'smooth'}));
  cs.addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd();
  let down=false,sx=0,sl=0,moved=false;
  cs.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;down=true;moved=false;sx=e.clientX;sl=cs.scrollLeft});
  addEventListener('pointermove',e=>{if(!down)return;const dx=e.clientX-sx;if(Math.abs(dx)>4){moved=true;cs.classList.add('drag')}cs.scrollLeft=sl-dx});
  addEventListener('pointerup',()=>{down=false;cs.classList.remove('drag')});
  cs.addEventListener('wheel',e=>{if(Math.abs(e.deltaX)>Math.abs(e.deltaY))return;if(!e.shiftKey)return;e.preventDefault();cs.scrollLeft+=e.deltaY},{passive:false});
})();
