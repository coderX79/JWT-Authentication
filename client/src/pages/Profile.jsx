import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../api/test";
import { logoutUser } from "../api/auth";

const Profile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setData(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Unable to load profile. Please log in again.");
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await logoutUser(refreshToken);
      }
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      <button onClick={handleLogout}>Logout</button>
      <div style={{ whiteSpace: "pre-wrap", marginTop: "1rem" }}>
        {error ? error : data ? JSON.stringify(data, null, 2) : "Loading..."}
      </div>
    </div>
  );
};

export default Profile;