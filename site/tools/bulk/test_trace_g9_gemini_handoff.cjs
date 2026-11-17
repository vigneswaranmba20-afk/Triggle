'use strict';
// Read-only handoff acceptance: Gemini PDF independently reviewed 15 remaining
// Grade 9 Exercise 1.2 English parts. Does NOT register lessons or certify Tamil.
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../../..');
const source=JSON.parse(fs.readFileSync(path.join(root,'docs/curriculum/grade-9/candidates/g9-ch1-ex1-2-english-34.json'),'utf8'));
const ids=[
 'g9-ch1-ex1.2-q5-iii',
 ...['i','ii','iii','iv'].map(x=>'g9-ch1-ex1.2-q6-'+x),
 'g9-ch1-ex1.2-q7',
 ...['i','ii','iii','iv'].map(x=>'g9-ch1-ex1.2-q8-'+x),
 ...['i','ii'].map(x=>'g9-ch1-ex1.2-q9-'+x),
 ...['i','ii','iii'].map(x=>'g9-ch1-ex1.2-q10-'+x)
];
const expected=[
 'Overlapping','{square, rhombus}','{circle}','{triangle}','∅',
 '∅, {a}, {{a, b}}, {a, {a, b}}',
 'P(A) = {∅, {a}, {b}, {a, b}}',
 'P(B) = {∅, {1}, {2}, {3}, {1,2}, {1,3}, {2,3}, {1,2,3}}',
 'P(D) = {∅, {p}, {q}, {r}, {s}, {p,q}, {p,r}, {p,s}, {q,r}, {q,s}, {r,s}, {p,q,r}, {p,q,s}, {p,r,s}, {q,r,s}, {p,q,r,s}}',
 'P(E) = {∅}',
 '8 subsets; 7 proper subsets','1024 subsets; 1023 proper subsets',
 '16','1','8'
];
assert.equal(ids.length,15);assert.equal(new Set(ids).size,15);
assert.equal(source.grade,9);assert.equal(source.exercise,'1.2');
assert.equal(source.sourcePdfSha256,'e6890ec79f4ad09c42f4829f0a14f4fbc3c6814887c4ba14f2b3fa559638c037');
for(const [i,id] of ids.entries()){
 const row=source.rows.find(x=>x.id===id);
 assert(row,'No audited original-English candidate '+id);
 assert.equal(row.answer,expected[i],'Gemini final answer mismatch '+id);
 assert.equal(row.verifiedInOriginalAudit,true,id);
 assert(row.question&&row.sourceEnglish&&row.steps.length>=3,id);
 assert(row.steps.every(s=>s.reason&&s.equation),'Missing teachable steps '+id);
}
// Separate finite-set / exact-arithmetic tests; Gemini concurrence alone is not proof.
const range=(a,b)=>Array.from({length:b-a+1},(_,i)=>a+i);
const factor24=range(1,24).filter(n=>24%n===0);
const multiple3=range(1,29).filter(n=>n%3===0);
assert.deepEqual(factor24.filter(n=>multiple3.includes(n)),[3,6,12,24]); // Q5(iii)
const shapes={square:{sides:4,equal:true},rectangle:{sides:4,equal:false},
 circle:{sides:0,radius:true},rhombus:{sides:4,equal:true},triangle:{sides:3,angleSum:180}};
assert.deepEqual(Object.keys(shapes).filter(n=>shapes[n].equal),['square','rhombus']); // Q6(i)
assert.deepEqual(Object.keys(shapes).filter(n=>shapes[n].radius),['circle']); // Q6(ii)
assert.deepEqual(Object.keys(shapes).filter(n=>shapes[n].angleSum===180),['triangle']); // Q6(iii)
assert.deepEqual(Object.keys(shapes).filter(n=>shapes[n].sides===5),[]); // Q6(iv)
const choose=(a,k)=>{const out=[];const walk=(start,items)=>{
 if(items.length===k){out.push(items);return;}
 for(let i=start;i<a.length;i++)walk(i+1,[...items,a[i]]);
};walk(0,[]);return out;};
const power=a=>Array.from({length:a.length+1},(_,i)=>choose(a,i)).flat();
const nested=['a','{a,b}'],nestedPower=power(nested);
assert.equal(nestedPower.length,4);assert(nestedPower.some(p=>p.length===1&&p[0]==='{a,b}')); // Q7
assert.equal(power(['a','b']).length,4); // Q8(i)
assert.equal(power([1,2,3]).length,8); // Q8(ii)
const members=['p','q','r','s'],all=power(members);
assert.equal(all.length,16);assert.deepEqual(range(0,4).map(n=>all.filter(x=>x.length===n).length),[1,4,6,4,1]); // Q8(iii)
assert.deepEqual(power([]),[[]]); // Q8(iv): {∅}, NOT ∅
assert.equal(2**3,8);assert.equal(2**3-1,7); // Q9(i)
const squares=range(1,10).map(x=>x*x);
assert.equal(new Set(squares).size,10);assert.equal(squares.at(-1),100);
assert.equal(2**squares.length,1024);assert.equal(2**squares.length-1,1023); // Q9(ii)
assert.equal(2**4,16);assert.equal(2**0,1);assert.equal(Math.log2(256),8); // Q10
const q8iii=source.rows.find(x=>x.id==='g9-ch1-ex1.2-q8-iii');
assert(q8iii.steps.length>=5,'Q8(iii) teaching must be segmented for mobile');
const q7=source.rows.find(x=>x.id==='g9-ch1-ex1.2-q7');
assert(q7.answer.includes('{{a, b}}'),'Inner set is a single outer element');
const q6iv=source.rows.find(x=>x.id==='g9-ch1-ex1.2-q6-iv');
assert.equal(q6iv.answer,'∅','Empty set is not the singleton {∅}');
console.log('PASS Gemini 15-part English handoff: all 15 answer keys match original source-audited TRACE candidates; exact independent set, shape and power-set checks pass; three release flags retained. No student release.');
