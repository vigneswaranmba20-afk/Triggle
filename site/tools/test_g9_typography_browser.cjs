'use strict';
// Every student-visible record, every requested Android width, both languages.
// Verify the exact authored fallback at every surface, even on prose-only MCQs.
const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path');
const {chromium}=require('playwright'),{server,launchOptions}=require('./dashboard_test_support.cjs');
const {load}=require('./build_g9_math.cjs');
const {applyReviewedRealNumbers}=require('./test_g9_ch2_frontier.cjs');
const {applyReviewedAlgebra}=require('./test_g9_tamil_working.cjs');
const {applyStatisticsTables}=require('./test_g9_statistics_frontier.cjs');
const {applyFrontierGraphs}=require('./test_g9_frontier_graphs.cjs');
const records=applyFrontierGraphs(applyStatisticsTables(applyReviewedAlgebra(applyReviewedRealNumbers(load())))),widths=[320,360,393,430],samples=new Map(records.map(q=>[q.chapter,q.id]));
const normalize=s=>String(s??'').replace(/\s+/g,' ').trim();
const plain=value=>Array.isArray(value)?value.map(plain).join(''):value?.fallback??value;
async function inspect(page,q,lang){
 const state=await page.evaluate(({q,lang})=>{
  const override=window.TriggleG9Ch5Overrides?.get(q.id)||null;
  const p=override||(q.notationSource==='authored'?q:window.TriggleG9Math.get(q))||q;
  const sourcePrompt=q.dataTable?.sourcePrompt?.[lang];
  const count=v=>Array.isArray(v)?v.reduce((n,x)=>n+count(x),0):v?.questionOption?count(v.questionOption):v?.latex?1:0;
  const fallback=selector=>{const el=document.querySelector(selector)?.cloneNode(true);if(!el)return null;
   el.querySelectorAll('.triggle-tex').forEach(math=>math.replaceWith(document.createTextNode(math.dataset.mathFallback)));
   el.querySelectorAll('math.triggle-math[aria-label]').forEach(math=>math.replaceWith(document.createTextNode(math.getAttribute('aria-label'))));
   const raised={'0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹','n':'ⁿ','k':'ᵏ'};
   el.querySelectorAll('sup').forEach(sup=>sup.replaceWith(document.createTextNode([...sup.textContent].map(c=>raised[c]||c).join(''))));
   el.querySelectorAll('details,.triggle-mcq-choices,.triggle-mcq-feedback').forEach(d=>d.remove());
   if(sourcePrompt)el.querySelector('.triggle-table-wrap')?.replaceWith(' ');
   return el.textContent;
  };
  const legacyHint=window.TriggleWhyStepG9.hints[q.id];
  const hints=[...document.querySelectorAll('#stepsList details.why-step-g9')].map(detail=>{
   const step=q.steps[Number(detail.dataset.step)-1];
   return q.geometryConcept!==undefined||q.realConcept!==undefined?step?.why:
    (sourcePrompt||q.graphSolution)&&legacyHint?.step!==Number(detail.dataset.step)-1?step?.why:legacyHint;
  });
  const hintCount=hints.reduce((n,hint)=>n+count(hint?window.TriggleG9Math.text(hint[lang]||hint.en):null),0);
  const choices=q.choices?.reduce((n,choice)=>n+count(choice[lang]||choice.en),0)||0;
  const question=sourcePrompt?count(sourcePrompt.before)+count(sourcePrompt.after):count(p.questionMath?.[lang]||p.questionMath?.en);
  const tableCount=sourcePrompt?q.dataTable.rows.flat().reduce((total,cell)=>total+Number(!!cell?.latex||/^\d+(?:\.\d+)?$/.test(String(cell))),0):0;
  const expected=hintCount+choices+question+tableCount+
   count(q.answerMath?.[lang]||p.answerMath?.[lang]||p.answerMath)+p.steps.reduce((n,s,i)=>n+
   count((lang==='ta'&&(override||q).steps[i].mathTa)||s.math)+count(s.reasonMath?.[lang]||s.reasonMath?.en),0);
  const rendered=document.querySelectorAll('#questionText .katex,#stepsList .katex').length;
  const formulas=[...document.querySelectorAll('#questionText .triggle-tex,#stepsList .triggle-tex')].map(el=>{
   const visual=el.querySelector('.katex-html');
   const {top}=el.getBoundingClientRect();
   const height=el.clientHeight, width=el.clientWidth, scroll=el.scrollWidth;
   const scrolls=scroll>width+1;
   // The outer KaTeX line box can fit even when a raised glyph or a
   // denominator extends past it. Inspect the actual boxes inside scrollers.
   let glyphOverhang=0;
   if(scrolls){
    for(const node of visual.querySelectorAll('span, svg')){
     if(node.children.length||(!node.textContent.trim()&&!node.matches('svg,.frac-line')))continue;
     const glyph=node.getBoundingClientRect();
     glyphOverhang=Math.max(glyphOverhang,top-glyph.top,glyph.bottom-top-height);
    }
   }
   return {height,glyphHeight:visual.getBoundingClientRect().height,scrolls,tab:el.tabIndex,
    mathml:!!el.querySelector('math'),overflowY:getComputedStyle(el).overflowY,glyphOverhang,
    fallback:el.dataset.mathFallback};
  });
  return {expected,rendered,width:innerWidth,pageWidth:document.documentElement.scrollWidth,
   errors:document.querySelectorAll('[data-math-error]').length,
   question:fallback('#questionText'),answer:fallback('.final-answer-value'),
   steps:[...document.querySelectorAll('#stepsList li.worked-step:not(.final-answer-step)')].map((li,i)=>({reason:fallback('#stepsList li.worked-step:nth-child('+(i+1)+') .step-reason'),eq:fallback('#stepsList li.worked-step:nth-child('+(i+1)+') .step-equation')})),
   formulas,override};
 },{q,lang});
 const refQ=state.override||q;
 const label=q.id+' '+lang+' '+state.width;
 assert.equal(state.errors,0,label+' no renderer fallback');
 assert.equal(state.rendered,state.expected,label+' every authored formula renders exactly once');
 const sourcePrompt=refQ.dataTable?.sourcePrompt?.[lang];
 const question=sourcePrompt?[sourcePrompt.before,sourcePrompt.after].map(plain).join(' '):refQ.q[lang]||refQ.q.en;
 assert.equal(normalize(state.question),normalize(question),label+' question wording');
 const reviewedAnswer=(refQ.chapter==='2'||sourcePrompt)&&refQ.answerMath?.[lang];
 assert.equal(normalize(state.answer),normalize(reviewedAnswer?plain(reviewedAnswer):
  refQ.answer?.[lang]||(lang==='ta'&&(refQ.chapter==='5'||refQ.answerMath?.ta)?refQ.answerTa:null)||refQ.answer),label+' final answer');
 assert.equal(state.steps.length,refQ.steps.length,label+' all steps retained');
 state.steps.forEach((s,i)=>{
  const step=refQ.steps[i];
  const expectedEquation=lang==='ta'&&step.mathTa
   ?[step.mathTa].flat().map(part=>typeof part==='string'?part:part.fallback).join('')
   :step.eq;
  assert.equal(normalize(s.reason),normalize(step[lang]||step.en),label+' reason '+i);
  assert.equal(normalize(s.eq),normalize(expectedEquation),label+' equation '+i);
 });
 assert.equal(state.width,page.viewportSize().width,label+' viewport stays at its requested mobile width');
 assert(state.pageWidth<=state.width+1,label+' no page overflow');
 for(const f of state.formulas){
  assert(f.mathml,label+' semantic MathML');
  assert(f.height+1>=f.glyphHeight,label+' no glyph clipping');
  if(f.scrolls){
   assert.equal(f.tab,0,label+' keyboard-scrollable expression');
   assert(f.glyphOverhang<=2,label+' room for the glyphs in '+f.fallback+' ('+f.glyphOverhang+'px outside)');
  }else{
   assert.equal(f.overflowY,'visible',label+' no vertical clipping for fitting expression '+f.fallback);
  }
 }
 if(q.id==='c9-exercise-6-2-q1-iii'&&state.width===320){
  const identity=await page.locator('#questionText .triggle-tex').evaluate(el=>{
   const terms=[...el.querySelectorAll('.katex-html > .base')];
   const first=terms[0].getBoundingClientRect();
   const last=terms.at(-1).getBoundingClientRect();
   return {wraps:last.top>=first.bottom-1, fits:el.scrollWidth<=el.clientWidth+1, tab:el.tabIndex};
  });
  assert.deepEqual(identity,{wraps:true,fits:true,tab:-1},label+' whole identity is readable across two lines');
 }
 return state.formulas.length;
}
(async()=>{
 const app=await server(),browser=await chromium.launch(launchOptions()),errors=[];
 const output=path.resolve('screenshots/g9-typography');await fs.mkdir(output,{recursive:true});
 try{
  const results=await Promise.all(widths.map(async width=>{
   const context=await browser.newContext({viewport:{width,height:852},isMobile:true,hasTouch:true,serviceWorkers:'block'}),page=await context.newPage();let formulas=0;
   page.on('pageerror',e=>errors.push(e.message));
   try{let done=0,lastChapter=null;for(const q of records){
    const route=app.base+'/index.html?class=9&question='+encodeURIComponent(q.id);
    if(lastChapter!==q.chapter){await page.goto(route);lastChapter=q.chapter;}
    else await page.evaluate(url=>{history.pushState({},'',url);dispatchEvent(new PopStateEvent('popstate'));},route);
    assert.equal(new URL(page.url()).searchParams.get('question'),q.id,'Requested question loaded');
    await page.evaluate(()=>document.fonts.ready);await page.evaluate(()=>window.TriggleNotation.prepare(document));
    formulas+=await inspect(page,q,'en');
    await page.evaluate(()=>document.querySelector('#langTa').click());await page.evaluate(()=>window.TriggleNotation.prepare(document));
    formulas+=await inspect(page,q,'ta');
    await page.evaluate(()=>document.querySelector('#langEn').click());
    if(++done%75===0)console.log('Progress '+width+'px: '+done+'/'+records.length+' questions in both languages');
    if(width===393&&samples.get(q.chapter)===q.id){await page.locator('#lessonCard').screenshot({path:path.join(output,'chapter-'+q.chapter+'-393.png')});}
   }}finally{await context.close();}
   console.log('PASS '+width+'px: '+records.length+' questions, English/Tamil, '+formulas+' formula instances; source parity, complete steps, MathML, clipping and page overflow');
   return {width,questions:records.length,languages:['en','ta'],formulas};
  }));
  assert.deepEqual(errors,[],'No browser errors');
  await fs.writeFile(path.join(output,'sweep-results.json'),JSON.stringify(results,null,2));
 }finally{await browser.close();await app.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
