/* TN SCERT revised 2025, Grade 9, Exercises 4.5 and 4.6. */
(() => {
  'use strict';
  const {batch,step} = window.TriggleGrade9Geometry;
  const ex5 = batch(5,6,183,194);
  const ex6 = batch(6,6,186,198);
  const centreSteps = {
    G: [
      step('Bisect the first two sides. For each side, make equal compass arcs from its ends, using an opening greater than half the side. Join the two arc crossings and mark where the line cuts the side.',
        'முதல் இரு பக்கங்களையும் இருசமமாகப் பிரிக்கவும். ஒவ்வொரு பக்கத்தின் பாதியை விட அதிகமான ஒரே கவராயத் திறப்பில் அதன் இரு முனைகளிலிருந்தும் வில்கள் வரைக. வில்களின் சந்திப்புகளை இணைத்து, அக்கோடு பக்கத்தை வெட்டும் புள்ளியைக் குறிக்கவும்.',
        'The line joining the equal-arc crossings is the perpendicular bisector.', 'சம வில்களின் சந்திப்புகளை இணைக்கும் கோடு மையக்குத்துக்கோடு.'),
      step('Join each marked midpoint to the opposite vertex. The two medians meet at G. Draw the third median as a check. It passes through G.',
        'குறித்த ஒவ்வொரு நடுப்புள்ளியையும் அதன் எதிர் முனையுடன் இணைக்கவும். இரு நடுக்கோடுகள் G இல் வெட்டும். சரிபார்க்க மூன்றாம் நடுக்கோட்டை வரைக; அதுவும் G வழியாகச் செல்லும்.',
        'The three medians of a triangle are concurrent at the centroid.', 'முக்கோணத்தின் மூன்று நடுக்கோடுகளும் நடுக்கோட்டு மையத்தில் ஒருங்கிசையும்.')
    ],
    H: [
      step('From two vertices draw perpendiculars to their opposite side lines. Extend a side if the perpendicular foot falls beyond it. To construct each perpendicular, draw an arc centred at the vertex to cut the opposite line twice. From those two points draw equal arcs and join their other crossing to the vertex.',
        'இரு முனைகளிலிருந்து அவற்றின் எதிர்ப்பக்கக் கோடுகளுக்குச் செங்குத்துகள் வரைக. செங்குத்தின் அடி பக்கத்திற்கு வெளியே இருந்தால் பக்கத்தை நீட்டிக்கவும். முனையை மையமாகக் கொண்டு எதிர்ப்பக்கக் கோட்டை இருமுறை வெட்டும் வில் வரைக. அந்த இரு புள்ளிகளிலிருந்தும் சம வில்கள் வரைந்து, அவற்றின் மற்றொரு சந்திப்பை முனையுடன் இணைக்கவும்.',
        'Two points equidistant from the cuts determine the perpendicular bisector of the segment between the cuts.',
        'வெட்டுப் புள்ளிகளுக்குச் சம தொலைவில் உள்ள இரு புள்ளிகள் அவற்றை இணைக்கும் துண்டின் மையக்குத்துக்கோட்டைத் தீர்மானிக்கின்றன.'),
      step('Mark the intersection of the two altitudes as H. Draw the third altitude to verify concurrence.',
        'இரு குத்துக்கோடுகளின் சந்திப்பை H எனக் குறிக்கவும். மூன்றாம் குத்துக்கோட்டையும் வரைந்து ஒருங்கிசைவைச் சரிபார்க்கவும்.',
        'All three altitudes of a triangle meet at the orthocentre.', 'முக்கோணத்தின் மூன்று குத்துக்கோடுகளும் குத்துக்கோட்டு மையத்தில் சந்திக்கும்.')
    ],
    S: [
      step('Construct the perpendicular bisectors of two sides. For each side, use equal arcs from both ends with opening greater than half its length, then join the two arc crossings. Mark the intersection of the bisectors S.',
        'இரு பக்கங்களின் மையக்குத்துக்கோடுகளை வரைக. ஒவ்வொரு பக்கத்தின் பாதிக்கும் அதிகமான ஒரே கவராயத் திறப்பில் இரு முனைகளிலிருந்தும் வில்கள் வரைந்து, வில்களின் சந்திப்புகளை இணைக்கவும். மையக்குத்துக்கோடுகள் சந்திக்கும் புள்ளி S.',
        'A point on a perpendicular bisector is the same distance from both endpoints.', 'மையக்குத்துக்கோட்டில் உள்ள புள்ளி இரு முனைகளிலிருந்தும் சம தொலைவில் இருக்கும்.'),
      step('Set the compass from S to any vertex and draw the circle centred at S. Check that it passes through all three vertices.',
        'S இலிருந்து ஒரு முனை வரையிலான தூரத்துக்குக் கவராயத்தைத் திறந்து S ஐ மையமாகக் கொண்டு வட்டம் வரைக. அது மூன்று முனைகள் வழியாகவும் செல்கிறதா எனச் சரிபார்க்கவும்.',
        'The two perpendicular bisectors make all three vertex distances from S equal.', 'இரு மையக்குத்துக்கோடுகளால் S இலிருந்து மூன்று முனைகளுக்கான தொலைவுகளும் சமம்.')
    ],
    I: [
      step('Bisect two interior angles. From each chosen vertex draw an arc to cut its two sides. Use equal arcs from the cuts and join their intersection inside the angle to the vertex. Mark the intersection of the angle bisectors I.',
        'இரு உட்கோணங்களை இருசமமாகப் பிரிக்கவும். தேர்ந்தெடுத்த ஒவ்வொரு முனையிலிருந்தும் அதன் இரு பக்கங்களை வெட்டும் வில் வரைக. வெட்டுப் புள்ளிகளிலிருந்து சம வில்கள் வரைந்து, கோணத்துக்குள் அவை சந்திக்கும் புள்ளியை முனையுடன் இணைக்கவும். இருசமவெட்டிகள் சந்திக்கும் புள்ளி I.',
        'A point on an interior angle bisector has equal perpendicular distances to its two sides.', 'உட்கோண இருசமவெட்டியில் உள்ள புள்ளியிலிருந்து அதன் இரு பக்கங்களுக்கான செங்குத்துத் தொலைவுகள் சமம்.'),
      step('Drop a perpendicular from I to any side. Use its length as the compass radius to draw the incircle. Check that the circle touches all three sides.',
        'I இலிருந்து ஏதேனும் ஒரு பக்கத்துக்குச் செங்குத்து வரைக. அதன் நீளத்தைக் கவராய ஆரமாகக் கொண்டு உள்வட்டம் வரைக. வட்டம் மூன்று பக்கங்களையும் தொடுகிறதா எனச் சரிபார்க்கவும்.',
        'At I, the perpendicular distances to all three sides are equal.', 'I இலிருந்து மூன்று பக்கங்களுக்கும் உள்ள செங்குத்துத் தொலைவுகள் சமம்.')
    ]
  };
  const names = {
    G:['centroid G','நடுக்கோட்டு மையம் G'],
    H:['orthocentre H','குத்துக்கோட்டு மையம் H'],
    S:['circumcentre S and circumcircle','சுற்றுவட்ட மையம் S மற்றும் சுற்றுவட்டம்'],
    I:['incentre I and incircle','உள்வட்ட மையம் I மற்றும் உள்வட்டம்']
  };
  function item(add,n,q,geometry,base,rays,centre,pages,special) {
    const [vertices,mode,length,a,b] = geometry;
    const [A,B,C] = vertices;
    const first = step('Draw '+A+B+' = '+length+' cm.',
      A+B+' = '+length+' செமீ நீளமுள்ள கோட்டுத்துண்டு வரைக.',
      'Start with the stated base and keep the compass scale fixed for each given length.',
      'கொடுக்கப்பட்ட அடிப்பக்கத்தில் தொடங்குக. ஒவ்வொரு கொடுக்கப்பட்ட நீளத்துக்கும் கவராயத் திறப்பை மாற்றாமல் பயன்படுத்துக.');
    const second = step(rays[0],rays[1],'The two construction guides fix the position of '+C+'.','இரு வழிகாட்டிகளும் '+C+' இன் இடத்தைத் தீர்மானிக்கின்றன.');
    const third = step('Join '+C+' to '+A+' and '+B+' to complete the triangle.',
      'முக்கோணத்தை முடிக்க '+C+' ஐ '+A+', '+B+' ஆகியவற்றுடன் இணைக்கவும்.',
      'The new vertex meets both of the construction conditions.', 'புதிய முனை இரு வரைதல் நிபந்தனைகளையும் நிறைவு செய்கிறது.');
    add(n,q,[first,second,third,...centreSteps[centre]],special || ['Constructed '+names[centre][0]+'.',names[centre][1]+' வரையப்பட்டது.'],{
      pages, difficulty: 'medium',
      figure:[base[0],base[1]],
      construction:{vertices,mode,length,a,b,centre}
    });
  }
  const sss = (v,a,b) => ['Use '+v[0]+' as centre with radius '+a+' cm and '+v[1]+' as centre with radius '+b+' cm. Mark an intersection of the arcs '+v[2]+'.',
    v[0]+' ஐ மையமாகக் கொண்டு '+a+' செமீ ஆரத்திலும், '+v[1]+' ஐ மையமாகக் கொண்டு '+b+' செமீ ஆரத்திலும் வில்கள் வரைக. அவற்றின் ஒரு சந்திப்பை '+v[2]+' எனக் குறிக்கவும்.'];
  function sideAngle(v,vertex,measure,other,side) {
    const anchor = v[vertex], opposite = v[1-vertex];
    return ['From '+anchor+' draw a '+measure+'° ray measured from '+anchor+opposite+'. With centre '+other+' and radius '+side+' cm cut the ray at '+v[2]+'.',
      anchor+' இலிருந்து '+anchor+opposite+' உடன் '+measure+'° கோணம் அமைக்கும் கதிர் வரைக. '+other+' ஐ மையமாகக் கொண்டு '+side+' செமீ ஆரமுள்ள வில் வரைந்து, அது கதிரை வெட்டும் புள்ளியை '+v[2]+' எனக் குறிக்கவும்.'];
  }
  const twoAngles = (v,a,b) => ['Draw rays at '+v[0]+' and '+v[1]+' above the base, making angles '+a+'° and '+b+'° with the base. Label their intersection '+v[2]+'.',
    v[0]+', '+v[1]+' ஆகிய முனைகளில் அடிப்பக்கத்தின் ஒரே புறத்தில் '+a+'°, '+b+'° கோணங்களை அமைக்கும் கதிர்கள் வரைக. அவை சந்திக்கும் புள்ளி '+v[2]+'.'];
  const desc = (en,ta) => [en,ta];

  item(ex5,1,['Construct the △LMN such that LM = 7.5 cm, MN = 5 cm and LN = 8 cm. Locate its centroid.',
    'LM = 7.5 செமீ, MN = 5 செமீ மற்றும் LN = 8 செமீ அளவுகளுக்கு △LMN வரைந்து அதன் நடுக்கோட்டு மையத்தைக் குறிக்கவும்.'],
    ['LMN','sss',7.5,8,5],desc('Base LM of length 7.5 cm.','7.5 செமீ நீளமுள்ள LM அடிப்பக்கம்.'),sss('LMN',8,5),'G',[183,194]);
  item(ex5,2,['Draw and locate the centroid of the triangle ABC where right angle at A, AB = 4 cm and AC = 3 cm.',
    'முக்கோணம் ABC யை வரைந்து அதன் நடுக்கோட்டு மையத்தைக் குறிக்க. இங்கு A இல் செங்கோணம், AB = 4 செமீ மற்றும் AC = 3 செமீ.'],
    ['ABC','start',4,90,3],desc('Base AB of length 4 cm.','4 செமீ நீளமுள்ள AB அடிப்பக்கம்.'),sideAngle('ABC',0,90,'A',3),'G',[183,194]);
  item(ex5,3,['Draw the △ABC, where AB = 6 cm, ∠B = 110° and AC = 9 cm and construct the centroid.',
    'AB = 6 செமீ, ∠B = 110° மற்றும் AC = 9 செமீ அளவுகளுள்ள △ABC வரைந்து அதன் நடுக்கோட்டு மையத்தைக் குறிக்க.'],
    ['ABC','end-opposite',6,110,9],desc('Base AB of length 6 cm.','6 செமீ நீளமுள்ள AB அடிப்பக்கம்.'),sideAngle('ABC',1,110,'A',9),'G',[183,195]);
  item(ex5,4,['Construct the △PQR such that PQ = 5 cm, PR = 6 cm and ∠QPR = 60° and locate its centroid.',
    'PQ = 5 செமீ, PR = 6 செமீ மற்றும் ∠QPR = 60° அளவுகளுள்ள △PQR வரைக. மேலும் நடுக்கோட்டு மையத்தைக் குறிக்கவும்.'],
    ['PQR','start',5,60,6],desc('Base PQ of length 5 cm.','5 செமீ நீளமுள்ள PQ அடிப்பக்கம்.'),sideAngle('PQR',0,60,'P',6),'G',[183,195]);
  item(ex5,5,['Draw △PQR with sides PQ = 7 cm, QR = 8 cm and PR = 5 cm and construct its Orthocentre.',
    'PQ = 7 செ.மீ., QR = 8 செமீ மற்றும் PR = 5 செமீ என்ற அளவுகளைக் கொண்ட △PQR வரைந்து அதன் குத்துக்கோட்டு மையம் காண்க.'],
    ['PQR','sss',7,5,8],desc('Base PQ of length 7 cm.','7 செமீ நீளமுள்ள PQ அடிப்பக்கம்.'),sss('PQR',5,8),'H',[183,195]);
  item(ex5,6,['Draw an equilateral triangle of sides 6.5 cm and locate its Orthocentre.',
    '6.5 செமீ பக்க அளவுகளைக் கொண்ட சமபக்க முக்கோணம் வரைக. அம்முக்கோணத்திற்குக் குத்துக்கோடு மையம் காண்க.'],
    ['ABC','sss',6.5,6.5,6.5],desc('Base AB of length 6.5 cm.','6.5 செமீ நீளமுள்ள AB அடிப்பக்கம்.'),sss('ABC',6.5,6.5),'H',[183,195]);
  item(ex5,7,['Draw △ABC, where AB = 6 cm, ∠B = 110° and BC = 5 cm and construct its Orthocentre.',
    'AB = 6 செமீ, ∠B = 110° மற்றும் BC = 5 செமீ என்ற அளவுகளை உடைய △ABC வரைந்து அதன் குத்துக்கோடு மையம் காண்க.'],
    ['ABC','end',6,110,5],desc('Base AB of length 6 cm.','6 செமீ நீளமுள்ள AB அடிப்பக்கம்.'),sideAngle('ABC',1,110,'B',5),'H',[183,195],
    ['H lies outside the triangle because ∠B is obtuse.','∠B விரிகோணம் என்பதால் H முக்கோணத்திற்கு வெளியே உள்ளது.']);
  item(ex5,8,['Draw and locate the Orthocentre of a right triangle PQR where PQ = 4.5 cm, QR = 6 cm and PR = 7.5 cm.',
    'PQ = 4.5 செமீ, QR = 6 செமீ மற்றும் PR = 7.5 செமீ என்ற அளவுகளை உடைய செங்கோண △PQR வரைந்து அதன் குத்துக்கோட்டு மையம் காண்க.'],
    ['PQR','end',4.5,90,6],desc('Base PQ of length 4.5 cm.','4.5 செமீ நீளமுள்ள PQ அடிப்பக்கம்.'),sideAngle('PQR',1,90,'Q',6),'H',[183,195],
    ['H coincides with the right-angle vertex Q.','குத்துக்கோட்டு மையம் H செங்கோண முனை Q உடன் ஒன்றுகிறது.']);

  item(ex6,1,['Draw a triangle ABC, where AB = 8 cm, BC = 6 cm and ∠B = 70° and locate its circumcentre and draw the circumcircle.',
    'AB = 8 செமீ, BC = 6 செமீ மற்றும் ∠B = 70° அளவுள்ள ABC வரைந்து, அம்முக்கோணத்தின் சுற்றுவட்டம் வரைக. சுற்றுவட்ட மையம் காண்க.'],
    ['ABC','end',8,70,6],desc('Base AB of length 8 cm.','8 செமீ நீளமுள்ள AB அடிப்பக்கம்.'),sideAngle('ABC',1,70,'B',6),'S',[186,198]);
  item(ex6,2,['Construct the right triangle PQR whose perpendicular sides are 4.5 cm and 6 cm. Also locate its circumcentre and draw the circumcircle.',
    '4.5 செமீ மற்றும் 6 செமீ அளவுகளைச் செங்குத்துப் பக்கங்களாகக் கொண்ட செங்கோண △PQR வரைந்து சுற்றுவட்ட மையம் காண்க மற்றும் சுற்றுவட்டம் வரைக.'],
    ['PQR','end',4.5,90,6],desc('Choose PQ as the 4.5 cm leg.','PQ ஐ 4.5 செமீ செங்குத்துப் பக்கமாக எடுத்துக்கொள்க.'),sideAngle('PQR',1,90,'Q',6),'S',[186,198],
    ['S is the midpoint of PR. The circumcircle has radius 3.75 cm.','PR இன் நடுப்புள்ளி S. சுற்றுவட்டத்தின் ஆரம் 3.75 செமீ.']);
  item(ex6,3,['Construct △ABC with AB = 5 cm ∠B = 100° and BC = 6 cm. Also locate its circumcentre draw circumcircle.',
    'AB = 5 செமீ, BC = 6 செமீ மற்றும் ∠B = 100° அளவுள்ள △ABC வரைந்து அதற்குச் சுற்றுவட்டம் வரைக மற்றும் சுற்றுவட்ட மையம் காண்க'],
    ['ABC','end',5,100,6],desc('Base AB of length 5 cm.','5 செமீ நீளமுள்ள AB அடிப்பக்கம்.'),sideAngle('ABC',1,100,'B',6),'S',[186,198],
    ['S lies outside this obtuse triangle. Draw the circumcircle centred at S.','விரிகோண முக்கோணத்தின் வெளியே S உள்ளது. S ஐ மையமாகக் கொண்டு சுற்றுவட்டம் வரைக.']);
  item(ex6,4,['Construct an isosceles triangle PQR where PQ = PR and ∠Q = 50°, QR = 7 cm. Also draw its circumcircle.',
    'QR = 7 செமீ, ∠Q = 50° மற்றும் PQ = PR அளவுகள் கொண்ட இருசமபக்க △PQR வரைக. மேலும், △PQR இன் சுற்றுவட்ட மையம் வரைக.'],
    ['QRP','asa',7,50,50],desc('Base QR of length 7 cm.','7 செமீ நீளமுள்ள QR அடிப்பக்கம்.'),
    ['The equal sides PQ and PR give equal base angles at Q and R. '+twoAngles('QRP',50,50)[0],
     'PQ, PR சமம் என்பதால் Q, R அடிக்கோணங்கள் சமம். '+twoAngles('QRP',50,50)[1]],'S',[186,198]);
  item(ex6,5,['Draw an equilateral triangle of side 6.5 cm and locate its incentre. Also draw the incircle.',
    '6.5 செமீ பக்க அளவுள்ள சமபக்க முக்கோணம் வரைந்து அதன் உள்வட்ட மையத்தைக் குறிக்க. மேலும் உள்வட்டத்தை வரைக.'],
    ['ABC','sss',6.5,6.5,6.5],desc('Base AB of length 6.5 cm.','6.5 செமீ நீளமுள்ள AB அடிப்பக்கம்.'),sss('ABC',6.5,6.5),'I',[186,199]);
  item(ex6,6,['Draw a right triangle whose hypotenuse is 10 cm and one of the legs is 8 cm. Locate its incentre and also draw the incircle.',
    'கர்ணம் 10 செமீ, ஒருபக்க அளவு 8 செமீ உள்ள செங்கோண முக்கோணம் வரைக. அதன் உள்வட்ட மையத்தைக் குறித்து உள்வட்டம் வரைக.'],
    ['ABC','start-opposite',8,90,10],desc('Choose AB as the 8 cm leg.','AB ஐ 8 செமீ செங்குத்துப் பக்கமாக எடுத்துக்கொள்க.'),sideAngle('ABC',0,90,'B',10),'I',[187,199]);
  item(ex6,7,['Draw △ABC given AB = 9 cm, ∠CAB = 115° and △ABC = 40°. Locatge its incentre and also draw the incircle. (Note: You can check from the above examples that the incentre of any triangle is always in its interior).',
    'AB = 9 செமீ, ∠CAB = 115° மற்றும் △ABC = 40° என்ற அளவுகளுக்கு △ABC வரைக. மேலும் அதன் உள்வட்ட மையத்தைக் குறித்து உள்வட்டம் வரைக. (குறிப்பு : மேற்கண்ட கணக்குகளிலிருந்து எந்தவொரு முக்கோணத்திற்கும் உள்வட்டமானது முக்கோணத்தின் உள்ளே அமைகிறது என்பதை நீங்கள் காணலாம்)'],
    ['ABC','asa',9,115,40],desc('Base AB of length 9 cm.','9 செமீ நீளமுள்ள AB அடிப்பக்கம்.'),
    ['Read the printed △ABC = 40° as angle ∠ABC = 40°. '+twoAngles('ABC',115,40)[0],
     'அச்சில் உள்ள △ABC = 40° என்பதை ∠ABC = 40° என எடுத்துக்கொள்க. '+twoAngles('ABC',115,40)[1]],'I',[187,199]);
  item(ex6,8,['Construct △ABC in which AB = BC = 6 cm and ∠B = 80°. Locate its incentre and draw the incircle.',
    'AB = BC = 6 செமீ, ∠B = 80° என்ற அளவுகளுக்கு △ABC வரைக. அதன் உள்வட்ட மையத்தைக் குறித்து உள்வட்டம் வரைக.'],
    ['ABC','end',6,80,6],desc('Base AB of length 6 cm.','6 செமீ நீளமுள்ள AB அடிப்பக்கம்.'),sideAngle('ABC',1,80,'B',6),'I',[187,199]);
})();
