'use strict';
// TRACE Grade 9 Ex1.2 Q5(iii) & Q6(i–iv) English source + independent mathematics STUDENT RELEASE gate.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const manifest=JSON.parse(read('site/data/textbook-fidelity/g9-ch1-ex1-2-q5-iii-q6.json'));
const candidates=JSON.parse(read('docs/curriculum/grade-9/candidates/g9-ch1-ex1-2-english-34.json'));
const html=read('site/index.html'),sw=read('site/service-worker.js');
const student='site/data/textbook-exercises/g9-ch1-ex1-2-q5-iii-q6-en.js';
const whyModule='site/data/why-step-g9-ex1-2-q5-iii-q6.js';

assert.equal(manifest.grade,9);
assert.equal(manifest.chapter,'1');
assert.equal(manifest.exercise,'1.2');
assert.equal(manifest.batch,'q5(iii)-q6(iv)');
assert.equal(manifest.release,'english-release-candidate');
assert.equal(manifest.english.printedPage,12);
assert.equal(manifest.english.pdfPage,18);
assert.deepEqual(manifest.tamil.printedPages,[13,14]);
assert.deepEqual(manifest.tamil.pdfPages,[19,20]);
assert.equal(manifest.tamil.translationReview,'deferred');
assert.equal(manifest.parts.length,5);
assert.equal(html.split('g9-ch1-ex1-2-q5-iii-q6-en.js').length-1,1,'Student Q5(iii)-Q6 module must be loaded once');
assert.equal(html.split('why-step-g9-ex1-2-q5-iii-q6.js').length-1,1,'Q5(iii)-Q6 Why-step module must be loaded once');
assert(sw.includes("'./data/textbook-exercises/g9-ch1-ex1-2-q5-iii-q6-en.js'"),'Q5(iii)-Q6 student module must be offline cached');
assert(sw.includes("'./data/why-step-g9-ex1-2-q5-iii-q6.js'"),'Q5(iii)-Q6 learning bridges must be offline cached');

const ctx={window:{},console};vm.createContext(ctx);
for(const p of [
  'site/data/class-9.js',
  'site/data/curriculum.js',
  'site/data/textbook-exercises/g9-ch1-ex1-2-q1-en.js',
  'site/data/textbook-exercises/g9-ch1-ex1-2-q2-en.js',
  student,
  'site/data/why-step-g9.js',
  'site/data/why-step-g9-ex1-2-q1.js',
  'site/data/why-step-g9-ex1-2-q2.js',
  whyModule,
  'site/data/problem-difficulty.js'
])vm.runInContext(read(p),ctx,{filename:p,timeout:10000});

const items=ctx.window.TRIGGLE_CLASSES[9].items;
const ch=ctx.window.TRIGGLE_CURRICULUM.grades.find(x=>x.grade===9).chapters.find(x=>String(x.number)==='1');
const ids=Array.from(ctx.window.TRIGGLE_G9_EX1_2_Q5III_Q6_IDS);
assert.deepEqual(ids,['g9-ch1-ex1.2-q5-iii','g9-ch1-ex1.2-q6-i','g9-ch1-ex1.2-q6-ii','g9-ch1-ex1.2-q6-iii','g9-ch1-ex1.2-q6-iv']);
assert.deepEqual(ids,manifest.parts.map(x=>x.id));
assert.equal(new Set(items.map(x=>x.id)).size,items.length,'No duplicate student IDs');
assert.equal(new Set(ch.textbookQuestionIds).size,ch.textbookQuestionIds.length,'No duplicate menu IDs');

const fallback=x=>Array.isArray(x)?x.map(fallback).join(''):x?.latex?x.fallback:x;
const latex=[];

for(const m of manifest.parts){
  const q=items.find(x=>x.id===m.id);
  const cand=candidates.rows.find(x=>x.id===m.id);
  assert(q&&cand,'Missing registered record or audited candidate '+m.id);
  assert.equal(q.kind,'textbook');
  assert.equal(q.classNum,9);
  assert.equal(q.chapter,'1');
  assert.equal(q.exercise,'1.2');
  assert.equal(q.q.en,m.questionStem+'\n('+m.part+') '+m.exactEnglish,'Exact normalized source-text prompt '+m.id);
  assert.equal(q.q.en,cand.question+'. '+cand.stem+'\n('+cand.part+') '+cand.sourceEnglish,'Candidate audit parity '+m.id);
  assert.equal(q.answer,m.expectedAnswer);
  assert.equal(q.answer,cand.answer);
  assert.equal(q.releaseStatus,'english-preview');
  assert(!q.q.ta,'No invented Tamil text');
  assert.match(q.label.ta,/English only; Tamil review pending/);
  assert.equal(q.translationReview,'pending');
  const pageIndex=manifest.questions.indexOf(m.question);
  assert.equal(q.sourceFidelity.taPdfPage,manifest.tamil.pdfPages[pageIndex]);
  assert.equal(q.sourceFidelity.taPrintedPage,manifest.tamil.printedPages[pageIndex]);
  assert.equal(q.steps.length,cand.steps.length,'Preserved step count '+m.id);
  assert.equal(fallback(q.questionMath.en),q.q.en,'Exact accessible question fallback '+m.id);
  assert.equal(fallback(q.answerMath),q.answer,'Exact accessible answer fallback '+m.id);
  for(const [j,s] of q.steps.entries()){
    assert(s.en?.length>=35,'Clear step-by-step English explanation required '+m.id+'/'+j);
    assert.equal(s.eq,cand.steps[j].equation,'Audited equation retained '+m.id+'/'+j);
    assert.equal(fallback(s.math),s.eq,'Exact accessible step fallback '+m.id+'/'+j);
    assert.equal(fallback(s.reasonMath.en),s.en,'Exact accessible reason fallback '+m.id+'/'+j);
    assert(s.math.latex&&!s.math.latex.includes('javascript:'),'Authored structured KaTeX '+m.id+'/'+j);
    latex.push({id:m.id,latex:s.math.latex});
  }
  for(const seg of Array.isArray(q.questionMath.en)?q.questionMath.en:[q.questionMath.en]){
    if(seg?.latex)latex.push({id:m.id,latex:seg.latex});
  }
  latex.push({id:m.id,latex:q.answerMath.latex});
  assert.equal(ch.textbookQuestionIds.filter(id=>id===m.id).length,1);
  const hint=ctx.window.TriggleWhyStepG9.hints[m.id];
  assert(hint&&hint.en?.length>=35,'Source-pinned learning bridge '+m.id);
  assert.equal(hint.ta,undefined,'No invented Tamil hint '+m.id);
  assert.equal(hint.expected,q.steps[hint.step].en,'Why-step must match real solution '+m.id);
  const difficulty=ctx.window.TriggleDifficulty.get(q);
  assert(difficulty&&difficulty.grade===9&&['easy','medium','difficult'].includes(difficulty.level),'Explicit difficulty '+m.id);
}

// Symbol explanation checks for student clarity
const q5iii=items.find(x=>x.id==='g9-ch1-ex1.2-q5-iii');
assert(q5iii.steps[0].en.includes('such that')&&q5iii.steps[0].en.includes('{ }'),'Q5(iii) explains set-builder braces and colon');
assert(q5iii.steps[1].en.includes('strictly less than'),'Q5(iii) explains strict inequality <');
assert(q5iii.steps[2].en.includes('∩')&&q5iii.steps[2].en.includes('intersection'),'Q5(iii) explains intersection symbol ∩');

const q6iii=items.find(x=>x.id==='g9-ch1-ex1.2-q6-iii');
assert(q6iii.steps[0].en.includes('∠')&&q6iii.steps[0].en.includes('°'),'Q6(iii) explains angle ∠ and degree ° symbols');
assert.deepEqual(Array.from(q6iii.steps[0].reasonMath.en.filter(part=>part.latex),part=>part.fallback),['∠A + ∠B + ∠C = 180°','180°']);
assert(q6iii.steps[1].reasonMath.en.some(part=>part.latex==='360^\\circ'),'The degree value uses the same notation in prose and working');

const q6iv=items.find(x=>x.id==='g9-ch1-ex1.2-q6-iv');
assert(q6iv.steps[2].en.includes('∅')&&q6iv.steps[2].en.includes('empty'),'Q6(iv) explains empty set symbol ∅');

// Independent mathematics verification
const E=Array.from({length:24},(_,i)=>i+1).filter(n=>24%n===0);
const F=Array.from({length:29},(_,i)=>i+1).filter(n=>n%3===0);
const EcapF=E.filter(n=>F.includes(n));
assert.deepEqual(E,[1,2,3,4,6,8,12,24],'Factors of 24');
assert.deepEqual(F,[3,6,9,12,15,18,21,24,27],'Positive multiples of 3 strictly below 30');
assert.deepEqual(EcapF,[3,6,12,24],'Intersection E ∩ F');
assert.equal(EcapF.length>0?'Overlapping':'Disjoint',q5iii.answer);

const S=[
  {name:'square',sides:4,equalSides:4,hasRadius:false,angleSum:360},
  {name:'rectangle',sides:4,equalSides:2,hasRadius:false,angleSum:360},
  {name:'circle',sides:0,equalSides:0,hasRadius:true,angleSum:null},
  {name:'rhombus',sides:4,equalSides:4,hasRadius:false,angleSum:360},
  {name:'triangle',sides:3,equalSides:null,hasRadius:false,angleSum:180}
];
const fmtSet=arr=>arr.length===0?'∅':'{'+arr.map(s=>s.name).join(', ')+'}';
assert.equal(fmtSet(S.filter(s=>s.sides===4&&s.equalSides===4)),items.find(x=>x.id==='g9-ch1-ex1.2-q6-i').answer);
assert.equal(fmtSet(S.filter(s=>s.hasRadius)),items.find(x=>x.id==='g9-ch1-ex1.2-q6-ii').answer);
assert.equal(fmtSet(S.filter(s=>s.angleSum===180)),q6iii.answer);
assert.equal(fmtSet(S.filter(s=>s.sides===5)),q6iv.answer);

const katex=require('../assets/vendor/katex/katex.min.js');
for(const entry of latex){
  const rendered=katex.renderToString(entry.latex,{throwOnError:true,trust:false,strict:'error',output:'htmlAndMathml'});
  assert(rendered.includes('katex-html')&&rendered.includes('<math'),'KaTeX visual and accessible output: '+entry.id);
}

assert.throws(()=>vm.runInContext(read(student),ctx,{filename:student,timeout:10000}),/Duplicate Grade 9 Ex1\.2 Q5\(iii\)-Q6/,'Duplicate registered question must fail');
console.log('PASS Grade 9 Ex1.2 Q5(iii) & Q6(i–iv) release: 5 exact-source English parts, 15 complete steps, symbol explanations, offline KaTeX, independent math checks, Why-step hints, and offline cache.');
