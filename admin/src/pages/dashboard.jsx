import React, { useState, useEffect } from 'react';
import { Bell, Clock, CheckCircle2, AlertCircle, UserPlus, PlusSquare, Settings, FileText, Search, ChevronRight, TrendingUp, MapPin, RefreshCw } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import { initiateSocketConnection, subscribeToAlerts, disconnectSocket, joinAdminRoom } from '../services/socket';
import { adminService } from '../services/api';

const StatCard = ({ title, value, subtitle, color }) => (
  <div style={{
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '16px',
    flex: 1,
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    border: '1px solid #f1f5f9'
  }} className="hover-card transition-all">
    <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b', fontWeight: '500' }}>{title}</p>
    <h3 style={{ margin: '0.5rem 0', fontSize: '2rem', fontWeight: '800', color: color }}>{value}</h3>
    <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8' }}>{subtitle}</p>
  </div>
);

const ActiveAlertItem = ({ alert }) => {
  const { code, location, time, status } = alert;

  const colors = {
    'CODE RED': { bg: '#fff1f2', text: '#e11d48', border: '#fecdd3', icon: <AlertCircle size={18} /> },
    'CODE BLUE': { bg: '#eff6ff', text: '#2563eb', border: '#dbeafe', icon: <Bell size={18} /> },
    'CODE YELLOW': { bg: '#fffbeb', text: '#d97706', border: '#fef3c7', icon: <AlertCircle size={18} /> },
    'CODE PINK': { bg: '#fdf2f8', text: '#db2777', border: '#fbcfe8', icon: <Heart size={18} /> }
  };

  const style = colors[code.toUpperCase()] || colors['CODE BLUE'];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '1rem',
      backgroundColor: style.bg,
      borderRadius: '12px',
      border: `1px solid ${style.border}`,
      marginBottom: '0.75rem',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          backgroundColor: 'white',
          padding: '8px',
          borderRadius: '50%',
          color: style.text,
          display: 'flex'
        }}>
          {style.icon}
        </div>
        <div>
          <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: '700', color: style.text }}>{code}</h4>
          <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>{location}</p>
        </div>
      </div>
      <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#94a3b8' }}>{time}</span>
    </div>
  );
};

const QuickAction = ({ icon: Icon, label, onClick }) => (
  <button style={{
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    padding: '0.875rem 1rem',
    backgroundColor: 'white',
    border: '1px solid #f1f5f9',
    borderRadius: '12px',
    cursor: 'pointer',
    marginBottom: '0.5rem',
    transition: 'all 0.2s',
    textAlign: 'left'
  }}
    onClick={onClick}
    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
  >
    <div style={{ color: '#6366f1' }}><Icon size={18} /></div>
    <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#475569' }}>{label}</span>
  </button>
);

const Heart = ({ size, fill, color, style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill || "none"}
    stroke={color || "currentColor"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

export default function Dashboard() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Initial data fetch
    fetchAlerts();

    // Socket setup
    initiateSocketConnection();
    joinAdminRoom();

    subscribeToAlerts((err, newAlert) => {
      if (err) return;
      setAlerts(prev => {
        // If alert already exists, update it, otherwise add to top
        const exists = prev.find(a => a.id === newAlert.id);
        if (exists) {
          return prev.map(a => a.id === newAlert.id ? { ...a, ...newAlert } : a);
        }
        return [{ ...newAlert, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }, ...prev];
      });
    });

    // Time update
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);

    return () => {
      disconnectSocket();
      clearInterval(timer);
    };
  }, []);

  const fetchAlerts = async () => {
    setLoading(true);
    const data = await adminService.getAllAlerts();
    setAlerts(data);
    setLoading(false);
  };

  const handleQuickAction = (action) => {
    alert(`Action: ${action} initiated. In a full system, this would open a modal or navigate.`);
  };

  const activeAlerts = alerts.filter(a => a.status === 'Active' || a.status === 'ACTIVE');
  const resolvedAlertsCount = alerts.filter(a => a.status === 'Resolved' || a.status === 'RESOLVED').length;

  const chartData = [
    { name: 'Code Blue', value: alerts.filter(a => a.code.toUpperCase() === 'CODE BLUE').length || 0, color: '#3b82f6' },
    { name: 'Code Red', value: alerts.filter(a => a.code.toUpperCase() === 'CODE RED').length || 0, color: '#ef4444' },
    { name: 'Code Yellow', value: alerts.filter(a => a.code.toUpperCase() === 'CODE YELLOW').length || 0, color: '#f59e0b' },
    { name: 'Code Pink', value: alerts.filter(a => a.code.toUpperCase() === 'CODE PINK').length || 0, color: '#ec4899' },
  ];

  // If no data, use some dummy values for the chart to keep it visual
  const visualChartData = chartData.some(d => d.value > 0) ? chartData : [
    { name: 'Code Blue', value: 45, color: '#3b82f6' },
    { name: 'Code Red', value: 30, color: '#ef4444' },
    { name: 'Code Yellow', value: 25, color: '#f59e0b' },
    { name: 'Code Pink', value: 25, color: '#ec4899' },
  ];

  const totalAlerts = alerts.length;
  const resolvedAlertsCount = alerts.filter(a => a.status === 'Resolved' || a.status === 'RESOLVED').length;

  return (
    <div style={{ paddingBottom: '2rem' }}>
      {/* Top Page Title */}
      <div style={{ textAlign: 'center', padding: '1.5rem 0 0.5rem 0' }}>
        <h1 style={{
          fontSize: '1.25rem',
          fontWeight: '800',
          color: '#4c1d95',
          margin: 0,
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }}>
          Admin Dashboard
        </h1>
      </div>

      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem 0',
        marginBottom: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#e2e8f0', overflow: 'hidden' }}>
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin Avatar" />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800' }}>Welcome, Admin</h2>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>System Administrator</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ textAlign: 'right' }}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '700' }}>
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </h3>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>
              {currentTime.toLocaleDateString([], { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <button
            onClick={fetchAlerts}
            title="Refresh Data"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b',
              border: '1px solid #e2e8f0',
              cursor: 'pointer'
            }}>
            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          </button>

          <button
            onClick={() => {
              const codes = ['Code Red', 'Code Blue', 'Code Yellow', 'Code Pink'];
              const floors = ['1st', '2nd', '3rd', 'ICU', 'ER'];
              const newAlert = {
                id: Date.now(),
                code: codes[Math.floor(Math.random() * codes.length)],
                location: `${floors[Math.floor(Math.random() * floors.length)]} Floor, Room ${Math.floor(Math.random() * 500)}`,
                status: 'Active',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              };
              setAlerts(prev => [newAlert, ...prev]);
            }}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '10px',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              fontWeight: '700',
              fontSize: '0.8rem',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(239, 68, 68, 0.3)'
            }}>
            Simulate Alert
          </button>
        </div>
      </header>

      {/* Stats Row */}
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
        <StatCard title="Total Alerts" value={totalAlerts} subtitle="This Month" color="#3b82f6" />
        <StatCard title="Active Alerts" value={activeAlerts.length} subtitle="Right Now" color="#ef4444" />
        <StatCard title="Resolved Alerts" value={resolvedAlertsCount} subtitle="This Month" color="#10b981" />
        <StatCard title="Avg. Response Time" value="02:45" subtitle="Minutes" color="#f59e0b" />
      </div>

      {/* Middle Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Active Alerts */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '800', color: '#1e293b' }}>ACTIVE ALERTS ({activeAlerts.length})</h3>
          </div>

          {activeAlerts.length > 0 ? (
            activeAlerts.slice(0, 3).map(alert => (
              <ActiveAlertItem key={alert.id} alert={alert} />
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
              No active alerts at the moment.
            </div>
          )}

          <button
            onClick={fetchAlerts}
            style={{
              width: '100%',
              padding: '0.75rem',
              marginTop: '0.5rem',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#6366f1',
              fontSize: '0.85rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px'
            }}>
            View All Alerts <ChevronRight size={16} />
          </button>
        </div>

        {/* Alerts Overview Chart */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '800', color: '#1e293b' }}>ALERTS OVERVIEW (This Month)</h3>
          <div style={{ display: 'flex', alignItems: 'center', height: '240px' }}>
            <div style={{ flex: 1, height: '100%', minWidth: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={visualChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {visualChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <Label
                      value={totalAlerts}
                      position="center"
                      style={{ fontSize: '24px', fontWeight: '800', fill: '#1e293b' }}
                    />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {visualChartData.map((item) => (
                <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: item.color }}></div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>
                    {item.name} ({item.value})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Recent Alerts Table */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1rem', fontWeight: '800', color: '#1e293b' }}>RECENT ALERTS</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid #f1f5f9' }}>
                <th style={{ padding: '0.75rem 0', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8' }}>Code</th>
                <th style={{ padding: '0.75rem 0', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8' }}>Location</th>
                <th style={{ padding: '0.75rem 0', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8' }}>Time</th>
                <th style={{ padding: '0.75rem 0', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {alerts.length > 0 ? (
                alerts.slice(0, 5).map((alert, i) => (
                  <tr key={alert.id || i} style={{ borderBottom: i === Math.min(alerts.length, 5) - 1 ? 'none' : '1px solid #f8fafc' }}>
                    <td style={{
                      padding: '1rem 0', fontSize: '0.85rem', fontWeight: '700', color:
                        alert.code.toUpperCase() === 'CODE RED' ? '#ef4444' :
                          alert.code.toUpperCase() === 'CODE BLUE' ? '#3b82f6' :
                            alert.code.toUpperCase() === 'CODE YELLOW' ? '#f59e0b' : '#ec4899'
                    }}>{alert.code}</td>
                    <td style={{ padding: '1rem 0', fontSize: '0.85rem', color: '#475569' }}>{alert.location || `${alert.floor}F, ${alert.ward}`}</td>
                    <td style={{ padding: '1rem 0', fontSize: '0.85rem', color: '#475569' }}>{alert.time}</td>
                    <td style={{ padding: '1rem 0' }}>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: (alert.status === 'Active' || alert.status === 'ACTIVE') ? '#ef4444' : '#10b981'
                      }}>
                        {alert.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>No recent alerts found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Quick Actions */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1rem', fontWeight: '800', color: '#1e293b' }}>QUICK ACTIONS</h3>
          <QuickAction icon={UserPlus} label="Add New User" onClick={() => handleQuickAction('Add User')} />
          <QuickAction icon={PlusSquare} label="Add Department" onClick={() => handleQuickAction('Add Department')} />
          <QuickAction icon={FileText} label="Manage Alert Codes" onClick={() => handleQuickAction('Manage Codes')} />
          <QuickAction icon={Settings} label="System Settings" onClick={() => handleQuickAction('Settings')} />
        </div>
      </div>
    </div>
  );
}
