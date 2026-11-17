'use strict';
// TRACE release blocker: source-audited 34-part candidate overlaps 9 live
// Grade 9 Exercise 1.2 parts. Never register all 34 without reconciling IDs.
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const candidate=JSON.parse(read('docs/curriculum/grade-9/candidates/g9-ch1-ex1-2-english-34.json'));
const html=read('site/index.html');
const files=[
 'site/data/textbook-exercises/g9-ch1-ex1-2-q1-en.js',
 'site/data/textbook-exercises/g9-ch1-ex1-2-q2-en.js'
];
for(const file of files)assert(html.includes(path.basename(file)),'Existing released module must be registered: '+file);
const ctx={window:{
 TRIGGLE_CLASSES:{9:{items:[]}},
 TRIGGLE_CURRICULUM:{grades:[{grade:9,chapters:[{number:1,textbookQuestionIds:[]}]}]}
}};
for(const file of files)vm.runInNewContext(read(file),ctx,{filename:file,timeout:5000});
const live=ctx.window.TRIGGLE_CLASSES[9].items;
const candidateIds=new Set(candidate.rows.map(row=>row.id));
const liveIds=new Set(live.map(row=>row.id));
assert.equal(candidate.rows.length,34,'2025 source inventory must remain 34 parts');
assert.equal(candidateIds.size,34,'No duplicate source candidate IDs');
assert.equal(live.length,9,'Expected Q1 (5) and Q2 (4) registered English preview parts');
assert.equal(liveIds.size,9,'No duplicate registered IDs');
const overlap=live.filter(row=>candidateIds.has(row.id));
assert.equal(overlap.length,9,'All 9 Q1/Q2 parts overlap candidate archive');
assert(overlap.every(row=>row.releaseStatus==='english-preview'),'Existing English preview status preserved');
assert(overlap.every(row=>row.translationReview==='pending'),'Tamil approval must not be inferred');
const remaining=candidate.rows.filter(row=>!liveIds.has(row.id));
assert.equal(remaining.length,25,'Only 25 parts remain unregistered from Exercise 1.2');
assert.deepEqual([...new Set(remaining.map(x=>Number(x.question)))],[3,4,5,6,7,8,9,10]);
for(const row of overlap){
 const source=candidate.rows.find(x=>x.id===row.id);
 assert(source&&source.sourceEnglish&&row.q.en.replace(/\s+/gu,'').includes(source.sourceEnglish.replace(/\s+/gu,'')),
   'Already-registered English text differs from source candidate: '+row.id);
 assert.equal(row.answer,source.answer,'Already-registered final answer differs: '+row.id);
}
// Ignore only typesetting whitespace in source expressions; all mathematical
// characters, inequalities, operands and answers must still match exactly.
// Guard the high-risk Q2(iv) quadratic against a typographic en dash masquerading
// as a mathematical minus sign in either the visible source or its fallback.
const quadratic=live.find(row=>row.id==='g9-ch1-ex1.2-q2-iv');
assert(quadratic,'Q2(iv) must be registered');
assert(quadratic.q.en.includes('x²−5x+6'),'Q2(iv) must retain the mathematical minus');
assert(!quadratic.q.en.includes('x²–5x+6'),'En dash is not a mathematical minus');
const quadraticFallback=quadratic.questionMath?.en?.find?.(part=>part&&typeof part==='object')?.fallback;
assert(quadraticFallback?.includes('x²−5x+6'),'Accessible Q2(iv) fallback must retain the mathematical minus');
// Independently protect the mathematical conditions of Q2, rather than
// accepting a matching answer string from the candidate archive alone.
const q2=['i','ii','iii','iv'].map(part=>{
 const row=live.find(item=>item.id==='g9-ch1-ex1.2-q2-'+part);
 assert(row,'Missing Q2('+part+')'); return row;
});
assert.match(q2[0].q.en,/districts in Tamilnadu/i);
assert.match(q2[1].q.en,/straight lines passing through a point/i);
// Q2(ii) must display the actual constructive family, not only describe it in prose.
const linesMath=q2[1].steps.find(step=>step.math?.latex?.includes('y-b=m(x-a)'));
assert(linesMath,'Q2(ii) must display the family of lines through a fixed point');
assert(linesMath.math.fallback.includes('y−b=m(x−a)'),'Accessible line equation missing');
assert(linesMath.math.latex.includes('m=0,1,2'),'Infinite distinct slopes must be visible');
assert.match(q2[2].q.en,/x\s*∈\s*Z/);
assert.match(q2[2].q.en,/x\s*<\s*5/);
assert.match(q2[3].q.en,/x²−5x\+6\s*=\s*0/);
assert.match(q2[3].q.en,/x\s*∈\s*N/);
assert.deepEqual(q2.map(row=>row.answer),['Finite','Infinite','Infinite','Finite']);
// An integer x<5 always has a smaller integer x-1<5; Q2(iii) is infinite.
assert([-100,-1,0,4].every(x=>x<5&&x-1<5));
// The only natural roots of x²-5x+6 are 2 and 3; Q2(iv) is finite.
assert.deepEqual(Array.from({length:20},(_,i)=>i+1).filter(x=>x*x-5*x+6===0),[2,3]);
assert(q2.every(row=>row.translationReview==='pending'));
// Student-facing mathematical notation must remain renderable and accessible.
// Check the actual registered Q2 entries, not only the archived source answers.
for(const row of q2){
 assert(row.answerMath?.latex?.trim(),'Missing KaTeX final answer: '+row.id);
 assert(row.answerMath?.fallback?.trim(),'Missing accessible final answer: '+row.id);
 assert(Array.isArray(row.steps)&&row.steps.length>=3,'Missing explanatory steps: '+row.id);
 for(const [index,step] of row.steps.entries()){
  assert(step.en?.trim(),'Missing English reasoning in step '+index+': '+row.id);
  assert(step.math?.latex?.trim(),'Missing KaTeX in step '+index+': '+row.id);
  assert(step.math?.fallback?.trim(),'Missing accessible math fallback in step '+index+': '+row.id);
 }
}
for(const row of q2.slice(2)){
 const parts=row.questionMath?.en;
 assert(Array.isArray(parts),'Structured question math missing: '+row.id);
 assert(parts.some(part=>typeof part==='object'&&part.latex?.trim()&&part.fallback?.trim()),
  'Question must have both KaTeX and accessible fallback: '+row.id);
}
// The learner must see substitution, not only a claim that the roots work.
// Independently calculate the residuals and require both checked substitutions
// in the student-facing KaTeX and accessible fallback.
const rootCheck=q2[3].steps.find(step=>step.en?.includes('Check both values'));
assert(rootCheck,'Q2(iv) must explicitly verify both natural-number roots');
for(const x of [2,3]){
 const residual=x*x-5*x+6;
 assert.equal(residual,0,'Claimed root does not satisfy the original quadratic: '+x);
 assert(rootCheck.math?.latex?.includes(x+'^2-5('+x+')+6=0'),
  'Missing exact root substitution in KaTeX: '+x);
 assert(rootCheck.math?.fallback?.includes(x+'²−5('+x+')+6=0'),
  'Missing accessible root substitution: '+x);
}
// Q3(i–iv) are authored but intentionally NOT registered. Validate the actual
// staged lessons against the audited IDs and independently derived set results.
const stagedCtx={window:{}};
vm.runInNewContext(read('site/data/textbook-exercises/g9-ch1-ex1-2-q3-staged-en.js'),stagedCtx,{timeout:5000});
const staged=Array.from(stagedCtx.window.TRIGGLE_G9_EX1_2_Q3_STAGED||[]);
assert.equal(staged.length,4,'Exactly four Q3 lessons should be staged');
const expectedQ3=[
 ['i','Equivalent sets',5,5,false],
 ['ii','Unequal sets',4,3,false],
 ['iii','Equal sets',4,4,true],
 ['iv','Equivalent sets',6,6,false]
];
const actualSets=[
 [['a','e','i','o','u'],['V','O','W','E','L']],
 [[2,3,4,5],[2,3,4]],
 [['L','I','F','E'],['F','I','L','E']],
 [[5,7,11,13,17,19],[1,2,3,6,9,18]]
];
// Derive Q3(iv) members from the textbook predicates rather than trusting
// two hard-coded arrays that could share the same transcription mistake.
const isPrime=n=>Number.isInteger(n)&&n>=2&&
 Array.from({length:Math.floor(Math.sqrt(n))-1},(_,i)=>i+2).every(d=>n%d!==0);
const derivedPrimes=Array.from({length:19},(_,i)=>i+4).filter(isPrime);
const derivedDivisors=Array.from({length:18},(_,i)=>i+1).filter(n=>18%n===0);
assert.deepEqual(derivedPrimes,actualSets[3][0],
 'Q3(iv) prime enumeration must follow 3 < x < 23');
assert.deepEqual(derivedDivisors,actualSets[3][1],
 'Q3(iv) positive divisors of 18 must be independently enumerated');
assert.equal(derivedPrimes.length,derivedDivisors.length);
assert(derivedPrimes.some(x=>!derivedDivisors.includes(x)),
 'Q3(iv) sets must be equivalent but not equal');
for(let i=0;i<expectedQ3.length;i++){
 const [part,answer,nA,nB,equal]=expectedQ3[i];
 const row=staged[i],id='g9-ch1-ex1.2-q3-'+part;
 assert.equal(row.id,id,'Staged Q3 order/ID mismatch');
 assert(candidateIds.has(id),'Staged ID absent from source inventory: '+id);
 // Protect exact source-question fidelity, not merely the ID and answer.
 // Ignore whitespace introduced by mobile layout, but preserve every symbol,
 // bound, letter, and operand from the previously audited English source.
 const source=candidate.rows.find(item=>item.id===id);
 const compact=value=>value.replace(/\s+/gu,'');
 assert(row.q?.en&&compact(row.q.en).includes(compact(source.sourceEnglish)),
  'Staged question differs from archived source English: '+id);
 assert(compact(row.q.en).includes(compact(source.stem)),
  'Staged question omits textbook Q3 stem: '+id);
 assert(!liveIds.has(id),'Staged Q3 already registered: '+id);
 const [a,b]=actualSets[i];
 assert.equal(new Set(a).size,nA);
 assert.equal(new Set(b).size,nB);
 assert.equal(a.length===b.length&&a.every(x=>b.includes(x)),equal);
 assert.equal(row.answer,answer,'Incorrect Q3 classification: '+id);
 // Verify that the *student-visible* enumerations match the independently
 // derived sets. Checking only the answer label would miss a wrong element.
 const normalizeSet=value=>value.replace(/\s+/gu,'');
 const expectedMembers=actualSets[i].map(members=>'{'+members.join(',')+'}');
 const displayedSteps=row.steps.map(step=>normalizeSet(step.math?.fallback||''));
 for(const members of expectedMembers){
  assert(displayedSteps.some(display=>display.includes(normalizeSet(members))),
   'Staged accessible fallback omits or misstates enumerated members '+members+': '+id);
 }
 // Keep visual KaTeX and accessible fallback enumerations in agreement.
 const latexSteps=row.steps.map(step=>(step.math?.latex||'').replace(/\s+/gu,''));
 for(const members of expectedMembers){
  const latexSet='\\{'+members.slice(1,-1)+'\\}';
  assert(latexSteps.some(display=>display.includes(latexSet)),
   'Staged KaTeX omits or misstates enumerated members '+members+': '+id);
 }
 if(['i','ii','iii','iv'].includes(part)){
  const questionParts=row.questionMath?.en;
  assert(Array.isArray(questionParts),'Set-builder question needs structured math: '+id);
  const expectedDisplays=part==='iv'?2:1;
  const displays=questionParts.filter(x=>x&&typeof x==='object');
  assert.equal(displays.length,expectedDisplays,'Missing set-builder display: '+id);
  for(const display of displays){
   assert(display.latex?.trim()&&display.fallback?.trim()&&display.display===true,
    'Missing readable KaTeX or accessible question fallback: '+id);
  }
 }

 assert.equal(row.releaseStatus,'staged-english-not-registered');
 assert.equal(row.translationReview,'pending');
 assert.equal(row.sourceFidelity?.tamilEditorial,'deferred');
 assert(Array.isArray(row.steps)&&row.steps.length>=3,'Missing Q3 teaching steps: '+id);
 for(const step of row.steps){
  assert(step.en?.trim()&&step.math?.latex?.trim()&&step.math?.fallback?.trim(),
   'Missing explanation/KaTeX/accessibility fallback: '+id);
 }
 assert(row.answerMath?.latex?.trim()&&row.answerMath?.fallback?.trim(),
  'Missing accessible Q3 final answer: '+id);
}
assert(!html.includes('g9-ch1-ex1-2-q3-staged-en.js'),
 'Staged Q3 must not be loaded by the student-facing index');
// Guard the Q3(ii) strict-bound explanation against a partial visual update:
// students and screen readers must both see the three-member count.
const q3ii=staged.find(row=>row.id==='g9-ch1-ex1.2-q3-ii');
assert(q3ii,'Missing staged Q3(ii)');
const q3iiEnumeration=q3ii.steps.find(step=>step.math?.latex?.includes('n(D)=3'));
assert(q3iiEnumeration,'Q3(ii) must display n(D)=3 in KaTeX');
assert(q3iiEnumeration.math.fallback.includes('n(D) = 3'),
 'Q3(ii) accessible fallback must state n(D) = 3');
assert(q3iiEnumeration.math.latex.includes('1<x<5'),
 'Q3(ii) must preserve both strict inequality bounds');
assert(q3iiEnumeration.en.includes('neither endpoint 1 nor endpoint 5'),
 'Q3(ii) must explain excluded endpoints in plain English');
// Fail loudly if somebody tries to register the full candidate module on top of Q1/Q2.
const full=read('site/data/textbook-exercises/g9-ch1-ex1-2-en.js');
assert(!html.includes('g9-ch1-ex1-2-en.js'),'Full 34-part archive must remain isolated');
assert.throws(()=>vm.runInNewContext(full,ctx,{filename:'g9-ch1-ex1-2-en.js',timeout:5000}),
 /Duplicate Grade 9 textbook ID/,'Bulk release must reject duplicate IDs');
console.log('PASS TRACE G9 Ex1.2: 34 source parts, 9 registered English previews, 25 remaining, 9 ID collisions blocked; no Tamil/teacher approval claimed.');
