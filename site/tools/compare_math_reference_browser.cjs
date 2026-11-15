'use strict';
/*
 * Grade 10 visual regression: exact *mathematics region* parity when color CSS is
 * unchanged; mathematical text, font styles and geometric parity when the
 * only intentional difference is the newly approved theme palette.
 * A colour change must not waive the typography/spacing invariants.
 */
const fs=require('fs/promises'),assert=require('node:assert/strict'),path=require('node:path');
const baseline=process.argv.find(s=>s.startsWith('--baseline='))?.slice(11);
if(!baseline)throw Error('Pass --baseline=/absolute/path/to/clean/main/checkout');
const {chromium}=require('playwright');
const after=require('./dashboard_test_support.cjs');
const before=require(path.resolve(baseline,'site/tools/dashboard_test_support.cjs'));
const palettePath='site/assets/paper-indigo.css';
const readOptional=async pathName=>fs.readFile(pathName,'utf8').catch(e=>e.code==='ENOENT'?'':Promise.reject(e));
async function main(){
 const [oldPalette,newPalette]=await Promise.all([
  readOptional(path.resolve(baseline,palettePath)),
  readOptional(path.resolve(palettePath))
 ]);
 const colorOnlyChange=oldPalette!==newPalette;
 const a=await before.server(),z=await after.server(),b=await chromium.launch(after.launchOptions());
 await fs.mkdir('screenshots/g9-typography',{recursive:true});
 try{
  for(const width of [320,393,430])for(const id of ['c10-1-ex1-1-q1-i','c10-8-ex8-1-q5']){
   const images=[],measurements=[];
   for(const [label,app] of [['baseline',a],['updated',z]]){
    const c=await b.newContext({viewport:{width,height:852},serviceWorkers:'block'}),p=await c.newPage();
    await p.goto(app.base+'/index.html?class=10&question='+id);
    assert.equal(new URL(p.url()).searchParams.get('question'),id,'Requested Grade 10 question loaded');
    await p.locator('#stepsList .katex').first().waitFor();
    await p.evaluate(async()=>{document.body.getBoundingClientRect();await document.fonts.ready;await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));});
    measurements.push(await p.evaluate(()=>{
      const root=document.querySelector('#lessonCard');
      const base=root.getBoundingClientRect();
      // Compare equation geometry relative to its own math region, not
      // vertical page placement affected by new navigation controls.
      const clean=s=>String(s).replace(/\s+/g,' ').trim();
      const elementData=el=>{
       const r=el.getBoundingClientRect(),cs=getComputedStyle(el),round=n=>Math.round(n*10)/10;
       const region=el.closest('#stepsList,#questionText')||el;
       const anchor=region===el?(el.id==='lessonCard'?base:r):region.getBoundingClientRect();
       return {x:round(r.x-anchor.x),y:round(r.y-anchor.y),w:round(r.width),h:round(r.height),
        font:cs.fontFamily,size:cs.fontSize,weight:cs.fontWeight,line:cs.lineHeight,
        spacing:cs.letterSpacing,scroll:el.scrollWidth,client:el.clientWidth};
      };
      const selectors=['#questionText','#stepsList',
       '#stepsList .worked-step','#stepsList .step-equation','#stepsList .katex',
       '#questionText .katex','#answerBox .katex','.final-answer-step'];
      const anchors=selectors.map(selector=>({
       selector,items:[...document.querySelectorAll(selector)].map(elementData)
      }));
      return {question:clean(document.querySelector('#questionText')?.textContent),
       steps:clean(document.querySelector('#stepsList')?.textContent),
       katex:[...document.querySelectorAll('#questionText .katex,#stepsList .katex')].map(e=>clean(e.textContent)),
       anchors};
    }));
    const file=path.resolve('screenshots/g9-typography')+'/g10-'+id+'-'+width+'-'+label+'.png';
    // Navigation labels intentionally differ: compare the actual question and
    // worked mathematics as pixel-identical regions, not changed navigation chrome.
    images.push({
     question:await p.locator('#questionText').screenshot({path:file.replace('.png','-question.png'),animations:'disabled'}),
     steps:await p.locator('#stepsList').screenshot({path:file.replace('.png','-steps.png'),animations:'disabled'})
    });
    await c.close();
   }
   if(!colorOnlyChange&&images[0].question.equals(images[1].question)&&images[0].steps.equals(images[1].steps)){
    console.log('PASS exact question and solution screenshot parity '+id+' '+width+'px');
   }else{
    // Different viewport raster origins can change anti-aliasing without
    // changing mathematical glyphs. Independently require exact text,
    // typography and all region-relative equation dimensions and positions.
    const original=measurements[0],modified=measurements[1];
    assert.equal(modified.question,original.question,'Original question text unchanged '+id+' '+width);
    assert.equal(modified.steps,original.steps,'Original solution text unchanged '+id+' '+width);
    assert.deepEqual(modified.katex,original.katex,'Every mathematical glyph unchanged '+id+' '+width);
    assert.deepEqual(modified.anchors.map(a=>a.selector),original.anchors.map(a=>a.selector));
    for(let k=0;k<original.anchors.length;k++){
     const orig=original.anchors[k],next=modified.anchors[k];
     assert.equal(next.items.length,orig.items.length,id+' '+width+' '+orig.selector+' count');
     for(let i=0;i<orig.items.length;i++){
      const x=orig.items[i],y=next.items[i];
      for(const key of ['font','size','weight','line','spacing']){
       assert.equal(y[key],x[key],id+' '+width+' '+orig.selector+'['+i+'] '+key);
      }
      for(const key of ['x','y','w','h','scroll','client']){
       assert.ok(Math.abs(y[key]-x[key])<=.6,
        id+' '+width+' '+orig.selector+'['+i+'] '+key+
        ': previous '+x[key]+', updated '+y[key]);
      }
     }
    }
    console.log('PASS Grade 10 mathematics text, fonts and region-relative layout '+id+' '+width+'px');
   }
  }
 }finally{await b.close();await a.close();await z.close();}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
