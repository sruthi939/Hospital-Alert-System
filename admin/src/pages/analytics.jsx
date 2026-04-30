import React from 'react';

export default function Analytics() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#111827', margin: '0 0 2rem 0', letterSpacing: '-0.025em' }}>Analytics & Reporting</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        {[
          { label: 'Total Alerts (Today)', value: '24', color: '#ef4444' },
          { label: 'Avg Response Time', value: '1m 12s', color: '#3b82f6' },
          { label: 'Active Personnel', value: '45', color: '#10b981' }
        ].map((stat, i) => (
          <div key={i} style={{ backgroundColor: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#64748b', fontSize: '0.875rem', fontWeight: '600' }}>{stat.label}</h3>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>
      
      <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', fontWeight: '500' }}>Charts and graphs visualization placeholder</p>
      </div>
    </div>
  );
}
