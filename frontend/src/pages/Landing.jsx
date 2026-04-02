import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-container">
      {/* Background shapes for depth */}
      <div className="landing-bg-shape shape-1"></div>
      <div className="landing-bg-shape shape-2"></div>

      {/* Navigation Layer */}
      <nav className="landing-nav">
        <div className="landing-logo">
          <span className="landing-logo-icon">⚡</span>
          <span>SmartResolve</span>
        </div>
        <div className="landing-nav-actions">
          <Link to="/login" className="sign-in-btn">Sign In</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="landing-content">
        <div className="landing-badge">
          <span>🚀</span>
          Next-Gen Complaint Escalation System
        </div>
        
        <h1 className="landing-title">
          Resolve Complaints <br />
          <span className="landing-title-highlight">Faster & Smarter.</span>
        </h1>
        
        <p className="landing-subtitle">
          Empower your support team with AI-driven insights, automated routing, and real-time analytics to turn problems into delighted customers.
        </p>

        <div className="landing-cta-group">
          <Link to="/login" className="landing-btn-primary">
            Get Started Now
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>

        {/* Feature Cards below Hero */}
        <div className="landing-features">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              ⚡
            </div>
            <h3 className="feature-title">Smart Routing</h3>
            <p className="feature-text">Automatically match complex issues with the exact specialist equipped to handle them, reducing resolution time.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              📊
            </div>
            <h3 className="feature-title">Real-Time Insights</h3>
            <p className="feature-text">Gain complete visibility into your support pipeline with rich, interactive dashboards and metrics.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              🔒
            </div>
            <h3 className="feature-title">Secure & Scalable</h3>
            <p className="feature-text">Built to enterprise standards to securely handle thousands of requests with zero downtime.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
