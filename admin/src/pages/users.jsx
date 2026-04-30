import React from 'react';

export default function Users() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#111827', margin: '0 0 2rem 0', letterSpacing: '-0.025em' }}>User Management</h1>
      
      <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            <tr>
              <th style={{ padding: '1rem 1.5rem', color: '#64748b', fontWeight: '600', fontSize: '0.875rem' }}>Name</th>
              <th style={{ padding: '1rem 1.5rem', color: '#64748b', fontWeight: '600', fontSize: '0.875rem' }}>Role</th>
              <th style={{ padding: '1rem 1.5rem', color: '#64748b', fontWeight: '600', fontSize: '0.875rem' }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', color: '#64748b', fontWeight: '600', fontSize: '0.875rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 1, name: 'Dr. Sarah Jenkins', role: 'DOCTOR', status: 'Online' },
              { id: 2, name: 'Nurse John Smith', role: 'NURSE', status: 'Offline' },
              { id: 3, name: 'Admin User', role: 'ADMIN', status: 'Online' },
            ].map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: '500', color: '#0f172a' }}>{user.name}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ 
                    backgroundColor: user.role === 'DOCTOR' ? '#eff6ff' : user.role === 'NURSE' ? '#f0fdf4' : '#f8fafc', 
                    color: user.role === 'DOCTOR' ? '#2563eb' : user.role === 'NURSE' ? '#16a34a' : '#475569',
                    padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600'
                  }}>
                    {user.role}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: user.status === 'Online' ? '#22c55e' : '#cbd5e1' }}></div>
                    <span style={{ fontSize: '0.875rem', color: '#64748b' }}>{user.status}</span>
                  </div>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <button style={{ color: '#3b82f6', background: 'none', border: 'none', fontWeight: '600', cursor: 'pointer', padding: 0 }}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
