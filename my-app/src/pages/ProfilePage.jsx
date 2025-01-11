// src/components/ProfilePage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserProfile } from "../script.js";

function ProfilePage() {
  const { uid } = useParams(); // Get the UID from the URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userData = await fetchUserProfile(uid);
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [uid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>{user.displayName}'s Profile</h1>
      <img
        src={user.photoURL}
        alt="Profile"
        style={{ width: 100, height: 100, borderRadius: "50%" }}
      />
      <p>Email: {user.email}</p>
      <p>Joined: {new Date(user.createdAt.toDate()).toLocaleDateString()}</p>
    </div>
  );
}

export default ProfilePage;
