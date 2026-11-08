'use strict';
// Source and independent arithmetic checks for 2025 Grade 9 Probability Exercise 9.2 Q1–Q4.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const src=JSON.parse(fs.readFileSync(path.join(root,'data/textbook-fidelity/g9-ch9-ex9-2-en-q1-q4.json'),'utf8'));
const chapter={id:'g9-ch9',number:9,textbookQuestionIds:[]};
const window={TRIGGLE_CLASSES:{9:{items:[]}},TRIGGLE_CURRICULUM:{grades:[{grade:9,chapters:[chapter]}]}};
vm.runInNewContext(fs.readFileSync(path.join(root,'data/textbook-exercises/g9-ch9-ex9-2-en.js'),'utf8'),{window});
const items=window.TRIGGLE_CLASSES[9].items;
assert.equal(items.length,4);
assert.equal(new Set(items.map(q=>q.id)).size,4);
assert.equal(src.visualChecked,false,'Do not invent PDF page-image review');
assert.equal(src.tamilReference.humanEditorial,'pending');
for(let i=0;i<4;i++){
 const item=items[i],evidence=src.items[i];
 assert.equal(item.id,'g9-ch9-ex9.2-q'+(i+1));
 assert.equal(item.exercise,'9.2');
 assert.equal(item.q.en,evidence.question,'Source wording mismatch at '+item.id);
 assert.equal(item.answer,evidence.finalAnswer);
 assert.equal(item.page,evidence.pdfPage);
 assert.equal(item.sourceFidelity.status,'pdf-text-checked-en-visual-pending');
 assert.equal(item.sourceFidelity.tamilEditorial,'pending');
 assert.match(item.q.ta,/Tamil version pending/);
 assert.ok(item.steps.length>=3);
 for(const s of item.steps)assert.ok(s.en&&s.eq&&s.ta);
}
assert.equal(chapter.textbookQuestionIds.length,4);
assert.equal(window.TRIGGLE_G9_CH9_EX9_2_EN.length,4);
// Independent math, including complementary-event sanity checks.
assert.equal((10000-25)/10000,0.9975);
assert.equal((400-191)/400,209/400);
const x=15/8;
assert.equal(x/3+x/5,1);
assert.equal(1-0.72,0.28);
assert.match(items[3].q.en,/loosing/,'Preserve the printed textbook spelling');
console.log('PASS: G9 English Ex 9.2 Q1–Q4 source-text fidelity, incomplete-review flags, and arithmetic.');
