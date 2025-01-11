// src/App.jsx
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { auth } from "./firebase";
import { saveUserProfile } from "./script.js";
import HomePage from "./components/HomePage"; // Import your HomePage component
import ProfilePage from "./components/ProfilePage"; // Import your ProfilePage component

function App() {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User signed in:", user);
        saveUserProfile(user); // Save user data to Firestore
      } else {
        console.log("No user signed in.");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:uid" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
