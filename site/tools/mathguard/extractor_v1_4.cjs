'use strict';
/**
 * Read-only cross-grade curriculum discovery extractor for TRACE MathGuard V1.4.
 * Discovers all available exercises and concept lessons across Grade 9 and Grade 10,
 * focusing on Chapters 3 (Algebra), 5 (Coordinate Geometry), and 7 (Mensuration),
 * while also inventorying unsupported/planned domains without certifying them.
 */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { loadRuntime, exerciseItem } = require('../curriculum_bulk.cjs');

const ROOT = path.resolve(__dirname, '../../..');
const read = rel => fs.readFileSync(path.join(ROOT, rel), 'utf8');

function loadConcepts(relPath, key) {
  const full = path.join(ROOT, relPath);
  if (!fs.existsSync(full)) return [];
  const sb = { window: {}, console };
  sb.window = sb;
  vm.createContext(sb);
  vm.runInContext(read(relPath), sb, { filename: relPath, timeout: 15000 });
  const val = sb.window[key];
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (Array.isArray(val.stages)) return val.stages;
  return [];
}

function extractV14() {
  const rt = loadRuntime();
  const targetChapters = ['3', '5', '7'];
  const chapterNames = {
    '3': 'Algebra',
    '5': 'Coordinate Geometry',
    '7': 'Mensuration',
  };

  const conceptLoaders = {
    '9:3': () => loadConcepts('site/data/g9-algebra-chapter.js', 'TRIGGLE_ALGEBRA_PATH'),
    '9:5': () => [
      ...loadConcepts('site/data/g9-coordinates-concepts.js', 'TRIGGLE_COORDINATE_LESSONS'),
      ...loadConcepts('site/data/g9-ch5-distance-concept.js', 'TRIGGLE_G9_CH5_PATH'),
    ],
    '9:7': () => loadConcepts('site/data/g9-mensuration-chapter.js', 'TRIGGLE_MENSURATION_PATH'),
    '10:3': () => loadConcepts('site/data/g10-ch3-concepts.js', 'TRIGGLE_G10_CH3_PATH'),
    '10:5': () => loadConcepts('site/data/g10-ch5-concepts.js', 'TRIGGLE_G10_CH5_PATH'),
    '10:7': () => loadConcepts('site/data/g10-ch7-concepts.js', 'TRIGGLE_G10_CH7_PATH'),
  };

  const grades = {};
  const inventory = {};

  for (const grade of [9, 10]) {
    const items = (rt.classes && rt.classes[grade] && rt.classes[grade].items) || [];
    grades[String(grade)] = { chapters: {} };
    inventory[String(grade)] = {};

    // Inventory all chapters in curriculum
    const currGrade = (rt.curriculum && rt.curriculum.grades || []).find(g => g.grade === grade);
    for (const chMeta of (currGrade && currGrade.chapters) || []) {
      const chNum = String(chMeta.number);
      const chItems = items.filter(it => it && String(it.chapter) === chNum);
      const exItems = chItems.filter(exerciseItem);
      inventory[String(grade)][chNum] = {
        title: (chMeta.title && chMeta.title.en) || chMeta.name || `Chapter ${chNum}`,
        totalItems: chItems.length,
        exercises: exItems.length,
      };
    }

    for (const ch of targetChapters) {
      const chItems = items.filter(it => it && String(it.chapter) === ch);
      const exercises = chItems.filter(exerciseItem);
      const concepts = (conceptLoaders[`${grade}:${ch}`] || (() => []))();
      grades[String(grade)].chapters[ch] = {
        name: chapterNames[ch],
        exercises,
        concepts,
        counts: {
          exercises: exercises.length,
          concepts: concepts.length,
          total: exercises.length + concepts.length,
        },
      };
    }
  }

  return {
    schemaVersion: 2,
    engine: 'TRACE MathGuard V1.4',
    grades,
    inventory,
  };
}

if (require.main === module) {
  process.stdout.write(JSON.stringify(extractV14()));
}

module.exports = { extractV14 };
