'use strict';
/* Regression checks for Mission AF-09 Batch 3 fixes (AUD03-04, AUD04-01..05, AUD06-04..06, AUD07-06). */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const siteRoot = path.resolve(__dirname, '..');
const readSite = rel => fs.readFileSync(path.join(siteRoot, rel), 'utf8');

// 1. AUD03-04: Ch3 Concept 8 distinguishes rational (perfect square Δ > 0) vs irrational roots
const ch3Ctx = { window: {} };
vm.runInNewContext(readSite('data/g10-ch3-concepts.js'), ch3Ctx);
const discStage = ch3Ctx.window.TRIGGLE_G10_CH3_PATH.stages.find(s => s.id === 'g10-ch3-discriminant');
assert.ok(discStage.example.en.includes('perfect square') && discStage.example.en.includes('irrational'));
assert.ok(discStage.deepDive.points.en.some(p => p.includes('perfect square') && p.includes('irrational')));

// 2. AUD04-01..05: Ch5 Coordinate Geometry fixes
const ch4Css = readSite('assets/g10-ch4-concepts.css');
assert.match(ch4Css, /\.g10ch4-slider-row\[hidden\]\s*\{\s*display:\s*none\s*\}/);
assert.match(ch4Css, /\.g10ch4-slider-top\s*\{[^}]*justify-content:\s*space-between/s);

const ch5Ctx = { window: {} };
vm.runInNewContext(readSite('data/g10-ch5-concepts.js'), ch5Ctx);
const ch5Stages = ch5Ctx.window.TRIGGLE_G10_CH5_PATH.stages;
const slopeStage = ch5Stages.find(s => s.id === 'g10-ch5-inclination-slope');
assert.ok(!slopeStage.question.en.includes('angle'), 'AUD04-04: inclination-slope question stem aligns with slope choices');
assert.ok(!slopeStage.why.en.includes('45°'));

const genStage = ch5Stages.find(s => s.id === 'g10-ch5-general-form');
assert.ok(!genStage.proof.steps[1].title.en.includes('mx + l'), 'AUD04-03: y = mx + l typo must stay fixed');
assert.ok(genStage.why.en.includes('C = 6') && genStage.why.en.includes('c = 6/7'));

const famStage = ch5Stages.find(s => s.id === 'g10-ch5-parallel-perpendicular-general');
assert.ok(!famStage.proof.steps[0].reason.en.includes('even when a or b is 0'), 'AUD04-01: no division by zero claim');
assert.ok(famStage.proof.steps[0].reason.en.includes('without dividing by zero'));

const ch5Ui = readSite('assets/g10-ch5-concepts.js');
assert.ok(ch5Ui.includes('fracTex('), 'AUD04-03: exact fraction formatter used in Ch5 labs');
assert.ok(ch5Ui.includes("'CW (-)'"), 'AUD04-03: ASCII minus keeps CW Area readout in KaTeX');
assert.ok(ch5Ui.includes('Perpendicular (2x+3y+k=0)') && ch5Ui.includes('2x+3y${k>=0'), 'AUD04-01: button template matches live readout');

// 3. AUD06-04..06: Probability filters, Toss 100, n(S)=36, discovery/app/hub readiness & count sync
const probUi = readSite('assets/g9-probability-concepts.js');
assert.ok(probUi.includes('At least one blue') && probUi.includes('Prime numbers') && probUi.includes('Toss 100'));

const probData = readSite('data/g9-probability-chapter.js');
assert.ok(probData.includes('6 × 6 = 36'));

const discUi = readSite('assets/discovery.js');
assert.ok(discUi.includes("id==='g9-ch9'") && discUi.includes("id==='g10-ch2'"));

const hubUi = readSite('assets/chapter-hub.js');
assert.ok(hubUi.includes('stages.length>0&&available.exercises'));
assert.ok(hubUi.includes('Standard Ten Mathematics'));

const appUi = readSite('assets/app.js');
assert.ok(appUi.includes('TriggleChapterHub?.textbookExercises') && appUi.includes("chapter.id==='g9-ch9'"));
assert.ok(!appUi.includes('grade===9&&lang===\'ta\''), 'AUD07-06: English-in-Tamil fallback applies across all grades');

console.log('PASS AF-09 Batch 3 fixes: AUD03-04, AUD04-01..05, AUD06-04..06, and AUD07-06.');
