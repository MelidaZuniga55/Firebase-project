// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9Na8uXAibpuSMcBNIwLlJ0kDZ9ts8yq0",
  authDomain: "authentification-app-cfc26.firebaseapp.com",
  projectId: "authentification-app-cfc26",
  storageBucket: "authentification-app-cfc26.firebasestorage.app",
  messagingSenderId: "461356979723",
  appId: "1:461356979723:web:7003b67bf8291bdebb190e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);