/* Grade 9 Chapter 5 coordinates and topology from both 2025 SCERT editions. */
(() => {
  'use strict';
  const indigo = '#443878';
  const teal = '#166353';
  const labelDirections = [[0,-1],[-1,0],[1,0],[0,1]];
  const part = { A:[-3,3], B:[2,3], C:[-6,-1], D:[5,-1] };
  const plots = {
    q1: {
      points:{ P:[-7,6], Q:[7,-2], R:[-6,-7], S:[3,5], T:[3,9] },
      quadrants:true, fullAxes:true
    },
    q2: {
      // Fig. 5.11 asks learners to read the projections, so there is no coordinate key.
      points:{ P:[-4,4], Q:[3,3], R:[4,-2], S:[-5,-3] },
      projections:true, fullAxes:true, key:false, edgeDirections:{S:[1,-1]}
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

  const polygon = (heading,points,outline,guides=[]) => ({
    heading,points,outlines:[[outline,indigo,.11]],guides,fullAxes:true
  });
  window.TriggleCoordinateFigures.register('g9-ch5-ex5.2-',{
    q3:[
      polygon('(i)',{A:[5,4],B:[2,0],C:[-2,3]},'ABC'),
      polygon('(ii)',{A:[6,-4],B:[-2,-4],C:[2,10]},'ABC')
    ],
    q5:[
      {...polygon('(i)',{A:[-3,1],B:[-6,-7],C:[3,-9],D:[6,-1]},'ABCD'),directions:{D:[.3,1]}},
      polygon('(ii)',{A:[-7,-3],B:[5,10],C:[15,8],D:[3,-5]},'ABCD')
    ],
    q6:[
      {...polygon('(i)',{A:[3,-2],B:[7,6],C:[-1,2],D:[-5,-6]},'ABCD',['AC','BD']),showOrigin:false},
      {...polygon('(ii)',{A:[1,1],B:[2,1],C:[2,2],D:[1,2]},'ABCD',['AC','BD']),compactAxes:true}
    ],
    q11:{
      points:{C:[11,2],P:[1,2],Q:[3,-4],R:[5,-6]},circle:[[11,2],10],guides:['CP','CQ','CR'],
      fullAxes:true,compactAxes:true,showOrigin:false,associateLabels:'PQ',
      directions:{P:labelDirections,Q:labelDirections,R:[.2,1]}
    }
  });
  window.TriggleCoordinateFigures.register('g9-ch5-ex5.3-',{
    q5:{
      points:{O:[0,0],A:[8,6],B:[10,0],D:[9,3],M:[4.5,1.5]},
      circle:[[0,0],10],segments:['AB'],guides:['OD'],rightAngle:'ADO',fullAxes:true,showOrigin:false,associateLabels:'DM',
      directions:{A:[0,-1],B:[0,1],D:[1,0],M:labelDirections,O:[-1,1]}
    }
  });
  const diameterMidpoint = [1.5,3.5];
  window.TriggleCoordinateFigures.register('g9-ch5-ex5.5-',{
    q5:{
      points:{A:[-3,5],M:diameterMidpoint,B:[3,3],C:[6,2]},
      circle:[diameterMidpoint,Math.hypot(9,3)/2],segments:['AC'],fullAxes:true,showOrigin:false,
      directions:{M:[0,-1],B:[0,1]}
    }
  });
  window.TriggleCoordinateFigures.register('g9-ch5-ex5.6-',{
    q3:{points:{O:[0,0],A:[3,-4],B:[3,4],C:[0,4]},outlines:[['OABC',teal,.12]],fullAxes:true,showOrigin:false},
    q4:{
      points:{P:[-1,1],Q:[3,-4],R:[1,-1],S:[-2,-3],T:[-4,4]},quadrants:true,fullAxes:true,
      directions:{R:labelDirections}
    }
  });
})();
