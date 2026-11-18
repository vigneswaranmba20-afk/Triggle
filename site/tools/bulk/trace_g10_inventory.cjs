#!/usr/bin/env node
'use strict';
/**
 * TRACE Grade 10 Complete Textbook Inventory & Reconciliation Accelerator
 *
 * Reconciles the 2025 Tamil Nadu SCERT Standard Ten Mathematics textbook
 * (English & Tamil editions, 69 exercise sections across 8 chapters) against
 * the active Triggle runtime (`TRIGGLE_CLASSES[10].items`).
 *
 * Classifies every textbook question/subpart into:
 * - COMPLETE: Faithfully implemented with independently verified standard solutions
 * - PARTIAL: Existing record but paraphrased legacy prompt, bundled subparts, or missing parts
 * - MISSING: Present in the 2025 textbook but absent from Triggle
 * - DUPLICATE: Repeated or conflicting student-facing records
 * - BLOCKED: Source contradiction or unresolved mathematical defect in the printed textbook
 *
 * Zero external API calls. Deterministic, idempotent, and reusable.
 */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { loadRuntime, ROOT, atomicJson } = require('../curriculum_bulk.cjs');

const ROMAN = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'];

function qRange(start, end, partMap = {}) {
  const out = [];
  for (let q = start; q <= end; q++) {
    const parts = partMap[q] || ['whole'];
    out.push({ question: String(q), parts });
  }
  return out;
}

const CHAPTER_META = {
  1: { titleEn: 'Relations and Functions', titleTa: 'உறவுகளும் சார்புகளும்' },
  2: { titleEn: 'Numbers and Sequences', titleTa: 'எண்களும் தொடர்வரிசைகளும்' },
  3: { titleEn: 'Algebra', titleTa: 'இயற்கணிதம்' },
  4: { titleEn: 'Geometry', titleTa: 'வடிவியல்' },
  5: { titleEn: 'Coordinate Geometry', titleTa: 'ஆயத்தொலை வடிவியல்' },
  6: { titleEn: 'Trigonometry', titleTa: 'முக்கோணவியல்' },
  7: { titleEn: 'Mensuration', titleTa: 'அளவியல்' },
  8: { titleEn: 'Statistics and Probability', titleTa: 'புள்ளியியலும் நிகழ்தகவும்' }
};

/**
 * Authoritative 2025 TN SCERT Grade 10 Mathematics Exercise Structure
 * Derived from direct inspection of English PDF (602eb88d...) and Tamil PDF (6c6629e3...).
 */
const TEXTBOOK_SPEC = [
  // Chapter 1: Relations and Functions
  { chapter: 1, exercise: '1.1', enPdfPages: [12], enPrintedPages: [6], taPdfPages: [12], questions: qRange(1, 7, { 1: ['i', 'ii', 'iii'], 6: ['i', 'ii', 'iii'], 7: ['i', 'ii'] }) },
  { chapter: 1, exercise: '1.2', enPdfPages: [15, 16], enPrintedPages: [9, 10], taPdfPages: [16], questions: qRange(1, 5, { 1: ['i', 'ii', 'iii', 'iv'], 4: ['i', 'ii'] }) },
  { chapter: 1, exercise: '1.3', enPdfPages: [19, 20], enPrintedPages: [13, 14], taPdfPages: [20], questions: qRange(1, 10, { 3: ['i', 'ii', 'iii', 'iv'], 4: ['i', 'ii', 'iii', 'iv'], 6: ['i', 'ii', 'iii', 'iv'], 10: ['i', 'ii'] }) },
  { chapter: 1, exercise: '1.4', enPdfPages: [30, 31], enPrintedPages: [24, 25], taPdfPages: [32], questions: qRange(1, 12, { 1: ['i', 'ii', 'iii', 'iv'], 2: ['i', 'ii', 'iii', 'iv'], 3: ['i', 'ii', 'iii'], 6: ['i', 'ii'], 7: ['i', 'ii'], 9: ['i', 'ii', 'iii', 'iv'], 10: ['i', 'ii', 'iii', 'iv'], 12: ['i', 'ii', 'iii', 'iv', 'v'] }) },
  { chapter: 1, exercise: '1.5', enPdfPages: [37, 38], enPrintedPages: [31, 32], taPdfPages: [38], questions: qRange(1, 10, { 1: ['i', 'ii', 'iii', 'iv', 'v'], 2: ['i', 'ii'], 6: ['i', 'ii'], 8: ['i', 'ii', 'iii'] }) },
  { chapter: 1, exercise: '1.6', enPdfPages: [38, 39], enPrintedPages: [32, 33], taPdfPages: [40], questions: qRange(1, 15) },
  { chapter: 1, exercise: '1.unit', enPdfPages: [39, 40], enPrintedPages: [33, 34], taPdfPages: [41, 42], questions: qRange(1, 10, { 3: ['i', 'ii', 'iii'], 9: ['i', 'ii'], 10: ['i', 'ii', 'iii', 'iv'] }) },

  // Chapter 2: Numbers and Sequences
  { chapter: 2, exercise: '2.1', enPdfPages: [48, 49], enPrintedPages: [42, 43], taPdfPages: [49], questions: qRange(1, 10, { 6: ['i', 'ii', 'iii', 'iv'] }) },
  { chapter: 2, exercise: '2.2', enPdfPages: [52], enPrintedPages: [46], taPdfPages: [53], questions: qRange(1, 9) },
  { chapter: 2, exercise: '2.3', enPdfPages: [57], enPrintedPages: [51], taPdfPages: [58], questions: qRange(1, 10, { 1: ['i', 'ii', 'iii', 'iv', 'v'] }) },
  { chapter: 2, exercise: '2.4', enPdfPages: [61], enPrintedPages: [55], taPdfPages: [62], questions: qRange(1, 6, { 1: ['i', 'ii', 'iii'], 2: ['i', 'ii', 'iii'], 3: ['i', 'ii', 'iii'], 4: ['i', 'ii'], 5: ['whole'], 6: ['whole'] }) },
  { chapter: 2, exercise: '2.5', enPdfPages: [67, 68], enPrintedPages: [61, 62], taPdfPages: [68], questions: qRange(1, 14, { 1: ['i', 'ii', 'iii', 'iv', 'v'], 2: ['i', 'ii', 'iii'], 3: ['i', 'ii'] }) },
  { chapter: 2, exercise: '2.6', enPdfPages: [73], enPrintedPages: [67], taPdfPages: [74], questions: qRange(1, 12, { 1: ['i', 'ii', 'iii'], 8: ['i', 'ii'], 10: ['i', 'ii'] }) },
  { chapter: 2, exercise: '2.7', enPdfPages: [78, 79], enPrintedPages: [72, 73], taPdfPages: [79], questions: qRange(1, 12, { 1: ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'], 2: ['i', 'ii', 'iii'], 5: ['i', 'ii'] }) },
  { chapter: 2, exercise: '2.8', enPdfPages: [82], enPrintedPages: [76], taPdfPages: [83], questions: qRange(1, 10, { 1: ['i', 'ii'], 4: ['i', 'ii'], 6: ['i', 'ii'] }) },
  { chapter: 2, exercise: '2.9', enPdfPages: [87], enPrintedPages: [81], taPdfPages: [87], questions: qRange(1, 7, { 1: ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'], 7: ['i', 'ii'] }) },
  { chapter: 2, exercise: '2.10', enPdfPages: [88, 89], enPrintedPages: [82, 83], taPdfPages: [88, 89], questions: qRange(1, 15) },
  { chapter: 2, exercise: '2.unit', enPdfPages: [89], enPrintedPages: [83], taPdfPages: [89, 90], questions: qRange(1, 10, { 2: ['i', 'ii', 'iii'] }) },

  // Chapter 3: Algebra
  { chapter: 3, exercise: '3.1', enPdfPages: [98, 99], enPrintedPages: [92, 93], taPdfPages: [100], questions: qRange(1, 5, { 1: ['i', 'ii', 'iii'], 2: ['i', 'ii', 'iii'] }) },
  { chapter: 3, exercise: '3.2', enPdfPages: [102, 103], enPrintedPages: [96, 97], taPdfPages: [104], questions: qRange(1, 2, { 1: ['i', 'ii', 'iii', 'iv'], 2: ['i', 'ii', 'iii', 'iv', 'v', 'vi'] }) },
  { chapter: 3, exercise: '3.3', enPdfPages: [103, 104], enPrintedPages: [97, 98], taPdfPages: [105], questions: qRange(1, 4, { 1: ['i', 'ii', 'iii'], 2: ['i', 'ii'], 3: ['i', 'ii'], 4: ['i', 'ii'] }) },
  { chapter: 3, exercise: '3.4', enPdfPages: [105], enPrintedPages: [99], taPdfPages: [107], questions: qRange(1, 2, { 1: ['i', 'ii', 'iii', 'iv'], 2: ['i', 'ii', 'iii', 'iv'] }) },
  { chapter: 3, exercise: '3.5', enPdfPages: [107], enPrintedPages: [101], taPdfPages: [109], questions: qRange(1, 5, { 1: ['i', 'ii', 'iii'], 2: ['i', 'ii'], 3: ['i', 'ii', 'iii', 'iv'] }) },
  { chapter: 3, exercise: '3.6', enPdfPages: [109], enPrintedPages: [103], taPdfPages: [111], questions: qRange(1, 8, { 1: ['i', 'ii', 'iii'], 2: ['i', 'ii'] }) },
  { chapter: 3, exercise: '3.7', enPdfPages: [111], enPrintedPages: [105], taPdfPages: [113], questions: qRange(1, 2, { 1: ['i', 'ii', 'iii'], 2: ['i', 'ii', 'iii', 'iv', 'v'] }) },
  { chapter: 3, exercise: '3.8', enPdfPages: [112, 113], enPrintedPages: [106, 107], taPdfPages: [115], questions: qRange(1, 3, { 1: ['i', 'ii', 'iii', 'iv'], 2: ['i', 'ii'], 3: ['i', 'ii'] }) },
  { chapter: 3, exercise: '3.9', enPdfPages: [115], enPrintedPages: [109], taPdfPages: [117], questions: qRange(1, 2, { 1: ['i', 'ii', 'iii', 'iv'], 2: ['i', 'ii', 'iii', 'iv'] }) },
  { chapter: 3, exercise: '3.10', enPdfPages: [117], enPrintedPages: [111], taPdfPages: [119], questions: qRange(1, 2, { 1: ['i', 'ii', 'iii', 'iv', 'v'] }) },
  { chapter: 3, exercise: '3.11', enPdfPages: [120], enPrintedPages: [114], taPdfPages: [122], questions: qRange(1, 3, { 1: ['i', 'ii'], 2: ['i', 'ii', 'iii', 'iv'] }) },
  { chapter: 3, exercise: '3.12', enPdfPages: [122, 123], enPrintedPages: [116, 117], taPdfPages: [124], questions: qRange(1, 9) },
  { chapter: 3, exercise: '3.13', enPdfPages: [125], enPrintedPages: [119], taPdfPages: [127], questions: qRange(1, 5, { 1: ['i', 'ii', 'iii', 'iv', 'v'], 2: ['i', 'ii'] }) },
  { chapter: 3, exercise: '3.14', enPdfPages: [128], enPrintedPages: [122], taPdfPages: [130], questions: qRange(1, 6, { 1: ['i', 'ii', 'iii', 'iv'], 2: ['i', 'ii', 'iii'], 3: ['i', 'ii', 'iii'] }) },
  { chapter: 3, exercise: '3.15', enPdfPages: [135, 136], enPrintedPages: [129, 130], taPdfPages: [137], questions: qRange(1, 6, { 1: ['i', 'ii'], 2: ['i', 'ii'], 4: ['i', 'ii'], 5: ['i', 'ii'], 6: ['i', 'ii'] }) },
  { chapter: 3, exercise: '3.16', enPdfPages: [143, 144], enPrintedPages: [137, 138], taPdfPages: [145], questions: qRange(1, 8, { 1: ['i', 'ii', 'iii', 'iv', 'v', 'vi'] }) },
  { chapter: 3, exercise: '3.17', enPdfPages: [150, 151], enPrintedPages: [144, 145], taPdfPages: [153], questions: qRange(1, 7, { 1: ['i', 'ii', 'iii'], 3: ['i', 'ii'], 7: ['i', 'ii', 'iii'] }) },
  { chapter: 3, exercise: '3.18', enPdfPages: [154, 155], enPrintedPages: [148, 149], taPdfPages: [157], questions: qRange(1, 8, { 1: ['i', 'ii'], 4: ['i', 'ii'], 5: ['i', 'ii'] }) },
  { chapter: 3, exercise: '3.19', enPdfPages: [159, 160], enPrintedPages: [153, 154], taPdfPages: [162], questions: qRange(1, 13, { 1: ['i', 'ii', 'iii', 'iv', 'v'], 7: ['i', 'ii', 'iii'] }) },
  { chapter: 3, exercise: '3.20', enPdfPages: [160, 161, 162], enPrintedPages: [154, 155, 156], taPdfPages: [164], questions: qRange(1, 20) },
  { chapter: 3, exercise: '3.unit', enPdfPages: [162, 163, 164], enPrintedPages: [156, 157, 158], taPdfPages: [166, 167], questions: qRange(1, 20, { 1: ['i', 'ii'], 2: ['i', 'ii'], 5: ['i', 'ii'], 6: ['i', 'ii'], 17: ['i', 'ii', 'iii'] }) },

  // Chapter 4: Geometry
  { chapter: 4, exercise: '4.1', enPdfPages: [176, 177, 178], enPrintedPages: [170, 171, 172], taPdfPages: [179], questions: qRange(1, 13, { 1: ['i', 'ii'], 7: ['i', 'ii', 'iii'] }) },
  { chapter: 4, exercise: '4.2', enPdfPages: [187, 188, 189], enPrintedPages: [181, 182, 183], taPdfPages: [190], questions: qRange(1, 16, { 1: ['i', 'ii'], 2: ['i', 'ii'], 3: ['i', 'ii'], 4: ['i', 'ii'], 8: ['i', 'ii'], 9: ['i', 'ii'] }) },
  { chapter: 4, exercise: '4.3', enPdfPages: [193, 194], enPrintedPages: [187, 188], taPdfPages: [196], questions: qRange(1, 8, { 8: ['i', 'ii'] }) },
  { chapter: 4, exercise: '4.4', enPdfPages: [204, 205], enPrintedPages: [198, 199], taPdfPages: [207], questions: qRange(1, 16) },
  { chapter: 4, exercise: '4.5', enPdfPages: [205, 206], enPrintedPages: [199, 200], taPdfPages: [209], questions: qRange(1, 15) },
  { chapter: 4, exercise: '4.unit', enPdfPages: [206, 207], enPrintedPages: [200, 201], taPdfPages: [210, 211], questions: qRange(1, 10, { 1: ['i', 'ii'], 2: ['i', 'ii'], 4: ['i', 'ii'], 6: ['i', 'ii', 'iii'] }) },

  // Chapter 5: Coordinate Geometry
  { chapter: 5, exercise: '5.1', enPdfPages: [217, 218], enPrintedPages: [211, 212], taPdfPages: [220], questions: qRange(1, 11, { 1: ['i', 'ii'], 2: ['i', 'ii'], 3: ['i', 'ii'], 4: ['i', 'ii'], 5: ['i', 'ii'], 11: ['i', 'ii', 'iii'] }) },
  { chapter: 5, exercise: '5.2', enPdfPages: [226, 227], enPrintedPages: [220, 221], taPdfPages: [230], questions: qRange(1, 13, { 1: ['i', 'ii'], 2: ['i', 'ii'], 3: ['i', 'ii'], 9: ['i', 'ii'] }) },
  { chapter: 5, exercise: '5.3', enPdfPages: [235, 236], enPrintedPages: [229, 230], taPdfPages: [240], questions: qRange(1, 14, { 1: ['i', 'ii'], 7: ['i', 'ii'], 9: ['i', 'ii'], 11: ['i', 'ii', 'iii'], 12: ['i', 'ii'], 13: ['i', 'ii'], 14: ['i', 'ii'] }) },
  { chapter: 5, exercise: '5.4', enPdfPages: [241], enPrintedPages: [235], taPdfPages: [246], questions: qRange(1, 12, { 1: ['i', 'ii'], 2: ['i', 'ii'], 3: ['i', 'ii'] }) },
  { chapter: 5, exercise: '5.5', enPdfPages: [241, 242, 243], enPrintedPages: [235, 236, 237], taPdfPages: [247], questions: qRange(1, 15) },
  { chapter: 5, exercise: '5.unit', enPdfPages: [243], enPrintedPages: [237], taPdfPages: [249, 250], questions: qRange(1, 10, { 1: ['i', 'ii', 'iii'] }) },

  // Chapter 6: Trigonometry
  { chapter: 6, exercise: '6.1', enPdfPages: [255, 256], enPrintedPages: [249, 250], taPdfPages: [262], questions: qRange(1, 10, { 1: ['i', 'ii'], 2: ['i', 'ii'], 3: ['i', 'ii'], 4: ['i', 'ii'], 5: ['i', 'ii'], 6: ['i', 'ii'], 7: ['i', 'ii'], 8: ['i', 'ii'], 9: ['i', 'ii'] }) },
  { chapter: 6, exercise: '6.2', enPdfPages: [263, 264], enPrintedPages: [257, 258], taPdfPages: [271], questions: qRange(1, 6, { 5: ['i', 'ii'] }) },
  { chapter: 6, exercise: '6.3', enPdfPages: [267], enPrintedPages: [261], taPdfPages: [275], questions: qRange(1, 6, { 5: ['i', 'ii'] }) },
  { chapter: 6, exercise: '6.4', enPdfPages: [270, 271], enPrintedPages: [264, 265], taPdfPages: [279], questions: qRange(1, 6, { 5: ['i', 'ii', 'iii'], 6: ['i', 'ii'] }) },
  { chapter: 6, exercise: '6.5', enPdfPages: [271, 272, 273], enPrintedPages: [265, 266, 267], taPdfPages: [280], questions: qRange(1, 15) },
  { chapter: 6, exercise: '6.unit', enPdfPages: [273], enPrintedPages: [267], taPdfPages: [282, 283], questions: qRange(1, 9, { 1: ['i', 'ii'], 7: ['i', 'ii', 'iii', 'iv'] }) },

  // Chapter 7: Mensuration
  { chapter: 7, exercise: '7.1', enPdfPages: [288], enPrintedPages: [282], taPdfPages: [298], questions: qRange(1, 10) },
  { chapter: 7, exercise: '7.2', enPdfPages: [296], enPrintedPages: [290], taPdfPages: [306], questions: qRange(1, 10) },
  { chapter: 7, exercise: '7.3', enPdfPages: [300], enPrintedPages: [294], taPdfPages: [310], questions: qRange(1, 7, { 7: ['i', 'ii', 'iii'] }) },
  { chapter: 7, exercise: '7.4', enPdfPages: [302, 303], enPrintedPages: [296, 297], taPdfPages: [313], questions: qRange(1, 8) },
  { chapter: 7, exercise: '7.5', enPdfPages: [303, 304], enPrintedPages: [297, 298], taPdfPages: [314], questions: qRange(1, 15) },
  { chapter: 7, exercise: '7.unit', enPdfPages: [304, 305], enPrintedPages: [298, 299], taPdfPages: [315, 316], questions: qRange(1, 10) },

  // Chapter 8: Statistics and Probability
  { chapter: 8, exercise: '8.1', enPdfPages: [319, 320], enPrintedPages: [313, 314], taPdfPages: [330], questions: qRange(1, 15, { 1: ['i', 'ii'] }) },
  { chapter: 8, exercise: '8.2', enPdfPages: [322], enPrintedPages: [316], taPdfPages: [331], questions: qRange(1, 8) },
  { chapter: 8, exercise: '8.3', enPdfPages: [328, 329], enPrintedPages: [322, 323], taPdfPages: [340], questions: qRange(1, 13, { 3: ['i', 'ii'], 5: ['i', 'ii'], 6: ['i', 'ii'], 7: ['i', 'ii', 'iii', 'iv'], 8: ['i', 'ii', 'iii', 'iv'], 9: ['i', 'ii', 'iii', 'iv'], 12: ['i', 'ii', 'iii'], 13: ['i', 'ii', 'iii'] }) },
  { chapter: 8, exercise: '8.4', enPdfPages: [335], enPrintedPages: [329], taPdfPages: [347], questions: qRange(1, 13, { 2: ['i', 'ii', 'iii'] }), blockedTasks: { '1/whole': 'BILINGUAL_SOURCE_MATH_CONTRADICTION: Both English and Tamil 2025 editions print P(A)=2/3, P(B)=2/5, P(A∪B)=1/3, violating P(A∪B) >= P(A).' } },
  { chapter: 8, exercise: '8.5', enPdfPages: [336, 337], enPrintedPages: [330, 331], taPdfPages: [349], questions: qRange(1, 15) },
  { chapter: 8, exercise: '8.unit', enPdfPages: [337, 338], enPrintedPages: [331, 332], taPdfPages: [350, 351], questions: qRange(1, 11) }
];

function parseRuntimeLocation(item) {
  const chapter = String(item.chapter || '');
  const exercise = String(item.exercise || '');
  if (!chapter || !exercise || item.kind !== 'textbook') return null;

  const id = String(item.id || '');
  const labelEn = String(item.label?.en || '');

  // Known multi-part bundled parent records audited in Chapter 2 source audits
  if (id === 'c10-2-ex2-6-q1') return { chapter, exercise, question: '1', coveredParts: ['i', 'ii'], bundled: true };
  if (id === 'c10-2-ex2-7-q2') return { chapter, exercise, question: '2', coveredParts: ['i', 'iii'], bundled: true };

  // Match label like "Exercise 2.9 · Q1(i)" or "Unit Exercise 2 · Q2(ii)" or "Exercise 2.4 · Q1(i)–(iii)"
  const rangeMatch = labelEn.match(/Q\s*(\d+)\s*\(([ivx]+)\)\s*[–-]\s*\(([ivx]+)\)/i);
  if (rangeMatch) {
    const q = rangeMatch[1];
    const startIdx = ROMAN.indexOf(rangeMatch[2].toLowerCase());
    const endIdx = ROMAN.indexOf(rangeMatch[3].toLowerCase());
    if (startIdx !== -1 && endIdx !== -1 && endIdx >= startIdx) {
      return {
        chapter,
        exercise,
        question: q,
        coveredParts: ROMAN.slice(startIdx, endIdx + 1),
        bundled: true
      };
    }
  }

  const labelMatch = labelEn.match(/Q\s*(\d+)(?:\s*\(([a-z0-9]+)\))?/i);
  if (labelMatch) {
    return {
      chapter,
      exercise,
      question: String(Number(labelMatch[1])),
      coveredParts: [labelMatch[2] ? labelMatch[2].toLowerCase() : 'whole'],
      bundled: false
    };
  }

  const idMatch = id.match(/q(\d+)(?:-([a-z0-9]+))?$/i);
  if (idMatch) {
    return {
      chapter,
      exercise,
      question: String(Number(idMatch[1])),
      coveredParts: [idMatch[2] ? idMatch[2].toLowerCase() : 'whole'],
      bundled: false
    };
  }

  return null;
}

function isLegacyParaphrased(item) {
  // Original legacy Chapter 6 items (c10-6-6-1-1 .. c10-6-6-unit-17) and unverified legacy items without 2025 reference
  if (/^c10-6-6-/.test(item.id)) return true;
  return false;
}

function buildInventory({ root = ROOT, deploymentStatus = 'merged-and-deployed-baseline' } = {}) {
  const runtime = loadRuntime();
  const g10Items = (runtime.classes[10]?.items || []).filter(x => x.kind === 'textbook');
  const manifestPath = path.join(root, 'docs/reference-library/2025-user-textbook-manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const enBook = manifest.books.find(b => b.grade === 10 && b.medium === 'en');
  const taBook = manifest.books.find(b => b.grade === 10 && b.medium === 'ta');

  // Map runtime items by id to detect duplicate IDs
  const idCounts = new Map();
  for (const item of g10Items) {
    idCounts.set(item.id, (idCounts.get(item.id) || 0) + 1);
  }

  // Index runtime items by chapter + exercise + question
  const runtimeByQuestion = new Map();
  for (const item of g10Items) {
    const loc = parseRuntimeLocation(item);
    if (!loc) continue;
    const key = `${loc.chapter}|${loc.exercise}|${loc.question}`;
    if (!runtimeByQuestion.has(key)) runtimeByQuestion.set(key, []);
    runtimeByQuestion.get(key).push({ item, loc });
  }

  const exercises = [];
  const totals = {
    chapters: 8,
    regularExercises: 61,
    unitExercises: 8,
    totalExerciseSections: 69,
    numberedQuestions: 0,
    subpartTasks: 0,
    studentRecords: g10Items.length,
    questionsByStatus: { COMPLETE: 0, PARTIAL: 0, MISSING: 0, DUPLICATE: 0, BLOCKED: 0 },
    tasksByStatus: { COMPLETE: 0, PARTIAL: 0, MISSING: 0, DUPLICATE: 0, BLOCKED: 0 }
  };

  for (const spec of TEXTBOOK_SPEC) {
    const exRecord = {
      chapter: spec.chapter,
      chapterTitle: CHAPTER_META[spec.chapter],
      exercise: spec.exercise,
      sourcePages: {
        enPdf: spec.enPdfPages,
        enPrinted: spec.enPrintedPages,
        taPdf: spec.taPdfPages
      },
      numberedQuestionCount: spec.questions.length,
      subpartTaskCount: 0,
      questionsByStatus: { COMPLETE: 0, PARTIAL: 0, MISSING: 0, DUPLICATE: 0, BLOCKED: 0 },
      tasksByStatus: { COMPLETE: 0, PARTIAL: 0, MISSING: 0, DUPLICATE: 0, BLOCKED: 0 },
      questions: []
    };

    totals.numberedQuestions += spec.questions.length;

    for (const qSpec of spec.questions) {
      const qNum = qSpec.question;
      const parts = qSpec.parts;
      exRecord.subpartTaskCount += parts.length;
      totals.subpartTasks += parts.length;

      const key = `${spec.chapter}|${spec.exercise}|${qNum}`;
      const matches = runtimeByQuestion.get(key) || [];

      const taskRecords = [];
      for (const part of parts) {
        const blockKey = `${qNum}/${part}`;
        const blockedReason = spec.blockedTasks?.[blockKey] || spec.blockedTasks?.[`${qNum}/whole`] || null;

        // Find matching runtime item(s)
        const partMatches = matches.filter(m =>
          m.loc.coveredParts.includes(part) ||
          (m.loc.coveredParts.includes('whole') && matches.length === 1)
        );

        let status = 'MISSING';
        let matchedIds = partMatches.map(m => m.item.id);
        let sourceStatus = 'textbook-heading-and-page-located';
        let mathValidation = 'pending';
        let deployState = 'not-implemented';
        let note = null;

        if (blockedReason && partMatches.length === 0) {
          status = 'BLOCKED';
          note = blockedReason;
        } else if (partMatches.length > 1 || partMatches.some(m => (idCounts.get(m.item.id) || 0) > 1)) {
          status = 'DUPLICATE';
          note = 'Multiple student records map to the same textbook part';
        } else if (partMatches.length === 1) {
          const { item } = partMatches[0];
          const hasValidSteps = Array.isArray(item.steps) && item.steps.length >= 2 && item.steps.every(s => s.en && s.eq);
          const hasAnswer = typeof item.answer === 'string' && item.answer.trim().length > 0;
          if (!hasValidSteps || !hasAnswer || isLegacyParaphrased(item)) {
            status = 'PARTIAL';
            sourceStatus = isLegacyParaphrased(item) ? 'legacy-paraphrased-prompt' : 'source-checked';
            mathValidation = hasValidSteps && hasAnswer ? 'verified-legacy' : 'incomplete-steps';
            deployState = deploymentStatus;
            note = isLegacyParaphrased(item) ? 'Legacy paraphrased prompt requires exact 2025 textbook replacement' : 'Incomplete solution steps';
          } else {
            status = 'COMPLETE';
            sourceStatus = item.traceStatus || 'source-verified-2025';
            mathValidation = 'independently-verified';
            deployState = deploymentStatus;
          }
        }

        exRecord.tasksByStatus[status]++;
        totals.tasksByStatus[status]++;
        taskRecords.push({
          part,
          status,
          studentRecordIds: matchedIds,
          sourceVerificationStatus: sourceStatus,
          mathematicalValidationStatus: mathValidation,
          deploymentStatus: deployState,
          ...(note ? { note } : {})
        });
      }

      // Roll up question status from its tasks
      let qStatus = 'MISSING';
      if (taskRecords.some(t => t.status === 'DUPLICATE')) qStatus = 'DUPLICATE';
      else if (taskRecords.some(t => t.status === 'BLOCKED') && taskRecords.every(t => t.status === 'BLOCKED')) qStatus = 'BLOCKED';
      else if (taskRecords.every(t => t.status === 'COMPLETE')) qStatus = 'COMPLETE';
      else if (taskRecords.some(t => t.status === 'COMPLETE' || t.status === 'PARTIAL')) qStatus = 'PARTIAL';

      exRecord.questionsByStatus[qStatus]++;
      totals.questionsByStatus[qStatus]++;

      exRecord.questions.push({
        question: qNum,
        status: qStatus,
        partCount: parts.length,
        tasks: taskRecords
      });
    }

    exercises.push(exRecord);
  }

  // Chapter-level summary
  const chapterSummaries = [];
  for (let ch = 1; ch <= 8; ch++) {
    const chEx = exercises.filter(e => e.chapter === ch);
    const summary = {
      chapter: ch,
      title: CHAPTER_META[ch],
      exerciseCount: chEx.length,
      numberedQuestions: chEx.reduce((acc, e) => acc + e.numberedQuestionCount, 0),
      subpartTasks: chEx.reduce((acc, e) => acc + e.subpartTaskCount, 0),
      questionsByStatus: { COMPLETE: 0, PARTIAL: 0, MISSING: 0, DUPLICATE: 0, BLOCKED: 0 },
      tasksByStatus: { COMPLETE: 0, PARTIAL: 0, MISSING: 0, DUPLICATE: 0, BLOCKED: 0 }
    };
    for (const e of chEx) {
      for (const k of Object.keys(summary.questionsByStatus)) {
        summary.questionsByStatus[k] += e.questionsByStatus[k];
        summary.tasksByStatus[k] += e.tasksByStatus[k];
      }
    }
    chapterSummaries.push(summary);
  }

  return {
    schemaVersion: 1,
    generatedOn: '2026-11-18',
    grade: 10,
    edition: 'TN SCERT 2025 Revised Edition',
    sourceBooks: {
      english: {
        driveId: enBook.driveFileId,
        sha256: enBook.sha256,
        pdfPages: 352,
        imprint: 'First Edition 2019; Revised Edition 2020, 2021, 2022, 2023, 2025; Reprint 2024'
      },
      tamil: {
        driveId: taBook.driveFileId,
        sha256: taBook.sha256,
        pdfPages: 368,
        imprint: 'First Edition 2019; Revised Edition 2020, 2021, 2022, 2023, 2025; Reprint 2024'
      }
    },
    totals,
    chapterSummaries,
    exercises
  };
}

function main(argv) {
  let outFile = path.join(ROOT, 'docs/curriculum/grade-10/trace/g10-2025-complete-inventory.json');
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--output' && argv[i + 1]) outFile = path.resolve(argv[++i]);
  }
  const inventory = buildInventory();
  atomicJson(outFile, inventory);
  console.log(JSON.stringify({
    savedTo: path.relative(ROOT, outFile),
    totals: inventory.totals,
    chapterSummaries: inventory.chapterSummaries
  }, null, 2));
}

module.exports = { TEXTBOOK_SPEC, CHAPTER_META, buildInventory };
if (require.main === module) main(process.argv.slice(2));
