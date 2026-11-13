'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const lesson=JSON.parse(fs.readFileSync(path.join(root,'data/textbook-exercises/g11-ch1-ex1-1-q4-iv.json'),'utf8'));
const q=lesson.questions[0],ledger=JSON.parse(fs.readFileSync(path.resolve(root,'../docs/coverage/grade-11-2025.json'),'utf8'));
const checkpoint=JSON.parse(fs.readFileSync(path.resolve(root,'../docs/coverage/grade-11-ex1-1-q4-iv-source-checkpoint.json'),'utf8'));
assert.equal(q.id,'g11-ch1-ex1.1-q4-iv');
assert.equal(q.source.sourceExactMath,'C − (B − A) = (C ∩ A) ∪ (C ∩ B′).');
assert.deepEqual(q.source.page,{en:7,ta:10});assert.deepEqual(q.source.pdfPage,{en:15,ta:18});
for(const lang of ['en','ta']){
 assert.equal(q.prompt[lang],checkpoint.source[lang].stemExact+'\n'+checkpoint.source[lang].subpartExact);
 assert.equal(checkpoint.source[lang].pageImageChecked,true);
 assert.equal(q.source.pageImagesVisuallyChecked[lang],true);
 assert.equal(q.steps[lang].length,6);assert.ok(q.steps[lang].every(s=>s.length>25));
 assert.ok(q.answer[lang].length>40);
}
assert.equal(q.review.tamilEditorial,'pending');
const item=ledger.items.find(x=>x.id===q.id);assert.equal(item.status,'draft');assert.equal(item.mathChecked,true);
for(const k of ['ciPassed','merged','deployed','liveVerified'])assert.equal(item[k],false);
const S=(mask)=>new Set([0,1,2,3].filter(i=>mask&(1<<i)));
const diff=(a,b)=>new Set([...a].filter(x=>!b.has(x)));
const inter=(a,b)=>new Set([...a].filter(x=>b.has(x)));
const union=(a,b)=>new Set([...a,...b]);
const equal=(a,b)=>a.size===b.size&&[...a].every(x=>b.has(x));
const U=S(15);let cases=0;
for(let a=0;a<16;a++)for(let b=0;b<16;b++)for(let c=0;c<16;c++){
 const A=S(a),B=S(b),C=S(c);
 const left=diff(C,diff(B,A)),right=union(inter(C,A),inter(C,diff(U,B)));
 assert.ok(equal(left,right),JSON.stringify({a,b,c}));cases++;
}
assert.equal(cases,4096);
const A=new Set([1,2]),B=new Set([2,3]),C=new Set([1,2,3]),universe=new Set([1,2,3,4]);
assert.deepEqual([...diff(C,diff(B,A))],[1,2]);
assert.ok(equal(diff(C,diff(B,A)),union(inter(C,A),inter(C,diff(universe,B)))));
const html=fs.readFileSync(path.join(root,'grade-11/sets-q4-iv-preview.html'),'utf8');
for(const token of ['g11-ch1-ex1-1-q4-iv.json','aria-pressed','Tamil human editorial review pending','role="alert"','id="retry"'])assert.ok(html.includes(token),token);
console.log('PASS Grade 11 Q4(iv) source-exact bilingual lesson and '+cases+' independent set identities');
