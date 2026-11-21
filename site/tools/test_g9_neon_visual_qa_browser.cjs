'use strict';
/* NEON handoff: Grade 9 concept UI evidence from the unmerged source branch. */
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const path=require('node:path');
const {chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
const CHAPTERS=[['g9-ch1',7],['g9-ch2',8],['g9-ch7',4],['g9-ch9',5]];
const WIDTHS=[320,390,412];
const LANGS=['en','ta'];
// Explicit second-pass visual samples, including the layouts NEON could not inspect.
const SAMPLES={'g9-ch1':[0,1,3],'g9-ch2':[0,4],'g9-ch7':[0,1],'g9-ch9':[0,4]};
const OUT=path.resolve('screenshots/g9-neon-qa');
(async()=>{
  await fs.mkdir(OUT,{recursive:true});
  const app=await server(),browser=await chromium.launch(launchOptions());
  const records=[],failures=[],captures=[];
  try{
    for(const width of WIDTHS){
      const context=await browser.newContext({viewport:{width,height:852},serviceWorkers:'block',reducedMotion:'reduce'});
      const page=await context.newPage();
      const errors=[];
      page.on('pageerror',e=>errors.push(e.message));
      for(const lang of LANGS){
        for(const [chapter,count] of CHAPTERS){
          for(let i=0;i<count;i++){
            const label=chapter+'/'+i+'/'+lang+'/'+width;
            try{
              const route=app.base+'/index.html?class=9&chapter='+chapter+'&section=concepts&concept='+i;
              const response=await page.goto(route,{waitUntil:'domcontentloaded'});
              assert(response&&response.ok(),label+' HTTP page loaded');
              await page.locator(lang==='ta'?'#langTa':'#langEn').click();
              const hub=page.locator('.chapter-hub[data-grade="9"][data-hub-section="concepts"]');
              await hub.locator('.sp2-journey[data-view="lesson"]').waitFor({state:'visible',timeout:15000});
              await page.evaluate(()=>document.fonts.ready);
              assert.equal(new URL(page.url()).searchParams.get('concept'),String(i),label+' deep link stable');
              const metrics=await hub.evaluate(el=>{
                const lesson=el.querySelector('.sp2-journey[data-view="lesson"]');
                const labs=[...lesson.querySelectorAll('.g9m-lab,.lc-lab,.sp2-demo,.probability-demo')]
                  .filter(n=>n.getClientRects().length);
                const controls=[...lesson.querySelectorAll(
                  '.g9m-choices button,.sp2-demo-controls button,.lc-rules button,.rnlab .rnlab-choice,.rnlab .rnlab-foundation-tabs button,.probability-controls button')]
                  .filter(n=>n.getClientRects().length);
                const footer=lesson.querySelector('.sp2-journey-footer');
                return {
                  pageWidth:document.documentElement.scrollWidth,
                  viewport:window.innerWidth,
                  labs:labs.map(n=>({className:n.className,background:getComputedStyle(n).backgroundColor})),
                  controls:controls.map(n=>({height:n.getBoundingClientRect().height,label:(n.textContent||'').trim().slice(0,35)})),
                  footerPosition:footer?getComputedStyle(footer).position:null,
                  errors:document.querySelectorAll('[data-math-error]').length
                };
              });
              assert(metrics.labs.length>=1,label+' visible math lab');
              assert(metrics.labs.every(x=>x.background==='rgba(122, 140, 167, 0.055)'),label+' Mensuration lab tint: '+JSON.stringify(metrics.labs));
              assert(metrics.controls.every(x=>x.height>=45.5),label+' touch controls >=46px: '+JSON.stringify(metrics.controls.filter(x=>x.height<45.5)));
              assert(metrics.pageWidth<=metrics.viewport+1,label+' no horizontal page overflow: '+JSON.stringify(metrics));
              assert.equal(metrics.footerPosition,'static',label+' footer remains in document flow');
              assert.equal(metrics.errors,0,label+' no math render errors');
              if(chapter==='g9-ch1'&&lang==='ta'&&width===320){
                const bounds=await hub.locator('.g9-set-journey .sp2-detail-navigation').evaluate(el=>{
                  const left=el.querySelector('.sp2-back-index').getBoundingClientRect();
                  const right=el.querySelector('.sp2-top-next').getBoundingClientRect();
                  return {gap:right.left-left.right,leftRight:left.right,rightLeft:right.left};
                });
                assert(bounds.gap>=8,label+' Tamil 320px navigation gap: '+JSON.stringify(bounds));
              }
              if(chapter==='g9-ch9'&&i===4&&width===320){
                const wordSafe=await hub.locator('.probability-event-pairs .probability-controls > button').evaluateAll(buttons=>
                  buttons.filter(btn=>(btn.textContent||'').includes('Complements')).map(btn=>({
                    wrap:getComputedStyle(btn).overflowWrap,
                    wordBreak:getComputedStyle(btn).wordBreak,
                    height:btn.getBoundingClientRect().height
                  })));
                assert(wordSafe.length>=1,label+' Complements choice present');
                assert(wordSafe.every(x=>x.wrap==='normal'&&x.wordBreak==='normal'&&x.height>=45.5),
                  label+' Complements must not split midword or shrink the touch target: '+JSON.stringify(wordSafe));
              }
              if(chapter==='g9-ch1'&&lang==='ta'&&width===390){
                const top=await hub.locator('.g9-set-journey .sp2-detail-navigation').evaluate(el=>{
                  const left=el.querySelector('.sp2-back-index').getBoundingClientRect();
                  const right=el.querySelector('.sp2-top-next').getBoundingClientRect();
                  const outer=el.getBoundingClientRect();
                  return {leftRight:left.right,leftY:left.y,leftBottom:left.bottom,
                    rightLeft:right.left,rightY:right.y,rightBottom:right.bottom,
                    outerRight:outer.right};
                });
                assert(top.leftRight<=top.rightLeft+1,label+' Tamil navigation is side by side: '+JSON.stringify(top));
                assert(Math.abs(top.leftY-top.rightY)<8,label+' Tamil nav has one row: '+JSON.stringify(top));
                assert(top.rightLeft<=top.outerRight,label+' Tamil next link stays inside card');
              }
              if(chapter==='g9-ch1'||chapter==='g9-ch2'){
                const summary=hub.locator('details.sp2-explanation > summary, details.rnlab-pitfall > summary').first();
                assert(await summary.count()>=1,label+' explanation is an interactive disclosure');
                const affordance=await summary.evaluate(el=>getComputedStyle(el,'::before').content);
                assert(affordance.includes('▸'),label+' disclosure arrow must be visible: '+affordance);
              }
              const selected=(SAMPLES[chapter]||[]).includes(i);
              const capture=(width===390&&selected)||
                (width===320&&lang==='ta'&&((chapter==='g9-ch1'&&i===0)||(chapter==='g9-ch9'&&i===4)));
              if(capture){
                // The lesson uses its own vertically scrollable container, so
                // fullPage screenshots alone clip everything after the first fold.
                // Capture top/middle/bottom explicitly to expose practice and footer.
                const scroller=page.locator('.lesson-container');
                const stem=chapter+'-concept-'+i+'-'+lang+'-'+width;
                for(const [position,fraction] of [['top',0],['middle',.5],['bottom',1]]){
                  await scroller.evaluate((el,f)=>{el.scrollTop=Math.round((el.scrollHeight-el.clientHeight)*f);},fraction);
                  await page.screenshot({path:path.join(OUT,stem+'-'+position+'.png'),fullPage:true});
                  captures.push(stem+'-'+position+'.png');
                }
              }
              records.push({label,ok:true,labCount:metrics.labs.length,controlCount:metrics.controls.length});
            }catch(err){
              failures.push({label,error:err.message});
              console.error('FAIL '+label+': '+err.message);
            }
          }
        }
      }
      assert.deepEqual(errors,[],'No uncaught page JavaScript errors at '+width);
      await context.close();
    }
  }finally{
    await fs.writeFile(path.join(OUT,'review-manifest.json'),JSON.stringify({
      branch:process.env.GITHUB_HEAD_REF||process.env.GITHUB_REF_NAME||'local',
      commit:process.env.GITHUB_SHA||'local',
      expectedConcepts:24,viewportWidths:WIDTHS,languages:LANGS,
      passed:records.length,failed:failures.length,failures,records,
      screenshots:captures, captureMethod:'top/middle/bottom of internal .lesson-container scroller, fullPage:true for each segment'
    },null,2));
    await browser.close();await app.close();
  }
  assert.equal(records.length,24*WIDTHS.length*LANGS.length,'Complete Grade 9 bilingual viewport coverage');
  assert.equal(captures.length,60,'Expected secondary-layout and 320px captures: 60 screenshots');
  assert.equal(failures.length,0,'Grade 9 NEON visual QA must have zero failures: '+JSON.stringify(failures.slice(0,8)));
  console.log('PASS 24 Grade 9 concepts at 320/390/412px in EN+TA: 144 checks, 60 top/middle/bottom screenshots recorded');
})().catch(e=>{console.error(e);process.exitCode=1;});
