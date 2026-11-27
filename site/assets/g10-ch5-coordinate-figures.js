/* Grade 10 coordinate exercise source coordinates and figure topology. */
(() => {
  'use strict';
  const indigo = '#443878';
  const rust = '#963f1b';
  const teal = '#166353';
  window.TriggleCoordinateFigures.register('c10-5-5-practice-',{
    20:{points:{A:[2,4],M:[5,7],B:[8,10]},segments:['AB'],activePoint:'M',showOrigin:false,
      bounds:{xMin:-.8,xMax:9,yMin:-.7,yMax:11.4},
      directions:{A:[-1,1],M:[1,1],B:[1,-1]},
      description:{en:'The midpoint M (5, 7) lies halfway along the line segment from A (2, 4) to B (8, 10).',
        ta:'A (2, 4), B (8, 10) ஆகிய புள்ளிகளை இணைக்கும் கோட்டுத்துண்டின் நடுப்புள்ளி M (5, 7).'}}
  });
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

  const plot = (points,options) => ({points,fullAxes:true,labelNegativeAxes:false,showOrigin:false,...options});
  const equations = (id,coefficients,label,color) => ({id,coefficients,label,color});
  const medianAndAltitude = plot({A:[6,2],B:[-5,-1],C:[1,9],D:[-2,4],E:[-13/17,103/17]},{
    outlines:[['ABC',teal,.09]],guides:['AD'],segments:['AE'],rightAngle:'AEC',
    keyPoints:['A','B','C','D'],directions:{D:directions,E:directions},associateLabels:'DE'
  });
  window.TriggleCoordinateFigures.register('c10-5-ex5-3-',{
    q8:plot({P:[-6,-4],Q:[5,11]},{segments:['PQ'],
      pointMeanings:{P:{en:'Cat',ta:'பூனை'},Q:{en:'Milk bottle',ta:'பால் புட்டி'}}}),
    'q9-i':medianAndAltitude,
    'q9-ii':medianAndAltitude
  });
  window.TriggleCoordinateFigures.register('c10-5-ex5-4-',{
    q7:plot({A:[-3,0],B:[10,-2],C:[12,3],D:[258/29,-138/29],E:[237/26,63/26]},{
      outlines:[['ABC',teal,.09]],guides:['BD'],segments:['AD','BE'],rightAngles:['ADB','BEC'],
      keyPoints:['A','B','C'],directions:{A:directions,B:directions,E:[0,-1],D:[0,1]},associateLabels:'ABD'
    }),
    q8:plot({A:[-4,2],B:[6,-4],M:[1,-1]},{segments:['AB'],
      analyticLines:[equations('bisector',[5,-3,-8],'5x − 3y − 8 = 0',teal)],
      rightAngle:['A','M',[4,4]],directions:{M:directions},associateLabels:'M'
    })
  });
  const junction = [-1/17,22/17];
  const foot = [59/1445,1702/1445];
  const target = equations('target',[6,-7,8],'6x − 7y + 8 = 0',teal);
  window.TriggleCoordinateFigures.register('c10-5-unit-',{
    q1:plot({P:[-1,-1],Q:[-1,4],R:[5,4],S:[5,-1],A:[-1,1.5],B:[2,4],C:[5,1.5],D:[2,-1]},{
      outlines:[['PQRS',indigo,.09],['ABCD',teal,.22]],
      directions:{A:directions,B:[0,-1],C:directions,D:[0,1]},associateLabels:'ABCD'
    }),
    q8:plot({P:[3,8],M:[1,2],Q:[-1,-4]},{segments:['PQ'],
      analyticLines:[equations('mirror',[1,3,-7],'x + 3y = 7',teal)],
      rightAngle:['P','M',[4,1]],directions:{M:directions},associateLabels:'M',
      pointMeanings:{Q:{en:'Image',ta:'பிம்பம்'}}
    }),
    q10:[
      plot({P:junction},{heading:{en:'Junction and target path',ta:'சந்திப்பும் இலக்குப் பாதையும்'},key:false,
        bounds:{xMin:-3,xMax:3,yMin:-2,yMax:3},
        analyticLines:[equations('first',[2,-3,4],'2x − 3y + 4 = 0',indigo),
          {...equations('second',[3,4,-5],'3x + 4y − 5 = 0',rust),dashed:true},target],directions:{P:directions}
      }),
      plot({P:junction,H:foot},{heading:{en:'Perpendicular path close-up',ta:'செங்குத்துப் பாதையின் பெரிதாக்கம்'},
        key:false,axes:false,bounds:{xMin:-.30,xMax:.33,yMin:.91,yMax:1.48},segments:['PH'],
        analyticLines:[target],rightAngle:['P','H',[foot[0]+.21,foot[1]+.18]],
        directions:{P:[-1,-1],H:[1,1]}
      })
    ]
  });
})();
