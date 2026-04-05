import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useAuth } from '../../context/AuthContext';
import './Layout.css';

const Layout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const role = user?.role || 'student';
  const userName = user?.name || 'Demo User';

  useEffect(() => {
    if (!user) {
       // redirect to login if no session exists
       navigate('/login');
    }
  }, [user, navigate]);


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
