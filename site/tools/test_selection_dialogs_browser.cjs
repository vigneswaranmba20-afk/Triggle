'use strict';

const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');
const path = require('node:path');
const {_android, chromium, devices, webkit} = require('playwright');
const {server, launchOptions} = require('./dashboard_test_support.cjs');

const sizes = [[320, 568], [360, 640], [390, 844], [412, 915], [430, 932]];
const readers = [
  {grade: 9, chapter: 3, question: 'g9-ch3-ex3.2-q1-i', practice: 'c9-1-1-practice-1'},
  {grade: 10, chapter: 2, question: 'c10-2-ex2-1-q1', practice: 'c10-2-2-practice-19'}
];
const useWebKit = process.env.TRIGGLE_BROWSER === 'webkit';
const androidStage = process.env.TRIGGLE_ANDROID_STAGE;
const phone = devices[useWebKit ? 'iPhone 13' : 'Pixel 7'];
const screenshots = process.env.TRIGGLE_SELECTION_SCREENSHOTS;
const readerUrl = (base, grade, id) => base + '/index.html?' + new URLSearchParams({class: grade, question: id});

function measureDialog() {
  const dialog = document.getElementById('pathDialog');
  const list = document.getElementById('pathOptions');
  const heading = document.getElementById('pathTitle');
  const close = document.getElementById('pathClose');
  const header = dialog.querySelector('header');
  const bounds = element => element.getBoundingClientRect();
  const contains = (outer, inner) => inner.left >= outer.left - 1 && inner.right <= outer.right + 1 &&
    inner.top >= outer.top - 1 && inner.bottom <= outer.bottom + 1;
  const overlaps = (a, b) => Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 &&
    Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1;
  const issues = [];
  function checkText(element, box) {
    const range = document.createRange();
    range.selectNodeContents(element);
    const lines = [...range.getClientRects()];
    if (!lines.length || lines.some(line => !contains(box, line))) issues.push('Clipped text: ' + element.textContent);
    if (lines.some((line, index) => lines.slice(index + 1).some(other => overlaps(line, other)))) {
      issues.push('Overlapping text: ' + element.textContent);
    }
    return lines;
  }
  const headerTexts = [heading, document.getElementById('pathHint')].filter(el => !el.hidden);
  for (const text of headerTexts) {
    const lines = checkText(text, bounds(header));
    if (lines.some(line => overlaps(line, bounds(close)))) issues.push('Header text overlaps the close button');
  }
  if (overlaps(bounds(header), bounds(list))) issues.push('Header overlaps options');
  if (bounds(list).height <= 0) issues.push('Header leaves no room to scroll options');
  if (bounds(close).width < 44 || bounds(close).height < 44) issues.push('Close target is too small');
  if (!contains({top: 0, left: 0, right: innerWidth, bottom: innerHeight}, bounds(dialog))) issues.push('Dialog exceeds the viewport');
  if (list.scrollWidth > list.clientWidth + 1 || dialog.scrollWidth > dialog.clientWidth + 1) issues.push('Horizontal overflow');
  const rows = [];
  let previous = null;
  for (const option of list.querySelectorAll('button')) {
    const box = bounds(option);
    const title = option.querySelector('strong');
    const meta = option.querySelector('small');
    const number = option.querySelector('.path-number');
    const mark = option.querySelector('.path-option-mark');
    const text = title.textContent;
    if (box.height < 44 || box.width < 44) issues.push('Small touch target: ' + text);
    if (previous && box.top < previous.bottom - 1) issues.push('Overlapping cards: ' + text);
    if (box.left < bounds(list).left || box.right > bounds(list).right + 1 || option.scrollWidth > option.clientWidth + 1) {
      issues.push('Card exceeds the scroll area: ' + text);
    }
    const content = [title, meta, number, mark].filter(Boolean);
    const contentBoxes = content.map(element => {
      checkText(element, bounds(element));
      return bounds(element);
    });
    if (contentBoxes.some((part, index) => !contains(box, part) ||
      contentBoxes.slice(index + 1).some(other => overlaps(part, other)))) issues.push('Overlapping card contents: ' + text);
    if (/�/.test(option.textContent)) issues.push('Replacement glyph: ' + text);
    rows.push({
      title: text, number: number?.textContent, meta: meta.textContent, mark: mark?.textContent,
      current: option.getAttribute('aria-current'), height: box.height
    });
    previous = box;
  }
  return {
    issues, rows, scrolls: list.scrollHeight > list.clientHeight,
    fontSizes: [heading, list.querySelector('strong'), list.querySelector('small')].map(el => parseFloat(getComputedStyle(el).fontSize)),
    titleWeight: Number(getComputedStyle(list.querySelector('strong')).fontWeight),
    viewport: innerWidth
  };
}

async function openAndCheck(page, trigger, label, width, scale) {
  const dialog = page.locator('#pathDialog');
  await trigger.tap();
  await dialog.waitFor();
  await page.evaluate(() => document.fonts.ready);
  const result = await page.evaluate(measureDialog);
  assert.deepEqual(result.issues, [], label);
  assert.equal(result.viewport, width, label + ' zoom must preserve viewport width');
  assert.deepEqual(result.fontSizes, [21, 17, 14].map(size => scale * size), label + ' text scales independently');
  assert.equal(result.titleWeight, 500, label + ' medium title weight');
  assert.ok(result.rows.length, label + ' contains options');

  const header = dialog.locator('header');
  const list = page.locator('#pathOptions');
  const last = list.locator('button').last();
  const headerBefore = await header.boundingBox();
  const pageScroll = await page.evaluate(() => window.scrollY);
  await last.scrollIntoViewIfNeeded();
  assert.deepEqual(await header.boundingBox(), headerBefore, label + ' header stays in place');
  assert.equal(await page.evaluate(() => window.scrollY), pageScroll, label + ' page stays in place');
  const [rowBounds, listBounds] = await Promise.all([last.boundingBox(), list.boundingBox()]);
  assert.ok(rowBounds.y >= listBounds.y - 1 &&
    rowBounds.y + rowBounds.height <= listBounds.y + listBounds.height + 1,
  label + ' last row is fully reachable ' + JSON.stringify({rowBounds, listBounds}));
  if (result.scrolls && result.rows.length > 2) {
    assert.ok(await list.evaluate(el => el.scrollTop > 0), label + ' options scroll independently');
  }
  return result;
}

async function expectedChapters(page, grade, lang) {
  return page.evaluate(({grade, lang}) => {
    const chapters = window.TRIGGLE_CURRICULUM.grades.find(row => row.grade === grade).chapters;
    return chapters.map(chapter => {
      const items = window.TRIGGLE_CLASSES[grade].items.filter(item =>
        chapter.textbookQuestionIds?.includes(item.id) || chapter.legacyQuestionIds.includes(item.id) ||
        (chapter.id === 'g10-ch1' && String(item.chapter) === '1' && item.kind === 'textbook'));
      return {name: chapter.title[lang], number: chapter.number, count: window.TriggleChapterHub.textbookExercises(items).length};
    });
  }, {grade, lang});
}

async function checkDismissal(page, trigger, dismiss) {
  if (dismiss === 'keyboard') await page.keyboard.press('Escape');
  else await page.locator('#pathClose').tap();
  await page.locator('#pathDialog').waitFor({state: 'hidden'});
  assert.ok(await trigger.evaluate(el => el === document.activeElement), dismiss + ' dismissal restores focus');
}

async function verifySelection(page, chapterTrigger, grade, chapter) {
  await chapterTrigger.focus();
  await page.keyboard.press('Enter');
  const dialog = page.locator('#pathDialog');
  assert.ok(await page.locator('#pathClose').evaluate(el => el === document.activeElement), 'Keyboard opens with focus in the dialog');
  await page.keyboard.press('/');
  assert.ok(await page.locator('#pathClose').evaluate(el => el === document.activeElement), 'Background shortcuts cannot take focus');
  assert.equal(await page.locator('body.drawer-open').count(), 0, 'Background shortcuts cannot open the navigation drawer');
  await page.keyboard.press('Tab');
  assert.ok(await dialog.locator('.path-option').first().evaluate(el => el === document.activeElement), 'Tab reaches the first option');
  const last = dialog.locator('.path-option').last();
  await last.tap();
  await page.waitForURL(url => url.searchParams.get('chapter') === 'g'+grade+'-ch'+chapter);
  await page.locator('#chapterOverview').waitFor();
  assert.equal(await dialog.isVisible(), false, 'Choosing a chapter closes the picker');
}

(async () => {
  let app, browser, device, port;
  let chapterRows = 0;
  let otherDialogs = 0;
  try {
    if (androidStage) {
      const connected = await _android.devices();
      assert.equal(connected.length, 1, 'Expected exactly one Android test device');
      device = connected[0];
    } else {
      browser = useWebKit ? await webkit.launch() : await chromium.launch(launchOptions());
    }
    app = process.env.TRIGGLE_QA_URL ? null : await server(androidStage);
    const base = process.env.TRIGGLE_QA_URL || app.base;
    if (device) {
      port = 'tcp:' + new URL(base).port;
      execFileSync('adb', ['reverse', port, port]);
      console.log('Android ' + (await device.shell('getprop ro.build.version.release')).toString().trim());
    }
    const androidContext = await device?.launchBrowser({
      isMobile: true, hasTouch: true, serviceWorkers: 'block', reducedMotion: 'reduce', timeout: 90000
    });
    const androidPage = await androidContext?.newPage();
    if (androidPage) assert.match(await androidPage.evaluate(() => navigator.userAgent), /Android.*Chrome\//);
    for (const [width, height] of sizes) {
      const options = {viewport: {width, height}, serviceWorkers: 'block', reducedMotion: 'reduce'};
      const context = androidContext || await browser.newContext({...phone, ...options});
      const page = androidPage || await context.newPage();
      if (androidPage) {
        await page.setViewportSize({width, height});
        console.log('Testing ' + width + 'px with ' + await page.evaluate(() => navigator.userAgent));
      }
      const crumb = page.locator('#crumb .crumb-link');
      const questionTrigger = page.locator('#questionPicker');
      for (const {grade, chapter, question, practice} of readers) {
        for (const [route, pickers] of [[question, ['chapter', 'question']], [practice, ['class', 'exercise']]]) {
          await page.goto(readerUrl(base, grade, route), {waitUntil: 'domcontentloaded'});
          await page.locator('body:not(.ver-starting)').waitFor();
          assert.equal(new URL(page.url()).searchParams.get('question'), route);
          for (const lang of ['en', 'ta']) {
            await page.locator(lang === 'en' ? '#langEn' : '#langTa').tap();
            const expected = pickers.includes('chapter') ? await expectedChapters(page, grade, lang) : [];
            for (const scale of [1, 2]) {
              await page.evaluate(scale => { document.documentElement.style.fontSize = scale * 100 + '%'; }, scale);
              for (const picker of pickers) {
                const trigger = {class: crumb.first(), chapter: crumb.nth(1), exercise: crumb.nth(2), question: questionTrigger}[picker];
                const label = [picker, grade, lang, width, scale * 100 + '%'].join(' ');
                assert.equal(await trigger.getAttribute('aria-haspopup'), 'dialog', label);
                const result = await openAndCheck(page, trigger, label, width, scale);
                if (picker === 'chapter') {
                  assert.deepEqual(result.rows.map(row => row.title), expected.map(row => row.name), label + ' full names');
                  assert.deepEqual(result.rows.map(row => row.number), expected.map(row => String(row.number).padStart(2, '0')), label + ' numbers');
                  assert.deepEqual(result.rows.map(row => Number.parseInt(row.meta, 10) || 0), expected.map(row => row.count), label + ' counts');
                  assert.ok(result.rows.every((row, index) => expected[index].count > 0 ?
                    /^\d+ (questions?|வினா|வினாக்கள்)$/.test(row.meta) :
                    /^(No exercise questions yet|பயிற்சி வினாக்கள் இன்னும் இல்லை)$/.test(row.meta)), label + ' availability');
                  assert.deepEqual(result.rows.filter(row => row.current === 'true' && row.mark === '✓').map(row => Number(row.number)), [chapter], label + ' current chapter');
                  assert.equal(await page.locator('#pathDialog').getAttribute('aria-describedby'), 'pathHint');
                  chapterRows += result.rows.length;
                  if (screenshots && lang === 'ta' && (width === 320 || width === 390)) {
                    await page.locator('#pathOptions').evaluate(el => { el.scrollTop = 0; });
                    await page.screenshot({path: path.join(screenshots, [grade, lang, width, scale].join('-') + '.png')});
                  }
                } else {
                  assert.ok(result.rows.every(row => row.number === undefined), label + ' chapter badges stay scoped');
                  assert.equal(await page.locator('#pathHint').isVisible(), false, label + ' chapter summary stays scoped');
                  if (picker !== 'exercise') assert.equal(result.rows.filter(row => row.current === 'true').length, 1, label + ' current option');
                  if (picker === 'question') {
                    assert.ok(await page.locator('#pathOptions [aria-current="true"]').evaluate(el => el === document.activeElement),
                      label + ' question picker keeps focus on the current question');
                  }
                  otherDialogs++;
                }
                await checkDismissal(page, trigger, scale === 1 ? 'keyboard' : 'close button');
              }
            }
            await page.evaluate(() => { document.documentElement.style.fontSize = ''; });
          }
        }
        if (width === 320) {
          await page.goto(readerUrl(base, grade, question));
          await page.locator('body:not(.ver-starting)').waitFor();
          await verifySelection(page, crumb.nth(1), grade, grade === 9 ? 9 : 8);
        }
      }
      if (!androidContext) await context.close();
    }
    await androidContext?.close();
  } finally {
    await device?.close();
    await browser?.close();
    await app?.close();
    if (port) execFileSync('adb', ['reverse', '--remove', port]);
  }
  assert.equal(chapterRows, 340, 'Every Grade 9 and 10 chapter in both languages at five widths and two text sizes');
  console.log('PASS selection dialogs · ' + (device ? 'Chrome for Android' : useWebKit ? 'WebKit' : 'Chromium') + ' · ' + chapterRows + ' chapter rows and ' + otherDialogs + ' class, exercise and question dialogs');
})().catch(error => { console.error(error); process.exitCode = 1; });
