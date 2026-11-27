'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const {chromium, webkit} = require('playwright');
const {server,launchOptions} = require('./dashboard_test_support.cjs');

const webkitRun = process.argv.includes('--webkit');
const live = process.env.TRIGGLE_DIAGRAMGUARD_BASE;
const ui = '/index.html?class=10&chapter=g10-ch4';
const concept = n => ui + '&section=concepts&concept=' + n;
const question = ui + '&question=c10-4-ex4-3-q4';
const viewports = [[390,844],[320,844],[360,844],[375,844],[412,844],[430,844],[768,1024],[1280,900],[667,375]];
const sides = ([a,b,c]) => [length(a,b),length(a,c),length(b,c)];
const length = (a,b) => Math.hypot(a[0]-b[0],a[1]-b[1]);
const angle = (a,b,c) => Math.acos(
  ((b[0]-a[0])*(c[0]-a[0])+(b[1]-a[1])*(c[1]-a[1]))/length(a,b)/length(a,c)
)*180/Math.PI;
const near = (actual,expected,tolerance=1e-5) => assert(Math.abs(actual-expected)<tolerance, `${actual} ≠ ${expected}`);
const proportional = (a,b,factor = sides(b)[0]/sides(a)[0]) => {
  const other = sides(b);
  sides(a).forEach((side,i) => near(other[i]/side,factor));
};

async function setLanguage(page, lang) {
  if(await page.locator('html').getAttribute('lang') !== lang) {
    await page.locator(lang==='ta'?'#langTa':'#langEn').evaluate(button=>button.click());
  }
  await page.waitForFunction(expected=>document.documentElement.lang===expected,lang);
}
async function settle(page, percent) {
  await page.evaluate(async percent=>{
    document.documentElement.style.fontSize=percent+'%';
    await document.fonts.ready;
    for(let frame=0;frame<3;frame++)await new Promise(requestAnimationFrame);
  },percent);
}
async function read(page, selector, percent) {
  const svg = page.locator(selector);
  await svg.waitFor({state:'visible'});
  const result = await svg.evaluate(svg=>{
    const audit=window.TriggleDiagramGuard.audit(svg);
    const geometry=[...svg.querySelectorAll('[data-dg-vertices]')].map(poly=>
      poly.getAttribute('points').trim().split(/\s+/).map(pair=>pair.split(',').map(Number)));
    const lines=Object.fromEntries([...svg.querySelectorAll('line[data-dg-obstacle]')].map(line=>[
      line.dataset.dgObstacle,['x1','y1','x2','y2'].map(name=>Number(line.getAttribute(name)))
    ]));
    const arc=svg.querySelector('[data-dg-obstacle="swing-arc"]');
    const caption=svg.parentElement.querySelector(':scope > .diagramguard-annotation:not([hidden])');
    const heading=svg.closest('dialog')?.querySelector('.dialog-header');
    return {
      ...audit,geometry,lines,state:svg.dataset.dgState,description:svg.getAttribute('aria-label'),
      arc:arc?.getAttribute('d'),captionBelow:caption?
        caption.getBoundingClientRect().top>=svg.getBoundingClientRect().bottom-.5:null,
      captionOverflow:caption?caption.scrollWidth-caption.clientWidth:0,
      headerAbove:heading?heading.getBoundingClientRect().bottom<=svg.getBoundingClientRect().top+.5:null,
      overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth
    };
  });
  assert(result.measured,selector);
  assert(result.description?.length>12,selector+' accessible description');
  assert.deepEqual(result.issues,[],selector+' collisions');
  assert.deepEqual(result.unmeasured,[],selector+' obstacles');
  assert(result.overflow<=1,selector+' viewport overflow '+result.overflow);
  assert.notEqual(result.captionBelow,false,selector+' caption beside drawing');
  assert(result.captionOverflow<=1,selector+' caption overflow');
  assert.notEqual(result.headerAbove,false,selector+' title overlaps drawing');
  for(const {id,fontPx} of result.labels){
    assert(fontPx>=14*percent/100-.25&&fontPx<=16*percent/100+.25,`${selector} ${id} ${fontPx}px at ${percent}%`);
  }
  return result;
}

function checkLab({geometry,state,arc}) {
  assert.equal(geometry.length,2);
  const [a,b]=geometry;
  if(state.startsWith('ssa')){
    const [first,second]=[a,b].map(([A,B,C])=>{
      near(length(A,B)/length(A,C),8/5.5);
      near(angle(B,A,C),35);
      return length(B,C)/length(B,A);
    });
    assert(Math.abs(first-second)>.5,'SSA alternatives must be non-similar');
    assert(b[2][0] > a[2][0] ? state==='ssa-1' : state==='ssa-2','selected and alternate swap');
    const [x0,y0,r1,r2,x1,y1]=arc.match(/[-+]?[0-9]+(?:\.[0-9]+)?(?:e[-+]?\d+)?/ig).map(Number)
      .filter((_,i)=>[0,1,2,3,7,8].includes(i));
    [r1,r2].forEach(radius=>near(radius,length(b[0],b[2])));
    near(length(b[0],[x0,y0]),r1);
    near(length(b[0],[x1,y1]),r1);
    return;
  }
  proportional(a,b,state==='sss'?2:1.5);
  for(const [A,B,C] of geometry){
    if(state==='aa'){
      near(angle(A,B,C),50);
      near(angle(B,A,C),65);
      near(angle(C,A,B),65);
    }
    if(state==='sas'){
      near(angle(A,B,C),50);
      near(length(A,B)/length(A,C),4/6);
    }
    if(state==='sss'){
      near(length(A,B)/length(B,C),3/4);
      near(length(A,C)/length(B,C),5/4);
    }
  }
}

function checkRectangle(result){
  const [[W,X,Y,Z]]=result.geometry;
  assert(W[0]<X[0]&&W[1]>Z[1]&&X[0]===Y[0]&&Z[0]===W[0]);
  assert(W[1]===X[1]&&Y[1]===Z[1]);
  const [wx,xy]=[length(W,X),length(X,Y)];
  near(wx/xy,12/5);
  near(angle(W,X,Z),90);
  near(length(W,Y),length(X,Z));
  near(length(X,Z)/wx,13/12);
  assert.deepEqual(result.lines.XZ,[...X,...Z]);
  assert.deepEqual(result.lines.YW,[...Y,...W]);
  assert.deepEqual(result.labels.map(l=>l.id),['W','X','Y','Z','long-side','short-side']);
}

async function synthetic(page){
  const fixture = file=>fs.readFile(path.join(__dirname,'fixtures','diagramguard',file),'utf8');
  const baselines = await Promise.all(['similarity-before.svg','rectangle-before.svg'].map(fixture));
  const result=await page.evaluate(async ([preview,rectangle])=>{
    await document.fonts.load('16px "Triggle Noto Sans Tamil"','ஒத்த முக்கோணங்களின் பக்கங்களின் விகிதம்');
    await document.fonts.ready;
    const host=document.createElement('div');
    host.style.cssText='position:absolute;top:0;left:0;pointer-events:none;font:16px var(--ver-font, sans-serif)';
    document.body.append(host);
    const guard=window.TriggleDiagramGuard;
    const run=(markup)=>{
      host.innerHTML=markup;
      const svg=host.querySelector('svg');
      return guard.audit(svg,{discover:true}).issues;
    };
    const cases={};
    const test=(name,markup)=>cases[name]=run('<svg width="420" height="140" viewBox="0 0 420 140">'+markup+'</svg>');
    test('line','<line id="horizontal" x1="0" y1="75" x2="200" y2="75" stroke="black" stroke-width="2"/><text x="50" y="79">Label</text>');
    test('strokeWidth','<line id="thick" x1="0" y1="83" x2="200" y2="83" stroke="black" stroke-width="12"/><text x="50" y="77">Label</text>');
    test('diagonalClear','<line x1="0" y1="0" x2="120" y2="120" stroke="black"/><text x="8" y="106">Clear</text>');
    test('label','<text x="80" y="65">First</text><text x="90" y="63">Second</text>');
    test('boundary','<text x="395" y="90">Clipped on right</text>');
    test('rotated','<text x="100" y="80" transform="rotate(-90 100 80)">Turn</text><line id="rotated" x1="80" y1="62" x2="125" y2="62" stroke="black"/>');
    test('transform','<g transform="translate(25 25) scale(1.25) rotate(10 100 50)"><text x="40" y="40">Nested</text><path id="angle" data-dg-role="angle" d="M 31 36 Q 72 40 108 34" stroke="black" fill="none"/></g>');
    test('tamilClear','<text x="10" y="77">ஒத்த முக்கோணங்களின் பக்கங்களின் விகிதம்</text>');
    test('tamilBoundary','<text x="395" y="77">ஒத்த முக்கோணங்களின் பக்கங்களின் விகிதம்</text>');
    test('curve','<path id="curve" d="M20 95 Q75 20 145 95" fill="none" stroke="black"/><text x="65" y="65">Arc</text>');
    test('cssCircle','<circle id="circle" cx="100" cy="71" r="3" style="r:22px" fill="none" stroke="black"/><text x="116" y="78">Edge</text>');
    test('subpathClear','<path d="M10 55 L30 55 M210 55 L230 55" fill="none" stroke="black"/><text x="85" y="60">Between</text>');
    test('intentional','<line id="tick" x1="31" y1="50" x2="58" y2="50" stroke="black"/><text data-dg-allow="tick" x="32" y="54">Tick</text>');
    test('arrowhead','<polygon id="head" data-dg-role="arrowhead" data-dg-fill points="55,40 68,55 45,68"/><text x="53" y="60">A</text>');
    test('fill','<rect id="shade" data-dg-fill x="20" y="20" width="100" height="70" fill="#ddd"/><text x="45" y="52">Inside</text>');
    test('legend','<rect id="plot" data-dg-role="plot" data-dg-fill x="20" y="20" width="100" height="70" fill="#ddd"/><text x="45" y="52">Legend</text>');
    cases.previewBefore=run(preview);
    cases.rectangleBefore=run(rectangle);
    host.innerHTML='<svg width="420" height="140" viewBox="0 0 420 140"></svg>';
    const svg=host.firstElementChild;
    const label=document.createElementNS(svg.namespaceURI,'text');
    label.textContent='Q';
    guard.place(svg,[{label,anchor:[100,70],candidates:[[14,0],[-18,0]],neighborPoints:[[108,70]]}]);
    const closestPointPlacement=[Number(label.getAttribute('x')),Number(label.getAttribute('y'))];
    const canvas=document.createElement('canvas');
    canvas.style.width='150px';
    host.append(canvas);
    const ctx=canvas.getContext('2d');
    ctx.font='20px sans-serif';
    ctx.translate(10,15);
    const quad=guard.canvasLabel(ctx,'A',50,55);
    host.remove();
    return {cases,closestPointPlacement,canvas:[quad[1][0]-quad[0][0],quad[2][1]-quad[1][1]]};
  },baselines);
  const exact={
    line:['stroke'],strokeWidth:['stroke'],diagonalClear:[],label:['label'],boundary:['boundary'],
    rotated:['stroke'],transform:['angle'],tamilClear:[],tamilBoundary:['boundary'],curve:['stroke'],cssCircle:['stroke'],
    subpathClear:[],intentional:[],arrowhead:['arrowhead'],fill:['fill'],legend:['plot']
  };
  for(const [name,expected] of Object.entries(exact)){
    assert.deepEqual(result.cases[name].map(issue=>issue.kind),expected,name);
  }
  assert(result.cases.previewBefore.some(i=>i.kind==='stroke'&&i.label==='AA · SAS · SSS'));
  assert(result.cases.rectangleBefore.some(i=>i.kind==='stroke'&&i.label==='XZ = YW'));
  assert.throws(()=>proportional([[48,20],[22,88],[94,88]],[[190,14],[156,88],[248,88]]));
  assert(result.canvas.every(size=>size>4&&size<12),'Canvas transformed metrics');
  assert.deepEqual(result.closestPointPlacement,[82,70],'Label remains associated with its own point');
  console.log('DiagramGuard: 18 synthetic checks, two original regressions and original unequal proportions reproduced');
}

async function legacyCases(page){
  const files={
    g9SetsEn:'grade9-ch1/ex1-3-q6-en',g9SetsTa:'grade9-ch1/ex1-3-q6-ta',g9SetOperations:'grade9-ch1/ex1-3-q7',
    shadedTriangle:'grade9-ch7/ex7-1-q6',forearmEn:'grade10-ch1/ex1-3-q10',forearmTa:'grade10-ch1/ex1-3-q10-ta',
    gardenEn:'grade10-ch3/ex3-12-q2-pathway',gardenTa:'grade10-ch3/ex3-12-q2-pathway-ta',
    flowerbedEn:'grade10-ch3/ex3-12-q8-flowerbed',flowerbedTa:'grade10-ch3/ex3-12-q8-flowerbed-ta',
    sides:'grade10-geometry/ex4-1-q1-i',angles:'grade10-geometry/ex4-1-q1-ii',bisectors:'grade10-geometry/ex4-2-q10',
    streetEn:'grade10-geometry/ex4-3-q2',streetTa:'grade10-geometry/ex4-3-q2-ta',
    rectangleEn:'grade10-geometry/ex4-3-q4',rectangleTa:'grade10-geometry/ex4-3-q4-ta',window:'grade10-geometry/ex4-4-q10',
    lamp:'grade10-ch6/ex6-3-q3',boats:'grade10-ch6/ex6-3-q4',ships:'grade10-ch6/ex6-3-q5',
    cloud:'grade10-ch6/ex6-4-q3',statue:'grade10-ch6/ex6-unit-q9'
  };
  const data=await page.evaluate(async files=>{
    const entries=await Promise.all(Object.entries(files).map(async ([id,file])=>{
      const response=await fetch('./assets/'+file+'.svg');
      if(!response.ok)throw Error(file+' '+response.status);
      return [id,await response.text()];
    }));
    await document.fonts.ready;
    const host=document.body.appendChild(document.createElement('div'));
    host.style.cssText='position:absolute;left:-2000px;top:0;pointer-events:none';
    const root=host.attachShadow({mode:'closed'});
    const measured={};
    for(const [id,markup] of entries){
      root.innerHTML=markup;
      const svg=root.querySelector('svg');
      svg.style.cssText='display:block;height:auto;font-family:var(--ver-font,sans-serif)';
      const issues=[];
      for(const width of [240,300,480]){
        svg.style.width=width+'px';
        issues.push(...window.TriggleDiagramGuard.audit(svg,{discover:true}).issues);
      }
      const points=[...svg.querySelectorAll('polygon[points],polyline[points]')].map(shape=>
        shape.getAttribute('points').trim().split(/\s+/).map(pair=>pair.split(',').map(Number)));
      const lines=[...svg.querySelectorAll('line[x1]')].map(line=>
        [1,2].map(i=>['x','y'].map(axis=>Number(line.getAttribute(axis+i)))));
      const rectangles=[...svg.querySelectorAll('rect[x][y]')].map(rect=>
        ['x','y','width','height'].map(name=>Number(rect.getAttribute(name))));
      measured[id]={issues,points,lines,rectangles};
    }
    host.remove();
    return measured;
  },files);
  const findings=Object.fromEntries(Object.entries(data).filter(([,result])=>result.issues.length)
    .map(([id,result])=>[id,result.issues]));
  assert.deepEqual(findings,{},'Legacy SVG collision checks');
  const [[C,A,B],[, ,D],[cornerA,corner,cornerB]]=data.shadedTriangle.points;
  near(length(C,A)/6,34);near(length(C,B)/6,42);
  near(length(D,A)/6,12);near(length(D,B)/6,16);
  near(angle(D,A,B),90);near(angle(corner,cornerA,cornerB),90);
  const area=(a,b,c)=>Math.abs((b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]))/72;
  near(area(C,A,B)-area(A,B,D),240,1e-4);
  const [horizontal,vertical]=data.streetEn.points[0];
  near(length(horizontal,vertical)/length(vertical,data.streetEn.points[0][2]),4/3);
  assert.deepEqual(data.streetEn.points,data.streetTa.points);
  const inclination=([a,b])=>Math.atan2(Math.abs(b[1]-a[1]),Math.abs(b[0]-a[0]))*180/Math.PI;
  for(const [id,start,degrees] of [['lamp',4,[38,60]],['boats',3,[60,30]],['ships',3,[30,60]],['statue',3,[24,34]]]){
    degrees.forEach((expected,i)=>assert(Math.abs(inclination(data[id].lines[start+i])-expected)<.15,id+' sight ray'));
  }
  const [[,water],[,observer],,,[,cloud],[,image]]=data.cloud.lines.map(line=>line.map(p=>p[1]));
  assert.equal(cloud+image,2*water,'cloud and reflection are symmetric');
  assert.equal(image-water,(water-observer)+(observer-cloud));
  for(const [name,fieldWidth,fieldHeight,bedWidth,bedHeight] of [
    ['garden',19,15,16,12],['flowerbed',10,10,6,6]
  ]){
    const [[x,y,w,h],[bx,by,bw,bh]]=data[name+'En'].rectangles;
    near(w/h,fieldWidth/fieldHeight);
    near(bw/w,bedWidth/fieldWidth);near(bh/h,bedHeight/fieldHeight);
    near(bx-x,by-y);near(bx-x,(w-bw)/2);near(by-y,(h-bh)/2);
    assert.deepEqual(data[name+'En'].rectangles,data[name+'Ta'].rectangles);
  }
  console.log('DiagramGuard: '+Object.keys(data).length+' legacy SVG variants and source geometry checked at 240/300/480 CSS px');
}

async function conceptBoundaries(page,base){
  const stages=[
    {chapter:'g9-ch2',index:0},
    {chapter:'g9-ch7',index:1},
    {chapter:'g10-ch3',index:10,tab:1},
    {chapter:'g10-ch4',index:3,tab:3},
    {chapter:'g10-ch4',index:4},
    {chapter:'g10-ch4',index:7},
    {chapter:'g10-ch4',index:8},
    {chapter:'g10-ch4',index:11,tab:1}
  ];
  const panel=page.locator('.sp2-journey[data-view=lesson] [data-panel]');
  const boundaryCheck=async stage=>{
    const issues=await panel.evaluate(panel=>[...panel.querySelectorAll('svg')].flatMap(svg=>{
      if(svg.closest('.katex')||!svg.getBoundingClientRect().height)return [];
      return window.TriggleDiagramGuard.audit(svg,{discover:true}).issues.filter(issue=>issue.kind==='boundary');
    }));
    assert.deepEqual(issues,[],stage+' SVG label bounds');
  };
  const geometry=async()=>panel.locator('.g10ch4-lab svg').evaluate(svg=>{
    const polygon=svg.querySelector('polygon');
    const vertices=polygon?.getAttribute('points').trim().split(/\s+/).map(pair=>pair.split(',').map(Number));
    const names=Object.fromEntries([...svg.querySelectorAll('text')].map(t=>[
      t.textContent,[Number(t.getAttribute('x')),Number(t.getAttribute('y'))]
    ]));
    const dots=[...svg.querySelectorAll('circle')].map(circle=>
      ['cx','cy'].map(attr=>Number(circle.getAttribute(attr))));
    return {vertices,names,dots};
  });
  for(const {chapter,index,tab} of stages){
    const grade=chapter.split('-')[0].slice(1);
    await page.goto(base+`/index.html?class=${grade}&chapter=${chapter}&section=concepts&concept=${index}`);
    for(const language of ['en','ta']){
      await setLanguage(page,language);
      await settle(page,100);
      if(tab!==undefined)await panel.locator('button[class*="ch"][class*="-tab"]').nth(tab).click();
      const stage=chapter+' concept '+index+' '+language;
      await boundaryCheck(stage);
      if(chapter!=='g10-ch4')continue;
      if(index===7){
        const {vertices:[A,B,C]}=await geometry();
        near(length(A,B)/length(B,C),4/5);
        near(length(A,C)/length(B,C),6/5);
        await panel.locator('.g10ch4-preset-row button').nth(2).click();
        const {names}=await geometry();
        assert(names.A[0]<names.B[0]&&names.B[0]<names.C[0],stage+' flat-line order');
        near(length(names.A,names.B),length(names.B,names.C));
        await boundaryCheck(stage+' trap');
      }
      if(index===8){
        const slider=panel.locator('input[type=range]');
        for(const value of ['-135','-90','-45']){
          await slider.fill(value);
          const {vertices:[P,Q,R]}=await geometry();
          near(angle(P,Q,R),40);
          await boundaryCheck(stage+' '+value);
        }
      }
      if(index===11){
        const {vertices:[A,B,C],dots:[P,Q,R]}=await geometry();
        assert(P[0]>C[0],stage+' external point');
        near(P[1],B[1]);
        near(length(P,R),length(P,Q)+length(Q,R));
        near(-length(B,P)/length(P,C)*length(C,Q)/length(Q,A)*length(A,R)/length(R,B),-1);
      }
    }
  }
  console.log('DiagramGuard: eight additional concept scenes checked for label bounds and construction invariants');
}

async function main(){
  const app=live?null:await server(process.env.TRIGGLE_DIAGRAMGUARD_SITE);
  const base=live||app.base;
  let browser;
  try{
    browser=await (webkitRun?webkit:chromium).launch(webkitRun?{headless:true}:launchOptions());
    for(const [width,height] of live?[[390,844]]:viewports){
      const context=await browser.newContext({
        viewport:{width,height},isMobile:width<=667,hasTouch:width<=768,deviceScaleFactor:1,
        serviceWorkers:'block'
      });
      try{
        const page=await context.newPage();
        await page.goto(base+concept(1));
        if(width===390&&!live){
          await synthetic(page);
          await legacyCases(page);
          await conceptBoundaries(page,base);
        }
        for(const lang of ['en','ta']){
          await page.goto(base+concept(1));
          await setLanguage(page,lang);
          const tabs=page.locator('.g10ch4-lab .g10ch4-tab');
          for(const percent of [100,200]){
            await settle(page,percent);
            const preview=await read(page,'[data-dg-scene="similarity-criteria-preview"]',percent);
            proportional(...preview.geometry);
            for(const [index,state] of ['aa','sas','sss','ssa-1'].entries()){
              await tabs.nth(index).click();
              const selector='[data-dg-scene="similarity-lab"][data-dg-ready]';
              const active=await read(page,selector,percent);
              assert.equal(active.state,state);
              assert.equal(await tabs.nth(index).getAttribute('aria-pressed'),'true');
              checkLab(active);
            }
            const flip=page.locator('.g10ch4-lab .g10ch4-chip-btn');
            await flip.click();
            const second=await read(page,'[data-dg-state="ssa-2"]',percent);
            checkLab(second);
            assert(await flip.evaluate(button=>button===document.activeElement)||width<=667);
            await flip.click();
            assert.deepEqual((await read(page,'[data-dg-state="ssa-1"]',percent)).geometry,
              [second.geometry[1],second.geometry[0]],'return to first SSA layout');
            if(width===390&&percent===200&&!live){
              await page.setViewportSize({width:667,height:375});
              await settle(page,percent);
              checkLab(await read(page,'[data-dg-state="ssa-1"]',percent));
              await page.setViewportSize({width,height});
              await settle(page,percent);
              checkLab(await read(page,'[data-dg-state="ssa-1"]',percent));
            }
          }
          for(const [index,id] of [[0,'scale'],[2,'results']]){
            await page.goto(base+concept(index));
            await setLanguage(page,lang);
            for(const percent of [100,200]){
              await settle(page,percent);
              const result=await read(page,`[data-dg-scene="similarity-${id}-preview"]`,percent);
              proportional(...result.geometry);
            }
          }
          await page.goto(base+question);
          await setLanguage(page,lang);
          const open=page.locator('#inlineFigureOpen');
          for(const percent of [100,200]){
            await settle(page,percent);
            checkRectangle(await read(page,'#inlineFigure [data-dg-ready]',percent));
            await open.click();
            const close=page.locator('#closeDiagram');
            assert(await close.evaluate(button=>button===document.activeElement));
            checkRectangle(await read(page,'#figureDialog [data-dg-ready]',percent));
            await close.click();
            assert(await open.evaluate(button=>button===document.activeElement));
          }
        }
        console.log(`DiagramGuard: ${webkitRun?'WebKit':'Chromium'} ${width}×${height}, EN/TA, 100%/200% passed`);
      } finally { await context.close(); }
    }
  } finally {
    await browser?.close();
    await app?.close();
  }
}
main().catch(error=>{console.error(error);process.exitCode=1;});
