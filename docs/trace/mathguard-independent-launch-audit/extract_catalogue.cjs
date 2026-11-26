'use strict';

const assert = require('node:assert/strict');
const path = require('node:path');

const repo = process.cwd();
const { chromium } = require(path.join(repo, 'node_modules/playwright'));
const { server, launchOptions } = require(path.join(repo, 'site/tools/dashboard_test_support.cjs'));

(async () => {
  const local = process.env.TRIGGLE_LIVE_BASE ? null : await server();
  const base = process.env.TRIGGLE_LIVE_BASE || local.base;
  let browser;
  try {
    browser = await chromium.launch(launchOptions());
    const page = await browser.newPage({ serviceWorkers: 'block' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(() => {
      window.addEventListener('triggle:lessonchange', () => { window.auditReaderReady = true; });
    });
    await page.goto(base + '/index.html');
    await page.waitForFunction(() => window.auditReaderReady);
    const chapters = await page.evaluate(() => {
      return window.TRIGGLE_CURRICULUM.grades
        .filter(({ grade }) => grade === 9 || grade === 10)
        .flatMap(({ grade, chapters }) => chapters.map(chapter => {
          const ids = new Set([...chapter.legacyQuestionIds, ...(chapter.textbookQuestionIds || [])]);
          const items = window.TRIGGLE_CLASSES[grade].items.filter(item => ids.has(item.id) ||
            (grade === 10 && Number(chapter.number) === 1 && String(item.chapter) === '1' && item.kind === 'textbook'));
          return {
            grade,
            chapter: Number(chapter.number),
            items: window.TriggleChapterHub.textbookExercises(items).map(item => ({
              ...item,
              independentAuditPresentation: grade === 9 && item.notationSource !== 'authored'
                ? window.TriggleG9Math?.get(item) : undefined,
            })),
          };
        }));
    });
    assert.deepEqual(errors, []);
    assert.equal(chapters.length, new Set(chapters.map(({ grade, chapter }) => grade + '/' + chapter)).size);
    const cards = chapters.flatMap(chapter => chapter.items.map(item => item.id));
    assert.equal(cards.length, new Set(cards).size);
    process.stdout.write(JSON.stringify({ chapters }) + '\n');
  } finally {
    await browser?.close();
    await local?.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
