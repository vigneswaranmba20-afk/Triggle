/* Source-checked: 2025 SCERT Grade 9 Mathematics, Real Numbers, Examples 2.1–2.17. */
(()=>{'use strict';const A=window.TriggleRealCh2.addExample;
const e=(n,page,q,ta,answer,steps,hard=false,diagram=null)=>A(n,{page,q,ta,answer,steps,hard,diagram,title:'Real Numbers · Worked Example 2.'+n,titleTa:'மெய்யெண்கள் · எடுத்துக்காட்டு 2.'+n});
e(1,43,'Find two rational numbers strictly between 1/2 and 2/3.','1/2 மற்றும் 2/3 இடையே இரு விகிதமுறு எண்களைக் காண்க.','7/12, 13/24',[
 ['Use the average of the two fractions.','இரு பின்னங்களின் சராசரியைக் காண்க.','(1/2 + 2/3)/2 = 7/12'],
 ['Average 1/2 and the first answer again.','1/2 மற்றும் முதல் விடையின் சராசரியைக் காண்க.','(1/2 + 7/12)/2 = 13/24'],
 ['Both lie strictly between the endpoints.','இரண்டு எண்களும் எல்லைகளுக்கு இடையே உள்ளன.','1/2 < 13/24 < 7/12 < 2/3']
 ]);
e(2,47,'Express (i) 4/11 and (ii) −11/75 as decimals.','(i) 4/11 மற்றும் (ii) −11/75 ஆகியவற்றைத் தசம வடிவில் எழுதுக.','(i) 0.(36) ; (ii) −0.14(6)',[
 ['Divide the numerator by the denominator and track repeated remainders.','தொகுதியை பகுதியால் வகுத்து மீண்டும் வரும் மீதிகளை கவனிக்கவும்.','4 ÷ 11 = 0.363636…'],
 ['The negative fraction has a repeating final digit after 14.','எதிர்மறைப் பின்னத்தில் 14-க்கு பின் 6 மீண்டும் வருகிறது.','−11 ÷ 75 = −0.146666…']
 ]);
e(3,48,'Use the recurring decimal for 1/3 to express 1/27 and hence 59/27.','1/3 இன் தொடர்தசமத்தைப் பயன்படுத்தி 1/27 மற்றும் 59/27 காண்க.','1/27 = 0.(037); 59/27 = 2.(185)',[
 ['A ninth of 1/3 gives the recurring block 037.','1/3 ஐ 9-ஆல் வகுத்தால் 037 என்ற மீளும் தொகுதி கிடைக்கும்.','1/27 = 0.037037037…'],
 ['Separate 59/27 into whole and fractional parts.','59/27-ஐ முழு மற்றும் பின்னப் பகுதிகளாகப் பிரிக்கவும்.','59/27 = 2 + 5/27'],
 ['Multiply the recurring block by five.','மீளும் தசமத்தை ஐந்தால் பெருக்குக.','5/27 = 0.185185… ⇒ 59/27 = 2.185185…']
 ],true);
e(4,49,'Write 0.35, 2.176 and −0.0028 as reduced fractions p/q.','0.35, 2.176, −0.0028 ஆகியவற்றைச் சுருக்கிய பின்னங்கள் p/q ஆக எழுதுக.','7/20; 272/125; −7/2500',[
 ['Count decimal places to choose powers of ten.','தசம இடங்களின் எண்ணிக்கைக்கேற்ப 10-இன் அடுக்குகளைப் பயன்படுத்துக.','0.35=35/100; 2.176=2176/1000'],
 ['Reduce each fraction by its common factors.','ஒவ்வொரு பின்னத்தையும் பொதுக் காரணியால் சுருக்குக.','35/100=7/20; 2176/1000=272/125'],
 ['Keep the minus sign when reducing the third value.','மூன்றாவது எண்ணின் எதிர்மறைக் குறியைத் தக்க வைத்துக் கொள்க.','−0.0028=−28/10000=−7/2500']
 ]);
e(5,50,'Convert 0.(3), 2.(124), 0.4(5) and 0.5(68) to fractions. Parentheses denote recurring digits.','0.(3), 2.(124), 0.4(5), 0.5(68) தொடர்தசமங்களை பின்னங்களாக மாற்றுக.','1/3; 2122/999; 41/90; 563/990',[
 ['For a repeating block of length k, subtract x from 10^k x.','k இலக்கங்கள் மீளும்போது 10^k x-இலிருந்து x-ஐ கழிக்கவும்.','0.(3): 10x−x=3 ⇒ x=1/3'],
 ['For the three-digit period, subtract the shifted copies.','மூன்று இலக்கச் சுழற்சிக்கு ஆயிரமடங்கு மதிப்பைக் கழித்துக் காண்க.','2.(124): 1000x−x=2122 ⇒ x=2122/999'],
 ['For a nonrepeating first digit, align the tails before subtraction.','முதல் இலக்கம் மீளவில்லை எனில் மீளும் பகுதிகளைச் சீரமைத்து கழிக்கவும்.','0.4(5): 100x−10x=41 ⇒ x=41/90'],
 ['Align the two-digit period after the first nonrepeating 5.','மீளாத 5-க்குப் பின் 68 என்ற இரு இலக்கச் சுழற்சியைச் சீரமைக்கவும்.','0.5(68): 1000x−10x=563 ⇒ x=563/990']
 ],true);
e(6,51,'Without division, classify the decimal expansions of 13/64, −71/125, 43/375 and 31/400.','வகுத்தல் செய்யாமல் 13/64, −71/125, 43/375, 31/400 இன் தசம விரிவுகளை வகைப்படுத்துக.','Terminating; terminating; recurring; terminating',[
 ['A reduced fraction terminates only when its denominator has prime factors 2 and/or 5.','சுருக்கிய பின்னத்தின் பகுதியிலுள்ள பகா காரணிகள் 2 மற்றும்/அல்லது 5 மட்டுமே எனில் தசமம் முடிவுறும்.','64=2⁶; 125=5³; 400=2⁴×5²'],
 ['375 includes a factor 3 after reduction of 43/375.','43/375 சுருக்கிய பின்னத்தின் பகுதியில் 3 உள்ளது.','375=3×5³'],
 ['Therefore only 43/375 repeats forever.','அதனால் 43/375 மட்டுமே முடிவுறாத தொடர்தசமமாகும்.','13/64, −71/125, 31/400: terminating; 43/375: recurring']
 ]);
e(7,51,'Verify that the recurring decimal 0.(9) is equal to 1.','0.(9) = 1 என்பதைச் சரிபார்க்கவும்.','1',[
 ['Write the repeating decimal as x.','மீண்டும் வரும் தசமத்தை x என எடுத்துக்கொள்க.','x=0.999999…'],
 ['Multiply by ten and subtract to remove the infinite tail.','10-ஆல் பெருக்கி அதே மீளும் பகுதியைக் கழிக்கவும்.','10x=9.999999…; 10x−x=9'],
 ['Solve the linear equation.','சமன்பாட்டைத் தீர்க்கவும்.','9x=9 ⇒ x=1']
 ]);
e(8,52,'Find the decimal expansion of √3 to several places.','√3 இன் தசம விரிவைக் காண்க.','√3 ≈ 1.7320508…',[
 ['The integer part is 1 because 1² < 3 < 2².','1² < 3 < 2² என்பதால் முழுப் பகுதி 1 ஆகும்.','1<√3<2'],
 ['Compare successive decimal square approximations.','தொடர்ந்த தசமத் தோராயங்களின் வர்க்கங்களை ஒப்பிடுக.','1.73²=2.9929; 1.74²=3.0276'],
 ['Refining by the square-root algorithm gives the digits shown.','வர்க்கமூலப் படிமுறையால் மேலும் துல்லியமான இலக்கங்கள் பெறலாம்.','√3 = 1.7320508…']
 ],true,{kind:'real-number-line',target:Math.sqrt(3),label:'√3',min:1,max:2});
e(9,53,'Classify: √10, √49, 0.025, 0.7(6), 2.505500555… and 2/√2.','√10, √49, 0.025, 0.7(6), 2.505500555…, 2/√2 ஆகியவற்றை விகிதமுறு / விகிதமுறா என வகைப்படுத்துக.','Irrational; rational; rational; rational; irrational; irrational',[
 ['Square roots of non-square positive integers are irrational; √49=7 is rational.','நிறைவுவர்க்கமற்ற முழு எண்களின் வர்க்கமூலம் விகிதமுறா; √49=7 விகிதமுறு.','√10: irrational; √49=7: rational'],
 ['Terminating or recurring decimals are rational; nonperiodic decimals are irrational.','முடிவுறு அல்லது தொடர் தசமங்கள் விகிதமுறு; ஒழுங்காக மீளாதவை விகிதமுறா.','0.025, 0.7(6): rational; 2.505500555…: irrational'],
 ['Simplify 2/√2 before classifying.','2/√2 ஐச் சுருக்கி வகைப்படுத்துக.','2/√2=√2: irrational']
 ]);
e(10,53,'Give any three irrational numbers strictly between 0.12 and 0.13.','0.12 மற்றும் 0.13 இடையே மூன்று விகிதமுறா எண்களைக் கொடுக்கவும்.','0.12010010001…; 0.12040040004…; 0.12070070007…',[
 ['Keep the first two decimal digits 12, so all selected numbers stay in the interval.','0.12 என்ற தொடக்கத்தைப் பயன்படுத்துவதால் எண்கள் கொடுக்கப்பட்ட இடைவெளியில் உள்ளன.','0.12 < 0.120… < 0.13'],
 ['Choose an infinite pattern of zeros that never becomes periodic.','மீளும் சுழற்சி உருவாகாத முடிவிலா பூச்சிய அமைப்பைத் தேர்ந்தெடுக்கவும்.','0.12010010001…; 0.12040040004…; 0.12070070007…']
 ]);
e(11,54,'Give two rational numbers between 0.5151151115… and 0.5353353335….','0.5151151115… மற்றும் 0.5353353335… இடையே இரு விகிதமுறு எண்களைக் காண்க.','0.5152; 0.5352',[
 ['Choose finite decimals larger than the first value.','முதல் எண்ணைவிடப் பெரிய முடிவுறும் தசமங்களைத் தேர்ந்தெடுக்கவும்.','0.5151151115… < 0.5152'],
 ['Check that the second candidate is below the upper bound.','இரண்டாவது எண் மேலெல்லைக்குக் கீழே உள்ளதா சரிபார்க்கவும்.','0.5152 < 0.5352 < 0.5353353335…']
 ]);
e(12,54,'Determine whether x and y are rational or irrational: (i) a=2+√3,b=2−√3,x=a+b,y=a−b; (ii) a=√2+7,b=√2−7,x=a+b,y=a−b; (iii) a=√75,b=√3,x=ab,y=a/b; (iv) a=√18,b=√3,x=ab,y=a/b.','(i) a=2+√3,b=2−√3; (ii) a=√2+7,b=√2−7; (iii) a=√75,b=√3; (iv) a=√18,b=√3 ஆகியவற்றில் x,y-இன் விகிதமுறு / விகிதமுறாத் தன்மையைத் தீர்மானிக்கவும்.','(i) x=4 rational, y=2√3 irrational; (ii) x=2√2 irrational, y=14 rational; (iii) x=15, y=5 rational; (iv) x=3√6,y=√6 irrational',[
 ['In (i), the irrational terms cancel in the sum and double in the difference.','(i)-இல் கூட்டலில் முறுடுகள் நீங்கும்; கழித்தலில் இரட்டிப்பாகும்.','x=4; y=2√3'],
 ['In (ii), √2 doubles in the sum, while the integers give 14 in the difference.','(ii)-இல் கூட்டலில் √2 இருமடங்கு; கழித்தலில் 14 கிடைக்கும்.','x=2√2; y=14'],
 ['In (iii), √75=5√3, so both product and quotient become integers.','(iii)-இல் √75=5√3; பெருக்கலும் வகுத்தலும் முழு எண்களைத் தரும்.','x=√75·√3=15; y=√75/√3=5'],
 ['In (iv), simplify √18=3√2, and retain the irrational √6.','(iv)-இல் √18=3√2; முடிவில் விகிதமுறா √6 வரும்.','x=√54=3√6; y=√6']
 ],true);
e(13,54,'Construct √9.3 on the number line with a semicircle and perpendicular.','அரைவட்டமும் செங்குத்துக் கோடும் பயன்படுத்தி √9.3 ஐ எண்கோட்டில் குறிக்கவும்.','√9.3 ≈ 3.04959',[
 ['Draw AB=9.3 units and extend it by BC=1 unit.','AB=9.3 அலகு வரைந்து BC=1 அலகாக நீட்டிக்கவும்.','AC=10.3'],
 ['Construct a semicircle with AC as diameter and a perpendicular at B meeting the arc at D.','AC விட்டமுள்ள அரைவட்டமும் B-இல் செங்குத்துக் கோடும் வரைக.','BD²=AB·BC=9.3×1'],
 ['Transfer BD to the number line from zero.','BD நீளத்தை எண்கோட்டில் பூச்சியத்திலிருந்து குறிக்கவும்.','BD=√9.3≈3.04959']
 ],true,{kind:'real-number-line',target:Math.sqrt(9.3),label:'√9.3',min:2,max:4});
e(14,56,'Locate 4.863 precisely on the number line using successive magnification.','தொடர் பெரிதாக்கலைப் பயன்படுத்தி எண்கோட்டில் 4.863 ஐக் குறிக்கவும்.','4.863',[
 ['First locate 4.8–4.9 within the interval 4–5.','முதலில் 4 முதல் 5 இடையில் 4.8–4.9 பகுதியைக் குறிக்கவும்.','4 < 4.8 < 4.863 < 4.9 < 5'],
 ['Magnify 4.86–4.87 to a hundredth place interval.','4.86–4.87 இடைவெளியைப் பெரிதாக்கவும்.','4.86 < 4.863 < 4.87'],
 ['Choose the third thousandth after 4.860.','4.860-க்கு அடுத்த மூன்றாவது ஆயிரமாம் புள்ளியைக் குறிக்கவும்.','4.860 + 0.003 = 4.863']
 ],false,{kind:'real-number-line',target:4.863,label:'4.863',min:4.8,max:4.9});
e(15,56,'Plot 3.(45) on the number line to four decimal places.','3.(45) ஐ நான்கு தசம இடங்களுக்குத் துல்லியமாக எண்கோட்டில் குறிக்கவும்.','3.4545',[
 ['Expand the recurring block 45.','45 என்ற சுழற்சியை மீண்டும் எழுதுக.','3.(45)=3.45454545…'],
 ['Keep the first four digits after the decimal point.','தசமப் புள்ளிக்குப் பின் நான்கு இலக்கங்களை வைத்துக் கொள்க.','3.4545'],
 ['Position it between 3.454 and 3.455.','3.454 மற்றும் 3.455 இடையே குறிக்கவும்.','3.454 < 3.4545 < 3.455']
 ],false,{kind:'real-number-line',target:3.4545,label:'3.4545',min:3.45,max:3.46});
e(16,59,'Write 8, 32, 1/4, √2 and √8 as powers of 2.','8, 32, 1/4, √2, √8 ஆகியவற்றை 2ⁿ வடிவில் எழுதுக.','2³; 2⁵; 2⁻²; 2^(1/2); 2^(3/2)',[
 ['Use integer powers for whole numbers and reciprocals.','முழு எண்களுக்கும் தலைகீழ் எண்களுக்கும் முழுஎண் அடுக்குகளைப் பயன்படுத்துக.','8=2³; 32=2⁵; 1/4=2⁻²'],
 ['A square root gives exponent one-half.','வர்க்கமூலத்தின் அடுக்கு 1/2 ஆகும்.','√2=2^(1/2)'],
 ['Rewrite √8 as the square root of 2 cubed.','√8=√(2³) என மாற்றி எழுதுக.','√8=(2³)^(1/2)=2^(3/2)']
 ]);
e(17,59,'Evaluate (i) 81^(5/4) and (ii) 64^(−2/3).','(i) 81^(5/4), (ii) 64^(−2/3) ஆகியவற்றின் மதிப்பைக் காண்க.','243; 1/16',[
 ['First take the fourth root of 81; then raise the result to the fifth power.','முதலில் 81-இன் நான்காம் மூலத்தைக் காண்க; பின்னர் ஐந்தாம் அடுக்கிற்கு உயர்த்துக.','81^(5/4)=(⁴√81)^5=3⁵=243'],
 ['A negative exponent takes the reciprocal; the cube root of 64 is 4.','எதிர்மறை அடுக்கிற்கு தலைகீழ் எண்; 64-இன் கனமூலம் 4.','64^(−2/3)=1/(∛64)²=1/4²=1/16']
 ]);
})();
