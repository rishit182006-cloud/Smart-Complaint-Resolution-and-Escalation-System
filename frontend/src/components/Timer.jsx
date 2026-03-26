import React, { useState, useEffect } from 'react';
import { getSLAStatus } from '../utils/sla';
import { Clock, AlertTriangle } from 'lucide-react';
import './Timer.css';

const Timer = ({ createdAt, priority, status, onSlaUpdate }) => {
  const isResolved = status === 'resolved';

  const [slaStatus, setSlaStatus] = useState(() => 
    isResolved ? null : getSLAStatus(createdAt, priority)
  );

  useEffect(() => {
    if (isResolved) return;

    // Report initial status back to parent to style the card appropriately
    const initialStatus = getSLAStatus(createdAt, priority);
    if (onSlaUpdate && initialStatus) {
      onSlaUpdate(initialStatus);
    }

    const interval = setInterval(() => {
      const newStatus = getSLAStatus(createdAt, priority);
      setSlaStatus(prev => {
        // If the escalation level or overdue state changed, notify the parent
        if (
          onSlaUpdate && 
          (prev?.isOverdue !== newStatus?.isOverdue || 
           prev?.escalationLevel !== newStatus?.escalationLevel)
        ) {
          onSlaUpdate(newStatus);
        }
        return newStatus;
      });
    }, 60000); // 1 minute interval

    return () => clearInterval(interval);
  }, [createdAt, priority, isResolved, onSlaUpdate, status]);

  if (isResolved || !slaStatus) {
    return null;
  }

  return (
    <div className={`sla-timer ${slaStatus.isOverdue ? 'overdue' : 'on-time'}`}>
      {slaStatus.isOverdue ? <AlertTriangle size={15} /> : <Clock size={15} />}
      <span>{slaStatus.formattedText}</span>
    </div>
  );
};

export default Timer;
