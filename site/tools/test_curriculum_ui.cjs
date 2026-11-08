// Run with Playwright installed: node site/tools/test_curriculum_ui.cjs
// Uses the system Chromium when CHROMIUM_PATH is set; otherwise Playwright's browser.
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const http = require('node:http');
const path = require('node:path');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');

async function serve() {
  const server = http.createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      const file = path.resolve(root, '.' + (pathname.endsWith('/') ? pathname + 'index.html' : pathname));
      if (!file.startsWith(root + path.sep)) throw Error('Outside site');
      const body = await fs.readFile(file);
      const types = { '.js': 'application/javascript', '.html': 'text/html', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.webm': 'video/webm' };
      res.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' });
      res.end(body);
    } catch { res.writeHead(404); res.end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  return { server, url: `http://127.0.0.1:${server.address().port}` };
}
async function main() {
  const { server, url } = await serve();
  let browser;
  try {
    browser = await chromium.launch({ headless: true, ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}), args: ['--no-sandbox'] });
  } catch (error) {
    await new Promise(resolve => server.close(resolve));
    throw error;
  }
  const errors = [], failedRequests = [];
  let count = 0;
  const contexts = [];
  async function context(width, serviceWorkers = 'block') {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, serviceWorkers, reducedMotion: 'reduce' });
    contexts.push(ctx);
    await ctx.addInitScript(() => {
      // Keep an optional seasonal greeting from changing test focus or layout.
      try { localStorage.setItem('triggle:diwali:last-shown', new Date(Date.now() + 19800000).toISOString().slice(0, 10)); } catch {}
    });
    ctx.on('page', page => {
      page.on('pageerror', error => errors.push(error.message));
      page.on('response', response => { if (response.url().startsWith(url) && response.status() >= 400 && !response.url().endsWith('/favicon.ico')) failedRequests.push(response.url() + ': ' + response.status()); });
    });
    return ctx;
  }
  async function visit(ctx, suffix = '/index.html') {
    const page = await ctx.newPage();
    await page.goto(url + suffix);
    await page.waitForFunction(() => window.TRIGGLE_CURRICULUM && document.getElementById('exerciseList').children.length > 0);
    return page;
  }
  async function check(name, run) { await run(); count++; console.log('PASS:', name); }
  async function noOverflow(page, label) {
    const size = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }));
    assert.ok(size.scroll <= size.width + 1, `${label}: document width ${size.scroll} exceeds viewport ${size.width}`);
  }
  async function openSidebar(page) {
    if ((await page.viewportSize()).width <= 800 && !await page.locator('body').evaluate(el => el.classList.contains('drawer-open'))) await page.locator('#browseBtn').click();
  }
  async function selectChapter(page, id) {
    await openSidebar(page);
    await page.locator(`#exerciseList [data-chapter-id="${id}"]`).click();
    await page.locator('#chapterOverview').waitFor({ state: 'visible' });
  }
  try {
    for(const width of [320,390,1280]){
      await check('Class 12 visual lesson opens full-screen on one tap and resets after close at '+width+'px',async()=>{
        const ctx=await context(width);
        // Deterministic browser test: local reviewed WebM is the backup if R2 cannot be reached.
        await ctx.route('https://pub-ed71b86e97a64b428086e292b26fb7a2.r2.dev/**',route=>route.abort());
        const page=await visit(ctx,'/index.html?class=12&question=c12-4-4-1-2');
        const button=page.locator('#visualLessonBtn');
        await button.waitFor({state:'visible'});
        assert.equal(await page.locator('#quickSteps').isVisible(),true,'Written quick solution first');
        assert.equal(await page.locator('#answerBox').isVisible(),true,'Final answer remains first');
        assert.equal(await page.locator('#vlInlinePanel').count(),0,'No inline player should require scrolling');
        assert.equal(await page.locator('#vlFullscreen').count(),0,'No redundant fullscreen button');
        assert.equal(await page.locator('#tabQuick').getAttribute('aria-pressed'),'true');
        assert.equal(await page.locator('#tabGuided').getAttribute('aria-pressed'),'false');
        assert.match(await button.innerText(),/Check out the video explanation/);
        assert.equal(await button.getAttribute('aria-haspopup'),'dialog');
        if(width<=390){
          await page.locator('#focusNavToggle').waitFor({state:'visible'});
          const color=await page.locator('#focusNavToggle').evaluate(el=>getComputedStyle(el).color);
          assert.equal(color,'rgb(188, 24, 74)','The right-side navigation close X should be cherry-red');
        }
        await button.click();
        const viewer=page.locator('#visualLessonDialog');
        await viewer.waitFor({state:'visible'});
        const original='Find x in −3π ≤ x ≤ 3π for which sin x = −1.';
        assert.equal((await page.locator('#vlQuestion').innerText()).trim(),original,
          'Full, exact textbook question appears above the video');
        assert.equal((await page.locator('#vlQuestionSummary').textContent()).trim(),'Full question');
        assert.equal(await page.locator('#vlQuestionDetails').isVisible(),true,
          'Question is always visible, not collapsed behind a disclosure');
        const layout=await page.evaluate(()=>{
          const q=document.querySelector('#vlQuestionDetails').getBoundingClientRect();
          const player=document.querySelector('#vlVideoWrap').getBoundingClientRect();
          return {qTop:q.top,qBottom:q.bottom,qRight:q.right,
            playerTop:player.top,playerHeight:player.height,
            viewportWidth:innerWidth,viewportHeight:innerHeight};
        });
        assert.ok(layout.qBottom<=layout.playerTop+1,
          'The full question must appear directly before the video');
        assert.ok(layout.qTop>=0&&layout.qBottom<layout.viewportHeight&&layout.qRight<=layout.viewportWidth+1,
          'Question must be visible without scrolling or horizontal clipping');
        assert.ok(layout.playerHeight>140,'Video should retain useful height below the question');
        assert.equal(await page.locator('#vlDownloadHelp').isVisible(),false,
          'Do not show download instructions when R2 downloads are disabled');
        const bounds=await viewer.evaluate(el=>({left:el.getBoundingClientRect().left,top:el.getBoundingClientRect().top,width:el.getBoundingClientRect().width,height:el.getBoundingClientRect().height,vw:innerWidth,vh:innerHeight}));
        assert.ok(bounds.left>=-1&&bounds.left<=1 && bounds.top>=-1&&bounds.top<=1,'Dialog starts at viewport origin');
        assert.ok(bounds.width>=bounds.vw-2 && bounds.height>=bounds.vh-2,'Dialog fills viewport without a second fullscreen tap');
        assert.equal(await page.locator('#vlVideo').isVisible(),true,'Viewer shows native video');
        assert.equal(await page.locator('#vlDriveFrame').isVisible(),false,'Drive is not used for the R2 lesson');
        const sources=await page.locator('#vlVideo').evaluate(el=>({
          mp4:el.querySelector('source[type^="video/mp4"]')?.src,
          webm:el.querySelector('source[type^="video/webm"]')?.src,
          paused:el.paused,autoplay:el.autoplay,preload:el.preload
        }));
        assert.equal(sources.mp4,'https://pub-ed71b86e97a64b428086e292b26fb7a2.r2.dev/triggle-class12-ex4-1-q1-ii%20(1).mp4');
        assert.match(sources.webm,/\/videos\/triggle-class12-ex4-1-q1-ii\.webm$/);
        assert.equal(sources.autoplay,false,'Do not autoplay with sound');
        assert.equal(sources.preload,'none');
        const closeColor=await page.locator('#vlClose').evaluate(el=>getComputedStyle(el).color);
        assert.equal(closeColor,'rgb(171, 23, 61)','Close action must be cherry-red');
        if(width===390){
          await page.evaluate(async()=>{
            const el=document.getElementById('vlVideo');
            el.muted=true;
            await el.play();
          });
          await page.waitForFunction(()=>document.getElementById('vlVideo').currentTime>0.25,null,{timeout:15000});
          assert.match(await page.locator('#vlVideo').evaluate(el=>el.currentSrc),/\.webm$/,'R2 network failure should play local WebM backup');
        }
        await page.locator('#vlClose').click();
        await page.waitForFunction(()=>!document.querySelector('#visualLessonDialog').open);
        assert.equal(await button.isVisible(),true,'Return to the original question CTA');
        assert.match(await button.innerText(),/Check out the video explanation/);
        assert.equal(await page.locator('#vlMp4Source').getAttribute('src'),null,'Close unloads media');
        await button.click();
        await viewer.waitFor({state:'visible'});
        await page.locator('#vlClose').click();
        await page.waitForFunction(()=>!document.querySelector('#visualLessonDialog').open);
        await noOverflow(page,'full-screen lesson after close at '+width+'px');
        await page.goto(url+'/index.html?class=12&question=c12-4-4-1-1');
        await page.waitForFunction(()=>window.TriggleVisualPlayer?.status.questionId===null);
        assert.equal(await page.locator('#visualLessonBtn').isVisible(),false,'Video does not leak to other questions');
      });
    }
    await check('R2 videos use the same instant full-viewport player on mobile',async()=>{
      const ctx=await context(390);
      const origin='https://videos.triggle.example';
      await ctx.route('**/data/video-lessons.json',route=>route.fulfill({
        status:200,contentType:'application/json',body:JSON.stringify({lessons:[{
          ...require('../data/video-lessons.json').lessons[0],
          provider:'cloudflare-r2',video:origin+'/grade-12/chapter-4/q1-ii/en.mp4',
          webm:origin+'/grade-12/chapter-4/q1-ii/en.webm',downloadAllowed:false
        }]})
      }));
      await ctx.route(origin+'/**',route=>route.abort());
      const page=await visit(ctx,'/index.html?class=12&question=c12-4-4-1-2');
      await page.locator('#visualLessonBtn').waitFor({state:'visible'});
      assert.equal(await page.locator('#quickSteps').isVisible(),true);
      await page.locator('#visualLessonBtn').click();
      await page.locator('#visualLessonDialog').waitFor({state:'visible'});
      const src=await page.locator('#vlVideo').evaluate(el=>({
        mp4:el.querySelector('source[type^="video/mp4"]')?.src,
        webm:el.querySelector('source[type^="video/webm"]')?.src
      }));
      assert.equal(src.mp4,origin+'/grade-12/chapter-4/q1-ii/en.mp4');
      assert.equal(src.webm,origin+'/grade-12/chapter-4/q1-ii/en.webm');
      assert.equal(await page.locator('#vlDownload').isVisible(),false,'No cross-origin download promise');
      await page.locator('#vlClose').click();
      await page.waitForFunction(()=>!document.querySelector('#visualLessonDialog').open);
      assert.match(await page.locator('#visualLessonBtn').innerText(),/Check out the video explanation/);
    });
    await check('Tamil lesson action opens full-screen and returns to Tamil label',async()=>{
      const page=await visit(await context(390),'/index.html?class=12&question=c12-4-4-1-2');
      await page.locator('#visualLessonBtn').waitFor({state:'visible'});
      await page.locator('#langTa').click();
      assert.match(await page.locator('#visualLessonBtn').innerText(),/காணொளி/);
      await page.locator('#visualLessonBtn').click();
      await page.locator('#visualLessonDialog').waitFor({state:'visible'});
      assert.match(await page.locator('#vlCloseLabel').innerText(),/கேள்விக்குத் திரும்பு/);
      assert.equal((await page.locator('#vlQuestionSummary').textContent()).trim(),'முழுக் கேள்வி');
      assert.equal((await page.locator('#vlQuestion').innerText()).trim(),
        '−3π ≤ x ≤ 3π வரம்பில் sin x = −1 ஆகும் x மதிப்புகளைக் காண்க.',
        'Tamil interface shows the exact Tamil version of the textbook question');
      await page.locator('#vlClose').click();
      await page.waitForFunction(()=>!document.querySelector('#visualLessonDialog').open);
      assert.match(await page.locator('#visualLessonBtn').innerText(),/காணொளி/);
    });
    await check('Google Drive lesson preview is safe, mobile friendly and question-specific',async()=>{
      const ctx=await context(390);
      const fileId='1A2bC3dE4fG5hI6jK7lM8nO9pQ';
      await ctx.route('**/data/video-lessons.json',route=>route.fulfill({
        status:200,contentType:'application/json',body:JSON.stringify({schemaVersion:1,lessons:[
          {questionId:'c12-4-4-1-2',status:'ready',provider:'google-drive',fileId,
           language:'en',class:12,exercise:'4.1',question:'Q1(ii)',
           title:{en:'Solving sine x equals negative one',ta:'சைன் கோணத் தீர்வுகள்'}}
        ]})
      }));
      await ctx.route('https://drive.google.com/**',route=>route.fulfill({
        status:200,contentType:'text/html',body:'<!doctype html><title>Drive preview fixture</title>'
      }));
      const page=await visit(ctx,'/index.html?class=12&question=c12-4-4-1-2');
      await page.locator('#visualLessonBtn').waitFor({state:'visible'});
      assert.equal(await page.locator('#vlDriveFrame').getAttribute('src'),null,
        'Drive must not load in background without a click');
      await page.locator('#visualLessonBtn').click();
      await page.locator('#visualLessonDialog').waitFor({state:'visible'});
      assert.equal(await page.locator('#vlDriveFrame').getAttribute('src'),
        'https://drive.google.com/file/d/'+fileId+'/preview');
      assert.equal(await page.locator('#vlDriveFrame').isVisible(),true);
      assert.equal((await page.locator('#vlQuestion').innerText()).trim(),
        'Find x in −3π ≤ x ≤ 3π for which sin x = −1.',
        'Legacy Drive lessons also show the exact question above the video');
      assert.equal(await page.locator('#vlVideo').isVisible(),false);
      assert.equal(await page.locator('#vlSpeed').isVisible(),false,
        'Drive embeds have their own controls');
      assert.equal(await page.locator('#vlFullscreen').isVisible(),false);
      assert.equal(await page.locator('#vlDownload').getAttribute('href'),
        'https://drive.google.com/file/d/'+fileId+'/view');
      assert.match(await page.locator('#vlDownload').innerText(),/Open in Google Drive/);
      await noOverflow(page,'Drive preview on Android phone');
      await page.locator('#vlClose').click();
      await page.waitForFunction(()=>!document.querySelector('#visualLessonDialog').open);
      assert.equal(await page.locator('#vlDriveFrame').getAttribute('src'),null,
        'Drive playback must stop when leaving lesson dialog');
      const unrelated=await visit(ctx,'/index.html?class=12&question=c12-4-4-1-1');
      await unrelated.waitForTimeout(250);
      assert.equal(await unrelated.locator('#visualLessonBtn').isVisible(),false,
        'A video for Q1(ii) must not appear on Q1(i)');
    });
    await check('Unverified Google Drive file IDs never enable visual playback',async()=>{
      const ctx=await context(390);
      await ctx.route('**/data/video-lessons.json',route=>route.fulfill({
        status:200,contentType:'application/json',body:JSON.stringify({lessons:[
          {questionId:'c12-4-4-1-2',status:'ready',provider:'google-drive',fileId:'../../invalid',language:'en'}
        ]})
      }));
      const page=await visit(ctx,'/index.html?class=12&question=c12-4-4-1-2');
      await page.waitForTimeout(300);
      assert.equal(await page.locator('#visualLessonBtn').isVisible(),false);
      assert.equal(await page.locator('#vlDriveFrame').getAttribute('src'),null);
    });
    for(const width of [320,390]){
      await check('Immersive question controls hide together and return on screen tap at '+width+'px',async()=>{
        const page=await visit(await context(width),'/index.html?class=9&question=c9-example-6-1');
        await page.locator('#focusNavToggle').waitFor({state:'visible'});
        assert.equal(await page.locator('body').evaluate(el=>el.classList.contains('question-focus')),true);
        assert.equal(await page.locator('body').evaluate(el=>el.classList.contains('focus-controls-visible')),true);
        const dimensions=await page.evaluate(()=>({
          app:document.querySelector('.app-shell').getBoundingClientRect().height,
          content:document.querySelector('.lesson-container').getBoundingClientRect().height,
          screen:window.innerHeight,
          position:getComputedStyle(document.querySelector('.page-controls')).position,
          above:document.querySelector('.page-controls').getBoundingClientRect().bottom<
            document.querySelector('.class-dock').getBoundingClientRect().top+5
        }));
        assert.equal(dimensions.position,'fixed','Previous/Next should float over the question');
        assert.ok(dimensions.app>=dimensions.screen-2,`Exercise view should fill the whole phone viewport: ${JSON.stringify(dimensions)}`);
        assert.ok(dimensions.above,'Floating question controls should not cover the class dock');
        await page.evaluate(()=>window.TriggleFocusNavigation.hide());
        assert.equal(await page.locator('body').evaluate(el=>el.classList.contains('focus-controls-visible')),false);
        for(const selector of ['.appbar','.page-controls','.class-dock']){
          assert.equal(await page.locator(selector).evaluate(el=>el.inert),true,'Hidden '+selector+' cannot retain keyboard focus');
        }
        assert.match(await page.locator('#focusNavToggle').getAttribute('aria-label'),/Show navigation/);
        // Tapping the problem itself reveals controls without changing answers.
        await page.locator('#questionText').click({position:{x:12,y:10}});
        assert.equal(await page.locator('body').evaluate(el=>el.classList.contains('focus-controls-visible')),true);
        await page.locator('#next').click();
        assert.equal(new URL(page.url()).searchParams.has('question'),true);
        assert.equal(await page.locator('.page-controls').isVisible(),true);
        await page.evaluate(()=>window.TriggleFocusNavigation.hide());
        await page.locator('#focusNavToggle').click();
        assert.equal(await page.locator('body').evaluate(el=>el.classList.contains('focus-controls-visible')),true);
        await page.locator('#langTa').click();
        assert.match(await page.locator('#focusNavToggle').getAttribute('aria-label'),/வழிசெலுத்தலை/);
        await page.locator('#homeBtn').click();
        assert.equal(await page.locator('body').evaluate(el=>el.classList.contains('question-focus')),false);
        assert.equal(await page.locator('#focusNavToggle').isVisible(),false,'Home does not inherit question focus UI');
        for(const selector of ['.appbar','.page-controls','.class-dock']){
          assert.equal(await page.locator(selector).evaluate(el=>el.inert),false,'Navigation must reset outside questions');
        }
        await noOverflow(page,'full-height mobile immersive reader at '+width+'px');
      });
    }
    await check('Touch reading mode auto-hides, keyboard Tab recovers and modal remains accessible',async()=>{
      const page=await visit(await context(390),'/index.html?class=9&question=c9-example-6-2');
      await page.waitForFunction(()=>document.body.classList.contains('question-focus')&&!document.body.classList.contains('focus-controls-visible'),{timeout:12000});
      assert.equal(await page.locator('.appbar').isVisible(),false);
      await page.keyboard.press('Tab');
      assert.equal(await page.locator('.appbar').isVisible(),true,'Keyboard Tab reveals the navigation');
      assert.equal(await page.locator('.page-controls').evaluate(el=>el.inert),false);
      await page.locator('#focusNavToggle').click();
      assert.equal(await page.locator('#focusNavToggle').getAttribute('aria-expanded'),'false');
      await page.locator('#focusNavToggle').click();
      assert.equal(await page.locator('#focusNavToggle').getAttribute('aria-expanded'),'true');
      await page.locator('#tabGuided').click();
      await page.locator('#guidedDialog').waitFor({state:'visible'});
      await page.evaluate(()=>window.TriggleFocusNavigation.hide());
      assert.equal(await page.locator('.appbar').evaluate(el=>el.inert),false,'No hiding during an open teaching dialog');
      await page.locator('#closeGuided').click();
      await noOverflow(page,'immersive dialog and keyboard');
    });
    await check('Immersive controls do not affect chapter menus or desktop',async()=>{
      const mobilePage=await visit(await context(390),'/index.html?class=9&chapter=g9-ch1');
      assert.equal(await mobilePage.locator('#focusNavToggle').isVisible(),false);
      assert.equal(await mobilePage.locator('body').evaluate(el=>el.classList.contains('question-focus')),false);
      const desktop=await visit(await context(1280),'/index.html?class=9&question=c9-example-6-1');
      assert.equal(await desktop.locator('#focusNavToggle').isVisible(),false);
      assert.equal(await desktop.locator('body').evaluate(el=>el.classList.contains('question-focus')),false);
      assert.notEqual(await desktop.locator('.page-controls').evaluate(el=>getComputedStyle(el).position),'fixed');
    });
    for(const width of [320,390,1280]){
      await check('Home, class directory, chapter jump, browser Back and Tamil at '+width+'px', async()=>{
        const page=await visit(await context(width),'/index.html');
        await page.locator('#discoveryView').waitFor({state:'visible'});
        assert.equal(await page.locator('#lessonCard').isVisible(),false,'Home must not open an unrelated question');
        assert.match(await page.locator('#homeBtn').innerText(), /Home/);
        assert.equal(await page.locator('.discover-grade-grid [data-grade]').count(),4);
        assert.equal(await page.locator('a[href="./playground.html"]').count(),0,'Retire all Trigonometry Basics shortcuts');
        assert.ok((await page.locator('.discover-hero h1').innerText()).includes('Maths should make sense'));
        await noOverflow(page,'Home '+width+'px');

        // Class buttons should open a CHAPTER DIRECTORY, not a random saved question.
        await page.locator('.discover-grade-grid [data-grade="10"]').click();
        assert.equal(new URL(page.url()).searchParams.get('class'),'10');
        assert.equal(new URL(page.url()).searchParams.get('browse'),'chapters');
        assert.equal(await page.locator('.discover-chapter-grid [data-chapter]').count(),8);
        assert.equal(await page.locator('#lessonCard').isVisible(),false);
        await page.locator('#discover-search').fill('Algebra');
        assert.equal(await page.locator('.discover-chapter-grid [data-chapter]:visible').count(),1);
        await page.locator('#discover-jump').selectOption('g10-ch3');
        assert.equal(new URL(page.url()).searchParams.get('chapter'),'g10-ch3');
        assert.equal(await page.locator('#chapterOverviewTitle').innerText(),'Algebra');
        assert.equal(await page.locator('.hub-section-card').count(),4);
        await page.locator('.hub-resource-link').click();
        assert.equal(new URL(page.url()).searchParams.get('section'),'sources');
        assert.equal(await page.locator('.hub-source').count()>0,true);
        await page.locator('#homeBtn').click();
        assert.equal(new URL(page.url()).searchParams.has('class'),false);
        assert.equal(await page.locator('#discoveryView').isVisible(),true);
        await page.goBack();
        assert.equal(new URL(page.url()).searchParams.get('chapter'),'g10-ch3');
        await page.locator('#homeBtn').click();
        await page.locator('#langTa').click();
        assert.equal(await page.locator('html').getAttribute('lang'),'ta');
        assert.match(await page.locator('.discover-hero h1').innerText(),/கணிதம்/);
        assert.match(await page.locator('.discover-section h2').first().innerText(),/வகுப்/);
        await noOverflow(page,'Tamil Home '+width+'px');
      });
    }
    await check('Grade 9 chapter directory accurately advertises interactive lessons in both languages',async()=>{
      const page=await visit(await context(390),'/index.html?class=9&browse=chapters');
      const chapter1=page.locator('.discover-chapter-grid [data-chapter="g9-ch1"] .discover-chapter-meta');
      const chapter2=page.locator('.discover-chapter-grid [data-chapter="g9-ch2"] .discover-chapter-meta');
      const chapter3=page.locator('.discover-chapter-grid [data-chapter="g9-ch3"] .discover-chapter-meta');
      assert.match(await chapter1.innerText(),/7 Interactive mini-lessons available/i);
      assert.match(await chapter2.innerText(),/8 Interactive mini-lessons available/i);
      assert.doesNotMatch(await chapter2.innerText(),/More lessons coming/i);
      assert.match(await chapter3.innerText(),/More lessons coming/i);
      assert.match(await page.locator('#exerciseList [data-chapter-id="g9-ch2"] small').textContent(),/8 interactive concepts/);
      await page.locator('#langTa').click();
      assert.match(await chapter2.innerText(),/8 சிறு செயல்வழிப் பாடங்கள் உள்ளன/);
      assert.match(await page.locator('#exerciseList [data-chapter-id="g9-ch2"] small').textContent(),/8 செயல்வழிக் கருத்துகள்/);
      await page.locator('.discover-chapter-grid [data-chapter="g9-ch2"]').click();
      await page.locator('.hub-section-card[data-hub-section="concepts"]').click();
      assert.equal(await page.locator('.rnlab [data-nav] button').count(),8);
      await noOverflow(page,'Tamil Real Numbers concepts from chapter directory');
    });
    await check('Chapter selection first offers four choices, not a long unorganized lesson',async()=>{
      const page=await visit(await context(390),'/index.html?class=9&chapter=g9-ch1');
      assert.equal(await page.locator('.hub-section-card').count(),4);
      assert.equal(await page.locator('.sp2-journey').count(),0,'Concepts should wait for a deliberate choice');
      await page.locator('.hub-section-card[data-hub-section="quizzes"]').click();
      assert.equal(new URL(page.url()).searchParams.get('section'),'quizzes');
      assert.equal(await page.locator('.hub-quiz-question').count(),7);
      // The mobile quiz view has no lesson context above it: both questions
      // must print every set needed to solve them.
      for(const [index,definitions] of [
        [3,['A={1,2,3,5}','B={3,4,5,6}']],
        [5,['U={1,2,3,4,5,6}','A={1,2,3}','B={3,4}']]
      ]){
        const heading=await page.locator('.hub-quiz-question h4').nth(index).innerText();
        for(const definition of definitions)
          assert(heading.includes(definition),'Quiz question '+(index+1)+' must display '+definition+' on mobile');
      }
      assert.equal(await page.locator('.hub-section-card').count(),0,'Quiz screen should not show large menu cards');
      assert.equal(await page.locator('#chapterOverviewTitle').innerText(),'Quizzes');
      await page.locator('.hub-quiz-question').first().locator('button').nth(1).click();
      assert.ok((await page.locator('.hub-quiz-progress').innerText()).includes('1 / 7'));
      await page.locator('.hub-back-menu').click();
      await page.locator('.hub-section-card[data-hub-section="concepts"]').click();
      await page.locator('.sp2-journey').waitFor({state:'visible'});
      await page.locator('.sp2-journey [data-nav] [data-index="5"]').click();
      assert.ok((await page.locator('.sp2-panel h4').innerText()).includes('De Morgan'));
      await page.locator('.hub-back-menu').click();
      await page.locator('.hub-section-card[data-hub-section="exercises"]').click();
      assert.equal(await page.locator('.hub-question').count(),19,'All 18 textbook subparts and the original practice should be accessible');
      assert.equal(await page.locator('.hub-question[data-question-id="c9-1-1-practice-1"]').count(),1,'Preserve original practice ID');
      await page.locator('.hub-question[data-question-id="c9-1-1-practice-1"]').click();
      assert.equal(new URL(page.url()).searchParams.has('question'),true);
      assert.equal(await page.locator('#lessonCard').isVisible(),true);
      await page.goBack();
      assert.equal(new URL(page.url()).searchParams.get('section'),'exercises');
      await page.locator('.hub-back-menu').click();
      assert.equal(new URL(page.url()).searchParams.has('section'),false);
      await page.locator('#homeBtn').click();
      await page.locator('#discover-search').fill('கண மொழி');
      assert.ok(await page.locator('.discover-results [data-chapter="g9-ch1"]').count()>0);
      await page.locator('.discover-results [data-chapter="g9-ch1"]').click();
      assert.equal(new URL(page.url()).searchParams.get('chapter'),'g9-ch1');
      await noOverflow(page,'chapter hub at 390px');
    });
    await check('Worked examples are not mislabeled exercises, and both are one tap away',async()=>{
      const page=await visit(await context(390),'/index.html?class=9&chapter=g9-ch6');
      assert.equal(await page.locator('.hub-section-card').count(),4);
      await page.locator('.hub-section-card[data-hub-section="examples"]').click();
      assert.equal(await page.locator('.hub-question').count(),4,'Only four explicitly labelled Example items');
      assert.ok((await page.locator('.hub-question').first().innerText()).includes('Example 6.1'));
      await page.locator('.hub-back-menu').click();
      await page.locator('.hub-section-card[data-hub-section="exercises"]').click();
      assert.equal(await page.locator('.hub-question').count(),40,'40 exercise questions remain under Exercises');
      await page.locator('.hub-question').first().click();
      assert.equal(await page.locator('#lessonCard').isVisible(),true);
      assert.ok((await page.locator('#stepsList li').count())>0,'Existing worked solution remains accessible');
      assert.match(await page.locator('#questionReturnBtn').innerText(),/Back to Exercises/);
      await page.locator('#questionReturnBtn').click();
      assert.equal(new URL(page.url()).searchParams.get('section'),'exercises');
      assert.equal(await page.locator('.hub-question').count(),40);
      await page.locator('.hub-back-menu').click();
      assert.equal(await page.locator('.hub-section-card').count(),4);
      await page.locator('.hub-back-class').click();
      assert.equal(await page.locator('.discover-chapter-grid [data-chapter]').count(),9);
      assert.equal(new URL(page.url()).searchParams.get('browse'),'chapters');
    });
    for(const width of [320,390,1280]){
      await check('Direct section first, honest unavailable states, single Home and correct Back at '+width+'px', async()=>{
        const page=await visit(await context(width),'/index.html?class=9&chapter=g9-ch6');
        assert.equal(await page.locator('.hub-section-card').count(),4);
        assert.equal(await page.locator('#homeBtn').count(),1);
        assert.equal(await page.locator('.hub-back-home').count(),0,'No duplicate Home inside chapter');
        assert.equal(await page.locator('.sidebar-foot a[href]').count(),0,'No second Home in sidebar footer');
        await page.locator('.hub-section-card[data-hub-section="quizzes"]').click();
        assert.equal(await page.locator('.hub-section-card').count(),0,'A selected section must hide all four menu cards');
        assert.equal(await page.locator('#chapterOverviewTitle').innerText(),'Quizzes');
        assert.equal(await page.locator('.hub-panel').count(),1);
        assert.equal(await page.locator('.hub-quiz-question').count(),0);
        assert.match(await page.locator('.hub-info').first().innerText(),/coming soon/);
        assert.equal(await page.locator('.hub-next-section').count(),0,'No unrelated link to Exercises');
        const box=await page.locator('.hub-panel').boundingBox();
        assert(box && box.y < 840,'The chosen section should appear without scrolling through cards');
        await noOverflow(page,'unavailable quiz at '+width+'px');
        await page.locator('.hub-back-menu').click();
        assert.equal(await page.locator('.hub-section-card').count(),4);
        assert.equal(new URL(page.url()).searchParams.has('section'),false);
        await page.locator('.hub-section-card[data-hub-section="concepts"]').click();
        assert.equal(await page.locator('.hub-section-card').count(),0);
        assert.equal(await page.locator('#chapterOverviewTitle').innerText(),'Concepts');
        assert.match(await page.locator('.hub-info').first().innerText(),/coming soon/);
        assert.equal(await page.locator('.hub-next-section').count(),0);
        await page.locator('.hub-back-menu').click();
        await page.locator('.hub-section-card[data-hub-section="examples"]').click();
        assert.equal(await page.locator('.hub-question').count(),4);
        assert.equal(await page.locator('.hub-section-card').count(),0);
        await page.locator('.hub-back-menu').click();
        await page.locator('.hub-back-class').click();
        assert.equal(await page.locator('.discover-chapter-grid [data-chapter]').count(),9);
        assert.equal(await page.locator('.discover-change').count(),0,'No duplicate Change class navigation');
        assert.match(await page.locator('.discover-back').innerText(),/All classes/);
        await page.locator('.discover-back').click();
        assert.equal(await page.locator('.discover-grade-grid [data-grade]').count(),4);
        await page.locator('.discover-grade-grid [data-grade="9"]').click();
        await page.locator('.discover-chapter-grid [data-chapter="g9-ch1"]').click();
        await page.locator('#langTa').click();
        await page.locator('.hub-section-card[data-hub-section="quizzes"]').click();
        assert.match(await page.locator('#chapterOverviewTitle').innerText(),/சிறு தேர்வுகள்/);
        assert.equal(await page.locator('.hub-section-card').count(),0);
        await page.locator('.hub-back-menu').click();
        assert.equal(await page.locator('.hub-section-card').count(),4);
        await noOverflow(page,'Tamil direct sections at '+width+'px');
      });
    }
    await check('Deep links and browser Back open only the requested section',async()=>{
      const page=await visit(await context(390),'/index.html?class=9&chapter=g9-ch1&section=quizzes');
      assert.equal(await page.locator('.hub-quiz-question').count(),7);
      assert.equal(await page.locator('.hub-section-card').count(),0);
      await page.locator('.hub-back-menu').click();
      assert.equal(await page.locator('.hub-section-card').count(),4);
      await page.goBack();
      assert.equal(new URL(page.url()).searchParams.get('section'),'quizzes');
      assert.equal(await page.locator('.hub-section-card').count(),0);
      await page.reload();
      assert.equal(await page.locator('.hub-quiz-question').count(),7);
      assert.equal(await page.locator('.hub-section-card').count(),0);
    });
    await check('Find a Topic opens chapter navigation, with search below chapter list',async()=>{
      const page=await visit(await context(320),'/index.html?class=9&chapter=g9-ch1');
      await page.locator('#browseBtn').click();
      await page.locator('#sidebar').waitFor({state:'visible'});
      assert.equal(await page.locator('#exerciseList [data-chapter-id]').count(),9);
      assert.equal(await page.locator('#exerciseList [data-section]').count(),4);
      const order=await page.evaluate(()=>{
        const list=document.querySelector('#exerciseList');
        const search=document.querySelector('.sidebar-search-bottom');
        return !!(list.compareDocumentPosition(search)&Node.DOCUMENT_POSITION_FOLLOWING);
      });
      assert.ok(order,'Optional search belongs BELOW the navigation');
      await page.locator('#exerciseList [data-section="examples"]').click();
      assert.equal(new URL(page.url()).searchParams.get('section'),'examples');
      assert.equal(await page.locator('.hub-question').count(),35,'All 35 textbook examples appear in Chapter 1');
      assert.match(await page.locator('.hub-question').first().innerText(),/Example 1\.1/);
      assert.match(await page.locator('.hub-question').last().innerText(),/Example 1\.35/);
      await noOverflow(page,'mobile chapter-first drawer');
      await page.locator('.hub-question').first().click();
      assert.equal(await page.locator('#stepsList li').count(),2,'Example 1.1 has two worked steps');
      assert.match(await page.locator('#questionHead').innerText(),/Example 1\.1/);
    });
    for(const width of [320,390,1280]){
      await check('Real Numbers 2025 sections, hard-only explanation and figure at '+width+'px',async()=>{
        const page=await visit(await context(width),'/index.html?class=9&chapter=g9-ch2&section=examples');
        assert.equal(await page.locator('.hub-question').count(),31,'31 textbook examples');
        assert.match(await page.locator('.hub-question').first().innerText(),/Example 2\.1/);
        assert.match(await page.locator('.hub-question').last().innerText(),/Example 2\.31/);
        await noOverflow(page,'Real Numbers example list at '+width+'px');
        await page.locator('.hub-question').nth(4).click();
        assert.match(await page.locator('#questionHead').innerText(),/Example 2\.5/);
        assert.equal(await page.locator('#solutionModeRow').isVisible(),true,'hard-only Detailed explanation');
        await page.locator('#tabGuided').click();
        assert.equal(await page.locator('#guidedDialog').evaluate(el=>el.open),true);
        await page.locator('#closeGuided').click();
        await page.locator('#questionReturnBtn').click();
        await page.locator('.hub-question').nth(3).click();
        assert.equal(await page.locator('#solutionModeRow').isVisible(),false,'easy problem has no detailed tab');
        await page.locator('#questionReturnBtn').click();
        await page.locator('.hub-question').nth(12).click();
        assert.equal(await page.locator('#figureBtn').isVisible(),true,'number line has figure icon');
        await page.locator('#figureBtn').click();
        assert.equal(await page.locator('#figureDialog').evaluate(el=>el.open),true);
        assert.equal(await page.locator('#diagramContent svg').count(),1);
        await page.locator('#closeDiagram').click();
        await page.locator('#langTa').click();
        assert.match(await page.locator('#questionText').innerText(),/எண்கோட்டில்|கட்டமைத்துக்|குறிக்கவும்/);
        await noOverflow(page,'Tamil Real Numbers question at '+width+'px');
      });
    }
    for(const width of [320,390,1280]){
      await check('Example 2.12 readable ChatGPT-style worked solution at '+width+'px',async()=>{
        const page=await visit(await context(width),'/index.html?class=9&chapter=g9-ch2&section=examples');
        await page.locator('.hub-question').nth(11).click();
        assert.match(await page.locator('#questionHead').innerText(),/Example 2\.12/);
        assert.equal(await page.locator('#lessonCard.twd-lesson').count(),1,'Authored example layout enabled');
        assert.equal(await page.locator('#questionText .twd-question-part').count(),0,'Do not show all questions before their answers');
        assert.equal(await page.locator('#stepsList .twd-question-part').count(),4,'Four question subparts each paired with an answer');
        assert.equal(await page.locator('#stepsList > li.twd-worked-step').count(),4,'Four worked subparts visible without expansion');
        assert.equal(await page.locator('#stepsList [data-variable="x"]').count(),4);
        assert.equal(await page.locator('#stepsList [data-variable="y"]').count(),4);
        assert.equal(await page.locator('#answerText .twd-final-row').count(),0,'No duplicate final answer summary');
        assert.equal(await page.locator('#answerBox').isVisible(),false,'Answers stay directly beneath the corresponding questions');
        assert.equal(await page.locator('#stepsList .twd-kind').count(),8,'All eight rationality classifications stay beside their calculations');
        assert.equal(await page.locator('#stepsList math[display="block"]').count(),32,'Each of four questions has four question expressions and four answer expressions');
        const paired=await page.locator('#stepsList > li.twd-worked-step').evaluateAll(items=>items.map(li=>({question:li.querySelector('.twd-question-part')?.getAttribute('data-worked-question'),answer:li.querySelector('.twd-part-solution')?.getAttribute('aria-label'),order:!!(li.querySelector('.twd-question-part')?.compareDocumentPosition(li.querySelector('.twd-part-solution'))&Node.DOCUMENT_POSITION_FOLLOWING)})));
        assert.deepEqual(paired.map(x=>x.question),['i','ii','iii','iv']);
        assert.ok(paired.every(x=>x.order&&x.answer?.startsWith('Answer')),'Each question must come immediately before its own answer: '+JSON.stringify(paired));
        assert.ok(await page.locator('#stepsList math mfrac').count()>=2,'Quotients use real stacked fractions');
        const equation=await page.locator('#stepsList .twd-calculation .twd-math').first().evaluate(el=>{
          const eq=el.getBoundingClientRect(),parent=el.closest('.twd-display-equation').getBoundingClientRect();
          return {fontSize:parseFloat(getComputedStyle(el).fontSize),centre:Math.abs((eq.left+eq.right)/2-(parent.left+parent.right)/2),
            overflows:el.scrollWidth>el.clientWidth+2};
        });
        assert.ok(equation.fontSize>=18,'Readable math font, not a squashed inline equation: '+JSON.stringify(equation));
        assert.ok(equation.centre<=3,'Display equation must remain centered: '+JSON.stringify(equation));
        await noOverflow(page,'Example 2.12 English worked example at '+width+'px');
        if(width===390){
          await page.locator('#tabGuided').click();
          assert.equal(await page.locator('#guidedQuestion .twd-question-part').count(),4,'Pinned question remains readable in Detailed explanation');
          await page.locator('#closeGuided').click();
          await page.locator('#langTa').click();
          assert.equal(await page.locator('#questionText .twd-question-part').count(),0);
          assert.equal(await page.locator('#stepsList .twd-question-part').count(),4);
          assert.match(await page.locator('#stepsList').innerText(),/விகிதமுறு/);
          assert.equal(await page.locator('#answerText .twd-final-row').count(),0);
          assert.equal(await page.locator('#stepsList .twd-part-solution').count(),4);
          await noOverflow(page,'Example 2.12 Tamil worked example at 390px');
          await page.locator('#questionReturnBtn').click();
          await page.locator('.hub-question').nth(10).click();
          assert.equal(await page.locator('#lessonCard.twd-lesson').count(),0,'Other worked examples remain unchanged');
          assert.equal(await page.locator('#stepsList li').count(),2,'Other example steps still work');
        }
      });
    }
    await check('Real Numbers full exercises, concepts and quizzes show correct counts',async()=>{
      const page=await visit(await context(390),'/index.html?class=9&chapter=g9-ch2&section=exercises');
      assert.equal(await page.locator('.hub-question').count(),121,'120 textbook units plus existing practice');
      await page.locator('.hub-back-menu').click();
      await page.locator('.hub-section-card[data-hub-section="concepts"]').click();
      assert.equal(await page.locator('.rnlab [data-nav] button').count(),8,'eight interactive Real Numbers concepts');
      const lab=page.locator('.rnlab');
      assert.equal(await lab.locator('input[type="range"]').count(),1,'movable rational number line');
      await lab.locator('input[type="range"]').evaluate(input=>{input.value='10';input.dispatchEvent(new Event('input',{bubbles:true}));});
      assert.match(await lab.locator('[data-demo-output]').innerText(),/7\/12/);
      await lab.locator('[data-answers] button').nth(0).click();
      await lab.locator('[data-answers] button').nth(1).click();
      assert.match(await lab.locator('[data-progress]').innerText(),/1 \/ 8/);
      await lab.locator('[data-nav] [data-index="1"]').click();
      await lab.locator('[data-demo-mode="repeat"]').click();
      assert.match(await lab.locator('[data-demo-output]').innerText(),/Repeating/);
      await lab.locator('[data-nav] [data-index="4"]').click();
      // Grade 9 surd options: a baseline coefficient must be visibly separated
      // from the radical; a fifth-root index uses <mroot> instead.
      const rootOption=lab.locator('[data-answers] button').first();
      assert.equal(await rootOption.locator('math > mrow > mn').first().textContent(),'5');
      assert.equal(await rootOption.locator('math > mrow > msqrt').count(),1,'5√3 is a coefficient times a square root');
      const gap=await rootOption.locator('math > mrow > mspace').evaluate(el=>({
        width:el.getBoundingClientRect().width,
        namespace:el.namespaceURI
      }));
      assert.equal(gap.namespace,'http://www.w3.org/1998/Math/MathML','Coefficient is represented by native MathML');
      assert.ok(gap.width>=1.5,'Coefficient and radical need a visible gap on a 390px mobile screen');
      assert.equal(await lab.locator('[data-answers] button').nth(1).locator('math msqrt').count(),1,
        'A standalone √39 remains a standalone square root');

      await lab.locator('input[type="range"]').evaluate(input=>{input.value='4';input.dispatchEvent(new Event('input',{bubbles:true}));});
      assert.equal(await lab.locator('[data-demo-output] math msqrt').count(),3,'√32, √(4²×2) and √2 must use real radical notation');
      assert.equal((await lab.locator('[data-demo-output] math msqrt').last().textContent()).trim(),'2');
      await lab.locator('[data-nav] [data-index="5"]').click();
      assert.equal(await lab.locator('[data-demo-controls] math mfrac').count(),2,
        'Both rationalisation choices must use real stacked fraction bars');
      assert.equal(await lab.locator('.rnlab-rational-step').count(),4,
        'The full rationalisation must be shown as four readable steps without expansion');
      assert.equal(await lab.locator('.rnlab-chatgpt-math').count(),1,
        'The clean display-math lesson should be enabled for rationalisation only');
      assert.equal(await lab.locator('.rnlab-step-equation math[display="block"]').count(),6,
        'All four steps should use large display maths, including two responsive split equations');
      assert.equal(await lab.locator('.rnlab-equation-flow').count(),2,
        'Multiplication and cancellation should wrap without compressing whole fractions');
      const equationGeometry=await lab.locator('.rnlab-step-equation').first().evaluate(el=>{
        const eq=el.querySelector('math'), container=el.getBoundingClientRect(), rect=eq.getBoundingClientRect();
        return {fontSize:parseFloat(getComputedStyle(eq).fontSize), height:rect.height,
          centreGap:Math.abs((container.left+container.right)/2-(rect.left+rect.right)/2)};
      });
      assert.ok(equationGeometry.fontSize>=22 && equationGeometry.height>=38,
        'The equation must be comfortably sized on a phone: '+JSON.stringify(equationGeometry));
      assert.ok(equationGeometry.centreGap<=2,
        'Display mathematics must be visually centred, like the example: '+JSON.stringify(equationGeometry));
      assert.match(await lab.locator('.rnlab-rational-goal').innerText(),/remove the square root from (?:the denominator|the bottom of the fraction)/i);
      assert.equal((await lab.locator('.rnlab-rational-result math msqrt').textContent()).trim(),'5',
        'For 1/(√5+2), the result must be √5−2');
      await lab.locator('[data-demo-mode="seven"]').click();
      assert.equal((await lab.locator('.rnlab-rational-result math msqrt').textContent()).trim(),'7',
        'For 3/(√7+2), the result must be √7−2');
      assert.equal((await lab.locator('.rnlab-rational-step').nth(2).locator('math mfrac').count()),1,
        'The cancellation step must contain a genuine MathML fraction');
      assert.match(await lab.locator('.rnlab-rational-step').nth(2).innerText(),/7.*4.*3/s,
        'The second example denominator simplifies from 7−4 to 3');
      await noOverflow(page,'Rationalisation four steps at 390px');
      await lab.locator('[data-nav] [data-index="6"]').click();
      await lab.locator('input[type="range"]').evaluate(input=>{input.value='-3';input.dispatchEvent(new Event('input',{bubbles:true}));});
      assert.match(await lab.locator('[data-demo-output]').innerText(),/0\.0032/);
      await lab.locator('[data-nav] [data-index="7"]').click();
      const squaredButton=lab.locator('[data-demo-mode="equation"]');
      assert.equal(await squaredButton.locator('math msup').count(),1,
        'The x²=25 button must render a true raised exponent');
      const vertical=await squaredButton.locator('math msup').evaluate(node=>{
        const [base,power]=node.children;
        return {base:base.getBoundingClientRect().bottom,power:power.getBoundingClientRect().bottom,
          mathNamespace:node.namespaceURI};
      });
      assert.equal(vertical.mathNamespace,'http://www.w3.org/1998/Math/MathML');
      assert.ok(vertical.power<=vertical.base-1,
        'The 2 in x²=25 must sit above the x, not beside it: '+JSON.stringify(vertical));
      assert.equal(await squaredButton.locator('.rnlab-math-choice').count(),1,
        'The complete equation must be an atomic expression inside its flex-based button');
      await squaredButton.click();
      assert.match(await lab.locator('[data-demo-output]').innerText(),/25/);
      await noOverflow(page,'Exponent button and root comparison at 390px');
      await page.locator('#langTa').click();
      assert.match(await page.locator('.rnlab h3').innerText(),/எண்களை/);
      await lab.locator('[data-nav] [data-index="7"]').click();
      assert.equal(await lab.locator('[data-demo-mode="equation"] math msup').count(),1,
        'Tamil lesson must preserve the exact same squared-x typography');
      await lab.locator('[data-nav] [data-index="5"]').click();
      assert.equal(await lab.locator('.rnlab-rational-step').count(),4);
      assert.match(await lab.locator('.rnlab-rational-step').first().innerText(),/தொடக்க/);
      assert.equal(await lab.locator('[data-demo-controls] math mfrac').count(),2,
        'Tamil fraction choices must also have proper fraction bars');
      await noOverflow(page,'Tamil Real Numbers interactive lab at 390px');
      
      await page.locator('.hub-back-menu').click();
      await page.locator('.hub-section-card[data-hub-section="quizzes"]').click();
      assert.equal(await page.locator('.hub-quiz-question').count(),8,'eight concept quizzes');
      await page.locator('#langTa').click();
      assert.match(await page.locator('#chapterOverviewTitle').innerText(),/சிறு தேர்வுகள்/);
    });
    await check('Rationalisation equations remain fully visible on a 320px phone',async()=>{
      const page=await visit(await context(320),'/index.html?class=9&chapter=g9-ch2&section=concepts&concept=5');
      const lab=page.locator('.rnlab');
      await lab.locator('[data-demo-mode="seven"]').click();
      assert.equal(await lab.locator('.rnlab-rational-step').count(),4);
      const bounds=await lab.locator('.rnlab-equation-flow').first().evaluate(el=>{
        const box=el.getBoundingClientRect();
        return {parentWidth:box.width,maxItemWidth:Math.max(...Array.from(el.children,child=>child.getBoundingClientRect().width)),
          exceeds:el.scrollWidth>el.clientWidth+2};
      });
      assert.ok(!bounds.exceeds && bounds.maxItemWidth<=bounds.parentWidth+2,
        'Both fractions must fit the small screen, wrapping if needed: '+JSON.stringify(bounds));
      await noOverflow(page,'Large rationalisation equations at 320px');
    });
    await check('Offline initial Home reload and class directory work without remote scripts', async()=>{
      const ctx=await context(390,'allow');
      const page=await visit(ctx,'/index.html');
      await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
      await page.reload();
      await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
      const cached=await page.evaluate(async()=>{const keys=await caches.keys();const all=await Promise.all(keys.map(async k=>(await (await caches.open(k)).keys()).map(r=>r.url)));return all.flat();});
      assert(cached.some(u=>u.endsWith('/assets/discovery.js')),'New Home logic must be precached');
      assert(cached.some(u=>u.endsWith('/assets/discovery.css')),'New Home styles must be precached');
      await ctx.setOffline(true);
      await page.reload();
      await page.locator('.discover-hero').waitFor({state:'visible'});
      await page.locator('.discover-grade-grid [data-grade="9"]').click();
      assert.equal(await page.locator('.discover-chapter-grid [data-chapter]').count(),9);
      await ctx.setOffline(false);
    });
    await check('41 chapters appear across grades without publishing legacy question coverage', async () => {
      const page = await visit(await context(1280));
      const expected = {9:9, 10:8, 11:12, 12:12};
      let total = 0;
      for (const [grade, amount] of Object.entries(expected)) {
        await page.locator('#sideClasses button').filter({ has: page.locator('b', { hasText: grade }) }).click();
        assert.equal(await page.locator('#exerciseList [data-chapter-id]').count(), amount, `Grade ${grade} chapter count`);
        const chapters = await page.evaluate(g => window.TRIGGLE_CURRICULUM.grades.find(row => row.grade === Number(g)).chapters.map(ch => ({ id:ch.id, title:ch.title.en })), grade);
        for (const chapter of chapters) {
          await selectChapter(page, chapter.id);
          assert.equal(new URL(page.url()).searchParams.get('chapter'), chapter.id);
          assert.equal(await page.locator('#chapterOverviewTitle').innerText(), chapter.title);
        }
        total += amount;
      }
      assert.equal(total, 41);
      assert.equal(await page.evaluate(() => window.TRIGGLE_CURRICULUM.grades.flatMap(g => g.chapters).filter(c => c.status === 'published').length), 0);
    });
    for (const width of [320, 390, 1280]) {
      await check(`empty chapters, Tamil, navigation history and responsive layout at ${width}px`, async () => {
        const page = await visit(await context(width), '/index.html?class=11&chapter=g11-ch1');
        await page.locator('#chapterOverview').waitFor({ state: 'visible' });
        assert.equal(await page.locator('#lessonCard').isVisible(), false);
        assert.equal(await page.locator('#classicLink').isVisible(), false, 'Class 9 classic interface stays hidden on Grade 11 overview');
        assert.equal(await page.locator('#visualLessonAction').isVisible(), false);
        assert.equal(await page.locator('#markDone').isVisible(), false);
        assert.match(await page.locator('#chapterOverview').innerText(), /under development/);
        await noOverflow(page, `${width}px English overview`);
        await page.keyboard.press('ArrowRight');
        assert.equal(new URL(page.url()).searchParams.get('chapter'), 'g11-ch1', 'Question shortcuts do not navigate a planned chapter');
        await page.locator('#crumb button').nth(1).click();
        assert.equal(await page.locator('#pathDialog').evaluate(el => el.open), true);
        assert.equal(await page.locator('#pathOptions .path-option').count(), 12);
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('#pathDialog').evaluate(el => el.open), false);
        await page.locator('#langTa').click();
        assert.equal(await page.locator('html').getAttribute('lang'), 'ta');
        assert.match(await page.locator('#chapterOverview').innerText(), /[\u0B80-\u0BFF]/);
        assert.doesNotMatch(await page.locator('#chapterOverview').innerText(), /Planned|Worked examples|Prerequisites|Quizzes|Terminology/);
        await noOverflow(page, `${width}px Tamil overview`);
        if (width < 430) {
          const browse = await page.locator('#browseBtn').boundingBox();
          const basics = await page.locator('.basics-link').boundingBox();
          assert.ok(browse && basics, 'Both header links remain visible');
          const overlapX = Math.min(browse.x + browse.width, basics.x + basics.width) - Math.max(browse.x, basics.x);
          const overlapY = Math.min(browse.y + browse.height, basics.y + basics.height) - Math.max(browse.y, basics.y);
          assert.ok(overlapX <= 1 || overlapY <= 1, `${width}px Tamil header controls must not overlap`);
          for (const selector of ['#browseBtn', '.basics-link']) {
            const fits = await page.locator(selector).evaluate(el => el.scrollWidth <= el.clientWidth + 1);
            assert.ok(fits, `${width}px ${selector} text must fit its control`);
          }
        }
        if (process.env.TRIGGLE_SCREENSHOTS_DIR) {
          await fs.mkdir(process.env.TRIGGLE_SCREENSHOTS_DIR, { recursive:true });
          await page.screenshot({ path:path.join(process.env.TRIGGLE_SCREENSHOTS_DIR, `curriculum-${width}-ta.png`), fullPage:true });
        }
        await selectChapter(page, 'g11-ch2');
        assert.equal(new URL(page.url()).searchParams.get('chapter'), 'g11-ch2');
        await page.goBack();
        await page.waitForFunction(() => new URL(location.href).searchParams.get('chapter') === 'g11-ch1');
        await page.reload();
        assert.equal(await page.locator('#chapterOverview').isVisible(), true);
        assert.equal(await page.locator('html').getAttribute('lang'), 'ta');
        await noOverflow(page, `${width}px restored overview`);
        await page.goto(url + '/index.html?class=9&question=c9-example-6-1');
        await page.locator('#lessonCard').waitFor({ state: 'visible' });
        await noOverflow(page, `${width}px legacy Tamil question`);
        await selectChapter(page, 'g9-ch6');
        await page.locator('.hub-section-card[data-hub-section="examples"]').click();
        await page.locator('#chapterOverview [data-question-id="c9-example-6-1"]').click();
        assert.equal(new URL(page.url()).searchParams.get('question'), 'c9-example-6-1');
        assert.equal(await page.locator('#lessonCard').isVisible(), true);
        await noOverflow(page, `${width}px legacy question from chapter`);
        await page.close();
      });
    }
    await check('all 105 legacy deep links retain questions and working solutions', async () => {
      const ctx = await context(1280);
      const page = await visit(ctx);
      const links = await page.evaluate(() => Object.entries(window.TRIGGLE_CLASSES).flatMap(([grade,data]) => data.items.filter(item => !item.id.startsWith('g9-ch1-ex1.1-') && !item.id.startsWith('c9-textbook-example-') && !item.id.startsWith('g9-ch2-')).map(item => ({ grade, id:item.id }))));
      assert.equal(links.length, 105);
      for (const {grade,id} of links) {
        await page.goto(url + `/index.html?class=${grade}&question=${id}`);
        await page.waitForFunction(id => new URL(location.href).searchParams.get('question') === id && document.querySelector('#stepsList li'), id);
        assert.equal(new URL(page.url()).searchParams.get('question'), id);
        assert.equal(await page.locator('#lessonCard').isVisible(), true, id);
        assert.equal(await page.locator('#chapterOverview').isVisible(), false, id);
        assert.ok(await page.locator('#stepsList li').count() > 0, id);
        assert.ok((await page.locator('#answerText').innerText()).trim(), id);
      }
      await page.close();
    });
    await check('legacy progress, diagrams and immersive lessons survive chapter navigation', async () => {
      const page = await visit(await context(1280), '/index.html?class=9&question=c9-example-6-2');
      const question = await page.locator('#questionText').innerText();
      await page.locator('#markDone').click();
      assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'), 'true');
      await page.reload();
      assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'), 'true');
      await page.locator('#figureBtn').click();
      assert.equal(await page.locator('#figureDialog').evaluate(el => el.open), true);
      assert.ok(await page.locator('#diagramContent svg').count() > 0);
      await page.locator('#closeDiagram').click();
      await page.locator('#tabGuided').click();
      assert.equal(await page.locator('#guidedDialog').evaluate(el => el.open), true);
      assert.ok((await page.locator('#guidedSteps').innerText()).trim());
      await page.locator('#deepNext').click();
      await page.locator('#closeGuided').click();
      assert.equal(await page.locator('#questionText').innerText(), question);
      const prior = page.url();
      await selectChapter(page, 'g9-ch1');
      await page.goBack();
      await page.waitForURL(prior);
      assert.equal(await page.locator('#lessonCard').isVisible(), true);
      assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'), 'true');
      await noOverflow(page, 'legacy question after history navigation');
    });
    await check('search retains existing questions and returns to full chapter navigation', async () => {
      const page = await visit(await context(1280), '/index.html?class=9&question=c9-example-6-1');
      await page.locator('#search').fill('6.1');
      assert.ok(await page.locator('#exerciseList .exercise-question').count() > 0);
      const button = page.locator('#exerciseList .exercise-question').first();
      await button.click();
      assert.ok(new URL(page.url()).searchParams.get('question'));
      assert.equal(await page.locator('#lessonCard').isVisible(), true);
      await page.locator('#search').fill('');
      assert.equal(await page.locator('#exerciseList [data-chapter-id]').count(), 9);
    });
    await check('Phase 2 bilingual Set Language micro-lab works without leaving the chapter', async () => {
      const page = await visit(await context(320), '/index.html?class=9&chapter=g9-ch1');
      await page.locator('.hub-section-card[data-hub-section="concepts"]').click();
      const lab = page.locator('#chapterOverview .p2-lab');
      await lab.waitFor({ state:'visible' });
      assert.equal(await lab.locator('[data-result-set]').innerText(), '{1, 2, 3, 4, 5, 6}');
      await lab.locator('[data-op="intersection"]').click();
      assert.equal(await lab.locator('[data-result-set]').innerText(), '{3, 5}');
      assert.equal(await lab.locator('[data-op="intersection"]').getAttribute('aria-pressed'), 'true');
      await lab.locator('[data-choice="0"]').click();
      assert.ok((await lab.locator('[data-feedback]').innerText()).includes('Try again'));
      await lab.locator('[data-hint]').click();
      assert.ok((await lab.locator('[data-feedback]').innerText()).includes('middle'));
      await lab.locator('[data-choice="1"]').click();
      assert.ok((await lab.locator('[data-feedback]').innerText()).includes('Correct'));
      await lab.locator('.p2-deeper summary').click();
      for(let i=0;i<4;i++) await lab.locator('[data-next-reason]').click();
      assert.equal(await lab.locator('[data-reasoning] li').count(), 4);
      assert.ok((await lab.locator('[data-reasoning]').innerText()).includes('20 − 16 = 4'));
      assert.equal(await lab.locator('[data-next-reason]').isVisible(), false);
      await page.locator('#langTa').click();
      assert.ok((await lab.locator('h3').first().innerText()).includes('கண மொழி'));
      await lab.locator('[data-op="difference"]').click();
      assert.equal(await lab.locator('[data-result-set]').innerText(), '{1, 2}');
      await noOverflow(page,'Tamil micro-lab at 320px');
    });
    await check('Grouped square-bracket exponents are visibly attached to their closing bracket', async () => {
      const page = await visit(await context(390), '/index.html?class=9&chapter=g9-ch1');
      const geometry = await page.evaluate(() => {
        const probe=document.createElement('div');
        probe.style.cssText='position:fixed;left:0;top:0;background:white;z-index:10000;font-size:24px';
        probe.innerHTML=window.TriggleNotation.render('[x+1]²')+' '+window.TriggleNotation.render('( [[1|2]] )²');
        document.body.append(probe);
        const powers=Array.from(probe.querySelectorAll('.math-group-power')).map(group => ({
          bracket:group.querySelectorAll('.math-bracket')[1].getBoundingClientRect().top,
          exponent:group.querySelector(':scope > sup').getBoundingClientRect().top,
          text:group.textContent
        }));
        probe.remove();
        return powers;
      });
      assert.equal(geometry.length,2);
      for(const item of geometry) {
        assert.ok(item.exponent < item.bracket + 3,'Exponent must sit above the closing bracket '+JSON.stringify(item));
        assert.ok(item.text.includes('2'),'The exponent must not disappear');
      }
    });
    await check('2025-book Grade 9 learning journey supports seven ideas and live demonstrations at 320px', async () => {
      const page=await visit(await context(320),'/index.html?class=9&chapter=g9-ch1');
      await page.locator('.hub-section-card[data-hub-section="concepts"]').click();
      const journey=page.locator('.sp2-journey');
      await journey.waitFor({state:'visible'});
      assert.equal(await journey.locator('[data-nav] button').count(),7);
      assert.ok((await journey.locator('[data-progress]').innerText()).includes('0 / 7'));
      // Membership: choose a number not belonging to the set.
      await journey.locator('[data-demo-mode="3"]').click();
      assert.ok((await journey.locator('[data-demo-output]').innerText()).includes('∉ A'));
      // Correct independent check persists only in localStorage.
      await journey.locator('[data-answers] [data-choice="0"]').click();
      assert.ok((await journey.locator('[data-feedback]').innerText()).includes('Not yet'));
      await journey.locator('[data-hint]').click();
      assert.ok((await journey.locator('[data-feedback]').innerText()).includes('same rule'));
      await journey.locator('[data-answers] [data-choice="1"]').click();
      assert.ok((await journey.locator('[data-progress]').innerText()).includes('1 / 7'));
      await journey.locator('[data-nav] [data-index="1"]').click();
      await journey.locator('[data-demo-mode="builder"]').click();
      assert.ok((await journey.locator('[data-demo-output]').innerText()).includes('x < 10'));
      await journey.locator('[data-nav] [data-index="2"]').click();
      await journey.locator('[data-demo-mode="subset"]').click();
      assert.ok((await journey.locator('[data-demo-output]').innerText()).includes('⊂'));
      await journey.locator('[data-nav] [data-index="4"]').click();
      await journey.locator('[data-demo-mode="distributive"]').click();
      assert.ok((await journey.locator('[data-demo-output]').innerText()).includes('{2}'));
      await journey.locator('[data-nav] [data-index="5"]').click();
      await journey.locator('[data-demo-mode="intersection"]').click();
      assert.ok((await journey.locator('[data-demo-output]').innerText()).includes('{1, 2, 4, 5, 6}'));
      await journey.locator('[data-nav] [data-index="6"]').click();
      await journey.locator('input[type="range"]').evaluate(el=>{
        el.value='9';el.dispatchEvent(new Event('input',{bubbles:true}));
      });
      assert.ok((await journey.locator('[data-demo-output]').innerText()).includes('16'));
      await journey.locator('.sp2-extra summary').click();
      assert.ok((await journey.locator('.sp2-extra').innerText()).includes('In a class of 50'));
      await journey.locator('[data-extra-answers] [data-extra-choice="0"]').click();
      assert.ok((await journey.locator('[data-extra-feedback]').innerText()).includes('Not yet'));
      await journey.locator('[data-extra-hint]').click();
      assert.ok((await journey.locator('[data-extra-feedback]').innerText()).includes('inclusion'));
      await journey.locator('[data-extra-answers] [data-extra-choice="1"]').click();
      assert.ok((await journey.locator('[data-extra-feedback]').innerText()).includes('You got it'));
      await journey.locator('.sp2-hard summary').click();
      for(let i=0;i<6;i++)await journey.locator('[data-hard-next]').click();
      assert.equal(await journey.locator('[data-hard-steps] li').count(),6);
      assert.ok((await journey.locator('[data-hard-steps]').innerText()).includes('21 people'));
      await page.locator('#langTa').click();
      assert.ok((await journey.locator('h3').first().innerText()).includes('கண மொழி'));
      await journey.locator('[data-nav] [data-index="5"]').click();
      assert.ok((await journey.locator('.sp2-stage-reference').innerText()).includes('தமிழ் பக்கம் 26'));
      await journey.locator('[data-answers] [data-choice="1"]').click();
      assert.ok((await journey.locator('[data-progress]').innerText()).includes('2 / 7'));
      await noOverflow(page,'Tamil learning path at 320px');
      await page.reload();
      await journey.waitFor({state:'visible'});
      assert.ok((await journey.locator('[data-progress]').innerText()).includes('2 / 7'));
    });
    await check('Phase 2 lesson is available during an offline mobile reload', async () => {
      const ctx = await context(390,'allow');
      const page = await visit(ctx,'/index.html?class=9&chapter=g9-ch1');
      await page.evaluate(async () => {await navigator.serviceWorker.ready;});
      await page.reload();
      await page.waitForFunction(() => !!navigator.serviceWorker.controller);
      await ctx.setOffline(true);
      await page.reload();
      await page.locator('.hub-section-card[data-hub-section="concepts"]').click();
      const lab=page.locator('.p2-lab');
      await lab.waitFor({state:'visible'});
      await page.locator('.sp2-journey').waitFor({state:'visible'});
      await page.locator('.sp2-journey [data-nav] [data-index="6"]').click();
      assert.ok((await page.locator('.sp2-journey .sp2-formula').innerText()).includes('n(A ∪ B)'));
      await lab.locator('[data-op="neither"]').click();
      assert.equal(await lab.locator('[data-result-set]').innerText(),'{7, 8}');
      await ctx.setOffline(false);
    });
    await check('service worker caches curriculum and supports an offline chapter reload', async () => {
      const ctx = await context(390, 'allow');
      const page = await visit(ctx, '/index.html?class=12&chapter=g12-ch12');
      await page.evaluate(async () => { await navigator.serviceWorker.ready; });
      await page.reload();
      await page.waitForFunction(() => !!navigator.serviceWorker.controller);
      const cacheUrls = await page.evaluate(async () => (await Promise.all((await caches.keys()).map(async key => (await (await caches.open(key)).keys()).map(r => r.url)))).flat());
      assert.ok(cacheUrls.some(u => new URL(u).pathname.endsWith('/data/curriculum.js')), 'Curriculum data included in offline cache');
      assert.ok(cacheUrls.some(u => new URL(u).pathname.endsWith('/assets/chapter-hub.js')), 'Chapter selection logic must be cached');
      assert.ok(cacheUrls.some(u => new URL(u).pathname.endsWith('/assets/chapter-hub.css')), 'Chapter selection layout must be cached');
      assert.ok(cacheUrls.some(u => new URL(u).pathname.endsWith('/assets/focus-navigation.js')), 'Immersive navigation JS must be cached');
      assert.ok(cacheUrls.some(u => new URL(u).pathname.endsWith('/assets/focus-navigation.css')), 'Immersive navigation CSS must be cached');
      await ctx.setOffline(true);
      await page.reload();
      await page.locator('#chapterOverview').waitFor({ state:'visible' });
      assert.equal(new URL(page.url()).searchParams.get('chapter'), 'g12-ch12');
      await noOverflow(page, 'offline mobile chapter');
      await ctx.setOffline(false);
    });
    for(const width of [320,390]){
      await check('Grade 9 Exercise 1.1 bilingual textbook questions work at '+width+'px',async()=>{
        const page=await visit(await context(width),'/index.html?class=9&chapter=g9-ch1&section=exercises');
        const cards=page.locator('#chapterOverview [data-question-id^="g9-ch1-ex1.1-"]');
        assert.equal(await cards.count(),18,'All 18 textbook subparts must appear in Exercises');
        await page.locator('#chapterOverview [data-question-id="g9-ch1-ex1.1-q1-i"]').click();
        assert.match(await page.locator('#questionText').innerText(),/Prime numbers/);
        assert.equal(await page.locator('#stepsList li').count(),3);
        assert.match(await page.locator('#answerText').innerText(),/set/i);
        await page.locator('#langTa').click();
        assert.match(await page.locator('#questionText').innerText(),/பகா எண்கள்/);
        assert.match(await page.locator('#answerText').innerText(),/கணம்/);
        await noOverflow(page,'Grade 9 Q1 Tamil at '+width+'px');
        await page.goto(url+'/index.html?class=9&question=g9-ch1-ex1.1-q2-iv');
        await page.locator('#stepsList li').first().waitFor({state:'visible'});
        assert.match(await page.locator('#answerText').innerText(),/C, Z, E, H, O, S, L, V, A, K, I/);
        assert.equal(await page.locator('#stepsList li').count(),3);
        await noOverflow(page,'Grade 9 Q2 mobile at '+width+'px');
        await page.goto(url+'/index.html?class=9&question=g9-ch1-ex1.1-q3-a-i');
        await page.locator('#answerText').waitFor({state:'visible'});
        await page.locator('#langEn').click(); // Language persists from the preceding Tamil navigation test.
        assert.match(await page.locator('#questionText').innerText(),/18 ∈ C/);
        assert.match(await page.locator('#answerText').innerText(),/True/);
        assert.ok((await page.locator('#stepsList li').count())>0,'Q3(a) must include explanation steps');
        await page.locator('#langTa').click();
        assert.match(await page.locator('#questionText').innerText(),/சரியா தவறா/);
        await noOverflow(page,'Grade 9 Q3(a) Tamil at '+width+'px');
        await page.goto(url+'/index.html?class=9&question=g9-ch1-ex1.1-q3-b-i');
        await page.locator('#answerText').waitFor({state:'visible'});
        assert.match(await page.locator('#questionText').innerText(),/3 ∈/);
        assert.equal((await page.locator('#answerText').innerText()).trim(),'A');
        await noOverflow(page,'Grade 9 Q3(b) mobile at '+width+'px');
      });
    }
    await check('Grade 9 textbook exercises load offline in the chapter reader',async()=>{
      const ctx=await context(390,'allow');
      const page=await visit(ctx,'/index.html?class=9&chapter=g9-ch1&section=exercises');
      await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
      await page.reload();
      await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
      await ctx.setOffline(true);
      await page.goto(url+'/index.html?class=9&question=g9-ch1-ex1.1-q2-i');
      await page.locator('#answerText').waitFor({state:'visible'});
      assert.match(await page.locator('#answerText').innerText(),/I, N, D, A/);
      await ctx.setOffline(false);
    });
    assert.deepEqual(errors, [], 'No uncaught browser errors');
    assert.deepEqual(failedRequests, [], 'No broken local page assets');
    console.log(`PASS: ${count} curriculum browser scenarios; no uncaught errors or broken assets.`);
  } finally {
    for (const ctx of contexts) await ctx.close();
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
