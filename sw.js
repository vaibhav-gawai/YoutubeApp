// Cache name
const CACHE_NAME = 'youtube-pwa-v3';

// Install event
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  // Create cache and add core files
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching core files');
        return cache.addAll([
          '/',
          '/index.html',
          '/manifest.json'
        ]);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
  
  // Clean up old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  // Skip YouTube and external resources
  if (event.request.url.includes('youtube.com') || 
      event.request.url.includes('googlevideo.com') ||
      event.request.url.includes('ytimg.com') ||
      event.request.url.includes('google.com')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
      .catch(() => {
        // Fallback for offline
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      })
  );
});