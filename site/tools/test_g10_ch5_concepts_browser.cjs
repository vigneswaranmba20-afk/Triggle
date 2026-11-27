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
  await page.evaluate(async()=>{await document.fonts.ready;await new Promise(requestAnimationFrame);});
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
        const positions=new Set(Array.from(lines,line=>new DOMPoint(Number(line.getAttribute('x1')),
          Number(line.getAttribute('y1'))).matrixTransform(line.getScreenCTM())[axis]));
        const [a,b]=Array.from(positions).sort((x,y)=>x-y);
        return b-a;
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

async function assertRenderedPreviews(page,base) {
  for(const lang of ['en','ta'])for(const percent of [100,200])for(const index of [4,5,9,11]){
    await page.goto(base+'/index.html?class=10&chapter=g10-ch5&section=concepts&concept='+index);
    if(await page.locator('html').getAttribute('lang')!==lang)await page.locator(lang==='ta'?'#langTa':'#langEn').evaluate(button=>button.click());
    await page.evaluate(percent=>{document.documentElement.style.fontSize=percent+'%';},percent);
    const deviations=await page.locator('svg.g10ch4-glance-svg').evaluate((svg,index)=>{
      const project=(node,x,y)=>new DOMPoint(x,y).matrixTransform(node.getScreenCTM());
      const select=name=>svg.querySelector(`[data-dg-preview-line="${name}"]`);
      const linePoints=node=>[1,2].map(i=>project(node,node['x'+i].baseVal.value,node['y'+i].baseVal.value));
      const vector=(s,t)=>[t.x-s.x,t.y-s.y];
      const distance=(p,line)=>{
        const [s,t]=linePoints(line), [dx,dy]=vector(s,t);
        return Math.abs((p.x-s.x)*dy-(p.y-s.y)*dx)/Math.hypot(dx,dy);
      };
      const axis=name=>svg.querySelector(`[data-dg-grid-axis="${name}"][stroke="#6E7781"]`);
      if(index===5||index===11){
        const [a,b]=vector(...linePoints(select('reference')));
        const [c,d]=vector(...linePoints(select('perpendicular')));
        return [Math.abs(a*c+b*d)/(Math.hypot(a,b)*Math.hypot(c,d))];
      }
      if(index===9)return ['x','y'].flatMap(name=>{
        const node=svg.querySelector(`[data-dg-preview-intercept="${name}"]`);
        const point=project(node,node.cx.baseVal.value,node.cy.baseVal.value);
        return [distance(point,select('intercept')),distance(point,axis(name==='x'?'y':'x'))];
      });
      const arc=svg.querySelector('[data-dg-inclination-arc]');
      const start=arc.getPointAtLength(0),end=arc.getPointAtLength(arc.getTotalLength());
      return [distance(project(arc,start.x,start.y),axis('y')),distance(project(arc,end.x,end.y),select('inclination'))];
    },index);
    assert(deviations.every(value=>value<.001),`${lang} ${percent}% preview ${index} geometry deviations: ${deviations}`);
  }
}

async function openCoordinateConcept(page,base,index,lang,percent) {
  await page.goto(base+'/index.html?class=10&chapter=g10-ch5&section=concepts&concept='+index);
  if(await page.locator('html').getAttribute('lang')!==lang)await page.locator(lang==='ta'?'#langTa':'#langEn').evaluate(button=>button.click());
  await page.waitForFunction(lang=>document.documentElement.lang===lang,lang);
  await page.evaluate(percent=>{document.documentElement.style.fontSize=percent+'%';},percent);
}

async function assertInteractiveEdges(page,base) {
  const graph=page.locator('svg.g10ch4-svg');
  const readout=page.locator('.g10ch4-readout');
  async function point(id){
    const box=await graph.locator(`[data-handle="${id}"] circle[stroke]`).boundingBox();
    return [box.x+box.width/2,box.y+box.height/2];
  }
  async function drag(id,target){
    await page.mouse.move(...await point(id));await page.mouse.down();
    await page.mouse.move(...target,{steps:5});await page.mouse.up();
  }
  async function slide(index,value){
    return page.locator('.g10ch4-slider').nth(index).evaluate((input,value)=>{
      input.value=String(value);input.dispatchEvent(new Event('input',{bubbles:true}));return Number(input.value);
    },value);
  }
  for(const lang of ['en','ta'])for(const percent of [100,200]){
    const context=`${lang} at ${percent}%`;
    await openCoordinateConcept(page,base,3,lang,percent);
    await graph.scrollIntoViewIfNeeded();
    assert.equal(await graph.locator('[data-dg-area-diagonal]').getAttribute('data-dg-area-diagonal'),'AC');
    const a=await point('A'),c=await point('C'),unit=(c[0]-a[0])/5;
    await drag('B',[a[0]+2*unit,a[1]-3*unit]); // B = (−1, 1) inside triangle ACD
    assert.equal(await graph.locator('[data-dg-area-diagonal]').getAttribute('data-dg-area-diagonal'),'BD',context+' concave diagonal');
    assert.match((await readout.locator('.katex-html').innerText()).replace(/[\s\u200b]+/g,''),/=5=5sq/,context+' both concave area calculations equal five');
    await drag('B',a);
    assert.equal(await graph.locator('[data-dg-area-diagonal]').count(),0,context+' repeated vertex');
    await page.locator('.g10ch4-tab').nth(1).click();
    assert.equal(await graph.locator('[data-dg-area-diagonal]').count(),0,context+' crossed polygon');

    await openCoordinateConcept(page,base,5,lang,percent);
    await page.locator('.g10ch4-tab').first().click();
    await graph.scrollIntoViewIfNeeded();
    const verticalPoint=await graph.evaluate(svg=>{
      const axis=svg.querySelector('[data-dg-grid-axis="x"][stroke="#6E7781"]');
      const y=axis.y1.baseVal.value+(axis.y2.baseVal.value-axis.y1.baseVal.value)/4;
      const point=new DOMPoint(axis.x1.baseVal.value,y).matrixTransform(axis.getScreenCTM());return [point.x,point.y];
    });
    await drag('P',verticalPoint);
    const lines=await graph.locator('[data-dg-slope-line]').evaluateAll(nodes=>nodes.map(line=>[line.x1.baseVal.value,line.x2.baseVal.value]));
    assert(lines.length===2&&lines.every(([x,y])=>x===y)&&lines[0][0]!==lines[1][0],context+' distinct parallel vertical lines');

    await openCoordinateConcept(page,base,7,lang,percent);
    for(const m of [-2,2])for(const c of [-3,3]){
      await slide(0,m);await slide(1,c);
      const test=await graph.evaluate(svg=>{
        const [run,rise]=svg.querySelectorAll('line[stroke-dasharray="3 2"]');
        const tip=rise.y2.baseVal.value;
        return {inside:tip>=0&&tip<=svg.viewBox.baseVal.height,
          slope:(rise.y1.baseVal.value-tip)/(run.x2.baseVal.value-run.x1.baseVal.value)};
      });
      assert(test.inside&&test.slope===m,context+' full auxiliary slope triangle');
    }

    await openCoordinateConcept(page,base,8,lang,percent);
    assert.equal(await page.locator('.g10ch4-slider').inputValue(),'0.75',context+' exact initial slope');

    await openCoordinateConcept(page,base,10,lang,percent);
    assert.equal(await slide(0,0),0);
    assert.equal(await slide(1,0),3,context+' last valid coefficient retained');
    await slide(0,2);await slide(1,0);
    assert.equal(await slide(0,0),2,context+' symmetric coefficient constraint');

    await openCoordinateConcept(page,base,11,lang,percent);
    await page.locator('.g10ch4-tab').first().click();
    await slide(0,2);
    assert.match(await readout.innerText(),lang==='ta'?/இரு கோடுகளும் ஒன்றே/:/The two lines coincide/);
    await slide(0,3);
    assert.match(await readout.innerText(),/∥/,context+' distinct parallel family');
  }
}

async function assertCoordinateLabels(page,percent,description,ids=['A','B'],preview=false) {
  const selector=preview?'svg.g10ch4-glance-svg':'svg.g10ch4-svg';
  const graph=page.locator(selector);
  await page.waitForFunction(({selector,id,expected})=>{
    const label=document.querySelector(`${selector} [data-dg-label="${id}"]`);
    if(!label)return false;
    const matrix=label.getScreenCTM();
    return Math.abs(parseFloat(getComputedStyle(label).fontSize)*Math.hypot(matrix.c,matrix.d)-expected)<.1;
  },{selector,id:ids[0]||'X',expected:15*percent/100});
  const result=await graph.evaluate(svg=>{
    const audit=window.TriggleDiagramGuard.audit(svg,{discover:true});
    const key=svg.parentElement.querySelector('.diagramguard-coordinate-key');
    const scale=svg.parentElement.querySelector('.diagramguard-coordinate-scale');
    return {labels:audit.labels,issues:audit.issues,scaleFont:scale?parseFloat(getComputedStyle(scale).fontSize):null,
      keyFont:key?parseFloat(getComputedStyle(key).fontSize):null,entries:key?.querySelectorAll('[role="listitem"]').length||0,
      overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth};
  });
  assert.deepEqual(result.issues,[],description+' has clear diagram labels');
  for(const id of [...ids,'X','Y'])assert(result.labels.some(label=>label.id===id),description+' includes '+id);
  for(const {fontPx} of result.labels)assert(Math.abs(fontPx-15*percent/100)<.1,description+' displayed SVG font');
  if(ids.length)assert(Math.abs(result.keyFont-14*percent/100)<.1,description+' coordinate key font');
  if(!preview)assert(Math.abs(result.scaleFont-14*percent/100)<.1,description+' grid scale font');
  assert.equal(result.entries,ids.length,description+' coordinate entries');
  assert(result.overflow<=1,description+' reflows');
}

async function inclinationCorner(svg) {
  await svg.scrollIntoViewIfNeeded();
  return svg.evaluate(svg=>{
    const frame=svg.querySelector('[data-dg-obstacle="plot-frame"]');
    const point=new DOMPoint(frame.x.baseVal.value+frame.width.baseVal.value,frame.y.baseVal.value).matrixTransform(frame.getScreenCTM());
    return [point.x,point.y];
  });
}

const graphViewports=[[320,844],[360,800],[375,812],[390,844],[412,915],[430,932],[768,1024],[1280,900],[844,390]];

async function assertInclinationLabelMatrix(page,base) {
  const graph=page.locator('svg.g10ch4-svg');
  let cases=0;
  for(const [width,height] of graphViewports)
  for(const lang of ['en','ta'])for(const percent of [100,200]){
    const context=`${lang} ${width}×${height} ${percent}%`;
    await page.setViewportSize({width,height});
    await openCoordinateConcept(page,base,4,lang,percent);
    await assertCoordinateLabels(page,percent,context+' initial');cases++;
    for(const control of await page.locator('.g10ch4-chip-btn').all()){
      await control.click();
      await assertCoordinateLabels(page,percent,context+' '+await control.textContent());cases++;
    }
    const corner=await inclinationCorner(graph);
    for(const id of ['A','B']){
      const box=await graph.locator(`[data-handle="${id}"] circle[stroke]`).boundingBox();
      const start=[box.x+box.width/2,box.y+box.height/2];
      await page.mouse.move(...start);await page.mouse.down();
      for(let step=1;step<=4;step++){
        await page.mouse.move(...start.map((value,index)=>value+(corner[index]-value)*step/4));
        await assertCoordinateLabels(page,percent,`${context} drag ${id} step ${step}`);cases++;
      }
      await page.mouse.up();
    }
  }
  const key=page.locator('.diagramguard-coordinate-key');
  const coordinates=await key.innerText();
  await page.setViewportSize({width:320,height:844});
  await assertCoordinateLabels(page,200,'Tamil landscape-to-portrait resize');cases++;
  assert.equal(await key.innerText(),coordinates,'resize retains dragged coordinates');
  console.log(`PASS ${cases} bilingual inclination label states, including intermediate pointer drags`);
}

async function assertCoordinateLabelMatrix(page,base) {
  const graph=page.locator('svg.g10ch4-svg');
  const controls=page.locator('.g10ch4-tab');
  const slider=page.locator('.g10ch4-slider');
  const key=page.locator('.diagramguard-coordinate-key [role="listitem"]');
  const slide=async value=>slider.evaluate((input,value)=>{
    input.value=String(value);input.dispatchEvent(new Event('input',{bubbles:true}));
  },value);
  const number=n=>String(n).replace('-','−');
  let cases=0;
  for(const [width,height] of graphViewports)for(const lang of ['en','ta'])for(const percent of [100,200]){
    await page.setViewportSize({width,height});
    const profile=`${lang} ${width}×${height} ${percent}%`;
    await openCoordinateConcept(page,base,6,lang,percent);
    for(const axis of [0,1]){
      await controls.nth(axis).click();
      for(const offset of [-3,-2,-1,0,1,2,3]){
        await slide(offset);
        await assertCoordinateLabels(page,percent,`${profile} axis ${axis} offset ${offset}`,['P','Q','R']);cases++;
        assert.deepEqual(await key.allTextContents(),(axis===0?[-3,0,3]:[-2,0,2]).map((vary,index)=>
          `${'PQR'[index]} (${number(axis===0?vary:offset)}, ${number(axis===0?offset:vary)})`));
      }
    }
    await openCoordinateConcept(page,base,8,lang,percent);
    for(const slope of [-2,-.75,0,.75,2]){
      await slide(slope);
      await assertCoordinateLabels(page,percent,`${profile} single-point slope ${slope}`,['A']);cases++;
    }
    await controls.nth(1).click();
    await assertCoordinateLabels(page,percent,profile+' two-point initial');cases++;
    const corner=await inclinationCorner(graph);
    for(const id of ['A','B']){
      const {x,y,width,height}=await graph.locator(`[data-handle="${id}"] circle[stroke]`).boundingBox();
      const start=[x+width/2,y+height/2];
      await page.mouse.move(...start);await page.mouse.down();
      for(let step=1;step<=4;step++){
        await page.mouse.move(...start.map((value,index)=>value+(corner[index]-value)*step/4));
        await assertCoordinateLabels(page,percent,`${profile} two-point drag ${id} step ${step}`);cases++;
      }
      await page.mouse.up();
    }
    await openCoordinateConcept(page,base,9,lang,percent);
    await assertCoordinateLabels(page,percent,profile+' initial intercepts');cases++;
    await graph.scrollIntoViewIfNeeded();
    const edge=await graph.locator('[data-dg-obstacle="plot-frame"]').boundingBox();
    const center=[edge.x+edge.width/2,edge.y+edge.height/2];
    for(const [index,id] of ['a','b'].entries()){
      const box=await graph.locator(`[data-handle="${id}"] circle[stroke]`).boundingBox();
      const target=[...center];
      target[index]=index===0?edge.x:edge.y+edge.height;
      await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();
      const distance=target[index]-center[index];
      for(const factor of [-1,-.2,.2,1]){
        const sample=[...center];sample[index]=center[index]+factor*distance;
        await page.mouse.move(...sample);
        await assertCoordinateLabels(page,percent,`${profile} ${id} intercept ${factor}`);cases++;
      }
      await page.mouse.up();
    }
  }
  console.log(`PASS ${cases} bilingual parallel-axis, point–slope and intercept label states`);
}

async function assertAreaLabelMatrix(page,base) {
  const graph=page.locator('svg.g10ch4-svg');
  const tabs=page.locator('.g10ch4-tab');
  const presets=page.locator('.g10ch4-chip-btn');
  let cases=0;
  for(const [width,height] of graphViewports)for(const lang of ['en','ta'])for(const percent of [100,200]){
    await page.setViewportSize({width,height});
    const profile=`${lang} ${width}×${height} ${percent}%`;
    await openCoordinateConcept(page,base,0,lang,percent);
    for(const [index,points] of [['A','B','M'],['A','B','P'],['A','B','C','G']].entries()){
      await tabs.nth(index).click();
      for(const preset of await presets.all()){
        await preset.click();
        await assertCoordinateLabels(page,percent,`${profile} distance mode ${index} ${await preset.textContent()}`,points);cases++;
      }
      if(index===1){
        for(const ratio of [1,2,3,4]){
          await page.locator('.g10ch4-slider').evaluate((slider,value)=>{
            slider.value=String(value);slider.dispatchEvent(new Event('input',{bubbles:true}));
          },ratio);
          await assertCoordinateLabels(page,percent,`${profile} ratio ${ratio}:2`,points);cases++;
        }
      }
    }
    await openCoordinateConcept(page,base,1,lang,percent);
    for(const mode of [0,1]){
      await tabs.nth(mode).click();
      for(const preset of await presets.all()){
        await preset.click();
        await assertCoordinateLabels(page,percent,`${profile} triangle mode ${mode} ${await preset.textContent()}`,['A','B','C']);cases++;
      }
    }
    const corner=await inclinationCorner(graph);
    for(const id of ['A','C']){
      const box=await graph.locator(`[data-handle="${id}"] circle[stroke]`).boundingBox();
      const start=[box.x+box.width/2,box.y+box.height/2];
      await page.mouse.move(...start);await page.mouse.down();
      for(let step=1;step<=3;step++){
        await page.mouse.move(...start.map((value,index)=>value+(corner[index]-value)*step/3));
        await assertCoordinateLabels(page,percent,`${profile} triangle drag ${id} step ${step}`,['A','B','C']);cases++;
      }
      await page.mouse.up();
    }
  }
  console.log(`PASS ${cases} bilingual centroid, section, midpoint and area label states`);
}

async function assertCatalogLabels(page,base) {
  const plot=page.locator('svg.g10ch4-svg');
  const tabs=page.locator('.g10ch4-tab');
  const presets=page.locator('.g10ch4-chip-btn');
  const labels=[['A','B','M'],['A','B','C'],['A','B','C'],['A','B','C','D'],['A','B'],['P'],['P','Q','R'],['P'],['A'],['A','B'],[],[]];
  async function slider(index,value){
    await page.locator('.g10ch4-slider').nth(index).evaluate((input,value)=>{
      input.value=String(value);input.dispatchEvent(new Event('input',{bubbles:true}));
    },value);
  }
  async function dragFromTo(id,world){
    await plot.scrollIntoViewIfNeeded();
    const box=await plot.locator(`[data-handle="${id}"] circle[stroke]`).boundingBox();
    const frame=await plot.locator('[data-dg-obstacle="plot-frame"]').boundingBox();
    const start=[box.x+box.width/2,box.y+box.height/2];
    const target=[frame.x+frame.width*(world[0]+5)/10,frame.y+frame.height*(4-world[1])/8];
    await page.mouse.move(...start);await page.mouse.down();await page.mouse.move(...target,{steps:4});await page.mouse.up();
  }
  let checks=0;
  for(const [width,height] of graphViewports)for(const lang of ['en','ta'])for(const percent of [100,200]){
    await page.setViewportSize({width,height});
    for(const [index,ids] of labels.entries()){
      await openCoordinateConcept(page,base,index,lang,percent);
      const profile=`${lang} ${width}×${height} ${percent}% concept ${index+1}`;
      const audit=async(state)=>{await assertCoordinateLabels(page,percent,profile+' '+state,ids);checks++;};
      await assertCoordinateLabels(page,percent,profile+' preview',[],true);checks++;
      await audit('initial');
      if(index===2){
        for(const control of await presets.all()){await control.click();await audit(await control.textContent());}
        await dragFromTo('B',[0,0]);await audit('collinear drag');
      }else if(index===3){
        await dragFromTo('B',[-1,1]);await audit('concave drag');
        await dragFromTo('B',[-3,-2]);await audit('repeated vertex');
        await tabs.nth(1).click();await audit('crossed boundary');
      }else if(index===5){
        for(const mode of [0,1]){
          await tabs.nth(mode).click();await audit('relation '+mode);
          for(const target of [[0,2],[3,0],[5,4]]){
            await dragFromTo('P',target);await audit('drag P '+target);
          }
        }
      }else if(index===7){
        for(const m of [-2,0,2])for(const c of [-3,0,3]){
          await slider(0,m);await slider(1,c);await audit(`m ${m} c ${c}`);
        }
      }else if(index===10){
        for(const [a,b,c] of [[0,3,-6],[2,0,0],[-4,4,-8],[4,-4,8],[1,0,-8],[-2,1,0]]){
          await slider(0,a);await slider(1,b);await slider(2,c);await audit(`coefficients ${a}, ${b}, ${c}`);
        }
      }else if(index===11){
        for(const mode of [0,1]){
          await tabs.nth(mode).click();
          for(const k of [-10,0,2,10]){await slider(0,k);await audit(`relation ${mode} k ${k}`);}
        }
      }
    }
  }
  console.log(`PASS ${checks} bilingual Grade 10 coordinate preview and interactive label checks`);
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
      await assertCoordinateLabels(page,percent,`${lang} ${percent}% ${angle}°`);
    }
    if(lang==='en'&&percent===100){
      const graph=page.locator('svg.g10ch4-svg');
      const corner=await inclinationCorner(graph);
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

    if(process.argv.includes('--label-matrix')){
      const page=await browser.newPage({serviceWorkers:'block'});
      await assertInclinationLabelMatrix(page,base);
      return;
    }

    if(process.argv.includes('--catalog-label-matrix')){
      const page=await browser.newPage({serviceWorkers:'block'});
      await assertCatalogLabels(page,base);
      return;
    }

    if(process.argv.includes('--coordinate-label-matrix')||process.argv.includes('--area-label-matrix')){
      const page=await browser.newPage({serviceWorkers:'block'});
      const check=process.argv.includes('--area-label-matrix')?assertAreaLabelMatrix:assertCoordinateLabelMatrix;
      await check(page,base);
      return;
    }

    if(process.argv.includes('--angles-only')){
      const page=await browser.newPage({viewport:{width:320,height:844},serviceWorkers:'block'});
      await assertRenderedAngles(page,base);
      await assertRenderedPreviews(page,base);
      await assertInteractiveEdges(page,base);
      console.log('PASS rendered Grade 10 concept angles, previews and interaction edges in both languages at 100% and 200% text');
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
      const page=await ctx.newPage();
      await assertRenderedAngles(page,base);
      await assertRenderedPreviews(page,base);
      await assertInteractiveEdges(page,base);
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
