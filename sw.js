/* Carmen Elena Organiza — offline service worker */
const CACHE = 'carelena-v4';
const ASSETS = ['./', './index.html', './manifest.json', './icon-180.png', './icon-512.png', './watermark.jpg?v=2'];

self.addEventListener('install', e => {
  // Pre-cache the app shell, but wait (don't skipWaiting) so the page can
  // offer a gentle "new version" banner instead of updating out from under you.
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
});

// The page tells us to activate the waiting worker when the user taps "Actualizar".
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const isDoc = req.mode === 'navigate' || req.destination === 'document'
             || req.url.endsWith('/') || req.url.endsWith('index.html');
  if (isDoc) {
    // Network-first for the app itself, so the latest version always arrives when online.
    e.respondWith(
      fetch(req).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return resp;
      }).catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
  } else {
    // Cache-first for images / manifest (fast + offline).
    e.respondWith(
      caches.match(req).then(cached =>
        cached || fetch(req).then(resp => {
          const copy = resp.clone();
          caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
          return resp;
        }).catch(() => cached)
      )
    );
  }
});
