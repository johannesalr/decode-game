// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Export the services you need
export { auth, db };
