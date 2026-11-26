/* TN SCERT 2025, Exercise 1.5. Set identities and original Venn diagrams. */
(() => {
  'use strict';
  const t = (en,ta) => ({en,ta});
  const tex = (fallback,latex) => ({fallback,latex});
  const symbols = {'∪':'\\cup ','∩':'\\cap ','′':"'",'−':'-','∅':'\\varnothing','≤':'\\le ',
    '∈':'\\in ','{':'\\{','}':'\\}','∆':'\\mathbin{\\Delta}'};
  // This formatter is used only for authored mathematical expressions.
  const m = expression => tex(expression,expression.replace(/[∪∩′−∅≤∈{}∆]/gu,c=>symbols[c]));
  const text = cells => cells.map(cell=>cell.fallback??cell).join('');
  const display = rows => ({fallback:rows.map(row=>row.fallback).join('\n'),
    latex:'\\begin{aligned}'+rows.map(row=>'&'+row.latex).join('\\\\')+'\\end{aligned}',display:true});
  const row = (label, formula) => tex('('+label+') '+formula.fallback,'\\text{('+label+')}\\quad '+formula.latex);
  const st = (en,ta,why,formulas=[],taFormulas) => {
    const math=formulas.length?display(formulas):null;
    return {en,ta,why,...(math&&{eq:math.fallback,math}),...(taFormulas&&{mathTa:display(taFormulas)})};
  };
  const bracket = t('Evaluate the operation in parentheses before applying the outer operation.',
    'வெளிப்புறக் கணச் செயலைச் செய்யும் முன் அடைப்புக்குறிக்குள் உள்ள கணச் செயலைச் செய்க.');
  const split = t('Membership in the difference requires being in the first set and outside the second.',
    'கண வித்தியாசத்தின் உறுப்பு முதல் கணத்தில் இடம்பெற வேண்டும். இரண்டாம் கணத்தில் இடம்பெறக் கூடாது.');
  const overlap = t('An intersection requires membership in both sets. A union requires membership in at least one.',
    'வெட்டில் இடம்பெற இரண்டு கணங்களிலும் உறுப்பாக இருக்க வேண்டும். சேர்ப்பில் இடம்பெற குறைந்தது ஒரு கணத்தில் உறுப்பாக இருந்தால் போதும்.');
  const complement = t('A complement contains the members of U outside the specified set.',
    'குறிப்பிட்ட கணத்திற்கு வெளியே உள்ள U இன் உறுப்புகளே நிரப்புக் கணத்தில் இடம்பெறும்.');
  const same = t('Equal sets contain exactly the same elements. The order used to write those elements does not matter.',
    'சம கணங்களில் உள்ள உறுப்புகள் அனைத்தும் ஒன்றே. அவற்றை எழுதும் வரிசை பொருட்டல்ல.');
  const membership = t('Each point belongs to one region of the diagram, determined by which circles contain it.',
    'ஒரு புள்ளி எந்தெந்த வட்டங்களில் உள்ளது என்பதைப் பொறுத்து வென்படத்தின் ஒரு பகுதியில் மட்டுமே இருக்கும்.');
  const fig = (number,alt,caption,solution=false) => ({
    figureSrc:'./assets/grade9-ch1/ex1-5-q'+number+'.svg',figureAlt:alt,figureCaption:caption,
    ...(solution&&{figureInSolution:true})
  });

  const entries=[];
  function add(number,title,en,ta,steps,answer,hint,extra={}) {
    const questionMath=t(en,ta);
    const enAnswer=display(answer.en??answer);
    const taAnswer=answer.ta?display(answer.ta):null;
    entries.push({id:'g9-ch1-ex1.5-q'+number,classNum:9,chapter:'1',exercise:'1.5',kind:'textbook',
      topic:t('Set Language','கண மொழி'),label:t('Exercise 1.5 · Q'+number,'பயிற்சி 1.5 · வினா '+number),
      title,q:t(text(en),text(ta)),questionMath,steps,answer:enAnswer.fallback,
      answerMath:taAnswer?t(enAnswer,taAnswer):enAnswer,...(taAnswer&&{answerTa:taAnswer.fallback}),
      hint,setConcept:'demorgan',notationSource:'authored',edition:'2025',
      source:'https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view',
      reference:'TN SCERT Grade 9 Mathematics, revised 2025, Exercise 1.5 Q'+number,
      sourceFidelity:{status:'page-visual-checked',manifest:'site/data/textbook-fidelity/g9-ch1-ex1-5.json'},
      review:{tamilEditorial:'pending',teacher:'pending'},...extra});
  }

  const roman=['i','ii','iii','iv','v','vi','vii'];
  const roster = values => values.length?'{' + values.join(', ') + '}':'∅';
  const eq = (lhs,values) => m(lhs+' = '+roster(values));
  const signs = values => values.map(v=>String(v).replace('-','−'));
  const withNumbers = (lhs,values) => eq(lhs,signs(values));
  const unique = values => [...new Set(values)].sort((a,b)=>typeof a==='number'?a-b:a.localeCompare(b));
  const join = (a,b) => unique([...a,...b]);
  const cap = (a,b) => a.filter(value=>b.includes(value));
  const sub = (a,b) => a.filter(value=>!b.includes(value));
  const mark = ops => ops.flatMap((op,i)=>[i===0?'\n':'   ','('+roman[i]+') ',op]);
  function listed(names,lists,language) {
    return names.flatMap((name,i)=>[...(i?[i===names.length-1?(language==='ta'?' மற்றும் ':' and '):', ']:[]),
      eq(name,typeof lists[i][0]==='number'?signs(lists[i]):lists[i])]);
  }
  const q1U=[-3,-2,-1,0,1,2,3,4,5,6,7,8];
  const q1A=[-2,-1,3,4,6],q1B=[-2,-1,5,7,8],q1C=[-3,-2,0,3,8];
  const aPrime=sub(q1U,q1A),bPrime=sub(q1U,q1B);
  const q1Ops=['A−B','B−C','A′∪B′','A′∩B′','(B∪C)′','A−(B∪C)','A−(B∩C)'];
  const q1Values=[sub(q1A,q1B),sub(q1B,q1C),join(aPrime,bPrime),cap(aPrime,bPrime),sub(q1U,join(q1B,q1C)),
    sub(q1A,join(q1B,q1C)),sub(q1A,cap(q1B,q1C))];
  const q1Ans=q1Values.map((values,i)=>row(roman[i],withNumbers(q1Ops[i],values)));
  add(1,t('Read three overlapping sets','மூன்று வெட்டும் கணங்களைப் படித்தல்'),
    ['1. Using the adjacent Venn diagram, find the following sets:',...mark(q1Ops.map(m))],
    ['1. அருகில் உள்ள வென்படத்திலிருந்து கீழ்க்காணும் கணங்களைக் காண்க :',...mark(q1Ops.map(m))],
    [
      st('Read all the elements inside each circle. An element in the centre belongs to all three sets.',
        'ஒவ்வொரு வட்டத்திலும் உள்ள உறுப்புகளைப் படிக்க. மையப் பகுதியின் உறுப்பு மூன்று கணங்களிலும் உள்ளது.',membership,
        [withNumbers('A',q1A),withNumbers('B',q1B),withNumbers('C',q1C),withNumbers('U',q1U)]),
      st('Remove the elements of B from A and the elements of C from B.',
        'A இலிருந்து B இன் உறுப்புகளையும் B இலிருந்து C இன் உறுப்புகளையும் நீக்குக.',split,q1Ans.slice(0,2)),
      st('Find the complements of A and B within the rectangle. Use them for the next union and intersection.',
        'செவ்வகத்திற்குள் A, B ஆகியவற்றின் நிரப்புக் கணங்களைக் காண்க. அவற்றைப் பயன்படுத்திச் சேர்ப்பையும் வெட்டையும் காண்க.',complement,
        [withNumbers('A′',aPrime),withNumbers('B′',bPrime),...q1Ans.slice(2,4)]),
      st('Find the union of B and C first. Its complement is outside both circles. Remove the union from A for (vi).',
        'முதலில் B, C இன் சேர்ப்பைக் காண்க. அதன் நிரப்புக் கணம் இரு வட்டங்களுக்கு வெளியே உள்ளது. (vi) க்கு A இலிருந்து அந்தச் சேர்ப்பை நீக்குக.',bracket,
        [withNumbers('B∪C',join(q1B,q1C)),...q1Ans.slice(4,6)]),
      st('Find the intersection of B and C. Remove those members from A.',
        'B, C இன் வெட்டைக் காண்க. அதன் உறுப்புகளை A இலிருந்து நீக்குக.',split,[withNumbers('B∩C',cap(q1B,q1C)),q1Ans[6]])
    ],q1Ans,t('Read the entire rectangle for U. For each operation start by deciding which regions it uses.',
      'U க்கு முழுச் செவ்வகத்தையும் படிக்க. ஒவ்வொரு கணச் செயலுக்கும் தேவையான பகுதிகளை முதலில் கண்டறிக.'),
    fig(1,t('A only: 4, 6. B only: 5, 7. C only: 0, −3. A and B only: −1. A and C only: 3. B and C only: 8. All three: −2. Outside every circle: 1, 2.',
      'A மட்டும் 4, 6. B மட்டும் 5, 7. C மட்டும் 0, −3. A, B மட்டும் −1. A, C மட்டும் 3. B, C மட்டும் 8. மூன்றிலும் −2. அனைத்து வட்டங்களுக்கும் வெளியே 1, 2.'),t('Venn diagram given in Q1','வினா 1 இல் கொடுத்துள்ள வென்படம்')));

  const k=[...'abdef'],l=[...'bcdg'],mm=[...'abcdh'];
  const q2Ops=['K∪(L∩M)','K∩(L∪M)','(K∪L)∩(K∪M)','(K∩L)∪(K∩M)'];
  const q2Values=[join(k,cap(l,mm)),cap(k,join(l,mm)),cap(join(k,l),join(k,mm)),join(cap(k,l),cap(k,mm))];
  const q2Ans=q2Values.map((values,i)=>row(roman[i],eq(q2Ops[i],values)));
  add(2,t('Compare both distributive laws','இரு பங்கீட்டு விதிகளையும் ஒப்பிடுதல்'),
    ['2. If ',...listed(['K','L','M'],[k,l,mm],'en'),', then find the following:',...mark(q2Ops.map(m)),'\nand verify distributive laws.'],
    ['2. ',...listed(['K','L','M'],[k,l,mm],'ta'),' என்ற கணங்களுக்குப் பங்கீட்டு விதிகளைச் சரிபார்க்க:',...mark(q2Ops.map(m))],
    [
      st('Compute the two bracketed operations on L and M. Apply K to each result.',
        'L, M மீது அடைப்புக்குறிக்குள் கொடுக்கப்பட்ட இரண்டு செயல்களையும் செய்க. கிடைத்த ஒவ்வொரு கணத்துடனும் K ஐப் பயன்படுத்துக.',bracket,
        [eq('L∩M',cap(l,mm)),q2Ans[0],eq('L∪M',join(l,mm)),q2Ans[1]]),
      st('Find both unions involving K and take their intersection.',
        'K உடன் உள்ள இரண்டு சேர்ப்புகளையும் காண்க. அவற்றின் வெட்டைக் காண்க.',overlap,[eq('K∪L',join(k,l)),eq('K∪M',join(k,mm)),q2Ans[2]]),
      st('Find both intersections involving K and combine their members.',
        'K உடன் உள்ள இரண்டு வெட்டுகளையும் காண்க. பின் அவற்றின் சேர்ப்பைக் காண்க.',overlap,
        [eq('K∩L',cap(k,l)),eq('K∩M',cap(k,mm)),q2Ans[3]]),
      st('Parts (i) and (iii) give the same set. Parts (ii) and (iv) also give the same set.',
        '(i), (iii) ஆகியவற்றுக்கு ஒரே கணம் கிடைக்கிறது. அதேபோல் (ii), (iv) ஆகியவற்றுக்கும் ஒரே கணம் கிடைக்கிறது.',same,
        [m('K∪(L∩M) = (K∪L)∩(K∪M)'),m('K∩(L∪M) = (K∩L)∪(K∩M)')])
    ],q2Ans,t('Find the four requested sets separately. Then compare pairs of results that contain the same elements.',
      'கேட்டுள்ள நான்கு கணங்களையும் தனித்தனியாகக் காண்க. ஒரே உறுப்புகளைக் கொண்ட விடைகளைச் சோடியாக ஒப்பிடுக.'),{setConcept:'properties'});

  const q3A=[-1,0,1,2,3,4],q3B=[0,1,2,3,4,5],q3C=[-4,-1,0,2,3,4];
  const distr1='A∪(B∩C) = (A∪B)∩(A∪C)',distr2='A∩(B∪C) = (A∩B)∪(A∩C)';
  const q3GivenA=tex('A = {x : x ∈ Z, −2 < x ≤ 4}','A=\\{x:x\\in\\mathbb Z,\\ -2<x\\le4\\}');
  const q3GivenB=tex('B={x : x ∈ W, x ≤ 5}','B=\\{x:x\\in\\mathbb W,\\ x\\le5\\}');
  const q3GivenC=withNumbers('C',q3C);
  const q3Left=t(withNumbers('A∪(B∩C)',join(q3A,cap(q3B,q3C))),withNumbers('A∩(B∪C)',cap(q3A,join(q3B,q3C))));
  const q3Right=t(withNumbers('(A∪B)∩(A∪C)',cap(join(q3A,q3B),join(q3A,q3C))),
    withNumbers('(A∩B)∪(A∩C)',join(cap(q3A,q3B),cap(q3A,q3C))));
  add(3,t('Check a distributive law with number sets','எண் கணங்களுக்குப் பங்கீட்டு விதியைச் சரிபார்த்தல்'),
    ['3. If ',q3GivenA,', ',q3GivenB,', ',q3GivenC,', then verify ',m(distr1),'.'],
    ['3. ',q3GivenA,', ',q3GivenB,', மற்றும் ',q3GivenC,' என்ற கணங்களுக்கு ',m(distr2),' என்பதைக் சரிபார்க்க.'],
    [
      st('List the integers in A and the whole numbers in B.',
        'A இல் உள்ள முழுக்களையும் B இல் உள்ள முழு எண்களையும் பட்டியலிடுக.',
        t('A excludes −2 but includes 4. B starts at 0 and includes 5.',
          'A இல் −2 சேராது. 4 சேரும். B இல் 0 முதல் 5 வரை உள்ள எண்கள் இடம்பெறும்.'),[withNumbers('A',q3A),withNumbers('B',q3B)]),
      st('Find the common elements of B and C first, then join them with A.',
        'முதலில் B, C இன் சேர்ப்பைக் காண்க. அதனுடன் A இன் வெட்டைக் காண்க.',bracket,
        [withNumbers('B∩C',cap(q3B,q3C)),q3Left.en],[withNumbers('B∪C',join(q3B,q3C)),q3Left.ta]),
      st('Take the intersection of the two unions. It is the same set as the left side.',
        'A உடன் B இன் வெட்டையும் A உடன் C இன் வெட்டையும் காண்க. அவற்றின் சேர்ப்பு இடப்பக்கத்துடன் சமம்.',same,
        [withNumbers('A∪B',join(q3A,q3B)),withNumbers('A∪C',join(q3A,q3C)),q3Right.en],
        [withNumbers('A∩B',cap(q3A,q3B)),withNumbers('A∩C',cap(q3A,q3C)),q3Right.ta])
    ],t([q3Left.en,q3Right.en],[q3Left.ta,q3Right.ta]),bracket,{setConcept:'properties'});

  add(4,t('Draw both sides of the distributive law','பங்கீட்டு விதியின் இருபக்கங்களையும் வரைதல்'),
    ['4. Verify ',m(distr1),' using Venn diagrams.'],
    ['4. வென்படங்களைப் பயன்படுத்தி ',m(distr1),' என்பதைக் சரிபார்க்க.'],
    [
      st('Draw three overlapping circles. For the left side shade the common region of B and C, then include all of A.',
        'ஒன்றையொன்று வெட்டும் மூன்று வட்டங்களை வரைக. இடப்பக்கத்திற்கு B, C இன் பொதுப் பகுதியை நிழலிட்டு அதனுடன் A முழுவதையும் சேர்க்க.',bracket,
        [m('A∪(B∩C)')]),
      st('For the right side keep only points included in both unions. Every point of A remains, along with points in both B and C outside A.',
        'வலப்பக்கத்திற்கு இரண்டு சேர்ப்புகளிலும் உள்ள புள்ளிகளை மட்டும் எடுக்க. A இன் எல்லாப் புள்ளிகளும், A க்கு வெளியே B, C இரண்டிலும் உள்ள புள்ளிகளும் எஞ்சும்.',overlap,
        [m('(A∪B)∩(A∪C)')]),
      st('The two diagrams shade the same regions. They represent equal sets.',
        'இரு படங்களிலும் ஒரே பகுதிகள் நிழலிடப்பட்டுள்ளன. அவை சம கணங்களைக் குறிக்கின்றன.',membership,[m(distr1)])
    ],[m(distr1)],t('Draw the left side and right side in two separate copies of the same diagram.',
      'ஒரே வென்படத்தை இருமுறை வரைந்து, இடப்பக்கத்தையும் வலப்பக்கத்தையும் தனித்தனியாகக் குறிக்க.'),{
      setConcept:'properties',...fig(4,t('Both diagrams shade all of A and the part of the B–C overlap outside A.',
        'இரு படங்களிலும் A முழுவதும், A க்கு வெளியே உள்ள B, C இன் பொதுப் பகுதியும் நிழலிடப்பட்டுள்ளன.'),
      t('Shading of the left and right expressions','இடப்பக்க, வலப்பக்கக் கோவைகளின் நிழலிட்ட பகுதிகள்'),true)
    });

  const subIntersection='A−(B∩C) = (A−B)∪(A−C)';
  const subUnion='A−(B∪C) = (A−B)∩(A−C)';
  function verifyDifference({number,title,prompt,sets,innerIsIntersection,rosterSteps=[],format=eq}) {
    const [a,b,c]=sets, operator=innerIsIntersection?'∩':'∪', expression=innerIsIntersection?subIntersection:subUnion;
    const parent=innerIsIntersection?cap(b,c):join(b,c);
    const left=sub(a,parent),aMinusB=sub(a,b),aMinusC=sub(a,c);
    const right=innerIsIntersection?join(aMinusB,aMinusC):cap(aMinusB,aMinusC);
    const conclusions=[format('A−(B'+operator+'C)',left),format(innerIsIntersection?'(A−B)∪(A−C)':'(A−B)∩(A−C)',right)];
    add(number,title,prompt.en,prompt.ta,[
      ...rosterSteps,
      st('Find the set within parentheses and remove its members from A.',
        'அடைப்புக்குறிக்குள் உள்ள கணத்தைக் கண்டு, அதன் உறுப்புகளை A இலிருந்து நீக்குக.',bracket,
        [format('B'+operator+'C',parent),conclusions[0]]),
      st('Find both differences before performing the final set operation on the right.',
        'வலப்பக்கத்தில் இறுதிக் கணச் செயலைச் செய்யும் முன் இரண்டு கண வித்தியாசங்களையும் காண்க.',split,
        [format('A−B',aMinusB),format('A−C',aMinusC),conclusions[1]]),
      st('The two sides give the same roster. This verifies the stated identity for these sets.',
        'இருபக்கத்திலும் ஒரே உறுப்புப் பட்டியல் கிடைக்கிறது. எனவே இக்கணங்களுக்குக் கொடுத்துள்ள முற்றொருமை சரிபார்க்கப்படுகிறது.',same,[m(expression)])
    ],conclusions,bracket);
  }
  const q5=[ [...'bcegh'],[...'acdgi'],[...'adegh'] ];
  verifyDifference({number:5,title:t('Subtract a common set of letters','பொதுவான எழுத்துகளின் கணத்தைக் கழித்தல்'),
    prompt:t(['5. If ',...listed(['A','B','C'],q5,'en'),', then show that ',m(subIntersection),'.'],
      ['5. ',...listed(['A','B','C'],q5,'ta'),' எனில், ',m(subIntersection),' எனக்காட்டுக.']),
    sets:q5,innerIsIntersection:true});

  const q6=[[0,6,12,18,24,30],[6,8,10,12,14,16,18],[12,15,18,21,24,27]];
  const q6Rules=t([
    tex('A = {x : x = 6n, n ∈ W and n<6}','A=\\{x:x=6n,\\ n\\in\\mathbb W\\text{ and }n<6\\}'),
    tex('B = {x : x = 2n, n ∈ N and 2<n≤9}','B=\\{x:x=2n,\\ n\\in\\mathbb N\\text{ and }2<n\\le9\\}'),
    tex('C = {x : x = 3n, n ∈ N and 4≤n<10}','C=\\{x:x=3n,\\ n\\in\\mathbb N\\text{ and }4\\le n<10\\}')
  ],[
    'A = {x : x = 6n, n ∈ W மற்றும் n<6}',
    'B = {x : x = 2n, n ∈ N மற்றும் 2<n≤9}',
    'C = {x : x = 3n, n ∈ N மற்றும் 4≤n<10}'
  ]);
  verifyDifference({number:6,title:t('Subtract sets defined by multiples','மடங்குகளால் வரையறுக்கப்பட்ட கணங்களைக் கழித்தல்'),
    prompt:t(['6. If ',q6Rules.en[0],', ',q6Rules.en[1],' and\n',q6Rules.en[2],', then show that ',m(subIntersection)],
      ['6. ',q6Rules.ta[0],', ',q6Rules.ta[1],' மற்றும் ',q6Rules.ta[2],' எனில், ',m(subIntersection),' எனக் காட்டுக.']),
    sets:q6,innerIsIntersection:true,format:withNumbers,
    rosterSteps:[st('List the three sets using respectively n = 0 through 5, 3 through 9, and 4 through 9.',
      'முறையே 0 முதல் 5 வரை, 3 முதல் 9 வரை, 4 முதல் 9 வரை n இன் மதிப்புகளைப் பயன்படுத்தி மூன்று கணங்களையும் பட்டியலிடுக.',
      t('The inequalities specify which multipliers to substitute, including zero for the whole-number rule.',
        'பிரதியிட வேண்டிய பெருக்கிகளைச் சமனின்மைகள் தீர்மானிக்கின்றன. முழு எண்களுக்கான விதியில் பூச்சியமும் அடங்கும்.'),
      q6.map((set,i)=>withNumbers('ABC'[i],set)))]
  });

  const q7=[[-2,0,1,3,5],[-1,0,2,5,6],[-1,2,5,6,7]];
  verifyDifference({number:7,title:t('Remove a union from A','A இலிருந்து சேர்ப்பைக் கழித்தல்'),
    prompt:t(['7. If ',...listed(['A','B','C'],q7,'en'),', then show that ',m(subUnion),'.'],
      ['7. ',...listed(['A','B','C'],q7,'ta'),' எனில், ',m(subUnion),' எனக் காட்டுக.']),
    sets:q7,format:withNumbers});

  // Represent halves by doubled integers so the membership comparison is exact.
  const q8=[[1,2,3,4,5,6],[-1,1,3,5,7],[-2,-1,2,3,4]];
  const half = v => v%2 ? (v<0?'−':'')+Math.abs(v)+'/2' : String(v/2).replace('-','−');
  const halfTex = v => v%2 ? (v<0?'-':'')+'\\dfrac{'+Math.abs(v)+'}{2}' : String(v/2);
  const halfEq = (lhs,values) => tex(lhs+' = '+roster(values.map(half)),m(lhs).latex+'=\\{'+values.map(halfTex).join(',\\,')+'\\}');
  const q8A=t(
    tex('A = {y : y = (a + 1)/2, a ∈ W and a ≤ 5}','A=\\{y:y=\\dfrac{a+1}{2},\\ a\\in\\mathbb W\\text{ and }a\\le5\\}'),
    [tex('A = {y : y = (a + 1)/2, a ∈ W','A=\\{y:y=\\dfrac{a+1}{2},\\ a\\in\\mathbb W'),' மற்றும் ',m('a ≤ 5}')]
  );
  const q8B=t(
    tex('B = {y : y = (2n − 1)/2, n ∈ W and n < 5}','B=\\{y:y=\\dfrac{2n-1}{2},\\ n\\in\\mathbb W\\text{ and }n<5\\}'),
    [tex('B = {y : y = (2n − 1)/2, n ∈ W','B=\\{y:y=\\dfrac{2n-1}{2},\\ n\\in\\mathbb W'),' மற்றும் ',m('n < 5}')]
  );
  verifyDifference({number:8,title:t('Remove sets containing halves','அரைப் பின்னங்கள் உள்ள கணங்களைக் கழித்தல்'),
    prompt:t(['8. If ',q8A.en,', ',q8B.en,' and\n',halfEq('C',q8[2]),', then show that ',m(subUnion),'.'],
      ['8. ',...q8A.ta,', ',...q8B.ta,' மற்றும் ',halfEq('C',q8[2]),' எனில், ',m(subUnion),' எனக் காட்டுக.']),
    sets:q8,format:halfEq,
    rosterSteps:[st('Substitute the whole numbers 0 through 5 in A and 0 through 4 in B. Simplify each fraction.',
      'A இல் 0 முதல் 5 வரையிலும் B இல் 0 முதல் 4 வரையிலும் முழு எண்களைப் பிரதியிடுக. ஒவ்வொரு பின்னத்தையும் சுருக்குக.',
      t('Writing a roster makes it possible to compare each half or whole number exactly.',
        'பட்டியல் முறையில் எழுதினால் ஒவ்வொரு அரைப் பின்னத்தையும் முழு எண்ணையும் துல்லியமாக ஒப்பிடலாம்.'),
      [halfEq('A',q8[0]),halfEq('B',q8[1])])]
  });

  add(9,t('Compare the two difference diagrams','இரு கண வித்தியாசங்களுக்கான படங்களை ஒப்பிடுதல்'),
    ['9. Verify ',m(subIntersection),' using Venn diagrams.'],
    ['9. வென்படங்களைப் பயன்படுத்தி ',m(subIntersection),' என்பதைக் சரிபார்க்க.'],
    [
      st('On the first diagram shade A, leaving out any point that also belongs to both B and C.',
        'முதல் படத்தில் B, C இரண்டிலும் உள்ள புள்ளிகளைத் தவிர்த்து A ஐ நிழலிடுக.',split,[m('A−(B∩C)')]),
      st('On the second diagram combine the parts of A outside B with the parts of A outside C.',
        'இரண்டாவது படத்தில் B க்கு வெளியே உள்ள A இன் பகுதிகளையும் C க்கு வெளியே உள்ள A இன் பகுதிகளையும் சேர்த்து நிழலிடுக.',overlap,
        [m('(A−B)∪(A−C)')]),
      st('Both diagrams shade A except for the triple overlap.',
        'மூன்று வட்டங்களின் பொதுப் பகுதியைத் தவிர A இன் அனைத்துப் பகுதிகளும் இரு படங்களிலும் நிழலிடப்பட்டுள்ளன.',membership,[m(subIntersection)])
    ],[m(subIntersection)],t('Which part of A is in both B and C? Compare what each expression leaves unshaded.',
      'A இன் எந்தப் பகுதி B, C இரண்டிலும் உள்ளது? ஒவ்வொரு கோவையிலும் நிழலிடப்படாதவற்றை ஒப்பிடுக.'),
    fig(9,t('Both diagrams shade the whole of A except the central region shared by A, B and C.',
      'இரு படங்களிலும் A, B, C மூன்றின் பொதுப் பகுதியைத் தவிர A முழுவதும் நிழலிடப்பட்டுள்ளது.'),
      t('Same shading for both set expressions','இரு கணக் கோவைகளுக்கும் ஒரே நிழலிடல்'),true));

  const q10=[ [4,7,8,10,11,12,15,16],[7,8,11,12],[4,8,12,15] ];
  const [u10,a10,b10]=q10, ap10=sub(u10,a10),bp10=sub(u10,b10),union10=join(a10,b10),common10=cap(a10,b10);
  const de2='(A∩B)′ = A′∪B′';
  const q10Final=[withNumbers('(A∪B)′ = A′∩B′',sub(u10,union10)),withNumbers('(A∩B)′ = A′∪B′',sub(u10,common10))];
  add(10,t('Verify both of De Morgan’s laws','டி மார்கனின் இரு விதிகளையும் சரிபார்த்தல்'),
    ['10. If ',...listed(['U','A','B'],q10,'en'),', then verify De Morgan’s Laws for complementation.'],
    ['10. ',...listed(['U','A','B'],q10,'ta'),' எனில், டி மார்கனின் கணநிரப்பிற்கான விதிகளைச் சரிபார்க்க.'],
    [
      st('Find the complements of A and B in U.',
        'U இல் A, B ஆகிய கணங்களின் நிரப்புக் கணங்களைக் காண்க.',complement,[withNumbers('A′',ap10),withNumbers('B′',bp10)]),
      st('Take the complement of the union and compare it with the intersection of the two complements.',
        'சேர்ப்பின் நிரப்புக் கணத்தைக் கண்டு அதை இரண்டு நிரப்புக் கணங்களின் வெட்டுடன் ஒப்பிடுக.',same,
        [withNumbers('A∪B',union10),withNumbers('(A∪B)′',sub(u10,union10)),withNumbers('A′∩B′',cap(ap10,bp10))]),
      st('Take the complement of the intersection and compare it with the union of the two complements.',
        'வெட்டின் நிரப்புக் கணத்தைக் கண்டு அதை இரண்டு நிரப்புக் கணங்களின் சேர்ப்புடன் ஒப்பிடுக.',same,
        [withNumbers('A∩B',common10),withNumbers('(A∩B)′',sub(u10,common10)),withNumbers('A′∪B′',join(ap10,bp10))])
    ],q10Final,t('Keep the order of operations clear. First find the set, then take its complement in U.',
      'கணச் செயல்களின் வரிசையைக் கவனிக்க. முதலில் கணத்தைக் கண்டு அதன் பிறகு U இல் அதன் நிரப்புக் கணத்தைக் காண்க.'));

  add(11,t('Show De Morgan’s law on two diagrams','இரு வென்படங்களில் டி மார்கன் விதியைக் காட்டுதல்'),
    ['11. Verify ',m(de2),' using Venn diagrams.'],
    ['11. வென்படங்களைப் பயன்படுத்தி ',m(de2),' என்பதைக் சரிபார்க்க.'],
    [
      st('Draw a rectangle and two overlapping circles. Shade everything except the common region on the first diagram.',
        'ஒரு செவ்வகத்தையும் அதனுள் ஒன்றையொன்று வெட்டும் இரு வட்டங்களையும் வரைக. முதல் படத்தில் பொதுப் பகுதியைத் தவிர அனைத்தையும் நிழலிடுக.',complement,
        [m('(A∩B)′')]),
      st('In the second diagram shade everything outside A or outside B. The common region is the only part left unshaded.',
        'இரண்டாம் படத்தில் A க்கு வெளியேயோ B க்கு வெளியேயோ உள்ள பகுதிகளை நிழலிடுக. பொதுப் பகுதி மட்டும் நிழலிடப்படாது.',membership,
        [m('A′∪B′')]),
      st('Every region has the same shading in both diagrams. The two sets are equal.',
        'இரண்டு படங்களிலும் ஒவ்வொரு பகுதியின் நிழலிடலும் ஒன்றே. எனவே இரண்டு கணங்களும் சமம்.',same,[m(de2)])
    ],[m(de2)],t('Compare the shading region by region, including the part outside both circles.',
      'இரு வட்டங்களுக்கும் வெளியே உள்ள பகுதி உட்பட ஒவ்வொரு பகுதியின் நிழலிடலையும் ஒப்பிடுக.'),
    fig(11,t('In both diagrams the left-only, right-only and outside regions are shaded. The overlap is clear.',
      'இரு படங்களிலும் இடப்புற, வலப்புறத் தனிப்பகுதிகளும் வெளிப்பகுதியும் நிழலிடப்பட்டுள்ளன. பொதுப் பகுதி நிழலிடப்படவில்லை.'),
      t('The same three regions are shaded','ஒரே மூன்று பகுதிகள் நிழலிடப்பட்டுள்ளன'),true));

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
