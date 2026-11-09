'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const ledger = JSON.parse(fs.readFileSync(path.join(root, 'docs/coverage/grade-11-2025.json'), 'utf8'));
const lessonDir = path.join(root, 'site/data/textbook-exercises');
const lessonFiles = fs.readdirSync(lessonDir).filter(name => /^g11-ch1-ex1-1-q(?:1|2|3-[ivx]+|4-[ivx]+)\.json$/.test(name)).sort();
assert.ok(lessonFiles.length > 0, 'no Grade 11 lesson files found');
const lessons = lessonFiles.flatMap(name => JSON.parse(fs.readFileSync(path.join(lessonDir, name), 'utf8')).questions);
assert.equal(ledger.grade, 11);
assert.equal(ledger.edition, '2025 revised');
assert.equal(ledger.inventoryComplete, false);
assert.equal(ledger.exerciseQuestionSubpartTotal, null);
assert.equal(ledger.chapters.length, 12);
assert.deepEqual(ledger.chapters.map(c=>c.chapterId), Array.from({length:12},(_,i)=>'g11-ch'+(i+1)));
assert.equal(lessons.length, ledger.chapters[0].draftedSubparts, 'draft count must follow real lesson inventory');
const ids = new Set();
for (const item of ledger.items) {
 assert.ok(!ids.has(item.id), 'duplicate ledger ID: '+item.id);
 ids.add(item.id);
 assert.ok(item.englishPrintedPage>0 && item.tamilPrintedPage>0);
 assert.equal(item.tamilEditorial, 'pending');
 assert.equal(item.liveVerified, false);
 if(item.sourceExact === true) {
  assert.equal(item.englishPageImageChecked, true, 'English page image missing for source-exact '+item.id);
  assert.equal(item.tamilPageImageChecked, true, 'Tamil page image missing for source-exact '+item.id);
  assert.ok(item.sourceCheckpoint, 'source-exact item lacks checkpoint: '+item.id);
  assert.ok(item.lessonPath && item.previewPath, 'source-exact item lacks lesson/preview paths: '+item.id);
  assert.ok(fs.existsSync(path.join(root, item.sourceCheckpoint)), 'source checkpoint not found: '+item.id);
  assert.ok(fs.existsSync(path.join(root, item.lessonPath)), 'lesson not found: '+item.id);
  assert.ok(fs.existsSync(path.join(root, item.previewPath)), 'preview not found: '+item.id);
 }
 if(item.status.startsWith('missing')) {
  assert.notEqual(item.sourceExact, true, 'missing item cannot claim source-exact: '+item.id);
  assert.equal(item.mathChecked, false, 'missing item cannot claim math verification: '+item.id);
  assert.equal(item.ciPassed, false, 'missing item cannot claim CI: '+item.id);
  assert.equal(item.merged, false, 'missing item cannot claim merge: '+item.id);
  assert.equal(item.liveVerified, false, 'missing item cannot claim live verification: '+item.id);
 }
 if(item.merged) assert.ok(item.ciPassed, 'merged without CI: '+item.id);
 if(item.liveVerified) assert.ok(item.deployed && item.merged, 'live without deployment: '+item.id);
}
const drafted = ledger.items.filter(i=>i.status==='draft');
assert.deepEqual(drafted.map(i=>i.id).sort(), lessons.map(q=>q.id).sort(), 'draft ledger and lesson IDs diverge');
const blocked = ledger.items.find(i=>i.id==='g11-ch1-ex1.1-q4-v');
assert.ok(blocked, 'missing Q4(v) inventory checkpoint');
assert.equal(blocked.status,'missing-source-image-verification');
assert.equal(blocked.mathChecked,false);
assert.equal(blocked.ciPassed,false);
assert.equal(blocked.merged,false);
assert.equal(blocked.liveVerified,false);
assert.ok(!blocked.sourceCheckpoint, 'unverified Q4(v) must not claim a completed source checkpoint');
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
 assert.equal(chapter.draftedSubparts,items.filter(i=>i.status==='draft').length);
 assert.equal(chapter.mathematicallyCheckedSubparts,items.filter(i=>i.mathChecked).length);
 assert.equal(chapter.merged,items.filter(i=>i.merged).length);
 assert.equal(chapter.liveVerified,items.filter(i=>i.liveVerified).length);
 assert.equal(chapter.tamilEditorialApproved,items.filter(i=>i.tamilEditorial==='approved').length);
 assert.equal(chapter.fullExerciseInventory,'UNKNOWN');
}
console.log('PASS Grade 11 coverage integrity: 12 chapters, '+ids.size+' source-referenced subparts');
