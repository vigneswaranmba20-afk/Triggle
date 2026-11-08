'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),box={window:{}};
const run=p=>vm.runInNewContext(fs.readFileSync(path.join(root,p),'utf8'),box,{filename:p});
run('data/class-9.js');run('data/curriculum.js');run('data/textbook-exercises/g9-ch1-ex1-1-view.js');
const grade=box.window.TRIGGLE_CLASSES[9],before=grade.items.map(x=>x.id);
run('data/textbook-exercises/g9-ch1-ex1-1-q4-view.js');
const chapter=box.window.TRIGGLE_CURRICULUM.grades.find(g=>g.grade===9).chapters.find(c=>c.id==='g9-ch1');
const raw=JSON.parse(fs.readFileSync(path.join(root,'data/textbook-exercises/g9-ch1-ex1-1-q4.json'),'utf8'));
assert.equal(grade.items.length,before.length+2);
assert.deepEqual(grade.items.slice(0,before.length).map(x=>x.id),before);
assert.equal(new Set(grade.items.map(x=>x.id)).size,grade.items.length);
for(const item of raw.questions){const view=grade.items.find(x=>x.id===item.id);assert(view);assert(chapter.textbookQuestionIds.includes(item.id));for(const lang of ['en','ta']){assert.equal(view.q[lang],item.prompt[lang]);assert.equal(view.answer[lang],item.answer[lang]);assert.deepEqual(Array.from(view.steps,s=>s[lang]),item.steps[lang]);}assert.equal(view.review.tamilEditorial,'pending');}
assert.equal(chapter.textbookQuestionIds.length,20);
console.log('PASS: Q4(i-ii) student integration, bilingual steps, stable legacy IDs, chapter navigation');
