'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const box={window:{}};
const run=relative=>vm.runInNewContext(fs.readFileSync(path.join(root,relative),'utf8'),box,{filename:relative});
run('data/class-9.js');
run('data/curriculum.js');
const before=box.window.TRIGGLE_CLASSES[9].items.map(q=>q.id);
run('data/textbook-exercises/g9-ch1-ex1-1-view.js');
run('data/textbook-exercises/g9-ch1-ex1-1-q4-view.js');
const grade=box.window.TRIGGLE_CLASSES[9], chapter=box.window.TRIGGLE_CURRICULUM.grades.find(g=>g.grade===9).chapters.find(c=>c.id==='g9-ch1');
const expected=['q1','q2','q3a','q3b','q4'].flatMap(part=>JSON.parse(fs.readFileSync(path.join(root,'data/textbook-exercises/g9-ch1-ex1-1-'+part+'.json'),'utf8')).questions);
assert.equal(grade.items.length,before.length+20,'Preserve every existing Grade 9 ID and add exactly 18');
assert.deepEqual(grade.items.slice(0,before.length).map(q=>q.id),before,'Do not alter legacy question ordering');
assert.equal(chapter.textbookQuestionIds.length,20);
const ids=new Set(grade.items.map(q=>q.id));
assert.equal(ids.size,grade.items.length,'No duplicate IDs');
for(const raw of expected){
 const q=grade.items.find(q=>q.id===raw.id);
 assert.ok(q,'Missing student-facing '+raw.id);
 assert.ok(chapter.textbookQuestionIds.includes(raw.id),'Question absent from chapter hub: '+raw.id);
 for(const language of ['en','ta']){
  assert.equal(q.q[language],raw.prompt[language]);
  assert.equal(q.answer[language],raw.answer[language]);
  assert.deepEqual(Array.from(q.steps,s=>s[language]),raw.steps[language]);
 }
 assert.equal(q.review.publication,'draft','Never mark this unreviewed question published');
 assert.equal(q.review.tamilEditorial,'pending');
 assert.equal(q.sourceEdition,'2025 revised');
}
console.log('PASS: all 20 Grade 9 Exercise 1.1 subparts integrated with bilingual prompts/answers/steps, mapped to chapter and preserving legacy IDs');
