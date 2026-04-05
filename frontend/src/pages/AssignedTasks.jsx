import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchAssignedComplaints } from '../api';
import ComplaintCard from '../components/ComplaintCard';
import { useNavigate } from 'react-router-dom';
import { CheckSquare, Loader2 } from 'lucide-react';
import './Dashboard.css'; // Reuse Dashboard styling

const AssignedTasks = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAssignedComplaints = async () => {
      try {
        setLoading(true);
        // Optional Improvement: Calling the backend's explicit 'assigned' API endpoint
        const data = await fetchAssignedComplaints();
        
        console.log("Logged-in user ID:", user?._id);
        console.log("Complaints data:", data);
        
        // Exact filter logic requested (Fallback verification)
        const assignedComplaints = data.filter(
          (c) => c.assignedStaffId?.toString() === user?._id?.toString() || 
                 c.assignedTo?.toString() === user?._id?.toString()
        );
        
        setComplaints(assignedComplaints);
      } catch (err) {
        setError(err.message || 'Failed to load assigned tasks.');
      } finally {
        setLoading(false);
      }
    };

    if (user && user.role === 'staff') {
      loadAssignedComplaints();
    }
  }, [user]);

  const handleCardClick = (id) => {
    navigate(`/complaint/${id}`);
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <Loader2 className="animate-spin" size={48} />
        <p>Loading your assigned tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Assigned Tasks</h1>
          <p>Complaints currently assigned to you for resolution.</p>
        </div>
      </header>

      {complaints.length === 0 ? (
        <div className="empty-state">
          <CheckSquare size={64} color="#94a3b8" />
          <h3>No tasks assigned to you</h3>
          <p>You have resolved all your assigned complaints or haven't been assigned any yet.</p>
        </div>
      ) : (
        <div className="complaints-grid">
          {complaints.map(complaint => (
            <ComplaintCard 
              key={complaint._id || complaint.id} 
              complaint={complaint} 
              onClick={handleCardClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AssignedTasks;
