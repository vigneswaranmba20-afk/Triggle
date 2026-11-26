'use strict';

const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const katex=require('../assets/vendor/katex/katex.min.js');
const read=name=>fs.readFileSync(path.resolve(__dirname,'..',name),'utf8');

function loadHints(){
  const context={window:{}};
  for(const [ ,file] of read('index.html').matchAll(/<script src="\.\/(data\/[^?"]+)[^"]*"/g)) {
    vm.runInNewContext(read(file),context,{filename:file});
  }
  const w=context.window;
  w.TriggleG10NumbersTamil(w.TRIGGLE_CLASSES[10].items);
  w.TriggleG10FrontierTamilAnswers(w.TRIGGLE_CLASSES[10].items);
  return w;
}

function check(){
  const w=loadHints();
  const hints=Object.entries(w.TriggleG10FrontierHints).filter(([id])=>id.startsWith('c10-2-'));
  assert.equal(hints.length,123);
  const get=id=>w.TRIGGLE_CLASSES[10].items.find(q=>q.id===id);
  for(const [id,hint] of hints) {
    const item=get(id);
    assert.equal(String(item.chapter),'2');
    assert(item.steps[hint.step].en.includes(hint.expected),id);
    assert(item.steps[hint.step].ta,id+' original Tamil reasoning');
    assert.notEqual(hint.en,item.steps[hint.step].en);
    assert.match(hint.ta,/\p{Script=Tamil}/u);
  }
  assert(read('service-worker.js').includes('./data/g10-frontier-numbers-hints.js'));

  for(const suffix of ['i','ii']) {
    const step=get('c10-2-ex2-8-q1-'+suffix).steps[0];
    assert.match(step.en,/r ≠ 1/);
    assert.match(step.ta,/பொதுவிகிதம் 1 அல்ல/);
    assert(step.math.latex.includes('\\ne1'));
    katex.renderToString(step.math.latex,{throwOnError:true,strict:'error'});
  }
  for(const n of [1n,2n,5n,8n])for(const [a,p,q] of [[5n,-3n,5n],[256n,1n,4n],[11n,3n,1n],[3n,-2n,1n]]) {
    let scaledSum=0n;
    for(let k=0n;k<n;k++)scaledSum+=a*p**k*q**(n-1n-k);
    assert.equal(scaledSum*(q-p),a*(q**n-p**n));
  }
  const power=get('c10-2-ex2-7-q12');
  assert.match(power.answer,/x, y, z > 0/);
  assert.match(power.answerTa,/நேர்ம எண்களாக இருக்கும்போது/);
  for(const [x,r,d] of [[2,3,-0.5],[7,0.25,0.4],[2,1,-3],[5,2,0]]) {
    const y=x*r,z=x*r*r;
    assert(Math.abs(x**-d*y**(2*d)*z**-d-1)<1e-12);
  }
  assert(Number.isNaN((-1)**(-0.5)),'A constant negative geometric progression need not support fractional exponents');

  const difference=get('c10-2-ex2-8-q10');
  assert.match(difference.steps.at(-1).en,/x ≠ 1 and y ≠ 1/);
  assert.match(difference.steps.at(-1).ta,/பகுதி பூச்சியமாகும்/);
  const sum=(term,n)=>Array.from({length:n},(_,i)=>term(i)).reduce((a,b)=>a+b,0);
  for(const [x,y] of [[2,3],[1,2],[3,1],[1,1],[-1,3]])for(const n of [1,3,5]) {
    const left=(x-y)*sum(i=>sum(j=>x**(i+1-j)*y**j,i+2),n);
    const geometric=r=>r===1?n:r*r*(r**n-1)/(r-1);
    assert.equal(left,geometric(x)-geometric(y));
  }
  console.log('Grade 10 Numbers and Sequences: 123 source-matched bilingual why-step explanations and independently verified finite sum and power conditions.');
}

if(require.main===module)check();
module.exports={loadHints};
