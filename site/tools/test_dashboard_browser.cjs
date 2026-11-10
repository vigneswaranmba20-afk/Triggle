'use strict';
// The retired owner dashboard must send old bookmarks to the student site.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright'),{server,launchOptions}=require('./dashboard_test_support.cjs');
(async()=>{
  const app=await server(),browser=await chromium.launch(launchOptions());
  try{
    const rootRedirect=fs.readFileSync(path.resolve(__dirname,'../../dashboard/index.html'),'utf8');
    assert.match(rootRedirect,/\.\.\/site\/index\.html/,'Old root bookmark must go to student lessons');
    assert(!fs.existsSync(path.resolve(__dirname,'../assets/dashboard.js')),'Retired owner dashboard JS must be removed');
    assert(!fs.existsSync(path.resolve(__dirname,'../assets/dashboard.css')),'Retired owner dashboard CSS must be removed');
    assert(fs.existsSync(path.resolve(__dirname,'../teacher-review.html')),'Teacher Review must remain separate');
    for(const width of [320,390,430,1280]){
      const ctx=await browser.newContext({viewport:{width,height:900},serviceWorkers:'block'}),page=await ctx.newPage(),errors=[],requests=[];
      page.on('pageerror',e=>errors.push(e.message));
      page.on('request',r=>requests.push(r.url()));
      await page.goto(app.base+'/dashboard/?class=9#legacy-dashboard');
      await page.waitForURL(/\/index\.html(?:[?#]|$)/);
      await page.locator('#browseBtn').waitFor({state:'visible'});
      assert.match(await page.title(),/Triggle.*Mathematics/);
      assert(!new URL(page.url()).pathname.includes('dashboard'),'Old dashboard must not display');
      assert.equal(await page.locator('h1:has-text("Triggle Mission Control")').count(),0);
      assert(!requests.some(u=>/firestore|firebase|identitytoolkit/i.test(u)),'Redirect must never access private teacher services');
      assert.deepEqual(errors,[],'Student homepage should load without JavaScript errors');
      await ctx.close();
    }
    console.log('PASS retired dashboard: old site/root bookmarks lead to lessons; owner assets absent; Teacher Review preserved; Chromium 320/390/430/1280px.');
  }finally{await browser.close();await app.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
