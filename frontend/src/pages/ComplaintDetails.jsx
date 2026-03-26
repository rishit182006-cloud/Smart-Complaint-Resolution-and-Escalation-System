import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { ArrowLeft, Clock, MessageSquare, AlertTriangle, CheckCircle, User } from 'lucide-react';
import './ComplaintDetails.css';

const MOCK_COMPLAINT_DETAILS = {
  id: 'CMP-1001',
  title: 'Water Leakage in Bathroom 3rd Floor',
  category: 'Plumbing',
  status: 'escalated',
  priority: 'high',
  escalationLevel: 'L2',
  date: 'Oct 24, 2023, 10:30 AM',
  location: 'Block A, 3rd Floor Bathroom',
  description: 'There has been a continuous water leak from the ceiling in the 3rd-floor bathroom for the past 2 days. It is causing a pool of water on the floor, which is a slipping hazard.',
  reporter: {
    name: 'Alex Student',
    role: 'Student',
    phone: '+1 234 567 8900'
  },
  timeline: [
    { id: 1, status: 'open', date: 'Oct 24, 2023, 10:30 AM', note: 'Complaint registered by Alex Student.' },
    { id: 2, status: 'in-progress', date: 'Oct 24, 2023, 11:45 AM', note: 'Assigned to Staff Member (Plumber).' },
    { id: 3, status: 'escalated', date: 'Oct 25, 2023, 11:45 AM', note: 'SLA breached. Escalated to L1 (Facility Manager).' },
    { id: 4, status: 'escalated', date: 'Oct 26, 2023, 11:45 AM', note: 'Escalated to L2 (Admin). Notes: Waiting for external plumbing service.' }
  ],
  comments: [
    { id: 1, author: 'Facility Manager', role: 'Staff', date: 'Oct 25, 10:00 AM', text: 'External plumber has been contacted. They will arrive tomorrow.' },
    { id: 2, author: 'Alex Student', role: 'Student', date: 'Oct 25, 11:30 AM', text: 'Please expedite, the leak is getting worse.' }
  ]
};

const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState('');
  
  // In a real app we would fetch data based on id
  const complaint = MOCK_COMPLAINT_DETAILS;

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    // Simulate API call
    console.log('Adding comment:', newComment);
    setNewComment('');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'escalated': return <AlertTriangle size={16} />;
      case 'resolved': return <CheckCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  return (
    <div className="complaint-details-page">
      <button className="back-button" onClick={() => navigate('/dashboard')}>
        <ArrowLeft size={20} />
        Back to Dashboard
      </button>

      <div className="details-header">
        <div className="title-section">
          <span className="complaint-id-large">{complaint.id}</span>
          <h1 className="page-title">{complaint.title}</h1>
        </div>
        <div className="action-section">
          {/* Admin/Staff actions can go here based on role */}
          {complaint.status !== 'resolved' && (
            <Button variant="success">Mark as Resolved</Button>
          )}
        </div>
      </div>

      <div className="details-grid">
        {/* Left Column - Main Details */}
        <div className="main-content">
          <Card className="info-card">
            <CardContent>
              <div className="info-badges">
                <Badge variant={complaint.status} size="lg">
                  <span className="badge-content">
                    {getStatusIcon(complaint.status)}
                    {complaint.status.toUpperCase()}
                  </span>
                </Badge>
                <Badge variant={complaint.priority} size="lg">{complaint.priority.toUpperCase()} PRIORITY</Badge>
                {complaint.status === 'escalated' && (
                  <Badge variant="danger" size="lg">Level: {complaint.escalationLevel}</Badge>
                )}
              </div>

              <div className="info-grid">
                <div className="info-group">
                  <span className="info-label">Category</span>
                  <span className="info-value">{complaint.category}</span>
                </div>
                <div className="info-group">
                  <span className="info-label">Location</span>
                  <span className="info-value">{complaint.location}</span>
                </div>
                <div className="info-group">
                  <span className="info-label">Date Reported</span>
                  <span className="info-value">{complaint.date}</span>
                </div>
              </div>

              <div className="description-section">
                <h3 className="section-title">Description</h3>
                <p className="description-text">{complaint.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card className="comments-card">
            <CardHeader title="Comments & Discussion" />
            <CardContent>
              <div className="comments-list">
                {complaint.comments.map(comment => (
                  <div key={comment.id} className="comment-item">
                    <div className="comment-avatar">
                      <User size={20} />
                    </div>
                    <div className="comment-content">
                      <div className="comment-header">
                        <span className="comment-author">{comment.author}</span>
                        <Badge variant="default" size="sm">{comment.role}</Badge>
                        <span className="comment-date">{comment.date}</span>
                      </div>
                      <p className="comment-text">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <form className="add-comment-form" onSubmit={handleAddComment}>
                <Input
                  id="newComment"
                  type="textarea"
                  placeholder="Type your comment here..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mb-0"
                />
                <Button type="submit" variant="primary" className="mt-3">
                  <MessageSquare size={16} className="mr-2" />
                  Post Comment
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Timeline & Reporter Info */}
        <div className="side-content">
          <Card className="timeline-card">
            <CardHeader title="Status Timeline" />
            <CardContent>
              <div className="timeline">
                {complaint.timeline.map((event, index) => (
                  <div key={event.id} className="timeline-event">
                    <div className="timeline-marker">
                      <div className={`marker-dot status-${event.status}`}></div>
                      {index < complaint.timeline.length - 1 && <div className="marker-line"></div>}
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <Badge variant={event.status} size="sm">{event.status.toUpperCase()}</Badge>
                        <span className="timeline-date">{event.date}</span>
                      </div>
                      <p className="timeline-note">{event.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="reporter-card">
            <CardHeader title="Reporter Details" />
            <CardContent>
              <div className="reporter-info">
                <div className="info-group">
                  <span className="info-label">Name</span>
                  <span className="info-value">{complaint.reporter.name}</span>
                </div>
                <div className="info-group">
                  <span className="info-label">Role</span>
                  <span className="info-value">{complaint.reporter.role}</span>
                </div>
                <div className="info-group">
                  <span className="info-label">Contact</span>
                  <span className="info-value">{complaint.reporter.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetails;
