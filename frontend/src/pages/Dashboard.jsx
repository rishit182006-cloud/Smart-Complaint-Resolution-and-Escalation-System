import React, { useState, useContext } from 'react';
import Button from '../components/ui/Button';
import ComplaintCard from '../components/ComplaintCard';
import { useNavigate } from 'react-router-dom';
import { ComplaintContext } from '../context/ComplaintContext';
import './Dashboard.css';

const Dashboard = () => {
  const { complaints } = useContext(ComplaintContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Welcome back! Here's an overview of the complaints.</p>
        </div>
        <Button onClick={() => navigate('/raise-complaint')}>
          Raise New Complaint
        </Button>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All ({complaints.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'open' ? 'active' : ''}`}
          onClick={() => setActiveTab('open')}
        >
          Open ({complaints.filter(c => c.status === 'open').length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'in-progress' ? 'active' : ''}`}
          onClick={() => setActiveTab('in-progress')}
        >
          In Progress ({complaints.filter(c => c.status === 'in-progress').length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'escalated' ? 'active' : ''}`}
          onClick={() => setActiveTab('escalated')}
        >
          Escalated ({complaints.filter(c => c.status === 'escalated').length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'resolved' ? 'active' : ''}`}
          onClick={() => setActiveTab('resolved')}
        >
          Resolved ({complaints.filter(c => c.status === 'resolved').length})
        </button>
      </div>

      <div className="complaints-grid">
        {complaints.filter(c => activeTab === 'all' || c.status === activeTab).map((complaint) => (
          <ComplaintCard key={complaint.id} complaint={complaint} onClick={(id) => navigate(`/complaint/${id}`)} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
