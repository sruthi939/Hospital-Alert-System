import React from 'react';

export default function SystemDashboard() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#111827', margin: '0 0 2rem 0', letterSpacing: '-0.025em' }}>System Monitor</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
        {/* Server Status */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b', margin: '0 0 1rem 0' }}>API Server</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 0 4px rgba(34, 197, 94, 0.2)' }}></div>
            <span style={{ fontWeight: '600', color: '#334155' }}>Operational</span>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.875rem', margin: 0 }}>Uptime: 99.99% • Latency: 45ms</p>
        </div>

        {/* Database Status */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b', margin: '0 0 1rem 0' }}>Database</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 0 4px rgba(34, 197, 94, 0.2)' }}></div>
            <span style={{ fontWeight: '600', color: '#334155' }}>Connected</span>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.875rem', margin: 0 }}>Active Connections: 12 • Pool Size: 100</p>
        </div>
      </div>
    </div>
  );
}
