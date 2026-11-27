'use strict';

const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {createHash}=require('node:crypto');
const katex=require('../assets/vendor/katex/katex.min.js');
const source=require('../data/textbook-fidelity/g9-ch5-ex5-2-frontier.json');
const site=path.join(__dirname,'..');

const d2=([x,y],[a,b])=>(x-a)**2+(y-b)**2;
const area2=([x,y],[a,b],[c,d])=>(a-x)*(d-y)-(b-y)*(c-x);
const sides=vertices=>vertices.map((p,i)=>d2(p,vertices[(i+1)%vertices.length]));
const render=value=>{
  if(Array.isArray(value)) value.forEach(render);
  else if(value?.latex) assert.doesNotThrow(()=>katex.renderToString(value.latex,{throwOnError:true,strict:'error'}),value.fallback);
};

function verify(){
  const context={window:{}};
  for(const name of ['data/class-9.js','data/curriculum.js',
    'data/textbook-exercises/g9-ch5-ex5-2-en.js','data/textbook-exercises/g9-ch5-ex5-2.js']){
    vm.runInNewContext(fs.readFileSync(path.join(site,name),'utf8'),context,{filename:name});
  }
  const {TRIGGLE_CLASSES,TriggleG9Ch5Overrides}=context.window;
  const updated=new Map(TRIGGLE_CLASSES[9].items.filter(q=>q.exercise==='5.2')
    .map(q=>[q.id,TriggleG9Ch5Overrides.get(q.id)||q]));
  assert.equal(updated.size,12);
  assert.equal(source.items.flatMap(q=>q.parts).length,20);
  for(const delta of [-8,0,8])assert.equal(Math.sqrt(delta**2),Math.abs(delta));
  for(const lang of ['en','ta'])assert.match(updated.get('g9-ch5-ex5.2-q1').answerMath[lang].latex,/\|c-a\|/);

  assert.equal(area2([7,-2],[5,1],[3,4]),0);
  for(const a of [-10,0,9])assert.equal(area2([a,-2],[a,3],[a,0]),0);
  assert.deepEqual(sides([[5,4],[2,0],[-2,3]]),[25,25,50]);
  assert.deepEqual(sides([[6,-4],[-2,-4],[2,10]]),[64,212,212]);
  for(const tri of [[[5,4],[2,0],[-2,3]],[[6,-4],[-2,-4],[2,10]]])assert.notEqual(area2(...tri),0);
  for(const [pts,expected] of [
    [[[-3,1],[-6,-7],[3,-9],[6,-1]],[73,85,73,85]],
    [[[-7,-3],[5,10],[15,8],[3,-5]],[313,104,313,104]]
  ]){
    assert.deepEqual(sides(pts),expected);
    assert.notEqual(area2(...pts.slice(0,3)),0);
    for(let i=0;i<2;i++)assert.equal(pts[0][i]+pts[2][i],pts[1][i]+pts[3][i]);
  }
  for(const pts of [[[2,2],[-2,-2],[-2*Math.sqrt(3),2*Math.sqrt(3)]],[[Math.sqrt(3),2],[0,1],[0,3]]]){
    const d=sides(pts);
    assert(Math.abs(d[0]-d[1])<1e-12 && Math.abs(d[1]-d[2])<1e-12);
  }
  const rhombus=[[3,-2],[7,6],[-1,2],[-5,-6]];
  const square=[[1,1],[2,1],[2,2],[1,2]];
  assert.deepEqual(sides(rhombus),[80,80,80,80]);
  assert.deepEqual(sides(square),[1,1,1,1]);
  assert.deepEqual([d2(rhombus[0],rhombus[2]),d2(rhombus[1],rhombus[3])],[32,288]);
  assert.deepEqual([d2(square[0],square[2]),d2(square[1],square[3])],[2,2]);
  for(const a of [1,5])assert.equal(d2([-1,1],[1,3]),d2([1,3],[3,a]));
  for(const t of [-5,9])assert.equal(d2([t,t],[1,3]),100);
  for(const x of [-6,0,4])assert.equal(d2([x,4*x+9],[3,4]),d2([x,4*x+9],[-5,6]));
  assert.equal(d2([2,0],[2,3]),(3*7/7)**2);
  assert.equal(d2([30,0],[0,30]),1800);
  assert.equal(d2([30,0],[-30,0]),3600);
  const circlePoints=[[1,2],[3,-4],[5,-6]];
  assert.notEqual(area2(...circlePoints),0);
  for(const p of circlePoints)assert.equal(d2(p,[11,2]),100);

  const sw=fs.readFileSync(path.join(site,'service-worker.js'),'utf8');
  const checks=source.items.map(row=>{
    const item=updated.get(row.id);
    assert(item,row.id+' on a stable ID');
    assert.equal(item.sourceFidelity.sourcePdfPage.ta,row.sourcePages.ta[0].pdf);
    assert.match(item.q.ta,/\p{Script=Tamil}/u);
    for(const s of item.steps){
      assert.match(s.ta,/\p{Script=Tamil}/u);
      const localized=s.mathTa||s.math;
      assert.doesNotMatch(localized.latex,/\\text\{[a-z ]{2,}/i);
      render(localized);
    }
    assert.ok(item.answerTa);
    render(item.questionMath.ta);
    render(item.answerMath.ta);
    for(const figure of row.figureFiles){
      assert.equal(item.figureSrc,figure);
      assert.match(item.figureAlt.ta,/\p{Script=Tamil}/u);
      assert.ok(sw.includes(figure));
      const svg=fs.readFileSync(path.join(site,figure),'utf8');
      const labelledBy=svg.match(/aria-labelledby="(\w+) (\w+)"/);
      assert(labelledBy,figure+' carries an accessible title and description');
      assert(svg.includes('<title id="'+labelledBy[1]+'">'));
      assert(svg.includes('<desc id="'+labelledBy[2]+'">'));
      assert.match(svg,/<text[^>]*>x<\/text>/i);
      assert.match(svg,/<text[^>]*>y<\/text>/i);
    }
    return {recordId:row.id,parts:row.parts,passed:true,recordSha256:createHash('sha256').update(JSON.stringify(item)).digest('hex')};
  });
  console.log('PASS Grade 9 Exercise 5.2: 20 bilingual tasks on 12 stable IDs, exact distance checks and four accessible SVGs');
  return checks;
}
if(require.main===module)verify();
module.exports={verify};
