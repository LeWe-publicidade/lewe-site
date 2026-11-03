
const menuButton=document.querySelector(".menu-toggle");
const menu=document.querySelector(".nav");
menuButton.addEventListener("click",()=>{
 const open=menu.classList.toggle("open");
 menuButton.setAttribute("aria-expanded",String(open));
 menuButton.setAttribute("aria-label",open?"Fechar menu":"Abrir menu");
});
menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
 menu.classList.remove("open");
 menuButton.setAttribute("aria-expanded","false");
 menuButton.setAttribute("aria-label","Abrir menu");
}));
const filters=document.querySelectorAll(".filter");
const projects=document.querySelectorAll(".project");
filters.forEach(btn=>btn.addEventListener("click",()=>{
 filters.forEach(b=>{b.classList.remove("active");b.setAttribute("aria-pressed","false");});
 btn.classList.add("active");btn.setAttribute("aria-pressed","true");
 const category=btn.dataset.filter;
 projects.forEach(project=>project.hidden=category!=="todos"&&project.dataset.category!==category);
}));
const modal=document.getElementById("lightbox"),large=document.getElementById("lightbox-image"),caption=document.getElementById("lightbox-title");
document.querySelectorAll(".project-preview").forEach(btn=>btn.addEventListener("click",()=>{
 large.src=btn.dataset.image;
 large.alt=btn.querySelector("img").alt;
 caption.textContent=btn.dataset.title;
 if(typeof modal.showModal==="function")modal.showModal();
}));
document.querySelector(".lightbox-close").addEventListener("click",()=>modal.close());
modal.addEventListener("click",e=>{if(e.target===modal)modal.close();});
document.getElementById("year").textContent=new Date().getFullYear();

// Progressive enhancement: all content is visible when JavaScript is disabled.
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const revealTargets=[...document.querySelectorAll('[data-reveal]')];
if('IntersectionObserver' in window && !reduceMotion.matches){
 const observer=new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target);}});
 },{rootMargin:'0px 0px -45px 0px',threshold:0.06});
 revealTargets.forEach(el=>observer.observe(el));
 document.documentElement.classList.add('js-motion');
} else { revealTargets.forEach(el=>el.classList.add('in-view')); }
const progress=document.querySelector('#scroll-progress');
const parallax=document.querySelector('[data-parallax]');
let framePending=false;
function updateScroll(){
 const extent=document.documentElement.scrollHeight-window.innerHeight;
 const fraction=extent>0?Math.max(0,Math.min(1,window.scrollY/extent)):0;
 progress.style.transform=`scaleX(${fraction})`;
 if(parallax && !reduceMotion.matches && window.innerWidth>720){
  const offset=Math.max(-30,Math.min(30,window.scrollY*0.11));
  parallax.style.transform=`translate3d(0,${offset}px,0)`;
 }
 framePending=false;
}
window.addEventListener('scroll',()=>{if(!framePending){framePending=true;requestAnimationFrame(updateScroll);}},{passive:true});
window.addEventListener('resize',updateScroll,{passive:true});updateScroll();
// Form relies on an external hosted endpoint: first delivery requires inbox activation.
const contactForm=document.querySelector('#contact-form');
if(contactForm){
 contactForm.addEventListener('submit',()=>{
  // Native HTML POST intentionally retained for resilience and visible provider response.
  // No fabricated success message is displayed here.
 });
}
