const siteConfig = { whatsapp: "5571983202118", whatsappMessage: "Olá! Vim pelo site da Lamarc Tech e gostaria de conversar sobre uma solução para minha empresa.", instagram: "" /* Pendente: preencher somente quando o perfil empresarial real for confirmado. */ };
const services = [
  { icon:"AI",title:"IA e automação",problem:"Atendimento e tarefas manuais consomem a equipe.",solution:"Chatbots, triagem de contatos, assistentes virtuais, notificações e integrações entre ferramentas.",benefit:"Mais organização, agilidade e produtividade, com aplicação prática de IA." },
  { icon:"WEB",title:"Sites e presença digital",problem:"A empresa não tem um canal próprio que transmita confiança.",solution:"Sites empresariais, landing pages, portfólios, catálogos e páginas para campanhas, integrados aos seus canais.",benefit:"Uma presença profissional, responsiva e preparada para gerar novas oportunidades." },
  { icon:"SYS",title:"Sistemas sob medida",problem:"Planilhas e processos improvisados limitam a operação.",solution:"Sistemas web, painéis, dashboards, APIs e ferramentas internas adaptadas ao fluxo do negócio.",benefit:"Informação centralizada, menos trabalho manual e uma operação pronta para evoluir." },
  { icon:"MAP",title:"Consultoria e estrutura digital",problem:"Há muitas ferramentas, mas falta um plano conectado.",solution:"Diagnóstico de processos, planejamento digital e estrutura tecnológica para atendimento, leads e campanhas.",benefit:"Decisões mais claras e investimento direcionado ao que realmente gera valor." }
];
const projects = [
  {title:"GHÊ GHÊ",segment:"Música",type:"Projeto realizado",text:"Site oficial do cantor GHÊ GHÊ, com biografia, agenda, vídeos e contato para contratação de shows.",image:"assets/projects/ghe-ghe.jpg",link:"/gheghe/"},
  {title:"HardApply",segment:"Produto digital",type:"Projeto online",text:"Sistema para organizar candidaturas, entrevistas, currículos e notificações, reunindo front-end, back-end, autenticação, banco de dados e automações.",image:"https://hardapply.com.br/assets/brand/hard-apply-logo.png",link:"https://hardapply.com.br/"},
  {title:"Fiscal Help",segment:"Aplicação web",type:"Projeto realizado",text:"Projeto web desenvolvido por Cassiano Lamarc. Conheça o FiscalHelp e explore a aplicação pelo link abaixo.",image:"assets/projects/fiscalhelp.svg",link:"https://fiscalhelp.cacassiano2011.workers.dev/",external:true},
  {title:"Projeto Social",segment:"Esporte e comunidade",type:"Protótipo",text:"Site para comunicar uma causa, aproximar participantes e abrir caminhos para apoio, voluntariado e parcerias.",image:"prototipos/projeto-social/assets/logo-karate-social.jpeg",link:"prototipos/projeto-social/index.html"}
];
const moreProjects = [
  {title:"Lamarc English",link:"Lamarc-english/"},
  {title:"Entre Pautas",link:"entre-pautas/"},
  {title:"MV Eletrodiesel",link:""},
  {title:"Luiz Envelopamento",link:"https://luizenvelopamento.com.br/"},
  {title:"Jessik Turismo",link:"prototipos/jessikturismo/index.html"},
  {title:"Refrigeração e climatização",link:"prototipos/refrigeracao/index.html"},
  {title:"Escolas e cursos",link:"prototipos/escola-idiomas/index.html"},
  {title:"Comunicação política",link:"prototipos/politico/index.html"}
];
const whatsappUrl=`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;
document.querySelectorAll("[data-whatsapp]").forEach(link=>{link.href=whatsappUrl;link.target="_blank";link.rel="noopener noreferrer"});
document.querySelector("[data-services]").innerHTML=services.map(item=>`<article class="service-card reveal"><span class="card-icon">${item.icon}</span><h3>${item.title}</h3><p><strong>O desafio</strong>${item.problem}</p><p><strong>A solução</strong>${item.solution}</p><p class="benefit">${item.benefit}</p><a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer">Conversar sobre esta solução <span>↗</span></a></article>`).join("");
document.querySelector("[data-projects]").innerHTML=projects.map(item=>{const blankAttrs=' target="_blank" rel="noopener noreferrer"';const image=`<img src="${item.image}" alt="Prévia do ${item.type.toLowerCase()} ${item.title}" loading="lazy" width="720" height="480">`;const media=item.image?(item.link?`<a class="project-image" href="${item.link}"${blankAttrs}>${image}</a>`:`<div class="project-image">${image}</div>`):`<div class="project-image project-placeholder" aria-hidden="true"><span>LT</span><strong>${item.segment}</strong></div>`;const action=item.link?`<a href="${item.link}"${blankAttrs}>Ver projeto <span>→</span></a>`:`<span class="project-no-link">Em breve</span>`;return `<article class="project-card reveal">${media}<div class="project-body"><div class="project-meta"><span>${item.type}</span><span>${item.segment}</span></div><h3>${item.title}</h3><p>${item.text}</p>${action}</div></article>`}).join("");
document.querySelector("[data-more-projects]").innerHTML = moreProjects.map(({title, link}) => {
  const entry = link
    ? `<a href="${link}" target="_blank" rel="noopener noreferrer">${title} <span aria-hidden="true">↗</span></a>`
    : `<span>${title} <small>Em breve</small></span>`;
  return `<li>${entry}</li>`;
}).join("");
document.querySelector("[data-year]").textContent=new Date().getFullYear();
const toggle=document.querySelector(".menu-toggle"),nav=document.querySelector(".nav");toggle.addEventListener("click",()=>{const open=toggle.getAttribute("aria-expanded")==="true";toggle.setAttribute("aria-expanded",String(!open));nav.classList.toggle("is-open",!open)});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("is-open");toggle.setAttribute("aria-expanded","false")}));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
