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
const OUT=path.resolve('screenshots/g9-neon-qa');
(async()=>{
  await fs.mkdir(OUT,{recursive:true});
  const app=await server(),browser=await chromium.launch(launchOptions());
  const records=[],failures=[];
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
              if(width===390&&(i===0||(chapter==='g9-ch7'&&i===1))){
                await page.screenshot({path:path.join(OUT,chapter+'-concept-'+i+'-'+lang+'-390.png'),fullPage:true});
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
      passed:records.length,failed:failures.length,failures,records
    },null,2));
    await browser.close();await app.close();
  }
  assert.equal(records.length,24*WIDTHS.length*LANGS.length,'Complete Grade 9 bilingual viewport coverage');
  assert.equal(failures.length,0,'Grade 9 NEON visual QA must have zero failures: '+JSON.stringify(failures.slice(0,8)));
  console.log('PASS 24 Grade 9 concepts at 320/390/412px in EN+TA: 144 checks, visual evidence recorded');
})().catch(e=>{console.error(e);process.exitCode=1;});
