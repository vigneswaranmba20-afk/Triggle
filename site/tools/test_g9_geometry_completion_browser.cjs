'use strict';

const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const {launchOptions,server} = require('./dashboard_test_support.cjs');
const {inventory,records} = require('../data/textbook-fidelity/g9-ch4-geometry-2025.json');

const normalize = value => value.normalize('NFC').replace(/\s+/gu,'').replace(/[−–—]/g,'-');
const chapterQuery = '?class=9&chapter=g9-ch4&section=exercises';
const route = id => '?class=9&question='+encodeURIComponent(id);
const sections = inventory.exercises.map(ex => [ex.id,ex.questions.flatMap(q=>q.parts.map(part=>
  records['g9-ch4-ex'+ex.id+'-q'+q.number+(part==='whole'?'':'-'+part)]))]);
const idsFor = (exercise,rows) => rows.map(row=>'g9-ch4-ex'+exercise+'-q'+row.question+(row.part==='whole'?'':'-'+row.part));

async function read(page,row,lang,id) {
  const state = await page.locator('#lessonCard').evaluate(card => {
    function asText(node) {
      const clone = node.cloneNode(true);
      for (const eq of clone.querySelectorAll('[data-math-fallback],math[aria-label]')) {
        eq.replaceWith(eq.getAttribute('data-math-fallback') ?? eq.getAttribute('aria-label'));
      }
      return clone.textContent;
    }
    const question = card.querySelector('#questionText').cloneNode(true);
    const choices = [...question.querySelectorAll('.triggle-mcq-btn')].map(asText);
    for (const extra of question.querySelectorAll('.triggle-mcq-choices,.triggle-mcq-feedback')) extra.remove();
    const formulas = [...card.querySelectorAll('.triggle-tex')];
    return {
      prompt:asText(question), choices,
      errors:card.querySelectorAll('[data-math-error="true"],.katex-error').length,
      overflow:document.documentElement.scrollWidth>innerWidth+1,
      clipped:formulas.some(f => {
        const g=f.querySelector('.katex-html'), box=f.getBoundingClientRect();
        return g && box.height>0 && (g.getBoundingClientRect().height>box.height+1 ||
          (f.clientWidth>0 && f.scrollWidth>f.clientWidth+1 && f.tabIndex!==0));
      }),
      final:asText(card.querySelector('.final-answer-step')),
      reasons:[...card.querySelectorAll('.step-reason')].map(asText)
    };
  });
  const tag = id+' '+lang;
  assert.equal(normalize(state.prompt),normalize(row.textbookPrompt[lang]),tag+' source question');
  assert.deepEqual(state.choices.map(normalize),(row.textbookChoices||[]).map(choice=>normalize(choice[lang])),tag+' source choices');
  assert(state.final && state.reasons.length,tag+' worked answer');
  assert.equal(state.errors,0,tag+' valid KaTeX');
  assert(!state.overflow && !state.clipped,tag+' unclipped reader');
  if (lang==='ta') assert(state.reasons.every(text=>/\p{Script=Tamil}/u.test(text)),tag+' Tamil reasoning');
  assert(await page.locator('#difficultyIndicator').isVisible(),tag+' difficulty');
  assert(await page.locator('#g9GeometryHint').isVisible(),tag+' hint');
  assert(await page.locator('#chapter8QuestionConcept').isVisible(),tag+' concept');
}

function labelIssues(svg) {
  const {width,height} = svg.viewBox.baseVal;
  const labels = [...svg.querySelectorAll('text')].map(node=>({text:node.textContent,box:node.getBBox()}));
  const errors = [];
  for (const [i,{text,box:a}] of labels.entries()) {
    if (a.x<0 || a.y<0 || a.x+a.width>width || a.y+a.height>height) errors.push(text+' clipped');
    for (const {text:other,box:b} of labels.slice(i+1)) {
      const x=Math.min(a.x+a.width,b.x+b.width)-Math.max(a.x,b.x);
      const y=Math.min(a.y+a.height,b.y+b.height)-Math.max(a.y,b.y);
      if (x>2 && y>2) errors.push(text+' overlaps '+other);
    }
  }
  for (const shape of svg.querySelectorAll('path,circle')) {
    const box=shape.getBBox();
    if (box.x < -1 || box.y < -1 || box.x+box.width>width+1 || box.y+box.height>height+1) {
      errors.push(shape.localName+' clipped');
    }
  }
  return errors;
}

async function construction(page,id) {
  const stage = page.locator('#diagramContent svg');
  const dialog = page.locator('#figureDialog');
  await page.locator('#inlineFigureOpen:visible, #figureBtn:visible').tap();
  assert(await dialog.isVisible(),id+' fullscreen Figure');
  assert(!await dialog.locator('#diagramCompare').isVisible(),id+' construction without answer reveal');
  assert(await stage.isVisible(),id+' construction stage');
  const next = dialog.getByRole('button',{name:'அடுத்த படி'});
  const prev = dialog.getByRole('button',{name:'முந்தைய படி'});
  assert(await prev.isDisabled());
  for (let n=0;n<5;n++) {
    assert.deepEqual(await stage.evaluate(labelIssues),[],id+' stage '+(n+1));
    assert.match(await stage.locator('title').textContent(),/\p{Script=Tamil}/u);
    if (n<4) await next.tap();
  }
  assert(await next.isDisabled());
  await prev.tap();
  assert(await next.isEnabled());
  await page.locator('#closeDiagram').tap();
}

async function main() {
  const app = process.env.TRIGGLE_LIVE_BASE ? null : await server();
  const base = (process.env.TRIGGLE_LIVE_BASE || app.base).replace(/\/$/,'');
  const live = !!process.env.TRIGGLE_LIVE_BASE;
  const browser = await chromium.launch(launchOptions());
  let checked = 0;
  try {
    for (const width of live?[390]:[320,360,390,412]) {
      const ctx = await browser.newContext({viewport:{width,height:844},isMobile:true,hasTouch:true,serviceWorkers:'block'});
      const page = await ctx.newPage();
      const errors = [];
      page.on('pageerror',error=>errors.push(error.message));
      await page.goto(base+'/index.html'+chapterQuery,{waitUntil:'domcontentloaded'});
      assert.equal(await page.locator('.hub-exercise-link').count(),7,'seven exercise sections');
      for (const [exercise,rows] of sections) {
        const ids = idsFor(exercise,rows);
        await page.locator('.hub-exercise-link[data-exercise="'+exercise+'"]').tap();
        assert.equal(new URL(page.url()).searchParams.get('question'),ids[0]);
        assert(await page.locator('#questionTopPrevious').isDisabled());
        const subset = width===390&&!live ? rows.map((_,i)=>i) : [...new Set([0,1,rows.length-1])];
        for (const i of subset) {
          const id=ids[i], row=rows[i];
          if (new URL(page.url()).searchParams.get('question')!==id) {
            await page.goto(base+'/index.html'+route(id),{waitUntil:'domcontentloaded'});
          }
          await page.locator('#langEn').tap();
          await page.evaluate(()=>document.fonts.ready);
          await read(page,row,'en',id);
          await page.locator('#langTa').tap();
          await page.evaluate(()=>document.fonts.ready);
          await read(page,row,'ta',id);
          checked+=2;

          const img = page.locator('#inlineFigure:not([hidden]) img');
          if (await img.count()) {
            await img.evaluate(img=>img.decode());
            assert.match(await img.getAttribute('alt'),/\p{Script=Tamil}/u);
            if (exercise==='4.5'||exercise==='4.6') await construction(page,id);
            else if(i===0||i===1) {
              await page.locator('#inlineFigureOpen:visible, #figureBtn:visible').tap();
              await page.locator('#diagramContent img').evaluate(img=>img.decode());
              await page.locator('#closeDiagram').tap();
            }
          }
          if (!row.preservedReviewedSha256) {
            const why=page.locator('.why-step-g9 summary').first();
            assert(await why.count(),id+' why-this-step');
            if(i===0) await why.tap();
          }
          if (row.textbookChoices && (i===0||i===6)) {
            const correct=await page.evaluate(id=>window.TRIGGLE_CLASSES[9].items.find(r=>r.id===id).correctIndex,id);
            await page.locator('.triggle-mcq-btn').nth((correct+1)%4).tap();
            assert(await page.locator('.triggle-mcq-feedback.is-wrong').isVisible());
            await page.locator('.triggle-mcq-btn').nth(correct).tap();
            assert(await page.locator('.triggle-mcq-feedback.is-correct').isVisible());
          }
          if (i===0) {
            await page.locator('#questionTopNext').tap();
            assert.equal(new URL(page.url()).searchParams.get('question'),ids[1]);
            await page.locator('#questionTopPrevious').tap();
            assert.equal(new URL(page.url()).searchParams.get('question'),ids[0]);
          }
        }
        assert(await page.locator('#questionTopNext').isDisabled());
        await page.locator('#exerciseIndexLink').tap();
      }
      await page.goto(base+'/index.html?class=9&chapter=g9-ch4&section=concepts&concept=6');
      assert.equal(await page.locator('.g10ch2-practice-link').filter({hasText:/4\.[56]/}).count(),2);
      await page.locator('.g10ch2-practice-link').filter({hasText:'4.6'}).tap();
      assert.equal(new URL(page.url()).searchParams.get('question'),'g9-ch4-ex4.6-q1');
      await page.locator('#chapter8QuestionConcept').tap();
      assert.equal(new URL(page.url()).searchParams.get('concept'),'6');
      assert.deepEqual(errors,[],width+'px JavaScript errors');
      await ctx.close();
      console.log('PASS Grade 9 Geometry '+width+'px, both languages and all seven exercise routes');
    }

    if (!live) {
      const files = require('fs').readdirSync('site/assets/grade9-ch4').filter(name=>name.endsWith('.svg'));
      const staticPage = await browser.newPage();
      for (const file of files) {
        await staticPage.goto(base+'/assets/grade9-ch4/'+file);
        assert.deepEqual(await staticPage.locator('svg').evaluate(labelIssues),[],file);
      }
      await staticPage.close();
      const ctx = await browser.newContext({hasTouch:true});
      const page = await ctx.newPage();
      await page.goto(base+'/index.html'+route('g9-ch4-ex4.6-q2'));
      await page.waitForFunction(()=>navigator.serviceWorker.controller!==null,{},{timeout:30000});
      await ctx.setOffline(true);
      await page.reload({waitUntil:'domcontentloaded'});
      await page.locator('#langTa').click();
      await construction(page,'g9-ch4-ex4.6-q2');
      await page.goto(base+'/index.html'+route('g9-ch4-ex4.2-q11'));
      assert(await page.locator('#stepsList .katex').count()>0,'offline KaTeX');
      await page.locator('#inlineFigure img').evaluate(img=>img.decode());
      await ctx.close();
      console.log('PASS '+files.length+' SVG label checks and offline exercise, construction, and KaTeX reload');
    }
    console.log('PASS '+checked+' bilingual Geometry reader views');
  } finally {
    await browser.close();
    if (app) await app.close();
  }
}
main().catch(error=>{console.error(error);process.exitCode=1;});
