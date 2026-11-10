'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const ctx={window:{}};
for(const f of ['data/class-10.js','data/class-10-ex1-1-2025.js','data/class-10-chapter-1.js','data/curriculum.js','data/textbook-exercises/g10-checkpoint-20261110-en.js'])vm.runInNewContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f,timeout:10000});
const all=ctx.window.TRIGGLE_CLASSES[10].items;
assert.equal(new Set(all.map(x=>x.id)).size,all.length,'No duplicate question IDs');
const expected=["c10-3-ex3-1-q1-i","c10-4-ex4-1-q2","c10-4-ex4-1-q3","c10-8-ex8-1-q1-i","c10-8-ex8-1-q1-ii","c10-8-ex8-1-q2"];
for(const id of expected){const matches=all.filter(x=>x.id===id);assert.equal(matches.length,1,'Expected exactly one '+id);const x=matches[0];assert.equal(x.translationReview,'pending');assert.match(x.reference,/English printed p\./);assert.ok(x.steps.length>=3);}
// The student UI builds each chapter's Exercises menu exclusively from registered IDs.
// Every checkpoint lesson must therefore appear in its source chapter's menu.
const gradeChapters=ctx.window.TRIGGLE_CURRICULUM.grades.find(g=>g.grade===10).chapters;
for(const chapterNum of [3,4,8]){
  const chapter=gradeChapters.find(ch=>Number(ch.number)===chapterNum);
  assert.ok(chapter,'Grade 10 chapter '+chapterNum+' must exist');
  const ids=chapter.textbookQuestionIds||[];
  const relevant=expected.filter(id=>all.find(item=>item.id===id).chapter===String(chapterNum));
  for(const id of relevant)assert.equal(ids.filter(x=>x===id).length,1,'Chapter '+chapterNum+' Exercises must show '+id);
  const actual=all.filter(item=>ids.includes(item.id)&&item.kind==='textbook');
  assert.ok(actual.length>=relevant.length,'Chapter '+chapterNum+' has discoverable textbook exercises');
}

const existing=["c10-1-ex1-1-q6-i","c10-1-ex1-1-q6-ii","c10-1-ex1-1-q6-iii","c10-1-ex1-1-q7-i","c10-1-ex1-1-q7-ii","c10-6-6-1-1","c10-6-6-1-2"];
for(const id of existing)assert.equal(all.filter(x=>x.id===id).length,1,'Existing item must not duplicate: '+id);
const by=id=>all.find(x=>x.id===id);
assert.match(by('c10-3-ex3-1-q1-i').answer,/2, −1, 4/);
const [x,y,z]=[2,-1,4];assert.equal(x+y+z,5);assert.equal(2*x-y+z,9);assert.equal(x-2*y+3*z,16);
assert.equal(6.6*1.25/2.5,3.3);assert.equal(28*6/(400/100),42);
assert.equal(125-63,62);assert.equal((125-63)/(125+63),31/94);
assert.ok(Math.abs((61.4-13.6)/(61.4+13.6)-239/375)<1e-12);
assert.ok(Math.abs((36.8+13.4)-50.2)<1e-10,'Float rounding tolerance for range');
const f=JSON.parse(fs.readFileSync(path.join(root,'data/textbook-fidelity/g10-checkpoint-20261110.json'),'utf8'));
assert.equal(f.records.length,6);assert.equal(f.records.every(r=>r.source_image_compared&&r.tamil_editorial_review==='pending'),true);
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
assert.ok(html.includes('g10-checkpoint-20261110-en.js'));assert.ok(sw.includes('g10-checkpoint-20261110-en.js'));
console.log('Grade 10 checkpoint: 6 additional items, existing IDs, source references and math validated');
