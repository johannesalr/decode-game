// src/App.jsx
import React from "react";
import Navbar from "./components/navbar";
import GameBox from "./components/GameBox";
// import "./assets/GameBox.css"; // Import the CSS file
// import "./assets/navbar.css"; // Import the CSS file

function App() {
  return (
    <div>
      <Navbar />
      <GameBox />
    </div>
  );
}

export default App;
