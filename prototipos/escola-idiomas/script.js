/* PERSONALIZE AQUI: substitua pelo WhatsApp real da instituição. */
const SCHOOL = { whatsapp: "5500000000000", message: "Olá! Vi o site e gostaria de saber mais sobre os cursos e turmas disponíveis." };
const url = `https://wa.me/${SCHOOL.whatsapp}?text=${encodeURIComponent(SCHOOL.message)}`;
document.querySelectorAll("[data-whatsapp], [data-trial]").forEach((link) => { link.href = url; link.target = "_blank"; link.rel = "noopener noreferrer"; });

const header = document.querySelector("[data-header]"); const menu = document.querySelector("[data-menu]"); const nav = document.querySelector("[data-nav]");
const closeMenu = () => { menu.setAttribute("aria-expanded", "false"); menu.setAttribute("aria-label", "Abrir menu"); nav.classList.remove("open"); document.body.classList.remove("menu-open"); };
menu.addEventListener("click", () => { if (menu.getAttribute("aria-expanded") === "true") return closeMenu(); menu.setAttribute("aria-expanded", "true"); menu.setAttribute("aria-label", "Fechar menu"); nav.classList.add("open"); document.body.classList.add("menu-open"); });
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu)); document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); }); window.addEventListener("scroll", () => header.classList.toggle("scrolled", scrollY > 20), { passive:true });

document.querySelectorAll("[data-accordion] article").forEach((item) => { const button = item.querySelector("button"); button.addEventListener("click", () => { const open = button.getAttribute("aria-expanded") === "true"; document.querySelectorAll("[data-accordion] article").forEach((entry) => { entry.classList.remove("open"); entry.querySelector("button").setAttribute("aria-expanded", "false"); }); if (!open) { item.classList.add("open"); button.setAttribute("aria-expanded", "true"); } }); });

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduced || !("IntersectionObserver" in window)) document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
else { const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } }), { threshold:.1 }); document.querySelectorAll(".reveal").forEach((el) => observer.observe(el)); }
