'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'teacher-review.html'), 'utf8');
assert(html.includes('./assets/teacher-review-questions.js'), 'Teacher review model must load before the login module');
assert(html.indexOf('teacher-review-questions.js') < html.indexOf('teacher-portal.js'), 'Teacher model loading order incorrect');

const context = { console };
context.window = context;
vm.createContext(context);
function load(relativePath) {
  vm.runInContext(fs.readFileSync(path.join(root, relativePath), 'utf8'), context, { filename: relativePath });
}
load('data/class-9.js');
load('data/class-10.js');
load('data/curriculum.js');
load('data/textbook-exercises/g9-ch1-ex1-1-view.js');
load('data/textbook-exercises/g9-ch3-ex3-1-q10-q12-en.js');
load('data/textbook-exercises/g10-ch2-ex2-1-en.js');
load('assets/teacher-review-questions.js');

const records = context.TriggleTeacherQuestions.collect(context.TRIGGLE_CLASSES, context.TRIGGLE_CURRICULUM);
const grade9 = records.filter(item => item.classNum === 9);
const grade10 = records.filter(item => item.classNum === 10);
assert(grade9.length > 0, 'Grade 9 must appear in teacher review');
assert(grade10.length > 0, 'Grade 10 must remain in teacher review');
assert(grade9.some(item => item.id === 'g9-ch1-ex1.1-q1-i'), 'Grade 9 Chapter 1 Exercise 1.1 is missing');
assert(grade9.some(item => item.id === 'g9-ch3-ex3.1-q10'), 'Grade 9 Algebra textbook record is missing');
assert(grade10.some(item => item.id === 'c10-2-ex2-1-q1'), 'Grade 10 bulk exercise should remain available');
assert(grade9.every(item => item.kind === 'reference' || item.kind === 'textbook'), 'Unexpected grade 9 kind');
assert(records.every(item => item.kind !== 'practice'), 'Do not approve practice as textbook');
assert(!records.some(item => item.id === 'c9-example-6-1'), 'Worked examples are not textbook exercise questions');
assert.equal(new Set(records.map(item => item.id)).size, records.length, 'Duplicate review question IDs');
console.log('PASS: Teacher Review includes registered Grade 9 Chapter 1 and Algebra exercises, preserves Grade 10, excludes practice and duplicates');
