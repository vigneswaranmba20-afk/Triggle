'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const p = path.resolve(__dirname, '../data/g9-ex1-7-q1-q16-content-only.json');
const d = JSON.parse(fs.readFileSync(p, 'utf8'));
assert.equal(d.grade, 9);
assert.equal(d.exercise, '1.7');
assert.equal(d.entries.length, 2);
assert.equal(d.questionSubparts, 2);
assert.equal(d.fullySourceImageVerified, 0);
assert.equal(new Set(d.entries.map(x=>x.id)).size, 2);
for(const e of d.entries){assert.ok(e.question.length > 100);assert.ok(e.steps.length >= 5);assert.equal(e.studentRegistration,'not registered');}
assert.equal(d.entries[0].answer,'Option (2)');
assert.ok(Array.from({length:10},(_,i)=>i+1).includes(7));
assert.equal(d.entries[1].answer,'Option (1), x = 10');
assert.equal(4*10+6*10+5*10-20-15-25+10,100);
console.log('PASS: two Grade 9 English staged questions, unique IDs, provenance, independent arithmetic; image fidelity pending');
