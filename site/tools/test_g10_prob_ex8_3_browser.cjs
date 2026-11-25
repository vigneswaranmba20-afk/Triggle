'use strict';
const assert=require('node:assert/strict'),{chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
(async()=>{
  const app=await server(),browser=await chromium.launch(launchOptions());
  try{
    const page=await browser.newPage({viewport:{width:390,height:844},serviceWorkers:'block'});
    const errors=[],missing=[];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('response',r=>{if(r.status()>=400)missing.push(r.url());});

    const spotIds=['c10-8-ex8-3-q1','c10-8-ex8-3-q2','c10-8-ex8-3-q3-i','c10-8-ex8-3-q3-ii','c10-8-ex8-3-q8-iii','c10-8-ex8-3-q11','c10-8-ex8-3-q13-iii'];
    for(const width of [320,390,412]){
      await page.setViewportSize({width,height:844});
      for(const lang of ['en','ta']){
        await page.goto(app.base+'/index.html?class=10&question=c10-8-ex8-3-q3-i');
        await page.locator(lang==='ta'?'#langTa':'#langEn').click();
        for(const id of spotIds){
          await page.goto(app.base+'/index.html?class=10&question='+id);
          await page.locator('#stepsList .worked-step').first().waitFor();
          await page.waitForFunction(()=>document.querySelectorAll('#stepsList .katex').length>0);
          const s=await page.evaluate(id=>{
            const k=[...document.querySelectorAll('#questionText .katex, #stepsList .katex, #answerText .katex')];
            const clipped=k.filter(e=>{const b=e.getBoundingClientRect();return b.width>0&&b.right>innerWidth+1&&!e.closest('[tabindex],.katex-display')}).length;
            return {
              q:document.querySelector('#questionText').textContent,
              qOverline:document.querySelectorAll('#questionText .overline').length,
              ans:document.querySelector('#answerText').textContent,
              steps:[...document.querySelectorAll('#stepsList .worked-step:not(.final-answer-step) .step-reason')].map(e=>e.textContent),
              katexCount:k.length,clipped,
              width:document.documentElement.scrollWidth,vw:innerWidth,
              inlineFigHidden:document.querySelector('#inlineFigure').hidden,
              inlineImgSrc:document.querySelector('#inlineFigureVisual img')?.getAttribute('src')||'',
              badge:document.querySelector('#kindBadge').textContent
            };
          },id);
          assert.ok(s.katexCount>=2,'KaTeX rendered '+id+' '+lang);
          assert.equal(s.clipped,0,'no clipped KaTeX '+id+' '+lang+' @'+width);
          assert.ok(s.width<=s.vw+1,'no horizontal overflow '+id+' '+lang+' @'+width+': '+s.width+'>'+s.vw);
          if(lang==='ta'){
            assert.ok(/\p{Script=Tamil}/u.test(s.q),'Tamil question '+id);
            assert.ok(s.steps.every(t=>/\p{Script=Tamil}/u.test(t)),'Tamil steps '+id);
            assert.ok(!s.badge.includes('மொழிபெயர்ப்பு நிலுவையில்'),'no missing-Tamil badge '+id);
          }
          if(id==='c10-8-ex8-3-q3-i'){
            assert.ok(s.qOverline>=2,'Q3(i) overbar rendered in question ('+lang+')');
            assert.ok(s.ans.includes('15')&&s.ans.includes('32'),'Q3(i) answer 15/32');
          }
          if(id==='c10-8-ex8-3-q3-ii'){
            assert.ok(s.ans.includes('340'),'Q3(ii) answer 340');
          }
          if(id==='c10-8-ex8-3-q1'||id==='c10-8-ex8-3-q2'||id==='c10-8-ex8-3-q11'){
            assert.equal(s.inlineFigHidden,false,'inline figure visible '+id);
            assert.ok(s.inlineImgSrc.includes('grade10-ch8'),'inline SVG src '+id);
            if(lang==='ta')assert.ok(s.inlineImgSrc.includes('grade10-ch8/ta/'),'Tamil SVG src '+id);
          }
        }
      }
    }

    // Q11 expanded figure modal check
    await page.setViewportSize({width:390,height:844});
    await page.goto(app.base+'/index.html?class=10&question=c10-8-ex8-3-q11');
    await page.locator('#inlineFigureOpen').click();
    await page.locator('#figureDialog[open]').waitFor();
    const diagImg=await page.locator('#diagramContent img').getAttribute('src');
    assert.ok(diagImg&&diagImg.includes('ex8-3-q11-target.svg'),'Q11 expanded figure opens');
    await page.locator('#closeDiagram').click();

    // Next/Previous, saved progress, and final Q13 boundary
    await page.goto(app.base+'/index.html?class=10&question=c10-8-ex8-3-q3-i');
    await page.locator('#stepsList .worked-step').first().waitFor();
    await page.locator('#next').click();
    await page.waitForFunction(()=>location.search.includes('c10-8-ex8-3-q3-ii'));
    await page.locator('#previous').click();
    await page.waitForFunction(()=>location.search.includes('c10-8-ex8-3-q3-i'));
    await page.locator('#markDone').evaluate(el=>el.click());
    await page.reload();
    await page.locator('#stepsList .worked-step').first().waitFor();
    assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'),'true','saved progress persists');

    await page.goto(app.base+'/index.html?class=10&question=c10-8-ex8-3-q13-iii');
    await page.locator('#stepsList .worked-step').first().waitFor();
    assert.ok((await page.locator('#answerText').textContent()).includes('1'),'Q13(iii) renders');

    assert.deepEqual(errors,[]);
    assert.deepEqual(missing,[]);
    console.log('PASS G10 Ex8.3 browser: 320/390/412px, EN/TA, Q3 overbar, Q1/Q2/Q11 figures, Next/Prev, saved progress, Q13 boundary');
  }finally{await browser.close();await app.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
