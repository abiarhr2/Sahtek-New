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

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: dashboardIcon },
    { path: '/appointments', label: 'Appointments', icon: appointmentIcon },
    { path: '/staff', label: 'Staff', icon: staffIcon },
    { path: '/chatbox', label: 'ChatBox', icon: chatboxIcon },
    { path: '/inbox', label: 'Inbox', icon: inboxIcon },
    { path: '/account', label: 'Account', icon: accountIcon },
    { path: '/history', label: 'History', icon: dashboardIcon }, // reuse dashboard icon
    { path: '/calendar', label: 'Calendar', icon: dashboardIcon }, // reuse dashboard icon
    { path: '/settings', label: 'Settings', icon: settingsIcon },
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
