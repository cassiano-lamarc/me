/* PERSONALIZE AQUI: use somente dados reais e autorizados antes da publicação. */
const CAMPAIGN = {
  whatsapp: "5500000000000",
  message: "Olá! Vi o protótipo demonstrativo e gostaria de conversar com a equipe."
};

const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");

const closeMenu = () => {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menu");
  nav.classList.remove("is-open");
  document.body.classList.remove("menu-open");
};

menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  if (open) return closeMenu();
  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "Fechar menu");
  nav.classList.add("is-open");
  document.body.classList.add("menu-open");
});

nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });
window.addEventListener("scroll", () => header.classList.toggle("is-scrolled", window.scrollY > 24), { passive: true });

const whatsappUrl = `https://wa.me/${CAMPAIGN.whatsapp}?text=${encodeURIComponent(CAMPAIGN.message)}`;
document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  link.href = whatsappUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

document.querySelectorAll("[data-placeholder-link]").forEach((link) => link.addEventListener("click", (event) => event.preventDefault()));

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reducedMotion || !("IntersectionObserver" in window)) {
  document.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
}
