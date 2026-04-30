import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  DoorOpen, 
  Hash, 
  History, 
  BarChart3, 
  Settings, 
  UserCircle, 
  LogOut,
  Bell,
  ShieldAlert,
  Heart
} from 'lucide-react';
import Dashboard from './pages/dashboard';

const SidebarLink = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link to={to} style={{
      textDecoration: 'none',
      padding: '0.75rem 1.25rem',
      margin: '2px 12px',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '8px',
      transition: 'all 0.2s ease',
      backgroundColor: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
      color: 'white',
      opacity: isActive ? 1 : 0.7,
      fontSize: '0.95rem',
      fontWeight: isActive ? '500' : '400',
    }}>
      <Icon size={20} style={{ marginRight: '12px' }} />
      {label}
    </Link>
  );
};

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
        {/* Sidebar */}
        <aside style={{ 
          width: '260px', 
          backgroundColor: '#4c1d95', 
          color: 'white', 
          display: 'flex', 
          flexDirection: 'column',
          position: 'fixed',
          height: '100vh',
          left: 0,
          top: 0,
          zIndex: 50
        }}>
          <div style={{ padding: '1.5rem 1.25rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ 
                backgroundColor: 'white', 
                padding: '6px', 
                borderRadius: '10px', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ef4444',
                position: 'relative'
              }}>
                <ShieldAlert size={28} color="#4c1d95" />
                <Heart size={12} fill="#ef4444" color="#ef4444" style={{ position: 'absolute', top: '10px' }} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0, letterSpacing: '0.5px' }}>HOSPITAL</h2>
                <p style={{ fontSize: '0.65rem', margin: 0, opacity: 0.8 }}>Emergency Alert System</p>
              </div>
            </div>
          </div>
          
          <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <SidebarLink to="/" icon={LayoutDashboard} label="Dashboard" />
            <SidebarLink to="/users" icon={Users} label="Users Management" />
            <SidebarLink to="/departments" icon={Building2} label="Departments" />
            <SidebarLink to="/wards" icon={DoorOpen} label="Ward / Rooms" />
            <SidebarLink to="/codes" icon={Hash} label="Alert Codes" />
            <SidebarLink to="/history" icon={History} label="Alerts History" />
            <SidebarLink to="/reports" icon={BarChart3} label="Reports & Analytics" />
            <SidebarLink to="/settings" icon={Settings} label="System Settings" />
            
            <div style={{ marginTop: 'auto', marginBottom: '1.5rem' }}>
              <SidebarLink to="/profile" icon={UserCircle} label="Profile" />
              <SidebarLink to="/logout" icon={LogOut} label="Logout" />
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main style={{ 
          flex: 1, 
          marginLeft: '260px', 
          minHeight: '100vh',
          padding: '0' 
        }}>
          <div style={{ padding: '0 2rem' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              {/* Other routes can be added here */}
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
