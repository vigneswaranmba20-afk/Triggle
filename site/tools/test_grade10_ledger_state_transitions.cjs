'use strict';
// Grade 10 coverage is a state machine, not a count of files or CI green ticks.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../data/textbook-exercises');
const ledger = JSON.parse(fs.readFileSync(path.join(root,'grade-10-coverage-2025.json'),'utf8'));
const ch = ledger.chapters[0];
const ex = ch.exerciseInventory['1.1'];
const expected = ['1(i)','1(ii)','1(iii)','2','3','4','5','6(i)','6(ii)','6(iii)','7(i)','7(ii)'];
assert.deepEqual(ex.enumeratedQuestionSubparts,expected,'2025 source inventory changed: recheck both PDF page images');
assert.equal(new Set(expected).size,expected.length);
assert.deepEqual([...ch.verifiedQuestionSubparts,...ex.missingSourceVerified].sort(),[...expected].sort(),'Every inventoried slot must be accounted for exactly once');
assert.equal(ex.verifiedCount,ch.verifiedQuestionSubparts.length);
assert.equal(ch.verifiedQuestionSubparts.length,7);
assert.equal(ex.missingSourceVerified.length,5);
for(const chapter of ledger.chapters){
 assert.ok(!chapter.fullChapterExerciseInventoryComplete,'No whole chapter inventory has been certified');
 assert.ok(chapter.mergedQuestionSubparts.every(id=>chapter.verifiedQuestionSubparts.includes(id)));
 assert.ok(chapter.liveVerifiedQuestionSubparts.every(id=>chapter.mergedQuestionSubparts.includes(id)));
 assert.ok(chapter.liveVerifiedQuestionSubparts.every(id=>chapter.verifiedQuestionSubparts.includes(id)));
}
for(const id of expected){
 const m=/^(\d+)(?:\(([ivx]+)\))?$/.exec(id);
 const stem='g10-ch1-ex1-1-q'+m[1]+(m[2]||'');
 const file=path.join(root,stem+'.json');
 const supplemental=path.join(root,stem+'-supplement.json');
 if(ch.verifiedQuestionSubparts.includes(id)){
  const lesson=JSON.parse(fs.readFileSync(file,'utf8'));
  assert.equal(lesson.review.mathVerified,true,id);
  assert.equal(lesson.review.sourceVerified,true,id);
  assert.notEqual(lesson.review.liveVerified,true,id);
  // A learning restatement is not evidence of an exact textbook transcription.
  if(lesson.questionParaphrase) assert.notEqual(lesson.source?.exactQuestionVerified,true,id);
 }else{
  if(fs.existsSync(file)||fs.existsSync(supplemental)){
   const lesson=JSON.parse(fs.readFileSync(fs.existsSync(file)?file:supplemental,'utf8'));
   assert.notEqual(lesson.review.liveVerified,true,id);
   assert.notEqual(lesson.review.merged,true,id);
  }
 }
}
console.log('PASS Grade 10 2025 Exercise 1.1 ledger: 12 inventoried, 7 source/math drafts, 5 pending; zero merged/live');
