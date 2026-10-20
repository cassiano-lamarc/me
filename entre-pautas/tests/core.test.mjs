import test from 'node:test';
import assert from 'node:assert/strict';
import { archivedProposals, proposals, levels, proposalById } from '../data.js';
import { createSession, answer, shuffle } from '../session.js';
import { governmentPlans, PLAN_REVIEWED_AT } from '../plans.js';
import { hasBinaryEvidence, hasBothBinaryPositions, usableSource } from '../eligibility.js';
import { compareDocuments, positionLabel } from '../score.js';
import { textReport } from '../report.js';
import { paginateBlocks, wrapText } from '../export-image.js';
import { zipFiles } from '../zip.js';
import { nativeShare, canShareFile, copyText } from '../share.js';
import { initAd, adConfig } from '../ads.js';
test('questionário contém oito recortes dos planos TSE com registros dos dois; catálogo antigo preservado',()=>{
  assert.equal(archivedProposals.length,40);assert.equal(new Set(archivedProposals.map(p=>p.id)).size,40);
  const expected=['escola-integral','creches','internet-escolas','sus-atencao','telemedicina','saude-mental','moradia-social','energia-renovavel'];
  assert.deepEqual(proposals.map(p=>p.id),expected);assert.deepEqual(Object.keys(levels),['simple']);
  assert.deepEqual(levels.simple.ids,expected);assert.equal(new Set(levels.simple.ids).size,expected.length);
  assert(proposals.every(p=>hasBothBinaryPositions(p)&&proposalById[p.id]===p&&p.details&&p.example&&p.conditions&&p.sourceEdition==='tse-2026'));
  assert(!levels.simple.ids.includes('intervencao-df-2023'));assert(!levels.simple.ids.includes('decreto-armas-2023'));assert(!levels.simple.ids.includes('marco-temporal'));
  assert(archivedProposals.every(old=>!proposals.some(p=>p.title===old.title)));
  assert.throws(()=>answer(createSession('simple'),'marco-temporal','favor'),/Resposta inválida/);
});

test('citações dos programas preservam autoria, páginas e publicação desconhecida separada da consulta',()=>{
  const expectedPages={
    'escola-integral':[[31],[35]],creches:[[31],[21]],'internet-escolas':[[32],[24,35]],
    'sus-atencao':[[34,35],[37,38]],telemedicina:[[35,38],[38]],'saude-mental':[[39],[39]],
    'moradia-social':[[45],[47]],'energia-renovavel':[[64],[63]]
  };
  for(const p of proposals){
    for(const [index,actor] of ['lula','flavio-bolsonaro'].entries()){
      const position=p.positions[actor],source=position.sources[0],plan=governmentPlans[actor];
      assert.equal(position.stance,'favor');assert.equal(position.verifiedAt,PLAN_REVIEWED_AT);
      assert.equal(source.date,null);assert.equal(source.dateStatus,'notProvided');assert.equal(source.accessedAt,'2026-10-20');assert.equal(source.planYear,2026);
      assert.deepEqual(source.pages,expectedPages[p.id][index]);assert.equal(source.pageCount,actor==='lula'?84:76);
      assert(source.pages.every(page=>Number.isInteger(page)&&page>=1&&page<=source.pageCount));
      assert.equal(source.url,plan.url+'#page='+source.pages[0]);assert.equal(source.indexUrl,plan.indexUrl);
      assert.equal(new URL(source.url).hostname,'www.tse.jus.br');assert.equal(new URL(source.indexUrl).hostname,'www.tse.jus.br');
      assert.equal(usableSource(source),true);
    }
  }
});

test('ausência, condição ou fonte incompleta nunca confirma posição',()=>{
  const position=proposals[0].positions.lula,source=position.sources[0];
  assert.equal(hasBinaryEvidence(position),true);assert.equal(positionLabel(position),'A favor');
  const invalidSources=[{...source,url:'http://example.com'},{...source,date:undefined},{...source,dateStatus:undefined},{...source,accessedAt:null},{...source,planYear:2022},{...source,url:'https://example.com/plan.pdf'},{...source,pages:[]},{...source,pages:[0]},{...source,pages:[85]},{...source,summary:'  '}];
  for(const change of [undefined,{...position,stance:'unknown'},{...position,stance:'depends'},{...position,sources:[]},{...position,verifiedAt:null},...invalidSources.map(item=>({...position,sources:[item]}))]){
    assert.equal(hasBinaryEvidence(change),false);assert.equal(positionLabel(change),'Posição não confirmada');
    assert.equal(hasBothBinaryPositions({...proposals[0],positions:{...proposals[0].positions,'flavio-bolsonaro':change}}),false);
  }
  assert.equal(hasBothBinaryPositions(archivedProposals.find(p=>p.id==='marco-temporal')),false);
});

test('sessão inválida ou sem perguntas é rejeitada',()=>{
  assert.throws(()=>createSession('medium'),/Nível inválido/);
  const previous=levels.simple.ids;
  try{levels.simple.ids=[];assert.throws(()=>createSession('simple'),/Não há perguntas/);}finally{levels.simple.ids=previous;}
});
test('Fisher–Yates não altera a lista editorial e sessão preserva ordem durante respostas',()=>{
  const original=[...levels.simple.ids];let calls=0;const session=createSession('simple',()=>{calls++;return .2;});
  assert.equal(calls,original.length-1);const order=[...session.questionOrder];answer(session,order[0],'favor');session.index=1;session.index=0;answer(session,order[0],'against');
  assert.deepEqual(session.questionOrder,order);assert.deepEqual(levels.simple.ids,original);assert.equal(session.answersByQuestionId[order[0]],'against');assert.equal(calls,original.length-1);
  const next=createSession('simple',()=>.8);assert.deepEqual(next.answersByQuestionId,{});assert.equal(next.expectation,'');assert.notDeepEqual(next.questionOrder,order);
  assert.deepEqual(shuffle(['a','b'],()=>.99),['a','b']);
});
test('cobertura documental independe das respostas do visitante e distingue lacunas',()=>{
  const s=createSession('simple'),coverage=()=>{const result=compareDocuments(s,proposals);return {total:result.total,coverage:result.coverage,byGroup:result.byGroup};};
  const before=coverage();assert.equal(before.total,8);assert.deepEqual(before.coverage,{both:8,one:0,none:0});assert(before.byGroup.every(group=>group.percent===100&&group.count===8));
  for(const value of ['favor','against','depends','none']){for(const id of s.questionOrder)answer(s,id,value);assert.deepEqual(coverage(),before);assert(compareDocuments(s,proposals).rows.every(row=>row.answer===value));}
  const unknown={stance:'unknown',verifiedAt:null,sources:[]};
  const partial={...proposals[0],id:'partial',positions:{...proposals[0].positions,'flavio-bolsonaro':unknown}};
  const absent={...proposals[0],id:'absent',positions:{lula:unknown,'flavio-bolsonaro':unknown}};
  const mixed=compareDocuments({questionOrder:[proposals[0].id,partial.id,absent.id],answersByQuestionId:{}},[proposals[0],partial,absent]);
  assert.deepEqual(mixed.coverage,{both:1,one:1,none:1});assert.deepEqual(mixed.byGroup.map(group=>group.percent),[67,33]);
  const empty=compareDocuments({questionOrder:[],answersByQuestionId:{}},proposals);assert.equal(empty.total,0);assert(empty.byGroup.every(group=>group.percent===null));
  assert.throws(()=>compareDocuments({questionOrder:['missing'],answersByQuestionId:{}},proposals),/Proposta não encontrada/);
});
test('expectativa não altera cobertura e TXT contém respostas, citações TSE e ordem efetiva',()=>{
  const s=createSession('simple',()=>.42);for(const id of s.questionOrder)answer(s,id,'favor');const before=compareDocuments(s,proposals);s.expectation='Eu estava em dúvida.';assert.deepEqual(compareDocuments(s,proposals),before);
  const text=textReport(s,proposals);assert(text.includes(s.expectation));assert(text.includes('https://www.tse.jus.br'));assert.match(text,/publicação não informada/i);let previous=0;
  for(const [i,id] of s.questionOrder.entries()){const index=text.indexOf(`${i+1}. ${proposalById[id].title}`);assert(index>=previous);previous=index;}
  for(const old of archivedProposals)assert(!text.includes(old.title));
  for(const p of proposals)for(const position of Object.values(p.positions))for(const source of position.sources)assert(text.includes(source.url));
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
