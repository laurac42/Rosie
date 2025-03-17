// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

const app = firebase.initializeApp({
    apiKey: "AIzaSyBucqhO4SYwWQck0ifh1vfkRkL9ClxWr4Y",
    authDomain: "rosie-e4cd8.firebaseapp.com",
    projectId: "rosie-e4cd8",
    storageBucket: "rosie-e4cd8.firebasestorage.app",
    messagingSenderId: "588523967326",
    appId: "1:588523967326:web:c3c146147faa09c320b5cf",
    measurementId: "G-C36FD8FZ7C"
});

// Retrieve firebase messaging
const messaging = firebase.messaging(app);

onBackgroundMessage(messaging, (payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: 'rose.png'
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });