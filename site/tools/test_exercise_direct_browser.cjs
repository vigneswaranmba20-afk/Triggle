'use strict';
// Regression: all grades choose an exercise before a question; Next is exercise-bound.
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
   res.writeHead(200,{'content-type':mime[path.extname(file)]||'application/octet-stream','cache-control':'no-store'});res.end(data);
  }catch{res.writeHead(404);res.end()}
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const base='http://127.0.0.1:'+server.address().port;
 let browser;
 try{
  browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});
  const chapters=['g9-ch9','g9-ch1','g9-ch2','g9-ch6','g9-ch3','g10-ch2','g10-ch3','g10-ch4','g10-ch6','g10-ch8'];
  for(const width of [320,390,1280]){
   const ctx=await browser.newContext({viewport:{width,height:850},serviceWorkers:'block'});
   const page=await ctx.newPage(),errors=[];
   page.on('pageerror',error=>errors.push(error.message));
   for(const id of chapters){
    const grade=Number(id.match(/^g(\d+)/)[1]);
    await page.goto(base+'/index.html?class='+grade+'&chapter='+id);
    await page.locator('.hub-section-card[data-hub-section="exercises"]').click();
    const expected=await page.evaluate(id=>{
     const ch=window.TRIGGLE_CURRICULUM.grades.flatMap(g=>g.chapters).find(c=>c.id===id);
     const grade=Number(id.match(/^g(\d+)/)[1]);
     const data=window.TRIGGLE_CLASSES[grade].items;
     const ids=new Set([...(ch?.legacyQuestionIds||[]),...(ch?.textbookQuestionIds||[])]);
     const questions=data.filter(item=>ids.has(item.id));
     const textbook=window.TriggleChapterHub.textbookExercises(questions);
     return [...new Set(textbook.map(q=>q.exercise))];
    },id);
    const url=new URL(page.url()).searchParams;
    assert.equal(url.get('chapter'),id,'Stay in selected chapter for index');
    assert.equal(url.get('section'),'exercises','Exercises opens its list, not Q1');
    assert.equal(url.has('question'),false,'No question route before choosing exercise');
    assert.equal(await page.locator('.hub-exercise-link').count(),expected.length,id+' exercise group count');
    assert.equal(await page.locator('.hub-question').count(),0,'Index is numbers only, not every question');
    if(expected.length){
     const group=await page.locator('.hub-exercise-link').first().getAttribute('data-exercise');
     await page.locator('.hub-exercise-link').first().click();
     const actual=new URL(page.url()).searchParams.get('question');
     assert(actual,'Exercise opens its first available question');
     assert.equal(await page.evaluate(id=>window.TRIGGLE_CLASSES[Number(new URL(location.href).searchParams.get('class'))].items.find(q=>q.id===id)?.exercise,actual),group,'Selected group matches current question');
     assert.equal(await page.locator('#questionText').isVisible(),true);
     assert.equal(await page.locator('#exerciseIndexLink').isVisible(),true,'Accessible return to exercise list');
     assert.equal(await page.locator('#stepsList .final-answer-step').count(),1,'Complete answer retained');
     await page.locator('#exerciseIndexLink').click();
     assert.equal(new URL(page.url()).searchParams.get('section'),'exercises','Return points to index');
     assert.equal(await page.locator('.hub-exercise-link').count(),expected.length);
    }else{
     assert.equal(await page.locator('#lessonCard').isVisible(),false);
     assert.match(await page.locator('#chapterSectionContent').innerText(),/coming soon|not available|are adding|சேர்க்கப்படுகின்றன|added|இன்னும்/i);
    }
    const metrics=await page.evaluate(()=>({vw:innerWidth,sw:document.documentElement.scrollWidth}));
    assert(metrics.sw<=metrics.vw+1,'Horizontal overflow '+width+' '+id);
   }
   // A last question must *not* navigate into the next numbered exercise.
   for(const [last,nextExercise] of [['c10-2-ex2-1-q10','2.2'],['c10-2-ex2-2-q9','2.3']]){
    await page.goto(base+'/index.html?class=10&question='+last);
    assert.equal(await page.locator('#next').isDisabled(),true,'Next disabled at end of '+last);
    assert.match(await page.locator('#next').innerText(),/End of exercise/);
    assert.notEqual(new URL(page.url()).searchParams.get('question'),nextExercise);
    await page.locator('#exerciseIndexLink').click();
    assert.equal(new URL(page.url()).searchParams.get('section'),'exercises');
   }

   // AUD28-04: the real practice route, figure modal and both languages.
   await page.goto(base+'/index.html?class=9&question=c9-4-4-practice-5');
   for(const language of ['En','Ta']){
    await page.locator('#lang'+language).click();
    await page.locator('#figureBtn').click();
    const picture=page.locator('#diagramContent svg').first();
    assert(await picture.isVisible(),'Angle figure visible '+width+' '+language);
    const evidence=await picture.evaluate(el=>{
     const v=el.viewBox.baseVal, p=el.querySelector('path'), b=p.getBBox();
     return {label:el.getAttribute('aria-label'),text:el.textContent,inside:b.x>=0&&b.y>=0&&b.x+b.width<=v.width&&b.y+b.height<=v.height,svgWidth:el.getBoundingClientRect().width,viewport:innerWidth};
    });
    assert(evidence.inside,'All triangle vertices within figure bounds');
    assert(evidence.svgWidth<=evidence.viewport+1,'Figure fits viewport');
    assert(/55°/.test(evidence.text)&&/65°/.test(evidence.text)&&/x/.test(evidence.text),'Correct angle labels');
    assert(!/sin θ|cos θ|60°/.test(evidence.text),'No unrelated trig or solution in figure');
    assert(language==='Ta'?/முக்கோணம்/.test(evidence.label):/unknown angle x/.test(evidence.label),'Localized figure description');
    await page.locator('#closeDiagram').click();
    assert(!(await page.locator('#figureDialog').isVisible()),'Figure can be closed');
   }
   assert.deepEqual(errors,[], 'No browser JS errors at '+width);
   await ctx.close();
  }
  console.log('PASS: active-grade numbered exercise indexes, per-exercise boundaries, return links and 320/390/1280 widths.');
 }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
}
run().catch(err=>{console.error(err);process.exitCode=1;});
