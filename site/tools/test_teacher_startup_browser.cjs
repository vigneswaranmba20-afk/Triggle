'use strict';
// Deterministic fault injection. These tests do not claim production Firebase login.
const assert = require('node:assert/strict');
const fs = require('node:fs/promises'), path = require('node:path'), http = require('node:http');
const {chromium} = require('playwright');
const root = path.resolve(__dirname, '..');
const baseline = process.argv.includes('--baseline');
(async () => {
 const server = http.createServer(async (req,res) => {
  try {
   const url = new URL(req.url,'http://localhost');
   const file = path.resolve(root,'.'+(url.pathname.endsWith('/')?url.pathname+'index.html':url.pathname));
   if (!file.startsWith(root+path.sep)) throw Error('outside');
   let bytes = await fs.readFile(file);
   if (file.endsWith('teacher-review.html')) bytes = Buffer.from(bytes.toString().replace('name="review-startup-timeout" content="12000"','name="review-startup-timeout" content="250"'));
   res.writeHead(200,{'content-type':({'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json'})[path.extname(file)]||'application/octet-stream'});res.end(bytes);
  } catch {res.writeHead(404);res.end();}
 });
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const base='http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});
 try {
  if (baseline) {
   const page=await browser.newPage();
   await page.route('**/firebasejs/**',r=>r.abort());
   await page.route('**/teacher-portal.css*',r=>r.abort());
   await page.goto(base+'/teacher-review.html');
   await page.waitForTimeout(1300);
   assert.match(await page.locator('#message').innerText(),/Loading secure review access/);
   assert.equal(await page.locator('#google-login').isVisible(),false);
   assert.equal(await page.getByRole('button',{name:'Retry',exact:true}).count(),0);
   console.log('REPRODUCED: SDK/CSS requests fail; original loader stays loading without sign-in or Retry.');
   return;
  }
  for (const width of [320,390,430]) {
   const ctx=await browser.newContext({viewport:{width,height:850},serviceWorkers:'block'});
   const page=await ctx.newPage();
   await page.route('**/firebasejs/**',r=>r.abort());
   await page.route('**/teacher-portal.css*',r=>r.abort());
   await page.goto(base+'/teacher-review.html');
   await page.getByRole('heading',{name:'Unable to connect to Teacher Review'}).waitFor();
   assert.equal(await page.locator('#workspace').isVisible(),false);
   assert.equal(await page.locator('body').evaluate(e=>getComputedStyle(e).fontFamily.includes('system-ui')),true);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   // The retry must navigate and rerun the independent controller.
   await page.route('**/assets/teacher-portal.js*',r=>r.fulfill({contentType:'application/javascript',body:'window.TriggleReviewStartup.set("ready-to-sign-in"); document.getElementById("login").hidden=false;'}));
   await page.getByRole('button',{name:'Retry',exact:true}).click();
   await page.locator('#login').waitFor({state:'visible'});
   assert.equal(await page.locator('#startup-error').isVisible(),false);
   await ctx.close();
  }
  for (const fault of ['module','hanging-auth','firestore-timeout','offline']) {
   const ctx=await browser.newContext({viewport:{width:390,height:850},serviceWorkers:'block'}),page=await ctx.newPage();
   if(fault==='module') await page.route('**/assets/teacher-portal.js*',r=>r.abort());
   else await page.route('**/assets/teacher-portal.js*',r=>r.fulfill({contentType:'application/javascript',body: fault==='offline'?'window.dispatchEvent(new Event("offline"));':`window.TriggleReviewStartup.set("${fault==='hanging-auth'?'loading-authentication':'checking-authorization'}");`}));
   await page.goto(base+'/teacher-review.html');
   await page.locator('#startup-error').waitFor({state:'visible'});
   assert.equal(await page.locator('#workspace').isVisible(),false);
   if(fault==='offline') {
    assert.equal(await page.locator('body').getAttribute('data-startup-state'),'network-unavailable');
    await page.evaluate(()=>window.dispatchEvent(new Event('online')));
    assert.match(await page.locator('#message').innerText(),/restored/);
   }
   await ctx.close();
  }
  // A previously cached teacher module must not override the current online-only service.
  {
   const ctx=await browser.newContext({viewport:{width:390,height:850},serviceWorkers:'allow'}),page=await ctx.newPage();
   await page.goto(base+'/teacher-review.html');
   await page.evaluate(async()=>{
    await navigator.serviceWorker.register('./service-worker.js');
    await navigator.serviceWorker.ready;
    if(!navigator.serviceWorker.controller)await new Promise(r=>navigator.serviceWorker.addEventListener('controllerchange',r,{once:true}));
    const keys=await caches.keys(),cache=await caches.open(keys.find(k=>k.startsWith('triggle-')));
    await cache.put(new Request(new URL('./assets/teacher-portal.js',location.href)),new Response('throw Error("STALE TEACHER MODULE")',{headers:{'content-type':'application/javascript'}}));
   });
   await ctx.setOffline(true);
   for(const target of ['./assets/teacher-portal.js?stale-probe','./teacher-review.html?stale-probe']) {
    const outcome=await page.evaluate(url=>fetch(url).then(r=>r.text()).catch(()=> 'NETWORK_FAILURE'),target);
    assert.equal(outcome,'NETWORK_FAILURE','Private service bypasses old assets and student-shell fallback');
   }
   await ctx.setOffline(false);
   // A cache miss must not fall back to the cached student HTML, even offline.
   const result=await page.evaluate(async()=>{
    const worker=await navigator.serviceWorker.getRegistration();await worker.update();
    const cacheNames=await caches.keys();return cacheNames.length;
   });assert.ok(result>0);
   await page.route('**/assets/teacher-portal.js*',r=>r.abort());
   await page.reload();await page.locator('#startup-error').waitFor({state:'visible'});
   assert.equal(await page.locator('#workspace').isVisible(),false);await ctx.close();
  }
  console.log('PASS teacher startup: SDK/module/CSS failures, auth/Firestore watchdog, offline/reconnect, Retry and 320/390/430px fallback.');
 } finally {await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1;});
