/* Grade 9 Exercise 5.1 coordinates and topology, EN pp. 192–193 and TA pp. 205–206. */
(() => {
  'use strict';
  const indigo = '#443878';
  const teal = '#166353';
  const part = { A:[-3,3], B:[2,3], C:[-6,-1], D:[5,-1] };
  const plots = {
    q1: {
      points:{ P:[-7,6], Q:[7,-2], R:[-6,-7], S:[3,5], T:[3,9] },
      quadrants:true, fullAxes:true
    },
    q2: {
      // Fig. 5.11 asks learners to read the projections, so there is no coordinate key.
      points:{ P:[-4,4], Q:[3,3], R:[4,-2], S:[-5,-3] },
      projections:true, fullAxes:true, key:false
    },
    q3: [
      { heading:'(i)', points:{ A:[-5,3], B:[-1,3], C:[0,3], D:[5,3] },
        segments:['AD'], pointNames:false, key:false, fullAxes:true },
      { heading:'(ii)', points:{ E:[0,-4], F:[0,-2], G:[0,4], H:[0,5] },
        segments:['EH'], pointNames:false, key:false, fullAxes:true }
    ],
    q4: [
      { heading:'(i) · PQRS', points:{ P:[0,0], Q:[-4,0], R:[-4,-4], S:[0,-4] },
        outlines:[['PQRS',teal,.13]], showOrigin:false, key:false },
      { heading:'(ii) · ABCDA', points:part,
        segments:['AB','BC','CD','DA'], showOrigin:false, key:false },
      { heading:'(ii) · ABDCA', points:part,
        outlines:[['ABDC',indigo,.13]], showOrigin:false, key:false }
    ]
  };
  window.TriggleCoordinateFigures.register('g9-ch5-ex5.1-',plots);
})();
