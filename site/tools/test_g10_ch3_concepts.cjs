'use strict';
/* Independent schema, KaTeX, bilingual honesty, and mathematical verification for Grade 10 Ch3 Algebra Concepts. */
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const katex=require('../assets/vendor/katex/katex.min.js');
const {loadRuntime}=require('./curriculum_bulk.cjs');

const ROOT=path.resolve(__dirname,'../..');
const site=path.join(ROOT,'site');
const read=p=>fs.readFileSync(path.join(site,p),'utf8');

function checkTex(label,latex){
  assert(typeof latex==='string'&&latex.trim().length>0,'Missing LaTeX for '+label);
  const html=katex.renderToString(latex,{displayMode:true,output:'htmlAndMathml',throwOnError:true,trust:false,strict:'error',maxExpand:200,maxSize:20});
  assert(!html.includes('mathcolor="#cc0000"'),'Restricted KaTeX command in '+label+': '+latex);
}

const ctx={window:{}};
vm.runInNewContext(read('data/g10-ch3-concepts.js'),ctx,{filename:'g10-ch3-concepts.js',timeout:5000});
vm.runInNewContext(read('assets/g10-ch3-concepts.js'),ctx,{filename:'g10-ch3-concepts.js',timeout:5000});

const pathData=ctx.window.TRIGGLE_G10_CH3_PATH;
const labs=ctx.window.TriggleG10Ch3Labs;
assert(pathData&&Array.isArray(pathData.stages),'Missing TRIGGLE_G10_CH3_PATH.stages');
assert.equal(pathData.chapterId,'g10-ch3');
assert.equal(pathData.tamilStatus,'draft, editorial review pending','Tamil editorial status must remain honest');
assert.equal(pathData.stages.length,14,'All 14 textbook-ordered Chapter 3 concepts must be authored');

const expectedIds=[
  'g10-ch3-linear-3vars','g10-ch3-poly-gcd','g10-ch3-poly-lcm-law','g10-ch3-rational-excluded',
  'g10-ch3-rational-ops','g10-ch3-poly-sqrt','g10-ch3-quad-form','g10-ch3-quad-solve',
  'g10-ch3-discriminant','g10-ch3-roots-coeff','g10-ch3-variations','g10-ch3-quad-graphs',
  'g10-ch3-matrix-types','g10-ch3-matrix-ops'
];
assert.deepEqual([...pathData.stages.map(s=>s.id)],expectedIds,'Preserve exact textbook order of all 14 concepts');

const correctCounts=[0,0,0];
const visualIds=new Set();
for(const stage of pathData.stages){
  assert(stage.math?.latex&&stage.math?.fallback,stage.id+' needs structured rule math');
  checkTex(stage.id+'.math',stage.math.latex);
  if(stage.exampleMath){assert(stage.exampleMath.fallback);checkTex(stage.id+'.exampleMath',stage.exampleMath.latex);}
  if(stage.questionMath){assert(stage.questionMath.fallback);checkTex(stage.id+'.questionMath',stage.questionMath.latex);}
  if(stage.whyMath){assert(stage.whyMath.fallback);checkTex(stage.id+'.whyMath',stage.whyMath.latex);}
  for(const lang of ['en','ta']){
    for(const field of ['title','rule','idea','example','question','hint','why']){
      assert(stage[field]?.[lang]?.trim(),'Missing '+stage.id+'.'+field+'.'+lang);
    }
    assert(Array.isArray(stage.deepDive?.points?.[lang])&&stage.deepDive.points[lang].length>=2,'Missing deepDive points for '+stage.id+'.'+lang);
  }
  assert.equal(stage.visual?.kind,'ch3-lab',stage.id+' must use ch3-lab');
  visualIds.add(stage.visual.id);
  assert.equal(stage.explainAfterAttempt,true,stage.id+' explainAfterAttempt');
  assert.equal(stage.choices.length,3,stage.id+' 3 choices');
  assert([0,1,2].includes(stage.correct),stage.id+' valid correct index');
  correctCounts[stage.correct]++;
  assert.equal(stage.incorrectFeedback.length,3,stage.id+' aligned incorrectFeedback array');
  stage.choices.forEach((ch,idx)=>{
    assert(ch.en?.trim()&&ch.ta?.trim(),stage.id+' choice '+idx+' bilingual');
    if(ch.math){assert(ch.math.fallback);checkTex(stage.id+'.choice'+idx,ch.math.latex);}
    if(idx===stage.correct)assert.equal(stage.incorrectFeedback[idx],null,stage.id+' null feedback at correct index');
    else assert(stage.incorrectFeedback[idx]?.en?.trim()&&stage.incorrectFeedback[idx]?.ta?.trim(),stage.id+' distractor feedback '+idx);
  });
}
assert.equal(visualIds.size,14,'All 14 concepts have distinct purposeful interactive lab IDs');
assert.deepEqual(correctCounts,[4,5,5],'Correct answers remain balanced across options 0, 1, 2');

/* Verify every linked textbook exercise ID exists in loaded Class 10 data */
const runtime=loadRuntime();
const g10Ids=new Set(runtime.classes[10].items.map(i=>i.id));
const linked=[...pathData.stages.flatMap(s=>[s.practiceId,s.secondaryPracticeId,s.tertiaryPracticeId].filter(Boolean))];
assert.deepEqual(linked,[
  'c10-3-ex3-1-q1-i','c10-3-ex3-2-q1-i','c10-3-ex3-3-q2-i',
  'c10-3-ex3-4-q1-i','c10-3-ex3-5-q1-i','c10-3-ex3-6-q1-i',
  'c10-3-ex3-7-q1-i','c10-3-ex3-8-q1-i','c10-3-ex3-9-q1-i',
  'c10-3-ex3-10-q1-i','c10-3-ex3-11-q1-i','c10-3-ex3-12-q1',
  'c10-3-ex3-13-q1-i','c10-3-ex3-14-q1-i'
]);
for(const id of linked)assert(g10Ids.has(id),'Linked exercise ID missing: '+id);

/* Independent mathematical verification across all 14 concepts */
assert.deepEqual([...labs.math.solve3VarDemo(2,-1,4)],[5,9,16],'Concept 1: 3-var demo point');
assert.equal((5+7+6)/2,9,'Concept 1 transfer: x+y+z=9');

// Concept 2: polynomial GCD verification: (2x^3 - 3x^2 + 3x - 1) - 2(x^3 + x^2 - x + 2) = -5(x^2 - x + 1)
for(const x of [-3,-1,0,2,5]){
  const f=2*x**3-3*x**2+3*x-1, g=x**3+x**2-x+2, rem=-5*(x**2-x+1);
  assert.equal(f-2*g,rem);
  assert.equal(g-(x+2)*(x**2-x+1),0);
}

// Concept 3: 12(x-2)^2(x+3) * 18(x-2)(x+3)^3 === 6(x-2)(x+3) * 36(x-2)^2(x+3)^3
for(const x of [-4,0,1,4]){
  const f=12*(x-2)**2*(x+3), g=18*(x-2)*(x+3)**3;
  const gcd=6*(x-2)*(x+3), lcm=36*(x-2)**2*(x+3)**3;
  assert.equal(f*g,lcm*gcd);
}

// Concept 4: rational demo & excluded value
assert.equal(labs.math.evalRationalDemo(1).reducedValue,-2/3);
assert.equal(labs.math.evalRationalDemo(3).reducedValue,0);
assert.equal(labs.math.evalRationalDemo(-2).reducedValue,null);
assert.equal(labs.math.evalRationalDemo(-3).originalDefined,false);

// Concept 5: 2x/(x-3) - (x-5)/(x-3) === (x+5)/(x-3)
for(const x of [-2,0,1,5])assert(Math.abs((2*x/(x-3)-(x-5)/(x-3))-(x+5)/(x-3))<1e-12);

// Concept 6: polynomial square root division coefficients
assert.deepEqual([...labs.math.polySqrtDivSteps()],[9,-12,10,-4,1]);

// Concept 7: roots (-3,4) & transfer roots (-2,5)
assert.equal(labs.math.quadFromRoots(-3,4).evalAt(-3),0);
assert.equal(labs.math.quadFromRoots(-3,4).evalAt(4),0);
assert.equal(labs.math.quadFromRoots(-2,5).sum,3);
assert.equal(labs.math.quadFromRoots(-2,5).product,-10);

// Concept 8: completing square on x^2 + 6x - 7 = 0 and transfer x^2 - 8x + 3 = 0
for(const r of [1,-7])assert.equal(r*r+6*r-7,0);
assert.equal((-8/2)**2,16);

// Concept 9: discriminant
assert.equal(labs.math.discriminantC(3),4);
assert.equal(labs.math.discriminantC(4),0);
assert.equal(labs.math.discriminantC(5),-4);
assert.equal((-6)**2-4*2*5,-4);

// Concept 10: symmetric root identities
const rc=labs.math.rootsCoeff5x6();
assert.equal(rc.sumSq.byId,rc.sumSq.byRoots);
assert.equal(rc.diffSq.byId,rc.diffSq.byRoots);
assert(Math.abs(rc.recipSum.byId-rc.recipSum.byRoots)<1e-12);
assert.equal(rc.sumCube.byId,rc.sumCube.byRoots);
assert.equal(7*7-2*10,29);

// Concept 11: direct & inverse variations
assert.equal(labs.math.variationPoint('direct',4).y,8);
assert.equal(labs.math.variationPoint('inverse',4).y,3);
assert.equal((4*6)/3,8);

// Concept 12: parabola intersections
for(const r of [-1,2])assert.equal(r*r,r+2);
for(const r of [2,3])assert.equal(r*r,5*r-6);

// Concept 13 & 14: matrix operations & AB != BA & zero divisors
const clone=v=>JSON.parse(JSON.stringify(v));
const A=[[1,2],[3,0]], B=[[4,1],[2,5]];
assert.deepEqual(clone(labs.math.matMul2x2(A,B)),[[8,11],[12,3]]);
assert.deepEqual(clone(labs.math.matMul2x2(B,A)),[[7,8],[17,4]]);
assert.notDeepEqual(clone(labs.math.matMul2x2(A,B)),clone(labs.math.matMul2x2(B,A)));
assert.deepEqual(clone(labs.math.matMul2x2([[1,0],[0,0]],[[0,0],[2,0]])),[[0,0],[0,0]]);

/* HTML, SW & integration checks */
const html=read('index.html'), sw=read('service-worker.js'), hub=read('assets/chapter-hub.js');
assert(html.includes('assets/g10-ch3-concepts.css'));
assert(html.includes('data/g10-ch3-concepts.js'));
assert(html.includes('assets/g10-ch3-concepts.js'));
assert(sw.includes('./assets/g10-ch3-concepts.css'));
assert(sw.includes('./data/g10-ch3-concepts.js'));
assert(sw.includes('./assets/g10-ch3-concepts.js'));
assert(hub.includes("chapter.id==='g10-ch3'"));
assert(hub.includes('TriggleG10Ch3Labs?.mount'));

console.log('PASS Grade 10 Chapter 3 Algebra Concepts: 14 bilingual stages, all KaTeX expressions, 14 mathematical checks, exercise links & offline cache');
