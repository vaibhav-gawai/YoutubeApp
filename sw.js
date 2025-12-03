// Minimal service worker just to make the PWA installable

self.addEventListener("install", (event) => {
  // Activate immediately after installation
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Take control immediately
  event.waitUntil(self.clients.claim());
});

// No special caching for now – let the network handle everything
self.addEventListener("fetch", (event) => {
  // You could add caching logic here later if you want
});
