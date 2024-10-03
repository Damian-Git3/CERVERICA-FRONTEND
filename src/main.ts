import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { bootstrapApplication } from '@angular/platform-browser';
import '@stripe/stripe-js';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);

// Register the service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    }).catch((err) => {
      console.log('Service Worker registration failed:', err);
    });
}
