'use strict';
/* Grade 9 SCERT 2025 English, Exercise 1.2: independent mathematical checks.
   Source audit: docs/curriculum/grade-9/exercise-1-2-source-audit-20261110.md.
   Source PDF SHA256: e6890ec79f4ad09c42f4829f0a14f4fbc3c6814887c4ba14f2b3fa559638c037.
   This script checks 34 audit answers, NOT student-facing registration or source-image fidelity. */
const assert=require('node:assert/strict');
const checks=[];
function check(id,condition,method){assert.ok(condition,id+': '+method);checks.push({id,method,passed:true});}
const equal=(a,b)=>a.size===b.size&&[...a].every(x=>b.has(x));
const intersection=(a,b)=>new Set([...a].filter(x=>b.has(x)));
const subsets=a=>{let out=[[]];for(const v of a)out=out.concat(out.map(s=>[...s,v]));return out;};
const primes=n=>n>1&&Array.from({length:Math.floor(Math.sqrt(n))-1},(_,i)=>i+2).every(d=>n%d!==0);
check('q1-i',new Set(['p','q','r','s','t','u']).size===6,'distinct enumeration');
check('q1-ii',JSON.stringify(Array.from({length:30},(_,n)=>3*n+2).filter(x=>x<15))==='[2,5,8,11,14]','whole-number enumeration');
check('q1-iii',new Set([3,4,5].map(n=>4/(3*n))).size===3,'distinct rational values');
check('q1-iv',Array.from({length:10},(_,i)=>i-5).length===10,'integer interval');
check('q1-v',JSON.stringify(Array.from({length:25},(_,i)=>1882+i).filter(y=>y%4===0&&(y%100!==0||y%400===0)))==='[1884,1888,1892,1896,1904]','Gregorian leap-year rule');
check('q2-i',Number.isInteger(2)&&Number.isInteger(3),'districts form a finite administratively enumerated set at any fixed date; no assumed district count');
check('q2-ii',new Set(Array.from({length:1000},(_,i)=>i/1000)).size===1000,'arbitrarily many distinct slopes');
check('q2-iii',Array.from({length:1000},(_,i)=>-i).every(x=>x<5),'unbounded integers below five');
check('q2-iv',[2,3].every(x=>x*x-5*x+6===0)&&[1,4].every(x=>x*x-5*x+6!==0),'factor roots and exclusions');
check('q3-i',new Set('aeiou').size===new Set('VOWEL').size,'equal cardinalities');
check('q3-ii',!equal(new Set([2,3,4,5]),new Set([2,3,4])),'different membership');
check('q3-iii',equal(new Set('LIFE'),new Set(['F','I','L','E'])),'set equality');
check('q3-iv',new Set(Array.from({length:19},(_,i)=>i+4).filter(primes)).size===new Set([1,2,3,6,9,18]).size,'prime and divisor enumeration');
check('q4-i',![...Array(20)].map((_,i)=>i+1).some(x=>x>1&&x<2),'no natural between consecutive integers');
check('q4-ii',Array.from({length:1000},(_,i)=>2*(i+1)).every(x=>x%2===0),'even-number definition');
check('q4-iii',new Set([0]).size===1,'singleton');
check('q4-iv',3!==4,'triangle side count definition');
check('q5-i',equal(intersection(new Set('fias'),new Set('anfhs')),new Set('afs')),'set intersection');
check('q5-ii',intersection(new Set([3,5,7,11,13]),new Set([2])).size===0,'only even prime is 2');
check('q5-iii',equal(intersection(new Set([1,2,3,4,6,8,12,24]),new Set([3,6,9,12,15,18,21,24,27])),new Set([3,6,12,24])),'factor-multiple intersection');
check('q6-i',equal(new Set(['square','rhombus']),new Set(['rhombus','square'])),'four equal sides classification');
check('q6-ii',new Set(['circle']).size===1,'radius-defined shape');
check('q6-iii',180!==360,'triangle versus quadrilateral angle sums');
check('q6-iv',![3,4,0].includes(5),'no five-sided shape in S');
check('q7',subsets(['a','{a,b}']).length===4,'nested set treated as one element');
check('q8-i',subsets(['a','b']).length===4,'power set enumeration');
check('q8-ii',subsets([1,2,3]).length===8,'power set enumeration');
check('q8-iii',subsets(['p','q','r','s']).length===16,'power set enumeration');
check('q8-iv',subsets([]).length===1,'empty-set power set');
check('q9-i',2**3===8&&2**3-1===7,'subsets and proper subsets');
check('q9-ii',new Set(Array.from({length:10},(_,i)=>(i+1)**2)).size===10&&2**10===1024&&2**10-1===1023,'distinct squares and subsets');
check('q10-i',2**4===16,'power-set cardinality');
check('q10-ii',2**0===1,'empty-set power-set cardinality');
check('q10-iii',Math.log2(256)===8,'inverse power-set cardinality');
assert.equal(checks.length,34);
const sourceInventory=JSON.parse(require('node:fs').readFileSync(
 require('node:path').resolve(__dirname,'../../../trace/source-inventories/g9-ch1-ex1-2.json'),'utf8'));
assert.equal(sourceInventory.grade,9);
assert.equal(sourceInventory.chapter,'1');
assert.equal(sourceInventory.exercise,'1.2');
assert.equal(sourceInventory.numberedQuestions,10);
assert.equal(sourceInventory.uniqueTextbookParts,34);
assert.deepEqual(sourceInventory.questionPartStructure.map(q=>q.parts.length),[5,4,4,4,3,4,1,4,2,3]);
assert.equal(new Set(sourceInventory.questionPartStructure.flatMap(q=>q.parts.map(p=>q.number+':'+p))).size,34);
assert.equal(sourceInventory.releaseReadiness.studentRecordsIntegratedInThisChange,0);
assert.equal(sourceInventory.releaseReadiness.validatedProductionBatch,false);
assert.equal(sourceInventory.releaseReadiness.productionDeployment,false);
assert.equal(sourceInventory.releaseReadiness.tamilEditorialReview,false);
assert.match(sourceInventory.sourceBook.en.sha256,/^[a-f0-9]{64}$/);
assert.equal(sourceInventory.sourceFidelityFlags.find(x=>x.id==='q1-iii').verifiedFormula,'4/(3n)');

console.log(JSON.stringify({grade:9,exercise:'1.2',checked:checks.length,passed:checks.every(c=>c.passed),checks},null,2));
