/* Grade 10 2025 exercise 1.1 Q1(i–iii): independent exhaustive pair enumeration and bilingual schema checks. */
'use strict';
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const base = path.join(__dirname, '../data/textbook-exercises');
const cross = (a,b) => a.flatMap(x => b.map(y => [x,y]));
const norm = pairs => pairs.map(p => JSON.stringify(p)).sort();
const cases = [
  {part:'i', A:[2,-2,3], B:[1,-4]},
  {part:'ii', A:['p','q'], B:['p','q']},
  {part:'iii', A:['m','n'], B:[]}
];
for (const {part,A,B} of cases) {
  const id = 'g10-ch1-ex1-1-q1'+part;
  const lesson = JSON.parse(fs.readFileSync(path.join(base,id+'.json'),'utf8'));
  assert.equal(lesson.id,id);
  assert.equal(lesson.grade,10);
  assert.equal(lesson.chapter,1);
  assert.equal(lesson.exercise,'1.1');
  assert.equal(lesson.question,'1');
  assert.equal(lesson.subpart,part);
  assert.equal(lesson.source.edition,'2025 revised');
  for (const lang of ['english','tamil']) {
    assert.equal(lesson.source[lang].printedPage,6);
    assert.equal(lesson.source[lang].pdfPage,12);
  }
  assert.equal(lesson.review.sourceVerified,true);
  assert.equal(lesson.review.mathVerified,true);
  assert.equal(lesson.review.tamilEditorial,'pending');
  assert.equal(lesson.review.merged,false);
  assert.equal(lesson.review.liveVerified,false);
  for (const key of ['title','questionParaphrase','misconception']) {
    for (const lang of ['en','ta']) assert.ok(lesson[key][lang]?.trim(),id+' '+key+' '+lang);
  }
  assert.ok(lesson.steps.length>=3,id+' needs explanatory derivation');
  for (const step of lesson.steps) {
    for (const lang of ['en','ta']) assert.ok(step[lang]?.trim(),id+' step '+lang);
    assert.ok(step.equation?.trim(),id+' missing equation');
  }
  for (const [name,expected] of [
    ['AxB',cross(A,B)], ['AxA',cross(A,A)], ['BxA',cross(B,A)]
  ]) {
    const actual=lesson.answers[name];
    assert.equal(actual.length,expected.length,id+' '+name+' cardinality');
    assert.equal(new Set(norm(actual)).size,expected.length,id+' '+name+' duplicate');
    assert.deepEqual(norm(actual),norm(expected),id+' '+name+' pairs');
    for (const pair of actual) assert.equal(pair.length,2,id+' '+name+' pair arity');
  }
  console.log('PASS '+id+': all Cartesian products, source metadata and bilingual schema');
}
const coverage=JSON.parse(fs.readFileSync(path.join(base,'grade-10-coverage-2025.json'),'utf8'));
assert.equal(coverage.grade,10);
assert.equal(coverage.chapters.length,8);
const ch1=coverage.chapters.find(c=>c.chapter===1);
for(const {part} of cases) assert.ok(ch1.verifiedQuestionSubparts.includes('1('+part+')'));
assert.equal(ch1.fullChapterExerciseInventoryComplete,false);
console.log('PASS Grade 10 coverage ledger: eight chapters and three verified draft subparts');
