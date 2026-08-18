const roleData={
 researcher:['Researcher','I test where models break — from tail-risk calibration to spatial systems and blockchain governance.'],
 builder:['Builder','I turn abstract ideas into tangible experiences: games, prototypes, learning systems, and products.'],
 writer:['Writer','I use narrative to make complex systems human — from YoungArts nonfiction to poetry, books, and public storytelling.'],
 founder:['Founder','I build teams and institutions around ideas, from Serving Society to student entrepreneurship and financial-literacy initiatives.']
};
document.querySelectorAll('.identity-switcher button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.identity-switcher button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const [a,b]=roleData[btn.dataset.role];const p=document.getElementById('rolePanel');p.innerHTML=`<strong>${a}</strong><span>${b}</span>`;}));
const researchData={
 tail:['FINANCE / EXTREME EVENTS','Quantifying GBM tail-risk miscalibration','Used Monte Carlo simulation, VaR, Expected Shortfall, OLS, kurtosis, and Q-Q analysis to test how a Gaussian-based market model represents extreme losses across stocks.','https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7157698','Read paper + abstract ↗'],
 spatial:['SPATIAL SYSTEMS / UMD','Spatial modeling & ridership sensitivity','Exploring how station-level ridership and explanatory variables respond to model specification, smoothing choices, and spatial structure using generalized additive spatial approaches.','https://www.umd.edu/','University of Maryland ↗'],
 blockchain:['BLOCKCHAIN / GMU ASSIP','Account abstraction and governance','Studied ERC-4337 account abstraction, ecosystem incentives, and governance questions around adoption and coordination in Ethereum infrastructure.','https://journals.gmu.edu/jssr/article/view/5234','Published paper + abstract ↗'],
 ai:['AI ETHICS / AP CAPSTONE','Bias in predictive systems','Investigated how predictive policing systems can reproduce historical bias and how institutional choices shape the downstream consequences of technical models.','https://www.linkedin.com/in/dev-rai-948bb32a9','Research context ↗']
};
document.querySelectorAll('.research-tabs button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.research-tabs button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const [s,h,p,u,l]=researchData[btn.dataset.research];document.getElementById('researchCopy').innerHTML=`<small>${s}</small><h3>${h}</h3><p>${p}</p><a href="${u}" target="_blank" rel="noopener noreferrer">${l}</a>`;}));
const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
const glow=document.getElementById('cursorGlow');window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});
document.querySelectorAll('.tilt,.writing-card,.press-card').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(900px) rotateX(${-y*4}deg) rotateY(${x*5}deg) translateY(-3px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});
window.addEventListener('scroll',()=>document.querySelectorAll('.parallax-img').forEach(img=>{const r=img.getBoundingClientRect();img.style.transform=`translateY(${(innerHeight/2-r.top)*.025}px)`}));
const c=document.getElementById('mesh'),ctx=c.getContext('2d');let pts=[];function resize(){c.width=innerWidth*devicePixelRatio;c.height=innerHeight*devicePixelRatio;c.style.width=innerWidth+'px';c.style.height=innerHeight+'px';ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);pts=Array.from({length:Math.min(80,Math.floor(innerWidth/18))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18}))}function draw(){ctx.clearRect(0,0,innerWidth,innerHeight);for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1;ctx.fillStyle='rgba(120,160,210,.18)';ctx.fillRect(p.x,p.y,1.2,1.2)}for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const a=pts[i],b=pts[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<120){ctx.strokeStyle=`rgba(90,150,200,${.07*(1-d/120)})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}requestAnimationFrame(draw)}window.addEventListener('resize',resize);resize();draw();

// Load every cumulative portfolio enhancement in order. Creative must come only after
// the full prior project, experience, award and media refreshes have been restored.
const FULL_SITE_VERSION='2026-08-18-full-v7';
const enhancements=['refresh-style.js','core-refresh.js','experience-refresh.js','awards-refresh.js','creative-section.js','press-refresh.js'];
function loadEnhancement(src){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=`${src}?v=${encodeURIComponent(FULL_SITE_VERSION)}`;s.onload=resolve;s.onerror=()=>reject(new Error(`Failed to load ${src}`));document.body.appendChild(s)})}
enhancements.reduce((p,src)=>p.then(()=>loadEnhancement(src)),Promise.resolve()).then(()=>{
  document.documentElement.dataset.portfolioVersion=FULL_SITE_VERSION;
  // Guard against a partial/stale render: all of these are part of the intended full site.
  const required=['experience','awards','creative','press'];
  const missing=required.filter(id=>!document.getElementById(id));
  if(missing.length){
    console.warn('Portfolio refresh incomplete, retrying missing enhancement scripts:',missing);
    const retryMap={experience:'experience-refresh.js',awards:'awards-refresh.js',creative:'creative-section.js',press:'press-refresh.js'};
    missing.reduce((p,id)=>p.then(()=>loadEnhancement(`${retryMap[id]}`)),Promise.resolve());
  }
  // Ensure the nav represents the complete site, not an older cached snapshot.
  const nav=document.querySelector('.topbar nav');
  if(nav){
    const wanted=[['#story','Story'],['#build','Build'],['#research','Research'],['#experience','Experience'],['#writing','Writing'],['#creative','Creative Portfolio'],['#awards','Awards'],['#press','Press']];
    nav.innerHTML=wanted.map(([href,label])=>`<a href="${href}">${label}</a>`).join('');
  }
}).catch(err=>console.error('Portfolio enhancement load error:',err));