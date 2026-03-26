import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import './Layout.css';

const Layout = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('userRole') || 'student';
  const userName = localStorage.getItem('userName') || 'Demo User';

  useEffect(() => {
    if (!localStorage.getItem('userRole')) {
       // redirect to login if no mock session exists
       navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="layout-container">
      <Sidebar role={role} />
      <div className="layout-main">
        <Navbar role={role} userName={userName} />
        <main className="layout-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
