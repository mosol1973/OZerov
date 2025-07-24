const CACHE_NAME = 'naturasnt-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/catalog.html',
  '/contacts.html',
  '/css/styles.css',
  '/images/mono.jfif',
  '/images/aptechka.webp',
  '/images/matrichnie.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});