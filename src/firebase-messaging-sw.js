// This sample application is using 9.22, make sure you are importing the same version

importScripts('https://www.gstatic.com/firebasejs/10.14.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.0/firebase-messaging-compat.js');


// TODO: Replace the following with your app's Firebase project configuration
const firebaseApp = {
  apiKey: "AIzaSyD0vZZ47mNW1MVhpmTTnVrtCdYoB-WdNKU",
  authDomain: "fir-notificaciones-25085.firebaseapp.com",
  projectId: "fir-notificaciones-25085",
  storageBucket: "fir-notificaciones-25085.appspot.com",
  messagingSenderId: "1040299181492",
  appId: "1:1040299181492:web:268c7b046843ed07b39ee1",
  measurementId: "G-EFN628LXN9"
};

firebase.initializeApp(firebaseApp);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});


