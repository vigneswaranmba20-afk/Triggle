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
    const id=lang==='ta'?'langTa':'langEn';
    await page.waitForFunction(id=>typeof document.getElementById(id)?.onclick==='function',id);
    await page.locator('#'+id).evaluate(button=>button.click());
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
    const arrow='<defs><marker id="arrow" viewBox="0 0 20 10" markerWidth="20" markerHeight="10" refX="0" refY="5" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M0 0 L20 5 L0 10 Z"/></marker></defs>';
    test('markerEnd',arrow+'<line x1="40" y1="60" x2="100" y2="60" stroke="black" marker-end="url(#arrow)"/><text x="104" y="64">A</text>');
    test('markerStart',arrow+'<line x1="100" y1="60" x2="200" y2="60" stroke="black" marker-start="url(#arrow)"/><text x="84" y="64">A</text>');
    test('markerPathClear',arrow+'<path d="M40 60 Q80 40 100 60" stroke="black" fill="none" marker-end="url(#arrow)"/><text x="106" y="44">A</text>');
    test('markerPathHit',arrow+'<path d="M40 60 Q80 40 100 60" stroke="black" fill="none" marker-end="url(#arrow)"/><text x="106" y="74">A</text>');
    test('fill','<rect id="shade" data-dg-fill x="20" y="20" width="100" height="70" fill="#ddd"/><text x="45" y="52">Inside</text>');
    test('legend','<rect id="plot" data-dg-role="plot" data-dg-fill x="20" y="20" width="100" height="70" fill="#ddd"/><text x="45" y="52">Legend</text>');
    cases.previewBefore=run(preview);
    cases.rectangleBefore=run(rectangle);
    host.innerHTML='<div style="width:64px;overflow:hidden"><svg width="128" viewBox="0 0 128 44"><text x="76" y="25">Label</text></svg></div>';
    const clipped=host.querySelector('svg');
    const clipping=guard.audit(clipped,{discover:true});
    clipped.setAttribute('width','64');
    const reflowed=guard.audit(clipped,{discover:true});
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
    return {cases,clipping,reflowed,closestPointPlacement,canvas:[quad[1][0]-quad[0][0],quad[2][1]-quad[1][1]]};
  },baselines);
  const exact={
    line:['stroke'],strokeWidth:['stroke'],diagonalClear:[],label:['label'],boundary:['boundary'],
    rotated:['stroke'],transform:['angle'],tamilClear:[],tamilBoundary:['boundary'],curve:['stroke'],cssCircle:['stroke'],
    subpathClear:[],intentional:[],arrowhead:['arrowhead'],markerEnd:['arrowhead'],markerStart:['arrowhead'],
    markerPathClear:[],markerPathHit:['arrowhead'],fill:['fill'],legend:['plot']
  };
  for(const [name,expected] of Object.entries(exact)){
    assert.deepEqual(result.cases[name].map(issue=>issue.kind),expected,name);
  }
  assert(result.cases.previewBefore.some(i=>i.kind==='stroke'&&i.label==='AA · SAS · SSS'));
  assert(result.cases.rectangleBefore.some(i=>i.kind==='stroke'&&i.label==='XZ = YW'));
  assert.throws(()=>proportional([[48,20],[22,88],[94,88]],[[190,14],[156,88],[248,88]]));
  assert(result.canvas.every(size=>size>4&&size<12),'Canvas transformed metrics');
  assert.deepEqual(result.clipping.issues,[],'The text sits inside the SVG viewBox');
  assert.deepEqual(result.clipping.horizontalClipping,{left:0,right:64},'A parent clips the SVG');
  assert.deepEqual(result.reflowed.horizontalClipping,{left:0,right:0},'The SVG fits the parent after reflow');
  assert.deepEqual(result.closestPointPlacement,[82,70],'Label remains associated with its own point');
  console.log('DiagramGuard: synthetic label, marker and geometry checks, plus both original regressions');
}

async function legacyMarkers(page){
  const stats=await page.evaluate(async()=>{
    const host=document.createElement('div');
    host.style.cssText='position:absolute;left:-2000px;top:0;pointer-events:none';
    document.body.append(host);
    const root=host.attachShadow({mode:'closed'}), reports=[];
    await document.fonts.ready;
    for(const name of ['ex1-2-q4','figure1-16','figure1-4-graphs']){
      const response=await fetch('./assets/grade10-ch1/'+name+'.svg');
      if(!response.ok)throw Error(name+' '+response.status);
      root.innerHTML=await response.text();
      const svg=root.querySelector('svg');
      for(const width of [240,300,480]){
        svg.style.width=width+'px';
        const {issues,unmeasured}=window.TriggleDiagramGuard.audit(svg,{discover:true});
        reports.push({name,width,issues:issues.filter(issue=>issue.kind==='arrowhead'),unmeasured});
      }
    }
    host.remove();
    return reports;
  });
  for(const {name,width,issues,unmeasured} of stats){
    assert.deepEqual(unmeasured,[],name+' marker coverage');
    assert.deepEqual(issues,[],`${name} at ${width}px clears marker labels`);
  }
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

async function legacyBoundaryCases(page){
  const files=[
    'grade9-ch4/ex4-2-q8','grade9-ch5/ex5-1-q2-fig5-11','grade9-ch5/ex5-1-q3',
    'grade10-ch1/ex1-4-q2-ta','grade10-geometry/ex4-1-q3-ta'
  ];
  const data=await page.evaluate(async files=>{
    const host=document.body.appendChild(document.createElement('div'));
    host.style.cssText='position:absolute;left:-2000px;top:0;pointer-events:none';
    const root=host.attachShadow({mode:'closed'});
    await document.fonts.load('16px "Triggle Noto Sans Tamil"','வடிவியல்');
    await document.fonts.ready;
    const results=[];
    for(const file of files){
      const response=await fetch('./assets/'+file+'.svg');
      if(!response.ok)throw Error(file+' '+response.status);
      root.innerHTML=await response.text();
      const svg=root.querySelector('svg');
      svg.style.cssText='display:block;height:auto';
      const triangle=svg.querySelector('[data-dg-obstacle="triangle"]');
      const bisectors=svg.querySelector('[data-dg-obstacle="bisectors"]');
      const vertices=shape=>shape?Array.from(shape.points,p=>[p.x,p.y]):[];
      for(const [lang,font] of [['en','system-ui, sans-serif'],['ta','"Triggle Noto Sans Tamil", system-ui, sans-serif']])
      for(const scale of [100,200])for(const width of [240,300,480]){
        svg.style.fontFamily=font;svg.style.fontSize=scale+'%';svg.style.width=width+'px';
        const audit=window.TriggleDiagramGuard.audit(svg,{discover:true});
        const issues=triangle?audit.issues:audit.issues.filter(issue=>issue.kind==='boundary');
        results.push({file,lang,scale,width,issues,triangle:vertices(triangle),bisectors:vertices(bisectors)});
      }
    }
    host.remove();
    return results;
  },files);
  for(const {file,lang,scale,width,issues,triangle,bisectors} of data){
    assert.deepEqual(issues,[],`${file} ${lang} ${scale}% at ${width}px`);
    if(!triangle.length)continue;
    const [a,b,c]=triangle;
    const [start,o,end]=bisectors;
    assert.deepEqual(start,b);
    assert.deepEqual(end,c);
    for(const [observed,expected] of [[angle(a,b,c),64],[angle(b,a,c),58],[angle(b,o,c),29],
      [angle(c,a,o),29],[angle(o,b,c),122]])near(observed,expected,1e-5);
    near(length(a,b),length(a,c),1e-5);
  }
  console.log(`DiagramGuard: ${data.length} additional SVG boundary checks and exact Grade 9 bisectors`);
}

async function trigAndBisectorGeometry(page,base,profiles){
  const preview=page.locator('svg.g10ch4-glance-svg');
  const lab=page.locator('.g10ch4-lab');
  const graph=lab.locator('svg.g10ch4-svg');
  async function shape(svg,description){
    const data=await svg.evaluate(svg=>{
      const project=(node,x,y)=>new DOMPoint(x,y).matrixTransform(node.getScreenCTM());
      const pair=p=>[p.x,p.y];
      const polygons=[...svg.querySelectorAll('polygon')].map(p=>Array.from(p.points,point=>pair(project(p,point.x,point.y))));
      const squares=[...svg.querySelectorAll('rect')].slice(0,2).map(rect=>{
        const {x,y,width,height}=rect.getBBox();
        return [project(rect,x,y),project(rect,x+width,y),project(rect,x,y+height)].map(pair);
      });
      const line=svg.querySelector('line');
      const segment=line?[1,2].map(i=>pair(project(line,line['x'+i].baseVal.value,line['y'+i].baseVal.value))):[];
      const issues=window.TriggleDiagramGuard.audit(svg,{discover:true}).issues;
      const overflow=document.documentElement.scrollWidth-document.documentElement.clientWidth;
      return {polygons,squares,segment,issues,overflow};
    });
    assert.deepEqual(data.issues,[],description+' label clearance');
    assert(data.overflow<=1,description+' reflow');
    return data;
  }
  async function open(chapter,index,lang,percent){
    await page.goto(base+`/index.html?class=10&chapter=g10-ch${chapter}&section=concepts&concept=${index}`);
    await setLanguage(page,lang);
    await settle(page,percent);
  }
  function checkSquares({polygons:[[a,b,c]],squares}){
    const legs=[length(a,b),length(b,c)];
    assert.equal(squares.length,2);
    for(const [[p,q,r],side] of squares.map((set,index)=>[set,legs[index]])){
      near(length(p,q),side);near(length(p,r),side);near(angle(p,q,r),90);
    }
    near((legs[0]**2+legs[1]**2)/length(a,c)**2,1);
  }
  let configurations=0;
  for(const [width,height] of profiles)for(const lang of ['en','ta'])for(const percent of [100,200]){
    await page.setViewportSize({width,height});
    const label=`${lang} ${width}×${height} ${percent}%`;
    for(const index of [6,7]){
      await open(4,index,lang,percent);
      const {polygons:[[a,b,c]],segment:[start,d]}=await shape(preview,label+' bisector '+index);
      near(length(start,a),0);
      near(length(b,d)/length(d,c),length(b,a)/length(c,a));
      near(angle(a,b,d),angle(a,d,c));
      assert(await page.locator('.g10ch4-glance-visual .diagramguard-annotation .katex').isVisible());
      configurations++;
    }
    await open(6,3,lang,percent);
    const {polygons:standard}=await shape(preview,label+' standard angles preview');
    [60,45].forEach((deg,index)=>near(angle(...standard[index]),deg));
    configurations++;
    for(const deg of [0,30,45,60,90]){
      await lab.getByRole('button',{name:`${deg}°`,exact:true}).click();
      const {polygons,segment}=await shape(graph,label+' standard angle '+deg);
      const caption=lab.locator('.diagramguard-annotation');
      if(deg===0||deg===90){
        const [u,v]=segment;
        near(deg===0?u[1]-v[1]:u[0]-v[0],0);
        const dimensions=await caption.evaluate(el=>({width:el.scrollWidth-el.clientWidth,font:parseFloat(getComputedStyle(el).fontSize),
          below:el.getBoundingClientRect().top>=el.previousElementSibling.getBoundingClientRect().bottom-.5}));
        assert(dimensions.below&&dimensions.width<=1,label+' wrapped boundary explanation');
        near(dimensions.font,15*percent/100,.1);
        assert.match(await caption.innerText(),deg===0?/cosec 0°.*cot 0°/:/tan 90°.*sec 90°/);
      }else{
        const [a,b,c]=polygons[0];
        near(angle(a,b,c),deg);near(angle(b,a,c),90);
        assert(await caption.isHidden());
        if(width===320&&deg===45){
          const issues=await graph.evaluate(svg=>{
            const old=svg.style.fontFamily;
            svg.style.fontFamily='monospace';
            const issues=window.TriggleDiagramGuard.audit(svg,{discover:true}).issues;
            svg.style.fontFamily=old;
            return issues;
          });
          assert.deepEqual(issues,[],label+' 45° label and right-angle marker with a fallback font');
        }
      }
      configurations++;
    }
    await open(6,4,lang,percent);
    checkSquares(await shape(preview,label+' Pythagorean squares preview'));
    configurations++;
    for(const value of [10,20,37,45,60,80]){
      await lab.getByRole('slider').evaluate((slider,value)=>{
        slider.value=String(value);slider.dispatchEvent(new Event('input',{bubbles:true}));
      },value);
      const data=await shape(graph,label+' square areas '+value);
      checkSquares(data);
      near(angle(...data.polygons[0]),value);
      assert.equal(await lab.locator('.diagramguard-coordinate-legend [role="listitem"]').count(),2);
      near(await lab.locator('.diagramguard-coordinate-legend').evaluate(node=>parseFloat(getComputedStyle(node).fontSize)),14*percent/100,.1);
      configurations++;
    }
  }
  return configurations;
}

async function sightLineGeometry(page,base,profiles){
  const route=base+'/index.html?class=10&chapter=g10-ch6&section=concepts&concept=';
  const cases=[{index:7,values:[[26,18],[45,8],[12,36],[30,20]]},
    {index:8,values:[[30,30],[20,60],[70,15],[45,45]]}];
  let states=0;
  for(const [width,height] of profiles)for(const lang of ['en','ta'])for(const percent of [100,200]){
    await page.setViewportSize({width,height});
    for(const {index,values} of cases){
      await page.goto(route+index);
      await setLanguage(page,lang);
      await settle(page,percent);
      const figure=page.locator('.g10ch4-svg[data-dg-ready]');
      await figure.waitFor();
      const presets=page.locator('.g10ch4-chip-btn');
      const sliders=page.locator('.g10ch4-slider');
      for(const mode of [0,1]){
        await presets.nth(mode).click();
        for(const [a,b] of values){
          for(const [i,value] of [a,b].entries())await sliders.nth(i).evaluate((input,value)=>{
            input.value=String(value);input.dispatchEvent(new Event('input',{bubbles:true}));
          },value);
          const result=await figure.evaluate(svg=>{
            const line=id=>svg.querySelector(`[data-dg-obstacle="${id}"]`);
            const point=(node,which)=>['x','y'].map(axis=>node[axis+which].baseVal.value);
            const start=point(line('sight'),1),end=point(line('sight'),2);
            const ground=line('ground').y1.baseVal.value;
            const arc=line('angle-0');
            const endpoint=arc.getPointAtLength(arc.getTotalLength());
            const key=svg.parentElement.querySelector('.diagramguard-coordinate-key');
            return {audit:window.TriggleDiagramGuard.audit(svg,{discover:true}),
              horizontal:line('ground').y2.baseVal.value===ground&&(!line('horizon')||
                line('horizon').y1.baseVal.value===line('horizon').y2.baseVal.value),
              rise:end[1]-start[1],run:end[0]-start[0],eye:ground-start[1],
              arc:[endpoint.x-start[0],endpoint.y-start[1]],
              keyBelow:key.getBoundingClientRect().top>=svg.getBoundingClientRect().bottom-.5,
              fontsize:parseFloat(getComputedStyle(key).fontSize),
              overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth};
          });
          const elevation=index===7;
          const expected=elevation?Math.atan2(b,a):a*Math.PI/180;
          near(Math.abs(Math.atan2(result.rise,result.run)),expected,1e-6);
          near(Math.abs(Math.atan2(result.arc[1],result.arc[0])),expected,.001);
          if(elevation)near(result.eye/result.run,mode?1.8/a:0,1e-6);
          const context=`${lang} ${width}×${height} ${percent}% sight scene ${index} ${mode} (${a}, ${b})`;
          assert.deepEqual(result.audit.issues,[],context);
          assert.equal(result.audit.labels.length,elevation?(mode===1?4:3):5,context);
          result.audit.labels.forEach(label=>near(label.fontPx,percent*.15,.2));
          near(result.fontsize,percent*.14,.2);
          assert(result.horizontal&&result.keyBelow&&result.overflow<=1,context);
          states++;
        }
      }
    }
  }
  return states;
}

async function statisticsPlotGeometry(page, base, profiles, full=false) {
  const route = base + '/index.html?class=10&chapter=g10-ch8&section=concepts&concept=';
  await page.addInitScript(()=>{
    const language=new URLSearchParams(location.search).get('diagramguardLanguage');
    if(language==='en'||language==='ta')localStorage.setItem('triggle-language',language);
  });
  const kinds = ['frequency','spread','spread','spread','scale','scale','frequency'];
  const selections = {
    frequency: (full ? [1,2,3,4,5] : [1,5]).map(n => [n,0]),
    spread: (full ? [1,2,3,4,5,6,7,8] : [1,8]).map(n => [n,0]),
    scale: (full ? [-2,-1,0,1,2] : [-2,0,2]).flatMap(a => [-4,0,4].map(b => [a,b]))
  };
  await page.setViewportSize({width:320,height:844});
  await page.goto(route+'4&diagramguardLanguage=en');
  await page.locator('.g10ch8-graphic[data-dg-ready]').waitFor();
  await settle(page,200);
  for(const [id,lang,mean] of [['langTa','ta','சராசரி:'],['langEn','en','Mean:']]){
    await page.locator('#'+id).click();
    await page.locator(`html[lang="${lang}"] #${id}[aria-pressed="true"]`).waitFor({state:'attached'});
    await settle(page,200);
    const visible=page.locator('.g10ch8-graphic[data-dg-ready]');
    await visible.waitFor();
    assert((await page.locator('.g10ch8-legend').textContent()).startsWith(mean));
    assert.deepEqual(await visible.evaluate(svg=>window.TriggleDiagramGuard.audit(svg,{discover:true}).issues),[]);
  }
  let checks=0;
  for(const [width,height] of profiles)for(const lang of ['en','ta'])for(const percent of [100,200]){
    await page.setViewportSize({width,height});
    for(const index of full ? kinds.keys() : [0,1,4]){
      const kind=kinds[index];
      await page.goto(route+index+'&diagramguardLanguage='+lang);
      await page.locator(`html[lang="${lang}"] #${lang==='ta'?'langTa':'langEn'}[aria-pressed="true"]`).waitFor({state:'attached'});
      await settle(page,percent);
      const chart=page.locator('.g10ch8-graphic[data-dg-ready]');
      await chart.waitFor();
      if(width===320&&percent===200&&kind==='scale'){
        await page.addStyleTag({content:'.g10ch8-graphic [data-dg-label] { font-family:monospace; letter-spacing:.19em }'});
        await chart.evaluate(svg=>{svg.style.width='calc(100% - 2px)';});
        await settle(page,percent);
      }
      const sliders=page.locator('.g10ch8-range');
      for(const [first,shift] of selections[kind]){
        for(const [control,value] of (kind==='scale' ? [first,shift] : [first]).entries()){
          await sliders.nth(control).evaluate((input,value)=>{
            input.value=String(value);
            input.dispatchEvent(new Event('input',{bubbles:true}));
          },value);
        }
        const chartData=await chart.evaluate(svg=>{
          const attr=(node,key)=>Number(node.getAttribute(key));
          const axis=svg.querySelector('.g10ch8-axis'), meanLine=svg.querySelector('.g10ch8-mean');
          const key=svg.parentElement.querySelector('.g10ch8-legend');
          const plotBounds=svg.getBoundingClientRect();
          const container=svg.closest('.g10ch8-lab').getBoundingClientRect();
          return {audit:window.TriggleDiagramGuard.audit(svg,{discover:true}),
            points:[...svg.querySelectorAll('.g10ch8-point')].map(dot=>[attr(dot,'cx'),attr(dot,'cy')]),
            axis:[attr(axis,'x1'),attr(axis,'x2')], mean:attr(meanLine,'x1'),
            key:key.textContent, keySize:parseFloat(getComputedStyle(key).fontSize),
            keyBelow:key.getBoundingClientRect().top>=svg.getBoundingClientRect().bottom-.5,
            overflow:Math.max(container.left-plotBounds.left,plotBounds.right-container.right,
              document.documentElement.scrollWidth-document.documentElement.clientWidth)};
        });
        const values=kind==='frequency' ? [4,4,4,...Array(first).fill(12)] :
          kind==='spread' ? [10-first,9,10,11,10+first] : [2,4,6,8].map(x=>first*x+shift);
        const [min,max]=kind==='frequency' ? [0,16] : kind==='spread' ? [0,20] : [-20,20];
        const mean=values.reduce((sum,x)=>sum+x,0)/values.length;
        const position=x=>chartData.axis[0]+(x-min)/(max-min)*(chartData.axis[1]-chartData.axis[0]);
        const config=`${lang} ${width}×${height} ${percent}% '${kind}' (${first}, ${shift})`;
        assert.deepEqual(chartData.audit.issues,[],config);
        assert.equal(chartData.audit.labels.length,5,config);
        chartData.audit.labels.forEach(label=>near(label.fontPx,.14*percent,.2));
        assert.equal(chartData.points.length,values.length,config);
        values.forEach((x,i)=>{
          const [actualX,actualY]=chartData.points[i];
          near(actualX,position(x));
          near(actualY,78-13*values.slice(0,i).filter(value=>value===x).length);
        });
        near(chartData.mean,position(mean));
        assert.equal(chartData.key,`${lang==='ta'?'சராசரி:':'Mean:'} ${String(Number(mean.toFixed(2))).replace('-','−')}`,config);
        near(chartData.keySize,.14*percent,.2);
        assert(chartData.keyBelow&&chartData.overflow<=1,config);
        checks++;
      }
    }
  }
  return checks;
}

async function converseProportionality(page,base,profiles){
  const values=[[.2,.8],[.8,.2],[.2,.2],[.8,.8],[.39,.4],[.4,.39],[.4,.62]];
  let checks=0;
  for(const [width,height] of profiles)for(const lang of ['en','ta'])for(const percent of [100,200]){
    await page.setViewportSize({width,height});
    await page.goto(base+concept(5));
    await setLanguage(page,lang);
    await settle(page,percent);
    const chart=page.locator('.g10ch4-lab svg[data-dg-ready]');
    await chart.waitFor();
    const preview=page.locator('.g10ch4-glance-visual');
    const caption=await preview.locator('.diagramguard-annotation').evaluate(el=>({overflow:el.scrollWidth-el.clientWidth,
      beneath:el.getBoundingClientRect().top>=el.previousElementSibling.getBoundingClientRect().bottom-.5,
      math:!!el.querySelector('.katex')}));
    assert(caption.overflow<=1&&caption.beneath&&caption.math,'Localized overview equation reflows outside the triangle');
    const sliders=page.locator('.g10ch4-slider');
    for(const [d,e] of [...values,[.4,.4]]){
      const snap=d===.4&&e===.4;
      if(snap)await page.locator('.g10ch4-lab .g10ch4-chip-btn').click();
      else for(const [i,value] of [d,e].entries())await sliders.nth(i).evaluate((input,value)=>{
        input.value=String(value);input.dispatchEvent(new Event('input',{bubbles:true}));
      },value);
      const result=await chart.evaluate(svg=>{
        const geometry=id=>svg.querySelector(`[data-dg-obstacle="${id}"]`);
        const coord=(node,names)=>names.map(key=>Number(node.getAttribute(key)));
        const triangle=Array.from(geometry('triangle').points,p=>[p.x,p.y]);
        const actual=coord(geometry('DE'),['x1','y1','x2','y2']);
        const reference=geometry('DF')?coord(geometry('DF'),['x1','y1','x2','y2']):null;
        return {triangle,actual,reference,audit:window.TriggleDiagramGuard.audit(svg,{discover:true})};
      });
      const context=`Converse of BPT ${lang} ${width}×${height} ${percent}% ${d}/${e}`;
      const [a,b,c]=result.triangle;
      const section=(p,fraction)=>p.map((value,i)=>a[i]+fraction*(value-a[i]));
      result.actual.forEach((coordinate,i)=>near(coordinate,[...section(b,d),...section(c,e)][i]));
      if(d===e){
        assert.equal(result.reference,null,context);
        near(result.actual[1],result.actual[3]);
      }else{
        near(result.reference[1],result.reference[3]);
        near(result.reference[3],section(c,d)[1]);
      }
      assert.deepEqual(result.audit.issues,[],context);
      assert.deepEqual(result.audit.labels.map(l=>l.id),d===e?['A','B','C','D','E']:['A','B','C','D','E','F'],context);
      result.audit.labels.forEach(label=>near(label.fontPx,.15*percent,.2));
      assert(Object.values(result.audit.horizontalClipping).every(px=>px<=.5),context+' visible drawing');
      checks++;
    }
  }
  return checks;
}

async function combinedSightLines(page,base,profiles){
  const route=base+'/index.html?class=10&chapter=g10-ch6&section=concepts&concept=9';
  let checks=0;
  for(const [width,height] of profiles)for(const lang of ['en','ta'])for(const percent of [100,200]){
    await page.setViewportSize({width,height});
    await page.goto(route);
    await setLanguage(page,lang);
    await settle(page,percent);
    const chart=page.locator('.g10ch4-svg[data-dg-ready]');
    const sliders=page.locator('.g10ch4-slider');
    for(const mode of [0,1,2]){
      await page.locator('.g10ch4-tab').nth(mode).click();
      for(const [a,b] of [[60,30],[30,65],[75,20],[45,45],[65,60]]){
        for(const [i,value] of [a,b].entries())await sliders.nth(i).evaluate((input,value)=>{
          input.value=String(value);input.dispatchEvent(new Event('input',{bubbles:true}));
        },value);
        await page.evaluate(async()=>{await new Promise(requestAnimationFrame);await new Promise(requestAnimationFrame);});
        const [alpha,beta]=await sliders.evaluateAll(inputs=>inputs.map(input=>Number(input.value)));
        const result=await chart.evaluate(svg=>{
          const node=id=>svg.querySelector(`[data-dg-obstacle="${id}"]`);
          const attr=(line,key)=>Number(line.getAttribute(key));
          const segment=id=>['x1','y1','x2','y2'].map(key=>attr(node(id),key));
          const key=svg.parentElement.querySelector('.diagramguard-coordinate-key');
          return {alpha:segment('alpha'),beta:segment('beta'),audit:window.TriggleDiagramGuard.audit(svg,{discover:true}),
            output:key.textContent,font:parseFloat(getComputedStyle(key).fontSize),
            overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth};
        });
        const test=`Combined sight lines ${lang} ${width}×${height} ${percent}% ${mode} ${alpha}°/${beta}°`;
        const currentAngle=([x,y,u,v])=>Math.atan2(Math.abs(v-y),Math.abs(u-x));
        near(currentAngle(result.alpha),alpha*Math.PI/180,1e-8);
        near(currentAngle(result.beta),beta*Math.PI/180,1e-8);
        assert.deepEqual(result.alpha.slice(0,2),result.beta.slice(0,2),test+' shared observation point');
        if(mode===0)assert(result.alpha[2]===result.beta[2]&&result.alpha[3]<result.alpha[1]&&result.beta[3]>result.beta[1],test);
        else if(mode===1)assert(alpha>beta&&result.alpha[2]>result.alpha[0]&&result.alpha[2]<result.beta[2],test);
        else assert(result.alpha[2]<result.alpha[0]&&result.beta[2]>result.beta[0],test);
        if(mode>0)assert.equal(result.alpha[3],result.beta[3],test+' same ground plane');
        assert(result.output.includes(`α = ${alpha}°`)&&result.output.includes(`β = ${beta}°`),test+' displayed values');
        assert.deepEqual(result.audit.issues,[],test);
        assert.equal(result.audit.labels.length,3,test);
        result.audit.labels.forEach(label=>near(label.fontPx,.15*percent,.2));
        near(result.font,.14*percent,.2);
        assert(result.overflow<=1,test);
        checks++;
      }
    }
  }
  return checks;
}

async function vennGeometry(page,base,profiles){
  const route=base+'/index.html?class=10&chapter=g10-ch8&section=concepts&concept=';
  const cases={union:['2, 4, 5, 6',['only-a','both','only-b']],intersection:['4, 6',['both']],
    onlyA:['2',['only-a']],onlyB:['5',['only-b']],neither:['1, 3',['outside']],complement:['1, 3, 5',['outside','only-b']]};
  let checks=0;
  for(const [width,height] of profiles)for(const lang of ['en','ta'])for(const percent of [100,200]){
    await page.setViewportSize({width,height});
    for(const index of [10,12,13]){
      await page.goto(route+index);
      await setLanguage(page,lang);
      await settle(page,percent);
      const chart=page.locator('.g10ch8-graphic[data-dg-ready]');
      await chart.waitFor();
      const control=page.locator('.g10ch8-control select');
      for(const [mode,[outcomes,regions]] of Object.entries(cases)){
        await control.selectOption(mode);
        await page.evaluate(async()=>{await new Promise(requestAnimationFrame);await new Promise(requestAnimationFrame);});
        const result=await chart.evaluate(svg=>{
          const circles=[...svg.querySelectorAll('.g10ch8-circle')];
          const interior=[...svg.querySelectorAll('path[data-region]')];
          const locations=[...svg.querySelectorAll('text[data-region-label]')].map(node=>{
            const p=new DOMPoint(Number(node.getAttribute('x')),Number(node.getAttribute('y')));
            return [node.dataset.regionLabel,circles.map(circle=>circle.isPointInFill(p)),
              interior.filter(path=>path.isPointInFill(p)).map(path=>path.dataset.region)];
          });
          const lab=svg.closest('.g10ch8-lab');
          const bounds=lab.getBoundingClientRect();
          const reaches=[svg,lab.querySelector('select'),lab.querySelector('.g10ch8-legend')].map(node=>{
            const box=node.getBoundingClientRect();
            return Math.max(bounds.left-box.left,box.right-bounds.right);
          });
          return {audit:window.TriggleDiagramGuard.audit(svg,{discover:true}),locations,
            highlights:[...svg.querySelectorAll('[data-region].is-selected')].map(node=>node.dataset.region),
            overflow:Math.max(...reaches,document.documentElement.scrollWidth-document.documentElement.clientWidth)};
        });
        const expected={a:[false,false],b:[false,false],sample:[false,false],outside:[false,false],
          'only-a':[true,false],both:[true,true],'only-b':[false,true]};
        const context=`Venn ${lang} ${width}×${height} ${percent}% concept ${index} ${mode}`;
        assert.deepEqual(result.audit.issues,[],context);
        assert.equal(result.audit.labels.length,7,context);
        assert(Object.values(result.audit.horizontalClipping).every(px=>px<=.5),context+' complete SVG visibility');
        result.audit.labels.forEach(label=>near(label.fontPx,.14*percent,.2));
        for(const [location,contained,inRegions] of result.locations){
          assert.deepEqual(contained,expected[location],context+' '+location);
          assert.deepEqual(inRegions,contained.some(Boolean)?[location]:[],context+' exact fill for '+location);
        }
        assert.deepEqual(result.highlights,regions,context);
        const readout=await page.locator('.g10ch8-result').textContent();
        assert(readout.includes(`{${outcomes}}`)&&readout.endsWith(outcomes.split(',').length+'/6'),context);
        assert(result.overflow<=1,context);
        checks++;
      }
    }
  }
  return checks;
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
        if(process.argv.includes('--boundaries-only')){
          await legacyBoundaryCases(page);
          return;
        }
        if(process.argv.includes('--angles-and-squares')){
          const cases=await trigAndBisectorGeometry(page,base,viewports);
          console.log(`DiagramGuard: ${cases} bilingual and responsive bisector, angle and square-area states`);
          return;
        }
        if(process.argv.includes('--synthetic-only')){
          await synthetic(page);
          await legacyMarkers(page);
          return;
        }
        if(process.argv.includes('--statistics')){
          const profiles=process.argv.includes('--mobile-only')?[[320,844]]:viewports;
          const checks=await statisticsPlotGeometry(page,base,profiles,true);
          console.log(`DiagramGuard: ${checks} bilingual and responsive statistics plot states`);
          return;
        }
        if(process.argv.includes('--sight-lines')){
          const checks=await sightLineGeometry(page,base,viewports);
          console.log(`DiagramGuard: ${checks} bilingual and responsive sight-line states`);
          return;
        }
        if(process.argv.includes('--venn')){
          const checks=await vennGeometry(page,base,viewports);
          console.log(`DiagramGuard: ${checks} bilingual and responsive probability Venn states`);
          return;
        }
        if(process.argv.includes('--combined-sight')){
          const checks=await combinedSightLines(page,base,viewports);
          console.log(`DiagramGuard: ${checks} bilingual and responsive combined sight-line states`);
          return;
        }
        if(process.argv.includes('--converse-bpt')){
          const checks=await converseProportionality(page,base,viewports);
          console.log(`DiagramGuard: ${checks} bilingual converse-proportionality states`);
          return;
        }
        if(width===390&&!live){
          await synthetic(page);
          await legacyMarkers(page);
          await legacyCases(page);
          await legacyBoundaryCases(page);
          await conceptBoundaries(page,base);
          await trigAndBisectorGeometry(page,base,[[320,844]]);
          await converseProportionality(page,base,[[320,844]]);
          await sightLineGeometry(page,base,[[320,844]]);
          await combinedSightLines(page,base,[[320,844]]);
          await statisticsPlotGeometry(page,base,[[320,844]]);
          await vennGeometry(page,base,[[320,844]]);
          await page.setViewportSize({width,height});
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
