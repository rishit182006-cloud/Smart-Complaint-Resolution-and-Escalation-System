import React, { useState } from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import SendNotificationModal from './SendNotificationModal';
import { Bell, Check, Loader2, Info, AlertTriangle, AlertCircle, Plus } from 'lucide-react';
import './NotificationDropdown.css';

const NotificationDropdown = ({ isOpen, onClose }) => {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isOpen) return null;

  const getTypeIcon = (type) => {
    switch (type) {
      case 'alert': return <AlertTriangle size={16} className="text-red-500" />;
      case 'escalation': return <AlertCircle size={16} className="text-orange-500" />;
      default: return <Info size={16} className="text-blue-500" />;
    }
  };

  const formatDistanceToNow = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // seconds

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <>
      <div className="notification-overlay" onClick={onClose}></div>
      <div className="notification-dropdown">
        <div className="notification-header">
          <h3>Notifications</h3>
          <div className="notification-actions">
            {user?.role === 'admin' && (
              <button className="send-notif-btn" onClick={() => setIsModalOpen(true)}>
                <Plus size={14} /> Send
              </button>
            )}
            {notifications.some(n => !n.read) && (
              <button className="mark-all-btn" onClick={markAllAsRead}>
                <Check size={14} /> Mark all read
              </button>
            )}
          </div>
        </div>
        
        <div className="notification-body">
          {notifications.length === 0 ? (
            <div className="empty-notifications">
              <Bell size={32} />
              <p>No notifications</p>
            </div>
          ) : (
            <ul className="notification-list">
              {notifications.map((notif) => (
                <li 
                  key={notif._id} 
                  className={`notification-item ${!notif.read ? 'unread' : ''}`}
                  onClick={() => !notif.read && markAsRead(notif._id)}
                >
                  <div className="notification-icon">
                    {getTypeIcon(notif.type)}
                  </div>
                  <div className="notification-content">
                    <p className="notification-message">{notif.message}</p>
                    <span className="notification-time">
                      {formatDistanceToNow(notif.createdAt)}
                    </span>
                  </div>
                  {!notif.read && <div className="unread-dot"></div>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <SendNotificationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default NotificationDropdown;
