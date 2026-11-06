'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname,'..');
const ctx={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'assets/math-notation.js'),'utf8'),ctx,{filename:'math-notation.js'});
const render=ctx.window.TriggleNotation.render;
for(const [source,expected] of [
 ['[x+1]²','<span class="math-bracket">]</span></span><sup>2</sup>'],
 ['(x+1)^2','<span class="math-bracket">)</span></span><sup>2</sup>'],
 ['{a+b}³','<span class="math-bracket">}</span></span><sup>3</sup>'],
 ['([x+1])²','<span class="math-bracket">)</span></span><sup>2</sup>'],
 ['( [[1|2]] )²','<span class="math-bracket">)</span></span><sup>2</sup>'],
 ['x²','x<sup>2</sup>'],
 ['[[3|4]]','<span class="frac">']
]) {
 const actual=render(source);
 assert(actual.includes(expected),'Incorrect bracket/power rendering: '+source+' '+actual);
}
const raw=render('<img src=x onerror=alert(1)> [a]²');
assert(!raw.includes('<img'),'Untrusted mathematics must never become HTML');
assert(raw.includes('&lt;img'),'Escaped mathematical source text remains visible');
assert(render('( [[1|2]] )²').includes('class="frac"'),'A squared bracketed fraction must preserve its fraction bar');
const labScript=fs.readFileSync(path.join(root,'assets/phase2-lab.js'),'utf8');
assert(labScript.includes("chapter?.id !== 'g9-ch1'"),'First laboratory must only appear for its intended pilot chapter');
assert(labScript.includes('Try again tomorrow') && labScript.includes('நாளையும் முயலுங்கள்'),'Paper-based recall must exist in both languages');
assert(labScript.includes("t.notes[revealed++]"),'Medium difficulty steps must reveal one by one');
assert(!/https?:\/\/|fetch\(/.test(labScript),'Pilot should not call any network service');
console.log('PASS: safe superscripts, group brackets, fractions, bilingual paper-first learning and offline pilot');
