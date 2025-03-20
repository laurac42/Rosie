var CACHE_NAME = 'Rosie-localStorage';
var urlsToCache = [
  './',
  './Rosie/'
];

self.addEventListener('install', function(event) {
    console.log("service worked installed")
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
    console.log("fetching")
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
      })
    );
});

// Front-end **Service Worker** listening for events
self.addEventListener("push", (event) => {
    const data = event.data.json() // Payload from the server, assumed to be in JSON format
  
    event.waitUntil(
      // Upon receiving the push event, call **Notifications API** to push the notification
      self.registration.showNotification(
        data.title ? data.title : "New Message",
        {
          body: data.body,
          badge: "rose.png",
          vibrate: [200, 100, 200],
          timestamp: Date.now(),
          data: { use_to_open_specific_page: data.props }, // Custom data sent from the server
        }
      )
    )
})