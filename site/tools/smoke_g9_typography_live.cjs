'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path'),crypto=require('node:crypto');
const {chromium}=require('playwright'),{launchOptions}=require('./dashboard_test_support.cjs');
const {load}=require('./build_g9_math.cjs');
const base=process.argv.find(x=>x.startsWith('--base='))?.slice(7);
assert(base,'Pass --base=https://.../Triggle/site');
const release=process.argv.find(x=>x.startsWith('--commit='))?.slice(9);assert.match(release||'',/^[a-f0-9]{40}$/);
const samples=['g9-ch1-ex1.1-q3-a-i','g9-ch2-ex7-q2-i','g9-ch3-ex3.2-q4','g9-ch4-ex4.1-q4','g9-ch5-ex5.2-q5','c9-exercise-6-1-q5','g9-ch7-ex7.1-q1','g9-ch8-ex8.2-q5','g9-ch9-ex9.1-q4'];
for(const id of samples)assert(load().some(q=>q.id===id),'Known live smoke question '+id);
(async()=>{const browser=await chromium.launch(launchOptions()),results=[];try{
const context=await browser.newContext({viewport:{width:393,height:852},serviceWorkers:'block'}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const file of ['data/g9-clear-math.js','assets/app.js','assets/math-notation.js','index.html','service-worker.js']){
 const response=await context.request.get(base+'/'+file+'?verify='+release);assert.equal(response.status(),200,file+' live HTTP');
 const actual=crypto.createHash('sha256').update(await response.body()).digest('hex');const expected=crypto.createHash('sha256').update(await fs.readFile(path.resolve(__dirname,'..',file))).digest('hex');
 assert.equal(actual,expected,file+' live bytes match tested release');
}
for(const width of [320,360,393,430]){await page.setViewportSize({width,height:852});
for(const id of samples){await page.goto(base+'/index.html?class=9&question='+id+'&verify='+release);
 assert.equal(new URL(page.url()).searchParams.get('question'),id);await page.evaluate(()=>document.fonts.ready);
 assert(await page.locator('#lessonCard .katex').count()>0,id+' rendered');assert.equal(await page.locator('[data-math-error]').count(),0,id+' no fallback');
 assert.equal(await page.locator('#stepsList .worked-step:not(.final-answer-step)').count(),load().find(q=>q.id===id).steps.length,id+' full working');
 assert(await page.locator('.final-answer-value').isVisible(),id+' final answer');
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),id+' no page overflow');
 await page.locator('#langTa').click();assert.equal(await page.locator('[data-math-error]').count(),0,id+' Tamil math');await page.locator('#langEn').click();
 results.push({id,width,english:true,tamil:true});
}
console.log('PASS LIVE '+width+'px: all nine Grade 9 chapters, English/Tamil');}
for(const id of ['c10-1-ex1-1-q1-i','c10-8-ex8-1-q5']){await page.goto(base+'/index.html?class=10&question='+id+'&verify='+release);assert.equal(new URL(page.url()).searchParams.get('question'),id);assert(await page.locator('#stepsList .katex').count()>0);assert.equal(await page.locator('[data-math-error]').count(),0);}
assert.deepEqual(errors,[]);await fs.mkdir('screenshots/g9-typography',{recursive:true});await fs.writeFile('screenshots/g9-typography/live-results.json',JSON.stringify({base,release,checkedAssets:true,grade10:true,results},null,2));
await context.close();console.log('PASS LIVE tested asset hashes, Grade 10 reference questions, and no browser errors');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
