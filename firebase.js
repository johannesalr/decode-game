// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdsGvCiy4SWnZGvCQa3_dtGI-UBZxvxbc",
  authDomain: "decode-b0f83.firebaseapp.com",
  projectId: "decode-b0f83",
  storageBucket: "decode-b0f83.firebasestorage.app",
  messagingSenderId: "814070232321",
  appId: "1:814070232321:web:58c1502f8d5e0a15bbd700",
  measurementId: "G-WR3W3XVD0R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { db, doc, setDoc, getDocs, onSnapshot };
