'use strict';
/* Mandatory release gate: 2025 SCERT Grade 9 Real Numbers. */
const assert=require('node:assert/strict');
const vm=require('node:vm');
const path=require('node:path');
const fs=require('node:fs');
const site=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(site,p),'utf8');
const scripts=[
'data/class-9.js','data/curriculum.js',
'data/real-numbers/g9-ch2-core.js',
'data/real-numbers/g9-ch2-examples-a.js',
'data/real-numbers/g9-ch2-examples-b.js',
'data/real-numbers/g9-ch2-exercises-a.js',
'data/real-numbers/g9-ch2-exercises-b.js',
'data/real-numbers/g9-ch2-exercises-c.js',
'data/real-numbers/g9-ch2-exercises-d.js',
'data/real-numbers/g9-ch2-exercises-e.js',
'data/real-numbers/g9-ch2-exercises-f.js',
'data/real-numbers/g9-ch2-concepts.js',
];
const sandbox={window:{}};
for(const p of scripts)vm.runInNewContext(read(p),sandbox,{filename:p,timeout:5000});
const chapter=sandbox.window.TRIGGLE_CURRICULUM.grades.find(g=>g.grade===9).chapters.find(c=>c.id==='g9-ch2');
const items=sandbox.window.TRIGGLE_CLASSES[9].items.filter(x=>x.chapter==='2');
const published=items.filter(x=>x.kind==='textbook-example'||x.kind==='textbook-exercise');
const examples=published.filter(x=>x.kind==='textbook-example');
const exercises=published.filter(x=>x.kind==='textbook-exercise');
assert.equal(items.length,152,'151 textbook questions/subparts plus 1 legacy practice');
assert.equal(published.length,151,'total textbook learning units');
assert.equal(examples.length,31,'31 numbered worked examples');
assert.equal(exercises.length,120,'120 exercise subparts and MCQs');
assert.equal(new Set(published.map(x=>x.id)).size,151,'unique IDs');
assert.equal(new Set(chapter.legacyQuestionIds).size,chapter.legacyQuestionIds.length,'no repeated curriculum IDs');
for(let n=1;n<=31;n++){
  const ex=examples.find(x=>x.label.en==='Example 2.'+n);
  assert.ok(ex,'missing textbook Example 2.'+n);
  assert.match(ex.reference,new RegExp('Example 2\\.'+n));
}
const counts={'2.1':5,'2.2':16,'2.3':7,'2.4':3,'2.5':19,'2.6':21,'2.7':11,'2.8':18,'2.9':20};
for(const [exercise,n] of Object.entries(counts)){
  assert.equal(exercises.filter(x=>x.exercise===exercise).length,n,'exercise '+exercise);
}
const tamilPageByEnglish={45:47,51:55,52:56,55:59,57:61,59:64,60:65,68:72,70:75,73:79,74:80,75:81,76:82};
for(const x of exercises){
  assert.equal(x.tamilPrintedPage,tamilPageByEnglish[x.printedPage],
    'Tamil 2025 printed page mismatch: '+x.id);
}
for(const x of published){
  assert.ok(x.q.en.length>18 && x.q.ta.length>10,'bilingual full question: '+x.id);
  assert.ok(x.title.en && x.title.ta && x.label.en && x.label.ta,'bilingual title/label: '+x.id);
  assert.ok(x.steps.length>=2,'step count: '+x.id);
  for(const step of x.steps)assert.ok(step.en?.length>10&&step.ta?.length>10&&step.eq?.length>0,'bilingual solved step: '+x.id);
  assert.ok(x.answer.length>0&&x.source.includes('drive.google.com')&&x.tamilSource.includes('drive.google.com'),'answer and source: '+x.id);
  assert.ok(chapter.legacyQuestionIds.includes(x.id),'chapter integration: '+x.id);
  assert.ok(x.difficulty==='hard'||x.difficulty==='standard','difficulty: '+x.id);
}
const quiz=exercises.filter(x=>x.exercise==='2.9');
assert.equal(quiz.length,20);
quiz.forEach(x=>{for(let i=1;i<=4;i++)assert.ok(x.q.en.includes('('+i+')'),'choice '+i+': '+x.id);});
const answer=id=>items.find(x=>x.id===id)?.answer;
assert.equal(answer('g9-ch2-example-1'),'7/12, 13/24');
assert.equal(answer('g9-ch2-example-5'),'1/3; 2122/999; 41/90; 563/990');
assert.equal(answer('g9-ch2-example-23'),'(i) 0; (ii) 3∛5');
assert.equal(answer('g9-ch2-example-31'),'(i) 6.25×10³⁰; (ii) 1.25×10⁻²²; (iii) 4.32×10²⁹; (iv) 4×10³⁸');
assert.equal(answer('g9-ch2-ex6-q2-v'),'5/16');
assert.equal(answer('g9-ch2-ex7-q4'),'18');
assert.equal(answer('g9-ch2-ex8-q3-iii'),'2.5×10⁻³⁶');
assert.equal(answer('g9-ch2-ex9-q18'),'Option (4) — 10⁶/3⁶');
const stages=sandbox.window.TRIGGLE_REAL_PATH.stages;
assert.equal(stages.length,8,'eight concept and quiz stages');
stages.forEach(s=>assert.ok(s.title.en&&s.title.ta&&s.idea.en&&s.idea.ta&&s.choices.length===3&&s.correct>=0&&s.correct<3));
vm.runInNewContext(read('assets/diagrams.js'),sandbox,{filename:'assets/diagrams.js',timeout:5000});
vm.runInNewContext(read('assets/real-number-line.js'),sandbox,{filename:'assets/real-number-line.js',timeout:5000});
const graphic=sandbox.window.TriggleDraw.drawClassic({demo:{kind:'real-number-line',target:Math.sqrt(3),min:1,max:2,label:'√3'},ref:'Example 2.8',title:'Number line'});
assert.match(graphic,/<svg/);
assert.match(graphic,/√3/);
vm.runInNewContext(read('assets/deep-lessons.js'),sandbox,{filename:'deep-lessons.js',timeout:5000});
vm.runInNewContext(read('assets/real-numbers-deep.js'),sandbox,{filename:'real-numbers-deep.js',timeout:5000});
const hard=items.find(x=>x.id==='g9-ch2-example-5');
const easy=items.find(x=>x.id==='g9-ch2-example-4');
assert.equal(hard.difficulty,'hard');
assert.ok(sandbox.window.TriggleDeep.hasLesson(hard.id),'hard problem has detailed view');
assert.ok(sandbox.window.TriggleDeep.build(hard,'ta').stages.length>hard.steps.length,'deep Tamil stage coverage');
assert.ok(!sandbox.window.TriggleDeep.hasLesson(easy.id),'no detailed view on easy problem');
const index=read('index.html');
for(const p of scripts.slice(2)){
 assert.ok(index.includes(p),'missing script: '+p);
 assert.ok(index.indexOf(p)<index.indexOf('assets/app.js'),'script after app: '+p);
}
assert.ok(index.includes('assets/real-numbers-deep.js'));
assert.ok(index.includes('assets/real-number-line.js'));
const sw=read('service-worker.js');
assert.ok(sw.includes('assets/real-number-line.js'));
for(const p of scripts.slice(2))assert.ok(sw.includes(p),'missing offline cache entry: '+p);
vm.runInNewContext(read('data/real-numbers/g9-ch2-examples-a.js'),sandbox);
vm.runInNewContext(read('data/real-numbers/g9-ch2-exercises-f.js'),sandbox);
assert.equal(sandbox.window.TRIGGLE_CLASSES[9].items.filter(x=>x.chapter==='2').length,152,'no duplicates on reloading');
console.log('PASS: Real Numbers 31 examples + 120 exercise units + 8 concepts; source, bilingual, figures, hard-only detail, IDs, cache and math checks');
