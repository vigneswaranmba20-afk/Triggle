'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const d=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/g9-ex1-3-q5-content-only.json'),'utf8'));
assert.equal(d.entries.length,3);
assert.equal(new Set(d.entries.map(x=>x.id)).size,3);
assert.equal(d.source.printedPage,19);
assert.equal(d.source.driveFileId,'1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J');
const cases=[{"part":"i","left":"P","right":"Q","a":[2,3,5,7,11],"b":[1,3,5,11],"answer":[1,2,7]},{"part":"ii","left":"R","right":"S","a":["l","m","n","o","p"],"b":["j","l","n","q"],"answer":["j","m","o","p","q"]},{"part":"iii","left":"X","right":"Y","a":[5,6,7],"b":[5,7,9,10],"answer":[6,9,10]}];
for(const c of cases){const e=d.entries.find(x=>x.part===c.part);assert.ok(e);assert.ok(e.steps.length>=3);assert.equal(e.tamilStatus,'pending');const actual=[...new Set([...c.a,...c.b])].filter(x=>c.a.includes(x)!==c.b.includes(x));const sort=x=>x.slice().sort((a,b)=>String(a).localeCompare(String(b),undefined,{numeric:true}));assert.deepEqual(sort(actual),sort(e.expected));assert.deepEqual(sort(e.expected),sort(c.answer));}
console.log('Grade 9 Exercise 1.3 Q5: 3 source-ID/schema/math cases passed');
