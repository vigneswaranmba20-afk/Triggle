'use strict';
/* Exact integer-arithmetic checks independent of the authored answer strings. */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'../..');
const src=fs.readFileSync(path.join(root,'site/data/textbook-exercises/g10-ch2-ex2-3-modular-en.js'),'utf8');
const context={window:{TRIGGLE_CLASSES:{10:{items:[]}},TRIGGLE_CURRICULUM:{grades:[{grade:10,chapters:[{number:2,textbookQuestionIds:[]}]}]}}};
vm.runInNewContext(src,context,{timeout:5000});
const rows=context.window.TRIGGLE_CLASSES[10].items;
assert.equal(rows.length,10,'Five subparts of Q1 plus Q2/Q3/Q4/Q8/Q9');
assert.equal(context.window.TRIGGLE_CURRICULUM.grades[0].chapters[0].textbookQuestionIds.length,10,'All items in chapter navigation');
assert.equal(new Set(rows.map(q=>q.id)).size,10);
for(const item of rows){
 assert.equal(item.classNum,10);
 assert.equal(item.chapter,'2');assert.equal(item.exercise,'2.3');
 assert.equal(item.kind,'textbook');assert.equal(item.edition,'2025');
 assert.equal(item.translationReview,'pending');
 assert(item.steps.length>=2&&item.steps.every(s=>s.en.length>=30&&s.eq.length>=5),'Complete reasoning '+item.id);
 assert(item.steps.every(s=>s.math?.latex&&s.math.fallback===s.eq&&s.math.display===true),'Math notation '+item.id);
 assert(item.source.includes('/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/'),'Owner 2025 textbook source');
}
const m=new Map(rows.map(q=>[q.id.replace(/^c10-2-ex2-3-/,'').replace(/-/g,''),q]));
const get=id=>rows.find(q=>q.id==='c10-2-ex2-3-'+id);
assert.equal(71%8,7);assert.match(get('q1-i').answer,/7/);
assert.equal(Array.from({length:100},(_,i)=>i+1).find(x=>(78+x-3)%5===0),5);
assert.match(get('q1-ii').answer,/5/);
assert.equal(Array.from({length:100},(_,i)=>i+1).find(x=>(89-x-3)%4===0),2);
assert.match(get('q1-iii').answer,/2/);
assert.equal(Array.from({length:100},(_,i)=>i+1).find(x=>x%7===0&&(96-x/7)%5===0),7);
assert.match(get('q1-iv').answer,/integer/,'Acknowledge textbook integer-quotient reading');
assert.equal(Array.from({length:100},(_,i)=>i+1).find(x=>(5*x-4)%6===0),2);
assert.match(get('q1-v').answer,/2/);
for(let k=-100;k<=100;k++){
 const x=13+17*k;
 assert.equal(((7*x-3)%17+17)%17,3,'Q2 congruence substitution');
}
for(let x=-60;x<=60;x++){
 const isQ3=(5*x-4)%6===0;
 assert.equal(isQ3,(x-2)%6===0,'Q3 general solution family');
 const isQ4=(3*x-2)%11===0;
 assert.equal(isQ4,(x-8)%11===0,'Q4 general solution family');
}
const powMod=(a,n,m)=>{let r=1n,b=BigInt(a)%BigInt(m),e=BigInt(n),mod=BigInt(m);while(e>0n){if(e&1n)r=r*b%mod;b=b*b%mod;e>>=1n;}return r;};
for(let n=1;n<=100;n++){
 assert.equal((powMod(2,n,7)+6n*powMod(9,n,7))%7n,0n,'Q8 general proof, n='+n);
}
assert.equal(powMod(2,81,17),2n,'Q9 large exponent');
for(const id of ['q1-i','q1-ii','q1-iii','q1-iv','q1-v','q2','q3','q4','q8','q9'])assert(get(id),'Source task missing '+id);
console.log('PASS Grade 10 Exercise 2.3: ten source-linked records, 6 numbered questions, integer arithmetic, 100 exponent checks, notation, navigation.');
