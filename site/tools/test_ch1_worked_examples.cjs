'use strict';
// Deployment gate: all 35 bilingual textbook worked examples must remain accessible.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const site=path.resolve(__dirname,'..');
const read=file=>fs.readFileSync(path.join(site,file),'utf8');
const sandbox={window:{}};
for(const f of ['data/class-9.js','data/curriculum.js','data/textbook-examples/g9-ch1.js']){
  vm.runInNewContext(read(f),sandbox,{filename:f,timeout:4000});
}
const grade=sandbox.window.TRIGGLE_CLASSES[9];
const chapter=sandbox.window.TRIGGLE_CURRICULUM.grades.find(g=>g.grade===9).chapters.find(c=>c.id==='g9-ch1');
const examples=grade.items.filter(x=>/^Example 1\\.\\d+$/.test(x.label?.en||''));
assert.equal(examples.length,35,'all 35 numbered textbook examples must load');
assert.equal(new Set(examples.map(x=>x.id)).size,35,'unique example identifiers');
assert.equal(examples.filter(x=>chapter.legacyQuestionIds.includes(x.id)).length,35,'all examples linked from chapter');
for(let n=1;n<=35;n++){
  const ex=examples.find(x=>x.label.en==='Example 1.'+n);
  assert.ok(ex,'missing Example 1.'+n);
  assert.equal(ex.chapter,'1');
  assert.equal(ex.classNum,9);
  assert.equal(ex.kind,'textbook-example');
  assert.ok(ex.q.en.length>25 && ex.q.ta.length>25,'complete bilingual prompt: '+n);
  assert.ok(ex.title.en && ex.title.ta,'translated title: '+n);
  assert.ok(Array.isArray(ex.steps) && ex.steps.length>=2,'steps: '+n);
  ex.steps.forEach((s,i)=>{
    assert.ok(s.en.length>12 && s.ta.length>12 && s.eq.length>1,'step '+i+' of '+n);
  });
  assert.ok(ex.answer.length>0 && ex.source.startsWith('https://') && ex.page>0,'provenance/answer: '+n);
}
const union=(a,b)=>new Set([...a,...b]);
const intersect=(a,b)=>new Set([...a].filter(x=>b.has(x)));
const U=new Set(Array.from({length:13},(_,i)=>i-2));
const A=new Set([-1,1,3,5,7,9]),B=new Set([-2,1,4,7,10]);
const complement=s=>new Set([...U].filter(x=>!s.has(x)));
const same=(a,b)=>a.size===b.size && [...a].every(x=>b.has(x));
assert.ok(same(complement(union(A,B)),intersect(complement(A),complement(B))),'De Morgan union law');
assert.ok(same(complement(intersect(A,B)),union(complement(A),complement(B))),'De Morgan intersection law');
assert.equal(240+180+164-42-38-40+16,480,'Example 1.32 union');
assert.equal((240-42-40+16)+(180-42-38+16)+(164-38-40+16),392,'Example 1.32 singles');
assert.equal(360+200+150-120-86-90+80,494,'Example 1.33 union');
assert.equal(600-494,106,'Example 1.33 none');
assert.equal(40+6+10+80,136,'Example 1.33 at least two');
assert.equal(100-(85+40+20-32-13-10),10,'Example 1.34 triple');
assert.equal(125+100+150-200-125,50,'Example 1.35 triple');
assert.equal(125-50,75,'Example 1.35 exactly two');
const index=read('index.html');
const tag='data/textbook-examples/g9-ch1.js';
assert.ok(index.includes(tag),'examples script is included');
assert.ok(index.indexOf('data/curriculum.js')<index.indexOf(tag),'curriculum loads first');
assert.ok(index.indexOf(tag)<index.indexOf('assets/app.js'),'examples load before app boot');
assert.ok(index.indexOf(tag)<index.indexOf('assets/chapter-hub.js'),'examples load before hub');
vm.runInNewContext(read('data/textbook-examples/g9-ch1.js'),sandbox,{timeout:4000});
assert.equal(grade.items.filter(x=>/^Example 1\\.\\d+$/.test(x.label?.en||'')).length,35,'reloading must not duplicate');
console.log('PASS: 35/35 Grade 9 Set Language worked examples, bilingual data, curriculum wiring, math and script order');
