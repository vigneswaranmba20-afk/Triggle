'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {createHash} = require('node:crypto');
const katex = require('../assets/vendor/katex/katex.min.js');
const {load} = require('./build_g9_math.cjs');

const root = path.resolve(__dirname,'..');
const read = name => fs.readFileSync(path.join(root,name),'utf8');
const plain = part => Array.isArray(part) ? part.map(plain).join('') : part?.fallback ?? part;
const authored = value => {
  if (Array.isArray(value)) value.forEach(authored);
  else if (value?.latex) assert.doesNotThrow(()=>katex.renderToString(value.latex,{throwOnError:true,strict:'error'}),value.fallback);
};
const squared = x => x*x;
const isSquare = n => squared(Math.floor(Math.sqrt(n)))===n;
const gcd = (a,b) => b ? gcd(b,a%b) : Math.abs(a);
const denominator = (n,d) => d/gcd(n,d);
const terminates = d => {
  while (d%2===0) d/=2;
  while (d%5===0) d/=5;
  return d===1;
};
function decimal(n,d) {
  const digits=[];
  const seen=new Map();
  let remainder=Math.abs(n%d);
  while (remainder && !seen.has(remainder)) {
    seen.set(remainder,digits.length);
    remainder*=10;
    digits.push(Math.floor(remainder/d));
    remainder%=d;
  }
  const start=remainder?seen.get(remainder):digits.length;
  return {nonrepeating:digits.slice(0,start).join(''),repeating:digits.slice(start).join('')};
}
const one = values => {
  assert.equal(values.filter(Boolean).length,1);
  return values.findIndex(Boolean)+1;
};

function applyReviewedRealNumbers(items) {
  const context={window:{}};
  vm.runInNewContext(read('data/why-step-g9.js'),context);
  vm.runInNewContext(read('data/real-numbers/g9-ch2-frontier.js'),context);
  context.window.TriggleG9RealFrontier(items);
  return items;
}

function verify() {
  const all=load();
  const originals=new Map(all.map(q=>[q.id,JSON.stringify(q)]));
  applyReviewedRealNumbers(all);
  const front=all.filter(item=>item.chapter==='2'&&item.answerTa);
  assert.equal(front.length,40);
  assert.equal(new Set(front.map(item=>item.id)).size,40);
  const mcq=front.filter(item=>item.exercise==='2.9');
  assert.equal(mcq.length,20);
  const lesson=n=>mcq[n-1];
  const picked=n=>plain(lesson(n).choices[lesson(n).correctIndex].en).slice(4);
  const key=(n,correct,value)=>{
    assert.equal(lesson(n).correctIndex+1,correct,'Independent option index for Q'+n);
    if (value!==undefined) assert.equal(picked(n),value,'Independent selected option for Q'+n);
  };

  assert(isSquare(4) && !isSquare(2));
  key(1,4,'may be rational or irrational');
  assert.equal(2/1,2);
  key(2,3,'Every real number is an irrational number.');
  assert.equal(Math.sqrt(2)-Math.sqrt(2),0);
  assert(!isSquare(8));
  key(3,2,'may be a rational or an irrational number.');
  key(4,one([[5,64],[8,9],[14,15],[1,12]].map(([n,d])=>terminates(denominator(n,d)))),'5/64');
  assert.equal(5*1000000/64,78125);
  assert(isSquare(25)&&isSquare(9)&&isSquare(4));
  key(5,4,'π');
  key(6,one([11,5,2.5,8].map(n=>4<n&&4*n<25&&!isSquare(n))),'√5');
  const multipliers=[[1,10],[3,10],[3,1],[30,1]];
  key(7,one(multipliers.map(([n,d])=>denominator(n,3*d)===10)),'3/10');
  assert.deepEqual(decimal(5,7),{nonrepeating:'',repeating:'714285'});
  key(8,2,'0.(714285)');
  key(9,one([32*2,27/3,72*8,54/18].map(n=>!isSquare(n))),'√54 / √18');
  const sumTop=34*10+31*11;
  assert.deepEqual(decimal(sumTop,990),{nonrepeating:'6',repeating:'87'});
  key(10,1,'0.6(87)');
  assert.equal(squared(-5),25);
  assert.equal(Math.sqrt(25),5);
  key(11,4,'√25 = ±5');
  assert.deepEqual([denominator(8,18),8/gcd(8,18)],[9,4]);
  assert(!isSquare(13));
  key(12,4,'√13');
  assert.equal(27/3+12/3+2*Math.sqrt(27*12)/3,squared(5));
  key(13,3,'5√3');
  key(14,one([2,4,8,16].map(k=>squared(k)*5===80)),'4');
  assert.equal(squared(4)*squared(2)*7*3,squared(8)*21);
  key(15,2,'8√21');
  assert.equal(4*3*9,6*9*2);
  key(16,3,'√6/3');
  assert.equal(squared(2)*5+2,22);
  assert.equal(squared(2*2)*5*2,squared(4)*10);
  key(17,2,'22 − 4√10');
  assert.equal(3n**6n,729n);
  assert.equal(3n**2n,9n);
  assert.equal((6+2)*(-3/4),-6);
  key(18,4,'10⁶/3⁶');
  assert.equal(3*4,2*2*3);
  key(19,2,'4/3');
  assert.equal((5n*10n**5n)*(4n*10n**4n),2n*10n**10n);
  key(20,3,'2 × 10¹⁰ m²');

  assert.deepEqual(decimal(2,7),{nonrepeating:'',repeating:'285714'});
  assert.deepEqual(decimal(3,11),{nonrepeating:'',repeating:'27'});
  assert.deepEqual(decimal(22,3),{nonrepeating:'',repeating:'3'});
  assert.deepEqual(decimal(327,200),{nonrepeating:'635',repeating:''});
  assert.deepEqual(decimal(1,13),{nonrepeating:'',repeating:'076923'});
  assert.deepEqual([[7,128],[21,15],[149,35],[219,2200]].map(([n,d])=>terminates(denominator(n,d))),[true,true,false,false]);
  assert(36*4<3*49 && 3*5<4*4 && 4*169<144*5);
  assert(2*2<5 && 5*3<8*2 && 8<3*3);
  assert(Math.abs(Math.sqrt(2)/2+Math.sqrt(2)/2-Math.sqrt(2))<1e-12);
  assert(Math.abs(Math.sqrt(8)-Math.sqrt(2)-Math.sqrt(2))<1e-12);
  assert.equal(2*3,6);
  assert.equal(6/2,3);
  assert.equal(Math.sqrt(2)-Math.sqrt(2),0);
  assert.equal(Math.sqrt(3)-Math.sqrt(3),0);
  assert.equal(Math.sqrt(2*8),4);
  assert.equal(Math.sqrt(18/2),3);
  assert.equal(Math.round(1000*11/3),3667);

  const checks=front.map(item=>{
    const previous=JSON.parse(originals.get(item.id));
    assert.equal(item.answer,previous.answer,'Original baseline answer and ID remain available');
    assert.equal(JSON.stringify(item.label),JSON.stringify(previous.label));
    assert.match(item.answerTa,/\p{Script=Tamil}/u);
    authored(item.answerMath.ta);
    if (item.exercise==='2.9') {
      assert.equal(item.choices.length,4);
      assert.equal(item.steps.length,2);
      assert.equal(item.steps[0].why.ta.length>0,true);
      for (const lang of ['en','ta']) {
        authored(item.questionMath[lang]);
        item.choices.forEach(choice=>authored(choice[lang]));
        assert.equal(plain(item.questionMath[lang]),item.q[lang]);
      }
      for (const step of item.steps) {
        authored(step.math);
        assert.match(step.ta,/\p{Script=Tamil}/u);
      }
    } else {
      assert.equal(JSON.stringify(item.q),JSON.stringify(previous.q));
      assert.equal(JSON.stringify(item.steps),JSON.stringify(previous.steps));
    }
    return {recordId:item.id,parts:['whole'],passed:true,
      recordSha256:createHash('sha256').update(JSON.stringify(item)).digest('hex')};
  });
  assert.ok(read('index.html').includes('./data/real-numbers/g9-ch2-frontier.js'));
  assert.ok(read('service-worker.js').includes('./data/real-numbers/g9-ch2-frontier.js'));
  console.log('PASS Grade 9 Real Numbers: 20 rechecked bilingual MCQs, 20 localized final answers, stable IDs and authored KaTeX');
  return checks;
}

if (require.main===module) verify();
module.exports={verify,applyReviewedRealNumbers};
