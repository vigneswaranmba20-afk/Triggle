#!/usr/bin/env node
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const { validateCurriculum, validatePreservation, validateSiteLinks } = require('./validate_curriculum.cjs');
const bi = (en = 'Test content', ta = 'சோதனை உள்ளடக்கம்') => ({ en, ta });
const review = () => ({ state: 'unreviewed', notes: bi('Not reviewed', 'மதிப்பாய்வு செய்யப்படவில்லை') });
const sourceRefs = () => [{ sourceId: 'textbook-en', locator: 'Contents page' }, { sourceId: 'textbook-ta', locator: 'பொருளடக்கம்' }];
function fixture() {
  const classes = {};
  const curriculum = {
    schemaVersion: 1, subject: 'mathematics', board: 'Tamil Nadu State Board',
    sources: [{ id: 'textbook-en', publisher: 'Government of Tamil Nadu', title: 'Mathematics', medium: 'en', edition: 'Fixture edition', url: 'https://example.org/textbook.pdf', verification: 'pending', evidence: 'Test fixture only' },
      { id: 'textbook-ta', publisher: 'Government of Tamil Nadu', title: 'கணிதவியல்', medium: 'ta', edition: 'Fixture edition', url: 'https://example.org/textbook-ta.pdf', verification: 'pending', evidence: 'Test fixture only' }],
    grades: Object.entries({ 9: 9, 10: 8, 11: 12, 12: 12 }).map(([g, count]) => {
      const grade = Number(g), question = { id: `c${g}-1-example`, classNum: grade, chapter: '1', source: 'https://example.org/exercise' };
      classes[g] = { items: [question] };
      return { grade, chapters: Array.from({ length: count }, (_, i) => ({
        id: `g${g}-ch${i + 1}`, number: i + 1, title: bi(), status: 'planned', terminology: { ta: 'pending' },
        legacyQuestionIds: i === 0 ? [question.id] : [], concepts: [], prerequisites: [], workedExamples: [], exercises: [], quizzes: [], sourceRefs: sourceRefs(), review: review()
      })) };
    })
  };
  return { curriculum, classes };
}
let checks = 0;
function rejects(name, mutate, expected) {
  const data = fixture(); mutate(data.curriculum, data.classes);
  const errors = validateCurriculum(data.curriculum, data.classes);
  assert(errors.some(error => expected.test(error)), name + ': expected rejection, got ' + JSON.stringify(errors));
  checks++;
}
assert.deepEqual(validateCurriculum(...Object.values(fixture())), [], 'Valid complete architecture'); checks++;
rejects('Missing chapter', c => c.grades[0].chapters.pop(), /expected 9 chapters/);
rejects('Missing grade', c => { c.grades[3] = structuredClone(c.grades[2]); }, /Duplicate grade|Missing grade/);
rejects('Missing Tamil title', c => { delete c.grades[0].chapters[0].title.ta; }, /title.ta.*missing/);
rejects('Whitespace translation', c => { c.grades[0].chapters[0].title.ta = '  '; }, /missing nonempty text\/translation/);
rejects('Duplicate chapter ID', c => { c.grades[0].chapters[1].id = c.grades[0].chapters[0].id; }, /duplicate ID/);
rejects('Duplicate legacy ID', (_c, classes) => { classes[10].items[0].id = classes[9].items[0].id; }, /duplicate ID/);
rejects('Broken source', c => { c.grades[0].chapters[0].sourceRefs[0].sourceId = 'missing'; }, /broken source reference/);
rejects('Missing Tamil book', c => { c.grades[3].chapters[0].sourceRefs = c.grades[3].chapters[0].sourceRefs.filter(ref => ref.sourceId !== 'textbook-ta'); }, /missing ta textbook chapter source/);
rejects('Missing English book', c => { c.grades[3].chapters[0].sourceRefs = c.grades[3].chapters[0].sourceRefs.filter(ref => ref.sourceId !== 'textbook-en'); }, /missing en textbook chapter source/);
rejects('Invalid external source URL', c => { c.sources[0].url = 'javascript:alert(1)'; }, /HTTP\(S\)/);
rejects('Broken prerequisite', c => { c.grades[0].chapters[0].prerequisites.push('missing-concept'); }, /broken prerequisite/);
rejects('Prerequisite cycle', c => { c.grades[0].chapters[0].prerequisites.push('g9-ch2'); c.grades[0].chapters[1].prerequisites.push('g9-ch1'); }, /Cyclic prerequisite/);
rejects('Unknown legacy question', c => { c.grades[0].chapters[0].legacyQuestionIds.push('missing-question'); }, /broken legacy question/);
rejects('Unmapped existing question', c => { c.grades[0].chapters[0].legacyQuestionIds = []; }, /Unmapped legacy question/);
rejects('Wrong chapter mapping', c => { c.grades[0].chapters[1].legacyQuestionIds.push(c.grades[0].chapters[0].legacyQuestionIds.pop()); }, /different grade\/chapter/);
rejects('Duplicate question mapping', c => { c.grades[0].chapters[1].legacyQuestionIds.push(c.grades[0].chapters[0].legacyQuestionIds[0]); }, /mapped more than once/);
rejects('Unsupported publication claim', c => { c.grades[0].chapters[0].status = 'published'; }, /published chapter needs approved review/);
rejects('Missing content section', c => { delete c.grades[0].chapters[0].quizzes; }, /quizzes.*missing/);

const future = fixture(), chapter = future.curriculum.grades[0].chapters[0];
const record = (id, extra) => ({ id, title: bi(), ...extra, sourceRefs: sourceRefs(), review: review() });
chapter.concepts.push(record('g9-ch1-concept-sets', { body: bi(), prerequisites: [] }));
chapter.workedExamples.push(record('g9-ch1-example-a', { conceptIds: ['g9-ch1-concept-sets'], problem: bi(), steps: [{ explanation: bi(), equation: '1 + 1 = 2' }], answer: bi() }));
chapter.exercises.push(record('g9-ch1-exercise-a', { conceptIds: ['g9-ch1-concept-sets'], instructions: bi(), questionIds: ['c9-1-example'] }));
chapter.quizzes.push(record('g9-ch1-quiz-a', { conceptIds: ['g9-ch1-concept-sets'], questions: [{ id: 'g9-ch1-quiz-a-question-a', prompt: bi(), choices: [{ id: 'g9-ch1-choice-a', text: bi() }, { id: 'g9-ch1-choice-b', text: bi() }], correctChoiceId: 'g9-ch1-choice-a', explanation: bi() }] }));
assert.deepEqual(validateCurriculum(future.curriculum, future.classes), [], 'Structured future content must validate'); checks++;
let invalid = structuredClone(future);
invalid.curriculum.grades[0].chapters[0].quizzes[0].questions[0].correctChoiceId = 'wrong-choice';
assert(validateCurriculum(invalid.curriculum, invalid.classes).some(error => /broken correctChoiceId/.test(error))); checks++;
invalid = structuredClone(future);
invalid.curriculum.grades[0].chapters[0].workedExamples[0].conceptIds = ['missing-concept'];
assert(validateCurriculum(invalid.curriculum, invalid.classes).some(error => /broken concept/.test(error))); checks++;
invalid = structuredClone(future);
invalid.curriculum.grades[0].chapters[0].exercises[0].questionIds = ['missing-question'];
assert(validateCurriculum(invalid.curriculum, invalid.classes).some(error => /broken question/.test(error))); checks++;
invalid = structuredClone(future);
invalid.curriculum.grades[0].chapters[0].quizzes[0].questions[0].choices[1].id = 'g9-ch1-choice-a';
assert(validateCurriculum(invalid.curriculum, invalid.classes).some(error => /duplicate ID/.test(error))); checks++;
invalid = structuredClone(future);
delete invalid.curriculum.grades[0].chapters[0].workedExamples[0].steps[0].explanation.ta;
assert(validateCurriculum(invalid.curriculum, invalid.classes).some(error => /explanation.ta.*missing/.test(error))); checks++;

const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'triggle-curriculum-test-'));
try {
  fs.mkdirSync(path.join(temporary, 'data'));
  const legacy = 'window.TRIGGLE_CLASSES={9:{items:[{id:"preserved-question"}]}};\n';
  fs.writeFileSync(path.join(temporary, 'data/class-9.js'), legacy);
  fs.writeFileSync(path.join(temporary, 'data/legacy-content-baseline.json'), JSON.stringify({ baseCommit: 'a'.repeat(40), files: { 'data/class-9.js': { sha256: crypto.createHash('sha256').update(legacy).digest('hex'), ids: ['preserved-question'] } } }));
  assert.deepEqual(validatePreservation(temporary), []); checks++;
  fs.appendFileSync(path.join(temporary, 'data/class-9.js'), '// accidental edit');
  assert(validatePreservation(temporary).some(error => /Preserved content changed/.test(error))); checks++;
  fs.writeFileSync(path.join(temporary, 'index.html'), '<a href="./missing.html">Broken</a><script src="./script.js"></script>');
  fs.writeFileSync(path.join(temporary, 'script.js'), '// fixture');
  fs.writeFileSync(path.join(temporary, 'manifest.webmanifest'), JSON.stringify({ start_url: './index.html', icons: [] }));
  fs.writeFileSync(path.join(temporary, 'service-worker.js'), 'const CORE=["./index.html"];');
  assert(validateSiteLinks(temporary).some(error => /broken local link .\/missing.html/.test(error))); checks++;
  fs.writeFileSync(path.join(temporary, 'missing.html'), '<a href="./index.html?class=9">Home</a>');
  assert.deepEqual(validateSiteLinks(temporary), []); checks++;
} finally { fs.rmSync(temporary, { recursive: true, force: true }); }
console.log(`PASS: ${checks} curriculum validation checks (coverage, translations, IDs, references, future content, preservation and local links)`);
