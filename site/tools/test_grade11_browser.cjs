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
   // Loaded lesson remains usable without a network: practice and derivations are local.
   const offlinePractice=page.locator('article.card').first().locator('.practice');
   await offlinePractice.locator('button').nth(1).click();
   assert.match(await offlinePractice.locator('[role=status]').innerText(),/Correct!/);
   await page.locator('article.card summary').first().click();
   assert.equal(await page.locator('article.card details').first().getAttribute('open'),'');
   await context.close();
   console.log('PASS Grade 11 bilingual keyboard/mobile/offline-loaded lesson '+width);
  }
  // Exercise 1.1 Question 2 must be visible and usable on mobile in both languages.
  for(const width of [320,390,1280]){
   const ctx=await browser.newContext({viewport:{width,height:800}});
   const p=await ctx.newPage();
   await p.goto('http://127.0.0.1:'+server.address().port+'/grade-11/sets-q2-preview.html');
   await p.locator('#lesson article').waitFor();
   assert.match(await p.locator('#lesson').innerText(),/−1, 1/);
   await p.locator('#lesson summary').focus();await p.keyboard.press('Enter');
   assert.equal(await p.locator('#lesson details').getAttribute('open'),'');
   await p.locator('#ta').click();
   assert.equal(await p.locator('html').getAttribute('lang'),'ta');
   assert.match(await p.locator('#lesson').innerText(),/கணக் கட்டமைப்பு/);
   assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   await ctx.setOffline(true);
   await p.locator('#en').click();
   await p.locator('#lesson summary').click();
   assert.match(await p.locator('#lesson').innerText(),/x² = 1/);
   await ctx.close();
   console.log('PASS Grade 11 Q2 bilingual offline mobile '+width);
  }
  // Source-verified Exercise 1.1 Q3(i): even prime natural numbers form {2}.
  for(const width of [320,390,1280]){
   const ctx=await browser.newContext({viewport:{width,height:800}});
   const p=await ctx.newPage();
   await p.goto('http://127.0.0.1:'+server.address().port+'/grade-11/sets-q3-i-preview.html');
   await p.locator('#lesson article').waitFor();
   assert.match(await p.locator('#lesson').innerText(),/even primes/);
   await p.locator('#lesson summary').focus();await p.keyboard.press('Enter');
   assert.equal(await p.locator('#lesson details').getAttribute('open'),'');
   assert.match(await p.locator('#lesson').innerText(),/Finite: \{2\}/);
   await p.locator('#ta').click();
   assert.equal(await p.locator('html').getAttribute('lang'),'ta');
   // Language switching re-renders a closed <details>; reveal the answer before asserting.
   await p.locator('#lesson summary').focus();await p.keyboard.press('Enter');
   assert.equal(await p.locator('#lesson details').getAttribute('open'),'');
   assert.match(await p.locator('#lesson').innerText(),/முடிவுள்ள கணம்/);
   assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   await ctx.setOffline(true);
   await p.locator('#en').click();
   await p.locator('#lesson summary').click();
   assert.match(await p.locator('#lesson').innerText(),/Finite: \{2\}/);
   await ctx.close();
   console.log('PASS Grade 11 Q3(i) bilingual keyboard/offline mobile '+width);
  }
  // Exercise 1.1 Q3(ii): odd primes are infinite (Euclid-style proof).
  for(const width of [320,390,1280]){
   const ctx=await browser.newContext({viewport:{width,height:800}});
   const p=await ctx.newPage();
   await p.goto('http://127.0.0.1:'+server.address().port+'/grade-11/sets-q3-ii-preview.html');
   await p.locator('#lesson article').waitFor();
   assert.match(await p.locator('#lesson').innerText(),/odd prime/);
   await p.locator('#lesson summary').focus();
   await p.keyboard.press('Enter');
   assert.equal(await p.locator('#lesson details').getAttribute('open'),'');
   assert.match(await p.locator('#lesson').innerText(),/2p₁p₂/);
   assert.match(await p.locator('#lesson').innerText(),/Infinite set/);
   await p.locator('#ta').click();
   assert.equal(await p.locator('html').getAttribute('lang'),'ta');
   assert.equal(await p.locator('#ta').getAttribute('aria-pressed'),'true');
   await p.locator('#lesson summary').focus();await p.keyboard.press('Enter');
   assert.equal(await p.locator('#lesson details').getAttribute('open'),'');
   assert.match(await p.locator('#lesson').innerText(),/முடிவில்லாத கணம்/);
   assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Q3(ii) horizontal overflow '+width);
   await ctx.setOffline(true);
   await p.locator('#en').click();
   await p.locator('#lesson summary').click();
   assert.equal(await p.locator('#lesson details').getAttribute('open'),'');
   assert.match(await p.locator('#lesson').innerText(),/Infinite set/);
   await ctx.close();
   console.log('PASS Grade 11 Q3(ii) bilingual keyboard/offline mobile '+width);
  }
  // Grade 11 Q3(iii): even integers below 10 are infinite because negatives are unbounded.
  for(const width of [320,390,1280]){
   const ctx=await browser.newContext({viewport:{width,height:800}});
   const p=await ctx.newPage();
   await p.goto('http://127.0.0.1:'+server.address().port+'/grade-11/sets-q3-iii-preview.html');
   await p.locator('#lesson article').waitFor();
   assert.match(await p.locator('#lesson').innerText(),/even integers less than 10/);
   await p.locator('#lesson summary').focus();await p.keyboard.press('Enter');
   assert.equal(await p.locator('#lesson details').getAttribute('open'),'');
   assert.match(await p.locator('#lesson').innerText(),/Infinite set/);
   await p.locator('#ta').click();
   assert.equal(await p.locator('html').getAttribute('lang'),'ta');
   await p.locator('#lesson summary').focus();await p.keyboard.press('Enter');
   assert.equal(await p.locator('#lesson details').getAttribute('open'),'');
   assert.match(await p.locator('#lesson').innerText(),/முடிவில்லாத கணம்/);
   assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   await ctx.setOffline(true);
   await p.locator('#en').click();
   await p.locator('#lesson summary').click();
   assert.match(await p.locator('#lesson').innerText(),/Infinite set/);
   await ctx.close();
   console.log('PASS Grade 11 Q3(iii) bilingual keyboard/offline mobile '+width);
  }
  // Grade 11 Q3(iv-v): rational real and rational natural numbers are infinite.
  for(const suffix of ['iv','v'])for(const width of [320,390,1280]){
   const ctx=await browser.newContext({viewport:{width,height:800}});
   const p=await ctx.newPage();
   await p.goto('http://127.0.0.1:'+server.address().port+'/grade-11/sets-q3-'+suffix+'-preview.html');
   await p.locator('#lesson article').waitFor();
   await p.locator('#lesson summary').focus();await p.keyboard.press('Enter');
   assert.equal(await p.locator('#lesson details').getAttribute('open'),'');
   assert.match(await p.locator('#lesson').innerText(),/Infinite set/);
   await p.locator('#ta').click();
   assert.equal(await p.locator('html').getAttribute('lang'),'ta');
   await p.locator('#lesson summary').focus();await p.keyboard.press('Enter');
   assert.equal(await p.locator('#lesson details').getAttribute('open'),'');
   assert.match(await p.locator('#lesson').innerText(),/முடிவில்லாத கணம்/);
   assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   await ctx.setOffline(true);await p.locator('#en').click();
   await p.locator('#lesson summary').click();
   assert.match(await p.locator('#lesson').innerText(),/Infinite set/);
   await ctx.close();
   console.log('PASS Grade 11 Q3('+suffix+') bilingual keyboard/offline '+width);
  }
  // Source-verified Q4(i): Cartesian-product intersection, mobile and offline.
  for(const width of [320,390,1280]){
   const ctx=await browser.newContext({viewport:{width,height:800}});
   const p=await ctx.newPage();
   await p.goto('http://127.0.0.1:'+server.address().port+'/grade-11/sets-q4-i-preview.html');
   await p.locator('#lesson article').waitFor();
   assert.ok((await p.locator('#lesson').innerText()).includes('A × (B ∩ C)'));
   await p.locator('#lesson summary').focus();await p.keyboard.press('Enter');
   assert.equal(await p.locator('#lesson details').getAttribute('open'),'');
   assert.ok((await p.locator('#lesson').innerText()).includes('(1,b)'));
   await p.locator('#ta').click();
   assert.equal(await p.locator('html').getAttribute('lang'),'ta');
   // Switching languages re-renders a closed details element; open it to inspect the Tamil derivation.
   await p.locator('#lesson summary').focus();await p.keyboard.press('Enter');
   assert.equal(await p.locator('#lesson details').getAttribute('open'),'');
   assert.match(await p.locator('#lesson').innerText(),/சரிபார்க்கப்பட்டது/);
   assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   await ctx.setOffline(true);
   await p.locator('#en').click();
   await p.locator('#lesson summary').click();
   assert.match(await p.locator('#lesson').innerText(),/identity holds for all sets/);
   await ctx.close();
   console.log('PASS Grade 11 Q4(i) mobile bilingual keyboard/offline '+width);
  }
  // Grade 11 Q4(ii): Cartesian-product union across responsive sizes and offline interaction.
  for(const width of [320,390,1280]){
   const ctx=await browser.newContext({viewport:{width,height:800}});
   const p=await ctx.newPage();
   await p.goto('http://127.0.0.1:'+server.address().port+'/grade-11/sets-q4-ii-preview.html');
   await p.locator('#lesson article').waitFor();
   assert.ok((await p.locator('#lesson').innerText()).includes('A × (B ∪ C)'));
   await p.locator('#lesson summary').focus();await p.keyboard.press('Enter');
   assert.equal(await p.locator('#lesson details').getAttribute('open'),'');
   assert.ok((await p.locator('#lesson').innerText()).includes('(2,c)'));
   await p.locator('#ta').click();
   assert.equal(await p.locator('html').getAttribute('lang'),'ta');
   // Switching languages re-renders a closed details element; open it to inspect the Tamil derivation.
   await p.locator('#lesson summary').focus();await p.keyboard.press('Enter');
   assert.equal(await p.locator('#lesson details').getAttribute('open'),'');
   assert.match(await p.locator('#lesson').innerText(),/சரிபார்க்கப்பட்டது/);
   assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   await ctx.setOffline(true);
   await p.locator('#en').click();
   await p.locator('#lesson summary').click();
   assert.match(await p.locator('#lesson').innerText(),/identity holds for arbitrary sets/);
   await ctx.close();
   console.log('PASS Grade 11 Q4(ii) bilingual keyboard/mobile/offline '+width);
  }
  // Source-verified Q4(iii): test both Cartesian products, Tamil derivation, keyboard and offline.
  for(const width of [320,390,1280]){
   const ctx=await browser.newContext({viewport:{width,height:800}});
   const p=await ctx.newPage();
   await p.goto('http://127.0.0.1:'+server.address().port+'/grade-11/sets-q4-iii-preview.html');
   await p.locator('#lesson article').waitFor();
   assert.ok((await p.locator('#lesson').innerText()).includes('(A × B) ∩ (B × A)'));
   await p.locator('#lesson summary').focus();await p.keyboard.press('Enter');
   assert.equal(await p.locator('#lesson details').getAttribute('open'),'');
   assert.match(await p.locator('#lesson').innerText(),/\{\(2,2\)\}/);
   await p.locator('#ta').click();
   assert.equal(await p.locator('html').getAttribute('lang'),'ta');
   assert.match(await p.locator('#review').innerText(),/மதிப்பாய்வு நிலுவையில்/);
   await p.locator('#lesson summary').focus();await p.keyboard.press('Enter');
   assert.equal(await p.locator('#lesson details').getAttribute('open'),'');
   assert.match(await p.locator('#lesson').innerText(),/இருபுறமும் சமம்/);
   assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   await ctx.setOffline(true);await p.locator('#en').click();
   await p.locator('#lesson summary').focus();await p.keyboard.press('Enter');
   assert.equal(await p.locator('#lesson details').getAttribute('open'),'');
   assert.match(await p.locator('#lesson').innerText(),/proving equality for all sets/);
   await ctx.close();
   console.log('PASS Grade 11 Q4(iii) bilingual keyboard/mobile/offline '+width);
  }
  // Grade 11 Q4(iv): source-exact set-difference identity in both languages, mobile, keyboard, and offline.
  for(const width of [320,390,1280]){
   const ctx=await browser.newContext({viewport:{width,height:800}});
   const p=await ctx.newPage();
   await p.goto('http://127.0.0.1:'+server.address().port+'/grade-11/sets-q4-iv-preview.html');
   await p.locator('#lesson article').waitFor();
   assert.match(await p.locator('#lesson').innerText(),/C − \(B − A\)/);
   await p.locator('#lesson summary').focus();await p.keyboard.press('Enter');
   assert.equal(await p.locator('#lesson details').getAttribute('open'),'');
   assert.match(await p.locator('#lesson').innerText(),/\{1, 2\}/);
   await p.locator('#ta').click();
   assert.equal(await p.locator('html').getAttribute('lang'),'ta');
   assert.match(await p.locator('#review').innerText(),/மதிப்பாய்வு நிலுவையில்/);
   assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   await ctx.setOffline(true);await p.locator('#en').click();
   await p.locator('#lesson summary').click();
   assert.match(await p.locator('#lesson').innerText(),/De Morgan/);
   await ctx.close();
   console.log('PASS Grade 11 Q4(iv) bilingual keyboard/mobile/offline '+width);
  }
  // Network failure and retry must preserve the selected Tamil language.
  {
   const ctx=await browser.newContext({viewport:{width:390,height:800}});
   const p=await ctx.newPage();
   await p.route('**/g11-ch1-ex1-1-q3-ii.json',route=>route.abort());
   await p.goto('http://127.0.0.1:'+server.address().port+'/grade-11/sets-q3-ii-preview.html');
   await p.locator('#retry:visible').waitFor();
   await p.locator('#ta').click();
   assert.match(await p.locator('#error').innerText(),/பாடம் கிடைக்கவில்லை/);
   await p.unroute('**/g11-ch1-ex1-1-q3-ii.json');
   await p.locator('#retry').click();
   await p.locator('#lesson article').waitFor();
   assert.equal(await p.locator('#retry').isVisible(),false);
   assert.equal(await p.locator('html').getAttribute('lang'),'ta');
   await p.locator('#lesson summary').focus();await p.keyboard.press('Enter');
   assert.equal(await p.locator('#lesson details').getAttribute('open'),'');
   assert.match(await p.locator('#lesson').innerText(),/முடிவில்லாத கணம்/);
   await ctx.close();
   console.log('PASS Grade 11 Q3(ii) Tamil network recovery');
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
