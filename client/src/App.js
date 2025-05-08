import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';
import Signup from './Components/Sign_up';
import Login from './Components/Login';
import Appointment from './Components/Appointment/Appointment';
import Staff from './Components/Staff/Staff';
import Dashboard from './Components/UserDashboard/Dashboard';
import Inbox from './Components/Inbox/Inbox';
import Calendar from './Components/Calendar/Calendar';
import Logout from './Components/Logout/Logout';
import '@fontsource/quicksand'

import Chatbox from './Components/Chatbox/Chatbox';
import Account from './Components/Account/Account';
import History from './Components/History/History';

function App() {
  const user = localStorage.getItem("token");
  const location = useLocation();

  // Pages where the sidebar should be hidden
  const hideSidebarPaths = ['/login', '/signup'];
  const shouldHideSidebar = hideSidebarPaths.includes(location.pathname);

  return (
    <div className="container">
      {/* Conditionally show Sidebar */}
      {!shouldHideSidebar && <Sidebar />}

      {/* Main Content Area */}
      <main className="main-content">
        <Routes>

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/chatbox" element={<Chatbox />} />
          <Route path="/account" element={<Account />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/calendar" element={<Calendar/>} />
          <Route path="/inbox" element={<Inbox />} />  {/* Changed from <inbox/> to <Inbox/> */}
          <Route path="/history" element={<History />} />  {/* Changed from <inbox/> to <Inbox/> */}
          
          <Route path="/appointments" element={user ? <Appointment /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/logout" element={<Logout />} />


        </Routes>
      </main>
    </div>
  );
}

export default App;