import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
const base=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const out=path.join(base,'entre-pautas/test-results');await mkdir(out,{recursive:true});
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.jpg':'image/jpeg','.ttf':'font/ttf','.md':'text/plain; charset=utf-8'};
const server=createServer(async(req,res)=>{try{let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(name.endsWith('/'))name+='index.html';const target=path.resolve(base,'.'+name);if(!target.startsWith(base+path.sep))throw new Error();const bytes=await readFile(target);res.writeHead(200,{'Content-Type':mime[path.extname(target)]||'application/octet-stream'});res.end(bytes);}catch{res.writeHead(404);res.end();}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const url=`http://127.0.0.1:${server.address().port}/entre-pautas/`;
const browser=await chromium.launch({headless:true,channel:process.env.PLAYWRIGHT_CHANNEL||'chrome'});
try {
  const context=await browser.newContext({viewport:{width:375,height:812},deviceScaleFactor:1});
  const page=await context.newPage(),errors=[],external=[];
  page.on('pageerror',e=>errors.push(String(e)));page.on('request',req=>{if(!req.url().startsWith('http://127.0.0.1:')&&!req.url().startsWith('blob:'))external.push(req.url());});
  await page.goto(url);await page.getByRole('button',{name:'Iniciar pesquisa'}).waitFor();
  await page.evaluate(()=>{
    window.__draws=[];const original=CanvasRenderingContext2D.prototype.fillText;
    CanvasRenderingContext2D.prototype.fillText=function(text,x,y,...args){window.__draws.push({text,x,y,width:this.measureText(text).width,font:this.font});return original.call(this,text,x,y,...args);};
  });
  for(const width of [320,375,430,1280]){await page.setViewportSize({width,height:900});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow home ${width}`);await page.screenshot({path:path.join(out,`home-${width}.png`),fullPage:true});}
  await page.setViewportSize({width:320,height:812});
  await page.getByRole('button',{name:'Iniciar pesquisa'}).click();assert(await page.getByRole('button',{name:'Continuar'}).isDisabled());
  const first=await page.locator('h1').innerText();const ad=await page.locator('#ad-quizTop').elementHandle();await page.getByRole('radio',{name:'A favor',exact:false}).click();
  await page.getByRole('button',{name:'Mais detalhes da proposta'}).click();assert(await page.locator('dialog').isVisible());const detailText=await page.locator('#dialog-body').innerText();assert(!detailText.includes('Flávio Bolsonaro'));assert(!detailText.includes('Lula'));
  await page.keyboard.press('Escape');assert(await page.getByRole('button',{name:'Mais detalhes da proposta'}).evaluate(el=>el===document.activeElement));assert.equal(await page.getByRole('radio',{name:'A favor',exact:false}).getAttribute('aria-checked'),'true');
  await page.screenshot({path:path.join(out,'quiz-320.png'),fullPage:true});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.getByRole('button',{name:'Continuar'}).click();const second=await page.locator('h1').innerText();await page.getByRole('button',{name:'← Voltar',exact:true}).click();assert.equal(await page.locator('h1').innerText(),first);assert.equal(await page.getByRole('radio',{name:'A favor',exact:false}).getAttribute('aria-checked'),'true');await page.getByRole('button',{name:'Continuar'}).click();assert.equal(await page.locator('h1').innerText(),second);assert(await ad.evaluate(el=>el===document.getElementById('ad-quizTop')));
  // Termina a simples, com duas respostas favoráveis elegíveis.
  for(let i=1;i<10;i++){await page.getByRole('radio',{name:'A favor',exact:false}).click();await page.getByRole('button',{name:i===9?'Ver resultado':'Continuar'}).click();}
  assert((await page.locator('h1').innerText()).includes('Lula'));assert.equal(await page.locator('.candidate').count(),2);assert.equal(await page.locator('.candidate .percent').first().innerText(),'100%');
  assert(await page.locator('.portrait').evaluateAll(images=>images.every(img=>img.complete&&img.naturalWidth>0)));
  for(const mode of ['lula','flavio','tie','zero']){
    const social=await page.evaluate(async mode=>{
      const {createSession,answer}=await import('./session.js'),{proposals}=await import('./data.js'),{socialImage}=await import('./export-image.js'),{isComparable}=await import('./score.js');
      const s=createSession('simple');let i=0;for(const p of proposals.filter(isComparable))answer(s,p.id,mode==='zero'?'none':mode==='flavio'?'against':mode==='tie'&&i++===1?'against':'favor');s.expectation='Eu estava em dúvida.';window.__draws=[];
      const blob=await socialImage(s,proposals);return {bytes:Array.from(new Uint8Array(await blob.arrayBuffer())),draws:window.__draws};
    },mode);
    assert(!social.draws.some(d=>d.text.includes('Eu estava em dúvida.')));
    assert(social.draws.every(d=>d.x>=72&&d.x+d.width<=1009&&d.y+parseFloat(d.font.match(/(\d+)px/)[1])<=(d.y<1730?1685:1920)),`social texto fora do espaço ${mode}`);
    await import('node:fs/promises').then(fs=>fs.writeFile(path.join(out,`social-${mode}.png`),new Uint8Array(social.bytes)));
  }
  await page.evaluate(()=>{window.__draws=[];});
  await page.locator('#expectation').selectOption({label:'Eu estava em dúvida.'});
  const download=page.waitForEvent('download');await page.getByRole('button',{name:'Baixar respostas em TXT',exact:true}).click();const txt=await download;await txt.saveAs(path.join(out,'respostas.txt'));assert((await readFile(path.join(out,'respostas.txt'),'utf8')).includes('Eu estava em dúvida.'));
  await page.getByRole('button',{name:'Compartilhar resultado',exact:true}).click();await page.getByText('Imagem pronta. Confira a prévia e toque novamente para compartilhar.',{exact:true}).waitFor();assert(await page.locator('#social-preview img').isVisible());
  assert(!(await page.evaluate(()=>window.__draws.map(d=>d.text).join('\n'))).includes('Eu estava em dúvida.'));
  // Simula o share nativo e verifica o segundo gesto e o cancelamento benigno.
  await page.evaluate(()=>{Object.defineProperty(navigator,'canShare',{configurable:true,value:()=>true});Object.defineProperty(navigator,'share',{configurable:true,value:async data=>{window.__shared={files:data.files.length,text:data.text};throw new DOMException('Cancelado','AbortError');}});});
  await page.getByRole('button',{name:'Compartilhar resultado',exact:true}).click();await page.getByRole('button',{name:'Compartilhar imagem pronta',exact:true}).click();await page.getByText('Compartilhamento cancelado. Suas respostas foram mantidas.',{exact:true}).waitFor();assert.equal(await page.evaluate(()=>window.__shared.files),1);
  // Gera relatórios de todos os níveis e verifica cobertura, ordem, expectativa, tamanho e limites dos textos.
  for(const [key,count] of [['simple',10],['medium',25],['complete',40]]){
    if(key!=='simple'){
      await page.getByRole('button',{name:'Nova pesquisa',exact:true}).click();await page.getByRole('button',{name:'Apagar respostas e começar outra',exact:true}).click();await page.locator(`[data-level=${key}]`).click();await page.getByRole('button',{name:'Iniciar pesquisa'}).click();
      for(let i=0;i<count;i++){await page.getByRole('radio',{name:'A favor',exact:false}).click();await page.getByRole('button',{name:i===count-1?'Ver resultado':'Continuar'}).click();}
      await page.locator('#expectation').selectOption({label:'Eu estava em dúvida.'});
    }
    const report=await page.evaluate(async key=>{
      const {createSession,answer}=await import('./session.js'),{proposals}=await import('./data.js'),{fullReportImages}=await import('./export-image.js');
      const session=createSession(key,()=>.42);for(const id of session.questionOrder)answer(session,id,'favor');session.expectation='Eu estava em dúvida.';window.__draws=[];
      const files=await fullReportImages(session,proposals);const dimensions=[];for(const f of files){const img=await createImageBitmap(f.blob);dimensions.push([img.width,img.height]);img.close();}
      return {ids:files.flatMap(f=>f.ids),order:session.questionOrder,dimensions,draws:window.__draws};
    },key);
    assert.deepEqual(report.ids,report.order);assert.equal(report.ids.length,count);assert(report.dimensions.every(([w,h])=>w===1080&&h<=1920));assert(report.draws.some(d=>d.text.includes('Eu estava em dúvida.')));
    assert(report.draws.every(d=>d.x>=72&&d.x+d.width<=1009&&d.y>=0&&d.y+parseFloat(d.font.match(/(\d+)px/)[1])<=1920),`texto fora do canvas ${key}`);
    await page.getByRole('button',{name:'Baixar todas as respostas em imagem',exact:true}).click();await page.getByRole('link',{name:'Baixar todas as páginas em ZIP',exact:true}).waitFor();
    const figures=page.locator('#report-preview figure');assert(await figures.count()>1);const pngUrl=await figures.first().locator('img').getAttribute('src');const bytes=await page.evaluate(async src=>Array.from(new Uint8Array(await(await fetch(src)).arrayBuffer())),pngUrl);await import('node:fs/promises').then(fs=>fs.writeFile(path.join(out,`relatorio-${key}-01.png`),new Uint8Array(bytes)));
    const zipDownload=page.waitForEvent('download');await page.getByRole('link',{name:'Baixar todas as páginas em ZIP',exact:true}).click();await(await zipDownload).saveAs(path.join(out,`relatorio-${key}.zip`));
    for(const width of [320,430,1280]){await page.setViewportSize({width,height:900});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow resultado ${key} ${width}`);}
    await page.screenshot({path:path.join(out,`resultado-${key}-desktop.png`),fullPage:true});await page.setViewportSize({width:375,height:812});
  }
  // Revisão conserva expectativa e escolhas; falha de exportação não apaga a sessão.
  await page.getByRole('button',{name:'Revisar desde o início',exact:true}).click();assert.equal(await page.getByRole('radio',{name:'A favor',exact:false}).getAttribute('aria-checked'),'true');await page.getByRole('radio',{name:'Contra',exact:false}).click();
  for(let i=0;i<40;i++){await page.getByRole('button',{name:i===39?'Ver resultado':'Continuar'}).click();}
  assert.equal(await page.locator('#expectation').inputValue(),'Eu estava em dúvida.');
  await page.evaluate(()=>{HTMLCanvasElement.prototype.toBlob=function(callback){callback(null);};});await page.getByRole('button',{name:'Baixar resultado para redes',exact:true}).click();await page.getByText('Não foi possível concluir. Suas respostas foram mantidas. Tente novamente ou baixe o TXT.',{exact:true}).waitFor();assert(await page.getByRole('button',{name:'Baixar respostas em TXT',exact:true}).isEnabled());
  assert.equal(await page.locator('.review-item').count(),40);
  assert.equal(external.length,0,`requisições externas: ${external.join(',')}`);assert.deepEqual(errors,[]);
  const privacy=await page.evaluate(()=>({cookies:document.cookie,local:localStorage.length,session:sessionStorage.length}));assert.deepEqual(privacy,{cookies:'',local:0,session:0});
  await page.reload();await page.getByRole('button',{name:'Iniciar pesquisa'}).waitFor();
  // Imagens ausentes: nenhum retrato trocado; ambos os nomes continuam visíveis.
  await page.route('**/assets/candidates/*.jpg',route=>route.abort());await page.getByRole('button',{name:'Iniciar pesquisa'}).click();
  for(let i=0;i<10;i++){await page.getByRole('radio',{name:'Sem opinião',exact:false}).click();await page.getByRole('button',{name:i===9?'Ver resultado':'Continuar'}).click();}
  assert.equal(await page.locator('h1').innerText(),'Ainda sem comparação');await page.waitForTimeout(100);assert.equal(await page.locator('.photo-fallback:visible').count(),2);await page.screenshot({path:path.join(out,'sem-base-mobile.png'),fullPage:true});
  assert.deepEqual(errors,[]);console.log('Browser OK: mobile/desktop, fluxo, ordem, foco, fotos, revisão, 10/25/40, PNGs/ZIP/TXT, share cancelado, falhas e privacidade.');
} finally {await browser.close();await new Promise(resolve=>server.close(resolve));}
