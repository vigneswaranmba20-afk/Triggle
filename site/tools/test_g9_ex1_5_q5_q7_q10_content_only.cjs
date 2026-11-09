'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const doc=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/g9-ex1-5-q5-q7-q10-content-only.json'),'utf8'));
assert.equal(doc.grade,9);assert.equal(doc.chapter,1);assert.equal(doc.exercise,'1.5');
assert.equal(doc.entries.length,3);
assert.deepEqual(doc.entries.map(e=>e.id),['g9-ch1-ex1-5-q5','g9-ch1-ex1-5-q7','g9-ch1-ex1-5-q10']);
for(const e of doc.entries){assert.equal(e.sourcePage,28);assert.ok(e.question.startsWith(e.number+'. '));assert.ok(e.steps.length>=5);assert.ok(e.answer);assert.equal(e.studentRegistration,'not registered');}
const sort=a=>[...new Set(a)].sort((x,y)=>String(x).localeCompare(String(y),undefined,{numeric:true}));
const eq=(a,b)=>assert.deepEqual(sort(a),sort(b));
const union=(a,b)=>[...new Set([...a,...b])];
const intersection=(a,b)=>a.filter(x=>b.includes(x));
const difference=(a,b)=>a.filter(x=>!b.includes(x));
{
 const A=['b','c','e','g','h'],B=['a','c','d','g','i'],C=['a','d','e','g','h'];
 const lhs=difference(A,intersection(B,C));
 const rhs=union(difference(A,B),difference(A,C));
 eq(lhs,rhs);eq(lhs,['b','c','e','h']);
 assert.ok(doc.entries[0].answer.includes('{b, c, e, h}'));
}
{
 const A=[-2,0,1,3,5],B=[-1,0,2,5,6],C=[-1,2,5,6,7];
 const lhs=difference(A,union(B,C));
 const rhs=intersection(difference(A,B),difference(A,C));
 eq(lhs,rhs);eq(lhs,[-2,1,3]);
 assert.ok(doc.entries[1].answer.includes('{−2, 1, 3}'));
}
{
 const U=[4,7,8,10,11,12,15,16],A=[7,8,11,12],B=[4,8,12,15];
 const comp=a=>difference(U,a);
 const first=comp(union(A,B)),second=comp(intersection(A,B));
 eq(first,intersection(comp(A),comp(B)));eq(first,[10,16]);
 eq(second,union(comp(A),comp(B)));eq(second,[4,7,10,11,15,16]);
 assert.ok(doc.entries[2].answer.includes('{10, 16}'));
 assert.ok(doc.entries[2].answer.includes('{4, 7, 10, 11, 15, 16}'));
}
console.log('PASS Grade 9 Exercise 1.5 Q5/Q7/Q10: 3 questions, 3 parts, 4 independently evaluated set identities; original page-image review and publication pending.');
