'use strict';
/* Real Chromium verification for all 12 Grade 10 Ch4 Geometry Concepts at 320/360/390/412/430 px (EN + TA + Drag + Offline + Keyboard). */
const assert=require('node:assert/strict');
const http=require('node:http'),fs=require('node:fs/promises'),path=require('node:path');
const {chromium}=require('playwright');

const SITE=path.resolve(__dirname,'..');
const MIME={
  '.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8',
  '.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8',
  '.svg':'image/svg+xml','.png':'image/png','.woff2':'font/woff2','.webmanifest':'application/manifest+json'
};

function startServer(){
  const srv=http.createServer(async(req,res)=>{
    try{
      const pathname=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);
      const rel=pathname.endsWith('/')?pathname+'index.html':pathname;
      const file=path.resolve(SITE,'.'+rel);
      if(!file.startsWith(SITE+path.sep)&&file!==SITE)throw Error('Forbidden');
      const data=await fs.readFile(file);
      res.writeHead(200,{'content-type':MIME[path.extname(file)]||'application/octet-stream','cache-control':'no-store'});
      res.end(data);
    }catch{res.writeHead(404);res.end();}
  });
  return new Promise(r=>srv.listen(0,'127.0.0.1',()=>r(srv)));
}

async function assertStudioAndLayout(page,ctxLabel){
  const check=await page.evaluate(()=>{
    const doc=document.documentElement;
    const errors=document.querySelectorAll('.math-error,[data-math-error="true"]').length;
    const clippedTex=[...document.querySelectorAll('.g10ch4-studio .triggle-tex-display')]
      .filter(el=>{
        const r=el.getBoundingClientRect();
        return r.width>0&&(el.scrollWidth>el.clientWidth+2);
      })
      .map(el=>({text:el.textContent.trim().slice(0,40),scrollW:Math.round(el.scrollWidth),clientW:Math.round(el.clientWidth)}));
    const svgs=[...document.querySelectorAll('.g10ch4-lab svg, .g10ch4-glance-visual svg')].filter(s=>!s.closest('.katex')).map(s=>{
      const r=s.getBoundingClientRect();return {w:r.width,h:r.height};
    });
    const smallButtons=[...document.querySelectorAll('.g10ch4-lab button, .sp2-answers button, .sp2-recall-actions button, .sp2-back-index, .sp2-top-next, [data-adaptive-dock] button, .g10ch4-exercise-row button')]
      .filter(el=>{const r=el.getBoundingClientRect();return r.width>0&&r.height>0&&(r.height<43.5||r.width<43.5);})
      .map(el=>({text:el.textContent.trim(),w:Math.round(el.getBoundingClientRect().width),h:Math.round(el.getBoundingClientRect().height)}));
    const cards=document.querySelectorAll('.g10ch4-studio > .g10ch4-card').length;
    return {
      overflow:doc.scrollWidth-doc.clientWidth,
      scrollW:doc.scrollWidth,clientW:doc.clientWidth,
      mathErrors:errors,
      clippedTex,
      katexCount:document.querySelectorAll('.g10ch4-studio .katex').length,
      svgs,smallButtons,cards
    };
  });
  assert.equal(check.cards,6,`${ctxLabel}: expected all 6 mandatory concept cards`);
  assert(check.overflow<=1,`${ctxLabel}: horizontal overflow ${check.overflow}px (${check.scrollW} > ${check.clientW})`);
  assert.equal(check.mathErrors,0,`${ctxLabel}: KaTeX math errors detected`);
  assert.deepEqual(check.clippedTex,[],`${ctxLabel}: clipped display formulas detected: ${JSON.stringify(check.clippedTex)}`);
  assert(check.katexCount>=1,`${ctxLabel}: expected KaTeX rendering`);
  for(const s of check.svgs)assert(s.w>120&&s.h>50,`${ctxLabel}: SVG degenerate box ${JSON.stringify(s)}`);
  assert.deepEqual(check.smallButtons,[],`${ctxLabel}: touch targets below 44px: ${JSON.stringify(check.smallButtons)}`);
}

async function run(){
  const srv=await startServer();
  const base='http://127.0.0.1:'+srv.address().port;
  let browser;
  try{
    browser=await chromium.launch({
      headless:true,
      ...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),
      args:['--no-sandbox']
    });

    /* 1. Discovery + Chapter Overview + Index + Keyboard + Deep Links + Exercise Connect + Back */
    {
      const ctx=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
      const page=await ctx.newPage();
      const pageErrors=[];page.on('pageerror',err=>pageErrors.push(err.message));

      await page.goto(base+'/index.html?class=10&browse=chapters',{waitUntil:'load'});
      const ch4Meta=await page.locator('.discover-chapter[data-chapter="g10-ch4"] .discover-chapter-meta').innerText();
      assert.match(ch4Meta,/12 Interactive mini-lessons available/i);

      await page.locator('.discover-chapter[data-chapter="g10-ch4"]').click();
      assert.match(await page.locator('.hub-section-card[data-hub-section="concepts"] .hub-section-count').innerText(),/12 available/i);

      await page.locator('.hub-section-card[data-hub-section="concepts"]').click();
      await page.locator('.sp2-index-view .sp2-nav-button').first().waitFor({state:'visible'});
      assert.equal(await page.locator('.sp2-index-view .sp2-nav-button').count(),12);

      // Bad concept fallback -> index
      await page.goto(base+'/index.html?class=10&chapter=g10-ch4&section=concepts&concept=99',{waitUntil:'load'});
      assert.equal(await page.locator('.sp2-journey').getAttribute('data-view'),'index');

      // Keyboard Tab + Enter opens Concept 5 (BPT / Thales)
      await page.locator('.sp2-index-view .sp2-nav-button').nth(4).focus();
      await page.keyboard.press('Enter');
      assert.equal(await page.locator('.sp2-journey').getAttribute('data-view'),'lesson');
      assert.match(await page.locator('.sp2-concept-heading h4').innerText(),/^5\./);

      // Video must be visible in the Geometry Studio, not merely in the underlying lesson data.
      // Opening it verifies the accessible on-demand HTML5 player without requesting audio on page load.
      const watch=page.locator('.sp2-concept-video-button');
      assert.equal(await watch.count(),1,'Thales has exactly one visible Watch button');
      assert.equal(await watch.isVisible(),true,'Thales Watch button visible on first lesson screen');
      assert.match(await watch.innerText(),/Watch video explanation.*1:40/);
      assert.equal(await page.locator('.sp2-concept-heading + .sp2-concept-video-button').count(),1,
        'Watch video sits immediately below the concept title, above six lesson cards');
      await watch.click();
      const mediaDialog=page.locator('dialog.sp2-concept-video-dialog');
      await mediaDialog.waitFor({state:'visible'});
      assert.equal(await mediaDialog.locator('video').evaluate(el=>el.controls&&el.playsInline&&el.preload==='none'),true,
        'Video player supports native controls, inline playback and no eager loading');
      assert.match(await mediaDialog.locator('video').getAttribute('src'),
        /\/g10-ch4-bpt-thales\/2c07afb76d30e65c707b0df1e56a2aa99bbfc8d092efa949ec91d920d898f201\.mp4$/);
      await mediaDialog.locator('.sp2-concept-video-close').click();
      assert.equal(await page.locator('dialog.sp2-concept-video-dialog').count(),0,'Closing video restores lesson');

      // Try it yourself: wrong -> Hint -> right -> Why
      const whyBtn=page.locator('[data-why]');
      assert.equal(await whyBtn.isDisabled(),true,'Why disabled before attempt');
      await page.locator('[data-answers] button[data-choice="0"]').click();
      assert.match(await page.locator('[data-feedback]').innerText(),/part-to-part/i);
      assert.equal(await whyBtn.isDisabled(),false,'Why unlocks after attempt');
      await page.locator('[data-hint]').click();
      assert.match(await page.locator('[data-feedback]').innerText(),/WHOLE side/i);
      await page.locator('[data-answers] button[data-choice="2"]').click();
      assert.match(await page.locator('[data-feedback]').innerText(),/Correct!/);
      await whyBtn.click();
      await page.locator('[data-why-response]').waitFor({state:'visible'});

      // Connect button opens Exercise 4.2 Q1(i) and Back returns to Concept 5 (index 4)
      await page.locator('.g10ch4-exercise-row .g10ch2-practice-link').first().click();
      assert.equal(new URL(page.url()).searchParams.get('question'),'c10-4-ex4-2-q1-i');
      await page.goBack();
      assert.equal(new URL(page.url()).searchParams.get('concept'),'4');

      // Concept 12 Next -> returns to index
      await page.goto(base+'/index.html?class=10&chapter=g10-ch4&section=concepts&concept=11',{waitUntil:'load'});
      assert.match(await page.locator('[data-top-next]').innerText(),/Back to concepts/);
      await page.locator('[data-top-next]').click();
      assert.equal(await page.locator('.sp2-journey').getAttribute('data-view'),'index');

      assert.deepEqual(pageErrors,[],'Unexpected runtime errors during navigation flow');
      await ctx.close();
    }

    /* 2. Sweep ALL 12 Concepts across 320, 360, 390, 412, 430 px mobile viewports */
    for(const width of [320,360,390,412,430]){
      const ctx=await browser.newContext({viewport:{width,height:844},serviceWorkers:'block'});
      const page=await ctx.newPage();
      const pageErrors=[];page.on('pageerror',err=>pageErrors.push(err.message));

      for(let idx=0;idx<12;idx++){
        const c=idx+1;
        await page.goto(base+'/index.html?class=10&chapter=g10-ch4&section=concepts&concept='+idx,{waitUntil:'load'});
        await page.locator('.g10ch4-lab').waitFor({state:'visible'});
        await assertStudioAndLayout(page,`EN ${width}px Concept ${c}`);
        if(width===320){
          const tabCount=await page.locator('.g10ch4-lab .g10ch4-tab').count().catch(()=>0);
          for(let t=0;t<tabCount;t++){
            await page.locator('.g10ch4-lab .g10ch4-tab').nth(t).click();
            await assertStudioAndLayout(page,`EN 320px Concept ${c} tab ${t}`);
          }
          await page.locator('[data-answers] button').first().click();
          await page.locator('[data-why]').click();
          await assertStudioAndLayout(page,`EN 320px Concept ${c} why`);
        }
      }
      assert.deepEqual(pageErrors,[],`Page errors at ${width}px EN`);
      await ctx.close();
    }

    /* 3. Interactive Lab Behavioral + Pointer-Drag Assertions on All 12 Concepts (360px) */
    {
      const ctx=await browser.newContext({viewport:{width:360,height:844},serviceWorkers:'block'});
      const page=await ctx.newPage();

      // 1: similarity-scale -> set k = 1 Congruent
      await page.goto(base+'/index.html?class=10&chapter=g10-ch4&section=concepts&concept=0',{waitUntil:'load'});
      await page.locator('.g10ch4-chip-btn').nth(1).click();
      assert.match(await page.locator('.g10ch4-status').innerText(),/Congruent/);

      // 2: similarity-criteria -> SSA Trap + Flip
      await page.goto(base+'/index.html?class=10&chapter=g10-ch4&section=concepts&concept=1',{waitUntil:'load'});
      await page.locator('.g10ch4-tab').nth(3).click();
      assert.match(await page.locator('.g10ch4-status').innerText(),/SSA fails/);
      const beforeX=await page.locator('.g10ch4-lab svg polygon').nth(1).getAttribute('points');
      await page.locator('.g10ch4-chip-btn').click();
      const afterX=await page.locator('.g10ch4-lab svg polygon').nth(1).getAttribute('points');
      assert.notEqual(beforeX,afterX,'SSA swing arc flips triangle');

      // 3: similarity-results -> k = 3 gives 9 tiles, switch to altitude tab
      await page.goto(base+'/index.html?class=10&chapter=g10-ch4&section=concepts&concept=2',{waitUntil:'load'});
      await page.locator('.g10ch4-chip-btn').nth(2).click();
      assert.match(await page.locator('.g10ch4-status').innerText(),/3² = 9/);
      await page.locator('.g10ch4-tab').nth(1).click();
      assert.match(await page.locator('.g10ch4-metrics').innerText(),/△ADB ∼ △BDC ∼ △ABC/);

      // 4: similar-construction -> 7/3 scale factor
      await page.goto(base+'/index.html?class=10&chapter=g10-ch4&section=concepts&concept=3',{waitUntil:'load'});
      await page.locator('.g10ch4-tab').nth(3).click();
      assert.match(await page.locator('.g10ch4-status').innerText(),/7\/3/);

      // 5: BPT Thales -> Real pointer drag on handle D updates ratios while staying equal!
      await page.goto(base+'/index.html?class=10&chapter=g10-ch4&section=concepts&concept=4',{waitUntil:'load'});
      const handleD=page.locator('[data-handle="D"]');
      await handleD.scrollIntoViewIfNeeded();
      const handleBox=await handleD.boundingBox();
      assert(handleBox,'Draggable handle D exists');
      const beforeMetric=await page.locator('.g10ch4-metrics').innerText();
      await page.mouse.move(handleBox.x+handleBox.width/2,handleBox.y+handleBox.height/2);
      await page.mouse.down();
      await page.mouse.move(handleBox.x+handleBox.width/2,handleBox.y+35,{steps:6});
      await page.mouse.up();
      const afterMetric=await page.locator('.g10ch4-metrics').innerText();
      assert.notEqual(beforeMetric,afterMetric,'Dragging parallel line D updates ratios live');
      const vals=[...afterMetric.matchAll(/\n([\d.]+)/g)].map(m=>m[1]);
      if(vals.length>=2)assert.equal(vals[0],vals[1],'BPT left and right ratios remain equal after drag');

      // 6: Converse BPT -> Snap E onto F
      await page.goto(base+'/index.html?class=10&chapter=g10-ch4&section=concepts&concept=5',{waitUntil:'load'});
      assert.match(await page.locator('.g10ch4-status').innerText(),/NOT parallel/);
      await page.locator('.g10ch4-chip-btn').click();
      assert.match(await page.locator('.g10ch4-status').innerText(),/forcing DE ∥ BC/);

      // 7: Angle Bisector -> Pointer drag vertex A across SVG
      await page.goto(base+'/index.html?class=10&chapter=g10-ch4&section=concepts&concept=6',{waitUntil:'load'});
      const apexHandle=page.locator('[data-drag-handle]');
      await apexHandle.scrollIntoViewIfNeeded();
      const apexBox=await apexHandle.boundingBox();
      const beforeAbt=await page.locator('.g10ch4-metrics').innerText();
      await page.mouse.move(apexBox.x+apexBox.width/2,apexBox.y+apexBox.height/2);
      await page.mouse.down();
      await page.mouse.move(apexBox.x+75,apexBox.y+apexBox.height/2,{steps:6});
      await page.mouse.up();
      const afterAbt=await page.locator('.g10ch4-metrics').innerText();
      assert.notEqual(beforeAbt,afterAbt,'Dragging apex A updates AB/AC and BD/DC live');
      assert.match(afterAbt,/=/);

      // 8: Converse ABT -> 4.2 Q8(i) Trap
      await page.goto(base+'/index.html?class=10&chapter=g10-ch4&section=concepts&concept=7',{waitUntil:'load'});
      await page.locator('.g10ch4-chip-btn').nth(2).click();
      assert.match(await page.locator('.g10ch4-status').innerText(),/Degenerate trap/);

      // 9: Triangle construction -> Altitude & Bisector loci keep angle 40.0°
      await page.goto(base+'/index.html?class=10&chapter=g10-ch4&section=concepts&concept=8',{waitUntil:'load'});
      await page.locator('.g10ch4-tab').nth(2).click();
      assert.match(await page.locator('.g10ch4-metrics').innerText(),/40\.0°/);

      // 10: Pythagoras -> Area Layout B + Converse
      await page.goto(base+'/index.html?class=10&chapter=g10-ch4&section=concepts&concept=9',{waitUntil:'load'});
      await page.locator('.g10ch4-tab').nth(1).click();
      assert.match(await page.locator('.g10ch4-status').innerText(),/a² \+ b²/);
      await page.locator('.g10ch4-tab').nth(2).click();
      assert.match(await page.locator('.g10ch4-metrics').innerText(),/right/);

      // 11: Circles & Tangents -> Alternate Segment
      await page.goto(base+'/index.html?class=10&chapter=g10-ch4&section=concepts&concept=10',{waitUntil:'load'});
      await page.locator('.g10ch4-tab').nth(1).click();
      assert.match(await page.locator('.g10ch4-status').innerText(),/alternate-segment/i);

      // 12: Concurrency -> Medians preset -> Product 1.00; Menelaus tab
      await page.goto(base+'/index.html?class=10&chapter=g10-ch4&section=concepts&concept=11',{waitUntil:'load'});
      await page.locator('.g10ch4-chip-btn').click();
      assert.match(await page.locator('.g10ch4-status').innerText(),/Product = 1\.00/);
      await page.locator('.g10ch4-tab').nth(1).click();
      assert.match(await page.locator('.g10ch4-metrics').innerText(),/−1/);

      await ctx.close();
    }

    /* 4. Tamil UI Render + Honest Draft Notice + Zero Overflow (320px & 390px) */
    for(const width of [320,390]){
      const ctx=await browser.newContext({viewport:{width,height:844},serviceWorkers:'block'});
      await ctx.addInitScript(()=>{try{localStorage.setItem('triggle-language','ta');}catch{}});
      const page=await ctx.newPage();
      await page.goto(base+'/index.html?class=10&chapter=g10-ch4&section=concepts',{waitUntil:'load'});
      assert.equal(await page.locator('html').getAttribute('lang'),'ta');
      assert.equal(await page.locator('.sp2-index-view .sp2-nav-button').count(),12);
      const ov=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
      assert(ov<=1,`TA ${width}px Index overflow ${ov}`);

      for(const idx of [0,4,6,8,9,11]){
        await page.goto(base+'/index.html?class=10&chapter=g10-ch4&section=concepts&concept='+idx,{waitUntil:'load'});
        await page.locator('.g10ch4-tamil-badge').waitFor({state:'visible'});
        assert.match(await page.locator('.g10ch4-tamil-badge').innerText(),/ஆசிரியர் மீளாய்வு நிலுவையில்/);
        if(idx===4){
          const tamilWatch=page.locator('.sp2-concept-video-button');
          assert.equal(await tamilWatch.count(),1,'Tamil Thales concept offers Fola video');
          assert.match(await tamilWatch.innerText(),/ஆங்கிலக் குரல்/);
        }
        await assertStudioAndLayout(page,`TA ${width}px Concept ${idx+1}`);
      }
      await ctx.close();
    }

    /* 5. Offline Service Worker Persistence Check */
    {
      const ctx=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'allow'});
      const page=await ctx.newPage();
      await page.goto(base+'/index.html?class=10&chapter=g10-ch4&section=concepts&concept=4',{waitUntil:'load'});
      await page.evaluate(async()=>{
        if(!navigator.serviceWorker)return;
        await navigator.serviceWorker.ready;
        if(navigator.serviceWorker.controller)return;
        await new Promise(resolve=>{
          navigator.serviceWorker.addEventListener('controllerchange',()=>resolve(),{once:true});
          setTimeout(resolve,2500);
        });
      });
      await ctx.setOffline(true);
      await page.goto(base+'/index.html?class=10&chapter=g10-ch4&section=concepts&concept=4',{waitUntil:'load'});
      await page.locator('.g10ch4-lab svg').waitFor({state:'visible'});
      await assertStudioAndLayout(page,'Offline 390px Concept 5');
      await ctx.close();
    }

    console.log('PASS Grade 10 Chapter 4 Concepts Browser Suite: 12 interactive 6-part labs, pointer drag, 320/360/390/412/430px portrait, EN/TA bilingual, keyboard nav, KaTeX & offline SW');
  }finally{
    if(browser)await browser.close();
    await new Promise(r=>srv.close(r));
  }
}

run().catch(err=>{console.error(err);process.exit(1);});
