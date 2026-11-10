'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const site=path.resolve(__dirname,'..'),window={};const context={window};
for(const file of ['data/class-10.js','data/class-10-ex1-1-2025.js','data/class-10-chapter-1.js','data/curriculum.js'])vm.runInNewContext(fs.readFileSync(path.join(site,file),'utf8'),context,{filename:file});
const grade=window.TRIGGLE_CLASSES[10],chapter=window.TRIGGLE_CURRICULUM.grades.find(g=>g.grade===10).chapters.find(c=>c.number===1);
const qs=grade.items.filter(q=>q.chapter==='1'&&q.kind==='textbook');assert.equal(qs.length,74,'12 existing Exercise 1.1 subparts plus 62 new items');
assert.equal(new Set(qs.map(q=>q.id)).size,74,'Unique Grade 10 Chapter 1 ids');
const counts={'1.1':12,'1.2':5,'1.3':10,'1.4':12,'1.5':10,'1.6':15,'1.unit':10};
for(const [exercise,n] of Object.entries(counts)){const group=qs.filter(q=>q.exercise===exercise);assert.equal(group.length,n,exercise);for(const q of group)assert.ok(q.q?.en&&q.steps?.length&&q.answer,exercise+' missing question/solution');}
const ex11=qs.filter(q=>q.exercise==='1.1');assert.equal(new Set(ex11.map(q=>q.label.en.match(/Q([0-9]+)/)?.[1])).size,7,'All seven Ex 1.1 numbered questions');
const key=['C','C','A','B','C','D','C','A','C','C','A','D','C','B','D'];qs.filter(q=>q.exercise==='1.6').forEach((q,i)=>assert.ok(q.answer.startsWith('('+key[i]+')'),'MCQ '+(i+1)));
const imgs=qs.filter(q=>q.figureSrc);assert.equal(imgs.length,3);for(const q of imgs)assert.ok(fs.statSync(path.join(site,q.figureSrc)).size>1000,'Missing '+q.figureSrc);
assert.equal(chapter.textbookQuestionIds.length,74,'Questions not linked to chapter hub');
const html=fs.readFileSync(path.join(site,'index.html'),'utf8');assert.ok(html.includes('data/class-10-chapter-1.js'));
const sw=fs.readFileSync(path.join(site,'service-worker.js'),'utf8');for(const f of ['data/class-10-chapter-1.js',...imgs.map(q=>q.figureSrc)])assert.ok(sw.includes(f),'Not pre-cached: '+f);
console.log('PASS Grade 10 Chapter 1: 69 numbered questions, 74 individual app records, 7 exercise groups, 3 figures.');
