import React, { useState } from 'react';
import Card, { CardHeader, CardContent, CardFooter } from './ui/Card';
import Badge from './ui/Badge';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import Timer from './Timer';
import { ChevronRight } from 'lucide-react';
import './ComplaintCard.css';

const ComplaintCard = ({ complaint, onClick }) => {
  const isResolved = complaint.status === 'resolved';
  const [slaInfo, setSlaInfo] = useState(null);

  // Dynamically determine effective status based on SLA for styling
  const effectiveStatus = isResolved ? 'resolved' :
    (slaInfo?.isOverdue ? 'escalated' : complaint.status);

  return (
    <Card 
      className={`complaint-card status-border-${effectiveStatus}`}
      onClick={() => onClick(complaint.id)}
    >
      <CardHeader 
        title={
          <div className="complaint-card-title">
            <span className="complaint-id">{complaint.id}</span>
            <h4>{complaint.title}</h4>
          </div>
        }
      />
      <CardContent>
        <div className="complaint-badges">
          <StatusBadge status={effectiveStatus} />
          <PriorityBadge priority={complaint.priority} />
          {effectiveStatus === 'escalated' && slaInfo?.escalationLevel && (
            <Badge variant="danger">{slaInfo.escalationLevel}</Badge>
          )}
          {effectiveStatus === 'escalated' && !slaInfo?.escalationLevel && complaint.escalationLevel && (
            <Badge variant="danger">{complaint.escalationLevel}</Badge>
          )}
        </div>
        
        <div className="complaint-meta">
          <div className="meta-item">
            <span className="meta-label">Category:</span>
            <span className="meta-value">{complaint.category}</span>
          </div>
          
          {isResolved ? (
            <>
              <div className="meta-item resolved-meta-item">
                <span className="meta-label">Resolution Time:</span>
                <span className="meta-value">{complaint.resolutionTime || 'Resolved on time'}</span>
              </div>
            </>
          ) : (
            <div className="meta-item">
              <span className="meta-label">SLA:</span>
              <span className="meta-value" style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                <Timer 
                  createdAt={complaint.createdAt || complaint.date}
                  priority={complaint.priority}
                  status={complaint.status}
                  onSlaUpdate={setSlaInfo}
                />
              </span>
            </div>
          )}
          
          {complaint.reason && !isResolved && (
            <div className="meta-item delay-reason">
              <span className="meta-label">Reason:</span>
              <span className="meta-value">{complaint.reason}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="complaint-footer">
        <span className="complaint-date">
          {isResolved ? `Resolved on ${complaint.resolvedAt || complaint.date}` : `Raised on ${complaint.date}`}
        </span>
        <div className="complaint-action-link">
          View Details <ChevronRight size={16} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default ComplaintCard;
