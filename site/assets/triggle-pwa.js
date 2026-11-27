(() => {
  'use strict';
  const get = id => document.getElementById(id);
  const dialog = get('triggleInstallDialog');
  const install = get('triggleNativeInstall');
  const standalone = matchMedia('(display-mode: standalone)');
  const isStandalone = () => standalone.matches || navigator.standalone === true;
  const strings = {
    en: {
      install: 'Install Triggle', about: 'About Triggle', close: 'Close',
      subtitle: 'Samacheer Kalvi Mathematics — Grades 9 & 10',
      benefits: 'Free in English and Tamil. No account required. Previously downloaded lessons are available offline while they remain on this device.',
      publisher: '© 2026 VER labs · Independent learning app aligned with the Tamil Nadu State Board curriculum.',
      native: 'Install from this browser without a Play Store download.',
      android: 'Open the browser menu ⋮ and look for Install app or Add to Home screen. If the menu offers only a shortcut, it opens Triggle in your browser. If the option is missing, try opening this page directly in Chrome.',
      edge: 'In Microsoft Edge, open the menu and look for Apps or Add to phone. Menu options vary by device.',
      ios: 'In Safari, open Share and choose Add to Home Screen.',
      browser: 'In Chrome or Edge, look for Install in the address bar or browser menu. You can also use Triggle in this browser.',
      installed: 'Triggle is running as an installed app.', confirmed: 'This browser reported that Triggle was installed.',
      accepted: 'Installation accepted. Check your home screen or app drawer.',
      dismissed: 'Installation dismissed. You can keep learning here.',
      failed: 'The browser could not open its installation prompt. Try its menu.',
      offline: 'You’re offline. Previously downloaded lessons are available.',
    },
    ta: {
      install: 'Triggle செயலியை நிறுவுக', about: 'Triggle பற்றி', close: 'மூடு',
      subtitle: 'சமச்சீர் கல்வி கணிதம் — 9 மற்றும் 10 ஆம் வகுப்புகள்',
      benefits: 'ஆங்கிலத்திலும் தமிழிலும் இலவசம். கணக்கு தேவையில்லை. ஏற்கெனவே பதிவிறக்கம் செய்த பாடங்கள் இந்தச் சாதனத்தில் இருக்கும் வரை இணையமின்றிப் படிக்கலாம்.',
      publisher: '© 2026 VER labs · தமிழ்நாடு மாநிலப் பாடத்திட்டத்தைப் பின்பற்றும் தனித்த கல்விச் செயலி.',
      native: 'Play Store இலிருந்து பதிவிறக்கம் செய்யாமல் இந்த உலாவியிலேயே நிறுவலாம்.',
      android: 'உலாவியின் ⋮ பட்டியலில் Install app அல்லது Add to Home screen என்பதைத் தேடுங்கள். குறுக்குவழி மட்டும் கிடைத்தால், அது Triggle-ஐ உலாவியில் திறக்கும். அந்தத் தேர்வு இல்லாவிட்டால், இந்தப் பக்கத்தை Chrome உலாவியில் நேரடியாகத் திறக்கவும்.',
      edge: 'Microsoft Edge பட்டியலில் Apps அல்லது Add to phone என்பதைத் தேடுங்கள். சாதனத்தைப் பொறுத்துத் தேர்வுகள் மாறலாம்.',
      ios: 'Safari உலாவியில் Share பட்டியலில் உள்ள Add to Home Screen என்பதைத் தேர்ந்தெடுங்கள்.',
      browser: 'Chrome அல்லது Edge உலாவியின் முகவரிப் பட்டையிலோ பட்டியலிலோ Install என்பதைத் தேடுங்கள். இந்த உலாவியிலேயே Triggle-ஐப் பயன்படுத்தலாம்.',
      installed: 'Triggle நிறுவப்பட்ட செயலியாக இயங்குகிறது.', confirmed: 'Triggle நிறுவப்பட்டதாக இந்த உலாவி தெரிவித்துள்ளது.',
      accepted: 'நிறுவுதல் ஏற்கப்பட்டது. முகப்புத் திரையையோ செயலிப் பட்டியலையோ பார்க்கவும்.',
      dismissed: 'நிறுவுதல் தவிர்க்கப்பட்டது. இங்கேயே தொடர்ந்து படிக்கலாம்.',
      failed: 'உலாவியால் நிறுவும் அறிவிப்பைத் திறக்க முடியவில்லை. அதன் பட்டியலைப் பயன்படுத்திப் பாருங்கள்.',
      offline: 'இணைய இணைப்பு இல்லை. ஏற்கெனவே பதிவிறக்கம் செய்த பாடங்களைப் படிக்கலாம்.',
    },
  };
  let prompt;
  let outcome;
  let opener;
  let confirmed = false;
  let display;
  const canonical = document.querySelector('link[rel=canonical]');
  const publicEntry = canonical.href;

  function updateIdentity() {
    const route = new URLSearchParams(location.search);
    const language = document.documentElement.lang;
    const title = 'Triggle — Samacheer Kalvi Mathematics (Grades 9 & 10)';
    const target = new URL(publicEntry);
    for (const key of ['class','chapter','question','section','concept']) {
      if (route.has(key)) target.searchParams.set(key,route.get(key));
    }
    const grade = Number(route.get('class'));
    const row = window.TRIGGLE_CURRICULUM?.grades.find(entry => entry.grade === grade);
    const chapter = row?.chapters.find(entry => entry.id === route.get('chapter'))?.title[language];
    document.title = chapter ? chapter+' | '+title : grade ? (language === 'ta' ? grade+' ஆம் வகுப்பு' : 'Grade '+grade)+' | '+title : title;
    for (const link of document.querySelectorAll('link[hreflang]')) {
      const alternate = new URL(target);
      if (link.hreflang !== 'x-default') alternate.searchParams.set('lang',link.hreflang);
      link.href = alternate.href;
    }
    if (language === 'ta' || route.get('lang') === 'en') target.searchParams.set('lang',language);
    canonical.href = target.href;
    document.querySelector('meta[property="og:url"]').content = target.href;
    document.querySelector('meta[property="og:title"]').content = document.title;
  }
  const language = () => document.documentElement.lang === 'ta' ? 'ta' : 'en';

  function browserHelp(t) {
    const agent = navigator.userAgent;
    if (/iPhone|iPad|iPod/i.test(agent)) return t.ios;
    if (/Android/i.test(agent)) return /EdgA/i.test(agent) ? t.edge : t.android;
    return t.browser;
  }

  function update() {
    const t = strings[language()];
    const installed = isStandalone() || confirmed;
    const title = installed ? t.about : t.install;
    for (const button of document.querySelectorAll('[data-triggle-install]')) {
      if (button.textContent === title && button.hasAttribute('aria-controls')) continue;
      button.hidden = false;
      button.textContent = title;
      button.setAttribute('aria-haspopup', 'dialog');
      button.setAttribute('aria-controls', dialog.id);
    }
    const state = [t, installed, outcome, prompt, navigator.onLine];
    if (display?.every((value,index) => value === state[index])) return;
    display = state;
    get('triggleInstallClose').setAttribute('aria-label', t.close);
    get('triggleInstallTitle').textContent = title;
    get('triggleInstallSubtitle').textContent = t.subtitle;
    get('triggleInstallBenefits').textContent = t.benefits;
    get('triggleInstallPublisher').textContent = t.publisher;
    get('triggleInstallHelp').textContent = installed ? '' : prompt ? t.native : browserHelp(t);
    get('triggleInstallStatus').textContent = isStandalone() ? t.installed : confirmed ? t.confirmed : t[outcome] || '';
    install.hidden = installed || !prompt;
    install.textContent = t.install;
    const offline = get('triggleOffline');
    offline.textContent = t.offline;
    offline.hidden = navigator.onLine;
  }

  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    prompt = event;
    outcome = undefined;
    update();
  });
  window.addEventListener('appinstalled', () => {
    confirmed = true;
    prompt = undefined;
    update();
  });
  install.addEventListener('click', async () => {
    if (!prompt || isStandalone()) return;
    const nativePrompt = prompt;
    prompt = undefined;
    install.disabled = true;
    try {
      await nativePrompt.prompt();
      outcome = (await nativePrompt.userChoice).outcome === 'accepted' ? 'accepted' : 'dismissed';
    } catch {
      outcome = 'failed';
    } finally {
      install.disabled = false;
      update();
      if (dialog.open) get('triggleInstallClose').focus({preventScroll:true});
    }
  });
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-triggle-install]');
    if (!button || dialog.open) return;
    opener = button;
    update();
    dialog.showModal();
  });
  dialog.addEventListener('close', () => {
    if (opener?.isConnected) opener.focus({preventScroll:true});
    opener = undefined;
  });
  standalone.addEventListener('change', update);
  for (const event of ['online', 'offline']) window.addEventListener(event, update);
  window.addEventListener('triggle:lessonchange', () => { update(); updateIdentity(); });
  update();
  updateIdentity();

  const worker = navigator.serviceWorker;
  if (!worker) return;
  const release = window.TriggleStudentRelease;
  function register() {
    worker.register('./service-worker.js', {updateViaCache:'none'}).then(() => {
      if (release) return worker.ready.then(() => release.saveOffline());
    }).catch(() => {});
  }
  if (release) {
    // Retain the first uncontrolled page's resources after the worker claims it.
    if (document.body.classList.contains('ver-starting')) {
      window.addEventListener('triggle:ready', register, {once:true});
    } else register();
    worker.addEventListener('controllerchange', () => release.saveOffline());
  } else if (document.readyState === 'complete') register();
  else window.addEventListener('load', register, {once:true});
})();
