import React from 'react';
import { Bell, User } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ role = 'Student', userName = 'John Doe' }) => {
  return (
    <header className="navbar">
      <div className="navbar-left">
        {/* Placeholder for possible breadcrumbs or mobil menu toggle */}
      </div>
      
      <div className="navbar-right">
        <button className="navbar-icon-btn">
          <Bell size={20} />
          <span className="navbar-badge">3</span>
        </button>
        
        <div className="navbar-profile">
          <div className="navbar-avatar">
            <User size={20} />
          </div>
          <div className="navbar-user-info">
            <span className="navbar-user-name">{userName}</span>
            <span className="navbar-user-role">{role}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
