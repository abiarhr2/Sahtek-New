import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';
import Signup from './Components/Sign_up';
import Login from './Components/Login';
import Appointment from './Components/Appointment/Appointment';

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
          <Route path="/appointments" element={user ? <Appointment /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={user ? "/appointments" : "/login"} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
