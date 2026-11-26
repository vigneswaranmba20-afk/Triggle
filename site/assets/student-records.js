(function () {
  'use strict';

  function prepareStudentRecords(scope) {
    const classes = scope.TRIGGLE_CLASSES || {};
    const isWorkedExample = item => item?.kind === 'textbook-example' ||
      /(?:^|[-_])(?:worked[-_])?examples?(?:[-_]|$)/i.test(item?.id || '') ||
      /^\s*(?:Worked\s+)?Example\b/i.test(item?.label?.en || '');
    for (const grade of [9, 10, 11, 12]) {
      if (!Array.isArray(classes[grade]?.items)) throw Error('Missing data for class ' + grade);
      classes[grade].items = classes[grade].items.filter(item => !isWorkedExample(item));
    }
    scope.TriggleG10NumbersTamil?.(classes[10].items);
    scope.TriggleG10AlgebraTamil?.(classes[10].items);
    scope.TriggleG10GeometryTamil?.(classes[10].items);
    scope.TriggleG10FrontierTamilAnswers?.(classes[10].items);
    scope.TriggleG10SourceTables?.(classes[10].items);
    scope.TriggleG10CoordinateFrontier?.(classes[10].items);
    scope.TriggleG9RealFrontier?.(classes[9].items);
    scope.TriggleG9AlgebraTamilAnswers?.(classes[9].items);
    scope.TriggleG9StatisticsTables?.(classes[9].items);
    scope.TriggleG9FrontierGraphs?.(classes[9].items);
    return classes;
  }

  if (typeof module === 'object' && module.exports) module.exports = prepareStudentRecords;
  else window.TrigglePrepareStudentRecords = prepareStudentRecords;
})();
