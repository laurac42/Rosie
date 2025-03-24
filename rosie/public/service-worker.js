// this means that the service worker is actively listening for push events. So if it hears on in the background it will respond
// came from - https://github.com/mdn/serviceworker-cookbook/blob/master/push-payload/service-worker.js
self.addEventListener('push', function (event) {
  const payload = event.data ? event.data.text() : 'Reminder from Rosie';

  // Keep the service worker alive until the notification is created.
  event.waitUntil(
    self.registration.showNotification('Period Notification', {
      body: payload,
      icon: "/rose.png"
    })
  );
});

var CACHE_NAME = 'rosie-PWA-localStorage';
var urlsToCache = [
  './rose.png',
  './cyc.png',
  './analyse.png',
  './calend.png', 
  './trk.png',
  './manifest.json'
];

// on install
self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
      return Promise.all(
        urlsToCache.map(url => 
          // cache them one by one to catch errors
          cache.add(url).catch(err => console.log(`Failed to cache ${url}`, err))
        )
      );
    })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

/*self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request).then(fetchResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      });
    })
  );
});*/


// this is used to clean cache - https://www.monterail.com/blog/pwa-working-offline
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.keys()
          .then(cacheNames => {
            return Promise.all(
              urlsToCache.map(url => 
                fetch(url)
                  .then(response => {
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    return cache.put(url, response);
                  })
                  .then(() => console.log(`Cached: ${url}`))
                  .catch(err => console.warn(`Failed to cache: ${url}`, err))
              )
            );
          })
          .then(() => {
            return self.clients.claim();
          });
      })
  );
}); 