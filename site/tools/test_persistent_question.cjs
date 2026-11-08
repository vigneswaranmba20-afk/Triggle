'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const js = fs.readFileSync(path.join(root, 'assets/app.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'assets/app.css'), 'utf8');

const dock = html.indexOf('id="deepQuestionDock"');
const question = html.indexOf('id="guidedQuestion"');
const scroller = html.indexOf('id="guidedScroll"');
const stages = html.indexOf('id="guidedSteps"');
assert(dock >= 0 && dock < question && question < scroller && scroller < stages,
  'The full question must be outside and before the independently scrolling stage');
assert.equal((html.match(/id="guidedQuestion"/g) || []).length, 1,
  'There must be exactly one question body');
assert.match(html, /class="deep-question-dock"[^>]*aria-labelledby="deepPinnedQuestionLabel"/,
  'The permanent question reference must have an accessible label');
assert(!html.includes('id="deepQuestionContext"'),
  'The question must not be hidden inside an expandable disclosure');
assert(!js.includes("$('deepQuestionContext')"),
  'Stage changes must not collapse or hide the question');
assert.match(js, /\$\('guidedQuestion'\)\.innerHTML=window\.TriggleWorkedDisplay\?\.get\(current,lang\)\?\.pinnedQuestion\|\|math\(tr\(current\.q\)\)/,
  'The pinned question must show the complete authored question or the unchanged textbook question');
assert.match(js, /\$\('guidedScroll'\)\.scrollTop=0/,
  'Each learning stage must start at its own top');
assert.match(css, /\.deep-question-dock\s*\{[^}]*max-height:/,
  'Long questions must not squeeze the whole explanation off-screen');
assert.match(css, /\.deep-question-dock\s*\{[^}]*overflow-y:auto/,
  'Long questions must scroll independently');
assert.match(css, /\.deep-shell \.guided-scroll\s*\{[^}]*overflow-y:auto/,
  'The full worked solution must still be scrollable');
console.log('PASS persistent question, mobile scroll separation and stage navigation');
