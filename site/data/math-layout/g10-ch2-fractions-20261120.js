/* VER Triggle AF-01: Grade 10 Chapter 2 ChatGPT-style KaTeX overlay for 16 records (30 expressions)
 * that previously rendered plain slash fractions in steps or final answers.
 * Strictly read-only presentation layer: never mutates source questions, equations, answers, or SHA checksums.
 */
(()=>{'use strict';
const STEPS={
  "c10-2-ex2-6-q7": {
    "1": "\\dfrac{(603+901)\\times 299}{2}=224,848",
    "2": "\\dfrac{(604+900)\\times 75}{2}=56,400"
  },
  "c10-2-ex2-7-q3": {
    "0": "a=729,\\quad r=\\dfrac{1}{3}"
  },
  "c10-2-ex2-7-q4": {
    "2": "-12,\\; -6,\\; -3;\\quad \\text{ratio}=\\dfrac{1}{2}"
  },
  "c10-2-ex2-8-q4": {
    "0": "(i)\\; r=\\dfrac{1}{3};\\quad (ii)\\; r=\\dfrac{2}{3}"
  },
  "c10-2-ex2-5-q1-ii": {
    "0": "d_1=\\dfrac{1}{3}-\\dfrac{1}{2}=-\\dfrac{1}{6}",
    "1": "d_2=\\dfrac{1}{4}-\\dfrac{1}{3}=-\\dfrac{1}{12}",
    "2": "-\\dfrac{1}{6}\\ne -\\dfrac{1}{12}"
  },
  "c10-2-ex2-5-q1-iv": {
    "0": "0-\\left(-\\dfrac{1}{3}\\right)=\\dfrac{1}{3}",
    "1": "\\dfrac{1}{3}-0=\\dfrac{1}{3};\\quad \\dfrac{2}{3}-\\dfrac{1}{3}=\\dfrac{1}{3}",
    "2": "\\text{Common difference } d=\\dfrac{1}{3}"
  },
  "c10-2-ex2-7-q1-i": {
    "1": "\\dfrac{9}{3}=3;\\quad \\dfrac{27}{9}=3;\\quad \\dfrac{81}{27}=3"
  },
  "c10-2-ex2-7-q1-ii": {
    "1": "444\\div 44=\\dfrac{111}{11}",
    "2": "11\\ne\\dfrac{111}{11}"
  },
  "c10-2-ex2-7-q1-iii": {
    "2": "r=0.1=\\dfrac{1}{10}"
  },
  "c10-2-ex2-7-q1-iv": {
    "0": "\\dfrac{1}{6}\\div\\dfrac{1}{3}=\\dfrac{1}{2}",
    "1": "\\dfrac{1}{12}\\div\\dfrac{1}{6}=\\dfrac{1}{2}",
    "2": "r=\\dfrac{1}{2}"
  },
  "c10-2-ex2-7-q1-vi": {
    "0": "\\dfrac{60}{120}=\\dfrac{1}{2};\\quad \\dfrac{30}{60}=\\dfrac{1}{2}",
    "1": "\\dfrac{18}{30}=\\dfrac{3}{5}",
    "2": "\\dfrac{1}{2}\\ne\\dfrac{3}{5}"
  }
};
const ANSWERS={
  "c10-2-ex2-4-q1": "\\begin{aligned}\\text{(i) }&216,\\; 648,\\; 1944\\\\\\text{(ii) }&-7,\\; -11,\\; -15\\\\\\text{(iii) }&\\dfrac{4}{25},\\; \\dfrac{5}{36},\\; \\dfrac{6}{49}\\end{aligned}",
  "c10-2-ex2-4-q4-i": "a_6=\\dfrac{15}{4};\\quad a_{13}=\\dfrac{13}{3}",
  "c10-2-ex2-4-q5": "a_8=\\dfrac{63}{11};\\quad a_{15}=\\dfrac{225}{31}",
  "c10-2-ex2-5-q1-iv": "\\text{Yes, an A.P. with common difference }\\dfrac{1}{3}",
  "c10-2-ex2-5-q2-iii": "\\dfrac{3}{4},\\; \\dfrac{5}{4},\\; \\dfrac{7}{4},\\; \\dfrac{9}{4},\\; \\ldots",
  "c10-2-ex2-7-q1-iii": "\\text{Yes, it is a G.P. with common ratio }\\dfrac{1}{10}",
  "c10-2-ex2-7-q1-iv": "\\text{Yes, it is a G.P. with common ratio }\\dfrac{1}{2}",
  "c10-2-ex2-8-q4": "\\text{(i) }\\dfrac{27}{2}=13.5;\\quad \\text{(ii) }63",
  "c10-2-ex2-8-q5": "\\dfrac{1}{4}"
};
function isEligible(record){
  return !!record && record.classNum===10 && String(record.chapter)==='2';
}
window.TriggleG10Ch2FractionMath=Object.freeze({
  stepIds:Object.freeze(Object.keys(STEPS)),
  answerIds:Object.freeze(Object.keys(ANSWERS)),
  getStep(record,index){
    if(!isEligible(record))return null;
    const map=STEPS[record.id];
    const latex=map&&map[String(index)];
    if(!latex)return null;
    const source=record.steps?.[index];
    if(!source)return null;
    return {latex,fallback:source.eq,display:true};
  },
  getAnswer(record){
    if(!isEligible(record))return null;
    const latex=ANSWERS[record.id];
    if(!latex||!record.answer)return null;
    return {latex,fallback:record.answer,display:true};
  }
});
})();
