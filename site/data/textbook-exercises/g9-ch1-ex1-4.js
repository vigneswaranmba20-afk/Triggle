/* TN SCERT 2025, Exercise 1.4: commutative and associative set operations. */
(() => {
  'use strict';
  const t = (en, ta) => ({en,ta});
  const f = (fallback, latex, display=false) => ({fallback,latex,display});
  const plain = cells => cells.map(cell => cell.fallback ?? cell).join('');
  const math = rows => f(rows.map(row=>row.fallback).join('\n'),
    '\\begin{aligned}'+rows.map(row=>'&'+row.latex).join('\\\\')+'\\end{aligned}',true);
  const step = (en,ta,why,rows) => {
    const rendered=math(rows);
    return {en,ta,why,eq:rendered.fallback,math:rendered};
  };
  const hints = {
    union:t('A union keeps every member from either set once. Grouping changes which union is computed first.',
      'ஏதேனும் ஒரு கணத்தில் உள்ள ஒவ்வோர் உறுப்பையும் சேர்ப்பில் ஒருமுறை மட்டும் எழுத வேண்டும். அடைப்புக்குறியின் இடத்தை மாற்றும்போது முதலில் காணும் சேர்ப்பு மாறும்.'),
    intersection:t('An intersection keeps only common members. A member of the intersection of three sets must be in each of them.',
      'வெட்டுக் கணத்தில் பொது உறுப்புகள் மட்டுமே இருக்கும். மூன்று கணங்களின் வெட்டில் உள்ள ஓர் உறுப்பு மூன்று கணங்களிலும் இருக்க வேண்டும்.'),
    order:t('The commutative property compares the results when the sets are swapped. Test each operation separately.',
      'கணங்களின் வரிசையை மாற்றும்போது கிடைக்கும் விடைகளைப் பரிமாற்றுப் பண்பு ஒப்பிடுகிறது. ஒவ்வொரு கணச் செயலையும் தனியாகச் சரிபார்க்க வேண்டும்.'),
    grouping:t('Start with the operation in parentheses. Compare the two results after computing both groupings.',
      'அடைப்புக்குறிக்குள் உள்ள கணச் செயலை முதலில் செய்க. இரண்டு தொகுப்புகளுக்கும் கணக்கிட்ட பிறகு கிடைக்கும் விடைகளை ஒப்பிடுக.')
  };
  const entry = (number,title,en,ta,steps,answer,hint) => {
    const rendered=math(answer);
    return {
      id:'g9-ch1-ex1.4-q'+number,classNum:9,chapter:'1',exercise:'1.4',kind:'textbook',
      topic:t('Set Language','கண மொழி'),
      label:t('Exercise 1.4 · Q'+number,'பயிற்சி 1.4 · வினா '+number),title,
      q:t(plain(en),plain(ta)),questionMath:t(en,ta),
      steps,answer:rendered.fallback,answerMath:rendered,
      hint,setConcept:'properties',notationSource:'authored',
      edition:'2025',source:'https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view',
      reference:'TN SCERT Grade 9 Mathematics, revised 2025, Exercise 1.4 Q'+number,
      sourceFidelity:{status:'page-visual-checked',manifest:'site/data/textbook-fidelity/g9-ch1-ex1-4.json'},
      review:{tamilEditorial:'pending',teacher:'pending'}
    };
  };
  const eq = (left, leftTex, right, rightTex = '\\{'+right+'\\}') => f(left+' = {'+right+'}',leftTex+'='+rightTex);
  const roster = (name, contents) => eq(name,name,contents);
  const p=roster('P','1,2,5,7,9'),q=roster('Q','2,3,5,9,11'),r=roster('R','3,4,5,7,9'),s=roster('S','2,3,4,5,8');
  const q1Ops=[
    '(P∪Q)∪R','(P∩Q)∩S','(Q∩S)∩R'
  ].map((symbol,i)=>f(symbol,['(P\\cup Q)\\cup R','(P\\cap Q)\\cap S','(Q\\cap S)\\cap R'][i]));
  const q1Requirements=['\n(i) ',q1Ops[0],'   (ii) ',q1Ops[1],'   (iii) ',q1Ops[2]];
  const q1Final=[
    eq('(i) '+q1Ops[0].fallback,'\\text{(i)}\\quad'+q1Ops[0].latex,'1,2,3,4,5,7,9,11'),
    eq('(ii) '+q1Ops[1].fallback,'\\text{(ii)}\\quad'+q1Ops[1].latex,'2,5'),
    eq('(iii) '+q1Ops[2].fallback,'\\text{(iii)}\\quad'+q1Ops[2].latex,'3,5')
  ];
  const q2Sets = t(
    [f('P = {x : x is a real number between 2 and 7}','P=\\{x:\\text{x is a real number between 2 and 7}\\}'),
      f('Q = {x : x is a rational number between 2 and 7}','Q=\\{x:\\text{x is a rational number between 2 and 7}\\}')],
    // Tamil prose inside a roster stays in the text flow so it uses the page's Tamil font.
    ['P = {x : x ஆனது 2 மற்றும் 7 –க்கு இடையே உள்ள ஒரு மெய்யெண்}',
      'Q = {x : x ஆனது 2 மற்றும் 7 –க்கு இடையே உள்ள ஒரு விகிதமுறு எண்}']
  );
  const q2Final=[f('P∪Q = Q∪P = P','P\\cup Q=Q\\cup P=P'),f('P∩Q = Q∩P = Q','P\\cap Q=Q\\cap P=Q')];
  const a3=roster('A','p,q,r,s'),b3=roster('B','m,n,q,s,t'),c3=roster('C','m,n,p,q,s');
  const q3Left=eq('(A∪B)∪C','(A\\cup B)\\cup C','m,n,p,q,r,s,t');
  const q3Right=eq('A∪(B∪C)','A\\cup(B\\cup C)','m,n,p,q,r,s,t');
  const q3Final=f('(A∪B)∪C = A∪(B∪C) = {m,n,p,q,r,s,t}',
    '\\begin{gathered}(A\\cup B)\\cup C=A\\cup(B\\cup C)\\\\=\\{m,n,p,q,r,s,t\\}\\end{gathered}');
  const a4=eq('A','A','−11,√2,√5,7','\\{-11,\\sqrt{2},\\sqrt{5},7\\}');
  const b4=eq('B','B','√3,√5,6,13','\\{\\sqrt{3},\\sqrt{5},6,13\\}');
  const c4=eq('C','C','√2,√3,√5,9','\\{\\sqrt{2},\\sqrt{3},\\sqrt{5},9\\}');
  const q4Left=eq('(A∩B)∩C','(A\\cap B)\\cap C','√5','\\{\\sqrt{5}\\}');
  const q4Right=eq('A∩(B∩C)','A\\cap(B\\cap C)','√5','\\{\\sqrt{5}\\}');
  const q4Final=f('(A∩B)∩C = A∩(B∩C) = {√5}',
    '\\begin{gathered}(A\\cap B)\\cap C=A\\cap(B\\cap C)\\\\=\\{\\sqrt{5}\\}\\end{gathered}');
  const a5=f('A={x : x = 2ⁿ, n ∈ W and n<4}','A=\\{x:x=2^n,\\ n\\in\\mathbb W\\text{ and }n<4\\}');
  const b5=f('B={x : x = 2n, n ∈ N and n ≤ 4}','B=\\{x:x=2n,\\ n\\in\\mathbb N\\text{ and }n\\le 4\\}');
  const a5Tamil=[f('A={x : x = 2ⁿ, n ∈ W','A=\\{x:x=2^n,\\ n\\in\\mathbb W'),
    ' மற்றும் ',f('n<4}','n<4\\}')];
  const b5Tamil=[f('B={x : x = 2n, n ∈ N','B=\\{x:x=2n,\\ n\\in\\mathbb N'),
    ' மற்றும் ',f('n≤4}','n\\le4\\}')];
  const c5=roster('C','0,1,2,5,6');
  const q5Left=eq('(A∩B)∩C','(A\\cap B)\\cap C','2');
  const q5Right=eq('A∩(B∩C)','A\\cap(B\\cap C)','2');
  const q5Final=f('(A∩B)∩C = A∩(B∩C) = {2}','\\begin{gathered}(A\\cap B)\\cap C=A\\cap(B\\cap C)\\\\=\\{2\\}\\end{gathered}');

  const entries=[
    entry(1,t('Group unions and intersections','சேர்ப்புகளையும் வெட்டுகளையும் தொகுத்தல்'),
      ['1. If ',p,', ',q,', ',r,' and ',s,', then find',...q1Requirements],
      ['1. ',p,', ',q,', ',r,' மற்றும் ',s,' எனில்,',...q1Requirements,' ஆகியவற்றைக் காண்க.'],
      [
        step('(i) Take the union of P and Q, then include the members of R.','(i) முதலில் P மற்றும் Q இன் சேர்ப்பைக் காண்க. பிறகு அதனுடன் R இன் உறுப்புகளைச் சேர்க்க.',
          hints.union,[eq('P∪Q','P\\cup Q','1,2,3,5,7,9,11'),q1Final[0]]),
        step('(ii) Find the members common to P and Q, then keep the ones also in S.','(ii) P, Q இன் பொது உறுப்புகளைக் காண்க. அவற்றில் S இலும் உள்ள உறுப்புகளை மட்டும் எடுக்க.',
          hints.intersection,[eq('P∩Q','P\\cap Q','2,5,9'),q1Final[1]]),
        step('(iii) Find the members common to Q and S, then keep the ones also in R.','(iii) Q, S இன் பொது உறுப்புகளைக் காண்க. அவற்றில் R இலும் உள்ள உறுப்புகளை மட்டும் எடுக்க.',
          hints.intersection,[eq('Q∩S','Q\\cap S','2,3,5'),q1Final[2]])
      ],q1Final,hints.grouping),
    entry(2,t('Swap the order of two sets','இரு கணங்களின் வரிசையை மாற்றுதல்'),
      ['2. Test for the commutative property of union and intersection of the sets\n',q2Sets.en[0],' and\n',q2Sets.en[1],'.'],
      ['2. பின்வரும் கணங்களுக்குப் பரிமாற்றுப் பண்புகளைச் சோதிக்க.\n',q2Sets.ta[0],' மற்றும்\n',q2Sets.ta[1]],
      [
        step('Every rational number between 2 and 7 is also a real number between 2 and 7.','2 க்கும் 7 க்கும் இடையேயுள்ள ஒவ்வொரு விகிதமுறு எண்ணும் அதே இடைவெளியிலுள்ள ஒரு மெய்யெண்.',
          hints.order,[f('Q ⊆ P','Q\\subseteq P')]),
        step('Every member of Q is already in P. Taking their union in either order gives P.','Q இன் ஒவ்வோர் உறுப்பும் P இல் ஏற்கெனவே உள்ளது. எந்த வரிசையில் சேர்த்தாலும் P கிடைக்கும்.',
          hints.union,[q2Final[0]]),
        step('The common members are exactly the members of Q in either order.','இரு வரிசைகளிலும் Q இன் உறுப்புகளே பொது உறுப்புகள்.',
          hints.intersection,[q2Final[1]])
      ],q2Final,hints.order),
    entry(3,t('Verify the associative law for union','சேர்ப்புக்கான சேர்ப்புப் பண்பைச் சரிபார்த்தல்'),
      ['3. If ',a3,', ',b3,' and ',c3,', then verify the associative property of union of sets.'],
      ['3. ',a3,', ',b3,' மற்றும் ',c3,' எனில், கணங்களின் சேர்ப்புக்கான சேர்ப்புப் பண்புகளைச் சரிபார்க்க.'],
      [
        step('Group A and B first. The final union also contains every member of C.','முதலில் A, B ஆகியவற்றைத் தொகுக்க. இறுதிச் சேர்ப்பில் C இன் ஒவ்வோர் உறுப்பும் இடம்பெறும்.',
          hints.union,[eq('A∪B','A\\cup B','m,n,p,q,r,s,t'),q3Left]),
        step('Group B and C first, then include the members of A. The result is the same roster.','முதலில் B, C ஆகியவற்றைத் தொகுக்க. பிறகு A இன் உறுப்புகளைச் சேர்க்க. அதே பட்டியல் கிடைக்கிறது.',
          hints.grouping,[eq('B∪C','B\\cup C','m,n,p,q,s,t'),q3Right])
      ],[q3Final],hints.grouping),
    entry(4,t('Intersect sets containing radicals','வர்க்கமூலங்கள் உள்ள கணங்களின் வெட்டைக் காணுதல்'),
      ['4. Verify the associative property of intersection of sets for ',a4,',\n',b4,' and ',c4,'.'],
      ['4. ',a4,', ',b4,' மற்றும் ',c4,' ஆகியவற்றிற்குக் கணங்களின் வெட்டுக்கான சேர்ப்புப் பண்பினைச் சரிபார்க்க.'],
      [
        step('The only common member of A and B is square root of 5. It is also in C.','A, B ஆகியவற்றின் ஒரே பொது உறுப்பு 5 இன் வர்க்கமூலம். அது C இலும் உள்ளது.',
          hints.intersection,[eq('A∩B','A\\cap B','√5','\\{\\sqrt{5}\\}'),q4Left]),
        step('B and C have two common members. Only square root of 5 also occurs in A.','B, C ஆகியவற்றிற்கு இரண்டு பொது உறுப்புகள் உள்ளன. அவற்றில் 5 இன் வர்க்கமூலம் மட்டுமே A இலும் உள்ளது.',
          hints.grouping,[eq('B∩C','B\\cap C','√3,√5','\\{\\sqrt{3},\\sqrt{5}\\}'),q4Right])
      ],[q4Final],hints.grouping),
    entry(5,t('Compare powers of 2 and even numbers','அடுக்கு விதியையும் இரட்டைப்படை எண் விதியையும் ஒப்பிடுதல்'),
      ['5. If ',a5,', ',b5,' and\n',c5,', then verify the associative property of intersection of sets.'],
      ['5. ',...a5Tamil,', ',...b5Tamil,' மற்றும் ',c5,' எனில், கணங்களின் வெட்டுக்கான சேர்ப்புப் பண்பினைச் சரிபார்க்க.'],
      [
        step('List A using the exponents 0 through 3. List B using the multipliers 1 through 4.',
          'A க்கு 0 முதல் 3 வரை அடுக்குக்குறிகளைப் பயன்படுத்துக. B க்கு 1 முதல் 4 வரை பெருக்கிகளைப் பயன்படுத்துக.',
          t('The exponent rule for A uses whole numbers, including zero. The multiplier rule for B uses natural numbers, starting at one.',
            'A இன் அடுக்கு விதியில் பூச்சியம் உட்பட முழு எண்கள் பயன்படுகின்றன. B இன் பெருக்கல் விதியில் ஒன்றில் தொடங்கும் இயல் எண்கள் பயன்படுகின்றன.'),
          [eq('A','A','1,2,4,8'),eq('B','B','2,4,6,8')]),
        step('Intersect A and B first. Only 2 from the result belongs to C.','முதலில் A, B இன் வெட்டைக் காண்க. கிடைத்த உறுப்புகளில் 2 மட்டுமே C இல் உள்ளது.',
          hints.intersection,[eq('A∩B','A\\cap B','2,4,8'),q5Left]),
        step('Intersect B and C first. Only 2 from the result belongs to A, giving the same result.','முதலில் B, C இன் வெட்டைக் காண்க. கிடைத்த உறுப்புகளில் 2 மட்டுமே A இல் உள்ளதால் அதே விடை கிடைக்கிறது.',
          hints.grouping,[eq('B∩C','B\\cap C','2,6'),q5Right])
      ],[q5Final],hints.grouping)
  ];

  const grade=window.TRIGGLE_CLASSES?.[9];
  const chapter=window.TRIGGLE_CURRICULUM?.grades.find(grade=>grade.grade===9)?.chapters.find(chapter=>chapter.id==='g9-ch1');
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
