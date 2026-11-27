'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const q=JSON.parse(fs.readFileSync(path.join(root,'data/textbook-exercises/g11-ch1-ex1-1-q4-iii.json'),'utf8')).questions[0];
const ledger=JSON.parse(fs.readFileSync(path.resolve(root,'../docs/coverage/grade-11-2025.json'),'utf8'));
const checkpoint=JSON.parse(fs.readFileSync(path.resolve(root,'../docs/coverage/grade-11-ex1-1-q4-iii-source-checkpoint.json'),'utf8'));
assert.equal(q.id,'g11-ch1-ex1.1-q4-iii');
assert.deepEqual(q.source.page,{en:7,ta:10});
assert.deepEqual(q.source.pdfPage,{en:15,ta:18});
assert.deepEqual(q.source.pageImagesVisuallyChecked,{en:true,ta:true});
assert.equal(q.source.sourceExactMath,'(A × B) ∩ (B × A) = (A ∩ B) × (B ∩ A).');
for(const lang of ['en','ta']){assert.ok(q.prompt[lang].includes(q.source.sourceExactMath));assert.equal(q.steps[lang].length,6);assert.ok(q.steps[lang].every(s=>s.length>20));assert.ok(q.answer[lang].length>40);assert.equal(checkpoint.source[lang].pageImageChecked,true);}
assert.equal(q.prompt.en,checkpoint.source.en.stemExact+'\n'+checkpoint.source.en.subpartExact);
assert.equal(q.prompt.ta,checkpoint.source.ta.stemExact+'\n'+checkpoint.source.ta.subpartExact);
assert.equal(q.review.tamilEditorial,'pending');
const item=ledger.items.find(x=>x.id===q.id);
assert.equal(item.status,'draft');assert.equal(item.mathChecked,true);assert.equal(item.ciPassed,false);assert.equal(item.merged,false);assert.equal(item.liveVerified,false);
const product=(A,B)=>new Set(A.flatMap(a=>B.map(b=>JSON.stringify([a,b]))));
const intersect=(A,B)=>new Set([...A].filter(x=>B.has(x)));
const equal=(A,B)=>A.size===B.size&&[...A].every(x=>B.has(x));
let cases=0;
for(let maskA=0;maskA<16;maskA++)for(let maskB=0;maskB<16;maskB++){
 const A=[0,1,2,3].filter(x=>maskA&(1<<x)),B=[0,1,2,3].filter(x=>maskB&(1<<x));
 const left=intersect(product(A,B),product(B,A));
 const right=product([...intersect(new Set(A),new Set(B))],[...intersect(new Set(B),new Set(A))]);
 assert.ok(equal(left,right),JSON.stringify({A,B}));cases++;
}
assert.equal(cases,256);
const A=[1,2],B=[2,3];
assert.deepEqual([...intersect(product(A,B),product(B,A))],['[2,2]']);
const html=fs.readFileSync(path.join(root,'grade-11/sets-q4-iii-preview.html'),'utf8');
assert.ok(html.includes('g11-ch1-ex1-1-q4-iii.json'));assert.ok(html.includes('aria-pressed'));assert.ok(html.includes('Tamil human editorial review pending'));
console.log('PASS Grade 11 Q4(iii) exact bilingual source checkpoint and '+cases+' independent Cartesian-product intersections');
