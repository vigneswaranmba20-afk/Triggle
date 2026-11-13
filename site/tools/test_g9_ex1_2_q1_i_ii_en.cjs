'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/textbook-exercises/g9-ex1-2-q1-i-ii-en.json'), 'utf8'));
assert.equal(data.items.length, 2);
assert.equal(new Set(data.items.map(x=>x.id)).size, 2);
assert.ok(data.source.edition.includes('2025'));
assert.equal(data.source.pageImageReviewed, false);
for (const x of data.items) { assert.ok(x.sourceText.startsWith(x.subpart)); assert.ok(x.stepsEn.length >= 3); assert.ok(x.answer); assert.equal(x.tamilStatus,'pending'); }
assert.equal(new Set(['p','q','r','s','t','u']).size, 6);
const nValues=Array.from({length:100},(_,n)=>n).filter(n=>3*n+2<15);
assert.deepEqual(nValues,[0,1,2,3,4]);
assert.deepEqual(nValues.map(n=>3*n+2),[2,5,8,11,14]);
assert.equal(data.release.integratedIntoStudentUI,false);
console.log('PASS: G9 Ex1.2 Q1(i-ii) math and draft provenance');
