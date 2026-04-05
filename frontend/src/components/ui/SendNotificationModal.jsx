import React, { useState } from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { X, Send, Loader2 } from 'lucide-react';
import './SendNotificationModal.css';

const SendNotificationModal = ({ isOpen, onClose }) => {
  const { addNotification } = useNotifications();
  const [message, setMessage] = useState('');
  const [target, setTarget] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Explicit requested validation
    if (!message.trim()) {
      return alert("Message cannot be empty");
    }

    try {
      setLoading(true);
      setError(null);
      // Calls API through Context
      await addNotification({ message: message.trim(), target });
      setMessage('');
      setTarget('all');
      onClose();
    } catch (err) {
      console.error(err);
      // Explicit error masking requested
      setError("Unable to send notification. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content notification-modal">
        <div className="modal-header">
          <h2>Send Global Notification</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          {error && <div className="modal-error text-red-500 mb-3">{error}</div>}

          <div className="form-group mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Audience
            </label>
            <select 
              value={target} 
              onChange={(e) => setTarget(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm p-2 bg-white border"
            >
              <option value="all">Everyone (Students & Staff)</option>
              <option value="student">Students Only</option>
              <option value="staff">Staff Only</option>
            </select>
          </div>

          <div className="form-group mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message Content
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              placeholder="e.g. Server maintenance tonight from 2 AM to 4 AM."
              className="w-full border-gray-300 rounded-md shadow-sm p-2 border resize-none"
            />
          </div>

          <div className="modal-footer flex justify-end gap-2 mt-6">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
              disabled={loading || !message.trim()}
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
              Send Notification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendNotificationModal;
