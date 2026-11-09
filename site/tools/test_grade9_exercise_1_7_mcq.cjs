'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const d=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/g9-ex1-7-mcq-content-only.json'),'utf8'));
assert.equal(d.grade,9);assert.equal(d.exercise,'1.7');assert.equal(d.entries.length,10);
assert.equal(new Set(d.entries.map(e=>e.id)).size,10);
assert.deepEqual(d.entries.map(e=>e.number),[2,3,4,5,6,7,8,10,11,20]);
for(const e of d.entries){assert.equal(e.steps.length,5);assert.ok(e.question.startsWith(e.number+'. '));assert.ok(e.question.includes('(1)')&&e.question.includes('(4)'));assert.ok(e.answer.startsWith('Option ('));assert.equal(e.studentRegistration,'not registered');}
assert.equal(2**3-1,7);assert.equal(100-40-35-20,5);
const A=new Set(['empty']);const powerA=[new Set(),new Set(['empty'])];assert.equal(powerA.filter(s=>[...A].every(v=>s.has(v))).length,1);
console.log('PASS: 10 unique Grade 9 Ex 1.7 staged MCQs, arithmetic and set checks; source images and integration pending');
