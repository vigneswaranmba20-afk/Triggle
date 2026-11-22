'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'../..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const manifest=JSON.parse(read('docs/curriculum/grade-10/g10-ch8-ex8-2-q1-q3-20261121.json'));
const inv=JSON.parse(read('docs/trace/source-inventories/g10-ch8-ex8-2.json'));
// 1. Exact wording + numerical fidelity (English printed p.316 text, verbatim)
const exact={
 1:'1. The standard deviation and mean of a data are 6.5 and 12.5 respectively. Find the coefficient of variation.',
 2:'2. The standard deviation and coefficient of variation of a data are 1.2 and 25.6 respectively. Find the value of mean.',
 3:'3. If the mean and coefficient of variation of a data are 15 and 48 respectively, then find the value of standard deviation.'};
assert.deepEqual(manifest.records.map(r=>r.id),[1,2,3].map(n=>'c10-8-ex8-2-q'+n));
for(const r of manifest.records){const n=+r.id.slice(-1);
 assert.equal(r.q.en,exact[n]);assert.match(r.q.ta,/\p{Script=Tamil}/u,'Tamil source wording present');assert.equal(r.translationReview,'pending');assert.equal(r.tamilQuestionSourceVerified,true);assert.equal(r.tamilWorkedSolutionReview,'pending');
 assert.match(r.reference,/printed p\. 316 \/ PDF p\. 322/);assert.match(r.reference,/printed p\. 325 \/ PDF p\. 331/);
 const invQ=inv.questions.find(x=>x.question===String(n));
 for(const v of invQ.numericalEvidenceBothMediums)assert.ok(r.q.en.includes(String(v)),'inventory number '+v+' in Q'+n);
 assert.ok(r.steps.length>=5);assert.ok(r.answer&&r.answerMath.latex.includes('boxed'));
 assert(r.steps.every(s=>s.ta&&/\p{Script=Tamil}/u.test(s.ta)),'Tamil explanation for each step');assert.match(r.answer.ta,/\p{Script=Tamil}/u);
 for(const s of r.steps){assert.equal(s.math.fallback,s.eq);assert.ok(s.math.latex&&s.en);}
 assert.ok(r.steps[0].en.includes('σ')&&r.steps[0].en.includes('C.V.'),'symbols explained');}
// 2. Independent verification: exact integer arithmetic (decimals scaled by 10 or 100)
assert.equal((65*100)/125,52);                       // Q1: 6.5/12.5 = 65/125
assert.equal(1200/256,75/16);
assert.equal((48*15)/100,7.2);                       // Q3
// reverse checks: recompute C.V. from the answers and compare with the givens
const cv=(sd,m)=>Math.round(sd/m*100*1e9)/1e9;
assert.equal(cv(6.5,12.5),52);assert.equal(cv(1.2,4.6875),25.6);assert.equal(cv(7.2,15),48);
for(const [i,t] of [[0,/52 %/],[1,/75\/16 = 4\.6875/],[2,/7\.2/]])assert.match(manifest.records[i].answer.en,t);
// 3. Registration, navigation and preservation
const html=read('site/index.html'),cache=read('site/service-worker.js'),mod='data/textbook-exercises/g10-ch8-ex8-2-q1-q3-en.js';
const scripts=[...html.matchAll(/<script src="\.\/(data\/[^?"']+)(?:\?[^"']*)?"[^>]*><\/script>/g)].map(m=>m[1]);
assert.equal(scripts.filter(s=>s===mod).length,1);assert.ok(cache.includes('./'+mod));
const ctx={window:{},console};vm.createContext(ctx);
for(const f of scripts)vm.runInContext(read('site/'+f),ctx,{filename:f,timeout:10000});
const items=ctx.window.TRIGGLE_CLASSES[10].items;
assert.equal(new Set(items.map(x=>x.id)).size,items.length,'unique IDs');
const ch8=ctx.window.TRIGGLE_CURRICULUM.grades.find(g=>g.grade===10).chapters.find(c=>String(c.number)==='8');
for(const r of manifest.records){
 assert.equal(JSON.stringify(items.find(x=>x.id===r.id)),JSON.stringify(r),'source/student parity '+r.id);
 assert.equal(ch8.textbookQuestionIds.filter(x=>x===r.id).length,1);
 assert.equal(ctx.window.TriggleDifficulty.get(items.find(x=>x.id===r.id)).grade,10);}
assert.deepEqual(Array.from(items.filter(x=>x.exercise==='8.2'&&x.chapter==='8'),x=>x.id),Array.from({length:8},(_,i)=>'c10-8-ex8-2-q'+(i+1)),'one record for each Q1-Q8, no duplicates or gaps');
for(const id of ['c10-8-ex8-1-q1-i','c10-8-ex8-1-q5','c10-8-ex8-1-q11','c10-8-ex8-1-q15'])assert.ok(items.some(x=>x.id===id),'preserved '+id);
console.log('PASS G10 Ex8.2 Q1-Q3: exact wording, inventory numbers, independent maths, registration, parity');
