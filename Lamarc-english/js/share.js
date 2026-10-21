import { config } from './config.js';
export function shareText(result) { return `Fiz a avaliação de inglês escrito da ${config.brand}! Resultado estimado: ${result.level} — ${result.percent}% de acertos. Faça a sua: ${config.url}`; }
function wrapped(ctx, text, x, y, width, lineHeight) {
  let line='';
  // Quebra por caracteres também acomoda um nome sem espaços.
  for(const char of text) {
    if(ctx.measureText(line+char).width>width) {ctx.fillText(line,x,y);y+=lineHeight;line='';}
    line+=char;
  }
  if(line) {ctx.fillText(line,x,y);y+=lineHeight;}
  return y;
}
export async function resultImage(result,name,format='feed') {
  if(document.fonts?.ready)await document.fonts.ready;
  const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=format==='story'?1920:1350;
  const ctx=canvas.getContext('2d');
  if(!ctx)throw new Error('Este navegador não permite gerar a imagem. Use o relatório de impressão.');
  const height=canvas.height;
  ctx.fillStyle='#102944';ctx.fillRect(0,0,1080,height);
  ctx.fillStyle='#b9f36a';ctx.fillRect(80,88,72,10);
  ctx.fillStyle='#ffffff';ctx.font='bold 48px system-ui';ctx.fillText(config.brand,80,170);
  ctx.fillStyle='#d5e3ef';ctx.font='32px system-ui';let y=wrapped(ctx,'Meu resultado em inglês escrito',80,242,920,44);
  y+=format==='story'?160:50;
  if(name) {ctx.fillStyle='#ffffff';ctx.font='bold 40px system-ui';y=wrapped(ctx,name,80,y,920,54)+32;}
  ctx.fillStyle='#b9f36a';ctx.font='bold 88px system-ui';y=wrapped(ctx,result.level,80,y+46,920,106);
  ctx.fillStyle='#ffffff';ctx.font='32px system-ui';y=wrapped(ctx,'Nível estimado · resultado indicativo',80,y+18,920,44);
  ctx.font='bold 44px system-ui';y=wrapped(ctx,`${result.total}/24 acertos · ${result.percent}%`,80,y+48,920,58);
  ctx.font='28px system-ui';ctx.fillStyle='#d5e3ef';y=wrapped(ctx,result.date,80,y+12,920,40);
  if(['C1','C2'].includes(result.level))y=wrapped(ctx,`Indícios de ${result.level} nas habilidades avaliadas`,80,y+18,920,40);
  ctx.fillStyle='#ffffff';ctx.font='26px system-ui';
  wrapped(ctx,config.url,80,height-262,920,38);
  wrapped(ctx,config.author,80,height-182,920,38);
  ctx.fillStyle='#b9f36a';ctx.font='25px system-ui';wrapped(ctx,'Resultado indicativo • leitura, gramática e vocabulário',80,height-106,920,36);
  const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));
  if(!blob)throw new Error('Não foi possível gerar a imagem.');
  return {blob,canvas};
}
export function downloadImage(blob) {
  const url=URL.createObjectURL(blob), a=document.createElement('a');a.href=url;a.download='lamarc-english-resultado.png';a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);
}
export async function shareResult(blob,result) {
  const file=new File([blob],'lamarc-english-resultado.png',{type:'image/png'});
  if(navigator.share && navigator.canShare?.({files:[file]})) {
    try {await navigator.share({files:[file],title:config.brand,text:shareText(result)});return 'Compartilhamento aberto.';}
    catch(error) {if(error.name==='AbortError')return 'Compartilhamento cancelado.';}
  }
  downloadImage(blob);return 'Imagem baixada. Anexe-a manualmente ou copie o texto e o link abaixo.';
}
