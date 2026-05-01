import React from 'react';
import Header from '../../components/Header';
import AlertForm from '../../components/AlertForm';
import AlertCard from '../../components/AlertCard';
import RecentAlertsTable from '../../components/RecentAlertsTable';
import { useAlerts } from '../../context/AlertContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const NurseDashboard = () => {
  const [activeTab, setActiveTab] = React.useState('Dashboard');
  const { activeAlerts, recentAlerts } = useAlerts();
  const { user, logout } = useAuth();
  const [patients, setPatients] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (activeTab === 'Patients') {
      fetch('http://localhost:5001/api/patients')
        .then(res => res.json())
        .then(setPatients)
        .catch(err => console.error(err));
    }
  }, [activeTab]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'History':
        return (
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#001a3d' }}>Alert History</h3>
            <RecentAlertsTable alerts={recentAlerts} />
          </div>
        );
      case 'Patients':
        return (
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#001a3d' }}>Patient Directory</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {Array.isArray(patients) && patients.length > 0 ? patients.map(p => (
                <div key={p.id} style={{ padding: '20px', border: '1px solid #f1f5f9', borderRadius: '15px', backgroundColor: '#f8fafc' }}>
                  <div style={{ fontWeight: '800', color: '#1e293b', fontSize: '16px', marginBottom: '5px' }}>{p.name}</div>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>Age: {p.age} | Room: <span style={{ fontWeight: '700', color: '#3b82f6' }}>{p.room}</span></div>
                  <div style={{ marginTop: '10px', fontSize: '13px', color: '#475569' }}>{p.condition_summary}</div>
                </div>
              )) : (
                <div style={{ color: '#64748b', fontSize: '14px' }}>No patients found or error loading data.</div>
              )}
            </div>
          </div>
        );
      default:
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '30px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <AlertForm onAlertTriggered={() => setActiveTab('Dashboard')} />
              <RecentAlertsTable alerts={recentAlerts.slice(0, 5)} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#1e293b', textTransform: 'uppercase' }}>Active Alerts</h3>
              </div>
              {activeAlerts.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', backgroundColor: 'white', borderRadius: '20px', border: '1px solid #e2e8f0', color: '#64748b', fontSize: '14px' }}>
                  <img src="https://img.icons8.com/color/48/checked-checkbox.png" alt="no alerts" style={{ width: '40px', opacity: 0.3, marginBottom: '15px' }} />
                  <div>All clear. No active alerts.</div>
                </div>
              ) : (
                activeAlerts.map(alert => (
                  <AlertCard key={alert.id} alert={alert} />
                ))
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f4f8', minHeight: '100vh', fontFamily: '"Inter", sans-serif' }}>
      <nav style={{ backgroundColor: '#001a3d', padding: '15px 40px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '6px' }}><img src="https://img.icons8.com/color/48/hospital.png" alt="logo" style={{ width: '24px' }} /></div>
          <div><div style={{ fontWeight: '800', fontSize: '15px', letterSpacing: '0.5px' }}>HOSPITAL</div><div style={{ fontSize: '10px', opacity: 0.7 }}>Emergency Alert System</div></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
          <div style={{ display: 'flex', gap: '20px', fontSize: '14px', fontWeight: '600' }}>
            {['Dashboard', 'History', 'Patients'].map(tab => (
              <span 
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{ borderBottom: activeTab === tab ? '2px solid #3b82f6' : 'none', opacity: activeTab === tab ? 1 : 0.7, paddingBottom: '4px', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                {tab}
              </span>
            ))}
          </div>
          <button onClick={handleLogout} style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '8px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>Logout</button>
        </div>
      </nav>

      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '30px 40px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <Header user={user} />
        {renderContent()}
      </main>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
      `}</style>
    </div>
  );
};

export default NurseDashboard;
