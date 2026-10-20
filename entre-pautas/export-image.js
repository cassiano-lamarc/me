import { candidates, CANONICAL_URL } from './candidates.js';
import { levels, proposalById, answerLabel } from './data.js';
import { compareDocuments } from './score.js';
import { resultTitle, dateLabel, coverageText, rowText, groupContext, groupCoverageText } from './report.js';
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
  y=paragraph(ctx,'Comparação factual. Não é recomendação de voto.',P,y,CONTENT,24);
  y=paragraph(ctx,'@cassianolamarc • cassianolamarc.com.br',P,y+5,CONTENT,26,700);
  y=paragraph(ctx,'Desenvolvido por Cassiano Lamarc • cassianolamarc.com.br/entre-pautas/',P,y+5,CONTENT,18);
  y=paragraph(ctx,'Fotos: Ricardo Stuckert/PR • CC BY 2.0; Carlos Moura/Ag. Senado • CC BY-SA 4.0',P,y+5,CONTENT,16);
  paragraph(ctx,`Página ${page} de ${total} • composição exportada CC BY-SA 4.0`,P,y+5,CONTENT,18);
}
function resultHeader(ctx,comparison,images,start=152,compact=false) {
 let y=paragraph(ctx,resultTitle(),P,start,CONTENT,compact?44:58,700),width=CONTENT/2;
 candidates.forEach((c,i)=>{portrait(ctx,images[i],P+i*width,y+22,compact?100:150,compact?112:168,c.initials);paragraph(ctx,c.name,P+i*width+(compact?118:170),y+30,width-(compact?130:182),compact?28:32,700);});
 y+=compact?155:210;
 y=paragraph(ctx,coverageText(comparison),P,y,CONTENT,compact?28:36,600)+16;
 for(const g of comparison.byGroup)y=paragraph(ctx,groupCoverageText(g),P,y,CONTENT,compact?24:28,600)+10;
 return y+18;
}
function blobFrom(c) { return new Promise((resolve,reject)=>c.toBlob(b=>b?resolve(b):reject(new Error('Não foi possível gerar o PNG.')),'image/png')); }
export async function socialImage(session,proposals) {
 if(cache?.session===session && cache.revision===session.revision)return cache.blob;
 const images=await assets(),comparison=compareDocuments(session,proposals),c=canvas(),ctx=c.getContext('2d');
 if(!ctx)throw new Error('Canvas indisponível neste navegador.');
 try{base(ctx,1,1);let y=resultHeader(ctx,comparison,images);
 y=paragraph(ctx,'Pesquisa '+levels[session.level].label+' • '+dateLabel(session),P,y,CONTENT,28)+32;
 for(const text of ['Cobertura documental, sem classificação de candidatos.',groupContext,'Posição não confirmada indica uma lacuna na base. Ausência de registro não significa oposição.','Registros históricos não certificam posições atuais. Consulte fontes, datas e ressalvas na tabela do site ou no relatório completo.','A cobertura independe das respostas do visitante. Não calculamos afinidade nem recomendamos voto.'])y=paragraph(ctx,text,P,y,CONTENT,32)+28;
 const blob=await blobFrom(c);cache={session,revision:session.revision,blob};return blob;
 }finally{c.width=1;c.height=1;}
}
function textBlock(ctx,text,id,heading=false){const size=heading?32:25,weight=heading?700:400;font(ctx,size,weight);const lines=wrapText(ctx,text,CONTENT);return {id,parts:[{text,size,weight,lines}],height:lines.length*size*1.4+24};}
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
 const images=await assets(),comparison=compareDocuments(session,proposals),measure=canvas(),ctx=measure.getContext('2d');
 if(!ctx)throw new Error('Canvas indisponível neste navegador.');
 const firstY=resultHeader(ctx,comparison,images,152,true)+75;
 const blocks=comparison.rows.flatMap((row,i)=>rowText(row,i).map((line,j)=>textBlock(ctx,(j?'Pergunta '+(i+1)+' • ':'')+line,row.proposal.id,j===0)));
 const pages=paginateBlocks(blocks,firstY);measure.width=1;measure.height=1;const files=[];
 for(let i=0;i<pages.length;i++){
 onProgress(i+1,pages.length);const c=canvas(),context=c.getContext('2d');
 try{base(context,i+1,pages.length);let y;
 if(i===0){y=resultHeader(context,comparison,images,152,true);paragraph(context,'Registros históricos; fontes e contexto a seguir.',P,y,CONTENT,25);y=firstY;}
 else{paragraph(context,'Comparação factual • continuação',P,145,CONTENT,38,700);paragraph(context,'Lula × Flávio Bolsonaro • fontes e ressalvas',P,205,CONTENT,25);y=260;}
 for(const block of pages[i]){for(const part of block.parts){font(context,part.size,part.weight);context.fillStyle=colors.ink;for(const line of part.lines){context.fillText(line,P,y);y+=part.size*1.4;}}y+=24;}
 files.push({name:'entre-pautas-pagina-'+String(i+1).padStart(2,'0')+'.png',blob:await blobFrom(c),ids:[...new Set(pages[i].map(b=>b.id))]});
 }finally{c.width=1;c.height=1;}
 await new Promise(resolve=>setTimeout(resolve,0));
 }return files;
}
