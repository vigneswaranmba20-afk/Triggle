'use strict';
// Browser acceptance: adaptive mobile reading, grade coverage, and figures.
const assert=require('node:assert/strict');
const fs=require('node:fs/promises'),http=require('node:http'),path=require('node:path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
async function main(){
 const server=http.createServer(async(req,res)=>{
  try{
   const urlPath=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
   const file=path.resolve(root,'.'+(urlPath.endsWith('/')?urlPath+'index.html':urlPath));
   if(!file.startsWith(root+path.sep))throw Error('Outside site');
   const b=await fs.readFile(file);
   res.writeHead(200,{'content-type':({'.js':'application/javascript','.css':'text/css','.html':'text/html','.json':'application/json','.png':'image/png'})[path.extname(file)]||'application/octet-stream','cache-control':'no-store'});res.end(b);
  }catch{res.writeHead(404);res.end();}
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 let browser; const base='http://127.0.0.1:'+server.address().port;
 try{
  browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});
  for(const width of [320,360,390,768,1280]){
   const ctx=await browser.newContext({viewport:{width,height:width===320?568:840},serviceWorkers:'block',reducedMotion:'reduce'});
   const page=await ctx.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   const grade10='c10-1-1-2-q5';
   await page.goto(base+'/index.html?class=10&question='+grade10);
   await page.locator('#questionHead').waitFor({state:'visible'});
   assert.match(await page.locator('#questionText').innerText(),/four categories of employees/i,'Original long question preserved');
   assert.ok((await page.locator('#stepsList li').count())>=4,'Worked steps preserved');
   assert.equal(await page.locator('#stepsList .final-answer-step').count(),1,'Final result highlighted at end');
   assert.equal(await page.locator('#allChaptersButton').isVisible(),false,'Remove duplicated chapter footer action');
   assert.equal(await page.locator('#previous').isVisible(),true);
   assert.equal(await page.locator('#next').isVisible(),true);
   const metrics=await page.evaluate(()=>{
    const q=document.querySelector('#questionText'),s=document.querySelector('#stepsRegion'),nav=document.querySelector('#questionNavDock'),r=document.querySelector('#lessonCard');
    return {viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,
      qHeight:q.clientHeight,qScroll:q.scrollHeight,
      solutionOverflowY:getComputedStyle(s).overflowY,
      solutionScrollHeight:s.scrollHeight,solutionClientHeight:s.clientHeight,
      docScroll:document.documentElement.scrollHeight,bodyScroll:document.body.scrollHeight,
      viewHeight:innerHeight,navPosition:getComputedStyle(nav).position,
      navCols:getComputedStyle(nav).gridTemplateColumns.split(' ').length,
      cardOverflow:getComputedStyle(r).overflowY};
   });
   assert.ok(metrics.scrollWidth<=metrics.viewport+1,'No page horizontal overflow: '+width);
   assert.ok(metrics.qHeight+2>=metrics.qScroll,'Full question not clipped: '+width);
   assert.equal(metrics.navCols,2,'Exactly two navigation columns: '+width);
   if(width<=800){
    assert.equal(metrics.solutionOverflowY,'visible','No independently scrolling worked steps: '+width);
    assert.equal(metrics.navPosition,'fixed','Single persistent compact question navigation');
    assert.ok(metrics.docScroll>metrics.viewHeight+100||metrics.bodyScroll>metrics.viewHeight+100,'Long question must scroll naturally');
    await page.evaluate(()=>{document.querySelector('#stepsList').style.paddingBottom='1000px';window.scrollTo(0,950);});
    await page.waitForTimeout(60);
    const jumped=await page.locator('#questionJump').isVisible();
    assert.ok(jumped,'A compact question return link appears after leaving question: '+width);
    const previousY=await page.evaluate(()=>window.scrollY);
    assert.ok(previousY>60,'The document owns vertical scrolling');
    await page.locator('#questionJump').click();
    await page.waitForTimeout(60);
    assert.ok((await page.evaluate(()=>document.querySelector('#questionText').getBoundingClientRect().top))<175,'Question jump returns to its source');
    await page.evaluate(()=>{document.querySelector('#stepsList').style.paddingBottom='';});
    assert.equal(await page.locator('.appbar').isVisible(),true);
    assert.equal(await page.locator('.status-row').isVisible(),true);
    const nav=await page.locator('#questionNavDock').boundingBox();
    assert.ok(nav.y+nav.height<=840+2||width===320&&nav.y+nav.height<=568+2);
    if(width===390){
      await fs.mkdir(path.resolve(root,'..','screenshots'),{recursive:true});
      await page.evaluate(()=>window.scrollTo(0,0));
      await page.screenshot({path:path.resolve(root,'..','screenshots','adaptive-reader-grade10-q5-390.png'),fullPage:true});
    }
   }else{
    assert.notEqual(metrics.navPosition,'fixed','Desktop navigation remains in normal flow');
   }
   await page.locator('#next').click();
   assert.ok(new URL(page.url()).searchParams.get('question')!==grade10,'Next navigates');
   await page.locator('#previous').click();
   assert.equal(new URL(page.url()).searchParams.get('question'),grade10,'Previous restores');
   await page.locator('#crumb .crumb-link').nth(1).click();
   assert.equal(await page.locator('#pathDialog').evaluate(el=>el.open),true,'Chapter picker remains accessible');
   await page.locator('#pathClose').click();
   for(const [grade,id] of [[9,'g9-ch9-ex9.1-q4'],[11,'c11-3-3-1-1'],[12,'c12-4-4-1-1']]){
    await page.goto(base+'/index.html?class='+grade+'&question='+id);
    await page.locator('#stepsList .final-answer-step').waitFor({state:'visible'});
    assert.equal(await page.locator('#allChaptersButton').isVisible(),false,'Simplified navigation, Grade '+grade);
    assert.equal(await page.locator('#stepsRegion').isVisible(),true);
   }
   await page.locator('#langTa').click();
   assert.equal(await page.locator('html').getAttribute('lang'),'ta');
   assert.equal(await page.locator('#stepsRegion').isVisible(),true,'Tamil explanation retained');
   assert.deepEqual(errors,[],'No browser exceptions at '+width);
   await ctx.close();
  }
  console.log('PASS adaptive reader across Grades 9–12: long question, full steps, one scroll, compact dock, question jump, Tamil, screenshots.');
 }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
