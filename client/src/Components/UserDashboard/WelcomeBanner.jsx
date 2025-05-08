import React from 'react';
import Dashboard from './Dashboard';
const WelcomeBanner = () => {
  return (
    <div className="welcome-banner">
      <div className="welcome-text">
        <h2>Welcome back, Sarah!</h2>
        <p>Your next appointment is on <strong>June 10, 2023 at 10:30 AM</strong> with Dr. Michael Chen</p>
        <button className="view-appointment-btn">📅 View Appointment</button>
      </div>
      <div className="welcome-image">
        <img src="https://via.placeholder.com/100x100" alt="Profile" />
      </div>
    </div>
  );
};

export default WelcomeBanner;
