'use strict';

const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const {server, launchOptions} = require('./dashboard_test_support.cjs');
const sections = [
  ['4.4', require('../data/textbook-fidelity/g10-ch4-ex4-4.json').items],
  ['4.5', require('../data/textbook-fidelity/g10-ch4-ex4-5.json').items],
  ['4.unit', require('../data/textbook-fidelity/g10-ch4-unit.json').items]
];

async function checkQuestion(page, row, lang) {
  assert.equal(new URL(page.url()).searchParams.get('question'),row.id);
  const layout = await page.locator('#lessonCard').evaluate(card => {
    const prompt=card.querySelector('#questionText').cloneNode(true);
    for (const formula of prompt.querySelectorAll('[data-math-fallback]')) {
      formula.replaceWith(document.createTextNode(formula.dataset.mathFallback));
    }
    const choices=[...prompt.querySelectorAll('.triggle-mcq-btn')].map(x=>x.textContent);
    for (const extra of prompt.querySelectorAll('.triggle-mcq-choices,.triggle-mcq-feedback')) extra.remove();
    const formulas=[...card.querySelectorAll('.triggle-tex')];
    const clipped=formulas.some(f => {
      const glyph=f.querySelector('.katex-html');
      if (!glyph) return false;
      const box=f.getBoundingClientRect();
      return (box.height > 0 && glyph.getBoundingClientRect().height > box.height+1)
        || (f.clientWidth > 0 && f.scrollWidth > f.clientWidth+1 && f.tabIndex !== 0);
    });
    return {
      prompt:prompt.textContent, choices, clipped,
      overflow:document.documentElement.scrollWidth > innerWidth+1,
      errors:card.querySelectorAll('[data-math-error],.math-fallback').length,
      reasons:[...card.querySelectorAll('#stepsList .step-reason')].map(e=>e.textContent),
      why:card.querySelector('.why-step-g10 summary')?.textContent,
      final:card.querySelector('.final-answer-step')?.textContent
    };
  });
  assert.equal(layout.prompt,row.textbookPrompt[lang],row.id+' '+lang);
  assert.deepEqual(layout.choices,row.textbookChoices?.[lang] || []);
  assert.equal(layout.errors,0,row.id+' KaTeX');
  assert.ok(!layout.overflow && !layout.clipped,row.id+' unclipped math and page layout');
  assert.ok(layout.final && layout.reasons.length,row.id+' worked solution and final answer');
  assert.equal(layout.why,lang==='ta'?'ஏன் இந்தப் படி?':'Why this step?');
  if(lang==='ta') assert.ok(layout.reasons.every(reason=>/[அ-ஹ]/.test(reason)),row.id+' Tamil reasoning');
  assert.ok(await page.locator('#difficultyIndicator').isVisible());
  assert.ok(await page.locator('#chapter8QuestionConcept').isVisible());
}

(async () => {
  const site=await server();
  const browser=await chromium.launch(launchOptions());
  try {
    let checked=0;
    for (const width of [320,360,390,412]) {
      const ctx=await browser.newContext({
        viewport:{width,height:844},isMobile:true,hasTouch:true,
        serviceWorkers:'block',reducedMotion:'reduce'
      });
      const page=await ctx.newPage();
      const errors=[];
      page.on('pageerror',error=>errors.push(error.message));
      for (const [id,rows] of sections) {
        await page.goto(site.base+'/index.html?class=10&chapter=g10-ch4');
        await page.locator('.hub-section-card[data-hub-section="exercises"]').tap();
        await page.locator(`.hub-exercise-link[data-exercise="${id}"]`).tap();
        assert.ok(await page.locator('#questionTopPrevious').isDisabled());
        const subset=width===390 ? rows : rows.filter((row,i)=>[0,2,4,rows.length-1].includes(i));
        for (const row of subset) {
          if (new URL(page.url()).searchParams.get('question')!==row.id) {
            await page.goto(site.base+'/index.html?class=10&question='+row.id);
          }
          await page.evaluate(()=>document.fonts.ready);
          await checkQuestion(page,row,'en');
          await page.locator('#langTa').tap();
          await checkQuestion(page,row,'ta');
          checked+=2;
          const image=page.locator('#inlineFigure:not([hidden]) img');
          if (await image.count()) {
            await image.evaluate(img=>img.decode());
            if(row===subset[1]) {
              await page.locator('#inlineFigureOpen:visible, #figureBtn:visible').tap();
              await page.locator('#diagramContent img').evaluate(img=>img.decode());
              await page.locator('#closeDiagram').tap();
            }
          }
          if(row===subset[0]) {
            await page.locator('.why-step-g10 summary').first().tap();
            assert.ok(await page.locator('.why-step-panel').first().isVisible());
            if(row.textbookChoices) {
              const index=await page.evaluate(id=>window.TRIGGLE_CLASSES[10].items.find(r=>r.id===id).correctIndex,row.id);
              await page.locator('.triggle-mcq-btn').nth(index).tap();
              assert.ok(await page.locator('.triggle-mcq-feedback.is-correct').isVisible());
            }
            await page.locator('#questionTopNext').tap();
            assert.equal(new URL(page.url()).searchParams.get('question'),rows[1].id);
            await page.locator('#questionTopPrevious').tap();
            assert.equal(new URL(page.url()).searchParams.get('question'),row.id);
          }
          await page.locator('#langEn').tap();
          if(width===390 && row!==rows.at(-1)) await page.locator('#next').tap();
        }
        assert.ok(await page.locator('#questionTopNext').isDisabled());
      }
      assert.deepEqual(errors,[]);
      await ctx.close();
      console.log('PASS Geometry completion at '+width+'px in both languages.');
    }
    assert.equal(checked,154);
    const figures = await browser.newPage();
    try {
      const files = require('node:fs').readdirSync('site/assets/grade10-geometry')
        .filter(name=>/^(ex4-[45]|unit)-/.test(name));
      assert.equal(files.length,17);
      for (const file of files) {
        await figures.goto(site.base+'/assets/grade10-geometry/'+file);
        const issues = await figures.evaluate(() => {
          const labels = [...document.querySelectorAll('svg text')].map(node=>({
            name:node.textContent, box:node.getBBox()
          }));
          const problems = [];
          for (const [i,{name,box:a}] of labels.entries()) {
            if (a.x<0 || a.y<0 || a.x+a.width>320 || a.y+a.height>220) problems.push(name+' clipped');
            for (const {name:other,box:b} of labels.slice(i+1)) {
              const overlapX=Math.min(a.x+a.width,b.x+b.width)-Math.max(a.x,b.x);
              const overlapY=Math.min(a.y+a.height,b.y+b.height)-Math.max(a.y,b.y);
              if (overlapX>2 && overlapY>2) problems.push(name+' overlaps '+other);
            }
          }
          return problems;
        });
        assert.deepEqual(issues,[],file);
      }
      console.log('PASS all 17 new Geometry figures have unclipped, nonoverlapping labels.');
    } finally {
      await figures.close();
    }
  } finally {
    await browser.close();
    await site.close();
  }
})().catch(error=>{console.error(error);process.exitCode=1;});
