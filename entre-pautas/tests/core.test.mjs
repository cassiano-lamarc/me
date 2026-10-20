import test from 'node:test';
import assert from 'node:assert/strict';
import { proposals, levels, proposalById } from '../data.js';
import { createSession, answer, shuffle } from '../session.js';
import { compareDocuments, isComparable, hasRecord, positionLabel } from '../score.js';
import { textReport } from '../report.js';
import { paginateBlocks, wrapText } from '../export-image.js';
import { zipFiles } from '../zip.js';
import { nativeShare, canShareFile, copyText } from '../share.js';
import { initAd, adConfig } from '../ads.js';
test('composição editorial 10/25/40, IDs únicos e subconjuntos aninhados',()=>{
  assert.equal(proposals.length,40);assert.equal(new Set(proposals.map(p=>p.id)).size,40);
  for(const [level,length] of [['simple',10],['medium',25],['complete',40]]){
    const ids=levels[level].ids;assert.equal(ids.length,length);assert.equal(new Set(ids).size,length);assert(ids.every(id=>proposalById[id]));assert.equal(ids.filter(id=>isComparable(proposalById[id])).length,level==='simple'?2:3);
    assert(ids.every(id=>proposalById[id].details&&proposalById[id].example&&proposalById[id].conditions));
  }
  assert(levels.simple.ids.every(id=>levels.medium.ids.includes(id)));assert(levels.medium.ids.every(id=>levels.complete.ids.includes(id)));
});
test('Fisher–Yates não altera a lista editorial e sessão preserva ordem durante respostas',()=>{
  const original=[...levels.simple.ids];let calls=0;const session=createSession('simple',()=>{calls++;return .2;});
  assert.equal(calls,9);const order=[...session.questionOrder];answer(session,order[0],'favor');session.index=1;session.index=0;answer(session,order[0],'against');
  assert.deepEqual(session.questionOrder,order);assert.deepEqual(levels.simple.ids,original);assert.equal(session.answersByQuestionId[order[0]],'against');assert.equal(calls,9);
  const next=createSession('simple',()=>.8);assert.deepEqual(next.answersByQuestionId,{});assert.equal(next.expectation,'');assert.notDeepEqual(next.questionOrder,order);
  assert.deepEqual(shuffle(['a','b'],()=>.99),['a','b']);
});
test('cobertura separa dois, um e nenhum; respostas nunca produzem placar',()=>{
  for(const level of Object.keys(levels)){
    const s=createSession(level),before=compareDocuments(s,proposals);
    for(const value of ['favor','against','depends','none']){
      for(const id of s.questionOrder)answer(s,id,value);
      const c=compareDocuments(s,proposals);assert.deepEqual(c.coverage,before.coverage);
      assert.equal(c.coverage.both+c.coverage.one+c.coverage.none,c.total);
      assert(c.rows.every(r=>r.answer===value));assert(!('leaders' in c));assert(!('results' in c));assert(!('denominator' in c));
    }
  }
  const p=structuredClone(proposals[0]);p.positions.lula.sources=[];assert.equal(isComparable(p),false);assert.equal(hasRecord(p.positions.lula),false);assert.equal(positionLabel(p.positions.lula),'Posição não confirmada');
  const s={questionOrder:['x'],answersByQuestionId:{x:'favor'}};
  assert.deepEqual(compareDocuments(s,[{id:'x',positions:{}}]).coverage,{both:0,one:0,none:1});
  assert.deepEqual(compareDocuments({questionOrder:[],answersByQuestionId:{}},[]).coverage,{both:0,one:0,none:0});
  assert.throws(()=>compareDocuments(s,[]),/Proposta não encontrada/);
});
test('expectativa não altera cobertura e TXT contém todas as respostas, fontes e ordem efetiva',()=>{
  const s=createSession('complete',()=>.42);for(const id of s.questionOrder)answer(s,id,'favor');const before=compareDocuments(s,proposals);s.expectation='Eu estava em dúvida.';assert.deepEqual(compareDocuments(s,proposals),before);
  const text=textReport(s,proposals);assert(text.includes(s.expectation));assert(text.includes('https://www25.senado.leg.br'));let previous=0;
  for(const [i,id] of s.questionOrder.entries()){const index=text.indexOf(`${i+1}. ${proposalById[id].title}`);assert(index>=previous);previous=index;}
});

test('registros têm fonte, data, contexto e atribuição; desconhecido não vira oposição',()=>{
  for(const p of proposals)for(const pos of Object.values(p.positions)){
    if(hasRecord(pos)){assert.match(pos.verifiedAt,/^\d{4}-\d{2}-\d{2}$/);assert(pos.note);for(const source of pos.sources){assert.match(source.url,/^https:\/\//);assert.match(source.date,/^\d{4}-\d{2}-\d{2}$/);assert(source.summary&&source.title);}}
    else assert.equal(positionLabel(pos),'Posição não confirmada');
  }
  assert.equal(hasRecord(proposalById['renda-basica'].positions['flavio-bolsonaro']),false);
  assert.equal(hasRecord(proposalById['universidade-cotas'].positions['flavio-bolsonaro']),false);
});
test('paginação não perde nem corta blocos; quebra inclusive palavras maiores que uma linha',()=>{
  const blocks=Array.from({length:40},(_,i)=>({id:i,height:300}));const pages=paginateBlocks(blocks,900);assert.deepEqual(pages.flat().map(b=>b.id),blocks.map(b=>b.id));pages.forEach((page,i)=>assert(page.reduce((sum,b)=>sum+b.height,i===0?900:260)<=1685));
  const context={measureText:text=>({width:Array.from(text).length*10})};const lines=wrapText(context,'Ação extraordinariamente comprida: Flávio Bolsonaro',80);assert(lines.every(line=>context.measureText(line).width<=80));assert.equal(lines.join('').replaceAll(' ',''),'Açãoextraordinariamentecomprida:FlávioBolsonaro');
});
test('ZIP contém assinatura, nomes e os bytes completos dos arquivos',async()=>{
  const blob=await zipFiles([{name:'página-01.png',blob:new Blob(['um'])},{name:'pagina-02.png',blob:new Blob(['dois'])}]);const bytes=new Uint8Array(await blob.arrayBuffer()),view=new DataView(bytes.buffer);assert.equal(view.getUint32(0,true),0x04034b50);assert.equal(view.getUint32(bytes.length-22,true),0x06054b50);assert.equal(view.getUint16(bytes.length-12,true),2);const text=new TextDecoder().decode(bytes);assert(text.includes('página-01.png'));assert(text.includes('dois'));
});
test('compartilhamento de arquivo, fallback link, cancelamento e clipboard indisponível',async()=>{
  const file={name:'resultado.png'};let sent;
  const nav={canShare:()=>true,share:async value=>{sent=value;}};assert(canShareFile(file,nav));assert.equal(await nativeShare(file,'resumo',nav),'shared');assert.deepEqual(sent.files,[file]);
  nav.canShare=()=>false;await nativeShare(file,'resumo',nav);assert.equal(sent.url,'https://cassianolamarc.com.br/entre-pautas/');assert(!sent.text.includes('resumo'));
  nav.share=async()=>{throw Object.assign(new Error(),{name:'AbortError'});};assert.equal(await nativeShare(file,'',nav),'cancelled');assert.equal(await nativeShare(file,'',{}),'unsupported');assert.equal(await copyText('x',{}),false);
});
test('AdSense desligado sem efeitos; mock habilitado carrega script e cada unidade uma vez',async()=>{
  let scripts=0,pushes=0;const makeContainer=()=>({children:[],querySelector:()=>null,classList:{add(){}},append(el){this.children.push(el);}});
  const doc={createElement:tag=>({tag,dataset:{},style:{}}),head:{append(script){scripts++;queueMicrotask(()=>script.onload());}}};const win={adsbygoogle:{push(){pushes++;}}},home=makeContainer(),quiz=makeContainer();
  await initAd('home',home,adConfig,doc,win);assert.equal(scripts,0);
  const config={enabled:true,approved:true,privacyReviewed:true,consentGranted:true,clientId:'ca-pub-1234567890123456',slots:{home:'1',quizTop:'2'}};
  await Promise.all([initAd('home',home,config,doc,win),initAd('home',home,config,doc,win)]);await initAd('home',home,config,doc,win);await initAd('quizTop',quiz,config,doc,win);assert.equal(scripts,1);assert.equal(pushes,2);assert.equal(home.children.length,1);
});
