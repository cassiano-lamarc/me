import { candidates } from './candidates.js';
import { proposals, proposalById, levels, options, expectations, answerLabel } from './data.js';
import { createSession, answer } from './session.js';
import { calculate, isComparable, exclusion } from './score.js';
import { initDetails, openDetails } from './details.js';
import { showAd } from './ads.js';
import { summaryText, resultTitle, downloadBlob } from './report.js';
import { socialImage, invalidateSocial } from './export-image.js';
import { shareFile, nativeShare, canShareFile } from './share.js';
const app=document.getElementById('app'), status=document.getElementById('status');
let level='simple', session=null, screen='home', readyFile=null, busy=false;
const previewUrls=new Map();
const esc=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const btn=(action,label,kind='secondary')=>`<button type="button" class="${kind}" data-action="${action}">${label}</button>`;
const comparableCount=key=>levels[key].ids.filter(id=>isComparable(proposalById[id])).length;
function notify(text){status.textContent=text;}
function releaseUrls(scope){for(const [url,kind] of previewUrls){if(!scope||kind===scope){URL.revokeObjectURL(url);previewUrls.delete(url);}}}
function releasePreviews(){releaseUrls();readyFile=null;}
function objectUrl(blob,scope='social'){const url=URL.createObjectURL(blob);previewUrls.set(url,scope);return url;}
function render(focus=true){
  releasePreviews();notify('');
  app.classList.toggle('home-screen',screen==='home');
  showAd(screen==='quiz'?'quizTop':screen==='result'?'result':'home');
  if(screen==='home') renderHome();else if(screen==='quiz')renderQuiz();else renderResult();
  app.querySelectorAll('img[data-portrait]').forEach(img=>img.addEventListener('error',()=>{img.hidden=true;img.nextElementSibling.hidden=false;},{once:true}));
  if(focus){
    const heading=app.querySelector('h1');
    heading.tabIndex=-1;
    heading.focus({preventScroll:true});
    const top=screen==='quiz'?Math.max(0,window.scrollY+heading.getBoundingClientRect().top-20):0;
    window.scrollTo({top,behavior:'instant'});
  }
}
function renderHome(){
  app.innerHTML=`<p class="eyebrow">Afinidade política, com contexto</p><h1>Antes dos nomes,<br>vamos às pautas.</h1><p class="lead">O que você pensa sobre as propostas? Compare suas respostas com registros públicos de <strong>Lula</strong> e <strong>Flávio Bolsonaro</strong>.</p><h2>Até onde vamos?</h2><div class="levels" role="group" aria-label="Profundidade da pesquisa">${Object.entries(levels).map(([key,item])=>`<button type="button" class="level" data-level="${key}" aria-pressed="${key===level}"><strong>${item.label}</strong><span>${item.ids.length} perguntas</span><span>${comparableCount(key)} comparáveis<br>${item.ids.length-comparableCount(key)} exploratórias</span></button>`).join('')}</div>${btn('start','Iniciar pesquisa →','primary wide')}<p class="notice"><strong>Base beta em revisão:</strong> nesta edição, apenas duas pautas históricas de 2023 têm evidências correspondentes dos dois. Os demais temas ajudam na reflexão e não pontuam. Mais perguntas não significam maior precisão.</p><p class="notice">Suas respostas ficam só na memória desta aba. Recarregar ou fechar a página encerra a sessão. Não há login, armazenamento de opiniões ou envio automático.</p>`;
}
function renderQuiz(){
  const id=session.questionOrder[session.index],p=proposalById[id],selected=session.answersByQuestionId[id],comparable=isComparable(p);
  app.innerHTML=`<div class="quiz-meta"><span>Pesquisa ${levels[session.level].label}</span><span>Pergunta ${session.index+1} de ${session.questionOrder.length}</span></div><progress value="${session.index+1}" max="${session.questionOrder.length}" aria-label="Progresso do questionário"></progress><p class="eyebrow">${esc(p.category)}</p><span class="badge">${comparable?'Comparável • registro histórico de 2023':'Exploratória • não entra no cálculo'}</span><div class="question-heading"><h1>${esc(p.title)}</h1><button type="button" class="info-button" data-action="details" aria-label="Mais detalhes da proposta">ⓘ</button></div><p class="notice">${comparable?'Considere o recorte histórico da pergunta, sem presumir uma posição atual.':'Ainda não há evidência suficiente dos dois para comparar este recorte.'}</p><div class="options" role="radiogroup" aria-label="Sua posição">${options.map((o,i)=>`<button type="button" class="option" role="radio" aria-checked="${selected===o.id}" tabindex="${selected?selected===o.id?0:-1:i===0?0:-1}" data-answer="${o.id}"><span class="option-icon" aria-hidden="true">${o.icon}</span><span><strong>${o.label}</strong><small>${o.description}</small></span></button>`).join('')}</div><div class="actions"><button type="button" class="secondary" data-action="back" ${session.index===0?'disabled':''}>← Voltar</button><button type="button" class="primary" data-action="next" ${!selected?'disabled':''}>${session.index===session.questionOrder.length-1?'Ver resultado':'Continuar →'}</button></div><button type="button" class="text-button" data-action="restart">Começar outra pesquisa</button>`;
}
function photo(c){return `<img class="portrait" data-portrait src="${c.photo}" alt="Retrato de ${esc(c.name)}"><span class="photo-fallback" hidden aria-label="Foto indisponível">${c.initials}</span>`;}
function sources(p){return candidates.map(c=>{const pos=p.positions[c.id];return `<div><p><strong>${c.name}:</strong> ${['favor','against'].includes(pos.stance)?answerLabel(pos.stance):'Sem evidência suficiente'} • conferência: ${esc(pos.verifiedAt||'pendente')}</p><p>${esc(pos.note||'')}</p><ul>${pos.sources.map(s=>`<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer">${esc(s.title)}</a> • ${esc(s.date)}<br>${esc(s.summary)}</li>`).join('')}</ul></div>`;}).join('');}
function renderResult(){
  const score=calculate(session,proposals);
  app.innerHTML=`<p class="eyebrow">Seu mapa de coincidências</p><h1 class="result-title">${esc(resultTitle(score))}</h1><p class="lead">${!score.denominator?'Não houve respostas elegíveis para calcular percentuais. Você ainda pode revisar suas respostas ou baixar a imagem do resultado.':score.leaders.length===2?'Os dois tiveram o mesmo número de coincidências. Os percentuais são independentes e não precisam somar 100%.':'Este resultado descreve apenas coincidências com as propostas elegíveis que você respondeu.'}</p><p class="notice"><strong>Base ${score.denominator<5?'pequena':'utilizada'}: ${score.denominator} respostas elegíveis de ${session.questionOrder.length} perguntas.</strong> ${score.denominator<5?'Uma base tão restrita limita bastante a interpretação. ':''}Depende, Sem opinião e pautas exploratórias não entram no cálculo. Registros históricos não são promessas eleitorais atuais.</p><div class="candidate-grid">${score.results.map(c=>`<article class="candidate">${photo(c)}<h3>${c.name}</h3><span class="percent">${c.percent===null?'—':c.percent+'%'}</span><p>${c.count} de ${score.denominator} coincidências</p><p class="source-note">${esc(c.bio)}</p>${c.matches.length?`<ul>${c.matches.map(p=>`<li>${esc(p.category)}: ${esc(p.title)}<br>Sua resposta: ${answerLabel(session.answersByQuestionId[p.id])}</li>`).join('')}</ul>`:'<p class="source-note">Nenhuma coincidência elegível nesta sessão.</p>'}</article>`).join('')}</div><p class="source-note">Fotos: Lula — Ricardo Stuckert/PR, <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank" rel="noopener noreferrer">CC BY 2.0</a>; Flávio Bolsonaro — Carlos Moura/Agência Senado, <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>. Recortes no quadro. <a href="assets/candidates/ATTRIBUTION.md">Fontes das fotos</a>.</p><details class="panel"><summary>Ver divergências e como o cálculo funciona</summary>${score.results.map(c=>`<h3>${c.name}</h3>${c.divergences.length?`<ul>${c.divergences.map(p=>`<li>${esc(p.title)} — você: ${answerLabel(session.answersByQuestionId[p.id])}; registro: ${answerLabel(p.positions[c.id].stance)}</li>`).join('')}</ul>`:'<p>Nenhuma divergência elegível.</p>'}`).join('')}<p>Cada pauta elegível vale um ponto. Percentual = coincidências ÷ respostas elegíveis × 100. Ambos podem pontuar na mesma pauta. Valores arredondados ao inteiro mais próximo.</p></details><section class="panel" id="sharing"><h2>Compartilhe seu resultado</h2><p>Baixe a imagem e publique no Instagram, TikTok ou onde preferir. O sistema do aparelho define os apps disponíveis.</p><div class="actions">${btn('prepare-share','Compartilhar nas redes','primary')}${btn('social','Baixar imagem')}</div><div id="social-preview" class="export-preview"></div><p class="notice">A imagem não inclui sua resposta à pergunta opcional abaixo.</p></section><section class="panel"><h2>O resultado foi o que você esperava?</h2><label for="expectation" class="notice">Opcional. Fica só nesta sessão e não altera o cálculo.</label><select id="expectation" class="expectation"><option value="">Não respondida</option>${expectations.map(text=>`<option value="${esc(text)}" ${session.expectation===text?'selected':''}>${esc(text)}</option>`).join('')}</select><button type="button" class="text-button" data-action="clear-expectation">Limpar resposta opcional</button></section><details class="panel" id="review"><summary>Revisar todas as respostas e consultar fontes (${session.questionOrder.length})</summary>${session.questionOrder.map((id,i)=>{const p=proposalById[id];return `<article class="review-item"><h3>${i+1}. ${esc(p.title)}</h3><p><strong>Sua resposta: ${answerLabel(session.answersByQuestionId[id])}</strong></p><p>${exclusion(p,session.answersByQuestionId[id])}</p><button type="button" class="secondary" data-edit="${i}">Revisar esta resposta</button><details><summary>Fontes, datas e ressalvas</summary>${sources(p)}</details></article>`;}).join('')}</details><div class="actions">${btn('review','Revisar desde o início')}${btn('restart','Nova pesquisa')}</div>`;
}
async function withBusy(task){
  if(busy)return;busy=true;notify('Preparando imagem…');
  const controls=[...app.querySelectorAll('button,select')];controls.forEach(el=>{el.dataset.wasDisabled=String(el.disabled);el.disabled=true;});
  try{await task();}catch{notify('Não foi possível concluir. Suas respostas foram mantidas. Tente novamente; suas respostas continuam disponíveis.');}
  finally{busy=false;controls.forEach(el=>{if(el.isConnected){el.disabled=el.dataset.wasDisabled==='true';delete el.dataset.wasDisabled;}});}
}
function previewSocial(blob){
  releaseUrls('social');
  readyFile=shareFile(blob);const container=document.getElementById('social-preview');
  const image=document.createElement('img');image.src=objectUrl(blob);image.alt='Prévia do resultado para redes, sem expectativa opcional.';
  container.replaceChildren(image);
  const p=document.createElement('p');p.className='notice';p.textContent='Prévia • 1080 × 1920. Confira antes de compartilhar.';container.append(p);
  const help=document.createElement('p');help.className='notice';
  help.textContent=canShareFile(readyFile)?'Imagem pronta. Toque novamente em “Compartilhar nas redes” para escolher um app.':'Seu aparelho não permite compartilhar esta imagem diretamente. Use “Baixar imagem” e publique no app de sua preferência.';
  container.append(help);
}
async function act(action,trigger){
  if(busy)return;
  if(action==='start'){session=createSession(level);invalidateSocial();screen='quiz';render();}
  if(action==='back'&&session.index>0){session.index--;render();}
  if(action==='next'&&session.answersByQuestionId[session.questionOrder[session.index]]){if(session.index===session.questionOrder.length-1)screen='result';else session.index++;render();}
  if(action==='details'){const p=proposalById[session.questionOrder[session.index]];openDetails(p.title,[p.details,`Exemplo de efeito prático: ${p.example}`,p.conditions],trigger);}
  if(action==='restart'){openRestart(trigger);}
  if(action==='confirm-restart'){document.getElementById('details').close();session=null;invalidateSocial();screen='home';render();}
  if(action==='review'){screen='quiz';session.index=0;render();}
  if(action==='clear-expectation'){session.expectation='';document.getElementById('expectation').value='';notify('Resposta opcional removida.');}
  if(action==='prepare-share'&&readyFile){
    if(!canShareFile(readyFile)){notify('Use “Baixar imagem” e publique no app de sua preferência.');return;}
    // Segundo toque abre a folha nativa diretamente no gesto do usuário.
    try{const result=await nativeShare(readyFile,summaryText(session,proposals));notify(result==='cancelled'?'Compartilhamento cancelado. Suas respostas foram mantidas.':'Compartilhamento concluído.');}catch{notify('O aparelho não conseguiu compartilhar. Use “Baixar imagem” para publicar.');}
    return;
  }
  if(action==='social'||action==='prepare-share')await withBusy(async()=>{
    const blob=await socialImage(session,proposals);previewSocial(blob);
    if(action==='social')downloadBlob(blob,'entre-pautas-resultado.png');
    notify(action==='social'?'Imagem preparada para baixar.':'Imagem pronta. Confira a prévia e toque novamente em “Compartilhar nas redes”.');
  });
}
function openRestart(trigger){
  openDetails('Começar outra pesquisa?',['Isso encerra a sessão atual e apaga suas respostas desta aba. Baixe a imagem antes, se quiser guardar o resultado.'],trigger,'Continuar nesta pesquisa');
  const button=document.createElement('button');button.type='button';button.className='secondary';button.dataset.action='confirm-restart';button.textContent='Apagar respostas e começar outra';document.getElementById('dialog-body').append(button);
}
document.addEventListener('click',event=>{
  const target=event.target.closest('button');if(!target)return;
  if(target.dataset.level){level=target.dataset.level;app.querySelectorAll('[data-level]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.level===level)));}
  if(target.dataset.answer){const id=session.questionOrder[session.index];answer(session,id,target.dataset.answer);invalidateSocial();app.querySelectorAll('[data-answer]').forEach(b=>{b.setAttribute('aria-checked',String(b===target));b.tabIndex=b===target?0:-1;});app.querySelector('[data-action=next]').disabled=false;}
  if(target.dataset.edit!==undefined){session.index=Number(target.dataset.edit);screen='quiz';render();}
  if(target.dataset.action)void act(target.dataset.action,target);
  if(target.dataset.info){const method=target.dataset.info==='method',contact=target.dataset.info==='contact';openDetails(method?'Metodologia e limites':contact?'Contato':'Privacidade',contact?[
    'Fale com Cassiano Lamarc pelo site pessoal ou pelo Instagram nos links abaixo.'
  ]:method?[
    'Esta é uma base beta com 40 propostas, das quais somente duas têm evidências históricas correspondentes dos dois políticos. Os níveis de 10, 25 e 40 usam subconjuntos editoriais aninhados; todos contêm as mesmas duas pautas comparáveis. A ordem é sorteada uma vez por sessão.',
    'As duas comparações são sobre atos específicos de 2023. As fontes foram conferidas em 20/10/2026 para documentar o histórico; isso não certifica posição atual. Outras pautas permanecem exploratórias até revisão de evidências com recorte equivalente.',
    'Somente A favor ou Contra em pauta comparável entra no denominador. Cada coincidência vale um ponto. Percentuais independentes: coincidências divididas pela base elegível. Empates recebem o mesmo destaque e zero respostas elegíveis não produz vencedor.',
    'Não inferimos intenção de voto, não temos amostra representativa e não usamos respostas de outras pessoas. Fontes e ressalvas aparecem após o resultado. Ausência de voto não significa abstenção formal ou oposição.',
    'Para sugestões de correção, use os canais de contato abaixo. Informe a pauta, o recorte e a fonte pública; não é necessário enviar suas respostas.'
  ]:[
    'Respostas e expectativa opcional ficam apenas na memória desta aba. Não usamos localStorage, cookies, analytics, login ou APIs para registrar ou calcular opiniões políticas. Fechar ou recarregar encerra a sessão.',
    'Fotos e fontes tipográficas são arquivos locais. O servidor de hospedagem recebe as requisições normais de arquivos e pode tratar dados técnicos de acesso conforme suas próprias políticas; as respostas não são incluídas em URLs, logs da aplicação ou requisições.',
    'O código do Google AdSense está instalado e é carregado ao abrir a página. O Google pode receber dados técnicos de navegação, como endereço IP e informações do navegador, e usar cookies ou tecnologias semelhantes conforme as configurações da conta e o consentimento aplicável. A aplicação não envia respostas, expectativa ou scores em parâmetros ou eventos de publicidade. Os blocos manuais ainda não estão ativados; anúncios automáticos dependem das configurações e da aprovação no painel do Google.',
    'Baixar e compartilhar são ações suas. A imagem e os apps escolhidos recebem o resultado somente por sua ação. A resposta à pergunta opcional não aparece na imagem.',
    'Abrir fontes ou canais de contato leva a serviços externos. Os links das evidências não enviam o endereço de origem como referenciador. Para contato, use o site pessoal ou o Instagram abaixo.'
  ],target,'Fechar');
    const links=document.createElement('ul');links.className='link-list';
    for(const [label,url] of [['Site pessoal — cassianolamarc.com.br/me','https://cassianolamarc.com.br/me'],['Instagram — @cassianolamarc','https://www.instagram.com/cassianolamarc/']]){
      const item=document.createElement('li'),link=document.createElement('a');
      link.textContent=label;link.href=url;link.target='_blank';link.rel='noopener noreferrer';link.referrerPolicy='no-referrer';item.append(link);links.append(item);
    }
    document.getElementById('dialog-body').append(links);
  }
});
app.addEventListener('change',event=>{if(event.target.id==='expectation'){session.expectation=expectations.includes(event.target.value)?event.target.value:'';}});
app.addEventListener('keydown',event=>{const radio=event.target.closest('[data-answer]');if(!radio||!['ArrowDown','ArrowUp','ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const buttons=[...app.querySelectorAll('[data-answer]')],index=buttons.indexOf(radio);const next=event.key==='Home'?0:event.key==='End'?3:(index+(['ArrowDown','ArrowRight'].includes(event.key)?1:3))%4;buttons[next].focus();buttons[next].click();});
initDetails();render(false);
