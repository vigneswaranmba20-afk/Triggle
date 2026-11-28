'use strict';
/**
 * Read-only extractor for Grade 10 Chapters 3 (Algebra), 5 (Coordinate Geometry),
 * and 7 (Mensuration) exercises and concept lessons.
 */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { loadRuntime } = require('../curriculum_bulk.cjs');

const ROOT = path.resolve(__dirname, '../../..');
const read = rel => fs.readFileSync(path.join(ROOT, rel), 'utf8');

function loadConcepts(relPath, key) {
  const sb = { window: {}, console };
  sb.window = sb;
  vm.createContext(sb);
  vm.runInContext(read(relPath), sb, { filename: relPath, timeout: 15000 });
  return (sb.window[key] && sb.window[key].stages) || [];
}

function extractAll() {
  const rt = loadRuntime();
  const items = (rt.classes && rt.classes[10] && rt.classes[10].items) || [];
  const ch3Ex = items.filter(x => x && typeof x.id === 'string' && x.id.startsWith('c10-3-'));
  const ch5Ex = items.filter(x => x && typeof x.id === 'string' && x.id.startsWith('c10-5-'));
  const ch7Ex = items.filter(x => x && typeof x.id === 'string' && x.id.startsWith('c10-7-'));

  const ch3Concepts = loadConcepts('site/data/g10-ch3-concepts.js', 'TRIGGLE_G10_CH3_PATH');
  const ch5Concepts = loadConcepts('site/data/g10-ch5-concepts.js', 'TRIGGLE_G10_CH5_PATH');
  const ch7Concepts = loadConcepts('site/data/g10-ch7-concepts.js', 'TRIGGLE_G10_CH7_PATH');

  return {
    schemaVersion: 1,
    grade: 10,
    chapters: {
      '3': { name: 'Algebra', exercises: ch3Ex, concepts: ch3Concepts },
      '5': { name: 'Coordinate Geometry', exercises: ch5Ex, concepts: ch5Concepts },
      '7': { name: 'Mensuration', exercises: ch7Ex, concepts: ch7Concepts }
    },
    counts: {
      ch3: { exercises: ch3Ex.length, concepts: ch3Concepts.length, total: ch3Ex.length + ch3Concepts.length },
      ch5: { exercises: ch5Ex.length, concepts: ch5Concepts.length, total: ch5Ex.length + ch5Concepts.length },
      ch7: { exercises: ch7Ex.length, concepts: ch7Concepts.length, total: ch7Ex.length + ch7Concepts.length }
    }
  };
}

if (require.main === module) {
  process.stdout.write(JSON.stringify(extractAll()));
}

module.exports = { extractAll };
