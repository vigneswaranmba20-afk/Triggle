'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'../..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const inv=JSON.parse(read('docs/trace/source-inventories/g10-ch8-ex8-3.json'));

const EXPECTED_IDS=[
  'c10-8-ex8-3-q1',
  'c10-8-ex8-3-q2',
  'c10-8-ex8-3-q3-i','c10-8-ex8-3-q3-ii',
  'c10-8-ex8-3-q4',
  'c10-8-ex8-3-q5-i','c10-8-ex8-3-q5-ii',
  'c10-8-ex8-3-q6-i','c10-8-ex8-3-q6-ii',
  'c10-8-ex8-3-q7-i','c10-8-ex8-3-q7-ii','c10-8-ex8-3-q7-iii','c10-8-ex8-3-q7-iv',
  'c10-8-ex8-3-q8-i','c10-8-ex8-3-q8-ii','c10-8-ex8-3-q8-iii','c10-8-ex8-3-q8-iv',
  'c10-8-ex8-3-q9-i','c10-8-ex8-3-q9-ii','c10-8-ex8-3-q9-iii','c10-8-ex8-3-q9-iv',
  'c10-8-ex8-3-q10',
  'c10-8-ex8-3-q11',
  'c10-8-ex8-3-q12-i','c10-8-ex8-3-q12-ii','c10-8-ex8-3-q12-iii',
  'c10-8-ex8-3-q13-i','c10-8-ex8-3-q13-ii','c10-8-ex8-3-q13-iii'
];
assert.equal(EXPECTED_IDS.length,inv.questionParts,'29 distinct parts');

// 1. Load all site data scripts as in site/index.html
const html=read('site/index.html'),cache=read('site/service-worker.js');
const mods=['data/textbook-exercises/g10-ch8-ex8-3-q1-q6.js','data/textbook-exercises/g10-ch8-ex8-3-q7-q13.js'];
const scripts=[...html.matchAll(/<script src="\.\/(data\/[^?"']+)(?:\?[^"']*)?"[^>]*><\/script>/g)].map(m=>m[1]);
for(const m of mods){
  assert.equal(scripts.filter(s=>s===m).length,1,'script tag once: '+m);
  assert.ok(cache.includes('./'+m),'service worker caches '+m);
}
for(const svg of ['assets/grade10-ch8/ex8-3-q1-tree.svg','assets/grade10-ch8/ex8-3-q2-tree.svg','assets/grade10-ch8/ex8-3-q11-target.svg']){
  assert.ok(fs.existsSync(path.join(root,'site',svg)),'SVG exists: '+svg);
  assert.ok(cache.includes('./'+svg),'service worker caches '+svg);
}

const ctx={window:{},console};vm.createContext(ctx);
for(const f of scripts)vm.runInContext(read('site/'+f),ctx,{filename:f,timeout:10000});
const items=ctx.window.TRIGGLE_CLASSES[10].items;
assert.equal(new Set(items.map(x=>x.id)).size,items.length,'unique IDs across Grade 10');
const ch8=ctx.window.TRIGGLE_CURRICULUM.grades.find(g=>g.grade===10).chapters.find(c=>String(c.number)==='8');

const ex83=items.filter(x=>x.chapter==='8'&&x.exercise==='8.3');
assert.deepEqual(Array.from(ex83,x=>x.id),EXPECTED_IDS,'exact 29 Exercise 8.3 IDs in order');

// 2. Bilingual, source-reference, KaTeX math, and difficulty checks for all 29 parts
for(const r of ex83){
  assert.ok(r.q.en&&r.q.ta,'EN and TA prompts for '+r.id);
  assert.match(r.q.ta,/\p{Script=Tamil}/u,'Tamil script in q.ta for '+r.id);
  assert.equal(r.translationReview,'pending',r.id);
  assert.equal(r.tamilQuestionSourceVerified,true,r.id);
  assert.equal(r.tamilWorkedSolutionReview,'pending',r.id);
  assert.ok(r.steps.length>=2,'steps for '+r.id);
  assert.ok(r.steps.every(s=>s.en&&s.ta&&/\p{Script=Tamil}/u.test(s.ta)&&s.math&&s.math.latex&&s.math.fallback===s.eq),'step math & TA for '+r.id);
  assert.ok(r.answer?.en&&r.answer?.ta&&r.answerMath?.latex?.includes('boxed')&&r.answerMath.fallback===r.answer.en,'answerMath for '+r.id);
  assert.equal(ch8.textbookQuestionIds.filter(x=>x===r.id).length,1,'chapter registration '+r.id);
  assert.equal(ctx.window.TriggleDifficulty.get(r).grade,10,'difficulty metadata '+r.id);
}

// 3. Explicit check of Q8's four distinct Tamil parts and printed-label discrepancy
const q8=ex83.filter(x=>x.id.startsWith('c10-8-ex8-3-q8-'));
assert.equal(q8.length,4);
assert.match(q8[0].q.ta,/\(i\)\s*அனைத்தும் தலையாகக் கிடைக்க/);
assert.match(q8[1].q.ta,/\(ii\)\s*குறைந்தபட்சம் ஒரு பூ கிடைக்க/);
assert.match(q8[2].q.ta,/\(ii\)\s*அதிகபட்சம் ஒரு தலை கிடைக்க/);
assert.ok(q8[2].sourceDiscrepancy&&q8[2].sourceDiscrepancy.includes('(ii)'));
assert.match(q8[3].q.ta,/\(iv\)\s*அதிகபட்சம் இரண்டு பூக்கள் கிடைக்க/);

// 4. Direct enumeration & independent arithmetic verification
const gcd=(a,b)=>b?gcd(b,a%b):a;
const frac=(n,d)=>{const g=gcd(n,d);return (d/g===1)?String(n/g):`${n/g}/${d/g}`;};

// 3-coin outcomes
const coins3=[];
for(const a of ['H','T'])for(const b of ['H','T'])for(const c of ['H','T'])coins3.push(a+b+c);
assert.equal(coins3.length,8);
assert.equal(frac(coins3.filter(s=>s.includes('TT')).length,8),'3/8'); // Q4
assert.equal(frac(coins3.filter(s=>s==='HHH').length,8),'1/8');         // Q8(i) & Q13(i)
assert.equal(frac(coins3.filter(s=>s.includes('T')).length,8),'7/8');   // Q8(ii)
assert.equal(frac(coins3.filter(s=>(s.match(/H/g)||[]).length<=1).length,8),'1/2'); // Q8(iii)
assert.equal(frac(coins3.filter(s=>(s.match(/T/g)||[]).length<=2).length,8),'7/8'); // Q8(iv)
assert.equal(frac(coins3.filter(s=>{const h=(s.match(/H/g)||[]).length;return h===1||h===2;}).length,8),'3/4'); // Q13(ii)
assert.equal(frac(coins3.filter(s=>s==='TTT').length,8),'1/8');         // Q13(iii)

// 2-ball ordered pairs from 1..6 (Q2)
const pairs2=[];
for(let i=1;i<=6;i++)for(let j=1;j<=6;j++)if(i!==j)pairs2.push([i,j]);
assert.equal(pairs2.length,30);

// Q3
assert.equal(frac(15,17+15),'15/32');
assert.equal((17/32)*640,340);

// Q5: squares > 500 up to 1000
const sq=[];for(let k=1;k*k<=1000;k++)if(k*k>500)sq.push(k*k);
assert.equal(sq.length,9);
assert.equal(frac(sq.length,1000),'9/1000');
assert.equal(frac(sq.length-1,999),'8/999');

// Q6: (x+8)/(x+20) = 2x/(x+12)
let q6x=null;for(let x=1;x<=100;x++)if((x+8)*(x+12)===2*x*(x+20))q6x=x;
assert.equal(q6x,4);
assert.equal(frac(q6x,12+q6x),'1/4');

// Q7: two dice
const dice2=[];for(let a=1;a<=6;a++)for(let b=1;b<=6;b++)dice2.push([a,b]);
const isPrime=n=>n>=2&&Array.from({length:n-2},(_,i)=>i+2).every(d=>n%d!==0);
assert.equal(frac(dice2.filter(([a,b])=>a===b).length,36),'1/6');
assert.equal(frac(dice2.filter(([a,b])=>isPrime(a*b)).length,36),'1/6');
assert.equal(frac(dice2.filter(([a,b])=>isPrime(a+b)).length,36),'5/12');
assert.equal(frac(dice2.filter(([a,b])=>a+b===1).length,36),'0');

// Q9: 5R, 6W, 7G, 8B
assert.equal(frac(6,26),'3/13');
assert.equal(frac(8+5,26),'1/2');
assert.equal(frac(26-6,26),'10/13');
assert.equal(frac(5+7,26),'6/13');

// Q10: x/(20+x) = 3/8
let q10x=null;for(let x=1;x<=100;x++)if(8*x===3*(20+x))q10x=x;
assert.equal(q10x,12);

// Q11: pi * 1^2 / (4 * 3) with pi = 3.14
assert.equal(frac(314,1200),'157/600');

// Q12: 6 days Mon..Sat (0..5)
const days2=[];for(let a=0;a<6;a++)for(let b=0;b<6;b++)days2.push([a,b]);
assert.equal(frac(days2.filter(([a,b])=>a===b).length,36),'1/6');
assert.equal(frac(days2.filter(([a,b])=>a!==b).length,36),'5/6');
assert.equal(frac(days2.filter(([a,b])=>Math.abs(a-b)===1).length,36),'5/18');

// Check expected answer strings
const ansById=Object.fromEntries(ex83.map(x=>[x.id,x.answer.en]));
for(const [id,expected] of [
  ['c10-8-ex8-3-q3-i','15/32'],['c10-8-ex8-3-q3-ii','340'],
  ['c10-8-ex8-3-q4','3/8'],['c10-8-ex8-3-q5-i','9/1000'],['c10-8-ex8-3-q5-ii','8/999'],
  ['c10-8-ex8-3-q6-i','1/4'],['c10-8-ex8-3-q6-ii','x = 4'],
  ['c10-8-ex8-3-q7-i','1/6'],['c10-8-ex8-3-q7-ii','1/6'],['c10-8-ex8-3-q7-iii','5/12'],['c10-8-ex8-3-q7-iv','0'],
  ['c10-8-ex8-3-q8-i','1/8'],['c10-8-ex8-3-q8-ii','7/8'],['c10-8-ex8-3-q8-iii','1/2'],['c10-8-ex8-3-q8-iv','7/8'],
  ['c10-8-ex8-3-q9-i','3/13'],['c10-8-ex8-3-q9-ii','1/2'],['c10-8-ex8-3-q9-iii','10/13'],['c10-8-ex8-3-q9-iv','6/13'],
  ['c10-8-ex8-3-q10','12'],['c10-8-ex8-3-q11','157/600'],
  ['c10-8-ex8-3-q12-i','1/6'],['c10-8-ex8-3-q12-ii','5/6'],['c10-8-ex8-3-q12-iii','5/18'],
  ['c10-8-ex8-3-q13-i','1/8'],['c10-8-ex8-3-q13-ii','3/4'],['c10-8-ex8-3-q13-iii','1/8']
]){
  assert.ok(ansById[id].includes(expected),`Expected ${expected} in ${id} answer, got ${ansById[id]}`);
}
console.log('PASS G10 Ex8.3 (29 parts): IDs, EN/TA coverage, Q8 Tamil labels, KaTeX math, SVG assets, independent enumeration');
