/* Shared teacher-only textbook question selection.
   Legacy Grade 9 source questions use kind:"reference", while newer batches
   use kind:"textbook". The curriculum's textbookQuestionIds is authoritative
   for identifying registered textbook exercises; never include practice items. */
(()=>{
  'use strict';
  function collect(classes, curriculum) {
    const textbookIds = new Set();
    for (const grade of curriculum?.grades || []) {
      for (const chapter of grade.chapters || []) {
        for (const id of chapter.textbookQuestionIds || []) textbookIds.add(id);
      }
    }
    const seen = new Set();
    return Object.values(classes || {}).flatMap(grade => grade?.items || [])
      .filter(item => {
        if (!item || !item.id || ![9, 10, 11, 12].includes(Number(item.classNum))) return false;
        if (item.kind === 'practice' || !item.q?.en) return false;
        if (item.kind !== 'textbook' && !textbookIds.has(item.id)) return false;
        if (seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      })
      .sort((a,b) => Number(a.classNum)-Number(b.classNum)
        || Number(a.chapter)-Number(b.chapter)
        || String(a.exercise||'').localeCompare(String(b.exercise||''), undefined, {numeric:true})
        || String(a.label?.en||'').localeCompare(String(b.label?.en||''),undefined,{numeric:true}));
  }
  window.TriggleTeacherQuestions = Object.freeze({collect});
})();
