import React from 'react';
import './Input.css';

const Input = ({ 
  label, 
  id, 
  type = 'text', 
  error, 
  className = '', 
  ...props 
}) => {
  return (
    <div className={`input-group ${className}`}>
      {label && <label htmlFor={id} className="input-label">{label}</label>}
      {type === 'textarea' ? (
        <textarea
          id={id}
          className={`input-field input-textarea ${error ? 'input-error' : ''}`}
          {...props}
        />
      ) : type === 'select' ? (
        <select
          id={id}
          className={`input-field input-select ${error ? 'input-error' : ''}`}
          {...props}
        >
          {props.children}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          className={`input-field ${error ? 'input-error' : ''}`}
          {...props}
        />
      )}
      {error && <span className="input-error-msg">{error}</span>}
    </div>
  );
};

export default Input;
