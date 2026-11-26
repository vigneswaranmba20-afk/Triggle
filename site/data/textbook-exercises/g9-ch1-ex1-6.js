/* TN SCERT 2025, Set Language, Exercise 1.6. Bilingual source locators and
 * question-to-task mappings are in textbook-fidelity/g9-ch1-ex1-6.json. */
(() => {
  'use strict';

  const t = (en, ta) => ({en, ta});
  const notation = (fallback, latex, display = false) => ({fallback, latex, display});
  const plain = pieces => pieces.map(piece => piece.fallback ?? piece).join('');
  const align = rows => notation(rows.map(row => row.fallback).join('\n'),
    '\\begin{aligned}' + rows.map(row => '&' + row.latex).join('\\\\') + '\\end{aligned}', true);
  const n = label => 'n(' + label + ')';
  const union = 'A\\cup B';
  const overlap = 'A\\cap B';
  const cardinality = notation('n(A ∪ B) = n(A) + n(B) – n(A ∩ B)',
    'n(A\\cup B)=n(A)+n(B)-n(A\\cap B)');
  const triple = notation('n(A ∪ B ∪ C) = n(A) + n(B) + n(C) − n(A ∩ B) − n(B ∩ C) − n(A ∩ C) + n(A ∩ B ∩ C)',
    '\\begin{aligned}n(A\\cup B\\cup C)={}&n(A)+n(B)+n(C)\\\\&-n(A\\cap B)-n(B\\cap C)-n(A\\cap C)\\\\&+n(A\\cap B\\cap C)\\end{aligned}', true);
  const equation = (fallback, latex) => notation(fallback, latex, true);
  const incl = t('Adding the counts of both sets counts the overlap twice. Subtract it once to count every member of their union once.',
    'இரு கணங்களின் ஆதி எண்களைக் கூட்டும்போது பொதுப் பகுதி இருமுறை எண்ணப்படுகிறது. பொதுப் பகுதியை ஒருமுறை கழித்தால் ஒவ்வோர் உறுப்பும் ஒருமுறை மட்டுமே எண்ணப்படும்.');
  const parts = t('The “only” region of a set is what remains after removing its common members.',
    'ஒரு கணத்திற்குப் பொதுவான உறுப்புகளை நீக்கிய பின் அந்தக் கணத்தில் எஞ்சும் உறுப்புகளே அதன் தனிப்பகுதியில் இருக்கும்.');
  const tripleWhy = t('A member of all three sets is counted three times and then subtracted three times. Adding the triple overlap once restores that member.',
    'மூன்று கணங்களுக்கும் பொதுவான உறுப்பு முதலில் மூன்று முறை எண்ணப்பட்டு, பிறகு மூன்று முறை கழிக்கப்படுகிறது. அதனை ஒருமுறை மீண்டும் கூட்டினால் சரியான எண்ணிக்கை கிடைக்கும்.');
  const step = (en, ta, why, math) => ({en, ta, why, ...(math ? {eq:math.fallback, math} : {})});
  const figure = (number, alt, figureCaption, solution = false) => ({
    figureSrc:'./assets/grade9-ch1/ex1-6-q' + number + '.svg', figureAlt:alt, figureCaption,
    ...(solution ? {figureInSolution:true} : {})
  });
  const entries = [];
  function add(number, title, en, ta, steps, answer, hint, extra = {}) {
    const questionMath = t(Array.isArray(en) ? en : [en], Array.isArray(ta) ? ta : [ta]);
    entries.push({
      id:'g9-ch1-ex1.6-q'+number, classNum:9, chapter:'1', exercise:'1.6', kind:'textbook',
      topic:t('Set Language','கண மொழி'), label:t('Exercise 1.6 · Q'+number,'பயிற்சி 1.6 · வினா '+number),
      title, q:t(plain(questionMath.en),plain(questionMath.ta)), questionMath,
      steps, answer:answer.fallback, answerMath:answer, hint, setConcept:'cardinality',
      notationSource:'authored', edition:'2025',
      source:'https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view',
      reference:'TN SCERT Grade 9 Mathematics, revised 2025, Exercise 1.6 Q'+number,
      sourceFidelity:{status:'page-visual-checked',manifest:'site/data/textbook-fidelity/g9-ch1-ex1-6.json'},
      review:{tamilEditorial:'pending',teacher:'pending'}, ...extra
    });
  }

  const q1Data = [
    notation('n(A) = 25, n(B) = 40, n(A∪B) = 50', 'n(A)=25,\\ n(B)=40,\\ n(A\\cup B)=50'),
    notation('n(B′) = 25', 'n(B^{\\prime})=25'),
    notation('n(A) = 300, n(A∪B) = 500, n(A∩B) = 50', 'n(A)=300,\\ n(A\\cup B)=500,\\ n(A\\cap B)=50'),
    notation('n(B′) = 350', 'n(B^{\\prime})=350')
  ];
  const commonCount = notation('n(A∩B)', n(overlap));
  const bCount = notation('n(B)', n('B'));
  const universe = notation('n(U)', n('U'));
  const q1Results = [
    equation('n(A∩B) = 25 + 40 − 50 = 15', n(overlap)+'=25+40-50=15'),
    equation('n(U) = 40 + 25 = 65','n(U)=40+25=65'),
    equation('n(B) = 500 − 300 + 50 = 250','n(B)=500-300+50=250'),
    equation('n(U) = 250 + 350 = 600','n(U)=250+350=600')
  ];
  const disjoint = t('B and its complement are disjoint and together fill U. Therefore their cardinalities add to the size of U.',
    'B உம் அதன் நிரப்புக் கணமும் வெட்டாக் கணங்கள். அவற்றின் சேர்ப்பு U. எனவே இரண்டின் ஆதி எண்களையும் கூட்டினால் U இன் ஆதி எண் கிடைக்கும்.');
  add(1,t('Recover the missing cardinalities','விடுபட்ட ஆதி எண்களைக் காணுதல்'),
    ['1. (i) If ',q1Data[0],' and ',q1Data[1],', find ',commonCount,' and ',universe,'.\n(ii) If ',q1Data[2],' and ',q1Data[3],', find ',bCount,' and ',universe,'.'],
    ['1. (i) ',q1Data[0],' மற்றும் ',q1Data[1],' எனில், ',commonCount,' மற்றும் ',universe,' காண்க.\n(ii) ',
      q1Data[2],' மற்றும் ',q1Data[3],' எனில், ',bCount,' மற்றும் ',universe,' காண்க.'],
    [
      step('(i) Rearrange the union count to find the overlap.','(i) சேர்ப்பின் ஆதி எண்ணைப் பயன்படுத்தி வெட்டின் ஆதி எண்ணைக் காண்க.',incl,q1Results[0]),
      step('Add the numbers inside and outside B.','B இல் உள்ள உறுப்புகளின் எண்ணிக்கையையும், B க்கு வெளியே உள்ள உறுப்புகளின் எண்ணிக்கையையும் கூட்டுக.',disjoint,q1Results[1]),
      step('(ii) Move the known counts to one side to find the size of B.','(ii) தெரிந்த ஆதி எண்களை ஒருபுறம் கொண்டு சென்று B இன் ஆதி எண்ணைக் காண்க.',incl,q1Results[2]),
      step('Add the cardinality of B to that of its complement.','B இன் ஆதி எண்ணையும் அதன் நிரப்புக் கணத்தின் ஆதி எண்ணையும் கூட்டுக.',disjoint,q1Results[3])
    ],align([equation('(i) n(A∩B) = 15, n(U) = 65','\\text{(i)}\\quad n(A\\cap B)=15,\\ n(U)=65'),
      equation('(ii) n(B) = 250, n(U) = 600','\\text{(ii)}\\quad n(B)=250,\\ n(U)=600')]),
    t('Write the formula for the size of a union first. Use the given complement to count the rest of U.',
      'முதலில் சேர்ப்பின் ஆதி எண்ணுக்கான சூத்திரத்தை எழுதுக. U இன் மீதிப் பகுதியைக் காண கொடுக்கப்பட்ட நிரப்புக் கணத்தைப் பயன்படுத்துக.'));

  const u2 = notation('U = {x : x ∈ N, x ≤ 10}','U=\\{x:x\\in\\mathbb N,\\ x\\le10\\}');
  const a2 = notation('A = {2,3,4,8,10}','A=\\{2,3,4,8,10\\}');
  const b2 = notation('B = {1,2,5,8,10}','B=\\{1,2,5,8,10\\}');
  add(2,t('Verify the union count','சேர்ப்பின் ஆதி எண்ணைச் சரிபார்த்தல்'),
    ['2. If ',u2,', ',a2,' and ',b2,', then verify that ',cardinality],
    ['2. ',u2,', ',a2,' மற்றும் ',b2,' எனில், ',cardinality,' என்பதைச் சரிபார்க்க.'],
    [
      step('List every distinct member of either set and count the union.','இரு கணங்களில் உள்ள வேறுபட்ட உறுப்புகளை ஒருமுறை மட்டும் எழுதி சேர்ப்பின் ஆதி எண்ணைக் காண்க.',
        t('The elements of U outside both A and B do not contribute to the union.',
          'A, B ஆகிய இரு கணங்களுக்கும் வெளியே இருக்கும் U இன் உறுப்புகள் சேர்ப்பில் இடம்பெறாது.'),
        align([equation('A∪B = {1, 2, 3, 4, 5, 8, 10}',union+'=\\{1,2,3,4,5,8,10\\}'),equation('n(A∪B) = 7',n(union)+'=7')])),
      step('List the common members and substitute all three counts on the right side.','பொது உறுப்புகளைப் பட்டியலிட்டு வலப்பக்கத்தில் மூன்று ஆதி எண்களையும் பிரதியிடுக.',
        incl,align([equation('A∩B = {2, 8, 10}',overlap+'=\\{2,8,10\\}'),
          equation('n(A)+n(B)−n(A∩B) = 5+5−3 = 7','n(A)+n(B)-n(A\\cap B)=5+5-3=7')]))
    ],notation('n(A ∪ B) = n(A) + n(B) − n(A ∩ B) = 7',cardinality.latex+'=7',true),
    t('Count the union directly, then calculate the right-hand side separately.',
      'சேர்ப்பின் உறுப்புகளை நேரடியாக எண்ணிய பின், சமன்பாட்டின் வலப்பக்கத்தைத் தனியாகக் கணக்கிடுக.'));

  const g = (name, roster) => notation(name+' = {'+roster+'}', name+'=\\{'+roster+'\\}');
  function q3Data(lang) {
    const separator=lang==='ta'?' மற்றும் ':' and ';
    return ['\n(i) ',g('A','a,c,e,f,h'),', ',g('B','c,d,e,f'),separator,g('C','a,b,c,f'),
      '\n(ii) ',g('A','1,3,5'),', ',g('B','2,3,5,6'),separator,g('C','1,5,6,7')];
  }
  add(3,t('Verify the three-set union count','மூன்று கணங்களின் சேர்ப்பின் ஆதி எண்ணைச் சரிபார்த்தல்'),
    ['3. Verify ',triple,' for the following sets.',...q3Data('en')],
    ['3. ',triple,' என்பதைக் கீழ்க்காணும் கணங்களுக்குச் சரிபார்க்க.',...q3Data('ta')],
    [
      step('(i) List the union. Then list the three pairwise intersections and the triple intersection.',
        '(i) சேர்ப்பைப் பட்டியலிடுக. அதன் பின் மூன்று இருகண வெட்டுகளையும் மூன்று கணங்களுக்கும் பொதுவான வெட்டையும் பட்டியலிடுக.',
        tripleWhy,align([
          equation('A∪B∪C = {a,b,c,d,e,f,h}','A\\cup B\\cup C=\\{a,b,c,d,e,f,h\\}'),
          equation('A∩B = {c,e,f}, B∩C = {c,f}','A\\cap B=\\{c,e,f\\},\\ B\\cap C=\\{c,f\\}'),
          equation('A∩C = {a,c,f}, A∩B∩C = {c,f}','A\\cap C=\\{a,c,f\\},\\ A\\cap B\\cap C=\\{c,f\\}')])),
      step('Substitute the counts into the right-hand side and compare with the seven elements of the union.',
        'வலப்பக்கத்தில் ஆதி எண்களைப் பிரதியிட்டு, சேர்ப்பிலுள்ள ஏழு உறுப்புகளின் எண்ணிக்கையுடன் ஒப்பிடுக.',tripleWhy,
        equation('5+4+4−3−2−3+2 = 7','5+4+4-3-2-3+2=7')),
      step('(ii) Repeat the count using the number sets. The only member common to all three is 5.',
        '(ii) எண் கணங்களுக்கும் இதே முறையைப் பயன்படுத்துக. மூன்று கணங்களுக்கும் பொதுவான ஒரே உறுப்பு 5.',tripleWhy,
        align([
          equation('A∪B∪C = {1,2,3,5,6,7}','A\\cup B\\cup C=\\{1,2,3,5,6,7\\}'),
          equation('A∩B = {3,5}, B∩C = {5,6}','A\\cap B=\\{3,5\\},\\ B\\cap C=\\{5,6\\}'),
          equation('A∩C = {1,5}, A∩B∩C = {5}','A\\cap C=\\{1,5\\},\\ A\\cap B\\cap C=\\{5\\}')])),
      step('Substitute the new counts. Both sides equal six.','புதிய ஆதி எண்களைப் பிரதியிடுக. இரு பக்கங்களும் ஆறுக்குச் சமம்.',
        tripleWhy,equation('3+4+4−2−2−2+1 = 6','3+4+4-2-2-2+1=6'))
    ],align([equation('(i) n(A∪B∪C) = 7','\\text{(i)}\\quad n(A\\cup B\\cup C)=7'),
      equation('(ii) n(A∪B∪C) = 6','\\text{(ii)}\\quad n(A\\cup B\\cup C)=6')]),
    t('Count the three pairwise intersections and the triple intersection separately.',
      'மூன்று இருகண வெட்டுகளையும் மூன்று கணங்களின் வெட்டையும் தனித்தனியாக எண்ணுக.'));

  const numberParts = (values, romans=['i','ii','iii']) => align(values.map((value,i)=>
    equation('('+romans[i]+') '+value,'\\text{('+romans[i]+')}\\quad '+value)));
  add(4,t('Music and drama','இசையும் நாடகமும்'),
    '4. In a class, all students take part in either music or drama or both. 25 students take part in music, 30 students take part in drama and 8 students take part in both music and drama. Find\n(i) The number of students who take part in only music.\n(ii) The number of students who take part in only drama.\n(iii) The total number of students in the class.',
    '4. ஒரு வகுப்பில் உள்ள அனைத்து மாணவர்களும் இசை அல்லது நாடகம் அல்லது இரண்டிலும் பங்கேற்கிறார்கள். 25 மாணவர்கள் இசையிலும், 30 மாணவர்கள் நாடகத்திலும், 8 மாணவர்கள் இசை மற்றும் நாடகம் இரண்டிலும் பங்கேற்கிறார்கள் எனில்\n(i) இசையில் மட்டும் பங்கேற்கும் மாணவர்களின் எண்ணிக்கை.\n(ii) நாடகத்தில் மட்டும் பங்கேற்கும் மாணவர்களின் எண்ணிக்கை.\n(iii) வகுப்பில் உள்ள மொத்த மாணவர்களின் எண்ணிக்கையைக் காண்க.',
    [
      step('Subtract the eight students in both groups from each group total.','இரண்டிலும் பங்கேற்கும் எட்டு மாணவர்களை ஒவ்வொரு குழுவின் மொத்த எண்ணிக்கையிலிருந்தும் கழிக்க.',
        parts,align([equation('(i) 25 − 8 = 17','\\text{(i)}\\quad25-8=17'),equation('(ii) 30 − 8 = 22','\\text{(ii)}\\quad30-8=22')])),
      step('The two only-groups and the common group are disjoint and contain the entire class.',
        'இசையில் மட்டும், நாடகத்தில் மட்டும், இரண்டிலும் பங்கேற்பவர்கள் என்ற மூன்று குழுக்களிலும் சேர்த்து வகுப்பில் உள்ள மாணவர்கள் அனைவரும் உள்ளனர்.',
        incl,equation('(iii) 17 + 22 + 8 = 47','\\text{(iii)}\\quad17+22+8=47'))
    ],numberParts([17,22,47]),t('Place the eight students in the overlap before working out the two only-regions.',
      'இரண்டு தனிப்பகுதிகளின் எண்ணிக்கைகளைக் காணும் முன் எட்டு மாணவர்களைப் பொதுப் பகுதியில் குறிக்க.'));

  add(5,t('Tea and coffee','தேநீரும் குளம்பியும்'),
    '5. In a party of 45 people, each one likes tea or coffee or both. 35 people like tea and 20 people like coffee. Find the number of people who\n(i) like both tea and coffee.\n(ii) do not like tea.\n(iii) do not like coffee.',
    '5. 45 பேர் கொண்ட ஒரு குழுவில் ஒவ்வொருவரும் தேநீர் அல்லது குளம்பி (coffee) அல்லது இரண்டையும் விரும்புகிறார்கள். 35 நபர்கள் தேநீர் மற்றும் 20 நபர்கள் குளம்பி விரும்புகிறார்கள். கீழ்க்காணும் நபர்களின் எண்ணிக்கையைக் காண்க.\n(i) தேநீர் மற்றும் குளம்பி இரண்டையும் விரும்புபவர்கள்\n(ii) தேநீரை விரும்பாதவர்கள்\n(iii) குளம்பியை விரும்பாதவர்கள்',
    [
      step('Subtract the party size from the sum of the two counts to find how many like both.',
        'இரு எண்ணிக்கைகளின் கூட்டுத்தொகையிலிருந்து குழுவின் மொத்த எண்ணிக்கையைக் கழித்தால் இரண்டையும் விரும்புபவர்களின் எண்ணிக்கை கிடைக்கும்.',
        incl,equation('(i) 35 + 20 − 45 = 10','\\text{(i)}\\quad35+20-45=10')),
      step('Subtract the tea drinkers from the total for (ii). Subtract the coffee drinkers from the total for (iii).',
        '(ii) க்கு மொத்த எண்ணிக்கையிலிருந்து தேநீரை விரும்புபவர்களைக் கழிக்க. (iii) க்கு மொத்த எண்ணிக்கையிலிருந்து குளம்பியை விரும்புபவர்களைக் கழிக்க.',
        t('Each complement is relative to all 45 people in the party.',
          'ஒவ்வொரு நிரப்புக் கணத்திற்கும் குழுவிலுள்ள 45 பேரே அனைத்துக் கணம்.'),
        align([equation('(ii) 45 − 35 = 10','\\text{(ii)}\\quad45-35=10'),equation('(iii) 45 − 20 = 25','\\text{(iii)}\\quad45-20=25')]))
    ],numberParts([10,10,25]),t('Everyone likes at least one drink. Use the party size as the union and as the universe.',
      'ஒவ்வொருவரும் குறைந்தது ஒரு பானத்தை விரும்புகிறார்கள். குழுவின் மொத்த எண்ணிக்கையே சேர்ப்பின் ஆதி எண்ணும் அனைத்துக் கணத்தின் ஆதி எண்ணும் ஆகும்.'));

  add(6,t('Students who took the examination','தேர்வெழுதிய மாணவர்களின் எண்ணிக்கை'),
    '6. In an examination 50% of the students passed in Mathematics and 70% of students passed in Science while 10% students failed in both subjects. 300 students passed in both the subjects. Find the total number of students who appeared in the examination, if they took examination in only two subjects.',
    '6. ஒரு தேர்வில் கணிதத்தில் 50% மாணவர்கள் தேர்ச்சி பெற்றனர் மற்றும் 70% மாணவர்கள் அறிவியலில் தேர்ச்சி பெற்றனர். மேலும் 10% இரண்டிலும் தேர்ச்சி பெறாதோர். 300 மாணவர்கள் இரு பாடங்களிலும் தேர்ச்சி பெற்றுள்ளனர். இந்த இரு தேர்வை மட்டுமே மாணவர்கள் எழுதியிருந்தால் தேர்வெழுதிய மாணவர்களின் எண்ணிக்கையைக் காண்க..',
    [
      step('The students who passed at least one subject are everyone except the 10% who failed both.',
        'இரு பாடங்களிலும் தேர்ச்சி பெறாத 10% மாணவர்களைத் தவிர மற்றவர்கள் குறைந்தது ஒரு பாடத்தில் தேர்ச்சி பெற்றுள்ளனர்.',
        t('Passing at least one subject and failing both subjects are complementary events.',
          'குறைந்தது ஒரு பாடத்தில் தேர்ச்சி பெறுவதும் இரண்டிலும் தேர்ச்சி பெறாமல் இருப்பதும் ஒன்றுக்கொன்று நிரப்பு நிகழ்வுகள்.'),
        equation('100% − 10% = 90%','100\\%-10\\%=90\\%')),
      step('Find the percentage passing both by subtracting the union percentage from the sum.',
        'இரு பாடங்களின் தேர்ச்சி சதவீதங்களைக் கூட்டி, அதிலிருந்து குறைந்தது ஒரு பாடத்தில் தேர்ச்சி பெற்றோரின் சதவீதத்தைக் கழிக்க.',
        incl,equation('50% + 70% − 90% = 30%','50\\%+70\\%-90\\%=30\\%')),
      step('Let N be the total number of students. Thirty percent of N is 300.',
        'மொத்த மாணவர்களின் எண்ணிக்கை N என்க. N இன் 30% என்பது 300.',
        t('The 300 students are the number in the common region, so divide by the corresponding fraction of the whole.',
          '300 என்பது பொதுப் பகுதியில் உள்ள மாணவர்களின் எண்ணிக்கை. ஆகவே, மொத்தத்தின் எந்தப் பகுதி அது என்பதைக் கண்டறிந்து, அப்பின்னத்தால் வகுக்க வேண்டும்.'),
        align([equation('(30/100)N = 300','\\dfrac{30}{100}N=300'),equation('N = 300 × 100/30 = 1000','N=300\\times\\dfrac{100}{30}=1000')]))
    ],equation('1000','1000'),t('Work out the percentage who passed at least one subject before counting those who passed both.',
      'இரண்டிலும் தேர்ச்சி பெற்றோரின் சதவீதத்தைக் காணும் முன், குறைந்தது ஒரு பாடத்தில் தேர்ச்சி பெற்றோரின் சதவீதத்தைக் காண்க.'));

  const a7=notation('n(A–B) = 32 + x','n(A-B)=32+x');
  const b7=notation('n(B–A) = 5x','n(B-A)=5x');
  const both7=notation('n(A∩B) = x','n(A\\cap B)=x');
  const eq7=notation('n(A) = n(B)','n(A)=n(B)');
  add(7,t('Equal set sizes','சம ஆதி எண்கள்'),
    ['7. A and B are two sets such that ',a7,', ',b7,' and ',both7,
      '. Illustrate the information by means of a Venn diagram. Given that ',eq7,', calculate the value of x.'],
    ['7. A மற்றும் B ஆகிய இரு கணங்கள் ',a7,', ',b7,' மற்றும் ',both7,
      '. என அமைகின்றன. இத்தரவினை வென்படம் மூலம் குறிக்கவும். ',eq7,', எனில் x இன் மதிப்பைக் காண்க.'],
    [
      step('Draw two overlapping circles. Put 32 + x in the A-only region, 5x in the B-only region, and x in the common region.',
        'ஒன்றையொன்று வெட்டும் இரண்டு வட்டங்களை வரைக. A இன் தனிப்பகுதியில் 32 + x, B இன் தனிப்பகுதியில் 5x, பொதுப் பகுதியில் x எனக் குறிக்க.',
        parts,align([equation('n(A) = (32 + x) + x','n(A)=(32+x)+x'),equation('n(B) = 5x + x','n(B)=5x+x')])),
      step('The totals are equal. Cancel the common region from each side and solve.',
        'இரண்டு ஆதி எண்களும் சமம். இருபக்கத்திலும் உள்ள பொதுப் பகுதியின் ஆதி எண்ணைக் கழித்துச் சமன்பாட்டைத் தீர்க்க.',
        t('Removing an equal count from both sides keeps the equality true. The remaining counts are the two only-regions.',
          'இருபக்கத்திலிருந்தும் சமமான எண்ணிக்கையைக் கழித்தாலும் சமன்பாடு மாறாது. எஞ்சியவை இரு தனிப்பகுதிகளின் எண்ணிக்கைகள்.'),
        align([equation('32 + x = 5x','32+x=5x'),equation('4x = 32','4x=32'),equation('x = 8; n(A) = n(B) = 48','x=8,\\quad n(A)=n(B)=48')]))
    ],equation('x = 8','x=8'),t('Build the size of each set from its own region and the common region.',
      'ஒவ்வொரு கணத்தின் தனிப்பகுதியையும் பொதுப் பகுதியையும் சேர்த்து அதன் ஆதி எண்ணை எழுதுக.'),
    figure(7,t('A only is 32 + x, A and B overlap in x, and B only is 5x.',
      'A மட்டும் உள்ள பகுதியில் 32 + x, பொதுப் பகுதியில் x, B மட்டும் உள்ள பகுதியில் 5x.'),
      t('Venn diagram for the given set counts','கொடுக்கப்பட்ட ஆதி எண்களுக்கான வென் படம்'),true));

  add(8,t('Check the car ownership data','மகிழுந்துத் தரவைச் சரிபார்த்தல்'),
    '8. Out of 500 car owners investigated, 400 owned car A and 200 owned car B, 50 owned both A and B cars. Is this data correct?',
    '8. 500 மகிழுந்து உரிமையாளர்களைப் பற்றிய ஆய்வில், 400 பேர் மகிழுந்து A ஐயும் 200 பேர் மகிழுந்து B ஐயும், 50 பேர் இரு வகையான மகிழுந்துகளையும் வைத்துள்ளனர் எனில் இது சரியான தகவலா?',
    [
      step('Count everyone reported to own A or B, using the stated overlap.','கொடுக்கப்பட்ட பொதுப் பகுதியின் எண்ணிக்கையைப் பயன்படுத்தி A அல்லது B மகிழுந்து வைத்திருப்பவர்களை எண்ணுக.',
        incl,equation('n(A∪B) = 400 + 200 − 50 = 550','n(A\\cup B)=400+200-50=550')),
      step('The union would contain more people than the entire survey, which is impossible.',
        'சேர்ப்பில் உள்ளவர்களின் எண்ணிக்கை ஆய்வில் பங்கேற்ற மொத்த எண்ணிக்கையை விட அதிகமாக இருக்க முடியாது.',
        t('Every person counted in the union is one of the 500 surveyed owners.',
          'சேர்ப்பில் எண்ணப்படும் ஒவ்வொருவரும் ஆய்வுக்கு உட்பட்ட 500 உரிமையாளர்களில் ஒருவரே.'),
        equation('550 > 500','550>500'))
    ],equation('550 > 500','550>500'),
    t('Can the union of two groups in this survey be bigger than the survey itself?',
      'ஆய்வுக்குட்பட்ட இரண்டு குழுக்களின் சேர்ப்பு ஆய்வின் மொத்த எண்ணிக்கையைவிட அதிகமாக இருக்க முடியுமா?'));

  add(9,t('Three newspapers','மூன்று செய்தித்தாள்கள்'),
    '9. In a colony, 275 families buy Tamil newspaper, 150 families buy English newspaper, 45 families buy Hindi newspaper, 125 families buy Tamil and English newspapers, 17 families buy English and Hindi newspapers, 5 families buy Tamil and Hindi newspapers and 3 families buy all the three newspapers. If each family buy atleast one of these newspapers then find\n(i) Number of families buy only one newspaper\n(ii) Number of families buy atleast two newspapers\n(iii) Total number of families in the colony.',
    '9. ஒரு குடியிருப்பில், 275 குடும்பங்கள் தமிழ்ச் செய்தித்தாளும், 150 குடும்பங்கள் ஆங்கிலச் செய்தித்தாளும், 45 குடும்பங்கள் இந்தி செய்தித்தாளும் வாங்குகின்றனர். 125 குடும்பங்கள் தமிழ் மற்றும் ஆங்கிலச் செய்தித்தாள்களையும், 17 குடும்பங்கள் ஆங்கிலம் மற்றும் இந்தி செய்தித்தாள்களையும், 5 குடும்பங்கள் தமிழ் மற்றும் இந்தி செய்தித்தாள்களையும், 3 குடும்பங்கள் மூன்று செய்தித்தாள்களையும் வாங்குகிறார்கள். குடியிருப்பில் உள்ள ஒவ்வொரு குடும்பமும் குறைந்தது ஒரு செய்தித்தாளையாவது வாங்குகிறார்கள் எனில்,\n(i) ஒரு செய்தித்தாளை மட்டும் வாங்கும் குடும்பங்களின் எண்ணிக்கை,\n(ii) குறைந்தது இரண்டு செய்தித்தாள்களை வாங்கும் குடும்பங்களின் எண்ணிக்கை,\n(iii) குடியிருப்பில் உள்ள மொத்தக் குடும்பங்களின் எண்ணிக்கை ஆகியவற்றைக் காண்க',
    [
      step('Remove the three families who buy all three papers from each two-paper intersection.',
        'ஒவ்வொரு இரு செய்தித்தாள் வெட்டிலிருந்தும் மூன்று செய்தித்தாள்களையும் வாங்கும் மூன்று குடும்பங்களைக் கழிக்க.',
        t('The three-paper families belong to every pairwise intersection. Remove them to get the numbers buying exactly two of each pair.',
          'மூன்று செய்தித்தாள்களையும் வாங்குவோர் ஒவ்வொரு இருகண வெட்டிலும் உள்ளனர். அந்தந்த இரு செய்தித்தாள்களை மட்டும் வாங்குவோரைக் காண அவர்களை நீக்க வேண்டும்.'),
        align([equation('125 − 3 = 122','125-3=122'),equation('17 − 3 = 14','17-3=14'),equation('5 − 3 = 2','5-3=2')])),
      step('From each paper total subtract the two exact-pair regions that include it, and the triple region.',
        'ஒவ்வொரு செய்தித்தாளின் மொத்த எண்ணிக்கையிலிருந்தும், அதனுடன் தொடர்புடைய இரண்டு இருகணத் தனிப்பகுதிகளையும், மூன்று கணங்களின் பொதுப் பகுதியையும் கழிக்க.',
        parts,align([equation('275 − 122 − 2 − 3 = 148','275-122-2-3=148'),equation('150 − 122 − 14 − 3 = 11','150-122-14-3=11'),
          equation('45 − 14 − 2 − 3 = 26','45-14-2-3=26')])),
      step('Add the three single-paper regions. Separately add the three exact-pair regions and the triple region.',
        'ஒரு செய்தித்தாளை மட்டும் வாங்கும் மூன்று பகுதிகளைக் கூட்டுக. சரியாக இரண்டை வாங்கும் மூன்று பகுதிகளையும், மூன்றையும் வாங்கும் பகுதியையும் தனியே கூட்டுக.',
        t('The single-paper and multi-paper groups are disjoint, and every family belongs to one of them.',
          'ஒரு செய்தித்தாளையும் பல செய்தித்தாள்களையும் வாங்கும் குழுக்கள் ஒன்றையொன்று வெட்டாது. ஒவ்வொரு குடும்பமும் இவற்றில் ஏதேனும் ஒரு குழுவில் உள்ளனர்.'),
        align([equation('(i) 148 + 11 + 26 = 185','\\text{(i)}\\quad148+11+26=185'),
          equation('(ii) 122 + 14 + 2 + 3 = 141','\\text{(ii)}\\quad122+14+2+3=141'),
          equation('(iii) 185 + 141 = 326','\\text{(iii)}\\quad185+141=326')]))
    ],numberParts([185,141,326]),t('Fill the triple overlap first. Work outward toward the three single-paper regions.',
      'முதலில் மூன்று கணங்களின் பொதுப் பகுதியை நிரப்புக. பிறகு மூன்று தனிப்பகுதிகளை நோக்கிப் படிப்படியாகக் கணக்கிடுக.'),
    figure(9,t('Tamil only 148, English only 11, Hindi only 26. Tamil-English only 122, English-Hindi only 14, Tamil-Hindi only 2. All three 3.',
      'தமிழ் மட்டும் 148, ஆங்கிலம் மட்டும் 11, இந்தி மட்டும் 26. தமிழ் ஆங்கிலம் மட்டும் 122, ஆங்கிலம் இந்தி மட்டும் 14, தமிழ் இந்தி மட்டும் 2. மூன்றும் 3.'),
      t('T, E and H denote Tamil, English and Hindi newspapers','T, E, H என்பவை முறையே தமிழ், ஆங்கிலம், இந்தி செய்தித்தாள்களைக் குறிக்கும்'),true));

  add(10,t('Farmers who grew all three crops','மூன்று பயிர்களையும் பயிரிட்ட விவசாயிகள்'),
    '10. A survey of 1000 farmers found that 600 grew paddy, 350 grew ragi, 280 grew corn, 120 grew paddy and ragi, 100 grew ragi and corn, 80 grew paddy and corn. If each farmer grew atleast any one of the above three, then find the number of farmers who grew all the three.',
    '10. 1000 விவசாயிகளிடம் நடத்தப்பட்ட ஆய்வில், 600 விவசாயிகள் நெல் பயிரிட்டதாகவும், 350 விவசாயிகள் கேழ்வரகு பயிரிட்டதாகவும், 280 விவசாயிகள் மக்காச்சோளம் பயிரிட்டதாகவும் தெரிவித்தனர். மேலும், 120 விவசாயிகள் நெல் மற்றும் கேழ்வரகு, 100 விவசாயிகள் கேழ்வரகு மற்றும் மக்காச்சோளம், 80 விவசாயிகள் நெல் மற்றும் மக்காச்சோளப் பயிர்களையும் பயிரிட்டனர். ஒவ்வொரு விவசாயியும் மேற்கண்டவற்றில் குறைந்தது ஒரு பயிரையாவது பயிர் செய்தார் எனில், மூன்று பயிர்களையும் பயிரிட்ட விவசாயிகளின் எண்ணிக்கையைக் காண்க.',
    [
      step('Let x be the number who grew all three. The union has 1000 farmers. Substitute the given counts into the three-set rule.',
        'மூன்று பயிர்களையும் பயிரிட்டவர்களின் எண்ணிக்கை x என்க. சேர்ப்பில் 1000 விவசாயிகள் உள்ளனர். மூன்று கணங்களின் சேர்ப்புச் சூத்திரத்தில் கொடுத்துள்ள ஆதி எண்களைப் பிரதியிடுக.',
        tripleWhy,equation('1000 = 600 + 350 + 280 − 120 − 100 − 80 + x','1000=600+350+280-120-100-80+x')),
      step('Simplify the known counts and isolate x. The result is no greater than any pairwise count.',
        'தெரிந்த எண்ணிக்கைகளைச் சுருக்கி x ஐத் தனிமைப்படுத்துக. கிடைத்த எண்ணிக்கை எந்த இருகண வெட்டின் எண்ணிக்கையையும் விடப் பெரியதாக இல்லை.',
        t('The common region of all three is a subset of every pairwise intersection.',
          'மூன்று கணங்களின் பொதுப் பகுதி ஒவ்வொரு இருகண வெட்டிற்கும் உட்கணம் ஆகும்.'),
        align([equation('1000 = 930 + x','1000=930+x'),equation('x = 70','x=70')]))
    ],equation('70','70'),t('Use the whole survey count as the union, and keep the triple intersection as the unknown.',
      'ஆய்வின் மொத்த எண்ணிக்கையைச் சேர்ப்பின் ஆதி எண்ணாகக் கொண்டு, மூன்று கணங்களின் வெட்டின் ஆதி எண்ணை தெரியாததாக வைத்துக் கணக்கிடுக.'));

  const n11=notation('n(U) = 125','n(U)=125');
  add(11,t('Find the three regions in the diagram','படத்தில் உள்ள மூன்று பகுதிகளைக் காணுதல்'),
    ['11. In the adjacent diagram, if ',n11,', y is two times of x and z is 10 more than x, then find the value of x, y and z.'],
    ['11. கொடுக்கப்பட்ட படத்தில், ',n11,', y ஆனது x ஐப் போல் இருமடங்கு மற்றும் z ஆனது x ஐ விட 10 அதிகம் எனில், x, y மற்றும் z ஆகியவற்றின் மதிப்பைக் காண்க.'],
    [
      step('Add the numbers in all eight regions of the rectangle, including the 5 outside all the circles.',
        'வட்டங்களுக்கு வெளியே உள்ள 5 உட்பட, செவ்வகத்தில் உள்ள எட்டுப் பகுதிகளின் எண்ணிக்கைகளையும் கூட்டுக.',
        t('The eight regions do not overlap and together form the entire universal set.',
          'எட்டுப் பகுதிகளும் ஒன்றையொன்று வெட்டாது. அவற்றைச் சேர்த்தால் முழு அனைத்துக் கணம் கிடைக்கும்.'),
        align([equation('x + y + z + 4 + 6 + 17 + 3 + 5 = 125','x+y+z+4+6+17+3+5=125'),
          equation('x + y + z = 90','x+y+z=90')])),
      step('Replace y by 2x and z by x + 10. Solve the resulting equation and substitute back.',
        'y க்கு 2x ஐயும் z க்கு x + 10 ஐயும் பிரதியிடுக. கிடைக்கும் சமன்பாட்டைத் தீர்த்து x இன் மதிப்பைப் பயன்படுத்தி மற்ற இரு மதிப்புகளையும் காண்க.',
        t('The relationships express all three unknowns using x, so the total determines x first.',
          'கொடுத்துள்ள தொடர்புகளால் மூன்று தெரியாத மதிப்புகளையும் x மூலம் எழுத முடிகிறது. எனவே மொத்தத்திலிருந்து முதலில் x ஐக் காணலாம்.'),
        align([equation('x + 2x + (x + 10) = 90','x+2x+(x+10)=90'),equation('4x = 80','4x=80'),
          equation('x = 20, y = 40, z = 30','x=20,\\ y=40,\\ z=30')]))
    ],equation('x = 20, y = 40, z = 30','x=20,\\ y=40,\\ z=30'),
    t('Include every region of the rectangle when adding the known numbers.',
      'தெரிந்த எண்களைக் கூட்டும்போது செவ்வகத்தில் உள்ள எல்லாப் பகுதிகளையும் கணக்கில் கொள்ள வேண்டும்.'),
    figure(11,t('U has 125 members. The left-only, right-only and bottom-only regions contain x, y and z. The upper overlap alone contains 4, the lower-left overlap alone 6, the lower-right overlap alone 17, all three 3, and outside 5.',
      'U இல் 125 உறுப்புகள் உள்ளன. இடம், வலம், கீழ் ஆகிய தனிப்பகுதிகளில் முறையே x, y, z உள்ளன. மேல் இருவட்ட வெட்டில் 4, கீழ் இடப்புற இருவட்ட வெட்டில் 6, கீழ் வலப்புற இருவட்ட வெட்டில் 17, மூன்று வட்ட வெட்டில் 3, வெளிப்பகுதியில் 5 உள்ளன.'),
      t('Eight regions of the given diagram','கொடுக்கப்பட்ட படத்தின் எட்டுப் பகுதிகள்')));

  add(12,t('Chess, carrom and table tennis','சதுரங்கம், சுண்டாட்டம், மேசை வரிப்பந்து'),
    '12. Each student in a class of 35 plays atleast one game among chess, carrom and table tennis. 22 play chess, 21 play carrom, 15 play table tennis, 10 play chess and table tennis, 8 play carrom and table tennis and 6 play all the three games. Find the number of students who play (i) chess and carrom but not table tennis (ii) only chess (iii) only carrom (Hint: Use Venn diagram)',
    '12. 35 மாணவர்கள் கொண்ட ஒரு வகுப்பில் ஒவ்வொருவரும் சதுரங்கம் (Chess), சுண்டாட்டம் (Carrom), மேசை வரிப்பந்து (Table tennis) ஆகிய விளையாட்டுகளில் ஏதேனும் ஒன்றை விளையாடுகிறார்கள். 22 மாணவர்கள் சதுரங்கமும், 21 மாணவர்கள் சுண்டாட்டமும், 15 மாணவர்கள் மேசை வரிப்பந்தும், 10 மாணவர்கள் சதுரங்கம் மற்றும் மேசை வரிப்பந்தும், 8 மாணவர்கள் சுண்டாட்டம் மற்றும் மேசை வரிப்பந்தும், 6 மாணவர்கள் மூன்று விளையாட்டுகளையும் விளையாடுகிறார்கள் எனில், (i) சதுரங்கம் மற்றும் சுண்டாட்டம் விளையாடி மேசை வரிப்பந்து விளையாடாதவர்கள் (ii) சதுரங்கம் மட்டும் விளையாடுபவர்கள் (iii) சுண்டாட்டம் மட்டும் விளையாடுபவர்களின் எண்ணிக்கையைக் காண்க. (குறிப்பு: வென்படத்தைப் பயன்படுத்தவும்)',
    [
      step('Put six in the centre. Remove these six from the two overlaps with table tennis to obtain the counts in the two-game regions.',
        'ஆறு மாணவர்களை மையப் பகுதியில் குறிக்க. மேசை வரிப்பந்து உள்ள இரு வெட்டுகளிலிருந்தும் இந்த ஆறு பேரைக் கழித்து, அந்த இரு விளையாட்டுகளை மட்டும் விளையாடுவோரைக் காண்க.',
        tripleWhy,align([equation('10 − 6 = 4','10-6=4'),equation('8 − 6 = 2','8-6=2')])),
      step('The group counts add to 58. Subtracting 35 leaves 23 extra counts. Each of the six three-game students contributes two extras.',
        'மூன்று விளையாட்டுகளின் எண்ணிக்கைகளைக் கூட்டினால் 58. மொத்த மாணவர்கள் 35 என்பதால் கூடுதலாக எண்ணப்பட்டவை 23. மூன்று விளையாட்டுகளையும் விளையாடும் ஆறு மாணவர்களில் ஒவ்வொருவரும் இரு கூடுதல் எண்ணிக்கைகளைத் தருகின்றனர்.',
        t('A student in exactly two games is counted one extra time. Therefore the remaining extra counts equal the number of two-game students.',
          'சரியாக இரண்டு விளையாட்டுகளை விளையாடும் மாணவர் ஒருமுறை கூடுதலாக எண்ணப்படுகிறார். எனவே எஞ்சிய கூடுதல் எண்ணிக்கை சரியாக இரண்டை விளையாடுவோரின் எண்ணிக்கைக்குச் சமம்.'),
        align([equation('22 + 21 + 15 − 35 = 23','22+21+15-35=23'),equation('23 − 2 × 6 = 11','23-2\\times6=11')])),
      step('Remove the two already known two-game regions from 11. Then subtract the common regions from each of the chess and carrom totals.',
        '11 இலிருந்து ஏற்கெனவே தெரிந்த இரு இருவிளையாட்டுப் பகுதிகளைக் கழிக்க. பிறகு சதுரங்கம், சுண்டாட்டம் ஆகியவற்றின் மொத்தங்களிலிருந்து அவற்றின் பொதுப் பகுதிகளைக் கழிக்க.',
        parts,align([equation('(i) 11 − 4 − 2 = 5','\\text{(i)}\\quad11-4-2=5'),equation('(ii) 22 − 5 − 4 − 6 = 7','\\text{(ii)}\\quad22-5-4-6=7'),
          equation('(iii) 21 − 5 − 2 − 6 = 8','\\text{(iii)}\\quad21-5-2-6=8')]))
    ],numberParts([5,7,8]),t('Fill the three-game region before finding the two-game regions. Compare the sum of the game counts with the class size.',
      'இரு விளையாட்டுப் பகுதிகளைக் காணும் முன் மூன்று விளையாட்டுப் பகுதியை நிரப்புக. விளையாட்டுகளின் எண்ணிக்கைகளின் கூட்டுத்தொகையை வகுப்பின் மொத்தத்துடன் ஒப்பிடுக.'),
    figure(12,t('Chess only 7, carrom only 8, table tennis only 3. Chess-carrom only 5, chess-table tennis only 4, carrom-table tennis only 2. All three 6.',
      'சதுரங்கம் மட்டும் 7, சுண்டாட்டம் மட்டும் 8, மேசை வரிப்பந்து மட்டும் 3. சதுரங்கம் சுண்டாட்டம் மட்டும் 5, சதுரங்கம் மேசை வரிப்பந்து மட்டும் 4, சுண்டாட்டம் மேசை வரிப்பந்து மட்டும் 2. மூன்றும் 6.'),
      t('C is chess, R is carrom and T is table tennis','C, R, T என்பவை முறையே சதுரங்கம், சுண்டாட்டம், மேசை வரிப்பந்து ஆகியவற்றைக் குறிக்கும்'),true));

  add(13,t('Exactly two modes of travel','சரியாக இரண்டு வகைப் பயணங்கள்'),
    '13. In a class of 50 students, each one come to school by bus or by bicycle or on foot. 25 by bus, 20 by bicycle, 30 on foot and 10 students by all the three. Now how many students come to school exactly by two modes of transport?',
    '13. ஒரு வகுப்பிலுள்ள 50 மாணவர்கள், பேருந்து மூலமாகவோ அல்லது மிதிவண்டி மூலமாகவோ அல்லது நடந்தோ பள்ளிக்கு வந்தடைகின்றனர். 25 மாணவர்கள் பேருந்து மூலமும், 20 மாணவர்கள் மிதிவண்டி மூலமும், 30 மாணவர்கள் நடந்தும், 10 மாணவர்கள் மூன்று வகைப் பயணங்களிலும் வருகிறார்கள் எனில் எத்தனை மாணவர்கள் சரியாக இரண்டு வகைப் பயணங்களில் மட்டும் பள்ளிக்கு வந்தடைகின்றனர்.',
    [
      step('Add the three counts. Subtract the total number of students to find how many extra counts there are.',
        'மூன்று பயண வகைகளின் எண்ணிக்கைகளையும் கூட்டுக. அதிலிருந்து மொத்த மாணவர்களின் எண்ணிக்கையைக் கழித்தால் கூடுதல் எண்ணிக்கைகள் கிடைக்கும்.',
        t('Every student contributes at least one count. Students who use multiple modes contribute the extras.',
          'ஒவ்வொரு மாணவரும் குறைந்தது ஒருமுறை எண்ணப்படுகிறார். ஒன்றுக்கு மேற்பட்ட பயண வகைகளைப் பயன்படுத்துவோர் கூடுதலாக எண்ணப்படுகின்றனர்.'),
        equation('25 + 20 + 30 − 50 = 25','25+20+30-50=25')),
      step('Each of the ten students who uses all three modes contributes two extras. Each two-mode student contributes one.',
        'மூன்று பயண வகைகளையும் பயன்படுத்தும் பத்து மாணவர்களில் ஒவ்வொருவரும் இரண்டு கூடுதல் எண்ணிக்கைகளைத் தருகின்றனர். சரியாக இரண்டைப் பயன்படுத்தும் ஒவ்வொருவரும் ஒரு கூடுதல் எண்ணிக்கையைத் தருகின்றனர்.',
        t('Removing the triple group’s extra counts leaves exactly one extra count per two-mode student.',
          'மூன்று பயண வகைகளையும் பயன்படுத்துவோரின் கூடுதல் எண்ணிக்கைகளைக் கழித்தால், சரியாக இரண்டு வகைகளைப் பயன்படுத்தும் ஒவ்வொருவருக்கும் ஒரு கூடுதல் எண்ணிக்கை மட்டுமே எஞ்சும்.'),
        equation('25 − 2 × 10 = 5','25-2\\times10=5'))
    ],equation('5','5'),t('When you add the three group counts, how many extra times does a student in all three groups get counted?',
      'மூன்று குழுக்களின் எண்ணிக்கைகளைக் கூட்டும்போது, மூன்றிலும் உள்ள ஒரு மாணவர் எத்தனை முறை கூடுதலாக எண்ணப்படுகிறார்?'));

  const grade = window.TRIGGLE_CLASSES?.[9];
  const chapter = window.TRIGGLE_CURRICULUM?.grades.find(entry => entry.grade === 9)?.chapters.find(entry => entry.id === 'g9-ch1');
  if (!grade || !chapter) throw Error('Grade 9 Set Language registration is unavailable.');
  chapter.textbookQuestionIds ??= [];
  for (const entry of entries) {
    if (grade.items.some(item => item.id === entry.id) || chapter.textbookQuestionIds.includes(entry.id)) {
      throw Error('Duplicate Set Language record: ' + entry.id);
    }
    grade.items.push(entry);
    chapter.textbookQuestionIds.push(entry.id);
  }
})();
