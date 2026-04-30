import React, { useState } from 'react';
import AlertCard from '../components/AlertCard';

export default function Dashboard() {
  const [alerts] = useState([
    { id: 1, code: 'Code Blue', floor: '3', ward: 'ICU', room: '302', status: 'ACTIVE', time: '10:05 AM' },
    { id: 2, code: 'Code Red', floor: '1', ward: 'ER', room: '105', status: 'IN_PROGRESS', time: '10:15 AM' },
    { id: 3, code: 'Code Pink', floor: '4', ward: 'Maternity', room: '412', status: 'ACTIVE', time: '10:25 AM' },
  ]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#111827', margin: 0, letterSpacing: '-0.025em' }}>Overview Dashboard</h1>
          <p style={{ color: '#6b7280', margin: '0.5rem 0 0 0', fontSize: '1rem' }}>Monitor real-time hospital emergencies system-wide.</p>
        </div>
        <button style={{ 
          backgroundColor: '#ef4444', 
          color: 'white', 
          padding: '0.875rem 1.75rem', 
          borderRadius: '8px', 
          border: 'none', 
          fontSize: '1rem',
          fontWeight: 'bold', 
          cursor: 'pointer', 
          boxShadow: '0 4px 14px 0 rgba(239, 68, 68, 0.39)',
          transition: 'transform 0.2s, box-shadow 0.2s'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.4)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 14px 0 rgba(239, 68, 68, 0.39)';
        }}
        >
          + Trigger Alert
        </button>
      </header>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
        {alerts.map(alert => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  );
}
