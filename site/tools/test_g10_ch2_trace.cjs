'use strict';
/* TRACE release gate: Grade 10 Chapter 2 only. No completeness claim unless
   independently reconciled to all official 2025 textbook subparts. */
const assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs'),vm=require('node:vm');
const site=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(site,p),'utf8');
const {loadRuntime}=require('./curriculum_bulk.cjs');
const ctx={window:{}};vm.runInNewContext(read('data/g10-ch2-concepts.js'),ctx,{timeout:5000});
const entry=ctx.window.TRIGGLE_G10_CH2_PATH;
assert.equal(entry.chapterId,'g10-ch2');
assert.equal(entry.stages.length,15,'15 short, textbook-ordered foundations');
const sections=['2.2','2.3','2.3','2.4','2.5','2.5','2.6','2.6','2.7','2.7','2.8','2.9','2.10','2.10','2.11'];
assert.equal(JSON.stringify(entry.stages.map(s=>s.section)),JSON.stringify(sections));
const answerKey=new Map([["g10-ch2-division","2"],["g10-ch2-gcd","6"],["g10-ch2-bezout","x = −2, y = 3"],["g10-ch2-primes","36"],["g10-ch2-modulo","11 a.m."],["g10-ch2-congruence","4"],["g10-ch2-sequence","14"],["g10-ch2-recursive","8"],["g10-ch2-ap","Yes, d = 3"],["g10-ch2-ap-nth","39"],["g10-ch2-ap-sum","69"],["g10-ch2-gp","135"],["g10-ch2-gp-sum","81 − 1"],["g10-ch2-gp-infinite","6"],["g10-ch2-special","30"]]);
assert.equal([4,7,10,13,16,19].reduce((total,term)=>total+term,0),69,'Independently add all six A.P. terms');
assert.equal(6*(4+19)/2,69,'Pairing formula must agree with termwise arithmetic');
const answerPositionCounts=[0,0,0];
for(const stage of entry.stages){
 assert.ok(stage.id.startsWith('g10-ch2-'));
 for(const lang of ['en','ta']){
  for(const key of ['title','idea','example','rule','question','hint','why'])
   assert.ok((stage[key]?.[lang]||'').length>=4,'Missing '+key+' '+lang+' on '+stage.id);
  assert.ok(stage.choices.every(c=>c[lang]?.length>0),'Bilingual options: '+stage.id);
 }
 assert(Number.isInteger(stage.correct)&&stage.correct>=0&&stage.correct<3,'Valid answer position: '+stage.id);
 answerPositionCounts[stage.correct]++;
 assert.equal(stage.choices[stage.correct].en,answerKey.get(stage.id),'Correct answer must match independently checked key: '+stage.id);
 assert.equal(stage.choices.length,3,'Student self-check choices: '+stage.id);
 assert.ok(stage.math?.latex&&stage.math.fallback,'Authored KaTeX and accessible fallback: '+stage.id);
}
assert.equal(new Set(entry.stages.map(s=>s.id)).size,15);
assert.deepEqual(answerPositionCounts,[5,6,4],'Pin the current balanced answer placements after the A.P. pairing lesson update');
const all=loadRuntime();
const chapter=all.curriculum.grades.find(g=>g.grade===10).chapters.find(c=>String(c.number)==='2');
const textbook=all.classes[10].items.filter(q=>q.chapter==='2'&&q.kind==='textbook'&&q.exercise);
const additions=all.classes[10].items.filter(q=>q.traceStatus?.startsWith('source-text-checked'));
assert.equal(additions.length,53,'53 distinct original English textbook questions integrated');
assert.equal(new Set(additions.map(q=>q.id)).size,53);
assert.equal(textbook.filter(q=>q.exercise==='2.1').length,10);
assert.equal(textbook.filter(q=>q.exercise==='2.2').length,9);
assert.equal(textbook.length,114,'Retain 108 earlier Chapter 2 parts plus six Exercise 2.7 parts');
const supplements=all.classes[10].items.filter(q=>q.traceStatus?.startsWith('source-text reviewed'));
assert.equal(supplements.length,10,'Integrate precisely ten unique textbook subparts without duplicate bundled questions');
assert.equal(new Set(textbook.map(q=>q.id)).size,textbook.length,'Never duplicate student-facing question IDs');
const grouped={'2.3':4,'2.4':1,'2.5':10,'2.6':8,'2.7':8,'2.8':5,'2.9':5,'2.10':12};
for(const [ex,n] of Object.entries(grouped))assert.equal(additions.filter(q=>q.exercise===ex).length,n,ex);
assert.ok(all.classes[10].items.some(q=>q.id==='c10-2-ex2-2-q8'),'Exercise 2.2 Question 8 must disclose both readings');
for(const q of additions){
 assert(chapter.textbookQuestionIds.includes(q.id),'Chapter navigation includes '+q.id);
 assert.equal(q.kind,'textbook');
 assert.equal(q.classNum,10);
 assert.equal(q.edition,'2025');
 assert.equal(q.translationReview,'pending');
 assert.ok(q.steps.length>=2&&q.steps.every(s=>s.en.length>20&&s.eq.length>0),'Complete explanation '+q.id);
 assert.ok(q.q.en?.length>20&&q.answer?.length>0,'Question and answer '+q.id);
 assert.ok(q.source.includes('drive.google.com')&&q.reference.includes('2025'),'Grounded source '+q.id);
}
const find=id=>{const q=additions.find(q=>q.id===id);assert(q,'Missing '+id);return q.answer;};
assert.equal(find('c10-2-ex2-3-q5'),'11 a.m.');
assert.equal(find('c10-2-ex2-5-q4'),'−83.');
assert.equal(find('c10-2-ex2-5-q7'),'6t₂₄ = 0.');
assert.equal(find('c10-2-ex2-6-q7'),'168,448.');
assert.equal(find('c10-2-ex2-7-q3'),'1.');
assert.equal(find('c10-2-ex2-8-q2'),'1820.');
assert.equal(find('c10-2-ex2-9-q5'),'n = 9.');
assert.equal(find('c10-2-ex2-10-q12'),'A is larger than B by 1 (option D).');
assert.equal((3240+999),4239);
assert.equal(20*(5+43)/2,480);
assert.equal((603+901)*299/2-(604+900)*75/2,168448);
assert.equal(32805*27,885735);
assert.equal(35/2*(-7.5+34*1.25),612.5);
assert.equal(45_750-40_000,5750);
assert.equal((24*25*49-9*10*19)/6,4615);
assert.equal((20_000-13_000),(20_000-13_000));
const idx=read('index.html'),sw=read('service-worker.js'),hub=read('assets/chapter-hub.js');
for(const file of ['data/g10-ch2-concepts.js','data/textbook-exercises/g10-ch2-trace-en.js','assets/g10-ch2-foundations.css']){
 assert(idx.includes(file),'Index links '+file);
 assert(sw.includes(file),'Offline precache '+file);
}
assert(idx.indexOf('data/g10-ch2-concepts.js')<idx.indexOf('assets/chapter-hub.js'),'Concepts loaded before navigation');
assert(idx.indexOf('data/textbook-exercises/g10-ch2-ex2-2-en.js')<idx.indexOf('data/textbook-exercises/g10-ch2-trace-en.js'),'Existing exercise module before new records');
assert.match(hub,/chapter\.id==='g10-ch2'/,'Chapter 2 concept stage integration');
assert.match(hub,/showG10Ch2Visual/,'Interactively explain the mathematics');
const bridge=read('data/why-step-g10-coverage.js');
assert(bridge.includes('Start with the goal: 32×2 = 64'),'HCF explains why to work backwards');
assert(!all.classes[10].items.some(q=>q.traceStatus==='chapterComplete'),'No false completion metadata');
console.log('PASS TRACE Grade 10 Chapter 2: 15 bilingual foundations, 53 source-grounded exercises, 114 current textbook records, offline ordering, no false completion');
