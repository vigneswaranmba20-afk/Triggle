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
      const types = { '.js': 'application/javascript', '.html': 'text/html', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.svg': 'image/svg+xml', '.mp4': 'video/mp4' };
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
      await check('Published Class 12 video is truly embedded on the question at '+width+'px',async()=>{
        const page=await visit(await context(width),'/index.html?class=12&question=c12-4-4-1-2');
        await page.locator('#vlInlinePanel').waitFor({state:'visible'});
        assert.equal(await page.locator('#visualLessonBtn').isVisible(),false,'Native local lesson does not need an external modal button');
        assert.equal(await page.locator('#vlInlineVideo').isVisible(),true);
        const video=await page.locator('#vlInlineVideo').evaluate(el=>({
          source:el.currentSrc||el.src,
          paused:el.paused,autoplay:el.autoplay,preload:el.preload,
          poster:el.poster,
          dims:el.getBoundingClientRect().toJSON(),
          vw:innerWidth,
          readyState:el.readyState
        }));
        assert.match(video.source,/\/videos\/triggle-class12-ex4-1-q1-ii\.mp4$/);
        assert.equal(video.paused,true,'No automatic voice playback');
        assert.equal(video.autoplay,false);
        assert.equal(video.preload,'none','Do not stream video before student chooses to watch');
        assert.match(video.poster,/\/videos\/posters\/triggle-class12-sine\.svg$/);
        assert.ok(video.dims.right<=video.vw+1 && video.dims.left>=-1,'Player must fit phone width');
        assert.ok(video.dims.height>150,'Player needs meaningful room for lessons');
        assert.match(await page.locator('#vlInlineTitle').innerText(),/All angles where sin x/);
        assert.match(await page.locator('#vlInlineDownload').getAttribute('href'),/\/videos\/triggle-class12-ex4-1-q1-ii\.mp4$/);
        assert.equal(await page.locator('#vlInlineDownload').getAttribute('download'),'triggle-class12-ex4-1-q1-ii.mp4');
        const mp4=await page.request.get('/videos/triggle-class12-ex4-1-q1-ii.mp4');
        assert.equal(mp4.status(),200);
        assert.match(mp4.headers()['content-type'],/video\/mp4/);
        const svg=await page.request.get('/videos/posters/triggle-class12-sine.svg');
        assert.equal(svg.status(),200);
        await noOverflow(page,'published native video at '+width+'px');
        await page.locator('#vlInlineFull').click();
        await page.locator('#visualLessonDialog').waitFor({state:'visible'});
        assert.equal(await page.locator('#vlVideo').isVisible(),true,'Larger-view video uses native HTML5 player');
        assert.equal(await page.locator('#vlDriveFrame').isVisible(),false,'Google Drive frame must not be visible');
        assert.match(await page.locator('#vlVideo').getAttribute('src'),/\/videos\/triggle-class12-ex4-1-q1-ii\.mp4$/);
        await page.locator('#vlClose').click();
        await page.waitForFunction(()=>!document.querySelector('#visualLessonDialog').open);
        assert.equal(await page.locator('#vlInlineVideo').isVisible(),true,'Inline lesson stays available after larger-view close');
        await page.goto(url+'/index.html?class=12&question=c12-4-4-1-1');
        await page.waitForFunction(()=>window.TriggleVisualPlayer?.status.questionId===null);
        assert.equal(await page.locator('#vlInlinePanel').isVisible(),false,'Video does not leak into another question');
      });
    }
    await check('Tamil question interface still presents the correct English narrated visual lesson',async()=>{
      const page=await visit(await context(390),'/index.html?class=12&question=c12-4-4-1-2');
      await page.locator('#vlInlinePanel').waitFor({state:'visible'});
      await page.locator('#langTa').click();
      assert.match(await page.locator('#vlInlineNote').innerText(),/ஆங்கில/);
      assert.equal(await page.locator('#vlInlineVideo').isVisible(),true);
      assert.match(await page.locator('#vlInlineDownload').getAttribute('href'),/\.mp4$/);
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
        assert.ok(dimensions.app>=dimensions.screen-2,'Exercise view should fill the whole phone viewport');
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
    await check('Chapter selection first offers four choices, not a long unorganized lesson',async()=>{
      const page=await visit(await context(390),'/index.html?class=9&chapter=g9-ch1');
      assert.equal(await page.locator('.hub-section-card').count(),4);
      assert.equal(await page.locator('.sp2-journey').count(),0,'Concepts should wait for a deliberate choice');
      await page.locator('.hub-section-card[data-hub-section="quizzes"]').click();
      assert.equal(new URL(page.url()).searchParams.get('section'),'quizzes');
      assert.equal(await page.locator('.hub-quiz-question').count(),7);
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
      assert.equal(await page.locator('.hub-question').count(),1,'Set Language original practice is accessible');
      const questionId=await page.locator('.hub-question').first().getAttribute('data-question-id');
      await page.locator('.hub-question').first().click();
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
      assert.equal(await page.locator('.hub-question').count(),0);
      assert.match(await page.locator('.hub-info').first().innerText(),/No questions/);
      await noOverflow(page,'mobile chapter-first drawer');
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
      const links = await page.evaluate(() => Object.entries(window.TRIGGLE_CLASSES).flatMap(([grade,data]) => data.items.map(item => ({ grade, id:item.id }))));
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
