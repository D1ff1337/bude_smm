document.documentElement.classList.add('js');
const slides=[...document.querySelectorAll('.slide')];
slides.forEach((s,i)=>{
  const mk=(c,t)=>{const d=document.createElement('div');d.className=c;d.textContent=t;s.appendChild(d)};
  mk('tl','Amina Kryvenda');mk('tr','2026');mk('bl','2026');
  mk('br',String(i+1).padStart(3,'0')+'.');
});
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.2});
document.querySelectorAll('h2,.logo').forEach(el=>io.observe(el));

/* акордеон «Для кого» (на телефоні) */
const rows=[...document.querySelectorAll('.row')];
rows.forEach(r=>{
  r.tabIndex=0;r.setAttribute('role','button');
  const t=()=>{const o=r.classList.contains('open');rows.forEach(x=>{x.classList.remove('open');x.setAttribute('aria-expanded','false')});if(!o){r.classList.add('open');r.setAttribute('aria-expanded','true')}};
  r.addEventListener('click',t);
  r.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();t()}});
});
if(rows[0]){rows[0].classList.add('open');rows[0].setAttribute('aria-expanded','true')}

/* кожен розділ точно вміщується в екран: за потреби масштабуємо вміст */
const MAXW=1200;
function fit(s){
  const i=s.querySelector('.inner');if(!i)return;
  ['transform','width','maxWidth','marginLeft','marginBottom','transformOrigin'].forEach(p=>i.style[p]='');
  const cs=getComputedStyle(s);
  const avail=s.clientHeight-parseFloat(cs.paddingTop)-parseFloat(cs.paddingBottom);
  if(i.offsetHeight<=avail)return;
  const apply=k=>{
    i.style.maxWidth='none';
    i.style.width=`calc(min(100%,${MAXW}px)/${k})`;
    i.style.marginLeft=`calc((100% - min(100%,${MAXW}px))/2)`;
    i.style.transformOrigin='top left';
    i.style.transform=`scale(${k})`;
    return i.offsetHeight*k;
  };
  let lo=.4,hi=1,best=lo;
  for(let n=0;n<10;n++){const m=(lo+hi)/2;if(apply(m)<=avail){best=m;lo=m}else hi=m}
  apply(best);
  i.style.marginBottom=`${-(i.offsetHeight*(1-best))}px`;
}
const fitAll=()=>slides.forEach(fit);
let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(fitAll,120)});
addEventListener('orientationchange',()=>setTimeout(fitAll,250));
addEventListener('load',fitAll);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fitAll);
fitAll();

/* мобільна кнопка: з’являється, коли перший екран пішов */
const st=document.getElementById('sticky'),hero=document.querySelector('.hero');
if(st&&hero)new IntersectionObserver(([e])=>st.classList.toggle('show',e.intersectionRatio<.6),{threshold:[0,.6,1]}).observe(hero);

// ===== Програма курсу: перемикач модулів =====
const M=[
["Початок",["Організація та система навчання","Мислення, рішення й дії, які приводять до результату","Ефективна постановка цілей"]],
["Робота зі страхами",["Страх почати працювати","Страх шукати клієнтів і продавати послуги","Робота з установками","Додаткова Zoom-лекція з психологом"],"психологиня Катерина Сарданова"],
["Складові SMM",["SMM на сучасному ринку","З чого складається робота SMM-спеціаліста","Різні типи просування бізнесу й бренду","Основи маркетингу та роль стратегії","Різновиди ніш у SMM"]],
["Основи маркетингу",["Визначення цілей бізнесу","Аналіз ринку та ніші","Аналіз конкурентів","Аналіз і сегментація цільової аудиторії","Потреби, болі, заперечення та мотивація клієнтів","Формування позиціонування"]],
["Побудова упаковки",["Формування упаковки профілю","Візуальна концепція","Позиціонування та ключові повідомлення","Побудова контентної частини маркетингу"]],
["Контент-стратегія",["Рубрикатор контенту","SMM-стратегія та її структура","Побудова легкої стратегії за 8 кроків","Побудова контент-плану","Воронки продажів і способи їх використання","Зв’язок між контентом і задачами бізнесу"]],
["Стратегія просування",["Методи та канали просування","Побудова стратегії просування","Співпраця з блогерами","UGC-маркетинг","Конкурсні механіки","Органічне та платне просування"]],
["Створення контенту",["Налаштування камери, техніка мобільної зйомки","Світло, реквізит і фони","Організація контент-зйомки","Монтаж відео / Обробка фото","Корисні застосунки для роботи з контентом"],"Анна Лащенко"],
["Копірайтинг і stories",["Де знаходити ідеї для контенту","Копірайтинг у SMM","Тексти під різні задачі","Алгоритми та формати stories","Побудова сторітелінгу","Сенси, оформлення та корисні застосунки"]],
["Дизайн у Figma",["Основи роботи у Figma","Створення дизайну для соцмереж","Робота з плагінами","Огляд матеріалів та інструментів для дизайну"],"Анастасія Галич"],
["Таргетована реклама",["Роль таргету в загальній стратегії просування","Підготовка проєкту до запуску реклами","Створення рекламних креативів і оферів","Вибір аудиторій на основі проведеного аналізу","Аналіз рекламних показників та оптимізація кампаній"],"Кирил Благоверов"],
["Аналітика та звітність",["Показники, які потрібно відстежувати","Як аналізувати контент і просування","Звіт як стратегічний інструмент","Як презентувати результати клієнту","Як використовувати звітність для продовження співпраці"]],
["TikTok",["Успішний старт у TikTok","Алгоритми платформи","Контент-стратегія","Формати відео","Лідогенерація через TikTok","Окремий Zoom-розбір і брейншторм"],"Вікторія Колесник та Ілля Косенко"],
["Упаковка власного профілю",["Упаковка профілю SMM-спеціаліста","Експертний та особистий контент","Стимулювання заявок через Instagram","Додаткова Zoom-лекція про особистий бренд"]],
["Пошук клієнтів і продажі",["Формування товарної лінійки","Пакети послуг і ціноутворення","Упаковка портфоліо","Види консультацій","Пошук клієнтів онлайн та офлайн","Система продажів та проведення зідзвонів / переговорів","Робота із запереченнями","Практикум із продажів"]],
["Закордонний ринок і масштабування",["Особливості роботи на закордонному ринку","Конкуренція та ціноутворення","Канали й способи пошуку клієнтів"],"Ксенія Кузина"],
["Організація робочих процесів",["Тайм-менеджмент","Пошук і підбір помічника","Набір команди","Перехід від спеціаліста до власника команди або агенції","Створення власних продуктів: гайдів, чеклістів, консультацій і курсів"]],
["ШІ та комунікація з клієнтами",["ChatGPT як робочий інструмент","Промпти для контенту, текстів та ідей","Використання нейромереж для аналітики й організації роботи","Комунікація з клієнтом на різних етапах співпраці","Робота з правками та складними ситуаціями"]],
["Відкриття ФОП",["Коли потрібно відкривати ФОП","Реєстрація та вибір форми роботи","Оподаткування","Базові організаційні питання легальної роботи"],"Юлія Корнічук"]
];
const tabs=document.getElementById('tabs'),mod=document.getElementById('mod');
let cur=0;
function show(i,scroll){
  cur=i;
  [...tabs.children].forEach((b,k)=>b.setAttribute('aria-selected',k===i));
  const [t,l,by]=M[i];
  mod.innerHTML='<div class="pn"><button data-d="-1" aria-label="Попередній модуль">←</button><button data-d="1" aria-label="Наступний модуль">→</button></div><div class="mn">Модуль '+i+'</div><h3>'+t+'</h3>'+(by?'<span class="by">з експертом: '+by+'</span>':'')+'<ul>'+l.map(x=>'<li>'+x+'</li>').join('')+'</ul>';
  
}
M.forEach((m,i)=>{const b=document.createElement('button');b.className='tb';b.setAttribute('role','tab');b.innerHTML='<i>'+String(i).padStart(2,'0')+'</i><em>'+m[0]+'</em>';b.setAttribute('aria-label','Модуль '+i+': '+m[0]);b.onclick=()=>show(i);tabs.appendChild(b)});
mod.onclick=e=>{const d=e.target.closest('[data-d]');if(d)show((cur+ +d.dataset.d+M.length)%M.length,true)};
show(0);

// ===== Результати учнів (15 заглушок: фото + сума) =====
document.getElementById('cases').innerHTML=Array.from({length:15},()=>'<div class="c"><div>фото</div><span>00 000 грн</span></div>').join('');

// ===== FAQ: відкрито лише одне питання =====
const fd=[...document.querySelectorAll('.faq details')];
fd.forEach(d=>d.addEventListener('toggle',()=>{if(d.open)fd.forEach(o=>{if(o!==d)o.open=false})}));

// ===== Ховаємо плаваючу кнопку на фінальному екрані =====
const fin=document.getElementById('final');
if(fin&&st)new IntersectionObserver(([e])=>st.classList.toggle('hide',e.isIntersecting),{threshold:.3}).observe(fin);
