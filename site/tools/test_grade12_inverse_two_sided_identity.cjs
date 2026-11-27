'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../grade-12/inverse-method-lab.html'),'utf8');
assert.match(html,/Check: A × adj\(A\)/);
assert.match(html,/Check: adj\(A\) × A/);
assert.match(html,/A × A⁻¹ = A⁻¹ × A = I₂/);
assert.match(html,/எனவே A × A⁻¹/);
assert.match(html,/supplementary practice calculator/);
assert.match(html,/Tamil human editorial review pending/);
function multiply(A,B){return [A[0]*B[0]+A[1]*B[2],A[0]*B[1]+A[1]*B[3],A[2]*B[0]+A[3]*B[2],A[2]*B[1]+A[3]*B[3]];}
let tested=0,singular=0,invertible=0;
for(let a=-3;a<=3;a++)for(let b=-3;b<=3;b++)for(let c=-3;c<=3;c++)for(let d=-3;d<=3;d++){
 const A=[a,b,c,d],adj=[d,-b,-c,a],det=a*d-b*c,expected=[det,0,0,det];
 assert.deepEqual(multiply(A,adj),expected,`Aadj ${A}`);
 assert.deepEqual(multiply(adj,A),expected,`adjA ${A}`);
 if(det===0)singular++;else invertible++;
 tested++;
}
assert.equal(tested,2401);assert.equal(singular,289);assert.equal(invertible,2112);
console.log(`Grade 12 two-sided inverse identity verified for ${tested} matrices (${invertible} invertible; ${singular} singular).`);
