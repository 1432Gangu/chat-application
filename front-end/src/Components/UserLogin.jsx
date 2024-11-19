import React, { useState } from "react";
import { FaChartBar } from "react-icons/fa6";
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import _ from "lodash";
import "../style.css";

const UserLogin = ({ setUser }) => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUser = () => {
    if (!userName.trim()) return;

    setLoading(true); 

    
    localStorage.setItem("user", userName);
    localStorage.setItem(
      "avatar",
      `https://picsum.photos/id/${_.random(1, 1000)}/200/300`
    );
    setUser(userName);

    setTimeout(() => {
      setLoading(false); 
    }, 1000);
  };

  return (
    <div className="login_container">
      <div className="login_title">
        <FaChartBar className="login_icon" />
        <h1> Chat App</h1>
      </div>
      <div className="login_form">
        <input
          type="text"
          placeholder="Enter a Unique Name"
          onChange={(e) => setUserName(e.target.value)}
        />
        <button onClick={handleUser} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default UserLogin;
