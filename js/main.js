'use strict';
// Skill levels are editable estimates; adjust them to match your real confidence.
const skills = {
 'Programming': {icon:'bi-code-slash', items:[['Python','Good'],['C++','Intermediate']]},
 'Artificial Intelligence': {icon:'bi-cpu', items:[['Machine Learning','Currently Learning (DEPI course)'],['Neural Networks','Intermediate'],['AI Fundamentals','Good']]},
 'Data Analysis': {icon:'bi-bar-chart', items:[['Data Analysis','Good'],['pandas','Intermediate'],['NumPy','Intermediate'],['Matplotlib','Intermediate'],['Seaborn','Intermediate'],['SQL','Intermediate']]},
 'Web Development': {icon:'bi-globe2', items:[['HTML5','Good'],['CSS3','Good'],['JavaScript','Intermediate'],['Bootstrap','Good']]},
 'Tools': {icon:'bi-tools', items:[['Git/GitHub','Intermediate'],['Jupyter Notebook','Good'],['VS Code','Good']]}
};
const courses = [
 {name:'Machine Learning',org:'DEPI',status:'Currently Enrolled',icon:'bi-robot',desc:'Currently studying Machine Learning through the Digital Egypt Pioneers Initiative (DEPI), developing practical knowledge in machine learning concepts, data processing, and model development.'},
 {name:'HCIA',org:'Huawei / NTI',status:'Completed / Studied',icon:'bi-diagram-3',desc:'Completed/Studied Huawei HCIA training through NTI.'},
 {name:'HCIP',org:'Huawei / NTI',status:'Studied',icon:'bi-hdd-network',desc:'Studied Huawei HCIP training through NTI.'},
 {name:'Data Analysis',org:'Online Course',status:'Completed',icon:'bi-graph-up',desc:'Completed an online Data Analysis course covering data analysis concepts and practical tools.'},
 {name:'Web Design',org:'NTI',status:'Completed',icon:'bi-palette',desc:'Completed a Web Design course at NTI covering web design and front-end development fundamentals.'}
];
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

function renderStatic() {
 $('#skillsGrid').innerHTML = Object.entries(skills).map(([cat, d]) => `<div class="col-md-6 col-lg-4 reveal"><div class="card-x"><h3><i class="bi ${d.icon} me-2" aria-hidden="true"></i>${cat}</h3>${d.items.map(([n, l]) => `<div class="skill-item"><span>${n}</span><span class="level">${l}</span></div>`).join('')}</div></div>`).join('');
 $('#coursesGrid').innerHTML = courses.map(c => `<div class="col-md-6 col-lg-4 reveal"><article class="card-x"><i class="bi ${c.icon} course-icon" aria-hidden="true"></i><h3 class="mt-2">${c.name}</h3><p class="mb-1 muted">${c.org}</p><p class="status">${c.status}</p><p class="muted mb-0">${c.desc}</p></article></div>`).join('');
}

function initTheme() {
 const root = document.documentElement, btn = $('#themeToggle'), icon = $('i', btn);
 const set = t => { root.dataset.theme = t; icon.className = t === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars'; try { localStorage.setItem('theme', t); } catch {} };
 let saved = 'dark'; try { saved = localStorage.getItem('theme') || 'dark'; } catch {}
 set(saved);
 btn.addEventListener('click', () => set(root.dataset.theme === 'dark' ? 'light' : 'dark'));
}

function initScroll() {
 const nav = $('#nav'), top = $('#toTop'), bar = $('#progress');
 const links = $$('.nav-link'), sections = links.map(l => $(l.getAttribute('href')));
 const onScroll = () => {
  const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
  nav.classList.toggle('scrolled', y > 40); top.classList.toggle('show', y > 600);
  bar.style.width = (max > 0 ? y / max * 100 : 0) + '%';
  let cur = 0; sections.forEach((s, i) => { if (s && s.offsetTop - 120 <= y) cur = i; });
  links.forEach((l, i) => { l.classList.toggle('active', i === cur); i === cur ? l.setAttribute('aria-current', 'page') : l.removeAttribute('aria-current'); });
 };
 addEventListener('scroll', onScroll, {passive: true}); onScroll();
 top.addEventListener('click', () => scrollTo({top: 0, behavior: 'smooth'}));
 $$('.navbar-nav .nav-link').forEach(l => l.addEventListener('click', () => bootstrap.Collapse.getInstance('#menu')?.hide()));
}

function initReveal() {
 const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }), {threshold: .12});
 $$('.reveal').forEach(el => io.observe(el));
 const cio = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return; cio.unobserve(e.target);
  const end = +e.target.dataset.count; let n = 0;
  const t = setInterval(() => { n++; e.target.textContent = n; if (n >= end) clearInterval(t); }, 250);
 }), {threshold: 1});
 $$('[data-count]').forEach(el => { el.textContent = '0'; cio.observe(el); });
}

document.addEventListener('DOMContentLoaded', () => {
 renderStatic(); initTheme(); initScroll(); initReveal();
 $('#year').textContent = new Date().getFullYear();
 $$('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el));
});
window.addEventListener('load', () => $('#loader').classList.add('done'));
