// src/components/Login.jsx
import React, { useState } from "react";
import { auth } from "../utils/firebase"; // Import Firebase auth
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import "./Login.css"; // Import the CSS file

const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(true); // Toggle between Login and Sign Up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ text: "", isError: true }); // For displaying messages

  // Function to display messages
  const showMessage = (text, isError = true) => {
    setMessage({ text, isError });
    setTimeout(() => setMessage({ text: "", isError: true }), 3000); // Hide message after 3 seconds
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoginMode) {
      // Login with email and password
      try {
        await signInWithEmailAndPassword(auth, email, password);
        showMessage("Logged in successfully!", false);
        window.location.href = "/"; // Redirect to home page after login
      } catch (error) {
        showMessage("Error: " + error.message);
      }
    } else {
      // Sign Up with email and password
      if (password.length < 8) {
        showMessage("Password must be at least 8 characters long.");
        return;
      }

      if (password !== confirmPassword) {
        showMessage("Passwords do not match.");
        return;
      }

      try {
        await createUserWithEmailAndPassword(auth, email, password);
        showMessage("Account created successfully!", false);
        window.location.href = "/"; // Redirect to home page after signup
      } catch (error) {
        showMessage("Error: " + error.message);
      }
    }
  };

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      showMessage("Signed in with Google successfully!", false);
      window.location.href = "/"; // Redirect to home page after Google Sign-In
    } catch (error) {
      showMessage("Error: " + error.message);
    }
  };

  return (
    <div className="auth-container">
      <h1 id="title">{isLoginMode ? "Login" : "Sign Up"}</h1>
      <form id="auth-form" className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {!isLoginMode && (
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        )}
        {message.text && (
          <div className={`message ${message.isError ? "error" : "success"}`}>
            {message.text}
          </div>
        )}
        <button type="submit" className="email-btn" id="auth-btn">
          {isLoginMode ? "Login" : "Sign Up"}
        </button>
      </form>

      {/* Google Sign-In Button */}
      <button className="gsi-material-button" onClick={handleGoogleSignIn}>
        <div className="gsi-material-button-state"></div>
        <div className="gsi-material-button-content-wrapper">
          <div className="gsi-material-button-icon">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              style={{ display: "block" }}
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              ></path>
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              ></path>
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              ></path>
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              ></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
          </div>
          <span className="gsi-material-button-contents">
            Sign in with Google
          </span>
        </div>
      </button>

      {/* Toggle between Login and Sign Up */}
      <div className="toggle-mode" onClick={() => setIsLoginMode(!isLoginMode)}>
        {isLoginMode
          ? "Don't have an account? Sign Up"
          : "Already have an account? Login"}
      </div>
    </div>
  );
};

export default Login;
