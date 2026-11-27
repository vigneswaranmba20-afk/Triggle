'use strict';

const assert = require('node:assert/strict');
const {execFile} = require('node:child_process');
const {createHash} = require('node:crypto');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const {promisify} = require('node:util');
const {chromium} = require('playwright');
const {loadRuntime} = require('./curriculum_bulk.cjs');
const {buildStudentRelease} = require('./build_student_release.cjs');
const {server, launchOptions} = require('./dashboard_test_support.cjs');

const site = path.resolve(__dirname, '..');
const viewport = {width:390,height:844};
const ready = page => page.locator('body:not(.ver-starting)').waitFor();
const link = (grade, key, value) => '/index.html?' + new URLSearchParams({class:grade,[key]:value});
const matches = (key, value) => url => url.searchParams.get(key)===value;
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const questionMarkup = page => page.evaluate(() => {
  function content(id) {
    const node = document.getElementById(id).cloneNode(true);
    for (const expression of node.querySelectorAll('.triggle-tex[tabindex]')) {
      for (const name of ['tabindex','role','aria-label']) expression.removeAttribute(name);
    }
    return node.innerHTML;
  }
  return {
    route:new URL(location.href).searchParams.get('question'),
    question:content('questionText'),
    steps:content('stepsList'),
    answer:content('answerText'),
    hint:content('g9GeometryHint'),
    figure:document.querySelector('#inlineFigure:not([hidden]) img')?.getAttribute('src')||null,
  };
});


async function verifyStatisticsDirectory(page,base,language) {
  await page.goto(base+'/index.html?class=10');
  await ready(page);
  await page.locator(language==='ta'?'#langTa':'#langEn').click();
  const card=page.locator('.discover-chapter[data-chapter="g10-ch8"]');
  const meta=card.locator('.discover-chapter-meta.is-ready');
  await meta.waitFor();
  assert.equal(await meta.textContent(),language==='ta'?'✦ 15 சிறு செயல்வழிப் பாடங்கள் உள்ளன':'✦ 15 Interactive mini-lessons available');
  assert.equal(await page.locator('html').getAttribute('lang'),language);
  const directory=await page.evaluate(()=>({
    staged:!!window.TriggleStudentRelease,
    count:window.TriggleStudentRelease?.conceptCounts['g10-ch8'],
    chapter:window.TriggleStudentRelease?.chapter,
    viewer:!!window.TriggleG10Ch8Labs,
    data:!!window.TRIGGLE_G10_CH8_PATH
  }));
  if(directory.staged) {
    assert.equal(directory.count,15);
    assert.equal(directory.chapter,null);
    assert.equal(directory.viewer,false);
    assert.equal(directory.data,false);
  }
  await card.click();
  await page.waitForURL(matches('chapter','g10-ch8'));
  await ready(page);
  await page.locator('[data-hub-section="concepts"]').click();
  await page.waitForURL(matches('section','concepts'));
  await ready(page);
  await page.locator('[data-nav] button').first().waitFor();
  assert.equal(await page.locator('[data-nav] button').count(),15);
  assert.equal(await page.evaluate(()=>typeof window.TriggleG10Ch8Labs?.mount),'function');
  assert.equal(await page.locator('html').getAttribute('lang'),language);
}

async function compareChapters(browser, authored, staged) {
  const context = await browser.newContext({viewport,isMobile:true,hasTouch:true,serviceWorkers:'block',reducedMotion:'reduce'});
  try {
    const [source, packed] = await Promise.all([context.newPage(),context.newPage()]);
    const errors = [];
    packed.on('pageerror',error=>errors.push(error.message));
    packed.on('console',entry=>{if(entry.type()==='error'&&entry.text().startsWith('Triggle startup'))errors.push(entry.text());});
    for (const language of ['en','ta']) await verifyStatisticsDirectory(packed,staged,language);
    const runtime = loadRuntime();
    const chapters = runtime.curriculum.grades.filter(grade=>[9,10].includes(grade.grade));
    let compared=0;
    for (const {grade,chapters:rows} of chapters) for (const chapter of rows) {
      const item = runtime.classes[grade].items.find(item=>String(item.chapter)===String(chapter.number)&&
        /^(?:Exercise|Unit Exercise)\b/i.test(item.label?.en||''));
      assert(item,'Missing exercise candidate for '+chapter.id);
      await Promise.all([source.goto(authored+link(grade,'question',item.id)),packed.goto(staged+link(grade,'question',item.id))]);
      await Promise.all([ready(source),ready(packed)]);
      const projected = await packed.evaluate(({grade,id})=>({
        chapter:window.TriggleStudentRelease.chapter,
        current:window.TRIGGLE_CLASSES[grade].items.find(item=>item.id===id)?.steps?.length,
        other:window.TRIGGLE_CLASSES[grade].items.some(item=>item.chapter!==window.TRIGGLE_CLASSES[grade].items.find(item=>item.id===id)?.chapter&&!Object.hasOwn(item,'steps')),
      }),{grade,id:item.id});
      assert.equal(projected.chapter,chapter.id);
      assert(projected.current&&projected.other,'Expected complete chapter and lightweight directory records');
      const records = page=>page.evaluate(({grade,id})=>{
        const chapters=window.TRIGGLE_CURRICULUM.grades.find(item=>item.grade===grade).chapters;
        return window.TRIGGLE_CLASSES[grade].items.filter(item=>{
          const chapter=chapters.find(row=>row.legacyQuestionIds.includes(item.id))||
            chapters.find(row=>String(row.number)===String(item.chapter));
          return chapter?.id===id;
        }).map(item=>[item,window.TriggleG9Ch5Overrides?.get(item.id)||null]);
      },{grade,id:chapter.id});
      assert.equal(digest(await records(packed)),digest(await records(source)),chapter.id+' complete records');
      for (const language of ['#langEn','#langTa']) {
        await Promise.all([source.locator(language).click(),packed.locator(language).click()]);
        const [baseline,release] = await Promise.all([questionMarkup(source),questionMarkup(packed)]);
        for (const key of Object.keys(baseline)) assert.equal(digest(release[key]),digest(baseline[key]),chapter.id+' '+language+' '+key);
        compared++;
      }
      const concepts=link(grade,'chapter',chapter.id)+'&section=concepts';
      await Promise.all([source.goto(authored+concepts),packed.goto(staged+concepts)]);
      await Promise.all([ready(source),ready(packed)]);
      assert.equal(await packed.locator('#chapterOverview').innerText(),await source.locator('#chapterOverview').innerText(),chapter.id+' concepts');
    }
    assert.deepEqual(errors,[]);
    console.log('PASS staged student page matches authored question, working, answer, hints and figures in '+compared+' chapter/language views, plus all 17 Tamil concept indexes.');
  } finally { await context.close(); }
}

async function navigateOffline(browser, base) {
  const context = await browser.newContext({viewport,isMobile:true,hasTouch:true});
  try {
    const page = await context.newPage();
    const algebra = 'g9-ch3-ex3.2-q1-i';
    const geometry = 'c10-4-ex4-1-q1-i';
    await page.goto(base+link(9,'question',algebra));
    await ready(page);
    await page.waitForFunction(()=>navigator.serviceWorker.controller,null,{timeout:40000});
    assert((await page.evaluate(()=>caches.keys())).some(key=>key.includes('-student-')),'Versioned release worker');
    await context.setOffline(true);
    for (const language of ['en','ta']) await verifyStatisticsDirectory(page,base,language);
    await page.goto(base+link(9,'question','g9-ch5-ex5.1-q2'));
    await ready(page);
    assert.equal(await page.evaluate(()=>window.TriggleStudentRelease.chapter),'g9-ch5');
    const projection = page.locator('#inlineFigureVisual svg.diagramguard-coordinate[data-dg-ready]');
    await projection.waitFor();
    assert.equal(await projection.locator('line[data-dg-obstacle$="-guide"]').count(),8);
    assert.deepEqual(await projection.evaluate(svg=>window.TriggleDiagramGuard.audit(svg,{discover:true}).issues),[]);
    await page.goto(base+link(10,'question','c10-5-ex5-1-q9'));
    await ready(page);
    assert.equal(await page.evaluate(()=>window.TriggleStudentRelease.chapter),'g10-ch5');
    assert.equal(await page.locator('html').getAttribute('lang'),'ta');
    await page.locator('#inlineFigureVisual svg.diagramguard-coordinate[data-dg-ready]').waitFor();
    await page.locator('#inlineFigureOpen').click();
    const coordinateFigure = page.locator('#figureDialog svg.diagramguard-coordinate[data-dg-ready]');
    await coordinateFigure.waitFor();
    assert.equal(await coordinateFigure.locator('[data-dg-point]').count(),8);
    assert.deepEqual(await coordinateFigure.evaluate(svg=>window.TriggleDiagramGuard.audit(svg,{discover:true}).issues),[]);
    await page.keyboard.press('Escape');
    await page.goto(base+link(10,'question',geometry));
    await ready(page);
    await page.locator('#langTa').click();
    assert.equal(await page.locator('html').getAttribute('lang'),'ta');
    const image = page.locator('#inlineFigureVisual img');
    await image.evaluate(img=>img.decode());
    await page.locator('#homeBtn').click();
    await page.locator('.discover-resume-card').click();
    await page.waitForURL(matches('question',geometry));
    await page.goto(base+link(9,'question',algebra));
    await ready(page);
    await page.locator('#langEn').click();
    await page.locator('#browseBtn').click();
    await page.locator('#search').fill('Venn diagram');
    const target = page.locator('#exerciseList .exercise-question[data-question-id^="g9-ch1-"]').first();
    await target.waitFor();
    const q = await target.getAttribute('data-question-id');
    await target.click();
    await page.waitForURL(matches('question',q));
    await ready(page);
    assert.equal(await page.evaluate(()=>window.TriggleStudentRelease.chapter),'g9-ch1');
    await page.goBack();
    await page.waitForURL(matches('question',algebra));
    await ready(page);
    await page.locator('#next').click();
    assert.notEqual(new URL(page.url()).searchParams.get('question'),algebra);
    await page.locator('#previous').click();
    assert.equal(new URL(page.url()).searchParams.get('question'),algebra);
    console.log('PASS staged product offline cross-grade and cross-chapter routes, localized figure, resume, search, Back and question navigation.');
  } finally { await context.close(); }
}

(async () => {
  const temp = await fs.mkdtemp(path.join(os.tmpdir(),'triggle-student-'));
  let source, generated, browser;
  try {
    await fs.cp(site,temp,{recursive:true});
    buildStudentRelease(temp);
    [source, generated] = await Promise.all([server(),server(temp)]);
    browser = await chromium.launch(launchOptions());
    await compareChapters(browser,source.base,generated.base);
    await navigateOffline(browser,generated.base);
    for (const test of ['test_ver_glyph_browser.cjs','test_selection_dialogs_browser.cjs']) {
      const result=await promisify(execFile)(process.execPath,[path.join(__dirname,test)],{
        env:{...process.env,TRIGGLE_QA_URL:generated.base,TRIGGLE_BEFORE:'0'},
      });
      process.stdout.write(result.stdout);
    }
  } finally {
    await browser?.close();
    await Promise.all([source?.close(),generated?.close()]);
    await fs.rm(temp,{recursive:true,force:true});
  }
})().catch(error=>{console.error(error);process.exitCode=1;});
