'use strict';
/* Real Chromium verification for all 12 Grade 10 Ch5 Coordinate Geometry Concepts at 320/360/390/412/430 px (EN + TA + Drag + Offline + Keyboard). */
const assert=require('node:assert/strict');
const http=require('node:http'),fs=require('node:fs/promises'),path=require('node:path');
const {chromium,webkit}=require('playwright');

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
      .map(el=>({text:el.textContent.trim().slice(0,45),scrollW:Math.round(el.scrollWidth),clientW:Math.round(el.clientWidth)}));
    const svgs=[...document.querySelectorAll('.g10ch4-lab svg, .g10ch4-glance-visual svg')].filter(s=>!s.closest('.katex')).map(s=>{
      const r=s.getBoundingClientRect();return {w:r.width,h:r.height};
    });
    const smallButtons=[...document.querySelectorAll('.g10ch4-lab button, .sp2-answers button, .sp2-recall-actions button, .sp2-back-index, .sp2-top-next, [data-adaptive-dock] button, .g10ch4-exercise-row button')]
      .filter(el=>{const r=el.getBoundingClientRect();return r.width>0&&r.height>0&&(r.height<43.5||r.width<43.5);})
      .map(el=>({text:el.textContent.trim(),w:Math.round(el.getBoundingClientRect().width),h:Math.round(el.getBoundingClientRect().height)}));
    const cards=document.querySelectorAll('.g10ch4-studio > .g10ch4-card').length;
    const refText=document.querySelector('.sp2-stage-reference')?.textContent||'';
    const svgCollisions=[];
    const gridRatios=[];
    for(const svg of [...document.querySelectorAll('.g10ch4-lab svg, .g10ch4-glance-visual svg')].filter(s=>!s.closest('.katex'))){
      const unit=axis=>{
        const lines=svg.querySelectorAll(`[data-dg-grid-axis="${axis}"]`);
        if(lines.length<2)return null;
        const [a,b]=Array.from(lines).slice(0,2).map(line=>new DOMPoint(
          Number(line.getAttribute('x1')),Number(line.getAttribute('y1'))).matrixTransform(line.getScreenCTM()));
        return Math.hypot(b.x-a.x,b.y-a.y);
      };
      const xUnit=unit('x'),yUnit=unit('y');
      if(xUnit&&yUnit)gridRatios.push(xUnit/yUnit);
      const texts=[...svg.querySelectorAll('text')].filter(t=>t.textContent.trim().length>0);
      for(let i=0;i<texts.length;i++){
        for(let j=i+1;j<texts.length;j++){
          const a=texts[i].getBoundingClientRect(),b=texts[j].getBoundingClientRect();
          const ox=Math.min(a.right,b.right)-Math.max(a.left,b.left);
          const oy=Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top);
          if(ox>3&&oy>3)svgCollisions.push({a:texts[i].textContent.trim(),b:texts[j].textContent.trim()});
        }
      }
    }
    return {
      overflow:doc.scrollWidth-doc.clientWidth,
      scrollW:doc.scrollWidth,clientW:doc.clientWidth,
      mathErrors:errors,
      clippedTex,
      katexCount:document.querySelectorAll('.g10ch4-studio .katex').length,
      svgs,smallButtons,cards,refText,svgCollisions,gridRatios
    };
  });
  assert.equal(check.cards,6,`${ctxLabel}: expected all 6 mandatory concept cards`);
  assert(check.refText.includes('EN p.')&&check.refText.includes('TA p.'),`${ctxLabel}: missing 2025 EN/TA page citation: ${check.refText}`);
  assert.deepEqual(check.svgCollisions,[],`${ctxLabel}: SVG text collisions: ${JSON.stringify(check.svgCollisions)}`);
  assert(check.gridRatios.length&&check.gridRatios.every(ratio=>Math.abs(ratio-1)<1e-6),`${ctxLabel}: equal scales on both axes`);
  assert(check.overflow<=1,`${ctxLabel}: horizontal overflow ${check.overflow}px (${check.scrollW} > ${check.clientW})`);
  assert.equal(check.mathErrors,0,`${ctxLabel}: KaTeX math errors detected`);
  assert.deepEqual(check.clippedTex,[],`${ctxLabel}: clipped display formulas: ${JSON.stringify(check.clippedTex)}`);
  assert(check.katexCount>=1,`${ctxLabel}: expected KaTeX rendering`);
  for(const s of check.svgs)assert(s.w>120&&s.h>50,`${ctxLabel}: SVG degenerate box ${JSON.stringify(s)}`);
  assert.deepEqual(check.smallButtons,[],`${ctxLabel}: touch targets below 44px: ${JSON.stringify(check.smallButtons)}`);
}

async function renderedVectors(page) {
  return page.locator('svg.g10ch4-svg line[data-dg-slope-line]').evaluateAll(lines=>lines.map(line=>{
    const matrix=line.getScreenCTM();
    const end=index=>new DOMPoint(Number(line.getAttribute('x'+index)),
      Number(line.getAttribute('y'+index))).matrixTransform(matrix);
    const start=end(1),finish=end(2);
    return [finish.x-start.x,start.y-finish.y];
  }));
}

async function assertRenderedAngles(page,base) {
  const near=(actual,expected,label)=>assert(Math.abs(actual-expected)<1e-6,`${label}: ${actual} ≠ ${expected}`);
  for(const lang of ['en','ta'])for(const percent of [100,200]){
    await page.goto(base+'/index.html?class=10&chapter=g10-ch5&section=concepts&concept=4');
    await page.locator(lang==='ta'?'#langTa':'#langEn').evaluate(button=>button.click());
    await page.evaluate(percent=>{document.documentElement.style.fontSize=percent+'%';},percent);
    for(const [index,angle] of [0,45,90,135].entries()){
      await page.locator('.g10ch4-chip-btn').nth(index).click();
      const [[x,y]]=await renderedVectors(page);
      near((Math.atan2(y,x)*180/Math.PI+180)%180,angle,lang+' '+percent+'% inclination');
    }
    if(lang==='en'&&percent===100){
      const graph=page.locator('svg.g10ch4-svg');
      await graph.scrollIntoViewIfNeeded();
      const corner=await graph.evaluate(svg=>{
        const [edge]=Array.from(svg.querySelectorAll('[data-dg-grid-axis="x"]')).slice(-1);
        const point=new DOMPoint(Number(edge.getAttribute('x1')),Number(edge.getAttribute('y1'))).matrixTransform(edge.getScreenCTM());
        return [point.x,point.y];
      });
      for(const id of ['A','B']){
        const handle=await graph.locator(`[data-handle="${id}"] circle[stroke]`).boundingBox();
        await page.mouse.move(handle.x+handle.width/2,handle.y+handle.height/2);
        await page.mouse.down();await page.mouse.move(...corner,{steps:4});await page.mouse.up();
      }
      const positions=await graph.locator('[data-drag-handle] circle[stroke]').evaluateAll(nodes=>nodes.map(node=>{
        const point=new DOMPoint(Number(node.getAttribute('cx')),Number(node.getAttribute('cy'))).matrixTransform(node.getScreenCTM());
        return [point.x,point.y];
      }));
      near(Math.hypot(positions[0][0]-corner[0],positions[0][1]-corner[1]),0,'first point reaches the corner');
      assert(positions[1][0]<corner[0]&&positions[1][1]>corner[1],'coincident endpoint stays inside the graph');
      assert.deepEqual(await graph.evaluate(svg=>window.TriggleDiagramGuard.audit(svg,{discover:true}).issues.filter(issue=>issue.kind==='boundary')),[],
        'corner drag keeps point labels in view');
    }
    await page.goto(base+'/index.html?class=10&chapter=g10-ch5&section=concepts&concept=5');
    await page.evaluate(percent=>{document.documentElement.style.fontSize=percent+'%';},percent);
    for(const [tab,expected] of ['parallel','perpendicular'].entries()){
      await page.locator('.g10ch4-tab').nth(tab).click();
      const measure=async()=>{
        const [[x1,y1],[x2,y2]]=await renderedVectors(page);
        const cosine=Math.abs(x1*x2+y1*y2)/(Math.hypot(x1,y1)*Math.hypot(x2,y2));
        near(cosine,tab===0?1:0,lang+' '+percent+'% '+expected);
      };
      await measure();
      const handle=page.locator('svg.g10ch4-svg [data-handle="P"] circle[stroke]');
      await handle.scrollIntoViewIfNeeded();
      const box=await handle.boundingBox();
      const x=box.x+box.width/2,y=box.y+box.height/2;
      await page.mouse.move(x,y);await page.mouse.down();
      await page.mouse.move(x-34,y+27,{steps:3});await page.mouse.up();
      await measure();
    }
  }
}

async function run(){
  const srv=await startServer();
  const base='http://127.0.0.1:'+srv.address().port;
  let browser;
  try{
    browser=process.argv.includes('--webkit')?await webkit.launch({headless:true}):await chromium.launch({
      headless:true,
      ...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),
      args:['--no-sandbox']
    });

    if(process.argv.includes('--angles-only')){
      const page=await browser.newPage({viewport:{width:320,height:844},serviceWorkers:'block'});
      await assertRenderedAngles(page,base);
      console.log('PASS rendered Grade 10 concept angles and corner drags in both languages at 100% and 200% text');
      return;
    }

    /* 1. Discovery + Chapter Overview + Index + Keyboard + Deep Links + Practice Connect + Back */
    {
      const ctx=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
      const page=await ctx.newPage();
      const pageErrors=[];page.on('pageerror',err=>pageErrors.push(err.message));

      await page.goto(base+'/index.html?class=10&browse=chapters',{waitUntil:'load'});
      const ch5Meta=await page.locator('.discover-chapter[data-chapter="g10-ch5"] .discover-chapter-meta').innerText();
      assert.match(ch5Meta,/12 Interactive mini-lessons available/i);

      await page.locator('.discover-chapter[data-chapter="g10-ch5"]').click();
      assert.match(await page.locator('.hub-section-card[data-hub-section="concepts"] .hub-section-count').innerText(),/12 available/i);

      await page.locator('.hub-section-card[data-hub-section="concepts"]').click();
      await page.locator('.sp2-index-view .sp2-nav-button').first().waitFor({state:'visible'});
      assert.equal(await page.locator('.sp2-index-view .sp2-nav-button').count(),12);

      await page.locator('.sp2-index-view .sp2-nav-button').nth(4).focus();
      await page.keyboard.press('Enter');
      assert.equal(await page.locator('.sp2-journey').getAttribute('data-view'),'lesson');
      assert.match(await page.locator('.sp2-concept-heading h4').innerText(),/^5\./);

      // Navigate back to Concept 1 and test Connect -> existing practice question + Back
      await page.goto(base+'/index.html?class=10&chapter=g10-ch5&section=concepts&concept=0',{waitUntil:'load'});
      const connectBtn=page.locator('.g10ch4-exercise-row .g10ch2-practice-link').first();
      await connectBtn.scrollIntoViewIfNeeded();
      await connectBtn.click();
      await page.waitForSelector('#lessonCard:not([hidden])');
      assert.match(page.url(),/question=c10-5-5-practice-20/);
      await page.goBack();
      await page.waitForSelector('.g10ch4-studio');
      assert.equal(pageErrors.length,0,'No page errors: '+pageErrors.join('; '));
      await ctx.close();
    }

    /* 2. All 12 concepts across 320px and 390px in EN + TA */
    for(const width of [320,390]){
      const ctx=await browser.newContext({viewport:{width,height:740},serviceWorkers:'block'});
      const page=await ctx.newPage();
      const pageErrors=[];page.on('pageerror',err=>pageErrors.push(err.message));

      for(let i=0;i<12;i++){
        await page.goto(base+'/index.html?class=10&chapter=g10-ch5&section=concepts&concept='+i,{waitUntil:'load'});
        await assertStudioAndLayout(page,`EN ${width}px Concept ${i+1}`);
      }

      await page.locator('#langTa').click();
      await page.waitForSelector('.g10ch4-tamil-badge');
      for(const i of [0,3,6,11]){
        await page.goto(base+'/index.html?class=10&chapter=g10-ch5&section=concepts&concept='+i,{waitUntil:'load'});
        assert(await page.locator('.g10ch4-tamil-badge').isVisible(),'Expected Tamil draft notice');
        await assertStudioAndLayout(page,`TA ${width}px Concept ${i+1}`);
      }

      assert.equal(pageErrors.length,0,`Errors at ${width}px: ${pageErrors.join('; ')}`);
      await ctx.close();
    }

    /* 3. Responsive checks across 360, 412, and 430px */
    for(const width of [360,412,430]){
      const ctx=await browser.newContext({viewport:{width,height:800},serviceWorkers:'block'});
      const page=await ctx.newPage();
      for(const i of [1,4,8,10]){
        await page.goto(base+'/index.html?class=10&chapter=g10-ch5&section=concepts&concept='+i,{waitUntil:'load'});
        await assertStudioAndLayout(page,`EN ${width}px Concept ${i+1}`);
      }
      await ctx.close();
    }

    /* 4. Interactive pointer dragging, tabs, presets, sliders, and Try It Yourself feedback */
    {
      const ctx=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
      const page=await ctx.newPage();

      // Concept 1: Mode tabs + Drag handle A
      await page.goto(base+'/index.html?class=10&chapter=g10-ch5&section=concepts&concept=0',{waitUntil:'load'});
      const before1=await page.locator('.g10ch4-readout').innerText();
      const hA=page.locator('[data-handle="A"]');
      await hA.scrollIntoViewIfNeeded();
      const boxA=await hA.boundingBox();
      await page.mouse.move(boxA.x+boxA.width/2,boxA.y+boxA.height/2);
      await page.mouse.down();
      await page.mouse.move(boxA.x+boxA.width/2+35,boxA.y+boxA.height/2-20,{steps:6});
      await page.mouse.up();
      assert.notEqual(await page.locator('.g10ch4-readout').innerText(),before1,'Dragging A updates distance/midpoint');
      await page.locator('.g10ch4-tab').nth(2).click();
      assert.match((await page.locator('.g10ch4-readout').innerText()).replace(/[\s\u200b]+/g,''),/G=/);

      // Concept 3: Collinearity preset snaps Area to 0
      await page.goto(base+'/index.html?class=10&chapter=g10-ch5&section=concepts&concept=2',{waitUntil:'load'});
      await page.locator('.g10ch4-chip-btn').first().click();
      assert.match((await page.locator('.g10ch4-readout').innerText()).replace(/[\s\u200b]+/g,' '),/Collinear/);

      // Concept 5: Inclination preset θ = 90° -> Undefined
      await page.goto(base+'/index.html?class=10&chapter=g10-ch5&section=concepts&concept=4',{waitUntil:'load'});
      await page.locator('.g10ch4-chip-btn').nth(2).click();
      assert.match((await page.locator('.g10ch4-readout').innerText()).replace(/[\s\u200b]+/g,' '),/Undefined/);

      // Concept 12: General form Try It Yourself -> Hint, wrong feedback, then right + Why?
      await page.goto(base+'/index.html?class=10&chapter=g10-ch5&section=concepts&concept=11',{waitUntil:'load'});
      const whyBtn=page.locator('[data-why]');
      assert.equal(await whyBtn.isDisabled(),true);
      await page.locator('[data-hint]').click();
      assert((await page.locator('[data-feedback]').innerText()).length>10);
      await page.locator('.sp2-answers button').nth(0).click();
      assert.match(await page.locator('[data-feedback]').innerText(),/Try again/);
      assert.equal(await whyBtn.isDisabled(),false);
      await page.locator('.sp2-answers button').nth(2).click();
      assert.match(await page.locator('[data-feedback]').innerText(),/Correct/);
      await whyBtn.click();
      assert.equal(await page.locator('[data-why-response]').isHidden(),false);
      await ctx.close();
    }

    /* 5. Angles measured in actual rendered SVG after presets and drags */
    {
      const ctx=await browser.newContext({viewport:{width:320,height:844},serviceWorkers:'block'});
      await assertRenderedAngles(await ctx.newPage(),base);
      await ctx.close();
    }

    /* 6. Real Service Worker offline reload */
    {
      const ctx=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'allow'});
      const page=await ctx.newPage();
      await page.goto(base+'/index.html?class=10&chapter=g10-ch5&section=concepts&concept=1',{waitUntil:'load'});
      await page.evaluate(async()=>{
        if(!navigator.serviceWorker)return;
        await navigator.serviceWorker.ready;
      });
      await ctx.setOffline(true);
      await page.reload({waitUntil:'load'});
      await page.waitForSelector('.g10ch4-studio');
      assert.match(await page.locator('.sp2-concept-heading h4').innerText(),/^2\./);
      await ctx.setOffline(false);
      await ctx.close();
    }

    console.log('PASS Grade 10 Chapter 5 Concepts Browser Suite: 12 interactive 6-part labs, equal grid scales and rendered angles, pointer drag, 320/360/390/412/430px, EN/TA, keyboard nav, KaTeX & offline SW');
  }finally{
    if(browser)await browser.close();
    srv.close();
  }
}
run().catch(err=>{console.error(err);process.exit(1);});
