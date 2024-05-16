// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDniszkBZIpMFb2xYThllmnrDAeE4ywuHs",
  authDomain: "todofirebase-7ff00.firebaseapp.com",
  projectId: "todofirebase-7ff00",
  storageBucket: "todofirebase-7ff00.appspot.com",
  messagingSenderId: "854460130855",
  appId: "1:854460130855:web:d4e3dc43ee37bdcab11002"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firestoreDb = getFirestore(firebaseApp)
