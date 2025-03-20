// this means that the service worker is actively listening for push events. So if it hears on in the background it will respond
// came from - https://github.com/mdn/serviceworker-cookbook/blob/master/push-payload/service-worker.js
self.addEventListener('push', function(event) {
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