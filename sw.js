// Simple Service Worker - Just enough for PWA install
const CACHE_NAME = 'youtube-pwa-minimal';

self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  // Skip waiting to activate immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
  // Take control of all clients
  event.waitUntil(clients.claim());
});

// Very basic fetch handling
self.addEventListener('fetch', (event) => {
  // Don't cache or intercept anything - just pass through
  // This minimal approach works better for our use case
  event.respondWith(fetch(event.request));
});