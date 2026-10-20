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
  const adUrl='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7735416610367320';let adRequests=0;
  await page.route('https://pagead2.googlesyndication.com/**',async route=>{assert.equal(route.request().url(),adUrl);adRequests++;await route.fulfill({contentType:'application/javascript',body:'/* AdSense mock: sem anúncios reais durante testes. */'});});
  page.on('pageerror',e=>errors.push(String(e)));page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:')&&!r.url().startsWith('blob:')&&r.url()!==adUrl)external.push(r.url());});
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
    assert.equal(await page.locator('.comparison-table tbody tr').count(),count);
    assert.equal(await page.locator('.candidate-grid .portrait').count(),2);
    assert.equal(await page.locator('.percent').count(),0);
    const expectedGroupPercent=await page.evaluate(async level=>{const {proposals,levels}=await import('/entre-pautas/data.js');const {compareDocuments}=await import('/entre-pautas/score.js');return compareDocuments({questionOrder:levels[level].ids,answersByQuestionId:{}},proposals).byGroup.map(g=>g.percent+'%');},level);
    assert.deepEqual(await page.locator('.coverage-percent').allTextContents(),expectedGroupPercent);
    assert.equal(await page.locator('.coverage-label').first().innerText(),'Cobertura documental');
    const accordion=page.locator('#review');
    assert.equal(await accordion.evaluate(el=>el.tagName),'DETAILS');
    assert.equal(await accordion.getAttribute('open'),null);
    assert.equal(await page.locator('.comparison-table').isVisible(),false);
    await accordion.locator('summary').focus();await page.keyboard.press('Enter');
    assert.equal(await page.locator('.comparison-table').isVisible(),true);
    assert.deepEqual(await page.locator('.comparison-table thead th').allTextContents(),['Proposta','Sua resposta','Lula e PT','Flávio Bolsonaro e PL']);
    assert.equal(await page.locator('.actor-record').count(),count*5);
    if(level!=='simple'){
      const tele=page.locator('.review-item').filter({hasText:'Ampliar consultas a distância no SUS'});
      assert((await tele.innerText()).includes('Referência contextual prioritária: Jair Bolsonaro'));
    }
    await accordion.locator('summary').click();
    assert.equal(await page.locator('.comparison-table').isVisible(),false);
    const sharePosition=await page.locator('#sharing').boundingBox(),accordionPosition=await accordion.boundingBox();
    assert(sharePosition.y+sharePosition.height<=accordionPosition.y);
    const mainShare=await page.locator('#sharing [data-action=prepare-share]').boundingBox();
    assert(mainShare.height>=64);assert(mainShare.width>sharePosition.width*.8);
    assert(!(await page.locator('h1').innerText()).includes('coincidências'));
    const expectedCoverage=await page.evaluate(async level=>{const {proposals,levels}=await import('/entre-pautas/data.js');const {compareDocuments}=await import('/entre-pautas/score.js');const {coverageText}=await import('/entre-pautas/report.js');return coverageText(compareDocuments({questionOrder:levels[level].ids,answersByQuestionId:{}},proposals));},level);
    assert.equal(await page.locator('.lead').innerText(),expectedCoverage);
    await page.screenshot({path:path.join(out,`consulta-${level}.png`)});
    const sharing=page.locator('#sharing');assert.deepEqual(await sharing.locator('button').allTextContents(),['Compartilhar nas redes','Baixar imagem','Baixar TXT','Baixar imagens completas']);
    const shareBox=await sharing.boundingBox(),expectBox=await page.locator('#expectation').boundingBox();assert(expectBox.y>shareBox.y+shareBox.height);
    const textDownload=page.waitForEvent('download');await page.locator('[data-action=txt]').click();
    const txt=await textDownload;await txt.saveAs(path.join(out,`comparacao-${level}.txt`));
    const report=await readFile(path.join(out,`comparacao-${level}.txt`),'utf8');
    assert(report.includes('Posição não confirmada'));assert(!report.includes('Mais coincidências'));assert(!report.includes('respostas elegíveis'));
    for(const [i,title] of order.entries())assert(report.includes(`${i+1}. ${title}`));
    const imageDownload=page.waitForEvent('download',{timeout:120000});await page.locator('[data-action=full-images]').click();await(await imageDownload).saveAs(path.join(out,`comparacao-${level}.zip`));
    const fullDraws=await page.evaluate(()=>window.__draws);assert(fullDraws.some(d=>d.text.includes('Fonte:')));assert(fullDraws.some(d=>d.text.includes('Posição não confirmada')));
    const imageText=fullDraws.map(d=>d.text).join('').replaceAll(/\s/g,'');
    for(const [i,title] of order.entries())assert(imageText.includes(`${i+1}. ${title}`.replaceAll(/\s/g,'')));
    assert(fullDraws.every(d=>d.x>=72&&d.x+d.width<=1009&&d.y+Number(d.font.match(/(\d+)px/)[1])<=1920));
    await page.evaluate(()=>{window.__draws=[];});
    await page.locator('#expectation').selectOption({label:'Preciso consultar as fontes com mais detalhes.'});
    const download=page.waitForEvent('download');await page.getByRole('button',{name:'Baixar imagem',exact:true}).click();await(await download).saveAs(path.join(out,`resultado-${level}.png`));await page.locator('#social-preview img').waitFor();
    const draws=await page.evaluate(()=>window.__draws);assert(draws.some(d=>d.text.includes('@cassianolamarc')));assert(draws.some(d=>d.text.includes('cassianolamarc.com.br')));assert(!draws.some(d=>d.text.includes('Preciso consultar as fontes com mais detalhes.')));
    assert(draws.map(d=>d.text).join('').replaceAll(/\s/g,'').includes(expectedCoverage.replaceAll(/\s/g,'')));
    assert(draws.every(d=>d.x>=72&&d.x+d.width<=1009&&d.y+Number(d.font.match(/(\d+)px/)[1])<=1920));assert.equal(await sharing.locator('button').count(),4);
    await page.getByRole('button',{name:'Compartilhar nas redes',exact:true}).click();assert.equal(await sharing.locator('button').count(),4);
    await page.evaluate(()=>{
      Object.defineProperty(navigator,'canShare',{configurable:true,value:()=>true});
      Object.defineProperty(navigator,'share',{configurable:true,value:async data=>{window.__shared=data.files.length;throw new DOMException('Cancelado','AbortError');}});
    });
    await page.getByRole('button',{name:'Compartilhar nas redes',exact:true}).click();await page.getByText('Compartilhamento cancelado. Suas respostas foram mantidas.',{exact:true}).waitFor();assert.equal(await page.evaluate(()=>window.__shared),1);
    await page.evaluate(()=>{Object.defineProperty(navigator,'canShare',{configurable:true,value:()=>false});});await page.getByRole('button',{name:'Compartilhar nas redes',exact:true}).click();assert.equal(await sharing.locator('button').count(),4);
    for(const width of [320,430,1280]){await page.setViewportSize({width,height:900});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
    await accordion.locator('summary').click();await accordion.scrollIntoViewIfNeeded();await page.screenshot({path:path.join(out,`tabela-${level}-desktop.png`)});
    await page.setViewportSize({width:375,height:812});await sharing.screenshot({path:path.join(out,`acoes-${level}.png`)});
    await page.getByRole('button',{name:'Revisar desde o início',exact:true}).click();assert.equal(await page.locator('h1').innerText(),order[0]);assert.equal(await page.getByRole('radio',{name:'A favor',exact:false}).getAttribute('aria-checked'),'true');
    await page.getByRole('button',{name:'Começar outra pesquisa',exact:true}).click();await page.getByRole('button',{name:'Apagar respostas e começar outra',exact:true}).click();
    console.log(`OK ${level}: ${count} linhas, cobertura, TXT, PNG, ZIP completo, revisão e compartilhamento.`);
  }
  assert.equal(adRequests,1);assert.deepEqual(errors,[]);assert.deepEqual(external,[]);assert.deepEqual(await page.evaluate(()=>[document.cookie,localStorage.length,sessionStorage.length]),['',0,0]);
  console.log('Browser OK: navegação, foco, revisão, mobile/desktop e privacidade.');
}finally{await browser.close();server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}
