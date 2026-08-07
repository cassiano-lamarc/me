/* PERSONALIZE AQUI: substitua pelo WhatsApp real da empresa antes de enviar o link. */
const BUSINESS = {
  whatsapp: "5500000000000",
  message: "Olá! Vi o site e gostaria de solicitar um orçamento para serviço de ar-condicionado."
};

const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(BUSINESS.message)}`;
document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  link.href = whatsappUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

const header = document.querySelector("[data-header]");
const menu = document.querySelector("[data-menu]");
const nav = document.querySelector("[data-nav]");
const closeMenu = () => {
  menu.setAttribute("aria-expanded", "false");
  menu.setAttribute("aria-label", "Abrir menu");
  nav.classList.remove("open");
  document.body.classList.remove("menu-open");
};

menu.addEventListener("click", () => {
  const isOpen = menu.getAttribute("aria-expanded") === "true";
  if (isOpen) return closeMenu();
  menu.setAttribute("aria-expanded", "true");
  menu.setAttribute("aria-label", "Fechar menu");
  nav.classList.add("open");
  document.body.classList.add("menu-open");
});
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });
window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 18), { passive: true });

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...nav.querySelectorAll("a")];
const setActiveLink = () => {
  const current = sections.reduce((active, section) => window.scrollY >= section.offsetTop - 150 ? section.id : active, "inicio");
  navLinks.forEach((link) => {
    const active = link.getAttribute("href") === `#${current}`;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page"); else link.removeAttribute("aria-current");
  });
};
window.addEventListener("scroll", setActiveLink, { passive: true });

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reducedMotion || !("IntersectionObserver" in window)) {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
} else {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
  }), { threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}
