#!/usr/bin/env node
'use strict';
// Dependency-free validation for the JSON Schema subset used by curriculum.schema.json,
// plus curriculum semantics which JSON Schema cannot express (IDs, coverage, links).
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const siteRoot = path.resolve(__dirname, '..');
const schema = JSON.parse(fs.readFileSync(path.join(siteRoot, 'data/curriculum.schema.json'), 'utf8'));
const expectedCounts = { 9: 9, 10: 8, 11: 12, 12: 12 };
const nonempty = value => typeof value === 'string' && value.trim().length > 0;
const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const httpUrl = value => {
  try { const u = new URL(value); return ['https:', 'http:'].includes(u.protocol) && !!u.hostname; }
  catch { return false; }
};

function validateShape(value, rule = schema, location = '$', errors = []) {
  if (rule.$ref) {
    const resolved = rule.$ref.split('/').slice(1).reduce((node, key) => node?.[key], schema);
    if (!resolved) throw Error('Unresolved schema reference: ' + rule.$ref);
    return validateShape(value, resolved, location, errors);
  }
  if (rule.anyOf && !rule.anyOf.some(option => validateShape(value, option, location, []).length === 0)) {
    errors.push(location + ': does not match an allowed shape'); return errors;
  }
  if (Object.hasOwn(rule, 'const') && value !== rule.const) errors.push(location + ': unexpected constant');
  if (rule.enum && !rule.enum.includes(value)) errors.push(location + ': unexpected value ' + JSON.stringify(value));
  if (rule.type) {
    const valid = rule.type === 'object' ? isObject(value) : rule.type === 'array' ? Array.isArray(value) :
      rule.type === 'integer' ? Number.isInteger(value) : typeof value === rule.type;
    if (!valid) { errors.push(location + ': expected ' + rule.type); return errors; }
  }
  if (typeof value === 'string') {
    if (rule.minLength && value.trim().length < rule.minLength) errors.push(location + ': missing nonempty text/translation');
    if (rule.pattern && !new RegExp(rule.pattern).test(value)) errors.push(location + ': invalid ID');
    if (rule.format === 'uri' && !httpUrl(value)) errors.push(location + ': expected an HTTP(S) source URL');
  }
  if (typeof value === 'number') {
    if (rule.minimum !== undefined && value < rule.minimum) errors.push(location + ': below minimum');
    if (rule.maximum !== undefined && value > rule.maximum) errors.push(location + ': above maximum');
  }
  if (Array.isArray(value)) {
    if (rule.minItems !== undefined && value.length < rule.minItems) errors.push(location + ': too few entries');
    if (rule.maxItems !== undefined && value.length > rule.maxItems) errors.push(location + ': too many entries');
    if (rule.uniqueItems && new Set(value.map(item => JSON.stringify(item))).size !== value.length) errors.push(location + ': duplicate array entry');
    if (rule.items) value.forEach((item, i) => validateShape(item, rule.items, `${location}[${i}]`, errors));
  }
  if (isObject(value)) {
    for (const key of rule.required || []) if (!Object.hasOwn(value, key)) errors.push(location + '.' + key + ': missing required field');
    for (const [key, entry] of Object.entries(value)) {
      if (rule.properties?.[key]) validateShape(entry, rule.properties[key], location + '.' + key, errors);
      else if (rule.additionalProperties === false) errors.push(location + '.' + key + ': unknown field');
    }
  }
  return errors;
}

function loadData(root = siteRoot) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  for (const grade of Object.keys(expectedCounts)) {
    const filename = `data/class-${grade}.js`;
    vm.runInContext(fs.readFileSync(path.join(root, filename), 'utf8'), sandbox, { filename, timeout: 1000 });
  }
  vm.runInContext(fs.readFileSync(path.join(root, 'data/curriculum.js'), 'utf8'), sandbox, { filename: 'curriculum.js', timeout: 1000 });
  return { curriculum: sandbox.window.TRIGGLE_CURRICULUM, classes: sandbox.window.TRIGGLE_CLASSES };
}

function validateCurriculum(curriculum, classes) {
  const errors = validateShape(curriculum);
  // Shape errors make subsequent reference checks unreliable; report them together first.
  if (errors.length) return errors;
  const ids = new Map(), sources = new Map(), chapters = new Map(), concepts = new Map(), questions = new Map();
  const addId = (id, location) => {
    if (ids.has(id)) errors.push(`${location}: duplicate ID ${id} (also ${ids.get(id)})`);
    else ids.set(id, location);
  };
  for (const source of curriculum.sources) { addId(source.id, 'source'); sources.set(source.id, source); }
  for (const grade of Object.keys(expectedCounts)) {
    const items = classes?.[grade]?.items;
    if (!Array.isArray(items)) { errors.push('Missing legacy data for grade ' + grade); continue; }
    for (const item of items) {
      addId(item.id, 'legacy grade ' + grade);
      questions.set(item.id, item);
      if (Number(item.classNum) !== Number(grade)) errors.push(item.id + ': wrong legacy grade');
      if (item.source && !httpUrl(item.source)) errors.push(item.id + ': invalid legacy source URL');
    }
  }
  const foundGrades = new Set();
  for (const grade of curriculum.grades) {
    if (foundGrades.has(grade.grade)) errors.push('Duplicate grade ' + grade.grade);
    foundGrades.add(grade.grade);
    if (grade.chapters.length !== expectedCounts[grade.grade]) errors.push(`Grade ${grade.grade}: expected ${expectedCounts[grade.grade]} chapters, got ${grade.chapters.length}`);
    const numbers = new Set();
    for (const chapter of grade.chapters) {
      addId(chapter.id, 'chapter'); chapters.set(chapter.id, chapter);
      if (chapter.id !== `g${grade.grade}-ch${chapter.number}`) errors.push(chapter.id + ': chapter ID does not match grade/number');
      if (chapter.number > expectedCounts[grade.grade] || numbers.has(chapter.number)) errors.push(chapter.id + ': duplicate or out-of-range chapter number');
      numbers.add(chapter.number);
      for (const field of ['concepts', 'workedExamples', 'exercises', 'quizzes']) {
        for (const record of chapter[field]) {
          addId(record.id, chapter.id + '.' + field);
          if (field === 'concepts') concepts.set(record.id, record);
          if (field === 'quizzes') for (const question of record.questions) {
            addId(question.id, record.id + '.questions'); questions.set(question.id, question);
            for (const choice of question.choices) addId(choice.id, question.id + '.choices');
            if (!question.choices.some(choice => choice.id === question.correctChoiceId)) errors.push(question.id + ': broken correctChoiceId ' + question.correctChoiceId);
          }
        }
      }
    }
  }
  for (const grade of Object.keys(expectedCounts)) if (!foundGrades.has(Number(grade))) errors.push('Missing grade ' + grade);
  const mappedQuestions = new Set();
  const checkSourceRefs = (record, owner) => {
    for (const ref of record.sourceRefs) if (!sources.has(ref.sourceId)) errors.push(owner + ': broken source reference ' + ref.sourceId);
  };
  const checkRefs = (references, valid, owner, kind) => {
    for (const id of references) if (!valid.has(id)) errors.push(`${owner}: broken ${kind} reference ${id}`);
  };
  const prerequisites = new Map([...chapters, ...concepts]);
  for (const grade of curriculum.grades) for (const chapter of grade.chapters) {
    checkSourceRefs(chapter, chapter.id);
    // Every State Board chapter needs both English- and Tamil-medium textbook anchors.
    // A bilingual marketing catalogue does not substitute for chapter-specific evidence.
    for (const medium of ['en', 'ta']) {
      if (!chapter.sourceRefs.some(ref => sources.get(ref.sourceId)?.medium === medium)) {
        errors.push(chapter.id + ': missing ' + medium + ' textbook chapter source');
      }
    }
    checkRefs(chapter.prerequisites, prerequisites, chapter.id, 'prerequisite');
    if (chapter.prerequisites.includes(chapter.id)) errors.push(chapter.id + ': chapter cannot require itself');
    for (const id of chapter.legacyQuestionIds) {
      const question = questions.get(id);
      if (!question || !question.classNum) errors.push(chapter.id + ': broken legacy question reference ' + id);
      else if (Number(question.classNum) !== grade.grade || Number(question.chapter) !== chapter.number) errors.push(chapter.id + ': legacy question belongs to a different grade/chapter: ' + id);
      if (mappedQuestions.has(id)) errors.push(chapter.id + ': legacy question mapped more than once: ' + id);
      mappedQuestions.add(id);
    }
    for (const field of ['concepts', 'workedExamples', 'exercises', 'quizzes']) for (const record of chapter[field]) {
      checkSourceRefs(record, record.id);
      if (record.conceptIds) checkRefs(record.conceptIds, concepts, record.id, 'concept');
      if (record.prerequisites) {
        checkRefs(record.prerequisites, prerequisites, record.id, 'prerequisite');
        if (record.prerequisites.includes(record.id)) errors.push(record.id + ': concept cannot require itself');
      }
      if (record.questionIds) checkRefs(record.questionIds, questions, record.id, 'question');
    }
    // A starter question does not establish reviewed chapter coverage.
    if (chapter.status === 'published') {
      if (chapter.review.state !== 'approved') errors.push(chapter.id + ': published chapter needs approved review');
      if (chapter.terminology.ta !== 'verified') errors.push(chapter.id + ': published chapter needs verified Tamil terminology');
      if (['concepts', 'workedExamples', 'exercises', 'quizzes'].some(field => !chapter[field].length)) errors.push(chapter.id + ': published chapter is missing a content section');
      for (const ref of chapter.sourceRefs) if (sources.get(ref.sourceId)?.verification !== 'verified') errors.push(chapter.id + ': published chapter has unverified source');
      for (const field of ['concepts', 'workedExamples', 'exercises', 'quizzes']) for (const record of chapter[field]) {
        if (record.review.state !== 'approved') errors.push(record.id + ': published chapter contains unreviewed content');
      }
    }
  }
  for (const [id, question] of questions) if (question.classNum && !mappedQuestions.has(id)) errors.push('Unmapped legacy question: ' + id);
  // Reject cyclic prerequisites: a learner must be able to reach a starting point.
  const visiting = new Set(), visited = new Set();
  function visit(id) {
    if (visiting.has(id)) { errors.push('Cyclic prerequisite reference: ' + id); return; }
    if (visited.has(id)) return;
    visiting.add(id);
    for (const target of prerequisites.get(id)?.prerequisites || []) if (prerequisites.has(target)) visit(target);
    visiting.delete(id); visited.add(id);
  }
  for (const id of prerequisites.keys()) visit(id);
  return errors;
}

function validatePreservation(root = siteRoot) {
  const errors = [];
  const baseline = JSON.parse(fs.readFileSync(path.join(root, 'data/legacy-content-baseline.json'), 'utf8'));
  if (!/^[0-9a-f]{40}$/.test(baseline.baseCommit || '')) errors.push('Preservation baseline: missing base commit');
  for (const [relative, entry] of Object.entries(baseline.files || {})) {
    const archived = entry.archivedAs;
    if (archived && !/^docs\/history\/discontinued-explanation-modes\/[a-z-]+\.js$/.test(archived)) {
      errors.push('Invalid preservation archive path: ' + relative); continue;
    }
    const file = archived ? path.resolve(root, '..', archived) : path.resolve(root, relative);
    if (!archived && !file.startsWith(root + path.sep)) { errors.push('Preservation baseline: path escapes site: ' + relative); continue; }
    if (!fs.existsSync(file)) { errors.push('Preserved file missing: ' + relative); continue; }
    const content = fs.readFileSync(file);
    // Classic-reader additions are audited UI only. Removing these exact new
    // fragments must recover every byte of the original preserved page.
    let preservedContent=content;
    if (entry.uiOnlyAdditions) {
      if (relative!=='class9-classic.html'||!Array.isArray(entry.uiOnlyAdditions)||!entry.uiOnlyAdditions.length) {
        errors.push('Invalid UI-only preservation additions: '+relative); continue;
      }
      let original=content.toString('utf8');
      for(const addition of entry.uiOnlyAdditions){
        if(typeof addition!=='string'||!addition||original.split(addition).length!==2){
          errors.push('Missing or repeated audited UI addition: '+relative); continue;
        }
        original=original.replace(addition,'');
      }
      preservedContent=Buffer.from(original,'utf8');
    }
    if (crypto.createHash('sha256').update(preservedContent).digest('hex') !== entry.sha256) errors.push('Preserved content changed: ' + relative);
    if (entry.ids) {
      const sandbox = { window: {} };
      vm.runInNewContext(content.toString('utf8'), sandbox, { filename: relative, timeout: 1000 });
      const grade = /class-(\d+)\.js$/.exec(relative)?.[1];
      const ids = sandbox.window.TRIGGLE_CLASSES?.[grade]?.items.map(item => item.id);
      if (JSON.stringify(ids) !== JSON.stringify(entry.ids)) errors.push('Preserved question IDs/order changed: ' + relative);
    }
  }
  if (!Object.keys(baseline.files || {}).length) errors.push('Preservation baseline has no files');
  return errors;
}

function validateSiteLinks(root = siteRoot) {
  const errors = [];
  const check = (reference, origin) => {
    if (!reference || /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(reference)) return;
    const target = decodeURIComponent(reference.split(/[?#]/)[0]);
    if (!target) return;
    const file = path.resolve(path.dirname(origin), target);
    if (!file.startsWith(root + path.sep) || !fs.existsSync(file)) errors.push(path.relative(root, origin) + ': broken local link ' + reference);
  };
  function walk(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) { if (entry.name !== 'tools') walk(file); continue; }
      if (entry.name.endsWith('.html')) {
        // Keep external script attributes, ignore JS-generated strings and comments.
        const html = fs.readFileSync(file, 'utf8').replace(/<!--[\s\S]*?-->/g, '').replace(/(<script\b[^>]*>)[\s\S]*?<\/script>/gi, '$1</script>');
        for (const match of html.matchAll(/\b(?:href|src)\s*=\s*["']([^"']+)["']/gi)) check(match[1], file);
      } else if (entry.name.endsWith('.css')) {
        for (const match of fs.readFileSync(file, 'utf8').matchAll(/url\(\s*["']?([^\s)"']+)["']?\s*\)/gi)) check(match[1], file);
      }
    }
  }
  walk(root);
  const manifestFile = path.join(root, 'manifest.webmanifest');
  const manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
  check(manifest.start_url, manifestFile);
  for (const icon of manifest.icons || []) check(icon.src, manifestFile);
  const workerFile = path.join(root, 'service-worker.js');
  const sandbox = { self: { addEventListener() {} } };
  vm.runInNewContext(fs.readFileSync(workerFile, 'utf8') + '\nthis.__core = CORE;', sandbox, { filename: 'service-worker.js', timeout: 1000 });
  for (const reference of sandbox.__core) check(reference, workerFile);
  return errors;
}

function main() {
  const { curriculum, classes } = loadData();
  const errors = [...validateCurriculum(curriculum, classes), ...validatePreservation(), ...validateSiteLinks()];
  if (errors.length) { console.error(errors.map(error => 'FAIL: ' + error).join('\n')); process.exitCode = 1; }
  else console.log(`PASS: 41 bilingual chapters, ${Object.values(classes).reduce((n, grade) => n + grade.items.length, 0)} preserved questions, schema, IDs, references, translations, local links and content hashes`);
}
module.exports = { validateShape, validateCurriculum, validatePreservation, validateSiteLinks, loadData };
if (require.main === module) {
  try { main(); } catch (error) { console.error('FAIL: ' + error.message); process.exitCode = 1; }
}
