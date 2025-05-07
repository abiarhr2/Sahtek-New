import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import './App.css'; // Import the CSS file

const App = () => {
  const [user, setUser] = useState(null); // Assume this state holds user data
  const history = useHistory();

  const handleLogout = () => {
    // Clear session data (e.g., token, user info)
    localStorage.removeItem("userToken"); // or sessionStorage.removeItem('userToken');
    setUser(null); // Clear state if storing user data in state

    // Redirect to login page
    history.push("/login"); // Adjust route as necessary
  };

  return (
    <div className="container">
      <div className="logout-section">
        <h1>Welcome to the App</h1>
        {user ? (
          <div>
            <p>Welcome, {user.name}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <p>Please log in.</p>
        )}
      </div>
    </div>
  );
};

export default App;
