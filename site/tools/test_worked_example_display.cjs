'use strict';
// Book-aligned visual regression: Example 2.12 is the first rich worked example.
// Checks mathematical identities independently, authored markup, and fallback scope.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const site=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(site,p),'utf8');
const context={window:{}};
vm.runInNewContext(read('assets/worked-example-display.js'),context,{filename:'worked-example-display.js'});
const get=context.window.TriggleWorkedDisplay.get;
const item={id:'g9-ch2-example-12'};
for(const lang of ['en','ta']){
 const v=get(item,lang);
 assert.ok(v,lang+' view missing');
 assert.equal((v.question.match(/class="twd-question-part"/g)||[]).length,4,lang+' four separate question parts');
 assert.equal((v.steps.match(/class="worked-step twd-worked-step"/g)||[]).length,4,lang+' four authored parts with reasoning');
 assert.equal((v.answer.match(/class="twd-final-row"/g)||[]).length,4,lang+' four scan-friendly answers');
 assert.equal((v.steps.match(/data-variable="x"/g)||[]).length,4,lang+' x solved separately');
 assert.equal((v.steps.match(/data-variable="y"/g)||[]).length,4,lang+' y solved separately');
 assert.equal((v.answer.match(/class="twd-final-value"/g)||[]).length,8,lang+' eight final values');
 assert.ok(v.question.includes('display="block"'),lang+' correct display-style MathML for given values');
 assert.ok(v.steps.includes('<msqrt>')&&v.steps.includes('<mfrac>'),lang+' roots and stacked fractions are genuine MathML');
 assert.ok(!v.question.includes('src=')&&!v.answer.includes('onclick='),lang+' presentation uses controlled markup only');
 assert.ok(v.question.indexOf('data-worked-part="i"')<v.question.indexOf('data-worked-part="iv"'),'textbook order preserved');
 assert.ok(v.steps.includes('twd-rational')&&v.steps.includes('twd-irrational'),lang+' classify both rational and irrational values');
 if(lang==='ta'){
  assert.match(v.question,/விகிதமுறு/);
  assert.match(v.steps,/விகிதமுறா/);
 }else{
  assert.match(v.steps,/Rational/);
  assert.match(v.steps,/Irrational/);
 }
}
assert.equal(get({id:'g9-ch2-example-11'},'en'),null,'Other examples must retain their established layout');
assert.equal(get({id:'g9-ch2-ex3-q1'},'en'),null,'Exercises must not be transformed');
assert.equal(get(null,'ta'),null,'Absent item must not throw');

// Independent arithmetic checks, against the four textbook definitions.
const a=[
 {a:2+Math.sqrt(3),b:2-Math.sqrt(3),x:4,y:2*Math.sqrt(3),type:[true,false],kind:'sum'},
 {a:Math.sqrt(2)+7,b:Math.sqrt(2)-7,x:2*Math.sqrt(2),y:14,type:[false,true],kind:'sum'},
 {a:Math.sqrt(75),b:Math.sqrt(3),x:15,y:5,type:[true,true],kind:'product'},
 {a:Math.sqrt(18),b:Math.sqrt(3),x:3*Math.sqrt(6),y:Math.sqrt(6),type:[false,false],kind:'product'}
];
for(const [i,t] of a.entries()){
 const x=t.kind==='sum'?t.a+t.b:t.a*t.b;
 const y=t.kind==='sum'?t.a-t.b:t.a/t.b;
 assert.ok(Math.abs(x-t.x)<1e-10,'Part '+(i+1)+' incorrect x');
 assert.ok(Math.abs(y-t.y)<1e-10,'Part '+(i+1)+' incorrect y');
}
const html=read('index.html'),sw=read('service-worker.js'),app=read('assets/app.js'),css=read('assets/app.css');
assert.ok(html.indexOf('assets/worked-example-display.js')<html.indexOf('assets/app.js'),'Display module loads before main app');
assert.ok(sw.includes('./assets/worked-example-display.js'),'Display module available when offline');
assert.ok(app.includes("window.TriggleWorkedDisplay?.get(current,lang)"),'Main app invokes authored display via shared hook');
assert.ok(app.includes("if(authored){")&&app.includes("'twd-lesson'"),'Authored layout only when supported');
assert.ok(css.includes('.twd-question-parts')&&css.includes('.twd-derivations')&&css.includes('.twd-final-values'),'Spacing classes exist');
console.log('PASS: rich bilingual Worked Example 2.12, 4 parts, 8 conclusions, offline hook and independent identities');
