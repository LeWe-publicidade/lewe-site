
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
