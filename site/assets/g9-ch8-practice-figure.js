/* Grade 9 arithmetic-mean practice. Bar heights use the given values. */
(() => {
  'use strict';
  const values = [4, 6, 8, 10];
  const labels = ['A', 'B', 'C', 'D'];
  const mean = values.reduce((sum,value)=>sum+value,0)/values.length;
  const pointMap = fn => Object.fromEntries(labels.map((id,index)=>[id,fn(index)]));
  const barCenter = index => 2+4*index;
  window.TriggleCoordinateFigures.register('c9-8-8-practice-', {
    8: {
      axes: false, pointMarkers: false, key: false, caption: '', heightRatio: .63, bottomInset: 1.8,
      bounds: {xMin: 0, xMax: 16, yMin: 0, yMax: 10},
      points: pointMap(index=>[barCenter(index),0]), pointLabels: pointMap(index=>String(values[index])),
      labelOffsets: pointMap(()=>[[0,.9],[0,1.02],[0,1.14]]),
      bars: values.map((value,index)=>({x:barCenter(index),value,width:2.4,color:'#947eb7'})),
      analyticLines: [
        {id:'baseline',coefficients:[0,1,0],color:'#5c566e'},
        {id:'mean',coefficients:[0,1,-mean],color:'#073a30',dashed:true,
          label:{en:`Mean = ${mean}`,ta:`சராசரி = ${mean}`}}
      ],
      description: {
        en: 'Four bars with heights 4, 6, 8 and 10. A dashed line marks the mean at 7.',
        ta: '4, 6, 8, 10 உயரங்களைக் கொண்ட நான்கு பட்டைகள். 7 என்ற சராசரியைத் துண்டுக்கோடு குறிக்கிறது.'
      }
    }
  });
})();
