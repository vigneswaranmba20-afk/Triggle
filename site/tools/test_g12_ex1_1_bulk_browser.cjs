'use strict';
// Source-to-browser acceptance for the real Grade 12 Exercise 1.1, including offline reload.
const assert=require('node:assert/strict');
const fs=require('node:fs/promises'),http=require('node:http'),path=require('node:path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
const batches=[require('../../docs/curriculum/grade-12/batches/g12-ch1-ex1-1.json'),require('../../docs/curriculum/grade-12/batches/g12-ch1-ex1-2.json'),require('../../docs/curriculum/grade-12/batches/g12-ch1-ex1-3.json')];
async function main(batch){
 const fidelity=require('../data/textbook-fidelity/'+batch.batchId+'-en-2025.json');
 assert.deepEqual(fidelity.questions,batch.mapping,'Authored questions match visually reviewed source snapshots');
 const server=http.createServer(async(req,res)=>{
  try{
   const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
   const file=path.resolve(root,'.'+(pathname.endsWith('/')?pathname+'index.html':pathname));
   if(!file.startsWith(root+path.sep))throw Error('Outside site');
   const bytes=await fs.readFile(file);
   res.writeHead(200,{'content-type':({'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'})[path.extname(file)]||'application/octet-stream'});
   res.end(bytes);
  }catch{res.writeHead(404);res.end();}
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const base='http://127.0.0.1:'+server.address().port;
 let browser;
 try{
  browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});
  for(const width of [320,390,1280]){
   const ctx=await browser.newContext({viewport:{width,height:850},serviceWorkers:'block'});
   const page=await ctx.newPage(),errors=[],missing=[];
   page.on('pageerror',error=>errors.push(error.message));
   page.on('response',response=>{if(response.status()===404)missing.push(response.url());});
   if(batch.batchId==='g12-ch1-ex1-1'){await page.goto(base+'/index.html?class=12&chapter=g12-ch1');
   await page.locator('.hub-section-card[data-hub-section="exercises"]').click();}else await page.goto(base+'/index.html?class=12&question='+batch.records[0].id);
   assert.equal(new URL(page.url()).searchParams.get('question'),batch.records[0].id);
   for(let i=0;i<batch.records.length;i++){
    const record=batch.records[i];
    assert.equal(new URL(page.url()).searchParams.get('question'),record.id,'Every record navigable in order');
    const rendered=await page.locator('#questionText').evaluate(el=>{const copy=el.cloneNode(true);copy.querySelectorAll('math[aria-label]').forEach(m=>m.replaceWith(document.createTextNode(m.getAttribute('aria-label'))));copy.querySelectorAll('.frac').forEach(f=>f.replaceWith(document.createTextNode('[['+f.children[0].textContent+'|'+f.children[1].textContent+']]')));copy.querySelectorAll('sup').forEach(n=>n.replaceWith(document.createTextNode(n.textContent.replace(/[0-9]/g,c=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[+c]))));return copy.textContent;});
    assert.equal(rendered.replace(/\s+/g,' ').trim(),record.q.en.replace(/\s+/g,' ').trim(),'Exact source question '+record.id);
    assert.equal(await page.locator('#stepsList .final-answer-step').count(),1,'One final answer in How It Works');
    const authoredAnswer=await page.locator('#stepsList .final-answer-step').evaluate(el=>{const copy=el.cloneNode(true);copy.querySelectorAll('math[aria-label]').forEach(m=>m.replaceWith(document.createTextNode(m.getAttribute('aria-label'))));copy.querySelectorAll('.frac').forEach(f=>f.replaceWith(document.createTextNode('[['+f.children[0].textContent+'|'+f.children[1].textContent+']]')));copy.querySelectorAll('sup').forEach(n=>n.replaceWith(document.createTextNode(n.textContent.replace(/[0-9]/g,c=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[+c]))));return copy.textContent;});assert.ok(authoredAnswer.includes(record.answer),'Authored final answer rendered');
    assert.ok(await page.locator('#stepsRegion').isVisible());
    assert.equal(await page.locator('#figureBtn').isVisible(),false,'No invented compulsory diagram');
    assert.equal(await page.locator('#answerBox').isVisible(),false,'Existing final-answer presentation');
    const metrics=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,overflow:getComputedStyle(document.querySelector('#stepsRegion')).overflowY}));
    assert.ok(metrics.scroll<=metrics.width+1,'No page overflow at '+width+' '+record.id);
    assert.notEqual(metrics.overflow,'scroll','Continuous document reader preserved');
    if(i+1<batch.records.length)await page.locator('#next').click();
   }
   await page.locator('#previous').click();
   assert.equal(new URL(page.url()).searchParams.get('question'),batch.records.at(-2).id);
   await page.locator('#langTa').click();
   assert.match(await page.locator('#questionHead').innerText(),/English.*pending/i,'Tamil switch identifies pending content');
   assert.deepEqual(errors,[],'No browser errors');assert.deepEqual(missing,[],'No missing content or assets');
   await ctx.close();
  }
  const ctx=await browser.newContext({viewport:{width:390,height:850},serviceWorkers:'allow'});
  const page=await ctx.newPage();
  const url=base+'/index.html?class=12&question='+batch.records[0].id;
  await page.goto(url);
  await page.evaluate(async()=>{
   await navigator.serviceWorker.ready;
   if(!navigator.serviceWorker.controller)await new Promise(resolve=>navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true}));
  });
  const cached=await page.evaluate(async module=>{
   const keys=await caches.keys();
   for(const key of keys){if(await (await caches.open(key)).match('./'+module,{ignoreSearch:true}))return true;}
   return false;
  },batch.module);
  assert.equal(cached,true,'New module precached');
  await ctx.setOffline(true);await page.reload();
  assert.ok(await page.locator('#stepsList math mtable').count()>0,'Matrix solution structure available offline');
  await page.locator('#next').click();
  assert.equal(new URL(page.url()).searchParams.get('question'),batch.records[1].id,'Offline navigation');
  await ctx.close();
  console.log('PASS '+batch.batchId+': exact questions, all navigation, final answers, truthful Tamil, continuous reader, no 404/overflow, offline reload at mobile and desktop widths.');
 }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
}
(async()=>{for(const batch of batches)await main(batch);})().catch(error=>{console.error(error);process.exitCode=1;});
