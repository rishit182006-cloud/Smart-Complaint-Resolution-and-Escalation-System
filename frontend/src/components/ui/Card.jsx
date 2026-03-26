import React from 'react';
import './Card.css';

const Card = ({ children, className = '', onClick }) => {
  return (
    <div 
      className={`card ${onClick ? 'card-clickable' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ title, action, className = '' }) => (
  <div className={`card-header ${className}`}>
    <h3 className="card-title">{title}</h3>
    {action && <div className="card-action">{action}</div>}
  </div>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`card-content ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`card-footer ${className}`}>
    {children}
  </div>
);

export default Card;
