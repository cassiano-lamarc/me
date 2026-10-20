import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { archivedProposals, proposals, levels } from '../data.js';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const out=path.join(root,'entre-pautas/test-results');await mkdir(out,{recursive:true});
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.jpg':'image/jpeg','.ttf':'font/ttf'};
const server=createServer(async(req,res)=>{try{let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(name.endsWith('/'))name+='index.html';const target=path.resolve(root,'.'+name);if(!target.startsWith(root+path.sep))throw Error();const bytes=await readFile(target);res.writeHead(200,{'Content-Type':mime[path.extname(target)]||'application/octet-stream'});res.end(bytes);}catch{res.writeHead(404);res.end();}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const browser=await chromium.launch({headless:true,channel:process.env.PLAYWRIGHT_CHANNEL||'chrome'});
try{
  const page=await browser.newPage({viewport:{width:375,height:812}}),errors=[],external=[];
  const adUrl='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7735416610367320';let adRequests=0;
  await page.route('https://pagead2.googlesyndication.com/**',async route=>{assert.equal(route.request().url(),adUrl);adRequests++;await route.fulfill({contentType:'application/javascript',body:'/* AdSense mock: sem anúncios reais durante testes. */'});});
  page.on('pageerror',e=>errors.push(String(e)));page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:')&&!r.url().startsWith('blob:')&&r.url()!==adUrl)external.push(r.url());});
  await page.goto(`http://127.0.0.1:${server.address().port}/entre-pautas/`);
  await page.evaluate(()=>{
    window.__draws=[];const draw=CanvasRenderingContext2D.prototype.fillText;
    CanvasRenderingContext2D.prototype.fillText=function(text,x,y,...args){window.__draws.push({text,x,y,width:this.measureText(text).width,font:this.font});return draw.call(this,text,x,y,...args);};
    Object.defineProperty(navigator,'share',{configurable:true,value:undefined});
  });
  assert.deepEqual(proposals.map(p=>p.id),['escola-integral','creches','internet-escolas','sus-atencao','telemedicina','saude-mental','moradia-social','energia-renovavel']);
  assert.deepEqual(Object.keys(levels),['simple']);assert.equal(await page.locator('[data-level]').count(),0);
  assert.equal(await page.locator('.selection-count').innerText(),`${proposals.length} perguntas disponíveis`);
  for(const [level,configuration] of Object.entries(levels)){
    const count=configuration.ids.length;
    await page.getByRole('button',{name:'Iniciar pesquisa'}).click();
    const order=[];
    for(let i=0;i<count;i++){
      order.push(await page.locator('h1').innerText());assert(Math.abs((await page.locator('h1').boundingBox()).y-20)<2);
      await page.getByRole('radio',{name:'A favor',exact:false}).click();
      if(i===0){await page.getByRole('button',{name:'Mais detalhes da proposta'}).click();await page.keyboard.press('Escape');assert(await page.getByRole('button',{name:'Mais detalhes da proposta'}).evaluate(el=>el===document.activeElement));}
      await page.getByRole('button',{name:i===count-1?'Ver resultado':'Continuar'}).click();
    }
    assert.equal(new Set(order).size,count);assert.deepEqual([...order].sort(),proposals.map(p=>p.title).sort());
    assert.equal(await page.locator('.review-item').count(),count);assert.deepEqual(await page.locator('.coverage-percent').allTextContents(),['100%','100%']);
    assert.equal(await page.locator('.candidate .portrait').count(),2);
    const accordion=page.locator('#review');assert.equal(await accordion.getAttribute('open'),null);
    assert(await page.evaluate(()=>Boolean(document.querySelector('#sharing').compareDocumentPosition(document.querySelector('#review'))&Node.DOCUMENT_POSITION_FOLLOWING)));
    await accordion.locator('summary').click();assert(await page.locator('.comparison-table').isVisible());
    const tableText=await page.locator('.comparison-table').innerText();
    for(const old of archivedProposals)assert(!tableText.includes(old.title));
    for(let i=0;i<count;i++)assert((await page.locator('.review-item').nth(i).innerText()).startsWith(`${i+1}. ${order[i]}`));
    const expectedSources=proposals.flatMap(p=>Object.values(p.positions).flatMap(position=>position.sources.map(source=>source.url)));
    assert.deepEqual((await accordion.locator('a').evaluateAll(links=>links.map(link=>link.getAttribute('href')))).sort(),expectedSources.sort());
    assert.match(tableText,/Publicação não informada/);
    for(const source of proposals.flatMap(p=>Object.values(p.positions).flatMap(position=>position.sources))){assert(tableText.includes(source.accessedAt));assert(tableText.includes(source.title));}
    await accordion.locator('summary').click();
    const sharing=page.locator('#sharing');assert.deepEqual(await sharing.locator('button').allTextContents(),['Compartilhar nas redes','Baixar imagem','Baixar TXT','Baixar imagens completas']);
    const shareBox=await sharing.boundingBox(),expectBox=await page.locator('#expectation').boundingBox();assert(expectBox.y>shareBox.y+shareBox.height);
    await page.locator('#expectation').selectOption({label:'Eu estava em dúvida.'});
    const download=page.waitForEvent('download');await page.getByRole('button',{name:'Baixar imagem',exact:true}).click();await(await download).saveAs(path.join(out,`resultado-${level}.png`));await page.locator('#social-preview img').waitFor();
    const draws=await page.evaluate(()=>window.__draws);assert(draws.some(d=>d.text.includes('@cassianolamarc')));assert(draws.some(d=>d.text.includes('cassianolamarc.com.br')));assert(!draws.some(d=>d.text.includes('Eu estava em dúvida.')));
    assert(draws.every(d=>d.x>=72&&d.x+d.width<=1009&&d.y+Number(d.font.match(/(\d+)px/)[1])<=1920));assert.equal(await sharing.locator('button').count(),4);
    await page.getByRole('button',{name:'Compartilhar nas redes',exact:true}).click();assert.equal(await sharing.locator('button').count(),4);
    await page.evaluate(()=>{
      Object.defineProperty(navigator,'canShare',{configurable:true,value:()=>true});
      Object.defineProperty(navigator,'share',{configurable:true,value:async data=>{window.__shared=data.files.length;throw new DOMException('Cancelado','AbortError');}});
    });
    await page.getByRole('button',{name:'Compartilhar nas redes',exact:true}).click();await page.getByText('Compartilhamento cancelado. Suas respostas foram mantidas.',{exact:true}).waitFor();assert.equal(await page.evaluate(()=>window.__shared),1);
    await page.evaluate(()=>{Object.defineProperty(navigator,'canShare',{configurable:true,value:()=>false});});await page.getByRole('button',{name:'Compartilhar nas redes',exact:true}).click();assert.equal(await sharing.locator('button').count(),4);
    const txtEvent=page.waitForEvent('download');await page.getByRole('button',{name:'Baixar TXT',exact:true}).click();const txt=await txtEvent,txtPath=path.join(out,`comparacao-${level}.txt`);await txt.saveAs(txtPath);
    const report=await readFile(txtPath,'utf8');for(const title of order)assert(report.includes(title));for(const url of expectedSources)assert(report.includes(url));
    for(const old of archivedProposals)assert(!report.includes(old.title));
    assert(report.includes('100% de cobertura documental'));assert(report.includes('Eu estava em dúvida.'));assert.match(report,/Publicação não informada/);
    const zipEvent=page.waitForEvent('download');await page.getByRole('button',{name:'Baixar imagens completas',exact:true}).click();const zip=await zipEvent,zipPath=path.join(out,`comparacao-${level}.zip`);await zip.saveAs(zipPath);
    const zipBytes=await readFile(zipPath);assert.equal(zipBytes.readUInt32LE(0),0x04034b50);assert(zipBytes.includes(Buffer.from('entre-pautas-pagina-01.png')));
    for(const width of [320,430,1280]){await page.setViewportSize({width,height:900});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
    await page.setViewportSize({width:375,height:812});await sharing.screenshot({path:path.join(out,`acoes-${level}.png`)});
    await page.getByRole('button',{name:'Revisar desde o início',exact:true}).click();assert.equal(await page.locator('h1').innerText(),order[0]);assert.equal(await page.getByRole('radio',{name:'A favor',exact:false}).getAttribute('aria-checked'),'true');
    await page.getByRole('radio',{name:'Contra',exact:false}).click();
    for(let i=0;i<count;i++){assert.equal(await page.locator('h1').innerText(),order[i]);await page.getByRole('button',{name:i===count-1?'Ver resultado':'Continuar',exact:false}).click();}
    assert.deepEqual(await page.locator('.coverage-percent').allTextContents(),['100%','100%']);
    await page.locator('#review > summary').click();assert((await page.locator('.review-item').first().locator('td').first().innerText()).startsWith('Contra'));
    await page.getByRole('button',{name:'Revisar desde o início',exact:true}).click();
    await page.getByRole('button',{name:'Começar outra pesquisa',exact:true}).click();await page.getByRole('button',{name:'Apagar respostas e começar outra',exact:true}).click();
    console.log(`OK ${level}: ${count} recortes TSE, citações por página, publicação desconhecida, quatro saídas, acordeão, revisão e cobertura invariável.`);
  }
  assert.equal(adRequests,1);assert.deepEqual(errors,[]);assert.deepEqual(external,[]);assert.deepEqual(await page.evaluate(()=>[document.cookie,localStorage.length,sessionStorage.length]),['',0,0]);
  console.log('Browser OK: navegação, foco, revisão, mobile/desktop e privacidade.');
}finally{await browser.close();server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}
