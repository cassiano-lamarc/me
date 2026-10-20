import { candidates } from './candidates.js';
import { proposals, proposalById, levels, options, expectations, answerLabel } from './data.js';
import { createSession, answer } from './session.js';
import { compareDocuments, isComparable, positionLabel, coverageLabel } from './score.js';
import { initDetails, openDetails } from './details.js';
import { showAd } from './ads.js';
import { summaryText, resultTitle, coverageText, textReport, downloadBlob, sourceDateLabel } from './report.js';
import { socialImage, fullReportImages, invalidateSocial } from './export-image.js';
import { zipFiles } from './zip.js';
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
  document.getElementById('main').classList.toggle('document-result',screen==='result');
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
 const count=proposals.length;
 app.innerHTML='<p class="eyebrow">Propostas dos programas no TSE</p><h1>Antes dos nomes,<br>vamos às pautas.</h1><p class="lead">Consulte sua resposta ao lado das posições documentadas de Lula e Flávio Bolsonaro.</p><p class="selection-count"><strong>'+count+' perguntas disponíveis</strong></p><p class="notice">Somente propostas com registro de A favor ou Contra para os dois. Pautas sem confirmação foram retiradas do questionário.</p><button type="button" class="primary wide" data-action="start" '+(count?'':'disabled')+'>Iniciar pesquisa →</button>'+(count?'':'<p role="status">Não há perguntas que atendam ao critério neste momento.</p>')+'<p class="notice">As perguntas usam os programas disponibilizados nas páginas do TSE para as eleições de 2026. A ordem é sorteada uma vez por sessão. Suas respostas ficam só na memória desta aba.</p>';
}
function renderQuiz(){
  const id=session.questionOrder[session.index],p=proposalById[id],selected=session.answersByQuestionId[id],comparable=isComparable(p);
  app.innerHTML=`<div class="quiz-meta"><span>Pesquisa ${levels[session.level].label}</span><span>Pergunta ${session.index+1} de ${session.questionOrder.length}</span></div><progress value="${session.index+1}" max="${session.questionOrder.length}" aria-label="Progresso do questionário"></progress><p class="eyebrow">${esc(p.category)}</p><span class="badge">${comparable?'A favor ou Contra documentado para ambos':'Documentação incompleta'}</span><div class="question-heading"><h1>${esc(p.title)}</h1><button type="button" class="info-button" data-action="details" aria-label="Mais detalhes da proposta">ⓘ</button></div><p class="notice">${comparable?'Considere o recorte da pergunta. Os instrumentos e as metas de cada programa podem diferir.':'Ainda não há evidência suficiente dos dois para comparar este recorte.'}</p><div class="options" role="radiogroup" aria-label="Sua posição">${options.map((o,i)=>`<button type="button" class="option" role="radio" aria-checked="${selected===o.id}" tabindex="${selected?selected===o.id?0:-1:i===0?0:-1}" data-answer="${o.id}"><span class="option-icon" aria-hidden="true">${o.icon}</span><span><strong>${o.label}</strong><small>${o.description}</small></span></button>`).join('')}</div><div class="actions"><button type="button" class="secondary" data-action="back" ${session.index===0?'disabled':''}>← Voltar</button><button type="button" class="primary" data-action="next" ${!selected?'disabled':''}>${session.index===session.questionOrder.length-1?'Ver resultado':'Continuar →'}</button></div><button type="button" class="text-button" data-action="restart">Começar outra pesquisa</button>`;
}
function photo(c){return `<img class="portrait" data-portrait src="${c.photo}" alt="Retrato de ${esc(c.name)}"><span class="photo-fallback" hidden aria-label="Foto indisponível">${c.initials}</span>`;}
function positionCell(pos){return '<strong>'+esc(positionLabel(pos))+'</strong><p>'+esc(pos?.note||'Pesquisa pendente para este recorte.')+'</p><p class="source-note">Conferência: '+esc(pos?.verifiedAt||'pendente')+'</p><ul>'+(pos?.sources||[]).map(source=>'<li><a href="'+esc(source.url)+'" target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer">'+esc(source.title)+'</a> • '+esc(sourceDateLabel(source))+'<br>'+esc(source.summary)+'</li>').join('')+'</ul>';}
function renderResult(){
 const comparison=compareDocuments(session,proposals);
 app.innerHTML='<p class="eyebrow">Consulta e comparação factual</p><h1 class="result-title">'+resultTitle()+'</h1><p class="lead">'+esc(coverageText(comparison))+'</p><p class="notice">A seleção contém propostas documentadas dos dois programas. A cobertura documental usa apenas a disponibilidade das fontes. Cada célula indica a página do PDF consultado.</p><div class="candidate-grid">'+candidates.map(c=>'<article class="candidate">'+photo(c)+'<h3>'+esc(c.name)+'</h3><p class="coverage-label">Cobertura documental</p><span class="coverage-percent">'+(comparison.byGroup.find(g=>g.id===c.id).percent===null?'—':comparison.byGroup.find(g=>g.id===c.id).percent+'%')+'</span><p class="source-note">'+comparison.byGroup.find(g=>g.id===c.id).count+' de '+comparison.total+' perguntas com registros neste grupo. Não mede afinidade.</p><p class="source-note">'+esc(c.bio)+'</p></article>').join('')+'</div><p class="source-note">Fotos: Lula — Ricardo Stuckert/PR (CC BY 2.0); Flávio Bolsonaro — Carlos Moura/Agência Senado (CC BY-SA 4.0). <a href="assets/candidates/ATTRIBUTION.md">Fontes e licenças</a>.</p><details class="panel documents-accordion" id="review"><summary>Propostas, respostas e documentos</summary><p class="notice">Cada linha apresenta os registros no contexto original. Apoio a uma emenda ou oposição a um projeto completo não define posição irrestrita sobre o tema.</p><div class="comparison-scroll" tabindex="0" role="region" aria-label="Tabela de comparação factual"><table class="comparison-table"><caption>Comparação factual de '+comparison.total+' perguntas</caption><thead><tr><th scope="col">Proposta</th><th scope="col">Sua resposta</th>'+candidates.map(c=>'<th scope="col">'+esc(c.name)+'</th>').join('')+'</tr></thead><tbody>'+comparison.rows.map((row,i)=>'<tr class="review-item"><th scope="row">'+(i+1)+'. '+esc(row.proposal.title)+'<p class="source-note">'+esc(row.proposal.conditions)+'</p><p class="badge">'+coverageLabel(row.coverage)+'</p></th><td>'+esc(answerLabel(row.answer))+'<br><button type="button" class="text-button" data-edit="'+i+'">Revisar esta resposta</button></td>'+row.records.map(r=>'<td>'+positionCell(r.position)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div></details><section class="panel share-panel" id="sharing"><h2>Guarde ou compartilhe a comparação</h2><p>A imagem compartilha o resumo documental. O TXT e as imagens completas incluem respostas, fontes, datas e ressalvas.</p><div class="actions">'+btn('prepare-share','Compartilhar nas redes','primary share-primary')+btn('social','Baixar imagem')+btn('txt','Baixar TXT')+btn('full-images','Baixar imagens completas')+'</div><div id="social-preview" class="export-preview"></div><p class="notice">A imagem de resumo não inclui suas respostas nem a expectativa opcional.</p></section><section class="panel"><h2>A consulta foi o que você esperava?</h2><label for="expectation" class="notice">Opcional. Fica só nesta sessão e não altera os documentos.</label><select id="expectation" class="expectation"><option value="">Não respondida</option>'+expectations.map(text=>'<option value="'+esc(text)+'" '+(session.expectation===text?'selected':'')+'>'+esc(text)+'</option>').join('')+'</select><button type="button" class="text-button" data-action="clear-expectation">Limpar resposta opcional</button></section><div class="actions">'+btn('review','Revisar desde o início')+btn('restart','Nova pesquisa')+'</div>';
  app.querySelector('#review').before(app.querySelector('#sharing'));
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
  if(action==='txt')downloadBlob(new Blob([textReport(session,proposals)],{type:'text/plain;charset=utf-8'}),'entre-pautas-comparacao.txt');
  if(action==='full-images')await withBusy(async()=>{const files=await fullReportImages(session,proposals);downloadBlob(await zipFiles(files),'entre-pautas-comparacao-imagens.zip');notify('Imagens completas preparadas para baixar.');});
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
    'O questionário usa recortes dos programas vinculados pelas páginas de Lula e Flávio Bolsonaro no TSE. Somente propostas com posição explícita dos dois entram na seleção. A ordem é sorteada uma vez por sessão e preservada na revisão.',
    'A tabela apresenta documentos e manifestações atribuídos à própria pessoa, com fonte, data e contexto. O apoio ao recorte comum não significa programas idênticos. As referências indicam a página do PDF e distinguem a data de consulta da data de publicação, quando não informada.',
    'A cobertura informa perguntas com registros dos dois, de apenas um ou de nenhum. Não calculamos percentuais de afinidade, pontuação ou vencedor. Sua resposta nunca altera a cobertura.',
    'Posição não confirmada indica documentação insuficiente nesta base. Ausência de voto não significa oposição ou abstenção. Não atribuímos posições de aliados ou familiares ao candidato.',
    'Para sugestões de correção, use os canais de contato abaixo. Informe a pauta, o recorte e a fonte pública; não é necessário enviar suas respostas.'
  ]:[
    'Respostas e expectativa opcional ficam apenas na memória desta aba. Não usamos localStorage, cookies, analytics, login ou APIs para registrar suas respostas. Fechar ou recarregar encerra a sessão.',
    'Fotos e fontes tipográficas são arquivos locais. O servidor de hospedagem recebe as requisições normais de arquivos e pode tratar dados técnicos de acesso conforme suas próprias políticas; as respostas não são incluídas em URLs, logs da aplicação ou requisições.',
    'O código do Google AdSense está instalado e é carregado ao abrir a página. O Google pode receber dados técnicos de navegação, como endereço IP e informações do navegador, e usar cookies ou tecnologias semelhantes conforme as configurações da conta e o consentimento aplicável. A aplicação não envia respostas, expectativa ou comparações em parâmetros ou eventos de publicidade. Os blocos manuais ainda não estão ativados; anúncios automáticos dependem das configurações e da aprovação no painel do Google.',
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
