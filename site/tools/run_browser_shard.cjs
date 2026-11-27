'use strict';
// Balanced, reproducible partitions based on a successful full browser run.
// Profiling data: successful GitHub Actions run 45981456495, seconds per command.
// The new coordinate-line fixtures use a conservative estimate until their first hosted run.
// New tests are never skipped: unknown commands receive a conservative estimate.
const fs=require('node:fs');
const path=require('node:path');
const {spawnSync}=require('node:child_process');
const repo=path.resolve(__dirname,'../..');
const manifest=require(path.join(repo,'package.json'));
const full=manifest.scripts['test:browser'];
if(!full||typeof full!=='string')throw Error('Missing complete browser-test script');
const commands=full.split(/\s+&&\s+/).map(s=>s.trim()).filter(Boolean);
const weights=Object.freeze({
  'test_chatgpt_math_g10_browser.cjs':9.2,
  'test_curriculum_bulk_browser.cjs':11.4,
  'test_curriculum_ui.cjs':91.3,
  'test_dashboard_browser.cjs':1.9,
  'test_diagramguard_browser.cjs':79.1,
  'test_exercise_direct_browser.cjs':15.3,
  'test_g10_ch1_chatgpt_math_browser.cjs':42.6,
  'test_g10_ch2_ex2_3_modular_browser.cjs':8.2,
  'test_g10_ch2_ex2_4_browser.cjs':20.1,
  'test_g10_ch2_gp_sum_browser.cjs':4.8,
  'test_g10_ch2_power_baseline_browser.cjs':3.4,
  'test_g10_ch2_scroll_browser.cjs':12.3,
  'test_g10_ch2_trace_browser.cjs':62.8,
  'test_g10_ch2_typography_browser.cjs':6.8,
  'test_g10_ch2_unit_and_ex31_browser.cjs':35.5,
  'test_g10_ch3_concepts_browser.cjs':33.8,
  'test_g10_ch3_ex310_to_312_browser.cjs':60.0,
  'test_g10_ch3_ex313_to_314_browser.cjs':37.5,
  'test_g10_ch3_ex315_browser.cjs':32.0,
  'test_g10_ch3_ex32_to_36_browser.cjs':57.0,
  'test_g10_ch3_ex37_to_39_browser.cjs':36.4,
  'test_g10_ch3_final_browser.cjs':28.4,
  'test_g10_ch4_concepts_browser.cjs':53.4,
  'test_g10_ch5_concepts_browser.cjs':19.4,
  'test_g10_ch5_coordinate_figures_browser.cjs':48.2,
  'test_g10_ch5_line_figures_browser.cjs':110.0,
  'test_g10_ch6_concepts_browser.cjs':82.8,
  'test_g10_ch6_mobile_browser.cjs':101.1,
  'test_g10_ch7_concepts_browser.cjs':49.9,
  'test_g10_ch7_ex71_mobile_browser.cjs':10.5,
  'test_g10_ch7_ex71_q6_q10_mobile_browser.cjs':10.8,
  'test_g10_ch7_ex72_ex73_mobile_browser.cjs':38.9,
  'test_g10_ch7_ex74_browser.cjs':12.0,
  'test_g10_ch7_ex75_browser.cjs':31.5,
  'test_g10_ch7_unit7_browser.cjs':14.5,
  'test_g10_ch8_concepts_browser.cjs':57.2,
  'test_g10_ch8_ex8_1_bilingual_browser.cjs':48.5,
  'test_g10_ch8_ex8_4_browser.cjs':22.8,
  'test_g10_ch8_ex8_5_browser.cjs':35.8,
  'test_g10_ch8_unit_browser.cjs':17.8,
  'test_g10_geometry_browser.cjs':110.6,
  'test_g10_geometry_completion_browser.cjs':31.6,
  'test_g10_prob_ex8_3_browser.cjs':32.5,
  'test_g10_relations_concepts_browser.cjs':65.5,
  'test_g10_remaining_math_browser.cjs':27.5,
  'test_g10_stats_browser.cjs':9.6,
  'test_g10_stats_ex8_2_browser.cjs':27.3,
  'test_g9_algebra_concept_browser.cjs':9.5,
  'test_g9_aud14_03_source_options_browser.cjs':22.6,
  'test_g9_cardinality_aud01_browser.cjs':4.7,
  'test_g9_ch1_set_language_browser.cjs':189.9,
  'test_g9_ch3_complete_browser.cjs':16.2,
  'test_g9_ch5_complete_browser.cjs':14.1,
  'test_g9_ch5_coordinate_figures_browser.cjs':88.3,
  'test_g9_ch5_distance_concept_browser.cjs':3.0,
  'test_g9_ch7_heron_browser.cjs':6.0,
  'test_g9_ch9_probability_browser.cjs':102.2,
  'test_g9_clear_math_browser.cjs':353.3,
  'test_g9_concepts_typography_browser.cjs':69.6,
  'test_g9_ex3_2_browser.cjs':19.2,
  'test_g9_existing_concepts_browser.cjs':79.5,
  'test_g9_geometry_completion_browser.cjs':140.0,
  'test_g9_geometry_tamil_browser.cjs':16.5,
  'test_g9_math_first_browser.cjs':51.5,
  'test_g9_new_concepts_browser.cjs':67.2,
  'test_g9_statistics_concepts_browser.cjs':47.8,
  'test_g9_trigonometry_concepts.cjs':27.0,
  'test_g9_typography_browser.cjs':165.7,
  'test_g9_venn_aud01_browser.cjs':28.6,
  'test_matrix_pilot_browser.cjs':1.9,
  'test_paper_indigo_theme_browser.cjs':10.6,
  'test_quiet_reader_browser.cjs':9.4,
  'test_selection_dialogs_browser.cjs':56.6,
  'test_sticky_example_layout_browser.cjs':13.6,
  'test_teacher_startup_browser.cjs':3.8,
  'test_teacher_workflow_browser.cjs':7.0,
  'test_ver_glyph_browser.cjs':34.3,
  'test_why_step_g10_browser.cjs':38.4,
  'test_why_step_g10_coverage_browser.cjs':36.6,
  'test_why_step_g9_browser.cjs':54.5
});
function plan(total){
  const tasks=commands.map((command,originalIndex)=>{
    const match=/^node (site\/tools\/[A-Za-z0-9_.-]+\.cjs)$/.exec(command);
    if(!match)throw Error('Unrecognized browser command: '+command);
    const file=match[1],absolute=path.resolve(repo,file);
    if(!fs.existsSync(absolute))throw Error('Missing browser script: '+file);
    return {file,absolute,originalIndex,seconds:weights[path.basename(file)]??20};
  });
  if(tasks.length===0)throw Error('Empty browser suite');
  if(new Set(tasks.map(t=>t.file)).size!==tasks.length)throw Error('Duplicate browser command');
  const lanes=Array.from({length:total},()=>[]);
  const costs=Array(total).fill(0);
  if(total===4){
    // WebKit runs inside these existing tests; never move them to Chromium-only runners.
    const pinned=new Map([
      ['test_standard_solutions_browser.cjs',0],
      ['test_katex_browser.cjs',2]
    ]);
    costs[0]=425; // WebKit core suite and mobile dock checks.
    costs[2]=140; // WebKit line and construction figures.
    costs[3]=80;  // Staged student build and offline checks.
    const remaining=[];
    for(const task of tasks){
      const shard=pinned.get(path.basename(task.file));
      if(shard===undefined)remaining.push(task);
      else {lanes[shard].push(task);costs[shard]+=task.seconds;}
    }
    remaining.sort((a,b)=>b.seconds-a.seconds||a.originalIndex-b.originalIndex);
    for(const task of remaining){
      let target=0;
      for(let i=1;i<total;i++)if(costs[i]<costs[target])target=i;
      lanes[target].push(task);costs[target]+=task.seconds;
    }
  }else{
    // Keep ad-hoc/manual non-four-shard runs compatible with the original runner.
    for(const task of tasks){const shard=task.originalIndex%total;lanes[shard].push(task);costs[shard]+=task.seconds;}
  }
  if(lanes.flat().length!==tasks.length)throw Error('Incomplete browser partition');
  if(lanes.some(l=>l.length===0))throw Error('Empty browser shard: increase suite coverage or reduce shard count');
  for(const lane of lanes)lane.sort((a,b)=>a.originalIndex-b.originalIndex);
  return {lanes,costs,tasks};
}
const dryRun=process.argv.includes('--plan-only');
const count=dryRun?4:Number(process.env.BROWSER_SHARD_TOTAL);
const index=dryRun?0:Number(process.env.BROWSER_SHARD_INDEX);
if(!Number.isInteger(index)||!Number.isInteger(count)||count<1||index<0||index>=count)throw Error('Invalid browser shard index/count');
const {lanes,costs,tasks}=plan(count);
if(dryRun){
  for(let i=0;i<count;i++)console.log('Shard '+i+': '+lanes[i].length+' commands, estimated '+costs[i].toFixed(1)+'s: '+lanes[i].map(t=>path.basename(t.file)).join(', '));
  console.log('PASS balanced plan: '+tasks.length+' distinct browser scripts accounted for once; WebKit tests pinned to shard 0 and shard 2.');
  process.exit(0);
}
console.log('Complete browser suite: '+tasks.length+' commands, shard '+index+'/'+count+', assigned '+lanes[index].length+' tests');
let executed=0;
for(const task of lanes[index]){
  console.log('\n=== Browser regression '+(task.originalIndex+1)+'/'+tasks.length+' — '+task.file+' ===');
  const started=Date.now();
  const result=spawnSync(process.execPath,[task.absolute],{
    cwd:repo,stdio:'inherit',env:process.env,
    // The exhaustive Chromium + WebKit solution audit can exceed four minutes
    // as question inventory grows; retain a bounded eight-minute watchdog.
    timeout:8*60*1000
  });
  const seconds=((Date.now()-started)/1000).toFixed(1);
  if(result.error||result.signal||result.status!==0){
    console.error('FAILED '+task.file+' after '+seconds+'s; status '+result.status+'; signal '+result.signal);
    if(result.error)console.error(result.error);
    process.exit(1);
  }
  console.log('PASSED '+task.file+' in '+seconds+'s');
  executed++;
}
if(executed!==lanes[index].length)throw Error('Incomplete browser shard');
console.log('Browser shard '+index+' passed: '+executed+' complete tests; all '+tasks.length+' commands accounted for across '+count+' shards.');
