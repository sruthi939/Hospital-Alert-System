import React from 'react';

const RecentAlertsTable = ({ alerts }) => {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      <h3 style={{ margin: '0 0 20px 0', fontSize: '14px', fontWeight: '800' }}>MY RECENT ALERTS</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '1px solid #edf2f7' }}>
            <th style={{ padding: '10px', fontSize: '13px', color: '#718096' }}>Code</th>
            <th style={{ padding: '10px', fontSize: '13px', color: '#718096' }}>Location</th>
            <th style={{ padding: '10px', fontSize: '13px', color: '#718096' }}>Time</th>
            <th style={{ padding: '10px', fontSize: '13px', color: '#718096' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map(alert => (
            <tr key={alert.id} style={{ borderBottom: '1px solid #f7fafc' }}>
              <td style={{ padding: '15px 10px', fontWeight: '800', fontSize: '14px' }}>{alert.code_type}</td>
              <td style={{ padding: '15px 10px', fontSize: '13px' }}>{alert.floor}, {alert.ward} - {alert.room}</td>
              <td style={{ padding: '15px 10px', fontSize: '14px' }}>{new Date(alert.created_at).toLocaleTimeString()}</td>
              <td style={{ padding: '15px 10px' }}>
                <span style={{ padding: '5px 10px', borderRadius: '5px', fontSize: '12px', fontWeight: '800', backgroundColor: alert.status === 'ACTIVE' ? '#ebf8ff' : '#f0fff4', color: alert.status === 'ACTIVE' ? '#3182ce' : '#38a169' }}>
                  {alert.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentAlertsTable;
