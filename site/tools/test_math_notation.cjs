'use strict';
// Grade 9 textbook notation regressions: run with npm test.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const ctx={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'assets/math-notation.js'),'utf8'),ctx,{filename:'math-notation.js'});
const render=ctx.window.TriggleNotation.render;
const cases=[
 ['4^(1/2)','<mfrac>'],
 ['4^(3/2)','<mfrac>'],
 ['64^(−2/3)','<mo>−</mo>'],
 ['a^(m/n)','<msup>'],
 ['a^(−k)','<mo>−</mo>'],
 ['√4','<msqrt>'],
 ['√(k²×2)','<msqrt>'],
 ['³√108','<mroot>'],
 ['⁴√3','<mroot>'],
 ['ⁿ√a','<mroot>'],
 ['∛64','<mroot>'],
 ['(∛64)²','math-group-power'],
 ['[[1|(∛64)²]]','class="frac"'],
 ['[[1|16]]','class="frac"'],
 ['( [[2|3]] )²','math-group-power'],
 ['3.2 × 10^-3','<msup>'],
 ['aᵏ','<sup>k</sup>'],
 ['வேர்க்குறி: ³√108','<mroot>']
];
for(const [source,expected] of cases){
 const result=render(source);
 assert.ok(result.includes(expected),source+' missing '+expected+': '+result);
 assert.ok(!result.includes('\uE000N'),source+' left a notation placeholder');
 assert.ok(!result.includes('undefined'),source+' inserted undefined');
}
const dangerous=render('<img src=x onerror=alert(1)> a^(1/2)');
assert.ok(!dangerous.includes('<img'),'Never trust authored notation source as HTML');
assert.ok(dangerous.includes('&lt;img'),'Escaped source text must remain visible');
const journey=fs.readFileSync(path.join(root,'assets/real-numbers-journey.js'),'utf8');
const stages=fs.readFileSync(path.join(root,'data/real-numbers/g9-ch2-concepts.js'),'utf8');
const css=fs.readFileSync(path.join(root,'assets/app.css'),'utf8');
assert.ok(journey.includes('output.innerHTML=notation(answer)'),'Interactive results must typeset math');
assert.ok(journey.includes('b.innerHTML=notation(caption)'),'Interactive powers must typeset math');
assert.ok(journey.includes("['half','4^(1/2)']"),'A power must never look like the mixed number 4½');
assert.ok(!journey.includes('4½'),'Mixed-number ambiguity must not return');
assert.ok(stages.includes('a^(m/n)=(ⁿ√a)^m'),'Radical rule must retain its correct mathematical meaning');
assert.ok(stages.includes('[[1|(∛64)²]]'),'Worked example must use stacked rational notation');
assert.ok(css.includes('.frac > span:first-child') && css.includes('.frac > span:last-child'),'Nested fraction rules must not spread into nested math');
console.log('PASS: '+cases.length+' math notation cases, safe escaping, bilingual lesson integration, nested fraction styling');
