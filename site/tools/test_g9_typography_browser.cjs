'use strict';
// Every student-visible record, every requested Android width, both languages.
// Verify the exact authored fallback at every surface, even on prose-only MCQs.
const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path');
const {chromium}=require('playwright'),{server,launchOptions}=require('./dashboard_test_support.cjs');
const {load}=require('./build_g9_math.cjs');
const widths=[320,360,393,430],samples=new Map(load().map(q=>[q.chapter,q.id]));
const normalize=s=>String(s??'').replace(/\s+/g,' ').trim();
async function inspect(page,q,lang){
 const state=await page.evaluate(({q,lang})=>{
  const p=window.TriggleG9Math.get(q);
  const count=v=>Array.isArray(v)?v.reduce((n,x)=>n+count(x),0):v?.latex?1:0;
  const fallback=selector=>{const el=document.querySelector(selector)?.cloneNode(true);if(!el)return null;
   el.querySelectorAll('.triggle-tex').forEach(math=>math.replaceWith(document.createTextNode(math.dataset.mathFallback)));
   el.querySelectorAll('math.triggle-math[aria-label]').forEach(math=>math.replaceWith(document.createTextNode(math.getAttribute('aria-label'))));
   const raised={'0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹','n':'ⁿ','k':'ᵏ'};
   el.querySelectorAll('sup').forEach(sup=>sup.replaceWith(document.createTextNode([...sup.textContent].map(c=>raised[c]||c).join(''))));
   el.querySelectorAll('details').forEach(d=>d.remove());return el.textContent;
  };
  const hint=document.querySelector('details.why-step-g9')?window.TriggleWhyStepG9.hints[q.id]:null;
  const expected=count(hint?window.TriggleG9Math.text(hint[lang]||hint.en):null)+count(p.questionMath[lang]||p.questionMath.en)+count(p.answerMath?.[lang]||p.answerMath)+p.steps.reduce((n,s)=>n+count(s.math)+count(s.reasonMath?.[lang]||s.reasonMath?.en),0);
  const rendered=document.querySelectorAll('#questionText .katex,#stepsList .katex').length;
  return {expected,rendered,width:innerWidth,pageWidth:document.documentElement.scrollWidth,
   errors:document.querySelectorAll('[data-math-error]').length,
   question:fallback('#questionText'),answer:fallback('.final-answer-value'),
   steps:[...document.querySelectorAll('#stepsList li.worked-step:not(.final-answer-step)')].map((li,i)=>({reason:fallback('#stepsList li.worked-step:nth-child('+(i+1)+') .step-reason'),eq:fallback('#stepsList li.worked-step:nth-child('+(i+1)+') .step-equation')})),
   formulas:[...document.querySelectorAll('#questionText .triggle-tex,#stepsList .triggle-tex')].map(el=>({height:el.clientHeight,glyphHeight:el.querySelector('.katex-html').getBoundingClientRect().height,width:el.clientWidth,scroll:el.scrollWidth,tab:el.tabIndex,mathml:!!el.querySelector('math')}))};
 },{q,lang});
 const label=q.id+' '+lang+' '+state.width;
 assert.equal(state.errors,0,label+' no renderer fallback');
 assert.equal(state.rendered,state.expected,label+' every authored formula renders exactly once');
 assert.equal(normalize(state.question),normalize(q.q[lang]||q.q.en),label+' question wording');
 assert.equal(normalize(state.answer),normalize(q.answer?.[lang]||q.answer),label+' final answer');
 assert.equal(state.steps.length,q.steps.length,label+' all steps retained');
 state.steps.forEach((s,i)=>{assert.equal(normalize(s.reason),normalize(q.steps[i][lang]||q.steps[i].en),label+' reason '+i);assert.equal(normalize(s.eq),normalize(q.steps[i].eq),label+' equation '+i);});
 assert(state.pageWidth<=state.width+1,label+' no page overflow');
 for(const f of state.formulas){assert(f.mathml,label+' semantic MathML');assert(f.height+1>=f.glyphHeight,label+' no glyph clipping');if(f.scroll>f.width+1)assert.equal(f.tab,0,label+' keyboard-scrollable expression');}
 return state.formulas.length;
}
(async()=>{
 const app=await server(),browser=await chromium.launch(launchOptions()),errors=[];
 const output=path.resolve('screenshots/g9-typography');await fs.mkdir(output,{recursive:true});
 try{
  const results=await Promise.all(widths.map(async width=>{
   const context=await browser.newContext({viewport:{width,height:852},serviceWorkers:'block'}),page=await context.newPage();let formulas=0;
   page.on('pageerror',e=>errors.push(e.message));
   try{let done=0,lastChapter=null;for(const q of load()){
    const route=app.base+'/index.html?class=9&question='+encodeURIComponent(q.id);
    if(lastChapter!==q.chapter){await page.goto(route);lastChapter=q.chapter;}
    else await page.evaluate(url=>{history.pushState({},'',url);dispatchEvent(new PopStateEvent('popstate'));},route);
    assert.equal(new URL(page.url()).searchParams.get('question'),q.id,'Requested question loaded');
    await page.evaluate(()=>document.fonts.ready);await page.evaluate(()=>window.TriggleNotation.prepare(document));
    formulas+=await inspect(page,q,'en');
    await page.evaluate(()=>document.querySelector('#langTa').click());await page.evaluate(()=>window.TriggleNotation.prepare(document));
    formulas+=await inspect(page,q,'ta');
    await page.evaluate(()=>document.querySelector('#langEn').click());
    if(++done%75===0)console.log('Progress '+width+'px: '+done+'/318 questions in both languages');
    if(width===393&&samples.get(q.chapter)===q.id){await page.locator('#lessonCard').screenshot({path:path.join(output,'chapter-'+q.chapter+'-393.png')});}
   }}finally{await context.close();}
   console.log('PASS '+width+'px: 318 questions, English/Tamil, '+formulas+' formula instances; source parity, complete steps, MathML, clipping and page overflow');
   return {width,questions:318,languages:['en','ta'],formulas};
  }));
  assert.deepEqual(errors,[],'No browser errors');
  await fs.writeFile(path.join(output,'sweep-results.json'),JSON.stringify(results,null,2));
 }finally{await browser.close();await app.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
