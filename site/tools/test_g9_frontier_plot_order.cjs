'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const [evidence] = require('../data/textbook-fidelity/g9-ch5-frontier-plot-order.json').items;
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const context = vm.createContext({window:{}});
for (const file of ['data/class-9.js','data/curriculum.js','data/textbook-exercises/g9-ch5-ex5-1.js']) {
  vm.runInContext(read(file), context, {filename:file});
}
const {TRIGGLE_CLASSES,TRIGGLE_CURRICULUM} = context.window;
const found = TRIGGLE_CLASSES[9].items.filter(record => record.id === evidence.id);
assert.equal(found.length, 1);
const [question] = found;
const chapter = TRIGGLE_CURRICULUM.grades.find(grade => grade.grade === 9).chapters.find(ch => ch.id === 'g9-ch5');
assert.equal(chapter.textbookQuestionIds.filter(id => id === question.id).length, 1);
for (const language of ['en','ta']) {
  const stem = question.q[language].replaceAll('−','-');
  const coords = [...stem.matchAll(/\((-?\d+), (-?\d+)\)/g)].map(match => [Number(match[1]),Number(match[2])]);
  assert.deepEqual(coords, evidence.square.concat(evidence.orderedVertices));
  assert.match(question.answerMath[language].latex, /ABCDA.*ABDCA/);
  assert.equal(question.answerMath[language].fallback, language === 'en' ? question.answer : question.answerTa);
}

const subtract = ([ax,ay],[bx,by]) => [ax-bx,ay-by];
const cross = ([ax,ay],[bx,by]) => ax*by-ay*bx;
const squaredLength = vector => vector[0]**2 + vector[1]**2;
const dot = ([ax,ay],[bx,by]) => ax*bx+ay*by;
const edges = polygon => polygon.map((point,i) => subtract(polygon[(i+1)%polygon.length],point));
const squareEdges = edges(evidence.square);
assert(squareEdges.every(edge => squaredLength(edge) === 16));
assert(squareEdges.every((edge,i) => dot(edge,squareEdges[(i+1)%4]) === 0));

const [a,b,c,d] = evidence.orderedVertices;
const bc = subtract(c,b), ad = subtract(d,a), separation = subtract(a,b);
const denominator = cross(bc,ad);
const t = cross(separation,ad)/denominator;
const u = cross(separation,bc)/denominator;
assert.equal(t, 5/16);
assert.equal(u, 5/16);
assert(t > 0 && t < 1 && u > 0 && u < 1);
const intersection = b.map((coordinate,index) => coordinate + t*bc[index]);
assert.deepEqual(intersection, [-1/2,7/4]);
assert.deepEqual(intersection, a.map((coordinate,index) => coordinate + u*ad[index]));

const perimeter = [a,b,d,c], bases = edges(perimeter);
assert.equal(cross(bases[0],bases[2]),0);
assert.notEqual(cross(bases[1],bases[3]),0);
assert.equal(squaredLength(bases[1]),25);
assert.equal(squaredLength(bases[3]),25);
assert.equal(Math.abs(perimeter.reduce((sum,point,i) => sum + cross(point,perimeter[(i+1)%4]),0))/2,evidence.perimeterArea);

const svg = read(evidence.figure);
const pixelPoints = (vertices,top,ymax) => vertices.map(([x,y]) => `${210+25*x},${top+45+25*(ymax-y)}`).join(' ');
for (const [order,vertices,top,ymax] of [['PQRS',evidence.square,9,1],['ABCD',evidence.orderedVertices,236,4],['ABDC',perimeter,463,4]]) {
  assert(svg.includes(`id="order-${order}"`));
  assert(svg.includes(`points="${pixelPoints(vertices,top,ymax)}"`));
}
assert.match(svg,/id="intersection" cx="197\.5" cy="337\.25"/);
assert.equal(question.figureSrc,evidence.figure);
assert(read('service-worker.js').includes(evidence.figure));
console.log('Grade 9 5.1 Q4 source order, exact intersection, trapezium perimeter and figure coordinates verified.');
