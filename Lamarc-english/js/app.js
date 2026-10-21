import { config, levels } from './config.js';
import { questions, validateBank } from './questions.js';
import { storageNotice, clearData, prefix } from './storage.js';
import { createAttempt, saveAttempt, restoreAttempt, finishAttempt, startWithLock } from './quiz.js';
import { score, recommendation } from './scoring.js';
import { resultImage, downloadImage, shareResult, shareText } from './share.js';
const main=document.querySelector('main'), status=document.querySelector('#status');
let attempt=null, saved=null, name='', valid=true, result=null, previewGeneration=0;
const say=text=>{status.textContent=text;};
storageNotice(say);
function node(tag,text,attrs={}) {
  const el=document.createElement(tag);if(text!==null && text!==undefined)el.textContent=text;
  for(const [key,value] of Object.entries(attrs))el.setAttribute(key,value);
  return el;
}
function add(parent,tag,text,attrs={}) {const el=node(tag,text,attrs);parent.append(el);return el;}
function button(parent,label,fn,cls='') {const el=add(parent,'button',label,{type:'button',class:cls});el.addEventListener('click',fn);return el;}
function title(text) {const h=add(main,'h1',text,{tabindex:'-1'});h.focus();return h;}
function reset(){main.replaceChildren();previewGeneration++;}
function notice(parent=main){add(parent,'p',config.disclaimer,{class:'notice'});}
function actions(parent=main){return add(parent,'div',null,{class:'actions no-print'});}
function duration(ms){const seconds=Math.floor(ms/1000);return `${Math.floor(seconds/60)}min ${seconds%60}s`;}
const author=document.querySelector('#author');author.textContent=config.author;author.href=config.authorUrl;
document.querySelector('#brand').textContent=config.brand;
document.title=config.brand+' | Avaliação de inglês escrito';
try{validateBank();}catch(error){valid=false;console.error('Falha no banco de questões:',error);}
saved=restoreAttempt(questions);
function intro() {
  reset();attempt=null;result=null;
  const hero=add(main,'div',null,{class:'hero'}), copy=add(hero,'section');
  add(copy,'span','GRATUITO · SEM CADASTRO',{class:'eyebrow'});
  add(copy,'h1','Seu inglês escrito. Um próximo passo mais claro.');
  add(copy,'p','Explore sua compreensão de leitura, gramática e vocabulário com uma avaliação breve e um resultado explicado.',{class:'lead'});
  const metrics=add(copy,'div',null,{class:'metrics'});
  for(const [big,small] of [['24','questões'],['15 min','tempo máximo padrão'],['A1 → C2','faixas indicativas']]){const m=add(metrics,'div');add(m,'strong',big);add(m,'span',small);}
  notice(copy);
  add(copy,'p','Quatro questões por faixa oferecem uma estimativa breve e sujeita a variação entre tentativas. Os cortes são regras iniciais, sem validação psicométrica.',{class:'muted'});
  const panel=add(hero,'section',null,{class:'card'});add(panel,'h2','Vamos começar?');
  add(panel,'label','Nome de exibição (opcional)',{for:'name'});
  const input=add(panel,'input',null,{id:'name',type:'text',maxlength:'60',autocomplete:'off','aria-describedby':'name-help'});
  add(panel,'small','Aparece apenas no resultado e nos arquivos que você gerar. Não é salvo na sessão.',{id:'name-help'});
  const label=add(panel,'label',null,{class:'check'}), untimed=add(label,'input',null,{type:'checkbox'});label.append(document.createTextNode('Modo sem limite de tempo (acessibilidade)'));
  const start=async()=>{
    if(!valid)return;
    startButton.disabled=true;
    try{
      name=input.value.trim().slice(0,60);say('');
      await startWithLock(()=>{attempt=createAttempt(questions,untimed.checked);saveAttempt(attempt);});
      saved=null;renderQuestion();
    }catch(error){say(error.message);startButton.disabled=false;}
  };
  const startButton=button(actions(panel),saved?'Iniciar outra avaliação':'Começar avaliação',start,'accent');
  startButton.disabled=!valid;
  if(!valid)add(panel,'p','O banco de questões está indisponível. Tente novamente mais tarde.',{class:'error',role:'alert'});
  if(saved){
    add(panel,'p','Há uma avaliação neste navegador. Continuar preserva as perguntas e o prazo original; iniciar outra registra um novo conjunto.');
    button(actions(panel),'Continuar avaliação',()=>{name=input.value.trim().slice(0,60);attempt=saved;saved=null;if(!tick())attempt.state==='reviewing'?review():renderQuestion();},'secondary');
  }
  add(panel,'p','Perguntas em inglês, instruções em português. Você pode navegar e revisar antes de enviar.',{class:'muted'});
  add(main,'div','Histórico apenas neste navegador, enquanto os dados locais forem preservados. O banco é finito: questões voltam a aparecer após o ciclo de uso.',{class:'notice'});
}
function active(){return attempt && ['answering','reviewing'].includes(attempt.state);}
function tick(){
  if(!active() || attempt.untimed)return false;
  const remaining=Math.max(0,attempt.deadline-Date.now());
  if(remaining<=0){finish(true);return true;}
  const timer=document.querySelector('#timer');if(timer)timer.textContent=duration(remaining);
  if(remaining<=120000 && !attempt.warned){attempt.warned=true;saveAttempt(attempt);say('Restam dois minutos para concluir a avaliação.');}
  return false;
}
function bar(){const row=add(main,'div',null,{class:'toolbar'});add(row,'span',`${Object.keys(attempt.answers).length} de 24 respondidas`);add(row,'span',attempt.untimed?'Modo sem limite':'', {id:'timer','aria-label':attempt.untimed?'Modo sem limite':'Tempo restante','aria-live':'off'});tick();}
function move(index){if(tick())return;attempt.index=index;attempt.state='answering';saveAttempt(attempt);renderQuestion();}
function answer(value){if(!active()||tick())return;attempt.answers[attempt.items[attempt.index].id]=value;saveAttempt(attempt);}
function renderQuestion(){
  if(tick())return;
  reset();bar();if(!active())return;
  const item=attempt.items[attempt.index], q=questions.find(q=>q.id===item.id);
  title(`Questão ${attempt.index+1} de 24`);
  add(main,'progress',null,{value:attempt.index+1,max:24,'aria-label':'Progresso da avaliação'});
  const card=add(main,'section',null,{class:'card'});add(card,'p',`${q.level} · ${{grammar:'Gramática',vocabulary:'Vocabulário',reading:'Leitura'}[q.skill]}`,{class:'eyebrow'});
  if(q.passage)add(card,'blockquote',q.passage,{lang:'en'});
  const fieldset=add(card,'fieldset');add(fieldset,'legend',q.prompt,{lang:'en'});
  for(const id of item.options){
    const option=q.options.find(o=>o.id===id), label=add(fieldset,'label',null,{class:'option'});
    const radio=add(label,'input',null,{type:'radio',name:'answer',value:id});radio.checked=attempt.answers[q.id]===id;
    add(label,'span',option.text,{lang:'en'});radio.addEventListener('change',()=>answer(id));
  }
  const unknown=button(actions(card),attempt.answers[q.id]==='unknown'?'Não sei (selecionado)':'Não sei',()=>{answer('unknown');if(active())renderQuestion();},'secondary');unknown.setAttribute('aria-pressed',attempt.answers[q.id]==='unknown');
  const nav=actions();const prev=button(nav,'← Anterior',()=>move(attempt.index-1),'secondary');prev.disabled=attempt.index===0;
  if(attempt.index<23)button(nav,'Próxima →',()=>move(attempt.index+1));
  button(nav,'Revisar e finalizar',review,'secondary');
  if(tick())return;
}
function review(){
  if(tick()||!active())return;
  attempt.state='reviewing';saveAttempt(attempt);reset();bar();if(!active())return;title('Revise antes de enviar');
  const pending=24-Object.keys(attempt.answers).length;
  add(main,'p',`${24-pending} respondidas · ${pending} pendentes. “Não sei” vale zero. Escolha uma questão para revisar.`);
  const grid=add(main,'div',null,{class:'question-grid'});
  attempt.items.forEach((item,i)=>button(grid,`${i+1} · ${attempt.answers[item.id]==='unknown'?'Não sei':attempt.answers[item.id]?'Respondida':'Pendente'}`,()=>move(i),attempt.answers[item.id]?'answered':'secondary'));
  const confirmArea=add(main,'div');
  button(actions(),'Finalizar avaliação',()=>{
    if(tick())return;
    const missing=24-Object.keys(attempt.answers).length;
    if(!missing){finish();return;}
    confirmArea.replaceChildren();const card=add(confirmArea,'div',null,{class:'card',role:'group','aria-label':'Confirmar envio com pendências'});
    add(card,'p',`Há ${missing} questões pendentes. Elas contarão como incorretas. Deseja enviar mesmo assim?`,{role:'alert'});
    const yes=button(actions(card),'Confirmar envio',()=>finish());button(actions(card),'Continuar revisão',()=>{confirmArea.replaceChildren();review();},'secondary');yes.focus();
  });
}
function finish(expired=false){
  if(!attempt || !finishAttempt(attempt))return;
  result=score(attempt,questions);if(expired)say('O tempo terminou. A avaliação foi finalizada; pendências valem zero.');renderResult();
}
function renderResult(){
  reset();const report=add(main,'article',null,{id:'report'});
  add(report,'p',config.brand,{class:'eyebrow'});const h=add(report,'h1','Seu resultado em inglês escrito',{tabindex:'-1'});h.focus();
  if(name)add(report,'h2',name,{class:'break'});
  const card=add(report,'section',null,{class:'card dark'});add(card,'p','NÍVEL ESTIMADO',{class:'eyebrow'});add(card,'div',result.level,{class:'result-level'});
  add(card,'p',`${result.total}/24 acertos · ${result.percent}%`);add(card,'p',`Resultado indicativo · ${result.date}`);
  add(card,'p',attempt.untimed?`Modo sem limite · tempo utilizado: ${duration(result.duration)} (sem comparação com o modo cronometrado)`:`Tempo utilizado: ${duration(result.duration)}`);
  notice(report);
  if(result.irregular)add(report,'p','Seu desempenho foi irregular entre os níveis; uma avaliação complementar pode esclarecer seu nível.',{class:'notice'});
  add(report,'p','O nível considera a maior sequência desde A1 com pelo menos 3 acertos em cada faixa. O percentual geral não determina sozinho o nível. Quatro itens por faixa oferecem uma estimativa breve e sujeita a variação entre tentativas.');
  const table=add(report,'table');add(table,'caption','Desempenho por nível');const thead=add(table,'thead'), head=add(thead,'tr');for(const t of ['Nível','Acertos','Percentual'])add(head,'th',t,{scope:'col'});
  const body=add(table,'tbody');levels.forEach((level,i)=>{const row=add(body,'tr');add(row,'th',level,{scope:'row'});add(row,'td',`${result.counts[i]}/4`);add(row,'td',`${result.counts[i]*25}%`);});
  add(report,'h2','Seu próximo passo');add(report,'p',recommendation(result.level));
  add(report,'p','As faixas são regras iniciais do produto, sem validação psicométrica. Este relatório não é uma certificação oficial nem comprova fluência. Revisão pedagógica e pilotagem são necessárias antes de qualquer alegação de precisão ou uso em seleção profissional.',{class:'muted'});
  add(report,'p',`${config.author} · ${config.authorUrl}`,{class:'report-only break'});
  const nav=actions();button(nav,'Revisar respostas',correction,'secondary');button(nav,'Imprimir / salvar PDF',()=>window.print());button(nav,'Refazer avaliação',()=>{name='';saved=null;intro();},'secondary');
  add(main,'p','Para gerar o relatório PDF, use o diálogo de impressão e selecione “Salvar como PDF”, se disponível.',{class:'muted no-print'});
  sharePanel();
}
function correction(){
  if(attempt?.state!=='finished')return;reset();title('Revise suas respostas');button(actions(),'Voltar ao resultado',renderResult,'secondary');
  attempt.items.forEach((item,i)=>{
    const q=questions.find(q=>q.id===item.id), chosen=q.options.find(o=>o.id===attempt.answers[q.id]), correct=q.options.find(o=>o.id===q.correctOptionId);
    const card=add(main,'article',null,{class:'card'});add(card,'h2',`${i+1}. ${q.prompt}`,{lang:'en'});if(q.passage)add(card,'blockquote',q.passage,{lang:'en'});
    const hit=chosen?.id===correct.id;add(card,'p',hit?'✓ Correta':'✕ Incorreta');add(card,'p','Sua resposta:');add(card,'p',chosen?.text || (attempt.answers[q.id]==='unknown'?'Não sei':'Pendente'),chosen?{lang:'en'}:{});
    add(card,'p','Resposta correta:');add(card,'p',correct.text,{lang:'en'});add(card,'p',q.explanationPt);
  });button(actions(),'Voltar ao resultado',renderResult);
}
function sharePanel(){
  const panel=add(main,'section',null,{class:'card no-print'});add(panel,'h2','Leve seu resultado com você');
  add(panel,'p','Confira a prévia antes de compartilhar. Para Instagram, baixe e anexe a imagem ao Story ou à publicação. No WhatsApp, a folha nativa pode compartilhar o arquivo; o link abaixo envia somente texto e link.');
  add(panel,'label','Formato da imagem',{for:'format'});const select=add(panel,'select',null,{id:'format'});add(select,'option','Feed · 1080 × 1350',{value:'feed'});add(select,'option','Story · 1080 × 1920',{value:'story'});
  const preview=add(panel,'img',null,{class:'preview',alt:'Prévia do resultado que será compartilhado'});let blob=null, generation=0;
  const nav=actions(panel), buttons=[];
  async function update(){
    const current=++generation, page=previewGeneration;blob=null;buttons.forEach(b=>b.disabled=true);
    try{const image=await resultImage(result,name,select.value);if(current!==generation||page!==previewGeneration)return;blob=image.blob;preview.src=image.canvas.toDataURL('image/png');buttons.forEach(b=>b.disabled=false);}catch(error){say(error.message);}
  }
  buttons.push(button(nav,'Baixar imagem',()=>downloadImage(blob)));
  buttons.push(button(nav,'Baixar para Instagram',()=>{downloadImage(blob);say('Imagem baixada. Abra o Instagram e anexe o arquivo ao Story ou à publicação.');},'secondary'));
  buttons.push(button(nav,'Compartilhar resultado',async()=>{try{say(await shareResult(blob,result));}catch{say('Não foi possível compartilhar. Use Baixar imagem.');}}));
  const text=add(panel,'p',shareText(result),{class:'break'});
  button(actions(panel),'Copiar texto e link',async()=>{try{await navigator.clipboard.writeText(text.textContent);say('Texto e link copiados.');}catch{const range=document.createRange();range.selectNodeContents(text);const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);say('Selecionei o texto. Use a opção Copiar do navegador.');}},'secondary');
  const whatsapp=add(actions(panel),'a','WhatsApp: texto e link',{class:'button secondary',href:'https://wa.me/?text='+encodeURIComponent(shareText(result)),target:'_blank',rel:'noopener noreferrer'});
  whatsapp.addEventListener('click',()=>say('O link abre o WhatsApp com texto. Anexe a imagem baixada separadamente.'));
  select.addEventListener('change',update);update();
}
document.querySelector('#clear').addEventListener('click',()=>{
  if(active() && !window.confirm('Limpar os dados também encerra esta tentativa. Continuar?'))return;
  clearData();attempt=null;saved=null;name='';result=null;intro();say('Dados locais removidos.');
});
window.addEventListener('storage',event=>{if(event.key?.startsWith(prefix))say('O histórico deste navegador mudou em outra aba. A próxima avaliação usará o histórico atualizado.');});
document.addEventListener('visibilitychange',()=>{if(!document.hidden)tick();});window.addEventListener('pageshow',()=>tick());
setInterval(tick,1000);
if(saved && !saved.untimed && saved.deadline<=Date.now()) {
  attempt=saved;saved=null;finish(true);
} else intro();
