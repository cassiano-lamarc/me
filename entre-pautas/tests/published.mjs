// Read-only diagnostic of the version actually served by GitHub Pages.
import { chromium } from 'playwright';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
const base='https://cassianolamarc.com.br/entre-pautas/';
const report={checkedAt:new Date().toISOString(),files:[],runs:[],errors:[]};
for(const name of ['index.html','app.js','data.js','evidence.js','group-records.js','candidates.js','score.js','report.js','export-image.js','session.js']){
 const response=await fetch(base+name),body=await response.text();
 const local=await readFile(new URL('../'+name,import.meta.url),'utf8');
 report.files.push({name,status:response.status,contentType:response.headers.get('content-type'),cacheControl:response.headers.get('cache-control'),age:response.headers.get('age'),sameAsWorkingTree:body.replaceAll('\r\n','\n')===local.replaceAll('\r\n','\n')});
}
const browser=await chromium.launch({headless:true,channel:process.env.PLAYWRIGHT_CHANNEL||'chrome'});
try{
 for(const choice of ['favor','depends']){
  const page=await browser.newPage();
  await page.route('https://pagead2.googlesyndication.com/**',route=>route.fulfill({contentType:'application/javascript',body:'/* diagnostic mock */'}));
  page.on('pageerror',e=>report.errors.push(String(e)));
  page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)report.errors.push(r.status()+' '+r.url());});
  await page.goto(base);await page.locator('[data-action=start]').click();
  for(let i=0;i<10;i++){await page.locator('[data-answer='+choice+']').click();await page.locator('[data-action=next]').click();}
  report.runs.push({syntheticChoice:choice,title:await page.locator('h1').innerText(),percentages:await page.locator('.percent').allTextContents(),notice:await page.locator('.notice').first().innerText()});
  await page.close();
 }
}finally{await browser.close();}
await mkdir(new URL('../test-results/',import.meta.url),{recursive:true});
await writeFile(new URL('../test-results/published-diagnostic.json',import.meta.url),JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
