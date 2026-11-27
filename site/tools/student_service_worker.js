/* Generated release metadata is injected by build_student_release.cjs. */
'use strict';

const release = /* STUDENT_RELEASE */ null;
const scope = self.registration.scope;
const prefix = 'triggle-lightspeed-';
const cacheName = prefix + release.version;
const url = file => new URL(file, scope).href;
const shell = url('./index.html');
const immutable = new Set(release.immutable.map(url));
const media = new Set(release.media.map(url));
const shellAssets = release.shell.map(url);
const chapters = Object.keys(release.chapters);
const fonts = release.fonts.map(url);
const cache = () => caches.open(cacheName);
const legacy = name => name.startsWith('triggle-') && !name.startsWith(prefix);

function pageChapter(address) {
  const query = new URL(address).searchParams;
  const grade = query.get('class') === '10' ? 10 : 9;
  const chapter = query.has('question')
    ? release.ids[grade][query.get('question')]
    : query.get('chapter');
  return chapters.includes(chapter) ? chapter : null;
}

function canonical(address) {
  const target = new URL(address);
  if (!target.href.startsWith(scope)) return '';
  if (immutable.has(target.href)) return target.href;
  target.search = '';
  return media.has(target.href) ? target.href : '';
}

async function fetchAsset(address, current, request = address) {
  const response = await fetch(request);
  if (response.ok && response.type !== 'opaque') {
    // Storage quota or browser eviction must never prevent online learning.
    try { await current.put(address, response.clone()); } catch {}
  }
  return response;
}

const saving = new Map();
async function store(current, address) {
  if (await current.match(address)) return true;
  if (!saving.has(address)) {
    saving.set(address, fetchAsset(address, current)
      .then(response => response.ok, () => false)
      .finally(() => saving.delete(address)));
  }
  return saving.get(address);
}

async function saveInBatches(current, addresses) {
  const files = [...new Set(addresses)];
  for (let i = 0; i < files.length; i += 5) {
    await Promise.all(files.slice(i, i + 5).map(address => store(current, address)));
  }
}

async function carryForward(current) {
  const visited = new Set();
  const supporting = new Set();
  const legacyFigures = new Map();
  for (const name of await caches.keys()) {
    if (name === cacheName || (!legacy(name) && !name.startsWith(prefix))) continue;
    const prior = await caches.open(name);
    for (const entry of await prior.keys()) {
      const address = new URL(entry.url);
      if (!address.href.startsWith(scope)) continue;
      if (legacy(name)) {
        // Previous releases precached every chapter. Only keep chapters for
        // which an actual navigation was stored, plus the current visit.
        if (address.pathname === new URL(shell).pathname && address.search) {
          const chapter = pageChapter(address);
          if (chapter) visited.add(chapter);
        }
      } else {
        const key = address.pathname.match(/\/student-(g(?:9|10)-ch[1-9])\.[a-f\d]+\.js$/)?.[1];
        if (chapters.includes(key)) visited.add(key);
      }
      const file = canonical(address.href);
      if (!file || shellAssets.includes(file)) continue;
      if (!legacy(name)) supporting.add(file);
      else if (media.has(file)) {
        const folder = new URL(file).pathname.slice(new URL(scope).pathname.length);
        const match = folder.match(/^assets\/grade(9|10)-ch([1-9])\//);
        const owner = match ? 'g'+match[1]+'-ch'+match[2] : folder.startsWith('assets/grade10-geometry/') ? 'g10-ch4' : null;
        if (owner) legacyFigures.set(file,owner);
      }
    }
  }
  const required = [...visited].flatMap(key => release.chapters[key].map(url));
  if (visited.size) required.push(...fonts);
  for (const [file,owner] of legacyFigures) {
    if (visited.has(owner)) supporting.add(file);
  }
  // Revalidate visited releases' dependencies against the current files.
  await saveInBatches(current, [...required, ...supporting]);
  if (!(await Promise.all(required.map(file => current.match(file)))).every(Boolean)) {
    throw Error('Triggle could not migrate previously opened chapters');
  }
}

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const current = await cache();
    try {
      const response = await fetch(new Request(shell, {cache:'reload'}));
      if (!response.ok || !(await response.clone().text()).includes('data-student-release="' + release.version + '"')) {
        throw Error('Triggle release shell mismatch');
      }
      // Cache.addAll is atomic. A partial shell never becomes an active worker.
      await current.addAll(shellAssets);
      await current.put(shell, response);
      await carryForward(current);
    } catch (error) {
      await caches.delete(cacheName);
      throw error;
    }
    // The currently active release stays in control until its clients close.
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const others = (await caches.keys()).filter(name => name !== cacheName && (legacy(name) || name.startsWith(prefix)));
    await Promise.all(others.map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

async function navigation(request) {
  const current = await cache();
  const saved = await current.match(shell);
  if (saved) return saved;
  // Browser storage can evict this cache. The normal online visit can recover.
  const response = await fetch(request);
  if (response.ok && (await response.clone().text()).includes('data-student-release="' + release.version + '"')) {
    try { await current.put(shell, response.clone()); } catch {}
  }
  return response;
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || !request.url.startsWith(scope) ||
      request.headers.has('range') || request.destination === 'video') return;
  const address = new URL(request.url);
  if (request.mode === 'navigate' && [scope, shell].includes(address.origin + address.pathname)) {
    event.respondWith(navigation(request));
    return;
  }
  const key = canonical(request.url);
  if (!key) return;
  event.respondWith((async () => {
    const current = await cache();
    return await current.match(key) || fetchAsset(key, current, request);
  })());
});

self.addEventListener('message', event => {
  const data = event.data;
  if (data?.type !== 'triggle-save-offline' || data.version !== release.version ||
      !event.source?.url.startsWith(scope)) return;
  event.waitUntil((async () => {
    const current = await cache();
    const chapter = chapters.includes(data.chapter) ? data.chapter : null;
    const requested = (Array.isArray(data.resources) ? data.resources : []).slice(0, 100)
      .map(canonical).filter(Boolean);
    const required = chapter ? [...release.chapters[chapter].map(url), ...fonts] : [];
    await saveInBatches(current, [...required, ...requested]);
    const saved = (await Promise.all([...required, ...requested].map(file => current.match(file)))).every(Boolean);
    event.ports[0]?.postMessage({saved});
  })().catch(() => event.ports[0]?.postMessage({saved:false})));
});
