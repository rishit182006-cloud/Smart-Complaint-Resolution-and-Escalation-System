import React from 'react';
import Badge from './ui/Badge';

const PriorityBadge = ({ priority }) => {
  return (
    <Badge variant={priority}>
      {priority ? priority.toUpperCase() : ''}
    </Badge>
  );
};

export default PriorityBadge;
