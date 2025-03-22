import React from 'react';
import { createRoot } from 'react-dom/client';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import ReactPWAInstallProvider, { useReactPWAInstall } from "react-pwa-install";
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);
// Call the element loader before the render call
defineCustomElements(window);
root.render(
  <ReactPWAInstallProvider enableLogging>
    <App />
  </ReactPWAInstallProvider>
);
// clear other servcie workers

// register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/Rosie/service-worker.js')
  .then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);
  }).catch(function(error) {
      console.log('Service Worker registration failed:', error);
  });
}
