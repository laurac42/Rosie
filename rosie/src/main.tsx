import React from 'react';
import { createRoot } from 'react-dom/client';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import App from './App';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getMessaging,  getToken, onMessage } from 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const container = document.getElementById('root');
const root = createRoot(container!);
// Call the element loader before the render call
defineCustomElements(window);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/Rosie/service-worker.js')
  .then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);
  }).catch(function(error) {
      console.log('Service Worker registration failed:', error);
  });
}

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBucqhO4SYwWQck0ifh1vfkRkL9ClxWr4Y",
  authDomain: "rosie-e4cd8.firebaseapp.com",
  projectId: "rosie-e4cd8",
  storageBucket: "rosie-e4cd8.firebasestorage.app",
  messagingSenderId: "588523967326",
  appId: "1:588523967326:web:c3c146147faa09c320b5cf",
  measurementId: "G-C36FD8FZ7C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
export { messaging, getToken, onMessage };