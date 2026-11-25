'use strict';

const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const katex=require('../assets/vendor/katex/katex.min.js');
const {load}=require('./build_g9_math.cjs');
const {applyReviewedRealNumbers}=require('./test_g9_ch2_frontier.cjs');
const site=path.join(__dirname,'..');
const plain=value=>Array.isArray(value)?value.map(plain).join(''):value?.fallback??value;
const read=name=>fs.readFileSync(path.join(site,name),'utf8');
const latex=value=>{
  if(Array.isArray(value))value.forEach(latex);
  else if(value?.latex)katex.renderToString(value.latex,{throwOnError:true,strict:'error'});
};
function applyReviewedAlgebra(items){
  const context={window:{TRIGGLE_CLASSES:{9:{items:[]}}}};
  vm.runInNewContext(read('data/textbook-exercises/g9-ch3-ex3-1-ex3-2-ta.js'),context);
  context.window.TriggleG9AlgebraTamilAnswers(items);
  return items;
}
function verify(){
  const items=applyReviewedAlgebra(applyReviewedRealNumbers(load()));
  const localized=items.filter(q=>q.chapter==='2'&&q.exercise!=='2.9'&&q.answerTa);
  assert.equal(localized.length,20);
  for(const item of localized)for(const s of item.steps){
    const visible=plain(s.mathTa??s.eq);
    assert.doesNotMatch(visible,/\b(?:approximately|Recurring|period|Terminating|Yes|No|numerator|pure surd|or)\b/i,item.id);
    latex(s.mathTa);
  }
  const area=items.find(q=>q.id==='g9-ch3-ex3.1-q11');
  const product=items.find(q=>q.id==='g9-ch3-ex3.1-q12');
  assert.match(area.answerTa,/9x² − 4 சதுர அலகுகள்/);
  assert.match(area.answerTa,/3596 சதுர அலகுகள்/);
  assert.match(product.answerTa,/மூன்றாம் படி/);
  assert.equal(plain(area.answerMath.ta),area.answerTa);
  assert.equal(plain(product.answerMath.ta),product.answerTa);
  latex(area.answerMath.ta);
  latex(area.steps[3].mathTa);
  for(const x of [1,2,20])assert.equal((3*x+2)*(3*x-2),9*x*x-4);
  for(const a of [-3,1,5])for(const c of [-4,-1,4]){
    const p=[-2,a],q=[9,8,c],out=[0,0,0,0];
    for(const [i,coef] of p.entries())for(const [j,factor] of q.entries())out[i+j]+=coef*factor;
    assert.equal(out[3],a*c);
    assert.notEqual(out[3],0);
  }
  console.log('PASS Grade 9 Tamil equations across 20 Real Numbers tasks and two bilingual Algebra conclusions');
}
if(require.main===module)verify();
module.exports={applyReviewedAlgebra,verify};
