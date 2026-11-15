'use strict';
/* Real Chromium checks, not just swatch arithmetic. */
const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path');
const {chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
const out=path.resolve(__dirname,'../../screenshots/paper-indigo');
const indigo='rgb(71, 61, 145)',white='rgb(255, 255, 255)',paper='rgb(247, 247, 244)';
const label=(page)=>page.evaluate(()=>({
  paper:getComputedStyle(document.body).backgroundColor,
  ink:getComputedStyle(document.body).color,
  accent:getComputedStyle(document.documentElement).getPropertyValue('--violet').trim()
}));
async function visit(page,url){
 const r=await page.goto(url);
 assert.ok(r?.ok(),'HTTP page must load: '+url);
 await page.locator('.appbar').waitFor({state:'visible'});
 const l=await label(page);
 assert.deepEqual(l,{paper,ink:'rgb(34, 40, 59)',accent:'#473D91'},'Themed student shell');
 await page.locator('link[href*="paper-indigo.css"]').evaluate(el=>new Promise((resolve,reject)=>{
   if(el.sheet)return resolve();
   el.addEventListener('load',resolve,{once:true});
   el.addEventListener('error',()=>reject(Error('Theme stylesheet did not load')),{once:true});
 }));
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
 assert.ok(overflow<=1,'No horizontal scroll: '+overflow+' '+url);
}
async function main(){
 const app=await server(),browser=await chromium.launch(launchOptions());
 await fs.mkdir(out,{recursive:true});
 try{
  for(const width of [320,390,430]){
   const ctx=await browser.newContext({viewport:{width,height:852},serviceWorkers:'block',reducedMotion:'reduce'});
   const p=await ctx.newPage(),errors=[];
   p.on('pageerror',e=>errors.push(e.message));
   const base=app.base+'/index.html';
   await visit(p,base+'?class=9');
   const grade=p.locator('.discover-grade').first();
   if(await grade.isVisible())assert.equal(await grade.evaluate(el=>getComputedStyle(el).backgroundColor),white,'Home class card white');
   await visit(p,base+'?class=9&chapter=g9-ch1&section=concepts');
   await p.locator('.sp2-nav-button').first().waitFor({state:'visible'});
   assert.equal(await p.locator('.sp2-nav-button').first().evaluate(el=>getComputedStyle(el).backgroundColor),white,'Set Language concept card paper');
   await p.locator('.sp2-nav-button').first().click();
   assert.equal(await p.locator('.sp2-footer-next').evaluate(el=>getComputedStyle(el).backgroundColor),indigo,'Set Language Next is indigo');
   await visit(p,base+'?class=9&chapter=g9-ch2&section=concepts');
   const index=p.locator('.sp2-index-view'),buttons=index.locator('.sp2-nav-button');
   assert.equal(await buttons.count(),8,'All Real Numbers ideas retained');
   assert.equal(await buttons.first().evaluate(el=>getComputedStyle(el).backgroundColor),white,'Real Numbers index paper');
   await buttons.first().click();
   assert.equal(await p.locator('.sp2-demo').count(),1,'Mathematical demo stays intact');
   assert.equal(await p.locator('.sp2-footer-next').evaluate(el=>getComputedStyle(el).backgroundColor),indigo,'Real Numbers Next is indigo');
   assert.equal(await p.locator('.sp2-footer-next').evaluate(el=>getComputedStyle(el).color),white,'Next label stays readable');
   assert.equal(await p.locator('.sp2-demo').evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(251, 251, 254)','Demo uses near-white paper');
   await p.locator('#langTa').click();
   assert(await p.locator('.sp2-concept-heading').innerText().then(t=>/[\u0B80-\u0BFF]/.test(t)),'Tamil math lesson stays visible');
   assert.equal(await p.locator('.sp2-footer-next').evaluate(el=>getComputedStyle(el).backgroundColor),indigo,'Tamil Next uses same color');
   if(width===390)await p.screenshot({path:path.join(out,'g9-real-numbers-tamil-390.png'),fullPage:false});
   await visit(p,base+'?class=10&question=c10-1-ex1-1-q1-i');
   await p.locator('.lesson-card').waitFor({state:'visible'});
   assert.equal(await p.locator('.lesson-card').evaluate(el=>getComputedStyle(el).backgroundColor),white,'Class 10 exercise paper');
   assert(await p.locator('#questionText').innerText(),'Original mathematical question preserved');
   await visit(p,base+'?class=12&chapter=g12-ch1&section=concepts');
   await p.locator('#langEn').click(); // Grade 12 matrix scenes are currently published in English only.
   await p.locator('.matrix-concepts [data-scene="0"]').waitFor({state:'visible'});
   assert.equal(await p.locator('.matrix-concepts .mc-index button').first().evaluate(el=>getComputedStyle(el).backgroundColor),white,'Matrix index paper');
   await p.locator('.matrix-concepts [data-scene="0"]').click();
   assert.equal(await p.locator('.matrix-concepts .mc-primary').first().evaluate(el=>getComputedStyle(el).backgroundColor),indigo,'Matrix action uses indigo');
   assert(await p.locator('.matrix-concepts .mc-stage').isVisible(),'Original matrix interaction present');
   if(width===390)await p.screenshot({path:path.join(out,'g12-matrices-390.png'),fullPage:false});
   assert.deepEqual(errors,[],'No JS page exceptions at '+width+'px');
   await ctx.close();
   console.log('PASS Paper + Indigo rendered index, Tamil concepts, Grade 10 maths and Grade 12 interactions at '+width+'px');
  }
 }finally{await browser.close();await app.close();}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
