'use strict';
// Independent checks of the actual Grade 10 Exercise 2.2 student records.
// Q8 is intentionally excluded: its original wording has an unresolved minimum ambiguity.
const assert = require('node:assert/strict');
const gcd=(a,b)=>b?gcd(b,a%b):a;
const lcm=(a,b)=>a/gcd(a,b)*b;
module.exports = function verify({records,mapping,inventory},{hashRecord}) {
  assert.equal(records.length,8);
  const expected=[1,2,3,4,5,6,7,9];
  const checks=[];
  for(const n of expected){
    const id='c10-2-ex2-2-q'+n;
    const r=records.find(x=>x.id===id),m=mapping.find(x=>x.recordId===id);
    assert.ok(r&&m,'missing '+id);
    assert.equal(r.q.en,m.sourceText.en);
    assert.ok(r.steps.length>=3);
    assert.equal(typeof r.answer,'string');
    assert.ok(r.steps.every(s=>typeof s.en==='string'&&s.en.length>10));
    const all=[r.answer,...r.steps.map(s=>s.eq||'')].join(' ');
    const contains=(s)=>assert.ok(all.includes(s),id+' missing mathematical claim '+s);
    switch(n){
      case 1:
        for(let k=1;k<=50;k++){assert.equal(Number(4n**BigInt(2*k)%10n),6);assert.equal(Number(4n**BigInt(2*k-1)%10n),4);}
        contains('2, 4, 6');break;
      case 2:
        for(let a=1;a<=12;a++)for(let b=1;b<=12;b++)assert.equal(Number(2n**BigInt(a)*5n**BigInt(b)%10n),0);
        contains('ends in 0');break;
      case 3:
        assert.equal(gcd(252525,363636),10101);contains('10101');break;
      case 4:
        assert.equal(2**9*3**3,13824);contains('a = 9');contains('b = 3');break;
      case 5:
        assert.equal(2**3*3**4*5**2*7,113400);contains('x₁ = 3');contains('x₄ = 1');break;
      case 6:
        assert.equal(gcd(408,170),34);assert.equal(lcm(408,170),2040);
        contains('2040');contains('34');break;
      case 7:
        assert.equal(lcm(lcm(24,15),36),360);
        assert.equal(Math.floor(999999/360)*360,999720);
        assert.ok(999720+360>999999);contains('999720');break;
      case 9:
        assert.equal(Array.from({length:10},(_,i)=>i+1).reduce(lcm,1),2520);
        contains('2520');break;
    }
    checks.push({recordId:id,parts:['whole'],passed:true,method:'Independent integer arithmetic and source-linked answer/step assertions for Q'+n,recordSha256:hashRecord(r)});
  }
  const blocked=inventory.exercises[0].questions.find(q=>q.number==='8');
  assert.equal(blocked.status,'blocked');
  assert.ok(!records.some(r=>r.id.endsWith('-q8')));
  return {checks};
};
