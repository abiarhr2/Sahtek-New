<<<<<<< HEAD
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar';  // Import the sidebar CSS
import Dashboard from '../UserDashboard/Dashboard';
=======
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

// Importing icons
import dashboardIcon from '../../assets/dashboard.png';
import appointmentIcon from '../../assets/appointment.png';
import staffIcon from '../../assets/staff.png';
import chatboxIcon from '../../assets/chatbox.png';
import inboxIcon from '../../assets/inbox.png';
import accountIcon from '../../assets/account.png';
import settingsIcon from '../../assets/settings.png';
import logoutIcon from '../../assets/logout.png';
import logoIcon from '../../assets/logo.png';
// Importing logo

function Sidebar() {
  const location = useLocation();
>>>>>>> 14ee950924c8112f70e94950ef4a84635b53fa7e

  const menuItems = [
<<<<<<< HEAD
    { name: "Dashboard", path: "/dashboard" },
    { name: "Appointments", path: "/appointments" },
    { name: "Staffs", path: "/staffs" },
    { name: "Chats", path: "/chats" },
    { name: "Inbox", path: "/inbox" },
    { name: "Account", path: "/account" },
    { name: "History", path: "/history" },
    { name: "Calendar", path: "/calendar" },
    { name: "Settings", path: "/settings" },
=======
    { path: '/dashboard', label: 'Dashboard', icon: dashboardIcon },
    { path: '/appointments', label: 'Appointments', icon: appointmentIcon },
    { path: '/staff', label: 'Staff', icon: staffIcon },
    { path: '/chatbox', label: 'ChatBox', icon: chatboxIcon },
    { path: '/inbox', label: 'Inbox', icon: inboxIcon },
    { path: '/account', label: 'Account', icon: accountIcon },
    { path: '/history', label: 'History', icon: dashboardIcon }, // reuse dashboard icon
    { path: '/calendar', label: 'Calendar', icon: dashboardIcon }, // reuse dashboard icon
    { path: '/settings', label: 'Settings', icon: settingsIcon },
>>>>>>> 14ee950924c8112f70e94950ef4a84635b53fa7e
  ];

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src={logoIcon} alt="Logo" className="logo-image" />
        <h2 className="logo-text">Sahtna</h2>
      </div>
      <ul className="menu-list">
        {menuItems.map((item, index) => (
          <li key={index} className={location.pathname === item.path ? 'active-link' : ''}>
            <Link to={item.path}>
              <img src={item.icon} alt={item.label} className="menu-icon" />
              <span className="menu-label">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="bottom-section">
        <Link to="/logout" className="logout-link">
          <img src={logoutIcon} alt="Logout" className="menu-icon" />
          <span className="menu-label">Logout</span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
