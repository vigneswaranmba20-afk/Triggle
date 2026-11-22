'use strict';
/**
 * VER Triggle — MISSION AF-01
 * Deterministic Audit Intelligence, Idempotent Ingestion & 8-Dimension Quality Scorecard
 * Usage:
 *   node site/tools/audit_af01.cjs [--check] [--json] [--ingest <findings.json>]
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const repoRoot = path.resolve(__dirname, '../..');
const siteRoot = path.join(repoRoot, 'site');
const inventoryPath = path.join(repoRoot, 'docs/audit/mission-af01-inventory.json');
const preservedPath = path.join(repoRoot, 'docs/standard-solution-preservation.json');

const WEIGHTS = Object.freeze({
  mathCorrectness: 0.30,
  beginnerComprehension: 0.20,
  mobileUsability: 0.15,
  mathNotation: 0.10,
  cognitiveDesign: 0.10,
  accessibility: 0.05,
  technicalStability: 0.05,
  bilingualConsistency: 0.05
});

const VALID_STATUSES = new Set(['NEW', 'CONFIRMED', 'FIXING', 'TESTING', 'VERIFIED', 'BLOCKED', 'CLOSED']);

function readSite(rel) {
  return fs.readFileSync(path.join(siteRoot, rel), 'utf8');
}

function loadInventory() {
  const inv = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));
  assert.equal(inv.schemaVersion, 1, 'Unsupported inventory schemaVersion');
  assert.ok(inv.checkpoint && inv.checkpoint.baselineCommit, 'Missing checkpoint.baselineCommit');
  assert.ok(Array.isArray(inv.findings), 'Missing findings array');

  const ids = new Set();
  const sigs = new Set();
  for (const f of inv.findings) {
    for (const k of ['id', 'signature', 'grade', 'chapter', 'page', 'component', 'description', 'expectedBehavior', 'actualBehavior', 'proposedRemediation', 'status', 'relatedCommitOrPr']) {
      assert.ok(f[k] !== undefined && f[k] !== null && String(f[k]).trim() !== '', `Finding missing field "${k}": ${f.id || 'unknown'}`);
    }
    assert.ok(Array.isArray(f.reproductionSteps) && f.reproductionSteps.length > 0, `Finding missing reproductionSteps: ${f.id}`);
    assert.ok(VALID_STATUSES.has(f.status), `Invalid status "${f.status}" on ${f.id}`);
    assert.ok(!ids.has(f.id), `Duplicate finding id: ${f.id}`);
    assert.ok(!sigs.has(f.signature), `Duplicate finding signature: ${f.signature}`);
    ids.add(f.id);
    sigs.add(f.signature);
    const expectedPriority = f.studentImpact * f.severity * f.frequency * f.confidence;
    assert.equal(f.priorityScore, expectedPriority, `Priority mismatch on ${f.id}`);
  }
  for (const ext of inv.externalAuditDeduplication || []) {
    assert.ok(!sigs.has(ext.signature), `External audit signature collided with internal finding: ${ext.signature}`);
    sigs.add(ext.signature);
  }
  return inv;
}

function ingestExternalFindings(inv, ingestFile) {
  const incoming = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), ingestFile), 'utf8'));
  const list = Array.isArray(incoming) ? incoming : (incoming.findings || []);
  const sigSet = new Set([
    ...inv.findings.map(f => f.signature),
    ...(inv.externalAuditDeduplication || []).map(e => e.signature)
  ]);
  const idSet = new Set(inv.findings.map(f => f.id));
  let added = 0;
  let skippedDuplicates = 0;
  for (const raw of list) {
    const sig = raw.signature || `${raw.source || 'neon'}:${raw.grade || 'na'}:${raw.chapter || 'na'}:${(raw.component || raw.id || '').toLowerCase()}`;
    if (sigSet.has(sig) || (raw.id && idSet.has(raw.id))) {
      skippedDuplicates++;
      continue;
    }
    const nextNum = inv.findings.length + 1;
    const id = raw.id || `AF01-${String(nextNum).padStart(2, '0')}`;
    const sev = Number(raw.severity) || 3;
    const imp = Number(raw.studentImpact) || 3;
    const freq = Number(raw.frequency) || 3;
    const conf = Number(raw.confidence) || 3;
    inv.findings.push({
      id,
      signature: sig,
      grade: raw.grade ?? '9-10',
      chapter: raw.chapter ?? 'shared',
      page: raw.page || 'site/index.html',
      component: raw.component || 'unspecified',
      description: raw.description || 'Ingested finding',
      reproductionSteps: Array.isArray(raw.reproductionSteps) && raw.reproductionSteps.length ? raw.reproductionSteps : ['See ingested audit report.'],
      expectedBehavior: raw.expectedBehavior || 'Matches Triggle quality gate.',
      actualBehavior: raw.actualBehavior || 'Reported by automated ingestion.',
      severity: sev,
      studentImpact: imp,
      frequency: freq,
      confidence: conf,
      priorityScore: imp * sev * freq * conf,
      evidence: raw.evidence || {},
      proposedRemediation: raw.proposedRemediation || 'Triage against active codebase.',
      status: 'NEW',
      relatedCommitOrPr: raw.relatedCommitOrPr || 'pending-triage'
    });
    sigSet.add(sig);
    idSet.add(id);
    added++;
  }
  inv.checkpoint.idempotentRunCount = (inv.checkpoint.idempotentRunCount || 0) + 1;
  inv.checkpoint.lastAuditTimestampUtc = new Date().toISOString();
  fs.writeFileSync(inventoryPath, JSON.stringify(inv, null, 2) + '\n', 'utf8');
  return { added, skippedDuplicates };
}

function loadRuntimeContext() {
  const html = readSite('index.html');
  const ctx = { window: {}, console };
  vm.createContext(ctx);
  for (const m of html.matchAll(/<script(?: defer)? src="\.\/(data\/[^?"]+)[^"]*"/g)) {
    vm.runInNewContext(readSite(m[1]), ctx, { filename: m[1] });
  }
  return ctx.window;
}

function checkStaticControls() {
  const html = readSite('index.html');
  const appJs = readSite('assets/app.js');
  const appCss = readSite('assets/app.css');
  const livingCss = readSite('assets/living-concepts.css');
  const bondCss = readSite('assets/bond-light.css');
  const ch5Js = readSite('assets/g10-ch5-concepts.js');
  const class9Html = readSite('class9-classic.html');
  const playgroundHtml = readSite('playground.html');
  const sw = readSite('service-worker.js');

  const goldHiddenMatches = html.match(/<span class="gold" aria-hidden="true">\.<\/span>/g) || [];
  const checks = {
    af01OverlayLoadedBeforeApp: html.includes('data/math-layout/g10-ch2-fractions-20261120.js') &&
      html.indexOf('data/math-layout/g10-ch2-fractions-20261120.js') < html.indexOf('assets/app.js'),
    af01OverlayOfflineCached: sw.includes('./data/math-layout/g10-ch2-fractions-20261120.js'),
    af02LangSwitchMinTarget: /@media\(max-width:430px\)[\s\S]*?\.lang-switch button\{[^}]*min-width:\s*28px[^}]*min-height:\s*34px/.test(appCss),
    af03PitfallSummaryMinTarget: /\.chapter-hub \.rnlab-pitfall summary\{[^}]*min-height:\s*45px/.test(livingCss),
    af04BondMutedContrastSelectors: /\.page-status,\s*\.crumb-link span,\s*\.hub-section-arrow\s*\{\s*color:\s*var\(--bond-muted\)\s*;\s*\}/.test(bondCss) && bondCss.includes('#525B62'),
    af06Ch5ResetTaFixed: !ch5Js.includes('உதாரணம் (2,4),(8,10) அளவில்') && ch5Js.includes('மீட்டமை A(−4,−1), B(4,3)') && ch5Js.includes("'3-4-5 செங்கோண கட்டம்'"),
    af01OverlayWiredInApp: appJs.includes('TriggleG10Ch2FractionMath?.getStep') && appJs.includes('TriggleG10Ch2FractionMath?.getAnswer'),
    af07AppGeometryGuardsAllHooks: /if\(!s\.math&&!isGeometryExercise\(current\)\)[\s\S]{0,120}TriggleG10RemainingMath\?\.getStep/.test(appJs) &&
      appJs.includes('!isGeometryExercise(current)&&window.TriggleG10RemainingMath?.getAnswer') &&
      appJs.includes('!isGeometryExercise(current)&&window.TriggleG10RemainingMath?.getQuestion'),
    af09BrandGoldDotsHidden: goldHiddenMatches.length >= 2 && !/<span class="gold">\.<\/span>/.test(html)
  };
  void class9Html;
  void playgroundHtml;
  return checks;
}

function buildChapterScorecards(win, staticChecks) {
  const preserved = JSON.parse(fs.readFileSync(preservedPath, 'utf8'));
  const katex = require('../assets/vendor/katex/katex.min.js');
  const notationCtx = { window: { katex } };
  vm.runInNewContext(readSite('assets/math-notation.js'), notationCtx);
  const renderMath = notationCtx.window.TriggleNotation.render;

  const { TriggleChapter1Math: ch1, TriggleG10RemainingMath: rem, TriggleG10Ch2FractionMath: g10Frac, TriggleG9Math: g9m, TriggleWhyStepG9, TriggleWhyStepG10 } = win;

  const conceptPaths = new Map([
    ['9:1', win.TRIGGLE_SET_PATH],
    ['9:2', win.TRIGGLE_REAL_PATH],
    ['9:9', win.TRIGGLE_PROB_PATH],
    ['10:2', win.TRIGGLE_G10_CH2_PATH],
    ['10:3', win.TRIGGLE_G10_CH3_PATH],
    ['10:4', win.TRIGGLE_G10_CH4_PATH],
    ['10:5', win.TRIGGLE_G10_CH5_PATH],
    ['10:6', win.TRIGGLE_G10_CH6_PATH]
  ]);

  let totalG10RemainingSlash = 0;
  let totalG9RemainingSlash = 0;
  let totalKaTeXErrors = 0;
  let totalBrokenWhy = 0;
  let totalConceptIssues = 0;

  const chapterCards = [];

  for (const grade of [9, 10]) {
    const items = (win.TRIGGLE_CLASSES?.[grade]?.items || []).filter(x => x.kind !== 'textbook-example');
    const byCh = new Map();
    for (const it of items) {
      const ch = String(it.chapter);
      if (!byCh.has(ch)) byCh.set(ch, []);
      byCh.get(ch).push(it);
    }
    const chapters = Array.from(byCh.keys()).sort((a, b) => Number(a) - Number(b));
    const whyHints = grade === 9 ? TriggleWhyStepG9?.hints : TriggleWhyStepG10?.hints;

    for (const ch of chapters) {
      const list = byCh.get(ch);
      let emptyAns = 0, emptyStep = 0, katexErr = 0, slashUnconverted = 0, shortReason = 0, whyErr = 0, hasTaQ = 0;

      for (const it of list) {
        if (!it.answer || (typeof it.answer === 'object' && !it.answer.en)) emptyAns++;
        if (it.q?.ta) hasTaQ++;
        const geom = grade === 10 && ch === '4';

        const steps = it.steps || [];
        if (steps.length === 0) emptyStep++;

        for (let i = 0; i < steps.length; i++) {
          const s = steps[i];
          const en = (s.en || '').trim();
          if (!Object.hasOwn(preserved.sha256, it.id) && en.length < 18) shortReason++;

          let mathSpec = s.math || null;
          if (!mathSpec && grade === 10) {
            mathSpec = ch1?.getStep?.(it, i) || (!geom && rem?.getStep?.(it, i)) || g10Frac?.getStep?.(it, i) || null;
          } else if (!mathSpec && grade === 9) {
            mathSpec = g9m?.getStep?.(it, i) || null;
          }
          if (mathSpec) {
            const htmlOut = renderMath(mathSpec);
            if (htmlOut.includes('data-math-error') || /FRAC|undefined/.test(mathSpec.latex || '')) katexErr++;
          } else if (/\d+\/\d+/.test(s.eq || '')) {
            slashUnconverted++;
          }
        }

        let ansSpec = it.answerMath || null;
        if (!ansSpec && grade === 10) {
          ansSpec = ch1?.getAnswer?.(it) || (!geom && rem?.getAnswer?.(it)) || g10Frac?.getAnswer?.(it) || null;
        } else if (!ansSpec && grade === 9) {
          ansSpec = g9m?.getAnswer?.(it) || null;
        }
        if (ansSpec) {
          // A localized answerMath is {en:{latex,...},ta:{latex,...}}.
          // Validate each displayed language rather than sending the wrapper to KaTeX.
          const bilingual = typeof ansSpec === 'object' && !Array.isArray(ansSpec) &&
            (Object.hasOwn(ansSpec, 'en') || Object.hasOwn(ansSpec, 'ta'));
          const variants = bilingual
            ? ['en', 'ta'].filter(locale => Object.hasOwn(ansSpec, locale)).map(locale => ansSpec[locale])
            : [ansSpec];
          if (!variants.length || (bilingual && !ansSpec.en)) katexErr++;
          for (const spec of variants) {
            if (!spec || (typeof spec === 'object' && !Array.isArray(spec) && typeof spec.latex !== 'string')) {
              katexErr++;
              continue;
            }
            const htmlOut = renderMath(spec);
            if (htmlOut.includes('data-math-error') || /FRAC|undefined/.test(spec.latex || '')) katexErr++;
          }
        } else if (typeof it.answer === 'string' && /\d+\/\d+/.test(it.answer)) {
          slashUnconverted++;
        }

        const h = whyHints?.[it.id];
        if (h) {
          for (const hh of (Array.isArray(h) ? h : [h])) {
            const st = steps[hh.step];
            if (!st || !(st.en || '').includes(hh.expected)) whyErr++;
          }
        }
      }

      if (grade === 10) totalG10RemainingSlash += slashUnconverted;
      else totalG9RemainingSlash += slashUnconverted;
      totalKaTeXErrors += katexErr;
      totalBrokenWhy += whyErr;

      const cp = conceptPaths.get(`${grade}:${ch}`);
      let conceptErr = 0, conceptTaOk = 0, conceptTotal = 0;
      if (cp?.stages) {
        conceptTotal = cp.stages.length;
        for (const st of cp.stages) {
          if (Array.isArray(st.choices)) {
            if (!Number.isInteger(st.correct) || st.correct < 0 || st.correct >= st.choices.length) conceptErr++;
            const enSet = new Set(st.choices.map(c => typeof c === 'string' ? c : c.en));
            if (enSet.size !== st.choices.length) conceptErr++;
          }
          if (st.title?.ta && st.idea?.ta) conceptTaOk++;
        }
      }
      totalConceptIssues += conceptErr;

      // Dimension scores on 0..10 scale from automated checks
      // Automated checks cap correctness at 9.2 until verified against prescribed 2025 textbook PDFs externally.
      const mathCorrectness = Math.max(0, 9.2 - (emptyAns * 1.5 + emptyStep * 1.5 + katexErr * 1.0 + whyErr * 0.5 + conceptErr * 1.0));
      const beginnerComprehension = Math.max(0, 9.5 - shortReason * 0.4);
      const mobileUsability = (staticChecks.af02LangSwitchMinTarget && staticChecks.af03PitfallSummaryMinTarget) ? 9.4 : 7.5;
      const slashPenalty = slashUnconverted === 0 ? 0 : Math.min(3.5, slashUnconverted * 0.12);
      const mathNotation = Math.max(0, 9.8 - slashPenalty - katexErr * 1.5);
      const cognitiveDesign = 9.3;
      const accessibility = (staticChecks.af04BondMutedContrastSelectors && staticChecks.af09BrandGoldDotsHidden) ? 9.5 : 7.0;
      const technicalStability = (staticChecks.af07AppGeometryGuardsAllHooks && staticChecks.af01OverlayOfflineCached && katexErr === 0) ? 9.8 : 7.0;
      const taRatio = list.length ? hasTaQ / list.length : 1;
      const conceptTaRatio = conceptTotal ? conceptTaOk / conceptTotal : 1;
      const ch5Clean = !(grade === 10 && ch === '5' && !staticChecks.af06Ch5ResetTaFixed);
      const bilingualConsistency = Math.max(0, (4.0 + 4.5 * taRatio + 1.5 * conceptTaRatio) * (ch5Clean ? 1 : 0.8));

      const dims = {
        mathCorrectness: +mathCorrectness.toFixed(2),
        beginnerComprehension: +beginnerComprehension.toFixed(2),
        mobileUsability: +mobileUsability.toFixed(2),
        mathNotation: +mathNotation.toFixed(2),
        cognitiveDesign: +cognitiveDesign.toFixed(2),
        accessibility: +accessibility.toFixed(2),
        technicalStability: +technicalStability.toFixed(2),
        bilingualConsistency: +bilingualConsistency.toFixed(2)
      };

      const weighted =
        dims.mathCorrectness * WEIGHTS.mathCorrectness +
        dims.beginnerComprehension * WEIGHTS.beginnerComprehension +
        dims.mobileUsability * WEIGHTS.mobileUsability +
        dims.mathNotation * WEIGHTS.mathNotation +
        dims.cognitiveDesign * WEIGHTS.cognitiveDesign +
        dims.accessibility * WEIGHTS.accessibility +
        dims.technicalStability * WEIGHTS.technicalStability +
        dims.bilingualConsistency * WEIGHTS.bilingualConsistency;

      chapterCards.push({
        grade,
        chapter: Number(ch),
        itemsCount: list.length,
        taQuestionCount: hasTaQ,
        conceptStages: conceptTotal,
        unconvertedSlashFractions: slashUnconverted,
        dimensions: dims,
        automatedWeightedScore: +weighted.toFixed(2)
      });
    }
  }

  return {
    chapterCards,
    totals: {
      totalG10RemainingSlash,
      totalG9RemainingSlash,
      totalKaTeXErrors,
      totalBrokenWhy,
      totalConceptIssues
    }
  };
}

function main() {
  const args = process.argv.slice(2);
  const checkMode = args.includes('--check');
  const jsonMode = args.includes('--json');
  const ingestIdx = args.indexOf('--ingest');

  const inv = loadInventory();
  let ingestSummary = null;
  if (ingestIdx >= 0 && args[ingestIdx + 1]) {
    ingestSummary = ingestExternalFindings(inv, args[ingestIdx + 1]);
  }

  const staticChecks = checkStaticControls();
  const win = loadRuntimeContext();
  const { chapterCards, totals } = buildChapterScorecards(win, staticChecks);

  const avgByGrade = grade => {
    const cards = chapterCards.filter(c => c.grade === grade);
    const totalItems = cards.reduce((s, c) => s + c.itemsCount, 0);
    if (!totalItems) return 0;
    const weighted = cards.reduce((s, c) => s + c.automatedWeightedScore * c.itemsCount, 0) / totalItems;
    return +weighted.toFixed(2);
  };

  const report = {
    mission: inv.mission,
    baselineCommit: inv.checkpoint.baselineCommit,
    branch: inv.checkpoint.branch,
    ingestSummary,
    countsByStatus: inv.findings.reduce((acc, f) => {
      acc[f.status] = (acc[f.status] || 0) + 1;
      return acc;
    }, {}),
    staticChecks,
    totals,
    gradeAverages: {
      grade9: avgByGrade(9),
      grade10: avgByGrade(10)
    },
    evidenceCaveats: [
      'Automated scores verify KaTeX compilation, step/answer completeness, overlay parity, CSS touch-target/contrast rules, and geometry guards.',
      'Grade 9/10 mathematical source equivalence vs prescribed 2025 Tamil Nadu PDFs and Tamil translation accuracy (AF01-10) require Google Drive textbook comparison.'
    ],
    chapters: chapterCards
  };

  if (checkMode) {
    for (const [k, ok] of Object.entries(staticChecks)) {
      assert.ok(ok, `AF-01 static regression guard failed: ${k}`);
    }
    assert.equal(totals.totalG10RemainingSlash, 0, `Expected 0 remaining plain slash fractions in Grade 10, found ${totals.totalG10RemainingSlash}`);
    assert.equal(totals.totalKaTeXErrors, 0, `KaTeX rendering errors detected: ${totals.totalKaTeXErrors}`);
    assert.equal(totals.totalBrokenWhy, 0, `Why-step mismatch detected: ${totals.totalBrokenWhy}`);
    assert.equal(totals.totalConceptIssues, 0, `Concept quiz integrity error detected: ${totals.totalConceptIssues}`);
  }

  if (jsonMode) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(`AF-01 Audit Intelligence: ${inv.findings.length} internal findings (${JSON.stringify(report.countsByStatus)}), ${(inv.externalAuditDeduplication || []).length} external deduplicated`);
    console.log(`Static remediation guards: ${Object.values(staticChecks).filter(Boolean).length}/${Object.keys(staticChecks).length} passing`);
    console.log(`Totals: G10 slash fractions=${totals.totalG10RemainingSlash}, G9 slash fractions=${totals.totalG9RemainingSlash}, KaTeX errors=${totals.totalKaTeXErrors}, Why mismatches=${totals.totalBrokenWhy}, Concept errors=${totals.totalConceptIssues}`);
    console.log(`Weighted automated quality score (0-10): Grade 9=${report.gradeAverages.grade9}, Grade 10=${report.gradeAverages.grade10}`);
    for (const c of chapterCards) {
      console.log(`  G${c.grade} Ch${c.chapter}: score=${c.automatedWeightedScore}/10 (items=${c.itemsCount}, taQ=${c.taQuestionCount}/${c.itemsCount}, slashUnconverted=${c.unconvertedSlashFractions})`);
    }
  }
}

main();
