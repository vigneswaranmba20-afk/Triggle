/* Phase 2 pilot: original, offline-first, bilingual Set Language micro-lab.
   This is a teaching activity, not a reproduction of textbook exercises. */
(() => {
  'use strict';
  const copy = {
    en: {
      kicker: 'PHASE 2 · LEARN BY EXPLORING',
      title: 'Set Language · See it, then remember it',
      intro: 'Take a minute to explore. Then put the phone down and solve a similar problem on paper.',
      objective: 'Two groups can share members. A Venn diagram makes the shared region visible.',
      choose: 'Explore an operation',
      universe: 'Universe',
      union: 'Union: everything in A or B, without repeats.',
      intersection: 'Intersection: only what appears in both A and B.',
      difference: 'Difference: in A but not in B.',
      neither: 'Complement: members in U but neither A nor B.',
      result: 'Selected set',
      members: 'Region members, also available without the picture',
      check: 'Check your understanding',
      question: 'Which members are in BOTH A and B?',
      hintButton: 'Give me one hint',
      hint: 'Find the middle overlap. Only count numbers that are in both circles.',
      correct: 'Correct. 3 and 5 appear in both A and B.',
      incorrect: 'Try again. The intersection is the overlap, not the entire union.',
      deeper: 'Understand deeply · a medium challenge',
      why: 'Why do we subtract the overlap?',
      medium: 'In a group of 20 children, 12 play chess, 11 play badminton and 7 play both. How many play at least one? How many play neither?',
      reveal: 'Reveal one reasoning step',
      complete: 'You have reached the final step.',
      closeScreen: 'Paper challenge: Draw your own two circles for A = {2, 4, 6} and B = {4, 5}. Find the union and intersection without looking at this page. Try again tomorrow.',
      noTracking: 'Works offline after first visit · No login · No video · No paid AI',
      notes: [
        'Start with the 12 chess players and 11 badminton players.',
        'The 7 children who play both were counted twice; subtract 7 once.',
        'At least one = 12 + 11 − 7 = 16 children.',
        'Neither = 20 − 16 = 4 children. Check: 16 + 4 = 20.'
      ]
    },
    ta: {
      kicker: 'இரண்டாம் கட்டம் · ஆராய்ந்து கற்போம்',
      title: 'கண மொழி · பார்த்துப் புரிந்து நினைவில் கொள்வோம்',
      intro: 'சிறிது நேரம் ஆராயுங்கள். பிறகு கைப்பேசியை வைத்துவிட்டு இதே போன்ற ஒரு கணக்கைத் தாளில் செய்யுங்கள்.',
      objective: 'இரு கணங்களிலும் பொதுவான உறுப்புகள் இருக்கலாம். அவற்றை வென் படம் தெளிவாகக் காட்டுகிறது.',
      choose: 'கணச் செயல்பாட்டைத் தேர்வு செய்க',
      universe: 'அனைத்துக் கணம்',
      union: 'சேர்ப்பு: A அல்லது B-யில் உள்ள அனைத்து தனித்த உறுப்புகளும்.',
      intersection: 'வெட்டு: A மற்றும் B இரண்டிலும் உள்ள பொதுவான உறுப்புகள் மட்டும்.',
      difference: 'கண வித்தியாசம்: A-யில் இருந்து B-யில் இல்லாத உறுப்புகள்.',
      neither: 'நிரப்புக் கணம்: அனைத்துக் கணத்தில் A, B இரண்டிலும் இல்லாத உறுப்புகள்.',
      result: 'தேர்ந்தெடுத்த கணம்',
      members: 'படம் இல்லாமலும் படிக்கக்கூடிய பகுதி உறுப்புகள்',
      check: 'புரிந்ததா என முயலுங்கள்',
      question: 'A, B இரண்டிலும் உள்ள உறுப்புகள் எவை?',
      hintButton: 'ஒரு குறிப்புக் காட்டு',
      hint: 'இரு வட்டங்களும் ஒன்றோடொன்று சேரும் நடுப் பகுதியைப் பாருங்கள்.',
      correct: 'சரி! 3 மற்றும் 5 ஆகியவை A, B இரண்டிலும் உள்ளன.',
      incorrect: 'மீண்டும் முயலுங்கள். வெட்டு என்பது நடுப்பகுதி; முழுச் சேர்ப்புக் கணம் அல்ல.',
      deeper: 'ஆழமாகப் புரிந்துகொள் · நடுத்தரச் சவால்',
      why: 'பொதுவான உறுப்புகளை ஏன் ஒருமுறை கழிக்கிறோம்?',
      medium: '20 குழந்தைகளில் 12 பேர் சதுரங்கமும் 11 பேர் இறகுப்பந்தும் விளையாடுகிறார்கள்; 7 பேர் இரண்டையும் விளையாடுகிறார்கள். குறைந்தது ஒரு விளையாட்டை விளையாடுவோர் எத்தனை? எதையும் விளையாடாதோர் எத்தனை?',
      reveal: 'அடுத்த காரணப் படியைக் காட்டு',
      complete: 'இறுதிப் படி வரை வந்துவிட்டீர்கள்.',
      closeScreen: 'தாள் பயிற்சி: A = {2, 4, 6}, B = {4, 5} என இரண்டு வட்டங்கள் வரைந்து சேர்ப்பையும் வெட்டையும் காணுங்கள். இப்பக்கத்தைப் பார்க்காமல் செய்க. நாளையும் முயலுங்கள்.',
      noTracking: 'முதல் முறைக்குப் பின் இணையமின்றி இயங்கும் · கணக்கு தேவையில்லை · வீடியோ இல்லை · கட்டண AI இல்லை',
      notes: [
        'சதுரங்கம் விளையாடுவோர் 12 பேர்; இறகுப்பந்து விளையாடுவோர் 11 பேர்.',
        'இரண்டையும் விளையாடும் 7 பேர் இருமுறை எண்ணப்பட்டுள்ளனர்; 7-ஐ ஒருமுறை கழிக்கவும்.',
        'குறைந்தது ஒன்று = 12 + 11 − 7 = 16 பேர்.',
        'எதுவுமில்லை = 20 − 16 = 4 பேர். சரிபார்ப்பு: 16 + 4 = 20.'
      ]
    }
  };
  const operations = {
    union: {symbol:'A ∪ B',set:'{1, 2, 3, 4, 5, 6}'},
    intersection: {symbol:'A ∩ B',set:'{3, 5}'},
    difference: {symbol:'A − B',set:'{1, 2}'},
    neither: {symbol:'(A ∪ B)′',set:'{7, 8}'}
  };
  function mount(container, chapter, lang) {
    if (!container || chapter?.id !== 'g9-ch1') return false;
    const t = copy[lang === 'ta' ? 'ta' : 'en'];
    const section = document.createElement('section');
    section.className = 'p2-lab';
    section.setAttribute('aria-label', t.title);
    section.innerHTML = [
      '<div class="p2-kicker">',t.kicker,'</div>',
      '<h3>',t.title,'</h3><p class="p2-intro">',t.intro,'</p>',
      '<p class="p2-objective">',t.objective,'</p>',
      '<p class="p2-given"><b>U = {1,2,3,4,5,6,7,8}</b><br><b>A = {1,2,3,5}</b> &nbsp; <b>B = {3,4,5,6}</b></p>',
      '<div class="p2-controls"><p>',t.choose,'</p><div class="p2-modes" role="group" aria-label="',t.choose,'">',
      '<button type="button" data-op="union">A ∪ B</button>',
      '<button type="button" data-op="intersection">A ∩ B</button>',
      '<button type="button" data-op="difference">A − B</button>',
      '<button type="button" data-op="neither">(A ∪ B)′</button>',
      '</div></div>',
      '<div class="p2-canvas"><svg viewBox="0 0 360 188" role="img" aria-labelledby="p2-venn-title p2-venn-desc">',
      '<title id="p2-venn-title">',t.universe,', A, B</title><desc id="p2-venn-desc">A only: 1 and 2; overlap: 3 and 5; B only: 4 and 6; neither: 7 and 8.</desc>',
      '<defs><clipPath id="p2-overlap-clip"><circle cx="217" cy="90" r="70"/></clipPath></defs>',
      '<rect data-fill="universe" x="10" y="8" width="340" height="172" rx="10" fill="#fff" stroke="#d6d0e7" stroke-width="2"/>',
      '<circle data-fill="a" cx="135" cy="90" r="70" fill="#fff"/>',
      '<circle data-fill="b" cx="217" cy="90" r="70" fill="#fff"/>',
      '<circle data-fill="both" cx="135" cy="90" r="70" clip-path="url(#p2-overlap-clip)" fill="#fff"/>',
      '<circle cx="135" cy="90" r="70" stroke="#258b78" stroke-width="2.5" fill="none"/>',
      '<circle cx="217" cy="90" r="70" stroke="#6f54ad" stroke-width="2.5" fill="none"/>',
      '<g fill="#28304f" font-size="15" font-family="system-ui,sans-serif" text-anchor="middle">',
      '<text x="25" y="27" font-weight="700">U</text><text x="103" y="35">A</text><text x="255" y="35">B</text>',
      '<text x="104" y="102">1, 2</text><text x="175" y="102" font-weight="750">3, 5</text>',
      '<text x="248" y="102">4, 6</text><text x="317" y="160">7, 8</text></g>',
      '</svg></div>',
      '<p class="p2-result"><b>',t.result,': <span data-result-symbol>A ∪ B</span> = ',
      '<output data-result-set>{1, 2, 3, 4, 5, 6}</output></b></p>',
      '<p class="p2-explain" data-explain aria-live="polite"></p>',
      '<details class="p2-regions"><summary>',t.members,'</summary>',
      '<div>A only: {1, 2} · A ∩ B: {3, 5} · B only: {4, 6} · U − (A ∪ B): {7, 8}</div></details>',
      '<div class="p2-check"><h4>',t.check,'</h4><p>',t.question,'</p>',
      '<div class="p2-choices" role="group" aria-label="',t.question,'">',
      '<button type="button" data-choice="0">{1, 2}</button>',
      '<button type="button" data-choice="1">{3, 5}</button>',
      '<button type="button" data-choice="2">{1, 2, 3, 4, 5, 6}</button></div>',
      '<button type="button" class="p2-hint" data-hint>',t.hintButton,'</button>',
      '<p class="p2-feedback" data-feedback role="status" aria-live="polite"></p></div>',
      '<details class="p2-deeper"><summary>',t.deeper,'</summary>',
      '<p><strong>',t.why,'</strong></p><p>',t.medium,'</p>',
      '<ol data-reasoning></ol><button type="button" data-next-reason>',t.reveal,'</button>',
      '<p data-reason-done role="status"></p></details>',
      '<div class="p2-paper"><span aria-hidden="true">✎</span><p>',t.closeScreen,'</p></div>',
      '<p class="p2-free">',t.noTracking,'</p>'
    ].join('');
    // All numeric examples and options above are fixed, independently authored
    // material. Nothing from an external response is inserted as markup.
    const fills = {
      union:       {universe:'#fff',a:'#dcf4e9',b:'#dcf4e9',both:'#dcf4e9'},
      intersection:{universe:'#fff',a:'#fff',b:'#fff',both:'#dcf4e9'},
      difference:  {universe:'#fff',a:'#dcf4e9',b:'#fff',both:'#fff'},
      neither:     {universe:'#dcf4e9',a:'#fff',b:'#fff',both:'#fff'}
    };
    function choose(operation) {
      if (!Object.prototype.hasOwnProperty.call(operations, operation)) return;
      section.querySelectorAll('[data-op]').forEach(button => {
        const selected = button.dataset.op === operation;
        button.setAttribute('aria-pressed', String(selected));
      });
      Object.entries(fills[operation]).forEach(([region, color]) => {
        section.querySelector('[data-fill="' + region + '"]').setAttribute('fill',color);
      });
      section.querySelector('[data-result-symbol]').textContent = operations[operation].symbol;
      section.querySelector('[data-result-set]').textContent = operations[operation].set;
      section.querySelector('[data-explain]').textContent = t[operation];
    }
    section.querySelectorAll('[data-op]').forEach(button => button.addEventListener('click', () => choose(button.dataset.op)));
    section.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click', () => {
      section.querySelectorAll('[data-choice]').forEach(x => x.setAttribute('aria-pressed',String(x === button)));
      section.querySelector('[data-feedback]').textContent = button.dataset.choice === '1' ? t.correct : t.incorrect;
    }));
    section.querySelector('[data-hint]').addEventListener('click', () => {
      section.querySelector('[data-feedback]').textContent = t.hint;
    });
    let revealed = 0;
    section.querySelector('[data-next-reason]').addEventListener('click', () => {
      const list = section.querySelector('[data-reasoning]');
      if (revealed >= t.notes.length) return;
      const li=document.createElement('li');
      li.textContent=t.notes[revealed++];
      list.append(li);
      if (revealed === t.notes.length) {
        section.querySelector('[data-next-reason]').hidden=true;
        section.querySelector('[data-reason-done]').textContent=t.complete;
      }
    });
    choose('union');
    container.append(section);
    return true;
  }
  window.TriggleLab = Object.freeze({mount});
})();
