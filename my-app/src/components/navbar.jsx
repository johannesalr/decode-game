// src/components/Navbar.jsx
import React, { useState } from "react";
import "../assets/navbar.css"; // Import the CSS file

const Navbar = () => {
  const [isNavMenuVisible, setIsNavMenuVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate login state

  const toggleNavMenu = () => {
    setIsNavMenuVisible(!isNavMenuVisible);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setIsDropdownVisible(false);
  };

  return (
    <header className={isLoggedIn ? "logged-in" : ""}>
      {/* Hamburger menu */}
      <button
        id="hamburgerMenu"
        className="hamburger-menu"
        onClick={toggleNavMenu}
      >
        ☰
      </button>

      {/* Game name */}
      <div className="game-name">Code Cracker</div>

      {/* Navigation menu */}
      <nav
        id="navMenu"
        className={`nav-menu ${isNavMenuVisible ? "active" : ""}`}
      >
        <a href="/" className="nav-link">
          Home
        </a>
        <a href="/about" className="nav-link">
          About
        </a>
        <a href="/contact" className="nav-link">
          Contact
        </a>
      </nav>

      {/* Log section (login/signup buttons) */}
      {!isLoggedIn && (
        <div className="log-section">
          <button onClick={handleLogin}>Log In</button>
          <button>Sign Up</button>
        </div>
      )}

      {/* Profile section */}
      {isLoggedIn && (
        <div
          className={`profile-container ${isDropdownVisible ? "active" : ""}`}
        >
          <button id="premium-button" className="premium-button">
            Buy Premium
          </button>
          <img
            id="profile-picture"
            className="profile-picture"
            src="/assets/profile-picture.png" // Update with your image path
            alt="Profile"
            onClick={toggleDropdown}
          />
          {isDropdownVisible && (
            <div className="dropdown-menu">
              <button id="profile-button">Profile</button>
              <button id="sign-out-button" onClick={handleSignOut}>
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
