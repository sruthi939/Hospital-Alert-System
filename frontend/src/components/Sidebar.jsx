import React from 'react';

const Sidebar = () => {
  return (
    <aside style={{ width: '240px', backgroundColor: '#003366', color: 'white', display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ padding: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src="https://img.icons8.com/color/48/hospital.png" alt="logo" style={{ width: '30px' }} />
        <div>
          <div style={{ fontWeight: '800', fontSize: '14px' }}>HOSPITAL</div>
          <div style={{ fontSize: '9px', opacity: 0.7 }}>Emergency Alert System</div>
        </div>
      </div>
      <nav style={{ flex: 1, padding: '10px' }}>
        <div style={{ padding: '12px 20px', backgroundColor: '#1a4e8d', borderRadius: '10px', marginBottom: '5px', cursor: 'pointer' }}>Dashboard</div>
        <div style={{ padding: '12px 20px', cursor: 'pointer' }}>New Alert</div>
        <div style={{ padding: '12px 20px', cursor: 'pointer' }}>My Alerts</div>
        <div style={{ padding: '12px 20px', cursor: 'pointer' }}>Patients</div>
      </nav>
      <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ cursor: 'pointer', color: '#a0aec0' }}>Logout</div>
      </div>
    </aside>
  );
};

export default Sidebar;
