// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0vZZ47mNW1MVhpmTTnVrtCdYoB-WdNKU",
  authDomain: "fir-notificaciones-25085.firebaseapp.com",
  projectId: "fir-notificaciones-25085",
  storageBucket: "fir-notificaciones-25085.appspot.com",
  messagingSenderId: "1040299181492",
  appId: "1:1040299181492:web:268c7b046843ed07b39ee1",
  measurementId: "G-EFN628LXN9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);