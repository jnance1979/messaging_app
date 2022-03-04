// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwqZAaA2EvDJ329t_O3rClOPZJoSy8paA",
  authDomain: "messaging-app-c994d.firebaseapp.com",
  projectId: "messaging-app-c994d",
  storageBucket: "messaging-app-c994d.appspot.com",
  messagingSenderId: "198545198129",
  appId: "1:198545198129:web:e67a244f755fedaac85910",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
