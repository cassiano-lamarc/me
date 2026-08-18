// Links fornecidos pela agência e contatos pendentes centralizados aqui.
// Substitua os valores null apenas quando as URLs oficiais forem confirmadas.
const SITE_LINKS = {
  whatsapp: "https://wa.me/5571997212767",
  packages: "https://www.jessikturismo.com.br/",
  instagram: "https://www.instagram.com/jessik.turismo/",
  whatsappGroup: "https://chat.whatsapp.com/K7LYZUVTkbjCWtnB5LfTIF",
  evelyn: null,        // TODO: inserir contato oficial da Evelyn
  testimonials: "https://www.instagram.com/s/aGlnaGxpZ2h0OjE3ODc3MjY0MzgwNjE4MTAw?igshid=MDJmNzVkMjY%3D"
};

const whatsappUrl = (message) =>
  `${SITE_LINKS.whatsapp}?text=${encodeURIComponent(message)}`;

document.querySelectorAll(".js-whatsapp").forEach((link) => {
  link.href = whatsappUrl(link.dataset.message || "Olá! Vim pelo site da Jessik Turismo.");
});

document.querySelectorAll(".js-package-link").forEach((link) => link.href = SITE_LINKS.packages);
document.querySelectorAll(".js-instagram-link").forEach((link) => link.href = SITE_LINKS.instagram);

document.querySelectorAll(".js-optional-link").forEach((link) => {
  const url = SITE_LINKS[link.dataset.linkKey];
  if (url) {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  } else {
    link.classList.add("is-disabled");
    link.setAttribute("aria-disabled", "true");
    link.addEventListener("click", (event) => event.preventDefault());
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
}
