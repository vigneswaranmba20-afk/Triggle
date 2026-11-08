'use strict';
// Independent rationalisation identities and bilingual lesson structure.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'data/real-numbers/g9-ch2-concepts.js'),'utf8'),context);
const stages=context.window.TRIGGLE_REAL_PATH.stages;
const stage=stages.find(x=>x.id==='real6');
assert.ok(stage,'Rationalisation lesson remains accessible');
assert.equal(stage.correct,0,'Simplifying 1/√5 gives the first quiz option');
for(const medium of ['en','ta']){
 for(const key of ['title','idea','example','question','hint','why'])assert.ok(stage[key]?.[medium],medium+' '+key+' missing');
 assert.ok(stage.idea[medium].length>60,medium+' concept explanation must be helpful');
 assert.ok(stage.question[medium].includes('[[1|√5]]'),medium+' question must typeset stacked fraction');
 assert.ok(stage.choices[0][medium].includes('[[√5|5]]'),medium+' answer must typeset stacked fraction');
 assert.ok(stage.why[medium].includes('[[√5|5]]'),medium+' explanation must show the actual fraction');
}
for(const [rad,num] of [[5,1],[7,3]]){
 const sqrt=Math.sqrt(rad);
 const original=num/(sqrt+2);
 const conjugate=sqrt-2;
 assert.ok(Math.abs((sqrt+2)*(sqrt-2)-(rad-4))<1e-12,'Denominator identity for '+rad);
 assert.ok(Math.abs(original-conjugate)<1e-12,'Rationalisation answer for '+rad);
 assert.equal(rad-4,num,'Conjugate cancellation for '+rad);
}
const script=fs.readFileSync(path.join(root,'assets/real-numbers-journey.js'),'utf8');
const css=fs.readFileSync(path.join(root,'assets/app.css'),'utf8');
assert.ok(script.includes("function rationalDemo(mode)"),'Dedicated authored explanation must exist');
assert.ok(script.includes("const steps=["),'Teaching must be authored as separate steps');
assert.ok(script.includes("class=\"rnlab-rational-step\""),'Each reasoning step needs its own card');
assert.ok(script.includes("'<mfrac>'")||script.includes("tag('mfrac'"),'True MathML fraction bars must be used');
assert.ok(script.includes("['seven',{html:math(fraction(mn(3),pair(7,'+'))"),'The second example must use 3/(√7+2)');
assert.ok(!script.includes("num+'/(√'+a"),'Old cramped inline expression must be removed');
assert.ok(css.includes('.rnlab-rational-step{'),'Scoped mobile teaching card styling required');
assert.ok(script.includes('displayMath=(body,label)=>math(body,label,true)'),'True display-style MathML must be available');
assert.ok(script.includes('rnlab-equation-flow'),'Long equations must wrap into centred mobile-friendly parts');
assert.ok(script.includes('rnlab-chatgpt-math'),'The editorial layout must be scoped to the rationalisation activity');
assert.ok(script.includes('triggle-display-equation'),'The common display-equation layout must be reusable');
assert.ok(script.includes('const displayed=i===1?equationFlow'),'Conjugate multiplication must use readable maths layout');
assert.ok(script.includes("i===3?equationFlow("),'The last equality must also be readable on narrow phones');
assert.ok(css.includes('.rnlab .triggle-display-equation .rnlab-rational-math'),'Large display maths styles must exist');
assert.ok(css.includes('math-style:normal'),'Fractions must use natural display-style numerator and denominator');
assert.ok(css.includes('flex-wrap:wrap'),'Long formula sequences must wrap instead of shrinking');

console.log('PASS: textbook-style rationalisation, four-stage teaching, Tamil/English content and both exact identities');
