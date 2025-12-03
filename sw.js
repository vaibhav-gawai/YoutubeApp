// Simple Service Worker
self.addEventListener('install', function(event) {
    console.log('Service Worker installed');
});

self.addEventListener('activate', function(event) {
    console.log('Service Worker activated');
});

self.addEventListener('fetch', function(event) {
    // Just pass through, don't cache
    event.respondWith(fetch(event.request));
});