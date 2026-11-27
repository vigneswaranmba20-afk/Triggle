'use strict';
// Regenerate standalone SVG fallbacks from the same plots used by the reader.
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('playwright');
const { server, launchOptions } = require('./dashboard_test_support.cjs');

const grade = process.argv.includes('--grade9') ? 9 : 10;
const exercise = process.argv.includes('--exercise52') ? 2 : 1;
const selected = process.argv.filter(arg=>arg.startsWith('--figure=')).map(arg=>arg.slice('--figure='.length));
const remaining = process.argv.includes('--remaining');
const width = 300;

async function build() {
  const app = await server();
  let browser;
  try {
    browser = await chromium.launch(launchOptions());
    const page = await browser.newPage({serviceWorkers:'block'});
    await page.goto(app.base+'/index.html?class='+grade+'&chapter=g'+grade+'-ch5');
    const items = await page.evaluate(({grade,exercise,remaining,selected})=>{
      const prefix=grade===9 ? 'g9-ch5-ex5.' : `c10-5-ex5-${exercise}-`;
      const candidates=window.TRIGGLE_CLASSES[grade].items
        .map(item=>window.TriggleG9Ch5Overrides?.get(item.id)||item)
        .filter(item=>(remaining?/^c10-5-(ex5-[34]|unit)-/.test(item.id):item.id.startsWith(prefix))&&item.figureSrc)
        .filter(item=>!selected.length||selected.includes(item.id))
        .map(({id,figureSrc,figureAlt})=>({id,figureSrc,figureAlt}));
      if(selected.some(id=>!candidates.some(item=>item.id===id)))throw Error('A requested coordinate figure is unavailable');
      return Array.from(new Map(candidates.map(item=>[item.figureSrc,item])).values());
    },{grade,exercise,remaining,selected});
    if (!items.length) throw Error('No authored coordinate figures were loaded');
    for (const item of items) {
      const target = path.join(__dirname,'..',item.figureSrc);
      const original = await fs.readFile(target,'utf8');
      const svg = await page.evaluate(async ({id,alt,original,width})=>{
        const prior = new DOMParser().parseFromString(original,'image/svg+xml');
        const title = prior.querySelector('title')?.textContent || alt;
        const description = prior.querySelector('desc')?.textContent || alt;
        const host = document.createElement('div');
        host.style.cssText = 'position:absolute;left:-2000px;top:0;width:'+width+'px;--ver-font:system-ui,sans-serif';
        document.body.append(host);
        if (!window.TriggleCoordinateFigures.mount(host,id,description,'en')) throw Error('Missing coordinate plot for '+id);
        const plots = Array.from(host.querySelectorAll('svg'));
        await document.fonts.ready;
        while (plots.some(svg=>!svg.hasAttribute('data-dg-ready'))) await new Promise(requestAnimationFrame);

        const node = (name,attrs={})=>{
          const el = document.createElementNS('http://www.w3.org/2000/svg',name);
          for (const [key,value] of Object.entries(attrs)) el.setAttribute(key,value);
          return el;
        };
        const root = node('svg',{role:'img','font-family':'system-ui, sans-serif','font-weight':'550',
          'aria-labelledby':'t desc'});
        const add = (container,name,attrs,text)=>{
          const el = node(name,attrs);
          el.textContent = text;
          container.append(el);
        };
        add(root,'title',{id:'t'},title);
        add(root,'desc',{id:'desc'},description);

        let height = 0;
        let labelBottom = 0;
        for (const panel of host.firstElementChild.children) {
          if (panel.matches('.diagramguard-coordinate-heading')) {
            add(root,'text',{x:width/2,y:height+22,'text-anchor':'middle','font-size':15,fill:'#24203c'},panel.textContent);
            height += 34;
          } else if (panel.matches('svg')) {
            labelBottom = height+Math.max(...Array.from(panel.querySelectorAll('text'),label=>{
              const {y,height}=label.getBBox();
              return y+height;
            }));
            const group = height ? node('g',{transform:`translate(0 ${height})`}) : root;
            const clone = panel.cloneNode(true);
            clone.querySelectorAll('text').forEach(el=>el.setAttribute('font-size',el.dataset.dgFont==='secondary'?14:15));
            group.append(...clone.childNodes);
            if (group!==root) root.append(group);
            height += panel.viewBox.baseVal.height;
          } else if (panel.matches('.diagramguard-coordinate-key')) {
            const entries = Array.from(panel.children,el=>el.textContent);
            const columns=panel.querySelector('.diagramguard-named-point')?1:3;
            const extraGap = Math.ceil(Math.max(0,labelBottom+21-(height+15)));
            entries.forEach((value,index)=>add(root,'text',{x:(index%columns+.5)*width/columns,
              y:height+15+extraGap+Math.floor(index/columns)*22,'text-anchor':'middle','font-size':14,fill:'#24203c'},value));
            height += Math.ceil(entries.length/columns)*22+10+extraGap;
          } else if (panel.matches('.diagramguard-coordinate-legend')) {
            const extraGap = Math.ceil(Math.max(0,labelBottom+21-(height+15)));
            for(const [index,entry] of Array.from(panel.children).entries()) {
              const y=height+15+extraGap+index*22;
              const sample=entry.firstElementChild;
              root.append(node('line',{x1:42,x2:54,y1:y-4,y2:y-4,stroke:sample.style.color,'stroke-width':2,
                ...(sample.hasAttribute('data-dashed')?{'stroke-dasharray':'4 3'}:{})}));
              add(root,'text',{x:62,y,'font-size':14,fill:'#24203c'},entry.textContent);
            }
            height += panel.children.length*22+10+extraGap;
          }
        }
        const frameHeight=Math.max(height,Math.ceil(labelBottom+10));
        root.setAttribute('viewBox',`0 0 ${width} ${frameHeight}`);
        for (const el of root.querySelectorAll('line,circle,text,polygon,polyline')) {
          for (const attr of ['x','y','x1','x2','y1','y2','cx','cy','r','points']) {
            if (el.hasAttribute(attr)) el.setAttribute(attr,el.getAttribute(attr)
              .replace(/-?\d+(?:\.\d+)?/g,number=>String(Math.round(Number(number)*1000)/1000)));
          }
        }
        host.remove();

        const markup = new XMLSerializer().serializeToString(root);
        let indent = 0;
        const lines = markup.replace(/>(?=<)/g,'>\n').split('\n').map(line=>{
          if (/^<\//.test(line)) indent--;
          const indented = '  '.repeat(indent)+line;
          if (/^<(?:svg|g)\b/.test(line)) indent++;
          return indented;
        });
        return '<!-- Generated by site/tools/build_diagramguard_coordinate_assets.cjs -->\n'+lines.join('\n')+'\n';
      },{id:item.id,alt:item.figureAlt?.en||item.figureAlt||'',original,width});
      await fs.writeFile(target,svg);
      console.log(item.figureSrc);
    }
  } finally {
    await browser?.close();
    await app.close();
  }
}

build().catch(error=>{console.error(error);process.exitCode=1;});
