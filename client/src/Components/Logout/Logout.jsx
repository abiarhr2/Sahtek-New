import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user token from localStorage
    localStorage.removeItem("token");
    // Redirect to login page
    navigate("/login");
  }, [navigate]);

  return null; // Since this is a redirect-only component
}

export default Logout;
