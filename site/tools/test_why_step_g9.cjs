'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const read=p=>fs.readFileSync(path.join(__dirname,'../..',p),'utf8');
const html=read('site/index.html'),sw=read('site/service-worker.js');
const scripts=[...html.matchAll(/<script src="\.\/(data\/[^?"']+)(?:\?[^"']*)?"[^>]*><\/script>/g)].map(m=>'site/'+m[1]);
const context={window:{},console};vm.createContext(context);
for(const f of scripts)vm.runInContext(read(f),context,{filename:f,timeout:20000});
const all=context.window.TRIGGLE_CLASSES?.[9]?.items||[],source=new Map(all.map(q=>[q.id,q]));
const db=context.window.TriggleWhyStepG9;
assert.ok(db&&db.grade===9,'Grade 9 source data loaded in the app');
const hints=db.hints,ids=Object.keys(hints);
const eligible=all.filter(q=>q.id&&q.steps?.length&&q.q?.en&&!/example/i.test(q.id)&&!/example/i.test(q.label?.en||'')&&q.kind!=='textbook-example'&&/^(?:g9-ch\d+-ex|c9-exercise-|c9-\d+-\d+-practice-)/.test(q.id));
const legacyQ4='g9-ch3-ex3.2-q4';
const existing=eligible.filter(q=>q.exercise!=='3.2'||q.chapter!=='3'||q.id===legacyQ4);
const optionalEx32=new Set(['q1-ii','q2','q3-vi','q5-iii','q6-v'].map(part=>'g9-ch3-ex3.2-'+part));
const expectedIds=[...existing.map(q=>q.id),...optionalEx32];
assert.deepEqual([...ids].sort(),expectedIds.sort(),'Preserve existing Why bridges and pin the five selected Exercise 3.2 hints');
// AUD29-02: every new Chapter 5 disclosure must explain, rather than copy, the solution.
const ch5New=Object.entries(hints).filter(([id,h])=>/^g9-ch5-ex5\\.[1-6]-q\\d+$/.test(id)&&['coordinates','distance','midpoint','section','centroid'].includes(h.concept)&&h.step===0);
const aud29Ids=[...[1,2,3,4].map(q=>'5.1-q'+q),...[1,4,10,12].map(q=>'5.2-q'+q),...Array.from({length:8},(_,i)=>'5.3-q'+(i+1)),...Array.from({length:7},(_,i)=>'5.4-q'+(i+1)),...Array.from({length:7},(_,i)=>'5.5-q'+(i+1)),...Array.from({length:20},(_,i)=>'5.6-q'+(i+1))].map(x=>'g9-ch5-ex'+x);
assert.equal(aud29Ids.length,50);
for(const id of aud29Ids){
 const h=hints[id],q=source.get(id);
 assert.ok(q&&h&&ch5New.some(([key])=>key===id),'Concept bridge present '+id);
 assert.ok(q.steps[h.step].en.includes(h.expected),'Source anchor preserved '+id);
 assert.ok(!h.en.includes(h.expected),'Do not copy step into explanation '+id);
 assert.ok(!h.ta.includes(q.steps[h.step].ta),'Do not copy Tamil step into explanation '+id);
 assert.ok(!/correct option|correct answer|சரியான விடை/i.test(h.en+' '+h.ta),'No answer-option spoiler '+id);
 assert.ok(/[\\u0B80-\\u0BFF]/u.test(h.ta),'Tamil explanatory text '+id);
 for(const [lang,answer] of [['en',q.answer],['ta',q.answerTa]]) {
  if(typeof answer==='string'&&answer.length>=12) assert.ok(!h[lang].includes(answer),'No full final answer pasted '+id+' '+lang);
 }
}
const chapters=new Set();let countDiagrams=0;
for(const id of ids){
 const q=source.get(id),h=hints[id];
 assert.ok(q,'Never explain a nonexistent question '+id);
 assert.equal(q.classNum,9);
 assert.ok(!/example/i.test(id),'Worked examples remain hidden '+id);
 assert.ok(Number.isInteger(h.step)&&h.step>=0&&h.step<q.steps.length,'Invalid step '+id);
 assert.ok(typeof h.expected==='string'&&h.expected.length>12,'Missing source sentinel '+id);
 assert.ok(q.steps[h.step].en.includes(h.expected),'Explanation does not match the authored step '+id);
 for(const lang of ['en','ta']){
  if(lang==='ta'&&!q.q.ta&&id!==legacyQ4){assert.ok(!h.ta,'Unreviewed Tamil hint must not be fabricated: '+id);assert.match(q.label.ta,/English only/,'English-only fallback must be labelled: '+id);continue;}
  assert.ok(h[lang]?.length>=35,'Missing '+lang+' explanation '+id);
  assert.ok(!/<[a-z][^>]*>/i.test(h[lang]),'Hint may not introduce markup '+id);
 }
 if(h.diagram){
  assert.ok(['venn','numberline','triangle','coordinates','dice'].includes(h.diagram.type),'Unknown or nonreviewed visual '+id);
  if(h.diagram.type==='triangle'&&String(q.chapter)==='7')
   assert.equal(h.diagram.mode,'altitude','Mensuration triangle cannot imply a right angle');
  countDiagrams++;
 }
 chapters.add(String(q.chapter));
}
assert.deepEqual([...chapters].sort(),['1','2','3','4','5','6','7','8','9'],'All nine Grade 9 chapters represented');
assert.ok(countDiagrams>=25&&countDiagrams<ids.length/2,'Use only contextual diagrams, not a visual on every step');
assert.equal(db.review.ta,'editorial-pending','Do not claim professionally reviewed Tamil');
for(const name of ['data/why-step-g9.js','assets/why-step-g9.js','assets/why-step-g9.css']){
 assert.ok(html.includes('./'+name),'Missing HTML asset '+name);
 assert.ok(sw.includes('./'+name),'Missing offline asset '+name);
}
assert.ok(html.indexOf('data/why-step-g9.js')<html.indexOf('assets/app.js'),'Data before lesson render');
assert.ok(html.indexOf('assets/why-step-g9.js')<html.indexOf('assets/app.js'),'Listener before lesson render');
const code=read('site/assets/why-step-g9.js');
assert.ok(code.includes('original.en.includes(hint.expected)'),'Stale revision must hide hints');
assert.ok(code.includes("event?.detail")&&code.includes('data?.grade!==9'),'Grade scope guard');
assert.ok(code.includes('textContent')&&code.includes('document.createElementNS'),'Text-safe explanatory prose and original SVG diagrams');
assert.ok(code.includes('triggle:lessonchange'),'No core renderer changes allowed');
const audit=JSON.parse(read('docs/curriculum/grade-9/why-step-audit.json'));
assert.equal(audit.eligible,existing.length);
assert.equal(audit.diagrams,countDiagrams);
assert.equal(audit.fallbacks.length,0,'All unmatched generic explanations must be independently reviewed');
assert.equal(audit.excluded.length,all.length-eligible.length,'No archived examples reintegrated');
console.log('PASS Grade 9 Why: '+ids.length+' authored question bridges; '+countDiagrams+' optional figures; all nine chapters, bilingual, source-pinned, archival examples excluded, app and offline assets intact.');
