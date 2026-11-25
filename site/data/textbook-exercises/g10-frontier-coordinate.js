/* Grade 10 Coordinate Geometry source and signed-area corrections. */
(() => {
  'use strict';
  const tex=(latex,fallback,display=false)=>({latex,fallback,display});
  const step=(en,ta,latex,eq,why)=>({en,ta,math:tex(latex,eq,true),eq,...(why?{why}:{})});
  const signedArea={
    en:'The signed expression changes sign when the vertex order is reversed. Its absolute value gives twice the ordinary area.',
    ta:'முனைகளின் வரிசையைத் திருப்பினால் குறியுடன் கிடைக்கும் கோவையின் குறி மாறும். அதன் தனிமதிப்பு உண்மையான பரப்பின் இரு மடங்கு.'
  };
  const triangles={
    'c10-5-ex5-1-q3-i':{
      part:'i',vertices:tex(String.raw`(0,0),\,(p,8),\,(6,2)`,'(0, 0), (p, 8), (6, 2)'),area:20,
      determinant:'2p − 48',latex:'2p-48',positive:44,negative:4,
      derivation:step('The coordinates of the origin remove all products involving the first point. Subtract the remaining products to obtain the signed double area.',
        'ஆதியின் ஆயங்கள் இரண்டும் பூச்சியம். முதல் புள்ளி இடம்பெறும் பெருக்கல்கள் நீங்கும். எஞ்சிய பெருக்கல்களின் வித்தியாசம் குறியுடன் கூடிய இருமடங்குப் பரப்பு.',
        String.raw`D=p\cdot2-8\cdot6=2p-48`,'D = p × 2 − 8 × 6 = 2p − 48',signedArea),
      cases:String.raw`2p-48=40\Rightarrow p=44\\2p-48=-40\Rightarrow p=4`
    },
    'c10-5-ex5-1-q3-ii':{
      part:'ii',vertices:tex(String.raw`(p,p),\,(5,6),\,(5,-2)`,'(p, p), (5, 6), (5, −2)'),area:32,
      determinant:'8p − 40',latex:'8p-40',positive:13,negative:-3,
      derivation:step('The side along x = 5 has length 8. The signed double area equals 8 times the signed horizontal difference p − 5.',
        'x = 5 என்ற கோட்டில் உள்ள பக்கத்தின் நீளம் 8. குறியுடன் கூடிய கிடைமட்ட வித்தியாசமான p − 5 ஐ 8 ஆல் பெருக்கினால் குறியுடன் கூடிய இருமடங்குப் பரப்பு கிடைக்கும்.',
        String.raw`D=8(p-5)=8p-40`,'D = 8(p − 5) = 8p − 40',signedArea),
      cases:String.raw`8p-40=64\Rightarrow p=13\\8p-40=-64\Rightarrow p=-3`
    }
  };
  const quadData={
    'c10-5-ex5-1-q6':{
      area:28, expr:'21 − 7k', latex:'21-7k', positive:56, rejected:11, turns:'21,33,35,23',
      crossed:String.raw`\left(\dfrac{19}{18},\dfrac{239}{108}\right)`,point:'(19/18, 239/108)',
      edges:String.raw`BC: y-11=-\dfrac{13}{6}(x+3)\\DA: y+2=\dfrac{5}{6}(x+4)`,
      edgeText:'BC: y − 11 = (−13/6)(x + 3). DA: y + 2 = (5/6)(x + 4).'
    },
    'c10-5-unit-q4':{
      area:72, expr:'124 − 4k', latex:'124-4k', positive:144, rejected:67, turns:'35,38,109,106',
      crossed:String.raw`\left(-\dfrac{326}{217},\dfrac{4051}{651}\right)`,point:'(−326/217, 4051/651)',
      edges:String.raw`BC: y-67=-\dfrac{73}{3}(x+4)\\DA: y-7=-\dfrac{2}{9}(x+5)`,
      edgeText:'BC: y − 67 = (−73/3)(x + 4). DA: y − 7 = (−2/9)(x + 5).'
    }
  };
  function setAnswer(item,math,en,ta){
    item.answer=(math.fallback+' '+en).trim();
    item.answerTa=(math.fallback+' '+ta).trim();
    item.answerMath={en:[math,' '+en],ta:[math,' '+ta]};
  }
  function showTriangle(item,spec){
    const muted=String(spec.negative).replace('-','−');
    item.dataTable={
      headers:['Given','Value'],rows:[['Vertices in order',spec.vertices],['Area (square units)',spec.area]],caption:'Textbook data',
      ta:{headers:['கொடுக்கப்பட்டது','மதிப்பு'],rows:[['முனைப் புள்ளிகள் வரிசையில்',spec.vertices],['பரப்பு (சதுர அலகுகள்)',spec.area]],caption:'பாடநூல் தரவுகள்'},
      sourcePrompt:{en:{before:item.q.en.split('\n')[0]+' ('+spec.part+')'},ta:{before:item.q.ta.split('\n')[0]+' ('+spec.part+')'}}
    };
    item.steps=[spec.derivation,
      step('The area is half the absolute value of D. The determinant may take either sign unless the orientation is specified.',
        'D இன் தனிமதிப்பில் பாதியே முக்கோணத்தின் பரப்பு. சுற்றும் திசையைக் குறிப்பிடாவிட்டால் D நேர்மமாகவோ எதிர்மமாகவோ இருக்கலாம்.',
        String.raw`\left|${spec.latex}\right|=${2*spec.area}`,'|'+spec.determinant+'| = '+2*spec.area),
      step('Solve each sign separately. The answer key uses the anticlockwise order, which gives the positive determinant. The clockwise order also gives the printed area.',
        'இரு குறிகளுக்கும் தனித்தனியாகத் தீர்க்கவும். விடைக்குறிப்பு இடஞ்சுழி வரிசையைப் பயன்படுத்துகிறது. அதில் அணி அளவு நேர்மம். வலஞ்சுழி வரிசையிலும் கொடுக்கப்பட்ட பரப்பு கிடைக்கும்.',
        String.raw`\begin{gathered}${spec.cases}\end{gathered}`,'p = '+spec.positive+' or p = '+muted)
    ];
    setAnswer(item,tex(String.raw`p\in\{${spec.positive},${spec.negative}\}`,'p ∈ {'+spec.positive+', '+muted+'}'),
      'Both give the stated area. The anticlockwise convention gives '+spec.positive+'.',
      'இரு மதிப்புகளும் கொடுக்கப்பட்ட பரப்பைத் தருகின்றன. இடஞ்சுழி வரிசையில் விடை '+spec.positive+'.');
  }
  function showQuadrilateral(item,spec){
    const terms=item.id.includes('ex5-1')
      ? ['11 − 4k','3k − 10','11-4k','3k-10']
      : ['47 − 5k','−77 − k','47-5k','-77-k'];
    item.steps=[
      step('Use the shoelace products in the listed vertex order. For a quadrilateral whose sides do not cross, the area is half the absolute value of the difference.',
        'கொடுக்கப்பட்ட முனைகளின் வரிசையில் குறுக்குப் பெருக்கல்களைச் செய்க. பக்கங்கள் ஒன்றையொன்று குறுக்கிடாத நாற்கரத்திற்கு, வித்தியாசத்தின் தனிமதிப்பில் பாதியே பரப்பு.',
        String.raw`D=(${terms[2]})-(${terms[3]})=${spec.latex}`,'D = ('+terms[0]+') − ('+terms[1]+') = '+spec.expr,signedArea),
      step('Use the given area to obtain the two algebraic candidates. Then check that each candidate produces a simple quadrilateral.',
        'கொடுக்கப்பட்ட பரப்பைப் பயன்படுத்தி இரு மதிப்புகளைப் பெறுக. ஒவ்வொரு மதிப்பிற்கும் பக்கங்கள் குறுக்கிடாத நாற்கரம் கிடைக்கிறதா எனச் சரிபார்க்கவும்.',
        String.raw`\begin{gathered}|${spec.latex}|=${spec.positive}\\k\in\{-5,${spec.rejected}\}\end{gathered}`,
        '|'+spec.expr+'| = '+spec.positive+', k ∈ {−5, '+spec.rejected+'}'),
      step('For k = '+spec.rejected+', the equations of the non-adjacent sides BC and DA give the intersection below, which is inside both segments. The crossed shape is invalid.',
        'k = '+spec.rejected+' எனில் அடுத்தடுத்தவை அல்லாத BC, DA பக்கங்களின் சமன்பாடுகள் கீழே உள்ள வெட்டுப்புள்ளியைத் தருகின்றன. அது இரு கோட்டுத்துண்டுகளுக்கும் உள்ளே உள்ளது. எனவே இம்மதிப்பு குறுக்கிடாத நாற்கரத்தைக் கொடுக்காது.',
        String.raw`\begin{gathered}${spec.edges}\\BC\cap DA=${spec.crossed}\end{gathered}`,
        spec.edgeText+' BC ∩ DA = '+spec.point),
      step('For k = −5, the signed double areas of the consecutive triples ABC, BCD, CDA and DAB are all positive. The four turns go the same way and the sides do not cross. The area matches.',
        'k = −5 எனில் ABC, BCD, CDA, DAB ஆகிய அடுத்தடுத்த மும்முனைகளின் குறியுடனான இருமடங்குப் பரப்புகள் அனைத்தும் நேர்மம். நான்கு திருப்பங்களும் ஒரே திசையில் அமைகின்றன. பக்கங்கள் குறுக்கிடுவதில்லை. பரப்பு பொருந்துகிறது.',
        String.raw`\begin{gathered}${spec.turns}>0\\k=-5,\qquad \dfrac{|${spec.positive}|}{2}=${spec.area}\end{gathered}`,
        spec.turns+' all positive. k = −5. |'+spec.positive+'| / 2 = '+spec.area)
    ];
    setAnswer(item,tex('k=-5','k = −5'),'','');
  }
  function showTrapezium(item){
    item.steps=[
      step('The segments AB and CD are horizontal at different heights. They are parallel. To test the named quadrilateral, also check whether its non-adjacent sides cross.',
        'AB மற்றும் CD வெவ்வேறு உயரங்களில் கிடைமட்டமாக உள்ளன. எனவே அவை இணை. பெயரிடப்பட்ட நாற்கரத்திற்கு அடுத்தடுத்தவை அல்லாத பக்கங்கள் குறுக்கிடுகின்றனவா எனவும் பார்க்க வேண்டும்.',
        'm_{AB}=m_{CD}=0','Slope AB = slope CD = 0',{
          en:'Parallel sides alone do not make a trapezium if the other two sides cross inside the boundary.',
          ta:'மற்ற இரு பக்கங்களும் உள்ளே குறுக்கிட்டால், இரண்டு பக்கங்கள் இணையாக இருந்தாலும் அது சரிவகம் ஆகாது.'}),
      step('In the printed order ABCD, the other sides are BC and DA. Equating their line equations gives x = 6. This lies inside the horizontal range of each segment, so the sides cross.',
        'அச்சிட்ட ABCD வரிசையில் மற்ற பக்கங்கள் BC, DA. அவற்றின் நேர்க்கோட்டுச் சமன்பாடுகளைச் சமப்படுத்தினால் x = 6. இது இரு கோட்டுத்துண்டுகளின் x எல்லைகளுக்கும் உள்ளே உள்ளது. எனவே அவை குறுக்கிடுகின்றன.',
        String.raw`\begin{gathered}y+4=\dfrac34(x-9)\\y+4=-\dfrac34(x-3)\\BC\cap DA=\left(6,-\dfrac{25}{4}\right)\end{gathered}`,
        'BC: y + 4 = (3/4)(x − 9). DA: y + 4 = (−3/4)(x − 3). BC ∩ DA = (6, −25/4).'),
      step('Order the same points as ABDC to obtain the convex boundary. Its other sides BD and CA have unequal slopes. This order gives a trapezium.',
        'அதே புள்ளிகளை ABDC என்ற வரிசையில் இணைத்தால் குவிந்த எல்லை கிடைக்கும். அதன் மற்ற பக்கங்களான BD, CA இன் சாய்வுகள் சமமல்ல. இவ்வரிசையே சரிவகத்தை அமைக்கிறது.',
        String.raw`AB\parallel DC,\qquad m_{BD}=\dfrac32\ne -\dfrac32=m_{CA}`,
        'AB ∥ DC. Slope BD = 3/2, while slope CA = −3/2.')
    ];
    item.answer='The printed order ABCD gives crossing sides. The order ABDC forms a trapezium.';
    item.answerTa='அச்சிட்ட ABCD வரிசையில் பக்கங்கள் குறுக்கிடுகின்றன. ABDC வரிசையில் சரிவகம் அமைகிறது.';
    item.answerMath={en:item.answer,ta:item.answerTa};
    item.figureInSolution=true;
    item.figureAlt={en:'The solid boundary ABDC is a trapezium. Dashed sides BC and DA of order ABCD cross at (6, −25/4).',
      ta:'திடக்கோடுகள் அமைக்கும் ABDC ஒரு சரிவகம். ABCD வரிசையின் இடைவெளியிட்ட BC, DA பக்கங்கள் (6, −25/4)-இல் குறுக்கிடுகின்றன.'};
    item.figureCaption={en:'ABDC and the crossed order ABCD',ta:'ABDC மற்றும் குறுக்கிடும் ABCD வரிசை'};
  }
  window.TriggleG10CoordinateFrontier=items=>{
    for(const item of items){
      if(triangles[item.id])showTriangle(item,triangles[item.id]);
      if(quadData[item.id])showQuadrilateral(item,quadData[item.id]);
      if(item.id==='c10-5-ex5-2-q12')showTrapezium(item);
    }
  };
})();
