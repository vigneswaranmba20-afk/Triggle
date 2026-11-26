'use strict';
/**
 * Read-only V1.5 curriculum discovery extractor for Grade 9 Ch 1 (Set Language)
 * and Grade 10 Ch 1 (Relations and Functions), including reader overlays and concepts.
 */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const { loadRuntime, exerciseItem } = require('../curriculum_bulk.cjs');

const ROOT = path.resolve(__dirname, '../../..');
const read = rel => fs.readFileSync(path.join(ROOT, rel), 'utf8');
const sha16 = obj => crypto.createHash('sha256').update(JSON.stringify(obj)).digest('hex').slice(0, 16);

function loadWindowScript(relPath, key) {
  const full = path.join(ROOT, relPath);
  if (!fs.existsSync(full)) return null;
  const sb = { window: {}, console };
  sb.window = sb;
  vm.createContext(sb);
  vm.runInContext(read(relPath), sb, { filename: relPath, timeout: 15000 });
  return sb.window[key] || null;
}

function loadWhyStepOverlays() {
  const overlays = {};
  const files = [
    'site/data/why-step-g9.js',
    'site/data/why-step-g9-frontier.js',
    'site/data/why-step-g9-ex1-2-q1.js',
    'site/data/why-step-g9-ex1-2-q2.js',
    'site/data/why-step-g9-ex1-2-q3-q5-batch1.js',
    'site/data/why-step-g9-ex1-2-q5-iii-q6.js',
    'site/data/why-step-g9-ex1-2-q7-q10.js',
    'site/data/why-step-g10.js',
    'site/data/why-step-g10-coverage.js',
  ];
  for (const f of files) {
    const full = path.join(ROOT, f);
    if (!fs.existsSync(full)) continue;
    const sb = { window: {}, console };
    sb.window = sb;
    vm.createContext(sb);
    try {
      vm.runInContext(read(f), sb, { filename: f, timeout: 15000 });
      for (const k of Object.keys(sb.window)) {
        if (k.startsWith('TRIGGLE_WHY_STEP') && sb.window[k] && typeof sb.window[k] === 'object') {
          Object.assign(overlays, sb.window[k]);
        }
      }
    } catch (_) {
      // ignore non-matching overlay scripts
    }
  }
  return overlays;
}

function extractV15() {
  const rt = loadRuntime();
  const overlays = loadWhyStepOverlays();

  const g9All = (rt.classes && rt.classes[9] && rt.classes[9].items) || [];
  const g9Ch1All = g9All.filter(it => it && String(it.chapter) === '1');
  const g9Exercises = g9Ch1All.filter(exerciseItem).map(it => ({
    ...it,
    contentHash: sha16(it),
    whyOverlay: overlays[it.id] || null,
  }));
  const g9NonExercises = g9Ch1All.filter(it => !exerciseItem(it)).map(it => ({
    id: it.id,
    kind: it.kind || it.type || 'unknown',
    contentHash: sha16(it),
  }));

  const g9SetPath = loadWindowScript('site/data/set-language-path.js', 'TRIGGLE_SET_PATH');
  const g9Concepts = (g9SetPath && Array.isArray(g9SetPath.stages) ? g9SetPath.stages : []).map(st => ({
    ...st,
    contentHash: sha16(st),
  }));

  const g10All = (rt.classes && rt.classes[10] && rt.classes[10].items) || [];
  const g10Ch1All = g10All.filter(it => it && String(it.chapter) === '1');
  const g10Exercises = g10Ch1All.filter(exerciseItem).map(it => ({
    ...it,
    contentHash: sha16(it),
    whyOverlay: overlays[it.id] || null,
  }));
  const g10NonExercises = g10Ch1All.filter(it => !exerciseItem(it)).map(it => ({
    id: it.id,
    kind: it.kind || it.type || 'unknown',
    contentHash: sha16(it),
  }));

  const g10RelConceptsRaw = loadWindowScript('site/data/g10-relations-concepts.js', 'TRIGGLE_RELATIONS_LESSONS');
  const g10Concepts = (Array.isArray(g10RelConceptsRaw) ? g10RelConceptsRaw : []).map(c => ({
    ...c,
    contentHash: sha16(c),
  }));

  return {
    schemaVersion: 1,
    engine: 'TRACE MathGuard V1.5',
    grades: {
      '9': {
        chapter: '1',
        title: 'Set Language',
        exercises: g9Exercises,
        nonExercises: g9NonExercises,
        concepts: g9Concepts,
        counts: {
          totalRuntimeItems: g9Ch1All.length,
          exercises: g9Exercises.length,
          nonExercises: g9NonExercises.length,
          concepts: g9Concepts.length,
        },
      },
      '10': {
        chapter: '1',
        title: 'Relations and Functions',
        exercises: g10Exercises,
        nonExercises: g10NonExercises,
        concepts: g10Concepts,
        counts: {
          totalRuntimeItems: g10Ch1All.length,
          exercises: g10Exercises.length,
          nonExercises: g10NonExercises.length,
          concepts: g10Concepts.length,
        },
      },
    },
  };
}

if (require.main === module) {
  process.stdout.write(JSON.stringify(extractV15()));
}

module.exports = { extractV15 };
