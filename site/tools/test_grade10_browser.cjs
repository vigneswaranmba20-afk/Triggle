/* Grade 10 real Chromium student-preview regression. Run: node site/tools/test_grade10_browser.cjs */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const http=require('node:http');
const path=require('node:path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
async function main(){
 const server=http.createServer(async(req,res)=>{
  try{
   const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
   const file=path.resolve(root,'.'+pathname);
   if(!file.startsWith(root+path.sep))throw Error('invalid path');
   const data=await fs.readFile(file);
   res.writeHead(200,{'content-type':path.extname(file)==='.json'?'application/json':'text/html'});
   res.end(data);
  }catch{res.writeHead(404);res.end('Not found');}
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 const origin='http://127.0.0.1:'+server.address().port;
 try{
  for(const width of [320,390,1280]){
   const context=await browser.newContext({viewport:{width,height:900}});
   const page=await context.newPage();
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(origin+'/grade-10/cartesian-preview.html');
   await page.locator('[data-question-id]').first().waitFor();
   assert.equal(await page.locator('[data-question-id]').count(),8);
   assert.equal(await page.locator('[data-question-id="g10-ch1-ex1-1-q1iii"]').count(),1);
   assert.equal(await page.locator('[data-question-id="g10-ch1-ex1-1-q2"]').count(),1);
   const q3=page.locator('[data-question-id="g10-ch1-ex1-1-q3"]');
   assert.equal(await q3.count(),1);
   await q3.locator('summary').click();
   assert.equal(await q3.locator('.pair-cell').count(),6,'Q3 must display all six B×A ordered pairs (3 × 2)');
   const q4=page.locator('[data-question-id="g10-ch1-ex1-1-q4"]');
   assert.equal(await q4.count(),1);
   await q4.locator('summary').click();
   assert.equal(await q4.locator('.pair-cell').count(),8,'Q4 must show four A×A and four intersection pairs');
   assert.ok((await q4.innerText()).includes('(B × B) ∩ (C × C)'), 'Q4 must display the Cartesian-product intersection heading');
   const q5=page.locator('[data-question-id="g10-ch1-ex1-1-q5"]');
   assert.equal(await q5.count(),1);
   await q5.locator('summary').click();
   assert.equal(await q5.locator('.pair-cell').count(),4,'Q5 must show two pairs on each side');
   assert.ok((await q5.innerText()).includes('(A ∩ C) × (B ∩ D)'));
   assert.ok((await q5.innerText()).includes('(A × B) ∩ (C × D)'));
   const q6=page.locator('[data-question-id="g10-ch1-ex1-1-q6i"]');
   assert.equal(await q6.count(),1);
   assert.match(await q6.innerText(),/Source notation pending visual verification/);
   await q6.locator('summary').click();
   assert.equal(await q6.locator('.pair-cell').count(),16,'Q6(i) must show eight ordered pairs on each side');
   assert.ok((await q6.innerText()).includes('A × (B ∪ C)'));
   const q2=page.locator('[data-question-id="g10-ch1-ex1-1-q2"]');
   assert.equal(await q2.locator('h2').innerText(),'Exercise 1.1 · Q2','unsplit textbook Q2 must not show null subpart');
   await q2.locator('summary').click();
   assert.equal(await q2.locator('.pair-cell').count(),24,'Q2 requires 12 A×B and 12 B×A pairs');
   const dimensions=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth}));
   assert.ok(dimensions.scroll<=dimensions.viewport+1,'horizontal overflow at '+width);
   const third=page.locator('[data-question-id="g10-ch1-ex1-1-q1iii"]');
   await third.locator('summary').click();
   assert.equal(await third.locator('.pair-cell').count(),4,'empty-set exercise has exactly four A×A pairs');
   assert.equal(await third.getByText('∅ — no ordered pairs').count(),2);
   await page.locator('#ta').click();
   assert.equal(await page.locator('html').getAttribute('lang'),'ta');
   assert.equal(await page.locator('#ta').getAttribute('aria-pressed'),'true');
   assert.equal(await page.locator('[data-question-id]').count(),8);
   await page.locator('#en').focus();
   await page.keyboard.press('Enter');
   assert.equal(await page.locator('html').getAttribute('lang'),'en');
   assert.deepEqual(errors,[]);
   // Already-loaded exercises remain interactive without network access.
   await context.setOffline(true);
   await page.locator('#ta').click();
   assert.equal(await page.locator('html').getAttribute('lang'),'ta');
   assert.equal(await page.locator('[data-question-id]').count(),8);
   await page.locator('[data-question-id="g10-ch1-ex1-1-q1iii"] summary').click();
   assert.equal(await page.locator('[data-question-id="g10-ch1-ex1-1-q1iii"] .pair-cell').count(),4);
   await context.setOffline(false);
   assert.deepEqual(errors,[]);
   await context.close();
   console.log('PASS Grade 10 bilingual Cartesian preview '+width+'px, keyboard, math grids');
  }
  const context=await browser.newContext({viewport:{width:390,height:900}});
  let failedOnce=false;
  await context.route('**/g10-ch1-ex1-1-q1ii.json',route=>{
   if(!failedOnce){failedOnce=true;return route.fulfill({status:503,body:'unavailable'});}
   return route.continue();
  });
  const page=await context.newPage();
  await page.goto(origin+'/grade-10/cartesian-preview.html');
  await page.locator('#retry').waitFor({state:'visible'});
  assert.equal(await page.locator('[data-question-id]').count(),0,'do not display incomplete lesson batch');
  await page.locator('#ta').click();
  assert.match(await page.locator('#status').innerText(),/ஏற்ற முடியவில்லை/);
  assert.equal(failedOnce,true,'first request must exercise the simulated 503');
  await page.locator('#retry').click();
  await page.locator('[data-question-id]').first().waitFor({timeout:10000}).catch(async error=>{throw Error('Retry failed: '+await page.locator('#lessons').innerText()+'; '+error.message);});
  assert.equal(await page.locator('[data-question-id]').count(),8,'retry must restore all eight preview lessons, including source-pending Q6(i)');
  assert.equal(await page.locator('[data-question-id="g10-ch1-ex1-1-q2"]').count(),1,'retry must restore Q2');
  assert.equal(await page.locator('[data-question-id="g10-ch1-ex1-1-q4"]').count(),1,'retry must restore Q4');
  assert.equal(await page.locator('[data-question-id="g10-ch1-ex1-1-q5"]').count(),1,'retry must restore Q5');
  assert.equal(await page.locator('#retry').isVisible(),false,'retry control must hide after success');
  await context.setOffline(true);
  await page.locator('#en').click();
  assert.equal(await page.locator('[data-question-id]').count(),8,'recovered lessons remain usable offline');
  await context.setOffline(false);
  await context.close();
  console.log('PASS Grade 10 failed-fetch Tamil recovery and retry');
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
