const CACHE_NAME = 'ozerov-cache-v2';
const urlsToCache = [
  '/OZerov/',
  '/OZerov/index.html',
  '/OZerov/manifest.json',
  '/OZerov/sw.js',
  '/OZerov/images/icon-192.png',
  '/OZerov/css/styles.css',
  '/OZerov/js/script.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Кэш открыт');
        return cache.addAll(urlsToCache.map(url => new Request(url, {credentials: 'same-origin'})));
      })
      .catch(err => {
        console.error('Ошибка кэширования:', err);
      })
  );
});
