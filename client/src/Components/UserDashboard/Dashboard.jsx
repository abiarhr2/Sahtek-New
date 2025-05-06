// Dashboard.jsx
import React from 'react';
import WelcomeBanner from './WelcomeBanner';
import RegisterCard from './RegisterCard';
import UrgentCard from './UrgentCard';
import AppointmentCard from './AppointmentCard';
import StaffCard from './StaffCard';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <WelcomeBanner />
      <div className="card-row">
        <RegisterCard />
        <UrgentCard />
      </div>
      <AppointmentCard />
      <StaffCard />
    </div>
  );
};

export default Dashboard;
