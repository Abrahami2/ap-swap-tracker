// public/service-worker.js
const CACHE_NAME = 'ap-swap-tracker-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/static/js/main.chunk.js',
  '/static/js/0.chunk.js',
  '/static/js/bundle.js',
  '/manifest.json',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png'
];

// Install the service worker and cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate the service worker and clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Serve cached content when offline
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip Firebase API requests - they should be handled by the app's offline logic
  if (event.request.url.includes('firestore.googleapis.com') || 
      event.request.url.includes('firebase')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request - a request is a stream and can only be consumed once
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          response => {
            // Don't cache if not a valid response or status is not ok
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response - a response is a stream and can only be consumed once
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        ).catch(error => {
          // If fetch fails, show fallback content
          console.log('Fetch failed; returning offline page instead.', error);
          
          // You could return a custom offline page here
          // return caches.match('/offline.html');
        });
      })
  );
});

// Background sync for offline updates
self.addEventListener('sync', event => {
  if (event.tag === 'sync-ap-updates') {
    event.waitUntil(syncAPUpdates());
  }
});

// Function to sync AP updates from IndexedDB to Firebase when online
function syncAPUpdates() {
  // This would be implemented with IndexedDB
  console.log('Syncing AP updates to Firebase...');
  // Read pending updates from IndexedDB and send to Firebase
  return Promise.resolve();
}