// src/components/HomePage.jsx
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Link to="/profile/abc123">View Profile</Link>
    </div>
  );
}

export default HomePage;
