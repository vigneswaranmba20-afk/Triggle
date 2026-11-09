'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs/promises'),http=require('node:http'),path=require('node:path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
async function main(){
 const server=http.createServer(async(req,res)=>{
  try{
   const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
   const file=path.resolve(root,'.'+(pathname.endsWith('/')?pathname+'index.html':pathname));
   if(!file.startsWith(root+path.sep))throw Error('Outside site');
   const body=await fs.readFile(file);
   const ext=path.extname(file),mime={'.js':'application/javascript','.css':'text/css','.html':'text/html','.json':'application/json'};
   res.writeHead(200,{'content-type':mime[ext]||'application/octet-stream','cache-control':'no-store'});
   res.end(body);
  }catch{res.writeHead(404);res.end();}
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 let browser;
 const base='http://127.0.0.1:'+server.address().port;
 try{
  browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});
  for(const width of [320,390,768,1280]){
   const ctx=await browser.newContext({viewport:{width,height:840},serviceWorkers:'block'});
   const page=await ctx.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   await page.goto(base+'/index.html?class=9&chapter=g9-ch2&section=examples');
   await page.locator('.hub-question').nth(11).click();
   await page.locator('#questionHead').waitFor({state:'visible'});
   assert.match(await page.locator('#questionHead').innerText(),/Example 2\.12/);
   assert.equal(await page.locator('.appbar').isVisible(),true,'Global header always visible');
   assert.equal(await page.locator('.status-row').isVisible(),true,'Class and chapter always visible');
   assert.equal(await page.locator('#crumb .crumb-link').count(),3,'Class/chapter/exercise breadcrumb exists');
   assert.equal(await page.locator('#questionReturn').isVisible(),false,'No Back to worked examples row');
   assert.equal(await page.locator('#tabQuick').count(),0,'Remove Quick solution button only');
   assert.equal(await page.locator('#solutionModeRow').isVisible(),true,'Detailed explanation available immediately');
   assert.equal(await page.locator('#tabGuided').isVisible(),true);
   assert.match(await page.locator('#tabGuided').innerText(),/Detailed explanation/);
   assert.equal(await page.locator('#quickSteps').isVisible(),true,'Quick solution remains');
   assert.equal(await page.locator('#stepsList .twd-worked-step').count(),4,'All four worked answer parts preserved');
   assert.equal(await page.locator('#allChaptersButton').isVisible(),true,'Back to all chapters persists');
   assert.equal(await page.locator('#previous').isVisible(),true);
   assert.equal(await page.locator('#next').isVisible(),true);
   const positions=await page.evaluate(()=>{
    const box=id=>{const r=document.getElementById(id).getBoundingClientRect();return {top:r.top,bottom:r.bottom};};
    const cssOrder=x=>Number(getComputedStyle(document.getElementById(x)).order||0);
    return {title:box('questionHead'),details:box('solutionModeRow'),question:box('questionText'),
      order:[cssOrder('solutionModeRow'),cssOrder('questionText')]};
   });
   assert.ok(positions.title.bottom<=positions.details.top+2,'Details must be immediately below Example 2.12');
   assert.ok(positions.details.bottom<=positions.question.top+3,'Details before example content');
   if(width<=800){
    const before=await page.evaluate(()=>({
      bar:document.querySelector('.appbar').getBoundingClientRect().top,
      crumb:document.querySelector('.status-row').getBoundingClientRect().top,
      barBottom:document.querySelector('.appbar').getBoundingClientRect().bottom
    }));
    const scrolled=await page.evaluate(()=>{
      const container=document.querySelector('.lesson-container');
      container.scrollTop=450;
      return {scroll:container.scrollTop};
    });
    assert.ok(scrolled.scroll>100,'Long Example 2.12 should scroll to validate pinned headers');
    const after=await page.evaluate(()=>({
      bar:document.querySelector('.appbar').getBoundingClientRect().top,
      crumb:document.querySelector('.status-row').getBoundingClientRect().top,
      barBottom:document.querySelector('.appbar').getBoundingClientRect().bottom
    }));
    assert.ok(Math.abs(after.bar-before.bar)<2,'Top header moved while scrolling');
    assert.ok(Math.abs(after.crumb-before.crumb)<3,'Class/chapter breadcrumbs moved while scrolling');
    assert.ok(after.crumb>=after.barBottom-3,'Sticky breadcrumbs must not overlap header');
    await page.evaluate(()=>document.querySelector('.lesson-container').scrollTop=0);
   }
   await page.locator('#tabGuided').click();
   assert.equal(await page.locator('#guidedDialog').evaluate(el=>el.open),true,'Detailed explanation dialog launches');
   await page.locator('#closeGuided').click();
   assert.equal(await page.locator('#quickSteps').isVisible(),true,'Return retains quick worked solution');
   await page.locator('#langTa').click();
   assert.match(await page.locator('#tabGuided').innerText(),/விரிவான விளக்கம்/,'Tamil detail button');
   assert.equal(await page.locator('#questionReturn').isVisible(),false);
   assert.equal(await page.locator('.status-row').isVisible(),true);
   const metrics=await page.evaluate(()=>({vw:innerWidth,sw:document.documentElement.scrollWidth}));
   assert.ok(metrics.sw<=metrics.vw+1,'No horizontal overflow at '+width);
   for(const [grade,id] of [[10,'c10-6-6-1-1'],[11,'c11-3-3-1-1'],[12,'c12-4-4-1-1']]){
    await page.goto(base+'/index.html?class='+grade+'&question='+id);
    await page.locator('#questionHead').waitFor({state:'visible'});
    assert.equal(await page.locator('#tabQuick').count(),0,'Quick button removed at Grade '+grade);
    assert.equal(await page.locator('#quickSteps').isVisible(),true,'Quick solution content retained at Grade '+grade);
    assert.equal(await page.locator('#questionReturn').isVisible(),false,'Redundant return hidden at Grade '+grade);
    assert.equal(await page.locator('.status-row').isVisible(),true,'Sticky header available at Grade '+grade);
   }
   assert.deepEqual(errors,[],'No browser errors at '+width);
   await ctx.close();
  }
  console.log('PASS: fixed Class/Chapter headers, single Detailed explanation below title, quick solution preserved, Back row removed across 9–12.');
 }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
