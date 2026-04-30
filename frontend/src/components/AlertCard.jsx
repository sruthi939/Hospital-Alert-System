import React from 'react';

const AlertCard = ({ alert }) => {
  const getStyle = (code) => {
    switch(code) {
      case 'CODE BLUE': return { color: '#0052cc', bg: '#eff6ff', border: '#bfdbfe' };
      case 'CODE RED': return { color: '#d73a49', bg: '#fef2f2', border: '#fecaca' };
      default: return { color: '#374151', bg: '#f3f4f6', border: '#e5e7eb' };
    }
  };

  const style = getStyle(alert.code_type);

  return (
    <div style={{ backgroundColor: style.bg, border: `1px solid ${style.border}`, borderRadius: '12px', padding: '15px', display: 'flex', gap: '15px', alignItems: 'center' }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: '800', fontSize: '13px', color: style.color }}>{alert.code_type}</div>
            <div style={{ fontSize: '11px', color: style.color }}>{alert.notes || 'Emergency'}</div>
          </div>
          <div style={{ color: '#e53e3e', fontSize: '10px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '6px', height: '6px', backgroundColor: '#e53e3e', borderRadius: '50%' }}></div>
            ACTIVE
          </div>
        </div>
        <div style={{ fontSize: '11px', color: '#718096', marginTop: '8px' }}>{alert.floor}, {alert.ward} - {alert.room}</div>
        <div style={{ fontSize: '10px', color: '#a0aec0', marginTop: '3px' }}>{new Date(alert.created_at).toLocaleTimeString()}</div>
      </div>
    </div>
  );
};

export default AlertCard;
