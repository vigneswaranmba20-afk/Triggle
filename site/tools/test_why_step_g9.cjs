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
assert.equal(ids.length,eligible.length,'Every released exercise or Triggle practice has exactly one Why bridge');
assert.equal(ids.length,318,'Grade 9 content snapshot expands only with source-backed Ex1.2 Q1 parts');
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
  if(lang==='ta'&&!q.q.ta){assert.ok(!h.ta,'Unreviewed Tamil hint must not be fabricated: '+id);assert.match(q.label.ta,/English only/,'English-only fallback must be labelled: '+id);continue;}
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
assert.equal(audit.eligible,ids.length);
assert.equal(audit.diagrams,countDiagrams);
assert.equal(audit.fallbacks.length,0,'All unmatched generic explanations must be independently reviewed');
assert.equal(audit.excluded.length,all.length-eligible.length,'No archived examples reintegrated');
console.log('PASS Grade 9 Why: '+ids.length+' authored question bridges; '+countDiagrams+' optional figures; all nine chapters, bilingual, source-pinned, archival examples excluded, app and offline assets intact.');
