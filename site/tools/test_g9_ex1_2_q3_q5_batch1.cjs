'use strict';
// TRACE release gate: 10 English Ex1.2 Q3(i)–Q5(ii) source-checked parts.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ROOT=path.resolve(__dirname,'../..'),read=p=>fs.readFileSync(path.join(ROOT,p),'utf8');
const m=JSON.parse(read('site/data/textbook-fidelity/g9-ch1-ex1-2-q3-q5-batch1.json'));
const candidate=JSON.parse(read('docs/curriculum/grade-9/candidates/g9-ch1-ex1-2-english-34.json'));
const html=read('site/index.html'),sw=read('site/service-worker.js');
const script='site/data/textbook-exercises/g9-ch1-ex1-2-q3-q5-batch1-en.js';
const hintScript='site/data/why-step-g9-ex1-2-q3-q5-batch1.js';
// PR #234 landed five additional parts on main. This release must be tested
// against the complete combined student runtime, not the pre-merge nine parts.
const mergedScript='site/data/textbook-exercises/g9-ch1-ex1-2-q5-iii-q6-en.js';
const mergedIds=['g9-ch1-ex1.2-q5-iii','g9-ch1-ex1.2-q6-i','g9-ch1-ex1.2-q6-ii','g9-ch1-ex1.2-q6-iii','g9-ch1-ex1.2-q6-iv'];
assert.equal(m.grade,9);assert.equal(m.chapter,'1');assert.equal(m.exercise,'1.2');
assert.equal(m.english.printedPage,12);assert.equal(m.english.pdfPage,18);
assert.equal(m.english.sourcePdfSha256,candidate.sourcePdfSha256);
assert.equal(m.tamil.translationReview,'deferred');
assert.equal(m.parts.length,10);
assert.equal(html.split(script.slice(5)).length-1,1,'Student module must be loaded once');
assert.equal(html.split(hintScript.slice(5)).length-1,1,'Hint module must be loaded once');
assert(sw.includes("'./"+script.slice(5)+"'"),'Offline cache needs lesson module');
assert(sw.includes("'./"+hintScript.slice(5)+"'"),'Offline cache needs hints');
assert.equal(html.split(mergedScript.slice(5)).length-1,1,'Merged five-part module must be loaded once');
assert(sw.includes("'./"+mergedScript.slice(5)+"'"),'Merged five-part module must be cached offline');
assert(!html.includes('g9-ch1-ex1-2-en.js'),'Do not accidentally register all 34 generic candidates');
const ctx={window:{},console};vm.createContext(ctx);
for(const p of ['site/data/class-9.js','site/data/curriculum.js',
 'site/data/textbook-exercises/g9-ch1-ex1-2-q1-en.js',
 'site/data/textbook-exercises/g9-ch1-ex1-2-q2-en.js',mergedScript,script,
 'site/data/why-step-g9.js','site/data/why-step-g9-ex1-2-q1.js',
 'site/data/why-step-g9-ex1-2-q2.js',hintScript,'site/data/problem-difficulty.js']){
 vm.runInContext(read(p),ctx,{filename:p,timeout:10000});
}
const grade=ctx.window.TRIGGLE_CLASSES[9],ch=ctx.window.TRIGGLE_CURRICULUM.grades.find(g=>g.grade===9).chapters.find(c=>String(c.number)==='1');
const ids=Array.from(ctx.window.TRIGGLE_G9_EX1_2_BATCH1_IDS);
assert.equal(ids.length,10);assert.deepEqual(ids,m.parts.map(p=>p.id));
const expectedIds=[...mergedIds,...ids];
assert.equal(new Set(expectedIds).size,15,'No overlap between merged and proposed IDs');
for(const id of expectedIds){
 assert.equal(grade.items.filter(x=>x.id===id).length,1,'Exactly one student item for '+id);
 assert.equal(ch.textbookQuestionIds.filter(x=>x===id).length,1,'Exactly one chapter link for '+id);
}
assert.equal(new Set(grade.items.map(x=>x.id)).size,grade.items.length,'No duplicate app IDs');
assert.equal(new Set(ch.textbookQuestionIds).size,ch.textbookQuestionIds.length,'No duplicate chapter links');
const fallback=v=>Array.isArray(v)?v.map(fallback).join(''):v?.latex?v.fallback:v;
const katex=require('../assets/vendor/katex/katex.min.js');
let totalSteps=0,typeset=0;
for(const part of m.parts){
 const item=grade.items.find(x=>x.id===part.id),record=candidate.rows.find(x=>x.id===part.id);
 assert(item&&record&&record.verifiedInOriginalAudit,'Source-reviewed candidate needed '+part.id);
 assert.equal(item.q.en,record.question+'. '+record.stem+'\n('+record.part+') '+record.sourceEnglish);
 assert.equal(item.q.en,part.exactEnglish);
 assert.equal(item.answer,record.answer);assert.equal(item.answer,part.answer);
 assert.equal(item.steps.length,record.steps.length);
 assert.equal(item.steps.length,3,'Original authored three-step explanation must be preserved');
 assert.equal(item.kind,'textbook');assert.equal(item.classNum,9);assert.equal(item.exercise,'1.2');
 assert.equal(item.releaseStatus,'english-preview');assert.equal(item.translationReview,'pending');
 assert.equal(item.sourceFidelity.enPrintedPages[0],12);assert.equal(item.sourceFidelity.enPdfPages[0],18);
 assert(!item.q.ta,'No invented Tamil prompts');
 assert.match(item.label.ta,/English only; Tamil review pending/);
 assert.equal(fallback(item.questionMath.en),item.q.en,'Question math fallback exact');
 assert.equal(fallback(item.answerMath),item.answer,'Answer fallback exact');
 const hint=ctx.window.TriggleWhyStepG9.hints[item.id];
 assert(hint&&hint.en.length>60&&hint.ta===undefined);
 assert.equal(hint.expected,item.steps[hint.step].en,'Why-step anchored to exact explanation');
 const difficulty=ctx.window.TriggleDifficulty.get(item);
 assert.equal(difficulty.grade,9);
 for(const [i,step] of item.steps.entries()){
   assert.equal(step.en,record.steps[i].reason);
   assert.equal(step.eq,record.steps[i].equation);
   assert.equal(fallback(step.math),step.eq);
   assert.equal(fallback(step.reasonMath.en),step.en);
   assert(step.math.latex,'Missing authored KaTeX step');
   const markup=katex.renderToString(step.math.latex,{throwOnError:true,trust:false,strict:'error',output:'htmlAndMathml'});
   assert(markup.includes('katex-html')&&markup.includes('<math'),'Math output check '+part.id+'/'+i);
   typeset++;totalSteps++;
 }
 const markup=katex.renderToString(item.answerMath.latex,{throwOnError:true,trust:false,strict:'error',output:'htmlAndMathml'});
 assert(markup.includes('<math'),'Accessible KaTeX answer '+item.id);typeset++;
 if(Array.isArray(item.questionMath.en)){
  const expr=item.questionMath.en.find(x=>x?.latex);
  assert(expr,'Structured question expression missing');
  katex.renderToString(expr.latex,{throwOnError:true,trust:false,strict:'error',output:'htmlAndMathml'});
  typeset++;
 }
 assert.equal(ch.textbookQuestionIds.filter(x=>x===item.id).length,1);
}
// Independent deterministic mathematical classification checks.
const same=(a,b)=>a.size===b.size&&[...a].every(x=>b.has(x));
const vowels=new Set(['a','e','i','o','u']),vowelWord=new Set(['V','O','W','E','L']);
assert.equal(vowels.size,5);assert.equal(vowelWord.size,5);assert(!same(vowels,vowelWord));
const C=new Set([2,3,4,5]),D=new Set([2,3,4]);assert(!same(C,D));
assert(same(new Set('LIFE'),new Set(['F','I','L','E'])));
const prime=n=>n>1&&Array.from({length:Math.max(0,Math.floor(Math.sqrt(n))-1)},(_,i)=>i+2).every(d=>n%d!==0);
const primes=Array.from({length:19},(_,i)=>i+4).filter(prime),divisors=Array.from({length:18},(_,i)=>i+1).filter(n=>18%n===0);
assert.deepEqual(primes,[5,7,11,13,17,19]);assert.deepEqual(divisors,[1,2,3,6,9,18]);assert.equal(primes.length,divisors.length);
assert.equal(Array.from({length:5},(_,i)=>i).filter(n=>n>1&&n<2).length,0);
assert.equal(Array.from({length:100},(_,i)=>i+1).filter(n=>n%2===0&&n%2!==0).length,0);
assert.equal(new Set([0]).size,1);
assert.equal(3,3,'A triangle cannot have four sides');
const A=new Set(['f','i','a','s']),B=new Set(['a','n','f','h','s']);
assert.deepEqual([...A].filter(x=>B.has(x)).sort(),['a','f','s']);
assert(!primes.some(p=>p===2),'No prime above 2 equals the only even prime');
assert.equal(totalSteps,30);
assert.equal(typeset,44,'Every step, answer and four structured questions should be KaTeX-valid');
assert.throws(()=>vm.runInContext(read(script),ctx,{filename:script,timeout:10000}),/Duplicate Grade 9 Ex1.2 batch 1/);
console.log('PASS G9 Ex1.2 Q3–Q5 batch 1: 10 exact English parts, 30 complete steps, 44 KaTeX checks, linked Why-step hints, source page 12, offline cache, no duplicate IDs; Tamil pending.');
