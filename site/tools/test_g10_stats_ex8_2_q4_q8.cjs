'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'../..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const src=JSON.parse(read('docs/curriculum/grade-10/g10-ch8-ex8-2-q4-q8-20261121.json'));
const records=src.records;
const inventory=JSON.parse(read('docs/trace/source-inventories/g10-ch8-ex8-2.json'));
assert.deepEqual(records.map(r=>r.id),[4,5,6,7,8].map(n=>'c10-8-ex8-2-q'+n));
assert.equal(src.source.en.pdfSha256,'602eb88de6fc05200199bcb4c31e7b8a02175513c6ac2594e49b479cc6aec09d');
assert.equal(src.source.ta.pdfSha256,'6c6629e39b3ba5c7fccf43c320dc54eec56f7aed393895409eaaad1a7907b22f');
assert.equal(src.source.en.answerKeyPdfPage,348);
assert.equal(inventory.questionStems,8);
for(let i=0;i<records.length;i++){
 const r=records[i],n=i+4,ref=inventory.questions.find(x=>x.question===String(n));
 assert(ref,'inventory record missing');
 assert(r.steps.length>=5,'full solution missing '+r.id);
 assert(r.answerMath?.latex?.includes('boxed'),'math answer '+r.id);
 assert(r.q.ta&&/\p{Script=Tamil}/u.test(r.q.ta),'Tamil question present');assert(r.answer.ta&&/\p{Script=Tamil}/u.test(r.answer.ta),'Tamil answer present');assert(r.translationReview==='pending'&&r.tamilWorkedSolutionReview==='pending','Do not claim editorial approval');
 assert(r.reference.includes('English printed p.316'),'source proof '+r.id);
 for(const v of ref.numericalEvidenceBothMediums){
   const rowData=JSON.stringify([r.q.en,r.dataTable?.rows]);
   assert(rowData.includes(String(v)),'missing textbook value '+v+' in '+r.id);
 }
 for(const st of r.steps){
   assert(st.math?.latex&&st.math.fallback===st.eq&&st.en,'step/fallback '+r.id);
   assert(st.ta&&/\p{Script=Tamil}/u.test(st.ta),'Tamil worked-step missing '+r.id);
 }
}
assert.match(records[0].questionMath.latex,/\\bar\{x\}/);
assert.deepEqual(records[4].dataTable.rows,[['Mathematics',56,12],['Science',65,14],['Social Science',60,10]]);
assert.equal(records[4].dataTable.headers.join(','),'Subject,Mean,SD');
assert.deepEqual(records[4].dataTable.ta.rows,[['கணிதம்',56,12],['அறிவியல்',65,14],['சமூக அறிவியல்',60,10]]);
assert(new RegExp(records[4].dataTable.replaceRegexTa).test(records[4].q.ta));
assert(new RegExp(records[4].dataTable.replaceRegex).test(records[4].q.en));
const mean=data=>data.reduce((a,b)=>a+b,0)/data.length;
const varPop=data=>{const m=mean(data);return data.reduce((acc,x)=>acc+(x-m)**2,0)/data.length;};
const cv=data=>Math.sqrt(varPop(data))/mean(data)*100;
const round2=x=>Math.round((x+Number.EPSILON)*100)/100;
const q5=[24,26,33,37,29,31],q6=[38,40,47,44,46,43,49,53];
assert.equal(mean(q5),30);assert.equal(varPop(q5),56/3);assert.equal(round2(cv(q5)),14.4);
assert.equal(mean(q6),45);assert.equal(varPop(q6),20.5);assert.equal(round2(cv(q6)),10.06);
assert.equal(round2(4.53/45*100),10.07,'book uses rounded intermediate');
assert.equal(round2(Math.sqrt(765/5-6**2)/6*100),180.28);
assert.equal(4.6/(460/5)*100,5);assert.equal(2.4/(480/5)*100,2.5);
const c8=[12/56*100,14/65*100,10/60*100];
assert(c8[2]<c8[0]&&c8[0]<c8[1]);
for(const data of [q5,q6]){
 assert(Math.abs(data.reduce((s,x)=>s+x-mean(data),0))<1e-9,'zero-sum deviations');
 for(const k of [0.5,2,3.7,10])assert(Math.abs(cv(data.map(x=>x*k))-cv(data))<1e-9,'scale invariant');
 const shifted=data.map(x=>x+100);
 assert(Math.abs(varPop(shifted)-varPop(data))<1e-9,'shift preserves variance');
 assert(cv(shifted)<cv(data),'shift raises mean, lowers CV');
}
// Deliberate negative test fixture: inconsistent Q4 summary must be rejected.
const sigmaFromSummary=(n,m,ss)=>{const variance=ss/n-m*m;if(variance<0)throw Error('Impossible variance');return Math.sqrt(variance);};
assert.throws(()=>sigmaFromSummary(5,10,400),/Impossible variance/);
const html=read('site/index.html'),sw=read('site/service-worker.js');
const mod='data/textbook-exercises/g10-ch8-ex8-2-q4-q8-en.js';
assert.equal((html.match(/g10-ch8-ex8-2-q4-q8-en\.js/g)||[]).length,1);
assert(sw.includes('./'+mod),'offline cache missing');
const scripts=[...html.matchAll(/<script src="\.\/(data\/[^?"']+)(?:\?[^"']*)?"[^>]*><\/script>/g)].map(m=>m[1]);
const ctx={window:{},console};vm.createContext(ctx);
for(const f of scripts)vm.runInContext(read('site/'+f),ctx,{filename:f,timeout:10000});
const items=ctx.window.TRIGGLE_CLASSES[10].items;
const chapter=ctx.window.TRIGGLE_CURRICULUM.grades.find(g=>g.grade===10).chapters.find(c=>String(c.number)==='8');
assert.equal(items.filter(x=>x.chapter==='8'&&x.exercise==='8.2').length,8,'full Ex8.2 registration');
assert.equal(new Set(items.map(x=>x.id)).size,items.length,'unique IDs');
for(const r of records){
 assert.equal(JSON.stringify(items.find(x=>x.id===r.id)),JSON.stringify(r),'source/runtime parity '+r.id);
 assert.equal(chapter.textbookQuestionIds.filter(x=>x===r.id).length,1,'curriculum registration '+r.id);
 assert.equal(ctx.window.TriggleDifficulty.get(items.find(x=>x.id===r.id)).grade,10);
}
for(const id of [1,2,3].map(n=>'c10-8-ex8-2-q'+n))assert(items.some(x=>x.id===id),'preserve '+id);
console.log('PASS G10 Exercise 8.2 Q4-Q8: source/page, maths, invariants, reversal, data table, registration');
