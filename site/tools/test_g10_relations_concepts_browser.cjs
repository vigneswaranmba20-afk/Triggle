'use strict';

const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const {launchOptions, server} = require('./dashboard_test_support.cjs');

async function verify(page, base, lang, width) {
  await page.setViewportSize({width, height: 800});
  const route = base + '?class=10&chapter=g10-ch1&section=concepts';
  await page.goto(route);
  await page.locator(lang === 'ta' ? '#langTa' : '#langEn').click();
  const items = page.locator('[data-index-view] .sp2-nav-button');
  const panel = page.locator('[data-panel]');
  assert.equal(await items.count(), 10);
  for (let i = 0; i < 10; i++) {
    await items.nth(i).click();
    const lesson = await page.evaluate(i => {
      const {title, section, exercise, check, activity} = window.TRIGGLE_RELATIONS_LESSONS[i];
      return {title, section, exercise, check, results: activity.options.map(o=>o.result)};
    }, i);
    assert.equal(await panel.locator('h4').innerText(), lesson.section+' '+lesson.title[lang]);
    assert.equal(new URL(page.url()).searchParams.get('concept'), String(i));
    const options = panel.locator('.g9-investigation-activity button');
    for (const [index, result] of lesson.results.entries()) {
      await options.nth(index).click();
      assert.equal(await panel.locator('.g9-investigation-result p').innerText(), result[lang]);
      if (i === 4) assert.equal(await panel.locator('path[marker-end]').count(), [2,2,3,1][index]);
      if (i === 9) assert.ok(await panel.locator('.katex').count());
      assert.equal(await panel.locator('.katex-error').count(), 0);
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth+1));
    }
    const correct = lesson.check.options.findIndex(o=>o.correct);
    await panel.locator('.g9-investigation-check .sp2-answers button').nth(correct).click();
    assert.ok((await panel.locator('[role=status]').innerText()).includes(lesson.check.options[correct].feedback[lang]));
    const exercise = panel.locator('.g10ch2-practice-link');
    const hasTamilPrompt = await page.evaluate(id => Boolean(window.TRIGGLE_CLASSES[10].items.find(q=>q.id===id)?.q.ta), lesson.exercise);
    assert.equal((await exercise.innerText()).includes('ஆங்கிலத்தில் மட்டும்'), lang==='ta' && !hasTamilPrompt);
    await exercise.click();
    assert.equal(new URL(page.url()).searchParams.get('question'), lesson.exercise);
    await page.goto(route);
  }
  console.log('PASS ten lessons, interactions, notation and exercise destinations', lang, width);
}

(async()=>{
  const local = process.env.TRIGGLE_SITE ? null : await server();
  const base = process.env.TRIGGLE_SITE || local.base+'/index.html';
  const browser = await chromium.launch(launchOptions());
  try {
    const page = await browser.newPage();
    for (const width of [320,390,412]) {
      for (const lang of ['en','ta']) await verify(page,base,lang,width);
    }
  } finally {await browser.close(); await local?.close();}
})().catch(error=>{console.error(error); process.exitCode=1;});
