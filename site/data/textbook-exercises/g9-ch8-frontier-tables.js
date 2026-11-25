/* Grade 9 Statistics (SCERT revised 2025). Table entries are transposed into
 * two-column lists in the mobile reader. The original lesson prompts and
 * source editions remain available on the preserved records.
 */
(() => {
  'use strict';
  const tex = (latex,fallback,display=false) => ({latex,fallback,display});
  const pairs = (xs,ys) => xs.map((x,i)=>[x,ys[i]]);
  const intervals = (start,end,count,step=10) =>
    Array.from({length:count},(_,i)=>(start+i*step)+'–'+(end+i*step));
  const groups = {
    '8.1-q4':{
      en:['Mouse marking','Tumour volume (mm³)'],ta:['எலியின் எண்','கட்டியின் கன அளவு (மி.மீ³)'],
      rows:pairs([1,2,3,4,5,6],[145,148,142,141,139,140])
    },
    '8.1-q5':{
      en:['Marks','Number of students'],ta:['மதிப்பெண்கள்','மாணவர்களின் எண்ணிக்கை'],
      rows:pairs([10,15,20,25,30],[6,8,tex('p','p'),10,6])
    },
    '8.1-q6':{
      en:['Weight (kg)','Number of students'],ta:['எடை (கி.கி.)','மாணவர்களின் எண்ணிக்கை'],
      rows:pairs(intervals(15,25,6),[4,11,19,14,0,2])
    },
    '8.1-q7':{
      en:['Class interval','Frequency'],ta:['பிரிவு இடைவெளி','நிகழ்வெண்'],
      rows:pairs(intervals(0,10,5),[5,7,15,28,8])
    },
    '8.1-q8':{
      en:['Age','Number of persons'],ta:['வயது','நபர்களின் எண்ணிக்கை'],
      rows:pairs(intervals(15,19,6,5),[4,20,38,24,10,9])
    },
    '8.2-q5':{
      en:['Class','Number of students'],ta:['பிரிவு இடைவெளி','மாணவர்களின் எண்ணிக்கை'],
      rows:pairs(intervals(0,10,6),[2,7,15,10,11,5])
    },
    '8.3-q4':{
      en:['Size','Number of persons'],ta:['அளவு','எண்ணிக்கை'],
      rows:pairs([38,39,40,41,42,43,44,45],[36,15,37,13,26,8,6,2])
    },
    '8.3-q5':{
      en:['Marks','Number of students'],ta:['மதிப்பெண்','மாணவர்களின் எண்ணிக்கை'],
      rows:pairs(intervals(0,10,5),[22,38,46,34,20])
    },
    '8.3-q6':{
      en:['Weight (kg)','Number of students'],ta:['எடை','மாணவர்களின் எண்ணிக்கை'],
      rows:pairs(intervals(25,34,6),[4,8,10,14,8,6])
    }
  };
  const step = (en,ta,latex,eq,why) => ({en,ta,eq,math:tex(latex,eq,true),...(why&&{why})});
  const median = tex(String.raw`\dfrac{793}{14}\approx56.64`,'793/14 ≈ 56.64',true);
  const mean = tex('55.9','55.9');
  const mode = tex('58.5','58.5');
  const supplement = [
    step('The Tamil edition also asks for the mean and median. To find the mean, replace each weight class by its midpoint and multiply it by its frequency.',
      'சராசரியைக் காண, ஒவ்வொரு எடைப் பிரிவிற்கும் அதன் நடுப்புள்ளியை எடுத்துக்கொண்டு, அதனை அந்தப் பிரிவின் நிகழ்வெண்ணால் பெருக்குவோம்.',
      String.raw`\begin{aligned}\sum f&=4+8+10+14+8+6=50\\
      \sum fx&=118+316+495+833+556+477=2795\end{aligned}`,
      '∑f = 50, ∑fx = 118 + 316 + 495 + 833 + 556 + 477 = 2795',
      {en:'A class midpoint represents the weights in that class when we estimate the mean from grouped data.',
       ta:'தொகுக்கப்பட்ட தரவுகளுக்குச் சராசரியை மதிப்பிடும்போது, ஒவ்வொரு பிரிவிலுள்ள எடைகளுக்கும் அதன் நடுப்புள்ளி பிரதிநிதியாக அமைகிறது.'}),
    step('Divide the sum of the products by the number of students.',
      'பெருக்கற்பலன்களின் கூடுதலை மொத்த மாணவர்களின் எண்ணிக்கையால் வகுப்போம்.',
      String.raw`\overline{x}=\dfrac{\sum fx}{\sum f}=\dfrac{2795}{50}=55.9`,
      'x̄ = ∑fx / ∑f = 2795/50 = 55.9',
      {en:'Dividing by the total frequency spreads the weighted sum equally over all observations.',
       ta:'மொத்த நிகழ்வெண்ணால் வகுப்பது எடைகளின் மொத்தத்தை அனைத்து மாணவர்களுக்கும் சமமாகப் பகிர்வதைக் குறிக்கும்.'}),
    step('For the median, add the frequencies cumulatively. The halfway position 25 is in the 55–64 class because the cumulative count rises from 22 to 36 there.',
      'இடைநிலை அளவிற்கு நிகழ்வெண்களைத் தொடர்ந்து கூட்டுவோம். 55–64 பிரிவில் குவிவு நிகழ்வெண் 22-லிருந்து 36 ஆக உயர்கிறது. எனவே நடு இடமான 25 இந்தப் பிரிவில் உள்ளது.',
      String.raw`\begin{gathered}4,\ 12,\ 22,\ 36,\ 44,\ 50\\22<\dfrac{50}{2}=25\le36\end{gathered}`,
      '4, 12, 22, 36, 44, 50. 22 < 50/2 = 25 ≤ 36',
      {en:'Cumulative frequencies show how far we have counted after each class. Find the first one that reaches half the total.',
       ta:'ஒவ்வொரு பிரிவின் முடிவிலும் எத்தனை மாணவர்கள் எண்ணப்பட்டுள்ளனர் என்பதைக் குவிவு நிகழ்வெண் காட்டுகிறது. மொத்தத்தில் பாதியை முதலில் எட்டும் பிரிவைக் கண்டறிக.'}),
    step('Use the continuous lower boundary 54.5, the class width 10, and the frequency 14. The median is the lower boundary plus three fourteenths of the class width.',
      'தொடர் பிரிவின் கீழ் எல்லை 54.5, பிரிவு அகலம் 10, நிகழ்வெண் 14. கீழ் எல்லையுடன் பிரிவு அகலத்தின் மூன்று பதினான்கில் பங்கைச் சேர்ப்போம்.',
      String.raw`\begin{aligned}M&=54.5+\dfrac{25-22}{14}\times10\\&=\dfrac{793}{14}\approx56.64\end{aligned}`,
      'M = 54.5 + ((25−22)/14) × 10 = 793/14 ≈ 56.64',
      {en:'At the lower class boundary, 22 students have already been counted. The median estimate advances three of the 14 positions in the class.',
       ta:'கீழ் எல்லை வரை 22 மாணவர்கள் எண்ணப்பட்டுள்ளனர். இப்பிரிவில் உள்ள 14 இடங்களுள் மூன்று இடங்கள் முன்னேறி இடைநிலை அளவை மதிப்பிடுகிறோம்.'})
  ];
  window.TriggleG9StatisticsTables = items => {
    for(const item of items) {
      if(!item.id.startsWith('g9-ch8-ex'))continue;
      const data=groups[item.id.slice('g9-ch8-ex'.length)];
      if(!data)continue;
      const tablePrompt = raw => {
        const [before,,,after] = raw.split('\n');
        return {before,after};
      };
      item.dataTable={
        headers:data.en,rows:data.rows,caption:'Textbook data',
        ta:{headers:data.ta,caption:'பாடநூல் தரவுகள்'},
        sourcePrompt:{en:tablePrompt(item.q.en),ta:tablePrompt(item.q.ta)}
      };
      if(item.id==='g9-ch8-ex8.3-q6') {
        const [modalClass,boundaries,formula,value]=item.steps;
        modalClass.ta='அதிக நிகழ்வெண் உள்ள 55–64 தான் முகட்டுப் பிரிவு. அதன் நிகழ்வெண் f₁, முந்தைய பிரிவின் நிகழ்வெண் f₀, அடுத்த பிரிவின் நிகழ்வெண் f₂.';
        modalClass.reasonMath.ta=['அதிக நிகழ்வெண் உள்ள 55–64 தான் முகட்டுப் பிரிவு. அதன் நிகழ்வெண் ',tex('f_1','f₁'),', முந்தைய பிரிவின் நிகழ்வெண் ',tex('f_0','f₀'),', அடுத்த பிரிவின் நிகழ்வெண் ',tex('f_2','f₂'),'.'];
        modalClass.math=tex(String.raw`f_1=14,\quad f_0=10,\quad f_2=8`,modalClass.eq,true);
        modalClass.mathTa=modalClass.math;
        boundaries.ta='எடைகளைத் தொடர் பிரிவுகளாக மாற்ற, ஒவ்வொரு பிரிவின் கீழ் வரம்பிலிருந்து 0.5 கி.கி. கழித்து, மேல் வரம்புடன் 0.5 கி.கி. சேர்ப்போம். முகட்டுப் பிரிவின் எல்லைகள் 54.5, 64.5. கீழ் எல்லை L, பிரிவு அகலம் h.';
        boundaries.reasonMath.ta=['எடைகளைத் தொடர் பிரிவுகளாக மாற்ற, ஒவ்வொரு பிரிவின் கீழ் வரம்பிலிருந்து 0.5 கி.கி. கழித்து, மேல் வரம்புடன் 0.5 கி.கி. சேர்ப்போம். முகட்டுப் பிரிவின் எல்லைகள் 54.5, 64.5. கீழ் எல்லை ',tex('L','L'),', பிரிவு அகலம் ',tex('h','h'),'.'];
        boundaries.math=tex(String.raw`L=54.5,\quad h=10`,boundaries.eq,true);
        boundaries.mathTa=boundaries.math;
        formula.math=['Mode = ',formula.mathTa[1]];
        value.math=['Mode = ',value.mathTa[1]];
        item.notationSource='authored';
        item.steps=[...item.steps,...supplement];
        item.answerMath={
          en:['Mode ',mode,' kg. The Tamil edition also asks for the mean ',mean,' kg and median ',median,' kg.'],
          ta:['சராசரி ',mean,' கி.கி. இடைநிலை அளவு ',median,' கி.கி. முகடு ',mode,' கி.கி.']
        };
        item.answerTa='சராசரி 55.9 கி.கி. இடைநிலை அளவு 793/14 ≈ 56.64 கி.கி. முகடு 58.5 கி.கி.';
      }
    }
  };
})();
