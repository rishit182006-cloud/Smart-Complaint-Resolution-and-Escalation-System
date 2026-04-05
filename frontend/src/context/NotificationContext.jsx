import React, { createContext, useState, useEffect, useContext, useCallback, useRef } from 'react';
import { useAuth } from './AuthContext';
import { fetchNotifications, sendNotification } from '../api';

export const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  
  // Track previous count to trigger toasts
  const prevCountRef = useRef(0);

  const loadNotifications = useCallback(async (isPolling = false) => {
    if (!user) return;
    
    try {
      const response = await fetchNotifications();
      
      // Handle cases where the backend response is wrapped in 'data' or 'notifications'
      const dataArray = Array.isArray(response) ? response : (response.data || response.notifications || []);
      
      if (!isPolling) {
        console.log("Raw Notifications Array from Backend:", dataArray);
      }

      // Filter by role: show if target is 'all' or matches the user's role
      const filtered = dataArray.filter(n => n.target === 'all' || n.target === user.role);
      
      setNotifications(prev => {
        // Find if new notifications actually arrived
        if (isPolling && filtered.length > prev.length) {
          const newest = filtered[0]; // Assuming newest is first or recent
          if (newest && !newest.read && prevCountRef.current > 0) { // Don't toast on initial loads
            showToast(`New Notification: ${newest.message.substring(0, 30)}...`);
          }
        }
        prevCountRef.current = filtered.length;
        return filtered;
      });
      
    } catch (err) {
      console.error("Error fetching notifications:", err.message);
      // Removed the mock fallback so you see REAL backend data or an empty list
    }
  }, [user]);

  // Initial load + Polling interval
  useEffect(() => {
    loadNotifications(false); // Initial load

    const intervalId = setInterval(() => {
      loadNotifications(true); // Polling silent update
    }, 5000);

    return () => clearInterval(intervalId);
  }, [loadNotifications]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n._id === id ? { ...n, read: true } : n)
    );
    // Note: You should hook up a PUT to your backend here to mark read permanently
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addNotification = async (payload) => {
    try {
      // Actually send to the backend
      await sendNotification(payload);
      
      // Immediately refetch so the context state exactly mirrors the DB
      await loadNotifications(false);
      
      showToast("Notification Sent Successfully!");
    } catch (err) {
      showToast("Failed to send notification.");
      throw err;
    }
  };

  // Expose a manual refresh function
  const refreshNotifications = () => {
    loadNotifications(false);
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead, addNotification, refreshNotifications }}>
      {children}
      
      {/* Simple Global Toast UI */}
      {toastMessage && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px',
          backgroundColor: '#1e293b', color: 'white',
          padding: '12px 24px', borderRadius: '8px',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
          zIndex: 9999, transition: 'all 0.3s ease-in-out',
          animation: 'slideUp 0.3s ease-out'
        }}>
          {toastMessage}
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

