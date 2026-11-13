'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto'),path=require('node:path');
const root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const katex=require('../assets/vendor/katex/katex.min.js'),notationCtx={window:{katex}};
vm.runInNewContext(read('assets/math-notation.js'),notationCtx);
const render=notationCtx.window.TriggleNotation.render;
const ctx={window:{}};
vm.createContext(ctx);
for(const file of ['data/class-10.js','data/class-10-ex1-1-2025.js','data/class-10-chapter-1.js'])vm.runInContext(read(file),ctx,{filename:file,timeout:15000});
const all=ctx.window.TRIGGLE_CLASSES[10].items,records=all.filter(x=>String(x.chapter)==='1'&&x.kind==='textbook');
const snapshot=crypto.createHash('sha256').update(JSON.stringify(all)).digest('hex');
assert.equal(records.length,74,'All 74 2025 textbook question parts must be present');
vm.runInContext(read('data/math-layout/g10-ch1-chatgpt-20261113.js'),ctx,{filename:'data/math-layout/g10-ch1-chatgpt-20261113.js',timeout:15000});
const overlay=ctx.window.TriggleChapter1Math;
assert.ok(overlay);
assert.equal(overlay.ids.length,74,'No missing or extra Chapter 1 notation records');
assert.equal(new Set(overlay.ids).size,74,'No duplicate question IDs');
assert.deepEqual([...overlay.ids].sort(),records.map(r=>r.id).sort(),'All original textbook IDs covered exactly');
let steps=0,formulas=0,answers=0,structuredFractions=0;
const fallback=v=>Array.isArray(v)?v.map(x=>x.fallback).join('; '):v.fallback;
const inspect=(v,source,label)=>{
 assert.equal(fallback(v),source,'Source math fallback changed: '+label);
 for(const x of Array.isArray(v)?v:[v]){
  assert.ok(x.latex&&x.display===true,'Structured display required '+label);
  assert.ok(!/FRAC\d|undefined|\\\\text\{₹\}/.test(x.latex),'Unsafe unreviewed conversion '+label);
  assert.ok(x.latex.length<2000,'Unbounded raw source formula '+label);
  const out=render(x);
  assert.ok(out.includes('<math'),'Missing semantic mathematics '+label);
  assert.ok(out.includes('class="katex'),'KaTeX output absent '+label);
  assert.ok(!out.includes('data-math-error'),'KaTeX rejected '+label+': '+x.latex);
  if(x.latex.includes('\\dfrac')){assert.ok(out.includes('<mfrac>'),'Fractions must be real stacked objects '+label);structuredFractions++;}
  formulas++;
 }
};
for(const record of records){
 assert.ok(overlay.ids.includes(record.id),'Missing record '+record.id);
 record.steps.forEach((step,i)=>{inspect(overlay.getStep(record,i),step.eq,record.id+'/step '+i);steps++});
 inspect(overlay.getAnswer(record),record.answer,record.id+'/answer');
 answers++;
}
assert.equal(steps,259,'Do not shorten any worked solution');
assert.equal(answers,74);
assert.ok(formulas>300,'All authored equations and answer parts should be typeset');
assert.ok(structuredFractions>=20,'Fractions in functions and composition need true vertical forms');
const ref=records.find(r=>r.id==='c10-1-1-unit-q8');
assert.ok(render(overlay.getStep(ref,0)).includes('<mfrac>'),'Nested function composition fraction must be stacked');
assert.ok(!JSON.stringify(overlay.getStep(ref,0)).includes('FRAC'),'No text placeholder');
const ref2=records.find(r=>r.id==='c10-1-1-5-q1');
const composition=overlay.getStep(ref2,2);
assert.ok(JSON.stringify(composition).includes('\\dfrac8{x^2}-1'),'Composition must not change 8/x²−1 to 8/(x²−1)');
assert.equal(crypto.createHash('sha256').update(JSON.stringify(all)).digest('hex'),snapshot,'Textbook source records must remain completely immutable');
assert.ok(!overlay.getStep({id:'c10-8-ex8-1-q4',chapter:'8',classNum:10,steps:[]},0),'No leaked overlay outside Chapter 1');
const html=read('index.html'),sw=read('service-worker.js');
assert.ok(html.includes('data/math-layout/g10-ch1-chatgpt-20261113.js'),'Load mathematical display layer offline');
assert.ok(html.indexOf('data/class-10-chapter-1.js')<html.indexOf('data/math-layout/g10-ch1-chatgpt-20261113.js'),'Load after chapter data');
assert.ok(html.indexOf('data/math-layout/g10-ch1-chatgpt-20261113.js')<html.indexOf('assets/app.js'),'Load before lesson renderer');
assert.ok(sw.includes('./data/math-layout/g10-ch1-chatgpt-20261113.js'),'Offline cache must contain formatted maths');
assert.ok(read('assets/app.js').includes('TriggleChapter1Math?.getStep'),'Step renderer must use nonmutating overlays');
assert.ok(read('assets/app.js').includes('TriggleChapter1Math?.getAnswer'),'Final answers must use notation overlays');
console.log('PASS 74 complete Class 10 Chapter 1 question parts, '+steps+' unmodified steps, '+formulas+' valid KaTeX formulas, '+structuredFractions+' real fractions, source hash unchanged, semantic MathML and offline cache.');
