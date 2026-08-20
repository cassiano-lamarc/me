const whatsappUrl =
  "https://wa.me/5571983202118?text=Hi%2C%20I%20came%20here%20from%20your%20website%20and%20I%20would%20like%20to%20talk%20about%20a%20job%20opportunity.";

// Pendente: preencher somente quando o Instagram pessoal real for confirmado.
const personalInstagramUrl = "";

const clients = [
  "Salut Hortifruti",
  "Petrobras",
  "Banco do Nordeste",
  "FIEB",
  "Bradesco",
  "Hydro",
  "LeadLovers",
  "Mottu",
  "Campaign Deputy",
  "Itaú",
  "SEFAZ-BA",
  "Unimed",
  "Ambev",
  "Zeroum.bet",
];

const translations = {
  pt: {
    navAbout: "Sobre",
    navExperience: "Experiência",
    navClients: "Clientes",
    navSkills: "Tecnologias",
    navContact: "Contato",
    heroEyebrow: "Portfólio profissional",
    name: "Cassiano Lamarc",
    headline: "Senior Full Stack Software Engineer",
    subheadline:
      "Especialista em .NET, Angular, IA, Cloud e arquitetura de software para aplicações corporativas escaláveis.",
    heroDescription:
      "Engenheiro de Software Full Stack Sênior com mais de 8 anos de experiência no desenvolvimento de aplicações web escaláveis, APIs robustas, sistemas financeiros, plataformas SaaS, soluções cloud-native e produtos digitais de alta performance.",
    stack:
      ".NET | Angular | IA | Cloud | SQL Server | PostgreSQL | Clean Architecture",
    ctaExperience: "Ver experiências",
    ctaResume: "Baixar currículo",
    ctaContact: "Entrar em contato",
    aboutEyebrow: "Sobre",
    aboutTitle: "Engenharia sênior para produtos digitais robustos.",
    aboutText:
      "Cassiano Lamarc Lima de Oliveira é Senior Full Stack Software Engineer com atuação em projetos corporativos, financeiros, logísticos e SaaS. Sua experiência combina backend com .NET, frontend com Angular, bancos SQL Server e PostgreSQL, arquitetura limpa, cloud, DevOps e interesse aplicado em IA para soluções digitais inteligentes.",
    experienceEyebrow: "Experiência",
    experienceTitle: "Trajetória recente e impacto",
    experienceIntro:
      "Experiências em ordem cronológica natural, mostrando a evolução da base técnica até os projetos enterprise atuais.",
    clientsEyebrow: "Clientes",
    clientsTitle: "Clientes e empresas atendidas",
    clientsDescription:
      "Experiência em projetos para empresas de diferentes segmentos, incluindo financeiro, bancário, indústria, governo, saúde, logística, marketing digital e tecnologia.",
    skillsEyebrow: "Tecnologias",
    skillsTitle: "Stack, arquitetura e inovação",
    workEyebrow: "Locais aceitáveis de trabalho",
    workTitle: "Disponibilidade",
    landingEyebrow: "Soluções digitais para negócios",
    landingTitle: "Landing Pages profissionais",
    landingText:
      "Sites rápidos, responsivos e pensados para apresentar seu negócio com profissionalismo, gerar confiança e transformar visitantes em novos contatos e clientes.",
    landingCta: "Ver protótipos de Landing Pages",
    landingContact: "Solicitar orçamento",
    contactEyebrow: "Contato",
    contactTitle: "Contato",
    contactText:
      "Entre em contato para oportunidades remotas, internacionais, consultorias, projetos .NET, Angular, cloud, IA ou arquitetura de software.",
    contactEmail: "E-mail: cacassiano2011@gmail.com",
    copyEmail: "Copiar",
    copySuccess: "E-mail copiado.",
    resumeHref: "../assets/docs/cassiano-lamarc-cv-pt.pdf",
    resumeDownload: "Cassiano-Lamarc-CV-PT.pdf",
    workPreferences: [
      "Remoto internacional",
      "Remoto nacional",
      "Híbrido, dependendo da localização",
      "Presencial, mediante proposta e localização",
      "Disponível para realocação",
    ],
    skills: [
      {
        title: "Backend",
        items: "C#, .NET, ASP.NET Core, Web APIs, Entity Framework Core, DDD, CQRS, REST",
      },
      {
        title: "Frontend",
        items: "Angular 9-19, TypeScript, JavaScript, PrimeNG, Angular Material, Bootstrap",
      },
      {
        title: "Banco de dados",
        items: "SQL Server, PostgreSQL, Redis Cache",
      },
      {
        title: "Cloud & DevOps",
        items: "Azure DevOps, GitHub Actions, CI/CD, Docker, Kubernetes, GitFlow",
      },
      {
        title: "IA & Inovação",
        items:
          "Pós-graduação em IA para Devs pela FIAP, experiência acadêmica com chatbot para unidades públicas de saúde e interesse aplicado em soluções inteligentes para produtos digitais.",
      },
      {
        title: "Arquitetura & Boas práticas",
        items:
          "Clean Architecture, Hexagonal Architecture, SOLID, TDD, Repository Pattern, Clean Code",
      },
      {
        title: "Testes & Observabilidade",
        items: "xUnit, NUnit, Jasmine, Karma, Datadog",
      },
    ],
    experiences: [
      {
        title: "G4F - Software Engineer",
        period: "Nov 2023 – Atual",
        clients: "SEFAZ-BA | Ambev / AB InBev",
        description:
          "Atuação em projetos estratégicos para grandes instituições brasileiras, incluindo sistemas financeiros, bancários e plataformas corporativas de análise de indicadores.\n\nNa SEFAZ-BA, trabalhou em sistema financeiro e bancário mission-critical utilizado para controle de contas governamentais e operações fiscais, desenvolvendo serviços backend seguros e escaláveis com .NET 6 e .NET 8, frontend com Angular 12 a 19 e APIs orientadas por Clean Architecture.\n\nNa Ambev, atuou no desenvolvimento de uma plataforma de gestão de KPIs para monitoramento de indicadores estratégicos e desempenho de negócio, com foco em performance, escalabilidade, filtros, visualizações analíticas e padronização de componentes frontend.",
        tech: [
          ".NET 6",
          ".NET 8",
          "Angular 12-19",
          "PostgreSQL",
          "SQL Server",
          "Azure DevOps",
          "Clean Architecture",
          "Scrum",
        ],
      },
      {
        title: "Mottu - Software Engineer",
        period: "Jan 2022 – Nov 2023",
        clients: "Mottu Entregas",
        description:
          "Atuação na plataforma Mottu Entregas, sistema logístico de grande escala utilizado em operações de delivery em todo o Brasil.\n\nDesenvolveu e manteve APIs, fluxos frontend e funcionalidades para operações de entrega em tempo real, contribuindo para melhoria de performance, confiabilidade e estabilidade em ambiente de produção.",
        tech: [".NET", "Angular 9+", "SQL Server", "PostgreSQL", "GitHub", "Azure DevOps"],
      },
      {
        title: "LeadLovers - Software Engineer",
        period: "Ago 2020 – Dez 2021",
        clients: "LeadLovers",
        description:
          "Atuação em startup SaaS de marketing digital, trabalhando em funcionalidades para captura de leads, email marketing, automações e landing pages dinâmicas.\n\nContribuiu para desenvolvimento de funcionalidades escaláveis, manutenção de sistemas legados e modernização gradual de componentes.",
        tech: [".NET Framework MVC", ".NET Core", "AngularJS", "SQL Server"],
      },
      {
        title: "Capgemini - Software Engineer",
        period: "Jul 2019 – Ago 2020",
        clients: "Bradesco | Banco do Nordeste | FIEB | Hydro",
        description:
          "Consultor de software em projetos corporativos para grandes empresas brasileiras, atuando em ambientes com requisitos rigorosos de compliance, integrações e grandes bases de código.\n\nTrabalhou em diferentes domínios de negócio, apoiando desenvolvimento, manutenção evolutiva e sustentação de aplicações empresariais.",
        tech: [".NET", "Angular", "SQL Server"],
      },
      {
        title: "Sonda - Software Engineer",
        period: "Nov 2018 – Jul 2019",
        clients: "Petrobras",
        description:
          "Alocado na Petrobras, atuando na manutenção e evolução de mais de 10 aplicações corporativas.\n\nResponsável por ajustes, melhorias, correções e evolução técnica de sistemas internos, com foco em estabilidade e continuidade operacional.",
        tech: [".NET", "JavaScript"],
      },
      {
        title: "Salut - Software Developer",
        period: "Dez 2017 – Nov 2018",
        clients: "Salut Hortifruti",
        description:
          "Primeira atuação profissional focada em modernização de sistemas legados e desenvolvimento de aplicações internas.\n\nRealizou migração de sistemas VB6 para C# Windows Forms, desenvolvimento de Web Forms, integrações com banco de dados e melhorias em sistemas operacionais da empresa.",
        tech: ["C#", "Web Forms", "Windows Forms", "SQL Server", "JavaScript", "Bootstrap"],
      },
    ],
  },
  en: {
    navAbout: "About",
    navExperience: "Experience",
    navClients: "Clients",
    navSkills: "Technologies",
    navContact: "Contact",
    heroEyebrow: "Professional portfolio",
    name: "Cassiano Lamarc",
    headline: "Senior Full Stack Software Engineer",
    subheadline:
      "Specialized in .NET, Angular, AI, Cloud, and software architecture for scalable enterprise applications.",
    heroDescription:
      "Senior Full Stack Software Engineer with 8+ years of experience building scalable web applications, robust APIs, financial systems, SaaS platforms, cloud-native solutions, and high-performance digital products.",
    stack:
      ".NET | Angular | AI | Cloud | SQL Server | PostgreSQL | Clean Architecture",
    ctaExperience: "View experience",
    ctaResume: "Download resume",
    ctaContact: "Get in touch",
    aboutEyebrow: "About",
    aboutTitle: "Senior engineering for robust digital products.",
    aboutText:
      "Cassiano Lamarc Lima de Oliveira is a Senior Full Stack Software Engineer working across enterprise, financial, logistics, and SaaS projects. His experience combines .NET backend development, Angular frontend applications, SQL Server and PostgreSQL databases, clean architecture, cloud, DevOps, and applied interest in AI for intelligent digital solutions.",
    experienceEyebrow: "Experience",
    experienceTitle: "Recent career path and impact",
    experienceIntro:
      "Experiences in natural chronological order, showing the evolution from the technical foundation of his career to current enterprise projects.",
    clientsEyebrow: "Clients",
    clientsTitle: "Clients and companies served",
    clientsDescription:
      "Experience delivering projects across financial services, banking, industry, government, healthcare, logistics, digital marketing, and technology.",
    skillsEyebrow: "Technologies",
    skillsTitle: "Stack, architecture, and innovation",
    workEyebrow: "Acceptable work locations",
    workTitle: "Availability",
    landingEyebrow: "Digital solutions for businesses",
    landingTitle: "Professional Landing Pages",
    landingText:
      "Fast, responsive websites designed to present your business professionally, build trust, and turn visitors into new contacts and customers.",
    landingCta: "View Landing Page prototypes",
    landingContact: "Request a quote",
    contactEyebrow: "Contact",
    contactTitle: "Contact",
    contactText:
      "Get in touch for remote opportunities, international roles, consulting, .NET projects, Angular applications, cloud solutions, AI initiatives, or software architecture.",
    contactEmail: "Email: cacassiano2011@gmail.com",
    copyEmail: "Copy",
    copySuccess: "Email copied.",
    resumeHref: "../assets/docs/cassiano-lamarc-cv-en.pdf",
    resumeDownload: "Cassiano-Lamarc-CV-EN.pdf",
    workPreferences: [
      "International remote",
      "Brazil-based remote",
      "Hybrid, depending on location",
      "On-site, depending on proposal and location",
      "Open to relocation",
    ],
    skills: [
      {
        title: "Backend",
        items: "C#, .NET, ASP.NET Core, Web APIs, Entity Framework Core, DDD, CQRS, REST",
      },
      {
        title: "Frontend",
        items: "Angular 9-19, TypeScript, JavaScript, PrimeNG, Angular Material, Bootstrap",
      },
      {
        title: "Databases",
        items: "SQL Server, PostgreSQL, Redis Cache",
      },
      {
        title: "Cloud & DevOps",
        items: "Azure DevOps, GitHub Actions, CI/CD, Docker, Kubernetes, GitFlow",
      },
      {
        title: "AI & Innovation",
        items:
          "Postgraduate studies in AI for Developers at FIAP, academic experience building a chatbot for public healthcare units, and applied interest in intelligent solutions for digital products.",
      },
      {
        title: "Architecture & Best Practices",
        items:
          "Clean Architecture, Hexagonal Architecture, SOLID, TDD, Repository Pattern, Clean Code",
      },
      {
        title: "Testing & Observability",
        items: "xUnit, NUnit, Jasmine, Karma, Datadog",
      },
    ],
    experiences: [
      {
        title: "G4F - Software Engineer",
        period: "Nov 2023 – Present",
        clients: "SEFAZ-BA | Ambev / AB InBev",
        description:
          "Worked on strategic projects for major Brazilian institutions, including financial systems, banking platforms, and enterprise KPI analytics solutions.\n\nAt SEFAZ-BA, contributed to a mission-critical financial and banking control system used to manage government accounts and fiscal operations, building secure and scalable backend services with .NET 6 and .NET 8, frontend solutions with Angular 12 to 19, and APIs guided by Clean Architecture.\n\nAt Ambev, worked on a KPI management platform for monitoring business performance and strategic indicators, focusing on performance, scalability, filtering, analytics visualization, and frontend component standardization.",
        tech: [
          ".NET 6",
          ".NET 8",
          "Angular 12-19",
          "PostgreSQL",
          "SQL Server",
          "Azure DevOps",
          "Clean Architecture",
          "Scrum",
        ],
      },
      {
        title: "Mottu - Software Engineer",
        period: "Jan 2022 – Nov 2023",
        clients: "Mottu Entregas",
        description:
          "Worked on Mottu Entregas, a large-scale logistics and delivery platform operating nationwide in Brazil.\n\nBuilt and maintained APIs, frontend workflows, and real-time delivery features, contributing to system performance, reliability, and production stability.",
        tech: [".NET", "Angular 9+", "SQL Server", "PostgreSQL", "GitHub", "Azure DevOps"],
      },
      {
        title: "LeadLovers - Software Engineer",
        period: "Aug 2020 – Dec 2021",
        clients: "LeadLovers",
        description:
          "Worked at a digital marketing SaaS startup, developing features for lead capture, email marketing, automation flows, and dynamic landing pages.\n\nContributed to scalable feature development, legacy system maintenance, and gradual component modernization.",
        tech: [".NET Framework MVC", ".NET Core", "AngularJS", "SQL Server"],
      },
      {
        title: "Capgemini - Software Engineer",
        period: "Jul 2019 – Aug 2020",
        clients: "Bradesco | Banco do Nordeste | FIEB | Hydro",
        description:
          "Software consultant working on enterprise projects for major Brazilian companies, operating in environments with strict compliance requirements, integrations, and large codebases.\n\nWorked across different business domains, supporting development, evolutionary maintenance, and enterprise application sustainability.",
        tech: [".NET", "Angular", "SQL Server"],
      },
      {
        title: "Sonda - Software Engineer",
        period: "Nov 2018 – Jul 2019",
        clients: "Petrobras",
        description:
          "Contracted to Petrobras, maintaining and evolving more than 10 enterprise applications.\n\nResponsible for improvements, fixes, maintenance, and technical evolution of internal systems, focusing on stability and operational continuity.",
        tech: [".NET", "JavaScript"],
      },
      {
        title: "Salut - Software Developer",
        period: "Dec 2017 – Nov 2018",
        clients: "Salut Hortifruti",
        description:
          "Early professional role focused on legacy system modernization and internal application development.\n\nMigrated systems from VB6 to C# Windows Forms, developed Web Forms applications, implemented database integrations, and improved operational systems.",
        tech: ["C#", "Web Forms", "Windows Forms", "SQL Server", "JavaScript", "Bootstrap"],
      },
    ],
  },
};

const i18nElements = document.querySelectorAll("[data-i18n]");
const languageToggle = document.querySelector(".language-toggle");
const downloadButton = document.querySelector("[data-resume-download]");
const experienceSection = document.querySelector("#experience");
const experienceCard = document.querySelector(".experience-card");
const experienceTitle = document.querySelector("[data-exp-title]");
const experienceDescription = document.querySelector("[data-exp-description]");
const experienceTech = document.querySelector("[data-exp-tech]");
const experiencePeriod = document.querySelector("[data-exp-period]");
const experienceClients = document.querySelector("[data-exp-clients]");
const progressContainer = document.querySelector("[data-progress]");
const careerSteps = document.querySelector("[data-career-steps]");
const previousExperienceButton = document.querySelector("[data-exp-prev]");
const nextExperienceButton = document.querySelector("[data-exp-next]");
const skillsGrid = document.querySelector("[data-skills-grid]");
const workGrid = document.querySelector("[data-work-grid]");
const logoTrack = document.querySelector("[data-logo-track]");
const copyEmailButton = document.querySelector("[data-copy-email]");
const copyStatus = document.querySelector("[data-copy-status]");

let currentLanguage = "pt";
let currentExperience = 0;
let isSwitching = false;
let wheelLockUntil = 0;

function applyTranslations(language) {
  const dictionary = translations[language];
  document.documentElement.lang = language === "pt" ? "pt-BR" : "en";

  i18nElements.forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) {
      element.textContent = dictionary[key];
    }
  });

  downloadButton.href = dictionary.resumeHref;
  downloadButton.download = dictionary.resumeDownload;

  renderExperience(currentExperience);
  renderSkills();
  renderWorkPreferences();
}

function getExperienceItems() {
  return translations[currentLanguage].experiences.slice().reverse();
}

function renderExperience(index) {
  const items = getExperienceItems();
  const experience = items[index];

  progressContainer.innerHTML = "";
  items.forEach((_, dotIndex) => {
    const dot = document.createElement("span");
    dot.className = "progress-dot";
    dot.classList.toggle("active", dotIndex <= index);
    progressContainer.appendChild(dot);
  });

  experienceTitle.textContent = experience.title;
  experienceDescription.textContent = experience.description;
  experiencePeriod.textContent = experience.period;
  experienceClients.textContent = experience.clients;

  careerSteps.innerHTML = "";
  items.forEach((item, stepIndex) => {
    const step = document.createElement("span");
    const company = item.title.split(" - ")[0];
    step.textContent = `${company} · ${item.period}`;
    step.classList.toggle("active", stepIndex === index);
    careerSteps.appendChild(step);
  });

  experienceTech.innerHTML = "";
  experience.tech.forEach((tech) => {
    const tag = document.createElement("span");
    tag.textContent = tech;
    experienceTech.appendChild(tag);
  });

  previousExperienceButton.disabled = index === 0;
  nextExperienceButton.disabled = index === items.length - 1;
}

function renderSkills() {
  skillsGrid.innerHTML = "";
  translations[currentLanguage].skills.forEach((group) => {
    const article = document.createElement("article");
    article.className = "skill-card";

    const title = document.createElement("h3");
    title.textContent = group.title;

    const text = document.createElement("p");
    text.textContent = group.items;

    article.append(title, text);
    skillsGrid.appendChild(article);
  });
}

function renderWorkPreferences() {
  workGrid.innerHTML = "";
  translations[currentLanguage].workPreferences.forEach((preference) => {
    const item = document.createElement("span");
    item.textContent = preference;
    workGrid.appendChild(item);
  });
}

function renderClientCarousel() {
  logoTrack.innerHTML = "";
  [...clients, ...clients].forEach((client) => {
    const card = document.createElement("div");
    card.className = "logo-card";
    card.textContent = client;
    logoTrack.appendChild(card);
  });
}

function copyText(value) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(value);
  }

  const input = document.createElement("textarea");
  input.value = value;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  input.remove();
  return Promise.resolve();
}

function switchExperience(nextIndex) {
  const items = getExperienceItems();
  if (nextIndex < 0 || nextIndex >= items.length || isSwitching) return;

  isSwitching = true;
  experienceCard.classList.add("is-switching");

  window.setTimeout(() => {
    currentExperience = nextIndex;
    renderExperience(currentExperience);
    experienceCard.classList.remove("is-switching");
    window.setTimeout(() => {
      isSwitching = false;
    }, 240);
  }, 180);
}

function shouldControlExperienceScroll(event) {
  if (window.matchMedia("(max-width: 900px)").matches) return false;

  const bounds = experienceSection.getBoundingClientRect();
  const lastExperienceIndex = getExperienceItems().length - 1;
  const sectionCenterIsVisible = bounds.top <= 120 && bounds.bottom >= window.innerHeight;
  const scrollingDownInside = event.deltaY > 0 && currentExperience < lastExperienceIndex;
  const scrollingUpInside = event.deltaY < 0 && currentExperience > 0;

  return sectionCenterIsVisible && (scrollingDownInside || scrollingUpInside);
}

window.addEventListener(
  "wheel",
  (event) => {
    const now = Date.now();
    if (!shouldControlExperienceScroll(event) || now < wheelLockUntil) return;

    event.preventDefault();
    wheelLockUntil = now + 680;
    switchExperience(currentExperience + (event.deltaY > 0 ? 1 : -1));
  },
  { passive: false }
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

languageToggle.addEventListener("click", () => {
  currentLanguage = currentLanguage === "pt" ? "en" : "pt";
  applyTranslations(currentLanguage);
});

previousExperienceButton.addEventListener("click", () => {
  switchExperience(currentExperience - 1);
});

nextExperienceButton.addEventListener("click", () => {
  switchExperience(currentExperience + 1);
});

copyEmailButton.addEventListener("click", () => {
  copyText("cacassiano2011@gmail.com").then(() => {
    copyStatus.textContent = translations[currentLanguage].copySuccess;
    window.setTimeout(() => {
      copyStatus.textContent = "";
    }, 2200);
  });
});

renderClientCarousel();
applyTranslations(currentLanguage);
