'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const http=require('node:http');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 const full=path.resolve(root,'.'+pathname);
 if(!full.startsWith(root+path.sep)||!['.html','.json'].includes(path.extname(full))){res.writeHead(404);res.end();return;}
 fs.readFile(full,(err,data)=>{
  if(err){res.writeHead(404);res.end();return;}
  res.writeHead(200,{'Content-Type':path.extname(full)==='.json'?'application/json':'text/html; charset=utf-8','Cache-Control':'no-store'});res.end(data);
 });
});
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const browser=await chromium.launch({headless:true});
 try{
  for(const width of [320,390,1280]){
   const context=await browser.newContext({viewport:{width,height:800}});
   const page=await context.newPage();
   await page.goto('http://127.0.0.1:'+server.address().port+'/grade-11/sets-preview.html');
   await page.locator('article.card').first().waitFor();
   assert.equal(await page.locator('article.card').count(),4);
   assert.equal(await page.locator('#retry').isVisible(),false);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'horizontal overflow at '+width);
   // Independently check the strict boundary 11² = 121 is excluded.
   const practice=page.locator('article.card').first().locator('.practice');
   assert.equal(await practice.locator('button').count(),2);
   await practice.locator('button').first().click();
   assert.match(await practice.locator('[role=status]').innerText(),/121/);
   await practice.locator('button').nth(1).click();
   assert.match(await practice.locator('[role=status]').innerText(),/Correct!/);
   await page.locator('article.card summary').first().focus();
   await page.keyboard.press('Enter');
   assert.equal(await page.locator('article.card details').first().getAttribute('open'),'');
   await page.locator('#ta').click();
   assert.equal(await page.locator('html').getAttribute('lang'),'ta');
   assert.equal(await page.locator('#ta').getAttribute('aria-pressed'),'true');
   assert.match(await page.locator('article.card').first().innerText(),/வினா/);
   await page.locator('article.card').first().locator('.practice button').nth(1).click();
   assert.match(await page.locator('article.card').first().locator('.practice [role=status]').innerText(),/121/);
   await context.setOffline(true);
   await page.locator('#en').click();
   assert.equal(await page.locator('article.card').count(),4);
   await context.close();
   console.log('PASS Grade 11 bilingual keyboard/mobile/offline-loaded lesson '+width);
  }
  const context=await browser.newContext({viewport:{width:320,height:800}});
  const page=await context.newPage();
  await page.route('**/g11-ch1-ex1-1-q1.json',route=>route.abort());
  await page.goto('http://127.0.0.1:'+server.address().port+'/grade-11/sets-preview.html');
  await page.locator('#retry:visible').waitFor();
  await page.locator('#ta').click();
  assert.match(await page.locator('#error').innerText(),/பாடத்தை ஏற்ற முடியவில்லை/);
  await page.unroute('**/g11-ch1-ex1-1-q1.json');
  await page.locator('#retry').click();
  await page.locator('article.card').first().waitFor();
  assert.equal(await page.locator('article.card').count(),4);
  await context.close();
  console.log('PASS Grade 11 bilingual network error and recovery');
 }finally{await browser.close();}
})().catch(err=>{console.error(err);process.exitCode=1;}).finally(()=>server.close());
