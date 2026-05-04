const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  --sidebar-bg: #0A432F; /* Dark green */
  --sidebar-active: #0D8F4F; /* Lighter green */
  --text-dark: #2D3748;
  --text-gray: #718096;
  --bg-light: #F8FAFC;
  --card-border: #E2E8F0;
  
  --blue-header: #0F52BA; /* Standard alert blue */
  --red-header: #DA2C38; /* Standard alert red */
  
  --btn-green: #0a9351; /* Accept green */
}

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background-color: var(--bg-light);
  color: var(--text-dark);
}

.doctor-dashboard-container {
  display: flex;
  flex-direction: column;
  background-color: var(--bg-light);
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.top-header-absolute {
  display: none;
}

.dashboard-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  max-width: none;
  background-color: #fff;
  border-radius: 0;
  box-shadow: none;
  border: none;
  overflow: hidden;
}

/* SIDEBAR */
.sidebar {
  width: 250px;
  background-color: var(--sidebar-bg);
  color: white;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  padding: 30px 20px;
  gap: 12px;
}

.sidebar-logo .logo-icon {
  color: white;
}

.sidebar-logo .logo-text h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.sidebar-logo .logo-text p {
  margin: 0;
  font-size: 10px;
  color: #a0d8c0;
  font-weight: 500;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  flex-grow: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 16px 24px;
  gap: 16px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
  font-weight: 500;
  position: relative;
}

.nav-item:hover {
  background-color: rgba(255,255,255,0.05);
}

.nav-item.active {
  background-color: var(--sidebar-active);
  border-radius: 0 8px 8px 0;
  margin-right: 16px;
}

.nav-item .badge {
  background-color: #EF4444;
  color: white;
  font-size: 11px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: auto;
}

.nav-item.logout {
  margin-top: auto;
}

/* MAIN CONTENT */
.main-content {
  flex-grow: 1;
  padding: 30px 40px;
  display: flex;
  flex-direction: column;
  background-color: #F8FAFC;
  overflow-y: auto;
}

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
}

.doctor-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.doctor-info .avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid var(--card-border);
  background: white;
}

.doctor-details h1 {
  margin: 0 0 4px 0;
  font-size: 18px;
  font-weight: 700;
}

.doctor-details p {
  margin: 0;
  font-size: 13px;
  color: var(--text-gray);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.datetime {
  text-align: right;
}

.datetime .time {
  font-size: 14px;
  font-weight: 700;
}

.datetime .date {
  font-size: 11px;
  color: var(--text-gray);
  margin-top: 2px;
}

.header-bell {
  position: relative;
  color: var(--text-dark);
  cursor: pointer;
}

.header-bell .badge-small {
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: #EF4444;
  color: white;
  font-size: 10px;
  font-weight: bold;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid #F8FAFC;
}

/* CONTENT BODY */
.content-body {
  display: flex;
  flex-direction: column;
  gap: 30px;
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid var(--card-border);
}

.section-title {
  font-size: 13px;
  font-weight: 700;
  color: #4A5568;
  margin: 0 0 16px 0;
  letter-spacing: 0.5px;
}

/* ALERT CARDS */
.alerts-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.alert-card {
  border: 1px solid var(--card-border);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.alert-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  color: white;
}

.alert-header h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.blue-card .alert-header {
  background-color: var(--blue-header);
}

.red-card .alert-header {
  background-color: var(--red-header);
}

.alert-body {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #fff;
}

.alert-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 280px;
}

.detail-row {
  display: flex;
  font-size: 13px;
}

.detail-row .label {
  color: var(--text-gray);
  width: 90px;
  flex-shrink: 0;
}

.detail-row .separator {
  color: var(--text-gray);
  margin-right: 16px;
}

.detail-row .value {
  font-weight: 600;
  color: var(--text-dark);
}

.alert-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 16px;
}

.time-elapsed {
  text-align: center;
}

.time-elapsed h4 {
  margin: 0 0 4px 0;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 1px;
}

.time-elapsed p {
  margin: 0;
  font-size: 11px;
  color: var(--text-gray);
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.btn-accept, .btn-view {
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 0.5px;
}

.btn-accept {
  background-color: var(--btn-green);
  color: white;
  border: none;
}

.btn-accept:hover {
  background-color: #087d44;
}

.btn-view {
  background-color: white;
  color: #3B82F6;
  border: 1px solid #3B82F6;
}

.btn-view:hover {
  background-color: #eff6ff;
}

/* TABLE SECTION */
.table-container {
  border: 1px solid var(--card-border);
  border-radius: 8px;
  overflow: hidden;
  background: white;
}

.responses-table {
  width: 100%;
  border-collapse: collapse;
}

.responses-table th {
  background-color: #F8FAFC;
  text-align: left;
  padding: 14px 20px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-dark);
  border-bottom: 1px solid var(--card-border);
}

.responses-table td {
  padding: 16px 20px;
  font-size: 13px;
  border-bottom: 1px solid #f1f5f9;
}

.responses-table tr:last-child td {
  border-bottom: none;
}

.code-blue-text {
  color: #2563EB;
}

.code-pink-text {
  color: #DB2777;
}

.font-medium {
  font-weight: 500;
}

.status-progress {
  color: #F59E0B;
}

.status-resolved {
  color: #10B981;
}

.view-all {
  padding: 14px 20px;
  text-align: right;
  border-top: 1px solid #f1f5f9;
  background-color: #F8FAFC;
}

.view-all a {
  color: #3B82F6;
  text-decoration: none;
  font-size: 12px;
  font-weight: 600;
}

.view-all a:hover {
  text-decoration: underline;
}
`;

import { 
  Home, 
  BadgeAlert, 
  ClipboardList, 
  User, 
  Users, 
  Bell, 
  LogOut, 
  HeartPulse, 
  Flame, 
  ShieldPlus
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAlerts } from '../../context/AlertContext';
import { useState, useEffect } from 'react';

const DoctorDashboard = () => {
  const { user, logout } = useAuth();
  const { activeAlerts, recentAlerts } = useAlerts();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const doctorName = user?.name || "Doctor";
  const doctorDept = user?.department || "General";
  // Fair avatar representation using initials
  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(doctorName)}&backgroundColor=0A432F&textColor=ffffff`;

  const getCodeColor = (code) => {
    const codeLower = (code || '').toLowerCase();
    if (codeLower.includes('blue')) return 'blue-card';
    if (codeLower.includes('red')) return 'red-card';
    return 'blue-card'; 
  };

  const getCodeIcon = (code) => {
    const codeLower = (code || '').toLowerCase();
    if (codeLower.includes('blue')) return <HeartPulse size={20} />;
    if (codeLower.includes('red')) return <Flame size={20} />;
    return <BadgeAlert size={20} />;
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return '--:--';
    const d = new Date(dateStr);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const calculateElapsed = (startTime) => {
    if (!startTime) return "00:00:00";
    const start = new Date(startTime).getTime();
    const now = new Date().getTime();
    const diff = Math.max(0, now - start);
    
    const hrs = Math.floor(diff / 3600000).toString().padStart(2, '0');
    const mins = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
    const secs = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
    
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <>
      <style>{styles}</style>
      <div className="doctor-dashboard-container">
      <div className="top-header-absolute">DOCTOR DASHBOARD</div>
      
      <div className="dashboard-wrapper">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <ShieldPlus size={36} className="logo-icon" />
            <div className="logo-text">
              <h2>HOSPITAL</h2>
              <p>Emergency Alert System</p>
            </div>
          </div>
          
          <nav className="sidebar-nav">
            <div className="nav-item active">
              <Home size={20} />
              <span>Dashboard</span>
            </div>
            <div className="nav-item">
              <BadgeAlert size={20} />
              <span>Active Alerts</span>
              {activeAlerts?.length > 0 && <span className="badge">{activeAlerts.length}</span>}
            </div>
            <div className="nav-item">
              <ClipboardList size={20} />
              <span>My Responses</span>
            </div>
            <div className="nav-item">
              <User size={20} />
              <span>Patient Details</span>
            </div>
            <div className="nav-item">
              <Users size={20} />
              <span>Team Directory</span>
            </div>
            <div className="nav-item">
              <Bell size={20} />
              <span>Notifications</span>
              {recentAlerts?.length > 0 && <span className="badge">{recentAlerts.length}</span>}
            </div>
            <div className="nav-item">
              <User size={20} />
              <span>Profile</span>
            </div>
            <div className="nav-item logout" onClick={logout}>
              <LogOut size={20} />
              <span>Logout</span>
            </div>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="main-content">
          <header className="main-header">
            <div className="doctor-info">
              <div className="avatar">
                <img src={avatarUrl} alt="Doctor Avatar" />
              </div>
              <div className="doctor-details">
                <h1>Welcome, Dr. {doctorName}</h1>
                <p>{doctorDept}</p>
              </div>
            </div>
            <div className="header-right">
              <div className="datetime">
                <div className="time">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                <div className="date">{currentTime.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
              </div>
              <div className="header-bell">
                <Bell size={24} />
                {(activeAlerts?.length || recentAlerts?.length) > 0 && <span className="badge-small">{(activeAlerts?.length || 0) + (recentAlerts?.length || 0)}</span>}
              </div>
            </div>
          </header>

          <div className="content-body">
            <section className="alerts-section">
              <h2 className="section-title">ACTIVE EMERGENCY ALERTS</h2>
              
              {!activeAlerts || activeAlerts.length === 0 ? (
                 <div style={{ padding: '20px', textAlign: 'center', color: '#718096', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                   No active emergency alerts at this time.
                 </div>
              ) : (
                activeAlerts.map(alert => (
                  <div key={alert.id || Math.random()} className={`alert-card ${getCodeColor(alert.code_type)}`}>
                    <div className="alert-header">
                      {getCodeIcon(alert.code_type)}
                      <h3>{alert.code_type} - {alert.notes || 'Emergency Alert'}</h3>
                    </div>
                    <div className="alert-body">
                      <div className="alert-details">
                        <div className="detail-row">
                          <span className="label">Location</span>
                          <span className="separator">:</span>
                          <span className="value">{alert.floor || '-'}, {alert.ward || 'General'}</span>
                        </div>
                        <div className="detail-row">
                          <span className="label">Room / Bed</span>
                          <span className="separator">:</span>
                          <span className="value">{alert.room || '-'}</span>
                        </div>
                        <div className="detail-row">
                          <span className="label">Triggered By</span>
                          <span className="separator">:</span>
                          <span className="value">{alert.triggered_by || 'System'}</span>
                        </div>
                        <div className="detail-row">
                          <span className="label">Time</span>
                          <span className="separator">:</span>
                          <span className="value">{formatTime(alert.created_at)}</span>
                        </div>
                      </div>
                      <div className="alert-actions">
                        <div className="time-elapsed">
                          <h4>{calculateElapsed(alert.created_at)}</h4>
                          <p>Time Elapsed</p>
                        </div>
                        <div className="action-buttons">
                          <button className="btn-accept">ACCEPT</button>
                          <button className="btn-view">VIEW DETAILS</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}

            </section>

            <section className="responses-section">
              <h2 className="section-title">MY RESPONSES</h2>
              <div className="table-container">
                <table className="responses-table">
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Location</th>
                      <th>Room / Bed</th>
                      <th>Status</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!recentAlerts || recentAlerts.length === 0 ? (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', color: '#718096' }}>No recent responses recorded.</td>
                      </tr>
                    ) : (
                      recentAlerts.map(alert => (
                        <tr key={alert.id || Math.random()}>
                          <td className={`font-medium ${alert.code_type?.toLowerCase().includes('blue') ? 'code-blue-text' : alert.code_type?.toLowerCase().includes('pink') ? 'code-pink-text' : ''}`}>
                            {alert.code_type || 'ALERT'}
                          </td>
                          <td>{alert.ward || 'General'}</td>
                          <td>{alert.room || '-'}</td>
                          <td className={`font-medium ${alert.status === 'Resolved' ? 'status-resolved' : 'status-progress'}`}>
                            {alert.status || 'In Progress'}
                          </td>
                          <td>{formatTime(alert.created_at)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                <div className="view-all">
                  <a href="#">View All Responses &rarr;</a>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
    </>
  );
};

export default DoctorDashboard;
