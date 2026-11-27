'use strict';
const assert = require('node:assert/strict');
const { chromium, webkit } = require('playwright');
const { server, launchOptions } = require('./dashboard_test_support.cjs');

// Source witnesses from the two 2025 SCERT editions, with independently computed feet.
const median = {points:{A:[6,2],B:[-5,-1],C:[1,9],D:[-2,4],E:[-13/17,103/17]},
  regions:['ABC'],guides:['AD'],edges:['AE'],angles:['AEC'],key:['A','B','C','D'],midpoints:['DBC']};
const junction = [-1/17,22/17];
const destination = [59/1445,1702/1445];
const targetPath = [6,-7,8];
const fixtures = new Map([
  ['ex5-3-q8',[{points:{P:[-6,-4],Q:[5,11]},edges:['PQ'],
    names:{en:{P:'Cat',Q:'Milk bottle'},ta:{P:'பூனை',Q:'பால் புட்டி'}}}]],
  ['ex5-3-q9-i',[median]], ['ex5-3-q9-ii',[median]],
  ['ex5-4-q7',[{points:{A:[-3,0],B:[10,-2],C:[12,3],D:[258/29,-138/29],E:[237/26,63/26]},
    regions:['ABC'],guides:['BD'],edges:['AD','BE'],angles:['ADB','BEC'],key:['A','B','C']}]],
  ['ex5-4-q8',[{points:{A:[-4,2],B:[6,-4],M:[1,-1]},edges:['AB'],midpoints:['MAB'],
    lines:{bisector:[5,-3,-8]},angles:[['A','M',[4,4]]],legend:['5x − 3y − 8 = 0']}]],
  ['unit-q1',[{points:{P:[-1,-1],Q:[-1,4],R:[5,4],S:[5,-1],A:[-1,1.5],B:[2,4],C:[5,1.5],D:[2,-1]},
    regions:['PQRS','ABCD'],midpoints:['APQ','BQR','CRS','DSP']}]],
  ['unit-q8',[{points:{P:[3,8],M:[1,2],Q:[-1,-4]},edges:['PQ'],midpoints:['MPQ'],
    lines:{mirror:[1,3,-7]},angles:[['P','M',[4,1]]],legend:['x + 3y = 7'],
    names:{en:{Q:'Image'},ta:{Q:'பிம்பம்'}}}]],
  ['unit-q10',[
    {points:{P:junction},key:[],xSpan:6,lines:{first:[2,-3,4],second:[3,4,-5],target:targetPath},dashedLines:['second'],
      legend:['2x − 3y + 4 = 0','3x + 4y − 5 = 0','6x − 7y + 8 = 0']},
    {points:{P:junction,H:destination},key:[],edges:['PH'],lines:{target:targetPath},
      angles:[['P','H',[1,2]]],legend:['6x − 7y + 8 = 0']}
  ]]
]);
const widths = [[320,844],[360,844],[375,812],[390,844],[412,915],[430,932],[768,1024],[1280,900],[667,375]];
const viewports = process.env.TRIGGLE_COORDINATE_SMOKE ? [widths[0],widths[3]] : widths;
const minus = (a,b) => a.map((n,i)=>n-b[i]);
const distance = (a,b) => Math.hypot(...minus(a,b));
const dot = (a,b) => a.reduce((sum,n,i)=>sum+n*b[i],0);
const number = value => String(value).replace('-','−');
const normalizedDot = (a,b) => dot(a,b)/(Math.hypot(...a)*Math.hypot(...b));
const near = (actual,expected,context) => assert(Math.abs(actual-expected)<1e-5,`${context}: ${actual} ≠ ${expected}`);

async function waitForText(page, percent) {
  await page.evaluate(async value=>{
    document.documentElement.style.fontSize=value+'%';
    await document.fonts.ready;
    for(let frame=0;frame<3;frame++)await new Promise(requestAnimationFrame);
  },percent);
}

async function verify(container, expected, lang, percent, context) {
  const figures=container.locator('svg.diagramguard-coordinate[data-dg-ready]');
  await figures.nth(expected.length-1).waitFor();
  const panels=await figures.evaluateAll(nodes=>nodes.map(svg=>{
    const xy=(el,attributes)=>attributes.map(key=>Number(el.getAttribute(key)));
    const lines=selector=>Object.fromEntries([...svg.querySelectorAll(selector)].map(el=>[
      el.dataset.dgAnalyticLine||el.dataset.dgEdge,xy(el,['x1','y1','x2','y2'])
    ]));
    const axes=svg.querySelector('[data-dg-obstacle="X-axis"]');
    const box=svg.getBoundingClientRect(),view=svg.viewBox.baseVal;
    return {
      audit:window.TriggleDiagramGuard.audit(svg,{discover:true}),
      points:Object.fromEntries([...svg.querySelectorAll('[data-dg-point]')].map(p=>[p.dataset.dgPoint,xy(p,['cx','cy'])])),
      positions:Object.fromEntries([...svg.querySelectorAll('text[data-dg-label]')].map(t=>[t.dataset.dgLabel,xy(t,['x','y'])])),
      regions:Object.fromEntries([...svg.querySelectorAll('[data-dg-region]')].map(el=>[
        el.dataset.dgRegion,el.getAttribute('points').split(' ').map(p=>p.split(',').map(Number))
      ])),
      guides:[...svg.querySelectorAll('[data-dg-edge][stroke-dasharray]')].map(el=>el.dataset.dgEdge),
      edges:lines('[data-dg-edge]'),analytic:lines('[data-dg-analytic-line]'),
      dashedLines:[...svg.querySelectorAll('[data-dg-analytic-line][stroke-dasharray]')].map(el=>el.dataset.dgAnalyticLine),
      angles:[...svg.querySelectorAll('[data-dg-obstacle^="right-angle"]')].map(el=>
        el.getAttribute('points').split(' ').map(p=>p.split(',').map(Number))),
      xSpan:axes?Number(axes.getAttribute('x2'))-Number(axes.getAttribute('x1')):null,
      imageName:svg.getAttribute('aria-label'),
      aspect:[box.width/view.width,box.height/view.height],
      overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth
    };
  }));
  const metadata=await container.locator('.diagramguard-figure').evaluate(host=>[...host.children].flatMap(node=>{
    if(!node.matches('.diagramguard-coordinate-key,.diagramguard-coordinate-legend'))return [];
    return [{kind:node.className,entries:[...node.children].map(entry=>entry.textContent),
      dashes:[...node.children].map(entry=>!!entry.querySelector('[data-dashed]')),overflow:node.scrollWidth-node.clientWidth}];
  }));
  assert.equal(panels.length,expected.length,context);
  let nextMetadata=0;
  for(const [i,model] of expected.entries()) {
    const panel=panels[i], tag=context+' panel '+(i+1);
    assert(panel.audit.measured && panel.overflow<=1,tag+' measured and fits');
    assert.deepEqual(panel.audit.issues,[],tag+' collisions');
    assert.deepEqual(panel.audit.unmeasured,[],tag+' every obstacle measured');
    assert(panel.imageName.length>11&&(lang==='en'||/[\u0B80-\u0BFF]/.test(panel.imageName)),tag+' localized SVG name');
    assert(Math.abs(panel.aspect[0]-panel.aspect[1])<.005,tag+' aspect');
    const entries=Object.entries(model.points);
    const [[first,a],second]=entries;
    const origin=panel.points[first];
    const scale=model.xSpan?panel.xSpan/model.xSpan:distance(origin,panel.points[second[0]])/distance(a,second[1]);
    const project=([x,y])=>[origin[0]+(x-a[0])*scale,origin[1]-(y-a[1])*scale];
    for(const [id,source] of entries){
      const point=panel.points[id], label=panel.positions[id];
      near(distance(point,project(source)),0,tag+' coordinate '+id);
      const gap=distance(point,label);
      const alternative=Math.min(...entries.filter(([name])=>name!==id).map(([name])=>distance(label,panel.points[name])));
      assert(gap<=31*percent/100 && gap<=alternative+3*percent/100,tag+' label association '+id+' gap '+gap.toFixed(2));
    }
    assert.deepEqual(Object.keys(panel.regions),model.regions||[],tag+' polygon orders');
    for(const [names,vertices] of Object.entries(panel.regions))
      [...names].forEach((id,j)=>near(distance(vertices[j],panel.points[id]),0,tag+' ordered vertex '+id));
    for(const edge of [...(model.edges||[]),...(model.guides||[])]){
      const [x,y,u,v]=panel.edges[edge];
      near(distance([x,y],panel.points[edge[0]]),0,tag+' construction start '+edge);
      near(distance([u,v],panel.points[edge[1]]),0,tag+' construction end '+edge);
    }
    assert.deepEqual(panel.guides,model.guides||[],tag+' auxiliary lines');
    assert.deepEqual(Object.keys(panel.analytic),Object.keys(model.lines||{}),tag+' analytic lines');
    assert.deepEqual(panel.dashedLines,model.dashedLines||[],tag+' patterned lines');
    for(const [name,[aCoef,bCoef,c]] of Object.entries(model.lines||{})){
      const [x,y,u,v]=panel.analytic[name];
      for(const [px,py] of [[x,y],[u,v]]){
        const actualX=a[0]+(px-origin[0])/scale;
        const actualY=a[1]-(py-origin[1])/scale;
        near(aCoef*actualX+bCoef*actualY+c,0,tag+' line equation '+name);
      }
    }
    for(const [mid,start,end] of model.midpoints||[]){
      const midpoint=panel.points[start].map((n,index)=>(n+panel.points[end][index])/2);
      near(distance(midpoint,panel.points[mid]),0,tag+' midpoint '+mid);
    }
    const angles=model.angles||[];
    assert.equal(panel.angles.length,angles.length,tag+' right-angle marker count');
    for(const [j,refs] of angles.entries()){
      const [a,vertex,b]=[...refs].map(ref=>Array.isArray(ref)?project(ref):panel.points[ref]);
      const [first,corner,last]=panel.angles[j];
      near(normalizedDot(minus(a,vertex),minus(b,vertex)),0,tag+' perpendicular lines');
      near(normalizedDot(minus(first,corner),minus(last,corner)),0,tag+' square marker');
      near(normalizedDot(minus(first,vertex),minus(b,vertex)),0,tag+' marker starts on its side');
      near(normalizedDot(minus(last,vertex),minus(a,vertex)),0,tag+' marker ends on its side');
    }
    for(const {fontPx} of panel.audit.labels)
      assert(Math.abs(fontPx-15*percent/100)<.2,tag+' displayed font '+fontPx);
    const key=model.key||Object.keys(model.points);
    if(key.length){
      const data=metadata[nextMetadata++];
      assert.equal(data.kind,'diagramguard-coordinate-key',tag);
      assert.deepEqual(data.entries,key.map(id=>{
        const [x,y]=model.points[id];
        const name=model.names?.[lang][id];
        return `${id}${name?' · '+name:''} (${number(x)}, ${number(y)})`;
      }),tag+' coordinate key and reading order');
      assert(data.overflow<=1,tag+' key reflow');
    }
    if(model.legend){
      const data=metadata[nextMetadata++];
      assert.equal(data.kind,'diagramguard-coordinate-legend',tag);
      assert.deepEqual(data.entries,model.legend,tag+' legend');
      assert.deepEqual(data.dashes,Object.keys(model.lines).map(id=>!!model.dashedLines?.includes(id)),tag+' legend patterns');
      assert(data.overflow<=1,tag+' legend reflow');
    }
  }
  assert.equal(nextMetadata,metadata.length,context+' metadata blocks');
  return panels.length;
}

async function main(){
  const useWebKit=process.argv.includes('--webkit');
  const live=process.env.TRIGGLE_COORDINATE_BASE;
  const app=live?{base:live.replace(/\/$/,''),close:async()=>{}}:await server();
  let browser;
  let count=0;
  try{
    browser=await (useWebKit?webkit.launch():chromium.launch(launchOptions()));
    const page=await browser.newPage({viewport:{width:390,height:844},serviceWorkers:'block'});
    const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    for(const [id,panels] of fixtures){
      if(process.env.TRIGGLE_COORDINATE_QUESTION&&id!==process.env.TRIGGLE_COORDINATE_QUESTION)continue;
      await page.goto(app.base+'/index.html?class=10&question=c10-5-'+id);
      for(const lang of ['en','ta']){
        await page.locator(lang==='en'?'#langEn':'#langTa').evaluate(button=>button.click());
        for(const [width,height] of viewports){
          await page.setViewportSize({width,height});
          for(const percent of [100,200]){
            const context=[id,lang,width+'×'+height,percent+'%'].join(' ');
            await waitForText(page,percent);
            count+=await verify(page.locator('#inlineFigureVisual'),panels,lang,percent,context+' inline');
            await page.locator('#inlineFigureOpen').click();
            await waitForText(page,percent);
            const dialog=page.locator('#figureDialog');
            assert(await dialog.locator('#closeDiagram').evaluate(button=>document.activeElement===button),context+' opening focus');
            count+=await verify(dialog.locator('.diagram-content'),panels,lang,percent,context+' enlarged');
            if(width===320) {
              const svg=dialog.locator('.diagramguard-coordinate').first();
              if(percent===100)await svg.evaluate(node=>node.setAttribute('data-reopen-test',''));
              else assert.equal(await svg.getAttribute('data-reopen-test'),'',context+' existing SVG is reused');
            }
            if(panels.length>1 && percent===200 && (width===320||height===375)) {
              const visible=await dialog.evaluate(dialog=>{
                const header=dialog.querySelector('.dialog-header');
                const before=header.getBoundingClientRect().top;
                const last=Array.from(dialog.querySelectorAll('.diagramguard-coordinate')).at(-1);
                dialog.scrollTop+=last.getBoundingClientRect().bottom-dialog.getBoundingClientRect().bottom+6;
                const box=last.getBoundingClientRect();
                const hit=document.elementFromPoint(box.left+box.width/2,box.bottom-3);
                return Math.abs(header.getBoundingClientRect().top-before)<=1 && !!hit && last.parentElement.contains(hit);
              });
              assert(visible,context+' fixed heading and reachable close-up');
            }
            await page.keyboard.press('Escape');
            await page.waitForFunction(()=>document.activeElement?.id==='inlineFigureOpen');
          }
        }
      }
    }
    assert.deepEqual(errors,[]);
    console.log(`PASS Grade 10 equation and construction diagrams in ${useWebKit?'WebKit':'Chromium'} (${count} bilingual renderings)`);
  }finally{await browser?.close();await app.close();}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
