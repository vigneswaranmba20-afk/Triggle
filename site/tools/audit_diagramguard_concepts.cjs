'use strict';
// Explore graphics in the ordinary bilingual concept reader without altering curriculum records.
const {chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
(async()=>{
  const app=await server();
  let browser;
  try{
    browser=await chromium.launch(launchOptions());
    const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,serviceWorkers:'block'});
    const page=await context.newPage();
    await page.goto(app.base+'/index.html?class=9&chapter=g9-ch1&section=concepts&concept=0');
    const results=await page.evaluate(async()=>{
      const report=[];
      const grades=window.TRIGGLE_CURRICULUM.grades.filter(({grade})=>grade===9||grade===10);
      const raf=()=>new Promise(requestAnimationFrame);
      await document.fonts.load('16px "Triggle Noto Sans Tamil"','வடிவியல்');
      await document.fonts.ready;
      const labels=(panel)=>[...panel.querySelectorAll('svg')].filter(svg=>
        svg.viewBox?.baseVal.width&&svg.getBoundingClientRect().height>24&&
        !svg.closest('.katex, [aria-hidden=true]')&&svg.querySelector('path,polygon,line,circle'));
      const audit=(panel)=>labels(panel).map(svg=>{
        const stat=window.TriggleDiagramGuard.audit(svg,{discover:!svg.dataset.dgScene});
        return {label:svg.getAttribute('aria-label')||svg.querySelector('title')?.textContent||svg.getAttribute('class'),
          issues:stat.issues,unmeasured:stat.unmeasured};
      });
      const mount=async url=>{
        history.replaceState({},'',url);
        dispatchEvent(new PopStateEvent('popstate'));
        await raf();
        return document.querySelector('.sp2-journey[data-view=lesson] [data-panel]');
      };
      for(const locale of ['en','ta']){
        document.getElementById(locale==='en'?'langEn':'langTa').click();
        for(const {grade,chapters} of grades){
          for(const {id} of chapters){
            const route=`/index.html?class=${grade}&chapter=${id}&section=concepts`;
            await mount(route);
            const count=document.querySelectorAll('.sp2-journey [data-nav] .sp2-nav-button').length;
            for(let index=0;index<count;index++){
              const p=await mount(route+'&concept='+index);
              if(!p){report.push({locale,chapter:id,index,states:[],missing:true});continue;}
              const states=[{action:'initial',figures:audit(p)}];
              const seen=new Set();
              for(const button of p.querySelectorAll('button[role=tab], button[class*="ch"][class*="-tab"]')){
                if(seen.has(button.textContent)||!button.getClientRects().length||button.disabled)continue;
                seen.add(button.textContent);button.click();
                await raf();
                states.push({action:button.textContent,figures:audit(p)});
              }
              for(const range of p.querySelectorAll('input[type=range]')){
                if(!range.getClientRects().length||range.disabled)continue;
                const at=Number(range.value);
                for(const [edge,value] of [['min',range.min],['mid',String((Number(range.min)+Number(range.max))/2)],['max',range.max]]){
                  range.value=value;
                  range.dispatchEvent(new Event('input',{bubbles:true}));
                  await raf();
                  states.push({action:(range.getAttribute('aria-label')||'slider')+' '+edge,figures:audit(p)});
                }
                range.value=at;
                range.dispatchEvent(new Event('input',{bubbles:true}));
              }
              report.push({locale,chapter:id,index,states});
            }
          }
        }
      }
      return report;
    });
    const states=results.flatMap(route=>route.states);
    const figures=states.flatMap(state=>state.figures);
    const summary={
      conceptLocaleRoutes:results.length,missing:results.filter(route=>route.missing).length,
      routesWithSvg:results.filter(route=>route.states.some(state=>state.figures.length)).length,
      states:states.length,statesWithPictures:states.filter(state=>state.figures.length).length,
      renderedInstances:figures.length,flaggedInstances:figures.filter(figure=>figure.issues.length).length,
      boundaryFlags:figures.flatMap(figure=>figure.issues).filter(issue=>issue.kind==='boundary').length
    };
    console.log(JSON.stringify({summary,routes:results},null,2));
  }finally{await browser?.close();await app.close()}
})().catch(error=>{console.error(error);process.exitCode=1});
