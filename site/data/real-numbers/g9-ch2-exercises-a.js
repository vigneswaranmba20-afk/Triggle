/* SCERT Grade 9 2025 Real Numbers · Exercises 2.1–2.3. */
(()=>{'use strict';const A=window.TriggleRealCh2.addExercise;
const e=(ex,n,part,page,q,ta,answer,steps,hard=false,diagram=null)=>A(ex,n,part,{page,q,ta,answer,steps,hard,diagram,
 title:'Exercise 2.'+ex+' · Question '+n+(part?' ('+part+')':''),titleTa:'பயிற்சி 2.'+ex+' · வினா '+n+(part?' ('+part+')':'')});
e(1,1,'',45,'Which marked arrow A, B, C or D on the textbook number line is closest to 11/3?','பாடநூலின் எண்கோட்டில் 11/3 ஐச் சரியாகக் குறிக்கும் A, B, C, D அம்புகளில் எது?','Arrow D (11/3 = 3⅔ ≈ 3.667)',[
 ['Convert 11/3 into a mixed number.','11/3 ஐ கலப்பெண்ணாக மாற்றுக.','11/3=3+2/3=3.6666…'],
 ['The point lies between 3 and 4, nearer to 4; the matching arrow is D.','இப்புள்ளி 3,4 இடையே 4-க்கு அருகில் உள்ளது; பொருத்தமான அம்பு D.','D: approximately 3.67']
 ],false,{kind:'real-number-line',target:11/3,label:'11/3',min:3,max:4});
e(1,2,'',45,'Write any three rational numbers strictly between −7/11 and 2/11.','−7/11 மற்றும் 2/11 இடையே ஏதேனும் மூன்று விகிதமுறு எண்களைக் காண்க.','−6/11, −5/11, −4/11',[
 ['The fractions already have a common positive denominator.','கொடுக்கப்பட்ட பின்னங்களின் பகுதி ஒரே நேர்மறை எண்.','−7/11 < −6/11 < −5/11 < −4/11 < 2/11'],
 ['Choose any three interior numerators.','உள்ளடங்கிய மூன்று தொகுதிகளைத் தேர்ந்தெடுக்கவும்.','−6/11, −5/11, −4/11']
 ]);
e(1,3,'i',45,'Find five rational numbers between 1/4 and 1/5.','1/4 மற்றும் 1/5 இடையே ஐந்து விகிதமுறு எண்களைக் காண்க.','0.21, 0.22, 0.23, 0.24, 0.245',[
 ['Convert both fractions to decimals.','இரு பின்னங்களையும் தசமங்களாக மாற்றுக.','1/5=0.20; 1/4=0.25'],
 ['List five terminating decimals strictly inside the interval.','இடைவெளிக்குள் வரும் ஐந்து முடிவுறு தசமங்களை எழுதுக.','0.20 < 0.21 < 0.22 < 0.23 < 0.24 < 0.245 < 0.25']
 ]);
e(1,3,'ii',45,'Find five rational numbers between 0.1 and 0.11.','0.1 மற்றும் 0.11 இடையே ஐந்து விகிதமுறு எண்களைக் காண்க.','0.101, 0.102, 0.103, 0.104, 0.105',[
 ['Write both values to three decimal places.','இரு எல்லை எண்களையும் மூன்று தசம இடங்களில் எழுதுக.','0.100 < x < 0.110'],
 ['Choose five distinct thousandths between them.','இடையே உள்ள ஐந்து ஆயிரமாம் தசமங்களைத் தேர்ந்தெடுக்கவும்.','0.101, 0.102, 0.103, 0.104, 0.105']
 ]);
e(1,3,'iii',45,'Find five rational numbers between −1 and −2.','−1 மற்றும் −2 இடையே ஐந்து விகிதமுறு எண்களைக் காண்க.','−1.1, −1.2, −1.3, −1.4, −1.5',[
 ['Remember −2 is less than −1 on the number line.','எண்கோட்டில் −2 என்பது −1 ஐவிடச் சிறியது.','−2 < x < −1'],
 ['Choose five terminating decimals inside this range.','இந்த இடைவெளிக்குள் ஐந்து முடிவுறு தசமங்களைத் தேர்ந்தெடுக்கவும்.','−2 < −1.5 < −1.4 < −1.3 < −1.2 < −1.1 < −1']
 ]);
const decimals=[
 ['i','2/7','0.(285714)','2/7=0.285714285714…','Recurring, period 6'],
 ['ii','−5 3/11','−5.(27)','−58/11=−5.272727…','Recurring, period 2'],
 ['iii','22/3','7.(3)','22/3=7.33333…','Recurring, period 1'],
 ['iv','327/200','1.635','327/200=1.635','Terminating']
];
for(const [part,frac,answer,division,type] of decimals)e(2,1,part,51,'Convert '+frac+' to decimal and state its expansion type.',''+frac+' ஐ தசமமாக மாற்றி அதன் விரிவு வகையைக் கூறுக.',answer+' — '+type,[
 ['Perform numerator divided by denominator (converting the mixed number first if needed).','தேவைப்பட்டால் கலப்பெண்ணை பின்னமாக்கி, தொகுதியை பகுதியால் வகுக்கவும்.',division],
 ['A zero remainder means terminating; repeated nonzero remainders produce a recurring block.','மீதி பூச்சியம் எனில் முடிவுறும்; மீதி மீண்டும்வந்தால் தொடர்தசமம்.',''+type]
]);
e(2,2,'',51,'Express 1/13 as a recurring decimal and find its period length.','1/13 ஐ தொடர்தசமமாக எழுதிப் அதன் சுழற்சி நீளத்தைக் காண்க.','1/13=0.(076923), period 6',[
 ['Divide one by thirteen, keeping leading zeros in the repeating block.','1 ஐ 13-ஆல் வகுத்து, மீளும் தொகுதியில் வரும் தொடக்கப் பூச்சியத்தையும் எழுதுக.','1/13=0.076923076923…'],
 ['The shortest repeating block is 076923.','மிகச் சிறிய மீளும் தொகுதி 076923 ஆகும்.','period=6']
 ]);
e(2,3,'',52,'From the recurring expansion of 1/11, find those of 1/33 and 71/33.','1/11 இன் தொடர்தசமத்தைப் பயன்படுத்தி 1/33, 71/33 காண்க.','1/33=0.(03); 71/33=2.(15)',[
 ['One third of 1/11 gives 1/33.','1/11 இன் மூன்றில் ஒரு பங்கு 1/33.','1/11=0.(09); 1/33=0.(03)'],
 ['Separate the improper fraction into whole and fractional parts.','தகாப் பின்னத்தை முழு மற்றும் பின்னப் பகுதிகளாகப் பிரிக்கவும்.','71/33=2+5/33'],
 ['Five times the repeating block 03 becomes 15.','03 என்ற மீளும் தொகுதியை ஐந்தால் பெருக்கினால் 15 கிடைக்கும்.','5/33=0.(15) ⇒ 71/33=2.(15)']
 ],true);
const conversions=[
 ['i','0.(24)','8/33','100x−x=24 ⇒ 99x=24 ⇒ x=8/33'],
 ['ii','2.(327)','775/333','1000x−x=2325 ⇒ x=2325/999=775/333'],
 ['iii','−5.132','−1283/250','−5132/1000=−1283/250'],
 ['iv','3.1(7)','143/45','100x−10x=317−31=286 ⇒ x=143/45'],
 ['v','17.2(15)','5681/330','1000x−10x=17215−172=17043 ⇒ x=5681/330'],
 ['vi','−21.213(7)','−47731/2250','10000x−1000x=−212137+21213=−190924 ⇒ x=−47731/2250']
];
for(const [part,dec,answer,eq] of conversions)e(2,4,part,52,'Express '+dec+' as a fraction p/q (parentheses show recurring digits).',''+dec+' தொடர்தசமத்தை p/q பின்னமாக மாற்றுக.',answer,[
 ['Align the repeating tails using appropriate powers of ten, or put a terminating number over a power of ten.','மீளும் பகுதியை 10-இன் அடுக்குகள் மூலம் ஒழுங்குபடுத்தி கழிக்கவும்; முடிவுறுமெனில் 10-இன் அடுக்கால் வகுக்கவும்.','x='+dec],
 ['Solve the resulting integer equation and reduce the fraction.','கிடைத்த முழுஎண் சமன்பாட்டைத் தீர்த்து பின்னத்தைச் சுருக்குக.',eq]
 ]);
const determ=[
 ['i','7/128','Yes, terminating','128=2⁷'],
 ['ii','21/15','Yes, terminating','21/15=7/5'],
 ['iii','4 9/35','No, recurring','4 9/35=149/35; 35=5×7'],
 ['iv','219/2200','No, recurring','2200=2³×5²×11; numerator 219 not divisible by 11']
];
for(const [part,frac,answer,factor] of determ)e(2,5,part,52,'Without division, decide whether '+frac+' has a terminating decimal expansion.','வகுத்தல் செய்யாமல் '+frac+' இன் தசம விரிவு முடிவுறுமா என முடிவுசெய்க.',answer,[
 ['Reduce the fraction and factor its denominator.','பின்னத்தைச் சுருக்கி பகுதியைப் பகா காரணிகளாகப் பிரிக்கவும்.',factor],
 ['A reduced denominator with primes only 2 or 5 gives a terminating expansion.','சுருக்கிய பகுதியின் பகா காரணிகள் 2 மற்றும் 5 மட்டுமே எனில் முடிவுறும்.',''+answer]
 ]);
const line=[
 ['i','√3',Math.sqrt(3),1,2,'√3≈1.73205'],
 ['ii','√4.7',Math.sqrt(4.7),2,3,'√4.7≈2.16795'],
 ['iii','√6.5',Math.sqrt(6.5),2,3,'√6.5≈2.54951']
];
for(const [part,root,target,min,max,answer] of line)e(3,1,part,55,'Construct and mark '+root+' on the number line.','எண்கோட்டில் '+root+' ஐ கட்டமைத்துக் குறிக்கவும்.',answer,[
 ['Use a semicircle whose diameter is a segment of length (radicand+1); put its split point one unit from an end.','மூல எண்ணுடன் 1 சேர்த்த நீளத்தை விட்டமாக வைத்து அரைவட்டம் அமைக்கவும்; ஒரு முனையிலிருந்து 1 அலகு புள்ளியைக் குறிக்கவும்.','BD²=radicand×1'],
 ['Draw a perpendicular at the split point to the semicircle and transfer its height from zero to the line.','குறித்த புள்ளியில் செங்குத்துக் கோடு அரைவட்டத்தைத் தொடுமாறு வரைக; அந்த நீளத்தை எண்கோட்டில் பூச்சியத்திலிருந்து குறிக்கவும்.','BD='+root+' ≈ '+target.toFixed(5)]
 ],true,{kind:'real-number-line',target,label:root,min,max});
e(3,2,'i',55,'Give two irrational numbers between 0.3010011000111… and 0.3020020002….','0.3010011000111… மற்றும் 0.3020020002… இடையே இரு விகிதமுறா எண்களைக் கொடுக்கவும்.','0.30131001000100001…; 0.30161001000100001…',[
 ['Choose prefixes strictly between 0.301001… and 0.302002….','இரு எல்லைகளுக்கிடையே வரும் 0.3013…, 0.3016… தொடக்கங்களைத் தேர்ந்தெடுக்கவும்.','0.301001… < 0.3013… < 0.3016… < 0.302002…'],
 ['Continue with increasing lengths of zero-runs so the decimal never repeats periodically.','மீளும் சுழற்சி வராதபடி பூச்சியத் தொடர்களின் நீளத்தைப் படிப்படியாக அதிகரிக்கவும்.','0.30131001000100001…; 0.30161001000100001…']
 ],true);
e(3,2,'ii',55,'Give two irrational numbers between 6/7 and 12/13.','6/7 மற்றும் 12/13 இடையே இரு விகிதமுறா எண்களைக் காண்க.','√3/2 and √(4/5)',[
 ['Compare the endpoints numerically.','எல்லை எண்களின் தோராய மதிப்புகளை ஒப்பிடுக.','6/7≈0.8571429; 12/13≈0.9230769'],
 ['Pick irrational roots inside that interval and verify.','இடைவெளிக்குள் வரும் விகிதமுறா மூலங்களைத் தேர்ந்து சரிபார்க்கவும்.','√3/2≈0.8660254; √(4/5)≈0.8944272']
 ],true);
e(3,2,'iii',55,'Give two irrational numbers between √2 and √3.','√2 மற்றும் √3 இடையே இரு விகிதமுறா எண்களைக் காண்க.','√(5/2) and √(8/3)',[
 ['Square the positive bounds to compare values under roots.','நேர்மறை வரம்புகளை வர்க்கம் செய்து மூல எண்ணுடன் ஒப்பிடுக.','2 < 5/2 < 8/3 < 3'],
 ['Take positive square roots to preserve strict inequalities.','நேர்மறை வர்க்கமூலங்களை எடுத்தால் ஏற்றத் தாழ்வுகள் மாறாது.','√2 < √(5/2) < √(8/3) < √3']
 ]);
e(3,3,'',55,'Find two rational numbers between 2.2360679… and 2.236505500….','2.2360679… மற்றும் 2.236505500… இடையே இரு விகிதமுறு எண்களைக் காண்க.','2.2361, 2.2363',[
 ['Use finite decimals with digits between the two bounds.','இரு எல்லைகளுக்கும் இடைப்பட்ட முடிவுறும் தசமங்களைத் தேர்ந்தெடுக்கவும்.','2.2360679… < 2.2361 < 2.2363 < 2.2365055…'],
 ['Both candidates are terminating decimals and hence rational.','இரண்டு எண்களும் முடிவுறும் தசமங்கள்; எனவே விகிதமுறு எண்கள்.','2.2361=22361/10000; 2.2363=22363/10000']
 ]);
})();