import { candidates, CANONICAL_URL } from './candidates.js';
import { levels, proposalById, answerLabel } from './data.js';
import { calculate, exclusion } from './score.js';
import { resultTitle, dateLabel } from './report.js';
const W=1080,H=1920,P=72,CONTENT=W-P*2,BOTTOM=1685;
const colors = { paper:'#f6f7f2', ink:'#172f2a', muted:'#53663f', line:'#dce2d9', lime:'#d8ed9c' };
let cache = null;
export function invalidateSocial() { cache = null; }
export function wrapText(ctx,text,maxWidth) {
  const lines=[];
  for(const para of String(text).split('\n')) {
    let line='';
    for(const word of para.split(/\s+/).filter(Boolean)) {
      if(ctx.measureText(word).width > maxWidth) {
        if(line) { lines.push(line); line=''; }
        let fragment='';
        for(const char of word) { if(ctx.measureText(fragment+char).width > maxWidth && fragment) { lines.push(fragment); fragment=''; } fragment+=char; }
        line=fragment;
      } else if(ctx.measureText(line ? line+' '+word : word).width > maxWidth) { lines.push(line); line=word; }
      else line = line ? line+' '+word : word;
    }
    lines.push(line);
  }
  return lines;
}
function canvas() { const c=document.createElement('canvas'); c.width=W;c.height=H;return c; }
function font(ctx,size=32,weight=400,family=size>=38&&weight>=600?'Manrope':'DM Sans') { ctx.font=`${weight} ${size}px "${family}", sans-serif`;ctx.textBaseline='top'; }
function paragraph(ctx,text,x,y,width=CONTENT,size=32,weight=400,color=colors.ink,lineHeight=size*1.4) {
  font(ctx,size,weight); ctx.fillStyle=color;
  const lines=wrapText(ctx,text,width);
  lines.forEach((line,i)=>ctx.fillText(line,x,y+i*lineHeight));
  return y+lines.length*lineHeight;
}
async function assets() {
  await Promise.all([document.fonts.load('400 32px "DM Sans"'),document.fonts.load('700 54px Manrope')]);
  await document.fonts.ready;
  return Promise.all(candidates.map(async c=>{const img=new Image();img.src=c.photo;try{await img.decode();return img;}catch{return null;}}));
}
function portrait(ctx,img,x,y,width,height,initials) {
  ctx.save();ctx.beginPath();ctx.roundRect(x,y,width,height,16);ctx.clip();ctx.fillStyle=colors.line;ctx.fillRect(x,y,width,height);
  if(img) { const scale=Math.max(width/img.naturalWidth,height/img.naturalHeight);const sw=width/scale,sh=height/scale;ctx.drawImage(img,(img.naturalWidth-sw)/2,(img.naturalHeight-sh)*.2,sw,sh,x,y,width,height); }
  else {font(ctx,42,700);ctx.fillStyle=colors.ink;ctx.fillText(initials,x+25,y+height/2-20);}
  ctx.restore();
}
function base(ctx,page,total) {
  ctx.fillStyle=colors.paper;ctx.fillRect(0,0,W,H);
  paragraph(ctx,'entre pautas  /  beta',P,62,CONTENT,32,700);
  ctx.fillStyle=colors.line;ctx.fillRect(P,1730,CONTENT,2);
  let y=1754;
  y=paragraph(ctx,'Coincidência de propostas. Não é recomendação de voto.',P,y,CONTENT,24);
  y=paragraph(ctx,'@cassianolamarc • cassianolamarc.com.br',P,y+5,CONTENT,26,700);
  y=paragraph(ctx,'Desenvolvido por Cassiano Lamarc • cassianolamarc.com.br/entre-pautas/',P,y+5,CONTENT,18);
  y=paragraph(ctx,'Fotos: Ricardo Stuckert/PR • CC BY 2.0; Carlos Moura/Ag. Senado • CC BY-SA 4.0',P,y+5,CONTENT,16);
  paragraph(ctx,`Página ${page} de ${total} • composição exportada CC BY-SA 4.0`,P,y+5,CONTENT,18);
}
function resultHeader(ctx,score,images,start=152,compact=false) {
  let y=paragraph(ctx,resultTitle(score),P,start,CONTENT,compact?44:58,700);
  if(score.denominator) {
    const cols=score.leaders.length===2?score.results:score.leaders;
    const width=CONTENT/cols.length;
    cols.forEach((c,i)=> {
      portrait(ctx,images[candidates.findIndex(a=>a.id===c.id)],P+i*width,y+22,compact?100:170,compact?112:190,c.initials);
      paragraph(ctx,c.name,P+i*width+(compact?118:190),y+38,width-(compact?130:200),compact?30:38,700);
    });
    y+=compact?158:235;
  }
  for(const c of score.results) y=paragraph(ctx,`${c.name}: ${c.percent===null?'sem percentual':c.percent+'%'} • ${c.count}/${score.denominator} coincidências`,P,y,CONTENT,compact?30:36,600)+12;
  return paragraph(ctx,`Base: ${score.denominator} respostas elegíveis. Percentuais independentes.`,P,y+5,CONTENT,28,400,colors.muted)+24;
}
function blobFrom(c) { return new Promise((resolve,reject)=>c.toBlob(b=>b?resolve(b):reject(new Error('Não foi possível gerar o PNG.')),'image/png')); }
export async function socialImage(session,proposals) {
  if(cache?.session===session && cache.revision===session.revision) return cache.blob;
  const images=await assets(), score=calculate(session,proposals),c=canvas(),ctx=c.getContext('2d');
  if(!ctx) throw new Error('Canvas indisponível neste navegador.');
  try {
    base(ctx,1,1);let y=resultHeader(ctx,score,images);
    y=paragraph(ctx,`Pesquisa ${levels[session.level].label} • ${dateLabel(session)}`,P,y,CONTENT,28)+28;
    const matches = [...new Map(score.leaders.flatMap(r=>r.matches).map(p=>[p.id,p])).values()].slice(0,3);
    if(matches.length) {
      y=paragraph(ctx,'Pautas em que houve coincidência',P,y,CONTENT,32,700)+18;
      for(const p of matches) y=paragraph(ctx,`• ${p.title} — ${answerLabel(session.answersByQuestionId[p.id])}`,P,y,CONTENT,30)+18;
    } else y=paragraph(ctx,'Ainda não há coincidências para explicar. Respostas exploratórias, “Depende” e “Sem opinião” não pontuam.',P,y,CONTENT,32)+20;
    paragraph(ctx,'Base beta restrita a registros históricos. Uma base pequena limita a interpretação; este resultado não identifica o voto ideal.',P,y+10,CONTENT,28,400,colors.muted);
    const blob=await blobFrom(c);cache={session,revision:session.revision,blob};return blob;
  } finally {c.width=1;c.height=1;}
}
function answerBlock(ctx,session,id,index) {
  const p=proposalById[id];
  const parts=[{text:`${index+1}. ${p.title}`,size:34,weight:700},{text:`Sua resposta: ${answerLabel(session.answersByQuestionId[id])}`,size:32,weight:600},{text:exclusion(p,session.answersByQuestionId[id]),size:28,weight:400}];
  let height=30;
  for(const part of parts){font(ctx,part.size,part.weight);part.lines=wrapText(ctx,part.text,CONTENT);height+=part.lines.length*part.size*1.4+10;}
  return {id,parts,height};
}
export function paginateBlocks(blocks,firstY,nextY=260,bottom=BOTTOM) {
  const pages=[[]];let y=firstY;
  for(const block of blocks) {
    if(block.height>bottom-nextY) throw new Error('Uma resposta excede o espaço disponível de uma página.');
    if(y+block.height>bottom){pages.push([]);y=nextY;}
    pages.at(-1).push(block);y+=block.height;
  }
  return pages;
}
export async function fullReportImages(session,proposals,onProgress=()=>{}) {
  const images=await assets(),score=calculate(session,proposals),measure=canvas(),ctx=measure.getContext('2d');
  if(!ctx) throw new Error('Canvas indisponível neste navegador.');
  let firstY=resultHeader(ctx,score,images,152,true);
  firstY=paragraph(ctx,`${levels[session.level].label} • ${session.questionOrder.length} perguntas • ${dateLabel(session)}`,P,firstY,CONTENT,28)+10;
  firstY=paragraph(ctx,`Expectativa opcional: ${session.expectation || 'Não respondida'}`,P,firstY,CONTENT,30)+10;
  firstY=paragraph(ctx,'Base histórica beta restrita; não representa intenção de voto. Itens excluídos são identificados abaixo.',P,firstY,CONTENT,28)+30;
  const blocks=session.questionOrder.map((id,i)=>answerBlock(ctx,session,id,i));
  const pages=paginateBlocks(blocks,firstY);measure.width=1;measure.height=1;
  const files=[];
  for(let i=0;i<pages.length;i++) {
    onProgress(i+1,pages.length);const c=canvas(),context=c.getContext('2d');
    try {
      base(context,i+1,pages.length);let y;
      if(i===0) {
        y=resultHeader(context,score,images,152,true);
        y=paragraph(context,`${levels[session.level].label} • ${session.questionOrder.length} perguntas • ${dateLabel(session)}`,P,y,CONTENT,28)+10;
        y=paragraph(context,`Expectativa opcional: ${session.expectation || 'Não respondida'}`,P,y,CONTENT,30)+10;
        y=paragraph(context,'Base histórica beta restrita; não representa intenção de voto. Itens excluídos são identificados abaixo.',P,y,CONTENT,28)+30;
      } else { paragraph(context,'Suas respostas • continuação',P,145,CONTENT,38,700);paragraph(context,'Lula × Flávio Bolsonaro',P,205,CONTENT,28);y=260; }
      for(const block of pages[i]) {
        for(const part of block.parts) {font(context,part.size,part.weight);context.fillStyle=colors.ink;for(const line of part.lines){context.fillText(line,P,y);y+=part.size*1.4;}y+=10;}
        y+=30;
      }
      files.push({name:`entre-pautas-pagina-${String(i+1).padStart(2,'0')}.png`,blob:await blobFrom(c),ids:pages[i].map(b=>b.id)});
    } finally { c.width=1;c.height=1; }
    await new Promise(resolve=>setTimeout(resolve,0));
  }
  return files;
}
