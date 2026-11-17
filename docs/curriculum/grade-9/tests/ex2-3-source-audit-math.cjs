'use strict';
// Independent exact verification: 2025 Tamil Nadu SCERT Grade 9 Real Numbers Ex2.3.
// Source: PDF p61 (printed p55); official answer appendix PDF p314 (printed p308).
const assert=require('node:assert/strict'), fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../../../../');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const questions=[];
const env={window:{TriggleRealCh2:{addExercise(ex,n,part,item){
  if(ex===3)questions.push({id:'g9-ch2-ex3-q'+n+(part?'-'+part:''),n,part,...item});
}}}};
vm.runInNewContext(read('site/data/real-numbers/g9-ch2-exercises-a.js'),env);
const ids=[
 'g9-ch2-ex3-q1-i','g9-ch2-ex3-q1-ii','g9-ch2-ex3-q1-iii',
 'g9-ch2-ex3-q2-i','g9-ch2-ex3-q2-ii','g9-ch2-ex3-q2-iii','g9-ch2-ex3-q3'
];
assert.equal(questions.length,7,'must account for 3 numbered questions, 7 source parts');
assert.deepEqual(questions.map(q=>q.id),ids);
assert.equal(new Set(ids).size,7);
const expectedAnswers=[
 '√3≈1.73205','√4.7≈2.16795','√6.5≈2.54951',
 '0.30131001000100001…; 0.30161001000100001…',
 '√3/2 and √(4/5)','√(5/2) and √(8/3)','2.2361, 2.2363'
];
for(let i=0;i<7;i++){
 const q=questions[i];
 assert.equal(q.answer,expectedAnswers[i],q.id+': locked final answer changed');
 assert.equal(q.page,55,q.id+': printed page should be 55');
 assert(q.steps.length>=2,q.id+': source teaching steps missing');
 assert(q.q,q.id+': source question missing');
}
// Construct √n via the semicircle altitude relation BD²=AB×BC=n×1.
for (let i=0;i<3;i++){
 const n=[3,4.7,6.5][i], q=questions[i], height=Math.sqrt(n);
 assert(Math.abs(height*height-n)<1e-12,'semicircle length does not square to radicand');
 assert.equal(q.diagram.kind,'real-number-line');
 assert(Math.abs(q.diagram.target-height)<1e-12);
 assert.equal(q.answer.split('≈')[1],height.toFixed(5));
 assert(q.diagram.min<height&&height<q.diagram.max,'sqrt location outside diagram interval');
}
// BigInt rational comparator: avoids floating-point proof of strict containment.
const f=(n,d=1n)=>[BigInt(n),BigInt(d)];
const less=(a,b)=>a[0]*b[1] < b[0]*a[1];
// (6/7)^2 < (√3/2)^2 < (√(4/5))^2 < (12/13)^2
const q2square=[f(36,49),f(3,4),f(4,5),f(144,169)];
for(let i=0;i<3;i++)assert(less(q2square[i],q2square[i+1]),'Q2(ii) irrational roots are not inside source endpoints');
// √2 < √(5/2) < √(8/3) < √3
const q3square=[f(2),f(5,2),f(8,3),f(3)];
for(let i=0;i<3;i++)assert(less(q3square[i],q3square[i+1]),'Q2(iii) roots not strictly between bounds');
// Reduced fractions whose numerator and denominator are perfect squares have rational square roots.
const isSquare=n=>{let x=BigInt(n);if(x<0n)return false;let lo=0n,hi=x+1n;while(lo+1n<hi){let mid=(lo+hi)>>1n;if(mid*mid<=x)lo=mid;else hi=mid;}return lo*lo===x;};
for(const [n,d] of [[3,4],[4,5],[5,2],[8,3]])assert(!isSquare(n)||!isSquare(d),'irrationality candidate accidentally rational');
// Q2(i): chosen prefixes lie between both specified 2025 source endpoints.
// The hinted rule of *unbounded* increasing zero-runs is what certifies irrationality.
assert(0.3010011000111<0.3013 && 0.3013<0.3016 && 0.3016<0.3020020002);
// Q3: terminating rational solutions fall within the source interval.
const vals=[f(22360679,10000000),f(22361,10000),f(22363,10000),f(22365055,10000000)];
for(let i=0;i<3;i++)assert(less(vals[i],vals[i+1]),'Q3 rational numbers not inside source interval');
const hintsEnv={window:{}};
vm.runInNewContext(read('site/data/why-step-g9.js'),hintsEnv);
const hints=hintsEnv.window.TriggleWhyStepG9.hints;
for (const id of ids){
 assert(hints[id],id+': optional Why-step missing');
 assert.equal(typeof hints[id].en,'string');
 assert(hints[id].en.length>180,id+': expected source-specific English teaching explanation');
}
for (const [id,terms] of Object.entries({
 'g9-ch2-ex3-q1-i':['BD²','AB×BC','√3'],
 'g9-ch2-ex3-q1-ii':['BD²','4.7','2.16795'],
 'g9-ch2-ex3-q1-iii':['BD²','6.5','2.54951'],
 'g9-ch2-ex3-q2-i':['longer runs of zeros','irrational'],
 'g9-ch2-ex3-q2-ii':['36/49','144/169','irrational'],
 'g9-ch2-ex3-q2-iii':['5/2','8/3','perfect squares'],
 'g9-ch2-ex3-q3':['22361/10000','22363/10000']
}))for(const term of terms)assert(hints[id].en.includes(term),id+': missing explanation detail '+term);
const m=JSON.parse(read('site/data/g9-english-completeness-manifest.json'));
const ex=m.chapters.find(c=>c.chapter==='2').exercises.find(e=>e.id==='2.3');
assert.equal(ex.expectedQuestionCount,3);
assert.equal(ex.expectedSubquestionCount,7);
assert.equal(ex.verifiedInThisWorkstream,7);
assert.equal(ex.unresolvedCount,0);
assert.deepEqual(Array.from(ex.verifiedIds),ids);
const audit=read('docs/curriculum/grade-9/exercise-2-3-source-audit-20261117.md');
for(const token of [
 'e6890ec79f4ad09c42f4829f0a14f4fbc3c6814887c4ba14f2b3fa559638c037',
 '261930c244490b9c6f5fcd0abeef6469abdc6fe835c1894916565f2821d7537d',
 '3268cd58e2e02deba652e9aaeee1e78d778782f9729c4f46f53d99d2751c8045',
 '7/7','0'
])assert(audit.includes(token),'source evidence documentation missing '+token);
console.log('PASS: 2025 G9 Ex2.3 7/7 source parts, 3 geometric constructions, exact irrational inequalities, rational containment and 7 English Why-steps.');
