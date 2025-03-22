// this means that the service worker is actively listening for push events. So if it hears on in the background it will respond
// came from - https://github.com/mdn/serviceworker-cookbook/blob/master/push-payload/service-worker.js
self.addEventListener('push', function (event) {
  const payload = event.data ? event.data.text() : 'Reminder from Rosie';

  // Keep the service worker alive until the notification is created.
  event.waitUntil(
    self.registration.showNotification('Period Notification', {
      body: payload,
      icon: "/Rosie/rose.png"
    })
  );
});

var CACHE_NAME = 'rosie-PWA-localStorage';
var urlsToCache = [
  './Rosie',
  './Rosie/SignUp',
  './Rosie/SignUp/Preferences',
  './Rosie/SignUp/EnterDetails',
  './Rosie/SignUp/Welcome',
  './Rosie/SignUp/PrivacyPolicy',
  './Rosie/Menu/AboutUs',
  './Rosie/Analysis',
  './Rosie/Menu/Appearance',
  './Rosie/Calendar',
  './Rosie/Cycle',
  './Rosie/Track'
];

// on install
self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
      return Promise.all(
        urlsToCache.map(url => 
          cache.add(url).catch(err => console.log(`Failed to cache ${url}`, err))
        )
      );
    })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

self.addEventListener('fetch', function (event) {
  console.log(event.request);
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // Cache hit - return response
        if (response) {
          console.log("response found")
          return response;
        }
        else {
          console.log("no response found")
        }

        return fetch(event.request).then(
          function (response) {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function (cache) {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
      })
  );
});


// this is used to clean cache - https://www.monterail.com/blog/pwa-working-offline
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.keys()
          .then(cacheNames => {
            return Promise.all(
              cacheNames.filter(cacheName => {
                return $FILES.indexOf(cacheName) === -1;
              }).map(cacheName => {
                return caches.delete(cacheName);
              })
            );
          })
          .then(() => {
            return self.clients.claim();
          });
      })
  );
}); 