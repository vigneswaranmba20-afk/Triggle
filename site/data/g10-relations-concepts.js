// Standard Ten Mathematics, revised 2025, Chapter 1. Section start pages in both media.
// English Drive 13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of · Tamil 1BLAJHjMzbBuYesS2qL6NDEl7Tf3xmNBC.
// Original investigations. Independent Tamil editorial review pending.
(() => {
  'use strict';
  const pair = (en, ta) => ({en, ta});
  const option = (label, result, math, diagram) => ({label, result, math, diagram});
  const answer = (label, feedback, correct = false) => ({label, feedback, correct});
  const symbol = text => pair(text, text);
  const pages = printed => ({printed, pdf: printed + 6});

  // Input 1 always points to a. The selected option edits input 2's arrows.
  function arrows(targets) {
    const arrow = (y1, y2) => '<path d="M60 '+y1+' L155 '+y2+'" marker-end="url(#relation-tip)" />';
    return () => '<svg viewBox="0 0 220 84" aria-hidden="true"><defs><marker id="relation-tip" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10Z" fill="currentColor"/></marker></defs>'+
      '<g stroke="currentColor" stroke-width="2">'+arrow(22,22)+targets.map(t=>arrow(64,t==='a'?22:64)).join('')+'</g>'+
      '<g fill="currentColor" font-size="18"><text x="36" y="28">1</text><text x="36" y="70">2</text><text x="170" y="28">a</text><text x="170" y="70">b</text></g></svg>';
  }

  function graph(rule) {
    // One scale on both axes; start a new segment outside the visible window.
    let path = '', move = true;
    for (let i = -100; i <= 100; i++) {
      const x = i / 40, y = rule(x);
      if (!Number.isFinite(y) || Math.abs(y) > 2.4) { move = true; continue; }
      path += (move ? 'M' : 'L') + (88+30*x).toFixed(1)+' '+(84-30*y).toFixed(1);
      move = false;
    }
    return () => '<svg viewBox="0 0 180 168" aria-hidden="true"><path d="M9 84H169 M88 8V161" fill="none" stroke="currentColor"/><g fill="currentColor" font-size="12"><text x="166" y="98">x</text><text x="94" y="12">y</text><text x="75" y="98">0</text></g><path d="'+path+'" fill="none" stroke="#72404a" stroke-width="3"/></svg>';
  }

  const lessons = [
    {
      title: pair('Introduction', 'அறிமுகம்'),
      intro: pair('A relation records which things go together. Link each pupil to the clubs they attend.', 'எந்தெந்த உறுப்புகள் தொடர்புடையவை என்பதை உறவு காட்டுகிறது. ஒவ்வொரு மாணவரையும் அவர் பங்கேற்கும் மன்றங்களுடன் இணைப்போம்.'),
      activity: {label: pair('Choose a pupil', 'ஒரு மாணவரைத் தேர்ந்தெடுக்கவும்'), options: [
        option(pair('Malar','மலர்'),pair('Malar attends chess and music. One pupil gives two pairs.', 'மலர் சதுரங்க மன்றத்திலும் இசை மன்றத்திலும் பங்கேற்கிறார். ஒரே மாணவருக்கு இரண்டு சோடிகள் கிடைக்கின்றன.')),
        option(pair('Kavin','கவின்'),pair('Kavin attends music only. The same club can appear with different pupils.', 'கவின் இசை மன்றத்தில் மட்டும் பங்கேற்கிறார். ஒரே மன்றம் வெவ்வேறு மாணவர்களுடன் இணையலாம்.'))
      ]},
      explanation: pair('Read each pair as (pupil, club). The first entry tells you whose clubs to look for.', 'ஒவ்வொரு சோடியையும் (மாணவர், மன்றம்) எனப் படிக்கவும். முதல் உறுப்பு யாருடைய மன்றங்களைப் பார்க்க வேண்டும் எனக் காட்டுகிறது.'),
      check: {question: pair('How many pairs name the music club?', 'இசை மன்றம் எத்தனை சோடிகளில் இடம்பெறுகிறது?'), options: [
        answer(symbol('1'),pair('Count the pupils who attend music.', 'இசை மன்றத்தில் பங்கேற்கும் மாணவர்களை எண்ணவும்.')),
        answer(symbol('2'),pair('Malar and Kavin each contribute a pair.', 'மலர், கவின் இருவருக்கும் தலா ஒரு சோடி உண்டு.'),true)
      ]}, exercise: 'c10-1-1-2-q5'
    },
    {
      title: pair('Ordered pair','வரிசைச் சோடி'),
      intro: pair('On a seat map, read the row first and the seat second. The positions have different jobs.', 'இருக்கை வரைபடத்தில் முதலில் வரிசையையும் அடுத்து இருக்கை எண்ணையும் படிக்கவும். சோடியில் ஒவ்வோர் இடத்துக்கும் தனிப் பொருள் உண்டு.'),
      activity: {label: pair('Read a ticket','ஒரு சீட்டைத் தேர்ந்தெடுக்கவும்'), options: [
        option(symbol('(2, 5)'),pair('Go to row 2 and find seat 5.', 'வரிசை 2-இல் இருக்கை 5-ஐக் கண்டறியவும்.')),
        option(symbol('(5, 2)'),pair('Now go to row 5 and find seat 2. Swapping the numbers changes the seat.', 'இப்போது வரிசை 5-இல் இருக்கை 2-க்குச் செல்லவும். எண்களின் இடங்களை மாற்றினால் இருக்கை மாறுகிறது.'))
      ]},
      explanation: pair('Two ordered pairs are equal when their first entries match and their second entries match.', 'இரு வரிசைச் சோடிகளின் முதல் உறுப்புகள் சமமாகவும் இரண்டாம் உறுப்புகள் சமமாகவும் இருந்தால் அச்சோடிகள் சமம்.'),
      check: {question: pair('If (u, v) = (5, 2), what is v?', '(u, v) = (5, 2) எனில் v எது?'), options: [
        answer(symbol('2'),pair('Match the second entries.', 'இரண்டாம் உறுப்புகளை ஒப்பிடவும்.'),true),
        answer(symbol('5'),pair('5 matches the first entry, u.', '5 முதல் உறுப்பான u-க்குச் சமம்.'))
      ]}, exercise: 'c10-1-1-6-q6'
    },
    {
      title: pair('Cartesian product','கார்டீசியன் பெருக்கல்'),
      intro: pair('Fix A = {1, 2}. Pair each member of A with every member of B.', 'A = {1, 2} என்க. A-இன் ஒவ்வோர் உறுப்பையும் B-இன் ஒவ்வோர் உறுப்புடனும் சோடியாக்கவும்.'),
      activity: {label: pair('Change the second set B','இரண்டாம் கணம் B-ஐ மாற்றவும்'), options: [
        option(symbol('{a}'),pair('Each number has one partner.', 'ஒவ்வோர் எண்ணுக்கும் ஓர் இணை கிடைக்கிறது.'),String.raw`\{(1,a),(2,a)\}`),
        option(symbol('{a, b}'),pair('Each number now has two partners. There are four pairs.', 'இப்போது ஒவ்வோர் எண்ணுக்கும் இரு இணைகள். மொத்தம் நான்கு சோடிகள்.'),String.raw`\begin{gathered}(1,a),\ (1,b)\\(2,a),\ (2,b)\end{gathered}`),
        option(symbol('∅'),pair('No second entry is available, so there are no pairs.', 'இரண்டாம் உறுப்பு இல்லாததால் சோடிகள் ஏதும் இல்லை.'),String.raw`A\times\varnothing=\varnothing`)
      ]},
      explanation: pair('For finite sets, multiply the two set sizes to count the pairs.', 'முடிவுறு கணங்களில் சோடிகளின் எண்ணிக்கை காண இரு கணங்களின் உறுப்புகளின் எண்ணிக்கைகளைப் பெருக்கவும்.'),
      math: String.raw`n(A\times B)=n(A)\,n(B)`,
      check: {question: pair('If B has three members, how many pairs are there?', 'B-இல் மூன்று உறுப்புகள் இருந்தால் எத்தனை சோடிகள் கிடைக்கும்?'),options:[
        answer(symbol('5'),pair('Each of the two numbers needs three partners.', 'இரு எண்களில் ஒவ்வொன்றுக்கும் மூன்று இணைகள் வேண்டும்.')),
        answer(symbol('6'),pair('Two groups of three give six.', 'தலா மூன்று சோடிகள் கொண்ட இரு குழுக்கள் உள்ளன.'),true)
      ]}, exercise: 'c10-1-ex1-1-q1-i'
    },
    {
      title: pair('Relations','உறவுகள்'),
      intro: pair('From A = {1, 2} to B = {2, 3}, a rule selects some of the possible ordered pairs.', 'A = {1, 2}, B = {2, 3} என்க. A-இலிருந்து B-க்கு அமையும் சோடிகளில் சிலவற்றை ஒரு விதி தேர்ந்தெடுக்கிறது.'),
      activity: {label: pair('Choose the rule','விதியைத் தேர்ந்தெடுக்கவும்'), options:[
        option(symbol('y = x'),pair('Only 2 occurs in both sets. The domain and range are both {2}.', '2 மட்டுமே இரு கணங்களிலும் உள்ளது. உறவின் சார்பகமும் வீச்சகமும் {2}.'),String.raw`R=\{(2,2)\}`),
        option(symbol('y = x + 1'),pair('Both inputs are used. The domain is {1, 2} and the range is {2, 3}.', 'இரு உள்ளீடுகளும் இடம்பெறுகின்றன. சார்பகம் {1, 2}, வீச்சகம் {2, 3}.'),String.raw`R=\{(1,2),(2,3)\}`)
      ]},
      explanation: pair('A relation is a subset of the Cartesian product. Its domain collects the first entries and its range collects the second entries actually used.', 'உறவு என்பது கார்டீசியன் பெருக்கலின் உட்கணம். உறவில் இடம்பெறும் முதல் உறுப்புகளின் கணம் சார்பகம். இரண்டாம் உறுப்புகளின் கணம் வீச்சகம்.'),
      math: String.raw`R\subseteq A\times B`,
      check: {question: pair('Can (3, 2) belong to a relation from A to B?', 'A-இலிருந்து B-க்கு அமையும் உறவில் (3, 2) இடம்பெறுமா?'), options:[
        answer(pair('Yes','ஆம்'),pair('Check the first entry against A.', 'முதல் உறுப்பு A-இல் உள்ளதா எனப் பார்க்கவும்.')),
        answer(pair('No','இல்லை'),pair('3 cannot be the first entry because it lies outside A.', '3 என்பது A-இன் உறுப்பு அல்ல. எனவே அது முதல் உறுப்பாக வராது.'),true)
      ]}, exercise: 'c10-1-1-2-q1'
    },
    {
      title: pair('Functions','சார்புகள்'),
      intro: pair('A = {1, 2} and B = {a, b}. Keep the arrow from 1 to a. Edit the arrows leaving 2.', 'A = {1, 2}, B = {a, b}. 1-இலிருந்து a-க்குச் செல்லும் அம்பை அப்படியே வைத்துவிட்டு, 2-இலிருந்து செல்லும் அம்புகளை மாற்றவும்.'),
      activity: {label: pair('Where does 2 point?', '2-இலிருந்து அம்பு எங்கு செல்கிறது?'), options:[
        option(symbol('2 → b'),pair('Function. Each input has exactly one output.', 'இது ஒரு சார்பு. ஒவ்வோர் உள்ளீட்டிற்கும் ஒரே ஒரு வெளியீடு உள்ளது.'),null,arrows(['b'])),
        option(symbol('2 → a'),pair('Still a function. Both inputs may share a.', 'இதுவும் சார்புதான். இரு உள்ளீடுகளுக்கும் ஒரே வெளியீடு a இருக்கலாம்.'),null,arrows(['a'])),
        option(symbol('2 → a, b'),pair('No longer a function. Input 2 has two different outputs.', 'இது சார்பு அல்ல. உள்ளீடு 2-க்கு இரு வெவ்வேறு வெளியீடுகள் உள்ளன.'),null,arrows(['a','b'])),
        option(pair('Remove arrow','அம்பை நீக்கு'),pair('No longer a function on A. Input 2 has no output.', 'இது A-இன் மீது வரையறுக்கப்பட்ட சார்பு அல்ல. உள்ளீடு 2-க்கு வெளியீடு இல்லை.'),null,arrows([]))
      ]},
      explanation: pair('Check every input in A. Each needs exactly one arrow leaving it. A member of B may receive several arrows or none.', 'A-இன் ஒவ்வோர் உறுப்பிலிருந்தும் ஒரே ஓர் அம்பு புறப்பட வேண்டும். B-இன் ஓர் உறுப்பைப் பல அம்புகள் அடையலாம் அல்லது எந்த அம்பும் அடையாமல் இருக்கலாம்.'),
      check: {question: pair('Which change always breaks the function rule?', 'எந்த மாற்றம் சார்பின் விதியை மீறும்?'),options:[
        answer(pair('Share an output','ஒரே வெளியீட்டைப் பகிர்தல்'),pair('Sharing is allowed. Count arrows leaving each input.', 'ஒரே வெளியீட்டைப் பகிரலாம். ஒவ்வோர் உள்ளீட்டிலிருந்தும் புறப்படும் அம்புகளை எண்ணவும்.')),
        answer(pair('Leave an input unpaired','ஓர் உள்ளீட்டை இணைக்காமல் விடுதல்'),pair('Every input needs an image.', 'ஒவ்வோர் உள்ளீட்டிற்கும் ஒரு பிம்பம் வேண்டும்.'),true)
      ]}, exercise:'c10-1-1-3-q1'
    },
    {
      title: pair('Representation of functions','சார்புகளைக் குறிக்கும் முறை'),
      intro: pair('Double each input in {1, 2}. Change how you read the same two matches.', '{1, 2} என்ற கணத்தின் ஒவ்வோர் உள்ளீட்டையும் இரட்டிப்பாக்கவும். அதே இரு இணைப்புகளை வெவ்வேறு முறைகளில் காணலாம்.'),
      activity: {label: pair('Choose a representation','குறிக்கும் முறையைத் தேர்ந்தெடுக்கவும்'), options:[
        option(pair('Ordered pairs','வரிசைச் சோடிகள்'),pair('Read each input beside its image.', 'ஒவ்வோர் உள்ளீட்டையும் அதன் பிம்பத்துடன் படிக்கவும்.'),String.raw`\{(1,2),(2,4)\}`),
        option(pair('Arrows','அம்புகள்'),pair('Follow an arrow from the input to its double.', 'உள்ளீட்டிலிருந்து அதன் இருமடங்கை நோக்கி அம்பு செல்கிறது.'),String.raw`1\mapsto2,\quad 2\mapsto4`),
        option(pair('Table','அட்டவணை'),pair('Read down a column to match an input with its image.', 'ஒவ்வொரு நிரலிலும் உள்ளீட்டையும் அதற்குரிய பிம்பத்தையும் காணலாம்.'),String.raw`\begin{array}{c|cc}x&1&2\\f(x)&2&4\end{array}`),
        option(pair('Graph','வரைபடம்'),pair('Plot only the two points. Values between 1 and 2 are outside this domain.', 'இரு புள்ளிகளை மட்டும் குறிக்கவும். 1-க்கும் 2-க்கும் இடையிலுள்ள எண்கள் இந்தச் சார்பகத்தில் இல்லை.'),null,()=>'<svg viewBox="0 0 160 112" aria-hidden="true"><path d="M20 8V90H148" fill="none" stroke="currentColor"/><g fill="currentColor"><circle cx="65" cy="56" r="4"/><circle cx="110" cy="22" r="4"/><text x="70" y="58">(1, 2)</text><text x="114" y="24">(2, 4)</text><text x="143" y="105">x</text><text x="6" y="13">y</text></g></svg>')
      ]},
      explanation: pair('The rule, ordered pairs, arrows, table and graph all preserve the same input–output matches.', 'விதி, வரிசைச் சோடிகள், அம்புக்குறிப் படம், அட்டவணை, வரைபடம் ஆகிய அனைத்திலும் உள்ளீடும் அதற்குரிய வெளியீடும் மாறுவதில்லை.'),
      check: {question: pair('Which point lies on this graph?', 'இந்த வரைபடத்தில் எந்தப் புள்ளி உள்ளது?'),options:[
        answer(symbol('(4, 2)'),pair('Read the input first.', 'முதலில் உள்ளீட்டைப் படிக்கவும்.')),
        answer(symbol('(2, 4)'),pair('Input 2 has image 4.', 'உள்ளீடு 2-இன் பிம்பம் 4.'),true)
      ]}, exercise:'c10-1-1-4-q2'
    },
    {
      title: pair('Types of functions','சார்புகளின் வகைகள்'),
      intro: pair('Use A = {1, 2} and B = {a, b}. First look for shared outputs. Then check whether every member of B is reached.', 'A = {1, 2}, B = {a, b}. முதலில் இரு உள்ளீடுகள் ஒரே வெளியீட்டைப் பெறுகின்றனவா எனப் பார்க்கவும். பிறகு B-இன் எல்லா உறுப்புகளையும் அம்புகள் அடைகின்றனவா எனப் பார்க்கவும்.'),
      activity: {label: pair('Keep 1 → a and change the other arrow','1 → a மாறாமல் மற்ற அம்பை மாற்றவும்'), options:[
        option(symbol('2 → b'),pair('One-one and onto. Different inputs have different images, and both a and b are reached. This is a bijection.', 'இது ஒன்றுக்கு ஒன்றான சார்பும் மேல் சார்பும் ஆகும். பிம்பங்கள் வெவ்வேறானவை. a, b இரண்டையும் அம்புகள் அடைகின்றன. எனவே இது இருபுறச் சார்பு.'),null,arrows(['b'])),
        option(symbol('2 → a'),pair('Many-one and into. Both inputs reach a, and b is unused.', 'இது பலவற்றிற்கு ஒன்றான சார்பும் உட்சார்பும் ஆகும். இரு உள்ளீடுகளின் பிம்பம் a. எந்த அம்பும் b-ஐ அடையவில்லை.'),null,arrows(['a']))
      ]},
      explanation: pair('On a function graph, a horizontal line that hits two points reveals two inputs with the same output. Such a function is many-one.', 'ஒரு சார்பின் வரைபடத்தைக் கிடைமட்டக் கோடு இரு புள்ளிகளில் சந்தித்தால் இரு உள்ளீடுகளுக்கும் ஒரே வெளியீடு உள்ளது. அது பலவற்றிற்கு ஒன்றான சார்பு.'),
      check: {question: pair('Keep 1 → a and 2 → b, but add c to B. Is the function still onto?', '1 → a, 2 → b மாறாமல் B-இல் c-ஐச் சேர்த்தால் அது இன்னும் மேல் சார்பா?'),options:[
        answer(pair('Yes','ஆம்'),pair('Check every member of the enlarged B.', 'விரிவடைந்த B-இன் எல்லா உறுப்புகளையும் சரிபார்க்கவும்.')),
        answer(pair('No','இல்லை'),pair('No input reaches c. It is still one-one.', 'எந்த உள்ளீட்டின் பிம்பமும் c அல்ல. இது இன்னும் ஒன்றுக்கு ஒன்றான சார்புதான்.'),true)
      ]}, exercise:'c10-1-1-4-q7'
    },
    {
      title: pair('Special cases of functions','சார்புகளின் சிறப்பு வகைகள்'),
      intro: pair('Try two rules on the real numbers. Compare the images of −2 and 3.', 'மெய்யெண்களில் இரு விதிகளைப் பயன்படுத்தி −2 மற்றும் 3-இன் பிம்பங்களை ஒப்பிடவும்.'),
      activity: {label: pair('Choose a rule','ஒரு விதியைத் தேர்ந்தெடுக்கவும்'), options:[
        option(symbol('f(x) = 3'),pair('Constant function. Every input gives 3, so the range has just one member.', 'மாறிலிச் சார்பு. எந்த உள்ளீட்டிற்கும் வெளியீடு 3. வீச்சகத்தில் ஓர் உறுப்பு மட்டுமே உள்ளது.'),String.raw`f(-2)=3,\quad f(3)=3`),
        option(symbol('f(x) = x'),pair('Identity function. Each input is its own image.', 'சமனிச் சார்பு. ஒவ்வோர் உள்ளீடும் அதன் பிம்பமும் சமம்.'),String.raw`f(-2)=-2,\quad f(3)=3`)
      ]},
      explanation: pair('Both rules are real-valued because every output is a real number. A real-valued function can also have other rules.', 'இரு விதிகளிலும் எல்லா வெளியீடுகளும் மெய்யெண்கள். எனவே இவை மெய் மதிப்புச் சார்புகள். வேறு விதிகளும் மெய் மதிப்புச் சார்புகளைத் தரலாம்.'),
      check: {question: pair('Which rule leaves every real input unchanged?', 'எந்த விதியில் ஒவ்வொரு மெய்யெண்ணும் மாறாமல் கிடைக்கிறது?'),options:[
        answer(symbol('f(x) = x'),pair('Its output always equals its input.', 'வெளியீடு எப்போதும் உள்ளீட்டுக்குச் சமம்.'),true),
        answer(symbol('f(x) = 3'),pair('Try the input −2.', '−2-ஐ உள்ளீடாக எடுத்துப் பார்க்கவும்.'))
      ]}, exercise:'c10-1-1-6-q8'
    },
    {
      title: pair('Composition of functions','சார்புகளின் சேர்ப்பு'),
      intro: pair('Start with 3. Let f double a number and let g add one. Feed the first output into the next function.', '3-இல் தொடங்கவும். f எண்ணை இரட்டிப்பாக்குகிறது. g எண்ணுடன் ஒன்றைக் கூட்டுகிறது. முதல் வெளியீட்டை அடுத்த சார்பின் உள்ளீடாகக் கொடுக்கவும்.'),
      activity: {label: pair('Choose the order','வரிசையைத் தேர்ந்தெடுக்கவும்'), options:[
        option(symbol('g ∘ f'),pair('Double 3 to get 6, then add one.', '3-ஐ இரட்டிப்பாக்கினால் 6. பிறகு ஒன்றைக் கூட்டவும்.'),String.raw`3\xrightarrow{f}6\xrightarrow{g}7`),
        option(symbol('f ∘ g'),pair('Add one to get 4, then double it.', '3 உடன் ஒன்றைக் கூட்டினால் 4. பிறகு அதை இரட்டிப்பாக்கவும்.'),String.raw`3\xrightarrow{g}4\xrightarrow{f}8`)
      ]},
      explanation: pair('Apply the right-hand function first. Its outputs must be allowed inputs for the next function. Changing the order can change the result.', 'முதலில் வலப்புறச் சார்பைப் பயன்படுத்தவும். அதன் வெளியீடுகள் அடுத்த சார்பின் சார்பகத்தில் இருக்க வேண்டும். வரிசை மாறினால் விடையும் மாறலாம்.'),
      math: String.raw`(g\circ f)(x)=g(f(x))`,
      check: {question: pair('Starting with 5, what is (g ∘ f)(5)?', '5-இல் தொடங்கினால் (g ∘ f)(5) எவ்வளவு?'),options:[
        answer(symbol('11'),pair('Double 5 to get 10, then add one.', '5-ஐ இரட்டிப்பாக்கினால் 10. ஒன்றைக் கூட்டினால் 11.'),true),
        answer(symbol('12'),pair('12 comes from adding one first. Apply f first here.', 'முதலில் ஒன்றைக் கூட்டினால் 12 கிடைக்கும். இங்கு முதலில் f-ஐப் பயன்படுத்தவும்.'))
      ]}, exercise:'c10-1-1-5-q1'
    },
    {
      title: pair('Graphs of linear, quadratic, cubic and reciprocal functions','நேரிய, இருபடி, முப்படி மற்றும் தலைகீழ்ச் சார்புகளின் வரைபடங்கள்'),
      intro: pair('Keep the axes fixed and change the rule. Look for a straight line, a turn, a change of bend or a gap.', 'அச்சுகளை மாற்றாமல் விதியை மாற்றவும். நேர்கோடு, திருப்பம், வளைவின் திசை மாற்றம் அல்லது இடைவெளி எங்கு தெரிகிறது எனக் கவனிக்கவும்.'),
      activity: {label: pair('Choose the function','சார்பைத் தேர்ந்தெடுக்கவும்'), options:[
        option(pair('Linear','நேரிய'),pair('A straight line through the origin. Each unit increase in x adds one to y.', 'ஆதிப்புள்ளி வழியே செல்லும் நேர்கோடு. x ஓரலகு அதிகரிக்கும்போது y ஓரலகு அதிகரிக்கிறது.'),'y=x',graph(x=>x)),
        option(pair('Quadratic','இருபடி'),pair('A parabola with its minimum at the origin. Opposite inputs have equal squares.', 'ஆதிப்புள்ளியில் சிறும மதிப்பைக் கொண்ட பரவளையம். எதிரெண்களின் வர்க்கங்கள் சமம்.'),'y=x^2',graph(x=>x*x)),
        option(pair('Cubic','முப்படி'),pair('This rising curve changes its bend at the origin. Negative inputs have negative cubes.', 'ஏறிச் செல்லும் இவ்வளைகோடு ஆதிப்புள்ளியில் வளையும் திசையை மாற்றுகிறது. எதிரெண்களின் கனங்கள் எதிரெண்களே.'),'y=x^3',graph(x=>x**3)),
        option(pair('Reciprocal','தலைகீழ்'),pair('Two branches approach the axes without touching them. Zero has no reciprocal.', 'இரு கிளைகளும் அச்சுகளைத் தொடாமல் நெருங்குகின்றன. பூச்சியத்திற்குத் தலைகீழ் மதிப்பு இல்லை.'),String.raw`y=\dfrac{1}{x},\quad x\ne0`,graph(x=>1/x))
      ]},
      explanation: pair('Use the vertical line test on any graph. A vertical line meeting the graph twice gives one input two outputs.', 'வரைபடத்தில் குத்துக்கோட்டுச் சோதனையைப் பயன்படுத்தவும். ஒரு குத்துக்கோடு வரைபடத்தை இருமுறை சந்தித்தால் ஒரே உள்ளீட்டுக்கு இரு வெளியீடுகள் கிடைக்கின்றன.'),
      check: {question: pair('Which of these four rules has no value at x = 0?', 'இந்த நான்கு விதிகளில் x = 0-இல் மதிப்பு இல்லாதது எது?'),options:[
        answer(pair('Cubic','முப்படி'),pair('The cube of zero is zero.', 'பூச்சியத்தின் கனம் பூச்சியம்.')),
        answer(pair('Reciprocal','தலைகீழ்'),pair('Division by zero is undefined.', 'பூச்சியத்தால் வகுத்தல் வரையறுக்கப்படவில்லை.'),true)
      ]}, exercise:'c10-1-1-6-q14'
    }
  ];

  const englishPages = [1,2,2,6,10,15,17,22,26,29];
  const tamilPages = [1,2,2,7,11,16,18,24,27,30];
  window.TRIGGLE_RELATIONS_LESSONS = lessons.map((lesson, index) => ({
    ...lesson, id: 'g10-ch1-section-'+(index+1), section: '1.'+(index+1),
    pages: {en: pages(englishPages[index]), ta: pages(tamilPages[index])}
  }));
})();
