'use strict';
// Edit this array to add or change projects. "[Add ...]" values are placeholders for the owner to fill in.
const PH = '[Add information here]';
const projects = [
 {id:'cars',title:'Cars Marketplace Web Page',cat:'Web Development',label:'Web Development / Web Design',type:'Academic / Training Web Project',team:'Not specified',
  desc:'A responsive car marketplace web project inspired by car listing platforms. The project includes car brands, images, navigation, and a search-by-brand feature.',
  tech:['HTML','CSS','JavaScript','Bootstrap'],features:['Car brands and images','Navigation','Search by brand','Mercedes-Benz brand section with image and text'],challenges:PH,results:PH,role:PH,github:'',demo:''},
 {id:'clothes',title:'Clothes E-Commerce Website',cat:'Web Development',label:'Web Development / E-Commerce',type:'College Team Project',team:'Team project',
  desc:'A team-based college e-commerce project for clothing products, designed to demonstrate web development, product presentation, and e-commerce concepts.',
  tech:['HTML','CSS','JavaScript','Bootstrap'],features:['Product presentation','E-commerce concepts'],challenges:PH,results:PH,role:PH,github:'',demo:''},
 {id:'ai',title:'Artificial Intelligence College Project',cat:'AI',label:'Artificial Intelligence',type:'Academic Team Project',team:'Team project',
  desc:'An academic team project developed as part of the Artificial Intelligence curriculum, applying AI concepts to a practical problem. [Add project-specific description here]',
  tech:['Python','AI / Machine Learning concepts'],features:PH,challenges:PH,results:PH,role:PH,github:'',demo:''},
 {id:'nn',title:'Neural Network Project',cat:'AI',label:'Artificial Intelligence / Neural Networks',type:'Academic Team Project',team:'Team project',
  desc:'An academic team project focused on Neural Network concepts and their practical implementation. Problem: [Add] · Dataset: [Add] · Model: [Add] · Results: [Add]',
  tech:['Python','Neural Networks'],features:'Problem: [Add] / Dataset: [Add] / Model: [Add]',challenges:PH,results:'[Add results]',role:PH,github:'',demo:''},
 {id:'da',title:'Data Analysis Project',cat:'Data Analysis',label:'Data Analysis',type:'Academic Team Project',team:'Team project',
  desc:'An academic team project focused on analyzing data, extracting insights, and presenting meaningful results using Python-based data analysis tools. Dataset: [Add] · Main Questions: [Add] · Key Findings: [Add] · Visualizations: [Add]',
  tech:['Python','pandas','NumPy','Matplotlib','Seaborn'],features:'Dataset: [Add] / Main Questions: [Add] / Visualizations: [Add]',challenges:PH,results:'Key Findings: [Add]',role:PH,github:'',demo:''},
 {id:'net',title:'Huawei Networking Projects',cat:'Networking',label:'Networking',type:'Academic / Training',team:'Not specified',
  desc:'Academic and training-related projects connected to Huawei networking studies. More projects can be added here later.',
  tech:['Networking','Huawei technologies','Network fundamentals'],features:PH,challenges:PH,results:PH,role:PH,github:'',demo:''}
];
// "Machine Learning" has no matching project yet; the filter is ready for future ML projects.
const categories = ['All','AI','Machine Learning','Data Analysis','Web Development','Networking'];
const hues = {AI:'#6C63FF','Machine Learning':'#8B5CF6','Data Analysis':'#00C2FF','Web Development':'#6C63FF',Networking:'#8B5CF6'};
const cover = p => 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${hues[p.cat]}"/><stop offset="1" stop-color="#0B1020"/></linearGradient></defs><rect width="640" height="360" fill="url(#g)"/><text x="320" y="190" fill="#fff" fill-opacity=".85" font-family="Arial" font-size="30" text-anchor="middle">${p.cat}</text></svg>`);
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const link = (url, label, icon) => url ? `<a class="btn btn-outline-brand btn-sm" href="${esc(url)}" target="_blank" rel="noopener"><i class="bi ${icon}"></i> ${label}</a>` : `<button class="btn btn-outline-brand btn-sm" type="button" disabled>${label}: [Add link]</button>`;

function renderProjects(list) {
 document.getElementById('projectGrid').innerHTML = list.map(p => `<div class="col-md-6 col-lg-4"><article class="card-x project">
  <div class="thumb"><img src="${cover(p)}" alt="${esc(p.title)} cover" loading="lazy" width="640" height="360"></div>
  <div class="body"><div class="cat">${esc(p.label)}${p.team === 'Team project' ? '<span class="team">Team Project</span>' : ''}</div>
  <h3>${esc(p.title)}</h3><p class="muted">${esc(p.desc)}</p>
  <div class="tags">${p.tech.map(t => `<span>${esc(t)}</span>`).join('')}</div>
  <div class="d-flex flex-wrap gap-2 mt-auto">${link(p.github, 'GitHub', 'bi-github')}${p.demo ? link(p.demo, 'Live Demo', 'bi-box-arrow-up-right') : ''}
  <button class="btn btn-brand btn-sm" type="button" data-project="${p.id}">View Details</button></div></div></article></div>`).join('');
 document.getElementById('noResults').classList.toggle('d-none', list.length > 0);
}

function showDetails(id) {
 const p = projects.find(x => x.id === id);
 document.getElementById('pmTitle').textContent = p.title;
 const feats = Array.isArray(p.features) ? `<ul>${p.features.map(f => `<li>${esc(f)}</li>`).join('')}</ul>` : `<p>${esc(p.features)}</p>`;
 document.getElementById('pmBody').innerHTML = `<img class="rounded mb-3" src="${cover(p)}" alt="${esc(p.title)} cover" width="640" height="360">
  <p>${esc(p.desc)}</p><dl class="row">
  <dt class="col-sm-4">Project type</dt><dd class="col-sm-8">${esc(p.type)}</dd>
  <dt class="col-sm-4">Team / Individual</dt><dd class="col-sm-8">${esc(p.team)}</dd>
  <dt class="col-sm-4">My role</dt><dd class="col-sm-8">${esc(p.role)}</dd>
  <dt class="col-sm-4">Technologies</dt><dd class="col-sm-8">${p.tech.map(esc).join(', ')}</dd>
  <dt class="col-sm-4">Main features</dt><dd class="col-sm-8">${feats}</dd>
  <dt class="col-sm-4">Challenges</dt><dd class="col-sm-8">${esc(p.challenges)}</dd>
  <dt class="col-sm-4">Results</dt><dd class="col-sm-8">${esc(p.results)}</dd></dl>
  <div class="d-flex gap-2">${link(p.github, 'GitHub', 'bi-github')}${link(p.demo, 'Live Demo', 'bi-box-arrow-up-right')}</div>`;
 bootstrap.Modal.getOrCreateInstance('#projectModal').show();
}

function initProjects() {
 let active = 'All';
 const search = document.getElementById('projectSearch'), bar = document.getElementById('filters');
 bar.innerHTML = categories.map(c => `<button type="button" class="filter-btn${c === 'All' ? ' active' : ''}" data-cat="${c}" aria-pressed="${c === 'All'}">${c}</button>`).join('');
 const apply = () => {
  const q = search.value.trim().toLowerCase();
  renderProjects(projects.filter(p => (active === 'All' || p.cat === active) && (p.title + p.desc + p.tech.join(' ') + p.label).toLowerCase().includes(q)));
 };
 bar.addEventListener('click', e => {
  const b = e.target.closest('.filter-btn'); if (!b) return;
  active = b.dataset.cat;
  bar.querySelectorAll('.filter-btn').forEach(x => { x.classList.toggle('active', x === b); x.setAttribute('aria-pressed', x === b); });
  apply();
 });
 search.addEventListener('input', apply);
 document.getElementById('projectGrid').addEventListener('click', e => { const b = e.target.closest('[data-project]'); if (b) showDetails(b.dataset.project); });
 apply();
}
document.addEventListener('DOMContentLoaded', initProjects);
