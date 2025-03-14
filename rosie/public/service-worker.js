var CACHE_NAME = 'Rosie-localStorage';
// need to add more to this 
var urlsToCache = [
  './',
  './Rosie/',
  './Rosie/SignUp/Preferences',
  './Rosie/SignUp',
  './Rosie/SignUp/EnterDetails'
];

const firebaseConfig = {
    apiKey: "AIzaSyBucqhO4SYwWQck0ifh1vfkRkL9ClxWr4Y",
    authDomain: "rosie-e4cd8.firebaseapp.com",
    projectId: "rosie-e4cd8",
    storageBucket: "rosie-e4cd8.firebasestorage.app",
    messagingSenderId: "588523967326",
    appId: "1:588523967326:web:c3c146147faa09c320b5cf",
    measurementId: "G-C36FD8FZ7C"
  };
  

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

self.addEventListener('activate', function(event) {
    // Clean up any old caches during activation
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName !== 'my-cache') {
              return caches.delete(cacheName);
            }
          })
        );
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

self.addEventListener('push', function(event) {
    var options = {
      body: event.data.text(),
      icon: '/images/icon.png',  // Customize with your app's icon
      badge: '/images/badge.png'
    };
  
    event.waitUntil(
      self.registration.showNotification('New Notification', options)
    );
  });