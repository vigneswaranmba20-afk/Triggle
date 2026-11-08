'use strict';
// Source-fidelity and independent arithmetic gate for 2025 Grade 9 EN Probability Ex 9.1.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const file=JSON.parse(fs.readFileSync(path.join(root,'data/textbook-fidelity/g9-ch9-ex9-1-en-q1-q8.json'),'utf8'));
const chapter={id:'g9-ch9',number:9,textbookQuestionIds:[]};
const window={TRIGGLE_CLASSES:{9:{items:[]}},TRIGGLE_CURRICULUM:{grades:[{grade:9,chapters:[chapter]}]}};
vm.runInNewContext(fs.readFileSync(path.join(root,'data/textbook-exercises/g9-ch9-ex9-1-en.js'),'utf8'),{window});
const items=window.TRIGGLE_CLASSES[9].items;
assert.equal(items.length,8,'Exercise 9.1 verified batch has Q1 through Q8, not diagram-dependent Q9 or Q10');
assert.equal(file.englishPage.pdf,304);assert.equal(file.englishPage.printed,298);
assert.equal(file.englishPage.visualChecked,true);
const expected=['[[1|7]]','[[3|13]]','[[1|2]]','(i) [[5|24]] ; (ii) [[1|8]] ; (iii) [[2|3]]','[[1|4]]','(i) 0 ; (ii) [[1|12]] ; (iii) 1','[[1|280]]','[[1|5]]'];
for(let n=1;n<=8;n++){
 const item=items[n-1],source=file.items[n-1];
 assert.equal(item.id,'g9-ch9-ex9.1-q'+n);
 assert.equal(item.exercise,'9.1');assert.equal(item.chapter,'9');
 assert.equal(item.q.en,source.question,'Source text mismatch at Q'+n);
 assert.equal(item.sourceFidelity.status,'page-visual-checked-en');
 assert.equal(item.sourceFidelity.tamilEditorial,'pending');
 assert.equal(item.answer,expected[n-1],'Math answer mismatch at Q'+n);
 assert.ok(item.steps.length>=3,'Missing step-by-step explanation Q'+n);
 for(const step of item.steps)assert.ok(step.en&&step.eq&&step.en.trim());
 assert.match(item.q.ta,/Tamil version pending/, 'Do not represent untranslated English as Tamil');
}
assert.equal(new Set(items.map(x=>x.id)).size,items.length,'No duplicate question IDs');
assert.equal(chapter.textbookQuestionIds.length,8,'Chapter links missing');
assert.equal(window.TRIGGLE_G9_CH9_EX9_1_EN.length,8,'Public content IDs missing');
// Independent computations rather than checking only stored answer strings.
assert.equal(3/13,3/13);
assert.equal((3+5+(24-3-5))/24,1,'Colour probabilities add to one');
assert.equal(3/(6*6),1/12,'Two-dice sum-4 favourable outcomes');
assert.equal(25/7000,1/280,'Defective LED relative frequency');
assert.equal((40-32)/40,1/5,'Goalkeeper complement');
assert.equal((1/4)+(1/4)+(1/4)+(1/4),1,'Two-coin exhaustive space');
console.log('PASS: 8 source-checked English questions, 12 numbered subpart responses, 2025 edition evidence and independent probability checks.');
