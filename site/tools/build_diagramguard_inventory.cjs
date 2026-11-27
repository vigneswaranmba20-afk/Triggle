'use strict';
// Catalogue registered figure placements and on-disk mathematical artwork.
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {createHash}=require('node:crypto');
const {ROOT,loadRuntime}=require('./curriculum_bulk.cjs');
const site=path.join(ROOT,'site');
const rootFile=(file)=>fs.readFileSync(path.join(site,file),'utf8');
const runtime=loadRuntime(undefined,{trace:true});
const scope={};
const sandbox=vm.createContext({window:scope,console});
for(const file of [...runtime.loaded,'assets/set-venn-figures.js']) {
  vm.runInContext(rootFile(file),sandbox,{filename:file,timeout:5000});
}
const table=new Map(), referenced=new Set();
const stripRoot=file=>file?.replace(/^\.\//,'')||'';
const media=file=>file.endsWith('.svg')?'SVG asset':'raster asset';
const format=v=>Array.isArray(v)?v.join('; '):typeof v==='object'&&v?JSON.stringify(v):String(v??'');
const canonical=file=>{
  if(!file)return '';
  const bytes=fs.readFileSync(path.join(site,file));
  return createHash('sha256').update(file.endsWith('.svg')?
    bytes.toString().replace(/<(title|desc)\b[^>]*>[\s\S]*?<\/\1>/g,''):bytes).digest('hex');
};
const assetHashes=new Map();
function hash(asset){
  if(!assetHashes.has(asset))assetHashes.set(asset,canonical(asset));
  return assetHashes.get(asset);
}
function add(key,{id,chapter,language='en; ta',rendering,surface,en='',ta='',source,qualification='unverified'}){
  [en,ta].filter(Boolean).forEach(p=>referenced.add(p));
  const previous=table.get(key);
  if(previous){
    previous.id.add(id);previous.chapter.add(chapter);previous.surface.add(surface);previous.source.add(source);
    if(en)previous.en.add(en);
    if(ta)previous.ta.add(ta);
  }else table.set(key,{
    id:new Set([id]),chapter:new Set([chapter]),language,rendering,surface:new Set([surface]),
    en:new Set(en?[en]:[]),ta:new Set(ta?[ta]:[]),source:new Set([source]),qualification
  });
}
const curriculumModules=new Map(runtime.registrations.filter(r=>r.change==='added').map(r=>[r.id,r.module]));
const fixedFigures=vm.runInNewContext('('+rootFile('assets/app.js').match(/const ch1SvgFigures=(\{[\s\S]*?\n \});/)[1]+')');
const shapes=new Set(['triangle','two-triangles','two-right','kite','tree','unitcircle','complement-pairs','tower',
  'circle','wave','inverse','real-number-line','real-number-arrows']);
for(const grade of [9,10]){
  for(const item of runtime.classes[grade].items){
    const {id}=item, chapter='g'+grade+'-ch'+item.chapter;
    const enOverride=scope.TriggleFrontierFigureTamil[id]?.en?.src;
    const taOverride=scope.TriggleFrontierFigureTamil[id]?.src;
    const fixed=fixedFigures[id];
    const en=stripRoot(fixed?.src||(item.figureSrc&&(enOverride||item.figureSrc)));
    const ta=stripRoot(fixed?(fixed.srcTa||fixed.src):item.figureSrc&&(taOverride||item.figureSrcTa||item.figureSrc));
    const src=[curriculumModules.get(id),format(item.reference),item.page&&'p. '+format(item.page),
      item.sourceFidelity?.sourcePdfPage&&'PDF '+format(item.sourceFidelity.sourcePdfPage),format(item.source)].filter(Boolean).join(' | ');
    if(en){
      const rectangle=id==='c10-4-ex4-3-q4';
      add(rectangle?'wxyz-rectangle':'asset:'+hash(en)+':'+hash(ta),{
        id,chapter,en,ta,source:src,rendering:rectangle?'responsive inline SVG; SVG fallback':media(en),
        surface:item.figureInSolution?'solution and figure dialog':'inline and figure dialog',
        qualification:rectangle?'DiagramGuard browser fixture':'unverified'
      });
    }
    if(item.geometryConstruction){
      add(id+':construction',{id:id+':construction',chapter,source:src,rendering:'interactive SVG',surface:'figure dialog'});
    }
    if(en)continue;
    if(scope.TriggleSetVenn.supports(item)){
      const variants=id.endsWith('-18')?3:1;
      for(let n=1;n<=variants;n++){
        add(id+':venn-'+n,{id:id+':venn-'+n,chapter,source:src,rendering:'generated SVG',surface:'figure dialog'});
      }
      continue;
    }
    const d=item.diagram;
    if(!d)continue;
    const kind=d.kind||d;
    const inline=typeof d==='object'&&/\b(diagram|figure|labelled|labeled)\b/i.test(item.q?.en||'');
    if(inline||shapes.has(kind)||(item.kind==='practice'&&['stats','area','sets'].includes(kind))){
      add(id+':'+kind,{id:id+':'+kind,chapter,source:src,rendering:'generated SVG ('+kind+')',
        surface:inline?'inline and figure dialog':'figure dialog'});
    }
  }
}

const visualModules={
  'g9-ch1':[['TRIGGLE_SET_PATH','data/set-language-path.js','assets/set-language-journey.js']],
  'g9-ch2':[['TRIGGLE_REAL_PATH','data/real-numbers/g9-ch2-concepts.js','assets/real-numbers-journey.js']],
  'g9-ch3':[['TRIGGLE_ALGEBRA_PATH','data/g9-algebra-chapter.js','assets/g9-algebra-concepts.js']],
  'g9-ch4':[['TRIGGLE_GEOMETRY_LESSONS','data/g9-geometry-concepts.js','assets/g9-concept-lessons.js']],
  'g9-ch5':[['TRIGGLE_COORDINATE_LESSONS','data/g9-coordinates-concepts.js','assets/g9-concept-lessons.js'],
    ['TRIGGLE_G9_CH5_PATH','data/g9-ch5-distance-concept.js','assets/chapter-hub.js']],
  'g9-ch6':[['TRIGGLE_TRIGONOMETRY_LESSONS','data/g9-trigonometry-concepts.js','assets/g9-concept-lessons.js']],
  'g9-ch7':[['TRIGGLE_MENSURATION_PATH','data/g9-mensuration-chapter.js; data/g9-mensuration-remaining.js','assets/g9-mensuration-remaining.js']],
  'g9-ch8':[['TRIGGLE_STATISTICS_LESSONS','data/g9-statistics-concepts.js','assets/g9-statistics-concepts.js']],
  'g9-ch9':[['TRIGGLE_PROB_PATH','data/g9-probability-chapter.js','assets/g9-probability-concepts.js']],
  'g10-ch1':[['TRIGGLE_RELATIONS_LESSONS','data/g10-relations-concepts.js','assets/g9-concept-lessons.js']]
};
for(let n=2;n<=8;n++){
  const chapter='g10-ch'+n;
  visualModules[chapter]=[['TRIGGLE_G10_CH'+n+'_PATH','data/'+chapter+'-concepts.js',
    'assets/'+chapter+(n===2?'-discovery-labs.js':'-concepts.js')]];
}
for(const [chapter,modules] of Object.entries(visualModules)){
  let index=0;
  for(const [key,module,renderer] of modules){
    const config=scope[key];
    if(!config)throw Error('Missing concept module '+module);
    const stages=config.stages||config;
    for(const stage of stages){
      const id=stage.id||chapter+'-concept-'+(index+1), route='concept '+index++;
      const src=[module,config.source,stage.section,format(stage.pages||stage.page)].filter(Boolean).join(' | ');
      const graphic=typeof stage.visual==='object'?stage.visual.id||stage.visual.kind:stage.visual;
      if(graphic||stage.views||stage.activity||chapter==='g9-ch2'||chapter==='g9-ch9'||chapter==='g9-ch3'){
        add(id+':concept',{id:id+':concept',chapter,source:src,rendering:'concept renderer '+renderer,
          surface:route+' interactive/visual',qualification:graphic==='similarity-criteria'?'DiagramGuard browser fixture':'unverified'});
      }
      if(stage.glanceVisual){
        const preview=stage.glanceVisual;
        add(id+':preview',{id:id+':preview',chapter,source:src,rendering:'inline SVG '+renderer,surface:route+' overview',
          qualification:chapter==='g10-ch4'&&/^similarity-(scale|criteria|results)$/.test(preview)?
            'DiagramGuard browser fixture':'unverified'});
      }
    }
  }
}
for(const [chapter,entries] of Object.entries(scope.TRIGGLE_TEXTBOOK_TASKS)){
  for(const [index,task] of entries.entries()){
    const tableLanguage=['en','ta'].filter(lang=>{
      const rows=[...(task.answer[lang]||'').matchAll(/\b[Rr]ow\s*\d+\s*\[([\d\s,]+)\]/g)];
      return rows.length>=3&&rows.every(m=>m[1].split(',').length===6);
    });
    if(tableLanguage.length){
      const id=chapter+'-activity-'+(index+1);
      add(id,{id,chapter,language:tableLanguage.join('; '),rendering:'HTML table',
        surface:'textbook activities',source:'2025 SCERT textbooks | p. '+task.page});
    }
  }
}

// Record assets without a figure registry placement so an asset audit can still examine them.
for(const dir of fs.readdirSync(path.join(site,'assets')).filter(d=>/^(grade(9|10)-|textbook-figures$)/.test(d))){
  for(const file of fs.readdirSync(path.join(site,'assets',dir)).filter(n=>/\.(svg|png|webp|jpe?g)$/i.test(n))){
    const asset='assets/'+dir+'/'+file;
    if(referenced.has(asset))continue;
    const chapter=dir.replace(/^grade(9|10)-ch(\d+)$/,'g$1-ch$2').replace('grade10-geometry','g10-ch4');
    add('unregistered:'+hash(asset),{id:asset,chapter,language:file.includes('-ta.')?'ta':'undetermined',
      rendering:media(asset),surface:'asset without matched figure registry placement',
      ...(file.includes('-ta.')?{ta:asset}:{en:asset}),source:asset,qualification:'asset candidate'});
  }
}
const fields=['id','chapter','language','rendering','surface','en','ta','source','qualification'];
const csv=value=>'"'+format(value instanceof Set?[...value].sort():value).replaceAll('"','""')+'"';
const report=[fields.join(','),...[...table.values()].map(row=>fields.map(field=>csv(row[field])).join(','))].join('\n')+'\n';
const target=path.join(ROOT,'docs/evidence/ver-diagramguard-v1-0/inventory.csv');
if(process.argv.includes('--check')){
  if(fs.readFileSync(target,'utf8')!==report)throw Error('Diagram inventory is stale');
}else fs.writeFileSync(target,report);
const candidates=[...table.values()].filter(row=>row.qualification==='asset candidate').length;
console.log(`DiagramGuard inventory: ${table.size-candidates} registered figure/visual groups, ${candidates} asset-only groups, ${referenced.size} mathematical asset files.`);
