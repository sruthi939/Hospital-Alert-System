import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Users from './pages/users';
import Analytics from './pages/analytics';
import SystemDashboard from './pages/system_dashboard';

const SidebarLink = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link to={to} style={{
      textDecoration: 'none',
      padding: '1rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      transition: 'all 0.2s ease',
      backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
      color: isActive ? '#fff' : '#9ca3af',
      fontWeight: isActive ? '600' : '500',
      borderLeft: isActive ? '4px solid #ef4444' : '4px solid transparent',
    }}>
      <span style={{ marginRight: '12px', fontSize: '1.25rem' }}>{icon}</span>
      {label}
    </Link>
  );
};

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
        {/* Sidebar */}
        <aside style={{ width: '280px', backgroundColor: '#0f172a', color: 'white', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid #1e293b' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ backgroundColor: '#ef4444', padding: '8px', borderRadius: '8px', display: 'flex' }}>
                🏥
              </span>
              Admin Portal
            </h2>
          </div>
          
          <nav style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem 0', gap: '0.25rem' }}>
            <SidebarLink to="/" icon="🚨" label="Active Alerts" />
            <SidebarLink to="/users" icon="👥" label="Manage Users" />
            <SidebarLink to="/analytics" icon="📈" label="Analytics" />
            <SidebarLink to="/system" icon="⚙️" label="System Monitor" />
          </nav>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, height: '100vh', overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/system" element={<SystemDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
