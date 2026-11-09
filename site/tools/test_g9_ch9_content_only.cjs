'use strict';
// Content-only test: deliberately NO UI/browser/layout checks.
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const records=JSON.parse(fs.readFileSync(path.join(root,'data/textbook-fidelity/g9-ch9-ex9-2-q5-ex9-3-en.json'),'utf8'));
const chapter={id:'g9-ch9',textbookQuestionIds:[]};
const window={TRIGGLE_CLASSES:{9:{items:[]}},TRIGGLE_CURRICULUM:{grades:[{grade:9,chapters:[chapter]}]}};
vm.runInNewContext(fs.readFileSync(path.join(root,'data/textbook-exercises/g9-ch9-ex9-2-q5-ex9-3-en.js'),'utf8'),{window});
const items=window.TRIGGLE_CLASSES[9].items;
assert.equal(items.length,11);assert.equal(records.items.length,11);assert.equal(new Set(items.map(x=>x.id)).size,11);
for(let i=0;i<11;i++){
 const a=items[i],b=records.items[i];
 assert.equal(a.id,b.id);assert.equal(a.q.en,b.q);assert.equal(a.answer,b.answer);
 assert.equal(a.sourceFidelity.status,'pdf-text-checked-en-visual-pending');
 assert.equal(a.sourceFidelity.tamilEditorial,'pending');
 assert.ok(a.steps.length>=3);assert.ok(a.steps.every(s=>s.en&&s.eq));
 assert.match(a.q.ta,/Tamil version pending/);
}
assert.equal(860+370+250,1480);assert.equal(1500-1480,20);
assert.equal(250/1500,1/6);assert.equal(860/1500,43/75);assert.equal(20/1500,1/75);
const key=[4,2,1,4,1,4,4,4,1,2];
for(let n=1;n<=10;n++)assert.ok(items[n].answer.startsWith('('+key[n-1]+')'),'Answer key mismatch at 9.3 Q'+n);
console.log('PASS: 11 new Grade 9 textbook questions, math/answer key checks; UI testing intentionally deferred.');
