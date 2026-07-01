const CACHE_NAME = 'avatar2036-v2036.1.0';
const STATIC_CACHE = 'avatar2036-static-v2036';
const DYNAMIC_CACHE = 'avatar2036-dynamic-v2036';
const IMAGE_CACHE = 'avatar2036-images-v2036';
const FONT_CACHE = 'avatar2036-fonts-v2036';

const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './sw.js',
  './ai-engine.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== STATIC_CACHE && key !== DYNAMIC_CACHE && key !== IMAGE_CACHE && key !== FONT_CACHE)
          .map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;

  if (url.pathname.endsWith('.html') || url.pathname === '/' || url.pathname.endsWith('/index.html')) {
    event.respondWith(networkFirst(request, STATIC_CACHE));
    return;
  }

  if (request.destination === 'image' || url.pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico)$/i)) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  if (request.destination === 'font' || url.pathname.match(/\.(woff|woff2|ttf|otf|eot)$/i)) {
    event.respondWith(cacheFirst(request, FONT_CACHE));
    return;
  }

  if (url.pathname.match(/\.(css|js)$/i)) {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
    return;
  }

  event.respondWith(networkFirst(request, DYNAMIC_CACHE));
});

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (e) {
    return new Response('Offline', { status: 503 });
  }
}

async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (e) {
    const cached = await caches.match(request);
    if (cached) return cached;
    return caches.match('./index.html');
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request).then(response => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => cached);
  return cached || fetchPromise;
}

self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

self.addEventListener('periodicsync', event => {
  if (event.tag === 'periodic-sync') {
    event.waitUntil(periodicSync());
  }
});

self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : { title: 'AVATAR 2036', body: 'New update available!' };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"%3E%3Crect width="512" height="512" rx="128" fill="%23020208"/%3E%3Ccircle cx="256" cy="212" r="110" fill="%238B5CF6"/%3E%3C/svg%3E',
      badge: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"%3E%3Crect width="96" height="96" rx="24" fill="%238B5CF6"/%3E%3C/svg%3E',
      vibrate: [200, 100, 200],
      tag: 'avatar2036-notification',
      renotify: true,
      data: { url: './index.html' }
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes('./index.html') && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('./index.html');
    })
  );
});

async function syncData() {
  try {
    const db = await openDB();
    const tx = db.transaction('pending-sync', 'readonly');
    const store = tx.objectStore('pending-sync');
    const items = await getAllFromStore(store);
    for (const item of items) {
      try {
        await fetch(item.url, { method: item.method, body: item.body, headers: item.headers });
        await deleteFromDB('pending-sync', item.id);
      } catch (e) { /* retry next sync */ }
    }
  } catch (e) { /* ignore */ }
}

async function periodicSync() {
  try {
    const cache = await caches.open(STATIC_CACHE);
    await cache.add('./index.html');
  } catch (e) { /* ignore */ }
}

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('avatar2036-db', 1);
    req.onupgradeneeded = e => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('pending-sync')) db.createObjectStore('pending-sync', { keyPath: 'id', autoIncrement: true });
      if (!db.objectStoreNames.contains('chat-history')) db.createObjectStore('chat-history', { keyPath: 'id', autoIncrement: true });
      if (!db.objectStoreNames.contains('settings')) db.createObjectStore('settings', { keyPath: 'key' });
      if (!db.objectStoreNames.contains('notes')) db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
    };
    req.onsuccess = e => resolve(e.target.result);
    req.onerror = e => reject(e.target.error);
  });
}

function getAllFromStore(store) {
  return new Promise((resolve, reject) => {
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function deleteFromDB(storeName, id) {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('avatar2036-db', 1);
    req.onsuccess = e => {
      const db = e.target.result;
      const tx = db.transaction(storeName, 'readwrite');
      tx.objectStore(storeName).delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    };
    req.onerror = () => reject(req.error);
  });
}