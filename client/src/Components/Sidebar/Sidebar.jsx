import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar';  // Import the sidebar CSS
import Dashboard from '../UserDashboard/Dashboard';

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Appointments", path: "/appointments" },
    { name: "Staffs", path: "/staffs" },
    { name: "Chats", path: "/chats" },
    { name: "Inbox", path: "/inbox" },
    { name: "Account", path: "/account" },
    { name: "History", path: "/history" },
    { name: "Calendar", path: "/calendar" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <aside className="sidebar">
      <h1 className="logo">Sahtna</h1>
      <nav className="nav">
        {menuItems.map(item => (
          <Link key={item.name} to={item.path}>
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
