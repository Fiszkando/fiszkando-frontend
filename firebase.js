// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqdF29bCrgf32-7DWwWFtlo54skxw1fKw",
  authDomain: "fiszkando-9e1d0.firebaseapp.com",
  projectId: "fiszkando-9e1d0",
  storageBucket: "fiszkando-9e1d0.appspot.com",
  messagingSenderId:"488295227624",
  appId: "1:488295227624:web:31e77c3cf03efab725695d",
  measurementId: "G-NMET7NBDL8",
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore();