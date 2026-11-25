'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const katex=require('../assets/vendor/katex/katex.min.js'),root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),ctx={window:{}};
for(const f of ['data/class-10.js','data/curriculum.js','data/textbook-exercises/g10-ch7-ex7-1-q1-q5-en.js','data/textbook-exercises/g10-ch7-ex7-1-q6-q10-en.js','data/textbook-exercises/g10-ch7-ex7-2.js','data/textbook-exercises/g10-ch7-ex7-3.js','data/textbook-exercises/g10-ch7-ex7-4.js','data/textbook-exercises/g10-ch7-ex7-5.js','data/textbook-exercises/g10-ch7-unit7.js','data/problem-difficulty.js'])vm.runInNewContext(read(f),ctx,{filename:f,timeout:15000});
const manifest=JSON.parse(read('data/textbook-fidelity/g10-ch7-unit7.json')),grade=ctx.window.TRIGGLE_CLASSES[10],ch=ctx.window.TRIGGLE_CURRICULUM.grades.find(g=>g.grade===10).chapters.find(c=>c.number===7);
const keys=['48000 words','27 minutes (approx.)','πr³/3 cubic units','782.57 cm²','450 coins','4.8 cm','₹6800','2 cm','17 cm','2794.18 cm³'];
const entries=grade.items.filter(e=>e.chapter==='7'&&e.exercise==='7.unit');
assert.equal(entries.length,10);assert.equal(manifest.items.length,10);
const math=m=>{assert.ok(m.latex&&m.fallback);katex.renderToString(m.latex,{throwOnError:true,strict:'error'});};
for(let i=0;i<10;i++){
 const e=entries[i],f=manifest.items[i],id='c10-7-unit-q'+(i+1);
 assert.equal(e.id,id);assert.equal(f.id,id);assert.equal(f.answerKey,keys[i]);assert.equal(grade.items.filter(x=>x.id===id).length,1);assert.equal(ch.textbookQuestionIds.filter(x=>x===id).length,1);
 for(const lang of ['en','ta']){
   assert.equal(e.q[lang],f.textbookPrompt[lang]);assert.equal(f.visualStatus[lang],'page-checked');
   assert.equal(e.sourceFidelity.sourcePdfPages[lang].join(','),f.sourcePages[lang].pdf.join(','));
   if(e.questionMath){assert.equal(e.questionMath[lang].map(x=>typeof x==='string'?x:x.fallback).join(''),e.q[lang]);for(const m of e.questionMath[lang])if(typeof m==='object')math(m);}
   math(e.answerMath[lang]);assert.equal(e.answerMath[lang].fallback,lang==='en'?e.answer:e.answerTa);
 }
 assert.match(e.q.ta,/[\u0B80-\u0BFF]/);assert.ok(e.steps.length>=2);assert.ok(ctx.window.TriggleDifficulty.entries[id]);assert.equal(e.review.tamilEditorial,'pending');assert.ok(!e.figureSrc);
 for(const s of e.steps){assert.ok(s.en&&s.eq);assert.match(s.ta,/[\u0B80-\u0BFF]/);math(s.math);}
}
assert.equal(manifest.items[3].sourcePages.en.pdf.join(','),'304,305','Q4 must include both English source pages');
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8, a+' != '+b),pi=22/7;
near(200/(pi*(.25**2)*7)*330,48000);
near((2/3)*pi*1.75**3*1000/7/60,9625/360);assert.equal(Math.round(9625/360),27);
for(const r of [1,2,5,10]){near(Math.PI*r*r*r/3,Math.PI*r**3/3);for(const a of [0,.25,.5,.75,1])assert.ok(Math.PI*r**2*(r*a)/3<=Math.PI*r**3/3);}
near(2*pi*4*10+pi*(9+4)*Math.hypot(12,5),5478/7);assert.equal(Number((5478/7).toFixed(2)),782.57);
near((2.25/.75)**2*(10/.2),450);near(2*Math.sqrt((4.3**2-1.1**2)*4/12),4.8);
near((18+16)/2*4*100,6800);near(7-Math.cbrt(7**3-436/2),2);
near(Math.hypot(Math.sqrt((1408/7)/pi),3*(7040/7)/(1408/7)),17);
const rr=21*216/360,hh=Math.sqrt(21**2-rr**2);near(rr,12.6);near(hh,16.8);near(pi*rr**2*hh/3,2794.176);assert.equal(Number((pi*rr**2*hh/3).toFixed(2)),2794.18);
assert.match(read('index.html'),/g10-ch7-unit7\.js/);assert.match(read('service-worker.js'),/g10-ch7-unit7\.js/);
console.log('PASS Unit Exercise 7: ten IDs, source pages, bilingual explanations, structured maths, registration, independent answer checks.');
