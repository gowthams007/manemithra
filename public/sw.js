const CACHE_NAME = "manemithra-cache-v2";
const ASSETS = [
  "/",
  "/manifest.json",
  "/icon.svg",
  "/favicon.ico"
];

// Install Event - cache core static resources
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate Event - clean up deprecated caches
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - network first with cache fallback
self.addEventListener("fetch", (e) => {
  // Only intercept HTTP/S GET requests (skip chrome extensions / internal schemes)
  if (!e.request.url.startsWith(self.location.origin) || e.request.method !== "GET") {
    return;
  }

  e.respondWith(
    fetch(e.request)
      .then((response) => {
        // Cache successful network responses dynamically
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Retrieve from cache on offline connectivity
        return caches.match(e.request).then((cachedResponse) => {
          return cachedResponse || new Response("Offline mode active. Check network details.", {
            status: 503,
            statusText: "Service Unavailable"
          });
        });
      })
  );
});
