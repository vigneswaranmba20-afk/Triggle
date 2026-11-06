const CACHE='triggle-shell-v1.28-diwali';
const CORE=['./index.html','./class9-classic.html','./grades.html','./playground.html','./assets/app.css','./assets/app.js','./assets/visual-lessons.js','./data/video-lessons.json','./data/video-production-plan.json','./assets/guided-lessons.js','./assets/deep-lessons.js','./assets/deep-experience.js','./assets/diagrams.js','./assets/concept-figures.js','./data/class-9.js','./data/class-10.js','./data/class-11.js','./data/class-12.js','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'];
CORE.push('./assets/diwali.js');
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('triggle-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==self.location.origin)return;
 // Do not intercept, cache, or prefetch byte-range video requests. The browser owns streaming and seeking.
 if(e.request.destination==='video'||/\.mp4$/i.test(u.pathname)||e.request.headers.has('range'))return;
 e.respondWith(fetch(e.request).then(r=>{if(r.ok){const clone=r.clone();caches.open(CACHE).then(c=>c.put(e.request,clone));}return r;}).catch(async()=>{const cache=await caches.open(CACHE),local=await cache.match(e.request,{ignoreSearch:true});if(local)return local;if(e.request.mode==='navigate')return cache.match('./index.html');return Response.error();}));
});
