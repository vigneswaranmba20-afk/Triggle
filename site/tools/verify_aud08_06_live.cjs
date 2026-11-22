#!/usr/bin/env node
'use strict';
// Read-only, bounded live GitHub Pages verification for independently reviewed Q5/Q6.
const fs=require('node:fs');
const crypto=require('node:crypto');
const assert=require('node:assert/strict');
const p='site/data/textbook-exercises/g10-ch8-ex8-1-q5-q10-en.js';
const content=fs.readFileSync(p,'utf8');
const manifest=JSON.parse(fs.readFileSync('docs/curriculum/grade-10/g10-ch8-ex8-1-q5-q10-20261113.json','utf8'));
const q5=manifest.records.find(x=>x.id==='c10-8-ex8-1-q5');
const q6=manifest.records.find(x=>x.id==='c10-8-ex8-1-q6');
assert(q5&&q6,'Expected source-checked Q5/Q6');
const allMath=[...q5.steps.map(x=>x.math?.latex),q5.answerMath?.latex].filter(Boolean).join('\n');
const currency='\\text{\\char"20B9}';
assert.equal(allMath.split(currency).length-1,6,'Require exactly six corrected rupee symbols in source manifest');
assert(!allMath.includes('\\text{Rs.}'),'No old Q5 math rupee labels');
assert(q6.steps.some(x=>x.en.includes('variance = (n²−1)/12')),'Required variance explanation missing');
const expectedHash=crypto.createHash('sha256').update(content).digest('hex');
const url='https://vigneswaranmba20-afk.github.io/Triggle/site/data/textbook-exercises/g10-ch8-ex8-1-q5-q10-en.js';
const commit='8ca60d0aaaae07011017cb9f321713c141a48ba2';
(async()=>{
 for(let i=0;i<12;i++){
  try{
   const response=await fetch(url+'?audit=aud08-06&commit='+commit+'&attempt='+i,{
    signal:AbortSignal.timeout(13000),headers:{'Cache-Control':'no-cache'}
   });
   if(response.ok){
    const published=await response.text();
    const publishedHash=crypto.createHash('sha256').update(published).digest('hex');
    if(publishedHash===expectedHash&&published===content){
     console.log('PASS AUD08-06 live Q5/Q6: exact published JS matches merged 8ca60d0; six INR labels, variance explanation, zero content discrepancies. SHA256 '+publishedHash);
     return;
    }
    console.log('Live asset mismatch: expected '+expectedHash+' observed '+publishedHash+' attempt '+(i+1)+'/12');
   }else console.log('Live response '+response.status+' attempt '+(i+1)+'/12');
  }catch(e){console.log('Read-only live attempt '+(i+1)+' error: '+String(e.message).slice(0,100));}
  if(i<11)await new Promise(r=>setTimeout(r,5000));
 }
 throw Error('Live Grade 10 Q5/Q6 JS did not match reviewed source after bounded verification');
})().catch(e=>{console.error(e.message);process.exitCode=1;});
