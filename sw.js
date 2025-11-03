// Workbox CDN se import
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.6.0/workbox-sw.js');

// Check agar load hua
if (workbox) {
  console.log("Workbox loaded ✅");

  // 1️⃣ Static assets cache karo (HTML, CSS, JS)
  workbox.routing.registerRoute(
    ({request}) => request.destination === 'document' ||
                   request.destination === 'script' ||
                   request.destination === 'style',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'static-resources',
    })
  );

  // 2️⃣ Images ko cache karo
  workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
      cacheName: 'images-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 30,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
        }),
      ],
    })
  );

} else {
  console.log("Workbox didn't load ❌");
}


// self.addEventListener('install', (event) => {
//   console.log('Service Worker installed');
// });

// self.addEventListener('fetch', (event) => {
//   // Optional: cache files for offline
// });
