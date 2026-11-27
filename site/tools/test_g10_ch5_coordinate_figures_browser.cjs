'use strict';
const assert = require('node:assert/strict');
const { chromium, webkit } = require('playwright');
const { server, launchOptions } = require('./dashboard_test_support.cjs');

// Independent expectations from the 2025 SCERT books, English pp. 212, 220–221 and Tamil pp. 218–219, 227–228.
const shared = { A:[-5,3], B:[-4,-2], C:[2,-1], D:[1,3], E:[1.5,1], F:[-2,3], G:[-4.5,.5] };
const fixtures = [
  ['q5-i', { A:[-9,-2], B:[-8,-4], C:[1,-3], D:[2,2] }, { ABCD:35 }],
  ['q5-ii', { A:[-9,0], B:[-6,-3], C:[-1,-2], D:[-8,6] }, { ABCD:34 }],
  ['q8', { A:[7,7], B:[15,7], C:[12,1], P:[11,7], Q:[13.5,4], R:[9.5,4] }, { ABC:24, PQR:6 }],
  ['q9', { A:[-4,-8], B:[8,-4], C:[6,10], D:[-10,6], E:[-3,-5], F:[6,-2], G:[3,7], H:[-6,4] }, { ABCD:212, EFGH:90 }],
  ['q11-i', shared, { ABCD:27.5, AGF:3.75 }],
  ['q11-ii', shared, { ABCD:27.5, FED:3 }],
  ['q11-iii', shared, { ABCD:27.5, BCEG:13.875 }],
  ['q9-i',{A:[1,-4],B:[2,-3],C:[4,-7]},{ABC:3},{exercise:2,rightAngle:'BAC'}],
  ['q9-ii',{L:[0,5],M:[9,12],N:[3,14]},{LMN:30},{exercise:2,rightAngle:'LNM'}],
  ['q10',{A:[2.5,3.5],B:[10,-4],C:[2.5,-2.5],D:[-5,5]},{ABCD:45},{exercise:2}],
  ['q12',{A:[3,-4],B:[9,-4],C:[5,-7],D:[7,-7]},{ABDC:12},{exercise:2,solutionOnly:true,crossing:[6,-25/4]}],
  ['q13',{A:[-4,-2],B:[5,-1],C:[6,5],D:[-7,6],P:[.5,-1.5],Q:[5.5,2],R:[-.5,5.5],S:[-5.5,2]},
    {ABCD:77,PQRS:38.5},{exercise:2,axisLabels:['X','Y'],midpoints:['PAB','QBC','RCD','SDA']}]
];
const responsive = [[320,844],[360,844],[375,844],[390,844],[412,844],[430,844],[768,1024],[1280,900],[667,375]];
const viewports = process.env.TRIGGLE_COORDINATE_SMOKE ? [[320,844],[390,844]] : responsive;
const route = (id,exercise) => `/index.html?class=10&chapter=g10-ch5&question=c10-5-ex5-${exercise}-${id}`;
const accessibleKey = {en:'Coordinates',ta:'ஆயத்தொலைகள்'};
const number = value => String(value).replace('-','−');
const distance = (a,b) => Math.hypot(a[0]-b[0],a[1]-b[1]);
const subtract = (a,b) => a.map((value,index)=>value-b[index]);
const dot = (a,b) => a.reduce((sum,value,index)=>sum+value*b[index],0);
const area = points => Math.abs(points.reduce((sum,p,index)=>{
  const q=points[(index+1)%points.length];
  return sum+p[0]*q[1]-p[1]*q[0];
},0))/2;
const near = (actual,expected,context) =>
  assert(Math.abs(actual-expected)<1e-4,`${context} ${actual} ≠ ${expected}`);

async function settle(page, percent) {
  await page.evaluate(async percent=>{
    document.documentElement.style.fontSize=percent+'%';
    await document.fonts.ready;
    for (let i=0;i<3;i++) await new Promise(requestAnimationFrame);
  },percent);
}

async function verify(container, points, regions, options, lang, percent, context) {
  const svg = container.locator('svg.diagramguard-coordinate[data-dg-ready]');
  await svg.waitFor();
  const actual = await svg.evaluate(svg=>{
    const audit=window.TriggleDiagramGuard.audit(svg,{discover:true});
    const point=el=>[Number(el.getAttribute('cx')),Number(el.getAttribute('cy'))];
    const key=svg.parentElement.querySelector('.diagramguard-coordinate-key');
    const children=[...key.children];
    const labels=[...svg.querySelectorAll('text')];
    const box=svg.getBoundingClientRect();
    const keyBox=key.getBoundingClientRect();
    const angle=svg.querySelector('[data-dg-obstacle="right-angle"]');
    const crossing=svg.querySelector('[data-dg-construction-point="crossing"]');
    return {
      audit, desc:svg.getAttribute('aria-label'),
      plot:Object.fromEntries([...svg.querySelectorAll('[data-dg-point]')].map(el=>[el.dataset.dgPoint,point(el)])),
      regions:Object.fromEntries([...svg.querySelectorAll('[data-dg-region]')].map(el=>[
        el.dataset.dgRegion,Array.from(el.points,p=>[p.x,p.y])
      ])),
      segments:[...svg.querySelectorAll('[data-dg-edge]')].map(el=>el.dataset.dgEdge),
      dashed:[...svg.querySelectorAll('[data-dg-edge][stroke-dasharray]')].map(el=>el.dataset.dgEdge),
      angle:angle?angle.getAttribute('points').split(' ').map(pair=>pair.split(',').map(Number)):null,
      crossing:crossing?point(crossing):null,
      labelCenters:Object.fromEntries(labels.map(el=>{
        const b=el.getBBox();
        return [el.dataset.dgLabel,[b.x+b.width/2,b.y+b.height/2]];
      })),
      keyLabel:key.getAttribute('aria-label'), keyEntries:children.map(el=>el.textContent),
      keyFont:parseFloat(getComputedStyle(key).fontSize),
      keyBelow:keyBox.top>=box.bottom-.5, keyOverflow:key.scrollWidth-key.clientWidth,
      titleClear:!svg.closest('dialog')||svg.closest('dialog').querySelector('.dialog-header')
        .getBoundingClientRect().bottom<=box.top+.5,
      pageOverflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,
      aspect:[box.width/svg.viewBox.baseVal.width,box.height/svg.viewBox.baseVal.height]
    };
  });
  assert(actual.audit.measured, context);
  assert.deepEqual(actual.audit.issues,[], context+' collisions');
  assert.deepEqual(actual.audit.unmeasured,[],context+' unmeasured obstacles');
  assert.equal(actual.keyLabel,accessibleKey[lang],context);
  assert.deepEqual(actual.keyEntries,Object.entries(points).map(([id,[x,y]])=>`${id} (${number(x)}, ${number(y)})`));
  assert(actual.desc.length>15 && (lang==='en'||/[\u0B80-\u0BFF]/.test(actual.desc)),context+' localized description');
  assert(actual.keyBelow && actual.keyOverflow<=1 && actual.pageOverflow<=1 && actual.titleClear,context+' reflow');
  near(actual.keyFont,14*percent/100,context+' key font');
  assert(Math.abs(actual.aspect[0]-actual.aspect[1])<.005,context+' viewport aspect');
  const entries=Object.entries(points);
  const [[first,a],[second,b]]=entries;
  const scale=distance(actual.plot[first],actual.plot[second])/distance(a,b);
  for (const [id,source] of entries) {
    const [x,y]=actual.plot[id];
    near(x-actual.plot[first][0],(source[0]-a[0])*scale,context+' source X '+id);
    near(y-actual.plot[first][1],-(source[1]-a[1])*scale,context+' source Y '+id);
    const separation=distance(actual.labelCenters[id],[x,y]);
    assert(separation<=31*percent/100,context+' label distance '+id+' '+separation);
    for (const [other] of entries.filter(([name])=>name!==id)) {
      assert(separation<=distance(actual.labelCenters[id],actual.plot[other])+2,
        context+' label '+id+' sits closer to '+other+' ('+separation.toFixed(2)+')');
    }
  }
  for (const [name,expectedArea] of Object.entries(regions)) {
    const polygon=actual.regions[name];
    assert.equal(polygon.length,name.length,context);
    [...name].forEach((id,index)=>near(distance(polygon[index],actual.plot[id]),0,context+' polygon '+name+' '+id));
    near(area(polygon)/scale**2,expectedArea,context+' area '+name);
  }
  const midpoints=options.midpoints||(actual.plot.P?['PAB','QBC','RAC']:[]);
  for (const [mid,id1,id2] of midpoints)
    [0,1].forEach(i=>near(2*actual.plot[mid][i],actual.plot[id1][i]+actual.plot[id2][i],context+' midpoint '+mid));
  if (options.rightAngle) {
    const [a,o,b]=[...options.rightAngle].map(id=>actual.plot[id]);
    const [start,corner,end]=actual.angle;
    near(dot(subtract(a,o),subtract(b,o)),0,context+' perpendicular sides');
    near(dot(subtract(start,corner),subtract(end,corner)),0,context+' right-angle marker');
    near(dot(subtract(start,o),subtract(b,o)),0,context+' marker starts along side');
    near(dot(subtract(end,o),subtract(a,o)),0,context+' marker ends along side');
  }
  if (options.crossing) {
    const [x,y]=options.crossing;
    const projected=[actual.plot[first][0]+(x-a[0])*scale,actual.plot[first][1]-(y-a[1])*scale];
    near(distance(actual.crossing,projected),0,context+' crossed sides meet at the source-derived point');
    assert.deepEqual(actual.dashed.sort(),['BC','DA'],context+' printed order edges are dashed');
  }
  if (actual.plot.G && !actual.plot.H) {
    const edges=actual.segments.map(name=>[...name].sort().join(''));
    for (const edge of ['AB','BC','CD','AD','FG','EF','EG']) assert(edges.includes(edge),context+' partition '+edge);
  }
  const axisLabels = options.axisLabels||(options.exercise===2 ? ['X','X′','Y','Y′'] :
    actual.plot.H ? [] : actual.plot.P ? ['X'] : actual.plot.G ? ['X','Y'] : ['X','Y','O']);
  assert.deepEqual(actual.audit.labels.map(({id})=>id).sort(),[...Object.keys(points),...axisLabels].sort(),context+' label coverage');
  for (const {id,fontPx} of actual.audit.labels)
    assert(Math.abs(fontPx-15*percent/100)<.2,context+` ${id} is ${fontPx}px`);
}

async function main() {
  const isWebKit=process.argv.includes('--webkit');
  const live=process.env.TRIGGLE_COORDINATE_BASE;
  const app=live ? {base:live.replace(/\/$/,''),close:async()=>{}} : await server();
  let browser;
  let count=0;
  try {
    browser=await (isWebKit?webkit:chromium).launch(isWebKit?{headless:true}:launchOptions());
    const page=await browser.newPage({viewport:{width:390,height:844},serviceWorkers:'block'});
    page.setDefaultTimeout(10000);
    for (const [id,points,regions,options={}] of fixtures) {
      if (process.env.TRIGGLE_COORDINATE_QUESTION && id!==process.env.TRIGGLE_COORDINATE_QUESTION) continue;
      await page.goto(app.base+route(id,options.exercise||1));
      for (const lang of ['en','ta']) {
        if (await page.locator('html').getAttribute('lang')!==lang)
          await page.locator(lang==='ta'?'#langTa':'#langEn').evaluate(button=>button.click());
        await page.waitForFunction(lang=>document.documentElement.lang===lang,lang);
        for (const [width,height] of viewports) {
          await page.setViewportSize({width,height});
          for (const percent of [100,200]) {
            await settle(page,percent);
            const names=[`5.${options.exercise||1}-${id}`,lang,width+'×'+height,percent+'%'];
            if(options.solutionOnly) assert(await page.locator('#inlineFigure').isHidden(),names.join(' ')+' figure only in dialog');
            else {
              await verify(page.locator('#inlineFigureVisual'),points,regions,options,lang,percent,[...names,'inline'].join(' '));
              count++;
            }
            const expand=page.locator(options.solutionOnly?'#figureBtn':'#inlineFigureOpen');
            await expand.click();
            await settle(page,percent);
            const dialog=page.locator('#figureDialog');
            assert(await dialog.locator('#closeDiagram').evaluate(node=>document.activeElement===node),'dialog focuses close');
            await verify(dialog.locator('.diagram-content'),points,regions,options,lang,percent,[...names,'enlarged'].join(' '));
            await page.keyboard.press('Escape');
            await page.waitForFunction(id=>document.activeElement?.id===id,options.solutionOnly?'figureBtn':'inlineFigureOpen');
            count++;
          }
        }
      }
    }
    console.log(`PASS Grade 10 coordinate figures in ${isWebKit?'WebKit':'Chromium'} (${count} bilingual renderings)`);
  } finally {
    await browser?.close();
    await app.close();
  }
}
main().catch(error=>{console.error(error);process.exitCode=1;});
