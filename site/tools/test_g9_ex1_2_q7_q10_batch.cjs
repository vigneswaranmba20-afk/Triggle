'use strict';
// TRACE Grade 9 Ex1.2 Q7, Q8(i–iv), Q9(i–ii), and Q10(i–iii) English source + independent mathematics STUDENT RELEASE gate.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const manifest=JSON.parse(read('site/data/textbook-fidelity/g9-ch1-ex1-2-q7-q10.json'));
const candidates=JSON.parse(read('docs/curriculum/grade-9/candidates/g9-ch1-ex1-2-english-34.json'));
const html=read('site/index.html'),sw=read('site/service-worker.js');
const student='site/data/textbook-exercises/g9-ch1-ex1-2-q7-q10-en.js';
const whyModule='site/data/why-step-g9-ex1-2-q7-q10.js';

assert.equal(manifest.grade,9);
assert.equal(manifest.chapter,'1');
assert.equal(manifest.exercise,'1.2');
assert.equal(manifest.batch,'q7-q10(iii)');
assert.equal(manifest.release,'english-release-candidate');
assert.equal(manifest.english.printedPage,12);
assert.equal(manifest.english.pdfPage,18);
assert.equal(manifest.english.sourcePdfSha256,candidates.sourcePdfSha256);
assert.equal(manifest.tamil.printedPage,13);
assert.equal(manifest.tamil.pdfPage,19);
assert.equal(manifest.tamil.translationReview,'deferred');
assert.equal(manifest.parts.length,10);
assert.equal(html.split('g9-ch1-ex1-2-q7-q10-en.js').length-1,1,'Student Q7-Q10 module must be loaded once');
assert.equal(html.split('why-step-g9-ex1-2-q7-q10.js').length-1,1,'Q7-Q10 Why-step module must be loaded once');
assert(sw.includes("'./data/textbook-exercises/g9-ch1-ex1-2-q7-q10-en.js'"),'Q7-Q10 student module must be offline cached');
assert(sw.includes("'./data/why-step-g9-ex1-2-q7-q10.js'"),'Q7-Q10 learning bridges must be offline cached');
assert(!html.includes('g9-ch1-ex1-2-en.js'),'Do not register the 34-part staging module');

const ctx={window:{},console};vm.createContext(ctx);
for(const p of [
  'site/data/class-9.js',
  'site/data/curriculum.js',
  'site/data/textbook-exercises/g9-ch1-ex1-2-q1-en.js',
  'site/data/textbook-exercises/g9-ch1-ex1-2-q2-en.js',
  'site/data/textbook-exercises/g9-ch1-ex1-2-q5-iii-q6-en.js',
  student,
  'site/data/why-step-g9.js',
  'site/data/why-step-g9-ex1-2-q1.js',
  'site/data/why-step-g9-ex1-2-q2.js',
  'site/data/why-step-g9-ex1-2-q5-iii-q6.js',
  whyModule,
  'site/data/problem-difficulty.js'
])vm.runInContext(read(p),ctx,{filename:p,timeout:10000});

const items=ctx.window.TRIGGLE_CLASSES[9].items;
const ch=ctx.window.TRIGGLE_CURRICULUM.grades.find(x=>x.grade===9).chapters.find(x=>String(x.number)==='1');
const ids=Array.from(ctx.window.TRIGGLE_G9_EX1_2_Q7_Q10_IDS);
assert.deepEqual(ids,[
  'g9-ch1-ex1.2-q7',
  'g9-ch1-ex1.2-q8-i',
  'g9-ch1-ex1.2-q8-ii',
  'g9-ch1-ex1.2-q8-iii',
  'g9-ch1-ex1.2-q8-iv',
  'g9-ch1-ex1.2-q9-i',
  'g9-ch1-ex1.2-q9-ii',
  'g9-ch1-ex1.2-q10-i',
  'g9-ch1-ex1.2-q10-ii',
  'g9-ch1-ex1.2-q10-iii'
]);
assert.deepEqual(ids,manifest.parts.map(x=>x.id));
assert.equal(new Set(items.map(x=>x.id)).size,items.length,'No duplicate student IDs');
assert.equal(new Set(ch.textbookQuestionIds).size,ch.textbookQuestionIds.length,'No duplicate menu IDs');

const fallback=x=>Array.isArray(x)?x.map(fallback).join(''):x?.latex?x.fallback:x;
const expectedPromptFromCand=cand=>cand.part==='whole'
  ?`${cand.question}. ${cand.stem}`
  :cand.stem
    ?`${cand.question}. ${cand.stem}\n(${cand.part}) ${cand.sourceEnglish}`
    :`${cand.question}. (${cand.part}) ${cand.sourceEnglish}`;
const latex=[];
let stepCount=0;

for(const m of manifest.parts){
  const q=items.find(x=>x.id===m.id);
  const cand=candidates.rows.find(x=>x.id===m.id);
  assert(q&&cand&&cand.verifiedInOriginalAudit,'Missing registered record or audited candidate '+m.id);
  assert.equal(q.kind,'textbook');
  assert.equal(q.classNum,9);
  assert.equal(q.chapter,'1');
  assert.equal(q.exercise,'1.2');
  assert.equal(q.q.en,m.expectedPrompt,'Exact normalized source-text prompt '+m.id);
  assert.equal(q.q.en,expectedPromptFromCand(cand),'Candidate audit parity '+m.id);
  assert(q.q.en.includes(cand.sourceEnglish),'Exact source English substring preserved '+m.id);
  assert.equal(q.answer,m.expectedAnswer);
  assert.equal(q.answer,cand.answer);
  assert.equal(q.releaseStatus,'english-preview');
  assert(!q.q.ta,'No invented Tamil text');
  assert.match(q.label.ta,/English only; Tamil review pending/);
  assert.equal(q.translationReview,'pending');
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
    stepCount++;
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
assert.equal(stepCount,33,'All 33 audited steps across Q7-Q10 preserved');

// Beginner-friendly symbol & structure checks
const q7=items.find(x=>x.id==='g9-ch1-ex1.2-q7');
assert(q7.steps[0].en.includes('{ }')&&q7.steps[0].en.includes('inner set'),'Q7 explains nested braces and inner set');
assert(q7.answer.includes('{{a, b}}'),'Q7 preserves nested singleton {{a, b}}');

const q8iii=items.find(x=>x.id==='g9-ch1-ex1.2-q8-iii');
assert.equal(q8iii.steps.length,5,'Q8(iii) segmented into 5 steps for mobile');
assert.match(q8iii.answerMath.latex,/\\begin\{aligned\}/,'Q8(iii) 16-element power set wrapped across aligned lines for 320px');

const q8iv=items.find(x=>x.id==='g9-ch1-ex1.2-q8-iv');
assert(q8iv.steps[1].en.includes('⊆')&&q8iv.steps[1].en.includes('subset'),'Q8(iv) explains subset symbol ⊆');
assert.equal(q8iv.answer,'P(E) = {∅}','Q8(iv) power set of empty set is {∅}');

const q9ii=items.find(x=>x.id==='g9-ch1-ex1.2-q9-ii');
assert(q9ii.steps[0].en.includes('∈')&&q9ii.steps[0].en.includes('≤'),'Q9(ii) explains membership ∈ and inequality ≤');

// Independent mathematics verification
const choose=(arr,k)=>{
  const out=[];
  const walk=(start,picked)=>{
    if(picked.length===k){out.push(picked);return;}
    for(let i=start;i<arr.length;i++)walk(i+1,[...picked,arr[i]]);
  };
  walk(0,[]);
  return out;
};
const powerSet=arr=>Array.from({length:arr.length+1},(_,k)=>choose(arr,k)).flat();
const fmtSubset=(s,space=false)=>s.length===0?'∅':'{'+s.join(space?', ':',')+'}';
const fmtPower=(name,arr,space=false)=>`P(${name}) = {`+powerSet(arr).map(s=>fmtSubset(s,space)).join(', ')+'}';

// Q7: A = {a, {a, b}}
const q7Subsets=powerSet(['a','{a, b}']).map(s=>fmtSubset(s,true)).join(', ');
assert.equal(q7Subsets,q7.answer,'Q7 independent subset generation');

// Q8(i–iv)
assert.equal(fmtPower('A',['a','b'],true),items.find(x=>x.id==='g9-ch1-ex1.2-q8-i').answer,'Q8(i) power set');
assert.equal(fmtPower('B',['1','2','3'],false),items.find(x=>x.id==='g9-ch1-ex1.2-q8-ii').answer,'Q8(ii) power set');
assert.equal(fmtPower('D',['p','q','r','s'],false),q8iii.answer,'Q8(iii) 16-element power set');
assert.equal(fmtPower('E',[],false),q8iv.answer,'Q8(iv) empty-set power set');

// Q9(i–ii)
const wCount=new Set(['red','blue','yellow']).size;
assert.equal(`${2**wCount} subsets; ${2**wCount-1} proper subsets`,items.find(x=>x.id==='g9-ch1-ex1.2-q9-i').answer,'Q9(i) subsets and proper subsets');
const xSquares=Array.from({length:20},(_,i)=>i+1).map(x=>x*x).filter(sq=>sq<=100);
assert.deepEqual(xSquares,[1,4,9,16,25,36,49,64,81,100],'Q9(ii) natural squares up to 100');
assert.equal(`${2**xSquares.length} subsets; ${2**xSquares.length-1} proper subsets`,q9ii.answer,'Q9(ii) subsets and proper subsets');

// Q10(i–iii)
assert.equal(String(2**4),items.find(x=>x.id==='g9-ch1-ex1.2-q10-i').answer,'Q10(i) 2^4 = 16');
assert.equal(String(2**0),items.find(x=>x.id==='g9-ch1-ex1.2-q10-ii').answer,'Q10(ii) 2^0 = 1');
assert.equal(String(Math.log2(256)),items.find(x=>x.id==='g9-ch1-ex1.2-q10-iii').answer,'Q10(iii) log2(256) = 8');

const katex=require('../assets/vendor/katex/katex.min.js');
for(const entry of latex){
  const rendered=katex.renderToString(entry.latex,{throwOnError:true,trust:false,strict:'error',output:'htmlAndMathml'});
  assert(rendered.includes('katex-html')&&rendered.includes('<math'),'KaTeX visual and accessible output: '+entry.id);
}

assert.throws(()=>vm.runInContext(read(student),ctx,{filename:student,timeout:10000}),/Duplicate Grade 9 Ex1\.2 Q7-Q10/,'Duplicate registered question must fail');
console.log('PASS Grade 9 Ex1.2 Q7–Q10(iii) release: 10 exact-source English parts, 33 complete steps, symbol explanations, offline KaTeX, independent math checks, Why-step hints, and offline cache.');
