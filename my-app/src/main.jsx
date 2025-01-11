// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div>
      <h1>Welcome to the Home Page</h1>
      <Link to="/profile/abc123">View Profile</Link>
    </div>
    <App />
  </React.StrictMode>
);
