/* A single, optional Diwali celebration per browser profile and India calendar day. */
(() => {
  'use strict';
  const storageKey = 'triggle:diwali:last-shown';
  // November 8 is inclusive: midnight at the start of November 9 in India.
  const expiresAt = Date.parse('2026-11-09T00:00:00+05:30');
  const greeting = document.getElementById('diwaliGreeting');
  const effects = document.getElementById('diwaliEffects');
  if (!greeting || !effects || Date.now() >= expiresAt || document.hidden) return;

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const listeners = new AbortController();
  const timers = new Set();
  const pendingScripts = new Set();
  let disposed = false;
  let fireworks;
  let confetti;
  let shownDay;

  // IST has a fixed UTC+05:30 offset; use the same day boundary as the cutoff.
  const today = () => new Date(Date.now() + 19800000).toISOString().slice(0, 10);
  function later(callback, delay) {
    const timer = window.setTimeout(() => {
      timers.delete(timer);
      if (!disposed) callback();
    }, delay);
    timers.add(timer);
    return timer;
  }

  function dispose() {
    if (disposed) return;
    disposed = true;
    greeting.hidden = true;
    effects.hidden = true;
    listeners.abort();
    for (const timer of timers) window.clearTimeout(timer);
    timers.clear();
    for (const cancel of [...pendingScripts]) cancel();
    // stop(true) cancels Fireworks.js's frame loop and removes its canvas/listeners.
    fireworks?.stop(true);
    confetti?.reset();
    effects.replaceChildren();
  }

  function listen(target, type, callback) {
    target.addEventListener(type, callback, { signal: listeners.signal });
  }
  listen(document.getElementById('diwaliDismiss'), 'click', dispose);
  listen(document, 'keydown', event => {
    if (event.key === 'Escape' && !greeting.hidden) dispose();
  });
  // Lifecycle events only stop the celebration. They never claim or replay it.
  listen(window, 'pagehide', dispose);
  listen(document, 'visibilitychange', () => { if (document.hidden) dispose(); });
  listen(motion, 'change', () => { if (motion.matches) dispose(); });
  listen(window, 'storage', event => {
    if (event.key === storageKey || event.key === null) {
      // A claim in another tab also cancels a queued initialization in this one.
      dispose();
    }
  });

  function loadScript(src, integrity) {
    return new Promise(resolve => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.integrity = integrity;
      script.crossOrigin = 'anonymous';
      function finish(loaded) {
        window.clearTimeout(timeout);
        timers.delete(timeout);
        pendingScripts.delete(cancel);
        script.onload = script.onerror = null;
        if (!loaded) script.remove();
        resolve(loaded);
      }
      const cancel = () => finish(false);
      const timeout = later(cancel, 4000);
      pendingScripts.add(cancel);
      script.onload = () => finish(true);
      script.onerror = cancel;
      document.head.append(script);
    });
  }

  async function animate() {
    const [hasFireworks, hasConfetti] = await Promise.all([
      loadScript('https://cdn.jsdelivr.net/npm/fireworks-js@2.10.8/dist/index.umd.js',
        'sha384-D8v9Gvk91IZOYEwFeNp0CV2QAzIR++62X8P80wntECcCGNDjmMBaLZafSXfQ1Qt7'),
      loadScript('https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js',
        'sha384-sPwMflxqfAN+Q5mvlkLmHiX3PORGbZSXHiSGPTXT9VHCD/AB+b+r+vJWsqprv+7k')
    ]);
    if (disposed) return;
    if (document.hidden || motion.matches || Date.now() >= expiresAt) { dispose(); return; }
    effects.hidden = false;
    if (hasFireworks && window.Fireworks?.Fireworks) {
      try {
        fireworks = new window.Fireworks.Fireworks(document.getElementById('diwaliFireworks'), {
          autoresize: false, opacity: 0.35, intensity: 18, particles: 45,
          acceleration: 1.03, friction: 0.97, gravity: 1.2,
          traceLength: 3, traceSpeed: 6, flickering: 30,
          rocketsPoint: { min: 15, max: 85 },
          hue: { min: 15, max: 330 }, brightness: { min: 65, max: 90 },
          decay: { min: 0.018, max: 0.03 },
          mouse: { click: false, move: false }, sound: { enabled: false }
        });
        fireworks.start();
        listen(window, 'resize', () => fireworks.updateSize());
      } catch (_) { /* The greeting still works if canvas is unavailable. */ }
    }
    if (hasConfetti && window.confetti?.create) {
      try {
        confetti = window.confetti.create(document.getElementById('diwaliConfetti'), {
          resize: true, useWorker: false, disableForReducedMotion: true
        });
        const burst = () => {
          const particleCount = window.innerWidth < 600 ? 24 : 42;
          for (const side of [0, 1]) confetti({
            particleCount, angle: side ? 120 : 60, spread: 65, startVelocity: 38,
            gravity: 0.85, ticks: 180, scalar: 0.9,
            colors: ['#ffd783', '#f5ac52', '#e87ba7', '#aa8cf5', '#66cbb6'],
            origin: { x: side, y: 0.65 }, disableForReducedMotion: true
          });
        };
        burst();
        later(burst, 1600);
        later(burst, 3200);
      } catch (_) { /* A blocked optional effect must not affect mathematics lessons. */ }
    }
  }

  async function initialize() {
    // Web Locks serialize the read/write across tabs; storage events alone cannot
    // prevent simultaneous first visits from both winning. Fail closed if either
    // locking or persistent storage is unavailable, so reloads cannot replay.
    if (!navigator.locks?.request) { dispose(); return; }
    let claimed = false;
    await navigator.locks.request(storageKey, () => {
      if (disposed || document.hidden || Date.now() >= expiresAt) return;
      shownDay = today();
      if (localStorage.getItem(storageKey) === shownDay) return;
      localStorage.setItem(storageKey, shownDay);
      claimed = localStorage.getItem(storageKey) === shownDay;
    });
    if (disposed) return;
    if (!claimed || document.hidden || Date.now() >= expiresAt || today() !== shownDay) {
      dispose(); return;
    }
    greeting.hidden = false;
    later(dispose, Math.min(12000, expiresAt - Date.now()));
    if (!motion.matches) await animate();
  }
  initialize().catch(dispose);
})();
