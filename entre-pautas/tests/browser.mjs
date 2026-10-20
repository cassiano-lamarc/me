import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const out=path.join(root,'entre-pautas/test-results');await mkdir(out,{recursive:true});
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.jpg':'image/jpeg','.ttf':'font/ttf'};
const server=createServer(async(req,res)=>{try{let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(name.endsWith('/'))name+='index.html';const target=path.resolve(root,'.'+name);if(!target.startsWith(root+path.sep))throw Error();const bytes=await readFile(target);res.writeHead(200,{'Content-Type':mime[path.extname(target)]||'application/octet-stream'});res.end(bytes);}catch{res.writeHead(404);res.end();}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const browser=await chromium.launch({headless:true,channel:process.env.PLAYWRIGHT_CHANNEL||'chrome'});
try{
  const page=await browser.newPage({viewport:{width:375,height:812}}),errors=[],external=[];
  page.on('pageerror',e=>errors.push(String(e)));page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:')&&!r.url().startsWith('blob:'))external.push(r.url());});
  await page.goto(`http://127.0.0.1:${server.address().port}/entre-pautas/`);
  await page.evaluate(()=>{
    window.__draws=[];const draw=CanvasRenderingContext2D.prototype.fillText;
    CanvasRenderingContext2D.prototype.fillText=function(text,x,y,...args){window.__draws.push({text,x,y,width:this.measureText(text).width,font:this.font});return draw.call(this,text,x,y,...args);};
    Object.defineProperty(navigator,'share',{configurable:true,value:undefined});
  });
  for(const [level,count] of [['simple',10],['medium',25],['complete',40]]){
    await page.locator(`[data-level=${level}]`).click();await page.getByRole('button',{name:'Iniciar pesquisa'}).click();
    const order=[];
    for(let i=0;i<count;i++){
      order.push(await page.locator('h1').innerText());assert(Math.abs((await page.locator('h1').boundingBox()).y-20)<2);
      await page.getByRole('radio',{name:'A favor',exact:false}).click();
      if(i===0){await page.getByRole('button',{name:'Mais detalhes da proposta'}).click();await page.keyboard.press('Escape');assert(await page.getByRole('button',{name:'Mais detalhes da proposta'}).evaluate(el=>el===document.activeElement));}
      await page.getByRole('button',{name:i===count-1?'Ver resultado':'Continuar'}).click();
    }
    assert.equal(new Set(order).size,count);assert.equal(await page.locator('.review-item').count(),count);
    const sharing=page.locator('#sharing');assert.deepEqual(await sharing.locator('button').allTextContents(),['Compartilhar nas redes','Baixar imagem']);
    const shareBox=await sharing.boundingBox(),expectBox=await page.locator('#expectation').boundingBox();assert(expectBox.y>shareBox.y+shareBox.height);
    assert.equal(await page.getByRole('button',{name:/Copiar|TXT|todas as respostas|somente o link|imagem pronta/}).count(),0);
    await page.locator('#expectation').selectOption({label:'Eu estava em dúvida.'});
    const download=page.waitForEvent('download');await page.getByRole('button',{name:'Baixar imagem',exact:true}).click();await(await download).saveAs(path.join(out,`resultado-${level}.png`));await page.locator('#social-preview img').waitFor();
    const draws=await page.evaluate(()=>window.__draws);assert(draws.some(d=>d.text.includes('@cassianolamarc')));assert(draws.some(d=>d.text.includes('cassianolamarc.com.br')));assert(!draws.some(d=>d.text.includes('Eu estava em dúvida.')));
    assert(draws.every(d=>d.x>=72&&d.x+d.width<=1009&&d.y+Number(d.font.match(/(\d+)px/)[1])<=1920));assert.equal(await sharing.locator('button').count(),2);
    await page.getByRole('button',{name:'Compartilhar nas redes',exact:true}).click();assert.equal(await sharing.locator('button').count(),2);
    await page.evaluate(()=>{
      Object.defineProperty(navigator,'canShare',{configurable:true,value:()=>true});
      Object.defineProperty(navigator,'share',{configurable:true,value:async data=>{window.__shared=data.files.length;throw new DOMException('Cancelado','AbortError');}});
    });
    await page.getByRole('button',{name:'Compartilhar nas redes',exact:true}).click();await page.getByText('Compartilhamento cancelado. Suas respostas foram mantidas.',{exact:true}).waitFor();assert.equal(await page.evaluate(()=>window.__shared),1);
    await page.evaluate(()=>{Object.defineProperty(navigator,'canShare',{configurable:true,value:()=>false});});await page.getByRole('button',{name:'Compartilhar nas redes',exact:true}).click();assert.equal(await sharing.locator('button').count(),2);
    for(const width of [320,430,1280]){await page.setViewportSize({width,height:900});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
    await page.setViewportSize({width:375,height:812});await sharing.screenshot({path:path.join(out,`acoes-${level}.png`)});
    await page.getByRole('button',{name:'Revisar desde o início',exact:true}).click();assert.equal(await page.locator('h1').innerText(),order[0]);assert.equal(await page.getByRole('radio',{name:'A favor',exact:false}).getAttribute('aria-checked'),'true');
    await page.getByRole('button',{name:'Começar outra pesquisa',exact:true}).click();await page.getByRole('button',{name:'Apagar respostas e começar outra',exact:true}).click();
    console.log(`OK ${level}: ${count} respostas, duas ações, PNG com site/Instagram, expectativa abaixo, share/fallback.`);
  }
  assert.deepEqual(errors,[]);assert.deepEqual(external,[]);assert.deepEqual(await page.evaluate(()=>[document.cookie,localStorage.length,sessionStorage.length]),['',0,0]);
  console.log('Browser OK: navegação, foco, revisão, mobile/desktop e privacidade.');
}finally{await browser.close();server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}
