// Minimal service worker just to make the PWA installable

self.addEventListener('install', event => {
  // Activate immediately after installation
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  // Take control of open pages
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  // For this wrapper we don't cache aggressively.
  // Just let the network handle everything.
  return; // no-op
});
