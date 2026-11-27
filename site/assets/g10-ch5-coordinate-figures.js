/* Grade 10 coordinate exercise source coordinates and figure topology. */
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

  const polygon = (points,boundary,color=teal) => ({
    points,outlines:[[boundary,color,.12]],fullAxes:true,showOrigin:false
  });
  const directions = [[0,-1],[-1,0],[1,0],[0,1]];
  window.TriggleCoordinateFigures.register('c10-5-ex5-2-',{
    'q9-i': {...polygon({A:[1,-4],B:[2,-3],C:[4,-7]},'ABC'),rightAngle:'BAC',
      directions:{A:directions,B:[0,-1],C:[1,1]},associateLabels:'A'},
    'q9-ii': {...polygon({L:[0,5],M:[9,12],N:[3,14]},'LMN',indigo),rightAngle:'LNM',
      directions:{L:[1,1],N:[0,-1]}},
    q10: {...polygon({A:[2.5,3.5],B:[10,-4],C:[2.5,-2.5],D:[-5,5]},'ABCD'),directions:{C:[0,1]}},
    q12: {...polygon({A:[3,-4],B:[9,-4],C:[5,-7],D:[7,-7]},'ABDC',rust),
      guides:['BC','DA'],constructionPoints:{crossing:[6,-25/4]},
      directions:{A:[-1,-.5],B:[1,-.5],C:[-1,1],D:[1,1]}},
    q13: {
      points:{A:[-4,-2],B:[5,-1],C:[6,5],D:[-7,6],P:[.5,-1.5],Q:[5.5,2],R:[-.5,5.5],S:[-5.5,2]},
      outlines:[['ABCD',indigo,.09],['PQRS',teal,.22]],fullAxes:true,labelNegativeAxes:false,
      showOrigin:false,axisLabelDirections:{X:[.45,1]},
      directions:{B:[0,1],C:[.2,-1],P:[0,1],Q:[[1,-.5],[1,0],[0,-1]],R:[0,-1],S:[[-1,-.5],[-1,0],[0,-1]]},
      associateLabels:'PQRS'
    }
  });
})();
