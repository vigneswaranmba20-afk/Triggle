'use strict';
// Browser regression for every available textbook exercise entry-point.
const assert=require('node:assert/strict');
const http=require('node:http'),fs=require('node:fs/promises'),path=require('node:path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
async function run(){
 const server=http.createServer(async(req,res)=>{
  try{
   const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
   const file=path.resolve(root,'.'+(pathname.endsWith('/')?pathname+'index.html':pathname));
   if(!file.startsWith(root+path.sep))throw Error('Outside site');
   const data=await fs.readFile(file);
   const mime={'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.png':'image/png'};
   res.writeHead(200,{'content-type':mime[path.extname(file)]||'application/octet-stream','cache-control':'no-store'});
   res.end(data);
  }catch{res.writeHead(404);res.end();}
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const base='http://127.0.0.1:'+server.address().port;
 let browser;
 try{
  browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});
  for(const width of [320,390,1280]){
   const ctx=await browser.newContext({viewport:{width,height:850},serviceWorkers:'block'});
   const page=await ctx.newPage(),errors=[];
   page.on('pageerror',error=>errors.push(error.message));
   for(const id of ['g9-ch9','g9-ch1','g9-ch2','g9-ch6','g9-ch3','g10-ch6','g11-ch3','g12-ch4']){
    const grade=Number(id.match(/^g(\d+)/)[1]);
    await page.goto(base+'/index.html?class='+grade+'&chapter='+id);
    await page.locator('.hub-section-card[data-hub-section="exercises"]').click();
    const snapshot=await page.evaluate(id=>{
      const ch=window.TRIGGLE_CURRICULUM.grades.flatMap(g=>g.chapters).find(c=>c.id===id);
      const data=window.TRIGGLE_CLASSES[ch?Number(id.match(/^g(\d+)/)[1]):9];
      const ids=new Set([...(ch?.legacyQuestionIds||[]),...(ch?.textbookQuestionIds||[])]);
      const questions=data.items.filter(item=>ids.has(item.id));
      return {chapter:id,expected:window.TriggleChapterHub.textbookExercises(questions).map(q=>q.id)};
    },id);
    if(snapshot.expected.length){
     const actual=new URL(page.url()).searchParams;
     assert.equal(actual.get('question'),snapshot.expected[0],id+' must open its first textbook item');
     assert.equal(actual.has('section'),false,'No list section route after Exercises click');
     assert.equal(await page.locator('#questionText').isVisible(),true,'Question shown at '+width);
     assert.equal(await page.locator('#answerBox').isVisible(),true,'Answer shown at '+width);
     assert.equal(await page.locator('#chapterOverview').isVisible(),false,'No practice/filter screen');
     if(width<=800)assert.equal(await page.locator('#stepsRegion').isVisible(),false,'Quiet reader starts with Q+A only');
     if(snapshot.expected.length>1){
       if(width<=800)await page.keyboard.press('Tab');
       await page.locator('#next').click();
       assert.equal(new URL(page.url()).searchParams.get('question'),snapshot.expected[1],id+' next must stay in chapter');
     }
     if(width<=800)await page.keyboard.press('Tab');
     await page.locator('#questionReturnBtn').click();
     assert.equal(new URL(page.url()).searchParams.get('chapter'),id,id+' Back returns to chapter hub');
     assert.equal(new URL(page.url()).searchParams.has('section'),false,'Do not return to practice question list');
    }else{
     assert.equal(new URL(page.url()).searchParams.get('section'),'exercises',id+' missing textbook content must remain honest');
     assert.equal(await page.locator('#lessonCard').isVisible(),false);
     assert.equal(await page.locator('.hub-question').count(),0,'Do not substitute practice for missing book content');
     assert.match(await page.locator('#chapterSectionContent').innerText(),/coming soon|not available|are adding|சேர்க்கப்படுகின்றன|added|இன்னும்/i);
    }
    const metrics=await page.evaluate(()=>({vw:innerWidth,sw:document.documentElement.scrollWidth}));
    assert.ok(metrics.sw<=metrics.vw+1,'Horizontal overflow at '+width+' on '+id);
   }
   assert.deepEqual(errors,[], 'No browser JS errors at '+width);
   await ctx.close();
  }
  console.log('PASS: Exercises directly opens first textbook problem across 8 chapter routes at mobile 320/390 and desktop 1280, with no practice screen, correct next/back, and honest empty states.');
 }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
}
run().catch(err=>{console.error(err);process.exitCode=1;});
