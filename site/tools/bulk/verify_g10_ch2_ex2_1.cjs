'use strict';
const assert=require('node:assert/strict');

// Each reviewed lesson is pinned below as well as checked independently. A wording or
// workings change must receive mathematical review before updating this digest.
const reviewed={
  "1": "b38d2dcb876f463701d6177b62eee630a66b3b767ecc10c1c65a715523e5d4fb",
  "2": "8b400352c1f81cd15375f42e38b500ad12ee3caf995ad0e950c4624a3142a301",
  "3": "08f3d6ac4d8cf9a42667e7bca1b752b64b1ab61574339d09184fea70c5c9b710",
  "4": "646e634719b285da4ec4c3df73533620a50af5191624c872470fd2767eb5677c",
  "5": "ac7aef74cd23dfbeb1dd0293a5f7b63f51a1675bbf3e4b3ceb5c0733a88dd739",
  "6": "009138ff06acbf2e9c96b6e069f3233fa22a252701054ff22cfd2f77961a5fd6",
  "7": "75d5a4ad9da80b0b66544fea2b48a7c0b3566e930697283b8d1a556d1eb4185f",
  "8": "3f51f1d578adbadcaabafb50edc62519ba005a40d7a427c39f894f69558c6b44",
  "9": "1a75c95c798e0059d102f2f98e0081d11c3d0e3006a3b1f50340e3e227e547d0",
  "10": "5f4c8aed1cc565f2248ebfe2d1d94246b1be0b375f062a276cd34826d86bbe6c"
};
const add=(a,b)=>Array.from({length:Math.max(a.length,b.length)},(_,i)=>(a[i]||0)+(b[i]||0));
const scale=(a,n)=>a.map(x=>x*n);
const mul=(a,b)=>{const r=Array(a.length+b.length-1).fill(0);a.forEach((x,i)=>b.forEach((y,j)=>r[i+j]+=x*y));return r;};
const polyEqual=(a,b)=>{while(a.length&&a.at(-1)===0)a.pop();while(b.length&&b.at(-1)===0)b.pop();assert.deepEqual(a,b);};
// Trial divisors provide a second method independent of the displayed Euclid chain.
const gcd=(a,b)=>{for(let d=Math.min(a,b);d>0;d--)if(a%d===0&&b%d===0)return d;};
const chain=(a,b)=>{const rows=[];if(a<b)[a,b]=[b,a];while(b){const q=Math.floor(a/b),r=a%b;rows.push([a,b,q,r]);[a,b]=[b,r];}return rows;};
const displayedDivisions=r=>[...r.steps.map(s=>s.eq||'').join('; ').matchAll(/(\d+) = (\d+) × (\d+) \+ (\d+)/g)].map(m=>m.slice(1).map(Number));
function checkChain(rows){for(const [a,b,q,r] of rows){assert.equal(a,b*q+r);assert.ok(b>0&&r>=0&&r<b);}}

module.exports=({records,mapping},{hashRecord})=>{
 assert.equal(records.length,10);
 const byNumber=new Map(mapping.map(m=>[m.question,records.find(r=>r.id===m.recordId)]));
 const checks=[];
 const checked=(n,method,run)=>{
  const r=byNumber.get(String(n));assert.ok(r,'Missing numbered question '+n);
  assert.deepEqual(mapping.find(m=>m.recordId===r.id).parts,n===6?['i','ii','iii','iv']:['whole'],'Every compulsory subpart must be mapped');
  assert.equal(hashRecord(r),reviewed[n],'Changed lesson requires renewed independent mathematical review: Q'+n);
  run(r);
  checks.push({recordId:r.id,parts:mapping.find(m=>m.recordId===r.id).parts,passed:true,method,recordSha256:hashRecord(r)});
 };
 checked(1,'Euclidean representation and converse; integer quotient domain checked',r=>{
  // n=3k+2 has positive values exactly when integer k>=0, with remainder 2<3.
  assert.equal(3*(-1)+2,-1);assert.equal(3*0+2,2);assert.ok(2>=0&&2<3);
  assert.deepEqual([0,1,2,3].map(k=>3*k+2),[2,5,8,11]);
  assert.match(r.answer.en,/n = 3k \+ 2/);assert.match(r.answer.en,/k = 0, 1, 2/);
  assert.match(r.steps.at(-1).en,/Conversely/);
 });
 checked(2,'Independent integer division, multiplication, and valid remainder bound',r=>{
  const rows=Math.floor(532/21),left=532-rows*21;
  assert.equal(rows,25);assert.equal(left,7);assert.ok(left>=0&&left<21);
  assert.equal(r.answer.en,`${rows} completed rows; ${left} flower pots are left over.`);
  assert.deepEqual(displayedDivisions(r),[[532,21,rows,left]]);
 });
 checked(3,'Exact polynomial coefficients for both exhaustive parity cases; integer factors',r=>{
  // n=2k and n=2k+1 exhaust the residue classes modulo 2, for every integer k.
  polyEqual(mul([0,2],[1,2]),scale(mul([0,1],[1,2]),2));
  polyEqual(mul([1,2],[2,2]),scale(mul([1,2],[1,1]),2));
  assert.equal(r.steps[0].eq,'n = 2k or n = 2k + 1');
  assert.match(r.answer.en,/divisible by 2/);
 });
 checked(4,'Exact coefficients of independent integer quotients and remainder sum modulo 13',r=>{
  assert.equal(9+7+10,26);assert.equal((9+7+10)%13,0);
  assert.deepEqual([9+7+10,13,13,13],[2,1,1,1].map(x=>13*x));
  assert.match(r.answer.en,/13\(p\+q\+r\+2\)/);assert.match(r.steps[0].en,/nonnegative integers/);
 });
 checked(5,'Exact polynomial identities for complete parity classes, including negative integers',r=>{
  polyEqual(mul([0,2],[0,2]),scale([0,0,1],4));
  polyEqual(mul([1,2],[1,2]),add(scale([0,1,1],4),[1]));
  assert.ok(0>=0&&0<4&&1>=0&&1<4);
  assert.match(r.steps[0].en,/negative integer or zero/);
  assert.equal(r.answer.en,'The remainder is 0 for an even integer and 1 for an odd integer.');
 });
 checked(6,'Every rendered Euclidean equality and remainder checked; HCFs recalculated by trial divisors',r=>{
  const pairs=[[340,412],[867,255],[10224,9648],[84,90],[6,120]];
  const expected=pairs.flatMap(([a,b])=>chain(a,b)),actual=displayedDivisions(r);
  assert.deepEqual(actual,expected);checkChain(actual);
  const values=[gcd(340,412),gcd(867,255),gcd(10224,9648),gcd(gcd(84,90),120)];
  assert.deepEqual(values,[4,51,144,6]);
  assert.equal(r.answer.en,values.map((v,i)=>`(${['i','ii','iii','iv'][i]}) ${v}`).join('; ')+'.');
 });
 checked(7,'HCF of adjusted dividends, Euclid chain, maximality argument and original remainder substitutions',r=>{
  const a=1230-12,b=1926-12,d=gcd(a,b);assert.equal(d,174);assert.ok(12<d);
  const actual=displayedDivisions(r),expected=[...chain(a,b),[1230,d,7,12],[1926,d,11,12]];
  assert.deepEqual(actual,expected);checkChain(actual);
  assert.equal(r.answer.en,d+'.');assert.match(r.steps.at(-1).en,/none exceeds their HCF/);
 });
 checked(8,'HCF by trial divisors; rendered Euclid chain and Bezout substitution verified',r=>{
  const d=gcd(32,60),x=2,y=-1;assert.equal(d,4);assert.equal(32*x+60*y,d);
  assert.deepEqual(displayedDivisions(r),chain(32,60));
  assert.equal(r.answer.en,`d = ${d}; one solution is x = ${x}, y = −1.`);
  assert.match(r.steps[2].eq,/2 × 32 − 60/);
 });
 checked(9,'Algebraic decomposition with arbitrary quotient; divisor multiple and remainder bounds',r=>{
  assert.equal(88,11*8);assert.equal(61,11*5+6);assert.ok(6>=0&&6<11);
  // Equality of constant and quotient coefficients proves this for every allowed k.
  assert.deepEqual([61,88],[11*5+6,11*8]);
  assert.equal(r.answer.en,'6.');assert.equal(r.steps.at(-1).eq,'n = 11(8k+5) + 6; 0 ≤ 6 < 11');
 });
 checked(10,'Exact polynomial difference plus common-divisor argument, covering n=1',r=>{
  polyEqual(add([1,1],scale([0,1],-1)),[1]);assert.equal(gcd(1,2),1);
  assert.equal(r.steps[1].eq,'d divides (n+1)−n = 1');
  assert.match(r.steps[2].en,/only positive divisor of 1 is 1/);
  assert.equal(r.answer.en,'Any two consecutive positive integers are coprime because their HCF is 1.');
 });
 return {checks};
};
