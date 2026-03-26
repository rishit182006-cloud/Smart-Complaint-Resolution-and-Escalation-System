import React from 'react';
import Badge from './ui/Badge';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'escalated': return <AlertTriangle size={16} />;
      case 'resolved': return <CheckCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const formattedStatus = status ? status.replace('-', ' ').toUpperCase() : '';

  return (
    <Badge variant={status}>
      <span className="badge-content" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {getStatusIcon(status)}
        {formattedStatus}
      </span>
    </Badge>
  );
};

export default StatusBadge;
