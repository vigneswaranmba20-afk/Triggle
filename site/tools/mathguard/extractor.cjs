'use strict';
/**
 * Read-only extractor for Grade 10 Chapter 7 (Mensuration) exercises, concepts,
 * and fidelity/inventory metadata. Outputs JSON to stdout without modifying any files.
 */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '../../..');
const read = rel => fs.readFileSync(path.join(ROOT, rel), 'utf8');
const readJsonIfExists = rel => {
  const full = path.join(ROOT, rel);
  if (!fs.existsSync(full)) return null;
  return JSON.parse(fs.readFileSync(full, 'utf8'));
};

function extractG10Ch7() {
  const sandbox = { window: {}, console };
  sandbox.window = sandbox;
  vm.createContext(sandbox);

  const scripts = [
    'site/data/class-10.js',
    'site/data/curriculum.js',
    'site/data/textbook-exercises/g10-ch7-ex7-1-q1-q5-en.js',
    'site/data/textbook-exercises/g10-ch7-ex7-1-q6-q10-en.js',
    'site/data/textbook-exercises/g10-ch7-ex7-2.js',
    'site/data/textbook-exercises/g10-ch7-ex7-3.js',
    'site/data/textbook-exercises/g10-ch7-ex7-4.js',
    'site/data/textbook-exercises/g10-ch7-ex7-5.js',
    'site/data/textbook-exercises/g10-ch7-unit7.js',
    'site/data/g10-ch7-concepts.js'
  ];

  for (const rel of scripts) {
    vm.runInContext(read(rel), sandbox, { filename: rel, timeout: 15000 });
  }

  const allItems = sandbox.window.TRIGGLE_CLASSES[10].items || [];
  const exercises = allItems.filter(x => x && typeof x.id === 'string' && x.id.startsWith('c10-7-'));
  const conceptsPath = sandbox.window.TRIGGLE_G10_CH7_PATH || {};
  const concepts = Array.isArray(conceptsPath.stages) ? conceptsPath.stages : [];

  const chapterMeta = (sandbox.window.TRIGGLE_CURRICULUM?.grades || [])
    .find(g => g.grade === 10)?.chapters
    .find(c => c.number === 7) || null;

  const fidelity = {
    '7.1_q1_q5': readJsonIfExists('docs/curriculum/grade-10/g10-ch7-ex7-1-pilot-passports-20261122.json'),
    '7.1_q6_q10': readJsonIfExists('docs/curriculum/grade-10/g10-ch7-ex7-1-q6-q10-passports-20261122.json'),
    '7.1_inv': readJsonIfExists('docs/trace/source-inventories/g10-ch7-ex7-1.json'),
    '7.2_inv': readJsonIfExists('docs/trace/source-inventories/g10-ch7-ex7-2.json'),
    '7.3_inv': readJsonIfExists('docs/trace/source-inventories/g10-ch7-ex7-3.json'),
    '7.4_fid': readJsonIfExists('site/data/textbook-fidelity/g10-ch7-ex7-4.json'),
    '7.5_fid': readJsonIfExists('site/data/textbook-fidelity/g10-ch7-ex7-5.json'),
    '7.unit_fid': readJsonIfExists('site/data/textbook-fidelity/g10-ch7-unit7.json')
  };

  return {
    schemaVersion: 1,
    grade: 10,
    chapter: 7,
    counts: {
      exercises: exercises.length,
      concepts: concepts.length
    },
    chapterMeta,
    exercises,
    conceptsMeta: {
      chapterId: conceptsPath.chapterId || null,
      tamilStatus: conceptsPath.tamilStatus || null
    },
    concepts,
    fidelity
  };
}

if (require.main === module) {
  process.stdout.write(JSON.stringify(extractG10Ch7(), null, 2));
}

module.exports = { extractG10Ch7 };
