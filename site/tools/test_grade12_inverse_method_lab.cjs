'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../grade-12/inverse-method-lab.html'),'utf8');
assert.match(html,/supplementary practice calculator/);
assert.match(html,/not a transcription or completed answer/);
assert.match(html,/Tamil human editorial review pending/);
assert.match(html,/printed p\.15\/PDF p\.23/);
assert.match(html,/printed p\.16\/PDF p\.24/);
assert.match(html,/Number\.isSafeInteger/);
assert.match(html,/det===0/);
assert.match(html,/textContent=inverseSteps/);
function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b]}return a||1;}
function f(n,d){if(d<0){n=-n;d=-d;}const g=gcd(n,d);return [n/g,d/g];}
let nonsingular=0,singular=0;
for(let a=-3;a<=3;a++)for(let b=-3;b<=3;b++)for(let c=-3;c<=3;c++)for(let d=-3;d<=3;d++){
 const det=a*d-b*c;
 if(!det){singular++;continue;}
 nonsingular++;
 const adj=[d,-b,-c,a];
 assert.deepEqual([a*adj[0]+b*adj[2],a*adj[1]+b*adj[3],c*adj[0]+d*adj[2],c*adj[1]+d*adj[3]],[det,0,0,det]);
 assert.deepEqual([adj[0]*a+adj[1]*c,adj[0]*b+adj[1]*d,adj[2]*a+adj[3]*c,adj[2]*b+adj[3]*d],[det,0,0,det]);
 for(const v of adj){const [n,den]=f(v,det);assert.equal(n*det,den*v);}
}
assert.equal(nonsingular+singular,2401);
console.log('Grade 12 supplementary inverse lab: '+nonsingular+' nonsingular, '+singular+' singular cases passed');
