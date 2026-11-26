/* TN SCERT 2025, Exercise 1.7. Q12 remains a source-ambiguity explanation. */
(() => {
  'use strict';
  const t=(en,ta)=>({en,ta});
  const f=(fallback,latex,display=false)=>({fallback,latex,display});
  const plain=value=>value?.fallback??value;
  const m=source=>{
    const tokens={'∈':'\\in ','∉':'\\notin ','⊆':'\\subseteq ','⊈':'\\nsubseteq ',
      '⊂':'\\subset ','∅':'\\varnothing ','φ':'\\phi ','∪':'\\cup ','∩':'\\cap ',
      '′':"'",'−':'-','≠':'\\ne ','≤':'\\le ','∆':'\\mathbin{\\Delta}',
      '{':'\\{','}':'\\}','%':'\\%'};
    return f(source,source.replace(/[∈∉⊆⊈⊂∅φ∪∩′−≠≤∆{}%]/gu,c=>tokens[c]));
  };
  const mathOptions=(...values)=>values.map(value=>{const math=m(value);return t(math,math);});
  const labels=(q,lang,choice)=>[...q[lang],...choice.flatMap((value,i)=>[i===0?'\n':'   ','('+(i+1)+') ',value[lang]])];
  const wrap=q=>Array.isArray(q)?q:[q];
  const figure=(number,alt,figureCaption)=>({figureSrc:'./assets/grade9-ch1/ex1-7-q'+number+'.svg',figureAlt:alt,figureCaption});

  function step(en,ta,why,eq) {
    const math=eq?{...eq,display:true}:null;
    return {en,ta,why,...(math&&{eq:math.fallback,math})};
  }

  const why={
    members:t('The objects printed inside the braces are the elements of the set.',
      'சுருள் அடைப்புக்குறிக்குள் எழுதப்பட்டுள்ள பொருள்களே கணத்தின் உறுப்புகள்.'),
    subset:t('A subset has no member outside the original set.',
      'உட்கணத்தின் எந்த உறுப்பும் தொடக்கக் கணத்திற்கு வெளியே இருக்காது.'),
    common:t('An intersection keeps only elements that meet every membership condition.',
      'உறுப்பாவதற்கான அனைத்து நிபந்தனைகளையும் நிறைவு செய்யும் உறுப்புகள் மட்டுமே வெட்டுக் கணத்தில் இருக்கும்.'),
    difference:t('A set difference keeps elements inside the first set and outside the second set.',
      'முதல் கணத்தில் உள்ள உறுப்புகள் இரண்டாம் கணத்திற்கு வெளியே இருந்தால் மட்டுமே கண வித்தியாசத்தில் இடம்பெறும்.'),
    complement:t('Take every complement with respect to U.',
      'ஒவ்வொரு நிரப்புக் கணத்தையும் அதே அனைத்துக் கணம் U ஐப் பொறுத்துக் காண வேண்டும்.'),
    count:t('Count each object once. For disjoint regions, add the counts directly.',
      'ஒவ்வொரு பொருளையும் ஒருமுறை மட்டும் எண்ண வேண்டும். ஒன்றையொன்று வெட்டாத பகுதிகளின் எண்ணிக்கைகளை நேரடியாகக் கூட்டலாம்.'),
    power:t('Every element may independently be included in a subset or left out.',
      'உட்கணத்தை உருவாக்கும்போது ஒவ்வோர் உறுப்பையும் தனித்தனியாகச் சேர்க்கலாம் அல்லது விட்டுவிடலாம்.')
  };
  const entries=[];
  function add(number,concept,title,q,choices,correctIndex,hint,steps,options={}) {
    const prompt=t(wrap(q.en),wrap(q.ta));
    const blocked=correctIndex===null;
    const questionMath=blocked?t(labels(prompt,'en',choices),labels(prompt,'ta',choices)):prompt;
    const answer=options.answer??(blocked?null:choices[correctIndex]);
    const notation=answer?.en?.latex?t({...answer.en,display:true},{...answer.ta,display:true}):null;
    entries.push({
      id:'g9-ch1-ex1.7-q'+number,classNum:9,chapter:'1',exercise:'1.7',kind:'textbook',
      topic:t('Set Language','கண மொழி'),label:t('Exercise 1.7 · Q'+number,'பயிற்சி 1.7 · வினா '+number),
      title,questionMath,q:t(questionMath.en.map(plain).join(''),questionMath.ta.map(plain).join('')),
      ...(blocked?{sourceStatus:'SOURCE_BLOCKED'}:{choices,correctIndex}),
      steps,answer:t(plain(answer.en),plain(answer.ta)),...(notation&&{answerMath:notation}),
      hint,setConcept:concept,notationSource:'authored',edition:'2025',
      source:'https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view',
      reference:'TN SCERT Grade 9 Mathematics, revised 2025, Exercise 1.7 Q'+number,
      sourceFidelity:{status:'page-visual-checked',manifest:'site/data/textbook-fidelity/g9-ch1-ex1-7.json'},
      review:{tamilEditorial:'pending',teacher:'pending'},...options.figure
    });
  }

  const S='{1,2,3,4,5,6,7,8,9,10}';
  add(1,'set',t('Find the correct membership statement','சரியான உறுப்பு கூற்றைக் காணுதல்'),
    t('1. Which of the following is correct?','1. கீழ்க்காண்பனவற்றில் சரியானது எது?'),
    mathOptions('{7} ∈ '+S,'7 ∈ '+S,'7 ∉ '+S,'{7} ⊈ '+S),1,
    t('Read the elements printed within the outer braces.','வெளிப்புறச் சுருள் அடைப்புக்குறிக்குள் கொடுக்கப்பட்ட உறுப்புகளைப் படிக்க.'),
    [step('The list contains the number 7. This gives the second statement.',
      'பட்டியலில் 7 என்ற எண் உள்ளது. எனவே இரண்டாவது கூற்று சரி.',why.members,m('7 ∈ '+S)),
    step('The singleton containing 7 is a subset of the list. It is not itself one of the ten elements.',
      '7 ஐ மட்டும் கொண்ட கணம் பட்டியலின் உட்கணம். அந்த ஓருறுப்புக் கணமே பட்டியலின் பத்து உறுப்புகளில் ஒன்றாக இல்லை.',
      why.subset,m('{7} ⊆ '+S))]);

  const singleton=m('P = {x | x ∈ Z, −1 < x < 1}');
  add(2,'types',t('Classify the integer set','முழுக்களால் ஆன கணத்தை வகைப்படுத்துதல்'),
    t(['2. The set ',singleton,' is a'],['2. கணம் ',singleton,' என்பது']),
    [t('Singleton set','ஓருறுப்புக் கணம்'),t('Power set','அடுக்குக் கணம்'),t('Null set','வெற்றுக் கணம்'),t('Subset','உட்கணம்')],0,
    t('List the integers strictly between −1 and 1.','−1 க்கும் 1 க்கும் இடையிலுள்ள முழுக்களைப் பட்டியலிடுக.'),
    [step('The strict inequalities exclude both endpoints. The only integer left is 0.',
      'கண்டிப்பான சமனின்மைகளால் இரு எல்லை எண்களும் சேராது. இடையில் உள்ள ஒரே முழு 0.',why.members,m('P = {0}')),
    step('A set with one element is a singleton set.','ஒரே ஓர் உறுப்பைக் கொண்ட கணம் ஓருறுப்புக் கணம்.',why.count,m('n(P) = 1'))]);

  const u3=m('U = {x | x ∈ N, x < 10}'), a3=m('A = {x | x ∈ N, 2 ≤ x < 6}');
  add(3,'operations',t('Complement twice','இருமுறை நிரப்புக் கணம் காணுதல்'),
    t(['3. If ',u3,' and ',a3,' then ',m('(A′)′'),' is'],
      ['3. ',u3,' மற்றும் ',a3,' எனில் ',m('(A′)′'),' என்பது']),
    mathOptions('{1, 6, 7, 8, 9}','{1, 2, 3, 4}','{2, 3, 4, 5}','{ }'),2,
    t('First list A. Consider which elements remain after taking both complements.','முதலில் A ஐப் பட்டியலிடுக. இருமுறை நிரப்புக் கணம் காணும்போது எந்த உறுப்புகள் எஞ்சும் எனச் சிந்திக்க.'),
    [step('A contains the natural numbers 2 through 5. Its complement contains the other elements of U.',
      'A இல் 2 முதல் 5 வரையிலான இயல் எண்கள் உள்ளன. U இன் மீதமுள்ள உறுப்புகள் A இன் நிரப்புக் கணத்தில் உள்ளன.',
      why.complement,m('A′ = {1,6,7,8,9}')),
    step('The complement of that roster recovers A, including 2 and excluding 6.',
      'அந்தப் பட்டியலின் நிரப்புக் கணம் மீண்டும் A ஐத் தரும். 2 சேரும். 6 சேராது.',why.complement,m('(A′)′ = {2,3,4,5}'))]);

  add(4,'operations',t('Intersect a subset with its larger set','உட்கணத்தையும் பெருங்கணத்தையும் வெட்டுதல்'),
    t(['4. If ',m('B⊆ A'),' then ',m('n(A∩B)'),' is'],['4. ',m('B⊆ A'),' எனில் ',m('n(A∩B)'),' என்பது']),
    mathOptions('n(A−B)','n(B)','n(B−A)','n(A)'),1,
    t('Every member of B also satisfies the membership condition for A.','B இன் ஒவ்வோர் உறுப்பும் A இன் உறுப்புக்கான நிபந்தனையையும் நிறைவு செய்கிறது.'),
    [step('Every element in B is also in A. The common elements are exactly B.',
      'B இன் ஒவ்வோர் உறுப்பும் A இலும் உள்ளது. எனவே B இன் உறுப்புகளே பொது உறுப்புகள்.',why.common,m('A∩B = B')),
    step('Take the cardinality of both sides.','இருபக்கங்களின் ஆதி எண்களைக் காண்க.',why.count,m('n(A∩B) = n(B)'))]);

  add(5,'types',t('Count non-empty subsets','வெற்றுக் கணமல்லாத உட்கணங்களை எண்ணுதல்'),
    t(['5. If ',m('A = {x, y, z}'),' then the number of non- empty subsets of A is'],
      ['5. கணம் ',m('A = {x, y, z}'),' எனில், A இன் வெற்றுக் கணமல்லாத உட்கணங்களின் எண்ணிக்கை']),
    mathOptions('8','5','6','7'),3,
    t('Count every subset first. Then decide which subset the question excludes.','முதலில் எல்லா உட்கணங்களையும் எண்ணுக. வினாவில் விலக்கப்பட்ட உட்கணம் எது எனக் காண்க.'),
    [step('There are two choices for each of the three elements. Multiply to count all subsets.',
      'மூன்று உறுப்புகளில் ஒவ்வொன்றுக்கும் இரண்டு தேர்வுகள் உள்ளன. எல்லா உட்கணங்களின் எண்ணிக்கையைப் பெறப் பெருக்குக.',
      why.power,f('2³ = 8','2^3=8')),
    step('Remove just the empty subset. The full set is still a non-empty subset.',
      'வெற்றுக் கணத்தை மட்டும் நீக்குக. முழுக் கணமும் வெற்றுக் கணமல்லாத ஓர் உட்கணம்.',why.subset,m('8 − 1 = 7'))]);

  add(6,'types',t('Recognize the empty subset','வெற்று உட்கணத்தை அறிதல்'),
    t('6. Which of the following is correct?','6. பின்வருவனவற்றுள் சரியானது எது?'),
    mathOptions('∅ ⊆ {a, b}','∅ ∈ {a, b}','{a} ∈ {a, b}','a ⊆ {a, b}'),0,
    t('Distinguish “element of” from “subset of”.','உறுப்பாக இருப்பதையும் உட்கணமாக இருப்பதையும் வேறுபடுத்திப் பார்க்க.'),
    [step('The empty set has no element that could lie outside the given set.',
      'வெற்றுக் கணத்தில் எந்த உறுப்பும் இல்லை. எனவே கொடுத்துள்ள கணத்திற்கு வெளியே அதற்கு உறுப்பு எதுவும் இல்லை.',why.subset,m('∅ ⊆ {a,b}')),
    step('The only elements printed in the roster are a and b. Neither the empty set nor the singleton {a} is an element of this roster.',
      'பட்டியலில் உள்ள உறுப்புகள் a, b மட்டுமே. வெற்றுக் கணமோ {a} என்ற ஓருறுப்புக் கணமோ இப்பட்டியலின் உறுப்பு அல்ல.',why.members,m('∅ ∉ {a,b}'))]);

  add(7,'operations',t('When union and intersection are equal','சேர்ப்பும் வெட்டும் சமமாகும்போது'),
    t(['7. If ',m('A∪B = A∩B'),', then'],['7. ',m('A∪B = A∩B'),', எனில்']),
    mathOptions('A≠B','A = B','A ⊂ B','B ⊂ A'),1,
    t('Imagine an element that belongs to just one of the sets. Which side would contain it?',
      'இரு கணங்களில் ஒன்றில் மட்டும் உள்ள ஓர் உறுப்பைக் கருதுக. அது சமன்பாட்டின் எந்தப் பக்கத்தில் இடம்பெறும்?'),
    [step('Every member of A belongs to the union. As the union equals the intersection, that member also belongs to B.',
      'A இன் ஒவ்வோர் உறுப்பும் சேர்ப்பில் உள்ளது. சேர்ப்பு வெட்டுக்குச் சமம் என்பதால் அந்த உறுப்பு B இலும் உள்ளது.',why.common,m('A ⊆ B')),
    step('The same reasoning starting with B gives the reverse inclusion. Mutual inclusion gives equality.',
      'B இலிருந்து தொடங்கினால் மறுதிசையிலும் உட்கணத் தொடர்பு கிடைக்கும். இரண்டு கணங்களும் ஒன்றுக்கொன்று உட்கணமாக இருந்தால் அவை சமம்.',
      why.subset,f('B ⊆ A ⇒ A = B','B\\subseteq A\\Rightarrow A=B'))]);

  add(8,'operations',t('Find the overlap from a difference','வித்தியாசத்திலிருந்து வெட்டைக் காணுதல்'),
    t(['8. If ',m('B − A'),' is B, then ',m('A∩B'),' is'],['8. ',m('B − A'),' என்பது B, எனில் ',m('A∩B'),' என்பது']),
    mathOptions('A','B','U','∅'),3,
    t('Would an element belonging to both sets remain in B − A?','இரு கணங்களிலும் உள்ள உறுப்பு B − A இல் எஞ்சுமா?'),
    [step('Subtracting A from B leaves B unchanged, so no element of B is removed.',
      'B இலிருந்து A ஐக் கழித்தபோதும் B மாறவில்லை. எனவே B இன் எந்த உறுப்பும் நீக்கப்படவில்லை.',why.difference,m('B − A = B')),
    step('No element can belong to both sets, because any such element would have been removed.',
      'இரண்டு கணங்களுக்கும் பொது உறுப்பு இருந்தால் அது நீக்கப்பட்டிருக்கும். எனவே பொதுவான உறுப்பு இல்லை.',why.common,m('A∩B = ∅'))]);

  add(9,'types',t('Count subsets from the Venn diagram','வென்படத்திலிருந்து உட்கணங்களை எண்ணுதல்'),
    t(['9. From the adjacent diagram ',m('n[P(A∆B)]'),' is'],['9. அருகில் உள்ள படத்திலிருந்து ',m('n[P(A∆B)]'),' ஐக் காண்க.']),
    mathOptions('8','16','32','64'),2,
    t('Keep elements inside exactly one circle before counting their subsets.','உட்கணங்களை எண்ணும் முன் சரியாக ஒரு வட்டத்தில் மட்டும் உள்ள உறுப்புகளை எடுக்க.'),
    [step('Read the two side regions. The two members in the overlap are left out of the symmetric difference.',
      'இரு பக்கத் தனிப்பகுதிகளைப் படிக்க. பொதுப் பகுதியில் உள்ள இரண்டு உறுப்புகள் சமச்சீர் வித்தியாசத்தில் சேராது.',
      why.difference,m('A∆B = {60,70,75,85,90}')),
    step('The roster has five elements, each with two choices for a subset.',
      'பட்டியலில் ஐந்து உறுப்புகள் உள்ளன. உட்கணத்தை உருவாக்க ஒவ்வோர் உறுப்புக்கும் இரண்டு தேர்வுகள் உள்ளன.',
      why.power,f('n[P(A∆B)] = 2⁵ = 32','n[P(A\\mathbin{\\Delta} B)]=2^5=32'))],
    {figure:figure(9,t('A only contains 60, 85, 75. The overlap contains 30, 20. B only contains 90, 70. Outside both are 50, 10, 65.',
      'A மட்டும் உள்ள பகுதியில் 60, 85, 75. பொதுப் பகுதியில் 30, 20. B மட்டும் உள்ள பகுதியில் 90, 70. இரண்டிற்கும் வெளியே 50, 10, 65.'),
      t('Fig. 1.40','படம் 1.40'))});

  add(10,'operations',t('Find the smallest and largest overlap','வெட்டின் குறைந்தபட்ச, அதிகபட்ச ஆதி எண்களைக் காணுதல்'),
    t(['10. If ',m('n(A) = 10'),' and ',m('n(B) = 15'),', then the minimum and maximum number of elements in ',m('A∩B'),' is'],
      ['10. ',m('n(A) = 10'),' மற்றும் ',m('n(B) = 15'),', எனில் கணம் ',m('A∩B'),' உள்ள குறைந்தபட்ச மற்றும் அதிகபட்ச உறுப்புகளின் எண்ணிக்கை']),
    mathOptions('10,15','15,10','10,0','0,10'),3,
    t('Consider disjoint sets and the case when the smaller set lies entirely in the larger set.',
      'வெட்டாக் கணங்களையும் சிறிய கணம் முழுவதும் பெரிய கணத்தில் உள்ள நிலையையும் கருதுக.'),
    [step('If A and B are disjoint, their intersection has zero elements. Counts cannot be negative.',
      'A, B வெட்டாக் கணங்கள் எனில் அவற்றின் வெட்டில் பூச்சியம் உறுப்புகள். எண்ணிக்கை எதிர்மமாக முடியாது.',
      why.count,m('n(A∩B) = 0')),
    step('The intersection cannot contain more than the ten elements in A. Ten is possible if A is a subset of B.',
      'A இல் உள்ள பத்து உறுப்புகளை விட வெட்டில் அதிக உறுப்புகள் இருக்க முடியாது. A என்பது B இன் உட்கணம் எனில் பத்தும் இடம்பெறும்.',
      why.subset,m('0 ≤ n(A∩B) ≤ 10'))]);

  add(11,'types',t('Intersect with a power set','அடுக்குக் கணத்துடன் வெட்டைக் காணுதல்'),
    t(['11. Let ',m('A = {∅}'),' and ',m('B = P(A)'),', then ',m('A∩B'),' is'],
      ['11. ',m('A = {∅}'),' மற்றும் ',m('B = P(A)'),' எனில் ',m('A∩B'),' ஆனது']),
    mathOptions('{ ∅, {∅} }','{∅}','∅','{0}'),1,
    t('Find the two subsets of A. Then compare the elements of A with those of B.',
      'A இன் இரண்டு உட்கணங்களையும் காண்க. பிறகு A இன் உறுப்புகளை B இன் உறுப்புகளுடன் ஒப்பிடுக.'),
    [step('A has one element, the empty set. The subsets of A are the empty set and A itself.',
      'A இன் ஒரே உறுப்பு வெற்றுக் கணம். A இன் உட்கணங்கள் வெற்றுக் கணமும் A உம் ஆகும்.',why.power,m('B = {∅, {∅}}')),
    step('The empty set is an element of both A and B, so the intersection contains that one element.',
      'வெற்றுக் கணம் A, B இரண்டிற்கும் உறுப்பு. ஆகவே வெட்டில் அந்த ஓர் உறுப்பு மட்டும் இடம்பெறும்.',
      why.common,m('A∩B = {∅}'))]);

  add(12,'cardinality',t('Check the information in the question','வினாவில் உள்ள தரவைச் சரிபார்த்தல்'),
    t('12. In a class of 50 boys, 35 boys play Carrom and 20 boys play Chess then the number of boys play both games is',
      '12. ஒரு வகுப்பில் உள்ள 50 மாணவர்களில் 35 பேர் சுண்டாட்டம் (carrom) விளையாடுபவர்கள் மற்றும் 20 பேர் சதுரங்கம் விளையாடுபவர்கள் எனில், இந்த இரண்டு விளையாட்டையும் விளையாடுபவர்களின் எண்ணிக்கை'),
    mathOptions('5','30','15','10.'),null,
    t('Does the question say that every boy plays at least one game?',
      'ஒவ்வொரு மாணவரும் குறைந்தது ஒரு விளையாட்டையாவது விளையாடுவதாக வினா கூறுகிறதா?'),
    [step('Let x count the boys who play both games. The number who play at least one is 55 − x. It can be at most 50.',
      'இரண்டு விளையாட்டுகளையும் விளையாடுவோரின் எண்ணிக்கை x என்க. குறைந்தது ஒன்றை விளையாடுவோர் 55 − x பேர். இது 50 ஐ மிகாது.',
      why.count,f('35 + 20 − x ≤ 50 ⇒ x ≥ 5','35+20-x\\le50\\Rightarrow x\\ge5')),
    step('If all 50 play at least one game, the overlap is five, as in the appendix. If only 40 play at least one game, the overlap is 15. Both situations satisfy the printed information.',
      '50 பேரும் குறைந்தது ஒரு விளையாட்டை விளையாடினால், விடைக்குறிப்பில் உள்ளபடி இரண்டையும் விளையாடுவோர் 5 பேர். 40 பேர் மட்டும் குறைந்தது ஒரு விளையாட்டை விளையாடினால் இரண்டையும் விளையாடுவோர் 15 பேர். இரு நிலைகளும் அச்சிட்ட தரவுகளுக்கு ஏற்ப உள்ளன.',
      t('The number playing neither is not specified. Every student playing neither increases the overlap by one from the minimum of 5.',
        'இரு விளையாட்டுகளிலும் பங்கேற்காதோரின் எண்ணிக்கை கொடுக்கப்படவில்லை. பங்கேற்காத ஒவ்வொருவருக்கும் இரண்டையும் விளையாடுவோரின் எண்ணிக்கை குறைந்தபட்சமான 5 இலிருந்து ஒன்று அதிகரிக்கும்.'),
      f('55 − 50 = 5, 55 − 40 = 15','55-50=5,\\quad55-40=15'))],
    {answer:t('The printed data allow any integer overlap from 5 to 20. The key’s 5 assumes every boy plays at least one game.',
      'அச்சிட்ட தரவுகளின்படி இரண்டையும் விளையாடுவோரின் எண்ணிக்கை 5 முதல் 20 வரையிலான எந்த முழுவாகவும் இருக்கலாம். விடைக்குறிப்பில் உள்ள 5, அனைவரும் குறைந்தது ஒரு விளையாட்டில் பங்கேற்கிறார்கள் என்ற நிபந்தனையில் மட்டுமே கிடைக்கும்.')});

  const a13=m('A = {1,2,3,5,8}'),b13=m('B = {2,5,6,7,9}'),n13=m('n[(A∪B)′]');
  add(13,'operations',t('Count the complement of a union','சேர்ப்பின் நிரப்புக் கணத்தின் ஆதி எண்ணைக் காணுதல்'),
    t(['13. If ',f('U = {x : x ∈ N and x < 10}','U=\\{x:x\\in\\mathbb N\\text{ and }x<10\\}'),', ',a13,' and ',b13,', then ',n13,' is'],
      ['13. ',m('U = {x : x ∈ N'),' மற்றும் ',m('x < 10}'),', ',a13,' மற்றும் ',b13,' எனில், ',n13,' என்பது']),
    mathOptions('1','2','4','8'),0,
    t('List the nine elements of U and look for ones absent from both A and B.',
      'U இன் ஒன்பது உறுப்புகளையும் பட்டியலிட்டு, A, B ஆகிய இரண்டிலும் இல்லாத உறுப்புகளைக் காண்க.'),
    [step('The union contains all the listed elements of A and B, with no repeats.',
      'A, B ஆகியவற்றின் பட்டியலிலுள்ள எல்லா உறுப்புகளும் மீளாமல் சேர்ப்பில் இடம்பெறும்.',why.members,m('A∪B = {1,2,3,5,6,7,8,9}')),
    step('Only 4 in U is absent from that union. The complement therefore has one element.',
      'U இல் 4 மட்டும் அந்தச் சேர்ப்பில் இல்லை. எனவே நிரப்புக் கணத்தில் ஓர் உறுப்பு உள்ளது.',
      why.complement,m('(A∪B)′ = {4}'))]);

  add(14,'demorgan',t('Read a difference identity','கண வித்தியாச முற்றொருமையை அறிதல்'),
    t(['14. For any three sets P, Q and R, ',m('P − (Q∩R)'),' is'],
      ['14. P, Q மற்றும் R என்பன எவையேனும் மூன்று கணங்கள் எனில், ',m('P − (Q∩R)'),' என்பது']),
    mathOptions('P − (Q∪R)','(P∩Q) − R','(P − Q)∪(P − R)','(P − Q)∩(P − R)'),2,
    t('Ask when an element fails to belong to the intersection of Q and R.',
      'ஓர் உறுப்பு எந்த நிலையில் Q, R இன் வெட்டில் இடம்பெறாது எனச் சிந்திக்க.'),
    [step('An element is excluded from Q∩R when it is outside Q or outside R.',
      'ஓர் உறுப்பு Q க்கு வெளியேயோ R க்கு வெளியேயோ இருந்தால் Q, R இன் வெட்டில் இடம்பெறாது.',why.common,m('(Q∩R)′ = Q′∪R′')),
    step('Retain the elements that also belong to P. They form the union of the two differences.',
      'P இலும் உள்ள உறுப்புகளை மட்டும் எடுக்க. அவை இரண்டு கண வித்தியாசங்களின் சேர்ப்பை உருவாக்குகின்றன.',
      why.difference,m('P−(Q∩R) = (P−Q)∪(P−R)'))]);

  add(15,'demorgan',t('Identify the correct complement rule','சரியான கணநிரப்பு விதியைக் காணுதல்'),
    t('15. Which of the following is true?','15. கீழ்க்காண்பவற்றில் எது சரி?'),
    mathOptions('A − B = A∩B','A − B = B − A','(A∪B)′ = A′∪B′','(A∩B)′ = A′∪B′'),3,
    t('Compare the regions outside the overlap with those outside at least one circle.',
      'பொதுப் பகுதிக்கு வெளியேயுள்ள பகுதிகளையும் குறைந்தது ஒரு வட்டத்திற்கு வெளியேயுள்ள பகுதிகளையும் ஒப்பிடுக.'),
    [step('A point outside the overlap is outside A or outside B. This gives De Morgan’s rule for intersection.',
      'பொதுப் பகுதிக்கு வெளியேயுள்ள புள்ளி A க்கு வெளியேயோ B க்கு வெளியேயோ இருக்கும். இதுவே வெட்டுக்கான டி மார்கன் விதி.',
      why.complement,m('(A∩B)′ = A′∪B′')),
    step('A point outside the union must be outside both sets. That gives an intersection of complements instead.',
      'சேர்ப்புக்கு வெளியேயுள்ள புள்ளி இரு கணங்களுக்கும் வெளியே இருக்க வேண்டும். எனவே நிரப்புக் கணங்களின் வெட்டு கிடைக்கும்.',
      why.common,m('(A∪B)′ = A′∩B′'))]);

  const counts16=[
    m('n(A∪B∪C) = 100'),m('n(A) = 4x'),m('n(B) = 6x'),m('n(C) = 5x'),
    m('n(A∩B) = 20'),m('n(B∩C) = 15'),m('n(A∩C) = 25'),m('n(A∩B∩C) = 10')
  ];
  const separations16=lang=>counts16.flatMap((count,i)=>[...(i?[i===7?(lang==='ta'?' மற்றும் ':' and '):', ']:[]),count]);
  add(16,'cardinality',t('Solve an inclusion–exclusion equation','சேர்ப்பு எண்ணிக்கைச் சமன்பாட்டைத் தீர்த்தல்'),
    t(['16. If ',...separations16('en'),', then the value of x is'],['16. ',...separations16('ta'),' எனில், x இன் மதிப்பு']),
    mathOptions('10','15','25','30'),0,
    t('Add the three set counts, subtract the pairwise counts, then add the triple count.',
      'மூன்று கணங்களின் ஆதி எண்களைக் கூட்டி, இருகண வெட்டுகளின் ஆதி எண்களைக் கழித்து, மூன்றின் வெட்டு எண்ணிக்கையைக் கூட்டுக.'),
    [step('Substitute the given values in the formula for the size of a union of three sets.',
      'மூன்று கணங்களின் சேர்ப்பின் ஆதி எண்ணுக்கான சூத்திரத்தில் கொடுக்கப்பட்ட மதிப்புகளைப் பிரதியிடுக.',
      t('The triple overlap needs adding back once, because it was subtracted in each of the three pairwise counts.',
        'மூன்று கணங்களின் பொதுப் பகுதி ஒவ்வொரு இருகண வெட்டிலும் கழிக்கப்பட்டதால் அதனை மீண்டும் ஒருமுறை கூட்ட வேண்டும்.'),
      m('100 = 4x+6x+5x−20−15−25+10')),
    step('Collect the terms and divide both sides by 15.','ஒத்த உறுப்புகளைச் சேர்த்து, இருபக்கத்தையும் 15 ஆல் வகுக்க.',
      why.count,f('100 = 15x − 50; 150 = 15x; x = 10','\\begin{aligned}100&=15x-50\\\\150&=15x\\\\x&=10\\end{aligned}'))]);

  add(17,'operations',t('Check incompatible membership conditions','ஒருசேர நிறைவேறாத உறுப்பு நிபந்தனைகளைப் பார்க்க'),
    t(['17. For any three sets A, B and C, ',m('(A − B)∩(B − C)'),' is equal to'],
      ['17. A, B மற்றும் C என்பன எவையேனும் மூன்று கணங்கள் எனில், ',m('(A − B)∩(B − C)'),' -க்குச் சமமானது.']),
    [t('A only','A மட்டும்'),t('B only','B மட்டும்'),t('C only','C மட்டும்'),...mathOptions('φ')],3,
    t('Focus on whether an element of each difference can be in B.',
      'ஒவ்வொரு கண வித்தியாசத்திலும் உள்ள உறுப்பு B இல் இடம்பெறுமா என்பதைப் பார்க்க.'),
    [step('An element of A − B is outside B. An element of B − C is in B.',
      'A − B இன் உறுப்பு B க்கு வெளியே உள்ளது. B − C இன் உறுப்பு B இல் உள்ளது.',
      why.difference,f('A−B ⊆ B′, B−C ⊆ B','A-B\\subseteq B^{\\prime},\\quad B-C\\subseteq B')),
    step('No element can be inside and outside B at once. The intersection is empty, written φ in the choices.',
      'ஓர் உறுப்பு ஒரே நேரத்தில் B இன் உள்ளேயும் வெளியேயும் இருக்க முடியாது. வெட்டு வெற்றுக் கணம். தேர்வுகளில் அது φ என எழுதப்பட்டுள்ளது.',
      why.common,m('(A−B)∩(B−C) = ∅'))]);

  add(18,'operations',t('Combine three shape properties','மூன்று வடிவப் பண்புகளை இணைத்தல்'),
    t(['18. If J = Set of three sided shapes, K = Set of shapes with two equal sides and L = Set of shapes with right angle, then ',
      m('J∩K∩L'),' is'],
      ['18. J என்பது மூன்று பக்கங்களைக் கொண்ட உருவங்களின் கணம், K என்பது ஏதேனும் இரண்டு பக்கங்கள் சமமாக உள்ள உருவங்களின் கணம் மற்றும் L என்பது ஒரு கோணம் செங்கோணமாக உள்ள உருவங்களின் கணம் எனில், ',
      m('J∩K∩L'),' என்பது']),
    [t('Set of isoceles triangles','இருசமபக்க முக்கோணங்களின் கணம்'),t('Set of equilateral triangles','சமபக்க முக்கோணங்களின் கணம்'),
      t('Set of isoceles right triangles','இருசமபக்கச் செங்கோண முக்கோணங்களின் கணம்'),t('Set of right angled triangles','செங்கோண முக்கோணங்களின் கணம்')],2,
    t('A shape in the intersection must meet all three listed properties.',
      'வெட்டில் உள்ள வடிவம் பட்டியலிடப்பட்ட மூன்று பண்புகளையும் கொண்டிருக்க வேண்டும்.'),
    [step('A shape in J has three sides, so it is a triangle. If it also belongs to K, it has two equal sides.',
      'J இல் உள்ள ஓர் உருவம் மூன்று பக்கங்களைக் கொண்டதால் அது முக்கோணம். அது K இலும் இருந்தால் அதன் இரு பக்கங்கள் சமம்.',
      why.common,m('J∩K')),
    step('Membership in L adds a right angle. Such a triangle is both isosceles and right-angled.',
      'L இன் உறுப்பாக இருப்பதால் ஒரு செங்கோணமும் உள்ளது. எனவே அது இருசமபக்கச் செங்கோண முக்கோணம்.',
      why.common,m('J∩K∩L'))]);

  add(19,'demorgan',t('Identify the shaded part of Z','Z இன் நிழலிட்ட பகுதியைக் காணுதல்'),
    t('19. The shaded region in the Venn diagram is','19. கொடுக்கப்பட்ட வென்படத்தில் நிழலிடப்பட்ட பகுதியானது'),
    mathOptions('Z − (X∪Y)','(X∪Y)∩Z','Z − (X∩Y)','Z∪(X∩Y)'),2,
    t('Start inside Z. Check which part shared by the other circles remains clear.',
      'Z இன் உள்ளே தொடங்குக. மற்ற இரு வட்டங்களுக்கும் பொதுவான எந்தப் பகுதி நிழலிடப்படவில்லை எனப் பார்க்க.'),
    [step('The shading stays inside Z. In particular, the parts in just one of X and Y are still shaded if they lie in Z.',
      'நிழலிடல் Z க்கு உள்ளே மட்டுமே உள்ளது. X, Y இல் ஏதேனும் ஒன்றில் மட்டும் உள்ள பகுதிகள் Z இலும் இருந்தால் அவை நிழலிடப்பட்டுள்ளன.',
      why.common,m('Z')),
    step('The only excluded portion inside Z is the overlap of X and Y. Subtract that overlap from Z.',
      'Z க்கு உள்ளே விலக்கப்பட்ட ஒரே பகுதி X, Y இன் பொதுப் பகுதி. அந்த வெட்டை Z இலிருந்து கழிக்க.',
      why.difference,m('Z−(X∩Y)'))],
    {figure:figure(19,t('Z is the bottom circle. Its area is shaded except for the central region that also lies within both X and Y.',
      'Z கீழ் வட்டம். X, Y இரண்டிற்கும் பொதுவாக உள்ள மையப் பகுதியைத் தவிர Z இன் மற்ற பகுதிகள் நிழலிடப்பட்டுள்ளன.'),
      t('Shaded region in Q19','வினா 19 இன் நிழலிட்ட பகுதி'))});

  add(20,'cardinality',t('Find the percentage outside the three groups','மூன்று குழுக்களுக்கும் வெளியே உள்ள சதவீதத்தைக் காணுதல்'),
    t('20. In a city, 40% people like only one fruit, 35% people like only two fruits, 20% people like all the three fruits. How many percentage of people do not like any one of the above three fruits?',
      '20. ஒரு நகரில், 40% மக்கள் ஒரு வகை பழத்தை மட்டும், 35% மக்கள் இரண்டு வகை பழங்களை மட்டும், 20% மக்கள் மூன்று வகை பழங்களையும் விரும்புகிறார்கள் எனில், மேற்கண்ட மூன்று வகை பழங்களையும் விரும்பாதவர்களின் சதவீதம் என்ன?'),
    mathOptions('5','8','10','15'),0,
    t('The groups liking exactly one, exactly two and all three fruits do not overlap.',
      'சரியாக ஒன்று, சரியாக இரண்டு, மூன்று பழங்களையும் விரும்புவோரின் குழுக்கள் ஒன்றையொன்று வெட்டாது.'),
    [step('Add the percentages in the three disjoint groups to find who likes at least one fruit.',
      'குறைந்தது ஒரு பழத்தை விரும்புவோரைக் காண மூன்று வெட்டாக் குழுக்களின் சதவீதங்களைக் கூட்டுக.',
      why.count,m('40%+35%+20% = 95%')),
    step('Subtract from 100% to find the people who like none of the three fruits.',
      'மூன்றில் எதையும் விரும்பாதவர்களின் சதவீதத்தைக் காண 100% இலிருந்து கழிக்க.',
      why.complement,m('100%−95% = 5%'))],{answer:t(m('5%'),m('5%'))});

  const grade=window.TRIGGLE_CLASSES?.[9];
  const chapter=window.TRIGGLE_CURRICULUM?.grades.find(entry=>entry.grade===9)?.chapters.find(entry=>entry.id==='g9-ch1');
  if (!grade || !chapter) throw Error('Grade 9 Set Language registration is unavailable.');
  chapter.textbookQuestionIds ??= [];
  for (const entry of entries) {
    if (grade.items.some(item=>item.id===entry.id) || chapter.textbookQuestionIds.includes(entry.id)) {
      throw Error('Duplicate Set Language record: '+entry.id);
    }
    grade.items.push(entry);
    chapter.textbookQuestionIds.push(entry.id);
  }
})();
