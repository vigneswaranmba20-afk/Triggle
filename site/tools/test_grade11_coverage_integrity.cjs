'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const ledger = JSON.parse(fs.readFileSync(path.join(root, 'docs/coverage/grade-11-2025.json'), 'utf8'));
const lessons = ['q1','q2','q3-i','q3-ii','q3-iii'].flatMap(suffix => JSON.parse(fs.readFileSync(path.join(root, 'site/data/textbook-exercises/g11-ch1-ex1-1-'+suffix+'.json'), 'utf8')).questions);
assert.equal(ledger.grade, 11);
assert.equal(ledger.edition, '2025 revised');
assert.equal(ledger.inventoryComplete, false);
assert.equal(ledger.exerciseQuestionSubpartTotal, null);
assert.equal(ledger.chapters.length, 12);
assert.deepEqual(ledger.chapters.map(c=>c.chapterId), Array.from({length:12},(_,i)=>'g11-ch'+(i+1)));
assert.equal(lessons.length, 8);
const ids = new Set();
for (const item of ledger.items) {
 assert.ok(!ids.has(item.id), 'duplicate ledger ID: '+item.id);
 ids.add(item.id);
 assert.ok(item.englishPrintedPage>0 && item.tamilPrintedPage>0);
 assert.equal(item.tamilEditorial, 'pending');
 assert.equal(item.liveVerified, false);
 if(item.merged) assert.ok(item.ciPassed, 'merged without CI: '+item.id);
 if(item.liveVerified) assert.ok(item.deployed && item.merged, 'live without deployment: '+item.id);
}
assert.deepEqual([...ids].sort(), lessons.map(q=>q.id).sort(), 'ledger and lesson IDs diverge');
for (const q of lessons) {
 const item=ledger.items.find(i=>i.id===q.id);
 assert.equal(q.source.page.en,item.englishPrintedPage);
 assert.equal(q.source.page.ta,item.tamilPrintedPage);
 assert.equal(q.source.edition,ledger.edition);
 assert.equal(q.review.tamilEditorial,item.tamilEditorial);
 assert.equal(q.review.mathematics==='independently checked',item.mathChecked);
 assert.ok(q.prompt.en && q.prompt.ta && q.answer.en && q.answer.ta);
 assert.ok(q.steps.en.length>=3 && q.steps.ta.length>=3);
}
for (const chapter of ledger.chapters) {
 const items=ledger.items.filter(i=>i.id.startsWith(chapter.chapterId+'-'));
 assert.equal(chapter.draftedSubparts,items.length);
 assert.equal(chapter.mathematicallyCheckedSubparts,items.filter(i=>i.mathChecked).length);
 assert.equal(chapter.merged,items.filter(i=>i.merged).length);
 assert.equal(chapter.liveVerified,items.filter(i=>i.liveVerified).length);
 assert.equal(chapter.tamilEditorialApproved,items.filter(i=>i.tamilEditorial==='approved').length);
 assert.equal(chapter.fullExerciseInventory,'UNKNOWN');
}
console.log('PASS Grade 11 coverage integrity: 12 chapters, '+ids.size+' source-referenced subparts');
