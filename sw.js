// Service Worker sin caché para permitir actualizaciones automáticas

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // siempre devuelve la versión más nueva del servidor
  event.respondWith(fetch(event.request));
});
