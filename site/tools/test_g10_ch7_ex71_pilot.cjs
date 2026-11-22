'use strict';
// TRIGGLE-X, Grade 10 Mensuration Ex 7.1 Q1–Q5: focused, independent release guards.
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const manifest=JSON.parse(read('docs/curriculum/grade-10/g10-ch7-ex7-1-pilot-passports-20261122.json'));
const modulePath='site/data/textbook-exercises/g10-ch7-ex7-1-q1-q5-en.js';
const html=read('site/index.html'),cache=read('site/service-worker.js');
const moduleSrc='./data/textbook-exercises/g10-ch7-ex7-1-q1-q5-en.js';
const scripts=[...html.matchAll(/<script\s+src=["']([^"']+)["']/g)].map(m=>m[1].split('?')[0]);
assert.equal(scripts.filter(p=>p===moduleSrc).length,1,'pilot data module must load once');
for(const p of ['./data/class-10.js','./data/curriculum.js'])assert.ok(scripts.includes(p),p+' dependency loaded');
assert.ok(scripts.indexOf('./data/curriculum.js')<scripts.indexOf(moduleSrc),'curriculum must load before pilot');
assert.ok(scripts.indexOf('./data/class-10.js')<scripts.indexOf(moduleSrc),'class data must load before pilot');
assert.ok(scripts.indexOf(moduleSrc)<scripts.indexOf('./assets/app.js'),'app renderer loads after pilot');
for(const asset of [moduleSrc,'./assets/grade10-ch7/ex7-1-q4.svg','./assets/grade10-ch7/ex7-1-q5.svg'])
  assert.ok(cache.includes(asset),'service-worker caches '+asset);
const sandbox={window:{},console};
vm.createContext(sandbox);
for(const p of ['site/data/class-10.js','site/data/curriculum.js',modulePath,'site/data/problem-difficulty.js']){
  vm.runInContext(read(p),sandbox,{filename:p,timeout:15000});
}
const grade=sandbox.window.TRIGGLE_CLASSES[10],chapter=sandbox.window.TRIGGLE_CURRICULUM.grades.find(x=>x.grade===10).chapters.find(x=>x.number===7);
const ids=manifest.records.map(r=>r.id);
assert.deepEqual(ids,[1,2,3,4,5].map(n=>'c10-7-ex7-1-q'+n));
assert.equal(new Set(grade.items.map(r=>r.id)).size,grade.items.length,'no duplicate Grade 10 IDs');
assert.equal(manifest.source.pageImagesVerified,false,'image evidence must not be claimed without audit');
assert.equal(manifest.source.tamilWorkedSolutionsApproved,false,'no unreviewed Tamil approval');
for(const passport of manifest.records){
  const entry=grade.items.find(r=>r.id===passport.id);
  assert.ok(entry,'missing student record '+passport.id);
  assert.equal(entry.exercise,'7.1');
  assert.equal(entry.q.en,passport.englishQuestion,'text-layer question parity for '+passport.id);
  assert.ok(Array.isArray(entry.steps)&&entry.steps.length>=4,'complete worked solution needed: '+passport.id);
  for(const step of entry.steps){
    assert.ok(step.en&&step.eq,'step explanation/formula required '+passport.id);
    assert.ok(step.math&&typeof step.math.latex==='string'&&step.math.latex.length>4,'math markup for '+passport.id);
    assert.ok(step.math.fallback,'accessible formula fallback '+passport.id);
  }
  assert.equal(entry.sourceFidelity.status,'text-layer-checked-page-image-pending');
  assert.equal(entry.sourceFidelity.sourcePdfPage.en,288);
  assert.equal(entry.sourceFidelity.sourcePdfPage.ta,296);
  assert.equal(entry.translationReview,'pending');
  assert.ok(chapter.textbookQuestionIds.includes(passport.id),'chapter navigation must include '+passport.id);
  assert.equal(chapter.textbookQuestionIds.filter(i=>i===passport.id).length,1,'duplicate navigation ID '+passport.id);
  const meta=sandbox.window.TriggleDifficulty.get(entry);
  assert.ok(meta&&['easy','medium','difficult'].includes(meta.level),'explicit difficulty for '+passport.id);
  assert.equal(meta.grade,10);
  assert.ok(entry.answerMath&&entry.answerMath.latex,'typeset final answer '+passport.id);
}
for(const n of [4,5]){
  const e=grade.items.find(r=>r.id==='c10-7-ex7-1-q'+n);
  assert.equal(e.figureSrc,'assets/grade10-ch7/ex7-1-q'+n+'.svg');
  assert.ok(e.figureAlt?.en?.length>40,'helpful accessible diagram explanation '+n);
  const fig=read('site/'+e.figureSrc);
  assert.match(fig,/<svg\s/);
  assert.match(fig,/<title\b/);
  assert.match(fig,/<desc\b/);
  assert.ok(!/<script\b/i.test(fig),'SVG must not contain executable scripts');
}
// Independent arithmetic: do not read expected intermediate equations out of worked steps.
const pi=22/7;
const q1={r:25,h:35};
assert.equal(2*pi*q1.r*q1.h,5500);
assert.equal(q1.r/q1.h,5/7);
const q2={r:7,h:35};
assert.equal(2*pi*q2.r*(q2.r+q2.h),1848);
assert.equal(2*pi*q2.r*q2.h,1848*5/6);
const q3=(R,r,h)=>2*pi*(R+r)*h+2*pi*(R*R-r*r);
assert.equal(q3(16,16-4,13),2992);
const pq=Math.sqrt(20**2-16**2);
assert.equal(pq,12);
const rotatedQR=pi*pq*20,rotatedPQ=pi*16*20;
assert.equal(rotatedQR/rotatedPQ,3/4);
assert.ok(rotatedPQ>rotatedQR);
const floorArea=4*22,rsq=floorArea/pi;
assert.equal(rsq,28);
assert.equal(Math.round(Math.sqrt(19**2-rsq)*100)/100,18.25);
// Mutation detection: deliberately incorrect interpretations must fail the same oracle.
const close=(a,b)=>Math.abs(a-b)<1e-9;
assert.equal(close(q3(16,16-8,13),2992),false,'incorrect wall thickness must be caught');
assert.equal(close(q3(16,12,13)-2*pi*(16*16-12*12),2992),false,'missing two rings must be caught');
assert.equal(close((pi*12*20)/(pi*16*20),4/3),false,'swapped cone ratio must be caught');
assert.equal(close(Math.sqrt(19**2-(22/pi)),Math.sqrt(333)),false,'floor area for only one person must be caught');
console.log('PASS G10 Mensuration Ex 7.1 Q1-Q5: source passports, 5 question records, navigation, KaTeX, diagrams, offline cache, exact arithmetic and 4 negative mutations. Source page-image and Tamil editorial audits remain pending.');
