'use strict';
// Independent arithmetic checks for TN Grade 10 Exercise 2.2 Q1–Q9.
// Source wording and edition evidence: ex2-2-source-image-and-math-audit-2026-11-10.json.
// This script is NOT a curriculum_bulk batch verifier and does not certify registration.
const assert = require('node:assert/strict');
const gcd=(a,b)=>b?gcd(b,a%b):a;
const lcm=(a,b)=>a/gcd(a,b)*b;
const tests=[];
function check(id,fn){fn();tests.push(id);}
check('Q1',()=>{for(let n=1;n<=100;n++)assert.equal(Number((4n**BigInt(n))%10n),n%2===0?6:4);});
check('Q2',()=>{for(let n=1;n<=12;n++)for(let m=1;m<=12;m++)assert.equal(Number((2n**BigInt(n)*5n**BigInt(m))%10n),0);});
check('Q3',()=>{assert.equal(gcd(252525,363636),10101);assert.equal(gcd(25,36),1);});
check('Q4',()=>{assert.equal(2**9*3**3,13824);});
check('Q5',()=>{assert.equal(2**3*3**4*5**2*7,113400);});
check('Q6',()=>{assert.equal(gcd(408,170),34);assert.equal(lcm(408,170),2040);assert.equal(gcd(408,170)*lcm(408,170),408*170);});
check('Q7',()=>{const d=lcm(lcm(24,15),36);assert.equal(d,360);const candidate=Math.floor(999999/d)*d;assert.equal(candidate,999720);assert.ok(candidate<=999999&&candidate+d>999999);});
check('Q8',()=>{const d=lcm(lcm(35,56),91);assert.equal(d,3640);for(const divisor of [35,56,91]){assert.equal(3647%divisor,7);assert.equal(7%divisor,7);}assert.equal(d+7,3647); // Literal minimum is 7; 3647 assumes a nontrivial quotient.
});
check('Q9',()=>{const d=Array.from({length:10},(_,i)=>i+1).reduce(lcm,1);assert.equal(d,2520);for(let n=1;n<=10;n++)assert.equal(d%n,0);});
if(require.main===module)console.log(JSON.stringify({exercise:'2.2',checked:tests.length,questionIds:tests,passed:true,q8EditorialCaveat:'Literal minimum 7; intended nontrivial answer 3647'}));
module.exports={run:()=>({checked:tests.length,questionIds:tests,passed:true})};
