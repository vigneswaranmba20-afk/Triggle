'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {build}=require('./build_project_status.cjs'),model=require('../assets/project-model.js');
const manifest=build(),saved=require('../data/project-status.json');
// A committed snapshot cannot contain its own commit SHA: committing that SHA creates
// a different commit. Compare all source-derived curriculum data strictly, but validate
// provenance metadata separately rather than requiring a self-referential SHA.
const {sourceCommit:generatedCommit,updatedAt:generatedAt,...generatedData}=manifest;
const {sourceCommit:snapshotCommit,updatedAt:snapshotAt,...snapshotData}=saved;
assert.deepEqual(generatedData,snapshotData,'Regenerate source-derived curriculum data before release');
for(const [label,sha] of [['generated',generatedCommit],['snapshot',snapshotCommit]])
  assert.match(sha,/^[a-f0-9]{40}$/,'Invalid '+label+' provenance SHA');
for(const [label,stamp] of [['generated',generatedAt],['snapshot',snapshotAt]])
  assert(Number.isFinite(Date.parse(stamp)),'Invalid '+label+' provenance timestamp');
// The snapshot is allowed to lag the head commit, but must never be future-dated.
assert(Date.parse(snapshotAt)<=Date.now()+60000,'Snapshot provenance timestamp is in the future');
assert.deepEqual(manifest.grades.map(g=>g.totalChapters),[9,8,12,12]);
for(const g of manifest.grades){assert.equal(g.completedEnglishChapters+g.partialChapters+g.pendingChapters,g.totalChapters);assert.equal(g.coveragePercent,null);assert.equal(g.wholeGradeTaskDenominator,null);}
const twelveExercises=manifest.grades.find(g=>g.grade===12).chapters[0].exercises;
const ex11=twelveExercises.find(e=>e.id==='1.1');
// A changed module awaits a new live hash verification; retain all 21 source-verified tasks.
assert.equal(ex11.verifiedTasks,21);
assert.equal(manifest.summary.verifiedDeployedTasks,manifest.grades.flatMap(g=>g.chapters).flatMap(c=>c.exercises).filter(e=>e.stages.deployed).reduce((n,e)=>n+e.verifiedTasks,0));assert.equal(manifest.summary.knownRemainingTasks,53);
if(!ex11.stages.deployed)assert.equal(ex11.status,'Awaiting verification');
const twelve=manifest.grades.find(g=>g.grade===12).chapters[0];assert.equal(twelve.totalTasks,95);assert.equal(twelve.verifiedTasks,42);assert.equal(twelve.missingTasks,53);
const task=manifest.actions[0];assert.equal(task.grade,12);assert.equal(task.exercise,'1.4');assert.equal(task.startingQuestion,'Q1(i)');assert.deepEqual(task.scope,['Q1(i)','Q1(ii)','Q1(iii)','Q1(iv)','Q2','Q3','Q4','Q5']);
assert.equal(task.questionIds.length,0,'Do not invent stable IDs for unauthored questions');
assert(!manifest.actions.some(t=>t.grade===10&&t.chapter==='1'),'Accepted reference must not be regenerated');
assert.equal(model.filter(manifest.actions,{grade:12,exercise:'1.4'}).length,1);
assert.equal(model.filter(manifest.actions,{search:'not-an-existing-task'}).length,0);
const prompt=model.prompt(task);for(const token of ['vigneswaranmba20-afk/Triggle','Exercise 1.4','Q1(i)','Q1(iv)','exact textbook wording','English AND Tamil','Independently solve','green-highlighted final answer','npm test','npm run test:browser','GitHub Pages','checkpoint','No authored IDs','recurring automation'])assert(prompt.includes(token),'Prompt missing '+token);
assert.equal(model.deployment({status:'building',commit:'a'.repeat(40),updated_at:new Date().toISOString()}),null);
assert.equal(model.deployment({status:'built',commit:'merged',updated_at:new Date().toISOString()}),null);
const snapshot=require('../data/deployment-status.json');assert.match(snapshot.pages.commit,/^[a-f0-9]{40}$/);assert.equal(snapshot.liveVerification.commit,snapshot.pages.commit);
for(const p of ['site/data/project-status.json','site/data/deployment-status.json']){const text=fs.readFileSync(path.join(__dirname,'../..',p),'utf8');assert(!/AIza|private_key|reviewerUid|recordSha256.*note|teacherReviewEvents|teacherAccess|@gmail\.com/.test(text),'Private config/teacher data leaked into '+p);}
assert(!fs.existsSync(path.join(__dirname,'../assets/dashboard.js')),'Removed dashboard script must not return');
for(const p of ['project-model.js']){const text=fs.readFileSync(path.join(__dirname,'../assets',p),'utf8');assert(!/firebase|firestore|teacherReviewEvents|teacherAccess|localStorage/i.test(text),'Public dashboard must have no private service access');}
console.log('PASS project status: source-derived totals, unknown denominators, exact next task, prompt scope, deployment distinction, public/private separation.');
