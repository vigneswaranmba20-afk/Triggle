/* Grade 9 Real Numbers: exercise 2.6, printed page 68 EN, page 72 Tamil.
   Fractions and nested surds verified using the two 2025 PDFs and independent arithmetic.
 */
(()=>{'use strict';
const A=window.TriggleRealCh2.addExercise;
const e=(n,p,q,ta,answer,steps,hard=false)=>A(6,n,p,{page:68,tamilPage:72,q,ta,answer,steps,hard,
  title:'Surds · Exercise 2.6 · Q'+n+' ('+p+')',
  titleTa:'முறுடுகள் · பயிற்சி 2.6 · வினா '+n+' ('+p+')'});
const addition=[
 ['i','5√3 + 18√3 − 2√3','(5+18−2)√3=21√3','21√3'],
 ['ii','4∛5 + 2∛5 − 3∛5','(4+2−3)∛5=3∛5','3∛5'],
 ['iii','3√75 + 5√48 − √243','3(5√3)+5(4√3)−9√3=(15+20−9)√3','26√3'],
 ['iv','5∛40 + 2∛625 − 3∛320','5(2∛5)+2(5∛5)−3(4∛5)=(10+10−12)∛5','8∛5']
];
for(const [p,q,eq,answer] of addition)e(1,p,'Simplify '+q+' using the addition and subtraction of surds.','முறுடுகளின் கூடுதல், கழித்தல் பண்பைப் பயன்படுத்தி '+q+' ஐச் சுருக்குக.',answer,[
 ['Extract any perfect powers from the radicands to obtain like surds.','ஒரே முறுடுகள் கிடைக்க நிறைவர்க்க/நிறைகனக் காரணிகளை வெளியே எடுக்கவும்.',p==='iii'?'√75=5√3; √48=4√3; √243=9√3':p==='iv'?'∛40=2∛5; ∛625=5∛5; ∛320=4∛5':'Like surds share the same root and radicand.'],
 ['Combine only the coefficients of like surds.','ஒரே முறுடுகளின் கெழுக்களை மட்டும் சேர்த்துச் சுருக்குக.',eq]
 ]);
const products=[
 ['i','√3 × √5 × √2','√(3×5×2)=√30','√30'],
 ['ii','√35 ÷ √7','√(35/7)=√5','√5'],
 ['iii','∛27 × ∛8 × ∛125','3×2×5=30','30'],
 ['iv','(7√a−5√b)(7√a+5√b)','(7√a)²−(5√b)²=49a−25b','49a−25b'],
 ['v','[√(225/729)−√(25/144)] ÷ √(16/81)','(5/9−5/12)/(4/9)=(5/36)×(9/4)=5/16','5/16']
];
for(const [p,q,eq,answer] of products)e(2,p,'Simplify '+q+' using multiplication or division properties of surds.','முறுடுகளின் பெருக்கல் அல்லது வகுத்தல் விதியைப் பயன்படுத்தி '+q+' ஐச் சுருக்குக.',answer,[
 ['Apply the product/quotient of radicals, or the conjugate identity.','முறுடுகளின் பெருக்கல்/வகுத்தல் அல்லது இணைமுறுடுச் சூத்திரத்தைப் பயன்படுத்துக.',p==='iv'?'(u−v)(u+v)=u²−v²':p==='v'?'√(225/729)=5/9; √(25/144)=5/12; √(16/81)=4/9':'Simplify the radicals before combining.'],
 ['Finish all arithmetic and simplify.','அனைத்துக் கணக்குகளையும் செய்து எளிய வடிவைக் காண்க.',eq]
 ],['iv','v'].includes(p));
e(3,'i','Using √2=1.414, √3=1.732, √5=2.236, √10=3.162, evaluate √40−√20 to three decimals.','√2=1.414, √3=1.732, √5=2.236, √10=3.162 எனில் √40−√20 இன் மதிப்பை மூன்று தசம இடங்களில் காண்க.','1.852',[
 ['Simplify both square roots before substituting approximate values.','தோராய மதிப்புகளைப் பதிலிடுமுன் வர்க்கமூலங்களைச் சுருக்கவும்.','√40=2√10; √20=2√5'],
 ['Use the approximate values supplied in the question, not fresh calculator values.','வினாவில் தரப்பட்ட தோராய மதிப்புகளையே பயன்படுத்துக.','2(3.162)−2(2.236)=6.324−4.472=1.852']
 ]);
e(3,'ii','Using √2=1.414, √3=1.732, √5=2.236, √10=3.162, evaluate √300+√90−√8 to three decimals.','√2=1.414, √3=1.732, √5=2.236, √10=3.162 எனில் √300+√90−√8 இன் மதிப்பை மூன்று தசம இடங்களில் காண்க.','23.978',[
 ['Factor out square numbers to produce the given root values.','கொடுக்கப்பட்ட மூல மதிப்புகள் வருமாறு நிறைவர்க்கங்களை வெளியே எடுக்கவும்.','√300=10√3; √90=3√10; √8=2√2'],
 ['Substitute the textbook approximations and combine.','பாடநூலில் உள்ள தோராய மதிப்புகளைப் பதிலிட்டு கணக்கிடுக.','10(1.732)+3(3.162)−2(1.414)=17.320+9.486−2.828=23.978']
 ]);
e(4,'i','Arrange ∛5, ⁹√4, ⁶√3 in descending order.','∛5, ⁹√4, ⁶√3 ஆகிய முறுடுகளை இறங்குவரிசையில் எழுதுக.','∛5 > ⁶√3 > ⁹√4',[
 ['Convert to the common index 18, the LCM of 3, 9, and 6.','3,9,6 ஆகியவற்றின் மீச்சிறு பொது மடங்கு 18; ஒரே மூல வரிசையில் மாற்றுக.','∛5=¹⁸√5⁶; ⁹√4=¹⁸√4²; ⁶√3=¹⁸√3³'],
 ['Compare positive radicands, then reverse into descending order.','நேர்மறை மூல எண்களை ஒப்பிட்டு இறங்குவரிசையில் அமைக்கவும்.','5⁶=15625 > 3³=27 > 4²=16 ⇒ ∛5 > ⁶√3 > ⁹√4']
 ],true);
e(4,'ii','Arrange √(∛5), ∛(⁴√7), √(√3) in descending order.','√(∛5), ∛(⁴√7), √(√3) ஆகிய முறுடுகளை இறங்குவரிசையில் எழுதுக.','√(√3) > √(∛5) > ∛(⁴√7)',[
 ['Convert each nested root to a fractional exponent.','ஒவ்வொரு அடுக்கு மூலத்தையும் பின்ன அடுக்காக மாற்றுக.','√(∛5)=5^(1/6); ∛(⁴√7)=7^(1/12); √(√3)=3^(1/4)'],
 ['Raise all positive values to power 12 and compare the resulting integers.','அனைத்து நேர்மறை எண்களையும் 12-ஆம் அடுக்கிற்கு உயர்த்தி ஒப்பிடுக.','5²=25; 7¹=7; 3³=27'],
 ['Read the descending order from 27>25>7.','27>25>7 என்ற இறங்குவரிசையைப் பயன்படுத்துக.','√(√3) > √(∛5) > ∛(⁴√7)']
 ],true);
const pure=[
 ['i','sum','√2/2 + √2/2','√2','Each summand is a surd; together they make the pure surd √2.','இரண்டும் முறுடுகள்; கூட்டினால் தூய முறுடு √2 கிடைக்கும்.'],
 ['ii','difference','√8 − √2','√2','Since √8=2√2, subtracting one √2 leaves √2.','√8=2√2; ஒரு √2-ஐக் கழித்தால் √2 கிடைக்கும்.'],
 ['iii','product','√2 × √3','√6','Multiplying the radicands gives √6 without any outside coefficient.','மூல எண்களைப் பெருக்கினால் வெளியே கெழு இல்லாத √6 கிடைக்கும்.'],
 ['iv','quotient','√6 ÷ √2','√3','Dividing the radicands gives √3, a pure surd.','மூல எண்களை வகுத்தால் தூய முறுடு √3 கிடைக்கும்.']
];
for(const [p,type,expr,answer,why,taWhy] of pure)e(5,p,'Can the '+type+' of two surds be a pure surd? Give an example.','இரு முறுடுகளின் '+({sum:'கூட்டல்',difference:'கழித்தல்',product:'பெருக்கல்',quotient:'வகுத்தல்'}[type])+' தூய முறுடாக வருமா? எடுத்துக்காட்டு தருக.','Yes: '+expr+' = '+answer,[
 ['A pure surd has coefficient 1 in simplified radical form.','தூய முறுடின் எளிய வடிவில் அதன் கெழு 1 ஆக இருக்கும்.','Pure surd: √2 or √3 or √6'],
 [why,taWhy,expr+' = '+answer]
 ]);
const rational=[
 ['i','sum','√2 + (−√2)','0','Opposite irrational surds cancel.','எதிரெதிர் முறுடுகள் ஒன்றையொன்று நீக்கும்.'],
 ['ii','difference','√3 − √3','0','Subtracting identical surds gives zero.','ஒரே முறுடைக் கழித்தால் பூச்சியம் கிடைக்கும்.'],
 ['iii','product','√2 × √8','4','The product is √16, which is an integer.','√16 என்பது 4 என்ற முழு எண்.'],
 ['iv','quotient','√18 ÷ √2','3','The quotient is √9, which is an integer.','√9 என்பது 3 என்ற முழு எண்.']
];
for(const [p,type,expr,answer,why,taWhy] of rational)e(6,p,'Can the '+type+' of two surds be a rational number? Give an example.','இரு முறுடுகளின் '+({sum:'கூட்டல்',difference:'கழித்தல்',product:'பெருக்கல்',quotient:'வகுத்தல்'}[type])+' விகிதமுறு எண்ணாக வருமா? எடுத்துக்காட்டு தருக.','Yes: '+expr+' = '+answer,[
 ['A rational result is possible even when the original numbers are irrational.','தொடக்க எண்கள் விகிதமுறாதவை என்றாலும் முடிவு விகிதமுறு எண்ணாகலாம்.',expr],
 [why,taWhy,expr+' = '+answer]
 ]);
})();