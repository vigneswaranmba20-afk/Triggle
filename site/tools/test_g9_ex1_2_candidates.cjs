'use strict';
// TRACE release-preparation gate. This candidate is deliberately not live.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const candidate=JSON.parse(read('docs/curriculum/grade-9/candidates/g9-ch1-ex1-2-english-34.json'));
const {build}=require('./build_g9_ex1_2_candidates.cjs');
const modulePath='site/data/textbook-exercises/g9-ch1-ex1-2-en.js';
const html=read('site/index.html'),sw=read('site/service-worker.js');
assert.equal(candidate.stage,'CANDIDATE_NOT_REGISTERED');
assert.equal(candidate.grade,9);assert.equal(candidate.chapter,'1');assert.equal(candidate.exercise,'1.2');
assert.equal(candidate.englishOnly,true);assert.equal(candidate.teacherReview,'deferred');
assert.equal(candidate.tamilEditorialReview,'deferred');
assert.equal(candidate.englishTextbookParts,34);assert.equal(candidate.questions,10);
const groups={1:5,2:4,3:4,4:4,5:3,6:4,7:1,8:4,9:2,10:3};
const ids=new Set(),answers=new Map();
for(const q of candidate.rows){
 assert.match(q.id,/^g9-ch1-ex1\.2-q\d+(?:-[iv]+)?$/);assert(!ids.has(q.id),q.id+' duplicate');ids.add(q.id);
 assert.equal(q.verifiedInOriginalAudit,true);
 assert(q.sourceEnglish&&q.answer&&Array.isArray(q.steps)&&q.steps.length>=2,'Complete part '+q.id);
 for(const s of q.steps)assert(s.reason?.trim()&&s.equation?.trim(),q.id+' complete worked steps');
 answers.set(q.id,q.answer);
}
for(const [n,count] of Object.entries(groups))assert.equal(candidate.rows.filter(q=>q.question===n).length,count,'Official part count Q'+n);
assert.equal(ids.size,34);
assert.equal(candidate.rows.reduce((n,r)=>n+r.steps.length,0),105,'All audited working steps remain present');
assert.match(candidate.rows.find(q=>q.id==='g9-ch1-ex1.2-q1-iii').sourceEnglish,/4\/\(3n\)/,'Do not replace visual source 4/(3n) with extracted error');
assert.match(candidate.rows.find(q=>q.id==='g9-ch1-ex1.2-q2-iv').sourceEnglish,/x²/,'Preserve quadratic exponent');
assert.match(answers.get('g9-ch1-ex1.2-q7'),/\{\{a, b\}\}/,'Nested set must be one member');
assert.match(answers.get('g9-ch1-ex1.2-q8-iii'),/\{p,q,r,s\}/,'Full sixteen-element power-set listing includes original set');
assert.match(answers.get('g9-ch1-ex1.2-q9-ii'),/1024.*1023/);
assert.equal(answers.get('g9-ch1-ex1.2-q10-iii'),'8');
const generated=build();
assert.equal(read(modulePath),generated,'Generated app module must be reproducible from source-backed candidates');
assert(!html.includes('g9-ch1-ex1-2-en.js'),'Do not publish candidates before UI + typography + Why-step migration');
assert(!sw.includes('g9-ch1-ex1-2-en.js'),'Do not pre-cache unreleased candidates');
const ctx={window:{TRIGGLE_CLASSES:{9:{items:[]}},TRIGGLE_CURRICULUM:{grades:[{grade:9,chapters:[{number:1,textbookQuestionIds:[]}]}]}}};
vm.runInNewContext(generated,ctx,{filename:modulePath,timeout:5000});
const actual=ctx.window.TRIGGLE_CLASSES[9].items,chapter=ctx.window.TRIGGLE_CURRICULUM.grades[0].chapters[0];
assert.equal(actual.length,34);assert.equal(chapter.textbookQuestionIds.length,34);
assert.equal(new Set(actual.map(q=>q.id)).size,34);
for(const q of actual){
 const source=candidate.rows.find(row=>row.id===q.id);
 assert(source,'Unexpected student record '+q.id);
 assert.equal(q.kind,'textbook');
 assert.equal(q.q.en.includes(source.sourceEnglish),true,'Source English preserved '+q.id);
 assert.equal(q.answer,source.answer,'Exact authored answer '+q.id);
 assert.equal(q.steps.length,source.steps.length,'Every explanatory step '+q.id);
 assert.equal(q.translationReview,'pending');
 assert(!q.q.ta,'No invented Tamil translation '+q.id);
 assert(q.label.ta.includes('English only'),'Visible pending-language notice '+q.id);
 assert(q.sourceFidelity.sourceAudit===candidate.sourceAudit,'Audit provenance '+q.id);
}
assert.throws(()=>vm.runInNewContext(generated,ctx,{filename:modulePath,timeout:5000}),/Duplicate Grade 9 textbook ID/);
console.log('PASS Grade 9 Exercise 1.2: 34 parts / 10 questions, 105 steps, exact-source anchors, independent audit, unique IDs, deterministic module, and gated publication.');
