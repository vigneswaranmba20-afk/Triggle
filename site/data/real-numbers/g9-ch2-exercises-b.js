/* Grade 9 Real Numbers · 2025 SCERT Exercises 2.4 and 2.5. */
(()=>{'use strict';const A=window.TriggleRealCh2.addExercise;
const e=(ex,n,part,page,q,ta,answer,steps,hard=false,diagram=null)=>A(ex,n,part,{page,q,ta,answer,steps,hard,diagram,title:'Exercise 2.'+ex+' · Question '+n+(part?' ('+part+')':''),titleTa:'பயிற்சி 2.'+ex+' · வினா '+n+(part?' ('+part+')':'')});
const zoom=[
 ['i','5.348','5.348',5.348,5.34,5.35,'5.348 is the eighth thousandth after 5.340.','5.340-க்கு அடுத்த எட்டாம் ஆயிரமாம் இடம் 5.348.'],
 ['ii','6.(4)','6.444',6.444,6.44,6.45,'The repeating digit 4 gives 6.444 to three decimal places.','4 மீண்டும் வருவதால் மூன்று தசம இடங்களில் 6.444.'],
 ['iii','4.(73)','4.7373',4.7373,4.73,4.74,'The repeating block 73 gives 4.7373 to four decimal places.','73 மீண்டும் வருவதால் நான்கு தசம இடங்களில் 4.7373.']
];
for(const [part,q,answer,target,min,max,why,whyTa] of zoom)e(4,1,part,57,'Represent '+q+' on a number line'+(part==='i'?'.':part==='ii'?' to three decimal places.':' to four decimal places.'),'எண்கோட்டில் '+q+' ஐ '+(part==='i'?'குறிக்கவும்.':part==='ii'?'மூன்று தசம இடங்களுக்குக் குறிக்கவும்.':'நான்கு தசம இடங்களுக்குக் குறிக்கவும்.'),answer,[
 [why,whyTa,q+' ≈ '+answer],
 ['Magnify successive intervals until the target value is reached.','எண் கிடைக்கும் வரை தொடர்ந்த இடைவெளிகளைப் பெரிதாக்கவும்.',answer+' ∈ ('+min+', '+max+')']
 ],false,{kind:'real-number-line',target,min,max,label:answer});
const p5=[
 ['i','625','5⁴','625=5×5×5×5'],
 ['ii','1/5','5⁻¹','1/5=5⁻¹'],
 ['iii','√5','5^(1/2)','√5=5^(1/2)'],
 ['iv','√125','5^(3/2)','√125=√(5³)=5^(3/2)']
];
for(const [part,q,answer,eq] of p5)e(5,1,part,59,'Write '+q+' in the form 5ⁿ.',''+q+' ஐ 5ⁿ வடிவில் எழுதுக.',answer,[
 ['Rewrite the base as a power of five.','எண்ணை 5-இன் அடுக்காக எழுதுக.',eq],
 ['Use negative indices for reciprocals and one-half indices for square roots.','தலைகீழ் எண்களுக்கு எதிர்மறை அடுக்கு, வர்க்கமூலத்திற்கு 1/2 அடுக்கு பயன்படுத்துக.',answer]
 ]);
const p4=[
 ['i','16','4²','16=4×4=4²'],
 ['ii','8','4^(3/2)','8=2³=(4^(1/2))³=4^(3/2)'],
 ['iii','32','4^(5/2)','32=2⁵=(4^(1/2))⁵=4^(5/2)']
];
for(const [part,q,answer,eq] of p4)e(5,2,part,59,'Write '+q+' in the form 4ⁿ.',''+q+' ஐ 4ⁿ வடிவில் எழுதுக.',answer,[
 ['Use 4=2² to express the number in base 4.','4=2² என்பதைப் பயன்படுத்தி 4-இன் அடுக்காக மாற்றுக.',eq],
 ['Simplify the resulting exponent.','கிடைக்கும் அடுக்கைச் சுருக்குக.',answer]
 ]);
const vals=[
 ['i','49^(1/2)','7','49^(1/2)=√49=7','49=7²'],
 ['ii','243^(2/5)','9','243^(2/5)=(⁵√243)²=3²=9','243=3⁵'],
 ['iii','9^(−3/2)','1/27','9^(−3/2)=1/(√9)³=1/27','√9=3'],
 ['iv','(64/125)^(−2/3)','25/16','(64/125)^(−2/3)=[(4/5)³]^(−2/3)=(5/4)²=25/16','64/125=(4/5)³']
];
for(const [part,q,answer,eq,factor] of vals)e(5,3,part,59,'Find the exact value of '+q+'.',''+q+' இன் சரியான மதிப்பைக் காண்க.',answer,[
 ['Express the base using a perfect power.','அடிப்படையை நிறை அடுக்காக மாற்றுக.',factor],
 ['Apply fractional and negative exponent rules carefully.','பின்ன மற்றும் எதிர்மறை அடுக்கு விதிகளை கவனமாகப் பயன்படுத்துக.',eq]
 ],part==='iv');
const frac=[
 ['i','√5','5^(1/2)','√5=5^(1/2)'],
 ['ii','√7','7^(1/2)','√7=7^(1/2)'],
 ['iii','(∛49)^5','49^(5/3)','(∛49)^5=(49^(1/3))⁵=49^(5/3)'],
 ['iv','(1/∛100)^7','100^(−7/3)','(1/∛100)^7=(100^(−1/3))⁷=100^(−7/3)']
];
for(const [part,q,answer,eq] of frac)e(5,4,part,59,'Write '+q+' using a fractional index.',''+q+' ஐ பின்ன அடுக்கைப் பயன்படுத்தி எழுதுக.',answer,[
 ['Replace a square or cube root with exponent 1/2 or 1/3.','வர்க்க/கனமூலத்தை முறையே 1/2 அல்லது 1/3 அடுக்காக மாற்றுக.',q],
 ['Combine exponents with the existing power, using a negative exponent for a reciprocal.','கொடுக்கப்பட்ட அடுக்கைப் பெருக்குக; தலைகீழ் எண்ணுக்கு எதிர்மறை அடுக்கைப் பயன்படுத்துக.',eq]
 ]);
const roots=[
 ['i','32','2','32=2⁵'],
 ['ii','243','3','243=3⁵'],
 ['iii','100000','10','100000=10⁵'],
 ['iv','1024/3125','4/5','1024/3125=4⁵/5⁵=(4/5)⁵']
];
for(const [part,q,answer,eq] of roots)e(5,5,part,60,'Find the fifth root of '+q+'.',''+q+' இன் ஐந்தாம் மூலத்தைக் காண்க.',answer,[
 ['Express the radicand as a fifth power.','மூல எண்ணை ஐந்தாம் அடுக்கில் எழுதுக.',eq],
 ['Undo the fifth power by taking the fifth root.','ஐந்தாம் மூலத்தை எடுத்தால் ஐந்தாம் அடுக்கு நீங்கும்.','⁵√('+q+') = '+answer]
 ]);
})();
