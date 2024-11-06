import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import {
  provideAnimations,
  BrowserAnimationsModule,
} from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { authInterceptor } from './auth.interceptor';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import {
  getRemoteConfig,
  provideRemoteConfig,
} from '@angular/fire/remote-config';
import { getFunctions, provideFunctions } from '@angular/fire/functions';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    BrowserModule,
    BrowserAnimationsModule,
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideClientHydration(),
    MessageService,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'es' },
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'fir-notificaciones-25085',
        appId: '1:1040299181492:web:268c7b046843ed07b39ee1',
        storageBucket: 'fir-notificaciones-25085.appspot.com',
        apiKey: 'AIzaSyD0vZZ47mNW1MVhpmTTnVrtCdYoB-WdNKU',
        authDomain: 'fir-notificaciones-25085.firebaseapp.com',
        messagingSenderId: '1040299181492',
        measurementId: 'G-EFN628LXN9',
      })
    ),
    provideMessaging(() => getMessaging()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideFunctions(() => getFunctions()),
  ],
};
