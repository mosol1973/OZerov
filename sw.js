// sw.js - Service Worker для OZerov на GitHub Pages
const CACHE_NAME = 'ozerov-cache-v3';
const OFFLINE_URL = '/OZerov/offline.html'; // Опционально

// Список ресурсов для кэширования (используем относительные пути)
const urlsToCache = [
  '/OZerov/',
  '/OZerov/index.html',
  '/OZerov/manifest.json',
  '/OZerov/css/styles.css',
  '/OZerov/js/script.js',
  '/OZerov/images/icon-192.png',
  '/OZerov/images/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[ServiceWorker] Кэшируем основные ресурсы');
        return Promise.all(
          urlsToCache.map(url => {
            return fetch(url)
              .then(response => {
                if (!response.ok) {
                  throw new Error(`Ошибка ${response.status} для ${url}`);
                }
                return cache.put(url, response);
              })
              .catch(err => {
                console.warn(`[ServiceWorker] Пропуск ${url}:`, err.message);
              });
          })
        );
      })
      .then(() => {
        console.log('[ServiceWorker] Все ресурсы успешно кэшированы');
        return self.skipWaiting();
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('[ServiceWorker] Удаляем старый кэш:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match('/OZerov/index.html');
        })
    );
  } else {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          return response || fetch(event.request);
        })
    );
  }
});
