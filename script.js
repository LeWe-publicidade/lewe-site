
(() => {
  "use strict";

  // INSIRA OS NÚMEROS OFICIAIS COM DDI E DDD, SOMENTE DÍGITOS.
  // Exemplo de formato: "5511999999999".
  const WHATSAPP_SP = "";
  const WHATSAPP_FLORIPA = "";

  // MENU RESPONSIVO
  const menuButton = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav");

  if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("open");

      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
      );
    });

    menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Abrir menu");
      });
    });
  }

  // TROCA DO LOGOTIPO SOBRE SEÇÕES CLARAS
  const header = document.querySelector(".site-header");

  const lightSections = document.querySelectorAll(
    ".agency-section, .solutions-section, .gastronomy-section, .role-section, .work-section, .presence-section"
  );

  if (header && "IntersectionObserver" in window) {
    const headerObserver = new IntersectionObserver(
      entries => {
        const overLight = entries.some(entry => entry.isIntersecting);
        header.classList.toggle("is-light", overLight);
      },
      {
        rootMargin: "-88px 0px -75% 0px",
        threshold: 0
      }
    );

    lightSections.forEach(section => {
      headerObserver.observe(section);
    });
  }

  // FILTROS DO PORTFÓLIO
  const filters = [...document.querySelectorAll(".filter")];
  const projects = [...document.querySelectorAll(".project")];

  filters.forEach(button => {
    button.addEventListener("click", () => {
      filters.forEach(item => {
        const active = item === button;

        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });

      const category = button.dataset.filter;

      projects.forEach(project => {
        project.hidden =
          category !== "todos" &&
          project.dataset.category !== category;
      });
    });
  });

  // LIGHTBOX DO PORTFÓLIO
  const modal = document.getElementById("lightbox");
  const largeImage = document.getElementById("lightbox-image");
  const caption = document.getElementById("lightbox-title");

  if (modal && largeImage && caption) {
    document.querySelectorAll(".project-preview").forEach(button => {
      button.addEventListener("click", () => {
        const image = button.querySelector("img");

        largeImage.src = button.dataset.image;
        largeImage.alt = image
          ? image.alt
          : (button.dataset.title || "Imagem do portfólio");

        caption.textContent = button.dataset.title || "";

        if (typeof modal.showModal === "function") {
          modal.showModal();
        }
      });
    });

    modal.querySelector(".lightbox-close")?.addEventListener("click", () => {
      modal.close();
    });

    modal.addEventListener("click", event => {
      if (event.target === modal) {
        modal.close();
      }
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && modal.open) {
        modal.close();
      }
    });
  }

  // ANIMAÇÕES PROGRESSIVAS
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  const revealTargets = [
    ...document.querySelectorAll("[data-reveal]")
  ];

  if ("IntersectionObserver" in window && !reduceMotion.matches) {
    document.documentElement.classList.add("js-motion");

    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -55px 0px",
        threshold: 0.08
      }
    );

    revealTargets.forEach(target => {
      revealObserver.observe(target);
    });
  } else {
    revealTargets.forEach(target => {
      target.classList.add("in-view");
    });
  }

  // BARRA DE PROGRESSO E PARALLAX
  const progress = document.getElementById("scroll-progress");
  const parallax = document.querySelector("[data-parallax]");

  let framePending = false;

  function updateScroll() {
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    const fraction = maxScroll > 0
      ? Math.min(1, Math.max(0, window.scrollY / maxScroll))
      : 0;

    if (progress) {
      progress.style.transform = `scaleX(${fraction})`;
    }

    if (parallax && !reduceMotion.matches && window.innerWidth > 720) {
      const offset = Math.max(
        -24,
        Math.min(24, window.scrollY * 0.035)
      );

      parallax.style.transform = `translate3d(0,${offset}px,0)`;
    } else if (parallax) {
      parallax.style.transform = "";
    }

    framePending = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!framePending) {
        framePending = true;
        window.requestAnimationFrame(updateScroll);
      }
    },
    { passive: true }
  );

  window.addEventListener("resize", updateScroll, {
    passive: true
  });

  updateScroll();

  // PRÉ-SELEÇÃO DE CIDADE E INTERESSE NO FORMULÁRIO
  const citySelect = document.getElementById("contact-city");
  const interestSelect = document.getElementById("contact-interest");

  document.querySelectorAll("[data-location]").forEach(link => {
    link.addEventListener("click", () => {
      if (citySelect) {
        citySelect.value = link.dataset.location;
      }
    });
  });

  document.querySelectorAll("[data-interest]").forEach(link => {
    link.addEventListener("click", () => {
      if (!interestSelect) return;

      const option = [...interestSelect.options].find(item => {
        return item.text === link.dataset.interest;
      });

      if (option) {
        interestSelect.value = option.value;
      }
    });
  });

  // WHATSAPP
  // Os números só são ativados quando os contatos oficiais forem inseridos.
  document.querySelectorAll("[data-whatsapp]").forEach(link => {
    const city = link.dataset.whatsapp;

    const number = city === "sp"
      ? WHATSAPP_SP
      : WHATSAPP_FLORIPA;

    if (number) {
      const message = encodeURIComponent(
        "Olá! Gostaria de conversar com a LeWe sobre um projeto."
      );

      link.href = `https://wa.me/${number}?text=${message}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      link.href = "#contato";

      link.addEventListener("click", event => {
        event.preventDefault();

        if (citySelect) {
          citySelect.value =
            city === "sp" ? "São Paulo" : "Florianópolis";

          citySelect.focus();

          citySelect.scrollIntoView({
            behavior: reduceMotion.matches ? "auto" : "smooth",
            block: "center"
          });
        }
      });
    }
  });

  // ANO AUTOMÁTICO NO RODAPÉ
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();
