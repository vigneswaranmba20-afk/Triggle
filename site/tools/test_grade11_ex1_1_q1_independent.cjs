'use strict';
// Independent regression checks for Grade 11 Ex 1.1 Q1(i–iv) draft mathematics.
// No textbook source is invented and no editorial/CI approval is implied.
const assert = require('node:assert/strict');
const prime = n => n >= 2 && !Array.from({length: Math.max(0, Math.floor(Math.sqrt(n))-1)}, (_,i)=>i+2).some(d=>n%d===0);
const result1 = Array.from({length:120},(_,i)=>i+1).filter(n=>prime(n)&&n*n<121);
assert.deepEqual(result1,[2,3,5,7]);
for(let n=1;n<=120;n++) assert.equal(result1.includes(n),prime(n)&&n*n<121);
const f = x => (x-1)*(x+1)*(x*x-1);
assert.equal(f(1),0);assert.equal(Math.abs(f(-1)),0);
for(const x of [-20,-3,-1.5,-0.5,0,0.5,1.5,3,20])assert.notEqual(f(x),0);
const result3=Array.from({length:100},(_,i)=>i+1).filter(x=>4*x+9<52);
assert.deepEqual(result3,Array.from({length:10},(_,i)=>i+1));
assert.equal(4*10+9,49);assert.equal(4*11+9,53);
const x=-5;assert.notEqual(x+2,0);assert.equal((x-4)/(x+2),3);
assert.equal(x-4,3*(x+2));assert.equal(-2+2,0);
console.log('PASS independent Grade 11 Ex 1.1 Q1(i–iv) mathematical checks (4 subparts)');
