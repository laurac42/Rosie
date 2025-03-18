import React from 'react';
import { createRoot } from 'react-dom/client';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import App from './App';
import { checkTrack } from './checkTrack';

const container = document.getElementById('root');
const root = createRoot(container!);
// Call the element loader before the render call
defineCustomElements(window);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Schedule daily notifications
setInterval(() => {
  checkTrack();
}, 24 * 60 * 60 * 1000); // Run every 24 hours

// register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/Rosie/service-worker.js')
  .then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);
  }).catch(function(error) {
      console.log('Service Worker registration failed:', error);
  });
}

