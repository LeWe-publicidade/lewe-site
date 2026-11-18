(() => {
  "use strict";

  // Preencha com os números oficiais, incluindo DDI e DDD, somente dígitos.
  const WHATSAPP_SP = "";
  const WHATSAPP_FLORIPA = "";

  const menuButton = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav");
  if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
      const opened = menu.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(opened));
      menuButton.setAttribute("aria-label", opened ? "Fechar menu" : "Abrir menu");
    });
    menu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      menu.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menu");
    }));
  }

  // Alterna a versão do logotipo quando o cabeçalho passa sobre uma seção clara.
  const header = document.querySelector(".site-header");
  const lightSections = document.querySelectorAll(".agency-section,.solutions-section,.gastronomy-section,.role-section,.work-section,.presence-section");
  if (header && "IntersectionObserver" in window) {
    const headerObserver = new IntersectionObserver(entries => {
      const overLight = entries.some(entry => entry.isIntersecting);
      header.classList.toggle("is-light", overLight);
    }, { rootMargin: "-88px 0px -75% 0px", threshold: 0 });
    lightSections.forEach(section => headerObserver.observe(section));
  }

  // Filtros de portfólio.
  const filters = [...document.querySelectorAll(".filter")];
  const projects = [...document.querySelectorAll(".project")];
  filters.forEach(button => button.addEventListener("click", () => {
    filters.forEach(item => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    const category = button.dataset.filter;
    projects.forEach(project => { project.hidden = category !== "todos" && project.dataset.category !== category; });
  }));

  // Lightbox com fechamento por botão, clique no fundo ou tecla Escape.
  const modal = document.getElementById("lightbox");
  const largeImage = document.getElementById("lightbox-image");
  const caption = document.getElementById("lightbox-title");
  if (modal && largeImage && caption) {
    document.querySelectorAll(".project-preview").forEach(button => button.addEventListener("click", () => {
      const image = button.querySelector("img");
      largeImage.src = button.dataset.image;
      largeImage.alt = image ? image.alt : (button.dataset.title || "Imagem do portfólio");
      caption.textContent = button.dataset.title || "";
      if (typeof modal.showModal === "function") modal.showModal();
    }));
    modal.querySelector(".lightbox-close")?.addEventListener("click", () => modal.close());
    modal.addEventListener("click", event => { if (event.target === modal) modal.close(); });
  }

  // Animações progressivas, respeitando a preferência por movimento reduzido.
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const revealTargets = [...document.querySelectorAll("[data-reveal]")];
  if ("IntersectionObserver" in window && !reduceMotion.matches) {
    document.documentElement.classList.add("js-motion");
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("in-view"); revealObserver.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -55px 0px", threshold: 0.08 });
    revealTargets.forEach(target => revealObserver.observe(target));
  } else revealTargets.forEach(target => target.classList.add("in-view"));

  // Barra de progresso e parallax discreto.
  const progress = document.getElementById("scroll-progress");
  const parallax = document.querySelector("[data-parallax]");
  let framePending = false;
  function updateScroll() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const fraction = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
    if (progress) progress.style.transform = `scaleX(${fraction})`;
    if (parallax && !reduceMotion.matches && window.innerWidth > 720) {
      const offset = Math.max(-24, Math.min(24, window.scrollY * 0.035));
      parallax.style.transform = `translate3d(0,${offset}px,0)`;
    } else if (parallax) parallax.style.transform = "";
    framePending = false;
  }
  window.addEventListener("scroll", () => {
    if (!framePending) { framePending = true; window.requestAnimationFrame(updateScroll); }
  }, { passive: true });
  window.addEventListener("resize", updateScroll, { passive: true });
  updateScroll();

  // Pré-seleciona cidade e área de interesse ao acessar o formulário.
  const citySelect = document.getElementById("contact-city");
  const interestSelect = document.getElementById("contact-interest");
  document.querySelectorAll("[data-location]").forEach(link => link.addEventListener("click", () => {
    if (citySelect) citySelect.value = link.dataset.location;
  }));
  document.querySelectorAll("[data-interest]").forEach(link => link.addEventListener("click", () => {
    if (!interestSelect) return;
    const option = [...interestSelect.options].find(item => item.text === link.dataset.interest);
    if (option) interestSelect.value = option.value;
  }));

  // Os links de WhatsApp só recebem URL quando os números oficiais forem configurados.
  document.querySelectorAll("[data-whatsapp]").forEach(link => {
    const city = link.dataset.whatsapp;
    const number = city === "sp" ? WHATSAPP_SP : WHATSAPP_FLORIPA;
    if (number) {
      const message = encodeURIComponent("Olá! Gostaria de conversar com a LeWe sobre um projeto.");
      link.href = `https://wa.me/${number}?text=${message}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      link.href = "#contato";
      link.addEventListener("click", event => {
        event.preventDefault();
        if (citySelect) {
          citySelect.value = city === "sp" ? "São Paulo" : "Florianópolis";
          citySelect.focus();
          citySelect.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "center" });
        }
      });
    }
  });

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
