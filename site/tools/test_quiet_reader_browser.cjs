'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs/promises'),http=require('node:http'),path=require('node:path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
async function main(){
 const server=http.createServer(async(req,res)=>{
  try{
   const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
   const file=path.resolve(root,'.'+(pathname.endsWith('/')?pathname+'index.html':pathname));
   if(!file.startsWith(root+path.sep))throw Error('Unsafe path');
   const b=await fs.readFile(file);
   const type=path.extname(file)==='.js'?'application/javascript':path.extname(file)==='.css'?'text/css':'text/html';
   res.writeHead(200,{'content-type':type,'cache-control':'no-store'});res.end(b);
  }catch{res.writeHead(404);res.end();}
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 let browser;
 const url='http://127.0.0.1:'+server.address().port;
 try{
  browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});
  for(const width of [320,390,1280]){
   const ctx=await browser.newContext({viewport:{width,height:840},serviceWorkers:'block'});
   const page=await ctx.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   for(const [grade,id] of [[9,'g9-ch9-ex9.1-q4'],[9,'g9-ch1-ex1.1-q1-i'],[10,'c10-6-6-1-1']]){
    await page.goto(url+'/index.html?class='+grade+'&question='+id);
    await page.locator('#questionText').waitFor({state:'visible'});
    assert.equal(await page.locator('#answerBox').isVisible(),false,'No separate answer card');
    assert.equal(await page.locator('#stepsList .final-answer-step').count(),1,'Green final answer must end the worked steps');
    assert.equal(await page.locator('#stepsList li').last().getAttribute('class').then(x=>x.includes('final-answer-step')),true,'Answer belongs at the end');
    assert.equal(await page.locator('#questionLabel').isVisible(),true,'Exercise badge always visible');
    assert.match(await page.locator('#questionLabel').innerText(),/EXERCISE/);
    assert.equal(await page.locator('#questionHead').isVisible(),true,'Exercise question heading visible');
    assert.equal(await page.locator('#stepsRegion').isVisible(),true,'How it works must be visible without touch');
    assert.match(await page.locator('#quickSteps').innerText(),/HOW IT WORKS|எப்படி|தீர்வு|WORKS/);
    assert.ok(await page.locator('#stepsList li').count()>0,'Full explanation present');
    assert.equal(await page.locator('#stepsList li').first().isVisible(),true,'Explanation should actually render');
    assert.equal(await page.locator('#questionNavDock').isVisible(),true,'Bottom dock always visible');
    assert.equal(await page.locator('#allChaptersButton').isVisible(),false,'Redundant back-to-chapters footer is removed');
    assert.equal(await page.locator('#previous').isVisible(),true,'Previous always visible');
    assert.equal(await page.locator('#next').isVisible(),true,'Next page always visible');
    if(width<=800){
     assert.equal(await page.evaluate(()=>window.TriggleQuietReader?.isActive()),true);
     assert.equal(await page.locator('.appbar').isVisible(),true,'Top header always visible without touch');
     assert.equal(await page.locator('.status-row').isVisible(),true,'Class and chapter always visible without touch');
     assert.equal(await page.evaluate(()=>window.TriggleQuietReader.isVisible()),true,
       'All optional actions must be visible without touch');
     assert.equal(await page.locator('.lesson-bottom').isVisible(),false,
       'The unnecessary progress and edition row is removed');
     const original=await page.evaluate(()=>({
       q:document.getElementById('questionText').getBoundingClientRect().top,
       nav:document.getElementById('questionNavDock').getBoundingClientRect().top
     }));
     await page.locator('#questionText').click();
     await page.waitForTimeout(150);
     assert.equal(await page.evaluate(()=>document.body.classList.contains('reader-options-visible')),true,
       'Touch release never hides anything');
     assert.equal(await page.locator('#stepsRegion').isVisible(),true,'Steps persist');
     assert.equal(await page.locator('#questionNavDock').isVisible(),true,'Bottom navigation persists');
     const later=await page.evaluate(()=>({
       q:document.getElementById('questionText').getBoundingClientRect().top,
       nav:document.getElementById('questionNavDock').getBoundingClientRect().top
     }));
     assert.ok((await page.locator('#questionText').innerText()).length>0,'Full question remains after touch');
     assert.ok(Math.abs(original.nav-later.nav)<2,'Navigation does not jump on touch');

    }else{
     assert.equal(await page.evaluate(()=>window.TriggleQuietReader?.isActive()),false);
     assert.equal(await page.locator('.appbar').isVisible(),true,'Desktop remains unchanged');
    }
    const dims=await page.evaluate(()=>({sw:document.documentElement.scrollWidth,vw:innerWidth}));
    assert.ok(dims.sw<=dims.vw+1,'No horizontal overflow at '+width+' for '+id);
   }
   // Figure must be discoverable on the very first render without touching,
   // in both 2025 Set Language Venn lessons and earlier triangle examples.
   for(const qid of ['c9-textbook-example-1-11','c9-example-6-1']){
    await page.goto(url+'/index.html?class=9&question='+qid);
    await page.locator('#questionHead').waitFor({state:'visible'});
    assert.equal(await page.locator('#figureBtn').isVisible(),true,
      'Relevant Figure icon hidden before touch at '+width+' for '+qid);
    assert.equal(await page.locator('#figureBtn').evaluate(el=>el.inert),false,
      'Relevant Figure icon must not be inert');
    if(width<=800){
     assert.equal(await page.evaluate(()=>window.TriggleQuietReader.isVisible()),true,
       'Figure and supplemental actions already visible');
    }
    await page.locator('#figureBtn').click();
    assert.equal(await page.locator('#figureDialog').evaluate(el=>el.open),true,
      'Figure should open its question-specific diagram');
    await page.locator('#closeDiagram').click();
    assert.equal(await page.locator('#figureBtn').isVisible(),true,
      'Figure must remain discoverable after closing its dialog');
   }
   await page.goto(url+'/index.html?class=9&question=g9-ch9-ex9.1-q4');
   await page.locator('#questionHead').waitFor({state:'visible'});
   assert.equal(await page.locator('#figureBtn').isVisible(),false,
     'Do not show misleading Figure action for a question without a useful diagram');
   if(width<=800){
    await page.goto(url+'/index.html?class=9&question=g9-ch9-ex9.1-q4');
    await page.locator('#next').click();
    await page.waitForFunction(()=>new URL(location.href).searchParams.get('question')==='g9-ch9-ex9.1-q5');
    assert.equal(await page.locator('#stepsRegion').isVisible(),true,'Next question keeps worked steps visible');
    assert.equal(await page.locator('#questionNavDock').isVisible(),true,'Next question keeps dock visible');
    await page.locator('#homeBtn').click();
    assert.equal(await page.locator('#discoveryView').isVisible(),true,'Home remains accessible in compact header');
    assert.equal(await page.locator('#questionNavDock').isVisible(),false,'Dock hidden when leaving question view');
   }
   assert.deepEqual(errors,[],'No JavaScript exceptions at '+width);
   await ctx.close();
  }
  console.log('PASS: question, reasoning, answer, compact Previous/Next and figure remain visible without touch; Home remains available.');
 }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
