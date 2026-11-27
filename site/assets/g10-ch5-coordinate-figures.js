/* Grade 10 Exercise 5.1 source coordinates and figure topology. */
(() => {
  'use strict';
  const indigo = '#443878';
  const rust = '#963f1b';
  const teal = '#166353';
  const shared = {A:[-5,3], B:[-4,-2], C:[2,-1], D:[1,3], E:[1.5,1], F:[-2,3], G:[-4.5,.5]};
  const partition = highlight => ({
    points:shared, outlines:[['ABCD',indigo,.07], [highlight,rust,.23]],
    segments:['GF','FE','EG'], directions:{F:[0,-1], E:[1,0], G:[-1,-.6]}, showOrigin:false
  });
  const plots = {
    'q5-i': {points:{A:[-9,-2], B:[-8,-4], C:[1,-3], D:[2,2]}, outlines:[['ABCD',teal,.12]]},
    'q5-ii': {points:{A:[-9,0], B:[-6,-3], C:[-1,-2], D:[-8,6]}, outlines:[['ABCD',indigo,.12]]},
    'q8': {
      points:{A:[7,7], B:[15,7], C:[12,1], P:[11,7], Q:[13.5,4], R:[9.5,4]},
      outlines:[['ABC',teal,.09], ['PQR',rust,.21]],
      directions:{A:[-1,-1], B:[1,-1], C:[1,1], P:[0,-1], Q:[1,0], R:[-1,0]}
    },
    'q9': {
      points:{A:[-4,-8], B:[8,-4], C:[6,10], D:[-10,6], E:[-3,-5], F:[6,-2], G:[3,7], H:[-6,4]},
      outlines:[['ABCD',indigo,.11], ['EFGH',teal,.24]],
      insideLabels:'EFGH', axes:false
    },
    'q11-i': partition('AGF'),
    'q11-ii': partition('FED'),
    'q11-iii': partition('BCEG')
  };

  window.TriggleCoordinateFigures.register('c10-5-ex5-1-',plots);
})();
