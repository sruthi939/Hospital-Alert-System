import React from 'react';

const Header = ({ user }) => {
  return (
    <header style={{ backgroundColor: 'white', padding: '15px 25px', borderRadius: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <img src="https://i.pravatar.cc/150?u=nurse" alt="profile" style={{ width: '45px', borderRadius: '50%' }} />
        <div>
          <div style={{ fontWeight: '800', fontSize: '16px' }}>Welcome, {user?.name || 'Nurse'}</div>
          <div style={{ fontSize: '12px', color: '#718096' }}>Staff ID: {user?.staffId || 'NUR12345'}</div>
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontWeight: '800', fontSize: '16px' }}>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        <div style={{ fontSize: '12px', color: '#718096' }}>{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
      </div>
    </header>
  );
};

export default Header;
