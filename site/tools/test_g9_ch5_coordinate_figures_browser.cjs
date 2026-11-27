'use strict';
const assert = require('node:assert/strict');
const { chromium, webkit } = require('playwright');
const { server, launchOptions } = require('./dashboard_test_support.cjs');

// Standalone expectations from both 2025 SCERT source books.
const quadrants = {P:[-7,6], Q:[7,-2], R:[-6,-7], S:[3,5], T:[3,9]};
const projections = {P:[-4,4], Q:[3,3], R:[4,-2], S:[-5,-3]};
const printed = {A:[-3,3], B:[2,3], C:[-6,-1], D:[5,-1]};
const fixtures = [
  [1,[{points:quadrants}]],
  [2,[{points:projections}]],
  [3,[{points:{A:[-5,3], B:[-1,3], C:[0,3], D:[5,3]}, edges:['AD']},
       {points:{E:[0,-4], F:[0,-2], G:[0,4], H:[0,5]}, edges:['EH']}]],
  [4,[{points:{P:[0,0], Q:[-4,0], R:[-4,-4], S:[0,-4]}, edges:['PQ','QR','RS','SP'], region:'PQRS'},
       {points:printed, edges:['AB','BC','CD','DA']},
       {points:printed, edges:['AB','BD','DC','CA'], region:'ABDC'}]],
  ['5.2-q3',[
    {points:{A:[5,4],B:[2,0],C:[-2,3]},region:'ABC',squares:{AB:25,BC:25,CA:50}},
    {points:{A:[6,-4],B:[-2,-4],C:[2,10]},region:'ABC',squares:{AB:64,BC:212,CA:212}}
  ],true],
  ['5.2-q5',[
    {points:{A:[-3,1],B:[-6,-7],C:[3,-9],D:[6,-1]},region:'ABCD',squares:{AB:73,BC:85,CD:73,DA:85}},
    {points:{A:[-7,-3],B:[5,10],C:[15,8],D:[3,-5]},region:'ABCD',squares:{AB:313,BC:104,CD:313,DA:104}}
  ],true],
  ['5.2-q6',[
    {points:{A:[3,-2],B:[7,6],C:[-1,2],D:[-5,-6]},region:'ABCD',dashed:['AC','BD'],
      squares:{AB:80,BC:80,CD:80,DA:80,AC:32,BD:288}},
    {points:{A:[1,1],B:[2,1],C:[2,2],D:[1,2]},region:'ABCD',dashed:['AC','BD'],
      squares:{AB:1,BC:1,CD:1,DA:1,AC:2,BD:2}}
  ],true],
  ['5.2-q11',[{points:{C:[11,2],P:[1,2],Q:[3,-4],R:[5,-6]},dashed:['CP','CQ','CR'],
    circle:[11,2,10],onCircle:'PQR',squares:{CP:100,CQ:100,CR:100}}],true],
  ['5.3-q5',[{points:{O:[0,0],A:[8,6],B:[10,0],D:[9,3],M:[4.5,1.5]},edges:['AB'],dashed:['OD'],
    circle:[0,0,10],onCircle:'AB',rightAngle:'ADO',midpoints:{D:'AB',M:'OD'}}]],
  ['5.5-q5',[{points:{A:[-3,5],M:[1.5,3.5],B:[3,3],C:[6,2]},edges:['AC'],
    circle:[1.5,3.5,Math.sqrt(22.5)],onCircle:'AC',midpoints:{M:'AC'},squares:{AB:40,BC:10,AC:90}}]],
  ['5.6-q3',[{points:{O:[0,0],A:[3,-4],B:[3,4],C:[0,4]},region:'OABC',squares:{OA:25,AB:64,BC:9,CO:16}}]],
  ['5.6-q4',[{points:{P:[-1,1],Q:[3,-4],R:[1,-1],S:[-2,-3],T:[-4,4]},quadrants:true}],true]
];
const allWidths = [[320,844],[360,844],[375,844],[390,844],[412,844],[430,844],[768,1024],[1280,900],[667,375]];
const viewports = process.env.TRIGGLE_G9_COORDINATE_SMOKE ? [[320,844],[390,844]] : allWidths;
const route = question => '/index.html?class=9&chapter=g9-ch5&question=g9-ch5-ex'+
  (typeof question==='number'?'5.1-q'+question:question);
const hypot = (a,b) => Math.hypot(a[0]-b[0],a[1]-b[1]);
const subtract = (a,b) => a.map((value,index)=>value-b[index]);
const dot = (a,b) => a.reduce((sum,value,index)=>sum+value*b[index],0);
const near = (actual,expected,context) => assert(Math.abs(actual-expected)<1e-4,`${context} ${actual} ≠ ${expected}`);

async function settle(page,percent) {
  await page.evaluate(async percent=>{
    document.documentElement.style.fontSize=percent+'%';
    await document.fonts.ready;
    for(let i=0;i<3;i++)await new Promise(requestAnimationFrame);
  },percent);
}

async function verify(figure, question, panels, lang, percent, context) {
  const svg = figure.locator('svg.diagramguard-coordinate[data-dg-ready]');
  await svg.nth(panels.length-1).waitFor();
  const measured = await svg.evaluateAll(list=>list.map(svg=>{
    const values = (el,names)=>names.map(name=>Number(el.getAttribute(name)));
    const lines = selector=>Object.fromEntries([...svg.querySelectorAll(selector)].map(el=>[
      el.dataset.dgObstacle,values(el,['x1','y1','x2','y2'])
    ]));
    const bounds = svg.getBoundingClientRect();
    const circle = svg.querySelector('[data-dg-circle]');
    const angle = svg.querySelector('[data-dg-obstacle="right-angle"]');
    return {
      audit:window.TriggleDiagramGuard.audit(svg,{discover:true}),
      points:Object.fromEntries([...svg.querySelectorAll('circle[data-dg-point]')].map(el=>[el.dataset.dgPoint,values(el,['cx','cy'])])),
      edges:lines('[data-dg-edge]'),
      dashed:[...svg.querySelectorAll('[data-dg-edge][stroke-dasharray]')].map(el=>el.dataset.dgEdge),
      circle:circle?values(circle,['cx','cy','r']):null,
      angle:angle?angle.getAttribute('points').split(' ').map(point=>point.split(',').map(Number)):null,
      xAxis:values(svg.querySelector('[data-dg-obstacle="X-axis"]'),['x1','y1','x2','y2']),
      yAxis:values(svg.querySelector('[data-dg-obstacle="Y-axis"]'),['x1','y1','x2','y2']),
      guides:lines('line[data-dg-obstacle$="-guide"]'),
      ticks:lines('line[data-dg-obstacle*="-tick-"]'),
      arrows:[...svg.querySelectorAll('polyline[data-dg-obstacle$="-arrow"]')].map(el=>el.dataset.dgObstacle),
      regions:[...svg.querySelectorAll('[data-dg-region]')].map(el=>el.dataset.dgRegion),
      labelPositions:Object.fromEntries([...svg.querySelectorAll('text')].map(el=>[el.dataset.dgLabel,values(el,['x','y'])])),
      description:svg.getAttribute('aria-label'),
      font:getComputedStyle(svg).fontFamily,
      bounds:[bounds.left,bounds.top,bounds.right,bounds.bottom],
      viewBox:[svg.viewBox.baseVal.width,svg.viewBox.baseVal.height],
      aspect:[bounds.width/svg.viewBox.baseVal.width,bounds.height/svg.viewBox.baseVal.height],
      overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth
    };
  }));
  assert.equal(measured.length,panels.length,context);
  for (const [index,expected] of panels.entries()) {
    const panel = measured[index];
    const tag = context+' panel '+(index+1);
    assert(panel.audit.measured,tag);
    if (panel.audit.issues.length) {
      const ids=new Set(panel.audit.issues.flatMap(({label,with:withId})=>[label,withId]));
      const labels=panel.audit.labels.filter(({id})=>ids.has(id));
      assert.fail(tag+' intersections '+JSON.stringify({font:panel.font,bounds:panel.bounds,labels,issues:panel.audit.issues}));
    }
    assert.deepEqual(panel.audit.unmeasured,[],tag+' unmeasured obstacles');
    assert(panel.overflow<=1 && Math.abs(panel.aspect[0]-panel.aspect[1])<.005,tag+' reflow');
    if (panels.length===1) assert(panel.description.length>15&&(lang==='en'||/[\u0B80-\u0BFF]/.test(panel.description)),tag+' localized image');
    const [[a,first],[b,second]]=Object.entries(expected.points);
    const scale=hypot(panel.points[a],panel.points[b])/hypot(first,second);
    const origin=[panel.yAxis[0],panel.xAxis[1]];
    const project=([x,y])=>[origin[0]+x*scale,origin[1]-y*scale];
    for (const [id,source] of Object.entries(expected.points))
      near(hypot(panel.points[id],project(source)),0,tag+' point '+id);
    if(typeof question==='string'){
      const points=Object.entries(panel.points);
      for(const [id,point] of points){
        const label=panel.labelPositions[id];
        assert(label,tag+' point '+id+' has a visible label');
        const distance=hypot(label,point);
        const nearest=Math.min(...points.filter(([other])=>other!==id).map(([,other])=>hypot(label,other)));
        const location=JSON.stringify({id,point,label,font:panel.font,labels:panel.audit.labels});
        assert(distance<=30*percent/100+1,tag+' point label too far '+location);
        assert(distance<=nearest+3*percent/100,tag+' point label closer to a different vertex '+location);
      }
    }
    const outline=expected.region?[...expected.region].map((v,i)=>v+expected.region[(i+1)%expected.region.length]):[];
    for (const id of new Set([...outline,...(expected.edges||[]),...(expected.dashed||[])])) {
      const [x,y,u,v]=panel.edges[id];
      near(hypot([x,y],panel.points[id[0]]),0,tag+' '+id+' start');
      near(hypot([u,v],panel.points[id[1]]),0,tag+' '+id+' end');
    }
    assert.deepEqual(panel.dashed.sort(),(expected.dashed||[]).slice().sort(),tag+' dashed constructions');
    assert.deepEqual(panel.regions,expected.region?[expected.region]:[],tag+' regions');
    for(const [id,squared] of Object.entries(expected.squares||{}))
      near((hypot(panel.points[id[0]],panel.points[id[1]])/scale)**2,squared,tag+' length squared '+id);
    for(const [id,[a,b]] of Object.entries(expected.midpoints||{}))
      panel.points[id].forEach((value,index)=>near(2*value,panel.points[a][index]+panel.points[b][index],tag+' midpoint '+id));
    if (expected.circle) {
      const [cx,cy,radius]=expected.circle;
      const [x,y,r]=panel.circle;
      near(hypot([x,y],project([cx,cy])),0,tag+' centre');
      near(r/scale,radius,tag+' radius');
      assert(x-r>=0&&y-r>=0&&x+r<=panel.viewBox[0]&&y+r<=panel.viewBox[1],tag+' entire circumference fits');
      for(const id of expected.onCircle)near(hypot(panel.points[id],[x,y]),r,tag+' on circumference '+id);
    }
    if (expected.rightAngle) {
      const [a,vertex,b]=[...expected.rightAngle].map(id=>panel.points[id]);
      const [first,corner,last]=panel.angle;
      near(dot(subtract(a,vertex),subtract(b,vertex)),0,tag+' perpendicular lines');
      near(dot(subtract(first,corner),subtract(last,corner)),0,tag+' right-angle mark');
      near(dot(subtract(first,vertex),subtract(b,vertex)),0,tag+' first mark meets its line');
      near(dot(subtract(last,vertex),subtract(a,vertex)),0,tag+' last mark meets its line');
    }
    for (const {id,fontPx} of panel.audit.labels) {
      const target=(id.includes('-tick-')?14:15)*percent/100;
      assert(Math.abs(fontPx-target)<.2,tag+' '+id+' font');
    }
    if (question==='5.2-q11') {
      assert.deepEqual(panel.arrows,['X-arrow','X′-arrow','Y-arrow','Y′-arrow'],tag+' arrowheads in both directions');
      const axisLabels=Object.keys(panel.labelPositions).filter(id=>/^[XY]′?$/.test(id));
      assert.deepEqual(axisLabels,['X','Y'],tag+' one label per axis');
    }
    if (question===1||expected.quadrants) {
      for (const [id,[x,y]] of Object.entries({I:[1,-1],II:[-1,-1],III:[-1,1],IV:[1,1]})) {
        const [px,py]=panel.labelPositions[id];
        assert.equal(Math.sign(px-origin[0]),x,tag+' '+id+' x');
        assert.equal(Math.sign(py-origin[1]),y,tag+' '+id+' y');
      }
    }
    if (question===2) {
      assert.equal(Object.keys(panel.ticks).length,16,tag+' all unit tick marks');
      for (const [id,[x,y,u,v]] of Object.entries(panel.ticks)) {
        const axis=id[0], value=Number(id.slice(7));
        near(hypot([(x+u)/2,(y+v)/2],project(axis==='x'?[value,0]:[0,value])),0,tag+' unit tick '+id);
      }
      for (const [id,[x,y]] of Object.entries(expected.points)) {
        const [[px,py],[xx,xy],[yx,yy]]=[[x,y],[x,0],[0,y]].map(project);
        assert.deepEqual(panel.guides[id+'-x-guide'].map(v=>v.toFixed(4)),[px,py,xx,xy].map(v=>v.toFixed(4)),tag+' x guide '+id);
        assert.deepEqual(panel.guides[id+'-y-guide'].map(v=>v.toFixed(4)),[px,py,yx,yy].map(v=>v.toFixed(4)),tag+' y guide '+id);
        near(panel.labelPositions['x-tick-'+x][0],px,tag+' x tick '+id);
        near(panel.labelPositions['y-tick-'+y][1],py,tag+' y tick '+id);
      }
    }
  }
  const keyCount=question===1||typeof question==='string'?panels.length:0;
  const keys=figure.locator('.diagramguard-coordinate-key');
  assert.equal(await keys.count(),keyCount,context+' key visibility');
  const text=await keys.evaluateAll(lists=>lists.map(key=>{
    if(key.scrollWidth>key.clientWidth+1)throw Error('Coordinate key overflows');
    return [...key.querySelectorAll('[role=listitem]')].map(entry=>entry.textContent);
  }));
  const number=value=>String(value).replace('-','−');
  assert.deepEqual(text,panels.slice(0,keyCount).map(({points})=>Object.entries(points)
    .map(([name,[x,y]])=>`${name} (${number(x)}, ${number(y)})`)),context+' coordinate key order and values');
  return measured.length;
}

async function verifyDistanceConcept(page,base) {
  await page.goto(base+'/index.html?class=9&chapter=g9-ch5&section=concepts&concept=0');
  const plot=page.locator('.g9-distance-lab');
  const caption=plot.locator('.g9-distance-plot-note');
  const panels=[{points:{A:[1,2],B:[4,6],C:[4,2]},edges:['AC','CB','AB'],squares:{AC:9,CB:16,AB:25},rightAngle:'ACB'}];
  let count=0;
  for(const lang of ['en','ta']){
    if(await page.locator('html').getAttribute('lang')!==lang)
      await page.locator(lang==='ta'?'#langTa':'#langEn').evaluate(button=>button.click());
    for(const [width,height] of viewports){
      await page.setViewportSize({width,height});
      for(const percent of [100,200]){
        await settle(page,percent);
        const context=`Distance Formula ${lang} ${width}×${height} ${percent}%`;
        count+=await verify(plot,'distance concept',panels,lang,percent,context);
        assert.equal(await caption.textContent(),lang==='ta'?
          'கிடைமட்டம் 3 அலகுகள் · செங்குத்து 4 அலகுகள் · நேர்க்கோட்டுத் தொலைவு 5 அலகுகள்':
          'Horizontal 3 units · Vertical 4 units · Straight-line distance 5 units',context);
        const measured=await caption.evaluate(node=>({font:parseFloat(getComputedStyle(node).fontSize),
          overflow:node.scrollWidth-node.clientWidth,below:node.getBoundingClientRect().top>=
            node.previousElementSibling.getBoundingClientRect().bottom-.5}));
        assert(Math.abs(measured.font-.14*percent)<.2&&measured.overflow<=1&&measured.below,context+' measurements');
      }
    }
  }
  return count;
}

async function main() {
  const isWebKit = process.argv.includes('--webkit');
  const live = process.env.TRIGGLE_G9_COORDINATE_BASE;
  const app = live ? {base:live.replace(/\/$/,''),close:async()=>{}} : await server();
  let browser,count=0;
  try {
    browser=await (isWebKit?webkit:chromium).launch(isWebKit?{headless:true}:launchOptions());
    const page=await browser.newPage({viewport:{width:390,height:844},serviceWorkers:'block'});
    page.setDefaultTimeout(10000);
    const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    if(process.argv.includes('--concept-only')){
      const conceptCount=await verifyDistanceConcept(page,app.base);
      assert.deepEqual(errors,[]);
      console.log(`PASS ${conceptCount} bilingual Grade 9 distance-concept renderings`);
      return;
    }
    for (const [question,panels,solutionOnly] of fixtures) {
      await page.goto(app.base+route(question));
      for (const lang of ['en','ta']) {
        if(await page.locator('html').getAttribute('lang')!==lang)
          await page.locator(lang==='ta'?'#langTa':'#langEn').evaluate(button=>button.click());
        await page.waitForFunction(lang=>document.documentElement.lang===lang,lang);
        if (process.env.TRIGGLE_COORDINATE_FALLBACK_FONT) {
          await page.evaluate(()=>document.body.style.setProperty('--ver-font','monospace'));
          await settle(page,150);
        }
        for (const [width,height] of viewports) {
          await page.setViewportSize({width,height});
          for (const percent of [100,200]) {
            await settle(page,percent);
            const name=`${question} ${lang} ${width}×${height} ${percent}%`;
            if(solutionOnly)assert(await page.locator('#inlineFigure').isHidden(),name+' figure only in dialog');
            else count+=await verify(page.locator('#inlineFigureVisual'),question,panels,lang,percent,name+' inline');
            const expand=page.locator(solutionOnly?'#figureBtn':'#inlineFigureOpen');
            await expand.click();
            await settle(page,percent);
            const dialog=page.locator('#figureDialog');
            assert(await dialog.locator('#closeDiagram').evaluate(node=>document.activeElement===node),name+' initial focus');
            count+=await verify(dialog.locator('.diagram-content'),question,panels,lang,percent,name+' enlarged');
            if(percent===200&&(width===320||height===375)){
              const reachable=await dialog.evaluate(dialog=>{
                const header=dialog.querySelector('.dialog-header');
                const content=dialog.querySelector('#diagramContent');
                const caption=dialog.querySelector('#coordinateFigureCaption');
                const close=dialog.querySelector('#closeDiagram').getBoundingClientRect();
                const top=header.getBoundingClientRect().top;
                const captionBelow=!caption.hidden&&caption.getBoundingClientRect().top>=content.getBoundingClientRect().bottom-1;
                const last=Array.from(content.querySelectorAll('.diagramguard-coordinate')).at(-1);
                dialog.scrollTop+=last.getBoundingClientRect().bottom-dialog.getBoundingClientRect().bottom+6;
                const box=last.getBoundingClientRect();
                const hit=document.elementFromPoint(box.left+box.width/2,box.bottom-3);
                return {captionBelow,closeFits:close.width>=44&&close.height>=44&&close.top>=-1&&close.bottom<=innerHeight+1,
                  headerStays:Math.abs(header.getBoundingClientRect().top-top)<=1,
                  plotReachable:!!hit&&last.parentElement.contains(hit)};
              });
              assert.deepEqual(reachable,{captionBelow:true,closeFits:true,headerStays:true,plotReachable:true},name+' viewer scroll');
            }
            await page.keyboard.press('Escape');
            await page.waitForFunction(id=>document.activeElement?.id===id,solutionOnly?'figureBtn':'inlineFigureOpen');
          }
        }
      }
    }
    await page.setViewportSize({width:320,height:844});
    const fallbackCases = [1,2,'5.2-q11','5.3-q5','5.5-q5'];
    for (const [question,panels,solutionOnly] of fixtures.filter(([id])=>fallbackCases.includes(id))) {
      await page.goto(app.base+route(question));
      await page.evaluate(()=>document.body.style.setProperty('--ver-font','monospace'));
      await settle(page,150);
      const lang=await page.locator('html').getAttribute('lang');
      if(solutionOnly)await page.locator('#figureBtn').click();
      const figure=page.locator(solutionOnly?'#figureDialog .diagram-content':'#inlineFigureVisual');
      for (const percent of [100,200]) {
        await settle(page,percent);
        await verify(figure,question,panels,lang,percent,'Q'+question+' wide fallback font '+percent+'%');
      }
    }
    count+=await verifyDistanceConcept(page,app.base);
    assert.deepEqual(errors,[]);
    console.log(`PASS Grade 9 Chapter 5 coordinate figures in ${isWebKit?'WebKit':'Chromium'} (${count} bilingual panel renderings)`);
  } finally {
    await browser?.close();
    await app.close();
  }
}
main().catch(error=>{console.error(error);process.exitCode=1;});
