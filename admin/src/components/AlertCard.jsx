import React from 'react';

export default function AlertCard({ alert }) {
  const isCodeBlue = alert.code === 'Code Blue';
  const isCodeRed = alert.code === 'Code Red';
  const isCodePink = alert.code === 'Code Pink';
  
  let bgColor = '#f3f4f6';
  let borderColor = '#d1d5db';
  let textColor = '#374151';
  let badgeColor = '#6b7280';

  if (isCodeBlue) {
    bgColor = '#eff6ff'; borderColor = '#3b82f6'; textColor = '#1e3a8a'; badgeColor = '#2563eb';
  } else if (isCodeRed) {
    bgColor = '#fef2f2'; borderColor = '#ef4444'; textColor = '#991b1b'; badgeColor = '#dc2626';
  } else if (isCodePink) {
    bgColor = '#fdf2f8'; borderColor = '#ec4899'; textColor = '#831843'; badgeColor = '#db2777';
  }

  return (
    <div style={{
      backgroundColor: bgColor,
      border: `1px solid ${borderColor}`,
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer'
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <span style={{ backgroundColor: badgeColor, color: 'white', padding: '0.35rem 0.85rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 'bold', letterSpacing: '0.025em' }}>
          {alert.code}
        </span>
        <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>{alert.time}</span>
      </div>
      
      <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1.25rem', color: textColor, fontWeight: '700' }}>
        Emergency Location
      </h3>
      
      <div style={{ display: 'flex', gap: '1rem', color: '#4b5563', fontSize: '0.95rem', backgroundColor: 'rgba(255,255,255,0.5)', padding: '0.75rem', borderRadius: '8px' }}>
        <div><strong style={{color: textColor}}>Floor:</strong> {alert.floor}</div>
        <div><strong style={{color: textColor}}>Ward:</strong> {alert.ward}</div>
        <div><strong style={{color: textColor}}>Room:</strong> {alert.room}</div>
      </div>
      
      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ 
            height: '10px',
            width: '10px',
            borderRadius: '50%',
            backgroundColor: alert.status === 'ACTIVE' ? '#ef4444' : '#f59e0b',
            display: 'inline-block'
          }}></span>
          <span style={{ 
            fontSize: '0.875rem', 
            fontWeight: '700',
            color: alert.status === 'ACTIVE' ? '#ef4444' : '#f59e0b'
          }}>
            {alert.status.replace('_', ' ')}
          </span>
        </div>
        <button style={{
          backgroundColor: 'white',
          border: `1px solid ${borderColor}`,
          color: badgeColor,
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = `${bgColor}`}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
        >
          Respond
        </button>
      </div>
    </div>
  );
}
