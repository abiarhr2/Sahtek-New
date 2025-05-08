import React from 'react';
import WelcomeBanner from './WelcomeBanner';
import ActionCards from './ActionCard';
import UpcomingAppointments from './UpcomingAppointment';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <WelcomeBanner />
      <ActionCards />
      <UpcomingAppointments />
    </div>
  );
};

export default Dashboard;
