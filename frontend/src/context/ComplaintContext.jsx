import React, { createContext, useState } from 'react';

// Helper for initial mock data dates
const now = new Date();
const subtractHours = (hours) => new Date(now.getTime() - hours * 60 * 60 * 1000).toISOString();

const INITIAL_COMPLAINTS = [
  {
    id: 'CMP-1001',
    title: 'Water Leakage in Bathroom 3rd Floor',
    category: 'Plumbing',
    status: 'escalated',
    priority: 'high',
    createdAt: subtractHours(10),
    date: 'Oct 24, 2023',
    reason: 'Waiting for external plumber'
  },
  {
    id: 'CMP-1002',
    title: 'AC not cooling in Lab 4',
    category: 'Maintenance',
    status: 'in-progress',
    priority: 'medium',
    createdAt: subtractHours(7),
    date: 'Oct 25, 2023',
  },
  {
    id: 'CMP-1003',
    title: 'Broken chair in Library',
    category: 'Furniture',
    status: 'open',
    priority: 'low',
    createdAt: subtractHours(1),
    date: 'Oct 26, 2023',
  },
  {
    id: 'CMP-1004',
    title: 'Wi-Fi completely down in Block B',
    category: 'Network',
    status: 'resolved',
    priority: 'high',
    createdAt: subtractHours(48),
    date: 'Oct 22, 2023',
    resolvedAt: 'Oct 23, 2023',
    resolutionTime: '1 day 2 hours'
  },
  {
    id: 'CMP-1005',
    title: 'Lift not working in Block A',
    category: 'Maintenance',
    status: 'escalated',
    priority: 'medium',
    createdAt: subtractHours(30),
    date: 'Oct 21, 2023',
    reason: 'Part availability delayed'
  }
];

export const ComplaintContext = createContext();

export const ComplaintProvider = ({ children }) => {
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);

  const addComplaint = (newComplaint) => {
    // Generate a simple ID CMP-XXXX
    const nextId = `CMP-${1000 + complaints.length + 1}`;
    
    const complaintToAdd = {
      ...newComplaint,
      id: nextId,
      status: 'open',
      createdAt: new Date().toISOString(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      escalationLevel: null
    };

    setComplaints([complaintToAdd, ...complaints]);
  };

  return (
    <ComplaintContext.Provider value={{ complaints, addComplaint }}>
      {children}
    </ComplaintContext.Provider>
  );
};
