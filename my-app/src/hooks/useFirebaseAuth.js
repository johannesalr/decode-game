// src/hooks/useAuth.js
import { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../utils/firebase";

export const useFirebaseAuth = () => {
  const [user, setUser] = useState(null);

  // Save user data to Firestore
  const saveUserProfile = async (user) => {
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      displayName: user.displayName || "Anonymous",
      photoURL: user.photoURL || "https://placehold.co/35x35",
      email: user.email,
      createdAt: serverTimestamp(),
    });
    console.log("User profile saved to Firestore:", user.uid);
  };

  // Fetch user data from Firestore
  const fetchUserProfile = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  };

  // Handle authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        saveUserProfile(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return { user, fetchUserProfile };
};
