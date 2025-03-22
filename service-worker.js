// this means that the service worker is actively listening for push events. So if it hears on in the background it will respond
// came from - https://github.com/mdn/serviceworker-cookbook/blob/master/push-payload/service-worker.js
self.addEventListener('push', function (event) {
  // Retrieve the textual payload from event.data (a PushMessageData object).
  // Other formats are supported (ArrayBuffer, Blob, JSON), check out the documentation
  // on https://developer.mozilla.org/en-US/docs/Web/API/PushMessageData.
  const payload = event.data ? event.data.text() : 'Reminder from Rosie';

  // Keep the service worker alive until the notification is created.
  event.waitUntil(
    self.registration.showNotification('Track your Period', {
      body: payload,
      icon: "/Rosie/rose.png"
    })
  );
});

var CACHE_NAME = 'rosie-PWA-localStorage';
var urlsToCache = [
  './SignUp',
  './SignUp/Preferences',
  './SignUp/EnterDetails',
  './SignUp/Welcome',
  './SignUp/PrivacyPolicy',
  './Menu/AboutUs',
  './Analysis',
  './Menu/Appearance',
  './Calendar',
  './Cycle'
];

// on install
self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // Cache hit - return response
        if (response) {
          return response;
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